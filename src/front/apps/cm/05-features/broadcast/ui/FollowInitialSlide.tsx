import { translateBase } from '#basis/locale';
import { useBibleBroadcastScreenFontSizeAdapter } from '#shared/lib/hooks/useFontSizeAdapter';
import { QRCode } from '#shared/ui/qr-code/QRCode';
import styled from '@emotion/styled';
import { ScheduleWidgetWid, hostConfig } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';

export const CmBroadcastFollowInitialSlide = ({ schw }: { schw: ScheduleWidgetWid }) => {
  const text = translateBase(BaseLocaleKey.BroadcastFollowInPhone);
  const [wrapperRef, contentRef] = useBibleBroadcastScreenFontSizeAdapter(text, 0);

  return (
    <div className="full-size flex center column [container-type:size] [--qr-height:40cqmin] text-white text-[3em]">
      <StyledQRCode
        className="h-(--qr-height) max-h-(--qr-height)"
        text={`${hostConfig.url}/!other/cm/schs?schw=${schw}&now=${Date.now()}&follow=desktop-link`}
      />
      <div
        className="w-full h-(--qr-height) px-[1em]"
        ref={wrapperRef}
      >
        <h1
          ref={contentRef}
          className="text-center"
        >
          {text}
        </h1>
      </div>
    </div>
  );
};

const StyledQRCode = styled(QRCode)`
  &.qr-code {
    filter: contrast(10) invert(1);
  }
`;
