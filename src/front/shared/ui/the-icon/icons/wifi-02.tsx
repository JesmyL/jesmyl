import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 18.5H12.0118',
  d2: 'M8.25 15.5C10.25 13.5 13.75 13.5 15.75 15.5',
  d3: 'M18.5 12.5C14.7324 9.16667 9.5 9.16667 5.5 12.5',
  d4: 'M2 9.5C8.31579 4.16669 15.6842 4.16668 22 9.49989',
  d5: 'M10.5 18.5C10.5 17.6716 11.1716 17 12 17H12.0118C12.8402 17 13.5118 17.6716 13.5118 18.5C13.5118 19.3284 12.8402 20 12.0118 20H12C11.1716 20 10.5 19.3284 10.5 18.5Z',
  d6: 'M7.54289 14.7929C9.93342 12.4024 14.0666 12.4024 16.4571 14.7929C16.8476 15.1834 16.8476 15.8166 16.4571 16.2071C16.0666 16.5976 15.4334 16.5976 15.0429 16.2071C13.4334 14.5976 10.5666 14.5976 8.95711 16.2071C8.56658 16.5976 7.93342 16.5976 7.54289 16.2071C7.15237 15.8166 7.15237 15.1834 7.54289 14.7929Z',
  d7: 'M4.85984 11.7318C9.21914 8.09903 15.0058 8.07336 19.1626 11.751C19.5763 12.117 19.6149 12.749 19.249 13.1626C18.883 13.5763 18.251 13.6149 17.8374 13.249C14.459 10.26 9.78091 10.2343 6.14021 13.2682C5.71593 13.6218 5.08537 13.5645 4.7318 13.1402C4.37824 12.7159 4.43556 12.0853 4.85984 11.7318Z',
  d8: 'M12 4.5C15.695 4.49998 19.3379 5.94312 22.6452 8.73585C23.0672 9.09217 23.1204 9.72309 22.7641 10.1451C22.4077 10.567 21.7768 10.6202 21.3548 10.2639C18.3463 7.72345 15.1472 6.49999 12 6.5C8.85288 6.50001 5.65374 7.7235 2.6452 10.264C2.22324 10.6204 1.59231 10.5671 1.23599 10.1452C0.879668 9.72322 0.93288 9.09229 1.35484 8.73597C4.6621 5.94319 8.30506 4.50002 12 4.5Z',
  d9: 'M22 8.21401C18.8671 5.76354 15.4562 4.49998 11.9999 4.5C8.54366 4.50002 5.1329 5.76356 2 8.21401L3.31491 9.72465C6.12597 7.5501 9.08526 6.50001 11.9999 6.5C14.9146 6.49999 17.8739 7.55004 20.6849 9.72454L22 8.21401Z',
  d10: 'M15.0413 16.2071C13.4323 14.5976 10.5664 14.5976 8.95744 16.2071L7.64246 14.6964C10.0127 12.4345 13.9863 12.4345 16.3564 14.6965L15.0413 16.2071Z',
  d11: 'M19.0236 11.6329L17.7105 13.1411C14.3903 10.3 9.86432 10.2715 6.29179 13.1447L4.97802 11.6353C9.27455 8.13752 14.916 8.10646 19.0236 11.6329Z',
  d12: 'M12 17.5C11.4477 17.5 11 17.9477 11 18.5C11 19.0523 11.4477 19.5 12 19.5H12.0118C12.5641 19.5 13.0118 19.0523 13.0118 18.5C13.0118 17.9477 12.5641 17.5 12.0118 17.5H12Z',
};

export const IconWifi02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wifi-02-stroke-rounded IconWifi02StrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconWifi02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wifi-02-duotone-rounded IconWifi02DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconWifi02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wifi-02-twotone-rounded IconWifi02TwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconWifi02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wifi-02-solid-rounded IconWifi02SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconWifi02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wifi-02-bulk-rounded IconWifi02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconWifi02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wifi-02-stroke-sharp IconWifi02StrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconWifi02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wifi-02-solid-sharp IconWifi02SolidSharp"
    >
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfWifi02: TheIconSelfPack = {
  name: 'Wifi02',
  StrokeRounded: IconWifi02StrokeRounded,
  DuotoneRounded: IconWifi02DuotoneRounded,
  TwotoneRounded: IconWifi02TwotoneRounded,
  SolidRounded: IconWifi02SolidRounded,
  BulkRounded: IconWifi02BulkRounded,
  StrokeSharp: IconWifi02StrokeSharp,
  SolidSharp: IconWifi02SolidSharp,
};