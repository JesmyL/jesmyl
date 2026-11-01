import { DexieDB } from '#shared/lib/DexieDB';
import { dropLegacyLocaleStorage } from './locale.legacy-storage';

/** Cache Storage bucket with the locale dictionaries persisted between sessions. */
const localeCacheName = 'locales';

/** Synthetic request URL: dictionaries are matched locally, without a network round trip. */
const localeCacheUrlPrefix = 'https://locale/';

/**
 * `lc:` and not `loc:`: the legacy cleanup wipes every localStorage key containing `loc:D`,
 * so a `loc:`-prefixed copy of the dynamic dictionaries would be lost on each boot.
 */
const localKeyPrefix = 'lc:';

/** Private single-table IndexedDB keeps the biggest quota and leaves the app database schema untouched. */
const localeIDB = new DexieDB<{ locales: { key: string; value: object }[] }>('locales', {
  locales: { key: true },
});

type LocaleTier = {
  load: (key: string) => Promise<object | null | undefined>;
  save: (key: string, value: object) => Promise<unknown>;
  remove: (key: string) => Promise<unknown>;
};

const openLocaleCache = () => (typeof caches === 'undefined' ? null : caches.open(localeCacheName));

const loadFromIDB = async (key: string) => {
  if (typeof indexedDB === 'undefined') return null;

  return (await localeIDB.tb.locales.get(key))?.value;
};

const loadFromCacheStorage = async (key: string) => {
  const cache = await openLocaleCache();
  const response = await cache?.match(localeCacheUrlPrefix + key);

  return response ? await response.json() : null;
};

const loadFromLocalStorage = async (key: string) => {
  const raw = localStorage.getItem(localKeyPrefix + key);
  if (!raw) return null;

  const parsed: unknown = JSON.parse(raw);

  return typeof parsed === 'object' ? parsed : null;
};

/** An unavailable storage is a failed write, not a silent success: the next tier must take over. */
const saveToIDB = async (key: string, value: object) => {
  if (typeof indexedDB === 'undefined') throw 'IndexedDB is unavailable';

  await localeIDB.tb.locales.put({ key, value });
};

const saveToCacheStorage = async (key: string, value: object) => {
  const cache = await openLocaleCache();
  if (!cache) throw 'Cache Storage is unavailable';

  await cache.put(
    localeCacheUrlPrefix + key,
    new Response(JSON.stringify(value), { headers: { 'Content-Type': 'application/json' } }),
  );
};

const saveToLocalStorage = async (key: string, value: object) =>
  localStorage.setItem(localKeyPrefix + key, JSON.stringify(value));

const removeLocaleFromIDB = async (key: string) => {
  if (typeof indexedDB === 'undefined') return;

  await localeIDB.tb.locales.delete(key);
};

const removeLocaleFromCacheStorage = async (key: string) => {
  const cache = await openLocaleCache();

  await cache?.delete(localeCacheUrlPrefix + key);
};

const removeLocaleFromLocalStorage = async (key: string) => localStorage.removeItem(localKeyPrefix + key);

/** Tiers ordered by available quota, biggest first: localStorage is the tiny last resort. */
const localeTiers: LocaleTier[] = [
  { load: loadFromIDB, save: saveToIDB, remove: removeLocaleFromIDB },
  { load: loadFromCacheStorage, save: saveToCacheStorage, remove: removeLocaleFromCacheStorage },
  { load: loadFromLocalStorage, save: saveToLocalStorage, remove: removeLocaleFromLocalStorage },
];

/** A broken tier is a miss only: the next tier still gets its chance. */
export const loadLocaleCache = async (key: string): Promise<object | null> => {
  for (const { load } of localeTiers) {
    try {
      const value = await load(key);
      if (!value) continue;

      dropLegacyLocaleStorage();
      return value;
    } catch {
      //
    }
  }

  return null;
};

/**
 * The first tier that accepts the write becomes the only owner of the dictionary:
 * every other tier is wiped, so a stale copy can never outlive a fresh translation,
 * even when a stronger tier failed temporarily and kept its outdated value.
 */
export const saveLocaleCache = async (key: string, value: object): Promise<void> => {
  for (let index = 0; index < localeTiers.length; index++) {
    try {
      await localeTiers[index].save(key, value);
    } catch {
      continue;
    }

    dropLegacyLocaleStorage();
    await Promise.allSettled(
      localeTiers.map(({ remove }, tierIndex) => (tierIndex === index ? null : remove(key))),
    );
    return;
  }
};
