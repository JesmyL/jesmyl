import { useEffect } from 'react';
import { MyFileBoxId } from '../model/common';
import { applyFontFamilyFromMyFiles } from './applyFontFamilyFromMyFiles';

export const useApplyScreenFontFamilyEffect = (bgFileId: MyFileBoxId | und, win: Window | und) =>
  useEffect(() => applyFontFamilyFromMyFiles(win, bgFileId), [bgFileId, win]);
