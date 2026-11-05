import { backLocaleError } from 'back/locales/back';
import https from 'https';
import { CmMp3ContainsPageResult } from 'shared/api';
import { BackLocaleKey } from 'shared/model/+locale/_BackLocaleKey';
import { cmEditorTsjrpcBaseServer } from '../editor.tsjrpc.base';
import { mp3ResourcesFileStorage } from '../file-stores';

const fetch = (url: string) => {
  return new Promise<string>((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: {
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
          },
        },
        res => {
          const data: string[] = [];

          res.on('data', (chunk: string) => data.push(chunk));
          res.on('end', () => {
            resolve(Buffer.concat(data as never).toString());
          });
        },
      )
      .on('error', () => {
        reject(backLocaleError(BackLocaleKey.ErrorWithNumber, { n: 512535123 }));
      });
  });
};

export const cmGetResourceHTMLString: typeof cmEditorTsjrpcBaseServer.getResourceHTMLString = ({ src }) => {
  return new Promise<{ value: CmMp3ContainsPageResult }>((resolve, reject) => {
    const rules = mp3ResourcesFileStorage.getValue();
    let rule = rules.find(({ url }) => src.startsWith(url));

    if (rule?.rdir) {
      rule = rules.find(({ url }) => rule?.rdir === url);
    }

    if (rule) {
      const userUrl = new URL(src);
      userUrl.hostname = new URL(rule.url).hostname;

      fetch(userUrl.toString())
        .then(html => resolve({ value: { rule, html } }))
        .catch(() => reject(backLocaleError(BackLocaleKey.ErrorWithNumber, { n: 97377213 })));
    } else reject(backLocaleError(BackLocaleKey.CmMp3ResourceUnknown));
  });
};
