import { IExportableCom, IServerSideCom } from 'shared/api';
import { comsDirStore } from '../file-stores';
import { makeCmComHttpToNumLeadAudioLinks, makeCmComNumLeadToHttpAudioLinks } from './com-http-links';

export const mapCmImportableToExportableCom = (com: IServerSideCom): IExportableCom => {
  return { ...com, al: makeCmComNumLeadToHttpAudioLinks(com.al), m: comsDirStore.getItemModTime(com.w) ?? 0 };
};

export const mapCmExportableToImportableCom = (com: IExportableCom): IServerSideCom => {
  return { ...com, al: makeCmComHttpToNumLeadAudioLinks(com.al) };
};
