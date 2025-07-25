import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { ComPlayer } from '$cm/col/com/player/ComPlayer';
import { useState } from 'react';
import { StameskaIconName } from 'stameska-icon';

interface Props {
  srcs: string[];
  onToggle: (src: string) => Promise<unknown>;
  icon: StameskaIconName;
}

export const ComAudioControlledList = ({ srcs, onToggle, icon }: Props) => {
  const [tracksInProcess, setTracksInProcess] = useState<string[]>([]);

  return (
    <>
      {srcs.map(src => {
        return (
          <div
            key={src}
            className="com-audio-track flex flex-gap margin-gap-v full-width"
          >
            <ComPlayer
              audioSrcs={src}
              isPlayOwnOnly
            />
            <TheIconLoading
              isLoading={tracksInProcess.includes(src)}
              icon={icon}
              className="add-com-audio-button pointer"
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
