import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';

export const CmEditorComEditBemoled = (props: { value: num | nil; onChange: (isBemoled: num) => Promise<unknown> }) => (
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
    onClick={() => props.onChange(props.value === 1 ? 0 : 1)}
  />
);
