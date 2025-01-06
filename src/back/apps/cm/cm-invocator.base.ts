import { FileStore } from 'back/complect/FileStorage';
import { SokiInvocatorBaseServer } from 'back/SokiInvocatorBase.server';
import { CmComWid, IExportableCat, IExportableCom } from 'shared/api';
import { CmComSokiInvocatorMethods } from 'shared/api/invocators/cm/cm-invocators';
import { WebSocket } from 'ws';
import { cmServerInvocatorMethods } from './cm-invocator';

const comsData = new FileStore<IExportableCom[]>('/apps/cm/coms.json', []);
const catsData = new FileStore<IExportableCat[]>('/apps/cm/cats.json', []);

class CmComSokiInvocatorBaseServer extends SokiInvocatorBaseServer<CmComSokiInvocatorMethods> {}

const changeCom = async (comw: CmComWid, client: WebSocket, mapper: (com: IExportableCom) => void) => {
  const com = comsData.getValue().find(com => com.w === comw);

  if (com === undefined) throw new Error(`Песня не найдена`);

  mapper(com);

  await cmServerInvocatorMethods.editedCom(null, com);
  comsData.saveValue();

  return com;
};

export const cmServerInvocatorBase = new CmComSokiInvocatorBaseServer('CmComSokiInvocatorBaseServer', {
  rename: client => async (comw, name) => changeCom(comw, client, com => (com.n = name)),
});
