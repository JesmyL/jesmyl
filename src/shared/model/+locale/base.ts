import { AppName } from '#basis/model/App.model';
import { Langi } from 'shared/api';

type Satisfies<T extends PRecord<AppName, object>> = T;
type Rec<T extends string | number> = Record<T, string>;

export type LocaleBase<L extends Langi> = Satisfies<{
  lng: L;

  cm: {
    com: {
      tool: Rec<'redact'>;
    };
  };
}>;
