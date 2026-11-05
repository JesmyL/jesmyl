import { dashErrorDB } from 'back/drizzle.schema';
import { db } from 'back/drizzle/drizzle.db';
import { desc, isNotNull } from 'drizzle-orm';
import { Langi, UserLogin } from 'shared/api';
import { checkIsNumber, checkIsObject } from 'shared/utils/checkIs';
import { FileStore } from './FileStore';

const userLangiFileStore = new FileStore<PRecord<UserLogin, Langi>>('/.userLangi', {});

const isLangi = (value: unknown): value is Langi =>
  checkIsNumber(value) && (value === Langi.Ru || value === Langi.Ua || value === Langi.Kz || value === Langi.En);

export const takeUserLangi = (login: UserLogin | nil): Langi | nil => {
  if (!login) return null;

  return userLangiFileStore.getValue()[login] ?? null;
};

export const saveUserLangi = (login: UserLogin, langi: Langi) => {
  const langis = userLangiFileStore.getValue();
  if (langis[login] === langi) return;

  userLangiFileStore.setValue({ ...langis, [login]: langi });
};

const takeVisitLangi = (visit: string): Langi | nil => {
  try {
    const parsed = JSON.parse(visit);
    if (!checkIsObject(parsed)) return null;

    return isLangi(parsed.langi) ? parsed.langi : null;
  } catch {
    return null;
  }
};

/** Restores the login → langi dict from the visit info persisted with earlier dash messages. */
export const initUserLangiFileStore = async () => {
  const rows = await db
    .selectDistinctOn([dashErrorDB.l], { l: dashErrorDB.l, visit: dashErrorDB.visit })
    .from(dashErrorDB)
    .where(isNotNull(dashErrorDB.l))
    .orderBy(dashErrorDB.l, desc(dashErrorDB.id));

  const langis = { ...userLangiFileStore.getValue() };
  let isChanged = false;

  rows.forEach(({ l, visit }) => {
    if (!l || langis[l] !== undefined) return;

    const langi = takeVisitLangi(visit);
    if (langi == null) return;

    langis[l] = langi;
    isChanged = true;
  });

  if (isChanged) userLangiFileStore.setValue(langis);
};
