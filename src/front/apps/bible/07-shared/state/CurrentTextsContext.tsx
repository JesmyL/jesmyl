import { BibleAddressTextContext, BibleTextContentContext } from '../contexts/texts';
import { useBibleBroadcastJoinAddress } from '../hooks/address/address';
import { useBibleAddressBooki } from '../hooks/address/books';
import { useBibleAddressChapteri } from '../hooks/address/chapters';
import { useBibleAddressVersei } from '../hooks/address/verses';
import { useBibleShowSlideAddressCode } from '../hooks/slide-sync';
import { makeBibleJoinedAddressText } from '../hooks/texts';
import { useBibleSlideText } from '../hooks/useBibleSlideText';

interface Props {
  children?: React.ReactNode;
  isPreview: boolean | und;
}

export const BibleCurrentTextsContext = (props: Props) => {
  const booki = useBibleAddressBooki();
  const chapteri = useBibleAddressChapteri();
  const versei = useBibleAddressVersei();
  const actualJoinAddress = useBibleBroadcastJoinAddress();
  const showAddressCode = useBibleShowSlideAddressCode();

  const addressCode = props.isPreview ? (actualJoinAddress ?? [booki, chapteri, versei]) : showAddressCode;
  const addressText = makeBibleJoinedAddressText(addressCode);
  const slideText = useBibleSlideText(addressCode);

  return (
    <BibleTextContentContext value={slideText}>
      <BibleAddressTextContext value={addressText}>{props.children}</BibleAddressTextContext>
    </BibleTextContentContext>
  );
};
