import { tokenSecretFileStore } from 'back/complect/soki/file-stores';
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
    throw new Error('Не состоит в канале');
  }

  return {
    nick: user.username,
    tgId: user.id,
    login: JesmylTelegramBot.makeLoginFromId(user.id),
    fio: `${user.first_name}${user.last_name ? ` ${user.last_name}` : ''}`,
  } satisfies LocalSokiAuth;
};

export const indexAuthByTgUser =
  (title: string) =>
  async ({ user }: { user: TelegramNativeAuthUserData }, { visitInfo }: ServerTSJRPCTool) => {
    const auth = await makeAuthFromUser(user);

    return {
      value: {
        auth,
        token: jwt.sign(auth, tokenSecretFileStore.getValue().token, { expiresIn: '100 D' }),
      },
      description:
        `Авторизация ${auth?.fio} (@${auth?.nick ?? '??'}) ${title}\n\n` +
        `<blockquote expandable>${JSON.stringify(auth, null, 1)}</blockquote>\n\n` +
        `<blockquote expandable>${JSON.stringify(visitInfo, null, 1)}</blockquote>`,
    };
  };
