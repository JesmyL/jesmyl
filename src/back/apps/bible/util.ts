import { makeBibleTranslateFileName } from 'back/complect/lib/make-bible-texts';
import fs from 'fs';
import { BibleTranslateName } from 'shared/api';

export const getMinifiedBibleJson = async (tName: BibleTranslateName) => {
  const filePath = makeBibleTranslateFileName(tName);
  const needsMinify = await isJsonFormatted(filePath);

  if (needsMinify) {
    const rawData = await fs.promises.readFile(filePath, 'utf-8');
    const parsedJson = JSON.parse(rawData);
    const minifiedString = JSON.stringify(parsedJson);

    await fs.promises.writeFile(filePath, minifiedString, 'utf-8');

    return minifiedString;
  }

  return await fs.promises.readFile(filePath, 'utf-8');
};

const isJsonFormatted = async (filePath: string) => {
  let fileHandle;
  try {
    fileHandle = await fs.promises.open(filePath, 'r');
    const buffer = Buffer.alloc(20);
    const { bytesRead } = await fileHandle.read(buffer, 0, 20, 0);
    const startText = buffer.toString('utf-8', 0, bytesRead).trimStart();

    return startText.includes('\n') || startText.includes('\r');
  } catch {
    return false;
  } finally {
    if (fileHandle) await fileHandle.close();
  }
};
