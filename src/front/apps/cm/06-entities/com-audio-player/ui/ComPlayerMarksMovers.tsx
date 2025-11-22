import { Button } from '#shared/components/ui/button';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { useFetchFreshComAudioMarksPack } from '$cm/shared/api/useFetchFreshComAudioMarksPack';
import { Atom, useAtomValue } from 'atomaric';
import { HttpLink } from 'shared/api';
import { twMerge } from 'tailwind-merge';
import { CmCom } from '../../com/lib/Com';
import { useCmComAudioPlayerMoversController } from '../lib/useCmComAudioPlayerMoversController';

interface Props {
  src: HttpLink;
  com: CmCom;
  repeatButtonClassName?: string;
  preSwitchTimeAtom: Atom<number>;
  win?: Window | nil;
  isHidePanelOnEmptyMarks?: boolean;
}

const preSwitchTimeSelectItems = [-1, 0, 1, 2, 3, 4].map(id => ({
  id,
  title: <span className="w-[.7em]">{id < 0 ? '×' : id}</span>,
}));

export const CmComAudioPlayerMarksMovers = (props: Props) => {
  const preSwitchTime = useAtomValue(props.preSwitchTimeAtom);

  useFetchFreshComAudioMarksPack(props.com);

  const { nextRef, prevRef, repeatRef, titleRef, audioTrackMarks } = useCmComAudioPlayerMoversController(
    props.src,
    props.com,
    preSwitchTime,
    props.win,
  );

  if (audioTrackMarks == null && props.isHidePanelOnEmptyMarks) return null;

  return (
    <div className="flex gap-3 w-full justify-center">
      <Button
        icon="ArrowLeft02"
        ref={prevRef}
      />

      <Dropdown
        id={preSwitchTime}
        items={preSwitchTimeSelectItems}
        onSelectId={props.preSwitchTimeAtom.set}
        hiddenArrow
      />

      <Button
        ref={repeatRef}
        icon="Refresh"
        className={twMerge('w-full max-w-[calc(100vw-173px)]', props.repeatButtonClassName)}
      >
        <span
          className="ellipsis"
          ref={titleRef}
        />
      </Button>

      <Button
        ref={nextRef}
        icon="ArrowRight02"
      />
    </div>
  );
};
