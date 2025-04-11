import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M4 5L20 5',
  d2: 'M4 12L8 12M20 12L11 12M8 12L9.5 14L11 12M8 12L11 12',
  d3: 'M4 19L20 19',
  d4: 'M3 5C3 4.44772 3.44772 4 4 4L20 4C20.5523 4 21 4.44772 21 5C21 5.55229 20.5523 6 20 6L4 6C3.44772 6 3 5.55228 3 5Z',
  d5: 'M11.5 13L20 13C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11L4 11C3.44772 11 3 11.4477 3 12C3 12.5523 3.44771 13 4 13L7.5 13L8.7 14.6C8.88885 14.8518 9.18524 15 9.5 15C9.81476 15 10.1111 14.8518 10.3 14.6L11.5 13Z',
  d6: 'M3 19C3 18.4477 3.44772 18 4 18L20 18C20.5523 18 21 18.4477 21 19C21 19.5523 20.5523 20 20 20L4 20C3.44772 20 3 19.5523 3 19Z',
  d7: 'M4 5H20',
  d8: 'M4.00195 12H7.94553M7.94553 12L9.51426 13.9279L11.0413 12M7.94553 12H11.0413M11.0413 12H19.999',
  d9: 'M4 19H20',
  d10: 'M20 6L4 6L4 4L20 4L20 6Z',
  d11: 'M11.5 13L20 13L20 11L4 11L4 13L7.5 13L9.5 15.6667L11.5 13Z',
  d12: 'M20 20L4 20L4 18L20 18L20 20Z',
};

export const IconMenu06StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Menu06 StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconMenu06DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Menu06 DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconMenu06TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Menu06 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconMenu06SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Menu06 SolidRounded"
    >
      <path 
        d={d.d4}
        i-c="c f fr"
      />
      <path 
        d={d.d5}
        i-c="c f fr"
      />
      <path 
        d={d.d6}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconMenu06BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Menu06 BulkRounded"
    >
      <path 
        d={d.d4}
        i-c="c f fr"
      />
      <path 
        d={d.d5}
        i-c="c f fr o7"
      />
      <path 
        d={d.d6}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconMenu06StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Menu06 StrokeSharp"
    >
      <path 
        d={d.d7}
        i-c="s sj sw"
      />
      <path 
        d={d.d8}
        i-c="s sw"
      />
      <path 
        d={d.d9}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconMenu06SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Menu06 SolidSharp"
    >
      <path 
        d={d.d10}
        i-c="c f fr"
      />
      <path 
        d={d.d11}
        i-c="c f fr"
      />
      <path 
        d={d.d12}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfMenu06: TheIconSelfPack = [
  'Menu06',
  IconMenu06StrokeRounded,
  IconMenu06DuotoneRounded,
  IconMenu06TwotoneRounded,
  IconMenu06SolidRounded,
  IconMenu06BulkRounded,
  IconMenu06StrokeSharp,
  IconMenu06SolidSharp,
];