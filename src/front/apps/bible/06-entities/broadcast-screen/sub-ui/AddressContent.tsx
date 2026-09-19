import { useBibleBroadcastScreenAddressTextWrapperStyle } from '$bible/entities/broadcast';
import { useBibleAddressTextContext } from '$bible/shared/contexts/texts';
import { useBibleBroadcastScreenFontSizeAddressAdapter } from '$bible/shared/lib';
import { BibleBroadcastScreenConfig } from 'shared/model/bible/broadcast';

interface Props {
  configi: number | und;
  isPreview: boolean | und;
  bibleConfig: BibleBroadcastScreenConfig | und;
}

export function BibleBroadcastScreenAddressContent(props: Props) {
  const addressTextWrapperStyle = useBibleBroadcastScreenAddressTextWrapperStyle(props.bibleConfig);
  const addressText = useBibleAddressTextContext();

  const [addressWrapperRef, addressContentRef] = useBibleBroadcastScreenFontSizeAddressAdapter(
    addressText,
    props.bibleConfig,
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
