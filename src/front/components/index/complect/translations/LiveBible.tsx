import { memo, useCallback } from 'react';
import IconButton from '../../../../complect/the-icon/IconButton';
import { IconBook02StrokeRounded } from '../../../../complect/the-icon/icons/book-02';
import { useSwitchCurrentTranslationTextApp } from '../../../apps/+complect/translations/hooks/current-app';
import BibleLiveTranslation from '../../../apps/bible/translations/BibleLiveTranslation';
import BibleTranslationControlled from '../../../apps/bible/translations/BibleTranslationControlled';
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
      <BibleTranslationControlled
        head={
          <IconButton
            Icon={IconBook02StrokeRounded}
            className="margin-gap-r"
            onClick={() => switchCurrApp()}
          />
        }
        headTitle={headTitle}
      />
    </>
  );
});
