import { broadcastCurrentTextAppAtom } from '#features/broadcast/atoms';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useCmComCurrent } from '$cm/entities/com';
import { useCmBroadcastMinimalConfigSlides, useCmBroadcastScreenComNavigations } from '$cm/features/broadcast';
import { LiveBroadcastAppProps } from '$cm/shared/model';
import { cmIsTrackBroadcastAtom } from '$cm/shared/state';
import { CmBroadcastControlled } from '$cm/widgets/broadcast';
import { schLiveTsjrpcClient } from '$index/shared/tsjrpc/live.tsjrpc';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { IndexSchWBroadcastLiveDataValue } from 'shared/model/index/Index.model';

export const CmScheduleWidgetBroadcastLiveCm = (props: LiveBroadcastAppProps) => {
  const { coms } = useCmBroadcastScreenComNavigations();
  const isTrackBroadcast = useAtomValue(cmIsTrackBroadcastAtom);

  return (
    <>
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
    </>
  );
};

const LiveReport = (props: LiveBroadcastAppProps) => {
  const ccom = useCmComCurrent();
  const { currentSlidei, selfSlides, selfConfig } = useCmBroadcastMinimalConfigSlides(0);

  useEffect(() => {
    if (props.isCantTranslateLive || !ccom) return;

    return setTimeoutEffect(() => {
      const currentSlide = selfSlides[currentSlidei];
      const nextSlide = selfSlides[currentSlidei + 1];

      const liveData: IndexSchWBroadcastLiveDataValue = {
        fio: props.fio,
        cm: {
          config: selfConfig,
          comw: ccom.wid,
          texti: currentSlidei,

          fromLinei: currentSlide.fromLinei,
          toLinei: currentSlide.toLinei,

          text: currentSlide?.lines.join('\n'),
          isChorded: !currentSlide?.ord.isRealText(),

          nextText: nextSlide?.lines.join('\n') || '',
          isNextChorded: !nextSlide?.ord.isRealText(),
        },
      };

      schLiveTsjrpcClient.next({ schw: props.schedule.w, data: liveData });
    }, 100);
  }, [currentSlidei, ccom, selfConfig, props.fio, props.isCantTranslateLive, props.schedule.w, selfSlides]);

  return <></>;
};
