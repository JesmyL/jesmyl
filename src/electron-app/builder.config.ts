import { lazyEnvJson } from '../back/envJson';
import { makeElectronDownHostUrl } from './src/const';

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
  productName: 'JESMYL_PRO',
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
    artifactName: 'JESMYL_PRO.${ext}',
  },
  linux: {
    target: ['AppImage'],
    icon,
    artifactName: 'JESMYL_PRO.AppImage',
    publish,
  },
};

export default config;
