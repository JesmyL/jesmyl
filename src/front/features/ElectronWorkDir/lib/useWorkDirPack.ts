import { useEffect, useState } from 'react';
import { ElectronWorkDirFolderPack } from 'shared/api/tsjrpc.electtron/basic';
import { readWorkDir } from './electronWorkDir';

/** Loads a work-dir folder pack and polls it so newly added (and md5-renamed) media appear automatically. */
export const useWorkDirPack = (dirPath: string, refreshi: number) => {
  const [pack, setPack] = useState<ElectronWorkDirFolderPack | nil>(null);

  useEffect(() => {
    let isActive = true;

    const load = () => {
      readWorkDir(dirPath)
        .then(next => {
          if (isActive) setPack(next);
        })
        .catch(() => {
          if (isActive) setPack(null);
        });
    };

    load();
    const interval = setInterval(load, 5000);

    return () => {
      isActive = false;
      clearInterval(interval);
    };
  }, [dirPath, refreshi]);

  return pack;
};
