import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { TonType } from 'shared/const/cm/enums';

export const CmEditorComEditBemoled = (props: {
  value: TonType | nil;
  onChange: (isBemoled: TonType) => Promise<unknown>;
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
        Тип тональности - <span className="text-x7">{props.value ? 'бемольная' : 'диезная'}</span>
      </>
    }
    onClick={() => props.onChange(props.value === TonType.Diezed ? TonType.Bemoled : TonType.Diezed)}
  />
);
