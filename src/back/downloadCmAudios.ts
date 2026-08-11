import { HttpNumLeadLink } from 'shared/api';
import { checkIsUndefined } from 'shared/utils/checkIs';
import { downloadFileMd5Rename } from 'shared/utils/downloadFileMd5Rename';
import { makeCmComHttpLinkFromNumLead } from './apps/cm/complect/com-http-links';
import { FileStore } from './complect/FileStore';
import { comDB } from './drizzle.schema';
import { db } from './drizzle/drizzle.db';

export const downloadCmAudios = async () => {
  const linkDictFileStorage = new FileStore<Record<HttpNumLeadLink, string | null>>('/../audio/__linkDict.json', {});
  const linkDict = linkDictFileStorage.getValue();

  const coms = await db.select({ al: comDB.al, n: comDB.n }).from(comDB);

  for (const com of coms) {
    if (!com.al?.length) continue;

    for (const link of com.al) {
      if (!checkIsUndefined(linkDict[link])) continue;
      const prev = linkDict[link];

      try {
        console.info(`Скачивание аудио-файла для песни "${com.n}"`);
        linkDict[link] = await downloadFileMd5Rename('audio/', makeCmComHttpLinkFromNumLead(link), {
          title: com.n,
        });
      } catch {
        linkDict[link] = null;
      }

      if (linkDict[link] !== prev) linkDictFileStorage.saveValue(2);
    }
  }

  console.info('Все возможные аудио файлы скачаны');
};
