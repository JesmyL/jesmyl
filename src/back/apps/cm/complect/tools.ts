import { IExportableCom, IServerSideCom } from 'shared/api';
import { comsDirStorage } from '../file-stores';
import { makeCmComHttpAudioLinks, makeCmComNumLeadAudioLinkList } from './com-http-links';

export const mapCmImportableToExportableCom = (com: IServerSideCom): IExportableCom => {
  return { ...com, al: makeCmComNumLeadAudioLinkList(com.al), m: comsDirStorage.getItemModTime(com.w) ?? 0 };
};

export const mapCmExportableToImportableCom = (com: OmitOwn<IExportableCom, 'm'>): IServerSideCom => {
  return { ...com, al: makeCmComHttpAudioLinks(com.al), ['m' as 'w']: undefined! };
};
