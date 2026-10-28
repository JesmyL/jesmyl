import { bigint, pgTable, serial, text } from 'p/d';
import { userDB, UserId } from './user';

export type PushSubscriptionId = NumberBrand<'PushSubscriptionId'>;

export const pushSubscriptionsDB = pgTable('pushSubscriptions', {
  id: serial('id').primaryKey().$type<PushSubscriptionId>().notNull(),

  userId: bigint('userId', { mode: 'number' })
    .notNull()
    .$type<UserId>()
    .references(() => userDB.id, { onDelete: 'cascade' }),

  endpoint: text('endpoint').unique().notNull(),
  p256dh: text('p256dh').notNull(),
  auth: text('auth').notNull(),

  createdAt: bigint('createdAt', { mode: 'number' })
    .notNull()
    .$defaultFn(() => Date.now()),
});
