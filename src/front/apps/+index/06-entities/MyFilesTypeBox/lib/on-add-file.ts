import { filesStorage } from '#shared/ui/configurators/utils/storage';
import { ChangeEvent, DragEventHandler, useCallback } from 'react';
import { useIndexMyFilesTypeBoxAssociateTheFileType } from './associate-file';

export const useIndexMyFilesTypeBoxAddFile = () => {
  const associate = useIndexMyFilesTypeBoxAssociateTheFileType();
  return useCallback(
    async (file: File) => {
      const type = associate(file);
      const localFiles = { ...(await filesStorage.getOr(type, {})) };
      localFiles[file.name] = file;
      filesStorage.set(type, localFiles);
    },
    [associate],
  );
};

export const useIndexMyFilesTypeBoxAddFileOnDrop = (forceUpdate: () => void): DragEventHandler<HTMLDivElement> => {
  const add = useIndexMyFilesTypeBoxAddFile();

  return useCallback(
    event => {
      event.preventDefault();
      if (event.dataTransfer?.files[0] == null) return;
      add(event.dataTransfer.files[0]);
      forceUpdate();
    },
    [add, forceUpdate],
  );
};

export const useIndexMyFilesTypeBoxAddFileOnFileChange = (forceUpdate: () => void) => {
  const add = useIndexMyFilesTypeBoxAddFile();

  return useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      if (event.target?.files?.[0] == null) return;
      add(event.target.files[0]);
      forceUpdate();
    },
    [add, forceUpdate],
  );
};
