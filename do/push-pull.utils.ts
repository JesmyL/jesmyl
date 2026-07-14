import {
  CmComCommentBlockDict,
  CmComWid,
  IExportableCom,
  IScheduleWidget,
  IScheduleWidgetWid,
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

const T = <Type, FileName extends string>() => 0 as never as { F: FileName; T: Type };

export const pullPushFileDirNameNet = {
  'apps/cm/': {
    'coms/': T<IExportableCom, `${CmComWid}`>(),
    'user2Com/': T<PRecord<CmComWid, { fav?: 1; comm?: (CmComCommentBlockDict | nil)[] }>, UserLogin>(),
    comwVisits: T<PRecord<CmComWid, number>, string>(),
  },
  'apps/index/': {
    'users/': T<UserInfo, UserLogin>(),
    'schedules/': T<OmitOwn<IScheduleWidget, 'm' | 'w'>, `${IScheduleWidgetWid}`>(),
    userRoles: T<UserAccessRoleStoraged, string>(),
  },
} satisfies Record<string, Record<string, { F: unknown; T: unknown }>>;
