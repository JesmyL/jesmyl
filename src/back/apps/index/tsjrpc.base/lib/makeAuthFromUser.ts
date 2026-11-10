import { backLocaleError, backLocalePayload, translateBackTexts } from 'back/locales/back';
import { BackLocaleKey } from 'shared/model/+locale/_BackLocaleKey';
import { tokenSecretFileStore } from 'back/complect/soki/file-stores';
import { PostJRPCMessageScope } from 'back/dash/model';
import { prodTelegramBot } from 'back/sides/telegram-bot/prod/prod-bot';
import { JesmylTelegramBot } from 'back/sides/telegram-bot/tg-bot';
import { ServerTSJRPCTool } from 'back/tsjrpc.base.server';
import jwt from 'jsonwebtoken';
import TelegramBot from 'node-telegram-bot-api';
import { LocalSokiAuth, TelegramNativeAuthUserData } from 'shared/api';

const makeAuthFromUser = async (user: OmitOwn<TelegramBot.User, 'is_bot'>) => {
  try {
    await prodTelegramBot.tryIsUserMember(user.id);
  } catch (_error) {
    throw backLocaleError(BackLocaleKey.NotInChannel);
  }

  return {
    nick: user.username,
    tgId: user.id,
    login: JesmylTelegramBot.makeLoginFromId(user.id),
    fio: `${user.first_name}${user.last_name ? ` ${user.last_name}` : ''}`,
  } satisfies LocalSokiAuth;
};

export const indexAuthByTgUser =
  (titleKey: BackLocaleKey) =>
  async ({ user }: { user: TelegramNativeAuthUserData }, { visitInfo }: ServerTSJRPCTool) => {
    const auth = await makeAuthFromUser(user);

    return {
      value: {
        auth,
        token: jwt.sign(auth, tokenSecretFileStore.getValue().token, { expiresIn: '300 D' }),
      },
      description:
        backLocalePayload(langi =>
          translateBackTexts(langi, BackLocaleKey.DashAuthorization, {
            f: auth.fio,
            n: auth.nick ?? '??',
            t: translateBackTexts(langi, titleKey),
          }),
        ) +
        `\n\n<blockquote expandable>${JSON.stringify(auth, null, 1)}</blockquote>\n\n` +
        `<blockquote expandable>${JSON.stringify(visitInfo, null, 1)}</blockquote>`,
      logScope: PostJRPCMessageScope.Support,
    };
  };
