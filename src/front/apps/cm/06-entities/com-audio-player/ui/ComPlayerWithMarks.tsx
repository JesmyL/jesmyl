import { Badge } from '#shared/components/ui/badge';
import { CmCom } from '$cm/ext';
import { cmComTrackPreSwitchTimeAtom } from '$cm/shared/state';
import { useAtomValue } from 'atomaric';
import { HttpLink } from 'shared/api';
import { twMerge } from 'tailwind-merge';
import { isCmComAudioPlayerOpenMoversAtom } from '../state/atoms';
import { CmComAudioPlayer } from './ComPlayer';
import { CmComAudioPlayerMarksMovers } from './ComPlayerMarksMovers';

interface Props {
  audioLinks: HttpLink[];
  com: CmCom;
  className?: string;
  hideMarksForce?: boolean;
}

export const CmComAudioPlayerWithMarks = (props: Props) => {
  const isOpenButtons = useAtomValue(isCmComAudioPlayerOpenMoversAtom);

  return (
    <CmComAudioPlayer
      className={twMerge('fixed top-(--header-height) left-0 w-full z-20', props.className)}
      audioLinks={props.audioLinks}
      addRender={src =>
        !props.hideMarksForce &&
        isOpenButtons && (
          <CmComAudioPlayerMarksMovers
            src={src}
            com={props.com}
            preSwitchTimeAtom={cmComTrackPreSwitchTimeAtom}
            isHidePanelOnEmptyMarks
          />
        )
      }
      timeRender={
        props.hideMarksForce
          ? undefined
          : timeNode => (
              <Badge
                variant={isOpenButtons ? 'destructive' : 'secondary'}
                onClick={isCmComAudioPlayerOpenMoversAtom.do.toggle}
              >
                {timeNode}
              </Badge>
            )
      }
    />
  );
};
