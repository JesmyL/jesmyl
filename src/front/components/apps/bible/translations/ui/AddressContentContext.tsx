import { useMemo } from 'react';
import { contextCreator } from '../../../../../shared/lib/contextCreator';
import { useBibleSimpleAddressText, useBibleTranslationJoinAddress } from '../../shared/translations/hooks/address';
import { useBibleCurrentBooki } from '../../shared/translations/hooks/books';
import { useBibleCurrentChapteri } from '../../shared/translations/hooks/chapters';
import { useBibleSlideSyncValue } from '../../shared/translations/hooks/slide-sync';
import { useBibleCurrentVersei } from '../../shared/translations/hooks/verses';
import { useBibleJoinedAddressText, useBibleJoinedSlideText, useBibleSingleSlideText } from '../hooks/texts';

const [AddressContext, useBibleAddressTextContext] = contextCreator('');
const [TextContext, useBibleTextContentContext] = contextCreator('');

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
    <TextContext.Provider value={text}>
      <AddressContext.Provider value={addressText}>{children}</AddressContext.Provider>
    </TextContext.Provider>
  );
};

export const BibleTranslationScreenTextsContext = (props: { children?: React.ReactNode; isPreview: boolean | und }) => {
  const booki = useBibleCurrentBooki();
  const chapteri = useBibleCurrentChapteri();
  const versei = useBibleCurrentVersei();
  const actualJoinAddress = useBibleTranslationJoinAddress();

  const text = useBibleSingleSlideText(booki, chapteri, versei);
  const singleAddress = useBibleSimpleAddressText(booki, chapteri, versei);
  const syncNum = useBibleSlideSyncValue();

  const joinAddress = useBibleJoinedAddressText(actualJoinAddress);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cachableJoinAddress = useMemo(() => actualJoinAddress, [syncNum]);

  const joinAddressCode = props.isPreview ? actualJoinAddress : cachableJoinAddress;
  const joinedText = useBibleJoinedSlideText(joinAddressCode);

  const { cachedJoinAddress, cachedSingleAddress, cachedJoinCode, cachedText, joinedCachedText } = useMemo(
    () => ({
      cachedJoinAddress: joinAddress,
      cachedSingleAddress: singleAddress,
      cachedJoinCode: actualJoinAddress,
      joinedCachedText: joinedText,
      cachedText: text,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [syncNum],
  );

  const address =
    (props.isPreview ? actualJoinAddress : cachedJoinCode) == null
      ? props.isPreview
        ? singleAddress
        : cachedSingleAddress
      : props.isPreview
        ? joinAddress
        : cachedJoinAddress;

  return (
    <TextContext.Provider
      value={
        joinAddressCode === null
          ? props.isPreview
            ? text
            : cachedText
          : props.isPreview
            ? joinedText
            : joinedCachedText
      }
    >
      <AddressContext.Provider value={address}>{props.children}</AddressContext.Provider>
    </TextContext.Provider>
  );
};

export { useBibleAddressTextContext, useBibleTextContentContext };
