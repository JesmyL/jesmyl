import { BibleTranslationPage } from '#pages/bible/BibleTranslationPage';
import { LazyIcon } from 'front/08-shared/ui/the-icon/LazyIcon';
import { memo, useCallback } from 'react';
import { useSwitchCurrentTranslationTextApp } from '../../../apps/+complect/translations/hooks/current-app';
import BibleLiveTranslation from '../../../apps/bible/translations/BibleLiveTranslation';
import { IndexSchWTranslationLiveDataValue } from '../../Index.model';
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
      <BibleTranslationPage
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
