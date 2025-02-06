import { IndexValues } from 'shared/api/complect/soki.model';

export type IndexSokiInvocatorSharesModel = {
  appVersion: (version: number, modifiedAt: number) => unknown;
  indexValues: (values: IndexValues, modifiedAt: number) => unknown;
};
