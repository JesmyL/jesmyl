import { Langi } from 'shared/api';
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
  };
}>;
