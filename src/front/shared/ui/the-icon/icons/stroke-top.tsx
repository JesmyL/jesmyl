import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M19 7V15C19 17.8284 19 19.2426 18.1213 20.1213C17.2426 21 15.8284 21 13 21L11 21C8.17157 21 6.75736 21 5.87868 20.1213C5 19.2426 5 17.8284 5 15V7',
  d2: 'M21 2.99805L3 2.99805',
  d3: 'M19 15L19 3L5 3L5 15C5 17.8284 5 19.2426 5.87868 20.1213C6.75736 21 8.17157 21 11 21H13C15.8284 21 17.2426 21 18.1213 20.1213C19 19.2426 19 17.8284 19 15Z',
  d4: 'M5 6C5.55229 6 6 6.44772 6 7V15C6 16.4425 6.00213 17.4237 6.10092 18.1586C6.19585 18.8646 6.36322 19.1916 6.58579 19.4142C6.80836 19.6368 7.13538 19.8042 7.84143 19.8991C8.57625 19.9979 9.55752 20 11 20L13 20C14.4425 20 15.4237 19.9979 16.1586 19.8991C16.8646 19.8042 17.1916 19.6368 17.4142 19.4142C17.6368 19.1916 17.8042 18.8646 17.8991 18.1586C17.9979 17.4237 18 16.4425 18 15V7C18 6.44772 18.4477 6 19 6C19.5523 6 20 6.44772 20 7L20 15.0706C20 16.4247 20.0001 17.5413 19.8813 18.4251C19.7565 19.3529 19.4845 20.1723 18.8284 20.8284C18.1723 21.4845 17.3529 21.7565 16.4251 21.8812C15.5413 22.0001 14.4247 22 13.0706 22L10.9294 22C9.57531 22 8.4587 22.0001 7.57494 21.8812C6.64711 21.7565 5.82768 21.4845 5.17158 20.8284C4.51547 20.1723 4.2435 19.3529 4.11875 18.4251C3.99994 17.5413 3.99997 16.4247 4 15.0706L4 7C4 6.44772 4.44772 6 5 6Z',
  d5: 'M2 2.99805C2 2.44576 2.44772 1.99805 3 1.99805L21 1.99805C21.5523 1.99805 22 2.44576 22 2.99805C22 3.55033 21.5523 3.99805 21 3.99805L3 3.99805C2.44772 3.99805 2 3.55033 2 2.99805Z',
  d6: 'M19 7L19 21L5 21L5 7',
  d7: 'M6 6L6 20L18 20L18 6L20 6V22H4L4 6L6 6Z',
  d8: 'M2 1.99805L22 1.99805V3.99805L2 3.99805L2 1.99805Z',
};

export const IconStrokeTopStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="stroke-top-stroke-rounded IconStrokeTopStrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconStrokeTopDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="stroke-top-duotone-rounded IconStrokeTopDuotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconStrokeTopTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="stroke-top-twotone-rounded IconStrokeTopTwotoneRounded"
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
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconStrokeTopSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="stroke-top-solid-rounded IconStrokeTopSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconStrokeTopBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="stroke-top-bulk-rounded IconStrokeTopBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconStrokeTopStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="stroke-top-stroke-sharp IconStrokeTopStrokeSharp"
    >
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconStrokeTopSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="stroke-top-solid-sharp IconStrokeTopSolidSharp"
    >
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

export const iconPackOfStrokeTop: TheIconSelfPack = {
  name: 'StrokeTop',
  StrokeRounded: IconStrokeTopStrokeRounded,
  DuotoneRounded: IconStrokeTopDuotoneRounded,
  TwotoneRounded: IconStrokeTopTwotoneRounded,
  SolidRounded: IconStrokeTopSolidRounded,
  BulkRounded: IconStrokeTopBulkRounded,
  StrokeSharp: IconStrokeTopStrokeSharp,
  SolidSharp: IconStrokeTopSolidSharp,
};