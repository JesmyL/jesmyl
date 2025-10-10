import { mylib } from '#shared/lib/my-lib';
import { EditableCom } from '$cm+editor/basis/lib/EditableCom';
import { useMemo } from 'react';
import { CmComAudioMarkSelector } from 'shared/api';

export const useMakeMarkTitleBySelector = (com: EditableCom, selector: CmComAudioMarkSelector | nil) => {
  return useMemo(() => {
    if (mylib.isArr(selector)) {
      const ord = com.getOrderBySelector(selector[0]);
      const visibleOrders = com.visibleOrders() ?? [];

      return ord
        ? `#${visibleOrders.indexOf(ord) + 1} ${ord.me.header()}${mylib.isNum(selector[0]) ? '' : '+'}`
        : '?????';
    }

    return selector ?? '';
  }, [com, selector]);
};
