import { app } from 'electron';
import crypto from 'crypto';
import fs from 'fs';
import http from 'http';
import https from 'https';
import os from 'os';
import path from 'path';
import { WebSocketServer } from 'ws';
import type { WebSocket, RawData } from 'ws';
import {
  ElectronRemoteBroadcastInfo,
  RemoteBroadcastClientMessage,
  RemoteBroadcastCommand,
  RemoteBroadcastCommandKind,
  RemoteBroadcastErrorKind,
  RemoteBroadcastMessageKind,
  RemoteBroadcastPendingDevice,
  RemoteBroadcastServerMessage,
  RemoteBroadcastSnapshot,
  RemoteBroadcastSnapshotDelta,
  RemoteBroadcastUserIdentity,
  emptyRemoteBroadcastCmLists,
} from '../../../shared/api/tsjrpc.electtron/remote-broadcast';
import { remoteAuthCheckRoutePath } from '../../../shared/api/remote-controls';
import { Langi } from '../../../shared/api';
import { hostConfig } from '../../../shared/api/complect/hostConfig';
import {
  makeRemoteBroadcastCertHost,
  remoteBroadcastDefaultPort,
  remoteBroadcastPath,
  remoteBroadcastSecretCodeLength,
} from '../../../shared/const/electron';
import { jversion } from '../../../shared/values';
import { electronRemoteBroadcastTsjrpcAppServerMethods } from '../tsjrpc/methods/remote-broadcast.server.methods';
import { clearControlsCache, clearControlsRelay, forgetControlsClient, handlePultControlsRequest } from './controls';
import { clearLocaleRelay, forgetLocaleClient, handlePultLocaleRequest } from './locales';
import { signRemoteBroadcastJwt, verifyRemoteBroadcastJwt } from './jwt';
import { parseRemoteBroadcastClientMessage } from './protocol';

type RemoteBroadcastConfig = {
  port: number;
  secret: string;
  certHost: string | nil;
  deviceNames: Record<string, string>;
  approvedDeviceIds: string[];
  bannedDevices: RemoteBroadcastPendingDevice[];
};

const configFileName = 'remote-broadcast.json';
const maxClientMessageBytes = 64 * 1024;
const defaultCertDir = '/etc/letsencrypt/live';
const secretLength = 64;
const makeConnectSecretCode = () => crypto.randomBytes(remoteBroadcastSecretCodeLength / 2).toString('hex');

let config: RemoteBroadcastConfig | nil = null;
let httpServer: http.Server | https.Server | nil = null;
let isTlsActive = false;
let wsServer: WebSocketServer | nil = null;
let lastError = RemoteBroadcastErrorKind.None;
let isStarting = false;
let connectSecretCode = makeConnectSecretCode();
let consumedConnectSecretCode: string | nil = null;
let connectSecretCodeDeviceId: string | nil = null;

type RemoteBroadcastHelloMessage = Extract<
  RemoteBroadcastClientMessage,
  { k: RemoteBroadcastMessageKind.Hello }
>;

type RemoteBroadcastClientDevice = { deviceId: string; since: number; name?: string } & Partial<RemoteBroadcastUserIdentity>;

const pickUserIdentityFields = ({
  login,
  fio,
  nick,
  email,
}: Partial<RemoteBroadcastUserIdentity>): RemoteBroadcastUserIdentity => ({
  ...(login == null ? {} : { login }),
  ...(fio == null ? {} : { fio }),
  ...(nick == null ? {} : { nick }),
  ...(email == null ? {} : { email }),
});

const clients = new Set<WebSocket>();
const clientDevices = new Map<WebSocket, RemoteBroadcastClientDevice>();
type RemoteBroadcastPendingHello = {
  message: RemoteBroadcastHelloMessage;
  identity: RemoteBroadcastUserIdentity | nil;
  isVerifiedIdentity: boolean;
};

const pendingHellos = new Map<WebSocket, RemoteBroadcastPendingHello>();
const pendingNameHellos = new Map<WebSocket, RemoteBroadcastHelloMessage>();
const deviceNames = new Map<string, string>();
const authorizedDeviceIdentities = new Map<string, RemoteBroadcastUserIdentity>();
const bannedDevices = new Map<string, RemoteBroadcastPendingDevice>();
const approvedDeviceIds = new Set<string>();

let lastFullSnapshot: RemoteBroadcastSnapshot | nil = null;

const mimeByExtension: Record<string, string> = {
  html: 'text/html; charset=utf-8',
  js: 'text/javascript; charset=utf-8',
  css: 'text/css; charset=utf-8',
  json: 'application/json; charset=utf-8',
  webmanifest: 'application/manifest+json; charset=utf-8',
  svg: 'image/svg+xml',
  png: 'image/png',
  ico: 'image/x-icon',
  txt: 'text/plain; charset=utf-8',
  wasm: 'application/wasm',
  woff: 'font/woff',
  woff2: 'font/woff2',
  map: 'application/json; charset=utf-8',
};

const takeConfigFilePath = () => path.join(app.getPath('userData'), configFileName);

const makeConfigSecret = () => crypto.randomBytes(secretLength / 2).toString('hex');

const isConfigSecret = (secret: unknown): secret is string =>
  typeof secret === 'string' && secret.length >= secretLength / 2;

const writeConfig = (value: RemoteBroadcastConfig) => {
  try {
    const filePath = takeConfigFilePath();
    const tempPath = `${filePath}.tmp`;

    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(tempPath, JSON.stringify(value), 'utf-8');
    fs.renameSync(tempPath, filePath);
  } catch (error) {
    console.error('[remoteBroadcast.config]', error);
  }
};

const saveConfig = () => {
  if (config == null) return;

  config = {
    ...config,
    deviceNames: Object.fromEntries(deviceNames),
    approvedDeviceIds: Array.from(approvedDeviceIds),
    bannedDevices: Array.from(bannedDevices.values()),
  };
  writeConfig(config);
};

const saveAccessLists = () => {
  if (config == null) return;

  config = {
    ...config,
    approvedDeviceIds: Array.from(approvedDeviceIds),
    bannedDevices: Array.from(bannedDevices.values()),
  };
  writeConfig(config);
};

const parsePersistedBannedDevice = (entry: unknown): RemoteBroadcastPendingDevice | nil => {
  if (typeof entry === 'string') return entry ? { deviceId: entry } : null;
  if (typeof entry !== 'object' || entry === null) return null;

  const { deviceId, name, fio, nick, email, login } = entry as Record<string, unknown>;
  if (typeof deviceId !== 'string' || !deviceId) return null;

  return {
    deviceId,
    ...(typeof name === 'string' ? { name } : {}),
    ...(typeof fio === 'string' ? { fio } : {}),
    ...(typeof nick === 'string' ? { nick } : {}),
    ...(typeof email === 'string' ? { email } : {}),
    ...(typeof login === 'string' ? { login } : {}),
  };
};

const parsePersistedBannedDevices = (value: unknown): RemoteBroadcastPendingDevice[] =>
  Array.isArray(value) ? value.map(parsePersistedBannedDevice).filter(device => device != null) : [];

const applyPersistedRemoteBroadcastState = (value: RemoteBroadcastConfig) => {
  deviceNames.clear();
  for (const [deviceId, name] of Object.entries(value.deviceNames)) deviceNames.set(deviceId, name);
  approvedDeviceIds.clear();
  for (const deviceId of value.approvedDeviceIds) approvedDeviceIds.add(deviceId);
  bannedDevices.clear();
  for (const device of value.bannedDevices) bannedDevices.set(device.deviceId, device);
};

const takeConfig = (): RemoteBroadcastConfig => {
  if (config) return config;

  const configFilePath = takeConfigFilePath();

  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(configFilePath, 'utf-8'));

    if (typeof parsed === 'object' && parsed !== null) {
      const candidate = parsed as {
        token?: unknown;
        port?: unknown;
        secret?: unknown;
        certHost?: unknown;
        deviceNames?: unknown;
        approvedDeviceIds?: unknown;
        bannedDevices?: unknown;
      };
      const port = candidate.port;

      if (typeof port === 'number' && Number.isInteger(port) && port > 0 && port < 65536) {
        const secret = isConfigSecret(candidate.secret) ? candidate.secret : makeConfigSecret();
        const hasLegacyToken = 'token' in candidate;
        const certHost = makeRemoteBroadcastCertHost(candidate.certHost);

        const deviceNamesConfig: Record<string, string> = {};

        if (typeof candidate.deviceNames === 'object' && candidate.deviceNames !== null) {
          for (const [deviceId, name] of Object.entries(candidate.deviceNames)) {
            if (typeof name !== 'string' || name.length === 0) continue;

            deviceNamesConfig[deviceId] = name;
          }
        }

        const approvedDeviceIdsConfig = Array.isArray(candidate.approvedDeviceIds)
          ? candidate.approvedDeviceIds.filter(
              (deviceId): deviceId is string => typeof deviceId === 'string' && deviceId.length > 0,
            )
          : [];

        config = {
          port,
          secret,
          certHost,
          deviceNames: deviceNamesConfig,
          approvedDeviceIds: approvedDeviceIdsConfig,
          bannedDevices: parsePersistedBannedDevices(candidate.bannedDevices),
        };
        applyPersistedRemoteBroadcastState(config);

        if (
          secret !== candidate.secret ||
          hasLegacyToken ||
          certHost !== candidate.certHost ||
          candidate.deviceNames === undefined ||
          candidate.approvedDeviceIds === undefined ||
          candidate.bannedDevices === undefined
        )
          writeConfig(config);

        return config;
      }
    }
  } catch (error) {
    if (fs.existsSync(configFilePath)) console.error('[remoteBroadcast.config]', error);
  }

  config = {
    port: remoteBroadcastDefaultPort,
    secret: makeConfigSecret(),
    certHost: null,
    deviceNames: {},
    approvedDeviceIds: [],
    bannedDevices: [],
  };
  writeConfig(config);

  return config;
};

const jesmylAuthCheckUrl = process.env.JESMYL_AUTH_CHECK_URL ?? `${hostConfig.url}${remoteAuthCheckRoutePath}`;
const jesmylAuthCheckTimeoutMs = 5_000;
const jesmylAuthCheckCacheTtlMs = 5 * 60_000;
const jesmylAuthCheckRetryDelaysMs = [600, 1_800];
const jesmylAuthCheckUnavailableBackoffMs = 60_000;
let jesmylAuthCheckUnavailableUntil = 0;
const jesmylAuthCheckFailureLogIntervalMs = 5 * 60_000;
let lastJesmylAuthCheckFailureLogAt = 0;

type JesmylAuthCheckDecision =
  | {
      kind: 'verified';
      user: RemoteBroadcastUserIdentity;
    }
  | { kind: 'rejected' };

type JesmylAuthCheckOutcome = JesmylAuthCheckDecision | { kind: 'unavailable' };

const jesmylAuthCheckCache = new Map<string, { outcome: JesmylAuthCheckDecision; until: number }>();

const makeJesmylAuthCheckCacheKey = (token: string, deviceId: string) =>
  `${deviceId}:${crypto.createHash('sha256').update(token).digest('hex')}`;

const parseJesmylAuthCheckResponse = (
  value: unknown,
): { user: RemoteBroadcastUserIdentity } | 'rejected' | nil => {
  if (typeof value !== 'object' || value === null) return null;

  const record = value as Record<string, unknown>;
  if (record.ok === false) return 'rejected';
  if (record.ok !== true) return null;

  const user = record.user;
  if (typeof user !== 'object' || user === null) return null;

  const candidate = user as Record<string, unknown>;
  if (typeof candidate.login !== 'string' || candidate.login.length === 0) return null;

  return {
    user: {
      login: candidate.login,
      ...(typeof candidate.fio === 'string' ? { fio: candidate.fio } : {}),
      ...(typeof candidate.nick === 'string' ? { nick: candidate.nick } : {}),
      ...(typeof candidate.email === 'string' ? { email: candidate.email } : {}),
    },
  };
};

const logJesmylAuthCheckFailure = (reason: string) => {
  const now = Date.now();
  if (now - lastJesmylAuthCheckFailureLogAt < jesmylAuthCheckFailureLogIntervalMs) return;

  lastJesmylAuthCheckFailureLogAt = now;
  console.warn('[remoteBroadcast.authCheck] unavailable:', reason);
};

const takeJesmylAuthCheckJsonBody = async (response: Response): Promise<unknown> => {
  const contentType = (response.headers.get('content-type') ?? '').toLowerCase();
  if (!contentType.includes('application/json')) {
    logJesmylAuthCheckFailure(`response is not JSON (${contentType || 'no content-type'})`);
    return null;
  }

  try {
    return JSON.parse(await response.text());
  } catch {
    logJesmylAuthCheckFailure('response body is not valid JSON');
    return null;
  }
};

const verifyJesmylToken = async (
  token: string,
  deviceId: string,
  { isIgnoreUnavailableBackoff = false }: { isIgnoreUnavailableBackoff?: boolean } = {},
): Promise<JesmylAuthCheckOutcome> => {
  const cacheKey = makeJesmylAuthCheckCacheKey(token, deviceId);
  const cached = jesmylAuthCheckCache.get(cacheKey);
  if (cached != null && cached.until > Date.now()) return cached.outcome;

  if (!isIgnoreUnavailableBackoff && Date.now() < jesmylAuthCheckUnavailableUntil) return { kind: 'unavailable' };

  let outcome: JesmylAuthCheckOutcome = { kind: 'unavailable' };

  try {
    const response = await fetch(jesmylAuthCheckUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
      signal: AbortSignal.timeout(jesmylAuthCheckTimeoutMs),
    });

    if (response.ok) {
      const body = await takeJesmylAuthCheckJsonBody(response);

      if (body != null) {
        const parsed = parseJesmylAuthCheckResponse(body);

        if (parsed === 'rejected') outcome = { kind: 'rejected' };
        else if (parsed != null) outcome = { kind: 'verified', user: parsed.user };
      }
    } else {
      logJesmylAuthCheckFailure(`HTTP ${response.status}`);
    }
  } catch (error) {
    logJesmylAuthCheckFailure(error instanceof Error ? error.name : 'network error');
  }

  if (outcome.kind === 'unavailable') {
    jesmylAuthCheckUnavailableUntil = Date.now() + jesmylAuthCheckUnavailableBackoffMs;
  } else {
    jesmylAuthCheckUnavailableUntil = 0;
    jesmylAuthCheckCache.set(cacheKey, { outcome, until: Date.now() + jesmylAuthCheckCacheTtlMs });
  }

  return outcome;
};

const verifyJesmylTokenWithRetry = async (
  token: string,
  deviceId: string,
  ws: WebSocket,
  { isIgnoreUnavailableBackoff = false }: { isIgnoreUnavailableBackoff?: boolean } = {},
): Promise<JesmylAuthCheckOutcome> => {
  let outcome = await verifyJesmylToken(token, deviceId, { isIgnoreUnavailableBackoff });

  for (const delay of jesmylAuthCheckRetryDelaysMs) {
    if (outcome.kind !== 'unavailable' || ws.readyState !== ws.OPEN) break;

    await new Promise(resolve => setTimeout(resolve, delay));

    if (ws.readyState !== ws.OPEN) break;

    outcome = await verifyJesmylToken(token, deviceId, { isIgnoreUnavailableBackoff });
  }

  return outcome;
};

const takeLanIp = (): string | nil => {
  for (const interfaces of Object.values(os.networkInterfaces())) {
    for (const entry of interfaces ?? []) {
      const isIpv4 = entry.family === 'IPv4' || String(entry.family) === '4';
      if (isIpv4 && !entry.internal) return entry.address;
    }
  }

  return null;
};

const takeCertDir = () => process.env.JESMYL_REMOTE_CERT_DIR ?? defaultCertDir;

const readCert = (fileName: string, host: string): string | nil => {
  try {
    return fs.readFileSync(path.join(takeCertDir(), host, `${fileName}.pem`), 'utf8');
  } catch {
    return null;
  }
};

const takeTlsCert = (certHost: string): { key: string; cert: string } | nil => {
  const key = readCert('privkey', certHost);
  const cert = readCert('fullchain', certHost);

  if (key == null && cert == null) return null;
  if (key == null || cert == null) throw `Сертификат ${certHost} найден не полностью: нужны privkey.pem и fullchain.pem`;

  return { key, cert };
};

const takeFrontBuildRoot = () => {
  const configured = process.env.JESMYL_REMOTE_FRONT_BUILD;
  if (configured) return path.resolve(configured);

  return app.isPackaged ? path.join(process.resourcesPath, 'front-build') : path.resolve(__dirname, '../../../build');
};

const checkIsBuildReady = (buildRoot = takeFrontBuildRoot()) => fs.existsSync(path.join(buildRoot, 'pult.html'));

const fallbackHtml = `<!doctype html>
<html lang="ru">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>JesmyL</title></head>
<body style="margin:0;padding:24px;font:16px/1.5 sans-serif;background:#111;color:#eee">
<b>Пульт доступен только в собранном приложении.</b>
<p>The remote control page is available only in the built desktop app.</p>
</body></html>`;

const writeHtml = (response: http.ServerResponse, html: string) => {
  response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' });
  response.end(html);
};

const writeNotFound = (response: http.ServerResponse) => {
  response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  response.end('Not found');
};

const resolveBuildFile = (pathname: string, buildRoot: string): string | nil => {
  try {
    const resolved = path.resolve(buildRoot, `.${decodeURIComponent(pathname)}`);
    return resolved === buildRoot || resolved.startsWith(buildRoot + path.sep) ? resolved : null;
  } catch {
    return null;
  }
};

const takeRequestHostname = (requestHost: string | nil): string | nil => {
  if (requestHost == null) return null;

  try {
    return new URL(`http://${requestHost}`).hostname;
  } catch {
    return null;
  }
};

const makeDevPultOrigin = (requestHost: string | nil) => {
  const scheme = process.env.JESMYL_DEV_IS_HTTPS === '0' ? 'http' : 'https';
  const hostname = takeRequestHostname(requestHost) ?? takeLanIp() ?? 'localhost';
  const host = hostname.includes(':') ? `[${hostname}]` : hostname;

  return `${scheme}://${host}:3627`;
};

const makeDevPultShellHtml = (origin: string) => `<!doctype html>
<html lang="en" translate="no">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, viewport-fit=cover" />
<style>
html,
body,
#root {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>
<script type="module">
  import RefreshRuntime from '${origin}/@react-refresh'
  RefreshRuntime.injectIntoGlobalHook(window)
  window.$RefreshReg$ = () => {}
  window.$RefreshSig$ = () => type => type
  window.__vite_plugin_react_preamble_installed__ = true
</script>
<script type="module" src="${origin}/src/front/pult.index.tsx"></script>
<title>JesmyL</title>
</head>
<body translate="no">
<noscript>You need to enable JavaScript to run this app.</noscript>
<div id="error-log-list"></div>
<div id="root"></div>
</body>
</html>`;

const serveFrontFile = (response: http.ServerResponse, pathname: string, requestHost: string | nil) => {
  const buildRoot = takeFrontBuildRoot();

  if (!checkIsBuildReady(buildRoot)) {
    if (app.isPackaged) return writeHtml(response, fallbackHtml);

    return writeHtml(response, makeDevPultShellHtml(makeDevPultOrigin(requestHost)));
  }

  const isAsset = pathname.startsWith('/assets/') || !!path.extname(pathname);
  const filePath = resolveBuildFile(isAsset ? pathname : '/pult.html', buildRoot);

  if (!filePath) return writeNotFound(response);

  fs.readFile(filePath, (error, data) => {
    if (error) return writeNotFound(response);

    response.writeHead(200, {
      'Content-Type': mimeByExtension[path.extname(filePath).slice(1).toLowerCase()] ?? 'application/octet-stream',
      'Cache-Control': pathname.startsWith('/assets/') ? 'public, max-age=31536000, immutable' : 'no-cache',
    });
    response.end(data);
  });
};

const broadcastMessage = (message: RemoteBroadcastServerMessage) => {
  const data = JSON.stringify(message);

  for (const client of clients) {
    if (client.readyState !== client.OPEN || !clientDevices.has(client)) continue;

    try {
      client.send(data);
    } catch {
      //
    }
  }
};

const notifyFrontInfo = () => {
  void electronRemoteBroadcastTsjrpcAppServerMethods
    .info({ info: takeSafeRemoteBroadcastInfo() }, { toWinNum: 0, winNum: 0 })
    .catch(() => {});
};

const checkConnectSecretCode = (secretCode: string, deviceId: string) => {
  if (secretCode === connectSecretCode) return true;

  return connectSecretCodeDeviceId === deviceId && secretCode === consumedConnectSecretCode;
};

const consumeConnectSecretCode = (deviceId: string, secretCode: string) => {
  if (secretCode === consumedConnectSecretCode) {
    connectSecretCodeDeviceId = deviceId;
    return;
  }

  consumedConnectSecretCode = connectSecretCode;
  connectSecretCode = makeConnectSecretCode();
  connectSecretCodeDeviceId = deviceId;
  clearControlsCache();
  notifyFrontInfo();
};

const forwardCommand = (command: RemoteBroadcastCommand) => {
  void electronRemoteBroadcastTsjrpcAppServerMethods
    .command({ command }, { toWinNum: 0, winNum: 0 })
    .catch(() => {});
};

const sendClientMessage = (ws: WebSocket, message: RemoteBroadcastServerMessage) => {
  try {
    ws.send(JSON.stringify(message));
  } catch {
    //
  }
};

const rejectClient = (ws: WebSocket, error: RemoteBroadcastErrorKind) => {
  sendClientMessage(ws, { k: RemoteBroadcastMessageKind.Error, e: error });

  try {
    ws.close();
  } catch {
    //
  }
};

const authorizeHello = (
  ws: WebSocket,
  message: RemoteBroadcastHelloMessage,
  identity?: Partial<RemoteBroadcastUserIdentity>,
  isVerifiedIdentity = false,
) => {
  const { deviceId } = message;
  const { secret } = takeConfig();
  const identityFields = identity == null ? {} : pickUserIdentityFields(identity);
  const name = message.name ?? null;

  if (message.token == null || !verifyRemoteBroadcastJwt(secret, message.token, deviceId))
    sendClientMessage(ws, { k: RemoteBroadcastMessageKind.Token, t: signRemoteBroadcastJwt(secret, deviceId) });

  if (isVerifiedIdentity && identity?.login != null) authorizedDeviceIdentities.set(deviceId, identityFields);

  sendClientMessage(ws, { k: RemoteBroadcastMessageKind.Version, v: jversion.num });

  const currentDevice = clientDevices.get(ws);

  if (currentDevice == null) {
    clientDevices.set(ws, {
      deviceId,
      since: Date.now(),
      ...identityFields,
      ...(name == null ? {} : { name }),
    });
    notifyFrontInfo();
  } else if (name != null && currentDevice.name !== name) {
    clientDevices.set(ws, { ...currentDevice, name });
    notifyFrontInfo();
  }

  pendingHellos.delete(ws);
  pendingNameHellos.delete(ws);

  if (lastFullSnapshot != null)
    sendClientMessage(ws, {
      k: RemoteBroadcastMessageKind.State,
      s: makeRemoteBroadcastFullSnapshotDelta(lastFullSnapshot),
    });

  forwardCommand(
    message.version == null
      ? { kind: RemoteBroadcastCommandKind.Hello }
      : { kind: RemoteBroadcastCommandKind.Hello, version: message.version },
  );
};

const attachVerifiedRemoteBroadcastIdentity = async (ws: WebSocket, message: RemoteBroadcastHelloMessage) => {
  if (message.jesmylToken == null) return;

  const outcome = await verifyJesmylToken(message.jesmylToken, message.deviceId);

  if (outcome.kind !== 'verified') return;

  const device = clientDevices.get(ws);
  if (ws.readyState !== ws.OPEN || device == null || device.deviceId !== message.deviceId) return;

  authorizedDeviceIdentities.set(message.deviceId, outcome.user);
  clientDevices.set(ws, { ...device, ...outcome.user });
  notifyFrontInfo();
};

const takeAuthorizedDeviceIdentity = (message: RemoteBroadcastHelloMessage): RemoteBroadcastUserIdentity | nil => {
  if (message.token == null) return null;

  const { secret } = takeConfig();
  if (!verifyRemoteBroadcastJwt(secret, message.token, message.deviceId)) return null;

  return authorizedDeviceIdentities.get(message.deviceId) ?? null;
};

const takePendingDevices = (): RemoteBroadcastPendingDevice[] => {
  const pendingByDeviceId = new Map<string, RemoteBroadcastPendingDevice>();

  for (const { message, identity } of pendingHellos.values()) {
    if (pendingByDeviceId.has(message.deviceId)) continue;

    pendingByDeviceId.set(message.deviceId, {
      deviceId: message.deviceId,
      ...(message.name == null ? {} : { name: message.name }),
      ...(identity?.login == null ? {} : { login: identity.login }),
      ...(identity?.fio == null ? {} : { fio: identity.fio }),
      ...(identity?.nick == null ? {} : { nick: identity.nick }),
      ...(identity?.email == null ? {} : { email: identity.email }),
    });
  }

  return Array.from(pendingByDeviceId.values());
};

const handleNamedHello = async (ws: WebSocket, message: RemoteBroadcastHelloMessage) => {
  const hasSecretCode = message.secretCode != null;

  if (message.secretCode != null) {
    if (!checkConnectSecretCode(message.secretCode, message.deviceId)) {
      rejectClient(ws, RemoteBroadcastErrorKind.InvalidSecretCode);
      return;
    }

    consumeConnectSecretCode(message.deviceId, message.secretCode);
  }

  if (hasSecretCode && !approvedDeviceIds.has(message.deviceId)) {
    approvedDeviceIds.add(message.deviceId);
    saveAccessLists();
  }

  const knownDevice = clientDevices.get(ws);
  if (knownDevice != null) {
    authorizeHello(ws, message, knownDevice, authorizedDeviceIdentities.has(message.deviceId));
    return;
  }

  const storedIdentity = takeAuthorizedDeviceIdentity(message);
  let verifiedIdentity: RemoteBroadcastUserIdentity | nil = null;

  if (
    storedIdentity == null &&
    message.secretCode == null &&
    !approvedDeviceIds.has(message.deviceId) &&
    message.jesmylToken != null
  ) {
    const outcome = await verifyJesmylTokenWithRetry(message.jesmylToken, message.deviceId, ws, {
      isIgnoreUnavailableBackoff: true,
    });

    if (ws.readyState !== ws.OPEN) return;

    if (outcome?.kind === 'verified') verifiedIdentity = outcome.user;
  }

  const authorizedIdentity = storedIdentity ?? verifiedIdentity;

  if (message.secretCode == null && !approvedDeviceIds.has(message.deviceId) && authorizedIdentity == null) {
    pendingHellos.set(ws, {
      message,
      identity: message.user ?? null,
      isVerifiedIdentity: false,
    });
    notifyFrontInfo();
    sendClientMessage(ws, { k: RemoteBroadcastMessageKind.Error, e: RemoteBroadcastErrorKind.PendingApproval });
    return;
  }

  authorizeHello(ws, message, authorizedIdentity ?? message.user ?? undefined, authorizedIdentity != null);

  if (message.jesmylToken != null && verifiedIdentity == null) void attachVerifiedRemoteBroadcastIdentity(ws, message);
};

const handleClientMessage = async (ws: WebSocket, data: RawData) => {
  let parsed: unknown;

  try {
    parsed = JSON.parse(data.toString());
  } catch {
    return;
  }

  const message = parseRemoteBroadcastClientMessage(parsed);
  if (!message) return;

  if (message.k === RemoteBroadcastMessageKind.Locale) {
    handlePultLocaleRequest(ws, message);
    return;
  }

  if (message.k === RemoteBroadcastMessageKind.Controls) {
    const device = clientDevices.get(ws);

    handlePultControlsRequest(
      ws,
      device != null &&
        (approvedDeviceIds.has(device.deviceId) || authorizedDeviceIdentities.has(device.deviceId)),
    );
    return;
  }

  if (message.k === RemoteBroadcastMessageKind.Command) {
    if (!clientDevices.has(ws)) return;

    forwardCommand(message.c);
    return;
  }

  if (message.k === RemoteBroadcastMessageKind.Name) {
    const pendingHello = pendingNameHellos.get(ws);

    if (pendingHello != null) {
      pendingNameHellos.delete(ws);

      if (bannedDevices.has(pendingHello.deviceId)) {
        rejectClient(ws, RemoteBroadcastErrorKind.Banned);
        return;
      }

      deviceNames.set(pendingHello.deviceId, message.name);
      saveConfig();
      await handleNamedHello(ws, { ...pendingHello, name: message.name });
      return;
    }

    const device = clientDevices.get(ws);
    if (device == null) return;

    deviceNames.set(device.deviceId, message.name);
    saveConfig();
    clientDevices.set(ws, { ...device, name: message.name });
    notifyFrontInfo();
    return;
  }

  const { deviceId } = message;

  if (bannedDevices.has(deviceId)) {
    rejectClient(ws, RemoteBroadcastErrorKind.Banned);
    return;
  }

  if (message.secretCode != null && !checkConnectSecretCode(message.secretCode, deviceId)) {
    rejectClient(ws, RemoteBroadcastErrorKind.InvalidSecretCode);
    return;
  }

  handlePultLocaleRequest(
    ws,
    {
      langi: (message.langi as Langi | undefined) ?? Langi.Ru,
      baseMod: 0,
      remoteMod: 0,
    },
    true,
  );

  const name = deviceNames.get(deviceId) ?? null;

  if (name == null) {
    pendingNameHellos.set(ws, message);
    sendClientMessage(ws, { k: RemoteBroadcastMessageKind.Error, e: RemoteBroadcastErrorKind.NameRequired });
    return;
  }

  await handleNamedHello(ws, { ...message, name });
};

const handleHttpRequest = (request: http.IncomingMessage, response: http.ServerResponse) => {
  let pathname = '/';

  try {
    pathname = new URL(request.url ?? '/', 'http://lan').pathname;
  } catch {
    //
  }

  serveFrontFile(response, pathname, request.headers.host);
};

export const takeSafeRemoteBroadcastInfo = (): ElectronRemoteBroadcastInfo => {
  try {
    return takeRemoteBroadcastInfo();
  } catch (error) {
    console.error('[remoteBroadcast.info]', error);

    return {
      isOn: false,
      port: config?.port ?? remoteBroadcastDefaultPort,
      lanIp: null,
      url: null,
      isTls: false,
      certHost: config?.certHost ?? null,
      error: lastError,
      clients: 0,
      controllers: [],
      pending: [],
      banned: [],
    };
  }
};

export const startRemoteBroadcast = (): Promise<ElectronRemoteBroadcastInfo> => {
  if (httpServer || isStarting) return Promise.resolve(takeSafeRemoteBroadcastInfo());

  isStarting = true;

  let currentConfig: RemoteBroadcastConfig;
  let nextWsServer: WebSocketServer;

  try {
    currentConfig = takeConfig();
    applyPersistedRemoteBroadcastState(currentConfig);
    nextWsServer = new WebSocketServer({ noServer: true, maxPayload: maxClientMessageBytes });
  } catch (error) {
    isStarting = false;
    lastError = RemoteBroadcastErrorKind.Unknown;
    console.error('[remoteBroadcast.start]', error);

    return Promise.resolve(takeSafeRemoteBroadcastInfo());
  }

  let server: http.Server | https.Server;
  let isTls = false;

  try {
    const tlsCert = currentConfig.certHost == null ? null : takeTlsCert(currentConfig.certHost);
    isTls = tlsCert != null;
    server = tlsCert ? https.createServer(tlsCert, handleHttpRequest) : http.createServer(handleHttpRequest);
  } catch (error) {
    isStarting = false;
    lastError = RemoteBroadcastErrorKind.CertInvalid;
    console.error('[remoteBroadcast.tls]', error);

    return Promise.resolve(takeSafeRemoteBroadcastInfo());
  }

  server.on('upgrade', (request, socket, head) => {
    const pathname = (() => {
      try {
        return new URL(request.url ?? '/', 'http://lan').pathname;
      } catch {
        return '';
      }
    })();

    if (pathname !== `/${remoteBroadcastPath}`) {
      socket.write('HTTP/1.1 404 Not Found\r\n\r\n');
      socket.destroy();
      return;
    }

    nextWsServer.handleUpgrade(request, socket, head, ws => nextWsServer.emit('connection', ws, request));
  });

  nextWsServer.on('connection', ws => {
    clients.add(ws);
    notifyFrontInfo();

    ws.on('message', data => void handleClientMessage(ws, data));
    const forgetClient = () => {
      clients.delete(ws);
      clientDevices.delete(ws);
      pendingHellos.delete(ws);
      pendingNameHellos.delete(ws);
      forgetLocaleClient(ws);
      forgetControlsClient(ws);
      notifyFrontInfo();
    };

    ws.on('close', forgetClient);
    ws.on('error', forgetClient);
  });

  return new Promise<ElectronRemoteBroadcastInfo>(resolve => {
    const onStartError = (error: NodeJS.ErrnoException) => {
      isStarting = false;
      lastError =
        error.code === 'EADDRINUSE' || error.code === 'EACCES'
          ? RemoteBroadcastErrorKind.PortBusy
          : RemoteBroadcastErrorKind.Unknown;
      console.error('[remoteBroadcast.start]', error);

      try {
        server.close();
      } catch {
        //
      }
      try {
        nextWsServer.close();
      } catch {
        //
      }

      resolve(takeSafeRemoteBroadcastInfo());
    };

    server.once('error', onStartError);
    server.listen(currentConfig.port, '0.0.0.0', () => {
      server.off('error', onStartError);
      server.on('error', error => {
        lastError = RemoteBroadcastErrorKind.Unknown;
        console.error('[remoteBroadcast.server]', error);
        notifyFrontInfo();
        broadcastRemoteBroadcastError(RemoteBroadcastErrorKind.Unknown);
      });

      httpServer = server;
      wsServer = nextWsServer;
      isTlsActive = isTls;
      isStarting = false;
      lastError = takeLanIp() ? RemoteBroadcastErrorKind.None : RemoteBroadcastErrorKind.NoLanAddress;

      notifyFrontInfo();
      resolve(takeSafeRemoteBroadcastInfo());
    });
  }).catch(error => {
    isStarting = false;
    lastError = RemoteBroadcastErrorKind.Unknown;
    console.error('[remoteBroadcast.start]', error);

    return takeSafeRemoteBroadcastInfo();
  });
};

export const stopRemoteBroadcast = (isKeepBans = false): ElectronRemoteBroadcastInfo => {
  for (const client of clients) {
    try {
      client.close();
    } catch {
      //
    }
  }

  clients.clear();
  clientDevices.clear();
  pendingHellos.clear();
  authorizedDeviceIdentities.clear();
  jesmylAuthCheckCache.clear();
  connectSecretCode = makeConnectSecretCode();
  consumedConnectSecretCode = null;
  connectSecretCodeDeviceId = null;
  jesmylAuthCheckUnavailableUntil = 0;
  lastJesmylAuthCheckFailureLogAt = 0;
  clearLocaleRelay();
  clearControlsRelay();
  if (!isKeepBans) {
    bannedDevices.clear();
    approvedDeviceIds.clear();
    saveAccessLists();
  }

  try {
    wsServer?.close();
  } catch {
    //
  }
  try {
    httpServer?.close();
  } catch {
    //
  }

  wsServer = null;
  httpServer = null;
  isTlsActive = false;
  lastError = RemoteBroadcastErrorKind.None;

  notifyFrontInfo();

  return takeRemoteBroadcastInfo();
};

const lanIpCheckInterval = 20_000;
let lanIpWatcher: ReturnType<typeof setInterval> | nil = null;
let watchedLanIp: string | nil = null;

export const startRemoteBroadcastLanIpWatcher = () => {
  if (lanIpWatcher !== null) return;

  watchedLanIp = takeLanIp();

  lanIpWatcher = setInterval(() => {
    const lanIp = takeLanIp();
    if (lanIp === watchedLanIp) return;

    watchedLanIp = lanIp;

    if (!httpServer) {
      notifyFrontInfo();
      return;
    }

    stopRemoteBroadcast(true);
    void startRemoteBroadcast();
  }, lanIpCheckInterval);
};

const applyRemoteBroadcastConfig = async (nextConfig: RemoteBroadcastConfig): Promise<ElectronRemoteBroadcastInfo> => {
  const wasOn = !!httpServer;
  if (wasOn) stopRemoteBroadcast(true);

  config = { ...nextConfig, bannedDevices: Array.from(bannedDevices.values()) };
  writeConfig(config);

  if (wasOn) return startRemoteBroadcast();

  lastError = RemoteBroadcastErrorKind.None;
  return takeRemoteBroadcastInfo();
};

export const setRemoteBroadcastPort = async (port: number): Promise<ElectronRemoteBroadcastInfo> => {
  if (!Number.isInteger(port) || port < 1 || port > 65535) return takeRemoteBroadcastInfo();

  const currentConfig = takeConfig();
  if (currentConfig.port === port) return takeRemoteBroadcastInfo();

  return applyRemoteBroadcastConfig({ ...currentConfig, port });
};

export const setRemoteBroadcastCertHost = async (certHost: string | nil): Promise<ElectronRemoteBroadcastInfo> => {
  const nextCertHost = makeRemoteBroadcastCertHost(certHost);

  if (nextCertHost == null && typeof certHost === 'string' && certHost.trim()) return takeRemoteBroadcastInfo();

  const currentConfig = takeConfig();
  if (currentConfig.certHost === nextCertHost) return takeRemoteBroadcastInfo();

  return applyRemoteBroadcastConfig({ ...currentConfig, certHost: nextCertHost });
};

const takeControllers = () => {
  const controllerByDeviceId = new Map<string, RemoteBroadcastClientDevice>();

  for (const device of clientDevices.values()) {
    const known = controllerByDeviceId.get(device.deviceId);

    if (known == null) {
      controllerByDeviceId.set(device.deviceId, { ...device });
      continue;
    }

    known.since = Math.min(known.since, device.since);
    if (known.login == null && device.login != null) {
      known.login = device.login;
      known.fio = device.fio;
      known.nick = device.nick;
      known.email = device.email;
    }
    if (known.name == null && device.name != null) known.name = device.name;
  }

  return Array.from(controllerByDeviceId.values(), ({ deviceId, since, login, fio, nick, email, name }) => ({
    deviceId,
    since,
    ...(name == null ? {} : { name }),
    ...(login == null ? {} : { login }),
    ...(fio == null ? {} : { fio }),
    ...(nick == null ? {} : { nick }),
    ...(email == null ? {} : { email }),
  }));
};

export const takeRemoteBroadcastInfo = (): ElectronRemoteBroadcastInfo => {
  const currentConfig = takeConfig();
  const lanIp = takeLanIp();
  const isOn = !!httpServer;
  const host = isTlsActive ? currentConfig.certHost : lanIp;

  return {
    isOn,
    port: currentConfig.port,
    lanIp,
    url: isOn && host ? `${isTlsActive ? 'https' : 'http'}://${host}:${currentConfig.port}` : null,
    isTls: isTlsActive,
    certHost: currentConfig.certHost,
    error: lastError,
    secretCode: connectSecretCode,
    clients: clients.size,
    controllers: takeControllers(),
    pending: takePendingDevices(),
    banned: Array.from(bannedDevices.values()),
  };
};

export const banRemoteControl = (deviceId: string): ElectronRemoteBroadcastInfo => {
  if (!deviceId) return takeRemoteBroadcastInfo();

  const name = deviceNames.get(deviceId);
  const identity = authorizedDeviceIdentities.get(deviceId);

  bannedDevices.set(deviceId, {
    deviceId,
    ...(name == null ? {} : { name }),
    ...identity,
  });
  approvedDeviceIds.delete(deviceId);
  saveAccessLists();

  for (const [client, info] of clientDevices)
    if (info.deviceId === deviceId) rejectClient(client, RemoteBroadcastErrorKind.Banned);

  for (const [client, { message }] of pendingHellos) {
    if (message.deviceId !== deviceId) continue;

    pendingHellos.delete(client);
    rejectClient(client, RemoteBroadcastErrorKind.Banned);
  }

  for (const [client, message] of pendingNameHellos) {
    if (message.deviceId !== deviceId) continue;

    pendingNameHellos.delete(client);
    rejectClient(client, RemoteBroadcastErrorKind.Banned);
  }

  notifyFrontInfo();

  return takeRemoteBroadcastInfo();
};

export const unbanRemoteControl = (deviceId: string): ElectronRemoteBroadcastInfo => {
  bannedDevices.delete(deviceId);
  saveAccessLists();
  notifyFrontInfo();

  return takeRemoteBroadcastInfo();
};

export const approveRemoteControl = (deviceId: string): ElectronRemoteBroadcastInfo => {
  if (!deviceId || bannedDevices.has(deviceId)) return takeRemoteBroadcastInfo();

  approvedDeviceIds.add(deviceId);
  saveAccessLists();

  for (const [client, { message, identity, isVerifiedIdentity }] of pendingHellos) {
    if (message.deviceId !== deviceId) continue;

    pendingHellos.delete(client);
    authorizeHello(client, message, identity ?? undefined, isVerifiedIdentity);
  }

  notifyFrontInfo();

  return takeRemoteBroadcastInfo();
};

const mergeRemoteBroadcastSnapshot = (delta: RemoteBroadcastSnapshotDelta): RemoteBroadcastSnapshot => {
  const previous = lastFullSnapshot;
  const previousCm = previous?.cm ?? null;
  const previousBible = previous?.bible ?? null;
  const app = delta.app ?? previous?.app;

  if (app == null) throw 'Пакет снимка пульта без приложения не может стать первым';

  return {
    app,
    isHide: delta.isHide ?? previous?.isHide ?? false,
    isInitialSlide: delta.isInitialSlide ?? previous?.isInitialSlide ?? true,
    cm: delta.cm
      ? {
          comw: delta.cm.comw ?? previousCm?.comw ?? 0,
          comTitle: delta.cm.comTitle ?? previousCm?.comTitle ?? '',
          lists: delta.cm.lists ?? previousCm?.lists ?? emptyRemoteBroadcastCmLists,
          slidei: delta.cm.slidei ?? previousCm?.slidei ?? 0,
          slides: delta.cm.slides ?? previousCm?.slides ?? [],
        }
      : previousCm,
    bible: delta.bible
      ? {
          booki: delta.bible.booki ?? previousBible?.booki ?? 0,
          chapteri: delta.bible.chapteri ?? previousBible?.chapteri ?? 0,
          versei: delta.bible.versei ?? previousBible?.versei ?? 0,
          bookTitle: delta.bible.bookTitle ?? previousBible?.bookTitle ?? '',
          chapterCount: delta.bible.chapterCount ?? previousBible?.chapterCount ?? 0,
          books: delta.bible.books ?? previousBible?.books ?? [],
          verses: delta.bible.verses ?? previousBible?.verses ?? [],
          searchMatches: delta.bible.searchMatches ?? previousBible?.searchMatches ?? [],
          searchTerm: delta.bible.searchTerm ?? previousBible?.searchTerm ?? '',
          joinAddress:
            delta.bible.joinAddress === undefined
              ? (previousBible?.joinAddress ?? null)
              : delta.bible.joinAddress,
          translationName: delta.bible.translationName ?? previousBible?.translationName ?? '',
          translations: delta.bible.translations ?? previousBible?.translations ?? [],
        }
      : previousBible,
  };
};

const makeRemoteBroadcastFullSnapshotDelta = (snapshot: RemoteBroadcastSnapshot): RemoteBroadcastSnapshotDelta => ({
  app: snapshot.app,
  isHide: snapshot.isHide,
  isInitialSlide: snapshot.isInitialSlide,
  ...(snapshot.cm == null ? {} : { cm: snapshot.cm }),
  ...(snapshot.bible == null ? {} : { bible: snapshot.bible }),
});

export const broadcastRemoteBroadcastState = (snapshot: RemoteBroadcastSnapshotDelta) => {
  lastFullSnapshot = mergeRemoteBroadcastSnapshot(snapshot);
  broadcastMessage({ k: RemoteBroadcastMessageKind.State, s: snapshot });
};

export const broadcastRemoteBroadcastError = (error: RemoteBroadcastErrorKind) =>
  broadcastMessage({ k: RemoteBroadcastMessageKind.Error, e: error });
