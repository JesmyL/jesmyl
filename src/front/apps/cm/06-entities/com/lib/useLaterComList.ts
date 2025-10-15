import { cmConstantsConfigAtom } from '$cm/shared/state';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { itIt, itNIt } from 'shared/utils';
import { cmComLaterComwListAtom } from '../state/atoms';

const addLaterComw = async (comw: number) => {
  const { maxLaterComsVizitedCount } = cmConstantsConfigAtom.get();

  cmComLaterComwListAtom.set(prev => {
    const set = new Set(prev.toReversed());

    set.delete(comw);
    set.add(comw);
    const result = Array.from(set).reverse();
    if (result.length > maxLaterComsVizitedCount) {
      result.length = maxLaterComsVizitedCount;
    }

    return result;
  });
};

export function useCmComLaterList() {
  const laterComws = useAtomValue(cmComLaterComwListAtom);

  useEffect(() => {
    if (!laterComws.some(itNIt)) return;
    cmComLaterComwListAtom.set(prev => prev.filter(itIt));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { laterComws, addLaterComw };
}
