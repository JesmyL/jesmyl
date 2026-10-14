import { useEffect, useState } from 'react';
import { readWorkDirFileDataUrl, takeCachedWorkDirFileDataUrl } from './electronWorkDir';

export const useWorkDirFileSrc = (filePath: string) => {
  const [src, setSrc] = useState<string | nil>(() =>
    filePath ? takeCachedWorkDirFileDataUrl(filePath) : undefined,
  );

  useEffect(() => {
    if (!filePath) return;

    let isActive = true;

    readWorkDirFileDataUrl(filePath)
      .then(dataUrl => {
        if (isActive && dataUrl) setSrc(dataUrl);
      })
      .catch(() => {});

    return () => {
      isActive = false;
    };
  }, [filePath]);

  return filePath ? src : undefined;
};
