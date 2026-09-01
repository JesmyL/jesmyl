import { isShowBroadcastTextAtom } from '#features/broadcast/initial-slide-context';
import { broadcastConnectionDto } from '#features/broadcast/lib/connection.dto';
import { LiveBroadcastAppProps } from '#shared/model/cm/Cm.model';
import { cmBroadcastSwitchBlockDirectionAtom } from '$cm/entities/broadcast';
import { useCmBroadcastSlidesContext } from '$cm/ext';
import { useCmBroadcastScreenConfigs } from '$cm/shared/lib/broadcast';
import { cmShowChordedSlideModeAtom } from '$cm/shared/state';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { ScheduleWidgetWidNone } from 'shared/api';
import { CmCom } from 'shared/const/cm/Com';
import { IndexSchWBroadcastLiveDataValue } from 'shared/model/index/Index.model';

export const CmLiveSlidesSimpleBroadcast = (props: LiveBroadcastAppProps & { com: CmCom }) => {
  const config = useCmBroadcastScreenConfigs()[0];
  const chordedMode = useAtomValue(cmShowChordedSlideModeAtom);
  const dir = useAtomValue(cmBroadcastSwitchBlockDirectionAtom);
  const isHide = !useAtomValue(isShowBroadcastTextAtom);

  const { slidei, html, nextSlidei, slides, nextHtml, slideId, hash } = useCmBroadcastSlidesContext();

  useEffect(() => {
    if (props.isCantTranslateLive || !props.com) return;

    return setTimeoutEffect(() => {
      const currentSlide = slides.at(slidei);
      const nextSlide = slides.at(nextSlidei);

      const liveData: IndexSchWBroadcastLiveDataValue = {
        fio: props.fio ?? '',
        isHide,
        cm: {
          config,
          comw: props.com.wid,
          slideId,

          fromLinei: currentSlide?.fromLinei ?? 0,
          toLinei: currentSlide?.toLinei ?? 0,

          text: html,
          html,
          hash,
          isChorded: !!currentSlide?.ord.isChBlock(),

          nextText: nextHtml,
          isNextChorded: !!nextSlide?.ord.isChBlock(),
          dir,
          chordedMode,
        },
      };

      broadcastConnectionDto.sendLiveData({ schw: props.schedule?.w ?? ScheduleWidgetWidNone, data: liveData });
    }, 100);
  }, [
    config,
    props.fio,
    props.isCantTranslateLive,
    props.schedule?.w,
    nextSlidei,
    dir,
    isHide,
    slides,
    html,
    nextHtml,
    chordedMode,
    slidei,
    slideId,
    hash,
    props.com,
  ]);

  return <></>;
};
