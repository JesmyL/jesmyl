import { takeBaseLanguageAtom, takeDynamicLanguageAtom } from '#basis/state/locale';
import { atom, useAtomValue } from 'atomaric';
import { makeRegExp } from 'regexpert';
import { Langi } from 'shared/api';
import { langCodeDict } from 'shared/const/+locale';
import { checkIsNil } from 'shared/utils/checkIs';
import { translateBaseDefine } from 'shared/utils/locale/translate';

export const currentLangiAtom = atom(() => {
  const langDict: Record<string, Langi> = {
    ru: Langi.Ru,

    ua: Langi.Ua,
    uk: Langi.Ua,

    kz: Langi.Kz,
    kk: Langi.Kz,
  };

  const navLang =
    navigator.language ||
    ('userLanguage' in navigator ? `${navigator.userLanguage}` : '').split(makeRegExp('/[-_]/'), 1)[0].toLowerCase();

  return langDict[navLang] ?? Langi.Ru;
}, 'app:lang');

let lng = langCodeDict[currentLangiAtom.get()];

if (checkIsNil(lng)) {
  currentLangiAtom.reset();
  lng = langCodeDict[currentLangiAtom.get()];
}

export const translateBase = translateBaseDefine(() => takeBaseLanguageAtom().get());

export const useTranslateBase = () => {
  const dict = useAtomValue(takeBaseLanguageAtom());

  return translateBaseDefine(dict);
};

export const translateDynamic = (langi: Langi) => translateBaseDefine(takeDynamicLanguageAtom(langi).get());
