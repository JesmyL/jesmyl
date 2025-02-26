import { useAtom } from '#shared/lib/atoms';
import { isTouchDevice } from '#shared/lib/device-differences';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { memo } from 'react';
import { itNIt } from 'shared/utils';
import styled from 'styled-components';
import { metronomeIsPlayAtom } from '../lib/atoms';

export const MetronomePlayButton = memo(function MetronomePlayButton() {
  const [isPlay, setIsPlay] = useAtom(metronomeIsPlayAtom);

  return (
    <div
      className={'pointer'}
      onMouseDown={isTouchDevice ? undefined : () => setIsPlay(itNIt)}
      onTouchStart={isTouchDevice ? () => setIsPlay(itNIt) : undefined}
    >
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
