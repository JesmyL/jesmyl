import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { itNNull } from 'shared/utils';
import { soki } from '../../../../soki';
import { useCurrentTranslationTextAppValue } from '../../../apps/+complect/translations/hooks/current-app';
import { useScreenTranslationWindows } from '../../../apps/+complect/translations/hooks/windows';
import { useTranslationInitialSlideSet } from '../../../apps/+complect/translations/initial-slide-context';
import BibleTranslatesContextProvider from '../../../apps/bible/translates/TranslatesContext';
import { FollowTranslationInitialSlide } from '../../../apps/cm/translation/complect/live/FollowTranslationInitialSlide';
import { ScheduleWidgetTranslationLiveDataKey } from '../../Index.model';
import { useAuth, useIndexSchedules } from '../../molecules';
import { useDeviceId } from '../takeDeviceId';
import { IndexScheduleWidgetBibleTranslationsControlled } from './LiveBible';
import { ScheduleWidgetLiveCmTranslations } from './LiveCm';

export const IndexScheduleWidgetTranslations = () => {
  const auth = useAuth();
  const windows = useScreenTranslationWindows();
  const isCm = useCurrentTranslationTextAppValue() === 'cm';
  const [isCantTranslateLive, setIsCantTranslateLive] = useState(true);
  const schedules = useIndexSchedules();
  const setInitialSlide = useTranslationInitialSlideSet();
  const deviceId = useDeviceId();

  const schw = +useParams().schw!;
  const schedule = isNaN(schw) ? null : schedules?.find(item => item.w === schw);

  useEffect(() => {
    if (!schedule) return;

    setInitialSlide(<FollowTranslationInitialSlide schw={schedule.w} />);
  }, [schedule, setInitialSlide]);

  const subscribeData: ScheduleWidgetTranslationLiveDataKey = `index-sch-${schedule!?.w}:${deviceId}%${auth.login!}`;

  useEffect(() => {
    if (windows.some(itNNull)) setIsCantTranslateLive(false);
    else {
      setIsCantTranslateLive(true);
      soki.send({ liveData: null, subscribeData }, 'index');
    }

    const onUnload = () => soki.send({ liveData: null, subscribeData }, 'index');

    window.addEventListener('unload', onUnload);
    return () => window.removeEventListener('unload', onUnload);
  }, [auth.login, subscribeData, windows]);

  if (auth.fio === undefined) return <div className="flex center full-size color--ko">Не авторизован</div>;

  return isCm ? (
    <ScheduleWidgetLiveCmTranslations
      isCantTranslateLive={isCantTranslateLive}
      fio={auth.fio}
      subscribeData={subscribeData}
      headTitle={schedule?.title}
      schedule={schedule}
    />
  ) : (
    <BibleTranslatesContextProvider>
      <IndexScheduleWidgetBibleTranslationsControlled
        isCantTranslateLive={isCantTranslateLive}
        fio={auth.fio}
        subscribeData={subscribeData}
        headTitle={schedule?.title}
      />
    </BibleTranslatesContextProvider>
  );
};
