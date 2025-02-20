import { useAtom, useAtomValue } from '#shared/lib/atom';
import { hookEffectPipe, setTimeoutPipe } from '#shared/lib/hookEffectPipe';
import {
  PageContainer,
  StyledPhaseContainerConfigurerHead,
  StyledPhaseContainerConfigurerHeadTitle,
} from '#shared/ui/PageContainer';
import { BottomPopup } from '#shared/ui/absolute-popup/bottom-popup/BottomPopup';
import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { DocTitle } from '#shared/ui/tags/DocTitle';
import { Metronome } from '#widgets/metronome/Metronome';
import { BibleTranslatesContextProvider } from '@bible/translates/TranslatesContext';
import { cmIsShowCatBindsInCompositionAtom, isOpenChordImagesAtom } from '@cm/atoms';
import { cmIDB } from '@cm/basis/lib/cmIdb';
import { useCmTranslationComListContext } from '@cm/basis/lib/com-list-contexts/context';
import { useChordVisibleVariant } from '@cm/basis/lib/hooks/useChordVisibleVariant';
import { useLaterComList } from '@cm/basis/lib/hooks/useLaterComList';
import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import './Com.scss';
import { ComNotFoundPage } from './ComNotFoundPage';
import { TheControlledCom } from './TheControlledCom';
import { ChordImagesList } from './chord-card/ChordImagesList';
import { CmComNumber } from './complect/ComNumber';
import { useCheckIsComCommentIncludesBibleAddress } from './complect/comment-parser/useCheckIsComCommentIncludesBibleAddress';
import { ComPlayer } from './player/ComPlayer';
import { ComTools } from './tools/ComTools';
import { useMigratableTopComTools } from './tools/useMigratableComTools';
import { useFixedCcom, useTakeActualComw } from './useCcom';
import { CmComCatMentions } from './useGetCatMentions';

export function TheComposition() {
  const [chordVisibleVariant] = useChordVisibleVariant();
  const ccom = useFixedCcom();
  const { addLaterComw, laterComws } = useLaterComList();
  const [isOpenTools, setIsOpenTools] = useState(false);
  const comToolsNode = useMigratableTopComTools();
  const { list } = useCmTranslationComListContext();
  const playerHideMode = cmIDB.useValue.playerHideMode();
  const isMetronomeHide = cmIDB.useValue.metronome().isHide;

  const [isOpenChordImages, setIsOpenChordImages] = useAtom(isOpenChordImagesAtom);
  const isShowCatBinds = useAtomValue(cmIsShowCatBindsInCompositionAtom);

  useTakeActualComw();

  useEffect(() => {
    return hookEffectPipe()
      .pipe(setTimeoutPipe(() => addLaterComw(ccom?.wid ?? 0), 3000))
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
      comwList={list?.map(({ wid }) => wid)}
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
      className={
        (playerHideMode && comAudio ? ` with-open-player ${playerHideMode}` : '') +
        (isMetronomeHide ? ' hide-metronome' : '')
      }
      headTitle={<CmComNumber comw={ccom.wid} />}
      onMoreClick={setIsOpenTools}
      contentClass="composition-content padding-gap"
      contentRef={comListRef}
      withoutBackSwipe
      rememberProps={['comw']}
      head={
        <div
          id="com-tools-top-panel"
          className="flex flex-gap"
        >
          {comToolsNode}
        </div>
      }
      content={
        <>
          {isOpenChordImages && (
            <FullContent onClose={setIsOpenChordImages}>
              <ChordImagesList />
            </FullContent>
          )}
          {isOpenTools && (
            <BottomPopup
              id="com-tools-bottom-popup"
              onClose={setIsOpenTools}
            >
              <ComTools />
            </BottomPopup>
          )}
          <DocTitle title={ccom.name} />
          {comAudio && (
            <ComPlayer
              src={comAudio}
              split
            />
          )}
          <Metronome
            meterSize={ccom.meterSize}
            bpm={ccom.beatsPerMinute}
          />
          {isShowCatBinds && (
            <div className="fade-05 full-width color--7">
              <CmComCatMentions com={ccom} />
            </div>
          )}

          {controlledComNode}
        </>
      }
    />
  );
}

const StyledComContainer = styled(PageContainer)<{ $isInLaterList: boolean }>`
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

    .composition-player {
      --transition-speed: 0.2s;

      position: absolute;
      top: var(--header-height);
      right: 0;
      left: 0;
      opacity: 0;
      pointer-events: none;
      z-index: 1;
      transition:
        width var(--transition-speed),
        background var(--transition-speed),
        margin var(--transition-speed),
        opacity var(--transition-speed);
    }
  }

  &.hide-metronome .com-metronome {
    display: none;
  }

  &.with-open-player {
    .composition-player {
      opacity: 1;
      pointer-events: all;
    }
  }
`;
