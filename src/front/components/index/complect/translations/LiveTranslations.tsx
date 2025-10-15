import { useScreenTranslationWindows } from '#features/translations/hooks/windows';
import { useTranslationInitialSlideSet } from '#features/translations/initial-slide-context';
import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { BibleTranslatesContextProvider } from '$bible/basis/contexts/TranslatesContext';
import { CmTranslationFollowInitialSlide } from '$cm/features/translation/ui/FollowTranslationInitialSlide';
import { useAuth } from '$index/atoms';
import { indexIDB } from '$index/db/index-idb';
import { complectIDB } from '$index/state/complectIDB';
import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect, useState } from 'react';
import { IScheduleWidgetWid } from 'shared/api';
import { itNNull } from 'shared/utils';
import { schLiveTsjrpcClient } from './live.tsjrpc';
import { IndexScheduleWidgetBibleTranslationsControlled } from './LiveBible';
import { ScheduleWidgetLiveCmTranslations } from './LiveCm';

export const IndexScheduleWidgetTranslations = ({ schw }: { schw: IScheduleWidgetWid | und }) => {
  const auth = useAuth();
  const windows = useScreenTranslationWindows();
  const isCm = complectIDB.useValue.currentTranslationTextApp() === 'cm';
  const [isCantTranslateLive, setIsCantTranslateLive] = useState(true);
  const schedule = useLiveQuery(() => schw && indexIDB.db.schs.get(schw), [schw]);
  const setInitialSlide = useTranslationInitialSlideSet();

  useEffect(() => {
    if (!schedule) return;

    setInitialSlide(<CmTranslationFollowInitialSlide schw={schedule.w} />);
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
    <ScheduleWidgetLiveCmTranslations
      isCantTranslateLive={isCantTranslateLive}
      fio={auth.fio}
      headTitle={schedule.title}
      schedule={schedule}
    />
  ) : (
    <BibleTranslatesContextProvider>
      <IndexScheduleWidgetBibleTranslationsControlled
        isCantTranslateLive={isCantTranslateLive}
        fio={auth.fio}
        headTitle={schedule.title}
        schedule={schedule}
      />
    </BibleTranslatesContextProvider>
  );
};
