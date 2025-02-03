import { useMemo } from 'react';
import { contextCreator } from '../../../../complect/contextCreator';
import { useBibleTranslationJoinAddress } from '../hooks/address/address';
import { useBibleAddressBooki } from '../hooks/address/books';
import { useBibleAddressChapteri } from '../hooks/address/chapters';
import { useBibleAddressVersei } from '../hooks/address/verses';
import { useBibleSlideSyncValue } from '../hooks/slide-sync';
import {
  useBibleJoinedAddressText,
  useBibleJoinedSlideText,
  useBibleSimpleAddressText,
  useBibleSingleSlideText,
} from '../hooks/texts';

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
  const booki = useBibleAddressBooki();
  const chapteri = useBibleAddressChapteri();
  const versei = useBibleAddressVersei();
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
