import { atom, useAtomToggle, useAtomValue } from '#shared/lib/atoms';
import { useMemo } from 'react';
import { KeyboardInputPropsType } from './keyboard/Keyboard.model';
import { KeyboardInput } from './keyboard/KeyboardInput';
import { LazyIcon } from './the-icon/LazyIcon';

const isNumberSearchAtom = atom(false);
export const useIsNumberSearch = () => useAtomValue(isNumberSearchAtom);

export function DebouncedSearchInput(props: {
  initialTerm?: string;
  debounce?: number;
  onSearch?: (term: string, isNumberSearch: boolean) => void;
  onIconClick?: (term: string) => void;
  onDebounced?: (term: string) => void;
  onTermChange?: (term: string) => void;
  placeholder?: string;
  withoutIcon?: boolean;
  className?: string;
  type?: KeyboardInputPropsType;
}) {
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
      <KeyboardInput
        type={isNumberSearch ? 'number' : 'text'}
        value={initialTerm}
        className="input"
        placeholder={props.placeholder}
        onChange={term => {
          onSearch?.(term, isNumberSearch);

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
}
