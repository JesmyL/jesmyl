import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M11 8L21 8.00006',
  d2: 'M11 12H21',
  d3: 'M11 16H21',
  d4: 'M11 4H21',
  d5: 'M5.5 21V3M5.5 21C4.79977 21 3.49153 19.0057 3 18.5M5.5 21C6.20023 21 7.50847 19.0057 8 18.5',
  d6: 'M3.09387 17.2718C3.27031 17.2497 3.48596 17.2499 3.6616 17.25L4.25 17.25V3C4.25 2.44772 4.69772 2 5.25 2C5.80228 2 6.25 2.44772 6.25 3V17.25L6.8384 17.25C7.01403 17.2499 7.22969 17.2497 7.40613 17.2718L7.40947 17.2722C7.53592 17.288 8.11196 17.3598 8.38632 17.9254C8.66128 18.4922 8.35935 18.9924 8.29403 19.1006L7.95488 19.5691C7.66025 19.9449 7.25455 20.4593 6.87412 20.8503C6.68429 21.0454 6.46703 21.2467 6.23612 21.4055C6.03086 21.5467 5.68067 21.75 5.25 21.75C4.81933 21.75 4.46914 21.5467 4.26388 21.4055C4.03297 21.2467 3.81571 21.0454 3.62588 20.8503C3.24545 20.4593 2.83975 19.9449 2.54511 19.569L2.20597 19.1006C2.14065 18.9924 1.83872 18.4922 2.11368 17.9254C2.38804 17.3598 2.96408 17.288 3.09053 17.2722L3.09387 17.2718Z',
  d7: 'M9.99999 8C10 7.44772 10.4477 7 11 7.00001L21 7.00007C21.5523 7.00007 22 7.44779 22 8.00008C22 8.55236 21.5523 9.00007 21 9.00007L11 9.00001C10.4477 9 9.99999 8.55228 9.99999 8Z',
  d8: 'M10 12C10 11.4477 10.4477 11 11 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H11C10.4477 13 10 12.5523 10 12Z',
  d9: 'M10 16C10 15.4477 10.4477 15 11 15H21C21.5523 15 22 15.4477 22 16C22 16.5523 21.5523 17 21 17H11C10.4477 17 10 16.5523 10 16Z',
  d10: 'M10 4C10 3.44772 10.4477 3 11 3H21C21.5523 3 22 3.44772 22 4C22 4.55228 21.5523 5 21 5H11C10.4477 5 10 4.55228 10 4Z',
  d11: 'M6 3V20.1693M3 18L6 21L9 18',
  d12: 'M21.5 8.50006L11.5 8.5L11.5 6.5L21.5 6.50006L21.5 8.50006Z',
  d13: 'M21.5 12.5H11.5V10.5H21.5V12.5Z',
  d14: 'M21.5 16.5H11.5V14.5H21.5V16.5Z',
  d15: 'M21.5 4.5H11.5V2.5H21.5V4.5Z',
  d16: 'M7.20711 2.5V17.6716L8.5 16.3787L9.91421 17.7929L6.20711 21.5L2.5 17.7929L3.91421 16.3787L5.20711 17.6716V2.5H7.20711Z',
};

export const IconSorting04StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Sorting04 StrokeRounded"
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
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconSorting04DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Sorting04 DuotoneRounded"
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
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconSorting04TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Sorting04 TwotoneRounded"
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

export const IconSorting04SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Sorting04 SolidRounded"
    >
      <path 
        d={d.d6}
        i-c="f"
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

export const IconSorting04BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Sorting04 BulkRounded"
    >
      <path 
        d={d.d6}
        i-c="f"
      />
      <path 
        d={d.d7}
        i-c="c f fr o7"
      />
      <path 
        d={d.d8}
        i-c="c f fr o7"
      />
      <path 
        d={d.d9}
        i-c="c f fr o7"
      />
      <path 
        d={d.d10}
        i-c="c f fr o7"
      />
    </TheIconWrapper>
  );
};

export const IconSorting04StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Sorting04 StrokeSharp"
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
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconSorting04SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Sorting04 SolidSharp"
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

export const iconPackOfSorting04: TheIconSelfPack = [
  'Sorting04',
  IconSorting04StrokeRounded,
  IconSorting04DuotoneRounded,
  IconSorting04TwotoneRounded,
  IconSorting04SolidRounded,
  IconSorting04BulkRounded,
  IconSorting04StrokeSharp,
  IconSorting04SolidSharp,
];