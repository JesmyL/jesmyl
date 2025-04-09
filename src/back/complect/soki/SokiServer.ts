import { tglogger } from 'back/sides/telegram-bot/log/log-bot';
import { SokiServerInvocatorTool } from 'back/SokiInvocatorBase.server';
import { userAuthStringified, userVisitStringified } from 'back/utils';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import {
  InvocatorClientEvent,
  InvocatorServerEvent,
  LocalSokiAuth,
  SokiAuthLogin,
  SokiError,
  SokiVisit,
} from 'shared/api';
import { makeRegExp, setSharedPolyfills, smylib } from 'shared/utils';
import WebSocket, { WebSocketServer } from 'ws';
import { ErrorCatcher } from '../ErrorCatcher';
import { onSokiServerEventerInvocatorInvoke } from './eventers';
import { tokenSecretFileStore } from './file-stores';
import { SokiServerClientSelector } from './model';

setSharedPolyfills();
ErrorCatcher.logAllErrors();

export class SokiServer {
  private clients = new Set<WebSocket>();
  private auths = new Map<WebSocket, LocalSokiAuth>();
  private clientsByLogin = new Map<SokiAuthLogin, Set<WebSocket>>();
  private visits = new Map<WebSocket, SokiVisit>();
  private abortedRequestIdsSet = new Set<string>();

  start() {
    new WebSocketServer({ port: 4446 }).on('connection', (client: WebSocket) => {
      this.clients.add(client);
      client.on('close', () => {
        const auth = this.auths.get(client);

        this.clients.delete(client);
        this.visits.delete(client);
        this.auths.delete(client);

        if (auth?.login === undefined) return;
        this.clientsByLogin.get(auth.login)?.delete(client);
      });

      client.on('message', async (data: WebSocket.RawData) => {
        const event: InvocatorClientEvent = JSON.parse('' + data);

        if (event.ping) {
          this.send({ pong: 1, requestId: event.requestId }, client);
          return;
        }

        if (event.abort !== undefined) {
          this.abortedRequestIdsSet.add(event.abort);
          return;
        }

        if (event.token !== undefined) {
          if (event.token === null) {
            this.send({ requestId: event.requestId }, client);

            if (event.visit !== undefined) {
              this.visits.set(client, event.visit);

              if (!this.isLocalhost(event.visit.urls[0]))
                tglogger.visit(`Не авторизованный\n\n${userVisitStringified(event.visit)}\n\n`);
            }

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

          const auth = jwt.decode(event.token) as LocalSokiAuth;

          if (event.visit !== undefined) {
            this.visits.set(client, event.visit);

            if (!this.isLocalhost(event.visit.urls[0]))
              tglogger.visit(`${userAuthStringified(auth)}\n\n${userVisitStringified(event.visit)}\n\n`);
          }

          if (auth) {
            this.auths.set(client, auth);

            if (auth.login) {
              if (!this.clientsByLogin.has(auth.login)) this.clientsByLogin.set(auth.login, new Set());
              this.clientsByLogin.get(auth.login)?.add(client);
            }
          }

          this.send({ requestId: event.requestId }, client);
          return;
        }

        const auth = this.auths.get(client);
        const visit = this.visits.get(client);

        if (event.errorMessage !== undefined) {
          if (!this.isLocalhost(visit?.urls[0]))
            tglogger.userErrors(
              `${event.errorMessage}\n\n${userAuthStringified(auth)}\n\n${userVisitStringified(visit)}`,
            );
        }

        if (event.invoke === undefined) return;

        onSokiServerEventerInvocatorInvoke.invoke({
          invoke: event.invoke,
          sendResponse: this.sendInvokeEvent,
          tool: { client, auth, visit },
          requestId: event.requestId,
        });
      });
    });

    console.info('SokiServer started!!!');
  }

  send(event: InvocatorServerEvent, clientSelector: SokiServerClientSelector | nil | void) {
    if (clientSelector instanceof WebSocket) {
      clientSelector.send(JSON.stringify(event));
      return;
    }

    if (clientSelector == null) {
      this.clients.forEach(sendToEachClient, JSON.stringify(event));
      return;
    }

    const stringEvent = JSON.stringify(event);
    if (smylib.isFunc(clientSelector)) {
      this.clients.forEach(client => {
        if (clientSelector(client, this.auths.get(client))) client.send(stringEvent);
      });
      return;
    }

    if ('forEach' in clientSelector) {
      if (!smylib.isFunc(clientSelector.forEach)) return;
      clientSelector.forEach((client: WebSocket) => client.send(stringEvent));
      return;
    }

    this.clientsByLogin.get(clientSelector.login)?.forEach(client => {
      if (clientSelector.ignoreClient !== client) client.send(stringEvent);
    });
  }

  private sendInvokeEvent = (event: InvocatorServerEvent, tool: SokiServerInvocatorTool) => {
    if (this.abortedRequestIdsSet.has(event.requestId)) {
      this.abortedRequestIdsSet.delete(event.requestId);
      return;
    }

    this.send(event, tool.client);
  };

  private isLocalhost = (url: string | nil) =>
    !url ||
    url.includes('localhost') ||
    url.split(makeRegExp('/^[^?]+?\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}:\\d{3,5}/')).length > 1;
}

function sendToEachClient(this: string, client: WebSocket) {
  client.send(this);
}

export const sokiServer = new SokiServer();
