import {
  BibleBroadcastScreenConfig,
  useBibleBroadcastScreenTranslationAddressTextWrapperStyle,
} from '$bible/entities/broadcast';
import { useBibleAddressTextContext } from '$bible/shared/contexts/texts';
import { useBibleScreenTranslationFontSizeAddressAdapter } from '$bible/shared/lib';

interface Props {
  screeni: number | und;
  isPreview: boolean | und;
  bibleConfig: BibleBroadcastScreenConfig | und;
  windowResizeUpdatesNum: number | und;
}

export function BibleBroadcastScreenAddressContent(props: Props) {
  const addressTextWrapperStyle = useBibleBroadcastScreenTranslationAddressTextWrapperStyle(props.bibleConfig);
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
