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
      the-icon="LeftToRightListBullet StrokeRounded"
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
        i-c="s sr sw"
      />
      <path 
        d={d.d6}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconLeftToRightListBulletDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="LeftToRightListBullet DuotoneRounded"
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
        i-c="o7 s sr sw"
      />
      <path 
        d={d.d6}
        i-c="o7 s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconLeftToRightListBulletTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="LeftToRightListBullet TwotoneRounded"
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
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d5}
        i-c="o7 s sr sw"
      />
      <path 
        d={d.d6}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconLeftToRightListBulletSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="LeftToRightListBullet SolidRounded"
    >
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

export const IconLeftToRightListBulletBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="LeftToRightListBullet BulkRounded"
    >
      <path 
        d={d.d7}
        i-c="c f fr o7"
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
        d={d.d11}
        i-c="c f fr o7"
      />
      <path 
        d={d.d12}
        i-c="c f fr o7"
      />
    </TheIconWrapper>
  );
};

export const IconLeftToRightListBulletStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="LeftToRightListBullet StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="s sj ss sw"
      />
      <path 
        d={d.d3}
        i-c="s sj ss sw"
      />
      <path 
        d={d.d4}
        i-c="s sj ss sw"
      />
      <path 
        d={d.d5}
        i-c="s sw"
      />
      <path 
        d={d.d6}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconLeftToRightListBulletSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="LeftToRightListBullet SolidSharp"
    >
      <path 
        d={d.d16}
        i-c="c f fr"
      />
      <path 
        d={d.d17}
        i-c="c f fr"
      />
      <path 
        d={d.d18}
        i-c="c f fr"
      />
      <path 
        d={d.d19}
        i-c="c f fr"
      />
      <path 
        d={d.d20}
        i-c="c f fr"
      />
      <path 
        d={d.d21}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfLeftToRightListBullet: TheIconSelfPack = [
  'LeftToRightListBullet',
  IconLeftToRightListBulletStrokeRounded,
  IconLeftToRightListBulletDuotoneRounded,
  IconLeftToRightListBulletTwotoneRounded,
  IconLeftToRightListBulletSolidRounded,
  IconLeftToRightListBulletBulkRounded,
  IconLeftToRightListBulletStrokeSharp,
  IconLeftToRightListBulletSolidSharp,
];