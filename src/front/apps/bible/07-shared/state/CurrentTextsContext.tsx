import { BibleAddressTextContext, BibleTextMapBlocksContentContext } from '../contexts/texts';
import { useBibleBroadcastJoinAddress } from '../hooks/address/address';
import { useBibleAddressBooki } from '../hooks/address/books';
import { useBibleAddressChapteri } from '../hooks/address/chapters';
import { useBibleAddressVersei } from '../hooks/address/verses';
import { useBibleShowSlideAddressCode } from '../hooks/slide-sync';
import { makeBibleJoinedAddressText } from '../hooks/texts';
import { useBibleSlideMapBlocks } from '../hooks/useBibleSlideText';
import { useBibleCurrentLangi } from './atoms';

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

  const addressCode = props.isPreview ? (actualJoinAddress[0] ?? [booki, chapteri, versei]) : showAddressCode;
  const langi = useBibleCurrentLangi();
  const addressText = makeBibleJoinedAddressText(langi, addressCode);
  const slideText = useBibleSlideMapBlocks(addressCode);

  return (
    <BibleTextMapBlocksContentContext value={slideText}>
      <BibleAddressTextContext value={addressText}>{props.children}</BibleAddressTextContext>
    </BibleTextMapBlocksContentContext>
  );
};
