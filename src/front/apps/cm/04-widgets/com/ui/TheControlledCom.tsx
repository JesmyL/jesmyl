import { backSwipableContainerMaker } from '#shared/lib/backSwipableContainerMaker';
import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { mylib } from '#shared/lib/my-lib';
import { RolledContent } from '#shared/ui/fullscreen-content/RolledContent';
import { CmCom } from '$cm/entities/com';
import { cmComAudioPlayerPlaySrcAtom, isCmComAudioPlayerOpenMoversAtom } from '$cm/entities/com-audio-player';
import { cmComCommentCurrentOpenedAltKeyAtom, useCmComCommentBlockFastReactions } from '$cm/entities/com-comment';
import { useCmComOrderAudioMarkControl } from '$cm/entities/com-order';
import { cmComFontSizeAtom, cmComIsComMiniAnchorAtom, cmComSpeedRollKfAtom } from '$cm/entities/index';
import { ChordVisibleVariant } from '$cm/shared/model';
import { Link } from '@tanstack/react-router';
import { useAtomValue } from 'atomaric';
import { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { TheCmCom } from './TheCom';
import { TheCmComWithComments } from './TheComWithComments';

let onPrevCom: () => void;
let onNextCom: () => void;
const swiper = backSwipableContainerMaker(
  () => onPrevCom(),
  () => onNextCom(),
);

interface Props {
  com: CmCom;
  comList: CmCom[];
  chordVisibleVariant: ChordVisibleVariant;
}

export const TheCmComControlled = ({ com, comList, chordVisibleVariant }: Props) => {
  const fontSize = useAtomValue(cmComFontSizeAtom);
  const isMiniAnchor = useAtomValue(cmComIsComMiniAnchorAtom);
  const altCommentKeys = useAtomValue(cmComCommentCurrentOpenedAltKeyAtom);
  const altCommentKey = altCommentKeys[com.wid] ?? altCommentKeys.last;
  const listRef = useRef<HTMLDivElement>(null);
  const playSrc = useAtomValue(cmComAudioPlayerPlaySrcAtom);
  const isOpenMoversButtons =
    useAtomValue(isCmComAudioPlayerOpenMoversAtom) && !!playSrc && com.audio.includes(playSrc);

  const audioMarkControl = useCmComOrderAudioMarkControl(isOpenMoversButtons, com, (node, time, selector) =>
    mylib.isStr(selector) ? (
      <div
        key={time}
        className="my-3"
      >
        {node}
      </div>
    ) : (
      node
    ),
  );

  const comi = comList.findIndex(c => c.wid === com.wid);
  const nextComw = comi < comList.length - 1 ? comList[comi + 1]?.wid : comList[0]?.wid;
  const prevComw = comi > 0 ? comList[comi - 1]?.wid : comList[comList.length - 1]?.wid;

  const nextComLinkRef = useRef<HTMLAnchorElement>(null);
  const prevComLinkRef = useRef<HTMLAnchorElement>(null);

  useCmComCommentBlockFastReactions(listRef, com);

  onNextCom = () => nextComLinkRef.current?.click();
  onPrevCom = () => prevComLinkRef.current?.click();

  useEffect(() => {
    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(window, 'keydown', event => {
          if (!event.ctrlKey) return;

          if (event.key === 'ArrowLeft') onPrevCom();
          if (event.key === 'ArrowRight') onNextCom();
        }),
      )
      .effect();
  }, []);

  return (
    <>
      <StyledRollControled
        speedKfAtom={cmComSpeedRollKfAtom}
        className="composition-content"
      >
        <WithScrollProgress
          {...swiper}
          className="relative h-full"
          $listHeight={listRef.current?.clientHeight}
        >
          {isOpenMoversButtons && audioMarkControl.afterTargetOrdwOtherPlayButtonNodeDict.before}

          <TheCmComWithComments
            com={com}
            beforeCommentsNode={<div className="sticky uppercase -top-30!">{altCommentKey}</div>}
          >
            <TheCmCom
              com={com}
              fontSize={isOpenMoversButtons ? Math.abs(fontSize) : fontSize}
              chordVisibleVariant={chordVisibleVariant}
              isMiniAnchor={isMiniAnchor}
              listRef={listRef}
              asContentAfterOrder={
                isOpenMoversButtons
                  ? ({ ord }) => audioMarkControl.afterTargetOrdwOtherPlayButtonNodeDict[ord.makeSelector()]
                  : undefined
              }
              asHeaderComponent={
                isOpenMoversButtons
                  ? ({ ord, headerNode }) => (
                      <div className="flex gap-1 flex-wrap max-w-[80%]">
                        {headerNode}
                        {audioMarkControl.ordwPlayButtonNodeDict[ord.wid]}
                      </div>
                    )
                  : undefined
              }
            />
          </TheCmComWithComments>
        </WithScrollProgress>
      </StyledRollControled>
      <div hidden>
        <Link
          ref={prevComLinkRef}
          to="."
          search={prev => ({ ...(prev as object), comw: prevComw })}
        />
        <Link
          ref={nextComLinkRef}
          to="."
          search={prev => ({ ...(prev as object), comw: nextComw })}
        />
      </div>
    </>
  );
};

const WithScrollProgress = styled.div<{ $listHeight: number | null | und }>`
  ${props => {
    if (props.$listHeight == null || window.innerHeight > props.$listHeight) return null;

    return css`
      @supports (animation-timeline: scroll()) {
        &:after {
          content: '';
          position: absolute;
          top: 0;
          left: -8px;
          height: ${props.$listHeight}px;
          background-color: var(--color--7);
          opacity: 0.02;
          pointer-events: none;

          animation: WithProgress linear;
          animation-timeline: scroll();
        }

        @keyframes WithProgress {
          from {
            width: 0;
          }
          to {
            width: 100vw;
          }
        }
      }
    `;
  }};
`;

const StyledRollControled = styled(RolledContent)`
  [st-hide-footer-menu] & ${WithScrollProgress} {
    padding-bottom: var(--footer-initial-height);
  }
`;
