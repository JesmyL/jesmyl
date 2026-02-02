import { Atom, atom, useAtomValue } from 'atomaric';
import { useBibleBroadcastSearchTransformAddressTermToAddress } from '../lib/transformers';
import { BibleBroadcastSearchPanelInput } from './Input';

interface Props {
  inputRef: React.RefObject<HTMLInputElement | null>;
}

let termAtom: Atom<string>;
const onChange = (event: React.ChangeEvent<HTMLInputElement | null>) => termAtom.set(event.target.value);

export const BibleBroadcastSearchPanelAddressInput = ({ inputRef }: Props) => {
  termAtom ??= atom('', 'bible:addressTerm');

  const addressTerm = useAtomValue(termAtom);
  const address = useBibleBroadcastSearchTransformAddressTermToAddress(addressTerm, inputRef);

  return (
    <>
      <BibleBroadcastSearchPanelInput
        inputRef={inputRef}
        term={addressTerm}
        onChange={onChange}
      />
      <div className="w-full">{address}</div>
    </>
  );
};
