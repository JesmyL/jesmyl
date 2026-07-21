import { checkIsNotNil } from '../checkIs';
import { comNbsp } from './com/const';

export const enum CmComOrdRepeatSlashPlacement {
  /** / */
  Before,
  /** \ */
  After,
}

const slashDict: Record<CmComOrdRepeatSlashPlacement, string> = {
  [CmComOrdRepeatSlashPlacement.Before]: '/',
  [CmComOrdRepeatSlashPlacement.After]: '\\',
};

export const makeCmComOrderRepeats = (
  slashPlacement: CmComOrdRepeatSlashPlacement,
  repeatsCount: number,
  fadeCount?: number,
  nbsp: string = comNbsp,
) => {
  const slash = slashDict[slashPlacement];
  let invisibleSlash = '';
  let slashRepeat = repeatsCount;

  if (checkIsNotNil(fadeCount) && repeatsCount > fadeCount) {
    slashRepeat = fadeCount;
    invisibleSlash = `<span style=opacity:.4!important>${slash.repeat(repeatsCount - fadeCount)}</span>`;
  }

  const slashes = slash.repeat(slashRepeat);

  return slashPlacement === CmComOrdRepeatSlashPlacement.Before
    ? `${invisibleSlash}${slashes}${nbsp}`
    : `${nbsp}${slashes}${invisibleSlash}`;
};

export const makeCmComOrderRepeatedText = (
  text: string,
  repeatsCount: number,
  fadeCount?: number,
  nbsp: string = comNbsp,
) =>
  `${makeCmComOrderRepeats(CmComOrdRepeatSlashPlacement.Before, repeatsCount, fadeCount, nbsp)}${text}${makeCmComOrderRepeats(CmComOrdRepeatSlashPlacement.After, repeatsCount, fadeCount, nbsp)}`;
