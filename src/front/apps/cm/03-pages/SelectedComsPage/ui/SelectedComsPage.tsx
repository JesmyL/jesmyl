import { translateBase } from '#basis/locale';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { BottomPopup } from '#shared/ui/popup/bottom-popup/BottomPopup';
import { CmComLocalListToolsPopup, CmComMoveSelectedButton, cmComSelectedComwsAtom } from '$cm/entities/com';
import { CmComFaceList } from '$cm/entities/com-face';
import { useAtomValue } from 'atomaric';
import { useState } from 'react';

export function CmSelectedComs() {
  const selectedComws = useAtomValue(cmComSelectedComwsAtom);
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  return (
    <PageContainerConfigurer
      className="favorites-container"
      headTitle={translateBase(it => it.sel)}
      onMoreClick={setIsToolsOpen}
      content={
        <>
          {isToolsOpen && (
            <BottomPopup onClose={setIsToolsOpen}>
              <CmComLocalListToolsPopup comws={selectedComws} />
            </BottomPopup>
          )}
          <CmComFaceList
            list={selectedComws}
            comDescription={(_comw, comi) => <CmComMoveSelectedButton comi={comi} />}
          />
        </>
      }
    />
  );
}
