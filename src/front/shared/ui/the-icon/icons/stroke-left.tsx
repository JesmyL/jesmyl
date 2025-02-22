import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M7 5H15C17.8284 5 19.2426 5 20.1213 5.87868C21 6.75736 21 8.17157 21 11V13C21 15.8284 21 17.2426 20.1213 18.1213C19.2426 19 17.8284 19 15 19H7',
  d2: 'M3 3V21',
  d3: 'M15 5H3V19H15C17.8284 19 19.2426 19 20.1213 18.1213C21 17.2426 21 15.8284 21 13V11C21 8.17157 21 6.75736 20.1213 5.87868C19.2426 5 17.8284 5 15 5Z',
  d4: 'M18.1586 6.10092C17.4237 6.00213 16.4425 6 15 6H7C6.44772 6 6 5.55229 6 5C6 4.44772 6.44772 4 7 4L15.0706 4C16.4247 3.99997 17.5413 3.99994 18.4251 4.11875C19.3529 4.2435 20.1723 4.51547 20.8284 5.17158C21.4845 5.82768 21.7565 6.64711 21.8812 7.57494C22.0001 8.4587 22 9.57531 22 10.9294V13.0706C22 14.4247 22.0001 15.5413 21.8812 16.4251C21.7565 17.3529 21.4845 18.1723 20.8284 18.8284C20.1723 19.4845 19.3529 19.7565 18.4251 19.8813C17.5413 20.0001 16.4247 20 15.0706 20L7 20C6.44772 20 6 19.5523 6 19C6 18.4477 6.44772 18 7 18H15C16.4425 18 17.4237 17.9979 18.1586 17.8991C18.8646 17.8042 19.1916 17.6368 19.4142 17.4142C19.6368 17.1916 19.8042 16.8646 19.8991 16.1586C19.9979 15.4238 20 14.4425 20 13V11C20 9.55752 19.9979 8.57625 19.8991 7.84143C19.8042 7.13538 19.6368 6.80836 19.4142 6.58579C19.1916 6.36322 18.8646 6.19585 18.1586 6.10092Z',
  d5: 'M3 2C3.55228 2 4 2.44772 4 3V21C4 21.5523 3.55228 22 3 22C2.44772 22 2 21.5523 2 21V3C2 2.44772 2.44772 2 3 2Z',
  d6: 'M7 5H21V19H7',
  d7: 'M6 4H22V20H6V18H20V6H6V4Z',
  d8: 'M4 2V22H2V2H4Z',
};

export const IconStrokeLeftStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="stroke-left-stroke-rounded IconStrokeLeftStrokeRounded"
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

export const IconStrokeLeftDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="stroke-left-duotone-rounded IconStrokeLeftDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
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

export const IconStrokeLeftTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="stroke-left-twotone-rounded IconStrokeLeftTwotoneRounded"
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

export const IconStrokeLeftSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="stroke-left-solid-rounded IconStrokeLeftSolidRounded"
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

export const IconStrokeLeftBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="stroke-left-bulk-rounded IconStrokeLeftBulkRounded"
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

export const IconStrokeLeftStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="stroke-left-stroke-sharp IconStrokeLeftStrokeSharp"
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
      />
    </TheIconWrapper>
  );
};

export const IconStrokeLeftSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="stroke-left-solid-sharp IconStrokeLeftSolidSharp"
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

export const iconPackOfStrokeLeft: TheIconSelfPack = {
  name: 'StrokeLeft',
  StrokeRounded: IconStrokeLeftStrokeRounded,
  DuotoneRounded: IconStrokeLeftDuotoneRounded,
  TwotoneRounded: IconStrokeLeftTwotoneRounded,
  SolidRounded: IconStrokeLeftSolidRounded,
  BulkRounded: IconStrokeLeftBulkRounded,
  StrokeSharp: IconStrokeLeftStrokeSharp,
  SolidSharp: IconStrokeLeftSolidSharp,
};