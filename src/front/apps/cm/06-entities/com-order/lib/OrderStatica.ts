import { ICmComOrderExportableMe } from '$cm/ext';
import { IExportableComInterpretation, IExportableOrder } from 'shared/api';
import { CmComOrderWidClass } from './OrderWid';

export class CmComOrderStatica {
  static checkIsOrdVisibleInInterpretation = (
    ordTop: IExportableOrder,
    comInterpretation: IExportableComInterpretation | nil,
  ) => {
    const visibilityValue = comInterpretation?.o?.[ordTop.w]?.v;
    return visibilityValue === 1 ? true : ordTop.v !== 0 && visibilityValue !== 0;
  };

  static getWithExtendableFields<OrderConstructor extends CmComOrderWidClass<OrderConstructor>>(
    source: ICmComOrderExportableMe<OrderConstructor> | und,
    target: ICmComOrderExportableMe<OrderConstructor>,
  ): ICmComOrderExportableMe<OrderConstructor> {
    return { ...source, ...target, top: { ...source?.top, ...target.top } };
  }
}
