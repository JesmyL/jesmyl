import https from 'https';
import { CmMp3ContainsPageResult } from 'shared/api';
import { cmEditorTsjrpcBaseServer } from '../editor.tsjrpc.base';
import { mp3ResourcesData } from '../file-stores';

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
      .on('error', error => {
        reject(`Ошибка 512535123\n${error}`);
      });
  });
};

export const cmGetResourceHTMLString: typeof cmEditorTsjrpcBaseServer.getResourceHTMLString = ({ src }) => {
  return new Promise<{ value: CmMp3ContainsPageResult }>((resolve, reject) => {
    const rules = mp3ResourcesData.getValue();
    const rule = rules.find(({ url }) => src.startsWith(url));

    if (rule)
      fetch(src)
        .then(html => resolve({ value: { rule, html } }))
        .catch(error => reject(`Ошибка 97377213\n${error}`));
    else reject('Ошибка. Этот ресурс неизвестен');
  });
};
