import { useCallback, useEffect, useState } from 'react';
import { useOnScrolledToLimitEventer } from './useOnScrolledToLimitEventer';

export const useListInfiniteScrollController = <Item>(
  listRef: React.RefObject<HTMLDivElement>,
  list: Item[],
  findCurrentIndex: (item: Item, index: number, items: Item[]) => boolean,
  initItemsBefore = 15,
  initItemsAfter = 40,
  addItemsCount = 30,
): ListSlicerLimitsControls => {
  const [limits, setLimits] = useState(() => {
    let itemi = list.findIndex(findCurrentIndex);

    itemi = itemi < 0 ? 0 : itemi;

    const startLimitPlus = initItemsAfter - (list.length - itemi);
    const finishLimitPlus = initItemsBefore - itemi;

    const initialStartLimit = itemi - initItemsBefore - (startLimitPlus > 0 ? startLimitPlus : 0);
    const initialFinishLimit = itemi + initItemsAfter + (finishLimitPlus > 0 ? finishLimitPlus : 0);

    const start = initialStartLimit < 0 ? 0 : initialStartLimit;
    const finish = initialFinishLimit + 1;

    return { start, finish };
  });

  const updateLimits = useCallback(
    (start: number | nil, finish: number | nil) => {
      if (start == null && finish == null) return;

      setLimits({
        start: start == null ? limits.start : start < 0 ? 0 : start,
        finish: finish ?? limits.finish,
      });
    },
    [limits],
  );

  const limitEventer = useOnScrolledToLimitEventer(listRef);

  useEffect(() => {
    return limitEventer.listen(border => {
      if (border === 'start')
        setLimits(limits => ({
          ...limits,
          start: limits.start - addItemsCount < 0 ? 0 : limits.start - addItemsCount,
        }));
      else setLimits(limits => ({ ...limits, finish: limits.finish + addItemsCount }));
    });
  }, [addItemsCount, limitEventer]);

  return {
    limits,
    updateLimits,
  };
};

export type ListSlicerLimits = {
  start: number;
  finish: number;
};

export type ListSlicerLimitsControls = {
  limits: ListSlicerLimits;
  updateLimits: (start: number | nil, finish: number | nil) => void;
};
