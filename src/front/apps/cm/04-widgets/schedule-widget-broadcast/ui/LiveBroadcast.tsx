import { useScreenBroadcastWindows } from '#features/broadcast/hooks/windows';
import { useBroadcastInitialSlideSet } from '#features/broadcast/initial-slide-context';
import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { BibleTranslatesContextProvider } from '$bible/ext';
import { CmBroadcastFollowInitialSlide } from '$cm/features/broadcast';
import { complectIDB, indexIDB, useAuth } from '$index/shared/state';
import { schLiveTsjrpcClient } from '$index/shared/tsjrpc';
import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect, useState } from 'react';
import { IScheduleWidgetWid } from 'shared/api';
import { itNNull } from 'shared/utils';
import { CmScheduleWidgetBroadcastBibleControlled } from './LiveBible';
import { CmScheduleWidgetBroadcastLiveCm } from './LiveCm';

export const CmScheduleWidgetBroadcast = ({ schw }: { schw: IScheduleWidgetWid | und }) => {
  const auth = useAuth();
  const windows = useScreenBroadcastWindows();
  const isCm = complectIDB.useValue.currentBroadcastTextApp() === 'cm';
  const [isCantTranslateLive, setIsCantTranslateLive] = useState(true);
  const schedule = useLiveQuery(() => schw && indexIDB.db.schs.get(schw), [schw]);
  const setInitialSlide = useBroadcastInitialSlideSet();

  useEffect(() => {
    if (!schedule) return;

    setInitialSlide(<CmBroadcastFollowInitialSlide schw={schedule.w} />);
  }, [schedule, setInitialSlide]);

  useEffect(() => {
    if (schedule?.w == null) return;
    if (windows.some(itNNull)) setIsCantTranslateLive(false);
    else {
      setIsCantTranslateLive(true);
      schLiveTsjrpcClient.reset({ schw: schedule.w });
    }

    return hookEffectPipe()
      .pipe(addEventListenerPipe(window, 'unload' as never, () => schLiveTsjrpcClient.reset({ schw: schedule.w })))
      .effect();
  }, [schedule?.w, windows]);

  if (auth.fio === undefined) return <div className="flex center full-size text-xKO">Не авторизован</div>;
  if (schedule == null) return <div className="flex center full-size text-xKO">Расписание не найдено</div>;

  return isCm ? (
    <CmScheduleWidgetBroadcastLiveCm
      isCantTranslateLive={isCantTranslateLive}
      fio={auth.fio}
      headTitle={schedule.title}
      schedule={schedule}
    />
  ) : (
    <BibleTranslatesContextProvider>
      <CmScheduleWidgetBroadcastBibleControlled
        isCantTranslateLive={isCantTranslateLive}
        fio={auth.fio}
        headTitle={schedule.title}
        schedule={schedule}
      />
    </BibleTranslatesContextProvider>
  );
};
