import { CmComWid, ICmComComment } from 'shared/api/complect/apps';

export type CmBasicSokiInvocatorModel = {
  requestFreshes: (args: { lastModfiedAt: number }) => void;
  exchangeFreshComComments: (args: { modifiedComments: ICmComComment[]; clientDateNow: number }) => ICmComComment[];

  printComwVisit: (args: { comw: CmComWid }) => void;
  takeComwVisitsCount: (args: { comw: CmComWid }) => number;
  getComwVisits: () => PRecord<CmComWid, number>;
};
