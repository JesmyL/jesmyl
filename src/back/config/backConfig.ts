import fs from 'fs';
import { backConfigProd } from './backConfig.prod';
import { backConfigTests } from './backConfig.tests';

export let backConfig = backConfigProd;

try {
  if ('' + fs.readFileSync(`${__dirname}/.env.mode`) === 'TEST') backConfig = backConfigTests;
} catch (_error) {
  //
}
