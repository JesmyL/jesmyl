import { useScreenBroadcastWindows } from '#features/broadcast/hooks/windows';
import { BroadcastWelcomeQrSwitchButton } from '#features/broadcast/ui/WelcomeQrSwitchButton';
import { LiveBroadcastAppProps } from '#shared/model/cm/Cm.model';
import { BibleBroadcastLive } from '$bible/ext';
import React, { memo, useCallback } from 'react';
import { ScheduleWidgetWidDef } from 'shared/api';
import { IndexSchWBroadcastLiveDataValue } from 'shared/model/index/Index.model';

const BibleBroadcastControlled = React.lazy(() =>
  import('$bible/widgets/broadcast/ui/Controlled').then(m => ({ default: m.BibleBroadcastControlled })),
);

export const CmScheduleWidgetBroadcastBibleControlled = memo(function BibleTr({
  isCantTranslateLive,
  fio,
  headTitle,
  schedule,
}: LiveBroadcastAppProps) {
  const windows = useScreenBroadcastWindows();

  const onSend = useCallback(
    (liveData: IndexSchWBroadcastLiveDataValue) =>
      windows.forEach(win => win?.send({ schw: schedule?.w ?? ScheduleWidgetWidDef, data: liveData })),
    [schedule?.w, windows],
  );

  return (
    <>
      {isCantTranslateLive || (
        <BibleBroadcastLive
          fio={fio}
          onSend={onSend}
        />
      )}
      <BibleBroadcastControlled
        head={<BroadcastWelcomeQrSwitchButton toggleAppIcon="Book02" />}
        headTitle={headTitle}
      />
    </>
  );
});
