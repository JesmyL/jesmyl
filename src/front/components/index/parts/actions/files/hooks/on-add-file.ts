import { ChangeEvent, DragEvent, useCallback } from 'react';
import { filesStorage } from '../../../../../../complect/configurators/utils/storage';
import { useAssociateTheFileType } from './associate-file';

export const useAddMyFile = () => {
  const associate = useAssociateTheFileType();
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

export const useAddMyFileOnDrop = (forceUpdate: () => void) => {
  const add = useAddMyFile();

  return useCallback(
    (event: DragEvent) => {
      event.preventDefault();
      if (event.dataTransfer?.files[0] == null) return;
      add(event.dataTransfer.files[0]);
      forceUpdate();
    },
    [add, forceUpdate],
  );
};

export const useAddMyFileOnFileChange = (forceUpdate: () => void) => {
  const add = useAddMyFile();

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
