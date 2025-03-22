import { cmIDB } from '$cm/basis/lib/cmIDB';
import { useComs } from '$cm/basis/lib/coms-selections';
import { Com } from '$cm/col/com/Com';
import { ComFaceList } from '$cm/col/com/face/list/ComFaceList';
import { useLiveQuery } from 'dexie-react-hooks';
import { IScheduleWidgetDayEventMi, IScheduleWidgetWid } from 'shared/api';
import { emptyArray } from 'shared/utils';

interface Props {
  schw: IScheduleWidgetWid | und;
  dayi: number | und;
  eventMi: IScheduleWidgetDayEventMi | und;
  comImportantOnClick?: (props: { com: Com }) => void;
}

export function useMeetingComFaceList({ dayi, eventMi, schw, comImportantOnClick }: Props) {
  const pack = useLiveQuery(() => schw && cmIDB.db.scheduleComPacks.get({ schw }), [schw]);
  const packComws = pack?.pack?.[dayi as never]?.[eventMi as never] ?? emptyArray;
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
