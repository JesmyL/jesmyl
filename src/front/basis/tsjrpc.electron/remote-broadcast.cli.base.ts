import {
  handlePublishedControlsRequest,
  handlePultLocalesRequest,
} from '#basis/tsjrpc.electron/remote-broadcast.relay';
import { ElectronTsjrpcBaseClient, isElectronApp } from '#shared/tsjrpc.electron/tsjrpc.electron.client';
import { ElectronRemoteBroadcastBaseTsjrpcModel } from 'shared/api/tsjrpc.electtron/remote-broadcast';

export const electronRemoteBroadcastTsjrpcClientBase =
  new (class RemoteBroadcast extends ElectronTsjrpcBaseClient<ElectronRemoteBroadcastBaseTsjrpcModel> {
    constructor() {
      super({
        scope: 'remoteBroadcast',
        methods: {
          command: async ({ command }) => {
            try {
              const { applyRemoteBroadcastCommand } = await import('#features/broadcast/remote/controller');

              applyRemoteBroadcastCommand(command);
            } catch (error) {
              console.error('[remoteBroadcast.cli]', error);
              return;
            }
          },
          info: async ({ info }) => {
            try {
              const { remoteBroadcastInfoAtom } = await import('#features/broadcast/remote/controller');

              remoteBroadcastInfoAtom.set({ ...remoteBroadcastInfoAtom.get(), ...info });
            } catch (error) {
              console.error('[remoteBroadcast.cli]', error);
              return;
            }
          },
          requestLocales: async args => handlePultLocalesRequest(args),
          requestPublishedControls: async () => handlePublishedControlsRequest(),
        },
      });
    }
  })();

let isRemoteBroadcastClientRegistered = false;

export const registerRemoteBroadcastClientBase = () => {
  if (!isElectronApp || isRemoteBroadcastClientRegistered) return;

  isRemoteBroadcastClientRegistered = true;
  electronRemoteBroadcastTsjrpcClientBase.$$register();
};

registerRemoteBroadcastClientBase();
