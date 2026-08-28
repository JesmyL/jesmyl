import { atom } from 'atomaric';
import { Eventer } from 'shared/utils';

export const appInitEvent = Eventer.createValue<void>();
export const localeIsLoadingAtom = atom(0, { do: () => ({}), map: num => Math.max(num, 0) });
