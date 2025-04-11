import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M20.5 16.9286V10C20.5 6.22876 20.5 4.34315 19.3284 3.17157C18.1569 2 16.2712 2 12.5 2H11.5C7.72876 2 5.84315 2 4.67157 3.17157C3.5 4.34315 3.5 6.22876 3.5 10V19.5',
  d2: 'M20.5 17H6C4.61929 17 3.5 18.1193 3.5 19.5C3.5 20.8807 4.61929 22 6 22H20.5',
  d3: 'M20.5 22C19.1193 22 18 20.8807 18 19.5C18 18.1193 19.1193 17 20.5 17',
  d4: 'M15 7L9 7',
  d5: 'M12 11L9 11',
  d6: 'M11.5019 2H12.5019C16.2731 2 18.1587 2 19.3303 3.17157C20.5019 4.34315 20.5019 6.22876 20.5019 10V16.9286C17.3352 16.9524 10.2019 17 7.00187 17C4.4835 17 3.65804 18.0323 3.50187 18.8782V19.5C3.46637 19.3225 3.45961 19.1072 3.50187 18.8782V10C3.50187 6.22876 3.50187 4.34315 4.67345 3.17157C5.84502 2 7.73064 2 11.5019 2Z',
  d7: 'M11.4436 1.25H12.5564H12.5564H12.5564C14.3942 1.24999 15.8498 1.24997 16.989 1.40314C18.1614 1.56076 19.1104 1.89288 19.8588 2.64124C20.6071 3.38961 20.9392 4.33856 21.0969 5.51098C21.25 6.65018 21.25 8.10585 21.25 9.94359V17C21.25 17.082 21.2368 17.1609 21.2125 17.2348C21.1069 17.6738 20.7117 18 20.2402 18C19.4118 18 18.7402 18.6716 18.7402 19.5C18.7402 20.3284 19.4118 21 20.2402 21C20.7925 21 21.2402 21.4477 21.2402 22C21.2402 22.5339 20.8219 22.97 20.2951 22.9985C20.2811 22.9993 20.267 22.9997 20.2529 22.9999L20.2402 23H20.24H6.2099C4.2832 23 2.74609 21.4192 2.74609 19.5C2.74609 19.4439 2.74741 19.3882 2.75 19.3327V9.94357C2.74998 8.10582 2.74997 6.65019 2.90314 5.51098C3.06076 4.33856 3.39288 3.38961 4.14124 2.64124C4.88961 1.89288 5.83856 1.56076 7.01098 1.40314C8.15018 1.24997 9.60582 1.24999 11.4436 1.25H11.4436H11.4436ZM6.2099 18H17.0771C16.8611 18.4546 16.7402 18.9632 16.7402 19.5C16.7402 20.0368 16.8611 20.5454 17.0771 21H6.2099C5.41516 21 4.74609 20.3422 4.74609 19.5C4.74609 18.6578 5.41516 18 6.2099 18ZM15 7.75C15.4142 7.75 15.75 7.41421 15.75 7C15.75 6.58579 15.4142 6.25 15 6.25H9C8.58579 6.25 8.25 6.58579 8.25 7C8.25 7.41421 8.58579 7.75 9 7.75H15ZM12 11.75C12.4142 11.75 12.75 11.4142 12.75 11C12.75 10.5858 12.4142 10.25 12 10.25H9C8.58579 10.25 8.25 10.5858 8.25 11C8.25 11.4142 8.58579 11.75 9 11.75H12Z',
  d8: 'M12.5564 1.25H11.4436H11.4436C9.60583 1.24999 8.15019 1.24997 7.01098 1.40314C5.83856 1.56076 4.88961 1.89288 4.14124 2.64124C3.39288 3.38961 3.06076 4.33856 2.90314 5.51098C2.74997 6.65019 2.74998 8.10582 2.75 9.94357V19.3327C2.74741 19.3882 2.74609 19.4439 2.74609 19.5C2.74609 21.4192 4.2832 23 6.2099 23H20.24C20.2401 23 20.2401 23 20.2402 23C20.2445 23 20.2487 23 20.2529 22.9999C20.267 22.9997 20.2811 22.9993 20.2951 22.9985C20.8219 22.97 21.2402 22.5339 21.2402 22C21.2402 21.4477 20.7925 21 20.2402 21C19.4118 21 18.7402 20.3284 18.7402 19.5C18.7402 18.6716 19.4118 18 20.2402 18C20.7117 18 21.1069 17.6738 21.2125 17.2348C21.2368 17.1609 21.25 17.082 21.25 17V9.94359C21.25 8.10585 21.25 6.65018 21.0969 5.51098C20.9392 4.33856 20.6071 3.38961 19.8588 2.64124C19.1104 1.89288 18.1614 1.56076 16.989 1.40314C15.8498 1.24997 14.3942 1.24999 12.5564 1.25H12.5564ZM17.0771 18H6.2099C5.41516 18 4.74609 18.6578 4.74609 19.5C4.74609 20.3422 5.41516 21 6.2099 21H17.0771C16.8611 20.5454 16.7402 20.0368 16.7402 19.5C16.7402 18.9632 16.8611 18.4546 17.0771 18Z',
  d9: 'M15.75 7C15.75 7.41421 15.4142 7.75 15 7.75H9C8.58579 7.75 8.25 7.41421 8.25 7C8.25 6.58579 8.58579 6.25 9 6.25L15 6.25C15.4142 6.25 15.75 6.58579 15.75 7Z',
  d10: 'M12.75 11C12.75 11.4142 12.4142 11.75 12 11.75H9C8.58579 11.75 8.25 11.4142 8.25 11C8.25 10.5858 8.58579 10.25 9 10.25H12C12.4142 10.25 12.75 10.5858 12.75 11Z',
  d11: 'M15.9792 6.99707H7.99219',
  d12: 'M11.9857 10.9941H7.99219',
  d13: 'M18.4771 21.9891H7.50353C5.10656 22.0646 3.79572 21.3023 3.50328 19.1283M18.4771 21.9891H20.4575M18.4771 21.9891V15.9831M18.4771 15.9831H20.4824V1.99316L6.3848 1.9933C4.47195 2.207 3.33194 3.28418 3.50327 6.14594L3.50332 16.4278C3.47042 17.1926 3.50344 18.26 3.50328 19.1283M18.4771 15.9831L7.4723 15.9719C4.57044 15.8517 3.58159 17.2115 3.50328 19.1283',
  d14: 'M2.75 4.99979C2.75011 2.92882 4.429 1.25 6.5 1.25H21.2501L21.2474 17.125H19.5105V20.875H21.2474V22.75H6.69022C4.51194 22.75 2.74609 21.0709 2.74609 18.9998L2.75 4.99979ZM17.539 17.125H6.69081C5.60214 17.125 4.71951 17.9637 4.71875 18.9987V19C4.7189 20.0354 5.60176 20.875 6.69081 20.875H17.539V17.125ZM8 6.25H16V7.75H8V6.25ZM12 10.25H8V11.75H12V10.25Z',
};

export const IconBook02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Book02 StrokeRounded"
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
        i-c="s sj sr sw"
      />
      <path 
        d={d.d5}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconBook02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Book02 DuotoneRounded"
    >
      <path 
        d={d.d6}
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
        i-c="s sj sr sw"
      />
      <path 
        d={d.d5}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconBook02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Book02 TwotoneRounded"
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
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d5}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconBook02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Book02 SolidRounded"
    >
      <path 
        d={d.d7}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconBook02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Book02 BulkRounded"
    >
      <path 
        d={d.d8}
        i-c="c f fr o7"
      />
      <path 
        d={d.d9}
        i-c="c f fr"
      />
      <path 
        d={d.d10}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconBook02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Book02 StrokeSharp"
    >
      <path 
        d={d.d11}
        i-c="s sj sw"
      />
      <path 
        d={d.d12}
        i-c="s sj sw"
      />
      <path 
        d={d.d13}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconBook02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Book02 SolidSharp"
    >
      <path 
        d={d.d14}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfBook02: TheIconSelfPack = [
  'Book02',
  IconBook02StrokeRounded,
  IconBook02DuotoneRounded,
  IconBook02TwotoneRounded,
  IconBook02SolidRounded,
  IconBook02BulkRounded,
  IconBook02StrokeSharp,
  IconBook02SolidSharp,
];