import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M5 9C5 5.70017 5 4.05025 6.02513 3.02513C7.05025 2 8.70017 2 12 2C15.2998 2 16.9497 2 17.9749 3.02513C19 4.05025 19 5.70017 19 9V15C19 18.2998 19 19.9497 17.9749 20.9749C16.9497 22 15.2998 22 12 22C8.70017 22 7.05025 22 6.02513 20.9749C5 19.9497 5 18.2998 5 15V9Z',
  d2: 'M16 13V10.5C16 8.29086 14.2091 6.5 12 6.5C9.79086 6.5 8 8.29086 8 10.5V13',
  d3: 'M13.5 11V10.5C13.5 9.67157 12.8284 9 12 9C11.1716 9 10.5 9.67157 10.5 10.5V14M13.5 13.5V15',
  d4: 'M12 19V19.01',
  d5: 'M15.9404 1.38483C14.9373 1.24997 13.6583 1.24998 12.0558 1.25H12.0557C10.4532 1.24998 9.0627 1.24997 8.05961 1.38483C7.02335 1.52415 6.16994 1.81966 5.4948 2.4948C4.81966 3.16994 4.52415 4.02335 4.38483 5.05961C4.24997 6.0627 4.24998 7.34166 4.25 8.94425V8.94425L4.25 15.0557V15.0558C4.24998 16.6583 4.24997 17.9373 4.38483 18.9404C4.52415 19.9767 4.81966 20.8301 5.4948 21.5052C6.16994 22.1803 7.02335 22.4758 8.05961 22.6152C9.0627 22.75 10.4531 22.75 12.0557 22.75C13.6583 22.75 14.9373 22.75 15.9404 22.6152C16.9767 22.4758 17.8301 22.1803 18.5052 21.5052C19.1803 20.8301 19.4758 19.9767 19.6152 18.9404C19.75 17.9373 19.75 16.6583 19.75 15.0557L19.75 8.94426C19.75 7.34166 19.75 6.0627 19.6152 5.05961C19.4758 4.02335 19.1803 3.16994 18.5052 2.4948C17.8301 1.81966 16.9767 1.52415 15.9404 1.38483ZM12 5.75C9.37665 5.75 7.25 7.87665 7.25 10.5L7.25 13C7.25 13.4142 7.58579 13.75 8 13.75C8.41421 13.75 8.75 13.4142 8.75 13V10.5C8.75 8.70508 10.2051 7.25 12 7.25C13.7949 7.25 15.25 8.70508 15.25 10.5L15.25 13C15.25 13.4142 15.5858 13.75 16 13.75C16.4142 13.75 16.75 13.4142 16.75 13L16.75 10.5C16.75 7.87665 14.6234 5.75 12 5.75ZM9.75 10.5C9.75 9.25736 10.7574 8.25 12 8.25C13.2426 8.25 14.25 9.25736 14.25 10.5V11C14.25 11.4142 13.9142 11.75 13.5 11.75C13.0858 11.75 12.75 11.4142 12.75 11V10.5C12.75 10.0858 12.4142 9.75 12 9.75C11.5858 9.75 11.25 10.0858 11.25 10.5V14C11.25 14.4142 10.9142 14.75 10.5 14.75C10.0858 14.75 9.75 14.4142 9.75 14V10.5ZM13.5 12.75C13.9142 12.75 14.25 13.0858 14.25 13.5V15C14.25 15.4142 13.9142 15.75 13.5 15.75C13.0858 15.75 12.75 15.4142 12.75 15V13.5C12.75 13.0858 13.0858 12.75 13.5 12.75ZM13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19V19.01C11 19.5623 11.4477 20.01 12 20.01C12.5523 20.01 13 19.5623 13 19.01V19Z',
  d6: 'M12.0558 1.25C13.6583 1.24998 14.9373 1.24997 15.9404 1.38483C16.9767 1.52415 17.8301 1.81966 18.5052 2.4948C19.1803 3.16994 19.4758 4.02335 19.6152 5.05961C19.75 6.0627 19.75 7.34166 19.75 8.94426V15.0557C19.75 16.6583 19.75 17.9373 19.6152 18.9404C19.4758 19.9767 19.1803 20.8301 18.5052 21.5052C17.8301 22.1803 16.9767 22.4758 15.9404 22.6152C14.9373 22.75 13.6583 22.75 12.0557 22.75C10.4531 22.75 9.0627 22.75 8.05961 22.6152C7.02335 22.4758 6.16994 22.1803 5.4948 21.5052C4.81966 20.8301 4.52415 19.9767 4.38483 18.9404C4.24997 17.9373 4.24998 16.6583 4.25 15.0558V15.0557V8.94425V8.94425C4.24998 7.34166 4.24997 6.0627 4.38483 5.05961C4.52415 4.02335 4.81966 3.16994 5.4948 2.4948C6.16994 1.81966 7.02335 1.52415 8.05961 1.38483C9.0627 1.24997 10.4532 1.24998 12.0557 1.25H12.0558Z',
  d7: 'M7.25 10.5C7.25 7.87665 9.37665 5.75 12 5.75C14.6234 5.75 16.75 7.87665 16.75 10.5V13C16.75 13.4142 16.4142 13.75 16 13.75C15.5858 13.75 15.25 13.4142 15.25 13V10.5C15.25 8.70507 13.7949 7.25 12 7.25C10.2051 7.25 8.75 8.70507 8.75 10.5V13C8.75 13.4142 8.41421 13.75 8 13.75C7.58579 13.75 7.25 13.4142 7.25 13V10.5Z',
  d8: 'M9.75 10.5C9.75 9.25736 10.7574 8.25 12 8.25C13.2426 8.25 14.25 9.25736 14.25 10.5V11C14.25 11.4142 13.9142 11.75 13.5 11.75C13.0858 11.75 12.75 11.4142 12.75 11V10.5C12.75 10.0858 12.4142 9.75 12 9.75C11.5858 9.75 11.25 10.0858 11.25 10.5V14C11.25 14.4142 10.9142 14.75 10.5 14.75C10.0858 14.75 9.75 14.4142 9.75 14V10.5ZM13.5 12.75C13.9142 12.75 14.25 13.0858 14.25 13.5V15C14.25 15.4142 13.9142 15.75 13.5 15.75C13.0858 15.75 12.75 15.4142 12.75 15V13.5C12.75 13.0858 13.0858 12.75 13.5 12.75Z',
  d9: 'M12 18C12.5523 18 13 18.4477 13 19V19.01C13 19.5623 12.5523 20.01 12 20.01C11.4477 20.01 11 19.5623 11 19.01V19C11 18.4477 11.4477 18 12 18Z',
  d10: 'M19 2H5V22H19V2Z',
  d11: 'M19.75 1.25L4.25 1.25L4.25 22.75L19.75 22.75L19.75 1.25ZM12 5.75C9.37665 5.75 7.25 7.87665 7.25 10.5L7.25 13.75L8.75 13.75V10.5C8.75 8.70507 10.2051 7.25 12 7.25C13.7949 7.25 15.25 8.70507 15.25 10.5L15.25 13.75H16.75L16.75 10.5C16.75 7.87665 14.6234 5.75 12 5.75ZM9.75 10.5C9.75 9.25736 10.7574 8.25 12 8.25C13.2426 8.25 14.25 9.25736 14.25 10.5V11.75H12.75V10.5C12.75 10.0858 12.4142 9.75 12 9.75C11.5858 9.75 11.25 10.0858 11.25 10.5V14.75H9.75V10.5ZM14.25 12.75V15.75H12.75V12.75H14.25ZM13 20.01L13 18L11 18V20.01L13 20.01Z',
};

export const IconBiometricDeviceStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="BiometricDevice StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
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

export const IconBiometricDeviceDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="BiometricDevice DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sr sw"
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

export const IconBiometricDeviceTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="BiometricDevice TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
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
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconBiometricDeviceSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="BiometricDevice SolidRounded"
    >
      <path 
        d={d.d5}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconBiometricDeviceBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="BiometricDevice BulkRounded"
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
        i-c="c f fr"
      />
      <path 
        d={d.d9}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconBiometricDeviceStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="BiometricDevice StrokeSharp"
    >
      <path 
        d={d.d2}
        i-c="s ss sw"
      />
      <path 
        d={d.d3}
        i-c="s ss sw"
      />
      <path 
        d={d.d4}
        i-c="s ss sw"
      />
      <path 
        d={d.d10}
        i-c="s ss sw"
      />
    </TheIconWrapper>
  );
};

export const IconBiometricDeviceSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="BiometricDevice SolidSharp"
    >
      <path 
        d={d.d11}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfBiometricDevice: TheIconSelfPack = [
  'BiometricDevice',
  IconBiometricDeviceStrokeRounded,
  IconBiometricDeviceDuotoneRounded,
  IconBiometricDeviceTwotoneRounded,
  IconBiometricDeviceSolidRounded,
  IconBiometricDeviceBulkRounded,
  IconBiometricDeviceStrokeSharp,
  IconBiometricDeviceSolidSharp,
];