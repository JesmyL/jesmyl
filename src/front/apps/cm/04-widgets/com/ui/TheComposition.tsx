import { hideAppFooterAtom } from '#basis/lib/atoms/hideAppFooterAtom';
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
import { BibleTranslatesContextProvider } from '$bible/ext';
import {
  CmComCatMentions,
  CmComNotFoundPage,
  CmComNumber,
  useCmComChordVisibleVariant,
  useCmComCurrentComPackContext,
  useCmComCurrentFixedCom,
  useCmComLaterList,
} from '$cm/entities/com';
import {
  CmComAudioPlayerWithMarks,
  cmComAudioPlayerHeaderStickyCss,
  cmComAudioPlayerIsPlayAtom,
  cmComAudioPlayerPlaySrcAtom,
} from '$cm/entities/com-audio-player';
import {
  cmComCommentRedactOrdSelectorIdAtom,
  useCmComCommentCheckIsIncludesBibleAddress,
} from '$cm/entities/com-comment';
import { CmComToolList, useCmComToolMigratableTop } from '$cm/entities/com-tool';
import { cmComIsShowCatBindsInCompositionAtom, cmComPlayerHideModeAtom } from '$cm/entities/index';
import { CmComCommentModalInner } from '$cm/features/com-comment';
import { cmTsjrpcClient } from '$cm/shared/tsjrpc';
import { Link } from '@tanstack/react-router';
import { useAtomValue } from 'atomaric';
import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { TheCmComControlled } from './TheControlledCom';

export function TheCmComComposition() {
  const comListRef = useRef<HTMLDivElement>(null);
  const [isOpenTools, setIsOpenTools] = useState(false);

  const ccom = useCmComCurrentFixedCom();
  const [chordVisibleVariant] = useCmComChordVisibleVariant();
  const { addLaterComw, laterComws } = useCmComLaterList();
  const comToolsNode = useCmComToolMigratableTop();
  const { list } = useCmComCurrentComPackContext();
  const isComCommentIncludesBibleAddress = useCmComCommentCheckIsIncludesBibleAddress(ccom);

  const playerHideMode = useAtomValue(cmComPlayerHideModeAtom);
  const hideAppFooter = useAtomValue(hideAppFooterAtom);
  const isShowCatBinds = useAtomValue(cmComIsShowCatBindsInCompositionAtom);
  const playSrc = useAtomValue(cmComAudioPlayerPlaySrcAtom);

  useEffect(() => {
    if (ccom?.wid == null) return;

    return hookEffectPipe()
      .pipe(
        setTimeoutPipe(() => addLaterComw(ccom.wid), 3000),
        setTimeoutPipe(() => cmTsjrpcClient.printComwVisit({ comw: ccom.wid }), 77_777),
      )
      .effect();
  }, [addLaterComw, ccom?.wid]);

  useEffect(() => {
    if (comListRef.current) comListRef.current.scrollTop = 0;

    if (!cmComAudioPlayerIsPlayAtom.get() && !ccom?.audio.includes(cmComAudioPlayerPlaySrcAtom.get()!)) {
      if (ccom?.audio[0]) cmComAudioPlayerPlaySrcAtom.set(ccom.audio[0]);
    }
  }, [ccom?.audio, ccom?.wid]);

  if (ccom == null) return <CmComNotFoundPage />;

  const isPlayOtherAudio = !!playSrc && !ccom.audio.includes(playSrc);

  let controlledComNode = (
    <TheCmComControlled
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
      className={playerHideMode && ccom.audio?.length ? ` with-open-player ${playerHideMode}` : ''}
      headTitle={<CmComNumber comw={ccom.wid} />}
      onMoreClick={setIsOpenTools}
      contentClass="composition-content p-2"
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
      head={
        <div
          id="com-tools-top-panel"
          className="flex items-center"
        >
          {comToolsNode}
        </div>
      }
      content={
        <>
          <DocTitle title={ccom.name} />
          {!hideAppFooter && !!ccom.audio?.length && (
            <CmComAudioPlayerWithMarks
              audioLinks={ccom.audio}
              com={ccom}
              className={isPlayOtherAudio ? 'top-[calc(var(--header-height)+31px)]' : undefined}
            />
          )}
          {!hideAppFooter && isPlayOtherAudio && (
            <CmComAudioPlayerWithMarks
              audioLinks={[playSrc]}
              com={ccom}
              hideMarksForce
            />
          )}
          {isShowCatBinds && (
            <div className="opacity-50 w-full text-x7">
              <CmComCatMentions com={ccom} />
            </div>
          )}

          {controlledComNode}

          <Modal
            key="com-comment"
            openAtom={cmComCommentRedactOrdSelectorIdAtom}
          >
            <CmComCommentModalInner com={ccom} />
          </Modal>

          <Metronome
            meterSize={ccom.meterSize}
            bpm={ccom.beatsPerMinute}
          />

          <BottomPopup
            id="com-tools-bottom-popup"
            open={isOpenTools}
            title={ccom.name}
            onClose={setIsOpenTools}
          >
            <CmComToolList />
          </BottomPopup>
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

    ${cmComAudioPlayerHeaderStickyCss}
  }

  &.hide-metronome .com-metronome {
    display: none;
  }

  &.with-open-player .composition-player {
    opacity: 1;
    pointer-events: all;
  }

  html [st-fullscreen] :is(&, &.with-open-player) .composition-player {
    opacity: 0;
    margin-top: calc(0px - var(--com-player-size));
    pointer-events: none;
  }
`;
