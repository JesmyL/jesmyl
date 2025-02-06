import { EeStorePack } from 'shared/api/complect/apps';

export type CmEditorSokiInvocatorModel = {
  editedEEWords: (data: { words: EeStorePack; modifiedAt: number }) => unknown;
  refreshEEPack: (data: { pack: EeStorePack; modifiedAt: number }) => unknown;
};
