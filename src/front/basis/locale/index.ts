import { takeBaseLanguageAtom, takeDynamicLanguageAtom } from '#basis/state/locale';
import { atom, useAtomValue } from 'atomaric';
import { makeRegExp } from 'regexpert';
import { Langi } from 'shared/api';
import { langCodeDict } from 'shared/const/+locale';
import { LocaleDynamic } from 'shared/model/+locale/dynamic';
import { checkIsNil } from 'shared/utils/checkIs';
import { setBaseLocaleProvider, translateBase } from 'shared/utils/locale/base';
import {
  DefinedTranslateFunction,
  NEXTcb,
  TemplateInterpolationGenKey,
  TemplateInterpolationVals,
  TranslateKeyResult,
} from 'shared/utils/locale/model';
import { translateBaseDefine } from 'shared/utils/locale/translate';

export const currentLangiAtom = atom(() => {
  const langDict: Record<string, Langi> = {
    ru: Langi.Ru,

    ua: Langi.Ua,
    uk: Langi.Ua,

    kz: Langi.Kz,
    kk: Langi.Kz,

    en: Langi.En,
  };

  const navLang = (navigator.language || ('userLanguage' in navigator ? `${navigator.userLanguage}` : ''))
    .split(makeRegExp('/[-_]/'), 1)[0]
    .toLowerCase();

  return langDict[navLang] ?? Langi.Ru;
}, 'app:langi');

export const langSystemCodeDict: Record<Langi, string> = {
  [Langi.Ru]: 'ru-RU',
  [Langi.Ua]: 'uk-UA',
  [Langi.Kz]: 'kk-KZ',
  [Langi.En]: 'en-GB',
};

export let applicationLangi = currentLangiAtom.get();
let lang = langCodeDict[applicationLangi];

if (checkIsNil(lang)) {
  currentLangiAtom.reset();
  applicationLangi = currentLangiAtom.get();
  lang = langCodeDict[applicationLangi];
}

export const languageSystemCode = langSystemCodeDict[applicationLangi];

setBaseLocaleProvider(() => takeBaseLanguageAtom().get());

export { translateBase };

export const useTranslateBase = () => {
  const dict = useAtomValue(takeBaseLanguageAtom());

  return translateBaseDefine(dict);
};

type DynamicLocale = LocaleDynamic<Langi>;

export function translateDynamic(langi: Langi): DefinedTranslateFunction<DynamicLocale>;

export function translateDynamic<
  Key extends keyof DynamicLocale,
  const Vals extends object = TemplateInterpolationVals<DynamicLocale[Key]>,
  const GenKey extends string = TemplateInterpolationGenKey<DynamicLocale[Key]>,
  Interpolation extends Vals & { NEXT?: NEXTcb<GenKey> } = Vals & { NEXT?: NEXTcb<GenKey> },
>(
  langi: Langi,
  key: Key,
  interpolation: Interpolation,
): (Interpolation extends { NEXT: NEXTcb<string, infer R> } ? R[] : string) | '';

export function translateDynamic<Key extends keyof DynamicLocale>(
  langi: Langi,
  key: Key,
  interpolation?: nil | void,
): TranslateKeyResult<DynamicLocale, Key>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function translateDynamic(langi: Langi, key?: keyof DynamicLocale, interpolation?: unknown): any {
  const translate = translateBaseDefine(takeDynamicLanguageAtom(langi).get());

  return checkIsNil(key) ? translate : translate(key as never, interpolation as never);
}
