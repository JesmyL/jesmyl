import QRCodeGenerator from 'qrcode';
import { HTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

export function QRCode({ text, ...props }: HTMLAttributes<HTMLCanvasElement> & { text: string }) {
  return (
    <StyledCanvas
      {...props}
      className={`qr-code power up ${props.className || ''}`}
      ref={element => {
        if (!element) return;

        QRCodeGenerator.toCanvas(element, text, error => {
          if (error) console.error(error);
          else {
            element.style.width = null as never;
            element.style.height = null as never;
          }
        });
      }}
    />
  );
}

const setMedia = (theme: 'dark' | 'light', invert: 0 | 1) => {
  return css`
    @media (prefers-color-scheme: ${theme}) {
      filter: contrast(10) ${invert ? ` invert(${invert})` : ''};
    }
  `;
};

const StyledCanvas = styled.canvas`
  filter: contrast(10);

  :root body.reverse-theme & {
    ${setMedia('dark', 0)}
    ${setMedia('light', 1)}
  }

  & {
    ${setMedia('dark', 1)}
    ${setMedia('light', 0)}
  }
`;
