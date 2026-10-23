import { CmAudioTail, HttpLink, HttpNumLeadLink } from 'shared/api';

export type AudioLinkRow = {
  key: CmAudioTail;
  md5: string;
  /** Устаревшая numLead-ссылка либо полная http-ссылка из старого словаря. */
  link: HttpLink | HttpNumLeadLink;
};

export type AudioLinkKeyRow = Pick<AudioLinkRow, 'key' | 'md5'>;
