import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M4 8.5L20 8.5',
  d2: 'M4 15.5L20 15.5',
  d3: 'M3 8.5C3 7.94772 3.44772 7.5 4 7.5L20 7.5C20.5523 7.5 21 7.94772 21 8.5C21 9.05229 20.5523 9.5 20 9.5L4 9.5C3.44772 9.5 3 9.05228 3 8.5Z',
  d4: 'M3 15.5C3 14.9477 3.44772 14.5 4 14.5L20 14.5C20.5523 14.5 21 14.9477 21 15.5C21 16.0523 20.5523 16.5 20 16.5L4 16.5C3.44772 16.5 3 16.0523 3 15.5Z',
  d5: 'M20 9.5L4 9.5L4 7.5L20 7.5L20 9.5Z',
  d6: 'M20 16.5L4 16.5L4 14.5L20 14.5L20 16.5Z',
};

export const IconMenu09StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Menu09 StrokeRounded"
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

export const IconMenu09DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Menu09 DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconMenu09TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Menu09 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconMenu09SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Menu09 SolidRounded"
    >
      <path 
        d={d.d3}
        i-c="c f fr"
      />
      <path 
        d={d.d4}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconMenu09BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Menu09 BulkRounded"
    >
      <path 
        d={d.d3}
        i-c="c f fr o7"
      />
      <path 
        d={d.d4}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconMenu09StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Menu09 StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sj sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconMenu09SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Menu09 SolidSharp"
    >
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

export const iconPackOfMenu09: TheIconSelfPack = [
  'Menu09',
  IconMenu09StrokeRounded,
  IconMenu09DuotoneRounded,
  IconMenu09TwotoneRounded,
  IconMenu09SolidRounded,
  IconMenu09BulkRounded,
  IconMenu09StrokeSharp,
  IconMenu09SolidSharp,
];