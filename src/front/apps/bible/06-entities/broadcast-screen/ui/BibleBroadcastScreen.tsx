import { BroadcastScreenProps } from '#features/broadcast/Broadcast.model';
import { useBroadcastBackgroundNode } from '#features/broadcast/complect/hooks/useBroadcastBackgroundNode';
import { useFontFileDrop } from '#features/ElectronWorkDir/lib/useFontFileDrop';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import {
  bibleBroadcastUpdateCurrentConfig,
  useBibleBroadcastScreenWrapperStyle,
} from '$bible/entities/broadcast';
import { useRef, useState } from 'react';
import { BibleBroadcastScreenConfig } from 'shared/model/bible/broadcast';
import { twJoin } from 'tailwind-merge';
import { useApplyScreenFontFamilyEffect } from 'x/my-files';
import { BibleBroadcastScreenAddressContainer } from '../sub-ui/AddressContainer';
import { BibleBroadcastScreenAddressPanel } from '../sub-ui/AddressPanel';
import { BibleBroadcastScreenContent } from '../sub-ui/Content';
import { BibleBroadcastScreenContentConfiguration } from '../sub-ui/ContentConfiguration';

interface Props extends BroadcastScreenProps {
  bibleConfig: BibleBroadcastScreenConfig | und;
  isVisible: boolean;
}

export const BibleBroadcastScreenScreen = (props: Props) => {
  const [isChangeAddressPanelHeight, setIsChangeAddressPanelHeight] = useState(true);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const screenWrapperRef = useRef<HTMLDivElement>(null);

  const wrapperStyle = useBibleBroadcastScreenWrapperStyle(props.bibleConfig);

  const background = useBroadcastBackgroundNode({
    bgFileId: props.bibleConfig?.bgFileId,
    bgFilePath: props.bibleConfig?.bgFilePath,
    withBg: props.bibleConfig?.withBg,
  });

  useApplyScreenFontFamilyEffect(props.bibleConfig?.fontFileId, props.win);
  const { isFileDragOver, dropTargetProps } = useFontFileDrop(fontFileId =>
    bibleBroadcastUpdateCurrentConfig({ fontFileId }),
  );

  return (
    <div
      className={twJoin(
        'relative full-size bg-black white-pre-line',
        isFileDragOver && 'outline-2 outline-x3 -outline-offset-2',
      )}
      style={wrapperStyle}
      ref={wrapperRef}
      {...dropTargetProps}
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
              configi={props.configi}
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
            configi={props.configi}
            wrapperRef={screenWrapperRef}
          />
        )}
        <BibleBroadcastScreenContent
          configi={props.configi}
          win={props.win}
          isPreview={props.isPreview}
          bibleConfig={props.bibleConfig}
          isVisible={props.isVisible}
        />
      </div>
      <BibleBroadcastScreenAddressContainer
        isChangeAddressPanelHeight={isChangeAddressPanelHeight}
        isTech={props.isTech}
        isPreview={props.isPreview}
        configi={props.configi}
        bibleConfig={props.bibleConfig}
        isVisible={props.isVisible}
      />
    </div>
  );
};
