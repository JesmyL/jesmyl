import { useEffect } from 'react';
import { MyFileId } from '../model/common';
import { applyFontFamilyFromMyFiles } from './applyFontFamilyFromMyFiles';

export const useApplyScreenFontFamilyEffect = (bgFileId: MyFileId | und, win: Window) =>
  useEffect(() => {
    void applyFontFamilyFromMyFiles(win, bgFileId);
  }, [bgFileId, win]);
