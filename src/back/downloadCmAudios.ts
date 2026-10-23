import { parseHttpNumLeadLink } from 'shared/api';
import { pullCmAudiosExpressRoutePath, pullFilesExpressSecretQueryName } from 'shared/api/pullFiles.utils';
import { checkIsObject, checkIsString } from 'shared/utils/checkIs';
import { objectEntries } from 'shared/utils/object.utils';
import { hostConfig } from '../../freshHostConfig';
import * as secret from '../../do/secret.json';
import { downloadCmAudioFile } from './audio/md5LinkRedirectDict';
import { makeRedLogText } from './utils.exec';

export const downloadCmAudios = async () => {
  const response = await fetch(
    `${hostConfig.url}${pullCmAudiosExpressRoutePath}?${pullFilesExpressSecretQueryName}=${secret.secret}`,
  );

  if (!response.ok) throw new Error(`Не удалось получить список аудио с сервера: ${response.status}`);

  const audios = await response.json();

  if (!checkIsObject(audios)) throw new Error('Сервер вернул некорректный список аудио');

  for (const [rawLink, title] of objectEntries(audios)) {
    if (!checkIsString(title)) continue;

    const link = parseHttpNumLeadLink(rawLink);

    if (!link) {
      console.warn(makeRedLogText(`Пропущена некорректная ссылка на аудио "${rawLink}"`));
      continue;
    }

    try {
      console.info(`Скачивание аудио-файла для песни "${title}"`);
      await downloadCmAudioFile(link, title);
    } catch (error) {
      console.error(makeRedLogText(`Ошибка скачивания аудио "${title}" (${link}):`));
      console.error(error);
    }
  }

  console.info('Все возможные аудио файлы скачаны');
};
