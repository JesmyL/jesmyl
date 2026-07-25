import { Langi } from 'shared/api';
import { CmComBlockKindKey } from 'shared/values/cm/block-kinds/BlockKind.model';
import { BibleTitleCodei } from '../bible/enums';
import { LocaleSatisfies, LocaleStrRecord } from './model';

export type LocaleDynamic<L extends Langi> = LocaleSatisfies<{
  lng: L;
  v: number;

  cm: {
    com: {
      kind: LocaleStrRecord<CmComBlockKindKey>;
    };
  };

  bible: {
    title: {
      short: LocaleStrRecord<BibleTitleCodei>;
      full: LocaleStrRecord<BibleTitleCodei>;
    };
  };
}>;
