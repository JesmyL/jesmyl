import { importWorkDirFileToMyFiles } from '#features/ElectronWorkDir/lib/electronWorkDir';
import { takeWorkDirBgFromDataTransfer } from '#features/ElectronWorkDir/lib/workDirDrag';
import { CmComListPackKindSelector } from '$cm/entities/ComListPackKindSelector';
import { CmComFaceList, cmIDB } from '$cm/ext';
import { useCmBroadcastScreenComNavigationComws, useCmBroadcastSlidesContext } from '$cm/features/broadcast';
import styled from '@emotion/styled';
import { DragEvent } from 'react';
import { IExportableCom } from 'shared/api';

export const CmBroadcastGridTabList = () => {
  const { comPack, comws } = useCmBroadcastScreenComNavigationComws();
  const { setSlidei } = useCmBroadcastSlidesContext();

  const dropWorkDirBgOnCom = async ({ com, event }: { com: IExportableCom; event: DragEvent }) => {
    event.preventDefault();

    const file = takeWorkDirBgFromDataTransfer(event.dataTransfer);
    if (!file) return;

    const boxId = await importWorkDirFileToMyFiles(file);
    if (boxId == null) return;

    void cmIDB.updateComFix(com.w, fix => {
      fix.bgFileId = boxId;
    });
  };

  return (
    <div className="broadcast-com-list">
      <div className="m-5">
        <CmComListPackKindSelector />
      </div>

      <StyledComFaceList
        list={comws}
        titles={comPack.titles}
        importantDropOnCom={dropWorkDirBgOnCom}
        importantOnClick={({ defaultClick }) => {
          setSlidei(0);
          defaultClick();
        }}
      />
    </div>
  );
};

const StyledComFaceList = styled(CmComFaceList)`
  min-height: calc(var(--max-size) + 1px);
`;
