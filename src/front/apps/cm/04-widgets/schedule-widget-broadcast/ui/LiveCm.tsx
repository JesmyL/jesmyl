import { broadcastCurrentTextAppAtom } from '#features/broadcast/atoms';
import { LiveBroadcastAppProps } from '#shared/model/cm/Cm.model';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useCmComCurrent } from '$cm/entities/com';
import { CmBroadcastSlidesContext } from '$cm/features/broadcast';
import { CmLiveSlidesAudioTrackBroadcast } from '$cm/features/LiveSlidesAudioTrackBroadcast';
import { CmLiveSlidesSimpleBroadcast } from '$cm/features/LiveSlidesSimpleBroadcast';
import { useCmBroadcastScreenConfig } from '$cm/shared/lib/broadcast';
import { cmIsTrackBroadcastAtom } from '$cm/shared/state';
import { CmBroadcastControlled } from '$cm/widgets/broadcast';
import { useAtomValue } from 'atomaric';

export const CmScheduleWidgetBroadcastLiveCm = (props: LiveBroadcastAppProps) => {
  const isTrackBroadcast = useAtomValue(cmIsTrackBroadcastAtom);
  const config = useCmBroadcastScreenConfig(0);
  const com = useCmComCurrent();

  return (
    com && (
      <>
        <CmBroadcastSlidesContext textCase={config?.case}>
          {isTrackBroadcast ? (
            <CmLiveSlidesAudioTrackBroadcast
              {...props}
              com={com}
            />
          ) : (
            <CmLiveSlidesSimpleBroadcast
              {...props}
              com={com}
            />
          )}
          <CmBroadcastControlled
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
