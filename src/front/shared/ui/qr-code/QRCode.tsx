import QRCodeGenerator from 'qrcode';
import { HTMLAttributes } from 'react';
import styled from 'styled-components';
import { twMerge } from 'tailwind-merge';

export function QRCode({ text, ...props }: HTMLAttributes<HTMLCanvasElement> & { text: string }) {
  return (
    <StyledCanvas
      {...props}
      className={twMerge('qr-code power up', props.className)}
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

const StyledCanvas = styled.canvas`
  filter: contrast(10);

  html.dark & {
    filter: contrast(10) invert(1);
  }
`;
