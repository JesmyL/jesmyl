import { useCallback } from 'react';
import { MyFileType } from 'shared/api';
import { filesStorage } from '../../../../../06-entities/configurators/utils/storage';

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
