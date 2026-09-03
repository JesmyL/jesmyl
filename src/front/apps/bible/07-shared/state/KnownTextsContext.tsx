import { BibleAddressTextContext, BibleTextMapBlocksContentContext } from '../contexts/texts';
import { BibleBroadcastTextMapBlock } from '../model/base';

export const BibleBroadcastScreenKnownTextsContext = ({
  addressText,
  texts,
  children,
}: {
  addressText: string;
  texts: BibleBroadcastTextMapBlock[];
  children?: React.ReactNode;
}) => {
  return (
    <BibleTextMapBlocksContentContext value={texts}>
      <BibleAddressTextContext value={addressText}>{children}</BibleAddressTextContext>
    </BibleTextMapBlocksContentContext>
  );
};
