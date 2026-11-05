import { SearchMode, searchModeAtom } from '#basis/state/isNumberSearchAtom';
import { usePastedLinkNavigation } from '#shared/lib/link-app-actions/usePastedLinkNavigation';
import { atom, Atom, useAtomValue } from 'atomaric';
import { useEffect, useId } from 'react';
import { twMerge } from 'tailwind-merge';
import { LazyIcon } from './the-icon/LazyIcon';
import { WithAtomValue } from './WithAtomValue';

interface Props {
  termAtom?: Atom<string>;
  debouncedTermAtom?: Atom<string>;
  debounce?: number;
  placeholder?: string;
  className?: string;
  withSmartSearch?: boolean;
  smartNode?: React.ReactNode;
}

const timeouts: PRecord<string, TimeOut> = {};
const defaultTermAtoms: PRecord<string, Atom<string>> = {};

export const DebouncedSearchInput = ({
  debounce = 300,
  className = '',
  placeholder,
  withSmartSearch,
  smartNode,
  ...props
}: Props) => {
  const id = useId();
  const searchMode = useAtomValue(searchModeAtom);
  const isSmartSearchAllowed = withSmartSearch === true;
  const mode = isSmartSearchAllowed || searchMode !== SearchMode.Smart ? searchMode : SearchMode.Text;
  const isNumberSearch = mode === SearchMode.Number;
  const termAtom = props.termAtom ?? (defaultTermAtoms[id] ??= atom(''));
  const debouncedTermAtom = props.debouncedTermAtom ?? props.termAtom ?? (defaultTermAtoms[id] ??= atom(''));

  const iconName = mode === SearchMode.Smart ? 'Flash' : isNumberSearch ? 'GridTable' : 'SearchVisual';
  const { onPaste, appActionNavNode } = usePastedLinkNavigation(undefined, () => {
    clearTimeout(timeouts[id]);
    termAtom.set('');
    if (debouncedTermAtom !== termAtom) debouncedTermAtom.set('');
  });

  const cycleSearchMode = () => {
    const nextMode =
      mode === SearchMode.Text
        ? SearchMode.Number
        : mode === SearchMode.Number && isSmartSearchAllowed
          ? SearchMode.Smart
          : SearchMode.Text;

    if (nextMode === SearchMode.Smart) {
      clearTimeout(timeouts[id]);
      termAtom.set('');
      if (debouncedTermAtom !== termAtom) debouncedTermAtom.set('');
    }

    searchModeAtom.set(nextMode);
  };

  useEffect(
    () => () => {
      delete defaultTermAtoms[id];
      delete timeouts[id];
    },
    [id],
  );

  return (
    <label className={twMerge('debounced-input flex min-w-0 gap-2', className)}>
      <LazyIcon
        className="pointer"
        icon={iconName}
        onClick={cycleSearchMode}
      />
      {mode === SearchMode.Smart && smartNode ? (
        smartNode
      ) : (
        <WithAtomValue atom={termAtom}>
          {term => (
            <input
              key={iconName}
              id="debounced-input"
              type={isNumberSearch ? 'tel' : 'text'}
              value={term}
              className="input"
              placeholder={placeholder}
              onPaste={onPaste}
              onFocus={event => event.currentTarget.select()}
              onChange={event => {
                const term = event.currentTarget.value;
                termAtom.set(term);

                if (!debounce || debouncedTermAtom === termAtom) return;

                clearTimeout(timeouts[id]);
                timeouts[id] = setTimeout(debouncedTermAtom.set, debounce, term);
              }}
            />
          )}
        </WithAtomValue>
      )}
      {appActionNavNode}
    </label>
  );
};
