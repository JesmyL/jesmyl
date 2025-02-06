import { ICmComComment } from 'shared/api/complect/apps';

export type CmFreshSokiInvocatorModel = {
  requestFreshes: (lastModfiedAt: number) => void;
  exchangeFreshComComments: (modifiedComments: ICmComComment[], clientDateNow: number) => ICmComComment[];
};
