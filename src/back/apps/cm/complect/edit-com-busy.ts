import { ServerTSJRPCTool } from 'back/tsjrpc.base.server';
import { CmComWid } from 'shared/api';
import { ComEditBusy } from 'shared/api/tsjrpc/cm/editor.tsjrpc.shares.model';
import { WebSocket } from 'ws';
import { cmShareEditorServerTsjrpcMethods } from '../editor.tsjrpc.shares';

export const watchEditComBusies = async ({ comw }: { comw: CmComWid }, tool: ServerTSJRPCTool) => {
  const { auth, client, visitInfo } = tool;

  if (!(client instanceof WebSocket)) return;
  if (auth == null || auth.fio == null || auth.login == null || visitInfo == null) throw 'Авторизация не действительна';

  const comBusy: ComEditBusy = {
    comw,
    fio: auth.fio,
    login: auth.login,
    deviceId: visitInfo.deviceId,
  };

  clientToBusyMap.set(client, comBusy);

  share();

  client.on('close', () => unwatch(tool));
};

export const unwatchEditComBusies = async (_: unknown, tool: ServerTSJRPCTool) => unwatch(tool);

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
