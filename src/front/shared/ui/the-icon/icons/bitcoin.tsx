import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M6 4H14.4C16.3882 4 18 5.79086 18 8C18 10.2091 16.3882 12 14.4 12M14.4 12C16.3882 12 18 13.7909 18 16C18 18.2091 16.3882 20 14.4 20H6M14.4 12H7.2',
  d2: 'M7 4V20',
  d3: 'M9 2L9 4M14 2V4',
  d4: 'M9 20L9 22M14 20V22',
  d5: 'M18 8C18 5.79086 16.3882 4 14.4 4H7V20H14.4C16.3882 20 18 18.2091 18 16C18 13.7909 16.3882 12 14.4 12C16.3882 12 18 10.2091 18 8Z',
  d6: 'M9 1C9.55228 1 10 1.44772 10 2V3H13V2C13 1.44772 13.4477 1 14 1C14.5523 1 15 1.44772 15 2V3.04118C17.3293 3.36444 19 5.54629 19 8C19 9.5924 18.2964 11.0703 17.1657 12C18.2964 12.9297 19 14.4076 19 16C19 18.4537 17.3293 20.6356 15 20.9588V22C15 22.5523 14.5523 23 14 23C13.4477 23 13 22.5523 13 22V21H10V22C10 22.5523 9.55228 23 9 23C8.44772 23 8 22.5523 8 22V21H6C5.44772 21 5 20.5523 5 20C5 19.4477 5.44772 19 6 19V5C5.44772 5 5 4.55228 5 4C5 3.44772 5.44772 3 6 3H8V2C8 1.44772 8.44772 1 9 1ZM8 5V11H14.4C15.7394 11 17 9.75857 17 8C17 6.24143 15.7394 5 14.4 5H8ZM14.4 13H8V19H14.4C15.7394 19 17 17.7586 17 16C17 14.2414 15.7394 13 14.4 13Z',
  d7: 'M13 3L15 3.04118C17.3293 3.36444 19 5.54629 19 8C19 9.5924 18.2964 11.0703 17.1657 12C18.2964 12.9297 19 14.4076 19 16C19 18.4537 17.3293 20.6356 15 20.9588L13 21H6C5.44772 21 5 20.5523 5 20C5 19.4477 5.44772 19 6 19V5C5.44772 5 5 4.55228 5 4C5 3.44772 5.44772 3 6 3H13ZM8 11V5H14.4C15.7394 5 17 6.24143 17 8C17 9.75857 15.7394 11 14.4 11H8ZM14.4 13H8V19H14.4C15.7394 19 17 17.7586 17 16C17 14.2414 15.7394 13 14.4 13Z',
  d8: 'M10 2C10 1.44772 9.55228 1 9 1C8.44772 1 8 1.44772 8 2V3H10V2Z',
  d9: 'M15 3.04118L13 3V2C13 1.44772 13.4477 1 14 1C14.5523 1 15 1.44772 15 2V3.04118Z',
  d10: 'M13 21L15 20.9588V22C15 22.5523 14.5523 23 14 23C13.4477 23 13 22.5523 13 22V21Z',
  d11: 'M10 21H8V22C8 22.5523 8.44772 23 9 23C9.55228 23 10 22.5523 10 22V21Z',
  d12: 'M5.5 4H14.9C16.8882 4 18.5 5.79086 18.5 8C18.5 10.2091 16.8882 12 14.9 12M14.9 12C16.8882 12 18.5 13.7909 18.5 16C18.5 18.2091 16.8882 20 14.9 20H5.5M14.9 12H7.7',
  d13: 'M7.5 4V20',
  d14: 'M9.5 2L9.5 4M14.5 2V4',
  d15: 'M9.5 20L9.5 22M14.5 20V22',
  d16: 'M14.9 5H5.5V3H14.9C17.537 3 19.5 5.34029 19.5 8C19.5 9.5924 18.7964 11.0703 17.6657 12C18.7964 12.9297 19.5 14.4076 19.5 16C19.5 18.6597 17.537 21 14.9 21H5.5V19H14.9C16.2394 19 17.5 17.7586 17.5 16C17.5 14.2414 16.2394 13 14.9 13H7.7V11H14.9C16.2394 11 17.5 9.75857 17.5 8C17.5 6.24143 16.2394 5 14.9 5Z',
  d17: 'M6.5 20V4H8.5V20H6.5Z',
  d18: 'M8.5 4L8.5 2H10.5V4H8.5ZM13.5 4V2H15.5V4H13.5Z',
  d19: 'M8.5 22L8.5 20H10.5V22H8.5ZM13.5 22V20H15.5V22H13.5Z',
};

export const IconBitcoinStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Bitcoin StrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconBitcoinDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Bitcoin DuotoneRounded"
    >
      <path 
        d={d.d5}
        i-c="f o7"
      />
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
    </TheIconWrapper>
  );
};

export const IconBitcoinTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Bitcoin TwotoneRounded"
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
        i-c="o7 s sr sw"
      />
      <path 
        d={d.d4}
        i-c="o7 s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconBitcoinSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Bitcoin SolidRounded"
    >
      <path 
        d={d.d6}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconBitcoinBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Bitcoin BulkRounded"
    >
      <path 
        d={d.d7}
        i-c="c f fr o7"
      />
      <path 
        d={d.d8}
        i-c="f"
      />
      <path 
        d={d.d9}
        i-c="f"
      />
      <path 
        d={d.d10}
        i-c="f"
      />
      <path 
        d={d.d11}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconBitcoinStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Bitcoin StrokeSharp"
    >
      <path 
        d={d.d12}
        i-c="s sj sw"
      />
      <path 
        d={d.d13}
        i-c="s sj sw"
      />
      <path 
        d={d.d14}
        i-c="s sj sw"
      />
      <path 
        d={d.d15}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconBitcoinSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Bitcoin SolidSharp"
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
    </TheIconWrapper>
  );
};

export const iconPackOfBitcoin: TheIconSelfPack = [
  'Bitcoin',
  IconBitcoinStrokeRounded,
  IconBitcoinDuotoneRounded,
  IconBitcoinTwotoneRounded,
  IconBitcoinSolidRounded,
  IconBitcoinBulkRounded,
  IconBitcoinStrokeSharp,
  IconBitcoinSolidSharp,
];