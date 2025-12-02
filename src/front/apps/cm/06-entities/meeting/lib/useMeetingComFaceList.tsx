import { CmCom, useCmComList } from '$cm/entities/com';
import { CmComFaceList } from '$cm/entities/com-face';
import { cmIDB } from '$cm/shared/state';
import { useLiveQuery } from 'dexie-react-hooks';
import { IScheduleWidgetDayEventMi, IScheduleWidgetWid } from 'shared/api';

interface Props {
  schw: IScheduleWidgetWid | und;
  dayi: number | und;
  eventMi: IScheduleWidgetDayEventMi | und;
  comImportantOnClick?: (props: { com: CmCom }) => void;
  isPutCcomFaceOff?: boolean;
}

export const useCmMeetingComFaceList = ({ dayi, eventMi, schw, comImportantOnClick, isPutCcomFaceOff }: Props) => {
  const pack = useLiveQuery(() => schw && cmIDB.db.scheduleComPacks.get({ schw }), [schw]);
  const packComws = pack?.pack?.[dayi as never]?.[eventMi as never] ?? [];
  const coms = useCmComList(packComws);

  return {
    coms,
    packComws,
    comFaceListNode: (
      <CmComFaceList
        list={coms}
        importantOnClick={comImportantOnClick}
        isPutCcomFaceOff={isPutCcomFaceOff}
      />
    ),
  };
};
