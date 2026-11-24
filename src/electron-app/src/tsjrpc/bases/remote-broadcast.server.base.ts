import {
  approveRemoteControl,
  banRemoteControl,
  broadcastRemoteBroadcastState,
  broadcastScreenScheme,
  setRemoteBroadcastCertHost,
  setRemoteBroadcastPort,
  startRemoteBroadcast,
  stopRemoteBroadcast,
  takeRemoteBroadcastInfo,
  takeSafeRemoteBroadcastInfo,
  unbanRemoteControl,
} from '../../remote/server';
import { receivePublishedControls } from '../../remote/controls';
import { receivePultFrontFiles } from '../../remote/front-cache';
import { receiveInstalledLocales } from '../../remote/locales';
import { receiveScreenScheme } from '../../remote/screen-scheme';
import { TsjrpcElectronAppBase } from '../init/tsjrpc.base.electron';
import { ElectronRemoteBroadcastInfo, ElectronRemoteBroadcastTsjrpcModel } from '../model';

const takeSafeInfo = async (
  takeInfo: () => ElectronRemoteBroadcastInfo | Promise<ElectronRemoteBroadcastInfo>,
): Promise<ElectronRemoteBroadcastInfo> => {
  try {
    return await takeInfo();
  } catch (error) {
    console.error('[remoteBroadcast.info]', error);

    return takeSafeRemoteBroadcastInfo();
  }
};

export const electronAppRemoteBroadcastTsjrpcBase =
  new (class RemoteBroadcast extends TsjrpcElectronAppBase<ElectronRemoteBroadcastTsjrpcModel> {
    constructor() {
      super({
        scope: 'remoteBroadcast',
        methods: {
          start: async () => startRemoteBroadcast(),
          stop: async () => takeSafeInfo(() => stopRemoteBroadcast()),
          setPort: async ({ port }) => takeSafeInfo(() => setRemoteBroadcastPort(port)),
          setCertHost: async ({ certHost }) => takeSafeInfo(() => setRemoteBroadcastCertHost(certHost)),
          getInfo: async () => takeSafeInfo(takeRemoteBroadcastInfo),
          banRemoteControl: async ({ deviceId }) => takeSafeInfo(() => banRemoteControl(deviceId)),
          unbanRemoteControl: async ({ deviceId }) => takeSafeInfo(() => unbanRemoteControl(deviceId)),
          approveRemoteControl: async ({ deviceId }) => takeSafeInfo(() => approveRemoteControl(deviceId)),
          sendSnapshot: async ({ snapshot }) => broadcastRemoteBroadcastState(snapshot),
          sendScreenScheme: async ({ gamuti }) => {
            receiveScreenScheme(gamuti);
            broadcastScreenScheme();
          },
          sendInstalledLocales: async payload => receiveInstalledLocales(payload),
          sharePultLocales: async payload => receiveInstalledLocales(payload),
          sharePublishedControls: async ({ controls }) => receivePublishedControls(controls),
          sharePultFrontFiles: async ({ version, files }) => receivePultFrontFiles({ version, files }),
        },
      });
    }
  })();
