import { TextInput } from '#shared/ui/TextInput';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useAtomValue } from 'atomaric';
import { memo } from 'react';
import styled from 'styled-components';
import { metronomeUserBpmAtom } from '../lib/atoms';

export const MetronomeBpmInput = memo(function MetronomeBpmInput() {
  const userBpm = useAtomValue(metronomeUserBpmAtom);

  return (
    <StyledBox className="flex gap-2 column">
      <LazyIcon
        icon="MinusSignCircle"
        kind="BulkRounded"
        className="pointer"
        onClick={() => metronomeUserBpmAtom.do.increment(-1)}
      />

      <StyledBpmInput
        type="tel"
        value={'' + userBpm}
        onInput={value => metronomeUserBpmAtom.set(+value)}
      />

      <LazyIcon
        icon="PlusSignCircle"
        kind="BulkRounded"
        className="pointer"
        onClick={() => metronomeUserBpmAtom.do.increment(1)}
      />
    </StyledBox>
  );
});

const StyledBpmInput = styled(TextInput)`
  width: 4em;
  text-align: center;
`;

const StyledBox = styled.label`
  margin: 20px 0;
  max-width: 60px;
`;
