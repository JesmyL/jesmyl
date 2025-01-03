/* eslint-disable no-throw-literal */
import { startCrTgAlarm } from 'back/apps/index/crTgAlarm';
import { invitesTgBotListener } from 'back/sides/telegram-bot/invites/invites.bot';
import { SokiClientEvent, SokiServerDoActionProps } from 'shared/api';
import WebSocket, { WebSocketServer } from 'ws';
import { setSharedPolyfills } from '../../../shared/utils/complect/polyfills';
import { scheduleWidgetMessageCatcher } from '../../apps/index/schedules/tg-bot-inform/message-catchers';
import { startTgGamerListener } from '../../sides/telegram-bot/gamer/tg-gamer';
import { baseMessagesCatcher } from '../../sides/telegram-bot/message-catchers';
import { ErrorCatcher } from '../ErrorCatcher';
import { SokiServerOtherEvents } from './parts/130-OtherEvents';

setSharedPolyfills();
ErrorCatcher.logAllErrors();

export class SokiServer extends SokiServerOtherEvents {
  start() {
    new WebSocketServer({ port: 4446 }).on('connection', (client: WebSocket) => {
      this.sendStatistic();

      client.on('message', async (data: WebSocket.RawData) => {
        const eventData: SokiClientEvent = JSON.parse('' + data);

        if (eventData.ping === true) {
          this.send({ pong: true, appName: eventData.appName }, client);
          return;
        }

        const doProps: SokiServerDoActionProps = {
          client,
          eventData,
          eventBody: eventData.body,
          appName: eventData.appName,
          requestId: eventData.requestId,
        };

        if (await this.doOnConnect(doProps)) return;
        if (await this.doOnLiveData(doProps)) return;
        if (await this.doOnAuthorization(doProps)) return;
        if (await this.doOnTelegramAuth(doProps)) return;
        if (await this.doOnPullData(doProps)) return;
        if (await this.doOnServiceActions(doProps)) return;
        if (await this.doOnSubscribes(doProps)) return;
        if (await this.doOnExecs(doProps)) return;
        if (await this.doOnShareData(doProps)) return;
        if (await this.doOnGetShared(doProps)) return;
        if (await this.doOnDownloads(doProps)) return;
        if (await this.doOnServerStore(doProps)) return;
        if (await this.doOnOtherEvents(doProps)) return;
      });

      client.on('close', () => this.onClientDisconnect(client));
    });

    console.info('SokiServer started!!!');
  }
}

const sokiServer = new SokiServer();

export default sokiServer;

startTgGamerListener();

baseMessagesCatcher.register();
scheduleWidgetMessageCatcher.register();

startCrTgAlarm();
invitesTgBotListener();
