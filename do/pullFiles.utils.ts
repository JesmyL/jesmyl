import { CmComWid, IExportableCom } from 'shared/api';

export * from '../src/shared/utils';
export * from '../src/shared/utils/object.utils';

const dataSeparator = '#%^%#';

type Meta = {
  dir: keyof PullPushFileDirNameNet;
  file: string;
  name: string;
  count: `${number}/${number}`;
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

export type PullPushFileDirNameNet = {
  'apps/cm/coms/': { '.': IExportableCom };
  'apps/cm/': {
    'comwVisits.json': PRecord<CmComWid, number>;
  };
};

export const pullPushFileDirNameNet = {
  'apps/cm/coms/': { '.': 0 },
  'apps/cm/': {
    'comwVisits.json': 0,
  },
} satisfies { [K in keyof PullPushFileDirNameNet]: Record<keyof PullPushFileDirNameNet[K], 0> };
