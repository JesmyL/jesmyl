import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M5.00025 20L5 14',
  d2: 'M5 11V4',
  d3: 'M9 8H15',
  d4: 'M2 14H8',
  d5: 'M16 12H22',
  d6: 'M11.9998 8L12 4',
  d7: 'M12.0002 20L12 11',
  d8: 'M19 12L19 4',
  d9: 'M19.0002 20L19 15',
  d10: 'M5.00024 20L5 14M2 14H8',
  d11: 'M9 8H15M11.9998 8L12 4',
  d12: 'M16 12H22M19 12V4',
  d13: 'M5 13C5.55228 12.9999 6.00002 13.4476 6.00004 13.9999L6.00029 19.9999C6.00031 20.5522 5.55261 20.9999 5.00033 21C4.44804 21 4.00031 20.5523 4.00029 20L4.00004 14C4.00002 13.4477 4.44772 13 5 13Z',
  d14: 'M5 3C5.55228 3 6 3.44772 6 4V11C6 11.5523 5.55228 12 5 12C4.44772 12 4 11.5523 4 11V4C4 3.44772 4.44772 3 5 3Z',
  d15: 'M16 8C16 8.55228 15.5523 9 15 9H9C8.44772 9 8 8.55228 8 8C8 7.44772 8.44772 7 9 7H15C15.5523 7 16 7.44772 16 8Z',
  d16: 'M9 14C9 14.5523 8.55228 15 8 15H2C1.44772 15 1 14.5523 1 14C1 13.4477 1.44772 13 2 13H8C8.55228 13 9 13.4477 9 14Z',
  d17: 'M23 12C23 12.5523 22.5523 13 22 13H16C15.4477 13 15 12.5523 15 12C15 11.4477 15.4477 11 16 11H22C22.5523 11 23 11.4477 23 12Z',
  d18: 'M12 3.00006C12.5523 3.00009 13 3.44784 12.9999 4.00012L12.9997 8.00012C12.9997 8.55241 12.5519 9.00009 11.9996 9.00006C11.4473 9.00003 10.9997 8.55228 10.9997 8L10.9999 4C11 3.44772 11.4477 3.00003 12 3.00006Z',
  d19: 'M12 9.99997C12.5523 9.99996 13 10.4477 13 10.9999L13.0003 19.9999C13.0003 20.5522 12.5526 21 12.0003 21C11.448 21 11.0003 20.5523 11.0003 20L11 11C11 10.4477 11.4477 9.99999 12 9.99997Z',
  d20: 'M19 3C19.5523 3 20 3.44772 20 4L20 12C20 12.5523 19.5523 13 19 13C18.4477 13 18 12.5523 18 12L18 4C18 3.44772 18.4477 3 19 3Z',
  d21: 'M19 14C19.5523 13.9999 20 14.4476 20 14.9999L20.0003 19.9999C20.0003 20.5522 19.5526 20.9999 19.0003 21C18.4481 21 18.0003 20.5523 18.0003 20L18 15C18 14.4477 18.4477 14 19 14Z',
  d22: 'M6 13.9999L6.00025 19.9999L4.00025 20L4 14L6 13.9999Z',
  d23: 'M6 4V11H4V4H6Z',
  d24: 'M15 9H9V7H15V9Z',
  d25: 'M8 15H2V13H8V15Z',
  d26: 'M22 13H16V11H22V13Z',
  d27: 'M13 4.00012L12.9998 8.00012L10.9998 8L11 4L13 4.00012Z',
  d28: 'M13 10.9999L13.0002 19.9999L11.0002 20L11 11L13 10.9999Z',
  d29: 'M20 4L20 12H18L18 4H20Z',
  d30: 'M20 14.9999L20.0002 19.9999L18.0002 20L18 15L20 14.9999Z',
};

export const IconSlidersVerticalStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SlidersVertical StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sr sw"
      />
      <path 
        d={d.d5}
        i-c="s sr sw"
      />
      <path 
        d={d.d6}
        i-c="s sr sw"
      />
      <path 
        d={d.d7}
        i-c="s sr sw"
      />
      <path 
        d={d.d8}
        i-c="s sr sw"
      />
      <path 
        d={d.d9}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconSlidersVerticalDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SlidersVertical DuotoneRounded"
    >
      <path 
        d={d.d2}
        i-c="s sr sw"
      />
      <path 
        d={d.d10}
        i-c="o7 s sr sw"
      />
      <path 
        d={d.d11}
        i-c="o7 s sr sw"
      />
      <path 
        d={d.d7}
        i-c="s sr sw"
      />
      <path 
        d={d.d12}
        i-c="o7 s sr sw"
      />
      <path 
        d={d.d9}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconSlidersVerticalTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SlidersVertical TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sr sw"
      />
      <path 
        d={d.d5}
        i-c="s sr sw"
      />
      <path 
        d={d.d6}
        i-c="s sr sw"
      />
      <path 
        d={d.d7}
        i-c="o7 s sr sw"
      />
      <path 
        d={d.d8}
        i-c="s sr sw"
      />
      <path 
        d={d.d9}
        i-c="o7 s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconSlidersVerticalSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SlidersVertical SolidRounded"
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

export const IconSlidersVerticalBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SlidersVertical BulkRounded"
    >
      <path 
        d={d.d13}
        i-c="c f fr"
      />
      <path 
        d={d.d14}
        i-c="c f fr o7"
      />
      <path 
        d={d.d15}
        i-c="c f fr"
      />
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
        i-c="c f fr o7"
      />
      <path 
        d={d.d20}
        i-c="c f fr"
      />
      <path 
        d={d.d21}
        i-c="c f fr o7"
      />
    </TheIconWrapper>
  );
};

export const IconSlidersVerticalStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SlidersVertical StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="s sw"
      />
      <path 
        d={d.d3}
        i-c="s sw"
      />
      <path 
        d={d.d4}
        i-c="s sw"
      />
      <path 
        d={d.d5}
        i-c="s sw"
      />
      <path 
        d={d.d6}
        i-c="s sw"
      />
      <path 
        d={d.d7}
        i-c="s sw"
      />
      <path 
        d={d.d8}
        i-c="s sw"
      />
      <path 
        d={d.d9}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconSlidersVerticalSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SlidersVertical SolidSharp"
    >
      <path 
        d={d.d22}
        i-c="c f fr"
      />
      <path 
        d={d.d23}
        i-c="c f fr"
      />
      <path 
        d={d.d24}
        i-c="c f fr"
      />
      <path 
        d={d.d25}
        i-c="c f fr"
      />
      <path 
        d={d.d26}
        i-c="c f fr"
      />
      <path 
        d={d.d27}
        i-c="c f fr"
      />
      <path 
        d={d.d28}
        i-c="c f fr"
      />
      <path 
        d={d.d29}
        i-c="c f fr"
      />
      <path 
        d={d.d30}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfSlidersVertical: TheIconSelfPack = [
  'SlidersVertical',
  IconSlidersVerticalStrokeRounded,
  IconSlidersVerticalDuotoneRounded,
  IconSlidersVerticalTwotoneRounded,
  IconSlidersVerticalSolidRounded,
  IconSlidersVerticalBulkRounded,
  IconSlidersVerticalStrokeSharp,
  IconSlidersVerticalSolidSharp,
];