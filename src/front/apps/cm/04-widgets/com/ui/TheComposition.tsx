import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { BottomPopup } from '#shared/ui/popup/bottom-popup/BottomPopup';
import { DocTitle } from '#shared/ui/tags/DocTitle';
import { WithAtomTruthfulValue } from '#shared/ui/WithAtomTruthfulValue';
import {
  CmComCatMentions,
  CmComNotFoundPage,
  CmComNumber,
  useCmComCurrentComPackContext,
  useCmComCurrentFixedCom,
} from '$cm/entities/com';
import { cmComCommentRedactOrdSelectorIdAtom } from '$cm/entities/com-comment';
import { CmComToolList, useCmComToolMigratableTop } from '$cm/entities/com-tool';
import { cmComChordVisibleVariantAtom, cmComIsShowCatBindsInCompositionAtom } from '$cm/entities/index';
import {
  CmComCommentConstructorTextRulesConstructor,
  useCmComCommentConstructorListenChanges,
} from '$cm/features/ComCommentConstructor';
import { Link } from '@tanstack/react-router';
import { useAtomValue } from 'atomaric';
import { useState } from 'react';
import { useCmComCompositionControls } from '../lib/useComCompositionControls';
import { StyledCmComCompositionContainer } from '../style/Composition';
import { CmComAudioPlayerInCompositionPage } from './AudioPlayer';
import { TheCmComControlled } from './TheControlledCom';

export function TheCmComComposition() {
  const [isOpenTools, setIsOpenTools] = useState(false);

  const ccom = useCmComCurrentFixedCom();
  const { laterComws, comListRef } = useCmComCompositionControls(ccom);
  const chordVisibleVariant = useAtomValue(cmComChordVisibleVariantAtom);
  const comToolsNode = useCmComToolMigratableTop();
  const { list } = useCmComCurrentComPackContext();

  useCmComCommentConstructorListenChanges();

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

          <FullContent
            key="com-comment-constructor"
            openAtom={cmComCommentRedactOrdSelectorIdAtom}
          >
            {selector =>
              selector != null && (
                <CmComCommentConstructorTextRulesConstructor
                  com={ccom}
                  selector={selector}
                />
              )
            }
          </FullContent>

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
