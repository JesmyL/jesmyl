import { backSwipableContainerMaker } from '#shared/lib/backSwipableContainerMaker';
import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { RolledContent } from '#shared/ui/fullscreen-content/RolledContent';
import { BibleModulesTranslationsControl } from '$bible/entities/ModulesTranslationsControl';
import { cmIsComMiniAnchorAtom } from '$cm/atoms';
import { useCmComOrdwToPlayButtonNodeDict } from '$cm/basis/lib/hooks/useCmComOrdwToPlayButtonNodeDict';
import { cmComFontSizeAtom, cmSpeedRollKfAtom } from '$cm/basis/lib/store/atoms';
import { ChordVisibleVariant } from '$cm/Cm.model';
import { Link } from '@tanstack/react-router';
import { useAtomValue } from 'atomaric';
import { useEffect, useRef } from 'react';
import styled, { css, RuleSet } from 'styled-components';
import { Com } from './Com';
import { useComCommentBlockCss } from './complect/comment-parser/useComCommentBlock';
import { useComCommentBlockFastReactions } from './complect/comment-parser/useComCommentBlockFastReactions';
import { isCmComOpenAudioMoversAtom } from './complect/state/atoms';
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
  const { commentCss, isThereUnsettedTranslate } = useComCommentBlockCss(com);
  const isOpenButtons = useAtomValue(isCmComOpenAudioMoversAtom);
  const ordwToPlayButtonNodeDict = useCmComOrdwToPlayButtonNodeDict(com);

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
      {isThereUnsettedTranslate && (
        <div className="flex gap-3">
          Выбрать перевод
          <BibleModulesTranslationsControl />
        </div>
      )}
      <StyledRollControled
        speedKfAtom={cmSpeedRollKfAtom}
        $commentStyles={commentCss}
        className="composition-content"
      >
        <div className="com-orders-with-comments">
          <span className="alt-key-holder" />
          <span className="comment-holder" />
          <span className="comment-holder" />
          <span className="comment-holder" />
          <span className="comment-holder" />
          <WithScrollProgress
            {...swiper}
            className="relative h-full"
            $listHeight={listRef.current?.clientHeight}
          >
            <TheCom
              com={com}
              fontSize={isOpenButtons ? Math.abs(fontSize) : fontSize}
              chordVisibleVariant={chordVisibleVariant}
              isMiniAnchor={isMiniAnchor}
              listRef={listRef}
              asHeaderComponent={
                ordwToPlayButtonNodeDict && isOpenButtons
                  ? ({ ord, headerNode }) => (
                      <div className="flex gap-1 flex-wrap max-w-[80%]">
                        {headerNode}
                        {ordwToPlayButtonNodeDict[ord.wid]}
                      </div>
                    )
                  : undefined
              }
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

const StyledRollControled = styled(RolledContent)<{ $commentStyles?: RuleSet<object> | string }>`
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
