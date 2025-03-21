import { useBibleTranslationJoinAddress } from '$bible/basis/lib/hooks/address/address';
import { useBibleAddressBooki } from '$bible/basis/lib/hooks/address/books';
import { useBibleAddressChapteri } from '$bible/basis/lib/hooks/address/chapters';
import { useBibleAddressVersei } from '$bible/basis/lib/hooks/address/verses';
import { useBibleShowSlideAddressCode } from '$bible/basis/lib/hooks/slide-sync';
import { makeBibleJoinedAddressText } from '$bible/basis/lib/hooks/texts';
import { useBibleSlideText } from '$bible/basis/lib/hooks/useBibleSlideText';
import { BibleAddressTextContext, BibleTextContentContext } from '../lib/contexts/texts';

interface Props {
  children?: React.ReactNode;
  isPreview: boolean | und;
}

export const BibleCurrentTextsContext = (props: Props) => {
  const booki = useBibleAddressBooki();
  const chapteri = useBibleAddressChapteri();
  const versei = useBibleAddressVersei();
  const actualJoinAddress = useBibleTranslationJoinAddress();
  const showAddressCode = useBibleShowSlideAddressCode();

  const addressCode = props.isPreview ? (actualJoinAddress ?? [booki, chapteri, versei]) : showAddressCode;
  const addressText = makeBibleJoinedAddressText(addressCode);
  const slideText = useBibleSlideText(addressCode);

  return (
    <BibleTextContentContext.Provider value={slideText}>
      <BibleAddressTextContext.Provider value={addressText}>{props.children}</BibleAddressTextContext.Provider>
    </BibleTextContentContext.Provider>
  );
};
