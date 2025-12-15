import { broadcastCurrentTextAppAtom } from '#features/broadcast/atoms';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { cmBroadcastBlockAtom } from '$cm/entities/broadcast';
import { useCmComCurrent } from '$cm/entities/com';
import { useCmBroadcastScreenComNavigations } from '$cm/features/broadcast';
import { LiveBroadcastAppProps } from '$cm/shared/model';
import { cmIsTrackBroadcastAtom } from '$cm/shared/state';
import { CmBroadcastControlled, useCmBroadcastScreenConfigs } from '$cm/widgets/broadcast';
import { IndexSchWBroadcastLiveDataValue } from '$index/shared/model/Index.model';
import { schLiveTsjrpcClient } from '$index/shared/tsjrpc/live.tsjrpc';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';

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
  const [config] = useCmBroadcastScreenConfigs();
  const currTexti = useAtomValue(cmBroadcastBlockAtom);

  useEffect(() => {
    if (props.isCantTranslateLive || !ccom) return;

    return setTimeoutEffect(() => {
      const blockLengths = ccom.broadcastMap(config.pushKind, true);
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

      const liveData: IndexSchWBroadcastLiveDataValue = {
        fio: props.fio,
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

      schLiveTsjrpcClient.next({ schw: props.schedule.w, data: liveData });
    }, 100);
  }, [ccom, config, currTexti, props.fio, props.isCantTranslateLive, props.schedule.w]);

  return <></>;
};
