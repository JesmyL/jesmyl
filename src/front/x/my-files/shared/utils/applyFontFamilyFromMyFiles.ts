import { bundledFontFamilies, MyFileId } from '../model/common';
import { takeFontFileBuffer } from './fontStorage';

export const takeMyFileFontFamily = (fileId: MyFileId) =>
  typeof fileId === 'number' ? (bundledFontFamilies.get(fileId)?.title ?? `${fileId}`) : `font-${fileId}`;

const reportFontFamilyFailure = (family: string, reason: unknown) => {
  console.warn(`Failed to load font family "${family}"`, reason);
  return false;
};

/** Resolves `true` when the family is ready to render, `false` when it could not be loaded. */
export const applyFontFamilyFromMyFiles = async (win: Window | nil, fileId: MyFileId | nil) => {
  if (fileId == null) return true;
  if (!win) return false;

  const family = takeMyFileFontFamily(fileId);

  if (Array.from(win.document.fonts).some(face => face.family === family && face.status === 'loaded')) return true;

  const src =
    typeof fileId === 'number'
      ? bundledFontFamilies.get(fileId)?.src
      : await takeFontFileBuffer(fileId);

  if (src == null) return false;

  try {
    return new FontFace(family, typeof src === 'string' ? `url(${src})` : src)
      .load()
      .then(face => {
        win.document.fonts.add(face);
        return true;
      })
      .catch(reason => reportFontFamilyFailure(family, reason));
  } catch (reason) {
    return reportFontFamilyFailure(family, reason);
  }
};
