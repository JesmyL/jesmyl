import { cmIDB } from '@cm/basis/lib/cmIdb';
import { Com } from '@cm/col/com/Com';
import { ComFaceList } from '@cm/col/com/face/list/ComFaceList';
import { useComs } from '@cm/cols/useCols';
import { useLiveQuery } from 'dexie-react-hooks';
import { IScheduleWidgetDayEventMi, IScheduleWidgetWid } from 'shared/api';
import { emptyArray } from 'shared/utils';

export function useMeetingComFaceList(
  schw: IScheduleWidgetWid | NaN,
  dayi: number | NaN,
  eventMi: IScheduleWidgetDayEventMi | NaN,
  comImportantOnClick?: (com: Com) => void,
) {
  const pack = useLiveQuery(() => cmIDB.db.scheduleComPacks.get({ schw }), [schw]);
  const packComws = pack?.pack?.[dayi]?.[eventMi as never] ?? emptyArray;
  const coms = useComs(packComws);

  return {
    coms,
    packComws,
    comFaceListNode: (
      <ComFaceList
        list={coms}
        importantOnClick={comImportantOnClick}
      />
    ),
  };
}
