import { translateBase } from '#basis/locale';
import { useCmComCurrent } from '$cm/entities/com';
import { cmIDB } from '$cm/ext';
import { MenuComToolName } from 'shared/api';
import { takeCmComToggledTonType } from 'shared/const/cm/enums';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { CmComTool } from '../ComTool';

export const CmComToolBemoledChords = () => {
  const ccom = useCmComCurrent();
  const comw = ccom?.wid;

  return (
    <CmComTool
      title={translateBase(it => it[BaseLocaleKey.CmMarkComTool][MenuComToolName.BemoledChords])}
      icon="Grid"
      onClick={
        comw
          ? () =>
              cmIDB.updateComFix(comw, fix => {
                fix.b = takeCmComToggledTonType(ccom.isBemoled);
              })
          : undefined
      }
    />
  );
};
