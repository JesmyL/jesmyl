import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { BibleLiveTranslation } from '$bible/translations/BibleLiveTranslation';
import { IndexSchWTranslationLiveDataValue } from '$index/Index.model';
import { useSwitchCurrentTranslationTextApp } from 'front/components/apps/+complect/translations/hooks/current-app';
import React, { memo, useCallback } from 'react';
import { schLiveTsjrpcClient } from './live.tsjrpc';
import { LiveTranslationAppProps } from './model';

const BibleTranslationControlled = React.lazy(() => import('$bible/translations/BibleTranslationControlled'));

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
        <BibleLiveTranslation
          fio={fio}
          onSend={onSend}
        />
      )}
      <BibleTranslationControlled
        head={
          <LazyIcon
            icon="Book02"
            className="pointer margin-gap-r"
            onClick={() => switchCurrApp()}
          />
        }
        headTitle={headTitle}
      />
    </>
  );
});
