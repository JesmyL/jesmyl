import QRCodeGenerator from 'qrcode';
import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export function QRCode({ text, ...props }: HTMLAttributes<HTMLCanvasElement> & { text: string }) {
  return (
    <canvas
      {...props}
      className={twMerge('qr-code power up contrast-[10] dark:invert', props.className)}
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
