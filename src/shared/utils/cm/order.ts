import { checkIsNotNil } from '../checkIs';
import { comNbsp } from './com/const';

export const enum CmComOrdRepeatSlashPlacement {
  /** / */
  Before,
  /** \ */
  After,
}

const slashDict: Record<CmComOrdRepeatSlashPlacement, [string, string]> = {
  [CmComOrdRepeatSlashPlacement.Before]: ['/', comNbsp],
  [CmComOrdRepeatSlashPlacement.After]: ['\\', comNbsp],
};

export const makeCmComOrderRepeats = (
  slashPlacement: CmComOrdRepeatSlashPlacement,
  repeatsCount: number,
  fadeCount?: number,
) => {
  const slash = slashDict[slashPlacement];
  let invisibleSlash = '';
  let slashRepeat = repeatsCount;

  if (checkIsNotNil(fadeCount) && repeatsCount > fadeCount) {
    slashRepeat = fadeCount;
    invisibleSlash = `<span style=opacity:.4!important>${slash[0].repeat(repeatsCount - fadeCount)}</span>`;
  }

  const slashes = slash[0].repeat(slashRepeat);

  return slashPlacement === CmComOrdRepeatSlashPlacement.Before
    ? `${invisibleSlash}${slashes}${slash[1]}`
    : `${slash[1]}${slashes}${invisibleSlash}`;
};

export const makeCmComOrderRepeatedText = (text: string, repeatsCount: number, fadeCount?: number) =>
  `${makeCmComOrderRepeats(CmComOrdRepeatSlashPlacement.Before, repeatsCount, fadeCount)}${text}${makeCmComOrderRepeats(CmComOrdRepeatSlashPlacement.After, repeatsCount, fadeCount)}`;
