import fs from 'fs';

const projectConfigFilePath = 'project-config.json';
const {
  base: { current, ...base },
  configs: {
    [current]: { dns, ip },
  },
} = JSON.parse('' + fs.readFileSync(projectConfigFilePath));

export const projectConfig = {
  ...base,
  dns,
  ip,
  host: `https://${dns}`,
};

const text = ` ${dns} `;
const fullLen = text.length * 3;
const slashes = '/'.repeat(text.length);

console.info(`${'/'.repeat(fullLen)}\n${slashes}${text}${slashes}\n${'/'.repeat(fullLen)}`);

export const deployPathsDict = {
  '': [projectConfigFilePath],

  ...(projectConfig.isUpdateAllStarts
    ? {
        down: ['~/*.exe'],
        './down': ['~/*.AppImage'],
        'apps/bible': ['./src/bibles/*.json'],
      }
    : {}),

  'apps/cm': ['~/#/*.json'],
  'apps/cm/coms': ['~/#/*.json'],
  'apps/cm/comComments': ['~/#/*.json'],
  'apps/index': ['~/#/*.secure'],
  'apps/index': ['~/#/*.json'],
  'apps/q': ['~/#/*.json'],
  'apps/q/blanks': ['~/#/*.json'],
  'apps/storages/list': ['~/#/*.json'],
};
