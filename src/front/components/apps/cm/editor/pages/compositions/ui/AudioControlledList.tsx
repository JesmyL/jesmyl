import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { ComPlayer } from '$cm/col/com/player/ComPlayer';
import { useState } from 'react';

interface Props {
  srcs: string[];
  onToggle: (src: string) => Promise<unknown>;
  icon: TheIconKnownName;
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
            <ComPlayer src={src} />
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
