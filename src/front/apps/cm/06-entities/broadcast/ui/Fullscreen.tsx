import { propsOfClicker } from '#shared/lib/clicker/propsOfClicker';
import { FontSizeContain } from '#shared/ui/font-size-contain/FontSizeContain';
import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { CmCom } from '$cm/ext';
import {
  useCmBroadcastClose,
  useCmBroadcastScreenComNavigations,
  useCmBroadcastScreenComTextNavigations,
} from '$cm/features/broadcast';
import { atom, useAtom } from 'atomaric';
import { useEffect, useReducer } from 'react';
import styled, { css, keyframes } from 'styled-components';

const forceUpdater = (it: number) => it + 1;
const style = { padding: '5px' };

const isShowInfoAtom = atom(true);

export const CmBroadcastFullscreen = () => {
  const [forceUpdates, forceUpdate] = useReducer(forceUpdater, 0);
  const [isShowInfo, setIsShowInfo] = useAtom(isShowInfoAtom);

  const { text, nextSlide, prevSlide } = useCmBroadcastScreenComTextNavigations();
  const { nextCom, prevCom } = useCmBroadcastScreenComNavigations();
  const closeBroadcast = useCmBroadcastClose();
  const html = CmCom.makeEachLineFirstLetterUpperCase([text])[0];

  useEffect(() => {
    window.addEventListener('resize', forceUpdate);
    return () => window.removeEventListener('resize', forceUpdate);
  }, []);

  return (
    <FullContent
      containerClassName="p-0"
      hideCloseButton
      forceOpen
      onClose={closeBroadcast}
    >
      <StyledContainer
        className="BroadcastFullscreen relative z-300 justify-center items-center bg-black w-[100vw] h-[100vh]"
        $isShowInfo={isShowInfo}
      >
        <div className="absolute rotate-[-90deg] text-xKO top-[4em] left-[-3.5em] z-200">⇣ Закрыть ⇣</div>

        <StyledWrapper className="bg-black z-1000 transition-transform duration-100 text-white w-[100vw] h-[100vh]">
          <FontSizeContain
            className="flex center w-[100%] h-[100%] text-white font-bold bg-black text-center whitespace-pre [&_.shadow-child]:p-[10px]"
            html={html}
            style={style}
            subUpdates={forceUpdates}
          />
          <div
            className="top-area info-area top-(--safe-gap) left-(--safe-gap) pointer"
            {...propsOfClicker({ onDblClick: prevCom })}
          >
            <div className="description">
              дважды клик&nbsp;-
              <br />
              предыдущая песня
            </div>
          </div>
          <div
            className="top-area info-area top-(--safe-gap) right-(--safe-gap) pointer"
            {...propsOfClicker({ onDblClick: nextCom })}
          >
            <div className="description">
              дважды клик&nbsp;-
              <br />
              следующая песня
            </div>
          </div>
          <LazyIcon
            icon="Cancel01"
            className="close-info-button pointer absolute top-(--half-safe-gap) right-(--half-safe-gap) opacity-0"
            onClick={() => setIsShowInfo(false)}
          />
          <div
            className="bottom-area info-area bottom-(--safe-gap) left-(--safe-gap) pointer"
            onClick={prevSlide}
          >
            <div className="description">
              клик&nbsp;-
              <br />
              предыдущий слайд
            </div>
          </div>
          <div
            className="bottom-area info-area bottom-(--safe-gap) right-(--safe-gap) pointer"
            onClick={nextSlide}
          >
            <div className="description">
              клик&nbsp;-
              <br />
              следующий слайд
            </div>
          </div>
        </StyledWrapper>
      </StyledContainer>
    </FullContent>
  );
};

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
  }
`;
