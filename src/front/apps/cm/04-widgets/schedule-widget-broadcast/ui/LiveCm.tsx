import { broadcastCurrentTextAppAtom } from '#features/broadcast/atoms';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { cmBroadcastBlockAtom } from '$cm/entities/broadcast';
import { useCmComCurrent } from '$cm/entities/com';
import { useCmBroadcastScreenComNavigations } from '$cm/features/broadcast';
import { LiveBroadcastAppProps } from '$cm/shared/model';
import { cmIsTrackBroadcastAtom } from '$cm/shared/state';
import { CmBroadcastControlled, useCmBroadcastScreenConfigs } from '$cm/widgets/broadcast';
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
  const [config] = useCmBroadcastScreenConfigs();
  const currTexti = useAtomValue(cmBroadcastBlockAtom);

  useEffect(() => {
    if (props.isCantTranslateLive || !ccom) return;

    return setTimeoutEffect(() => {
      const list = ccom.groupSlideLinesByKind(ccom.takeSolidTextLines(), config.pushKind);
      const textLines = list.flatMap(({ list }) => list);

      let toLinei = 0;
      let chordedBlocksCount = 0;

      for (let blocki = 0; blocki <= currTexti + chordedBlocksCount; blocki++) {
        if (textLines[blocki].length < 0) {
          toLinei += 1;
          chordedBlocksCount++;
          continue;
        }
        toLinei += textLines[blocki].length;
      }

      const fromLinei = toLinei - textLines[currTexti + chordedBlocksCount].length;

      const liveData: IndexSchWBroadcastLiveDataValue = {
        fio: props.fio,
        cm: {
          comw: ccom.wid,
          texti: currTexti,
          fromLinei,
          toLinei,
          text: textLines[currTexti].join('\n'),
          nextText: textLines[currTexti + 1]?.join('\n') || '',
          config,
        },
      };

      schLiveTsjrpcClient.next({ schw: props.schedule.w, data: liveData });
    }, 100);
  }, [ccom, config, currTexti, props.fio, props.isCantTranslateLive, props.schedule.w]);

  return <></>;
};
