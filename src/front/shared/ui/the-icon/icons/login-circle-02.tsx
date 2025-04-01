import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z',
  d2: 'M17.0001 12.0065H11.0252M11.0252 12.0065C11.0252 12.5743 12.8993 14.0151 12.8993 14.0151M11.0252 12.0065C11.0252 11.424 12.8993 10.021 12.8993 10.021M8 9.01074V15.0107',
  d3: 'M17.0001 11.9958H11.0252M11.0252 11.9958C11.0252 12.5636 12.8993 14.0044 12.8993 14.0044M11.0252 11.9958C11.0252 11.4133 12.8993 10.0103 12.8993 10.0103M8 9V15',
  d4: 'M12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25ZM8 16.75C7.58579 16.75 7.25 16.4142 7.25 16V8C7.25 7.58579 7.58579 7.25 8 7.25C8.41421 7.25 8.75 7.58579 8.75 8V16C8.75 16.4142 8.41421 16.75 8 16.75ZM18.75 12C18.75 12.4142 18.4142 12.75 18 12.75H13.75V13.061C13.75 13.3347 13.7501 13.6033 13.7264 13.8111C13.7079 13.9739 13.6462 14.4463 13.2279 14.6628C12.8093 14.8795 12.43 14.6345 12.3014 14.5482C12.1367 14.4377 11.943 14.2689 11.7455 14.0969L11.7174 14.0724C11.4152 13.8093 11.0798 13.5032 10.816 13.2002C10.6842 13.0489 10.554 12.88 10.4532 12.7015C10.3586 12.5338 10.25 12.2885 10.25 12C10.25 11.7115 10.3586 11.4662 10.4532 11.2985C10.554 11.12 10.6842 10.9511 10.816 10.7998C11.0798 10.4968 11.4152 10.1907 11.7174 9.92757L11.7455 9.90312C11.943 9.73106 12.1367 9.56231 12.3014 9.4518C12.43 9.36549 12.8093 9.12048 13.2279 9.33716C13.6462 9.55368 13.7079 10.0261 13.7264 10.1889C13.7501 10.3967 13.75 10.6653 13.75 10.939V11.25H18C18.4142 11.25 18.75 11.5858 18.75 12Z',
  d5: 'M22.75 12C22.75 6.06294 17.9371 1.25 12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12Z',
  d6: 'M7.25 8L7.25 16C7.25 16.4142 7.58579 16.75 8 16.75C8.41421 16.75 8.75 16.4142 8.75 16L8.75 8C8.75 7.58579 8.41421 7.25 8 7.25C7.58579 7.25 7.25 7.58579 7.25 8Z',
  d7: 'M18 12.75C18.4142 12.75 18.75 12.4142 18.75 12C18.75 11.5858 18.4142 11.25 18 11.25L13.75 11.25L13.75 10.939C13.75 10.6653 13.7501 10.3967 13.7264 10.1889C13.7079 10.0261 13.6462 9.55368 13.2279 9.33716C12.8093 9.12048 12.43 9.36549 12.3014 9.4518C12.1367 9.56231 11.943 9.73106 11.7455 9.90312L11.7174 9.92757C11.4152 10.1907 11.0798 10.4968 10.816 10.7998C10.6842 10.9511 10.554 11.12 10.4532 11.2985C10.3586 11.4662 10.25 11.7115 10.25 12C10.25 12.2885 10.3586 12.5338 10.4532 12.7015C10.554 12.88 10.6842 13.0488 10.816 13.2002C11.0798 13.5032 11.4152 13.8093 11.7174 14.0724L11.7455 14.0969C11.943 14.2689 12.1367 14.4377 12.3014 14.5482C12.43 14.6345 12.8093 14.8795 13.2279 14.6628C13.6462 14.4463 13.7079 13.9739 13.7264 13.8111C13.7501 13.6033 13.75 13.3347 13.75 13.061L13.75 12.75L18 12.75Z',
  d8: 'M8.00781 15.9947L8.00787 8M17.9961 12.0041H11.6395M14 9L11.0147 12.0041L14.0095 14.9966',
  d9: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM9 8H7L7 16H9L9 8ZM14.7071 14.2929L13.4142 13H18V11H13.4142L14.7071 9.70711L13.2929 8.29289L9.58579 12L13.2929 15.7071L14.7071 14.2929Z',
};

export const IconLoginCircle02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="login-circle-02-stroke-rounded IconLoginCircle02StrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLoginCircle02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="login-circle-02-duotone-rounded IconLoginCircle02DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLoginCircle02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="login-circle-02-twotone-rounded IconLoginCircle02TwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLoginCircle02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="login-circle-02-solid-rounded IconLoginCircle02SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconLoginCircle02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="login-circle-02-bulk-rounded IconLoginCircle02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconLoginCircle02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="login-circle-02-stroke-sharp IconLoginCircle02StrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconLoginCircle02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="login-circle-02-solid-sharp IconLoginCircle02SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfLoginCircle02: TheIconSelfPack = {
  name: 'LoginCircle02',
  StrokeRounded: IconLoginCircle02StrokeRounded,
  DuotoneRounded: IconLoginCircle02DuotoneRounded,
  TwotoneRounded: IconLoginCircle02TwotoneRounded,
  SolidRounded: IconLoginCircle02SolidRounded,
  BulkRounded: IconLoginCircle02BulkRounded,
  StrokeSharp: IconLoginCircle02StrokeSharp,
  SolidSharp: IconLoginCircle02SolidSharp,
};