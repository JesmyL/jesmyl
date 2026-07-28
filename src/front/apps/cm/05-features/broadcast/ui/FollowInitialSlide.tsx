import { translateBase } from '#basis/locale';
import { QRCode } from '#shared/ui/qr-code/QRCode';
import styled from '@emotion/styled';
import { ScheduleWidgetWid, hostConfig } from 'shared/api';

export const CmBroadcastFollowInitialSlide = ({ schw }: { schw: ScheduleWidgetWid }) => {
  return (
    <StyledSlide className="full-size flex center column">
      <StyledQRCode
        text={`${hostConfig.url}/!other/cm/schs?schw=${schw}&now=${Date.now()}${Math.random()}&follow=desktop-link`}
      />
      <h1 className="text-center">{translateBase(it => it.bro.followInPhone)}</h1>
    </StyledSlide>
  );
};

const StyledSlide = styled.div`
  color: white;
  font-size: 3em;
`;

const StyledQRCode = styled(QRCode)`
  width: min(50vmin, 50%);

  &.qr-code {
    filter: contrast(10) invert(1);
  }
`;
