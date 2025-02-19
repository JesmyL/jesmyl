import { QRCode } from '#shared/ui/qr-code/QRCode';
import { hosts, IScheduleWidgetWid } from 'shared/api';
import styled from 'styled-components';

export const FollowTranslationInitialSlide = ({ schw }: { schw: IScheduleWidgetWid }) => {
  return (
    <StyledSlide className="full-size flex center column">
      <StyledQRCode text={`${hosts.host}/cm/!other/schs/${schw}?follow`} />
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
