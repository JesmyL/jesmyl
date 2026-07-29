import { CmComFaceList } from '$cm/entities/com-face';
import { useCmComList } from '$cm/ext';
import { cmIDB } from '$cm/shared/state';
import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import { ScheduleWidgetDayEventMi, ScheduleWidgetDayi, ScheduleWidgetWid } from 'shared/api';
import { CmCom } from 'shared/const/cm/Com';
import { checkIsNotNil } from 'shared/utils/checkIs';

interface Props {
  schw: ScheduleWidgetWid | und;
  dayi: ScheduleWidgetDayi | und;
  eventMi: ScheduleWidgetDayEventMi | und;
  comImportantOnClick?: (props: { com: CmCom }) => void;
  isPutCcomFaceOff?: boolean;
}

export const useCmMeetingComFaceList = ({ dayi, eventMi, schw, comImportantOnClick, isPutCcomFaceOff }: Props) => {
  const pack = useLiveQuery(() => schw && cmIDB.db.scheduleComws.get({ schw }), [schw]);
  const packComws = useMemo(
    () => (checkIsNotNil(dayi) && checkIsNotNil(eventMi) ? (pack?.pack?.[dayi]?.[eventMi]?.s ?? []) : []),
    [dayi, eventMi, pack?.pack],
  );
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
