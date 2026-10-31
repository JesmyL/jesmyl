import { ServerTsjrpcSatisfy } from 'back/complect/model/tsjrpc.satisfy';
import { db, dbDelete, dbUpdate } from 'back/drizzle/drizzle.db';
import { pushSubscriptionsDB, userDB } from 'back/drizzle.schema';
import { takeLogginedAuthOrThrow } from 'back/utils';
import { and, eq } from 'drizzle-orm';
import { PushSubscriptionPayload } from 'shared/api';
import { IndexTsjrpcModel } from 'shared/api/tsjrpc/index/basics.tsjrpc.model';
import { Bool } from 'shared/enums';
import { checkIsNumber, checkIsObject, checkIsString } from 'shared/utils/checkIs';
import { makeRegExp } from 'regexpert';
import { takeVapidPublicKey } from '../../schedules/app-inform/web-push';
import { takeUserTiny } from '../../tinies/userTiny';

const pushServiceHostsReg = makeRegExp(
  '/^(fcm[.]googleapis[.]com|updates[.]push[.]services[.]mozilla[.]com|web[.]push[.]apple[.]com)$/',
);

const takeValidPushEndpoint = (endpoint: string) => {
  let url: URL;

  try {
    url = new URL(endpoint);
  } catch {
    throw 'Некорректная push-подписка: неверный endpoint';
  }

  if (url.protocol !== 'https:' || !pushServiceHostsReg.test(url.hostname))
    throw 'Некорректная push-подписка: недопустимый push-сервис';

  return endpoint;
};

const takeCheckedEndpoint = (endpoint: unknown) => {
  if (!checkIsString(endpoint) || !endpoint)
    throw 'Некорректная push-подписка: не указан endpoint';

  return endpoint;
};

const parsePushSubscription = (subscription: unknown): PushSubscriptionPayload => {
  if (!checkIsObject(subscription) || !checkIsString(subscription.endpoint) || !subscription.endpoint)
    throw 'Некорректная push-подписка: не указан endpoint';

  const endpoint = takeValidPushEndpoint(subscription.endpoint);
  const keys = subscription.keys;

  if (!checkIsObject(keys) || !checkIsString(keys.p256dh) || !checkIsString(keys.auth))
    throw 'Некорректная push-подписка: отсутствуют ключи шифрования';

  return {
    endpoint,
    keys: { p256dh: keys.p256dh, auth: keys.auth },
  };
};

const takeUserEndpointWhere = async (endpoint: unknown, tool: { auth: Parameters<typeof takeLogginedAuthOrThrow>[0] }) => {
  const auth = takeLogginedAuthOrThrow(tool.auth);
  const user = await takeUserTiny({ l: auth.login });

  return and(
    eq(pushSubscriptionsDB.endpoint, takeCheckedEndpoint(endpoint)),
    eq(pushSubscriptionsDB.userId, user.id),
  )!;
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
        set: {
          userId: user.id,
          p256dh: keys.p256dh,
          auth: keys.auth,
        },
      });
  },

  unsubscribePush: async ({ endpoint }, tool) => {
    await dbDelete(pushSubscriptionsDB, await takeUserEndpointWhere(endpoint, tool));
  },

  getPushSettings: async (_, tool) => {
    const auth = takeLogginedAuthOrThrow(tool.auth);

    const [user] = await db
      .select({ mutedUntil: userDB.mutedUntil, isSilent: userDB.isSilent })
      .from(userDB)
      .where(eq(userDB.l, auth.login));

    return { value: { mutedUntil: user?.mutedUntil, isSilent: user?.isSilent ?? Bool.False } };
  },

  updatePushSettings: async ({ mutedUntil, isSilent }, tool) => {
    const auth = takeLogginedAuthOrThrow(tool.auth);

    await dbUpdate(
      userDB,
      {
        mutedUntil: checkIsNumber(mutedUntil) ? mutedUntil : null,
        isSilent: isSilent === Bool.True ? Bool.True : Bool.False,
      },
      eq(userDB.l, auth.login),
    );
  },
} satisfies ServerTsjrpcSatisfy<IndexTsjrpcModel>;
