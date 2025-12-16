import { isNumberSearchAtom } from '#basis/state/isNumberSearchAtom';
import { UsedWid, useWid } from '#shared/lib/hooks/useWid';
import { atom, Atom, useAtom, useAtomSet, useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import styled from 'styled-components';
import { twMerge } from 'tailwind-merge';
import { LazyIcon } from './the-icon/LazyIcon';

interface Props {
  termAtom?: Atom<string>;
  debouncedTermAtom?: Atom<string>;
  debounce?: number;
  placeholder?: string;
  className?: string;
}

const timeouts: PRecord<UsedWid, TimeOut> = {};
const defaultTermAtoms: PRecord<UsedWid, Atom<string>> = {};

export const DebouncedSearchInput = ({ debounce = 300, className = '', placeholder, ...props }: Props) => {
  const wid = useWid();
  const termAtom = props.termAtom ?? (defaultTermAtoms[wid] ??= atom(''));
  const debouncedTermAtom = props.debouncedTermAtom ?? props.termAtom ?? (defaultTermAtoms[wid] ??= atom(''));

  const [term, setTerm] = useAtom(termAtom);
  const setDebouncedTerm = useAtomSet(debouncedTermAtom);

  const isNumberSearch = useAtomValue(isNumberSearchAtom);

  useEffect(
    () => () => {
      delete defaultTermAtoms[wid];
      delete timeouts[wid];
    },
    [wid],
  );
  const iconName = isNumberSearch ? 'GridTable' : 'SearchVisual';

  return (
    <label className={twMerge('debounced-input flex gap-2', className)}>
      <LazyIcon
        className="pointer"
        icon={iconName}
        onClick={isNumberSearchAtom.do.toggle}
      />
      <StyledInput
        key={iconName}
        id="debounced-input"
        type={isNumberSearch ? 'tel' : 'text'}
        value={term}
        className="input"
        placeholder={placeholder}
        onChange={event => {
          const term = event.currentTarget.value;
          setTerm(term);

          if (!debounce || debouncedTermAtom === termAtom) return;

          clearTimeout(timeouts[wid]);
          timeouts[wid] = setTimeout(setDebouncedTerm, debounce, term);
        }}
        onFocus={event => event.currentTarget.select()}
      />
    </label>
  );
};

const StyledInput = styled.input`
  --text-color: var(--color--3);

  &::placeholder {
    color: var(--color--4);
  }
`;
