import { NounPronsType } from 'back/complect/model';
import { UserId } from 'back/drizzle/schema/user';
import {
  ChordPack,
  CmComAudioMarkPack,
  CmComCommentBlockDict,
  CmComInSchDayEvWr,
  CmComWid,
  CmMp3Rule,
  ConstantsConfig,
  EeStorePack,
  IExportableCat,
  IExportableCom,
  IExportableComInterpretation,
  IScheduleWidget,
  MenuComToolName,
  ScheduleWidgetDayEventMi,
  ScheduleWidgetDayi,
  ScheduleWidgetWid,
  UserInfo,
  UserLogin,
} from 'shared/api';
import { UserAccessRoleStoraged } from 'shared/model/index/access-rights';

export * from '../src/shared/utils';
export * from '../src/shared/utils/object.utils';

const dataSeparator = '#%^%#';

type Meta = {
  dir: keyof PullPushFileDirNameNet;
  dirDir: string;
  caseDir: `${string}/`;
  file: string;
  name: string;
  count: `${number}/${number}`;
  isFirst: boolean;
  isLast: boolean;
};

export const stringifyPulledFileDatasNl = (meta: Meta, data: unknown) =>
  `${JSON.stringify(meta)}${dataSeparator}${JSON.stringify(data)}\n`;

export const parsePulledFileDatas = (value: string) => {
  const separatori = value.indexOf(dataSeparator);
  const meta: Meta = JSON.parse(value.slice(0, separatori));
  const strData = value.slice(separatori + dataSeparator.length);

  return { strData, meta };
};

export const pullFilesExpressRoutePath = `/api/pull-files`;
export const pushFilesExpressRoutePath = `/api/push-files`;
export const pullFilesExpressSecretQueryName = 'secret_word';

export type PullPushFileDirNameNet = typeof pullPushFileDirNameNet;

const T = <Type, FileName extends string>() => 1 as never as { F: FileName; T: Type };

export const pullPushFileDirNameNet = {
  'apps/index/': {
    'users/': T<UserInfo & { id: UserId }, UserLogin>(),

    'schedules/': T<OmitOwn<IScheduleWidget, 'm' | 'w'>, `${ScheduleWidgetWid}`>(),

    userRoles: T<UserAccessRoleStoraged, string>(),
    nouns: T<NounPronsType, string>(),
    pronouns: T<NounPronsType, string>(),
    constantsConfig: T<ConstantsConfig, string>(),
  },

  'apps/cm/': {
    comwVisits: T<PRecord<CmComWid, number>, string>(),
    chordTracks: T<ChordPack, string>(),
    eeStorage: T<EeStorePack, string>(),
    mp3Rules: T<CmMp3Rule[], string>(),
    cats: T<IExportableCat[], string>(),

    'coms/': T<IExportableCom & { am?: CmComAudioMarkPack | nil }, `${CmComWid}`>(),

    'user2Com/': T<
      {
        coms?: PRecord<CmComWid, { fav?: 1; comm?: (CmComCommentBlockDict | nil)[] }>;
        ext?: { commAlts?: string[]; tools?: MenuComToolName[] };
      },
      UserLogin
    >(),

    'schDayEvComHistory/': T<
      Record<
        ScheduleWidgetDayi,
        Record<ScheduleWidgetDayEventMi, { s: CmComWid[]; u: UserId; w: CmComInSchDayEvWr }[]>
      >,
      `${ScheduleWidgetWid}`
    >(),

    'sch2Com/': T<Record<CmComWid, { intp?: IExportableComInterpretation }>, `${ScheduleWidgetWid}`>(),
  },
} satisfies Record<string, Record<string, { F: unknown; T: unknown }>>;
