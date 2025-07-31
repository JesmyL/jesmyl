import { hookEffectPipe, setTimeoutPipe } from '#shared/lib/hookEffectPipe';
import { Modal } from '#shared/ui/modal/Modal/Modal';
import {
  PageContainerConfigurer,
  StyledPhaseContainerConfigurerHead,
  StyledPhaseContainerConfigurerHeadTitle,
} from '#shared/ui/phase-container/PageContainerConfigurer';
import { BottomPopup } from '#shared/ui/popup/bottom-popup/BottomPopup';
import { DocTitle } from '#shared/ui/tags/DocTitle';
import { Metronome } from '#widgets/metronome';
import { BibleTranslatesContextProvider } from '$bible/basis/contexts/TranslatesContext';
import { cmIsShowCatBindsInCompositionAtom } from '$cm/atoms';
import { useChordVisibleVariant } from '$cm/base/useChordVisibleVariant';
import { useLaterComList } from '$cm/base/useLaterComList';
import { comPlayerHeaderStickyCss } from '$cm/basis/css/com-player';
import { cmIDB } from '$cm/basis/lib/cmIDB';
import { useFixedCcom } from '$cm/basis/lib/com-selections';
import { useCmCurrentComPackContext } from '$cm/basis/lib/contexts/current-com-list';
import { cmTsjrpcClient } from '$cm/tsjrpc/basic.tsjrpc.methods';
import { Link } from '@tanstack/react-router';
import { useAtomValue } from 'atomaric';
import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { CmComCommentModalInner } from './CommentModalInner';
import { ComNotFoundPage } from './ComNotFoundPage';
import { isComCommentRedactAtom } from './complect/comment-parser/complect';
import { useCheckIsComCommentIncludesBibleAddress } from './complect/comment-parser/useCheckIsComCommentIncludesBibleAddress';
import { CmComNumber } from './complect/ComNumber';
import { ComPlayerWithPoints } from './player/ComPlayerWithPoints';
import { TheControlledCom } from './TheControlledCom';
import { ComTools } from './tools/ComTools';
import { useMigratableTopComTools } from './tools/lib/useMigratableComTools';
import { CmComCatMentions } from './useGetCatMentions';

export function TheComposition() {
  const [chordVisibleVariant] = useChordVisibleVariant();
  const ccom = useFixedCcom();
  const { addLaterComw, laterComws } = useLaterComList();
  const [isOpenTools, setIsOpenTools] = useState(false);
  const comToolsNode = useMigratableTopComTools();
  const { list } = useCmCurrentComPackContext();
  const playerHideMode = cmIDB.useValue.playerHideMode();

  const isShowCatBinds = useAtomValue(cmIsShowCatBindsInCompositionAtom);

  useEffect(() => {
    if (ccom?.wid == null) return;

    return hookEffectPipe()
      .pipe(
        setTimeoutPipe(() => addLaterComw(ccom.wid), 3000),
        setTimeoutPipe(() => cmTsjrpcClient.printComwVisit({ comw: ccom.wid }), 77_777),
      )
      .effect();
  }, [addLaterComw, ccom?.wid]);

  const comListRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (comListRef.current) comListRef.current.scrollTop = 0;
  }, [ccom?.wid]);
  const isComCommentIncludesBibleAddress = useCheckIsComCommentIncludesBibleAddress(ccom);

  if (ccom == null) return <ComNotFoundPage />;

  const comAudio = ccom.audio.trim();

  let controlledComNode = (
    <TheControlledCom
      com={ccom}
      comList={list}
      chordVisibleVariant={chordVisibleVariant}
    />
  );

  if (isComCommentIncludesBibleAddress)
    controlledComNode = (
      <BibleTranslatesContextProvider isSetAllTranslates>{controlledComNode}</BibleTranslatesContextProvider>
    );

  return (
    <StyledComContainer
      $isInLaterList={laterComws.includes(ccom.wid)}
      className={playerHideMode && comAudio ? ` with-open-player ${playerHideMode}` : ''}
      headTitle={<CmComNumber comw={ccom.wid} />}
      onMoreClick={setIsOpenTools}
      contentClass="composition-content padding-gap"
      contentRef={comListRef}
      withoutBackSwipe
      backButtonRender={(linkRef, backNode) => (
        <Link
          ref={linkRef}
          to="."
          search={prev => ({ ...(prev as object), comw: undefined }) as object}
        >
          {backNode}
        </Link>
      )}
      head={<div id="com-tools-top-panel">{comToolsNode}</div>}
      content={
        <>
          <DocTitle title={ccom.name} />
          {comAudio && <ComPlayerWithPoints audioSrcs={comAudio} />}
          {isShowCatBinds && (
            <div className="fade-05 full-width color--7">
              <CmComCatMentions com={ccom} />
            </div>
          )}

          {controlledComNode}

          <Modal
            key="com-comment"
            openAtom={isComCommentRedactAtom}
          >
            <CmComCommentModalInner com={ccom} />
          </Modal>

          <Metronome
            meterSize={ccom.meterSize}
            bpm={ccom.beatsPerMinute}
          />

          {isOpenTools && (
            <BottomPopup
              id="com-tools-bottom-popup"
              onClose={setIsOpenTools}
            >
              <ComTools />
            </BottomPopup>
          )}
        </>
      }
    />
  );
}

const StyledComContainer = styled(PageContainerConfigurer)<{ $isInLaterList: boolean }>`
  ${props =>
    props.$isInLaterList &&
    css`
      ${StyledPhaseContainerConfigurerHeadTitle} {
        font-weight: bold;
      }
    `}

  ${StyledPhaseContainerConfigurerHead} {
    display: flex;
    gap: 10px;
    padding-left: 10px;
    max-width: calc(100vw - 130px);
    height: 40px;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .composition-content {
    padding-top: 150px;
    transition: padding-top 0.2s;

    ${comPlayerHeaderStickyCss}
  }

  &.hide-metronome .com-metronome {
    display: none;
  }

  &.with-open-player .composition-player {
    opacity: 1;
    pointer-events: all;
  }

  html .fullscreen-mode :is(&, &.with-open-player) .composition-player {
    opacity: 0;
    margin-top: calc(0px - var(--com-player-size));
    pointer-events: none;
  }
`;
