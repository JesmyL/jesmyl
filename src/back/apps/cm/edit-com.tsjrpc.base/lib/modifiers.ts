import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import { ServerTSJRPCTool } from 'back/tsjrpc.base.server';
import { CmComWid, IExportableCom, IServerSideCom } from 'shared/api';
import { mapCmImportableToExportableCom } from '../../complect/tools';
import { comsDirStorage } from '../../file-stores';
import { cmShareServerTsjrpcMethods } from '../../tsjrpc.shares';

const und = undefined;
const comBlank: Record<keyof IExportableCom, und> = {
  w: und,
  m: und,
  n: und,
  b: und,
  bpm: und,
  d: und,
  s: und,
  nl: und,
  l: und,
  p: und,
  al: und,
  t: und,
  c: und,
  o: und,
  ton: und,
  a: und,
  isRemoved: und,
};

export function modifyCom<Props extends { comw: CmComWid }>(
  mapper: (com: IServerSideCom, props: Props, tool: ServerTSJRPCTool) => string | null,
) {
  return async (props: Props, tool: ServerTSJRPCTool) => {
    if (throwIfNoUserScopeAccessRight(tool.auth?.login, 'cm', 'COM', 'U')) throw '';

    const com = comsDirStorage.getItem(props.comw);

    if (com == null) throw new Error(`Песня не найдена`);
    if (!com.n) throw new Error(`У песни нет названия`);

    delete com.a;
    delete (com as { m?: 0 }).m;

    const comName = com.n;
    const description = mapper(com, props, tool);

    const mod = comsDirStorage.saveItem(props.comw, { ...comBlank, ...com }) ?? 0;
    const expCom = mapCmImportableToExportableCom(com);

    cmShareServerTsjrpcMethods.editedCom({ com: expCom, mod }, null);

    return { value: expCom, description: description ? `Песня "${comName}" - ${description}` : null };
  };
}
