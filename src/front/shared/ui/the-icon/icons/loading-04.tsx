import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M4 10H20C21.1046 10 22 10.8954 22 12C22 13.1046 21.1046 14 20 14H4C2.89543 14 2 13.1046 2 12C2 10.8954 2.89543 10 4 10Z',
  d2: 'M14 14V10',
  d3: 'M14 10H20C21.1046 10 22 10.8954 22 12C22 13.1046 21.1046 14 20 14H14V10Z',
  d4: 'M14 10V14H4C2.89543 14 2 13.1046 2 12C2 10.8954 2.89543 10 4 10H14Z',
  d5: 'M11 14H4C2.89543 14 2 13.1046 2 12C2 10.8954 2.89543 10 4 10H11',
  d6: 'M4 9C2.34315 9 1 10.3431 1 12C1 13.6569 2.34315 15 4 15H20C21.6569 15 23 13.6569 23 12C23 10.3431 21.6569 9 20 9H4ZM3 12C3 11.4477 3.44772 11 4 11H14V13H4C3.44772 13 3 12.5523 3 12Z',
  d7: 'M20 15C21.6569 15 23 13.6569 23 12C23 10.3431 21.6569 9 20 9H14V15H20Z',
  d8: 'M4 9C2.34315 9 1 10.3431 1 12C1 13.6569 2.34315 15 4 15H14V13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H14V9H4Z',
  d9: 'M2 10H22V14H2V10Z',
  d10: 'M1 10C1 9.44772 1.44772 9 2 9H14V11H3L3 13H14V15H2C1.73478 15 1.48043 14.8946 1.29289 14.7071C1.10536 14.5196 1 14.2652 1 14V10Z',
  d11: 'M22 9C22.5523 9 23 9.44772 23 10V14C23 14.5523 22.5523 15 22 15H14V9H22Z',
};

export const IconLoading04StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="loading-04-stroke-rounded IconLoading04StrokeRounded"
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

export const IconLoading04DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="loading-04-duotone-rounded IconLoading04DuotoneRounded"
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
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLoading04TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="loading-04-twotone-rounded IconLoading04TwotoneRounded"
    >
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLoading04SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="loading-04-solid-rounded IconLoading04SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconLoading04BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="loading-04-bulk-rounded IconLoading04BulkRounded"
    >
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconLoading04StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="loading-04-stroke-sharp IconLoading04StrokeSharp"
    >
      <path 
        d={d.d9} 
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

export const IconLoading04SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="loading-04-solid-sharp IconLoading04SolidSharp"
    >
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfLoading04: TheIconSelfPack = {
  name: 'Loading04',
  StrokeRounded: IconLoading04StrokeRounded,
  DuotoneRounded: IconLoading04DuotoneRounded,
  TwotoneRounded: IconLoading04TwotoneRounded,
  SolidRounded: IconLoading04SolidRounded,
  BulkRounded: IconLoading04BulkRounded,
  StrokeSharp: IconLoading04StrokeSharp,
  SolidSharp: IconLoading04SolidSharp,
};