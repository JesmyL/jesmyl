const dataSeparator = '#%^%#';

type Meta = {
  dir: `${string}/`;
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
export const pullFilesExpressSecretQueryName = 'secret_word';
