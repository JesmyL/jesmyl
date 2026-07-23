import { Atom, atom } from 'atomaric';
import { Langi } from 'shared/api';
import { LocaleNameSpaceConfigs } from 'shared/model/+locale';
import { lazyInit } from 'shared/utils/lazyInit';

const dynamicLangAtoms: PRecord<Langi, Atom<object>> = {};

export const takeBaseLanguageAtom = lazyInit(() => atom({}, 'loc:B') as never as Atom<LocaleNameSpaceConfigs['B']>);

export const takeDynamicLanguageAtom = <L extends Langi>(langi: L) => {
  return (dynamicLangAtoms[langi] ??= atom({}, `loc:D${langi}`)) as never as Atom<LocaleNameSpaceConfigs[`D${L}`]>;
};
