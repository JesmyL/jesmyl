import { translateEditorBase } from '#basis/locale';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { takeCmComToggledTonType, TonType } from 'shared/const/cm/enums';
import { EditorLocaleKey } from 'shared/model/+locale/_EditorLocaleKey';

export const CmEditorComEditBemoled = (props: {
  value: TonType | nil;
  onChange: (isBemoled: TonType) => Promise<unknown>;
}) => (
  <TheIconButton
    icon="Grid"
    confirm={
      <>{props.value ? translateEditorBase(EditorLocaleKey.CmEditorComFlat) : translateEditorBase(EditorLocaleKey.CmEditorComSharp)}</>
    }
    postfix={
      <>
        {translateEditorBase(EditorLocaleKey.CmEditorTonalityTypeIs)}{' '}
        <span className="text-x7">
          {props.value ? translateEditorBase(EditorLocaleKey.CmEditorFlat) : translateEditorBase(EditorLocaleKey.CmEditorSharp)}
        </span>
      </>
    }
    onClick={() => props.onChange(takeCmComToggledTonType(props.value))}
  />
);
