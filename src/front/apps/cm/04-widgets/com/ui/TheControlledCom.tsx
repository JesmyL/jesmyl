import { backSwipableContainerMaker } from '#shared/lib/backSwipableContainerMaker';
import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { ChordVisibleVariant } from '#shared/model/cm/Cm.model';
import { RolledContent } from '#shared/ui/fullscreen-content/RolledContent';
import { useCmComPinchFontSize } from '$cm/entities/com';
import { isCmComAudioPlayerOpenMoversAtom } from '$cm/entities/com-audio-player';
import {
  cmComCommentCurrentComw2OpenAltiDictAtom,
  cmComCommentRegisteredAltKeysAtom,
  useCmComCommentBlockFastReactions,
} from '$cm/entities/com-comment';
import { cmComIsComMiniAnchorAtom, cmComSpeedRollKfAtom } from '$cm/entities/index';
import { useCmAudioMarkControlButtonsContext } from '$cm/ext';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Link } from '@tanstack/react-router';
import { useAtomValue } from 'atomaric';
import { useEffect, useRef } from 'react';
import { CmComWid } from 'shared/api';
import { CmCom } from 'shared/const/cm/Com';
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
  comws: CmComWid[];
  chordVisibleVariant: ChordVisibleVariant;
}

export const TheCmComControlled = ({ com, comws, chordVisibleVariant }: Props) => {
  const { fontSize, ref: screenRef } = useCmComPinchFontSize();

  const isMiniAnchor = useAtomValue(cmComIsComMiniAnchorAtom);
  const altCommentKeys = useAtomValue(cmComCommentCurrentComw2OpenAltiDictAtom);
  const commentAltTitle = useAtomValue(cmComCommentRegisteredAltKeysAtom)[
    altCommentKeys[com.wid] ?? altCommentKeys.lasti ?? 0
  ];
  const listRef = useRef<HTMLDivElement>(null);
  const isOpenMoversButtons = useAtomValue(isCmComAudioPlayerOpenMoversAtom);

  const audioMarkControl = useCmAudioMarkControlButtonsContext();

  const comi = comws.findIndex(w => w === com.wid);
  const nextComw = comi < comws.length - 1 ? comws[comi + 1] : comws[0];
  const prevComw = comi > 0 ? comws[comi - 1] : comws[comws.length - 1];

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
          ref={screenRef}
          className="relative h-full"
          $listHeight={listRef.current?.clientHeight}
        >
          {audioMarkControl?.controls.afterIdDict.before}

          <TheCmComWithComments
            com={com}
            beforeCommentsNode={<div className="sticky uppercase -top-30!">{commentAltTitle}</div>}
          >
            <TheCmCom
              comw={com.wid}
              chordVisibleVariant={chordVisibleVariant}
              isMiniAnchor={isMiniAnchor}
              listRef={listRef}
              {...(isOpenMoversButtons
                ? {
                    fontSize: fontSize,
                    asAfterSolidOrdNode: ({ ord }) => audioMarkControl?.controls.afterIdDict[ord.wid],
                    asHeaderNode: ({ ord, node }) => (
                      <div className="flex gap-1 flex-wrap max-w-[80%]">
                        {node}
                        {audioMarkControl?.controls.idDict[ord.wid]}
                      </div>
                    ),
                  }
                : { fontSize })}
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
