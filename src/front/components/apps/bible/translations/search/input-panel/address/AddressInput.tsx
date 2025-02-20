import { bibleIDB } from 'front/components/apps/bible/_db/bibleIDB';
import { BibleSearchPanelInput } from '../../../../shared/translations/ui/Input';
import { useBibleTransformAddressTermToAddress } from './hooks/transformers';

interface Props {
  inputRef: React.RefObject<HTMLInputElement>;
}

const onChange = (event: React.ChangeEvent<HTMLInputElement>) => bibleIDB.set.addressTerm(event.target.value);

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
