import { takeWorkDirBgFromDataTransfer, workDirNoBgDragValue } from '#features/ElectronWorkDir/lib/workDirDrag';
import { CmComListPackKindSelector } from '$cm/entities/ComListPackKindSelector';
import { CmComFaceList, cmIDB } from '$cm/ext';
import { useCmBroadcastScreenComNavigationComws, useCmBroadcastSlidesContext } from '$cm/features/broadcast';
import styled from '@emotion/styled';
import { DragEvent } from 'react';
import { IExportableCom } from 'shared/api';

export const CmBroadcastGridTabList = () => {
  const { comPack, comws } = useCmBroadcastScreenComNavigationComws();
  const { setSlidei } = useCmBroadcastSlidesContext();

  const dropWorkDirBgOnCom = ({ com, event }: { com: IExportableCom; event: DragEvent }) => {
    event.preventDefault();

    const payload = takeWorkDirBgFromDataTransfer(event.dataTransfer);
    if (!payload) return;

    void cmIDB.updateComFix(com.w, fix => {
      if (payload === workDirNoBgDragValue) {
        // No-bg marker — drop the com fix so the song falls back to the base broadcast config background.
        delete fix.bgFilePath;
        delete fix.bgFileId;
      } else fix.bgFilePath = payload.path;
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
