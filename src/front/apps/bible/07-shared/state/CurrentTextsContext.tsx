import { BibleAddressTextContext, BibleTextMapBlocksContentContext } from '../contexts/texts';
import { useBibleBroadcastJoinAddress } from '../hooks/address/join.address';
import { useBibleSimpleCheckedSingleAddress } from '../hooks/address/simple.address';
import { useBibleShowSlideAddressCode } from '../hooks/slide-sync';
import { makeBibleJoinedAddressText } from '../hooks/texts';
import { useBibleSlideMapBlocks } from '../hooks/useBibleSlideText';
import { useBibleCurrentLangi } from '../lib/useBibleCurrentLangi';

interface Props {
  children?: React.ReactNode;
  isPreview: boolean | und;
}

export const BibleCurrentTextsContext = (props: Props) => {
  const [currentBooki, currentChapteri, currentVersei] = useBibleSimpleCheckedSingleAddress();
  const actualJoinAddress = useBibleBroadcastJoinAddress();
  const showAddressCode = useBibleShowSlideAddressCode();

  const addressCode = props.isPreview
    ? (actualJoinAddress[0] ?? [currentBooki, currentChapteri, currentVersei])
    : showAddressCode;

  const langi = useBibleCurrentLangi();
  const addressText = makeBibleJoinedAddressText(langi, addressCode);
  const slideText = useBibleSlideMapBlocks(addressCode);

  return (
    <BibleTextMapBlocksContentContext value={slideText}>
      <BibleAddressTextContext value={addressText}>{props.children}</BibleAddressTextContext>
    </BibleTextMapBlocksContentContext>
  );
};
