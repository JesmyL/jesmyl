import fs from 'node:fs';
import path from 'node:path';
import { HttpNumLeadLink } from 'shared/api';
import { downloadFileMd5Rename } from 'shared/utils/downloadFileMd5Rename';
import { makeCmComHttpLinkFromNumLead } from './apps/cm/complect/com-http-links';
import { FileStore } from './complect/FileStore';
import { comDB } from './drizzle.schema';
import { db } from './drizzle/drizzle.db';
import { hostRootDir } from './envJson';

export const downloadCmAudios = async () => {
  // Файлы пишутся в `${hostRootDir}/audio/`, поэтому и словарь держим рядом, а не под fileStoreDir.
  const linkDictFileStorage = new FileStore<Record<HttpNumLeadLink, string | nil>>('/audio/__linkDict.json', {}, {
    baseDir: hostRootDir,
  });
  const linkDict = linkDictFileStorage.getValue();
  const audioDir = path.resolve(hostRootDir, 'audio');

  const coms = await db.select({ al: comDB.al, n: comDB.n }).from(comDB);

  for (const com of coms) {
    if (!com.al?.length) continue;

    for (const link of com.al) {
      // Пропускаем только те записи, чей файл реально лежит на диске.
      const savedAudioFileName = linkDict[link];
      if (savedAudioFileName && fs.existsSync(path.join(audioDir, savedAudioFileName))) continue;

      try {
        console.info(`Скачивание аудио-файла для песни "${com.n}"`);
        linkDict[link] = await downloadFileMd5Rename('audio/', makeCmComHttpLinkFromNumLead(link), {
          title: com.n,
        });
      } catch (error) {
        console.error(`Ошибка скачивания аудио "${com.n}" (${link}):`, error);
        linkDict[link] = null;
      }

      linkDictFileStorage.saveValue(2);
    }
  }

  console.info('Все возможные аудио файлы скачаны');
};
