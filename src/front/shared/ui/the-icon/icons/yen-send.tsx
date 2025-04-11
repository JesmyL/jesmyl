import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2 3.5C2.36667 5.03909 3.98 8.53704 7.5 10.216M7.5 10.216C11.02 8.53704 12.6333 5.03909 13 3.5M7.5 10.216V20.5',
  d2: 'M5 13.5H10',
  d3: 'M5 17.5H10',
  d4: 'M22 13H14.5M22 13C22 13.7002 20.0057 15.0085 19.5 15.5M22 13C22 12.2998 20.0057 10.9915 19.5 10.5',
  d5: 'M1.76823 2.02721C2.30548 1.89922 2.84477 2.23099 2.97276 2.76823C3.28061 4.06046 4.63651 7.01407 7.49998 8.59234C10.3635 7.01407 11.7194 4.06046 12.0272 2.76823C12.1552 2.23099 12.6945 1.89922 13.2317 2.02721C13.769 2.1552 14.1008 2.69448 13.9728 3.23173C13.583 4.86792 11.9842 8.38919 8.49998 10.3249V20C8.49998 20.5523 8.05227 21 7.49998 21C6.9477 21 6.49998 20.5523 6.49998 20V10.3249C3.01576 8.38919 1.41701 4.86792 1.02721 3.23173C0.899216 2.69448 1.23099 2.1552 1.76823 2.02721Z',
  d6: 'M3.99976 12.9998C3.99976 12.4475 4.44747 11.9998 4.99976 11.9998H9.99976C10.552 11.9998 10.9998 12.4475 10.9998 12.9998C10.9998 13.552 10.552 13.9998 9.99976 13.9998H4.99976C4.44747 13.9998 3.99976 13.552 3.99976 12.9998Z',
  d7: 'M3.99976 16.9998C3.99976 16.4475 4.44747 15.9998 4.99976 15.9998H9.99976C10.552 15.9998 10.9998 16.4475 10.9998 16.9998C10.9998 17.552 10.552 17.9998 9.99976 17.9998H4.99976C4.44747 17.9998 3.99976 17.552 3.99976 16.9998Z',
  d8: 'M14.9998 14.0056C14.4475 14.0056 13.9998 13.5579 13.9998 13.0056C13.9998 12.4533 14.4475 12.0056 14.9998 12.0056L18.4998 12.0056L18.4998 11.4114C18.4997 11.2357 18.4995 11.0201 18.5216 10.8436L18.522 10.8403C18.5378 10.7138 18.6096 10.1378 19.1752 9.86343C19.742 9.58847 20.2421 9.89041 20.3504 9.95573L20.3544 9.95816C20.5074 10.0504 20.6783 10.1845 20.8188 10.2949L20.8491 10.3186C21.2249 10.6132 21.7091 10.9952 22.1001 11.3756C22.2952 11.5655 22.4965 11.7827 22.6553 12.0136C22.7965 12.2189 22.9998 12.5691 22.9998 12.9998C22.9998 13.4304 22.7965 13.7806 22.6553 13.9859C22.4965 14.2168 22.2952 14.434 22.1001 14.6239C21.7091 15.0043 21.2249 15.3863 20.8491 15.6809L20.8188 15.7046C20.6783 15.815 20.5074 15.9491 20.3544 16.0413L20.3504 16.0438C20.2421 16.1091 19.742 16.411 19.1752 16.1361C18.6096 15.8617 18.5378 15.2857 18.522 15.1592L18.5216 15.1559C18.4995 14.9794 18.4996 14.7638 18.4998 14.5882L18.4998 14.0056L14.9998 14.0056Z',
  d9: 'M2 3.5L7.5 10.216M7.5 10.216L13 3.5M7.5 10.216V20.5',
  d10: 'M3 13H12',
  d11: 'M3 17H12',
  d12: 'M14.5 13H21.5067M19.5 15.5L22 13L19.5 10.5',
  d13: 'M6.77416 10.9569L1.50049 4.51717L3.04783 3.25L7.77416 9.02132L12.5005 3.25L14.0478 4.51717L8.77416 10.9569L8.77417 20.75H6.77417L6.77416 10.9569Z',
  d14: 'M12.2742 14.3835H3.27417V12.3835H12.2742V14.3835Z',
  d15: 'M12.2742 18.3835H3.27417V16.3835H12.2742V18.3835Z',
  d16: 'M18.6711 12.3836L17.8782 11.5907L19.2924 10.1765L22.4995 13.3836L19.2924 16.5907L17.8782 15.1765L18.6711 14.3836H13.5853V12.3836H18.6711Z',
};

export const IconYenSendStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="YenSend StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconYenSendDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="YenSend DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconYenSendTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="YenSend TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sr sw"
      />
      <path 
        d={d.d3}
        i-c="o7 s sr sw"
      />
      <path 
        d={d.d4}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconYenSendSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="YenSend SolidRounded"
    >
      <path 
        d={d.d5}
        i-c="c f fr"
      />
      <path 
        d={d.d6}
        i-c="c f fr"
      />
      <path 
        d={d.d7}
        i-c="c f fr"
      />
      <path 
        d={d.d8}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconYenSendBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="YenSend BulkRounded"
    >
      <path 
        d={d.d6}
        i-c="c f fr o7"
      />
      <path 
        d={d.d7}
        i-c="c f fr o7"
      />
      <path 
        d={d.d8}
        i-c="c f fr o7"
      />
      <path 
        d={d.d5}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconYenSendStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="YenSend StrokeSharp"
    >
      <path 
        d={d.d9}
        i-c="s sj sw"
      />
      <path 
        d={d.d10}
        i-c="s sj sw"
      />
      <path 
        d={d.d11}
        i-c="s sj sw"
      />
      <path 
        d={d.d12}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconYenSendSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="YenSend SolidSharp"
    >
      <path 
        d={d.d13}
        i-c="c f fr"
      />
      <path 
        d={d.d14}
        i-c="c f fr"
      />
      <path 
        d={d.d15}
        i-c="c f fr"
      />
      <path 
        d={d.d16}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfYenSend: TheIconSelfPack = [
  'YenSend',
  IconYenSendStrokeRounded,
  IconYenSendDuotoneRounded,
  IconYenSendTwotoneRounded,
  IconYenSendSolidRounded,
  IconYenSendBulkRounded,
  IconYenSendStrokeSharp,
  IconYenSendSolidSharp,
];