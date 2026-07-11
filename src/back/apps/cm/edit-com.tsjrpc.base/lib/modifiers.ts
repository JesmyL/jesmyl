import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import { comDB } from 'back/drizzle.schema';
import { dbUpdate } from 'back/drizzle/drizzle.db';
import { selectPgCheckedExportableCom } from 'back/drizzle/ex/com.selectors';
import { ServerTSJRPCTool } from 'back/tsjrpc.base.server';
import { eq } from 'drizzle-orm';
import { CmComLangi, CmComWid, IExportableCom } from 'shared/api';
import { howMillisecondsInDay } from 'shared/const/ms';
import { IndexAppAccessRightTitles } from 'shared/model/index/access-rights';
import { checkIsString } from 'shared/utils/checkIs';
import { checkIsEq } from 'shared/utils/checkIsEq';
import { deepClone } from 'shared/utils/clone';
import { CRUDOperation } from 'shared/utils/index/utils';
import { forEachObjectEntries } from 'shared/utils/object.utils';
import { resetComwTiny, takeComwTiny } from '../../com.tiny';
import { cmShareServerTsjrpcMethods } from '../../tsjrpc.shares';

export const modifyCom =
  <Props extends { comw: CmComWid }>(
    rightsCheck:
      | keyof OmitOwn<IndexAppAccessRightTitles['cm'], 'info'>
      | [keyof OmitOwn<IndexAppAccessRightTitles['cm'], 'info'>, CRUDOperation],
    mapper: (partialCom: IExportableCom, props: Props, tool: ServerTSJRPCTool) => PromiseOr<string | nil>,
  ) =>
  async (props: Props, tool: ServerTSJRPCTool) => {
    if (await throwIfNoUserScopeAccessRight(tool.auth?.login, 'cm', 'COM', 'U')) throw '';

    const [scope, operator] = checkIsString(rightsCheck) ? [rightsCheck] : rightsCheck;
    if (await throwIfNoUserScopeAccessRight(tool.auth?.login, 'cm', scope, operator)) throw '';

    const com = await selectPgCheckedExportableCom(props.comw);

    if (!com) throw new Error(`Песня не найдена`);
    const comName = com.n;
    const comClone = deepClone(com);

    const description = await mapper(com, props, tool);

    const m = Date.now();

    com.o?.forEach(ord => {
      if (ord.cre != null && ord.cre < Date.now() - howMillisecondsInDay) delete ord.cre;
    });

    const comUpdates: Partial<IExportableCom> = {};
    let isChanged = false;

    forEachObjectEntries(com, (key, value) => {
      if (!checkIsEq(value, comClone[key])) {
        isChanged = true;
        comUpdates[key as never] = value as never;
        resetComwTiny(key as never, props.comw);
      }
    });

    if (isChanged) {
      await dbUpdate(comDB, { ...comUpdates, m, l: comUpdates.l ?? CmComLangi.Ru }, eq(comDB.w, props.comw));

      cmShareServerTsjrpcMethods.editedCom({ com, mod: m }, null);
    }

    return {
      value: props.comw,
      description: description
        ? `Песня ${((await takeComwTiny(props.comw))?.i ?? -1) + 1}. "${comName}" - ${description}`
        : null,
    };
  };
