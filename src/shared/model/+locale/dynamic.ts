import { Langi } from 'shared/api';
import { StringTemplaterWithTwoInterpolations } from 'shared/utils/stringTemplater/model';
import { CmComBlockKindKey } from 'shared/values/cm/block-kinds/BlockKind.model';
import { BibleTitleCodei } from '../bible/enums';
import { DynLocaleKey } from './_DynLocaleKey';
import { LocaleNumStrRecord, LocaleStrRecord } from './model';

export type LocaleDynamic<L extends Langi> = {
  [DynLocaleKey.Langi]: L;
  [DynLocaleKey.Version]: number;

  [DynLocaleKey.Lang]: LocaleNumStrRecord<Langi>;
  [DynLocaleKey.CmComKind]: LocaleStrRecord<CmComBlockKindKey>;

  [DynLocaleKey.BibleTitleFull]: LocaleNumStrRecord<BibleTitleCodei>;
  [DynLocaleKey.BibleTitleShort]: LocaleNumStrRecord<BibleTitleCodei>;
  [DynLocaleKey.BibleChapterNum]: StringTemplaterWithTwoInterpolations<'c', 'b'>;
};
