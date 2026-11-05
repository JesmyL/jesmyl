import { backConfig } from 'back/config/backConfig';
import { backLocaleError } from 'back/locales/back';
import { takeUserLangi } from 'back/complect/userLangiFileStore';
import { BackLocaleKey } from 'shared/model/+locale/_BackLocaleKey';
import { pushSubscriptionsDB, userDB } from 'back/drizzle.schema';
import { db, dbDelete } from 'back/drizzle/drizzle.db';
import { lazyEnvJson } from 'back/envJson';
import { eq, inArray } from 'drizzle-orm';
import { Langi, SchedulePushPayload, UserId } from 'shared/api';
import { checkIsFunction, checkIsNumber, checkIsObject } from 'shared/utils/checkIs';
import webpush from 'web-push';

const pushBodyMaxLength = 200;

const takeVapidDetails = () => {
  const { VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, VAPID_SUBJECT } = lazyEnvJson();

  if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY)
    throw backLocaleError(BackLocaleKey.VapidKeysMissing);

  return {
    subject: VAPID_SUBJECT,
    publicKey: VAPID_PUBLIC_KEY,
    privateKey: VAPID_PRIVATE_KEY,
  };
};

export const takeVapidPublicKey = () => takeVapidDetails().publicKey;

export const sendSchedulePush = async (
  userIds: UserId[],
  payload: SchedulePushPayload | ((langi: Langi) => SchedulePushPayload),
) => {
  if (backConfig.isTest) return;

  const actualUserIds = [...new Set(userIds)];
  if (actualUserIds.length === 0) return;

  const users = await db
    .select({ id: userDB.id, l: userDB.l, mutedUntil: userDB.mutedUntil, isSilent: userDB.isSilent })
    .from(userDB)
    .where(inArray(userDB.id, actualUserIds));

  const subscriptions = await db
    .select()
    .from(pushSubscriptionsDB)
    .where(inArray(pushSubscriptionsDB.userId, actualUserIds));

  const now = Date.now();
  const usersById = new Map(users.map(user => [user.id, user] as const));

  const actualSubscriptions = subscriptions.flatMap(subscription => {
    const user = usersById.get(subscription.userId);

    return user != null && (user.mutedUntil == null || user.mutedUntil <= now)
      ? [{ subscription, isSilent: user.isSilent, langi: takeUserLangi(user.l) ?? Langi.Ru }]
      : [];
  });

  if (actualSubscriptions.length === 0) return;

  const vapidDetails = takeVapidDetails();
  const bodiesByLangi = new Map<Langi, [string, string]>();
  const takeBodies = (langi: Langi): [string, string] => {
    let bodies = bodiesByLangi.get(langi);
    if (bodies) return bodies;

    const actualPayload = checkIsFunction<(langi: Langi) => SchedulePushPayload>(payload)
      ? payload(langi)
      : payload;
    const makeBody = (silent: boolean) =>
      JSON.stringify({ ...actualPayload, silent, body: actualPayload.body.slice(0, pushBodyMaxLength) });

    bodies = [makeBody(false), makeBody(true)];
    bodiesByLangi.set(langi, bodies);

    return bodies;
  };

  await Promise.allSettled(
    actualSubscriptions.map(async ({ subscription, isSilent, langi }) => {
      try {
        await webpush.sendNotification(
          {
            endpoint: subscription.endpoint,
            keys: { p256dh: subscription.p256dh, auth: subscription.auth },
          },
          takeBodies(langi)[isSilent],
          { vapidDetails, TTL: 3600 },
        );
      } catch (error) {
        const statusCode =
          checkIsObject(error) && 'statusCode' in error && checkIsNumber(error.statusCode) ? error.statusCode : null;

        if (statusCode === 404 || statusCode === 410) {
          await dbDelete(pushSubscriptionsDB, eq(pushSubscriptionsDB.id, subscription.id));
          return;
        }

        console.error('Web push sending error', error);
      }
    }),
  );
};
