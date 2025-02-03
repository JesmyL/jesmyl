/* eslint-disable no-throw-literal */
import { startCrTgAlarm } from 'back/apps/index/crTgAlarm';
import { invitesTgBotListener } from 'back/sides/telegram-bot/invites/invites.bot';
import { tglogger } from 'back/sides/telegram-bot/log/log-bot';
import { SokiServerInvocatorTool } from 'back/SokiInvocatorBase.server';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { InvocatorClientEvent, InvocatorServerEvent, LocalSokiAuth, SokiVisit } from 'shared/api';
import WebSocket, { WebSocketServer } from 'ws';
import { setSharedPolyfills } from '../../../shared/utils/complect/polyfills';
import { scheduleWidgetMessageCatcher } from '../../apps/index/schedules/tg-bot-inform/message-catchers';
import { baseMessagesCatcher } from '../../sides/telegram-bot/message-catchers';
import { ErrorCatcher } from '../ErrorCatcher';
import { FileStore } from '../FileStore';
import { onSokiServerEventerInvocatorInvoke } from './eventers';
import { SokiServerClientSelector } from './model';

export const tokenSecretFileStore = new FileStore<{ token: string }>('/.tokenSecret', { token: '' });
// tokenSecretFileStore.setValue({ token: randomBytes(60).toString('hex') });

setSharedPolyfills();
ErrorCatcher.logAllErrors();

export class SokiServer {
  private clients = new Set<WebSocket>();
  private auths = new Map<WebSocket, LocalSokiAuth>();
  private visits = new Map<WebSocket, SokiVisit>();

  start() {
    new WebSocketServer({ port: 4446 }).on('connection', (client: WebSocket) => {
      this.clients.add(client);
      client.on('close', () => {
        this.clients.delete(client);
        this.auths.delete(client);
        this.visits.delete(client);
      });

      client.on('message', async (data: WebSocket.RawData) => {
        const event: InvocatorClientEvent = JSON.parse('' + data);

        if (event.ping) {
          this.send({ pong: 1, requestId: event.requestId }, client);
          return;
        }

        if (event.token !== undefined) {
          if (event.token === null) {
            this.send({ requestId: event.requestId }, client);

            if (event.visit !== undefined) {
              this.visits.set(client, event.visit);

              if (!event.visit.urls[0]?.includes('localhost'))
                tglogger.visit(`Не авторизованный\n\n${this.visitStringified(event.visit)}\n\n`);
            }

            return;
          }

          try {
            jwt.verify(event.token, tokenSecretFileStore.getValue().token);
          } catch (error) {
            if (error instanceof JsonWebTokenError) {
              this.send({ errorMessage: '#invalid_token', requestId: event.requestId }, client);
              return;
            }
          }

          const auth = jwt.decode(event.token) as LocalSokiAuth;

          if (event.visit !== undefined) {
            this.visits.set(client, event.visit);

            if (!event.visit.urls[0]?.includes('localhost'))
              tglogger.visit(`${this.authStringified(auth)}\n\n${this.visitStringified(event.visit)}\n\n`);
          }

          if (auth) this.auths.set(client, auth);

          this.send({ requestId: event.requestId }, client);
          return;
        }

        const auth = this.auths.get(client);

        if (event.errorMessage !== undefined) {
          const visit = this.visits.get(client);
          if (!visit?.urls[0]?.includes('localhost'))
            tglogger.userErrors(
              `${event.errorMessage}\n\n${this.authStringified(auth)}\n\n${this.visitStringified(visit)}`,
            );
        }

        if (event.invoke === undefined) return;

        onSokiServerEventerInvocatorInvoke.invoke({
          invoke: event.invoke,
          sendResponse: this.sendInvokeEvent,
          tool: { client, auth },
          requestId: event.requestId,
        });
      });
    });

    console.info('SokiServer started!!!');
  }

  sendInvokeEvent = (event: InvocatorServerEvent, tool: SokiServerInvocatorTool) => this.send(event, tool.client);

  send(event: InvocatorServerEvent, clientSelector: SokiServerClientSelector) {
    if (clientSelector instanceof WebSocket) {
      clientSelector.send(JSON.stringify(event));
      return;
    }

    if (clientSelector === null) {
      this.clients.forEach(sendToEachClient, JSON.stringify(event));
      return;
    }

    const stringEvent = JSON.stringify(event);
    this.clients.forEach(client => {
      if (clientSelector(client, this.auths.get(client))) client.send(stringEvent);
    });
  }

  private visitStringified = (visit: SokiVisit | nil) => {
    if (visit == null) return '';
    return (
      `${visit.urls[0]}\n\n<blockquote expandable>${JSON.stringify(visit, null, 1)}\n` +
      `Разница: ${Date.now() - visit.clientTm}мс</blockquote>`
    );
  };

  private authStringified = (auth: LocalSokiAuth | nil) => {
    return (
      `${auth ? `${auth.fio} t.me/${auth.nick}` : 'Неизвестный'}\n\n` +
      `<blockquote expandable>${auth ? JSON.stringify(auth, null, 1) : ''}</blockquote>`
    );
  };
}

function sendToEachClient(this: string, client: WebSocket) {
  client.send(this);
}

const sokiServer = new SokiServer();

export default sokiServer;

baseMessagesCatcher.register();
scheduleWidgetMessageCatcher.register();

startCrTgAlarm();
invitesTgBotListener();
