import { ServerTsjrpcSatisfy } from 'back/complect/model/tsjrpc.satisfy';
import { db, dbDelete } from 'back/drizzle/drizzle.db';
import { pushSubscriptionsDB } from 'back/drizzle.schema';
import { takeLogginedAuthOrThrow } from 'back/utils';
import { and, eq } from 'drizzle-orm';
import { PushSubscriptionPayload } from 'shared/api';
import { IndexTsjrpcModel } from 'shared/api/tsjrpc/index/basics.tsjrpc.model';
import { checkIsObject, checkIsString } from 'shared/utils/checkIs';
import { makeRegExp } from 'regexpert';
import { takeVapidPublicKey } from '../../schedules/tg-bot-inform/web-push';
import { takeUserTiny } from '../../tinies/userTiny';

const pushServiceHostsReg = makeRegExp(
  '/^(fcm[.]googleapis[.]com|updates[.]push[.]services[.]mozilla[.]com|web[.]push[.]apple[.]com)$/',
);

const takeValidPushEndpoint = (endpoint: string) => {
  let url: URL;

  try {
    url = new URL(endpoint);
  } catch {
    throw new Error('Некорректная push-подписка: неверный endpoint');
  }

  if (url.protocol !== 'https:' || !pushServiceHostsReg.test(url.hostname))
    throw new Error('Некорректная push-подписка: недопустимый push-сервис');

  return endpoint;
};

const parsePushSubscription = (subscription: unknown): PushSubscriptionPayload => {
  if (!checkIsObject(subscription) || !checkIsString(subscription.endpoint) || !subscription.endpoint)
    throw new Error('Некорректная push-подписка: не указан endpoint');

  const endpoint = takeValidPushEndpoint(subscription.endpoint);
  const keys = subscription.keys;

  if (!checkIsObject(keys) || !checkIsString(keys.p256dh) || !checkIsString(keys.auth))
    throw new Error('Некорректная push-подписка: отсутствуют ключи шифрования');

  return {
    endpoint,
    keys: { p256dh: keys.p256dh, auth: keys.auth },
  };
};

export const indexPushMethods = {
  getPushVapidPublicKey: () => ({ value: takeVapidPublicKey() }),

  subscribePush: async ({ subscription }, tool) => {
    const auth = takeLogginedAuthOrThrow(tool.auth);
    const user = await takeUserTiny({ l: auth.login });
    const { endpoint, keys } = parsePushSubscription(subscription);

    await db
      .insert(pushSubscriptionsDB)
      .values({ userId: user.id, endpoint, p256dh: keys.p256dh, auth: keys.auth })
      .onConflictDoUpdate({
        target: pushSubscriptionsDB.endpoint,
        set: { userId: user.id, p256dh: keys.p256dh, auth: keys.auth },
      });
  },

  unsubscribePush: async ({ endpoint }, tool) => {
    if (!checkIsString(endpoint) || !endpoint)
      throw new Error('Некорректная push-подписка: не указан endpoint');

    const auth = takeLogginedAuthOrThrow(tool.auth);
    const user = await takeUserTiny({ l: auth.login });
    const where = and(
      eq(pushSubscriptionsDB.endpoint, endpoint),
      eq(pushSubscriptionsDB.userId, user.id),
    );

    await dbDelete(pushSubscriptionsDB, where!);
  },
} satisfies ServerTsjrpcSatisfy<IndexTsjrpcModel>;
