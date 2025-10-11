import { tokenSecretFileStore } from 'back/complect/soki/file-stores';
import { prodTelegramBot } from 'back/sides/telegram-bot/prod/prod-bot';
import { supportTelegramBot } from 'back/sides/telegram-bot/support/support-bot';
import { JesmylTelegramBot } from 'back/sides/telegram-bot/tg-bot';
import jwt from 'jsonwebtoken';
import TelegramBot from 'node-telegram-bot-api';
import { LocalSokiAuth, TelegramNativeAuthUserData } from 'shared/api';
import { smylib } from 'shared/utils';

const makeAuthFromUser = async (user: OmitOwn<TelegramBot.User, 'is_bot'>) => {
  try {
    await prodTelegramBot.tryIsUserMember(user.id);
  } catch (_error) {
    throw new Error('Не состоит в канале');
  }

  const admin = (await supportTelegramBot.getAdmins()).find(admin => admin.user.id === user.id);

  return {
    level: admin
      ? admin.status === 'creator'
        ? 100
        : 'custom_title' in admin && smylib.isStr(admin.custom_title)
          ? +admin.custom_title || 3
          : 3
      : 3,
    nick: user.username,
    tgId: user.id,
    login: JesmylTelegramBot.makeLoginFromId(user.id),
    fio: `${user.first_name}${user.last_name ? ` ${user.last_name}` : ''}`,
  } satisfies LocalSokiAuth;
};

export const indexAuthByTgUser =
  (title: string) =>
  async ({ user }: { user: TelegramNativeAuthUserData }) => {
    const auth = await makeAuthFromUser(user);

    return {
      value: {
        auth,
        token: jwt.sign(auth, tokenSecretFileStore.getValue().token, { expiresIn: '100 D' }),
      },
      description:
        `Авторизация ${auth?.fio} (@${auth?.nick ?? '??'}) ${title}\n\n` +
        `<blockquote expandable>${JSON.stringify(auth, null, 1)}</blockquote>`,
    };
  };
