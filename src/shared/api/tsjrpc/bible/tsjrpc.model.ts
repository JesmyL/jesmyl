import { BibleTranslateName } from 'shared/model/bible';

export type BibleTsjrpcModel = {
  requestFreshes: (args: { lastModifiedAt: number; myTranslates: BibleTranslateName[] }) => void;
  requestTranslate: (args: { translate: BibleTranslateName }) => void;
};

export type BibleTsjrpcBaseModel = {
  refreshTranslate: (args: { tName: BibleTranslateName; stringifiedTranslate: string; modifiedAt: number }) => void;
};
