import styled from 'styled-components';
import { fixedResizerLinesAtom } from '../../atoms';
import { FixedResizerLines, ScreenBroadcastPositionConfig } from '../../model';

interface Props {
  prop: 'vert' | 'horz';
  fixedResizerLines: FixedResizerLines | null;
  config: ScreenBroadcastPositionConfig;
  updateConfig: (config: Partial<ScreenBroadcastPositionConfig>) => void;
}

export const PositionConfiguratorsResizersHalfFixer = ({ prop, config, fixedResizerLines, updateConfig }: Props) => {
  const positionProp = prop === 'horz' ? 'left' : 'top';
  const sizeProp = prop === 'horz' ? 'width' : 'height';

  return (
    <Fixer
      className={prop}
      onClick={event => {
        if (event.ctrlKey) {
          fixedResizerLinesAtom.set({
            type: prop,
            value: config[positionProp] + config[sizeProp] / 2,
          });
          return;
        }

        fixedResizerLinesAtom.set(null);

        if (!event.shiftKey || fixedResizerLines === null) return;
        const newPosition = fixedResizerLines.value;

        updateConfig({
          [positionProp]:
            newPosition - config[sizeProp] / 2 < 0
              ? 0
              : newPosition + config[sizeProp] / 2 > 100
                ? 100 - config[sizeProp]
                : newPosition - config[sizeProp] / 2,
        });
      }}
    />
  );
};

const size = 15;
const sizePx = `${size}px`;
const boardColor = 'yellow';

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
