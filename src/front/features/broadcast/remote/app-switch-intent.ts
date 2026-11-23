import { atom } from 'atomaric';
import { RemoteBroadcastApp } from 'shared/api/tsjrpc.electtron/remote-broadcast';

export const remoteManualAppAtom = atom<RemoteBroadcastApp | nil>(null);

export const setRemoteManualApp = (app: RemoteBroadcastApp) => remoteManualAppAtom.set(app);

export const resetRemoteManualApp = () => remoteManualAppAtom.set(null);
