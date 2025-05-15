import { CmComWid, LocalSokiAuth, SokiVisit } from 'shared/api';
import { ComEditBusy } from 'shared/api/invocators/cm/editor-invocator.shares.model';
import { WebSocket } from 'ws';
import { cmShareEditorServerInvocatorMethods } from '../editor-invocator.shares';

export const watchEditComBusies = async (
  { comw }: { comw: CmComWid },
  { auth, client, visitInfo }: { auth?: LocalSokiAuth; visitInfo?: SokiVisit; client: WebSocket },
) => {
  if (auth == null || auth.fio == null || auth.login == null || visitInfo == null) throw 'Авторизация не действительна';

  const comBusy: ComEditBusy = {
    comw,
    fio: auth.fio,
    login: auth.login,
    deviceId: visitInfo.deviceId,
  };

  clientToBusyMap.set(client, comBusy);

  share();

  client.on('close', () => unwatch(client));
};

export const unwatchEditComBusies = async (_: unknown, { client }: { client: WebSocket }) => unwatch(client);

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

const clientToBusyMap = new Map<WebSocket, ComEditBusy>();

const share = () =>
  cmShareEditorServerInvocatorMethods.comBusies(
    { busies: Array.from(clientToBusyMap.values()) },
    clientToBusyMap.keys(),
  );

const unwatch = (client: WebSocket) => {
  clientToBusyMap.delete(client);
  share();
};
