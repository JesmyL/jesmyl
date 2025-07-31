import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { translationBlockAtom } from '$cm/atoms';
import { useCcom } from '$cm/basis/lib/com-selections';
import { CmTranslationControlled } from '$cm/translation/complect/controlled/CmTranslationControlled';
import { useCmScreenTranslationConfigs } from '$cm/translation/complect/controlled/hooks/configs';
import { useCmScreenTranslationComNavigations } from '$cm/translation/complect/hooks/com-navigation';
import { IndexSchWTranslationLiveDataValue } from '$index/Index.model';
import { useAtomValue } from 'atomaric';
import { useSwitchCurrentTranslationTextApp } from 'front/components/apps/+complect/translations/hooks/current-app';
import { useEffect } from 'react';
import { schLiveTsjrpcClient } from './live.tsjrpc';
import { LiveTranslationAppProps } from './model';

export const ScheduleWidgetLiveCmTranslations = ({
  isCantTranslateLive,
  fio,
  headTitle,
  schedule,
}: LiveTranslationAppProps) => {
  const ccom = useCcom();
  const [config] = useCmScreenTranslationConfigs();
  const switchCurrApp = useSwitchCurrentTranslationTextApp();
  const currTexti = useAtomValue(translationBlockAtom);
  const { coms } = useCmScreenTranslationComNavigations();

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
          className="pointer margin-gap-r"
          onClick={() => switchCurrApp()}
        />
      }
      comList={coms}
      headTitle={headTitle}
    />
  );
};
