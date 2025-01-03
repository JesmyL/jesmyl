import { User } from 'node-telegram-bot-api';
import { LocalSokiAuth, SokiAuth, SokiClientEventBody } from 'shared/api';
import { smylib } from 'shared/utils';
import { controlTelegramBot } from '../../sides/telegram-bot/control/control-bot';
import { prodTelegramBot } from '../../sides/telegram-bot/prod/prod-bot';
import { supportTelegramBot } from '../../sides/telegram-bot/support/support-bot';
import { JesmylTelegramBot } from '../../sides/telegram-bot/tg-bot';
import { filer } from '../filer/Filer';
import { SokiAutherUtils } from './utils';

export class SokiAuther {
  mtime = 0;

  get authList(): SokiAuth[] | undefined {
    return filer.contents.admin.userList.data;
  }

  isCorrectData(user?: LocalSokiAuth | null) {
    return new Promise(res => {
      const userLogin = user?.login;
      if (!user || !user.login) {
        res(false);
        return;
      }
      const userPassw = user?.passw;
      const auth = this.authList?.find(({ login }) => userLogin === login);

      if (!auth || (userPassw && smylib.md5(userPassw) !== auth.passw)) res(false);
      else res(true);
    });
  }

  makePassw = SokiAutherUtils.makePassw;
  static makePassw = SokiAutherUtils.makePassw;

  static getTgAuth = async (
    tgId: number,
    tgAva?: string | null,
    onError?: (errorMessage: string) => void,
  ): Promise<LocalSokiAuth | null> => {
    const admin = supportTelegramBot.admins[tgId];
    let user: User | und = admin?.user;

    try {
      user = (await prodTelegramBot.tryIsUserMember(tgId)).user;
    } catch (err) {
      onError?.('Пользователь не состоит в канале');

      return null;
    }

    if (user == null) {
      onError?.('Нет публичного имени');
      return null;
    }

    let level = 3;

    if (admin !== undefined) {
      if (admin.status === 'creator') level = 100;
      else {
        const adminLevel = parseInt((admin as any).custom_title);
        if (!isNaN(adminLevel)) level = adminLevel;
      }
    }

    const nick = user.username || controlTelegramBot.convertNickFromId(user.id);

    return {
      level,
      nick,
      fio: `${user.first_name}${user.last_name !== undefined ? ` ${user.last_name}` : ''}`,
      login: JesmylTelegramBot.makeLoginFromId(user.id),
      passw: this.makePassw(user.id, nick),
      tgId: user.id,
      tgAva: tgAva === null ? undefined : tgAva,
    };
  };

  authenticate(event: SokiClientEventBody['authorization']) {
    return new Promise<SokiAuth>((res, rej) => {
      try {
        if (event) {
          const eventLogin = event.value.login;
          const passw = event.value.passw;
          const secretPassw = smylib.md5(passw);
          const user = this.authList?.find(({ login }) => eventLogin === login);

          if (event.type === 'register') {
            if (user) {
              rej('Такой логин уже есть!');
              return;
            }

            const auth: SokiAuth = {
              level: 3,
              fio: event.value.fio,
              nick: event.value.nick,
              login: eventLogin,
              passw: secretPassw,
            };

            this.authList?.push(auth);

            filer.saveChanges(['userList'], 'admin').then(() => res({ ...auth, passw }));
          } else {
            if (user?.passw === secretPassw) res({ ...user, passw });
            else rej('Неверные данные');
          }
        } else rej('Неизвестная ошибка #9384510');
      } catch (e) {
        rej('Неизвестная ошибка #187265');
      }
    });
  }
}

export const sokiAuther = new SokiAuther();
