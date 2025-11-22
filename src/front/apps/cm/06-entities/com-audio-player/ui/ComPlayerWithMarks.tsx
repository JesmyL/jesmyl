import { Badge } from '#shared/components/ui/badge';
import { atom, useAtomValue } from 'atomaric';
import { HttpLink } from 'shared/api';
import { twMerge } from 'tailwind-merge';
import { CmCom } from '../../com/lib/Com';
import { isCmComAudioPlayerOpenMoversAtom } from '../state/atoms';
import { CmComAudioPlayer } from './ComPlayer';
import { CmComAudioPlayerMarksMovers } from './ComPlayerMarksMovers';

interface Props {
  audioLinks: HttpLink[];
  com: CmCom;
  className?: string;
  hideMarksForce?: boolean;
}
const preSwitchTimeAtom = atom(2, 'cm:comAudioPreSwitchTime');

export const CmComAudioPlayerWithMarks = (props: Props) => {
  const isOpenButtons = useAtomValue(isCmComAudioPlayerOpenMoversAtom);

  return (
    <CmComAudioPlayer
      className={twMerge('fixed top-[var(--header-height)] left-0 w-full z-20', props.className)}
      audioLinks={props.audioLinks}
      addRender={src =>
        !props.hideMarksForce &&
        isOpenButtons && (
          <CmComAudioPlayerMarksMovers
            src={src}
            com={props.com}
            preSwitchTimeAtom={preSwitchTimeAtom}
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
