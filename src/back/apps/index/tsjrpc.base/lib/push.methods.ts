import { backLocaleError } from 'back/locales/back';
import { BackLocaleKey } from 'shared/model/+locale/_BackLocaleKey';
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
    throw backLocaleError(BackLocaleKey.PushEndpointInvalid);
  }

  if (url.protocol !== 'https:' || !pushServiceHostsReg.test(url.hostname))
    throw backLocaleError(BackLocaleKey.PushServiceInvalid);

  return endpoint;
};

const takeCheckedEndpoint = (endpoint: unknown) => {
  if (!checkIsString(endpoint) || !endpoint)
    throw backLocaleError(BackLocaleKey.PushEndpointMissing);

  return endpoint;
};

const parsePushSubscription = (subscription: unknown): PushSubscriptionPayload => {
  if (!checkIsObject(subscription) || !checkIsString(subscription.endpoint) || !subscription.endpoint)
    throw backLocaleError(BackLocaleKey.PushEndpointMissing);

  const endpoint = takeValidPushEndpoint(subscription.endpoint);
  const keys = subscription.keys;

  if (!checkIsObject(keys) || !checkIsString(keys.p256dh) || !checkIsString(keys.auth))
    throw backLocaleError(BackLocaleKey.PushKeysMissing);

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

  getUserPushInfo: async ({ login }, tool) => {
    takeLogginedAuthOrThrow(tool.auth);

    const [user] = await db
      .select({
        mutedUntil: userDB.mutedUntil,
        isSilent: userDB.isSilent,
        subscriptionEndpoint: pushSubscriptionsDB.endpoint,
      })
      .from(userDB)
      .leftJoin(pushSubscriptionsDB, eq(pushSubscriptionsDB.userId, userDB.id))
      .where(eq(userDB.l, login))
      .limit(1);

    if (user == null) throw backLocaleError(BackLocaleKey.UserNotFound);

    return {
      value: {
        isSilent: user.isSilent,
        hasSubscription: user.subscriptionEndpoint == null ? Bool.False : Bool.True,
        isMuted: user.mutedUntil != null && user.mutedUntil > Date.now() ? Bool.True : Bool.False,
      },
    };
  },
} satisfies ServerTsjrpcSatisfy<IndexTsjrpcModel>;
