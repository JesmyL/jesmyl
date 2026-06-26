import { makeRegExp } from 'regexpert';
import { ConstantsConfig, ConstantsConfigConfigurator, ConstantsConfigConfiguratorItem } from 'shared/api';
import { checkIsNaN, checkIsNotNumber, checkIsStartsWith, checkIsString } from 'shared/utils/checkIs';
import { forEachObjectEntries } from 'shared/utils/object.utils';

const numberZips = (def: number, title: string) =>
  ({
    title,
    def,
    unzip: str => +str,
    str: strNum => (checkIsNaN(+strNum) ? `${def}` : strNum),
    error: () => null,
    checked: strNum => (checkIsNaN(+`${strNum}`) ? def : +`${strNum}`),
  }) satisfies Partial<ConstantsConfigConfiguratorItem<number, number>>;

const stringSetZips = (def: string, title: string) => {
  const unzip = (str: string) => new Set(str.split(makeRegExp('/[^a-z]+/')));
  const str = (set: string) => Array.from(unzip(set)).join(' ');

  return {
    def,
    title,
    unzip,
    str,
    checked: it => (checkIsString(it) ? it : def),
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
};

export const constantsConfigurator: ConstantsConfigConfigurator = {
  '>cm - комменты': 0,
  maxComCommentAlternativesCount: numberZips(3, 'макс. кол-во альтернатив'),
  maxComCommentBlockLen: numberZips(100, 'макс. смиволов для блока'),
  maxComCommentChordLen: numberZips(5, 'макс. смиволов для аккордя'),
  maxComCommentHeadLen: numberZips(300, 'макс. смиволов для шапки'),
  maxComCommentLineLen: numberZips(20, 'макс. смиволов для строки'),
  maxComCommentWordLen: numberZips(10, 'макс. смиволов для слова'),

  '>cm - другое': 0,
  maxAvailableComLineLength: numberZips(47, 'макс. длина строки в песне'),
  maxFavouritesCount: numberZips(30, 'макс. лайк-песен'),
  maxLaterComsVizitedCount: numberZips(4, 'макс. последних песен'),
  maxSelectedComsCount: numberZips(50, 'макс. выбр. песен'),

  '>index - общее': 0,
  availEmailDomainZone: stringSetZips('ru', 'E-mail доменные зоны'),
};

export const constantsDefaultConfig = (() => {
  const constants = {} as ConstantsConfig;

  forEachObjectEntries(constantsConfigurator, (key, value) => {
    if (!checkIsStartsWith(key, '>') && checkIsNotNumber(value)) constants[key] = value.def as never;
  });

  return constants;
})();
