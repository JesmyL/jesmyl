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
    <BibleTextContentContext.Provider value={text}>
      <BibleAddressTextContext.Provider value={addressText}>{children}</BibleAddressTextContext.Provider>
    </BibleTextContentContext.Provider>
  );
};
