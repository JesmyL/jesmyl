import { translateBase } from '#basis/locale';
import { electronPresentationTsjrpcClientBase } from '#basis/tsjrpc.electron/presentation.cli.base';
import { broadcastCurrentTextAppAtom } from '#features/broadcast/atoms';
import { useScreenBroadcastWindows } from '#features/broadcast/hooks/windows';
import { scheduleFollowBroadcastSlideAtom } from '#features/broadcast/initial-slide-context';
import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { BibleLiveControlled } from '$bible/features/Live/ui/LiveBible';
import { CmBroadcastFollowInitialSlide } from '$cm/features/broadcast';
import { indexIDB, useAuth } from '$index/shared/state';
import { schLiveTsjrpcClient } from '$index/shared/tsjrpc';
import { useAtomValue } from 'atomaric';
import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect, useState } from 'react';
import { ScheduleWidgetWid } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { itNNull } from 'shared/utils';
import { takeUserAuthName } from 'shared/utils/user.utils';
import { CmScheduleWidgetBroadcastLiveCm } from './LiveCm';

export const CmScheduleWidgetBroadcast = ({ schw }: { schw: ScheduleWidgetWid | und }) => {
  const auth = useAuth();
  const windows = useScreenBroadcastWindows();
  const isCm = useAtomValue(broadcastCurrentTextAppAtom) === 'cm';
  const [isCantTranslateLive, setIsCantTranslateLive] = useState(true);
  const schedule = useLiveQuery(() => schw && indexIDB.db.schs.get(schw), [schw]);

  useEffect(() => {
    if (!schedule) return;

    scheduleFollowBroadcastSlideAtom.set(<CmBroadcastFollowInitialSlide schw={schedule.w} />);
  }, [schedule]);

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

  const userName = takeUserAuthName(auth);
  if (!userName) return <div className="flex center full-size text-xKO">{translateBase(BaseLocaleKey.NotAuthorized)}</div>;
  if (schedule == null)
    return <div className="flex center full-size text-xKO">{translateBase(BaseLocaleKey.ScheduleNotFound)}</div>;

  return isCm ? (
    <CmScheduleWidgetBroadcastLiveCm
      isCantTranslateLive={isCantTranslateLive}
      fio={userName}
      headTitle={schedule.title}
      schw={schedule.w}
    />
  ) : (
    <BibleLiveControlled
      isCantTranslateLive={isCantTranslateLive}
      fio={userName}
      headTitle={schedule.title}
      schw={schedule.w}
    />
  );
};

electronPresentationTsjrpcClientBase.$$register();
