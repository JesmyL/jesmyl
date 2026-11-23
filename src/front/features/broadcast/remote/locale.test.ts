/* eslint-disable import-between-chapters/back-in-front */
import { localeRemoteEn } from 'back/locales/remote/en';
import { localeRemoteKz } from 'back/locales/remote/kz';
import { localeRemoteRu } from 'back/locales/remote/ru';
import { localeRemoteUa } from 'back/locales/remote/ua';
import { Langi } from 'shared/api';
import { describe, expect, it } from 'vitest';

describe('remote locale dictionaries', () => {
  const dictionaries = {
    [Langi.Ru]: localeRemoteRu,
    [Langi.Ua]: localeRemoteUa,
    [Langi.Kz]: localeRemoteKz,
    [Langi.En]: localeRemoteEn,
  };

  const langiCases: [name: string, langi: Langi][] = [
    ['ru', Langi.Ru],
    ['ua', Langi.Ua],
    ['kz', Langi.Kz],
    ['en', Langi.En],
  ];

  for (const [name, langi] of langiCases) {
    it(`fills ${name} remote texts`, () => {
      const texts = Object.values(dictionaries[langi]);

      expect(texts.length).toBeGreaterThan(0);
      expect(texts.every(text => typeof text === 'string' && text.length > 0)).toBe(true);
    });
  }

  it('covers the same remote keys in every language', () => {
    const referenceKeys = Object.keys(dictionaries[Langi.Ru]).sort();

    for (const [, langi] of langiCases) {
      expect(Object.keys(dictionaries[langi]).sort()).toEqual(referenceKeys);
    }
  });
});
