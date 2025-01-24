import useMeetingComFaceList from 'front/components/apps/cm/lists/meetings/useMeetingComFaceList';
import { useMeetingPathParts } from 'front/components/apps/cm/lists/meetings/useMeetingPathParts';
import { useEffect } from 'react';
import { useAtomValue } from '../../../../complect/atoms';
import IconButton from '../../../../complect/the-icon/IconButton';
import { IconBookOpen02StrokeRounded } from '../../../../complect/the-icon/icons/book-open-02';
import { useSwitchCurrentTranslationTextApp } from '../../../apps/+complect/translations/hooks/current-app';
import { translationBlockAtom } from '../../../apps/cm/atoms';
import { useCcom } from '../../../apps/cm/col/com/useCcom';
import CmTranslationControlled from '../../../apps/cm/translation/complect/controlled/CmTranslationControlled';
import { useCmScreenTranslationConfigs } from '../../../apps/cm/translation/complect/controlled/hooks/configs';
import { ScheduleWidgetCurrentCmTranslationList } from '../../../apps/cm/translation/complect/live/SchWgtCurrentList';
import { IndexSchWTranslationLiveDataValue } from '../../Index.model';
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

  const scopeProps = useMeetingPathParts();
  const { coms } = useMeetingComFaceList(scopeProps.schw, scopeProps.dayi, scopeProps.eventMi);

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
    <ScheduleWidgetCurrentCmTranslationList schedule={schedule}>
      <CmTranslationControlled
        head={
          <IconButton
            Icon={IconBookOpen02StrokeRounded}
            className="margin-gap-r"
            onClick={() => switchCurrApp()}
          />
        }
        comList={coms}
        headTitle={headTitle}
        backButtonPath=".."
      />
    </ScheduleWidgetCurrentCmTranslationList>
  );
};
