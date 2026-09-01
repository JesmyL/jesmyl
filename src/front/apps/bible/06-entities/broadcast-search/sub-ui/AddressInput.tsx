import { Atom, atom, useAtomValue } from 'atomaric';
import { useBibleBroadcastSearchTransformAddressTermToAddress } from '../lib/transformers';
import { BibleBroadcastSearchPanelInput } from './Input';

interface Props {
  inputRef: React.RefObject<(HTMLInputElement & HTMLTextAreaElement) | null>;
}

let termAtom: Atom<string>;

export const BibleBroadcastSearchPanelAddressInput = ({ inputRef }: Props) => {
  termAtom ??= atom('', 'bible:addressTerm');

  const addressTerm = useAtomValue(termAtom);
  const address = useBibleBroadcastSearchTransformAddressTermToAddress(addressTerm, inputRef);

  return (
    <div className="relative w-full">
      <BibleBroadcastSearchPanelInput
        inputRef={inputRef}
        term={addressTerm}
        onChange={termAtom.set}
      />
      <div className="left-0 absolute mt-[1em] mx-auto nowrap flex text-center justify-center">{address}</div>
    </div>
  );
};
