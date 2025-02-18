import { emptyFunc } from 'shared/utils';
import { filesStorage } from '../consts/index/filesStorage';

export const applyFontFamilyFromMyFiles = async (fileName?: string, win: Window = window) => {
  if (fileName === undefined) return;

  const fonts = await filesStorage.get('font');
  if (
    fonts === undefined ||
    fonts[fileName] === undefined ||
    Array.from(win.document.fonts.keys()).some(face => face.family === fileName)
  )
    return;

  new FontFace(fileName, await fonts[fileName].arrayBuffer())
    .load()
    .then(face => win.document.fonts.add(face))
    .catch(emptyFunc);
};
