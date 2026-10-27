import { isElectronApp } from '#shared/tsjrpc.electron/tsjrpc.electron.client';
import { makeToastKOMoodConfig } from '#shared/ui/modal';
import { DragEvent, useState } from 'react';
import { toast } from 'sonner';
import { addFileToMyFiles, MyFileId, MyFileType } from 'x/my-files';
import { isDroppedFontFile } from './electronWorkDir';
import { markFileDragOver } from './workDirDrag';

/** Dropping a font file anywhere on a broadcast slide registers it in myFiles and applies it to the current config. */
export const useFontFileDrop = (onApplyFont: (fontFileId: MyFileId) => void) => {
  const [isFileDragOver, setIsFileDragOver] = useState(false);

  // In web builds the uploader's transparent `<input type=file>` overlay owns drops by hit-testing, so these
  // handlers never fire — attach them only in the Electron renderer, where the WorkDir tab is available.
  if (!isElectronApp) return { isFileDragOver: false, dropTargetProps: {} };

  const markDragOver = (event: DragEvent<HTMLElement>) => {
    if (markFileDragOver(event)) setIsFileDragOver(true);
  };

  const dropTargetProps = {
    onDragEnter: markDragOver,
    onDragOver: markDragOver,
    onDragLeave: (event: DragEvent<HTMLElement>) => {
      if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;

      setIsFileDragOver(false);
    },
    onDrop: (event: DragEvent<HTMLElement>) => {
      event.preventDefault();
      setIsFileDragOver(false);

      const file = Array.from(event.dataTransfer.files).find(isDroppedFontFile);
      if (!file) return;

      // A found font claims the whole drop: stopping propagation keeps lower drop handlers away from it,
      // which also means media files dropped together with a font are silently skipped.
      event.stopPropagation();

      addFileToMyFiles(file, MyFileType.Font)
        .then(onApplyFont)
        .catch(error => toast(`${error}`, makeToastKOMoodConfig()));
    },
  };

  return { isFileDragOver, dropTargetProps };
};
