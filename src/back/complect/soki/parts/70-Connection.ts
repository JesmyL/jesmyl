import { TBUsers } from 'back/db/Users';
import { LocalSokiAuth, SokiCapsule, SokiClientEvent, SokiServerDoAction, SokiServerDoActionProps } from 'shared/api';
import { Eventer, smylib } from 'shared/utils';
import { WebSocket } from 'ws';
import { SokiAuther, sokiAuther } from '../SokiAuther';
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
      this.capsulesByDeviceId.delete(disconnecter.deviceId);

      if (disconnecter.auth?.login) {
        this.capsulesByLogin.get(disconnecter.auth.login)?.delete(disconnecter);
      }
      console.info(`DISCONNECTED: ${disconnecter.auth?.fio || 'Unknown'}`);
    } else {
      console.info('Disconnected Unknown client');
    }
  }

  private setCapsule = async (client: WebSocket, auth: LocalSokiAuth | null, eventData: SokiClientEvent) => {
    const capsule: SokiCapsule = {
      auth,
      deviceId: eventData.deviceId,
      version: eventData.version,
      urls: eventData.urls,
      client,
    };
    this.capsules.set(client, capsule);
    Eventer.invokeValue(this.onCapsuleSetValueListeners, capsule);

    this.capsulesByDeviceId.set(capsule.deviceId, capsule);
    if (capsule.auth?.login) {
      const prev = this.capsulesByLogin.get(capsule.auth.login);
      if (prev === undefined) {
        this.capsulesByLogin.set(capsule.auth.login, new Set([capsule]));
      } else {
        prev.add(capsule);
      }
    }
  };

  async doOnConnect({ client, eventBody, eventData, requestId }: SokiServerDoActionProps) {
    if (eventBody.connect === undefined) return false;

    let auth: LocalSokiAuth | null;

    if (eventData.auth === undefined) {
      this.setVisit({
        version: eventData.version,
        deviceId: eventData.deviceId,
        browser: eventData.browser,
        nick: '',
        urls: eventData.urls,
      });

      this.send({ authorized: false, appName: 'index' }, client);

      this.setCapsule(client, null, eventData);
      return true;
    }

    const sendErrorMessage = (errorMessage: string) => {
      this.send(
        {
          requestId,
          unregister: true,
          errorMessage,
          appName: 'index',
        },
        client,
      );
    };

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
      if (auth.fio && auth.login && auth.nick)
        TBUsers.setLastVisitOrCreate(auth.fio, auth.login, auth.nick, auth.tgAva, eventData.auth.tgId);

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

      this.setCapsule(client, auth, eventData);

      this.clients.set(eventData.deviceId, client);

      this.send({ authorized: true, appName: 'index' }, client);

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
