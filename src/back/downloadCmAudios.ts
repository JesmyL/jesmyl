import { HttpNumLeadLink } from 'shared/api';
import { pullCmAudiosExpressRoutePath, pullFilesExpressSecretQueryName } from 'shared/api/pullFiles.utils';
import { checkIsObject, checkIsStartsWith, checkIsString } from 'shared/utils/checkIs';
import { downloadFileMd5Rename } from 'shared/utils/downloadFileMd5Rename';
import { objectEntries } from 'shared/utils/object.utils';
import { hostConfig } from '../../freshHostConfig';
import * as secret from '../../do/secret.json';
import { makeCmComHttpLinkFromNumLead, numLeadToHttpLinks } from './apps/cm/complect/com-http-links';
import { FileStore } from './complect/FileStore';
import { hostRootDir } from './envJson';
import { makeRedLogText } from './utils.exec';

const isHttpNumLeadLink = (link: string): link is HttpNumLeadLink =>
  checkIsStartsWith(link, 'http') || Object.hasOwn(numLeadToHttpLinks, `${parseFloat(link)}~`);

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

  const response = await fetch(
    `${hostConfig.url}${pullCmAudiosExpressRoutePath}?${pullFilesExpressSecretQueryName}=${secret.secret}`,
  );

  if (!response.ok) throw new Error(`Не удалось получить список аудио с сервера: ${response.status}`);

  const audios = await response.json();

  if (!checkIsObject(audios)) throw new Error('Сервер вернул некорректный список аудио');

  for (const [rawLink, title] of objectEntries(audios)) {
    if (!checkIsString(title)) continue;

    if (!isHttpNumLeadLink(rawLink)) {
      console.warn(makeRedLogText(`Пропущена некорректная ссылка на аудио "${rawLink}"`));
      continue;
    }

    if (linkDict[rawLink]) continue;

    try {
      console.info(`Скачивание аудио-файла для песни "${title}"`);
      linkDict[rawLink] = await downloadFileMd5Rename('audio/', makeCmComHttpLinkFromNumLead(rawLink), { title });
    } catch (error) {
      console.error(makeRedLogText(`Ошибка скачивания аудио "${title}" (${rawLink}): ${error}`));
      linkDict[rawLink] = null;
    }

    linkDictFileStorage.saveValue(2);
  }

  console.info('Все возможные аудио файлы скачаны');
};
