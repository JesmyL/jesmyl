import { HttpNumLeadLink } from 'shared/api';
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
      if (linkDict[link]) {
        console.info(`Аудио для "${com.n}" уже сохранено`);
        continue;
      }

      try {
        linkDict[link] = await downloadFileMd5Rename('audio/', makeCmComHttpLinkFromNumLead(link));
      } catch {
        linkDict[link] = null;
      }

      linkDictFileStorage.saveValue(2);
    }
  }
};
