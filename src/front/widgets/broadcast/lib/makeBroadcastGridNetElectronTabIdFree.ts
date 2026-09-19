import { electronClientApi } from '#shared/tsjrpc.electron/tsjrpc.electron.client';
import { atom, StorageKeyOrOptions } from 'atomaric';
import { checkIsEq } from 'shared/utils/checkIsEq';
import { BroadcastGridTabNet } from '../model/TabConfig';

export const makeBroadcastGridNetElectronTabIdFreeAtom = <TabId extends number>(
  electronTabIdSet: Set<TabId>,
  net: BroadcastGridTabNet<TabId>,
  options: StorageKeyOrOptions<BroadcastGridTabNet<TabId>>,
) => {
  const filteredNet = electronClientApi ? net : (net.map(row => row.filter(id => !electronTabIdSet.has(id))) as never);
  const resultAtom = atom(filteredNet, options);

  if (!checkIsEq(filteredNet, resultAtom.get())) {
    const oldTabIdSet = new Set(resultAtom.get().flat());
    const newTabIdSet = new Set(filteredNet.flat());
    const exclusiveTabIdSet = new Set<TabId>();

    const resultNet = resultAtom.get().map((oldRow, rowi) => {
      return filteredNet[rowi]
        .filter(id => !oldTabIdSet.has(id))
        .concat(
          oldRow.filter(id => {
            const isAdd = newTabIdSet.has(id) && !exclusiveTabIdSet.has(id);
            exclusiveTabIdSet.add(id);

            return isAdd;
          }),
        );
    });

    if (!checkIsEq(resultNet, resultAtom.get())) resultAtom.set(resultNet as never);
  }

  return resultAtom;
};
