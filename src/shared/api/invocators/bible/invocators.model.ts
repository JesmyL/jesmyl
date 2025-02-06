import { BibleTranslateName } from 'shared/api/complect/apps';

export type BibleSokiInvocatorModel = {
  requestFreshes: (lastModifiedAt: number, myTranslates: BibleTranslateName[]) => void;
  requestTranslate: (translate: BibleTranslateName) => void;
};

export type BibleSokiInvocatorBaseModel = {
  refreshTranslate: (tName: BibleTranslateName, stringifiedTranslate: string, modifiedAt: number) => void;
};
