import { useAtomValue } from '#shared/lib/atom';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { translationBlockAtom } from '$cm/atoms';
import { useCcom } from '$cm/basis/lib/com-selections';
import { CmTranslationControlled } from '$cm/translation/complect/controlled/CmTranslationControlled';
import { useCmScreenTranslationConfigs } from '$cm/translation/complect/controlled/hooks/configs';
import { useCmScreenTranslationComNavigations } from '$cm/translation/complect/hooks/com-navigation';
import { IndexSchWTranslationLiveDataValue } from '$index/Index.model';
import { useSwitchCurrentTranslationTextApp } from 'front/components/apps/+complect/translations/hooks/current-app';
import { useEffect } from 'react';
import { schLiveSokiInvocatorClient } from './live-invocator';
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
    if (isCantTranslateLive) return;

    return setTimeoutEffect(() => {
      if (!ccom?.texts) return;

      const line = ccom.translationMap(undefined);
      let toLinei = 0;

      for (let blocki = 0; blocki < currTexti + 1; blocki++) toLinei += line[blocki];

      const fromLinei = toLinei - line[currTexti];

      const liveData: IndexSchWTranslationLiveDataValue = {
        fio,
        cm: {
          comw: ccom.wid,
          texti: currTexti,
          fromLinei,
          toLinei,
          text: ccom.texts[currTexti],
          nextText: ccom.texts[currTexti + 1] || '',
          config,
        },
      };

      schLiveSokiInvocatorClient.next(null, schedule.w, liveData);
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
