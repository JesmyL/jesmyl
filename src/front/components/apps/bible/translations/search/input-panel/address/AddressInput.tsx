import { bibleIDB } from '$bible/_db/bibleIDB';
import { BibleSearchPanelInput } from '../Input';
import { useBibleTransformAddressTermToAddress } from './hooks/transformers';

interface Props {
  inputRef: React.RefObject<HTMLInputElement | null>;
}

const onChange = (event: React.ChangeEvent<HTMLInputElement | null>) => bibleIDB.set.addressTerm(event.target.value);

export const BibleSearchPanelAddressInput = ({ inputRef }: Props) => {
  const addressTerm = bibleIDB.useValue.addressTerm();
  const address = useBibleTransformAddressTermToAddress(addressTerm, inputRef);

  return (
    <>
      <BibleSearchPanelInput
        inputRef={inputRef}
        term={addressTerm}
        onChange={onChange}
      />
      <div className="full-width">{address}</div>
    </>
  );
};
