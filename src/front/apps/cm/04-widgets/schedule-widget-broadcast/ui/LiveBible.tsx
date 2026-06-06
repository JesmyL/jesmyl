import { broadcastCurrentTextAppAtom, broadcastNextLiveDataAtom } from '#features/broadcast/atoms';
import { LiveBroadcastAppProps } from '#shared/model/cm/Cm.model';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { BibleBroadcastLive } from '$bible/ext';
import React, { memo, useCallback } from 'react';
import { IScheduleWidgetWid } from 'shared/api';
import { IndexSchWBroadcastLiveDataValue } from 'shared/model/index/Index.model';

const BibleBroadcastControlled = React.lazy(() => import('$bible/widgets/broadcast/ui/Controlled'));

export const CmScheduleWidgetBroadcastBibleControlled = memo(function BibleTr({
  isCantTranslateLive,
  fio,
  headTitle,
  schedule,
}: LiveBroadcastAppProps) {
  const onSend = useCallback(
    (liveData: IndexSchWBroadcastLiveDataValue) =>
      broadcastNextLiveDataAtom.set({ schw: schedule?.w ?? IScheduleWidgetWid.none, data: liveData }),
    [schedule?.w],
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
        head={
          <LazyIcon
            icon="Book02"
            className="pointer mr-2"
            onClick={broadcastCurrentTextAppAtom.do.switch}
          />
        }
        headTitle={headTitle}
      />
    </>
  );
});
