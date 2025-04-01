import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M14 3H10C6.22876 3 4.34315 3 3.17157 4.17157C2 5.34315 2 7.22876 2 11C2 14.7712 2 16.6569 3.17157 17.8284C4.34315 19 6.22876 19 10 19H14C17.7712 19 19.6569 19 20.8284 17.8284C22 16.6569 22 14.7712 22 11C22 7.22876 22 5.34315 20.8284 4.17157C19.6569 3 17.7712 3 14 3Z',
  d2: 'M18 19L19 21',
  d3: 'M6 19L5 21',
  d4: 'M17.2365 19.7049C17.6911 19.6822 18.1078 19.6481 18.489 19.5968C18.7868 19.5568 19.0702 19.5055 19.3396 19.439L19.8946 20.5491C20.1416 21.043 19.9414 21.6437 19.4474 21.8907C18.9535 22.1377 18.3528 21.9375 18.1058 21.4435L17.2365 19.7049ZM4.66079 19.4391C4.93003 19.5055 5.2133 19.5568 5.51098 19.5968C5.89235 19.6481 6.30918 19.6822 6.76394 19.7049L5.89465 21.4435C5.64766 21.9375 5.04698 22.1377 4.55301 21.8907C4.05903 21.6437 3.8588 21.043 4.10579 20.5491L4.66079 19.4391Z',
  d5: 'M14.0564 2.25H9.94358C8.10583 2.24998 6.65019 2.24997 5.51098 2.40314C4.33856 2.56076 3.38961 2.89288 2.64124 3.64124C1.89288 4.38961 1.56076 5.33856 1.40314 6.51098C1.24997 7.65019 1.24998 9.10582 1.25 10.9436V11.0564C1.24998 12.8942 1.24997 14.3498 1.40314 15.489C1.56076 16.6614 1.89288 17.6104 2.64124 18.3588C3.38961 19.1071 4.33856 19.4392 5.51098 19.5969C6.65018 19.75 8.1058 19.75 9.94354 19.75H14.0564C15.8942 19.75 17.3498 19.75 18.489 19.5969C19.6614 19.4392 20.6104 19.1071 21.3588 18.3588C22.1071 17.6104 22.4392 16.6614 22.5969 15.489C22.75 14.3498 22.75 12.8942 22.75 11.0565V10.9436C22.75 9.10585 22.75 7.65018 22.5969 6.51098C22.4392 5.33856 22.1071 4.38961 21.3588 3.64124C20.6104 2.89288 19.6614 2.56076 18.489 2.40314C17.3498 2.24997 15.8942 2.24998 14.0564 2.25Z',
  d6: 'M22 2.5H2V18.5H22V2.5Z',
  d7: 'M18 18.5L19 21.5M6 18.5L5 21.5',
  d8: 'M2 1.75C1.58579 1.75 1.25 2.08579 1.25 2.5V18.5C1.25 18.9142 1.58579 19.25 2 19.25H4.83992L4.05078 21.6174L5.94815 22.2499L6.94811 19.25H17.0508L18.0508 22.2499L19.9481 21.6174L19.159 19.25H22C22.4142 19.25 22.75 18.9142 22.75 18.5V2.5C22.75 2.08579 22.4142 1.75 22 1.75H2Z',
};

export const IconTv02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tv-02-stroke-rounded IconTv02StrokeRounded"
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTv02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tv-02-duotone-rounded IconTv02DuotoneRounded"
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTv02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tv-02-twotone-rounded IconTv02TwotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconTv02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tv-02-solid-rounded IconTv02SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconTv02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tv-02-bulk-rounded IconTv02BulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconTv02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tv-02-stroke-sharp IconTv02StrokeSharp"
    >
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTv02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tv-02-solid-sharp IconTv02SolidSharp"
    >
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfTv02: TheIconSelfPack = {
  name: 'Tv02',
  StrokeRounded: IconTv02StrokeRounded,
  DuotoneRounded: IconTv02DuotoneRounded,
  TwotoneRounded: IconTv02TwotoneRounded,
  SolidRounded: IconTv02SolidRounded,
  BulkRounded: IconTv02BulkRounded,
  StrokeSharp: IconTv02StrokeSharp,
  SolidSharp: IconTv02SolidSharp,
};