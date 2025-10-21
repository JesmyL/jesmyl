import { QRCode } from '#shared/ui/qr-code/QRCode';
import { IScheduleWidgetWid, hosts } from 'shared/api';
import styled from 'styled-components';

export const CmBroadcastFollowInitialSlide = ({ schw }: { schw: IScheduleWidgetWid }) => {
  return (
    <StyledSlide className="full-size flex center column">
      <StyledQRCode
        text={`${hosts.host}/!other/cm/schs?schw=${schw}&now=${Date.now()}${Math.random()}&follow=desktop-link`}
      />
      <h1 className="text-center">Следите за текущей трансляцией у себя в телефоне</h1>
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
