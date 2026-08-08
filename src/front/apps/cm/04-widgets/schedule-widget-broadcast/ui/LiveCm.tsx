import { broadcastCurrentTextAppAtom } from '#features/broadcast/atoms';
import { LiveBroadcastAppProps } from '#shared/model/cm/Cm.model';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useCmComCurrent } from '$cm/entities/com';
import { CmBroadcastSlidesContext, useCmBroadcastScreenComNavigationComws } from '$cm/features/broadcast';
import { CmLiveSlidesAudioTrackBroadcast } from '$cm/features/LiveSlidesAudioTrackBroadcast';
import { CmLiveSlidesSimpleBroadcast } from '$cm/features/LiveSlidesSimpleBroadcast';
import { cmIsTrackBroadcastAtom } from '$cm/shared/state';
import { CmBroadcastControlled, useCmBroadcastScreenConfig } from '$cm/widgets/broadcast';
import { useAtomValue } from 'atomaric';

export const CmScheduleWidgetBroadcastLiveCm = (props: LiveBroadcastAppProps) => {
  const { comws } = useCmBroadcastScreenComNavigationComws();
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
            comws={comws}
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
