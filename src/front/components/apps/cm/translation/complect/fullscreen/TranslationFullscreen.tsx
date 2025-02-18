import { atom, useAtom } from 'front/08-shared/lib/atoms';
import { backSwipableContainerMaker } from 'front/08-shared/lib/backSwipableContainerMaker';
import { useActualRef } from 'front/08-shared/lib/hooks/useActualRef';
import { LazyIcon } from 'front/08-shared/ui/the-icon/LazyIcon';
import { useEffect, useReducer, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import FontSizeContain from '../../../base/font-size-contain/FontSizeContain';
import { useCloseTranslation } from '../hooks/close-translation';
import { useCmScreenTranslationComNavigations } from '../hooks/com-navigation';
import { useCmScreenTranslationComTextNavigations } from '../hooks/com-texts';

const emptyObj = {};
const forceUpdater = (it: number) => it + 1;
const style = { padding: '5px' };

const isShowAtom = atom(true);

export default function TranslationFullscreen() {
  const [forceUpdates, forceUpdate] = useReducer(forceUpdater, 0);
  const [isShowInfo, setIsShowInfo] = useAtom(isShowAtom);
  const [swipes, setSwipes] = useState(emptyObj);

  const { text, nextText, prevText } = useCmScreenTranslationComTextNavigations();
  const { nextCom, prevCom } = useCmScreenTranslationComNavigations();
  const closeTranslation = useCloseTranslation();

  const closeTranslationRef = useActualRef(closeTranslation);

  useEffect(() => {
    setSwipes(backSwipableContainerMaker(() => closeTranslationRef.current()));
  }, [closeTranslationRef]);

  useEffect(() => {
    window.addEventListener('resize', forceUpdate);
    return () => window.removeEventListener('resize', forceUpdate);
  }, []);

  return (
    <StyledContainer
      className="TranslationFullscreen"
      {...swipes}
      $isShowInfo={isShowInfo}
    >
      <StyledWrapper>
        <StyledScreen
          className="flex center"
          html={text}
          style={style}
          subUpdates={forceUpdates}
        />
        <div
          className="top-area info-area left pointer"
          onDoubleClick={prevCom}
        >
          <div className="description">
            дважды клик&nbsp;-
            <br />
            предыдущая песня
          </div>
        </div>
        <div
          className="top-area info-area right pointer"
          onDoubleClick={nextCom}
        >
          <div className="description">
            дважды клик&nbsp;-
            <br />
            следующая песня
          </div>
        </div>
        <LazyIcon
          icon="Cancel01"
          className="close-info-button pointer"
          onClick={() => setIsShowInfo(false)}
        />
        <div
          className="bottom-area info-area left pointer"
          onClick={prevText}
        >
          <div className="description">
            клик&nbsp;-
            <br />
            предыдущий слайд
          </div>
        </div>
        <div
          className="bottom-area info-area right pointer"
          onClick={nextText}
        >
          <div className="description">
            клик&nbsp;-
            <br />
            следующий слайд
          </div>
        </div>
      </StyledWrapper>
    </StyledContainer>
  );
}

const StyledScreen = styled(FontSizeContain)`
  width: 100%;
  height: 100%;
  color: white;
  font-weight: bold;
  background-color: black;
  text-align: center;
  white-space: pre;

  .shadow-child {
    padding: 10px;
  }
`;

const closeInfoAnimation = keyframes`${css`
  from {
    margin-left: 0px;
  }
  20% {
    margin-left: 0px;
  }
  20% {
    margin-left: 30px;
  }
  45% {
    margin-left: 20px;
  }
  50% {
    margin-left: 30px;
  }
  55% {
    margin-left: 20px;
  }
  70% {
    margin-left: 30px;
  }
  to {
    margin-left: 0px;
  }
`}`;

const StyledContainer = styled.div<{ $isShowInfo: boolean }>`
  position: relative;
  z-index: 300;
  justify-content: center;
  align-items: center;
  background-color: black;
  width: 100vw;
  height: 100vh;

  &:before {
    content: '⇣ Закрыть ⇣';
    position: absolute;
    rotate: -90deg;
    color: var(--color--ko);
    top: 4em;
    left: -4em;

    z-index: 200;
  }

  ${props =>
    props.$isShowInfo &&
    css`
      animation: ${closeInfoAnimation} 3s;

      ${StyledWrapper} {
        --first-bg: #999;
        --second-bg: grey;

        .close-info-button {
          opacity: 1;
          pointer-events: all;
        }

        .open-info-button {
          opacity: 0;
        }

        > .info-area {
          color: white;
        }

        > .top-area {
          ${area('second')}
        }

        > .bottom-area {
          ${area('first')}
        }
      }
    `}
`;

const area = (bgArea: 'first' | 'second') => {
  return css`
    --gradient-color: var(--${bgArea}-bg);
    background: repeating-linear-gradient(
      -60deg,
      var(--gradient-color) 0,
      var(--gradient-color) 1px,
      transparent 1px,
      transparent 5px
    );
  `;
};

const StyledWrapper = styled.div`
  --safe-gap: 50px;
  --block-height: 40%;
  --center-width: 20%;
  --half-safe-gap: calc(var(--safe-gap) / 3);
  --block-width: calc((100% - var(--safe-gap) * 2 - var(--center-width)) / 2);
  --center-left: calc(var(--safe-gap) + var(--block-width));
  z-index: 1000;
  transition: transform 0.1s;

  background: black;
  width: 100vw;
  height: 100vh;
  color: white;

  .close-info-button {
    position: absolute;
    top: var(--half-safe-gap);
    right: var(--half-safe-gap);
    opacity: 0;
    pointer-events: none;
  }

  .open-info-button {
    opacity: 1;
    transition: opacity 0.4s;
  }

  > .info-area {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #0000;
    text-align: center;
  }

  > .bottom-area,
  > .top-area {
    position: absolute;
    width: var(--block-width);
    height: var(--block-height);

    &.left {
      left: var(--safe-gap);
    }

    &.right {
      right: var(--safe-gap);
    }
  }

  > .top-area {
    top: var(--safe-gap);
  }

  > .bottom-area {
    bottom: var(--safe-gap);
  }
`;
