import { AppName } from '#basis/model/App.model';
import { Langi } from 'shared/api';
import { CmComBlockKindKey } from 'shared/values/cm/block-kinds/BlockKind.model';

type Satisfies<T extends PRecord<AppName, object>> = T;
type Rec<T extends string | number> = Record<T, string>;

export type LocaleDynamic<L extends Langi> = Satisfies<{
  lng: L;

  cm: {
    com: {
      kind: Rec<CmComBlockKindKey>;
    };
  };
}>;
