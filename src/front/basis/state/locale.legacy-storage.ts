import { atom } from 'atomaric';

let isDropped = false;

/**
 * @deprecated Locale dictionaries moved from localStorage to Cache Storage.
 * This one-shot cleanup wipes the legacy persisted atoms and is never used again.
 */
export const dropLegacyLocaleStorage = () => {
  if (isDropped) return;
  isDropped = true;

  atom({}, 'loc:B').reset();
  atom({}, 'loc:E').reset();

  for (const key of Object.keys(localStorage)) {
    if (key.includes('loc:D')) localStorage.removeItem(key);
  }
};
