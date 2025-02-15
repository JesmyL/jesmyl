import { LazyIcon } from 'front/complect/the-icon/LazyIcon';
import { useRef, useState } from 'react';
import { TranslationScreenProps } from '../../../+complect/translations/Translations.model';
import { useSetScreenTranslationInteractiveBackground } from '../../../+complect/translations/hooks/interactive-back';
import { useApplyScreenFontFamilyEffect } from '../../../+complect/translations/hooks/set-font-family';
import { useBibleAddressVersei } from '../../hooks/address/verses';
import { useBibleScreenTranslationKeyListener } from '../hooks/key-listener';
import { useGetBibleScreenTranslationWrapperStyle } from '../hooks/styles/wrapper-style';
import { BibleTranslationScreenConfig } from '../model';
import { BibleTranslationScreenAddressContainer } from './complect/AddressContainer';
import { BibleTranslationScreenAddressPanel } from './complect/AddressPanel';
import BibleTranslationScreenContent from './complect/Content';
import { BibleTranslationScreenContentConfiguration } from './complect/ContentConfiguration';

interface Props extends TranslationScreenProps {
  bibleConfig: BibleTranslationScreenConfig | und;
  windowResizeUpdatesNum: number | und;
  isVisible: boolean;
}

export const BibleTranslationScreen = (props: Props) => {
  const [isChangeAddressPanelHeight, setIsChangeAddressPanelHeight] = useState(true);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const screenWrapperRef = useRef<HTMLDivElement>(null);
  const versei = useBibleAddressVersei();

  useBibleScreenTranslationKeyListener(versei, props.win);

  const wrapperStyle = useGetBibleScreenTranslationWrapperStyle(props.bibleConfig);

  const background = useSetScreenTranslationInteractiveBackground(
    props.bibleConfig?.isWithBackground ? props.bibleConfig.backgroundInteractive : undefined,
  );

  useApplyScreenFontFamilyEffect(props.bibleConfig?.fontFamily, props.win);

  return (
    <div
      className="relative full-size bgcolor-black white-pre-line"
      style={wrapperStyle}
      ref={wrapperRef}
    >
      {props.isTech && (
        <>
          <LazyIcon
            icon="CircleArrowDataTransferDiagonal"
            className="pointer absolute pos-left pos-bottom z-index:130"
            onClick={event => {
              event.preventDefault();
              setIsChangeAddressPanelHeight(is => !is);
            }}
          />
          {isChangeAddressPanelHeight && props.bibleConfig && (
            <BibleTranslationScreenAddressPanel
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
          <BibleTranslationScreenContentConfiguration
            screeni={props.screeni}
            wrapperRef={screenWrapperRef}
          />
        )}
        <BibleTranslationScreenContent
          screeni={props.screeni}
          win={props.win}
          isPreview={props.isPreview}
          windowResizeUpdatesNum={props.windowResizeUpdatesNum}
          bibleConfig={props.bibleConfig}
          isVisible={props.isVisible}
        />
      </div>
      <BibleTranslationScreenAddressContainer
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
