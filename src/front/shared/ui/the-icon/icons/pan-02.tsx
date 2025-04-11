import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M20.5556 13H9.44444C9.19898 13 9 13.2487 9 13.5556C9 16.0102 10.5919 18 12.5556 18H17.4444C19.4081 18 21 16.0102 21 13.5556C21 13.2487 20.801 13 20.5556 13Z',
  d2: 'M9 13L7 11',
  d3: 'M2.36797 6.36797C2.85859 5.87734 3.65404 5.87734 4.14466 6.36797L6.63203 8.85534C7.12266 9.34596 7.12266 10.1414 6.63203 10.632C6.14141 11.1227 5.34596 11.1227 4.85534 10.632L2.36797 8.14466C1.87734 7.65404 1.87734 6.85859 2.36797 6.36797Z',
  d4: 'M8.75 13.5556C8.75 12.9993 9.13725 12.25 9.94444 12.25H21.0556C21.8628 12.25 22.25 12.9993 22.25 13.5556C22.25 16.2595 20.4699 18.75 17.9444 18.75H13.0556C10.5301 18.75 8.75 16.2595 8.75 13.5556Z',
  d5: 'M6.40524 9.90324C6.69814 9.61036 7.17302 9.61038 7.4659 9.90329L10.7748 13.2125C11.0677 13.5054 11.0677 13.9802 10.7748 14.2731C10.4819 14.566 10.007 14.566 9.7141 14.2731L6.4052 10.9639C6.11231 10.671 6.11233 10.1961 6.40524 9.90324Z',
  d6: 'M2.33764 5.83764C3.12115 5.05412 4.39148 5.05412 5.17499 5.83764L7.66236 8.32501C8.44588 9.10852 8.44588 10.3789 7.66236 11.1624C6.87885 11.9459 5.60852 11.9459 4.82501 11.1624L2.33764 8.67499C1.55412 7.89148 1.55412 6.62115 2.33764 5.83764Z',
  d7: 'M7.02818 11.5909C6.29762 11.9009 5.42065 11.758 4.82501 11.1624L2.33764 8.67503C1.55412 7.89151 1.55412 6.62119 2.33764 5.83767C3.12115 5.05416 4.39148 5.05416 5.17499 5.83767L7.66236 8.32505C8.25876 8.92145 8.40119 9.79991 8.08965 10.531L10.7748 13.2164C11.0677 13.5093 11.0677 13.9842 10.7748 14.2771C10.4819 14.5699 10.007 14.5699 9.7141 14.277L7.02818 11.5909Z',
  d8: 'M21 13H9V14C9 16.2091 10.7909 18 13 18H16.9998C19.209 18 20.9999 16.209 20.9998 13.9998L21 13Z',
  d9: 'M9 13L6.5 10.5',
  d10: 'M22.2498 13.9997C22.2498 16.6231 20.1232 18.75 17.4998 18.75H13.5C10.8766 18.75 8.75 16.6234 8.75 14V12.25H22.2502L22.2498 13.9997Z',
  d11: 'M7.70718 9.79285L10.2072 12.2928L8.79297 13.7071L6.29297 11.2071L7.70718 9.79285Z',
};

export const IconPan02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Pan02 StrokeRounded"
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
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconPan02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Pan02 DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="f o7"
      />
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
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconPan02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Pan02 TwotoneRounded"
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
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconPan02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Pan02 SolidRounded"
    >
      <path 
        d={d.d4}
        i-c="f"
      />
      <path 
        d={d.d5}
        i-c="c f fr"
      />
      <path 
        d={d.d6}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconPan02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Pan02 BulkRounded"
    >
      <path 
        d={d.d4}
        i-c="f"
      />
      <path 
        d={d.d7}
        i-c="c f fr o7"
      />
    </TheIconWrapper>
  );
};

export const IconPan02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Pan02 StrokeSharp"
    >
      <path 
        d={d.d8}
        i-c="s sw"
      />
      <path 
        d={d.d9}
        i-c="s sj sw"
      />
      <path 
        d={d.d3}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconPan02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Pan02 SolidSharp"
    >
      <path 
        d={d.d10}
        i-c="f"
      />
      <path 
        d={d.d11}
        i-c="c f fr"
      />
      <path 
        d={d.d6}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfPan02: TheIconSelfPack = [
  'Pan02',
  IconPan02StrokeRounded,
  IconPan02DuotoneRounded,
  IconPan02TwotoneRounded,
  IconPan02SolidRounded,
  IconPan02BulkRounded,
  IconPan02StrokeSharp,
  IconPan02SolidSharp,
];