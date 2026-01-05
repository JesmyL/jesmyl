import { Button } from '#shared/components/ui/button';
import { ButtonGroup } from '#shared/components/ui/button-group';
import { EditableComOrder } from '$cm+editor/shared/classes/EditableComOrder';
import { IEditableComLineProps } from '$cm+editor/shared/model/Repeats';
import { CSSProperties, Dispatch, SetStateAction } from 'react';
import { OrderRepeats } from 'shared/api';
import styled from 'styled-components';
import { twMerge } from 'tailwind-merge';
import { CmEditorTabComRepeatsRemoveButton } from './ComRepeatsRemoveButton';

export const CmEditorTabComRepeatsCountButtonPanel = (props: {
  pos: CSSProperties;
  flashCount: number;
  isChordBlock: boolean;
  ord: EditableComOrder;
  setFlashCount: Dispatch<SetStateAction<number>>;
  start: IEditableComLineProps;
  startLinei: number | und;
  startOrd: EditableComOrder | und;
  reset: () => void;
  startWordi: number | und;
  setField: (ord?: EditableComOrder | null, repeateds?: OrderRepeats | nil, prevs?: OrderRepeats | nil) => void;
}) => {
  const flashes = props.ord.regions?.filter(
    it => it.startLinei === props.start.textLinei && it.startWordi === props.start.wordi,
  );

  return (
    <StyledPanel
      className={twMerge('absolute flex z-1300', (!props.start || props.ord !== props.start.orderUnit) && 'hidden')}
      style={props.pos}
    >
      <Button
        icon="Cancel01"
        className="button pointer bg-x6! text-x1!"
        onClick={event => {
          event.stopPropagation();
          props.reset();
        }}
      />
      {!flashes?.length || (
        <CmEditorTabComRepeatsRemoveButton
          isChordBlock={props.isChordBlock}
          ord={props.ord}
          reset={props.reset}
          setField={props.setField}
          startOrd={props.start.orderUnit}
          textLinei={props.start.textLinei}
          wordi={props.start.wordi}
        />
      )}
      <ButtonGroup.Root>
        {[1, 2, 3, 4, 5].map(currFlashCount => {
          return (
            <Button
              key={currFlashCount}
              className={twMerge('button pointer text-x1!', props.flashCount === currFlashCount ? 'bg-x7!' : 'bg-x3!')}
              onClick={() => props.setFlashCount(currFlashCount)}
            >
              {currFlashCount}
            </Button>
          );
        })}
      </ButtonGroup.Root>
      {props.isChordBlock || props.flashCount === 1 || (
        <Button
          icon="Flag03"
          className="button text-x6! bg-x2!"
          onClick={() => {
            props.setField(
              props.startOrd,
              { [`~${props.startLinei}:${props.startWordi}`]: props.flashCount - 1 },
              props.start.orderUnit.repeats,
            );
            props.reset();
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
