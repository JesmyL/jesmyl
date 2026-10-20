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
    confirm={
      <>{props.value ? translateBase(BaseLocaleKey.CmEditorComFlat) : translateBase(BaseLocaleKey.CmEditorComSharp)}</>
    }
    postfix={
      <>
        {translateBase(BaseLocaleKey.CmEditorTonalityTypeIs)}{' '}
        <span className="text-x7">
          {props.value ? translateBase(BaseLocaleKey.CmEditorFlat) : translateBase(BaseLocaleKey.CmEditorSharp)}
        </span>
      </>
    }
    onClick={() => props.onChange(takeCmComToggledTonType(props.value))}
  />
);
