import { CmComWid, ICmComComment, ICmComCommentBlock } from 'shared/api/complect/apps';

export type CmTsjrpcModel = {
  requestFreshes: (args: { lastModfiedAt: number }) => void;
  exchangeFreshComCommentBlocks: (args: {
    modifiedComments: ICmComCommentBlock[];
    clientDateNow: number;
  }) => ICmComCommentBlock[];

  /** @deprecated */
  exchangeFreshComComments: (args: { modifiedComments: ICmComComment[]; clientDateNow: number }) => ICmComComment[];

  printComwVisit: (args: { comw: CmComWid }) => void;
  takeComwVisitsCount: (args: { comw: CmComWid }) => number;
  getComwVisits: () => PRecord<CmComWid, number>;
};
