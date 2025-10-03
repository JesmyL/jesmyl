import { BibleAddressTextContext, BibleTextContentContext } from '../lib/contexts/texts';

export const BibleTranslationScreenKnownTextsContext = ({
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
