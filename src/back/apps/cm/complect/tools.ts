import { IExportableCom, IServerSideCom } from 'shared/api';
import { comsDirStore } from '../file-stores';
import { makeCmComHttpToNumLeadAudioLinks, makeCmComNumLeadToHttpAudioLinks } from './com-http-links';

export const mapCmImportableToExportableCom = (com: IServerSideCom): IExportableCom => {
  return { ...com, al: makeCmComNumLeadToHttpAudioLinks(com.al), m: comsDirStore.getItemModTime(com.w) ?? 0 };
};

export const mapCmExportableToImportableCom = (com: OmitOwn<IExportableCom, 'm'>): IServerSideCom => {
  return { ...com, al: makeCmComHttpToNumLeadAudioLinks(com.al), ['m' as 'w']: undefined! };
};
