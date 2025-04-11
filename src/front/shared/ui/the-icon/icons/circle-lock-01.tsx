import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M5 15C5 11.134 8.13401 8 12 8C15.866 8 19 11.134 19 15C19 18.866 15.866 22 12 22C8.13401 22 5 18.866 5 15Z',
  d2: 'M16.5 9.5V6.5C16.5 4.01472 14.4853 2 12 2C9.51472 2 7.5 4.01472 7.5 6.5V9.5',
  d3: 'M12 15H12.009',
  d4: 'M12 1.25C8.96243 1.25 6.5 3.71243 6.5 6.75V9.53992C5.10924 10.9408 4.25 12.87 4.25 15C4.25 19.2802 7.71979 22.75 12 22.75C16.2802 22.75 19.75 19.2802 19.75 15C19.75 12.87 18.8908 10.9408 17.5 9.53992V6.75C17.5 3.71243 15.0376 1.25 12 1.25ZM15.5 8.08347V6.75C15.5 4.817 13.933 3.25 12 3.25C10.067 3.25 8.5 4.817 8.5 6.75V8.08347C9.55134 7.55041 10.7406 7.25 12 7.25C13.2594 7.25 14.4487 7.55041 15.5 8.08347ZM10.4922 15C10.4922 14.1716 11.1638 13.5 11.9922 13.5H12.0057C12.8341 13.5 13.5057 14.1716 13.5057 15C13.5057 15.8284 12.8341 16.5 12.0057 16.5H11.9922C11.1638 16.5 10.4922 15.8284 10.4922 15Z',
  d5: 'M12 1.25C8.96243 1.25 6.5 3.71243 6.5 6.75V9.53992C7.08168 8.95401 7.75634 8.46054 8.5 8.08347V6.75C8.5 4.817 10.067 3.25 12 3.25C13.933 3.25 15.5 4.817 15.5 6.75V8.08347C16.2437 8.46054 16.9183 8.95401 17.5 9.53992V6.75C17.5 3.71243 15.0376 1.25 12 1.25Z',
  d6: 'M10.4922 15C10.4922 14.1716 11.1638 13.5 11.9922 13.5H12.0057C12.8341 13.5 13.5057 14.1716 13.5057 15C13.5057 15.8284 12.8341 16.5 12.0057 16.5H11.9922C11.1638 16.5 10.4922 15.8284 10.4922 15Z',
  d7: 'M4.25 15C4.25 10.7198 7.71979 7.25 12 7.25C16.2802 7.25 19.75 10.7198 19.75 15C19.75 19.2802 16.2802 22.75 12 22.75C7.71979 22.75 4.25 19.2802 4.25 15Z',
  d8: 'M6.5 6.75C6.5 3.71243 8.96243 1.25 12 1.25C15.0376 1.25 17.5 3.71243 17.5 6.75V9.75H15.5V6.75C15.5 4.817 13.933 3.25 12 3.25C10.067 3.25 8.5 4.817 8.5 6.75V9.75H6.5V6.75Z',
  d9: 'M12 7.25C7.71979 7.25 4.25 10.7198 4.25 15C4.25 19.2802 7.71979 22.75 12 22.75C16.2802 22.75 19.75 19.2802 19.75 15C19.75 10.7198 16.2802 7.25 12 7.25ZM13.5 13.5H10.5V16.5H13.5V13.5Z',
};

export const IconCircleLock01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CircleLock01 StrokeRounded"
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

export const IconCircleLock01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CircleLock01 DuotoneRounded"
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

export const IconCircleLock01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CircleLock01 TwotoneRounded"
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

export const IconCircleLock01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CircleLock01 SolidRounded"
    >
      <path 
        d={d.d4}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconCircleLock01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CircleLock01 BulkRounded"
    >
      <path 
        d={d.d5}
        i-c="f"
      />
      <path 
        d={d.d6}
        i-c="c f fr"
      />
      <path 
        d={d.d7}
        i-c="f o7"
      />
    </TheIconWrapper>
  );
};

export const IconCircleLock01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CircleLock01 StrokeSharp"
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
        i-c="s sj ss sw"
      />
    </TheIconWrapper>
  );
};

export const IconCircleLock01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CircleLock01 SolidSharp"
    >
      <path 
        d={d.d8}
        i-c="c f fr"
      />
      <path 
        d={d.d9}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfCircleLock01: TheIconSelfPack = [
  'CircleLock01',
  IconCircleLock01StrokeRounded,
  IconCircleLock01DuotoneRounded,
  IconCircleLock01TwotoneRounded,
  IconCircleLock01SolidRounded,
  IconCircleLock01BulkRounded,
  IconCircleLock01StrokeSharp,
  IconCircleLock01SolidSharp,
];