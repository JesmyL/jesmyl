import { Button } from '#shared/components/ui/button';
import styled from '@emotion/styled';

export const StyledCmAudioMarkControlButtonsContextButtonMeta = styled(Button)<{ 'data-meta': string }>`
  &:before {
    content: attr(data-meta);
    position: absolute;
    left: 0;
    top: -1em;
    font-size: 0.6em;
  }
`;
