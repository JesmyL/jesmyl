import { isNumberSearchAtom } from '#basis/lib/atoms/isNumberSearchAtom';
import { useAtomToggle, useAtomValue } from '#shared/lib/atoms';
import { useMemo } from 'react';
import styled from 'styled-components';
import { KeyboardInputPropsType } from './keyboard/Keyboard.model';
import { LazyIcon } from './the-icon/LazyIcon';

interface Props {
  initialTerm?: string;
  debounce?: number;
  onSearch?: (term: string) => void;
  onIconClick?: (term: string) => void;
  onDebounced?: (term: string) => void;
  onTermChange?: (term: string) => void;
  placeholder?: string;
  withoutIcon?: boolean;
  className?: string;
  type?: KeyboardInputPropsType;
}

export const DebouncedSearchInput = (props: Props) => {
  const { initialTerm = '', onSearch, onDebounced, debounce, onTermChange, withoutIcon, className } = props;
  const timeout = useMemo((): { val?: TimeOut } => ({}), []);
  const isNumberSearch = useAtomValue(isNumberSearchAtom);
  const isNumberSearchToggle = useAtomToggle(isNumberSearchAtom);

  return (
    <div className={`debounced-input ${className}`}>
      {withoutIcon || (
        <LazyIcon
          className="pointer"
          icon={isNumberSearch ? 'GridTable' : 'SearchVisual'}
          onClick={() => isNumberSearchToggle()}
        />
      )}
      <StyledIinput
        type={isNumberSearch ? 'tel' : 'text'}
        value={initialTerm}
        className="input"
        placeholder={props.placeholder}
        onChange={event => {
          const term = event.currentTarget.value;
          onSearch?.(term);

          if (debounce) {
            clearTimeout(timeout.val);
            timeout.val = setTimeout(() => {
              onDebounced?.(term);
              onTermChange?.(term);
            }, debounce);
          } else onTermChange?.(term);
        }}
      />
    </div>
  );
};

const StyledIinput = styled.input`
  --text-color: var(--color-x3);

  &::placeholder {
    color: var(--color-x4);
  }
`;
