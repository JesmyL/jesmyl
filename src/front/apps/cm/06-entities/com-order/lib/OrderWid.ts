import { SourceBased } from '#shared/lib/SourceBased';
import { ICmComOrderExportableMe } from '$cm/ext';
import { CmComOrderWid, IExportableOrder } from 'shared/api';

export class CmComOrderWidClass<
  OrderConstructor extends CmComOrderWidClass<OrderConstructor>,
> extends SourceBased<IExportableOrder> {
  me: ICmComOrderExportableMe<OrderConstructor>;

  constructor(me: ICmComOrderExportableMe<OrderConstructor>) {
    super(me.top);

    this.me = me;
  }

  get isEmptyHeader() {
    return this.getBasic('e');
  }

  get wid(): CmComOrderWid {
    if (this.me.leadOrd != null && this.me.watchOrd != null)
      return this.me.leadOrd.me.top.w + this.me.watchOrd.me.top.w / 100;

    return this.me.source?.top.w ?? this.top.w;
  }
}
