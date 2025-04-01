import { BibleTranslateName } from 'shared/api/complect/apps';

export type BibleSokiInvocatorModel = {
  requestFreshes: (args: { lastModifiedAt: number; myTranslates: BibleTranslateName[] }) => void;
  requestTranslate: (args: { translate: BibleTranslateName }) => void;
};

export type BibleSokiInvocatorBaseModel = {
  refreshTranslate: (args: { tName: BibleTranslateName; stringifiedTranslate: string; modifiedAt: number }) => void;
};
