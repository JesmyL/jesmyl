import { emptyFunc } from 'shared/utils';
import { MyFileBoxId } from '../model/common';
import { myFilesIDB } from '../state/idb';

export const applyFontFamilyFromMyFiles = (win: Window | nil, fileId?: MyFileBoxId) => {
  if (!fileId || !win) return;

  (async () => {
    const font = await myFilesIDB.tb.files.get(fileId);

    if (font == null || Array.from(win.document.fonts.keys()).some(face => face.family === fileId)) return;

    new FontFace(fileId, await font.file.arrayBuffer())
      .load()
      .then(face => win.document.fonts.add(face))
      .catch(emptyFunc);
  })();
};
