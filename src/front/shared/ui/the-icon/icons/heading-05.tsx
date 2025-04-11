import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3.5 5V19',
  d2: 'M13.5 5V19',
  d3: 'M16.5 16.5V17C16.5 18.1046 17.3954 19 18.5 19C19.6046 19 20.5 18.1046 20.5 17V16.5C20.5 15.1193 19.3807 14 18 14H16.5V11H20.5',
  d4: 'M3.5 12L13.5 12',
  d5: 'M3 4C3.55228 4 4 4.44772 4 5V19C4 19.5523 3.55228 20 3 20C2.44772 20 2 19.5523 2 19V5C2 4.44772 2.44772 4 3 4Z',
  d6: 'M13 4C13.5523 4 14 4.44772 14 5V19C14 19.5523 13.5523 20 13 20C12.4477 20 12 19.5523 12 19V5C12 4.44772 12.4477 4 13 4Z',
  d7: 'M16 11C16 10.4477 16.4477 10 17 10H21C21.5523 10 22 10.4477 22 11C22 11.5523 21.5523 12 21 12H18V13H18.5C20.433 13 22 14.567 22 16.5V17C22 18.6569 20.6569 20 19 20C17.3431 20 16 18.6569 16 17V16.5C16 15.9477 16.4477 15.5 17 15.5C17.5523 15.5 18 15.9477 18 16.5V17C18 17.5523 18.4477 18 19 18C19.5523 18 20 17.5523 20 17V16.5C20 15.6716 19.3284 15 18.5 15H17C16.4477 15 16 14.5523 16 14V11Z',
  d8: 'M2 12C2 11.4477 2.44772 11 3 11L13 11C13.5523 11 14 11.4477 14 12C14 12.5523 13.5523 13 13 13L3 13C2.44772 13 2 12.5523 2 12Z',
  d9: 'M4 5V19',
  d10: 'M14 5V19',
  d11: 'M17 15.5V16C17 17.1046 17.8954 18 19 18C20.1046 18 21 17.1046 21 16V15.5C21 14.1193 19.8807 13 18.5 13H17V10H21',
  d12: 'M4 12L14 12',
  d13: 'M2 19V5H4V19H2Z',
  d14: 'M12 19V5H14V19H12Z',
  d15: 'M16 9H21V11H18V12H18.5C20.433 12 22 13.567 22 15.5V16C22 17.6569 20.6569 19 19 19C17.3431 19 16 17.6569 16 16V15.5H18V16C18 16.5523 18.4477 17 19 17C19.5523 17 20 16.5523 20 16V15.5C20 14.6716 19.3284 14 18.5 14H16V9Z',
  d16: 'M13 13L3 13L3 11L13 11L13 13Z',
};

export const IconHeading05StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Heading05 StrokeRounded"
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

export const IconHeading05DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Heading05 DuotoneRounded"
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

export const IconHeading05TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Heading05 TwotoneRounded"
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

export const IconHeading05SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Heading05 SolidRounded"
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

export const IconHeading05BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Heading05 BulkRounded"
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

export const IconHeading05StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Heading05 StrokeSharp"
    >
      <path 
        d={d.d9}
        i-c="s sj sw"
      />
      <path 
        d={d.d10}
        i-c="s sj sw"
      />
      <path 
        d={d.d11}
        i-c="s sw"
      />
      <path 
        d={d.d12}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconHeading05SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Heading05 SolidSharp"
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

export const iconPackOfHeading05: TheIconSelfPack = [
  'Heading05',
  IconHeading05StrokeRounded,
  IconHeading05DuotoneRounded,
  IconHeading05TwotoneRounded,
  IconHeading05SolidRounded,
  IconHeading05BulkRounded,
  IconHeading05StrokeSharp,
  IconHeading05SolidSharp,
];