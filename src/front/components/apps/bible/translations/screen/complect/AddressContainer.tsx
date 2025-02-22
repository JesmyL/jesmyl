import { useGetBibleScreenTranslationAddressStyle } from '@bible/translations/hooks/styles/address-style';
import { BibleTranslationScreenConfig } from '@bible/translations/model';
import { useSetScreenTranslationInteractiveBackground } from 'front/components/apps/+complect/translations/hooks/interactive-back';
import { useRef } from 'react';
import { BibleTranslationScreenAddressContent } from './AddressContent';
import { BibleTranslationScreenAddressContentPositionConfiguration } from './AddressContentPositionConfiguration';

interface Props {
  screeni: number | und;
  isTech: boolean | und;
  isPreview: boolean | und;
  isChangeAddressPanelHeight: boolean;
  bibleConfig: BibleTranslationScreenConfig | und;
  windowResizeUpdatesNum: number | und;
  isVisible: boolean;
}

export const BibleTranslationScreenAddressContainer: React.FC<Props> = props => {
  const addressBackground = useSetScreenTranslationInteractiveBackground(
    props.bibleConfig?.address.isWithBackground ? props.bibleConfig.address.backgroundInteractive : undefined,
  );
  const wrapperRef = useRef<HTMLDivElement>(null);

  const addressContainerStyle = useGetBibleScreenTranslationAddressStyle(props.isVisible, props.bibleConfig);

  return (
    <>
      <div
        className="relative full-size flex center"
        style={addressContainerStyle}
        ref={wrapperRef}
      >
        {addressBackground}
        {!props.isChangeAddressPanelHeight && props.isTech && props.bibleConfig && (
          <BibleTranslationScreenAddressContentPositionConfiguration
            screeni={props.screeni}
            wrapperRef={wrapperRef}
          />
        )}
        <BibleTranslationScreenAddressContent
          screeni={props.screeni}
          isPreview={props.isPreview}
          bibleConfig={props.bibleConfig}
          windowResizeUpdatesNum={props.windowResizeUpdatesNum}
        />
      </div>
    </>
  );
};
