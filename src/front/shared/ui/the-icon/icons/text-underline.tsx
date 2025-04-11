import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M5.5 3V11.5C5.5 15.0899 8.41015 18 12 18C15.5899 18 18.5 15.0899 18.5 11.5V3',
  d2: 'M3 21H21',
  d3: 'M5.5 11.5V3H18.5V11.5C18.5 15.0899 15.5899 18 12 18C8.41015 18 5.5 15.0899 5.5 11.5Z',
  d4: 'M5.5 2C6.05228 2 6.5 2.44772 6.5 3V10.5C6.5 13.5376 8.96243 16 12 16C15.0376 16 17.5 13.5376 17.5 10.5V3C17.5 2.44772 17.9477 2 18.5 2C19.0523 2 19.5 2.44772 19.5 3V10.5C19.5 14.6421 16.1421 18 12 18C7.85786 18 4.5 14.6421 4.5 10.5V3C4.5 2.44772 4.94772 2 5.5 2Z',
  d5: 'M2 21C2 20.4477 2.44772 20 3 20H21C21.5523 20 22 20.4477 22 21C22 21.5523 21.5523 22 21 22H3C2.44772 22 2 21.5523 2 21Z',
  d6: 'M4.5 10V2.5H6.5V10C6.5 13.0376 8.96243 15.5 12 15.5C15.0376 15.5 17.5 13.0376 17.5 10V2.5H19.5V10C19.5 14.1421 16.1421 17.5 12 17.5C7.85786 17.5 4.5 14.1421 4.5 10Z',
  d7: 'M21 21.5H3V19.5H21V21.5Z',
};

export const IconTextUnderlineStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="TextUnderline StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconTextUnderlineDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="TextUnderline DuotoneRounded"
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
        d={d.d2}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconTextUnderlineTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="TextUnderline TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconTextUnderlineSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="TextUnderline SolidRounded"
    >
      <path 
        d={d.d4}
        i-c="c f fr"
      />
      <path 
        d={d.d5}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconTextUnderlineBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="TextUnderline BulkRounded"
    >
      <path 
        d={d.d4}
        i-c="c f fr o7"
      />
      <path 
        d={d.d5}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconTextUnderlineStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="TextUnderline StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sj sw"
      />
      <path 
        d={d.d2}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconTextUnderlineSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="TextUnderline SolidSharp"
    >
      <path 
        d={d.d6}
        i-c="c f fr"
      />
      <path 
        d={d.d7}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfTextUnderline: TheIconSelfPack = [
  'TextUnderline',
  IconTextUnderlineStrokeRounded,
  IconTextUnderlineDuotoneRounded,
  IconTextUnderlineTwotoneRounded,
  IconTextUnderlineSolidRounded,
  IconTextUnderlineBulkRounded,
  IconTextUnderlineStrokeSharp,
  IconTextUnderlineSolidSharp,
];