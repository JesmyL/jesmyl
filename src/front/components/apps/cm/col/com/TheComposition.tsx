import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { BottomPopup } from '../../../../../complect/absolute-popup/bottom-popup/BottomPopup';
import { useAtom, useAtomValue } from '../../../../../complect/atoms';
import { FullContent } from '../../../../../complect/fullscreen-content/FullContent';
import { Metronome } from '../../../../../complect/metronome/Metronome';
import PhaseContainerConfigurer from '../../../../../complect/phase-container/PhaseContainerConfigurer';
import { DocTitle } from '../../../../../complect/tags/DocTitle';
import BibleTranslatesContextProvider from '../../../bible/translates/TranslatesContext';
import { cmIDB } from '../../_db/cm-idb';
import { cmIsShowCatBindsInCompositionAtom, isOpenChordImagesAtom } from '../../atoms';
import { useCmTranslationComListContext as useCmComListContext } from '../../base/translations/context';
import { useChordVisibleVariant } from '../../base/useChordVisibleVariant';
import useLaterComList from '../../base/useLaterComList';
import './Com.scss';
import { ComNotFoundPage } from './ComNotFoundPage';
import TheControlledCom from './TheControlledCom';
import ChordImagesList from './chord-card/ChordImagesList';
import { CmComNumber } from './complect/ComNumber';
import { useCheckIsComCommentIncludesBibleAddress } from './complect/comment-parser/useCheckIsComCommentIncludesBibleAddress';
import ComPlayer from './player/ComPlayer';
import { ComTools } from './tools/ComTools';
import { useMigratableTopComTools } from './tools/useMigratableComTools';
import { useCcom, useTakeActualComw } from './useCcom';
import { CmComCatMentions } from './useGetCatMentions';

export default function TheComposition() {
  const [chordVisibleVariant] = useChordVisibleVariant();
  const ccom = useCcom();
  const { addLaterComw } = useLaterComList();
  const [isOpenTools, setIsOpenTools] = useState(false);
  const comToolsNode = useMigratableTopComTools();
  const { list } = useCmComListContext();
  const playerHideMode = cmIDB.useValue.playerHideMode();
  const isMetronomeHide = cmIDB.useValue.metronome().isHide;
  const comAudio = ccom?.audio.trim();
  const [isOpenChordImages, setIsOpenChordImages] = useAtom(isOpenChordImagesAtom);
  const isShowCatBinds = useAtomValue(cmIsShowCatBindsInCompositionAtom);

  useTakeActualComw();

  useEffect(() => {
    const add = setTimeout(() => addLaterComw(ccom?.wid ?? 0), 3000);
    return () => clearTimeout(add);
  }, [addLaterComw, ccom?.wid]);

  const comListElem = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (comListElem.current) comListElem.current.scrollTop = 0;
  }, [ccom?.wid]);
  const isComCommentIncludesBibleAddress = useCheckIsComCommentIncludesBibleAddress(ccom);

  if (ccom == null) return <ComNotFoundPage />;

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
    <ComContainer
      className={
        'composition-container' +
        (playerHideMode && comAudio ? ` with-open-player ${playerHideMode}` : '') +
        (isMetronomeHide ? ' hide-metronome' : '')
      }
      headTitle={<CmComNumber comw={ccom.wid} />}
      onMoreClick={setIsOpenTools}
      contentClass="composition-content padding-gap"
      contentRef={comListElem}
      withoutBackSwipe
      rememberProps={['comw']}
      head={<div className="com-actions-pannel flex flex-gap">{comToolsNode}</div>}
      content={
        <>
          {isOpenChordImages && (
            <FullContent onClose={setIsOpenChordImages}>
              <ChordImagesList />
            </FullContent>
          )}
          {isOpenTools && (
            <BottomPopup onClose={setIsOpenTools}>
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

const ComContainer = styled(PhaseContainerConfigurer)`
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

  .com-actions-pannel {
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
`;
