import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M21 21H10C6.70017 21 5.05025 21 4.02513 19.9749C3 18.9497 3 17.2998 3 14V3',
  d2: 'M20 17L20 14',
  d3: 'M16 14L16 8',
  d4: 'M12 14L12 11',
  d5: 'M8 11L8 5',
  d6: 'M3 2C3.55229 2 4 2.44772 4 3V14C4 15.6782 4.00213 16.8362 4.11923 17.7072C4.23246 18.5494 4.43644 18.972 4.73223 19.2678C5.02803 19.5636 5.45059 19.7675 6.2928 19.8808C7.16377 19.9979 8.32182 20 10 20H21C21.5523 20 22 20.4477 22 21C22 21.5523 21.5523 22 21 22H9.92793C8.33929 22 7.04614 22.0001 6.0263 21.8629C4.96232 21.7199 4.04735 21.4113 3.31802 20.682C2.58869 19.9527 2.28011 19.0377 2.13706 17.9737C1.99994 16.9538 1.99997 15.6607 2 14.072L2 3C2 2.44772 2.44772 2 3 2Z',
  d7: 'M20 18C19.4477 18 19 17.5523 19 17L19 14C19 13.4477 19.4477 13 20 13C20.5523 13 21 13.4477 21 14L21 17C21 17.5523 20.5523 18 20 18Z',
  d8: 'M16 15C15.4477 15 15 14.5523 15 14L15 8C15 7.44771 15.4477 7 16 7C16.5523 7 17 7.44771 17 8L17 14C17 14.5523 16.5523 15 16 15Z',
  d9: 'M12 15C11.4477 15 11 14.5523 11 14L11 11C11 10.4477 11.4477 10 12 10C12.5523 10 13 10.4477 13 11L13 14C13 14.5523 12.5523 15 12 15Z',
  d10: 'M8 12C7.44772 12 7 11.5523 7 11L7 5C7 4.44771 7.44772 4 8 4C8.55229 4 9 4.44771 9 5L9 11C9 11.5523 8.55228 12 8 12Z',
  d11: 'M3 3V21H21',
  d12: 'M2.5 20.5V2.5H4.5V19.5H21.5V21.5H3.5C2.94772 21.5 2.5 21.0523 2.5 20.5Z',
  d13: 'M21.5 13.5L21.5 16.5L19.5 16.5L19.5 13.5L21.5 13.5Z',
  d14: 'M17.5 7.5L17.5 13.5L15.5 13.5L15.5 7.5L17.5 7.5Z',
  d15: 'M13.5 10.5L13.5 13.5L11.5 13.5L11.5 10.5L13.5 10.5Z',
  d16: 'M9.5 4.5L9.5 10.5L7.5 10.5L7.5 4.5L9.5 4.5Z',
};

export const IconWaterfallDown01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="WaterfallDown01 StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
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
      <path 
        d={d.d5}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconWaterfallDown01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="WaterfallDown01 DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sr sw"
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
      <path 
        d={d.d5}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconWaterfallDown01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="WaterfallDown01 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d5}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconWaterfallDown01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="WaterfallDown01 SolidRounded"
    >
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
      <path 
        d={d.d9}
        i-c="c f fr"
      />
      <path 
        d={d.d10}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconWaterfallDown01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="WaterfallDown01 BulkRounded"
    >
      <path 
        d={d.d6}
        i-c="c f fr"
      />
      <path 
        d={d.d7}
        i-c="c f fr o7"
      />
      <path 
        d={d.d8}
        i-c="c f fr"
      />
      <path 
        d={d.d9}
        i-c="c f fr o7"
      />
      <path 
        d={d.d10}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconWaterfallDown01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="WaterfallDown01 StrokeSharp"
    >
      <path 
        d={d.d11}
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
      <path 
        d={d.d5}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconWaterfallDown01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="WaterfallDown01 SolidSharp"
    >
      <path 
        d={d.d12}
        i-c="c f fr"
      />
      <path 
        d={d.d13}
        i-c="c f fr"
      />
      <path 
        d={d.d14}
        i-c="c f fr"
      />
      <path 
        d={d.d15}
        i-c="c f fr"
      />
      <path 
        d={d.d16}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfWaterfallDown01: TheIconSelfPack = [
  'WaterfallDown01',
  IconWaterfallDown01StrokeRounded,
  IconWaterfallDown01DuotoneRounded,
  IconWaterfallDown01TwotoneRounded,
  IconWaterfallDown01SolidRounded,
  IconWaterfallDown01BulkRounded,
  IconWaterfallDown01StrokeSharp,
  IconWaterfallDown01SolidSharp,
];