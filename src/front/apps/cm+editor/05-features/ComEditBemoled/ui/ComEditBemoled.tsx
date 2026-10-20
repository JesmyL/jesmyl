import { translateBase } from '#basis/locale';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { takeCmComToggledTonType, TonType } from 'shared/const/cm/enums';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';

export const CmEditorComEditBemoled = (props: {
  value: TonType | nil;
  onChange: (isBemoled: TonType) => Promise<unknown>;
}) => (
  <TheIconButton
    icon="Grid"
    confirm={<>{translateBase(it => (props.value ? it[BaseLocaleKey.CmEditorComFlat] : it[BaseLocaleKey.CmEditorComSharp]))}</>}
    postfix={
      <>
        {translateBase(BaseLocaleKey.CmEditorTonalityTypeIs)}{' '}
        <span className="text-x7">
          {translateBase(it => (props.value ? it[BaseLocaleKey.CmEditorFlat] : it[BaseLocaleKey.CmEditorSharp]))}
        </span>
      </>
    }
    onClick={() => props.onChange(takeCmComToggledTonType(props.value))}
  />
);
