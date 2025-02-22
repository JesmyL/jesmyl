import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { BibleLiveTranslation } from '@bible/translations/BibleLiveTranslation';
import { BibleTranslationControlled } from '@bible/translations/BibleTranslationControlled';
import { IndexSchWTranslationLiveDataValue } from '@index/Index.model';
import { useSwitchCurrentTranslationTextApp } from 'front/components/apps/+complect/translations/hooks/current-app';
import { memo, useCallback } from 'react';
import { schLiveSokiInvocatorClient } from './live-invocator';
import { LiveTranslationAppProps } from './model';

export const IndexScheduleWidgetBibleTranslationsControlled: React.FC<LiveTranslationAppProps> = memo(function BibleTr({
  isCantTranslateLive,
  fio,
  headTitle,
  schedule,
}) {
  const switchCurrApp = useSwitchCurrentTranslationTextApp();
  const onSend = useCallback(
    (liveData: IndexSchWTranslationLiveDataValue) => schLiveSokiInvocatorClient.next(null, schedule.w, liveData),
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
