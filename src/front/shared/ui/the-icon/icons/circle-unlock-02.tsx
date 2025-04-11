import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M5 15C5 11.134 8.13401 8 12 8C15.866 8 19 11.134 19 15C19 18.866 15.866 22 12 22C8.13401 22 5 18.866 5 15Z',
  d2: 'M7.5 9.5V6.5C7.5 4.01472 9.51472 2 12 2C13.5602 2 14.935 2.79401 15.7422 4',
  d3: 'M12 16V14',
  d4: 'M6.5 6.75C6.5 3.71243 8.96243 1.25 12 1.25C13.9079 1.25 15.5883 2.22228 16.5732 3.69374C16.8804 4.15269 16.7574 4.77379 16.2985 5.08101C15.8395 5.38822 15.2184 5.26521 14.9112 4.80626C14.2817 3.86575 13.2125 3.25 12 3.25C10.067 3.25 8.5 4.817 8.5 6.75V9.75C8.5 10.3023 8.05228 10.75 7.5 10.75C6.94772 10.75 6.5 10.3023 6.5 9.75V6.75Z',
  d5: 'M12 7.25C7.71979 7.25 4.25 10.7198 4.25 15C4.25 19.2802 7.71979 22.75 12 22.75C16.2802 22.75 19.75 19.2802 19.75 15C19.75 10.7198 16.2802 7.25 12 7.25ZM13 14C13 13.4477 12.5523 13 12 13C11.4477 13 11 13.4477 11 14V16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16V14Z',
  d6: 'M4.25 15C4.25 10.7198 7.71979 7.25 12 7.25C16.2802 7.25 19.75 10.7198 19.75 15C19.75 19.2802 16.2802 22.75 12 22.75C7.71979 22.75 4.25 19.2802 4.25 15Z',
  d7: 'M12 1.25C8.96243 1.25 6.5 3.71243 6.5 6.75V9.53992C7.08168 8.95401 7.75634 8.46054 8.5 8.08347V6.75C8.5 4.817 10.067 3.25 12 3.25C13.2125 3.25 14.2817 3.86575 14.9112 4.80626C15.2184 5.26521 15.8395 5.38822 16.2985 5.08101C16.7574 4.77379 16.8804 4.15269 16.5732 3.69374C15.5883 2.22228 13.9079 1.25 12 1.25Z',
  d8: 'M12 13C12.5523 13 13 13.4477 13 14V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V14C11 13.4477 11.4477 13 12 13Z',
  d9: 'M12 16.5V13.5',
  d10: 'M4.25 15C4.25 10.7198 7.71979 7.25 12 7.25C16.2802 7.25 19.75 10.7198 19.75 15C19.75 19.2802 16.2802 22.75 12 22.75C7.71979 22.75 4.25 19.2802 4.25 15ZM13 16.5V13.5H11V16.5H13Z',
  d11: 'M6.5 6.75C6.5 3.71243 8.96243 1.25 12 1.25C13.9079 1.25 15.5883 2.22228 16.5732 3.69374L14.9112 4.80626C14.2817 3.86575 13.2125 3.25 12 3.25C10.067 3.25 8.5 4.817 8.5 6.75V9.75H6.5V6.75Z',
};

export const IconCircleUnlock02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CircleUnlock02 StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="s sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconCircleUnlock02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CircleUnlock02 DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="s sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconCircleUnlock02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CircleUnlock02 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sr sw"
      />
      <path 
        d={d.d3}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconCircleUnlock02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CircleUnlock02 SolidRounded"
    >
      <path 
        d={d.d4}
        i-c="c f fr"
      />
      <path 
        d={d.d5}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconCircleUnlock02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CircleUnlock02 BulkRounded"
    >
      <path 
        d={d.d6}
        i-c="f o7"
      />
      <path 
        d={d.d7}
        i-c="f"
      />
      <path 
        d={d.d8}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconCircleUnlock02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CircleUnlock02 StrokeSharp"
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
        d={d.d9}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconCircleUnlock02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CircleUnlock02 SolidSharp"
    >
      <path 
        d={d.d10}
        i-c="c f fr"
      />
      <path 
        d={d.d11}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfCircleUnlock02: TheIconSelfPack = [
  'CircleUnlock02',
  IconCircleUnlock02StrokeRounded,
  IconCircleUnlock02DuotoneRounded,
  IconCircleUnlock02TwotoneRounded,
  IconCircleUnlock02SolidRounded,
  IconCircleUnlock02BulkRounded,
  IconCircleUnlock02StrokeSharp,
  IconCircleUnlock02SolidSharp,
];