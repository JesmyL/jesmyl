import { BroadcastScreenProps } from '#features/broadcast/Broadcast.model';
import { useSetBroadcastScreenInteractiveBackground } from '#features/broadcast/hooks/interactive-back';
import { useApplyScreenFontFamilyEffect } from '#features/broadcast/hooks/set-font-family';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useBibleAddressVersei } from '$bible/shared/hooks';
import { useRef, useState } from 'react';
import { BibleBroadcastScreenKeyListener } from '../../broadcast/lib/key-listener';
import { BibleBroadcastScreenConfig } from '../../broadcast/model/model';
import { useBibleBroadcastScreenWrapperStyle } from '../../broadcast/style/wrapper-style';
import { BibleBroadcastScreenAddressContainer } from '../sub-ui/AddressContainer';
import { BibleBroadcastScreenAddressPanel } from '../sub-ui/AddressPanel';
import { BibleBroadcastScreenContent } from '../sub-ui/Content';
import { BibleBroadcastScreenContentConfiguration } from '../sub-ui/ContentConfiguration';

interface Props extends BroadcastScreenProps {
  bibleConfig: BibleBroadcastScreenConfig | und;
  windowResizeUpdatesNum: number | und;
  isVisible: boolean;
}

export const BibleBroadcastScreenScreen = (props: Props) => {
  const [isChangeAddressPanelHeight, setIsChangeAddressPanelHeight] = useState(true);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const screenWrapperRef = useRef<HTMLDivElement>(null);
  const versei = useBibleAddressVersei();

  BibleBroadcastScreenKeyListener(versei, props.win);

  const wrapperStyle = useBibleBroadcastScreenWrapperStyle(props.bibleConfig);

  const background = useSetBroadcastScreenInteractiveBackground(
    props.bibleConfig?.isWithBackground ? props.bibleConfig.backgroundInteractive : undefined,
  );

  useApplyScreenFontFamilyEffect(props.bibleConfig?.fontFamily, props.win);

  return (
    <div
      className="relative full-size bg-black white-pre-line"
      style={wrapperStyle}
      ref={wrapperRef}
    >
      {props.isTech && (
        <>
          <LazyIcon
            icon="CircleArrowDataTransferDiagonal"
            className="pointer absolute left-0 bottom-0 z-130"
            onClick={event => {
              event.preventDefault();
              setIsChangeAddressPanelHeight(is => !is);
            }}
          />
          {isChangeAddressPanelHeight && props.bibleConfig && (
            <BibleBroadcastScreenAddressPanel
              screeni={props.screeni}
              wrapperRef={wrapperRef}
            />
          )}
        </>
      )}
      {background}
      <div
        className="relative full-size"
        ref={screenWrapperRef}
      >
        {props.isTech && props.bibleConfig && (
          <BibleBroadcastScreenContentConfiguration
            screeni={props.screeni}
            wrapperRef={screenWrapperRef}
          />
        )}
        <BibleBroadcastScreenContent
          screeni={props.screeni}
          win={props.win}
          isPreview={props.isPreview}
          windowResizeUpdatesNum={props.windowResizeUpdatesNum}
          bibleConfig={props.bibleConfig}
          isVisible={props.isVisible}
        />
      </div>
      <BibleBroadcastScreenAddressContainer
        isChangeAddressPanelHeight={isChangeAddressPanelHeight}
        isTech={props.isTech}
        isPreview={props.isPreview}
        screeni={props.screeni}
        bibleConfig={props.bibleConfig}
        windowResizeUpdatesNum={props.windowResizeUpdatesNum}
        isVisible={props.isVisible}
      />
    </div>
  );
};
