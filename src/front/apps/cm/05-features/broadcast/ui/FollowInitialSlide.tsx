import { translateBase } from '#basis/locale';
import { useBibleBroadcastScreenFontSizeAdapter } from '#shared/lib/hooks/useFontSizeAdapter';
import { QRCode } from '#shared/ui/qr-code/QRCode';
import styled from '@emotion/styled';
import { ScheduleWidgetWid, hostConfig } from 'shared/api';

export const CmBroadcastFollowInitialSlide = ({ schw }: { schw: ScheduleWidgetWid }) => {
  const text = translateBase(it => it.bro.followInPhone);
  const [wrapperRef, contentRef] = useBibleBroadcastScreenFontSizeAdapter(text, 0);

  return (
    <StyledSlide className="full-size flex center column [container-type:size]">
      <StyledQRCode text={`${hostConfig.url}/!other/cm/schs?schw=${schw}&now=${Date.now()}&follow=desktop-link`} />
      <StyledTextWrapper
        className="w-full"
        ref={wrapperRef}
      >
        <h1
          ref={contentRef}
          className="text-center"
        >
          {text}
        </h1>
      </StyledTextWrapper>
    </StyledSlide>
  );
};

const StyledTextWrapper = styled.div`
  height: var(--qr-height);
  padding-inline: 1em;
`;

const StyledSlide = styled.div`
  --qr-height: 40cqmin;

  color: white;
  font-size: 3em;
`;

const StyledQRCode = styled(QRCode)`
  height: var(--qr-height);
  max-height: var(--qr-height);

  &.qr-code {
    filter: contrast(10) invert(1);
  }
`;
