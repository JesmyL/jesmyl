import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M17 19L9 19C6.17157 19 4.75736 19 3.87868 18.1213C3 17.2426 3 15.8284 3 13V11C3 8.17157 3 6.75736 3.87868 5.87868C4.75736 5 6.17157 5 9 5H17',
  d2: 'M20.998 21L20.998 3',
  d3: 'M9 5H21V19H9C6.17157 19 4.75736 19 3.87868 18.1213C3 17.2426 3 15.8284 3 13V11C3 8.17157 3 6.75736 3.87868 5.87868C4.75736 5 6.17157 5 9 5Z',
  d4: 'M8.92943 4L17 4C17.5523 4 18 4.44772 18 5C18 5.55229 17.5523 6 17 6H9C7.55752 6 6.57626 6.00213 5.84144 6.10092C5.13538 6.19585 4.80836 6.36322 4.58579 6.58579C4.36322 6.80836 4.19585 7.13538 4.10092 7.84143C4.00213 8.57625 4 9.55752 4 11V13C4 14.4425 4.00213 15.4238 4.10092 16.1586C4.19585 16.8646 4.36322 17.1916 4.58579 17.4142C4.80836 17.6368 5.13538 17.8042 5.84143 17.8991C6.57625 17.9979 7.55752 18 9 18L17 18C17.5523 18 18 18.4477 18 19C18 19.5523 17.5523 20 17 20H8.92943C7.57531 20 6.4587 20.0001 5.57494 19.8813C4.64711 19.7565 3.82768 19.4845 3.17158 18.8284C2.51547 18.1723 2.2435 17.3529 2.11875 16.4251C1.99994 15.5413 1.99997 14.4247 2 13.0706V10.9294C1.99997 9.57531 1.99994 8.4587 2.11875 7.57494C2.2435 6.64711 2.51547 5.82768 3.17158 5.17158C3.82769 4.51547 4.64711 4.2435 5.57494 4.11875C6.4587 3.99994 7.57531 3.99997 8.92943 4Z',
  d5: 'M20.998 2C21.5503 2 21.998 2.44772 21.998 3L21.998 21C21.998 21.5523 21.5503 22 20.998 22C20.4458 22 19.998 21.5523 19.998 21L19.998 3C19.998 2.44772 20.4458 2 20.998 2Z',
  d6: 'M17 5H3V19H17',
  d7: 'M2 4H18V6H4V18H18V20H2V4Z',
  d8: 'M21.998 2L21.998 22H19.998L19.998 2L21.998 2Z',
};

export const IconStrokeRightStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="stroke-right-stroke-rounded IconStrokeRightStrokeRounded"
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

export const IconStrokeRightDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="stroke-right-duotone-rounded IconStrokeRightDuotoneRounded"
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

export const IconStrokeRightTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="stroke-right-twotone-rounded IconStrokeRightTwotoneRounded"
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

export const IconStrokeRightSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="stroke-right-solid-rounded IconStrokeRightSolidRounded"
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

export const IconStrokeRightBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="stroke-right-bulk-rounded IconStrokeRightBulkRounded"
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

export const IconStrokeRightStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="stroke-right-stroke-sharp IconStrokeRightStrokeSharp"
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

export const IconStrokeRightSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="stroke-right-solid-sharp IconStrokeRightSolidSharp"
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

export const iconPackOfStrokeRight: TheIconSelfPack = {
  name: 'StrokeRight',
  StrokeRounded: IconStrokeRightStrokeRounded,
  DuotoneRounded: IconStrokeRightDuotoneRounded,
  TwotoneRounded: IconStrokeRightTwotoneRounded,
  SolidRounded: IconStrokeRightSolidRounded,
  BulkRounded: IconStrokeRightBulkRounded,
  StrokeSharp: IconStrokeRightStrokeSharp,
  SolidSharp: IconStrokeRightSolidSharp,
};