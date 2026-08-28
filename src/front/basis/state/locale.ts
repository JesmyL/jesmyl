import { appInitEvent, localeIsLoadingAtom } from '$app/store/triggers';
import { indexTsjrpcClientMethods } from '$index/shared/tsjrpc';
import { Atom, atom } from 'atomaric';
import { Langi } from 'shared/api';
import { LocaleNameSpaceConfigs } from 'shared/model/+locale';
import { LocaleDynamic } from 'shared/model/+locale/dynamic';
import { checkIsNil } from 'shared/utils/checkIs';
import { lazyInit } from 'shared/utils/lazyInit';
import { objectLength } from 'shared/utils/object.utils';

const dynamicLangAtoms: { [L in Langi]?: Atom<LocaleDynamic<L>> } = {};

const checkValue = (value: { langi: Langi }, onRequest: () => void) => {
  if (checkIsNil(value?.langi) && !objectLength(value)) {
    appInitEvent.listen(onRequest);
    localeIsLoadingAtom.do.increment();
  }
};

export const takeBaseLanguageAtom = lazyInit(() => {
  const confAtom = atom({}, 'loc:B') as never as Atom<LocaleNameSpaceConfigs['B']>;

  checkValue(confAtom.get(), () => indexTsjrpcClientMethods.reqLocaleBaseConfig());

  return confAtom;
});

export const takeDynamicLanguageAtom = <L extends Langi>(langi: L) => {
  const confAtomCheck = dynamicLangAtoms[langi];
  if (confAtomCheck) return confAtomCheck;

  const confAtom = atom({} as LocaleDynamic<L>, `loc:D${langi}`);
  dynamicLangAtoms[langi] = confAtom as never;

  checkValue(confAtom.get(), () => indexTsjrpcClientMethods.reqLocaleDynConfig({ langi }));

  return confAtom;
};
