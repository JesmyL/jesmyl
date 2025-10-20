import { backSwipableContainerMaker } from '#shared/lib/backSwipableContainerMaker';
import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { RolledContent } from '#shared/ui/fullscreen-content/RolledContent';
import { BibleModulesTranslationsControl } from '$bible/ext';
import { CmCom } from '$cm/entities/com';
import { isCmComAudioPlayerOpenMoversAtom } from '$cm/entities/com-audio-player';
import { useCmComCommentBlockCss, useCmComCommentBlockFastReactions } from '$cm/entities/com-comment';
import { useCmComOrderWidToPlayButtonNodeDict } from '$cm/entities/com-order';
import { cmComFontSizeAtom, cmComIsComMiniAnchorAtom, cmComSpeedRollKfAtom } from '$cm/entities/index';
import { ChordVisibleVariant } from '$cm/shared/model';
import { Link } from '@tanstack/react-router';
import { useAtomValue } from 'atomaric';
import { useEffect, useRef } from 'react';
import styled, { RuleSet, css } from 'styled-components';
import { TheCmCom } from './TheCom';

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
  const listRef = useRef<HTMLDivElement>(null);
  const { commentCss, isThereUnsettedTranslate } = useCmComCommentBlockCss(com);
  const isOpenMoversButtons = useAtomValue(isCmComAudioPlayerOpenMoversAtom);
  const ordwToPlayButtonNodeDict = useCmComOrderWidToPlayButtonNodeDict(com);

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
      {isThereUnsettedTranslate && (
        <div className="flex gap-3">
          Выбрать перевод
          <BibleModulesTranslationsControl />
        </div>
      )}
      <StyledRollControled
        speedKfAtom={cmComSpeedRollKfAtom}
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
            <TheCmCom
              com={com}
              fontSize={isOpenMoversButtons ? Math.abs(fontSize) : fontSize}
              chordVisibleVariant={chordVisibleVariant}
              isMiniAnchor={isMiniAnchor}
              listRef={listRef}
              asHeaderComponent={
                ordwToPlayButtonNodeDict && isOpenMoversButtons
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
