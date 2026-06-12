import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const projectConfigFilePath = join(__dirname, 'project-config.json');
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

const text = ` ${dns} - ${ip} `;
const fullLen = text.length * 3;
const slashes = '/'.repeat(text.length);

console.info(`${'/'.repeat(fullLen)}\n${slashes}${text}${slashes}\n${'/'.repeat(fullLen)}`);

export const deployPathsDict = {
  '': [projectConfigFilePath],

  ...(projectConfig.isUpdateAllStarts
    ? {
        // down: ['~/*.exe', '~/*.AppImage'],
        'apps/bible': ['./src/bibles/*.json'],
      }
    : {}),

  'apps/cm': ['~/#/*.json'],
  'apps/cm/coms': ['~/#/*.json'],
  'apps/cm/comComments': ['~/#/*.json'],
  'apps/index': ['~/#/*.secure'],
  'apps/index': ['~/#/*.json'],
  'apps/index/schedules': ['~/#/*.json'],
  'apps/q': ['~/#/*.json'],
  'apps/q/blanks': ['~/#/*.json'],
  'apps/storages/list': ['~/#/*.json'],
};
