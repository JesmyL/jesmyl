import { CmComAudioMarkPack, CmComWid, ICmComCommentBlock } from 'shared/api/complect/apps';
import { ScheduleWidgetDayi, ScheduleWidgetWid } from 'shared/api/complect/schedule-widget';

export type CmTsjrpcModel = {
  /** TODO: lastModifiedAt - typo */
  requestFreshes: (args: { lastModfiedAt: number }) => void;

  exchangeFreshComCommentBlocks: (args: {
    modifiedComments: ICmComCommentBlock[];
    clientDateNow: number;
  }) => ICmComCommentBlock[];
  pullComComments: (args: { comw: CmComWid }) => ICmComCommentBlock | nil;

  printComwVisit: (args: { comw: CmComWid }) => void;
  takeComwVisitsCount: (args: { comw: CmComWid }) => number;
  getComwVisits: () => PRecord<CmComWid, number>;

  takeFreshComAudioMarksPack_v1: (args: { mod: number; comw: CmComWid }) => null | {
    marks: CmComAudioMarkPack | nil;
    comw: CmComWid;
    m: number;
  };
  getLinkLeadNumHost: (args: { num: number }) => { host: string | nil };

  /** @deprecated */
  getSchEventComPackMod: (args: { schw: ScheduleWidgetWid; dayi: ScheduleWidgetDayi }) => { mod: number };
};
