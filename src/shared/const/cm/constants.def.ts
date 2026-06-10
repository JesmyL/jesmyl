import { makeRegExp } from 'regexpert';
import {
  CmComIntensityLevel,
  ConstantsConfig,
  ConstantsConfigConfigurator,
  ConstantsConfigConfiguratorItem,
} from 'shared/api';
import { checkIsNaN, checkIsNotNumber, checkIsStartsWith, checkIsString } from 'shared/utils/checkIs';
import { forEachObjectEntries } from 'shared/utils/object.utils';

const numberZips = {
  unzip: str => +str,
  str: (strNum, def) => (checkIsNaN(+strNum) ? `${def}` : strNum),
  error: () => null,
} satisfies Partial<ConstantsConfigConfiguratorItem<number, number>>;

const stringSetZips = (() => {
  const unzip = (str: string) => new Set(str.split(makeRegExp('/[^a-z]+/')));
  const str = (set: string) => Array.from(unzip(set)).join(' ');

  return {
    unzip,
    str,
    error: (value, checkValue) => {
      if (checkIsString(checkValue)) {
        const set = unzip(value);

        return set.has(checkValue.split('.').at(-1) || '')
          ? null
          : `Допустимые доменные зоны - .${Array.from(set).join(', .')}`;
      }

      return 'String expected!';
    },
  } satisfies Partial<ConstantsConfigConfiguratorItem<string, Set<string>>>;
})();

export const constantsConfigurator: ConstantsConfigConfigurator = {
  '>cm - комменты': 0,
  maxComCommentAlternativesCount: { def: 3, title: 'макс. кол-во альтернатив', ...numberZips },
  maxComCommentBlockLen: { def: 100, title: 'макс. смиволов для блока', ...numberZips },
  maxComCommentChordLen: { def: 5, title: 'макс. смиволов для аккордя', ...numberZips },
  maxComCommentHeadLen: { def: 300, title: 'макс. смиволов для шапки', ...numberZips },
  maxComCommentLineLen: { def: 20, title: 'макс. смиволов для строки', ...numberZips },
  maxComCommentWordLen: { def: 10, title: 'макс. смиволов для слова', ...numberZips },

  '>cm - другое': 0,
  maxAvailableComLineLength: { def: 47, title: 'макс. длина строки в песне', ...numberZips },
  maxFavouritesCount: { def: 30, title: 'макс. лайк-песен', ...numberZips },
  maxLaterComsVizitedCount: { def: 4, title: 'макс. последних песен', ...numberZips },
  maxSelectedComsCount: { def: 50, title: 'макс. выбр. песен', ...numberZips },
  showFragmentSlidesBelow: {
    def: CmComIntensityLevel.Medium,
    title: 'ХХХ - фрагменты для слайдов ниже интенсивности',
    ...numberZips,
  },

  '>index - общее': 0,
  availEmailDomainZone: { def: 'ru', title: 'E-mail доменные зоны', ...stringSetZips },
};

export const constantsDefaultConfig = (() => {
  const constants = {} as ConstantsConfig;

  forEachObjectEntries(constantsConfigurator, (key, value) => {
    if (!checkIsStartsWith(key, '>') && checkIsNotNumber(value)) constants[key] = value.def as never;
  });

  return constants;
})();
