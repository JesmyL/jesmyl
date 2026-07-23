import { takeBaseLanguageAtom, takeDynamicLanguageAtom } from '#basis/state/locale';
import { atom } from 'atomaric';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { makeRegExp } from 'regexpert';
import { Langi } from 'shared/api';
import { langCodeDict, localeDefaultNameSpace, localeKeySeparator } from 'shared/const/+locale';
import { LocaleNameSpace, LocaleNameSpaceConfigs } from 'shared/model/+locale';
import { checkIsNil } from 'shared/utils/checkIs';
import { objectKeys } from 'shared/utils/object.utils';

export const currentLangAtom = atom(() => {
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

let lng = langCodeDict[currentLangAtom.get()];

if (checkIsNil(lng)) {
  currentLangAtom.reset();
  lng = langCodeDict[currentLangAtom.get()];
}

const nsConfigs: { [K in LocaleNameSpace]: LocaleNameSpaceConfigs[K] } = {
  B: takeBaseLanguageAtom().get(),
  [`D${Langi.Ru}`]: takeDynamicLanguageAtom(Langi.Ru).get(),
  [`D${Langi.Ua}`]: takeDynamicLanguageAtom(Langi.Ua).get(),
  [`D${Langi.Kz}`]: takeDynamicLanguageAtom(Langi.Kz).get(),
};

i18n.use(initReactI18next).init({
  lng,
  fallbackLng: langCodeDict[Langi.Ru],
  ns: objectKeys(nsConfigs),
  resources: { [lng]: nsConfigs },
  interpolation: { escapeValue: false },

  nsSeparator: localeKeySeparator,
  keySeparator: localeKeySeparator,

  defaultNS: localeDefaultNameSpace,
});

export { i18n };
