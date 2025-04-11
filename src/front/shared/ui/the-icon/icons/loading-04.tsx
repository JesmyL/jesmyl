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
      the-icon="Loading04 StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconLoading04DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Loading04 DuotoneRounded"
    >
      <path 
        d={d.d3}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconLoading04TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Loading04 TwotoneRounded"
    >
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d5}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconLoading04SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Loading04 SolidRounded"
    >
      <path 
        d={d.d6}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconLoading04BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Loading04 BulkRounded"
    >
      <path 
        d={d.d7}
        i-c="f"
      />
      <path 
        d={d.d8}
        i-c="f o7"
      />
    </TheIconWrapper>
  );
};

export const IconLoading04StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Loading04 StrokeSharp"
    >
      <path 
        d={d.d9}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconLoading04SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Loading04 SolidSharp"
    >
      <path 
        d={d.d10}
        i-c="f"
      />
      <path 
        d={d.d11}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfLoading04: TheIconSelfPack = [
  'Loading04',
  IconLoading04StrokeRounded,
  IconLoading04DuotoneRounded,
  IconLoading04TwotoneRounded,
  IconLoading04SolidRounded,
  IconLoading04BulkRounded,
  IconLoading04StrokeSharp,
  IconLoading04SolidSharp,
];