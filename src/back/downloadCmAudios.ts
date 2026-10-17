import { HttpNumLeadLink } from 'shared/api';
import { downloadFileMd5Rename } from 'shared/utils/downloadFileMd5Rename';
import { makeCmComHttpLinkFromNumLead } from './apps/cm/complect/com-http-links';
import { FileStore } from './complect/FileStore';
import { comDB } from './drizzle.schema';
import { db } from './drizzle/drizzle.db';
import { hostRootDir } from './envJson';
import { makeRedLogText } from './utils.exec';

export const downloadCmAudios = async () => {
  // Файлы пишутся в `${hostRootDir}/audio/`, поэтому и словарь держим рядом, а не под fileStoreDir.
  const linkDictFileStorage = new FileStore<Record<HttpNumLeadLink, string | nil>>(
    '/audio/__linkDict.json',
    {},
    {
      baseDir: hostRootDir,
    },
  );
  const linkDict = linkDictFileStorage.getValue();

  const coms = await db.select({ al: comDB.al, n: comDB.n }).from(comDB);

  for (const com of coms) {
    if (!com.al?.length) continue;

    for (const link of com.al) {
      if (linkDict[link]) continue;

      try {
        console.info(`Скачивание аудио-файла для песни "${com.n}"`);
        linkDict[link] = await downloadFileMd5Rename('audio/', makeCmComHttpLinkFromNumLead(link), {
          title: com.n,
        });
      } catch (_) {
        console.error(makeRedLogText(`Ошибка скачивания аудио "${com.n}" (${link}):`));
        linkDict[link] = null;
      }

      linkDictFileStorage.saveValue(2);
    }
  }

  console.info('Все возможные аудио файлы скачаны');
};
