import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { ComPlayer } from '$cm/col/com/player/ComPlayer';
import { useState } from 'react';

interface Props {
  srcs: string[];
  onToggle: (src: string) => Promise<unknown>;
  icon: KnownStameskaIconName;
  isCanDelete?: boolean;
}

export const ComAudioControlledList = ({ srcs, onToggle, icon, isCanDelete }: Props) => {
  const [tracksInProcess, setTracksInProcess] = useState<string[]>([]);

  return (
    <>
      {srcs.map(src => {
        return (
          <div
            key={src}
            className="com-audio-track flex gap-2 my-2 w-full"
          >
            <ComPlayer
              audioSrcs={src}
              isPlayOwnOnly
            />
            {isCanDelete !== false && (
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
            )}
          </div>
        );
      })}
    </>
  );
};
