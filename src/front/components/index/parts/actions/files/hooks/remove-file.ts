import { filesStorage } from '#shared/ui/configurators/utils/storage';
import { useCallback } from 'react';
import { MyFileType } from 'shared/api';

export const useRemoveMyFile = (type: MyFileType) => {
  return useCallback(
    async (file: File) => {
      const localFiles = { ...(await filesStorage.getOr(type, {})) };
      delete localFiles[file.name];
      filesStorage.set(type, localFiles);
    },
    [type],
  );
};
