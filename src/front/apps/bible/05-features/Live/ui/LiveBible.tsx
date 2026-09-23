import { useScreenBroadcastWindows } from '#features/broadcast/hooks/windows';
import { BroadcastWelcomeQrSwitchButton } from '#features/broadcast/ui/WelcomeQrSwitchButton';
import { LiveBroadcastAppProps } from '#shared/model/cm/Cm.model';
import { BibleBroadcastLive } from '$bible/ext';
import { BibleBroadcastControlled } from '$bible/widgets/broadcast';
import { memo, useCallback } from 'react';
import { IndexSchWBroadcastLiveDataValue } from 'shared/model/index/Index.model';

export const BibleLiveControlled = memo(function BibleTr({
  isCantTranslateLive,
  fio,
  headTitle,
  schw,
}: LiveBroadcastAppProps) {
  const windows = useScreenBroadcastWindows();

  const onSend = useCallback(
    (liveData: IndexSchWBroadcastLiveDataValue) =>
      windows.forEach(win => {
        win?.send({ schw, data: liveData });
      }),
    [schw, windows],
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
