import { Langi } from 'shared/api';
import { StringTemplaterWithTwoInterpolations } from 'shared/utils/stringTemplater/model';
import { CmComBlockKindKey } from 'shared/values/cm/block-kinds/BlockKind.model';
import { BibleTitleCodei } from '../bible/enums';
import { LocaleNumStrRecord, LocaleSatisfies, LocaleStrRecord } from './model';

export type LocaleDynamic<L extends Langi> = LocaleSatisfies<{
  langi: L;
  v: number;

  lang: LocaleNumStrRecord<Langi>;

  cm: {
    com: {
      kind: LocaleStrRecord<CmComBlockKindKey>;
    };
  };

  bible: {
    title: {
      short: LocaleNumStrRecord<BibleTitleCodei>;
      full: LocaleNumStrRecord<BibleTitleCodei>;
    };

    chapterNum: StringTemplaterWithTwoInterpolations<'c', 'b'>;
  };
}>;
