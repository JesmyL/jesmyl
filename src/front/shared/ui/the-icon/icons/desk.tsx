import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3 8H21V12C21 14.357 21 15.5355 20.2678 16.2678C19.5355 17 18.357 17 16 17H8C5.64298 17 4.46447 17 3.73223 16.2678C3 15.5355 3 14.357 3 12V8Z',
  d2: 'M7 6C7 4.11438 7 3.17157 7.58579 2.58579C8.17157 2 9.11438 2 11 2H13C14.8856 2 15.8284 2 16.4142 2.58579C17 3.17157 17 4.11438 17 6V8H7V6Z',
  d3: 'M5 17V22M19 17V22',
  d4: 'M8 17V20M16 17V20',
  d5: 'M2 8L3.81818 8M20.1818 8L22 8',
  d6: 'M21.75 12.0537C21.75 13.1865 21.75 14.1123 21.6518 14.8431C21.5491 15.6071 21.3268 16.2694 20.7981 16.7981C20.2694 17.3268 19.6071 17.5491 18.8431 17.6518C18.1123 17.75 17.1865 17.75 16.0537 17.75H7.94631C6.81348 17.75 5.88775 17.75 5.15689 17.6518C4.39293 17.5491 3.7306 17.3268 3.2019 16.7981C2.67321 16.2694 2.45093 15.6071 2.34822 14.8431C2.24996 14.1123 2.24998 13.1865 2.25 12.0537V12.0537V9.25H21.75V12.0537V12.0537Z',
  d7: 'M5 15.75C5.55228 15.75 6 16.1977 6 16.75V21.75C6 22.3023 5.55228 22.75 5 22.75C4.44772 22.75 4 22.3023 4 21.75V16.75C4 16.1977 4.44772 15.75 5 15.75ZM8 15.75C8.55228 15.75 9 16.1977 9 16.75V19.75C9 20.3023 8.55228 20.75 8 20.75C7.44772 20.75 7 20.3023 7 19.75V16.75C7 16.1977 7.44772 15.75 8 15.75ZM16 15.75C16.5523 15.75 17 16.1977 17 16.75V19.75C17 20.3023 16.5523 20.75 16 20.75C15.4477 20.75 15 20.3023 15 19.75V16.75C15 16.1977 15.4477 15.75 16 15.75ZM19 15.75C19.5523 15.75 20 16.1977 20 16.75V21.75C20 22.3023 19.5523 22.75 19 22.75C18.4477 22.75 18 22.3023 18 21.75V16.75C18 16.1977 18.4477 15.75 19 15.75Z',
  d8: 'M1 10C1 9.44772 1.44772 9 2 9L22 9C22.5523 9 23 9.44772 23 10C23 10.5523 22.5523 11 22 11L2 11C1.44772 11 1 10.5523 1 10Z',
  d9: 'M13.0521 1.25C13.9505 1.24997 14.6997 1.24995 15.2945 1.32992C15.9223 1.41432 16.4891 1.59999 16.9445 2.05546C17.4 2.51093 17.5857 3.07773 17.6701 3.70552C17.7501 4.3003 17.75 5.04954 17.75 5.94801V7.1C17.75 7.28857 17.75 7.38285 17.6914 7.44142C17.6328 7.5 17.5386 7.5 17.35 7.5L6.65 7.5C6.46144 7.5 6.36716 7.5 6.30858 7.44142C6.25 7.38285 6.25 7.28856 6.25 7.1V5.94793C6.24997 5.04948 6.24995 4.30029 6.32992 3.70552C6.41432 3.07773 6.59999 2.51093 7.05546 2.05546C7.51093 1.59999 8.07773 1.41432 8.70552 1.32992C9.30029 1.24995 10.0496 1.24997 10.948 1.25H13.0521Z',
  d10: 'M4 17.3457V21.7502C4 22.3025 4.44772 22.7502 5 22.7502C5.55228 22.7502 6 22.3025 6 21.7502V17.7235C5.69455 17.7089 5.41369 17.6866 5.15689 17.652C4.73913 17.5959 4.35175 17.5039 4 17.3457ZM7 17.7478V19.7502C7 20.3025 7.44772 20.7502 8 20.7502C8.55228 20.7502 9 20.3025 9 19.7502V17.7502H7.94631C7.61306 17.7502 7.29772 17.7503 7 17.7478ZM15 17.7502V19.7502C15 20.3025 15.4477 20.7502 16 20.7502C16.5523 20.7502 17 20.3025 17 19.7502V17.7478C16.7023 17.7503 16.3869 17.7502 16.0537 17.7502H15ZM18 17.7235V21.7502C18 22.3025 18.4477 22.7502 19 22.7502C19.5523 22.7502 20 22.3025 20 21.7502V17.3457C19.6482 17.5039 19.2609 17.5959 18.8431 17.652C18.5863 17.6866 18.3055 17.7089 18 17.7235Z',
  d11: 'M3 8V16H21V8',
  d12: 'M17 8V2H7V8',
  d13: 'M5 16V22M19 16V22',
  d14: 'M8 16V20M16 16V20',
  d15: 'M2 8L22 8',
  d16: 'M4 22.75V16.75H6V22.75H4ZM18 22.75V16.75H20V22.75H18Z',
  d17: 'M7 20.75V16.75H9V20.75H7ZM15 20.75V16.75H17V20.75H15Z',
  d18: 'M23 8.75L1 8.75V10.75H2.25V16.75C2.25 17.1642 2.58579 17.5 3 17.5H21C21.4142 17.5 21.75 17.1642 21.75 16.75V10.75H23V8.75Z',
  d19: 'M7 1.25C6.58579 1.25 6.25 1.58579 6.25 2V7.25L17.75 7.25V2C17.75 1.58579 17.4142 1.25 17 1.25H7Z',
};

export const IconDeskStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="desk-stroke-rounded IconDeskStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconDeskDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="desk-duotone-rounded IconDeskDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconDeskTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="desk-twotone-rounded IconDeskTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconDeskSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="desk-solid-rounded IconDeskSolidRounded"
    >
      <path 
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
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconDeskBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="desk-bulk-rounded IconDeskBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconDeskStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="desk-stroke-sharp IconDeskStrokeSharp"
    >
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d14} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d15} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
    </TheIconWrapper>
  );
};

export const IconDeskSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="desk-solid-sharp IconDeskSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfDesk: TheIconSelfPack = {
  name: 'Desk',
  StrokeRounded: IconDeskStrokeRounded,
  DuotoneRounded: IconDeskDuotoneRounded,
  TwotoneRounded: IconDeskTwotoneRounded,
  SolidRounded: IconDeskSolidRounded,
  BulkRounded: IconDeskBulkRounded,
  StrokeSharp: IconDeskStrokeSharp,
  SolidSharp: IconDeskSolidSharp,
};