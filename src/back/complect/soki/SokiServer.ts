import { backLocaleError, localizeBackLocaleErrorPayload } from 'back/locales/back';
import { BackLocaleKey } from 'shared/model/+locale/_BackLocaleKey';
import { insertDashMessage, insertVisit } from 'back/dash/visits';
import { takeUserTiny } from 'back/apps/index/tinies/userTiny';
import { saveUserLangi, takeUserLangi } from 'back/complect/userLangiFileStore';
import { ServerTSJRPCTool, tsjrpcBaseServerNext } from 'back/tsjrpc.base.server';
import { DrizzleQueryError } from 'drizzle-orm';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { makeRegExp } from 'regexpert';
import {
  Langi,
  LocalSokiAuth,
  SokiAuthLogin,
  SokiError,
  SokiVisit,
  TsjrpcFromClientEvent,
  TsjrpcFromServerEvent,
  UserAuth,
} from 'shared/api';
import { DashMessageKind } from 'shared/model/index/visitsDashboard';
import { howMillisecondsInMin } from 'shared/const/ms';
import { emptyFunc, Eventer, setSharedPolyfills } from 'shared/utils';
import { escapeHtmlLazy } from 'shared/utils/string.utils';
import {
  checkIsFunction,
  checkIsNotUndefined,
  checkIsNull,
  checkIsObject,
  checkIsUndefined,
} from 'shared/utils/checkIs';
import { TSJRPCEvent } from 'tsjrpc';
import WebSocket, { WebSocketServer } from 'ws';
import { ErrorCatcher } from '../ErrorCatcher';
import { tokenSecretFileStore } from './file-stores';
import { SokiServerClientSelector } from './model';

setSharedPolyfills();
ErrorCatcher.logAllErrors();

const errorsPerSocketPerMinute = 20;

export class SokiServer {
  private clients = new Set<WebSocket>();
  auths = new Map<WebSocket, LocalSokiAuth>();
  clientsByLogin = new Map<SokiAuthLogin, Set<WebSocket>>();
  private visits = new Map<WebSocket, SokiVisit>();
  // Клиенты с ролью TOP: их визиты продолжают храниться в `visits` (нужны для рассылок), но не участвуют в онлайне.
  private topClients = new Set<WebSocket>();
  private clientIps = new Map<WebSocket, string>();
  private abortedRequestIdsSet = new Set<string>();
  private sockets = new Set<WebSocket>();
  private isAliveBySocket = new WeakMap<WebSocket, boolean>();
  private errorRateLimits = new WeakMap<WebSocket, { ts: number; count: number }>();
  readonly onOnlineCountChangeEvent = Eventer.createValue<{
    count: number;
    login: SokiAuthLogin | nil;
    isEnter: boolean;
  }>();
  readonly onClientCloseEvent = Eventer.createValue<WebSocket>();
  readonly onClientVisitChangeEvent = Eventer.createValue<WebSocket>();
  readonly onClientAuthChangeEvent = Eventer.createValue<{
    client: WebSocket;
    previousLogin: SokiAuthLogin | nil;
    login: SokiAuthLogin | nil;
  }>();

  /** Считает онлайновые визиты без TOP-клиентов: набор `topClients` заполняется асинхронно при проверке роли, поэтому сам счётчик остаётся синхронным. */
  private takeOnlineVisitsCount() {
    let count = 0;

    this.visits.forEach((_, client) => {
      if (this.topClients.has(client)) return;
      count++;
    });

    return count;
  }

  /** Уточняет роль клиента перед учётом визита: TOP-пользователи помечаются в `topClients`, остальные снимаются с пометки. `takeUserTiny` кэширует пользователей в памяти, поэтому повторная проверка того же логина не ходит в БД. */
  private async syncClientTopRole(client: WebSocket, login: SokiAuthLogin | nil) {
    if (!login) {
      this.topClients.delete(client);
      return;
    }

    const user = await takeUserTiny({ l: login }, false);

    if (user?.r === 'TOP') this.topClients.add(client);
    else this.topClients.delete(client);
  }

  get onlineCount() {
    return this.takeOnlineVisitsCount();
  }

  takeClientLangi(client: WebSocket): Langi | nil {
    return this.visits.get(client)?.langi ?? takeUserLangi(this.auths.get(client)?.login);
  }

  takeClientVisit(client: WebSocket) {
    return this.visits.get(client);
  }

  takeClientIp(client: WebSocket) {
    return this.clientIps.get(client) ?? null;
  }

  get onlineLogins() {
    const logins = new Set<SokiAuthLogin>();
    let anon = 0;

    // TOP-клиенты пропускаются целиком: анонимом TOP-пользователь быть не может, поэтому их визиты не попадают ни в логины, ни в анонимный счётчик.
    this.visits.forEach((_, client) => {
      if (this.topClients.has(client)) return;

      const login = this.auths.get(client)?.login;

      if (login) logins.add(login);
      else anon++;
    });

    return { logins: [...logins], anon };
  }

  private notifyOnlineCount(login: SokiAuthLogin | nil = null, isEnter = true) {
    this.onOnlineCountChangeEvent.invoke({ count: this.onlineCount, login, isEnter });
  }

  private checkErrorRate(client: WebSocket) {
    const now = Date.now();
    const rate = this.errorRateLimits.get(client);

    if (!rate || now - rate.ts >= howMillisecondsInMin) {
      this.errorRateLimits.set(client, { ts: now, count: 1 });
      return true;
    }

    if (rate.count >= errorsPerSocketPerMinute) return false;

    rate.count++;
    return true;
  }

  start() {
    const ws = new WebSocketServer({ noServer: true }).on('connection', (client, req) => {
      this.sockets.add(client);
      this.clientIps.set(
        client,
        ('' + (req.headers['x-forwarded-for'] ?? '')).split(',')[0].trim() || req.socket.remoteAddress || '',
      );
      this.isAliveBySocket.set(client, true);
      client.on('pong', () => this.isAliveBySocket.set(client, true));

      client.on('close', () => {
        const auth = this.auths.get(client);
        const wasOnline = this.takeOnlineVisitsCount();

        this.sockets.delete(client);
        this.clients.delete(client);
        this.visits.delete(client);
        this.topClients.delete(client);
        this.auths.delete(client);
        this.clientIps.delete(client);

        this.onClientCloseEvent.invoke(client);

        // Счётчик онлайна сравнивается без TOP-клиентов, поэтому событие уходит только при реальном изменении учтённого числа.
        if (this.takeOnlineVisitsCount() !== wasOnline) this.notifyOnlineCount(auth?.login ?? null, false);
        if (checkIsUndefined(auth?.login)) return;
        this.clientsByLogin.get(auth.login)?.delete(client);
      });

      client.on('message', async data => {
        const event: TsjrpcFromClientEvent = JSON.parse('' + data);

        if (checkIsNotUndefined(event.abort)) {
          this.abortedRequestIdsSet.add(event.abort);
          return;
        }

        if (checkIsNotUndefined(event.token)) {
          if (!event.stopAll) this.clients.add(client);

          const printVisit = async (login: SokiAuthLogin | nil) => {
            const previousOnline = this.takeOnlineVisitsCount();

            // Роль уточняется до записи визита: TOP-клиент не должен попасть в счётчик онлайна даже на время одной рассылки.
            await this.syncClientTopRole(client, login);

            const visitInfo = event.visitInfo;

            if (checkIsNotUndefined(visitInfo)) {
              this.visits.set(client, visitInfo);
              if (login) saveUserLangi(login, visitInfo.langi);
              this.onClientVisitChangeEvent.invoke(client);

              // Логируем все нелокальные визиты; визиты пользователей с ролью TOP отсеиваются внутри insertVisit.
              if (!this.isLocalhost(visitInfo.urls[0])) insertVisit(login, visitInfo).catch(emptyFunc);
            }

            // Счётчик онлайна сравнивается без TOP-клиентов: событие уходит только при реальном изменении учтённого числа, `isEnter` отражает направление изменения.
            const online = this.takeOnlineVisitsCount();
            if (online !== previousOnline) this.notifyOnlineCount(login, online > previousOnline);
          };

          if (checkIsNull(event.token)) {
            this.send({ requestId: event.requestId }, client);

            await printVisit(null).catch(emptyFunc);

            return;
          }

          try {
            jwt.verify(event.token, tokenSecretFileStore.getValue().token);
          } catch (error) {
            if (error instanceof JsonWebTokenError) {
              this.send({ errorMessage: SokiError.InvalidToken, requestId: event.requestId }, client);
              return;
            }
          }

          const auth = jwt.decode(event.token) as UserAuth | nil;

          await printVisit(auth?.login).catch(emptyFunc);

          if (auth) {
            const previousLogin = this.auths.get(client)?.login ?? null;
            const login = auth.login ?? null;

            this.auths.set(client, auth);

            if (auth.login) {
              if (!this.clientsByLogin.has(auth.login)) this.clientsByLogin.set(auth.login, new Set());
              this.clientsByLogin.get(auth.login)?.add(client);
            }

            if (previousLogin !== login) {
              if (previousLogin != null) this.clientsByLogin.get(previousLogin)?.delete(client);
              this.onClientAuthChangeEvent.invoke({ client, previousLogin, login });
            }
          }

          this.send({ requestId: event.requestId }, client);
          return;
        }

        const auth = this.auths.get(client);
        const visitInfo = this.visits.get(client);

        if (checkIsNotUndefined(event.errorMessage)) {
          if (auth?.login && !this.isLocalhost(visitInfo?.urls[0]) && this.checkErrorRate(client))
            insertDashMessage(
              escapeHtmlLazy()(event.errorMessage),
              visitInfo,
              DashMessageKind.VisitError,
              auth?.login,
            ).catch(emptyFunc);
        }

        if (checkIsUndefined(event.invoke)) return;

        tsjrpcBaseServerNext({
          invoke: event.invoke,
          sendResponse: this.sendInvokeEvent,
          tool: { client, auth, visitInfo },
          requestId: event.requestId,
        });
      });
    });

    console.info('SokiServer started!!!');

    setInterval(() => {
      this.sockets.forEach(client => {
        if (client.readyState !== WebSocket.OPEN || !this.isAliveBySocket.get(client)) {
          client.terminate();
          return;
        }

        this.isAliveBySocket.set(client, false);
        client.ping();
      });
    }, 30_000);

    return ws;
  }

  send(event: TsjrpcFromServerEvent, clientSelector: SokiServerClientSelector | nil | void) {
    if (clientSelector instanceof WebSocket) {
      clientSelector.send(JSON.stringify(event));
      return;
    }

    if (clientSelector == null) {
      this.clients.forEach(sendToEachClient, JSON.stringify(event));
      return;
    }

    const stringEvent = JSON.stringify(event);
    if (checkIsFunction(clientSelector)) {
      this.clients.forEach(client => {
        if (clientSelector(this.visits.get(client), this.auths.get(client), client)) client.send(stringEvent);
      });
      return;
    }

    if ('forEach' in clientSelector) {
      if (!checkIsFunction(clientSelector.forEach)) return;
      clientSelector.forEach((client: WebSocket) => client.send(stringEvent));
      return;
    }

    if ('logins' in clientSelector) {
      clientSelector.logins.forEach(login => {
        this.clientsByLogin.get(login)?.forEach(client => {
          client.send(stringEvent);
        });
      });

      return;
    }

    this.clientsByLogin.get(clientSelector.login)?.forEach(client => {
      if (clientSelector.ignoreClient !== client) client.send(stringEvent);
    });
  }

  private sendInvokeEvent = ({ error, invokedResult, ...event }: TSJRPCEvent, tool: ServerTSJRPCTool) => {
    if (this.abortedRequestIdsSet.has(event.requestId)) {
      this.abortedRequestIdsSet.delete(event.requestId);
      return;
    }

    let errorMessage;

    if (error) {
      console.info(error);

      const rawErrorMessage =
        error instanceof DrizzleQueryError ? backLocaleError(BackLocaleKey.ServerError) : `${error}`;
      errorMessage = localizeBackLocaleErrorPayload(rawErrorMessage, tool.visitInfo?.langi);
    }

    this.send(
      {
        ...event,
        errorMessage,
        invokedResult: checkIsObject(invokedResult) && 'value' in invokedResult ? invokedResult.value : invokedResult,
      },
      tool.client,
    );
  };

  private isLocalhost = (url: string | nil) =>
    !url ||
    url.includes('localhost') ||
    url.split(makeRegExp('/^[^?]+?\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}:\\d{3,5}/'), 2).length > 1;
}

function sendToEachClient(this: string, client: WebSocket) {
  client.send(this);
}

export const sokiServer = new SokiServer();
