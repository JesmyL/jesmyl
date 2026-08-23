import { appInitEvent } from '$app/store/triggers';
import { indexTsjrpcClientMethods } from '$index/shared/tsjrpc';
import { Atom, atom } from 'atomaric';
import { Langi } from 'shared/api';
import { LocaleNameSpaceConfigs } from 'shared/model/+locale';
import { checkIsNil } from 'shared/utils/checkIs';
import { lazyInit } from 'shared/utils/lazyInit';

const dynamicLangAtoms: PRecord<Langi, Atom<object>> = {};

export const takeBaseLanguageAtom = lazyInit(() => {
  const confAtom = atom({}, 'loc:B') as never as Atom<LocaleNameSpaceConfigs['B']>;

  if (checkIsNil(confAtom.get().langi)) appInitEvent.listen(() => indexTsjrpcClientMethods.reqLocaleBaseConfig());

  return confAtom;
});

export const takeDynamicLanguageAtom = <L extends Langi>(langi: L) => {
  const confAtom = (dynamicLangAtoms[langi] ??= atom({}, `loc:D${langi}`)) as never as Atom<
    LocaleNameSpaceConfigs[`D${L}`]
  >;
  if (checkIsNil(confAtom.get().langi))
    appInitEvent.listen(() => indexTsjrpcClientMethods.reqLocaleDynConfig({ langi }));

  return confAtom;
};
