import { ICmComComment } from 'shared/api/complect/apps';

export type CmFreshSokiInvocatorModel = {
  requestFreshes: (args: { lastModfiedAt: number }) => void;
  exchangeFreshComComments: (args: { modifiedComments: ICmComComment[]; clientDateNow: number }) => ICmComComment[];
};
