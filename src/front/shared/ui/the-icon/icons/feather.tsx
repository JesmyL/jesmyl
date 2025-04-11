import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M9.68645 17C11.3214 17 12.1388 17 12.8739 16.6955C13.609 16.3911 14.187 15.8131 15.3431 14.657L19.7578 10.2426C21.4147 8.58579 21.4147 5.8995 19.7578 4.24264C18.101 2.58579 15.4147 2.58578 13.7578 4.24264L9.34333 8.65682C8.18712 9.81296 7.60901 10.391 7.30451 11.1261C7 11.8612 7 12.6788 7 14.3139V17H9.68645Z',
  d2: 'M3 21L15 9',
  d3: 'M12 12H14.5',
  d4: 'M6.25005 16.6895L2.46967 20.4698C2.17678 20.7627 2.17678 21.2376 2.46967 21.5305C2.76256 21.8234 3.23744 21.8234 3.53033 21.5305L7.31066 17.7502L7.00006 17.7502C6.58584 17.7502 6.25006 17.4144 6.25006 17.0002L6.25005 16.6895Z',
  d5: 'M20.2882 3.71231C18.3385 1.76257 15.1773 1.76256 13.2276 3.71229L8.70266 8.23685C7.65275 9.28609 6.97399 9.96441 6.61166 10.8391C6.24933 11.7138 6.2496 12.6734 6.25003 14.1577L6.25005 16.6893L14.4697 8.46967C14.7626 8.17678 15.2374 8.17678 15.5303 8.46967C15.8232 8.76256 15.8232 9.23744 15.5303 9.53033L13.8107 11.25H14.5C14.9142 11.25 15.25 11.5858 15.25 12C15.25 12.4142 14.9142 12.75 14.5 12.75H12.3107L7.31066 17.75L9.84261 17.75C11.3268 17.7505 12.2863 17.7507 13.161 17.3885C14.0356 17.0262 14.7139 16.3475 15.7631 15.2978L20.2882 10.773C22.2379 8.82323 22.2379 5.66206 20.2882 3.71231Z',
  d6: 'M13.2276 3.71229C15.1773 1.76256 18.3385 1.76257 20.2882 3.71231C22.2379 5.66206 22.2379 8.82323 20.2882 10.773L15.7631 15.2978C14.7139 16.3475 14.0356 17.0262 13.161 17.3885C12.2863 17.7507 11.3268 17.7505 9.84261 17.75L7.00006 17.75C6.58584 17.75 6.25006 17.4142 6.25006 17L6.25003 14.1577C6.2496 12.6734 6.24933 11.7138 6.61166 10.8391C6.97399 9.96441 7.65275 9.28609 8.70266 8.23685L13.2276 3.71229Z',
  d7: 'M15.5303 8.46967C15.8232 8.76256 15.8232 9.23744 15.5303 9.53033L13.8107 11.25H14.5C14.9142 11.25 15.25 11.5858 15.25 12C15.25 12.4142 14.9142 12.75 14.5 12.75H12.3107L3.53033 21.5303C3.23744 21.8232 2.76256 21.8232 2.46967 21.5303C2.17678 21.2374 2.17678 20.7626 2.46967 20.4697L11.4693 11.4701C11.4695 11.4698 11.4698 11.4695 11.4701 11.4693L14.4697 8.46967C14.7626 8.17678 15.2374 8.17678 15.5303 8.46967Z',
  d8: 'M13 17L19.7583 10.2426C21.4151 8.58579 21.4151 5.8995 19.7583 4.24264C18.1014 2.58579 15.4151 2.58578 13.7583 4.24264L7 11L7.00047 17H13Z',
  d9: 'M3 21L12 12M15 9L12 12M14.5 12H12',
  d10: 'M6.25057 16.6895L2.25 20.6901L3.31066 21.7507L7.31084 17.7505H6.25067L6.25057 16.6895Z',
  d11: 'M20.2887 3.71231C18.339 1.76258 15.1779 1.76256 13.2281 3.71227L6.25 10.6893L6.25057 16.689L15 7.93945L16.0607 9.00011L13.8107 11.2501H15.25V12.7501H12.3107L7.31084 17.75H13.3112L20.2887 10.773C22.2385 8.82323 22.2385 5.66206 20.2887 3.71231Z',
};

export const IconFeatherStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Feather StrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconFeatherDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Feather DuotoneRounded"
    >
      <path 
        d={d.d1}
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
    </TheIconWrapper>
  );
};

export const IconFeatherTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Feather TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconFeatherSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Feather SolidRounded"
    >
      <path 
        d={d.d4}
        i-c="f"
      />
      <path 
        d={d.d5}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconFeatherBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Feather BulkRounded"
    >
      <path 
        d={d.d6}
        i-c="f o7"
      />
      <path 
        d={d.d7}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconFeatherStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Feather StrokeSharp"
    >
      <path 
        d={d.d8}
        i-c="s ss sw"
      />
      <path 
        d={d.d9}
        i-c="s ss sw"
      />
    </TheIconWrapper>
  );
};

export const IconFeatherSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Feather SolidSharp"
    >
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

export const iconPackOfFeather: TheIconSelfPack = [
  'Feather',
  IconFeatherStrokeRounded,
  IconFeatherDuotoneRounded,
  IconFeatherTwotoneRounded,
  IconFeatherSolidRounded,
  IconFeatherBulkRounded,
  IconFeatherStrokeSharp,
  IconFeatherSolidSharp,
];