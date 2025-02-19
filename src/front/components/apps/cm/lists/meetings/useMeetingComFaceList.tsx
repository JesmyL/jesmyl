import { useLiveQuery } from 'dexie-react-hooks';
import { IScheduleWidgetDayEventMi, IScheduleWidgetWid } from 'shared/api';
import { emptyArray } from 'shared/utils';
import { cmIDB } from '../../_db/cm-idb';
import { Com } from '../../col/com/Com';
import { ComFaceList } from '../../col/com/face/list/ComFaceList';
import { useComs } from '../../cols/useCols';

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
