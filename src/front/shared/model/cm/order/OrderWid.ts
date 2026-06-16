import { SourceBased } from '#shared/const/SourceBased';
import { ICmComOrderExportableMe } from '#shared/model/cm/order/regions';
import { CmComOrderWid, IExportableOrder } from 'shared/api';

export class CmComOrderWidClass<
  OrderConstructor extends CmComOrderWidClass<OrderConstructor>,
> extends SourceBased<IExportableOrder> {
  me: ICmComOrderExportableMe<OrderConstructor>;
  i?: number;

  constructor(me: ICmComOrderExportableMe<OrderConstructor>) {
    super(me.top);

    this.me = me;
  }

  get isEmptyHeader() {
    return this.top.e;
  }

  get wid(): CmComOrderWid {
    if (this.me.leadOrd != null && this.me.watchOrd != null)
      return this.me.leadOrd.me.top.w + this.me.watchOrd.me.top.w / 100;

    return this.me.source?.top.w ?? this.top.w;
  }
}
