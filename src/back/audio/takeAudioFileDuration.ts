import { lazyEnvJson } from 'back/envJson';
import { parseBuffer, parseFile } from 'music-metadata';
import fs from 'node:fs';
import path from 'node:path';
import { audioExtensionsStr, audioSaveDir } from './audio.const';

/** Путь существующего аудио-файла по его md5; `nil`, если файла нет. */
export const takeAudioFilePath = (md5: string): string | nil => {
  const audioDir = path.resolve(lazyEnvJson().hostRootDir, audioSaveDir);
  const extension = audioExtensionsStr.split(' ').find(ext => fs.existsSync(path.resolve(audioDir, `${md5}.${ext}`)));

  return extension ? path.resolve(audioDir, `${md5}.${extension}`) : null;
};

/** Длительность аудио-файла по его md5 в секундах; `nil` — файл не найден или не разобран. */
export const takeAudioFileDuration = async (md5: string): Promise<number | nil> => {
  const filePath = takeAudioFilePath(md5);

  if (!filePath) return null;

  try {
    const { format } = await parseFile(filePath);

    if (format.duration != null) return Math.round(format.duration);

    // mp3-ссылки иногда отдают MP4/AAC: parseFile выбирает парсер по расширению, поэтому повторяем по содержимому.
    const bufferFormat = (await parseBuffer(await fs.promises.readFile(filePath))).format;

    return bufferFormat.duration == null ? null : Math.round(bufferFormat.duration);
  } catch (_error) {
    return null;
  }
};
