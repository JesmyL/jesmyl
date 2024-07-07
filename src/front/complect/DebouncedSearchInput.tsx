import { useMemo } from 'react';
import { IconGridTableStrokeRounded } from '../complect/the-icon/icons/grid-table';
import { IconSearchVisualStrokeRounded } from '../complect/the-icon/icons/search-visual';
import { atom, useAtomToggle, useAtomValue } from './atoms';
import { KeyboardInputPropsType } from './keyboard/Keyboard.model';
import KeyboardInput from './keyboard/KeyboardInput';
import IconButton from './the-icon/IconButton';

const isNumberSearchAtom = atom(false);
export const useIsNumberSearch = () => useAtomValue(isNumberSearchAtom);

export default function DebouncedSearchInput(props: {
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
        <IconButton
          Icon={isNumberSearch ? IconGridTableStrokeRounded : IconSearchVisualStrokeRounded}
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
