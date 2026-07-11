import { CmComWid, IExportableCom, UserInfo } from 'shared/api';
import { UserAccessRoleStoraged } from 'shared/model/index/access-rights';

export * from '../src/shared/utils';
export * from '../src/shared/utils/object.utils';

const dataSeparator = '#%^%#';

type Meta = {
  dir: keyof PullPushFileDirNameNet;
  dirDir: PullPushFileDirNameNet[keyof PullPushFileDirNameNet] | string;
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

const T = <Type>() => 0 as Type;

export const pullPushFileDirNameNet = {
  'apps/cm/': {
    'coms/': T<IExportableCom>(),
    'comwVisits.json': T<PRecord<CmComWid, number>>(),
  },
  'apps/index/': {
    'users/': T<UserInfo>(),
    'userRoles.json': T<UserAccessRoleStoraged>(),
  },
};
