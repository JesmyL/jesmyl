import { ReactNode } from 'react';
import useToast from '../../../../../../04-widgets/modal/useToast';
import CopyTextButton from '../../../../../../07-shared/ui/CopyTextButton';
import { useIsRememberExpand } from '../../../../../../07-shared/ui/expand/useIsRememberExpand';
import { CoderResultNameStyled } from './styles';

interface Props {
  shortValue: string;
  fullValue: ReactNode;
  name?: string | number;
  onCopy: (() => string | nil) | null;
  scope: string;
}

const valueExpandableStyle = { marginLeft: 20 };

export const CoderValueExpandable = ({ shortValue, fullValue, name, onCopy, scope }: Props) => {
  const [, isExpand, setIsExpand] = useIsRememberExpand(scope);
  const [toastNode, toast] = useToast();

  return (
    <>
      {toastNode}
      <span
        onClick={() => setIsExpand()}
        className="flex pointer flex-gap flex-max"
      >
        {name != null && (
          <span>
            <CoderResultNameStyled>{name}: </CoderResultNameStyled>
          </span>
        )}
        {isExpand
          ? onCopy && (
              <>
                <span className="color--2">{shortValue}</span>
                <CopyTextButton
                  text={() => {
                    try {
                      return onCopy();
                    } catch (error) {
                      toast('' + error, { mood: 'ko' });
                    }
                  }}
                />
              </>
            )
          : shortValue}
      </span>
      {isExpand && <div style={valueExpandableStyle}>{fullValue}</div>}
    </>
  );
};
