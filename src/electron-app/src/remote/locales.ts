import type { WebSocket } from 'ws';
import { Langi } from '../../../shared/api';
import {
  RemoteBroadcastMessageKind,
  RemoteBroadcastServerMessage,
  RemoteLocalePayload,
} from '../../../shared/api/tsjrpc.electtron/remote-broadcast';
import { electronRemoteBroadcastTsjrpcAppServerMethods } from '../tsjrpc/methods/remote-broadcast.server.methods';

type PendingLocaleRequest = { langi: Langi; baseMod: number; remoteMod: number };

const localeRelayTimeoutMs = 4000;

const installedLocales = new Map<Langi, RemoteLocalePayload>();
const pendingLocaleRequests = new Map<WebSocket, PendingLocaleRequest>();
const pendingLocaleTimeouts = new Map<WebSocket, ReturnType<typeof setTimeout>>();

const sendLocaleMessage = (ws: WebSocket, message: RemoteBroadcastServerMessage) => {
  try {
    ws.send(JSON.stringify(message));
  } catch {
    return;
  }
};

const clearPendingRequest = (ws: WebSocket) => {
  const timeout = pendingLocaleTimeouts.get(ws);
  if (timeout != null) clearTimeout(timeout);
  pendingLocaleTimeouts.delete(ws);
  pendingLocaleRequests.delete(ws);
};

const sendInstalledLocalesIfFresher = (ws: WebSocket, request: PendingLocaleRequest, isProactive = false) => {
  const installed = installedLocales.get(request.langi);
  if (installed == null) return false;

  const isBaseSendable = installed.base != null && (installed.baseMod ?? 0) > request.baseMod;
  const isRemoteSendable = installed.remote != null && (installed.remoteMod ?? 0) > request.remoteMod;

  if (!isBaseSendable && !isRemoteSendable) return false;

  const sentBaseMod = isBaseSendable ? (installed.baseMod ?? 0) : null;
  const sentRemoteMod = isRemoteSendable ? (installed.remoteMod ?? 0) : null;

  sendLocaleMessage(ws, {
    k: RemoteBroadcastMessageKind.Locale,
    langi: request.langi,
    ...(isBaseSendable ? { base: installed.base, baseMod: sentBaseMod ?? 0 } : {}),
    ...(isRemoteSendable ? { remote: installed.remote, remoteMod: sentRemoteMod ?? 0 } : {}),
  });

  const pending = isProactive ? pendingLocaleRequests.get(ws) : null;
  const isPendingSatisfied =
    pending == null ||
    (pending.langi === request.langi &&
      sentBaseMod != null &&
      sentBaseMod > pending.baseMod &&
      sentRemoteMod != null &&
      sentRemoteMod > pending.remoteMod);

  if (isPendingSatisfied) clearPendingRequest(ws);

  return true;
};

const mergeInstalledLocales = (payload: RemoteLocalePayload) => {
  const previous = installedLocales.get(payload.langi);
  const isBaseFresher = payload.base != null && (payload.baseMod ?? 0) >= (previous?.baseMod ?? -1);
  const isRemoteFresher = payload.remote != null && (payload.remoteMod ?? 0) >= (previous?.remoteMod ?? -1);

  installedLocales.set(payload.langi, {
    langi: payload.langi,
    ...(isBaseFresher
      ? { base: payload.base, baseMod: payload.baseMod ?? 0 }
      : previous?.base == null
        ? {}
        : { base: previous.base, baseMod: previous.baseMod }),
    ...(isRemoteFresher
      ? { remote: payload.remote, remoteMod: payload.remoteMod ?? 0 }
      : previous?.remote == null
        ? {}
        : { remote: previous.remote, remoteMod: previous.remoteMod }),
  });
};

const answerPendingRequests = (langi: Langi) => {
  const installed = installedLocales.get(langi);
  if (installed == null) return;

  for (const [ws, request] of pendingLocaleRequests) {
    if (request.langi !== langi) continue;

    const isBaseFresher =
      installed.base != null && (request.baseMod === 0 || (installed.baseMod ?? 0) >= request.baseMod);
    const isRemoteFresher =
      installed.remote != null && (request.remoteMod === 0 || (installed.remoteMod ?? 0) >= request.remoteMod);
    if (!isBaseFresher && !isRemoteFresher) continue;

    sendLocaleMessage(ws, {
      k: RemoteBroadcastMessageKind.Locale,
      langi,
      ...(isBaseFresher ? { base: installed.base, baseMod: installed.baseMod ?? 0 } : {}),
      ...(isRemoteFresher ? { remote: installed.remote, remoteMod: installed.remoteMod ?? 0 } : {}),
    });
    clearPendingRequest(ws);
  }
};

export const receiveInstalledLocales = (payload: RemoteLocalePayload) => {
  mergeInstalledLocales(payload);
  answerPendingRequests(payload.langi);
};

const requestLocalesFromWindow = (ws: WebSocket, request: PendingLocaleRequest) => {
  pendingLocaleRequests.set(ws, request);

  const previousTimeout = pendingLocaleTimeouts.get(ws);
  if (previousTimeout != null) clearTimeout(previousTimeout);
  pendingLocaleTimeouts.set(
    ws,
    setTimeout(() => {
      pendingLocaleTimeouts.delete(ws);
      if (!pendingLocaleRequests.has(ws)) return;
      if (sendInstalledLocalesIfFresher(ws, request)) return;

      requestLocalesFromWindow(ws, request);
    }, localeRelayTimeoutMs),
  );

  void electronRemoteBroadcastTsjrpcAppServerMethods
    .requestLocales(request, { toWinNum: 0, winNum: 0 })
    .catch(() => {});
};

export const handlePultLocaleRequest = (ws: WebSocket, request: PendingLocaleRequest, isProactive = false) => {
  if (sendInstalledLocalesIfFresher(ws, request, isProactive)) return;
  if (isProactive && pendingLocaleRequests.has(ws)) return;

  requestLocalesFromWindow(ws, request);
};

export const forgetLocaleClient = (ws: WebSocket) => {
  clearPendingRequest(ws);
};

export const clearLocaleRelay = () => {
  for (const timeout of pendingLocaleTimeouts.values()) clearTimeout(timeout);
  pendingLocaleTimeouts.clear();
  installedLocales.clear();
  pendingLocaleRequests.clear();
};
