import { ServerTSJRPCTool } from 'back/tsjrpc.base.server';
import { CmComMod, CmComOrderWid, CmComWid, IExportableOrder, IServerSideCom } from 'shared/api';
import { CmCom } from 'shared/const/cm/Com';
import { CmComOrder } from 'shared/const/cm/order/Order';
import { checkIsNil } from 'shared/utils/checkIs';
import { objectLength } from 'shared/utils/object.utils';
import { modifyCom } from '../edit-com.tsjrpc.base';

export const enum ModifyOrdParent {
  Self,
  LeadOrSelf,
  TargetOrSelf,
  WatchOrSelf,

  Lead = 11,
  Target,
  Watch,
}

export const modifyOrd = <Props extends { ordw: CmComOrderWid; comw: CmComWid }>(
  parent: ModifyOrdParent,
  modifier: (
    ord: IExportableOrder,
    props: Props,
    tool: ServerTSJRPCTool,
    com: IServerSideCom,
    getCmComOrd: () => CmComOrder,
    getCmCom: () => CmCom,
    getCmComOrds: () => CmComOrder[],
  ) => string | null,
) =>
  modifyCom<Props>((com, props, tool) => {
    let cmCom: CmCom | nil;
    let comOrds: CmComOrder[] | nil;
    let cmOrd: CmComOrder | nil;
    let ord = com.o?.find(o => o.w === props.ordw);

    const getCmCom = () => (cmCom ??= new CmCom({ ...com, m: CmComMod.def, w: CmComWid.def, al: [] }, null, null));
    const getCmComOrds = () => (comOrds ??= getCmCom().setOrders() ?? []);

    let getCmComOrd = () => {
      cmOrd ??= getCmComOrds()?.find(ord => ord.wid === props.ordw);
      if (checkIsNil(cmOrd)) throw 'Порядковый блок не найден (при поиске по собственному ID)';
      const cmComOrd = cmOrd;
      getCmComOrd = () => cmComOrd;
      return cmOrd;
    };

    if (parent === ModifyOrdParent.LeadOrSelf || parent === ModifyOrdParent.Lead)
      ord ??= getCmComOrd().me.leadOrd?.me.source?.top;

    if (parent === ModifyOrdParent.TargetOrSelf || parent === ModifyOrdParent.Target)
      ord ??= getCmComOrd().me.targetOrd?.me.source?.top;

    if (parent === ModifyOrdParent.WatchOrSelf || parent === ModifyOrdParent.Watch)
      ord ??= getCmComOrd().me.watchOrd?.me.source?.top;

    if (!ord && parent > 10) throw `Не найден определённый родительский блок ${parent}`;

    ord ??= getCmComOrd().me.top;

    if (checkIsNil(ord)) throw 'Порядковый блок не найден';

    return modifier(ord, props, tool, com, getCmComOrd, getCmCom, getCmComOrds);
  });

export const getNextOrdWid = (ords: { w: CmComOrderWid }[]) =>
  ords.reduce((max, curr) => (curr.w > max ? curr.w : max), CmComOrderWid.def) + 1;

export const clearNullableOrderInheritValues = (ord: IExportableOrder, key: '_r' | '_v') => {
  if (checkIsNil(ord[key])) return;

  while (objectLength(ord[key]) && checkIsNil(ord[key].at(-1))) ord[key].pop();

  if (!objectLength(ord[key])) delete ord[key];
};
