import { useEffect, useState } from 'react';
import { readWorkDirFileSrc } from './electronWorkDir';

/** Resolves a WorkDir file to its streamed custom-protocol URL. */
export const useWorkDirFileSrc = (filePath: string) => {
  const [resolved, setResolved] = useState<{ filePath: string; src: string } | nil>(null);

  useEffect(() => {
    if (!filePath) return;

    let isActive = true;

    readWorkDirFileSrc(filePath)
      .then(src => {
        if (isActive && src) setResolved({ filePath, src });
      })
      .catch(() => {});

    return () => {
      isActive = false;
    };
  }, [filePath]);

  return filePath && resolved?.filePath === filePath ? resolved.src : undefined;
};
