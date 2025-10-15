import { useSwitchCurrentTranslationTextApp } from '#features/translations/hooks/current-app';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useCmComCurrent } from '$cm/entities/com/lib/com-selections';
import { cmTranslationBlockAtom } from '$cm/entities/translation/state/atoms';
import { useCmTranslationScreenComNavigations } from '$cm/features/translation';
import { CmTranslationControlled, useCmTranslationScreenConfigs } from '$cm/widgets/translation';
import { IndexSchWTranslationLiveDataValue } from '$index/Index.model';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { schLiveTsjrpcClient } from './live.tsjrpc';
import { LiveTranslationAppProps } from './model';

export const ScheduleWidgetLiveCmTranslations = ({
  isCantTranslateLive,
  fio,
  headTitle,
  schedule,
}: LiveTranslationAppProps) => {
  const ccom = useCmComCurrent();
  const [config] = useCmTranslationScreenConfigs();
  const switchCurrApp = useSwitchCurrentTranslationTextApp();
  const currTexti = useAtomValue(cmTranslationBlockAtom);
  const { coms } = useCmTranslationScreenComNavigations();

  useEffect(() => {
    if (isCantTranslateLive || !ccom) return;

    return setTimeoutEffect(() => {
      const blockLengths = ccom.translationMap(config.pushKind, true);
      let toLinei = 0;
      let chordedBlocksCount = 0;

      for (let blocki = 0; blocki <= currTexti + chordedBlocksCount; blocki++) {
        if (blockLengths[blocki] < 0) {
          toLinei += 1;
          chordedBlocksCount++;
          continue;
        }
        toLinei += blockLengths[blocki];
      }

      const fromLinei = toLinei - blockLengths[currTexti + chordedBlocksCount];
      const texts = ccom.getOrderedTexts(true, config.pushKind);

      const liveData: IndexSchWTranslationLiveDataValue = {
        fio,
        cm: {
          comw: ccom.wid,
          texti: currTexti,
          fromLinei,
          toLinei,
          text: texts[currTexti],
          nextText: texts[currTexti + 1] || '',
          config,
        },
      };

      schLiveTsjrpcClient.next({ schw: schedule.w, data: liveData });
    }, 100);
  }, [ccom, config, currTexti, fio, isCantTranslateLive, schedule.w]);

  return (
    <CmTranslationControlled
      head={
        <LazyIcon
          icon="BookOpen02"
          className="pointer mr-2"
          onClick={() => switchCurrApp()}
        />
      }
      comList={coms}
      headTitle={headTitle}
    />
  );
};
