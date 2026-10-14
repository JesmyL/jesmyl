import { useBroadcastBackgroundNode } from '#features/broadcast/complect/hooks/useBroadcastBackgroundNode';
import { useBibleBroadcastScreenAddressStyle } from '$bible/entities/broadcast';
import { useRef } from 'react';
import { BibleBroadcastScreenConfig } from 'shared/model/bible/broadcast';
import { BibleBroadcastScreenAddressContent } from './AddressContent';
import { BibleBroadcastScreenAddressContentPositionConfiguration } from './AddressContentPositionConfiguration';

interface Props {
  configi: number | und;
  isTech: boolean | und;
  isPreview: boolean | und;
  isChangeAddressPanelHeight: boolean;
  bibleConfig: BibleBroadcastScreenConfig | und;
  isVisible: boolean;
}

export const BibleBroadcastScreenAddressContainer: React.FC<Props> = props => {
  const addressBackground = useBroadcastBackgroundNode({
    bgFileId: props.bibleConfig?.address.bgFileId,
    bgFilePath: props.bibleConfig?.address.bgFilePath,
    withBg: props.bibleConfig?.address.withBg,
  });
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
        />
      </div>
    </>
  );
};
