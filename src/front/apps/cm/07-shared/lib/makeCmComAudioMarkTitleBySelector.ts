import { mylib } from '#shared/lib/my-lib';
import { CmCom } from '$cm/ext';
import { CmComAudioMarkPack, CmComAudioMarkSelector } from 'shared/api';

export const makeCmComAudioMarkTitleBySelector = (
  time: number,
  com: CmCom,
  selector: CmComAudioMarkSelector | nil,
  marks: CmComAudioMarkPack | nil,
) => {
  if (mylib.isArr(selector)) {
    const ord = com.getOrderBySelector(selector[0]);
    if (marks == null || ord == null) return { title: '?', ord: null };

    const visibleOrders = com.visibleOrders() ?? [];
    let repeats = 0;

    mylib.keys(marks).find(itTime => {
      if (marks[itTime] == null || mylib.isStr(marks[itTime])) return false;

      if (ord.isMySelector(marks[itTime][0])) repeats++;
      else repeats = 0;

      return time === +itTime;
    });

    return {
      title: `#${visibleOrders.indexOf(ord) + 1} ${ord.me.header()}${Math.trunc(selector[0]) === selector[0] ? '' : '+'} ${repeats > 1 ? `×${repeats}` : ''}`,
      ord,
    };
  }

  return { title: selector || (time === 0 ? 'Начало' : '...'), ord: null };
};
