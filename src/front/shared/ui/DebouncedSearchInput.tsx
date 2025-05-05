import { isNumberSearchAtom } from '#basis/lib/atoms/isNumberSearchAtom';
import { UsedWid, useWid } from '#shared/lib/hooks/useWid';
import { atom, Atom, useAtom, useAtomSet, useAtomToggle, useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import styled, { css } from 'styled-components';
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
  const isNumberSearchToggle = useAtomToggle(isNumberSearchAtom);

  useEffect(
    () => () => {
      delete defaultTermAtoms[wid];
      delete timeouts[wid];
    },
    [wid],
  );
  const iconName = isNumberSearch ? 'GridTable' : 'SearchVisual';

  return (
    <label className={`debounced-input flex gap-2 ${className}`}>
      <LazyIcon
        className="pointer"
        icon={iconName}
        onClick={() => isNumberSearchToggle()}
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
      />
      <StyledCloseIcon
        $term={term}
        className="pointer"
        icon="Cancel01"
        onClick={() => {
          setTerm('');
          setDebouncedTerm('');
        }}
      />
    </label>
  );
};

const StyledInput = styled.input`
  --text-color: var(--color-x3);

  &::placeholder {
    color: var(--color-x4);
  }
`;

const StyledCloseIcon = styled(LazyIcon)<{ $term: string }>`
  opacity: 0;
  pointer-events: none;
  scale: 0.8;
  transition: opacity 0.1s;

  ${props =>
    props.$term &&
    css`
      opacity: 1;
      pointer-events: all;
    `}
`;
