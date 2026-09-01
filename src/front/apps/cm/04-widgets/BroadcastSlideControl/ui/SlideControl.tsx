import { Button } from '#shared/components';
import { CmBroadcastSlideLine } from '$cm/features/BroadcastSlideLine';
import { cmIsTrackBroadcastAtom } from '$cm/shared/state';
import { CmBroadcastAudioLine } from '$cm/widgets/BroadcastAudioLine';
import { ReactNode } from '@tanstack/react-router';
import { useAtomValue } from 'atomaric';
import { twMerge } from 'tailwind-merge';

export const CmBroadcastSlideControl = () => {
  const isTrackBroadcast = useAtomValue(cmIsTrackBroadcastAtom);

  const topNode = (nodes?: ReactNode) => {
    return (
      <div className="flex between px-3 mt-3">
        <Button
          icon="MusicNote01"
          className={twMerge('pointer mr-2', isTrackBroadcast && 'text-x7')}
          onClick={cmIsTrackBroadcastAtom.do.toggle}
        />
        {nodes}
      </div>
    );
  };

  return (
    <>{isTrackBroadcast ? <CmBroadcastAudioLine topNode={topNode} /> : <CmBroadcastSlideLine topNode={topNode} />}</>
  );
};
