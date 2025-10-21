import { BibleAddressTextContext, BibleTextContentContext } from '../contexts/texts';

export const BibleBroadcastScreenKnownTextsContext = ({
  addressText,
  text,
  children,
}: {
  addressText: string;
  text: string;
  children?: React.ReactNode;
}) => {
  return (
    <BibleTextContentContext value={text}>
      <BibleAddressTextContext value={addressText}>{children}</BibleAddressTextContext>
    </BibleTextContentContext>
  );
};
