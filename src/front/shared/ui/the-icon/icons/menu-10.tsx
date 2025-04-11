import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M5 9L19 9',
  d2: 'M11.9998 5H12.0088',
  d3: 'M5 14L19 14',
  d4: 'M5 19L19 19',
  d5: 'M4 9C4 8.44772 4.44772 8 5 8L19 8C19.5523 8 20 8.44772 20 9C20 9.55229 19.5523 10 19 10L5 10C4.44772 10 4 9.55228 4 9Z',
  d6: 'M11 5C11 4.44772 11.4477 4 12 4H12.009C12.5613 4 13.009 4.44772 13.009 5C13.009 5.55228 12.5613 6 12.009 6H12C11.4477 6 11 5.55228 11 5Z',
  d7: 'M4 14C4 13.4477 4.44772 13 5 13L19 13C19.5523 13 20 13.4477 20 14C20 14.5523 19.5523 15 19 15L5 15C4.44772 15 4 14.5523 4 14Z',
  d8: 'M4 19C4 18.4477 4.44772 18 5 18L19 18C19.5523 18 20 18.4477 20 19C20 19.5523 19.5523 20 19 20L5 20C4.44772 20 4 19.5523 4 19Z',
  d9: 'M19 10L5 10L5 8L19 8L19 10Z',
  d10: 'M10.7451 5.25C10.7451 4.55964 11.3028 4 11.9906 4H11.9996C12.6875 4 13.2451 4.55964 13.2451 5.25C13.2451 5.94036 12.6875 6.5 11.9996 6.5H11.9906C11.3028 6.5 10.7451 5.94036 10.7451 5.25Z',
  d11: 'M19 15L5 15L5 13L19 13L19 15Z',
  d12: 'M19 20L5 20L5 18L19 18L19 20Z',
};

export const IconMenu10StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Menu10 StrokeRounded"
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

export const IconMenu10DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Menu10 DuotoneRounded"
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

export const IconMenu10TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Menu10 TwotoneRounded"
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
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconMenu10SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Menu10 SolidRounded"
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

export const IconMenu10BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Menu10 BulkRounded"
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

export const IconMenu10StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Menu10 StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sj sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
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

export const IconMenu10SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Menu10 SolidSharp"
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

export const iconPackOfMenu10: TheIconSelfPack = [
  'Menu10',
  IconMenu10StrokeRounded,
  IconMenu10DuotoneRounded,
  IconMenu10TwotoneRounded,
  IconMenu10SolidRounded,
  IconMenu10BulkRounded,
  IconMenu10StrokeSharp,
  IconMenu10SolidSharp,
];