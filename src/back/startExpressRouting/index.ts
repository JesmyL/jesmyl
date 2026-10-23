import { takeScheduleWidgetTiny } from 'back/apps/index/schedules/schedule.tiny';
import { makeCertBotFilePath } from 'back/utils';
import express, { Request, Response } from 'express';
import fs from 'fs';
import http from 'http';
import https from 'https';
import md5 from 'md5';
import path from 'path';
import { Readable, pipeline } from 'node:stream';
import { makeRegExp } from 'regexpert';
import { CmComWid, HttpNumLeadLink, ScheduleWidgetWid, hostConfig, parseHttpNumLeadLink } from 'shared/api';
import { pullCmAudiosExpressRoutePath, pullFilesExpressSecretQueryName } from 'shared/api/pullFiles.utils';
import { emptyFunc, extractNumber, itIt } from 'shared/utils';
import { checkIsString } from 'shared/utils/checkIs';
import { createSecureContext, type SecureContext } from 'tls';
import { WebSocketServer } from 'ws';
import { vitePWAOptions } from '../../../vite-pwa.options';
import * as secret from '../../../do/secret.md5.json';
import { takeComwTiny } from '../apps/cm/com.tiny';
import { catsFileStorage } from '../apps/cm/file-stores';
import {
  migrateLegacyCmAudioValue,
  seedAudioLinkDBFromLegacyFiles,
  takeAudioTailFromRequestPath,
  takeCmComHttpLinkFromAudioRequest,
  takeKnownCmAudioKeyFromLink,
  takeNumLeadLinkByAudioTail,
} from '../audio/md5LinkRedirectDict';
import { db } from '../drizzle/drizzle.db';
import { comDB } from '../drizzle.schema';
import { hostRootDir, lazyEnvJson } from '../envJson';
import { tglogger } from '../sides/telegram-bot/log/log-bot';
import { pullFilesExpressRoute } from './pullFiles';
import { pushFilesExpressRoute } from './pushFiles';

export const startExpressRouting = async (wsServer: WebSocketServer) => {
  const app = express();

  // JSON-словари переносятся в таблицу `audioLinks` один раз, пока она пуста.
  try {
    await seedAudioLinkDBFromLegacyFiles();
  } catch (error) {
    console.error('Audio link seed error:', error);
  }

  const isSearchBotReg = /(google|bing|yandex|duckduck|telegram|twitter)bot|slurp|vk\.com/;

  app.get('/sw.js', (_req, res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(`${hostRootDir}/sw.js`, (err: Error) => {
      if (err && !res.headersSent) {
        res.status(404).send('File not found');
      }
    });
  });

  app.use(express.json());
  app.use('/assets', express.static(`${hostRootDir}/assets`));
  app.use('/sounds', express.static(`${hostRootDir}/sounds`));

  const makeDownRoute = <Route extends `/down${string}`>(route: Route) => {
    app.use(route, async (req, res, next) => {
      const rangeHeader = req.headers.range;

      if (!rangeHeader || !rangeHeader.includes(',')) {
        return next();
      }

      const filePath = path.join(`${hostRootDir}${route}`, req.path);

      if (!fs.existsSync(filePath)) {
        return res.status(404).end();
      }

      const stat = fs.statSync(filePath);
      const fileSize = stat.size;

      const ranges = rangeHeader.replace(/bytes=/, '').split(',');
      const boundary = 'ELECTRON_UPDATER_BOUNDARY';

      res.status(206);
      res.setHeader('Content-Type', `multipart/byteranges; boundary=${boundary}`);

      const sendRange = (r: string) => {
        return new Promise((resolve, reject) => {
          const [startStr, endStr] = r.split('-');
          const start = parseInt(startStr, 10);
          const end = endStr ? parseInt(endStr, 10) : fileSize - 1;

          let head = `\r\n--${boundary}\r\n`;
          head += `Content-Type: application/octet-stream\r\n`;
          head += `Content-Range: bytes ${start}-${end}/${fileSize}\r\n\r\n`;

          res.write(head);

          const fileStream = fs.createReadStream(filePath, { start, end });
          fileStream.pipe(res, { end: false });

          fileStream.on('end', () => resolve(1));
          fileStream.on('error', err => reject(err));
        });
      };

      try {
        for (const r of ranges) {
          await sendRange(r);
        }
        res.write(`\r\n--${boundary}--\r\n`);
        res.end();
      } catch (err) {
        console.error('Ошибка отправки блоков:', err);
        if (!res.writableEnded) {
          res.status(500).end();
        }
      }
    });

    app.use(route, express.static(`${hostRootDir}${route}`));
  };

  makeDownRoute('/down');
  makeDownRoute('/down1');

  pullFilesExpressRoute(app);
  pushFilesExpressRoute(app);

  app.get(pullCmAudiosExpressRoutePath, async (req, res) => {
    if (
      !checkIsString(req.query[pullFilesExpressSecretQueryName]) ||
      md5(req.query[pullFilesExpressSecretQueryName]) !== secret.md5ecret
    ) {
      res.status(401).send('Secret Error');
      return;
    }

    try {
      const coms = await db.select({ al: comDB.al, n: comDB.n }).from(comDB);
      const audios: Record<HttpNumLeadLink, string> = {};

      for (const { al, n } of coms) {
        for (const audioValue of al ?? []) {
          // `com.al` хранит хвосты md5; исходная numLead-ссылка берётся из словаря. Устаревшие numLead-значения проходят как есть.
          const link =
            // @deprecated md5-migration Убрать первую ветку, когда в al не останется numLead-значений.
            parseHttpNumLeadLink(audioValue) ?? parseHttpNumLeadLink(await takeNumLeadLinkByAudioTail(audioValue));

          if (!link) {
            console.warn(`Пропущено аудио "${audioValue}" песни "${n}": ссылка не найдена в словаре`);
            continue;
          }

          audios[link] = n;
        }
      }

      res.json(audios);
    } catch (error) {
      console.error(error);
      res.status(500).send('ERROR');
    }
  });

  const isRequestFromSearchBot = (req: Request) => {
    const ua = (req.get('User-Agent') || '').toLowerCase();
    return isSearchBotReg.test(ua);
  };

  const makeOgMeta = (ogProperty: string, content: string) =>
    `<meta property="og:${ogProperty}" content="${content.replace(makeRegExp('/"/g'), "'")}" />`;

  const cmDescription = 'Приложение для вашего служения';
  const audioPathPrefix = '/audio/';
  const trackPathPrefix = '/track/';

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
    ${makeOgMeta('image', `${hostConfig.url}/android-chrome-512x512.png`)}
    ${makeOgMeta('image:width', '512')}
    ${makeOgMeta('image:height', '512')}
    ${makeOgMeta('url', hostConfig.url)}
    ${makeOgMeta('type', 'website')}
    ${
      ogAudio
        ? `
          ${makeOgMeta('audio', ogAudio.url)}
          ${makeOgMeta('audio:title', ogAudio.title)}
          ${makeOgMeta('audio:type', 'audio/mpeg')}`
        : ''
    }
  </head>
  <body>${bodyContent}</body>
</html>`;
  };

  app.get(/^\/track\//, async (req: Request, res: Response) => {
    const requestedValue = takeAudioTailFromRequestPath(req.url.slice(trackPathPrefix.length));

    // Проксируются только треки из словаря или устаревшие numLead-ссылки; сырой http(s) отсекается как открытый прокси.
    const upstreamUrl = await takeCmComHttpLinkFromAudioRequest(requestedValue);
    if (!upstreamUrl) {
      res.sendStatus(404);
      return;
    }

    if (isRequestFromSearchBot(req)) {
      res
        .status(200)
        .contentType('text/html')
        .send(
          makePage({ ogDescription: 'Звуковая дорожка', ogAudio: { title: 'Звуковая дорожка', url: upstreamUrl } }),
        );
      return;
    }

    res.setHeader('Access-Control-Allow-Origin', '*');

    try {
      const upstream = await fetch(upstreamUrl);

      if (!upstream.body) {
        res.status(502).end();
        return;
      }

      res.status(upstream.status);
      res.setHeader('Content-Type', upstream.headers.get('content-type') || 'audio/mpeg');

      // With content-encoding present undici already decoded the body, so upstream content-length is wrong.
      const contentLength = upstream.headers.get('content-length');
      if (contentLength && !upstream.headers.get('content-encoding')) res.setHeader('Content-Length', contentLength);

      req.on('close', () => upstream.body?.cancel().catch(emptyFunc));
      pipeline(Readable.fromWeb(upstream.body as never), res, emptyFunc);
    } catch (error) {
      console.error('Track proxy error:', error);
      if (!res.headersSent) res.status(502).end();
    }
  });

  app.get(/^[^?#]+\.(js|png|json|mp3)($|[?#])/, async (req: Request, res: Response) => {
    if (req.params[0] === 'mp3') {
      try {
        let externalUrl = req.url;
        let ogDescription = 'Звуковая дорожка';

        if (req.url.startsWith(audioPathPrefix)) {
          const [comwStr, num] = req.url.slice(audioPathPrefix.length).split(makeRegExp('/\\.mp3|_/')) as [
            `${CmComWid}`,
            `${number}`,
          ];
          const com = await takeComwTiny({ w: extractNumber(comwStr) }, false);

          if (!com?.al?.length) {
            res.sendStatus(404);
            return;
          }

          const audioValue = [com.al].flat()[+num || 0];
          const externalLink = await takeCmComHttpLinkFromAudioRequest(audioValue);

          if (!externalLink) {
            res.sendStatus(404);
            return;
          }

          externalUrl = externalLink;
          ogDescription = `${com.i + 1}. ${com.n}\n`;

          // @deprecated md5-migration Удалить блок ленивой миграции, когда в БД не останется numLead-значений.
          const knownKey = await takeKnownCmAudioKeyFromLink(audioValue);
          if (knownKey && knownKey !== audioValue) {
            void migrateLegacyCmAudioValue(com.w, +num || 0, com.al, knownKey).catch(error =>
              console.error('Audio al migration error:', error),
            );
          }

          const cats = catsFileStorage.getValue();

          cats.forEach(cat => {
            if (cat.d?.[com.w]) ogDescription += `\n${cat.n} ${cat.d[com.w]}`;
            if (cat.s?.includes(com.w)) ogDescription += `\n${cat.n}`;
          });
        }

        if (isRequestFromSearchBot(req)) {
          const customPage = makePage({
            ogDescription,
            ogAudio: { title: ogDescription, url: externalUrl },
          });
          return res.status(200).contentType('text/html').send(customPage);
        }

        res.setHeader('Referrer-Policy', 'no-referrer');
        res.redirect(302, externalUrl);
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

    res.sendFile(`${hostRootDir}${req.url}`, (err: Error) => {
      if (err && !res.headersSent) {
        res.status(404).send('File not found');
      }
    });
  });

  app.get(`/${vitePWAOptions.manifestFilename}`, (_req, res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Content-Type', 'application/manifest+json');

    res.sendFile(path.join(__dirname, 'build', vitePWAOptions.manifestFilename), (err: Error) => {
      if (err && !res.headersSent) {
        res.status(404).send('File not found');
      }
    });
  });

  app.use(async (req: Request, res: Response) => {
    if (isRequestFromSearchBot(req)) {
      let descriptionFromSearchParams = '';

      try {
        const schwMatch = req.url.match(makeRegExp('/\\bschw=(\\d+(?:\\.\\d+)?)/'));

        if (schwMatch && +schwMatch[1]) {
          const schedule = await takeScheduleWidgetTiny({ w: +schwMatch[1] as ScheduleWidgetWid }, false);

          if (schedule) {
            descriptionFromSearchParams += `\n\nМероприятие "${schedule.title}${schedule.topic ? `: ${schedule.topic}` : ''}"`;
          }
        }
      } catch (_e) {
        //
      }

      try {
        const comwMatch = req.url.match(makeRegExp('/\\bcomw=(\\d+(?:\\.\\d+)?)/'));
        if (comwMatch && +comwMatch[1]) {
          const com = await takeComwTiny({ w: +comwMatch[1] as CmComWid }, false);

          if (com) {
            descriptionFromSearchParams += `\n\n${com.i + 1}. ${com.n}`;
            const cats = catsFileStorage.getValue();
            let categories = '';

            cats.forEach(cat => {
              if (cat.d?.[com.w]) categories += `\n${cat.n} ${cat.d[com.w]}`;
            });

            if (categories) descriptionFromSearchParams += `\n${categories}`;
            if (com.al) descriptionFromSearchParams += `\n\n${hostConfig.url}${audioPathPrefix}${com.w}.mp3`;
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

    res.sendFile(path.resolve(`${hostRootDir}/index.html`), (err: Error) => {
      if (err && !res.headersSent) {
        res.status(404).send('File not found');
      }
    });
  });

  const { subHost } = lazyEnvJson();

  const readCert = (fileName: string, host = hostConfig.host) => {
    try {
      return fs.readFileSync(makeCertBotFilePath(fileName, host), 'utf8');
    } catch (_e) {
      //
    }
  };

  const key = readCert('privkey');
  const cert = readCert('fullchain');

  if (key && cert) {
    const baseContext = createSecureContext({ key, cert });
    const subKey = subHost ? readCert('privkey', subHost) : undefined;
    const subCert = subHost ? readCert('fullchain', subHost) : undefined;

    const sniContexts = new Map<string, SecureContext>([[hostConfig.host.toLowerCase(), baseContext]]);

    if (subHost && subKey && subCert)
      sniContexts.set(subHost.toLowerCase(), createSecureContext({ key: subKey, cert: subCert }));

    http
      .createServer((req, res) => {
        res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
        res.end();
      })
      .listen(80, '0.0.0.0', () => tglogger.log('HTTP редирект запущен на порту 80'));

    https
      .createServer(
        {
          key,
          cert,
          SNICallback: (servername, callback) => {
            callback(null, sniContexts.get(servername?.toLowerCase() ?? '') ?? baseContext);
          },
        },
        app,
      )
      .on('upgrade', (request, socket, head) => {
        const pathname = request.url ? new URL(request.url, 'http://localhost').pathname : '';
        if (pathname === '/websocket/' || pathname === '/websocket') {
          wsServer.handleUpgrade(request, socket, head, ws => {
            wsServer.emit('connection', ws, request);
          });
        } else {
          socket.destroy();
        }
      })
      .listen(443, '0.0.0.0', () => tglogger.log('HTTPS запущен на порту 443'));
  } else {
    const port = process.env.PORT || 4446;

    http
      .createServer(app)
      .on('upgrade', (request, socket, head) => {
        wsServer.handleUpgrade(request, socket, head, ws => {
          wsServer.emit('connection', ws, request);
        });
      })
      .listen(+port, '0.0.0.0', () => console.info(`WS запущен локально`));
  }

  process.on('uncaughtException', err => {
    console.error('Критическая ошибка:', err);
    tglogger.systemError([err.message, err.cause, err.stack].filter(itIt).join('\n\n\n'));
  });

  process.on('unhandledRejection', reason => {
    console.error('Необработанный промис:', reason);
    tglogger.systemError(`${reason}`);
  });
};
