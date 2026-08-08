import { useCmComIComList } from '$cm/entities/com';
import { CmComFaceList } from '$cm/entities/com-face';
import { cmIDB } from '$cm/shared/state';
import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import { IExportableCom, ScheduleWidgetDayEventMi, ScheduleWidgetDayi, ScheduleWidgetWid } from 'shared/api';
import { checkIsNotNil } from 'shared/utils/checkIs';

interface Props {
  schw: ScheduleWidgetWid | und;
  dayi: ScheduleWidgetDayi | und;
  eventMi: ScheduleWidgetDayEventMi | und;
  comImportantOnClick?: (props: { com: IExportableCom }) => void;
  isPutCcomFaceOff?: boolean;
}

export const useCmMeetingComwList = ({ dayi, eventMi, schw }: Props) => {
  const pack = useLiveQuery(() => schw && cmIDB.db.scheduleComws.get({ schw }), [schw]);
  return useMemo(
    () => (checkIsNotNil(dayi) && checkIsNotNil(eventMi) ? (pack?.pack?.[dayi]?.[eventMi]?.s ?? []) : []),
    [dayi, eventMi, pack?.pack],
  );
};

export const useCmMeetingComFaceList = (props: Props) => {
  const packComws = useCmMeetingComwList(props);
  const icoms = useCmComIComList(packComws);

  return {
    icoms,
    packComws,
    comFaceListNode: (
      <CmComFaceList
        list={icoms}
        importantOnClick={props.comImportantOnClick}
        isPutCcomFaceOff={props.isPutCcomFaceOff}
      />
    ),
  };
};
