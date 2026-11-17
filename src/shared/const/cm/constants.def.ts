import { makeRegExp } from 'regexpert';
import { ConstantsConfig, ConstantsConfigConfigurator, ConstantsConfigConfiguratorItem } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import type { NonInterpolatedBaseLocaleKey } from 'shared/model/+locale/base';
import { iife } from 'shared/utils';
import { checkIsNaN, checkIsNotNumber, checkIsStartsWith, checkIsString } from 'shared/utils/checkIs';
import { forEachObjectEntries } from 'shared/utils/object.utils';

const numberZips = (def: number, title: NonInterpolatedBaseLocaleKey) =>
  ({
    title,
    def,
    str: str => `${checkIsNaN(+`${str}`) ? def : str}`,
    checked: strNum => (checkIsNaN(+`${strNum}`) ? def : +`${strNum}`),
  }) satisfies Partial<ConstantsConfigConfiguratorItem<number>>;

/** Заголовки разделов конфигурации: отображаемый текст берётся из базовой локали по ключу группы. */
export const constantsSectionTitleKeys: Record<string, NonInterpolatedBaseLocaleKey> = {
  '>cmComments': BaseLocaleKey.ConstantsCmComments,
  '>cmOther': BaseLocaleKey.ConstantsCmOther,
  '>indexCommon': BaseLocaleKey.ConstantsIndexCommon,
};

export const constantsConfigurator: ConstantsConfigConfigurator = {
  '>cmComments': 0,
  maxComCommentAlternativesCount: numberZips(3, BaseLocaleKey.ConstantsMaxComCommentAlternativesCount),
  maxComCommentBlockLen: numberZips(100, BaseLocaleKey.ConstantsMaxComCommentBlockLen),
  maxComCommentChordLen: numberZips(5, BaseLocaleKey.ConstantsMaxComCommentChordLen),
  maxComCommentHeadLen: numberZips(300, BaseLocaleKey.ConstantsMaxComCommentHeadLen),
  maxComCommentLineLen: numberZips(20, BaseLocaleKey.ConstantsMaxComCommentLineLen),
  maxComCommentWordLen: numberZips(10, BaseLocaleKey.ConstantsMaxComCommentWordLen),

  '>cmOther': 0,
  maxAvailableComLineLength: numberZips(47, BaseLocaleKey.ConstantsMaxComLineLength),
  maxFavouritesCount: numberZips(30, BaseLocaleKey.ConstantsMaxFavouritesCount),
  maxLaterComsVizitedCount: numberZips(4, BaseLocaleKey.ConstantsMaxLaterComsCount),
  maxSelectedComsCount: numberZips(50, BaseLocaleKey.ConstantsMaxSelectedComsCount),

  '>indexCommon': 0,
  // Объём переданного через комнату файла храним в мегабайтах: число 10 означает лимит 10 МБ.
  maxTransferFileSize: numberZips(10, BaseLocaleKey.ConstantsMaxTransferFileSize),
  availEmailDomainZone: iife(() => {
    const def = 'ru';

    const unzip = (str: string) => {
      const set = new Set(str.split(makeRegExp('/[^a-z]+/')));
      set.delete('');
      return set;
    };
    const str = (str: unknown) => (checkIsString(str) ? Array.from(unzip(str)).join(' ') : def);

    return {
      title: BaseLocaleKey.ConstantsEmailDomainZones,
      def,
      str,
      checked: str,
      error: (value, checkValue) => {
        if (!checkIsString(value)) return null;

        if (checkIsString(checkValue)) {
          const set = unzip(value);

          return set.has(checkValue.split('.').at(-1) || '')
            ? null
            : { key: BaseLocaleKey.ConstantsAllowedEmailDomainZones, z: `.${Array.from(set).join(', .')}` };
        }

        return { key: BaseLocaleKey.ConstantsStringExpected, z: '' };
      },
    } satisfies ConstantsConfigConfigurator['availEmailDomainZone'];
  }),
};

export const constantsDefaultConfig = (() => {
  const constants = {} as ConstantsConfig;

  forEachObjectEntries(constantsConfigurator, (key, value) => {
    if (!checkIsStartsWith(key, '>') && checkIsNotNumber(value)) constants[key] = value.def as never;
  });

  return constants;
})();
