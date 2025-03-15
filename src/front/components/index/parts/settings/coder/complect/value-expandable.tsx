import { CopyTextButton } from '#shared/ui/CopyTextButton';
import { useIsRememberExpand } from '#shared/ui/expand/useIsRememberExpand';
import { useToast } from '#shared/ui/modal/useToast';
import { ReactNode } from 'react';
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
  const toast = useToast();

  return (
    <>
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
