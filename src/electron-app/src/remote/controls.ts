import type { WebSocket } from 'ws';
import {
  RemoteBroadcastMessageKind,
  RemoteBroadcastPublishedControl,
  RemoteBroadcastServerMessage,
} from '../../../shared/api/tsjrpc.electtron/remote-broadcast';
import { electronRemoteBroadcastTsjrpcAppServerMethods } from '../tsjrpc/methods/remote-broadcast.server.methods';

const controlsRelayTimeoutMs = 4000;
const controlsCacheTtlMs = 30_000;

let cachedControls: RemoteBroadcastPublishedControl[] | nil = null;
let cachedAt = 0;

const pendingControls = new Map<WebSocket, boolean>();
const pendingControlTimeouts = new Map<WebSocket, ReturnType<typeof setTimeout>>();

const sendControls = (ws: WebSocket, controls: RemoteBroadcastPublishedControl[], includeSecretCodes: boolean) => {
  const message: RemoteBroadcastServerMessage = {
    k: RemoteBroadcastMessageKind.Controls,
    controls: includeSecretCodes
      ? controls
      : controls.map(control => ({ fio: control.fio, ip: control.ip, port: control.port })),
  };

  try {
    ws.send(JSON.stringify(message));
  } catch {
    return;
  }
};

const clearPendingControls = (ws: WebSocket) => {
  const timeout = pendingControlTimeouts.get(ws);
  if (timeout != null) clearTimeout(timeout);
  pendingControlTimeouts.delete(ws);
  pendingControls.delete(ws);
};

const answerWithCachedControls = (ws: WebSocket) => {
  sendControls(ws, cachedControls ?? [], pendingControls.get(ws) === true);
  clearPendingControls(ws);
};

export const handlePultControlsRequest = (ws: WebSocket, includeSecretCodes: boolean) => {
  if (cachedControls != null && Date.now() - cachedAt <= controlsCacheTtlMs) {
    sendControls(ws, cachedControls, includeSecretCodes);
    clearPendingControls(ws);
    return;
  }

  pendingControls.set(ws, includeSecretCodes);

  const previousTimeout = pendingControlTimeouts.get(ws);
  if (previousTimeout != null) clearTimeout(previousTimeout);
  pendingControlTimeouts.set(
    ws,
    setTimeout(() => answerWithCachedControls(ws), controlsRelayTimeoutMs),
  );

  void electronRemoteBroadcastTsjrpcAppServerMethods
    .requestPublishedControls(undefined, { toWinNum: 0, winNum: 0 })
    .catch(() => {});
};

export const receivePublishedControls = (controls: RemoteBroadcastPublishedControl[]) => {
  if (controls.length > 0) {
    cachedControls = controls;
    cachedAt = Date.now();
  } else {
    cachedControls = null;
    cachedAt = 0;
  }

  for (const [ws, includeSecretCodes] of pendingControls) {
    sendControls(ws, controls, includeSecretCodes);
    clearPendingControls(ws);
  }
};

export const clearControlsCache = () => {
  cachedControls = null;
  cachedAt = 0;
};

export const forgetControlsClient = (ws: WebSocket) => {
  clearPendingControls(ws);
};

export const clearControlsRelay = () => {
  for (const timeout of pendingControlTimeouts.values()) clearTimeout(timeout);
  pendingControlTimeouts.clear();
  pendingControls.clear();
  cachedControls = null;
  cachedAt = 0;
};
