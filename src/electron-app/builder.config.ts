import fs from 'fs';
import path from 'path';
import { lazyEnvJson } from '../back/envJson';
import { electronAppName, makeElectronDownHostUrl } from './src/lib';

const frontBuildPultPath = path.resolve(import.meta.dirname, '../../build/pult.html');

if (!fs.existsSync(frontBuildPultPath))
  throw `Сборка пульта не найдена: ${frontBuildPultPath}. Выполните npm run build перед сборкой Electron.`;

const downUrl = `https://${makeElectronDownHostUrl(lazyEnvJson().host)}`;
const icon = 'assets/img/ico-512x512.png';

const publish = [
  {
    provider: 'generic' as const,
    url: downUrl,
  },
];

const config = {
  appId: 'cm.com.presentation',
  productName: electronAppName,
  files: [
    'package.json',
    {
      from: 'dist',
      to: 'dist',
      filter: ['**/*'],
    },
    {
      from: 'assets',
      to: 'assets',
      filter: ['**/*'],
    },
  ],
  extraResources: [
    {
      from: '../../build',
      to: 'front-build',
      filter: ['**/*'],
    },
  ],
  directories: {
    output: 'release-builds',
  },
  publish,
  win: {
    target: ['nsis'],
    icon,
    artifactName: `${electronAppName}.\${ext}`,
  },
  linux: {
    target: ['AppImage'],
    icon,
    artifactName: `${electronAppName}.AppImage`,
    publish,
  },
};

export default config;
