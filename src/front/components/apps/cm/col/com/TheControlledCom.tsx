import { backSwipableContainerMaker } from '#shared/lib/backSwipableContainerMaker';
import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { cmIsComMiniAnchorAtom } from '$cm/atoms';
import { RollControled } from '$cm/base/RolledContent';
import { cmComFontSizeAtom } from '$cm/basis/lib/store/atoms';
import { ChordVisibleVariant } from '$cm/Cm.model';
import { Link } from '@tanstack/react-router';
import { useAtomValue } from 'atomaric';
import { useEffect, useRef } from 'react';
import styled, { RuleSet, css } from 'styled-components';
import { Com } from './Com';
import { useComCommentBlockCss } from './complect/comment-parser/useComCommentBlock';
import { useComCommentBlockFastReactions } from './complect/comment-parser/useComCommentBlockFastReactions';
import { TheCom } from './TheCom';

let onPrevCom: () => void;
let onNextCom: () => void;
const swiper = backSwipableContainerMaker(
  () => onPrevCom(),
  () => onNextCom(),
);

interface Props {
  com: Com;
  comList: Com[];
  chordVisibleVariant: ChordVisibleVariant;
}

export const TheControlledCom = ({ com, comList, chordVisibleVariant }: Props) => {
  const fontSize = useAtomValue(cmComFontSizeAtom);
  const isMiniAnchor = useAtomValue(cmIsComMiniAnchorAtom);
  const listRef = useRef<HTMLDivElement>(null);
  const commentCss = useComCommentBlockCss(com);

  const comi = comList.findIndex(c => c.wid === com.wid);
  const nextComw = comi < comList.length - 1 ? comList[comi + 1]?.wid : comList[0]?.wid;
  const prevComw = comi > 0 ? comList[comi - 1]?.wid : comList[comList.length - 1]?.wid;

  const nextComLinkRef = useRef<HTMLAnchorElement>(null);
  const prevComLinkRef = useRef<HTMLAnchorElement>(null);

  useComCommentBlockFastReactions(listRef, com);

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
        $commentStyles={commentCss}
        className="composition-content"
      >
        <div className="com-orders-with-comments">
          <span className="comment-holder" />
          <span className="comment-holder" />
          <span className="comment-holder" />
          <WithScrollProgress
            {...swiper}
            className="relative full-height"
            $listHeight={listRef.current?.clientHeight}
          >
            <TheCom
              com={com}
              fontSize={fontSize}
              chordVisibleVariant={chordVisibleVariant}
              isMiniAnchor={isMiniAnchor}
              listRef={listRef}
            />
          </WithScrollProgress>
        </div>
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

const StyledRollControled = styled(RollControled)<{ $commentStyles?: RuleSet<object> | string }>`
  ${props => props.$commentStyles}
`;

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
