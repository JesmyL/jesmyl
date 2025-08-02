import { TextInput } from '#shared/ui/TextInput';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useAtom } from 'atomaric';
import { memo } from 'react';
import styled from 'styled-components';
import { metronomeUserBpmAtom } from '../lib/atoms';

export const MetronomeBpmInput = memo(function MetronomeBpmInput() {
  const [userBpm, setUserBpm] = useAtom(metronomeUserBpmAtom);

  return (
    <StyledBox className="flex flex-gap column">
      <LazyIcon
        icon="MinusSignCircle"
        kind="BulkRounded"
        className="pointer"
        onClick={() => setUserBpm(prev => prev - 1)}
      />

      <StyledBpmInput
        type="tel"
        value={'' + userBpm}
        onInput={value => setUserBpm(+value)}
      />

      <LazyIcon
        icon="PlusSignCircle"
        kind="BulkRounded"
        className="pointer"
        onClick={() => setUserBpm(prev => prev + 1)}
      />
    </StyledBox>
  );
});

const StyledBpmInput = styled(TextInput)`
  width: 3em;
  text-align: center;
`;

const StyledBox = styled.label`
  margin: 20px 0;
  max-width: 50px;
`;
