import { cmIDB } from '$cm/shared/state';
import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import { ScheduleWidgetDayEventMi, ScheduleWidgetDayi, ScheduleWidgetWid } from 'shared/api';
import { checkIsNotNil } from 'shared/utils/checkIs';

interface Props {
  schw: ScheduleWidgetWid | und;
  dayi: ScheduleWidgetDayi | und;
  eventMi: ScheduleWidgetDayEventMi | und;
}

export const useCmMeetingComwList = ({ dayi, eventMi, schw }: Props) => {
  const pack = useLiveQuery(() => schw && cmIDB.db.scheduleComws.get({ schw }), [schw]);
  return useMemo(() => {
    const eventPack = checkIsNotNil(dayi) && checkIsNotNil(eventMi) ? pack?.pack?.[dayi]?.[eventMi] : null;

    return {
      ...eventPack,
      s: eventPack?.s ?? [],
      w: eventPack?.w ?? 0,
    };
  }, [dayi, eventMi, pack?.pack]);
};
