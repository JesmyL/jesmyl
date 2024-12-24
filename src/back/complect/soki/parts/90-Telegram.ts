import { User } from 'node-telegram-bot-api';
import { SokiServerDoAction, SokiServerDoActionProps, TelegramNativeAuthUserData } from 'shared/api';
import { tglogger } from '../../../sides/telegram-bot/log/log-bot';
import { supportTelegramAuthorizations } from '../../../sides/telegram-bot/prod/authorize';
import { SokiAuther } from '../SokiAuther';
import { SokiServerServices } from './80-Services';

export class SokiServerTelegram extends SokiServerServices implements SokiServerDoAction<`${'Telegram'}${'Auth'}`> {
  async doOnTelegramAuth({ client, eventBody, requestId }: SokiServerDoActionProps) {
    if (eventBody.tgNativeAuthorization === undefined && eventBody.tgAuthorization === undefined) return false;

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

    let user: User | TelegramNativeAuthUserData;
    let tgAva: string | nil = null;
    let authTypePrefix = 'TG: ';

    if (eventBody.tgNativeAuthorization !== undefined) {
      user = eventBody.tgNativeAuthorization;
      tgAva = user.photo_url;
      authTypePrefix = 'TGI: ';
    } else {
      const authId = eventBody.tgAuthorization!;

      if (supportTelegramAuthorizations[authId] === undefined) {
        sendErrorMessage('Не верный код');
        return true;
      }
      user = supportTelegramAuthorizations[authId]().from;
    }

    tglogger.authorizations(
      authTypePrefix + user.first_name + ' ' + (user.last_name || '') + (user.username ? ` t.me/${user.username}` : ''),
    );

    const auth = await SokiAuther.getTgAuth(user.id, tgAva, sendErrorMessage);

    if (auth == null) return true;

    this.send(
      {
        requestId,
        tgAuthorization: {
          ok: true,
          value: auth,
        },
        appName: 'index',
      },
      client,
    );

    return false;
  }
}
