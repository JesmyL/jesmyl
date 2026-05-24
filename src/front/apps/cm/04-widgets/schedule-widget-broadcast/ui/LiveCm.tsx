import { broadcastCurrentTextAppAtom, broadcastNextLiveDataAtom } from '#features/broadcast/atoms';
import { isShowBroadcastTextAtom } from '#features/broadcast/initial-slide-context';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { cmBroadcastSwitchBlockDirectionAtom } from '$cm/entities/broadcast';
import { useCmComCurrent } from '$cm/entities/com';
import {
  CmBroadcastSlidesContext,
  useCmBroadcastScreenComNavigations,
  useCmBroadcastSlidesContext,
} from '$cm/features/broadcast';
import { LiveBroadcastAppProps } from '$cm/shared/model';
import { cmIsTrackBroadcastAtom, cmShowChordedSlideModeAtom } from '$cm/shared/state';
import { CmBroadcastControlled, useCmBroadcastScreenConfigs } from '$cm/widgets/broadcast';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';
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

  const { currentSlidei, html, nextSlidei, slides, nextHtml } = useCmBroadcastSlidesContext();

  useEffect(() => {
    if (props.isCantTranslateLive || !ccom) return;

    return setTimeoutEffect(() => {
      const currentSlide = slides[currentSlidei];
      const nextSlide = slides[nextSlidei];

      const liveData: IndexSchWBroadcastLiveDataValue = {
        fio: props.fio,
        isHide,
        cm: {
          config: selfConfig,
          comw: ccom.wid,
          slidei: currentSlidei,

          fromLinei: currentSlide?.fromLinei ?? 0,
          toLinei: currentSlide?.toLinei ?? 0,

          text: html,
          isChorded: !currentSlide?.ord.isRealText(),

          nextText: nextHtml,
          isNextChorded: !nextSlide?.ord.isRealText(),
          dir,
          chordedMode,
        },
      };

      broadcastNextLiveDataAtom.set({ schw: props.schedule.w, data: liveData });
    }, 100);
  }, [
    currentSlidei,
    ccom,
    selfConfig,
    props.fio,
    props.isCantTranslateLive,
    props.schedule.w,
    nextSlidei,
    dir,
    isHide,
    slides,
    html,
    nextHtml,
    chordedMode,
  ]);

  return <></>;
};
