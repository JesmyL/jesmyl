import { CmComOrderWidClass } from '#shared/model/cm/order/OrderWid';
import { ICmComOrderExportableMe } from '#shared/model/cm/order/regions';
import { IExportableComInterpretation, IExportableOrder } from 'shared/api';

export const cmComOrderCheckIsOrdVisibleInInterpretation = (
  ordTop: IExportableOrder,
  comInterpretation: IExportableComInterpretation | nil,
) => {
  const visibilityValue = comInterpretation?.o?.[ordTop.w]?.v;
  return visibilityValue === 1 || (ordTop.v !== 0 && visibilityValue !== 0);
};

export const cmComOrderGetWithExtendableFields = <OrderConstructor extends CmComOrderWidClass<OrderConstructor>>(
  source: ICmComOrderExportableMe<OrderConstructor> | und,
  target: ICmComOrderExportableMe<OrderConstructor>,
): ICmComOrderExportableMe<OrderConstructor> => ({ ...source, ...target, top: { ...source?.top, ...target.top } });
