import {
  RemoteBroadcastApp,
  RemoteBroadcastCommand,
  RemoteBroadcastErrorKind,
  RemoteBroadcastMessageKind,
  RemoteBroadcastPublishedControl,
  RemoteBroadcastSnapshot,
  RemoteBroadcastSnapshotDelta,
  RemoteBroadcastUserIdentity,
  emptyRemoteBroadcastCmLists,
} from 'shared/api/tsjrpc.electtron/remote-broadcast';
import { LocalSokiAuth } from 'shared/api';
import { currentLangiAtom } from '#basis/locale';
import { takeBaseLanguageAtom } from '#basis/state/locale';
import { authIDB } from '$index/shared/state/auth-idb';
import { remoteBroadcastPath } from 'shared/const/electron';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { lazyInit } from 'shared/utils/lazyInit';
import { jversion } from 'shared/values';
import { isSameRemoteControlHost } from './control-link';
import {
  saveRemoteBroadcastJwt,
  takeRemoteBroadcastDeviceId,
  takeRemoteBroadcastJwt,
  takeRemoteBroadcastSessionId,
} from './device';
import { remoteDeviceNameAtom, remoteGamutIndexAtom } from './model';
import { parseRemoteBroadcastServerMessage } from './protocol';
import { applyRemoteLocaleMessage, remoteLocaleAtom } from './remote-locale';

type RemoteBroadcastConnectionState = {
  snapshot: RemoteBroadcastSnapshot | nil;
  isConnected: boolean;
  isBanned: boolean;
  isNotFound: boolean;
  isNoTranslation: boolean;
  isNameRequired: boolean;
  error: RemoteBroadcastErrorKind;
  serverVersion: number | nil;
  hasJesmylToken: boolean;
};

const remoteBroadcastMaxConnectAttempts = 3;
const remoteBroadcastReconnectDelay = 1500;
const remoteBroadcastBannedReconnectDelay = 5000;
const remoteBroadcastAuthTokenWaitMs = 1500;
const remoteBroadcastControlsTimeout = 5000;
const remoteBroadcastEmptyLocaleResendDelay = 2000;

type RemoteBroadcastControlsRequest = {
  promise: Promise<RemoteBroadcastPublishedControl[]>;
  resolve: (controls: RemoteBroadcastPublishedControl[]) => void;
  reject: (reason?: string) => void;
  timeout: ReturnType<typeof setTimeout>;
  stopWaiting: () => void;
};

const makeHelloUserIdentity = (auth: LocalSokiAuth | nil): RemoteBroadcastUserIdentity | nil => {
  if (auth == null) return null;

  const user: RemoteBroadcastUserIdentity = {
    ...(auth.login == null ? {} : { login: auth.login }),
    ...(auth.fio == null ? {} : { fio: auth.fio }),
    ...(auth.nick == null ? {} : { nick: auth.nick }),
    ...(auth.email == null ? {} : { email: auth.email }),
  };

  return Object.keys(user).length === 0 ? null : user;
};

const takeJesmylAuthIdentity = () => {
  const { promise, resolve } = Promise.withResolvers<{
    token: string | nil;
    user: RemoteBroadcastUserIdentity | nil;
  }>();
  const timeout = setTimeout(() => resolve({ token: null, user: null }), remoteBroadcastAuthTokenWaitMs);

  Promise.all([authIDB.get.token(), authIDB.get.auth()]).then(
    ([token, auth]) => {
      clearTimeout(timeout);
      resolve({ token, user: makeHelloUserIdentity(auth) });
    },
    () => {
      clearTimeout(timeout);
      resolve({ token: null, user: null });
    },
  );

  return promise;
};

export const makeRemoteBroadcastEndpoints = (target: string | nil): string[] => {
  const host = target ?? location.host;
  const sameOriginEndpoint = `${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}/${remoteBroadcastPath}`;

  return Array.from(
    new Set(
      target == null
        ? [sameOriginEndpoint]
        : [
            `ws://${host}/${remoteBroadcastPath}`,
            `wss://${host}/${remoteBroadcastPath}`,
            ...(isSameRemoteControlHost(target) ? [sameOriginEndpoint] : []),
          ],
    ),
  );
};

class RemoteBroadcastConnection {
  private readonly listeners = new Set<() => void>();
  private readonly target: string | nil;
  private readonly host: string;
  private readonly endpoints: string[];
  private state: RemoteBroadcastConnectionState = {
    snapshot: null,
    isConnected: false,
    isBanned: false,
    isNotFound: false,
    isNoTranslation: false,
    isNameRequired: false,
    error: RemoteBroadcastErrorKind.None,
    serverVersion: null,
    hasJesmylToken: false,
  };
  private socket: WebSocket | nil = null;
  private attemptSockets: WebSocket[] = [];
  private reconnectTimeout: ReturnType<typeof setTimeout> | nil = null;
  private failedAttempts = 0;
  private isOpenedOnce = false;
  private isBannedNow = false;
  private isDisposed = false;
  private isSnapshotFresh = false;
  private lastBible: RemoteBroadcastSnapshot['bible'] = null;
  private requestedApp: RemoteBroadcastApp | nil = null;
  private isPanelRecoverySent = false;
  private isLocaleRequestSent = false;
  private lastEmptyLocaleAt = 0;
  private controlsRequest: RemoteBroadcastControlsRequest | nil = null;
  private secretCode: string | nil;
  private nameOverride: string | nil = null;
  private readonly stopLangiSubscription: () => void;

  constructor(target: string | nil, secretCode: string | nil, nameOverride: string | nil = null) {
    this.target = target;
    this.secretCode = secretCode;
    this.nameOverride = nameOverride;
    this.host = target ?? location.host;
    this.endpoints = makeRemoteBroadcastEndpoints(target);
    this.stopLangiSubscription = currentLangiAtom.subscribe(() => this.requestLocales());

    this.connect();
  }

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  };

  readState = () => this.state;

  readLastBible = () => this.lastBible;

  isFreshSnapshot = () => this.isSnapshotFresh;

  markAppRequested(app: RemoteBroadcastApp) {
    if (this.requestedApp != null) return;

    this.requestedApp = app;
  }

  sendCommand(command: RemoteBroadcastCommand) {
    const socket = this.socket;
    if (socket?.readyState !== WebSocket.OPEN) return;

    socket.send(JSON.stringify({ k: RemoteBroadcastMessageKind.Command, c: command }));
  }

  sendName(name: string) {
    const socket = this.socket;
    if (socket?.readyState !== WebSocket.OPEN) return false;

    socket.send(JSON.stringify({ k: RemoteBroadcastMessageKind.Name, name }));
    return true;
  }

  setSecretCode(secretCode: string | nil) {
    this.secretCode = secretCode;
  }

  setNameOverride(name: string | nil) {
    this.nameOverride = name;
  }

  requestControls = () => {
    if (this.controlsRequest != null) return this.controlsRequest.promise;

    const { promise, resolve, reject } = Promise.withResolvers<RemoteBroadcastPublishedControl[]>();
    const timeout = setTimeout(() => this.clearControlsRequest('#timeout'), remoteBroadcastControlsTimeout);
    const request: RemoteBroadcastControlsRequest = {
      promise,
      resolve,
      reject,
      timeout,
      stopWaiting: () => {},
    };
    this.controlsRequest = request;

    if (this.socket?.readyState === WebSocket.OPEN) this.sendControlsRequest();
    else {
      const stopWaiting = this.subscribe(() => {
        if (this.socket?.readyState !== WebSocket.OPEN) return;

        request.stopWaiting();
        request.stopWaiting = () => {};
        this.sendControlsRequest();
      });
      request.stopWaiting = stopWaiting;
    }

    return promise;
  };

  requestLocales = () => {
    this.isLocaleRequestSent = false;
    this.sendLocaleRequest();
  };

  private sendControlsRequest() {
    const socket = this.socket;
    if (socket?.readyState !== WebSocket.OPEN) {
      this.clearControlsRequest('#closed');
      return;
    }

    try {
      socket.send(JSON.stringify({ k: RemoteBroadcastMessageKind.Controls }));
    } catch {
      this.clearControlsRequest('#error');
    }
  }

  private resolveControlsRequest(controls: RemoteBroadcastPublishedControl[]) {
    const request = this.controlsRequest;
    if (request == null) return;

    this.controlsRequest = null;
    clearTimeout(request.timeout);
    request.stopWaiting();
    request.resolve(controls);
  }

  private clearControlsRequest(reason?: string) {
    const request = this.controlsRequest;
    if (request == null) return;

    this.controlsRequest = null;
    clearTimeout(request.timeout);
    request.stopWaiting();
    if (reason != null) request.reject(reason);
  }

  retry() {
    if (this.isDisposed) return;

    this.clearControlsRequest('#retry');

    if (this.reconnectTimeout !== null) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    this.socket = null;
    for (const socket of this.attemptSockets) this.stopSocket(socket);
    this.attemptSockets = [];

    this.failedAttempts = 0;
    this.isOpenedOnce = false;
    this.isBannedNow = false;
    this.isSnapshotFresh = false;
    this.isPanelRecoverySent = false;
    this.lastBible = null;

    this.patchState({
      snapshot: null,
      isConnected: false,
      isBanned: false,
      isNotFound: false,
      isNoTranslation: false,
      isNameRequired: false,
      error: RemoteBroadcastErrorKind.None,
      hasJesmylToken: false,
    });

    this.connect();
  }

  requestPanelRecovery() {
    if (this.isPanelRecoverySent) return;

    this.isPanelRecoverySent = true;
    void this.sendHello();
  }

  close() {
    this.isDisposed = true;
    this.clearControlsRequest('#closed');
    this.stopLangiSubscription();

    if (this.reconnectTimeout !== null) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    this.socket = null;
    for (const socket of this.attemptSockets) this.stopSocket(socket);
    this.attemptSockets = [];
    this.listeners.clear();
  }

  private patchState(patch: Partial<RemoteBroadcastConnectionState>) {
    this.state = { ...this.state, ...patch };

    for (const listener of this.listeners) listener();
  }

  private stopSocket(socket: WebSocket) {
    socket.onopen = null;
    socket.onmessage = null;
    socket.onerror = null;
    socket.onclose = null;

    if (socket.readyState === WebSocket.CONNECTING) socket.onopen = () => socket.close();
    else if (socket.readyState === WebSocket.OPEN) socket.close();
  }

  private scheduleReconnect(delay = remoteBroadcastReconnectDelay) {
    if (this.isDisposed || this.reconnectTimeout !== null) return;

    this.reconnectTimeout = setTimeout(() => {
      this.reconnectTimeout = null;
      this.connect();
    }, delay);
  }

  private handleAttemptFailure() {
    if (this.isDisposed || this.state.isNameRequired) return;

    this.failedAttempts += 1;

    if (!this.isOpenedOnce && this.failedAttempts >= remoteBroadcastMaxConnectAttempts) {
      this.patchState({ isNoTranslation: true });

      if (this.target == null) this.patchState({ isNotFound: true });

      return;
    }

    this.scheduleReconnect();
  }

  private sendLocaleRequest() {
    if (this.isLocaleRequestSent) return;

    const socket = this.socket;
    if (socket?.readyState !== WebSocket.OPEN) return;

    const langi = currentLangiAtom.get();
    const store = remoteLocaleAtom.get();
    const base = takeBaseLanguageAtom().get();
    const baseMod = base[BaseLocaleKey.Langi] === langi ? (store.baseModByLangi?.[langi] ?? 0) : 0;

    this.isLocaleRequestSent = true;

    try {
      socket.send(
        JSON.stringify({
          k: RemoteBroadcastMessageKind.Locale,
          langi,
          baseMod,
          remoteMod: store.modByLangi?.[langi] ?? 0,
        }),
      );
    } catch {
      return;
    }
  }

  private async sendHello() {
    const socket = this.socket;
    if (socket?.readyState !== WebSocket.OPEN) return;

    const deviceId = takeRemoteBroadcastDeviceId();
    const jwt = takeRemoteBroadcastJwt(this.host);
    const { token: jesmylToken, user } = await takeJesmylAuthIdentity();
    const name = (this.nameOverride != null ? this.nameOverride : remoteDeviceNameAtom.get()).trim();

    if (this.isDisposed || this.socket !== socket || socket.readyState !== WebSocket.OPEN) return;

    this.patchState({ hasJesmylToken: jesmylToken != null });

    try {
      socket.send(
        JSON.stringify({
          k: RemoteBroadcastMessageKind.Hello,
          deviceId,
          session: takeRemoteBroadcastSessionId(),
          version: jversion.num,
          ...(jwt == null ? {} : { token: jwt }),
          ...(jesmylToken == null ? {} : { jesmylToken }),
          ...(user == null ? {} : { user }),
          ...(this.secretCode == null ? {} : { secretCode: this.secretCode }),
          ...(name ? { name } : {}),
          langi: currentLangiAtom.get(),
        }),
      );
    } catch {
      //
    }
  }

  private applySnapshot(snapshotDelta: RemoteBroadcastSnapshotDelta) {
    const previous = this.state.snapshot;
    const app = snapshotDelta.app ?? previous?.app;
    if (app == null) return;

    this.isSnapshotFresh = true;

    const cmDelta = snapshotDelta.cm;
    const bibleDelta = snapshotDelta.bible;
    const prevBible = previous?.bible ?? this.lastBible;
    const nextBooki = bibleDelta?.booki ?? prevBible?.booki;
    const nextChapteri = bibleDelta?.chapteri ?? prevBible?.chapteri;
    const nextTranslationName = bibleDelta?.translationName ?? prevBible?.translationName;
    const isVersesKept =
      bibleDelta != null &&
      (bibleDelta.verses == null ||
        (bibleDelta.verses.length === 0 &&
          prevBible != null &&
          prevBible.verses.length > 0 &&
          prevBible.booki === nextBooki &&
          prevBible.chapteri === nextChapteri &&
          prevBible.translationName === nextTranslationName));

    const bible = bibleDelta
      ? {
          booki: nextBooki ?? 0,
          chapteri: nextChapteri ?? 0,
          versei: bibleDelta.versei ?? prevBible?.versei ?? 0,
          bookTitle: bibleDelta.bookTitle ?? prevBible?.bookTitle ?? '',
          translationName: nextTranslationName ?? '',
          translations: bibleDelta.translations ?? prevBible?.translations ?? [],
          chapterCount: bibleDelta.chapterCount ?? prevBible?.chapterCount ?? 0,
          books: bibleDelta.books ?? prevBible?.books ?? [],
          verses: isVersesKept ? (prevBible?.verses ?? []) : (bibleDelta.verses ?? []),
          searchMatches: bibleDelta.searchMatches ?? prevBible?.searchMatches ?? [],
          searchTerm: bibleDelta.searchTerm ?? prevBible?.searchTerm ?? '',
          joinAddress: bibleDelta.joinAddress === undefined ? (prevBible?.joinAddress ?? null) : bibleDelta.joinAddress,
        }
      : prevBible;

    if (bible != null) this.lastBible = bible;

    this.patchState({
      snapshot: {
        app,
        isHide: snapshotDelta.isHide ?? previous?.isHide ?? false,
        isInitialSlide: snapshotDelta.isInitialSlide ?? previous?.isInitialSlide ?? true,
        cm: cmDelta
          ? {
              comw: cmDelta.comw ?? previous?.cm?.comw ?? 0,
              comTitle: cmDelta.comTitle ?? previous?.cm?.comTitle ?? '',
              lists: cmDelta.lists ?? previous?.cm?.lists ?? emptyRemoteBroadcastCmLists,
              slidei: cmDelta.slidei ?? previous?.cm?.slidei ?? 0,
              slides: cmDelta.slides ?? previous?.cm?.slides ?? [],
            }
          : (previous?.cm ?? null),
        bible,
      },
    });
  }

  private connect() {
    if (this.isDisposed) return;

    this.attemptSockets = [];
    let activeSocket: WebSocket | nil = null;
    let unresolved = this.endpoints.length;

    const failSocket = (socket: WebSocket) => {
      if (this.isDisposed) return;

      if (activeSocket !== null && activeSocket !== socket) return;

      this.patchState({ isConnected: false });

      if (activeSocket === socket) {
        this.socket = null;
        this.clearControlsRequest('#closed');
        if (this.isBannedNow) {
          this.scheduleReconnect(remoteBroadcastBannedReconnectDelay);
          return;
        }
        if (this.state.isNameRequired) this.patchState({ isNameRequired: false });

        this.handleAttemptFailure();
        return;
      }

      unresolved -= 1;
      if (unresolved === 0) this.handleAttemptFailure();
    };

    const startSocket = (url: string) => {
      let socket: WebSocket;

      try {
        socket = new WebSocket(url);
      } catch {
        unresolved -= 1;
        if (unresolved === 0) this.handleAttemptFailure();
        return;
      }

      this.attemptSockets.push(socket);

      socket.onopen = () => {
        if (this.isDisposed) return;

        activeSocket = socket;
        this.socket = socket;
        this.isOpenedOnce = true;
        this.failedAttempts = 0;

        this.requestedApp = null;
        this.isSnapshotFresh = false;
        this.isPanelRecoverySent = false;
        this.isLocaleRequestSent = false;
        this.lastEmptyLocaleAt = 0;

        this.patchState({
          isConnected: true,
          isNotFound: false,
          isNoTranslation: false,
          isNameRequired: false,
          error: RemoteBroadcastErrorKind.None,
        });

        for (const other of this.attemptSockets) if (other !== socket) this.stopSocket(other);

        this.sendLocaleRequest();
        void this.sendHello();
      };

      socket.onmessage = event => {
        if (this.isDisposed || socket !== activeSocket) return;

        let parsed: unknown;

        try {
          parsed = JSON.parse(event.data);
        } catch {
          return;
        }

        const message = parseRemoteBroadcastServerMessage(parsed);
        if (!message) return;

        switch (message.k) {
          case RemoteBroadcastMessageKind.State:
            this.secretCode = null;
            this.isBannedNow = false;
            this.patchState({ isBanned: false });
            if (
              this.state.error === RemoteBroadcastErrorKind.PendingApproval ||
              this.state.error === RemoteBroadcastErrorKind.NameRequired
            )
              this.patchState({ error: RemoteBroadcastErrorKind.None, isNameRequired: false });

            this.applySnapshot(message.snapshot);
            this.sendLocaleRequest();
            break;
          case RemoteBroadcastMessageKind.Token:
            saveRemoteBroadcastJwt(message.token, this.host);
            break;
          case RemoteBroadcastMessageKind.Version:
            this.patchState({ serverVersion: message.version });
            this.sendLocaleRequest();
            break;
          case RemoteBroadcastMessageKind.Scheme:
            remoteGamutIndexAtom.set(message.gamuti);
            break;
          case RemoteBroadcastMessageKind.Locale:
            applyRemoteLocaleMessage(message);
            if (
              message.base == null &&
              message.remote == null &&
              Date.now() - this.lastEmptyLocaleAt >= remoteBroadcastEmptyLocaleResendDelay
            ) {
              this.lastEmptyLocaleAt = Date.now();
              this.isLocaleRequestSent = false;
              this.sendLocaleRequest();
            }
            break;
          case RemoteBroadcastMessageKind.Controls:
            this.resolveControlsRequest(message.controls);
            break;
          case RemoteBroadcastMessageKind.Error:
            this.patchState({
              error: message.error,
              isNameRequired: message.error === RemoteBroadcastErrorKind.NameRequired,
            });

            if (
              message.error === RemoteBroadcastErrorKind.Banned ||
              message.error === RemoteBroadcastErrorKind.InvalidSecretCode
            ) {
              this.isBannedNow = true;
              this.patchState({ isBanned: message.error === RemoteBroadcastErrorKind.Banned });
              socket.close();
            }
            break;
        }
      };

      socket.onclose = () => failSocket(socket);

      socket.onerror = () => {
        if (socket.readyState !== WebSocket.CONNECTING) socket.close();
      };
    };

    for (const url of this.endpoints) startSocket(url);
  }
}

const remoteBroadcastReachabilityTimeout = 2000;

export const probeRemoteControlReachability = (target: string): Promise<boolean> =>
  new Promise(resolve => {
    const sockets: WebSocket[] = [];
    const endpoints = makeRemoteBroadcastEndpoints(target);
    let unresolved = endpoints.length;
    let isSettled = false;

    const settle = (isReachable: boolean) => {
      if (isSettled) return;

      isSettled = true;
      clearTimeout(timeout);

      for (const socket of sockets) {
        socket.onopen = null;
        socket.onclose = null;
        socket.onerror = null;

        if (socket.readyState === WebSocket.CONNECTING) socket.onopen = () => socket.close();
        else if (socket.readyState === WebSocket.OPEN) socket.close();
      }

      resolve(isReachable);
    };

    const timeout = setTimeout(() => settle(false), remoteBroadcastReachabilityTimeout);

    const failSocket = () => {
      unresolved -= 1;
      if (unresolved === 0) settle(false);
    };

    for (const endpoint of endpoints) {
      let socket: WebSocket;

      try {
        socket = new WebSocket(endpoint);
      } catch {
        failSocket();
        continue;
      }

      sockets.push(socket);
      socket.onopen = () => settle(true);
      socket.onclose = failSocket;
    }
  });

const remoteBroadcastConnectionsLazy = lazyInit(() => new Map<string, RemoteBroadcastConnection>());

const sameOriginConnectionKey = 'same-origin';
const makeTargetKey = (target: string | nil) => (target == null ? sameOriginConnectionKey : `target:${target}`);

export const takeRemoteBroadcastConnection = (
  target: string | nil,
  secretCode: string | nil = null,
  nameOverride?: string | nil,
) => {
  const key = makeTargetKey(target);
  const connections = remoteBroadcastConnectionsLazy();
  const knownConnection = connections.get(key);
  if (knownConnection != null) {
    knownConnection.setSecretCode(secretCode);
    knownConnection.setNameOverride(nameOverride);
    return knownConnection;
  }

  const connection = new RemoteBroadcastConnection(target, secretCode, nameOverride ?? null);
  connections.set(key, connection);

  return connection;
};

export const closeRemoteBroadcastConnection = (target: string | nil) => {
  const key = makeTargetKey(target);
  const connections = remoteBroadcastConnectionsLazy();

  connections.get(key)?.close();
  connections.delete(key);
};
