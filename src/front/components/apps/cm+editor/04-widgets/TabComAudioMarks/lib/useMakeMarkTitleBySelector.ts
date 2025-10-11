import { mylib } from '#shared/lib/my-lib';
import { EditableCom } from '$cm+editor/basis/lib/EditableCom';
import { useMemo } from 'react';
import { CmComAudioMarkPack, CmComAudioMarkSelector } from 'shared/api';

export const useMakeMarkTitleBySelector = (
  time: number,
  com: EditableCom,
  selector: CmComAudioMarkSelector | nil,
  marks: CmComAudioMarkPack | nil,
) => {
  return useMemo(() => {
    if (mylib.isArr(selector)) {
      const ord = com.getOrderBySelector(selector[0]);
      if (marks == null || ord == null) return { title: '?????', ord: null };

      const visibleOrders = com.visibleOrders() ?? [];
      let repeats = 0;

      mylib.keys(marks).find(itTime => {
        if (marks[itTime] == null || mylib.isStr(marks[itTime])) return false;

        if (ord.isMySelector(marks[itTime][0])) repeats++;
        else repeats = 0;

        return time === +itTime;
      });

      return {
        title: `#${visibleOrders.indexOf(ord) + 1} ${ord.me.header()}${mylib.isNum(selector[0]) ? '' : '+'} ${repeats > 1 ? `×${repeats}` : ''}`,
        ord,
      };
    }

    return { title: selector ?? '', ord: null };
  }, [com, marks, selector, time]);
};
