import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M8 17L8 14',
  d2: 'M12 14L12 9',
  d3: 'M16 9L16 6',
  d4: 'M20 10L20 4',
  d5: 'M3 3V14C3 17.2998 3 18.9497 4.02513 19.9749C5.05025 21 6.70017 21 10 21H21',
  d6: 'M8 18C7.44772 18 7 17.5523 7 17L7 14C7 13.4477 7.44772 13 8 13C8.55228 13 9 13.4477 9 14L9 17C9 17.5523 8.55228 18 8 18Z',
  d7: 'M12 15C11.4477 15 11 14.5523 11 14L11 9C11 8.44772 11.4477 8 12 8C12.5523 8 13 8.44772 13 9L13 14C13 14.5523 12.5523 15 12 15Z',
  d8: 'M16 10C15.4477 10 15 9.55228 15 9L15 6C15 5.44771 15.4477 5 16 5C16.5523 5 17 5.44771 17 6L17 9C17 9.55228 16.5523 10 16 10Z',
  d9: 'M20 11C19.4477 11 19 10.5523 19 10L19 4C19 3.44771 19.4477 3 20 3C20.5523 3 21 3.44771 21 4L21 10C21 10.5523 20.5523 11 20 11Z',
  d10: 'M3 2C3.55229 2 4 2.44772 4 3V14C4 15.6782 4.00213 16.8362 4.11923 17.7072C4.23246 18.5494 4.43644 18.972 4.73223 19.2678C5.02803 19.5636 5.45059 19.7675 6.2928 19.8808C7.16378 19.9979 8.32182 20 10 20H21C21.5523 20 22 20.4477 22 21C22 21.5523 21.5523 22 21 22H9.928C8.33933 22 7.04616 22.0001 6.0263 21.8629C4.96232 21.7199 4.04735 21.4113 3.31802 20.682C2.58869 19.9526 2.28011 19.0377 2.13706 17.9737C1.99994 16.9538 1.99997 15.6607 2 14.072L2 3C2 2.44772 2.44772 2 3 2Z',
  d11: 'M3 3V21H21',
  d12: 'M9.5 13.5L9.5 16.5L7.5 16.5L7.5 13.5L9.5 13.5Z',
  d13: 'M13.5 8.5L13.5 13.5L11.5 13.5L11.5 8.5L13.5 8.5Z',
  d14: 'M17.5 5.5L17.5 8.5L15.5 8.5L15.5 5.5L17.5 5.5Z',
  d15: 'M21.5 3.5L21.5 9.5L19.5 9.5L19.5 3.5L21.5 3.5Z',
  d16: 'M2.5 20.5V2.5H4.5V19.5H21.5V21.5H3.5C2.94772 21.5 2.5 21.0523 2.5 20.5Z',
};

export const IconWaterfallUp01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="WaterfallUp01 StrokeRounded"
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
      <path 
        d={d.d5}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconWaterfallUp01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="WaterfallUp01 DuotoneRounded"
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
      <path 
        d={d.d5}
        i-c="o7 s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconWaterfallUp01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="WaterfallUp01 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
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
        i-c="s sj sr sw"
      />
      <path 
        d={d.d5}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconWaterfallUp01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="WaterfallUp01 SolidRounded"
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

export const IconWaterfallUp01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="WaterfallUp01 BulkRounded"
    >
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
        i-c="c f fr o7"
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

export const IconWaterfallUp01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="WaterfallUp01 StrokeSharp"
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
      <path 
        d={d.d11}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconWaterfallUp01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="WaterfallUp01 SolidSharp"
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

export const iconPackOfWaterfallUp01: TheIconSelfPack = [
  'WaterfallUp01',
  IconWaterfallUp01StrokeRounded,
  IconWaterfallUp01DuotoneRounded,
  IconWaterfallUp01TwotoneRounded,
  IconWaterfallUp01SolidRounded,
  IconWaterfallUp01BulkRounded,
  IconWaterfallUp01StrokeSharp,
  IconWaterfallUp01SolidSharp,
];