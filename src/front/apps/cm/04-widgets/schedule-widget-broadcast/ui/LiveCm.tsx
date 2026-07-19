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
import { CmBroadcastControlled, useCmBroadcastScreenConfig, useCmBroadcastScreenConfigs } from '$cm/widgets/broadcast';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { ScheduleWidgetWidNone } from 'shared/api';
import { CmCom } from 'shared/const/cm/Com';
import { IndexSchWBroadcastLiveDataValue } from 'shared/model/index/Index.model';

export const CmScheduleWidgetBroadcastLiveCm = (props: LiveBroadcastAppProps) => {
  const { coms } = useCmBroadcastScreenComNavigations();
  const isTrackBroadcast = useAtomValue(cmIsTrackBroadcastAtom);
  const config = useCmBroadcastScreenConfig(0);
  const com = useCmComCurrent();

  return (
    com && (
      <>
        <CmBroadcastSlidesContext
          textCase={config?.case}
          com={com}
        >
          {isTrackBroadcast || (
            <LiveReport
              {...props}
              com={com}
            />
          )}
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
    )
  );
};

const LiveReport = (props: LiveBroadcastAppProps & { com: CmCom }) => {
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

      broadcastNextLiveDataAtom.set({ schw: props.schedule?.w ?? ScheduleWidgetWidNone, data: liveData });
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
