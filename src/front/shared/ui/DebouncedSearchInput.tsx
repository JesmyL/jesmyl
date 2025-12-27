import { isNumberSearchAtom } from '#basis/state/isNumberSearchAtom';
import { atom, Atom, useAtomValue } from 'atomaric';
import { useEffect, useId } from 'react';
import styled from 'styled-components';
import { twMerge } from 'tailwind-merge';
import { LazyIcon } from './the-icon/LazyIcon';
import { WithAtomValue } from './WithAtomValue';

interface Props {
  termAtom?: Atom<string>;
  debouncedTermAtom?: Atom<string>;
  debounce?: number;
  placeholder?: string;
  className?: string;
}

const timeouts: PRecord<string, TimeOut> = {};
const defaultTermAtoms: PRecord<string, Atom<string>> = {};

export const DebouncedSearchInput = ({ debounce = 300, className = '', placeholder, ...props }: Props) => {
  const id = useId();
  const isNumberSearch = useAtomValue(isNumberSearchAtom);
  const termAtom = props.termAtom ?? (defaultTermAtoms[id] ??= atom(''));
  const debouncedTermAtom = props.debouncedTermAtom ?? props.termAtom ?? (defaultTermAtoms[id] ??= atom(''));

  const iconName = isNumberSearch ? 'GridTable' : 'SearchVisual';

  useEffect(
    () => () => {
      delete defaultTermAtoms[id];
      delete timeouts[id];
    },
    [id],
  );

  return (
    <label className={twMerge('debounced-input flex gap-2', className)}>
      <LazyIcon
        className="pointer"
        icon={iconName}
        onClick={isNumberSearchAtom.do.toggle}
      />
      <WithAtomValue atom={termAtom}>
        {term => (
          <StyledInput
            key={iconName}
            id="debounced-input"
            type={isNumberSearch ? 'tel' : 'text'}
            value={term}
            className="input"
            placeholder={placeholder}
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
    </label>
  );
};

const StyledInput = styled.input`
  --text-color: var(--color--3);

  &::placeholder {
    color: var(--color--4);
  }
`;
