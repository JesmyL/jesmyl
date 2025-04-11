import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M15 9V15H9V9H15Z',
  d2: 'M15 15H18C19.6569 15 21 16.3431 21 18C21 19.6569 19.6569 21 18 21C16.3431 21 15 19.6569 15 18V15Z',
  d3: 'M9 15.002H6C4.34315 15.002 3 16.3451 3 18.002C3 19.6588 4.34315 21.002 6 21.002C7.65685 21.002 9 19.6588 9 18.002V15.002Z',
  d4: 'M15 9.00012L15 6.00012C15 4.34327 16.3431 3.00012 18 3.00012C19.6569 3.00012 21 4.34327 21 6.00012C21 7.65698 19.6569 9.00012 18 9.00012H15Z',
  d5: 'M9 9.00012V6.00012C9 4.34327 7.65685 3.00012 6 3.00012C4.34315 3.00012 3 4.34327 3 6.00012C3 7.65698 4.34315 9.00012 6 9.00012H9Z',
  d6: 'M15 9L15 6C15 4.34315 16.3431 3 18 3C19.6569 3 21 4.34315 21 6C21 7.65685 19.6569 9 18 9H15Z',
  d7: 'M9 9V6C9 4.34315 7.65685 3 6 3C4.34315 3 3 4.34315 3 6C3 7.65685 4.34315 9 6 9H9Z',
  d8: 'M8 9C8 8.44772 8.44772 8 9 8H15C15.5523 8 16 8.44772 16 9V15C16 15.5523 15.5523 16 15 16H9C8.44772 16 8 15.5523 8 15V9ZM10 10V14H14V10H10Z',
  d9: 'M14 15C14 14.4477 14.4477 14 15 14H18C20.2091 14 22 15.7909 22 18C22 20.2091 20.2091 22 18 22C15.7909 22 14 20.2091 14 18V15ZM16 16V18C16 19.1046 16.8954 20 18 20C19.1046 20 20 19.1046 20 18C20 16.8954 19.1046 16 18 16H16Z',
  d10: 'M6 16.002C4.89543 16.002 4 16.8974 4 18.002C4 19.1065 4.89543 20.002 6 20.002C7.10457 20.002 8 19.1065 8 18.002V16.002H6ZM2 18.002C2 15.7928 3.79086 14.002 6 14.002H9C9.55228 14.002 10 14.4497 10 15.002V18.002C10 20.2111 8.20914 22.002 6 22.002C3.79086 22.002 2 20.2111 2 18.002Z',
  d11: 'M14 6.00012C14 3.79098 15.7909 2.00012 18 2.00012C20.2091 2.00012 22 3.79098 22 6.00012C22 8.20926 20.2091 10.0001 18 10.0001H15C14.4477 10.0001 14 9.55241 14 9.00012L14 6.00012ZM18 4.00012C16.8954 4.00012 16 4.89555 16 6.00012L16 8.00012H18C19.1046 8.00012 20 7.10469 20 6.00012C20 4.89555 19.1046 4.00012 18 4.00012Z',
  d12: 'M2 6.00012C2 3.79098 3.79086 2.00012 6 2.00012C8.20914 2.00012 10 3.79098 10 6.00012V9.00012C10 9.55241 9.55228 10.0001 9 10.0001H6C3.79086 10.0001 2 8.20926 2 6.00012ZM6 4.00012C4.89543 4.00012 4 4.89555 4 6.00012C4 7.10469 4.89543 8.00012 6 8.00012H8V6.00012C8 4.89555 7.10457 4.00012 6 4.00012Z',
  d13: 'M8 8H16V16H8V8ZM10 10V14H14V10H10Z',
  d14: 'M14 14H18C20.2091 14 22 15.7909 22 18C22 20.2091 20.2091 22 18 22C15.7909 22 14 20.2091 14 18V14ZM16 16V18C16 19.1046 16.8954 20 18 20C19.1046 20 20 19.1046 20 18C20 16.8954 19.1046 16 18 16H16Z',
  d15: 'M6 16.002C4.89543 16.002 4 16.8974 4 18.002C4 19.1065 4.89543 20.002 6 20.002C7.10457 20.002 8 19.1065 8 18.002V16.002H6ZM2 18.002C2 15.7928 3.79086 14.002 6 14.002H10V18.002C10 20.2111 8.20914 22.002 6 22.002C3.79086 22.002 2 20.2111 2 18.002Z',
  d16: 'M14 6.00012C14 3.79098 15.7909 2.00012 18 2.00012C20.2091 2.00012 22 3.79098 22 6.00012C22 8.20926 20.2091 10.0001 18 10.0001H14L14 6.00012ZM18 4.00012C16.8954 4.00012 16 4.89555 16 6.00012L16 8.00012H18C19.1046 8.00012 20 7.10469 20 6.00012C20 4.89555 19.1046 4.00012 18 4.00012Z',
  d17: 'M2 6.00012C2 3.79098 3.79086 2.00012 6 2.00012C8.20914 2.00012 10 3.79098 10 6.00012V10.0001H6C3.79086 10.0001 2 8.20926 2 6.00012ZM6 4.00012C4.89543 4.00012 4 4.89555 4 6.00012C4 7.10469 4.89543 8.00012 6 8.00012H8V6.00012C8 4.89555 7.10457 4.00012 6 4.00012Z',
};

export const IconCommandStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Command StrokeRounded"
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
        d={d.d5}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconCommandDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Command DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="f o7"
      />
      <path 
        d={d.d2}
        i-c="f o7"
      />
      <path 
        d={d.d3}
        i-c="f o7"
      />
      <path 
        d={d.d6}
        i-c="f o7"
      />
      <path 
        d={d.d7}
        i-c="f o7"
      />
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
        d={d.d5}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconCommandTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Command TwotoneRounded"
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
        i-c="o7 s sj sw"
      />
      <path 
        d={d.d4}
        i-c="o7 s sj sw"
      />
      <path 
        d={d.d5}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconCommandSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Command SolidRounded"
    >
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

export const IconCommandBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Command BulkRounded"
    >
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
        i-c="c f fr o7"
      />
      <path 
        d={d.d11}
        i-c="c f fr o7"
      />
      <path 
        d={d.d12}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconCommandStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Command StrokeSharp"
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
    </TheIconWrapper>
  );
};

export const IconCommandSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Command SolidSharp"
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
    </TheIconWrapper>
  );
};

export const iconPackOfCommand: TheIconSelfPack = [
  'Command',
  IconCommandStrokeRounded,
  IconCommandDuotoneRounded,
  IconCommandTwotoneRounded,
  IconCommandSolidRounded,
  IconCommandBulkRounded,
  IconCommandStrokeSharp,
  IconCommandSolidSharp,
];