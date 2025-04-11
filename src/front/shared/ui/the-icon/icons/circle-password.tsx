import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M13.9928 15L14 15M10 15L10.0072 15',
  d2: 'M5 15C5 11.134 8.13401 8 12 8C15.866 8 19 11.134 19 15C19 18.866 15.866 22 12 22C8.13401 22 5 18.866 5 15Z',
  d3: 'M16.5 9.5V6.5C16.5 4.01472 14.4853 2 12 2C9.51472 2 7.5 4.01472 7.5 6.5V9.5',
  d4: 'M12 7.25C7.71979 7.25 4.25 10.7198 4.25 15C4.25 19.2802 7.71979 22.75 12 22.75C16.2802 22.75 19.75 19.2802 19.75 15C19.75 10.7198 16.2802 7.25 12 7.25ZM10 14C9.44772 14 9 14.4477 9 15C9 15.5523 9.44772 16 10 16H10.0072C10.5595 16 11.0072 15.5523 11.0072 15C11.0072 14.4477 10.5595 14 10.0072 14H10ZM13.9928 14C13.4405 14 12.9928 14.4477 12.9928 15C12.9928 15.5523 13.4405 16 13.9928 16H14C14.5523 16 15 15.5523 15 15C15 14.4477 14.5523 14 14 14H13.9928Z',
  d5: 'M6.5 6.75C6.5 3.71243 8.96243 1.25 12 1.25C15.0376 1.25 17.5 3.71243 17.5 6.75V9.75C17.5 10.3023 17.0523 10.75 16.5 10.75C15.9477 10.75 15.5 10.3023 15.5 9.75V6.75C15.5 4.817 13.933 3.25 12 3.25C10.067 3.25 8.5 4.817 8.5 6.75V9.75C8.5 10.3023 8.05228 10.75 7.5 10.75C6.94772 10.75 6.5 10.3023 6.5 9.75V6.75Z',
  d6: 'M4.25 15C4.25 10.7198 7.71979 7.25 12 7.25C16.2802 7.25 19.75 10.7198 19.75 15C19.75 19.2802 16.2802 22.75 12 22.75C7.71979 22.75 4.25 19.2802 4.25 15Z',
  d7: 'M9 15C9 14.4477 9.44772 14 10 14L10.0072 14C10.5595 14 11.0072 14.4477 11.0072 15C11.0072 15.5523 10.5595 16 10.0072 16L10 16C9.44772 16 9 15.5523 9 15ZM12.9928 15C12.9928 14.4477 13.4405 14 13.9928 14L14 14C14.5523 14 15 14.4477 15 15C15 15.5523 14.5523 16 14 16L13.9928 16C13.4405 16 12.9928 15.5523 12.9928 15Z',
  d8: 'M12 1.25C8.96243 1.25 6.5 3.71243 6.5 6.75V9.53992C7.08168 8.95401 7.75634 8.46054 8.5 8.08347V6.75C8.5 4.817 10.067 3.25 12 3.25C13.933 3.25 15.5 4.817 15.5 6.75V8.08347C16.2437 8.46054 16.9183 8.95401 17.5 9.53992V6.75C17.5 3.71243 15.0376 1.25 12 1.25Z',
  d9: 'M6.5 6.75C6.5 3.71243 8.96243 1.25 12 1.25C15.0376 1.25 17.5 3.71243 17.5 6.75V9.75H15.5V6.75C15.5 4.817 13.933 3.25 12 3.25C10.067 3.25 8.5 4.817 8.5 6.75V9.75H6.5V6.75Z',
  d10: 'M4.25 15C4.25 10.7198 7.71979 7.25 12 7.25C16.2802 7.25 19.75 10.7198 19.75 15C19.75 19.2802 16.2802 22.75 12 22.75C7.71979 22.75 4.25 19.2802 4.25 15ZM11.0072 14H9V16H11.0072V14ZM15 14H12.9928V16H15V14Z',
};

export const IconCirclePasswordStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CirclePassword StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sw"
      />
      <path 
        d={d.d3}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconCirclePasswordDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CirclePassword DuotoneRounded"
    >
      <path 
        d={d.d2}
        i-c="f o7"
      />
      <path 
        d={d.d2}
        i-c="s sw"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconCirclePasswordTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CirclePassword TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sw"
      />
      <path 
        d={d.d3}
        i-c="o7 s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconCirclePasswordSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CirclePassword SolidRounded"
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

export const IconCirclePasswordBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CirclePassword BulkRounded"
    >
      <path 
        d={d.d6}
        i-c="f o7"
      />
      <path 
        d={d.d7}
        i-c="c f fr"
      />
      <path 
        d={d.d8}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconCirclePasswordStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CirclePassword StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sj ss sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconCirclePasswordSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CirclePassword SolidSharp"
    >
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

export const iconPackOfCirclePassword: TheIconSelfPack = [
  'CirclePassword',
  IconCirclePasswordStrokeRounded,
  IconCirclePasswordDuotoneRounded,
  IconCirclePasswordTwotoneRounded,
  IconCirclePasswordSolidRounded,
  IconCirclePasswordBulkRounded,
  IconCirclePasswordStrokeSharp,
  IconCirclePasswordSolidSharp,
];