import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
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
      className={twMerge('z-1300', props.start && props.ord === props.start.orderUnit && 'hidden')}
      style={props.pos as CSSProperties}
    >
      <div
        className="button close pointer"
        onClick={event => {
          event.stopPropagation();
          props.reset();
        }}
      >
        <LazyIcon icon="Cancel01" />
      </div>
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
      {[1, 2, 3, 4, 5].map(currFlashCount => {
        return (
          <div
            key={currFlashCount}
            className={twMerge('button pointer numeric', props.flashCount === currFlashCount && 'active')}
            onClick={() => props.setFlashCount(currFlashCount)}
          >
            {currFlashCount}
          </div>
        );
      })}
      {props.isChordBlock || (
        <div
          className="button flag pointer"
          onClick={() => {
            props.setField(
              props.startOrd,
              { [`~${props.startLinei}:${props.startWordi}`]: props.flashCount - 1 },
              props.start.orderUnit.repeats,
            );
            props.reset();
          }}
        >
          <LazyIcon icon="Flag03" />
        </div>
      )}
    </StyledPanel>
  );
};

const StyledPanel = styled.div`
  --size: ${window.innerWidth / 2 / 7}px;

  position: absolute;
  display: flex;
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

    &.close {
      --icon-color: var(--color--1);

      background: var(--color--6);
    }

    &.remove {
      --icon-color: white;

      background: var(--color--ko);
    }

    &.flag {
      --icon-color: var(--color--6);

      background: var(--color--2);
    }

    &.numeric {
      background: var(--color--3);
      color: var(--color--1);

      &.active {
        background: var(--color--7);
      }
    }
  }
`;
