import { WebSocket } from 'ws';
import smylib from '../../../shared/SMyLib';
import { SokiAuther, sokiAuther } from '../SokiAuther';
import { LocalSokiAuth, SokiServerDoAction, SokiServerDoActionProps } from '../soki.model';
import { SokiServerVisits } from './60-Visits';

export class SokiServerConnection extends SokiServerVisits implements SokiServerDoAction<'Connect'> {
  protected onClientDisconnect(client: WebSocket) {
    const disconnecter = this.capsules.get(client);
    const isDeleted = this.capsules.delete(client);

    smylib.keys(this.subscriptions).forEach(subKey => {
      if (this.subscriptions[subKey].map.delete(client)) this.subscriptions[subKey].onClientUnsubscribe(client);
    });

    this.sendStatistic();

    if (isDeleted && disconnecter) {
      console.info(`DISCONNECTED: ${disconnecter.auth?.fio || 'Unknown'}`);
    } else {
      console.info('Disconnected Unknown client');
    }
  }

  async doOnConnect({ appName, client, eventBody, eventData, requestId }: SokiServerDoActionProps) {
    if (eventBody.connect === undefined) return false;

    if (eventData.auth === undefined) {
      this.setVisit({
        version: eventData.version,
        deviceId: eventData.deviceId,
        browser: eventData.browser,
        nick: '',
        urls: eventData.urls,
      });
      this.send({ authorized: false, appName: eventData.appName }, client);
      return true;
    }

    const sendErrorMessage = (errorMessage: string) => {
      this.send(
        {
          requestId,
          unregister: true,
          errorMessage,
          appName,
        },
        client,
      );
    };

    let auth: LocalSokiAuth | null;
    const passw = eventData.auth.passw;

    if (eventData.auth.tgId) {
      const passw = SokiAuther.makePassw(eventData.auth.tgId, eventData.auth.nick);
      if (eventData.auth.passw !== passw) {
        sendErrorMessage('Данные авторизации устарели');
        return false;
      }

      auth = await SokiAuther.getTgAuth(eventData.auth.tgId, null, sendErrorMessage);
    } else {
      const eventLogin = eventData.auth.login;
      const secretPassw = passw && smylib.md5(passw);
      auth =
        (eventLogin &&
          secretPassw &&
          sokiAuther.authList?.find(({ login, passw }) => eventLogin === login && secretPassw === passw)) ||
        null;
    }

    if (auth) {
      if (auth.level < 100 && auth.nick !== undefined)
        this.setVisit({
          version: eventData.version,
          fio: auth.fio,
          nick: auth.nick,
          tgId: auth.tgId,
          deviceId: eventData.deviceId,
          browser: eventData.browser,
          urls: eventData.urls,
        });

      this.capsules.set(client, {
        auth,
        deviceId: eventData.deviceId,
        version: eventData.version,
        urls: eventData.urls,
      });
      this.clients.set(eventData.deviceId, client);

      this.send({ authorized: true, appName }, client);

      const infoText = `Client ${
        auth.fio !== undefined && auth.fio !== auth.nick ? `${auth.fio} (${auth.nick})` : auth.nick ?? '???'
      } connected`;

      console.info(infoText);

      if (auth.level !== eventData.auth.level || auth.nick !== eventData.auth.nick || auth.fio !== eventData.auth.fio)
        this.send(
          {
            appName: 'index',
            pull: {
              appName: 'index',
              contents: [[{ key: 'auth', value: { ...auth, passw } }], []],
              updates: [null, null, null, null],
            },
          },
          client,
        );
    } else sendErrorMessage('Некорректные данные авторизации');

    return false;
  }
}
