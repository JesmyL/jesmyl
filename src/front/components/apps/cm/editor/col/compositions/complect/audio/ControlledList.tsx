import { TheIconLoading } from 'front/complect/the-icon/IconLoading';
import { TheIconProps } from 'front/complect/the-icon/model';
import { useState } from 'react';
import ComPlayer from '../../../../../col/com/player/ComPlayer';

interface Props {
  srcs: string[];
  onToggle: (src: string) => Promise<unknown>;
  ActionIcon: React.FC<TheIconProps>;
}

export const ComAudioControlledList = ({ srcs, onToggle, ActionIcon }: Props) => {
  const [tracksInProcess, setTracksInProcess] = useState<string[]>([]);

  return (
    <>
      {srcs.map(src => {
        return (
          <div
            key={src}
            className="flex flex-gap margin-gap-v full-width"
          >
            <ComPlayer src={src} />
            <TheIconLoading
              isLoading={tracksInProcess.includes(src)}
              Icon={ActionIcon}
              className="pointer"
              onClick={async () => {
                setTracksInProcess(tracksInProcess.concat(src));
                await onToggle(src);
                setTracksInProcess(tracksInProcess.filter(s => s !== src));
              }}
            />
          </div>
        );
      })}
    </>
  );
};
