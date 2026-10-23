import { bundledFontFamilies, MyFileId } from '../model/common';
import { myFilesIDB } from '../state/idb';

export const takeMyFileFontFamily = (fileId: MyFileId) =>
  typeof fileId === 'number' ? (bundledFontFamilies.get(fileId)?.title ?? `${fileId}`) : fileId;

/** Resolves `true` when the family is ready to render, `false` when it could not be loaded. */
export const applyFontFamilyFromMyFiles = async (win: Window | nil, fileId: MyFileId | nil) => {
  if (fileId == null) return true;
  if (!win) return false;

  const family = takeMyFileFontFamily(fileId);

  if (Array.from(win.document.fonts).some(face => face.family === family && face.status === 'loaded')) return true;

  const src =
    typeof fileId === 'number'
      ? bundledFontFamilies.get(fileId)?.src
      : await myFilesIDB.tb.files.get(fileId).then(font => font?.file.arrayBuffer());

  if (src == null) return false;

  return new FontFace(family, typeof src === 'string' ? `url(${src})` : src)
    .load()
    .then(face => {
      win.document.fonts.add(face);
      return true;
    })
    .catch(reason => {
      console.warn(`Failed to load font family "${family}"`, reason);
      return false;
    });
};
