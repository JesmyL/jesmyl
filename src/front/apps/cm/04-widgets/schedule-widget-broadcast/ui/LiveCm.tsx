import { broadcastCurrentTextAppAtom, broadcastNextLiveDataAtom } from '#features/broadcast/atoms';
import { isShowBroadcastTextAtom } from '#features/broadcast/initial-slide-context';
import { LiveBroadcastAppProps } from '#shared/model/cm/Cm.model';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { cmBroadcastSwitchBlockDirectionAtom } from '$cm/entities/broadcast';
import { useCmComCurrent } from '$cm/entities/com';
import {
  CmBroadcastSlidesContext,
  useCmBroadcastScreenComNavigations,
  useCmBroadcastSlidesContext,
} from '$cm/features/broadcast';
import { cmIsTrackBroadcastAtom, cmShowChordedSlideModeAtom } from '$cm/shared/state';
import { CmBroadcastControlled, useCmBroadcastScreenConfigs } from '$cm/widgets/broadcast';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { IScheduleWidgetWid } from 'shared/api';
import { IndexSchWBroadcastLiveDataValue } from 'shared/model/index/Index.model';

export const CmScheduleWidgetBroadcastLiveCm = (props: LiveBroadcastAppProps) => {
  const { coms } = useCmBroadcastScreenComNavigations();
  const isTrackBroadcast = useAtomValue(cmIsTrackBroadcastAtom);

  return (
    <>
      <CmBroadcastSlidesContext configi={0}>
        {isTrackBroadcast || <LiveReport {...props} />}
        <CmBroadcastControlled
          comList={coms}
          headTitle={props.headTitle}
          head={
            <LazyIcon
              icon="BookOpen02"
              className="pointer mr-2"
              onClick={broadcastCurrentTextAppAtom.do.switch}
            />
          }
        />
      </CmBroadcastSlidesContext>
    </>
  );
};

const LiveReport = (props: LiveBroadcastAppProps) => {
  const ccom = useCmComCurrent();
  const selfConfig = useCmBroadcastScreenConfigs()[0];
  const chordedMode = useAtomValue(cmShowChordedSlideModeAtom);
  const dir = useAtomValue(cmBroadcastSwitchBlockDirectionAtom);
  const isHide = !useAtomValue(isShowBroadcastTextAtom);

  const { slidei, html, nextSlidei, slides, nextHtml, slideId } = useCmBroadcastSlidesContext();

  useEffect(() => {
    if (props.isCantTranslateLive || !ccom) return;

    return setTimeoutEffect(() => {
      const currentSlide = slides[slidei];
      const nextSlide = slides[nextSlidei];

      const liveData: IndexSchWBroadcastLiveDataValue = {
        fio: props.fio ?? '',
        isHide,
        cm: {
          config: selfConfig,
          comw: ccom.wid,
          slideId,

          fromLinei: currentSlide?.fromLinei ?? 0,
          toLinei: currentSlide?.toLinei ?? 0,

          text: html,
          isChorded: currentSlide?.ord.isChBlock(),

          nextText: nextHtml,
          isNextChorded: nextSlide?.ord.isChBlock(),
          dir,
          chordedMode,
        },
      };

      broadcastNextLiveDataAtom.set({ schw: props.schedule?.w ?? IScheduleWidgetWid.none, data: liveData });
    }, 100);
  }, [
    ccom,
    selfConfig,
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
  ]);

  return <></>;
};
