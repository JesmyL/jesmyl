import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { BibleTranslatesContextProvider } from '$bible/basis/contexts/TranslatesContext';
import { FollowTranslationInitialSlide } from '$cm/translation/complect/live/FollowTranslationInitialSlide';
import { useAuth } from '$index/atoms';
import { indexIDB } from '$index/db/index-idb';
import { useLiveQuery } from 'dexie-react-hooks';
import { complectIDB } from 'front/components/apps/+complect/_idb/complectIDB';
import { useScreenTranslationWindows } from 'front/components/apps/+complect/translations/hooks/windows';
import { useTranslationInitialSlideSet } from 'front/components/apps/+complect/translations/initial-slide-context';
import { useEffect, useState } from 'react';
import { IScheduleWidgetWid } from 'shared/api';
import { itNNull } from 'shared/utils';
import { schLiveSokiInvocatorClient } from './live-invocator';
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

    setInitialSlide(<FollowTranslationInitialSlide schw={schedule.w} />);
  }, [schedule, setInitialSlide]);

  useEffect(() => {
    if (schedule?.w == null) return;
    if (windows.some(itNNull)) setIsCantTranslateLive(false);
    else {
      setIsCantTranslateLive(true);
      schLiveSokiInvocatorClient.reset(null, schedule.w);
    }

    return hookEffectPipe()
      .pipe(addEventListenerPipe(window, 'unload' as never, () => schLiveSokiInvocatorClient.reset(null, schedule.w)))
      .effect();
  }, [schedule?.w, windows]);

  if (auth.fio === undefined) return <div className="flex center full-size color--ko">Не авторизован</div>;
  if (schedule == null) return <div className="flex center full-size color--ko">Расписание не найдено</div>;

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
