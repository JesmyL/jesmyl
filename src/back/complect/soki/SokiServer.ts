/* eslint-disable no-throw-literal */
import { startCrTgAlarm } from 'back/apps/index/crTgAlarm';
import { invitesTgBotListener } from 'back/sides/telegram-bot/invites/invites.bot';
import { tglogger } from 'back/sides/telegram-bot/log/log-bot';
import jwt from 'jsonwebtoken';
import { InvocatorEvent, LocalSokiAuth } from 'shared/api';
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
  private auths = new Map<WebSocket, LocalSokiAuth | und>();

  start() {
    new WebSocketServer({ port: 4446 }).on('connection', (client: WebSocket) => {
      this.clients.add(client);
      client.on('close', () => this.clients.delete(client));

      setTimeout(() => {
        const auth = this.auths.get(client);
        if (auth == null) return;
        tglogger.visit(JSON.stringify(auth, null, 1));
      }, 1000);

      client.on('message', async (data: WebSocket.RawData) => {
        const event: InvocatorEvent = JSON.parse('' + data);

        if (event.ping) {
          client.send(JSON.stringify({ pong: 1 }));
          return;
        }

        if (event.errorMessage) tglogger.userErrors(event.errorMessage);

        if (event.invoke) {
          let auth = this.auths.get(client);

          if (auth === undefined && event.token && jwt.verify(event.token, tokenSecretFileStore.getValue().token)) {
            auth = jwt.decode(event.token) as never;
          }

          this.auths.set(client, auth);

          onSokiServerEventerInvocatorInvoke.invoke({
            invoke: event.invoke,
            sendResponse: (event, tool) => tool.client.send(JSON.stringify(event)),
            tool: { client, auth },
            requestId: event.requestId,
          });

          return;
        }
      });
    });

    console.info('SokiServer started!!!');
  }

  send(event: InvocatorEvent, clientScalar: SokiServerClientSelector) {
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
