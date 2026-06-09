import { Button } from '#shared/components/ui/button';
import { ButtonGroup } from '#shared/components/ui/button-group';
import { propagationStopper } from '#shared/lib/event-funcs';
import { EditableComOrder } from '$cm+editor/shared/classes/EditableComOrder';
import styled from '@emotion/styled';
import { useAtomValue } from 'atomaric';
import { arrayByLength } from 'shared/utils/object.utils';
import { twMerge } from 'tailwind-merge';
import { cmEditorTabComRepeatsStateAtom } from '../state/atoms';
import { CmEditorTabComRepeatsRemoveButton } from './ComRepeatsRemoveButton';

interface Props {
  ord: EditableComOrder;
}

export const CmEditorTabComRepeatsCountButtonPanel = ({ ord }: Props) => {
  const { flashCount, isChordBlock, pos, start } = useAtomValue(cmEditorTabComRepeatsStateAtom);
  if (!start) return;

  const { linei: startLinei, wordi: startWordi, ord: startOrd } = start;

  const flashes = ord.regions?.filter(it => it.startLinei === start.linei && it.startWordi === start.wordi);

  return (
    <StyledPanel
      className={twMerge('absolute flex z-1300', (!start || ord !== start.ord) && 'hidden')}
      style={pos}
    >
      <Button
        icon="Cancel01"
        className="button pointer bg-x6! text-x1!"
        onClick={event => {
          propagationStopper(event);
          cmEditorTabComRepeatsStateAtom.reset();
        }}
      />
      {!flashes?.length || (
        <CmEditorTabComRepeatsRemoveButton
          ord={ord}
          textLinei={start.linei}
          wordi={start.wordi}
        />
      )}
      <ButtonGroup.Root>
        {arrayByLength(5, i => i + (isChordBlock ? 2 : 1)).map(currFlashCount => {
          return (
            <Button
              key={currFlashCount}
              className={twMerge('button pointer text-x1!', flashCount === currFlashCount ? 'bg-x7!' : 'bg-x3!')}
              onClick={() => cmEditorTabComRepeatsStateAtom.do.update(state => (state.flashCount = currFlashCount))}
            >
              {currFlashCount}
            </Button>
          );
        })}
      </ButtonGroup.Root>
      {isChordBlock || flashCount === 1 || (
        <Button
          icon="Flag03"
          className="button text-x6! bg-x2!"
          onClick={() => {
            cmEditorTabComRepeatsStateAtom.do.$setField(
              startOrd,
              { [`~${startLinei}:${startWordi}`]: flashCount - 1 },
              start.ord.repeats,
            );
          }}
        />
      )}
    </StyledPanel>
  );
};

const StyledPanel = styled.div`
  --size: min(calc(100vw / 10), 70px);

  top: calc(var(--y) * 1px - var(--size) * 1.2);
  left: calc(var(--x) * 1px);
  transition: 0.5s;

  &.hidden {
    opacity: 0;
    pointer-events: none;
  }

  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 1;
    margin-left: 0.2em;
    border-radius: 0.3em;
    padding: 5px;

    width: var(--size);
    height: var(--size);
  }
`;
