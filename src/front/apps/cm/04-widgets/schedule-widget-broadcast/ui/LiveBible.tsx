import { broadcastCurrentTextAppAtom } from '#features/broadcast/atoms';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { BibleBroadcastLive } from '$bible/ext';
import { LiveBroadcastAppProps } from '$cm/shared/model';
import { IndexSchWBroadcastLiveDataValue } from '$index/shared/model/Index.model';
import { schLiveTsjrpcClient } from '$index/shared/tsjrpc/live.tsjrpc';
import React, { memo, useCallback } from 'react';

const BibleBroadcastControlled = React.lazy(() => import('$bible/widgets/broadcast/ui/Controlled'));

export const CmScheduleWidgetBroadcastBibleControlled: React.FC<LiveBroadcastAppProps> = memo(function BibleTr({
  isCantTranslateLive,
  fio,
  headTitle,
  schedule,
}) {
  const onSend = useCallback(
    (liveData: IndexSchWBroadcastLiveDataValue) => schLiveTsjrpcClient.next({ schw: schedule.w, data: liveData }),
    [schedule.w],
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
