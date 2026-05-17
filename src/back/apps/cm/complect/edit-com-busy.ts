import { ServerTsjrpcSatisfy } from 'back/complect/model/tsjrpc.satisfy';
import { ServerTSJRPCTool } from 'back/tsjrpc.base.server';
import { CmEditorTsjrpcModel } from 'shared/api/tsjrpc/cm/editor.tsjrpc.model';
import { ComEditBusy } from 'shared/api/tsjrpc/cm/editor.tsjrpc.shares.model';
import { WebSocket } from 'ws';
import { cmShareEditorServerTsjrpcMethods } from '../editor.tsjrpc.shares';

export const cmEditComBusyTsjrpcMethods = {
  watchComBusies: async ({ comw }, tool) => {
    const { auth, client, visitInfo } = tool;

    if (!(client instanceof WebSocket)) return;
    if (auth == null || auth.fio == null || auth.login == null || visitInfo == null)
      throw 'Авторизация не действительна';

    const comBusy: ComEditBusy = {
      comw,
      fio: auth.fio,
      login: auth.login,
      deviceId: visitInfo.deviceId,
    };

    clientToBusyMap.set(client, comBusy);

    share();

    client.on('close', () => unwatch(tool));
  },
  unwatchComBusies: async (_, tool) => unwatch(tool),
} satisfies ServerTsjrpcSatisfy<CmEditorTsjrpcModel>;

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

const clientToBusyMap = new Map<WebSocket, ComEditBusy>();

const share = () =>
  cmShareEditorServerTsjrpcMethods.comBusies({ busies: Array.from(clientToBusyMap.values()) }, clientToBusyMap.keys());

const unwatch = ({ client }: ServerTSJRPCTool) => {
  if (!(client instanceof WebSocket)) return;

  clientToBusyMap.delete(client);
  share();
};
