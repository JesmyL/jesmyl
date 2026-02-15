import express, { Request, Response } from 'express';
import http from 'http';
import https from 'https';
import { makeRegExp } from 'regexpert';
import { hosts, HttpNumLeadLink } from 'shared/api';
import { makeCmComHttpLinkFromNumLead } from './apps/cm/complect/com-http-links';
import { catsFileStore, comsDirStore } from './apps/cm/file-stores';
import { schedulesDirStore } from './apps/index/schedules/file-stores';

export const startExpressRouting = () => {
  const app = express();
  const PORT = +(process.env.PORT || 8080);
  const mainFolderPath = `/var/www/${hosts.dns}`;
  const isSearchBotReg = /googlebot|bingbot|yandexbot|slurp|duckduckbot|telegrambot|vk\.com|twitterbot/;

  app.use(express.json());
  app.use('/assets', express.static(`${mainFolderPath}/assets`));
  app.use('/sounds', express.static(`${mainFolderPath}/sounds`));
  app.use('/down', express.static(`${mainFolderPath}/down`));

  const isRequestFromSearchBot = (req: Request) => {
    const ua = (req.get('User-Agent') || '').toLowerCase();
    return isSearchBotReg.test(ua);
  };

  const makeOgMeta = (ogProperty: string, content: string) =>
    `<meta property="og:${ogProperty}" content="${content.replace(makeRegExp('/"/g'), "'")}" />`;

  const cmDescription = 'Приложение для вашего служения';
  const audioPathPrefix = '/audio/';

  const makePage = ({
    bodyContent = '',
    title = 'JesmyL',
    ogDescription,
    ogAudio,
  }: {
    bodyContent?: string;
    title?: string;
    ogDescription: string;
    ogAudio?: {
      url: string;
      title: string;
    };
  }) => {
    return `<!DOCTYPE html>
        <html>
            <head>
                <title>${title}</title>

                <meta name="description" content="${cmDescription}" />
                <meta charset="UTF-8" />

                ${makeOgMeta('title', title)}
                ${makeOgMeta('description', ogDescription)}
                ${makeOgMeta('image', `${hosts.host}/android-chrome-512x512.png`)}
                ${makeOgMeta('image:width', '512')}
                ${makeOgMeta('image:height', '512')}
                ${makeOgMeta('url', hosts.host)}
                ${makeOgMeta('type', 'website')}

                ${
                  ogAudio
                    ? `
                    ${makeOgMeta('audio', ogAudio.url)}
                    ${makeOgMeta('audio:title', ogAudio.title)}
                    ${makeOgMeta('audio:type', 'audio/mpeg')}
                `
                    : ''
                }
            </head>
            <body>${bodyContent}</body>
        </html>`;
  };

  app.get(/^[^?#]+\.(js|png|json|mp3)($|[?#])/, async (req: Request, res: Response) => {
    if (req.params[0] === 'mp3') {
      try {
        const isSearchBot = isRequestFromSearchBot(req);
        let externalUrl = req.url;
        let ogDescription = 'Звуковая дорожка';
        let trackLink = '' as HttpNumLeadLink;

        if (req.url.startsWith(audioPathPrefix)) {
          const [comwStr, num] = req.url.slice(audioPathPrefix.length).split(makeRegExp('/\\.mp3|_/'));
          const com = comsDirStore.getItem(+comwStr);

          if (!com?.al?.length) return res.status(404);

          trackLink = [com.al].flat()[+num || 0];
          externalUrl = makeCmComHttpLinkFromNumLead(trackLink);

          ogDescription = `${com.n}\n`;

          const cats = catsFileStore.getValue();

          cats.forEach(cat => {
            if (cat.d?.[com.w]) ogDescription += `\n${cat.n} ${cat.d[com.w]}`;
            if (cat.s?.includes(com.w)) ogDescription += `\n${cat.n}`;
          });
        }

        const url = new URL(externalUrl);
        const client = url.protocol === 'https:' ? https : http;

        client
          .request(
            {
              hostname: url.hostname,
              port: url.port,
              path: url.pathname + url.search,
              method: 'GET',
              headers: {
                'User-Agent': 'Mozilla/5.0',
                ...(req.headers.range && { Range: req.headers.range }),
              },
            },
            proxyRes => {
              if (isSearchBot) {
                const customPage = makePage({
                  ogDescription,
                  ogAudio: { title: ogDescription, url: externalUrl },
                });

                res.writeHead(200, {
                  'Content-Type': 'text/html; charset=utf-8',
                  'Content-Length': Buffer.byteLength(customPage, 'utf8'),
                });
                res.end(customPage);
              } else {
                res.writeHead(proxyRes.statusCode!, {
                  ...proxyRes.headers,
                  'Accept-Ranges': 'bytes',
                  'Content-Type': 'audio/mpeg',
                  'Cache-Control': 'public, max-age=3600',
                });
                proxyRes.pipe(res);
              }
            },
          )
          .on('error', () => res.status(500))
          .end();
      } catch (error) {
        console.error('Proxy error:', error);
        res.status(500).send('Stream failed');
      }

      return;
    }

    if (req.params[0] === 'png')
      res.set({
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=3600',
      });

    res.sendFile(`${mainFolderPath}${req.url}`);
  });

  app.get(/(.*)/, (req: Request, res: Response) => {
    if (isRequestFromSearchBot(req)) {
      let descriptionFromSearchParams = '';

      try {
        const schwMatch = req.url.match(makeRegExp('/\\bschw=(\\d+(?:\\.\\d+)?)/'));

        if (schwMatch != null && +schwMatch[1]) {
          const schedule = schedulesDirStore.getItem(+schwMatch[1]);

          if (schedule) {
            descriptionFromSearchParams += `\n\nМероприятие "${schedule.title}${schedule.topic ? `: ${schedule.topic}` : ''}"`;
          }
        }
      } catch (_e) {
        //
      }

      try {
        const comwMatch = req.url.match(makeRegExp('/\\bcomw=(\\d+(?:\\.\\d+)?)/'));
        if (comwMatch !== null && +comwMatch[1]) {
          const com = comsDirStore.getItem(+comwMatch[1]);

          if (com) {
            descriptionFromSearchParams += `\n\n${com.n}`;
            const cats = catsFileStore.getValue();

            cats.forEach(cat => {
              if (cat.d == null) return;
              if (cat.d[com.w]) descriptionFromSearchParams += `\n${cat.n} ${cat.d[com.w]}`;
            });

            if (com.al) descriptionFromSearchParams += `\n\n${hosts.host}${audioPathPrefix}${com.w}.mp3`;
          }
        }
      } catch (_e) {
        //
      }

      res
        .type('text/html')
        .status(200)
        .send(makePage({ ogDescription: descriptionFromSearchParams.trim() || cmDescription }));

      return;
    }

    res.sendFile(`${mainFolderPath}/index.html`);
  });

  app.listen(PORT, '0.0.0.0', () => {});
};
