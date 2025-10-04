import { IExportableCom, IServerSideCom } from 'shared/api';
import { makeCmComHttpToNumLeadAudioLinks, makeCmComNumLeadToHttpAudioLinks } from './com-http-links';

export const mapCmImportableToExportableCom = (com: IServerSideCom): IExportableCom => {
  return { ...com, al: makeCmComNumLeadToHttpAudioLinks(com.al) };
};

export const mapCmExportableToImportableCom = (com: IExportableCom): IServerSideCom => {
  return { ...com, al: makeCmComHttpToNumLeadAudioLinks(com.al) };
};
