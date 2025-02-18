import { cmIDB } from '#basis/lib/idb/cm';
import { backSwipableContainerMaker } from 'front/08-shared/lib/backSwipableContainerMaker';
import { addEventListenerPipe, hookEffectPipe } from 'front/08-shared/lib/hookEffectPipe';
import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CmComWid } from 'shared/api';
import styled, { css, RuleSet } from 'styled-components';
import { ChordVisibleVariant } from '../../Cm.model';
import RollControled from '../../base/RolledContent';
import { Com } from './Com';
import './Com.scss';
import { TheCom } from './TheCom';
import { TheComComment } from './complect/comment-parser/TheComComment';
import { useComCommentBlockCss } from './complect/comment-parser/useComCommentBlock';
import { useComCommentBlockFastReactions } from './complect/comment-parser/useComCommentBlockFastReactions';

let onPrevCom: () => void;
let onNextCom: () => void;
const swiper = backSwipableContainerMaker(
  () => onPrevCom(),
  () => onNextCom(),
);

export default function TheControlledCom({
  com,
  comwList,
  chordVisibleVariant,
  onComSet,
}: {
  com: Com;
  comwList?: CmComWid[] | nil;
  chordVisibleVariant: ChordVisibleVariant;
  onComSet?: (comw: CmComWid) => void;
}) {
  const fontSize = cmIDB.useValue.comFontSize();
  const isMiniAnchor = cmIDB.useValue.isMiniAnchor();
  const listRef = useRef<HTMLDivElement>(null);
  const [, setSearchParams] = useSearchParams();
  const commentCss = useComCommentBlockCss(com);

  useComCommentBlockFastReactions(com);

  onNextCom = () => {
    if (!comwList?.length) return;
    const comi = comwList.findIndex(wid => wid === com.wid);
    if (comi < comwList.length - 1) {
      onComSet?.(comwList[comi + 1]);
      setSearchParams({ comw: '' + comwList[comi + 1] });
    } else {
      onComSet?.(comwList[0]);
      setSearchParams({ comw: '' + comwList[0] });
    }
  };

  onPrevCom = () => {
    if (!comwList?.length) return;
    const comi = comwList.findIndex(wid => wid === com.wid);
    if (comi > 0) {
      onComSet?.(comwList[comi - 1]);
      setSearchParams({ comw: '' + comwList[comi - 1] });
    } else {
      onComSet?.(comwList[comwList.length - 1]);
      setSearchParams({ comw: '' + comwList[comwList.length - 1] });
    }
  };

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
    <StyledRollControled
      $commentStyles={commentCss}
      className="composition-content"
    >
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
        <TheComComment comw={com.wid} />
      </WithScrollProgress>
    </StyledRollControled>
  );
}

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
