import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M5 17V9C5 6.17157 5 4.75736 5.87868 3.87868C6.75736 3 8.17157 3 11 3H13C15.8284 3 17.2426 3 18.1213 3.87868C19 4.75736 19 6.17157 19 9V17',
  d2: 'M3 20.9998L21 20.9998',
  d3: 'M5 9L5 21H19L19 9C19 6.17157 19 4.75736 18.1213 3.87868C17.2426 3 15.8284 3 13 3L11 3C8.17157 3 6.75736 3 5.87868 3.87868C5 4.75736 5 6.17157 5 9Z',
  d4: 'M10.9294 2H13.0706C14.4247 1.99997 15.5413 1.99994 16.4251 2.11875C17.3529 2.2435 18.1723 2.51547 18.8284 3.17158C19.4845 3.82768 19.7565 4.64711 19.8813 5.57494C20.0001 6.4587 20 7.57531 20 8.92943L20 17C20 17.5523 19.5523 18 19 18C18.4477 18 18 17.5523 18 17V9C18 7.55752 17.9979 6.57625 17.8991 5.84143C17.8042 5.13538 17.6368 4.80836 17.4142 4.58579C17.1916 4.36322 16.8646 4.19585 16.1586 4.10092C15.4238 4.00213 14.4425 4 13 4H11C9.55752 4 8.57625 4.00213 7.84143 4.10092C7.13538 4.19585 6.80836 4.36322 6.58579 4.58579C6.36322 4.80836 6.19585 5.13538 6.10092 5.84144C6.00213 6.57626 6 7.55752 6 9V17C6 17.5523 5.55229 18 5 18C4.44772 18 4 17.5523 4 17L4 8.92943C3.99997 7.57531 3.99994 6.4587 4.11875 5.57494C4.2435 4.64711 4.51547 3.82768 5.17158 3.17158C5.82768 2.51547 6.64711 2.2435 7.57494 2.11875C8.4587 1.99994 9.57531 1.99997 10.9294 2Z',
  d5: 'M21 21.9998L3 21.9998C2.44772 21.9998 2 21.552 2 20.9998C2 20.4475 2.44772 19.9998 3 19.9998L21 19.9998C21.5523 19.9998 22 20.4475 22 20.9998C22 21.552 21.5523 21.9998 21 21.9998Z',
  d6: 'M5 17L5 3L19 3L19 17',
  d7: 'M20 2V18H18L18 4L6 4L6 18H4L4 2L20 2Z',
  d8: 'M2 21.9998L2 19.9998L22 19.9998V21.9998L2 21.9998Z',
};

export const IconStrokeBottomStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="stroke-bottom-stroke-rounded IconStrokeBottomStrokeRounded"
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

export const IconStrokeBottomDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="stroke-bottom-duotone-rounded IconStrokeBottomDuotoneRounded"
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

export const IconStrokeBottomTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="stroke-bottom-twotone-rounded IconStrokeBottomTwotoneRounded"
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

export const IconStrokeBottomSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="stroke-bottom-solid-rounded IconStrokeBottomSolidRounded"
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

export const IconStrokeBottomBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="stroke-bottom-bulk-rounded IconStrokeBottomBulkRounded"
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

export const IconStrokeBottomStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="stroke-bottom-stroke-sharp IconStrokeBottomStrokeSharp"
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

export const IconStrokeBottomSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="stroke-bottom-solid-sharp IconStrokeBottomSolidSharp"
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

export const iconPackOfStrokeBottom: TheIconSelfPack = {
  name: 'StrokeBottom',
  StrokeRounded: IconStrokeBottomStrokeRounded,
  DuotoneRounded: IconStrokeBottomDuotoneRounded,
  TwotoneRounded: IconStrokeBottomTwotoneRounded,
  SolidRounded: IconStrokeBottomSolidRounded,
  BulkRounded: IconStrokeBottomBulkRounded,
  StrokeSharp: IconStrokeBottomStrokeSharp,
  SolidSharp: IconStrokeBottomSolidSharp,
};