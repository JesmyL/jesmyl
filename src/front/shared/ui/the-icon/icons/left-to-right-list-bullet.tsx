import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M8 5L20 5',
  d2: 'M4 5H4.00898',
  d3: 'M4 12H4.00898',
  d4: 'M4 19H4.00898',
  d5: 'M8 12L20 12',
  d6: 'M8 19L20 19',
  d7: 'M7 5C7 4.44772 7.44772 4 8 4L20 4C20.5523 4 21 4.44772 21 5C21 5.55229 20.5523 6 20 6L8 6C7.44772 6 7 5.55228 7 5Z',
  d8: 'M3 5C3 4.44772 3.44772 4 4 4H4.00898C4.56127 4 5.00898 4.44772 5.00898 5C5.00898 5.55228 4.56127 6 4.00898 6H4C3.44772 6 3 5.55228 3 5Z',
  d9: 'M3 12C3 11.4477 3.44772 11 4 11H4.00898C4.56127 11 5.00898 11.4477 5.00898 12C5.00898 12.5523 4.56127 13 4.00898 13H4C3.44772 13 3 12.5523 3 12Z',
  d10: 'M3 19C3 18.4477 3.44772 18 4 18H4.00898C4.56127 18 5.00898 18.4477 5.00898 19C5.00898 19.5523 4.56127 20 4.00898 20H4C3.44772 20 3 19.5523 3 19Z',
  d11: 'M7 12C7 11.4477 7.44772 11 8 11L20 11C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13L8 13C7.44772 13 7 12.5523 7 12Z',
  d12: 'M7 19C7 18.4477 7.44772 18 8 18L20 18C20.5523 18 21 18.4477 21 19C21 19.5523 20.5523 20 20 20L8 20C7.44772 20 7 19.5523 7 19Z',
  d13: 'M3 5C3 4.44772 3.44571 4 3.99553 4H4.00447C4.55429 4 5 4.44772 5 5C5 5.55228 4.55429 6 4.00447 6H3.99553C3.44571 6 3 5.55228 3 5Z',
  d14: 'M3 12C3 11.4477 3.44571 11 3.99553 11H4.00447C4.55429 11 5 11.4477 5 12C5 12.5523 4.55429 13 4.00447 13H3.99553C3.44571 13 3 12.5523 3 12Z',
  d15: 'M3 19C3 18.4477 3.44571 18 3.99553 18H4.00447C4.55429 18 5 18.4477 5 19C5 19.5523 4.55429 20 4.00447 20H3.99553C3.44571 20 3 19.5523 3 19Z',
  d16: 'M20.5 6L8.5 6L8.5 4L20.5 4L20.5 6Z',
  d17: 'M3.5 4H5.50898V6H3.5V4Z',
  d18: 'M3.5 11H5.50898V13H3.5V11Z',
  d19: 'M3.5 18H5.50898V20H3.5V18Z',
  d20: 'M20.5 13L8.5 13L8.5 11L20.5 11L20.5 13Z',
  d21: 'M20.5 20L8.5 20L8.5 18L20.5 18L20.5 20Z',
};

export const IconLeftToRightListBulletStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="left-to-right-list-bullet-stroke-rounded IconLeftToRightListBulletStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLeftToRightListBulletDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="left-to-right-list-bullet-duotone-rounded IconLeftToRightListBulletDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLeftToRightListBulletTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="left-to-right-list-bullet-twotone-rounded IconLeftToRightListBulletTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLeftToRightListBulletSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="left-to-right-list-bullet-solid-rounded IconLeftToRightListBulletSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconLeftToRightListBulletBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="left-to-right-list-bullet-bulk-rounded IconLeftToRightListBulletBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconLeftToRightListBulletStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="left-to-right-list-bullet-stroke-sharp IconLeftToRightListBulletStrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconLeftToRightListBulletSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="left-to-right-list-bullet-solid-sharp IconLeftToRightListBulletSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d20} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d21} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfLeftToRightListBullet: TheIconSelfPack = {
  name: 'LeftToRightListBullet',
  StrokeRounded: IconLeftToRightListBulletStrokeRounded,
  DuotoneRounded: IconLeftToRightListBulletDuotoneRounded,
  TwotoneRounded: IconLeftToRightListBulletTwotoneRounded,
  SolidRounded: IconLeftToRightListBulletSolidRounded,
  BulkRounded: IconLeftToRightListBulletBulkRounded,
  StrokeSharp: IconLeftToRightListBulletStrokeSharp,
  SolidSharp: IconLeftToRightListBulletSolidSharp,
};