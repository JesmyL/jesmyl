import { CmComWid, LocalSokiAuth, SokiVisit } from 'shared/api';
import { ComEditBusy } from 'shared/api/invocators/cm/editor-invocator.shares.model';
import { WebSocket } from 'ws';
import { cmEditorServerInvocatorShareMethods } from '../editor-invocator.shares';

export const watchEditComBusies =
  ({ auth, client, visit }: { auth?: LocalSokiAuth; visit?: SokiVisit; client: WebSocket }) =>
  async (comw: CmComWid) => {
    if (auth == null || auth.fio == null || auth.login == null || visit == null)
      throw new Error('incorrect credentials');

    const comBusy: ComEditBusy = {
      comw,
      fio: auth.fio,
      login: auth.login,
      deviceId: visit.deviceId,
    };

    clientToBusyMap.set(client, comBusy);

    share();

    client.on('close', () => unwatch(client));
  };

export const unwatchEditComBusies =
  ({ client }: { client: WebSocket }) =>
  async () =>
    unwatch(client);

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

const clientToBusyMap = new Map<WebSocket, ComEditBusy>();

const share = () =>
  cmEditorServerInvocatorShareMethods.comBusies(clientToBusyMap.keys(), Array.from(clientToBusyMap.values()));

const unwatch = (client: WebSocket) => {
  clientToBusyMap.delete(client);
  share();
};
