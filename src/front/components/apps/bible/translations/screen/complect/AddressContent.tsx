import { useBibleAddressTextContext } from '../../../texts/AddressContentContext';
import { useBibleScreenTranslationFontSizeAddressAdapter } from '../../hooks/font-size-adapter/address-adapter';
import { useGetBibleScreenTranslationAddressTextWrapperStyle } from '../../hooks/styles/address-text-wrapper-style';
import { BibleTranslationScreenConfig } from '../../model';

interface Props {
  screeni: number | und;
  isPreview: boolean | und;
  bibleConfig: BibleTranslationScreenConfig | und;
  windowResizeUpdatesNum: number | und;
}

export default function BibleTranslationScreenAddressContent(props: Props) {
  const addressTextWrapperStyle = useGetBibleScreenTranslationAddressTextWrapperStyle(props.bibleConfig);
  const addressText = useBibleAddressTextContext();

  const [addressWrapperRef, addressContentRef] = useBibleScreenTranslationFontSizeAddressAdapter(
    addressText,
    props.bibleConfig,
    props.windowResizeUpdatesNum,
  );

  return (
    <>
      <div
        className="absolute flex"
        style={addressTextWrapperStyle}
        ref={addressWrapperRef}
      >
        <div
          className="nowrap"
          ref={addressContentRef}
        >
          {addressText}
        </div>
      </div>
    </>
  );
}
