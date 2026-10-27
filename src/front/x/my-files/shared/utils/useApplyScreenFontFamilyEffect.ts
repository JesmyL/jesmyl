import { useEffect } from 'react';
import { emptyFunc } from 'shared/utils';
import { MyFileId } from '../model/common';
import { applyFontFamilyFromMyFiles } from './applyFontFamilyFromMyFiles';

export const useApplyScreenFontFamilyEffect = (fontFileId: MyFileId | nil, win: Window) =>
  useEffect(() => {
    applyFontFamilyFromMyFiles(win, fontFileId).catch(emptyFunc);
  }, [fontFileId, win]);
