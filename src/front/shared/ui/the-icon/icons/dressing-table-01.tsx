import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M10 6L11 5M11 8L13 6',
  d2: 'M6 14V8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8V14',
  d3: 'M5 14V22M19 14V22',
  d4: 'M4 14H20',
  d5: 'M5 19L19 19',
  d6: 'M11.5 16.5H12.5',
  d7: 'M18 19L6 19C5.44772 19 5 18.5523 5 18V14H19V18C19 18.5523 18.5523 19 18 19Z',
  d8: 'M6 8V14H18V8C18 4.68629 15.3137 2 12 2C8.68629 2 6 4.68629 6 8Z',
  d9: 'M4 14H5M20 14H19M5 14V18C5 18.5523 5.44772 19 6 19L18 19C18.5523 19 19 18.5523 19 18V14M5 14H19',
  d10: 'M12 3C9.23858 3 7 5.23858 7 8V14C7 14.5523 6.55228 15 6 15C5.44772 15 5 14.5523 5 14V8C5 4.13401 8.13401 1 12 1C15.866 1 19 4.13401 19 8V14C19 14.5523 18.5523 15 18 15C17.4477 15 17 14.5523 17 14V8C17 5.23858 14.7614 3 12 3Z',
  d11: 'M11.5303 4.46967C11.8232 4.76256 11.8232 5.23744 11.5303 5.53033L10.5303 6.53033C10.2374 6.82322 9.76256 6.82322 9.46967 6.53033C9.17678 6.23744 9.17678 5.76256 9.46967 5.46967L10.4697 4.46967C10.7626 4.17678 11.2374 4.17678 11.5303 4.46967ZM13.5303 5.46967C13.8232 5.76256 13.8232 6.23744 13.5303 6.53033L11.5303 8.53033C11.2374 8.82322 10.7626 8.82322 10.4697 8.53033C10.1768 8.23744 10.1768 7.76256 10.4697 7.46967L12.4697 5.46967C12.7626 5.17678 13.2374 5.17678 13.5303 5.46967Z',
  d12: 'M6 19.75V22C6 22.5523 5.55228 23 5 23C4.44772 23 4 22.5523 4 22L4 15C3.44772 15 3 14.5523 3 14C3 13.4477 3.44772 13 4 13L20 13C20.5523 13 21 13.4477 21 14C21 14.5523 20.5523 15 20 15V22C20 22.5523 19.5523 23 19 23C18.4477 23 18 22.5523 18 22V19.75L6 19.75ZM11.5 15.75C11.0858 15.75 10.75 16.0858 10.75 16.5C10.75 16.9142 11.0858 17.25 11.5 17.25H12.5C12.9142 17.25 13.25 16.9142 13.25 16.5C13.25 16.0858 12.9142 15.75 12.5 15.75H11.5Z',
  d13: 'M6 19.75L18 19.75V15H6V19.75Z',
  d14: 'M5 23C5.55228 23 6 22.5523 6 22V15H18V22C18 22.5523 18.4477 23 19 23C19.5523 23 20 22.5523 20 22V15C20.5523 15 21 14.5523 21 14C21 13.4477 20.5523 13 20 13H4C3.44772 13 3 13.4477 3 14C3 14.5523 3.44772 15 4 15V22C4 22.5523 4.44772 23 5 23Z',
  d15: 'M10.75 17.375C10.75 16.9608 11.0858 16.625 11.5 16.625H12.5C12.9142 16.625 13.25 16.9608 13.25 17.375C13.25 17.7892 12.9142 18.125 12.5 18.125H11.5C11.0858 18.125 10.75 17.7892 10.75 17.375Z',
  d16: 'M9 7L11 5M10 10L14 6',
  d17: 'M3 14H21',
  d18: 'M11 16.5H13',
  d19: 'M10.4697 4.96973L11.5304 6.03039L9.53039 8.03039L8.46973 6.96973L10.4697 4.96973ZM14.5304 7.03039L10.5304 11.0304L9.46973 9.96973L13.4697 5.96973L14.5304 7.03039Z',
  d20: 'M12 3.5C9.23858 3.5 7 5.73858 7 8.5V14.5H5V8.5C5 4.63401 8.13401 1.5 12 1.5C15.866 1.5 19 4.63401 19 8.5V14.5H17V8.5C17 5.73858 14.7614 3.5 12 3.5Z',
  d21: 'M4 15.5L4 22.5H6V20.25L18 20.25V22.5H20V15.5H21V13.5L3 13.5V15.5H4ZM11 17.75H13V16.25H11V17.75Z',
};

export const IconDressingTable01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="DressingTable01 StrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconDressingTable01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="DressingTable01 DuotoneRounded"
    >
      <path 
        d={d.d7}
        i-c="f o7"
      />
      <path 
        d={d.d8}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d9}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d6}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconDressingTable01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="DressingTable01 TwotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconDressingTable01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="DressingTable01 SolidRounded"
    >
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

export const IconDressingTable01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="DressingTable01 BulkRounded"
    >
      <path 
        d={d.d10}
        i-c="c f fr o7"
      />
      <path 
        d={d.d13}
        i-c="f o7"
      />
      <path 
        d={d.d11}
        i-c="c f fr"
      />
      <path 
        d={d.d14}
        i-c="f"
      />
      <path 
        d={d.d15}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconDressingTable01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="DressingTable01 StrokeSharp"
    >
      <path 
        d={d.d16}
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
        d={d.d17}
        i-c="s sj sw"
      />
      <path 
        d={d.d5}
        i-c="s sj sw"
      />
      <path 
        d={d.d18}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconDressingTable01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="DressingTable01 SolidSharp"
    >
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

export const iconPackOfDressingTable01: TheIconSelfPack = [
  'DressingTable01',
  IconDressingTable01StrokeRounded,
  IconDressingTable01DuotoneRounded,
  IconDressingTable01TwotoneRounded,
  IconDressingTable01SolidRounded,
  IconDressingTable01BulkRounded,
  IconDressingTable01StrokeSharp,
  IconDressingTable01SolidSharp,
];