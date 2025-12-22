import styled from 'styled-components';
import { fixedResizerLinesAtom } from '../../atoms';

interface Props {
  prop: 'vert' | 'horz';
}

export const PositionConfiguratorsResizersHalfWrapperFixer = ({ prop }: Props) => {
  return (
    <Fixer
      className={prop}
      onClick={event => {
        if (event.ctrlKey) fixedResizerLinesAtom.set({ type: prop, value: 50 });
        else fixedResizerLinesAtom.set(null);
      }}
    />
  );
};

const size = 15;
const sizePx = `${size}px`;
const boardColor = 'red';

const Fixer = styled.div`
  position: absolute;

  &:hover {
    background: ${boardColor};
    opacity: 0.3;
  }

  &:before {
    content: '';
    position: absolute;
  }

  &.vert {
    position: absolute;
    z-index: 100;

    width: 100%;
    height: ${sizePx};
    top: calc(50% - ${sizePx} / 2);
    cursor: ns-resize;

    &:before {
      width: 100%;
      height: 0;
      border-top: 2px ${boardColor} dotted;
      left: 0;
      top: 50%;
    }
  }

  &.horz {
    position: absolute;
    z-index: 100;

    height: 100%;
    width: ${sizePx};
    left: calc(50% - ${sizePx} / 2);
    cursor: ew-resize;

    &:before {
      width: 0;
      height: 100%;
      border-left: 2px ${boardColor} dotted;
      top: 0;
      left: 50%;
    }
  }
`;
