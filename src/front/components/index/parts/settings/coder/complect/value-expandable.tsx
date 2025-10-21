import { CopyTextButton } from '#shared/ui/CopyTextButton';
import { useIsRememberExpand } from '#shared/ui/expand/useIsRememberExpand';
import { makeToastKOMoodConfig } from '#shared/ui/modal';
import { ReactNode } from 'react';
import { toast } from 'sonner';
import { StyledCoderResultName } from './styles';

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

  return (
    <>
      <span
        onClick={() => setIsExpand()}
        className="flex pointer gap-2 flex-max"
      >
        {name != null && (
          <span>
            <StyledCoderResultName>{name}: </StyledCoderResultName>
          </span>
        )}
        {isExpand
          ? onCopy && (
              <>
                <span className="text-x2">{shortValue}</span>
                <CopyTextButton
                  text={() => {
                    try {
                      return onCopy();
                    } catch (error) {
                      toast('' + error, makeToastKOMoodConfig());
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
