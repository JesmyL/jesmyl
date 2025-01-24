import { useLiveQuery } from 'dexie-react-hooks';
import { addEventListenerPipe, hookEffectPipe } from 'front/complect/hookEffectPipe';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { itNNull } from 'shared/utils';
import { useCurrentTranslationTextAppValue } from '../../../apps/+complect/translations/hooks/current-app';
import { useScreenTranslationWindows } from '../../../apps/+complect/translations/hooks/windows';
import { useTranslationInitialSlideSet } from '../../../apps/+complect/translations/initial-slide-context';
import BibleTranslatesContextProvider from '../../../apps/bible/translates/TranslatesContext';
import { FollowTranslationInitialSlide } from '../../../apps/cm/translation/complect/live/FollowTranslationInitialSlide';
import { useAuth } from '../../atoms';
import { indexIDB } from '../../db/index-idb';
import { IndexScheduleWidgetBibleTranslationsControlled } from './LiveBible';
import { ScheduleWidgetLiveCmTranslations } from './LiveCm';
import { schLiveSokiInvocatorClient } from './live-invocator';

export const IndexScheduleWidgetTranslations = () => {
  const auth = useAuth();
  const windows = useScreenTranslationWindows();
  const isCm = useCurrentTranslationTextAppValue() === 'cm';
  const [isCantTranslateLive, setIsCantTranslateLive] = useState(true);
  const schw = +useParams().schw!;
  const schedule = useLiveQuery(() => indexIDB.db.schs.get(schw), [schw]);
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
