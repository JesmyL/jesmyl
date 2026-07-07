import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { Bool } from 'shared/enums';

export const CmEditorComEditBemoled = (props: {
  value: Bool | nil;
  onChange: (isBemoled: Bool) => Promise<unknown>;
}) => (
  <TheIconButton
    icon="Grid"
    confirm={
      <>
        Сделать песню <span className="text-x7">{props.value ? 'диезной' : 'бемольной'}</span>?
      </>
    }
    postfix={
      <>
        <span className="text-x7">{props.value ? 'Бемольная' : 'Диезная'}</span> песня
      </>
    }
    onClick={() => props.onChange(props.value === Bool.True ? Bool.False : Bool.True)}
  />
);
