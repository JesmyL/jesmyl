import { lazyEnvJson } from '../back/envJson';
import { electronAppName } from './src/const';
import { makeElectronDownHostUrl } from './src/lib';

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
