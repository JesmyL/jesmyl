import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M11 12C11 13.6569 9.65685 15 8 15C6.34315 15 5 13.6569 5 12C5 10.3431 6.34315 9 8 9C9.65685 9 11 10.3431 11 12Z',
  d2: 'M16 6H8C4.68629 6 2 8.68629 2 12C2 15.3137 4.68629 18 8 18H16C19.3137 18 22 15.3137 22 12C22 8.68629 19.3137 6 16 6Z',
  d3: 'M8 6H16C19.3137 6 22 8.68629 22 12C22 15.3137 19.3137 18 16 18H8C4.68629 18 2 15.3137 2 12C2 8.68629 4.68629 6 8 6ZM8 15C9.65685 15 11 13.6569 11 12C11 10.3431 9.65685 9 8 9C6.34315 9 5 10.3431 5 12C5 13.6569 6.34315 15 8 15Z',
  d4: 'M16 5.25C19.7279 5.25 22.75 8.27208 22.75 12C22.75 15.7279 19.7279 18.75 16 18.75H8C4.27208 18.75 1.25 15.7279 1.25 12C1.25 8.27208 4.27208 5.25 8 5.25H16ZM8 8.25C10.0711 8.25 11.75 9.92893 11.75 12C11.75 14.0711 10.0711 15.75 8 15.75C5.92893 15.75 4.25 14.0711 4.25 12C4.25 9.92893 5.92893 8.25 8 8.25Z',
  d5: 'M22.75 12C22.75 8.27208 19.7279 5.25 16 5.25H8C4.27208 5.25 1.25 8.27208 1.25 12C1.25 15.7279 4.27208 18.75 8 18.75H16C19.7279 18.75 22.75 15.7279 22.75 12Z',
  d6: 'M11.75 12C11.75 9.92893 10.0711 8.25 8 8.25C5.92893 8.25 4.25 9.92893 4.25 12C4.25 14.0711 5.92893 15.75 8 15.75C10.0711 15.75 11.75 14.0711 11.75 12Z',
  d7: 'M22 6H2V18H22V6Z',
  d8: 'M11 9H5V15H11V9Z',
  d9: 'M21.9985 5.25C22.4127 5.25 22.7485 5.58579 22.7485 6V18C22.7485 18.4142 22.4127 18.75 21.9985 18.75H1.99854C1.58432 18.75 1.24854 18.4142 1.24854 18V6C1.24854 5.58579 1.58432 5.25 1.99854 5.25H21.9985ZM4.24854 8.25H11.7485V15.75H4.24854V8.25Z',
};

export const IconToggleOffStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="toggle-off-stroke-rounded IconToggleOffStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconToggleOffDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="toggle-off-duotone-rounded IconToggleOffDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconToggleOffTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="toggle-off-twotone-rounded IconToggleOffTwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconToggleOffSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="toggle-off-solid-rounded IconToggleOffSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconToggleOffBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="toggle-off-bulk-rounded IconToggleOffBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconToggleOffStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="toggle-off-stroke-sharp IconToggleOffStrokeSharp"
    >
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconToggleOffSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="toggle-off-solid-sharp IconToggleOffSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfToggleOff: TheIconSelfPack = {
  name: 'ToggleOff',
  StrokeRounded: IconToggleOffStrokeRounded,
  DuotoneRounded: IconToggleOffDuotoneRounded,
  TwotoneRounded: IconToggleOffTwotoneRounded,
  SolidRounded: IconToggleOffSolidRounded,
  BulkRounded: IconToggleOffBulkRounded,
  StrokeSharp: IconToggleOffStrokeSharp,
  SolidSharp: IconToggleOffSolidSharp,
};