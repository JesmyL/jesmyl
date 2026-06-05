import { CmComOrderWidClass } from '$cm/entities/com-order/lib/OrderWid';
import { ICmComOrderExportableMe } from '$cm/ext';
import { IExportableComInterpretation, IExportableOrder } from 'shared/api';

export const cmComOrderCheckIsOrdVisibleInInterpretation = (
  ordTop: IExportableOrder,
  comInterpretation: IExportableComInterpretation | nil,
) => {
  const visibilityValue = comInterpretation?.o?.[ordTop.w]?.v;
  return visibilityValue === 1 ? true : ordTop.v !== 0 && visibilityValue !== 0;
};

export const cmComOrderGetWithExtendableFields = <OrderConstructor extends CmComOrderWidClass<OrderConstructor>>(
  source: ICmComOrderExportableMe<OrderConstructor> | und,
  target: ICmComOrderExportableMe<OrderConstructor>,
): ICmComOrderExportableMe<OrderConstructor> => ({ ...source, ...target, top: { ...source?.top, ...target.top } });
