import { useSwitchCurrentTranslationTextApp } from '#features/broadcast/hooks/current-app';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { BibleBroadcastLive } from '$bible/widgets/broadcast/ui/BibleLiveTranslation';

import { IndexSchWTranslationLiveDataValue } from '$index/Index.model';
import React, { memo, useCallback } from 'react';
import { schLiveTsjrpcClient } from './live.tsjrpc';
import { LiveTranslationAppProps } from './model';

const BibleTranslationControlled = React.lazy(() => import('$bible/widgets/broadcast/ui/BibleTranslationControlled'));

export const IndexScheduleWidgetBibleTranslationsControlled: React.FC<LiveTranslationAppProps> = memo(function BibleTr({
  isCantTranslateLive,
  fio,
  headTitle,
  schedule,
}) {
  const switchCurrApp = useSwitchCurrentTranslationTextApp();
  const onSend = useCallback(
    (liveData: IndexSchWTranslationLiveDataValue) => schLiveTsjrpcClient.next({ schw: schedule.w, data: liveData }),
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
      <BibleTranslationControlled
        head={
          <LazyIcon
            icon="Book02"
            className="pointer mr-2"
            onClick={() => switchCurrApp()}
          />
        }
        headTitle={headTitle}
      />
    </>
  );
});
