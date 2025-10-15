import { useSetScreenTranslationInteractiveBackground } from '#features/broadcast/hooks/interactive-back';
import { BibleBroadcastScreenConfig, useBibleBroadcastScreenTranslationAddressStyle } from '$bible/entities/broadcast';
import { useRef } from 'react';
import { BibleBroadcastScreenAddressContent } from './AddressContent';
import { BibleBroadcastScreenAddressContentPositionConfiguration } from './AddressContentPositionConfiguration';

interface Props {
  screeni: number | und;
  isTech: boolean | und;
  isPreview: boolean | und;
  isChangeAddressPanelHeight: boolean;
  bibleConfig: BibleBroadcastScreenConfig | und;
  windowResizeUpdatesNum: number | und;
  isVisible: boolean;
}

export const BibleBroadcastScreenAddressContainer: React.FC<Props> = props => {
  const addressBackground = useSetScreenTranslationInteractiveBackground(
    props.bibleConfig?.address.isWithBackground ? props.bibleConfig.address.backgroundInteractive : undefined,
  );
  const wrapperRef = useRef<HTMLDivElement>(null);

  const addressContainerStyle = useBibleBroadcastScreenTranslationAddressStyle(props.isVisible, props.bibleConfig);

  return (
    <>
      <div
        className="relative full-size flex center"
        style={addressContainerStyle}
        ref={wrapperRef}
      >
        {addressBackground}
        {!props.isChangeAddressPanelHeight && props.isTech && props.bibleConfig && (
          <BibleBroadcastScreenAddressContentPositionConfiguration
            screeni={props.screeni}
            wrapperRef={wrapperRef}
          />
        )}
        <BibleBroadcastScreenAddressContent
          screeni={props.screeni}
          isPreview={props.isPreview}
          bibleConfig={props.bibleConfig}
          windowResizeUpdatesNum={props.windowResizeUpdatesNum}
        />
      </div>
    </>
  );
};
