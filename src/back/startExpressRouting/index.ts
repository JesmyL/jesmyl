import { takeScheduleWidgetTiny } from 'back/apps/index/schedules/schedule.tiny';
import { translateBackTexts } from 'back/locales/back';
import { makeCertBotFilePath } from 'back/utils';
import express, { Request, Response } from 'express';
import { eq } from 'drizzle-orm';
import fs from 'fs';
import http from 'http';
import https from 'https';
import md5 from 'md5';
import net from 'net';
import path from 'path';
import { type Duplex, Readable, pipeline } from 'node:stream';
import { makeRegExp } from 'regexpert';
import { CmComWid, HttpLink, HttpNumLeadLink, Langi, ScheduleWidgetWid, hostConfig } from 'shared/api';
import { pullCmAudiosExpressRoutePath, pullFilesExpressSecretQueryName } from 'shared/api/pullFiles.utils';
import { Bool } from 'shared/enums';
import { BackLocaleKey } from 'shared/model/+locale/_BackLocaleKey';
import { emptyFunc, extractNumber, itIt } from 'shared/utils';
import { checkIsString } from 'shared/utils/checkIs';
import { createSecureContext, type SecureContext } from 'tls';
import { WebSocketServer } from 'ws';
import { vitePWAOptions } from '../../../vite-pwa.options';
import * as secret from '../../../do/secret.md5.json';
import { takeComwTiny } from '../apps/cm/com.tiny';
import { takeAudioHttpLink, takeAudioLinkByTail, takeAudioTailFromRequestPath } from '../audio/md5LinkRedirectDict';
import { backConfig } from '../config/backConfig';
import { db } from '../drizzle/drizzle.db';
import { catDB, comDB } from '../drizzle.schema';
import { hostRootDir, lazyEnvJson } from '../envJson';
import { pullFilesExpressRoute } from './pullFiles';
import { pushFilesExpressRoute } from './pushFiles';

export const startExpressRouting = async (wsServer: WebSocketServer) => {
  const app = express();

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
  app.use('/resource', express.static(`${hostRootDir}/resource`));
  // Отсутствующий ресурс не должен проваливаться в SPA-fallback: SW закеширует ответ 200 с index.html.
  app.use('/resource', (_req, res) => res.sendStatus(404));

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
      const audios: Record<HttpLink | HttpNumLeadLink, string> = {};

      for (const { al, n } of coms) {
        for (const audioValue of al ?? []) {
          // `com.al` хранит хвосты md5; исходная ссылка берётся из таблицы аудио-ссылок.
          const link = await takeAudioLinkByTail(audioValue);

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

  const langiByLangCode: Record<string, Langi> = {
    ru: Langi.Ru,
    ua: Langi.Ua,
    uk: Langi.Ua,
    kz: Langi.Kz,
    kk: Langi.Kz,
    en: Langi.En,
  };

  const takeRequestLangi = (req: Request): Langi | nil => {
    const acceptLanguage = req.get('accept-language');
    if (!acceptLanguage) return null;

    const langCode = acceptLanguage.split(',', 1)[0].split(makeRegExp('/[-_]/'), 1)[0].toLowerCase();

    return langiByLangCode[langCode];
  };

  const makeOgMeta = (ogProperty: string, content: string) =>
    `<meta property="og:${ogProperty}" content="${content.replace(makeRegExp('/"/g'), "'")}" />`;

  const audioPathPrefix = '/audio/';
  const trackPathPrefix = '/track/';

  const makePage = ({
    bodyContent = '',
    title = 'JesmyL',
    langi,
    ogDescription,
    ogAudio,
  }: {
    bodyContent?: string;
    title?: string;
    langi: Langi | nil;
    ogDescription?: string;
    ogAudio?: {
      url: string;
      title: string;
    };
  }) => {
    const description = ogDescription || translateBackTexts(langi, BackLocaleKey.OgAppDescription);

    return `<!DOCTYPE html>
<html>
  <head>
    <title>${title}</title>

    <meta name="description" content="${description}" />
    <meta charset="UTF-8" />

    ${makeOgMeta('title', title)}
    ${makeOgMeta('description', description)}
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
    const langi = takeRequestLangi(req);
    const requestedValue = takeAudioTailFromRequestPath(req.url.slice(trackPathPrefix.length));

    // Проксируется трек из таблицы аудио-ссылок либо сырая http(s)-ссылка; прочие протоколы отсекаются.
    const upstreamUrl = await takeAudioHttpLink(requestedValue);
    if (!upstreamUrl) {
      res.sendStatus(404);
      return;
    }

    if (isRequestFromSearchBot(req)) {
      res
        .status(200)
        .contentType('text/html')
        .send(
          makePage({
            langi,
            ogDescription: translateBackTexts(langi, BackLocaleKey.OgAudioTrack),
            ogAudio: { title: translateBackTexts(langi, BackLocaleKey.OgAudioTrack), url: upstreamUrl },
          }),
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
    const langi = takeRequestLangi(req);

    if (req.params[0] === 'mp3') {
      try {
        let externalUrl = req.url;
        let ogDescription = translateBackTexts(langi, BackLocaleKey.OgAudioTrack);

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
          const externalLink = await takeAudioHttpLink(audioValue);

          if (!externalLink) {
            res.sendStatus(404);
            return;
          }

          externalUrl = externalLink;
          ogDescription = `${com.i + 1}. ${com.n}\n`;

          const cats = await db.select().from(catDB).where(eq(catDB.isRemoved, Bool.False));

          cats.forEach(cat => {
            if (cat.d?.[com.w]) ogDescription += `\n${cat.n} ${cat.d[com.w]}`;
            if (cat.s?.includes(com.w)) ogDescription += `\n${cat.n}`;
          });
        }

        if (isRequestFromSearchBot(req)) {
          const customPage = makePage({
            langi,
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
      const langi = takeRequestLangi(req);
      let descriptionFromSearchParams = '';

      try {
        const schwMatch = req.url.match(makeRegExp('/\\bschw=(\\d+(?:\\.\\d+)?)/'));

        if (schwMatch && +schwMatch[1]) {
          const schedule = await takeScheduleWidgetTiny({ w: +schwMatch[1] as ScheduleWidgetWid }, false);

          if (schedule) {
            descriptionFromSearchParams += `\n\n${translateBackTexts(langi, BackLocaleKey.OgSchedule, {
              t: `${schedule.title}${schedule.topic ? `: ${schedule.topic}` : ''}`,
            })}`;
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
            const cats = await db.select().from(catDB).where(eq(catDB.isRemoved, Bool.False));
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
        .send(makePage({ langi, ogDescription: descriptionFromSearchParams.trim() }));

      return;
    }

    res.sendFile(path.resolve(`${hostRootDir}/index.html`), (err: Error) => {
      if (err && !res.headersSent) {
        res.status(404).send('File not found');
      }
    });
  });

  const { subHost } = lazyEnvJson();
  const port = +(process.env.PORT || 4446);
  const httpsPort = backConfig.isTest ? port : 443;

  /** Локальный самоподписанный серт (localhost + LAN-IP): `openssl req -x509 -nodes -newkey rsa:2048 -days 3650 -keyout privkey.pem -out fullchain.pem -subj /CN=localhost -addext subjectAltName=DNS:localhost,IP:192.168.1.59` */
  const devCertDir = `${hostRootDir}/dev-certs`;

  const readCert = (fileName: string, host = hostConfig.host) => {
    try {
      return fs.readFileSync(
        backConfig.isTest ? `${devCertDir}/${fileName}.pem` : makeCertBotFilePath(fileName, host),
        'utf8',
      );
    } catch (_e) {
      //
    }
  };

  const key = readCert('privkey');
  const cert = readCert('fullchain');

  const upgradeHandler = (request: http.IncomingMessage, socket: Duplex, head: Buffer) => {
    const pathname = request.url ? new URL(request.url, 'http://localhost').pathname : '';
    if (backConfig.isTest || pathname === '/websocket/' || pathname === '/websocket') {
      wsServer.handleUpgrade(request, socket, head, ws => {
        wsServer.emit('connection', ws, request);
      });
    } else {
      socket.destroy();
    }
  };

  if (key && cert) {
    const baseContext = createSecureContext({ key, cert });
    const subKey = subHost ? readCert('privkey', subHost) : undefined;
    const subCert = subHost ? readCert('fullchain', subHost) : undefined;

    const sniContexts = new Map<string, SecureContext>([[hostConfig.host.toLowerCase(), baseContext]]);

    if (subHost && subKey && subCert)
      sniContexts.set(subHost.toLowerCase(), createSecureContext({ key: subKey, cert: subCert }));

    // В продакшене поднимаем отдельный HTTP-сервер, который только перенаправляет все запросы на HTTPS.
    if (!backConfig.isTest)
      http
        .createServer((req, res) => {
          res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
          res.end();
        })
        .listen(80, '0.0.0.0', () => console.info('HTTP редирект запущен на порту 80'));

    const httpsServer = https
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
      .on('upgrade', upgradeHandler);

    // В продакшене HTTPS слушает собственный порт и сообщает о запуске в консоль.
    if (!backConfig.isTest)
      httpsServer.listen(httpsPort, '0.0.0.0', () => console.info(`HTTPS запущен на порту ${httpsPort}`));
    else {
      // Тест: общий порт для http и https. Первый байт 0x16 — TLS ClientHello, иначе обычный HTTP.
      const httpServer = http.createServer(app).on('upgrade', upgradeHandler);

      // Слушаем один порт и по первому байту решаем, отдать сокет HTTPS- или HTTP-серверу.
      net
        .createServer(socket => {
          socket.on('error', emptyFunc);
          socket.once('data', chunk => {
            const isTls = chunk[0] === 0x16;

            // TLS-сокет приостанавливают, иначе возвращённый байт теряется до обёртки TLSSocket.
            if (isTls) socket.pause();

            socket.unshift(chunk);
            (isTls ? httpsServer : httpServer).emit('connection', socket);
          });
        })
        .listen(port, '0.0.0.0', () => console.info(`HTTP+HTTPS запущен на порту ${port}`));
    }
  } else {
    // Без сертификатов поднимаем обычный HTTP/WS-сервер на локальном порту.
    http
      .createServer(app)
      .on('upgrade', upgradeHandler)
      .listen(port, '0.0.0.0', () => console.info(`WS запущен локально`));
  }

  // Непойманное исключение пишем в консоль: сначала краткая ошибка, затем сообщение, причина и стек.
  process.on('uncaughtException', err => {
    console.error('Критическая ошибка:', err);
    console.error([err?.message ?? err, err?.cause, err?.stack].filter(itIt).join('\n\n\n'));
  });

  // Необработанный промис логируем и не роняем процесс.
  process.on('unhandledRejection', reason => {
    console.error('Необработанный промис:', reason);
    console.error(`${reason}`);
  });
};
