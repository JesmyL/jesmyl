import { Modal } from '#shared/ui/modal';
import { BottomPopup } from '#shared/ui/popup/bottom-popup/BottomPopup';
import { DocTitle } from '#shared/ui/tags/DocTitle';
import { WithAtomTruthfulValue } from '#shared/ui/WithAtomTruthfulValue';
import { Metronome } from '#widgets/metronome';
import {
  CmComCatMentions,
  CmComNotFoundPage,
  CmComNumber,
  useCmComChordVisibleVariant,
  useCmComCurrentComPackContext,
  useCmComCurrentFixedCom,
} from '$cm/entities/com';
import { cmComCommentRedactOrdSelectorIdAtom } from '$cm/entities/com-comment';
import { CmComToolList, useCmComToolMigratableTop } from '$cm/entities/com-tool';
import { cmComIsShowCatBindsInCompositionAtom } from '$cm/entities/index';
import { CmComCommentModalInner } from '$cm/features/com-comment';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { useCmComCompositionControls } from '../lib/useComCompositionControls';
import { StyledCmComCompositionContainer } from '../style/Composition';
import { CmComAudioPlayerInCompositionPage } from './AudioPlayer';
import { TheCmComControlled } from './TheControlledCom';

export function TheCmComComposition() {
  const [isOpenTools, setIsOpenTools] = useState(false);

  const ccom = useCmComCurrentFixedCom();
  const { laterComws, comListRef } = useCmComCompositionControls(ccom);
  const [chordVisibleVariant] = useCmComChordVisibleVariant();
  const comToolsNode = useCmComToolMigratableTop();
  const { list } = useCmComCurrentComPackContext();

  if (ccom == null) return <CmComNotFoundPage />;

  return (
    <StyledCmComCompositionContainer
      $isInLaterList={laterComws.includes(ccom.wid)}
      className="TheCmComComposition"
      headTitle={<CmComNumber comw={ccom.wid} />}
      onMoreClick={setIsOpenTools}
      contentClass="composition-content p-2"
      contentRef={comListRef}
      withoutBackSwipe
      backButtonRender={(linkRef, backNode) => (
        <Link
          ref={linkRef}
          to="."
          search={prev => ({ ...(prev as object), comw: undefined })}
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

          <CmComAudioPlayerInCompositionPage ccom={ccom} />

          <WithAtomTruthfulValue atom={cmComIsShowCatBindsInCompositionAtom}>
            <div className="opacity-50 w-full text-x7">
              <CmComCatMentions com={ccom} />
            </div>
          </WithAtomTruthfulValue>

          <TheCmComControlled
            com={ccom}
            comList={list}
            chordVisibleVariant={chordVisibleVariant}
          />

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
