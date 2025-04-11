import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3 3V21',
  d2: 'M9 3V21',
  d3: 'M15 15L15 21',
  d4: 'M15 3L15 9',
  d5: 'M21 3V21',
  d6: 'M2 3H22',
  d7: 'M21 9H15C14.0572 9 13.5858 9 13.2929 9.29289C13 9.58579 13 10.0572 13 11V13C13 13.9428 13 14.4142 13.2929 14.7071C13.5858 15 14.0572 15 15 15L21 15',
  d8: 'M2 21H22',
  d9: 'M17 12L16 12',
  d10: 'M3 3V21H21V15H15C14.0572 15 13.5858 15 13.2929 14.7071C13 14.4142 13 13.9428 13 13V11C13 10.0572 13 9.58579 13.2929 9.29289C13.5858 9 14.0572 9 15 9H21V3H3Z',
  d11: 'M2 2C1.44772 2 1 2.44772 1 3C1 3.55228 1.44772 4 2 4V20C1.44772 20 1 20.4477 1 21C1 21.5523 1.44772 22 2 22H22C22.5523 22 23 21.5523 23 21C23 20.4477 22.5523 20 22 20V4C22.5523 4 23 3.55228 23 3C23 2.44772 22.5523 2 22 2H2ZM4 20V4H8V20H4ZM10 20V4H14V8.27254C13.9316 8.27802 13.8658 8.28484 13.8028 8.29331C13.4473 8.3411 13.0716 8.45355 12.7626 8.76257C12.4535 9.07159 12.3411 9.44732 12.2933 9.8028C12.2499 10.1256 12.25 10.5224 12.25 10.9553V13.0448C12.25 13.4776 12.2499 13.8744 12.2933 14.1972C12.3411 14.5527 12.4535 14.9284 12.7626 15.2374C13.0716 15.5465 13.4473 15.6589 13.8028 15.7067C13.8658 15.7152 13.9316 15.722 14 15.7275V20H10ZM16 15.75V20H20V15.75L16 15.75ZM20 8.25001V4H16V8.25L20 8.25001ZM17.75 12C17.75 12.4142 17.4142 12.75 17 12.75H16C15.5858 12.75 15.25 12.4142 15.25 12C15.25 11.5858 15.5858 11.25 16 11.25H17C17.4142 11.25 17.75 11.5858 17.75 12Z',
  d12: 'M1 3C1 2.44772 1.44772 2 2 2H22C22.5523 2 23 2.44772 23 3C23 3.55228 22.5523 4 22 4V20C22.5523 20 23 20.4477 23 21C23 21.5523 22.5523 22 22 22H2C1.44772 22 1 21.5523 1 21C1 20.4477 1.44772 20 2 20V4C1.44772 4 1 3.55228 1 3ZM4 4V20H8V4H4ZM10 4V20H14V15C14 14.4477 14.4477 14 15 14C15.5523 14 16 14.4477 16 15V20H20V4H16V9C16 9.55228 15.5523 10 15 10C14.4477 10 14 9.55228 14 9V4H10Z',
  d13: 'M21.25 8.25001L15.2053 8.25C14.7724 8.24995 14.3756 8.24991 14.0528 8.29331C13.6973 8.3411 13.3216 8.45355 13.0126 8.76257C12.7035 9.07159 12.5911 9.44732 12.5433 9.8028C12.4999 10.1256 12.5 10.5224 12.5 10.9553L12.5 13.0448C12.5 13.4776 12.4999 13.8744 12.5433 14.1972C12.5911 14.5527 12.7035 14.9284 13.0126 15.2374C13.3216 15.5465 13.6973 15.6589 14.0528 15.7067C14.3756 15.7501 14.7724 15.7501 15.2053 15.75H15.2053L21.25 15.75C21.4489 15.75 21.6397 15.671 21.7803 15.5303C21.921 15.3897 22 15.1989 22 15V9.00001C22 8.58579 21.6642 8.25001 21.25 8.25001ZM17.25 12.75C17.6642 12.75 18 12.4142 18 12C18 11.5858 17.6642 11.25 17.25 11.25H16.25C15.8358 11.25 15.5 11.5858 15.5 12C15.5 12.4142 15.8358 12.75 16.25 12.75H17.25Z',
  d14: 'M3.75 3V21M9.25 3V21M14.75 15V21M14.75 3V9M20.25 3V21',
  d15: 'M20 9H13V15L20 15',
  d16: 'M17.5 12L15.5 12',
  d17: 'M2.75 21V3H4.75V21H2.75ZM8.25 21V3H10.25V21H8.25ZM13.75 9V3H15.75V9H13.75ZM19.25 21V3H21.25V21H19.25ZM13.75 21V15H15.75V21H13.75Z',
  d18: 'M22 4H2V2H22V4Z',
  d19: 'M22 22H2V20H22V22Z',
  d20: 'M13 8.25C12.5858 8.25 12.25 8.58579 12.25 9V15C12.25 15.4142 12.5858 15.75 13 15.75L20 15.75V8.25H13ZM17.125 11H15.125V13H17.125V11Z',
};

export const IconPrisonStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Prison StrokeRounded"
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
      <path 
        d={d.d6}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d7}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d8}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d9}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconPrisonDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Prison DuotoneRounded"
    >
      <path 
        d={d.d10}
        i-c="f o7"
      />
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
      <path 
        d={d.d6}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d8}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d9}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d7}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconPrisonTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Prison TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
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
        i-c="s sj sr sw"
      />
      <path 
        d={d.d6}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d7}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d8}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d9}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconPrisonSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Prison SolidRounded"
    >
      <path 
        d={d.d11}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconPrisonBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Prison BulkRounded"
    >
      <path 
        d={d.d12}
        i-c="c f fr o7"
      />
      <path 
        d={d.d13}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconPrisonStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Prison StrokeSharp"
    >
      <path 
        d={d.d14}
        i-c="s sj sw"
      />
      <path 
        d={d.d6}
        i-c="s sj sw"
      />
      <path 
        d={d.d15}
        i-c="s sj sw"
      />
      <path 
        d={d.d8}
        i-c="s sj sw"
      />
      <path 
        d={d.d16}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconPrisonSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Prison SolidSharp"
    >
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
    </TheIconWrapper>
  );
};

export const iconPackOfPrison: TheIconSelfPack = [
  'Prison',
  IconPrisonStrokeRounded,
  IconPrisonDuotoneRounded,
  IconPrisonTwotoneRounded,
  IconPrisonSolidRounded,
  IconPrisonBulkRounded,
  IconPrisonStrokeSharp,
  IconPrisonSolidSharp,
];