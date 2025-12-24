import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { mylib } from '#shared/lib/my-lib';
import { With4AtomsValue } from '#shared/ui/With4AtomsValue';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import styled, { css } from 'styled-components';
import {
  gamerMemoryGiantBoardImageisAtom,
  gamerMemoryGiantCurrentKeyNumberAtom,
  gamerMemoryGiantGuessedImageisAtom,
  gamerMemoryGiantShowAllImagesAtom,
  gamerMemoryGiantShownImageisAtom,
  gamerMemoryGiantUsedImagesAtom,
} from '../state/atoms';
import { GamerMemoryGiantImageCardByMd5 } from './ImageCardByMd5';
import { GamerMemoryGiantWinResizes } from './WinResizes';

export const GamerMemoryGiantBoard = (props: { win: Window; minusWinHeight?: number }) => {
  const imageis = useAtomValue(gamerMemoryGiantBoardImageisAtom);

  useEffect(() => {
    const maxNumber = imageis?.length ?? 0;

    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(props.win, 'keydown', event => {
          if (mylib.isNaN(+event.key)) return;

          gamerMemoryGiantCurrentKeyNumberAtom.set(currentNumber => {
            if (event.key === ' ') {
              gamerMemoryGiantShownImageisAtom.do.touch(+currentNumber - 1);
              return '';
            }

            const newNumber = `${currentNumber}${event.key}`;

            if (maxNumber < +newNumber) return '';

            return newNumber;
          });
        }),
      )
      .effect();
  }, [imageis, props.win]);

  return (
    <With4AtomsValue
      atoms={[
        gamerMemoryGiantShowAllImagesAtom,
        gamerMemoryGiantGuessedImageisAtom,
        gamerMemoryGiantUsedImagesAtom,
        gamerMemoryGiantShownImageisAtom,
      ]}
      render={(isShowAll, guessedImageiSet, images, shownImageiSet) => (
        <GamerMemoryGiantWinResizes win={props.win}>
          {winParameters => {
            const cardSize = calculateCardSize(
              winParameters.w,
              winParameters.h - (props.minusWinHeight ?? 0),
              imageis?.length ?? 0,
            );
            return (
              <StyledBoard $shownImageiSet={shownImageiSet}>
                {imageis?.map((index, indexi) => {
                  const imageMd5 = images[index];

                  return (
                    imageMd5 && (
                      <StyledCard
                        key={indexi}
                        $isShown={isShowAll || shownImageiSet.has(indexi)}
                        $isGuessed={guessedImageiSet.has(indexi)}
                      >
                        <StyledCardFrontSide
                          imageMd5={imageMd5}
                          size={cardSize}
                          onClick={() => gamerMemoryGiantShownImageisAtom.do.toggle(indexi)}
                        />
                        <StyledCardBackSide $cardSize={cardSize}>{indexi + 1}</StyledCardBackSide>
                      </StyledCard>
                    )
                  );
                })}
              </StyledBoard>
            );
          }}
        </GamerMemoryGiantWinResizes>
      )}
    />
  );
};

const StyledCardFrontSide = styled(GamerMemoryGiantImageCardByMd5)`
  transition: opacity 0.3s;
  position: relative;
  opacity: 0;
  z-index: 2;
`;

const StyledCardBackSide = styled.div<{ $cardSize: number }>`
  transition: color 0.3s;
  position: absolute;
  background-color: black;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 1;
  z-index: 1;
  transform: rotateY(180deg);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3%;

  ${props => css`
    border: solid calc(${props.$cardSize}px / 20) white;
    font-size: calc(${props.$cardSize}px / 2);
  `}
`;

const StyledCard = styled.div<{ $isShown: boolean; $isGuessed: boolean }>`
  position: relative;
  transition:
    transform 0.3s,
    scale 0.3s 0.8s;

  ${props =>
    props.$isGuessed &&
    css`
      scale: 0.5;
    `}

  ${props =>
    props.$isShown || props.$isGuessed
      ? css`
          transform: rotateY(0);

          ${StyledCardFrontSide} {
            opacity: 1;
          }

          ${StyledCardBackSide} {
            color: transparent;
          }
        `
      : css`
          transform: rotateY(180deg);
          ${StyledCardBackSide} {
            color: white;
          }
        `}
`;

const StyledBoard = styled.div<{ $shownImageiSet: Set<number> }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1cqmin;

  ${props =>
    props.$shownImageiSet.size > 1 &&
    css`
      pointer-events: none;
    `}
`;

function calculateCardSize(containerWidth: number, containerHeight: number, cardCount: number): number {
  if (cardCount < 1 || containerWidth < 1 || containerHeight < 1) return 0;

  let minSize = 0;
  let maxSize = Math.min(containerWidth, containerHeight);

  const numberOfIterations = 200;

  for (let i = 0; i < numberOfIterations; i++) {
    const currentSize = (minSize + maxSize) / 2;

    const columns = Math.floor(containerWidth / currentSize);
    const rows = Math.floor(containerHeight / currentSize);
    const totalPlacedCount = columns * rows;

    if (totalPlacedCount >= cardCount) minSize = currentSize;
    else maxSize = currentSize;
  }

  return minSize;
}
