import { CmComWid, ICmComCommentBlock } from 'shared/api/complect/apps';
import { SokiAuthLogin } from 'shared/api/complect/soki.model';

export type CmTsjrpcModel = {
  requestFreshes: (args: { lastModfiedAt: number }) => void;
  exchangeFreshComCommentBlocks: (args: {
    modifiedComments: ICmComCommentBlock[];
    clientDateNow: number;
  }) => ICmComCommentBlock[];
  replaceUserAltCommentBlocks: (args: { comw: CmComWid; from: string | null; to: string | null }) => void;
  pullUserAltCommentBlock: (args: {
    comw: CmComWid;
    login: SokiAuthLogin;
  }) => OmitOwn<ICmComCommentBlock, 'comw'> | null;

  printComwVisit: (args: { comw: CmComWid }) => void;
  takeComwVisitsCount: (args: { comw: CmComWid }) => number;
  getComwVisits: () => PRecord<CmComWid, number>;
};
