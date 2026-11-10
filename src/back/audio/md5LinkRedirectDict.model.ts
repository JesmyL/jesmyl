import { CmAudioTail, HttpLink, HttpNumLeadLink } from 'shared/api';

export type AudioLinkRow = {
  key: CmAudioTail;
  md5: string;
  /** Устаревшая numLead-ссылка либо полная http-ссылка из старого словаря. */
  link: HttpLink | HttpNumLeadLink;
  /** Длительность аудио-файла в секундах; отсутствует, пока файл не был скачан локально. */
  duration: number | nil;
};

export type AudioLinkKeyRow = Pick<AudioLinkRow, 'key' | 'md5'>;

/** Формат pull-push-файла `audioLinkMap.json`: строки, сгруппированные по ключу. */
export type AudioLinkMap = Record<CmAudioTail, Omit<AudioLinkRow, 'key'>>;
