import { atom, useAtomValue } from 'atomaric';
import { BibleSearchPanelInput } from '../Input';
import { useBibleTransformAddressTermToAddress } from './hooks/transformers';

interface Props {
  inputRef: React.RefObject<HTMLInputElement | null>;
}

const termAtom = atom('', 'bible:addressTerm');
const onChange = (event: React.ChangeEvent<HTMLInputElement | null>) => termAtom.set(event.target.value);

export const BibleSearchPanelAddressInput = ({ inputRef }: Props) => {
  const addressTerm = useAtomValue(termAtom);
  const address = useBibleTransformAddressTermToAddress(addressTerm, inputRef);

  return (
    <>
      <BibleSearchPanelInput
        inputRef={inputRef}
        term={addressTerm}
        onChange={onChange}
      />
      <div className="w-full">{address}</div>
    </>
  );
};
