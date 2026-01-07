import { isTouchDevice } from '#shared/lib/device-differences';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useAtom } from 'atomaric';
import { memo, useRef } from 'react';
import { itNIt } from 'shared/utils';
import styled from 'styled-components';
import { metronomeIsPlayAtom } from '../lib/atoms';
import audioSrc from './silent.wav';

export const MetronomePlayButton = memo(function MetronomePlayButton() {
  const elemRef = useRef<HTMLAudioElement>(null);
  const [isPlay, setIsPlay] = useAtom(metronomeIsPlayAtom);
  const togglePlay = () => {
    if (!isPlay) elemRef.current?.play();
    setIsPlay(itNIt);
  };

  return (
    <div
      className="pointer"
      onMouseDown={isTouchDevice ? undefined : togglePlay}
      onTouchStart={isTouchDevice ? togglePlay : undefined}
    >
      <audio
        ref={elemRef}
        src={audioSrc}
      />
      {isPlay ? (
        <StyledIcon
          icon="Pause"
          kind="SolidRounded"
        />
      ) : (
        <StyledIcon
          icon="Play"
          kind="SolidRounded"
        />
      )}
    </div>
  );
});

const StyledIcon = styled(LazyIcon)`
  transform: scale(9);
  margin: 0 90px 90px 0;

  transition: filter 0.2s;

  @container (width < 300px) {
    transform: scale(6);
    margin: 60px;
  }

  @container (width < 200px) {
    transform: scale(5);
    margin: 50px;
  }
`;
