import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M20.8284 5.17157C19.6569 4 17.7712 4 14 4L10 4C6.22877 4 4.34315 4 3.17157 5.17157M20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284M20.8284 5.17157C20.8284 5.17157 20.8284 5.17157 20.8284 5.17157ZM3.17157 5.17157C2 6.34315 2 8.22876 2 12C2 15.7712 2 17.6569 3.17157 18.8284M3.17157 5.17157C3.17157 5.17157 3.17157 5.17157 3.17157 5.17157ZM3.17157 18.8284C4.34315 20 6.22876 20 10 20H14C17.7712 20 19.6569 20 20.8284 18.8284M3.17157 18.8284C3.17157 18.8284 3.17157 18.8284 3.17157 18.8284ZM20.8284 18.8284C20.8284 18.8284 20.8284 18.8284 20.8284 18.8284Z',
  d2: 'M13 12L11 12',
  d3: 'M18.5 12L16.5 12',
  d4: 'M7.5 12L5.5 12',
  d5: 'M22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C3.17157 18.8284 3.17157 18.8284 3.17157 18.8284C2 17.6569 2 15.7712 2 12C2 8.22876 2 6.34315 3.17157 5.17157C3.17157 5.17157 3.17157 5.17157 3.17157 5.17157C4.34315 4 6.22877 4 10 4L14 4C17.7712 4 19.6569 4 20.8284 5.17157C20.8284 5.17157 20.8284 5.17157 20.8284 5.17157C22 6.34315 22 8.22876 22 12Z',
  d6: 'M5.51098 20.5969C6.65018 20.75 8.1058 20.75 9.94354 20.75H9.94359H14.0564H14.0565C15.8942 20.75 17.3498 20.75 18.489 20.5969C19.6614 20.4392 20.6104 20.1071 21.3588 19.3588C22.1071 18.6104 22.4392 17.6614 22.5969 16.489C22.75 15.3498 22.75 13.8942 22.75 12.0565V12.0564V11.9436V11.9435C22.75 10.1058 22.75 8.65018 22.5969 7.51098C22.4392 6.33856 22.1071 5.38961 21.3588 4.64124C20.6104 3.89288 19.6614 3.56076 18.489 3.40314C17.3498 3.24997 15.8942 3.24999 14.0564 3.25H14.0564H9.94359H9.94358C8.10582 3.24998 6.65019 3.24997 5.51098 3.40314C4.33856 3.56076 3.38961 3.89288 2.64124 4.64124C1.89288 5.38961 1.56076 6.33856 1.40314 7.51098C1.24997 8.65019 1.24998 10.1058 1.25 11.9436V11.9436V12.0564V12.0564C1.24998 13.8942 1.24997 15.3498 1.40314 16.489C1.56076 17.6614 1.89288 18.6104 2.64124 19.3588C3.38961 20.1071 4.33855 20.4392 5.51098 20.5969ZM5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H7C7.55228 13 8 12.5523 8 12C8 11.4477 7.55228 11 7 11H5ZM17 11C16.4477 11 16 11.4477 16 12C16 12.5523 16.4477 13 17 13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H17ZM13 11H11C10.4477 11 10 11.4477 10 12C10 12.5523 10.4477 13 11 13H13C13.5523 13 14 12.5523 14 12C14 11.4477 13.5523 11 13 11Z',
  d7: 'M9.94354 20.75C8.1058 20.75 6.65018 20.75 5.51098 20.5969C4.33855 20.4392 3.38961 20.1071 2.64124 19.3588C1.89288 18.6104 1.56076 17.6614 1.40314 16.489C1.24997 15.3498 1.24998 13.8942 1.25 12.0564V12.0564V11.9436V11.9436C1.24998 10.1058 1.24997 8.65019 1.40314 7.51098C1.56076 6.33856 1.89288 5.38961 2.64124 4.64124C3.38961 3.89288 4.33856 3.56076 5.51098 3.40314C6.65019 3.24997 8.10582 3.24998 9.94358 3.25H9.94359H14.0564H14.0564C15.8942 3.24999 17.3498 3.24997 18.489 3.40314C19.6614 3.56076 20.6104 3.89288 21.3588 4.64124C22.1071 5.38961 22.4392 6.33856 22.5969 7.51098C22.75 8.65018 22.75 10.1058 22.75 11.9435V11.9436V12.0564V12.0565C22.75 13.8942 22.75 15.3498 22.5969 16.489C22.4392 17.6614 22.1071 18.6104 21.3588 19.3588C20.6104 20.1071 19.6614 20.4392 18.489 20.5969C17.3498 20.75 15.8942 20.75 14.0565 20.75H14.0564H9.94359H9.94354Z',
  d8: 'M4 12C4 11.4477 4.44772 11 5 11L7 11C7.55228 11 8 11.4477 8 12C8 12.5523 7.55228 13 7 13H5C4.44772 13 4 12.5523 4 12ZM16 12C16 11.4477 16.4477 11 17 11L19 11C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H17C16.4477 13 16 12.5523 16 12ZM11 11L13 11C13.5523 11 14 11.4477 14 12C14 12.5523 13.5523 13 13 13L11 13C10.4477 13 10 12.5523 10 12C10 11.4477 10.4477 11 11 11Z',
  d9: 'M2 4L2 20H22V4L2 4Z',
  d10: 'M13.5 12L10.5 12',
  d11: 'M19 12L16 12',
  d12: 'M8 12L5 12',
  d13: 'M2 3.25C1.80109 3.25 1.61032 3.32902 1.46967 3.46967C1.32902 3.61032 1.25 3.80109 1.25 4V20C1.25 20.1989 1.32902 20.3897 1.46967 20.5303C1.61032 20.671 1.80109 20.75 2 20.75H22C22.4142 20.75 22.75 20.4142 22.75 20V4C22.75 3.58579 22.4142 3.25 22 3.25H2ZM8 11H5V13H8V11ZM10.5 11H13.5V13H10.5V11ZM19 11H16V13H19V11Z',
};

export const IconRoad02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Road02 StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sw"
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
    </TheIconWrapper>
  );
};

export const IconRoad02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Road02 DuotoneRounded"
    >
      <path 
        d={d.d5}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sj sw"
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
    </TheIconWrapper>
  );
};

export const IconRoad02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Road02 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sw"
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
    </TheIconWrapper>
  );
};

export const IconRoad02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Road02 SolidRounded"
    >
      <path 
        d={d.d6}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconRoad02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Road02 BulkRounded"
    >
      <path 
        d={d.d7}
        i-c="f o7"
      />
      <path 
        d={d.d8}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconRoad02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Road02 StrokeSharp"
    >
      <path 
        d={d.d9}
        i-c="s sj sw"
      />
      <path 
        d={d.d10}
        i-c="s sj sw"
      />
      <path 
        d={d.d11}
        i-c="s sj sw"
      />
      <path 
        d={d.d12}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconRoad02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Road02 SolidSharp"
    >
      <path 
        d={d.d13}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfRoad02: TheIconSelfPack = [
  'Road02',
  IconRoad02StrokeRounded,
  IconRoad02DuotoneRounded,
  IconRoad02TwotoneRounded,
  IconRoad02SolidRounded,
  IconRoad02BulkRounded,
  IconRoad02StrokeSharp,
  IconRoad02SolidSharp,
];