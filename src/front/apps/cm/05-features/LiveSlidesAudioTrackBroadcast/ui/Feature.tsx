import { isShowBroadcastTextAtom } from '#features/broadcast/initial-slide-context';
import { broadcastConnectionDto } from '#features/broadcast/lib/connection.dto';
import { LiveBroadcastAppProps } from '#shared/model/cm/Cm.model';
import { cmBroadcastSwitchBlockDirectionAtom } from '$cm/entities/broadcast';
import { useCmComCurrentMarkValues } from '$cm/ext';
import { cmShowChordedSlideModeAtom } from '$cm/shared/state';
import { useCmBroadcastScreenConfigs } from '$cm/widgets/broadcast';
import { useAuth } from '$index/shared/state';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { ScheduleWidgetWidNone } from 'shared/api';
import { CmCom } from 'shared/const/cm/Com';
import { IndexSchWBroadcastLiveDataValue } from 'shared/model/index/Index.model';

export const CmLiveSlidesAudioTrackBroadcast = (props: LiveBroadcastAppProps & { com: CmCom }) => {
  const config = useCmBroadcastScreenConfigs()[0];
  const chordedMode = useAtomValue(cmShowChordedSlideModeAtom);
  const dir = useAtomValue(cmBroadcastSwitchBlockDirectionAtom);
  const isHide = !useAtomValue(isShowBroadcastTextAtom);

  const { html, nextHtml, audioSlides, slidei } = useCmComCurrentMarkValues(props.com, config.case);

  const fio = useAuth().fio ?? '';
  const currentSlide = audioSlides.at(slidei);
  const nextSlide = audioSlides.at(slidei + 1);

  const { fromLinei, id, toLinei, minText } = currentSlide?.slide || {};
  const isChorded = !!currentSlide?.isChorded;
  const isNextChorded = !!nextSlide?.isChorded;
  const schw = props.schedule?.w ?? ScheduleWidgetWidNone;
  const comw = props.com.wid;

  useEffect(() => {
    return setTimeoutEffect(() => {
      const liveData: IndexSchWBroadcastLiveDataValue = {
        fio,
        isHide,
        cm: {
          config,
          comw,
          slideId: id,

          fromLinei: fromLinei ?? 0,
          toLinei: toLinei ?? 0,

          text: html,
          html,
          hash: minText ?? '',
          isChorded,

          nextText: nextHtml,
          isNextChorded,
          dir,
          chordedMode,
        },
      };

      broadcastConnectionDto.sendLiveData({ schw, data: liveData });
    }, 100);
  }, [
    chordedMode,
    comw,
    config,
    dir,
    fio,
    fromLinei,
    html,
    id,
    isChorded,
    isHide,
    isNextChorded,
    minText,
    nextHtml,
    schw,
    toLinei,
  ]);

  return <></>;
};
