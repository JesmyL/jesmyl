import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M6.19985 6.24021C7.80032 7.03155 7.53358 9.20773 7.20015 10.1969C9.25065 6.0281 15.0512 1.53785 15.0512 9.02173C15.5531 8.18115 17.059 6.29999 19.0669 5.5C21.5768 4.5 23.4574 6.5 20.4634 9.5C20.4634 9.5 18.9663 11 17.4693 14C15.9723 17 11.9802 20 10.7008 13.164C7.19976 22.0665 3.19898 19.594 2.19869 13.659C1.1984 7.72397 4.19927 5.25104 6.19985 6.24021Z',
  d2: 'M5.76371 5.62307C7.48453 6.49917 7.19772 8.90847 6.83922 10.0036C9.04391 5.38823 15.2806 0.416968 15.2806 8.70255C15.8203 7.77193 17.4395 5.68925 19.5983 4.80356C22.2969 3.69644 24.319 5.91068 21.0998 9.23205C21.0998 9.23205 19.4902 10.8927 17.8806 14.2141C16.271 17.5355 11.9787 20.8568 10.6031 13.2885C6.8388 23.1447 2.53718 20.4074 1.46168 13.8366C0.386166 7.26577 3.61269 4.52793 5.76371 5.62307Z',
  d3: 'M5.76371 5.62307C7.48453 6.49917 7.19772 8.90847 6.83922 10.0036C9.04391 5.38823 15.2806 0.416968 15.2806 8.70255C15.8203 7.77193 17.4395 5.68925 19.5983 4.80356C22.2969 3.69644 24.319 5.91068 21.0998 9.23205C21.0998 9.23205 19.4902 10.8927 17.8806 14.2141C16.271 17.5355 11.9787 20.8569 10.6031 13.2885C6.8388 23.1448 2.53718 20.4074 1.46168 13.8366C0.386166 7.26577 3.61269 4.52793 5.76371 5.62307Z',
  d4: 'M5.76371 5.62307C7.48453 6.49917 7.19772 8.90847 6.83922 10.0036C8.41596 6.70281 12.0549 3.22 14 4.53457C12.5 6 11.4021 10.7154 10.6031 13.2885C6.8388 23.1448 2.53718 20.4074 1.46168 13.8366C0.386166 7.26577 3.61269 4.52793 5.76371 5.62307Z',
};

export const IconWattpadStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wattpad-stroke-rounded IconWattpadStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconWattpadDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wattpad-duotone-rounded IconWattpadDuotoneRounded"
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
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconWattpadTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wattpad-twotone-rounded IconWattpadTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconWattpadSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wattpad-solid-rounded IconWattpadSolidRounded"
    >
      <path 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconWattpadBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wattpad-bulk-rounded IconWattpadBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconWattpadStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wattpad-stroke-sharp IconWattpadStrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconWattpadSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wattpad-solid-sharp IconWattpadSolidSharp"
    >
      <path 
        d={d.d1} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfWattpad: TheIconSelfPack = {
  name: 'Wattpad',
  StrokeRounded: IconWattpadStrokeRounded,
  DuotoneRounded: IconWattpadDuotoneRounded,
  TwotoneRounded: IconWattpadTwotoneRounded,
  SolidRounded: IconWattpadSolidRounded,
  BulkRounded: IconWattpadBulkRounded,
  StrokeSharp: IconWattpadStrokeSharp,
  SolidSharp: IconWattpadSolidSharp,
};