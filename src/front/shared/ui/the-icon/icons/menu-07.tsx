import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M4 4.5L20 4.5',
  d2: 'M4 14.5L20 14.5',
  d3: 'M4 9.5L20 9.5',
  d4: 'M4 19.5L20 19.5',
  d5: 'M3 4.5C3 3.94772 3.44772 3.5 4 3.5L20 3.5C20.5523 3.5 21 3.94772 21 4.5C21 5.05229 20.5523 5.5 20 5.5L4 5.5C3.44772 5.5 3 5.05228 3 4.5Z',
  d6: 'M3 14.5C3 13.9477 3.44772 13.5 4 13.5L20 13.5C20.5523 13.5 21 13.9477 21 14.5C21 15.0523 20.5523 15.5 20 15.5L4 15.5C3.44772 15.5 3 15.0523 3 14.5Z',
  d7: 'M3 9.5C3 8.94772 3.44772 8.5 4 8.5L20 8.5C20.5523 8.5 21 8.94772 21 9.5C21 10.0523 20.5523 10.5 20 10.5L4 10.5C3.44772 10.5 3 10.0523 3 9.5Z',
  d8: 'M3 19.5C3 18.9477 3.44772 18.5 4 18.5L20 18.5C20.5523 18.5 21 18.9477 21 19.5C21 20.0523 20.5523 20.5 20 20.5L4 20.5C3.44772 20.5 3 20.0523 3 19.5Z',
  d9: 'M20 5.5L4 5.5L4 3.5L20 3.5L20 5.5Z',
  d10: 'M20 15.5L4 15.5L4 13.5L20 13.5L20 15.5Z',
  d11: 'M20 10.5L4 10.5L4 8.5L20 8.5L20 10.5Z',
  d12: 'M20 20.5L4 20.5L4 18.5L20 18.5L20 20.5Z',
};

export const IconMenu07StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Menu07 StrokeRounded"
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
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconMenu07DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Menu07 DuotoneRounded"
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
      <path 
        d={d.d4}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconMenu07TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Menu07 TwotoneRounded"
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
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconMenu07SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Menu07 SolidRounded"
    >
      <path 
        d={d.d5}
        i-c="c f fr"
      />
      <path 
        d={d.d6}
        i-c="c f fr"
      />
      <path 
        d={d.d7}
        i-c="c f fr"
      />
      <path 
        d={d.d8}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconMenu07BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Menu07 BulkRounded"
    >
      <path 
        d={d.d5}
        i-c="c f fr o7"
      />
      <path 
        d={d.d6}
        i-c="c f fr o7"
      />
      <path 
        d={d.d7}
        i-c="c f fr"
      />
      <path 
        d={d.d8}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconMenu07StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Menu07 StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sj sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconMenu07SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Menu07 SolidSharp"
    >
      <path 
        d={d.d9}
        i-c="c f fr"
      />
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

export const iconPackOfMenu07: TheIconSelfPack = [
  'Menu07',
  IconMenu07StrokeRounded,
  IconMenu07DuotoneRounded,
  IconMenu07TwotoneRounded,
  IconMenu07SolidRounded,
  IconMenu07BulkRounded,
  IconMenu07StrokeSharp,
  IconMenu07SolidSharp,
];