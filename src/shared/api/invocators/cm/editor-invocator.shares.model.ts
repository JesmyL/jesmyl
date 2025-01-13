import { EeStorePack } from 'shared/api/complect/apps';

export type CmEditorSokiInvocatorBaseMethods = {
  editedEEWords: (data: { words: EeStorePack; modifiedAt: number }) => unknown;
  freshEEPack: (data: { pack: EeStorePack; modifiedAt: number }) => unknown;
};
