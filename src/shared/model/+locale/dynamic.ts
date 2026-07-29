import { Langi } from 'shared/api';
import { CmComBlockKindKey } from 'shared/values/cm/block-kinds/BlockKind.model';
import { BibleTitleCodei } from '../bible/enums';
import { LocaleSatisfies, LocaleSimpleString, LocaleStrRecord } from './model';

export type LocaleDynamic<L extends Langi> = LocaleSatisfies<{
  langi: L;
  v: number;

  lang: Record<Langi, LocaleSimpleString>;

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
