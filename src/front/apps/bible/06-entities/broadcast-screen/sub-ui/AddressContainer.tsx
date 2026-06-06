import { useBibleBroadcastScreenAddressStyle } from '$bible/entities/broadcast';
import { useRef } from 'react';
import { BibleBroadcastScreenConfig } from 'shared/model/bible/broadcast';
import { useMyFileNode } from 'x/my-files';
import { BibleBroadcastScreenAddressContent } from './AddressContent';
import { BibleBroadcastScreenAddressContentPositionConfiguration } from './AddressContentPositionConfiguration';

interface Props {
  configi: number | und;
  isTech: boolean | und;
  isPreview: boolean | und;
  isChangeAddressPanelHeight: boolean;
  bibleConfig: BibleBroadcastScreenConfig | und;
  windowResizeUpdatesNum: number | und;
  isVisible: boolean;
}

export const BibleBroadcastScreenAddressContainer: React.FC<Props> = props => {
  const addressBackground = useMyFileNode(
    props.bibleConfig?.address.withBg ? props.bibleConfig.address.bgFileId : undefined,
  );
  const wrapperRef = useRef<HTMLDivElement>(null);

  const addressContainerStyle = useBibleBroadcastScreenAddressStyle(props.isVisible, props.bibleConfig);

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
            configi={props.configi}
            wrapperRef={wrapperRef}
          />
        )}
        <BibleBroadcastScreenAddressContent
          configi={props.configi}
          isPreview={props.isPreview}
          bibleConfig={props.bibleConfig}
          windowResizeUpdatesNum={props.windowResizeUpdatesNum}
        />
      </div>
    </>
  );
};
