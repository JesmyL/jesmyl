import fs from 'fs';
import { hostConfig } from '../freshHostConfig';
import {
  forEachObjectEntries,
  objectKeys,
  pullFilesExpressSecretQueryName,
  pullPushFileDirNameNet,
  pushFilesExpressRoutePath,
  stringifyPulledFileDatasNl,
} from './pullFiles.utils';
import * as secret from './secret.json';

(async () => {
  const { url } = hostConfig;

  forEachObjectEntries(pullPushFileDirNameNet, async (dir, box) => {
    const dirPath = `src/back/${dir.trim()}+case/` as const;

    const fileNames = ('.' in box ? fs.readdirSync(dirPath) : objectKeys(box)).filter(
      file => file[0] !== '.' && fs.statSync(`${dirPath}${file}`).isFile(),
    );
    const len = fileNames.length;

    for (let filei = 0; filei < fileNames.length; filei++) {
      const file = fileNames[filei];
      const data = JSON.parse(fs.readFileSync(`${dirPath}${file}`, 'utf-8'));

      const response = await fetch(
        `${url}${pushFilesExpressRoutePath}?${pullFilesExpressSecretQueryName}=${secret.secret}`,
        {
          method: 'post',
          headers: { 'Content-Type': 'text/plain; charset=utf-8' },
          body: stringifyPulledFileDatasNl(
            { count: `${filei + 1}/${len}`, dir, file, isLast: filei + 1 === len, name: file },
            data,
          ),
        },
      );

      console.info(await response.text());
    }
  });
})();
