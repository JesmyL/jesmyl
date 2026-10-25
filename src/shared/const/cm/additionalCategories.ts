import { CmComIntensityLevel, Langi } from 'shared/api';
import type { CmAdditionalCategory } from '#shared/model/cm/cat/Cat.model';
import { CmAdditionalCatKind } from 'shared/const/cm/enums';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { checkIsNil } from 'shared/utils/checkIs';
import { translateBase } from 'shared/utils/locale/base';

export const cmAdditionalCategories: CmAdditionalCategory[] = [
  {
    num: CmAdditionalCatKind.intensityTooSlow,
    w: -2,
    track: com => com.d === CmComIntensityLevel.TooSlow,
  },
  {
    num: CmAdditionalCatKind.intensitySlow,
    w: -3,
    track: com => com.d === CmComIntensityLevel.Slow,
  },
  {
    num: CmAdditionalCatKind.intensityMedium,
    w: -4,
    track: com => checkIsNil(com.d) || com.d === CmComIntensityLevel.Medium,
  },
  {
    num: CmAdditionalCatKind.intensityFast,
    w: -5,
    track: com => com.d === CmComIntensityLevel.Fast,
  },
  {
    num: CmAdditionalCatKind.intensityTooFast,
    w: -6,
    track: com => com.d === CmComIntensityLevel.TooFast,
  },
  { num: CmAdditionalCatKind.langRu, w: -7, track: com => com.l === Langi.Ru || checkIsNil(com.l) },
  { num: CmAdditionalCatKind.langUa, w: -8, track: com => com.l === Langi.Ua },
  { num: CmAdditionalCatKind.langKz, w: -9, track: com => com.l === Langi.Kz },
  { num: CmAdditionalCatKind.langEn, w: -10, track: com => com.l === Langi.En },
];

export const cmAdditionalCategoryName = (num: CmAdditionalCatKind) =>
  translateBase(it => it[BaseLocaleKey.CmCategoryList]?.[num]);

export const takeCmAdditionalCategory = (catw: number | nil) =>
  cmAdditionalCategories.find(cat => cat.w === catw) ?? null;
