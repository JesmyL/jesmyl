import fs from 'fs';
import { hostConfig } from '../freshHostConfig';
import { checkIsEndsWith } from '../src/shared/utils/checkIs';
import {
  objectKeys,
  pullFilesExpressSecretQueryName,
  PullPushFileDirNameNet,
  pullPushFileDirNameNet,
  pushFilesExpressRoutePath,
  stringifyPulledFileDatasNl,
} from './push-pull.utils';
import * as secret from './secret.json';

(async () => {
  const { url } = hostConfig;
  const fetchUrl = `${url}${pushFilesExpressRoutePath}?${pullFilesExpressSecretQueryName}=${secret.secret}`;
  const makeCaseDir = (path: `${string}/`) => `src/back/${path}+case/` as const;

  for (const dirStr in pullPushFileDirNameNet) {
    const dir = dirStr as keyof PullPushFileDirNameNet;
    const dirBox = pullPushFileDirNameNet[dir];

    try {
      await walk(dir, objectKeys(dirBox), null);
    } catch {
      //
    }

    async function walk(caseDir: `${string}/`, files: string[], topDirDir: string | null) {
      const caseDirPath = makeCaseDir(caseDir);
      const len = files.length;

      for (let filei = 0; filei < files.length; filei++) {
        const fileName = files[filei];

        if (checkIsEndsWith(fileName, '/')) {
          await walk(`${dir}${fileName}`, fs.readdirSync(makeCaseDir(`${dir}${fileName}`)), fileName);
          continue;
        }
        if (fileName[0] === '.') continue;

        const filePath = [`${caseDirPath}${fileName}`, `${caseDirPath}${fileName}.json`].find(path =>
          fs.statSync(path).isFile(),
        );

        if (!filePath) continue;

        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        try {
          const response = await fetch(fetchUrl, {
            method: 'post',
            headers: { 'Content-Type': 'text/plain; charset=utf-8' },
            body: stringifyPulledFileDatasNl(
              {
                dir,
                dirDir: topDirDir ?? fileName,
                caseDir,
                file: fileName,
                name: fileName,
                count: `${filei + 1}/${len}`,
                isFirst: filei === 0,
                isLast: filei + 1 === len,
              },
              data,
            ),
          });

          console.info(await response.text());
        } catch {
          //
        }
      }
    }
  }
})();
