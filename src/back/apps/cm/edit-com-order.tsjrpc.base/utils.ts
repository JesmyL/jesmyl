import { ServerTSJRPCTool } from 'back/tsjrpc.base.server';
import { CmComOrderWid, CmComWid, IExportableOrder, IServerSideCom } from 'shared/api';
import { checkIsNil } from 'shared/utils/checkIs';
import { objectLength } from 'shared/utils/object.utils';
import { modifyCom } from '../edit-com.tsjrpc.base';

export function modifyOrd<Props extends { ordw: CmComOrderWid; comw: CmComWid }>(
  modifier: (ord: IExportableOrder, props: Props, tool: ServerTSJRPCTool, com: IServerSideCom) => string | null,
) {
  return modifyCom<Props>((com, props, tool) => {
    const ord = com.o?.find(o => o.w === props.ordw);

    if (checkIsNil(ord)) throw new Error('Порядковый блок не найден');

    return modifier(ord, props, tool, com);
  });
}

export const getNextOrdWid = (ords: { w: CmComOrderWid }[]) =>
  ords.reduce((max, curr) => (curr.w > max ? curr.w : max), CmComOrderWid.def) + 1;

export const clearNullableOrderInheritValues = (ord: IExportableOrder, key: '_r' | '_v') => {
  if (checkIsNil(ord[key])) return;

  while (objectLength(ord[key]) && checkIsNil(ord[key][objectLength(ord[key]) - 1])) ord[key].pop();

  if (!objectLength(ord[key])) delete ord[key];
};
