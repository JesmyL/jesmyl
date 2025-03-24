import { useAtomSet } from '#shared/lib/atom';
import { isTouchDevice } from '#shared/lib/device-differences';
import { memo } from 'react';
import styled from 'styled-components';
import { metronomeUserBpmAtom } from '../lib/atoms';

let lastTs: number;

export const MetronomeTouchBpmButton = memo(function MetronomeTouctBpmButton() {
  const setUserBpm = useAtomSet(metronomeUserBpmAtom);

  const touchBpm = () => {
    const delta = Date.now() - (lastTs ?? Date.now());
    lastTs = Date.now();
    if (delta < 0 || delta > 12000) return;
    setUserBpm(Math.ceil(60_000 / delta));
  };

  return (
    <StyledTapButton
      className={'strong-size'}
      onMouseDown={isTouchDevice ? undefined : touchBpm}
      onTouchStart={isTouchDevice ? touchBpm : undefined}
    />
  );
});

const StyledTapButton = styled.div`
  --size: 30cqmin;

  background-color: var(--color--7);
  border-radius: var(--size);
`;
