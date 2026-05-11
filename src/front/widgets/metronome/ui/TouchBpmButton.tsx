import { isTouchDevice } from '#shared/lib/device-differences';
import styled from '@emotion/styled';
import { memo } from 'react';
import { takeCorrectMetronomeBpm } from 'shared/utils/cm';
import { metronomeCurrentBpmAtom } from '../lib/atoms';

let lastTs: number;

export const MetronomeTouchBpmButton = memo(function MetronomeTouchBpmButton() {
  const touchBpm = () => {
    const delta = Date.now() - (lastTs ?? Date.now());
    lastTs = Date.now();
    if (delta < 0 || delta > 12000) return;
    metronomeCurrentBpmAtom.set(takeCorrectMetronomeBpm(Math.ceil(60_000 / delta)));
  };

  return (
    <StyledTapButton
      className={'w-20 rounded-full! aspect-1/1'}
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
