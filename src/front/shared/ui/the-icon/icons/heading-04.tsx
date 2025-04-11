import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3.5 5V19',
  d2: 'M13.5 5V19',
  d3: 'M16.5 11V15H20.5M20.5 15V19M20.5 15V11',
  d4: 'M3.5 12L13.5 12',
  d5: 'M3 4C3.55228 4 4 4.44772 4 5V19C4 19.5523 3.55228 20 3 20C2.44772 20 2 19.5523 2 19V5C2 4.44772 2.44772 4 3 4Z',
  d6: 'M13 4C13.5523 4 14 4.44772 14 5V19C14 19.5523 13.5523 20 13 20C12.4477 20 12 19.5523 12 19V5C12 4.44772 12.4477 4 13 4Z',
  d7: 'M17 10C17.5523 10 18 10.4477 18 11V14H20V11C20 10.4477 20.4477 10 21 10C21.5523 10 22 10.4477 22 11V19C22 19.5523 21.5523 20 21 20C20.4477 20 20 19.5523 20 19V16H17C16.4477 16 16 15.5523 16 15V11C16 10.4477 16.4477 10 17 10Z',
  d8: 'M2 12C2 11.4477 2.44772 11 3 11L13 11C13.5523 11 14 11.4477 14 12C14 12.5523 13.5523 13 13 13L3 13C2.44772 13 2 12.5523 2 12Z',
  d9: 'M3 5V19',
  d10: 'M13 5V19',
  d11: 'M16 10V14H20M20 14V18M20 14V10',
  d12: 'M3 12L13 12',
  d13: 'M2 19V5H4V19H2Z',
  d14: 'M12 19V5H14V19H12Z',
  d15: 'M18 9V13H20V9H22V19H20V15H16V9H18Z',
  d16: 'M13 13L3 13L3 11L13 11L13 13Z',
};

export const IconHeading04StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Heading04 StrokeRounded"
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

export const IconHeading04DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Heading04 DuotoneRounded"
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

export const IconHeading04TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Heading04 TwotoneRounded"
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
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconHeading04SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Heading04 SolidRounded"
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

export const IconHeading04BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Heading04 BulkRounded"
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
        i-c="c f fr o7"
      />
      <path 
        d={d.d8}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconHeading04StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Heading04 StrokeSharp"
    >
      <path 
        d={d.d9}
        i-c="s sw"
      />
      <path 
        d={d.d10}
        i-c="s sw"
      />
      <path 
        d={d.d11}
        i-c="s ss sw"
      />
      <path 
        d={d.d12}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconHeading04SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Heading04 SolidSharp"
    >
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

export const iconPackOfHeading04: TheIconSelfPack = [
  'Heading04',
  IconHeading04StrokeRounded,
  IconHeading04DuotoneRounded,
  IconHeading04TwotoneRounded,
  IconHeading04SolidRounded,
  IconHeading04BulkRounded,
  IconHeading04StrokeSharp,
  IconHeading04SolidSharp,
];