/* eslint-disable no-throw-literal */
import { startCrTgAlarm } from 'back/apps/index/crTgAlarm';
import { invitesTgBotListener } from 'back/sides/telegram-bot/invites/invites.bot';
import { tglogger } from 'back/sides/telegram-bot/log/log-bot';
import jwt from 'jsonwebtoken';
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

const visitStringified = (visit: SokiVisit | nil) => {
  if (visit == null) return '';
  return `${visit.urls[0]}\n\n<code>${JSON.stringify(visit, null, 1)}\nРазница: ${
    Date.now() - visit.clientTm
  }мс</code>`;
};

const authStringified = (auth: LocalSokiAuth | nil) => {
  return (
    `${auth ? `${auth.fio} t.me/${auth.nick}` : 'Неизвестный'}\n\n` +
    `<code>${auth ? JSON.stringify(auth, null, 1) : ''}</code>`
  );
};

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
            return;
          }

          if (!jwt.verify(event.token, tokenSecretFileStore.getValue().token)) {
            this.send({ errorMessage: '#invalid_token', requestId: event.requestId }, client);
            return;
          }

          const auth = jwt.decode(event.token) as LocalSokiAuth;

          if (event.visit !== undefined) {
            this.visits.set(client, event.visit);

            if (!event.visit.urls[0]?.includes('localhost'))
              tglogger.visit(`${authStringified(auth)}\n\n${visitStringified(event.visit)}\n\n`);
          }

          if (auth) this.auths.set(client, auth);

          this.send({ requestId: event.requestId }, client);
          return;
        }

        const auth = this.auths.get(client);

        if (event.errorMessage !== undefined) {
          const visit = this.visits.get(client);
          const title =
            auth !== undefined
              ? `${auth.fio || '?'} ${auth.nick || '?'}`
              : visit !== undefined
                ? `D - ${visit.deviceId}`
                : 'Неизвестный';

          tglogger.userErrors(
            `${event.errorMessage}\n\n${title}\n\n${authStringified(auth)}\n\n${visitStringified(visit)}`,
          );
        }

        if (event.invoke !== undefined) {
          onSokiServerEventerInvocatorInvoke.invoke({
            invoke: event.invoke,
            sendResponse: (event, tool) => this.send(event, tool.client),
            tool: { client, auth },
            requestId: event.requestId,
          });

          return;
        }
      });
    });

    console.info('SokiServer started!!!');
  }

  send(event: InvocatorServerEvent, clientScalar: SokiServerClientSelector) {
    if (clientScalar instanceof WebSocket) {
      clientScalar.send(JSON.stringify(event));
      return;
    }

    const stringEvent = JSON.stringify(event);

    if (clientScalar === null) this.clients.forEach(client => client.send(stringEvent));
    else
      this.clients.forEach(client => {
        if (clientScalar(client, this.auths.get(client))) return;
        client.send(stringEvent);
      });
  }
}

const sokiServer = new SokiServer();

export default sokiServer;

baseMessagesCatcher.register();
scheduleWidgetMessageCatcher.register();

startCrTgAlarm();
invitesTgBotListener();
