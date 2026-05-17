import { CmComAudioMarkPack, CmComWid, HttpNumLeadLink, ICmComCommentBlock } from 'shared/api/complect/apps';
import { IScheduleWidgetWid } from 'shared/api/complect/schedule-widget';

export type CmTsjrpcModel = {
  requestFreshes: (args: { lastModfiedAt: number }) => void;
  exchangeFreshComCommentBlocks: (args: {
    modifiedComments: ICmComCommentBlock[];
    clientDateNow: number;
  }) => ICmComCommentBlock[];
  pullComComments: (args: { comw: CmComWid }) => ICmComCommentBlock | nil;

  printComwVisit: (args: { comw: CmComWid }) => void;
  takeComwVisitsCount: (args: { comw: CmComWid }) => number;
  getComwVisits: () => PRecord<CmComWid, number>;

  takeFreshComAudioMarksPack: (args: { src: HttpNumLeadLink; mod: number }) => null | {
    cMarks?: CmComAudioMarkPack;
    src: HttpNumLeadLink;
    m: number;
  };
  getLinkLeadNumHost: (args: { num: number }) => { host: string | nil };

  getSchEventComPackMod: (args: { schw: IScheduleWidgetWid; dayi: number }) => { mod: number };
};
