import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M5 9C5 5.70017 5 4.05025 6.02513 3.02513C7.05025 2 8.70017 2 12 2C15.2998 2 16.9497 2 17.9749 3.02513C19 4.05025 19 5.70017 19 9V15C19 18.2998 19 19.9497 17.9749 20.9749C16.9497 22 15.2998 22 12 22C8.70017 22 7.05025 22 6.02513 20.9749C5 19.9497 5 18.2998 5 15V9Z',
  d2: 'M10.4375 12.6667L10.4375 7.33333M12 7.33333V6M12 14V12.6667M10.4375 10H13.5625M13.5625 10C14.0803 10 14.5 10.4477 14.5 11V11.6667C14.5 12.219 14.0803 12.6667 13.5625 12.6667H9.5M13.5625 10C14.0803 10 14.5 9.55228 14.5 9V8.33333C14.5 7.78105 14.0803 7.33333 13.5625 7.33333H9.5',
  d3: 'M12 19H12.009',
  d4: 'M12.0558 1.25C13.6583 1.24998 14.9373 1.24997 15.9404 1.38483C16.9767 1.52415 17.8301 1.81966 18.5052 2.4948C19.1803 3.16994 19.4759 4.02335 19.6152 5.05961C19.75 6.0627 19.75 7.34166 19.75 8.94426V15.0557C19.75 16.6583 19.75 17.9373 19.6152 18.9404C19.4759 19.9767 19.1803 20.8301 18.5052 21.5052C17.8301 22.1803 16.9767 22.4759 15.9404 22.6152C14.9373 22.75 13.5469 22.75 11.9443 22.75C10.3417 22.75 9.0627 22.75 8.05961 22.6152C7.02335 22.4759 6.16994 22.1803 5.4948 21.5052C4.81966 20.8301 4.52415 19.9767 4.38483 18.9404C4.24997 17.9373 4.24998 16.6583 4.25 15.0558V15.0557V8.94426V8.94425C4.24998 7.34166 4.24997 6.0627 4.38483 5.05961C4.52415 4.02335 4.81966 3.16994 5.4948 2.4948C6.16994 1.81966 7.02335 1.52415 8.05961 1.38483C9.0627 1.24997 10.4532 1.24998 12.0557 1.25H12.0558ZM12 5.25C12.4142 5.25 12.75 5.58579 12.75 6V6.58333H13.5625C14.5393 6.58333 15.25 7.41317 15.25 8.33333V9C15.25 9.3624 15.1398 9.7108 14.9465 10C15.1398 10.2892 15.25 10.6376 15.25 11V11.6667C15.25 12.5868 14.5393 13.4167 13.5625 13.4167H12.75V14C12.75 14.4142 12.4142 14.75 12 14.75C11.5858 14.75 11.25 14.4142 11.25 14V13.4167H9.5C9.08579 13.4167 8.75 13.0809 8.75 12.6667C8.75 12.2525 9.08579 11.9167 9.5 11.9167H9.6875V10.0002V8.08333H9.5C9.08579 8.08333 8.75 7.74755 8.75 7.33333C8.75 6.91912 9.08579 6.58333 9.5 6.58333H11.25V6C11.25 5.58579 11.5858 5.25 12 5.25ZM11.1875 8.08333V9.25H13.5625C13.6212 9.25 13.75 9.1844 13.75 9V8.33333C13.75 8.14893 13.6212 8.08333 13.5625 8.08333H11.1875ZM13.5625 10.75H11.1875V11.9167H13.5625C13.6212 11.9167 13.75 11.8511 13.75 11.6667V11C13.75 10.8156 13.6212 10.75 13.5625 10.75ZM12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20H12.009C12.5613 20 13.009 19.5523 13.009 19C13.009 18.4477 12.5613 18 12.009 18H12Z',
  d5: 'M12.0558 1.25C13.6583 1.24998 14.9373 1.24997 15.9404 1.38483C16.9767 1.52415 17.8301 1.81966 18.5052 2.4948C19.1803 3.16994 19.4759 4.02335 19.6152 5.05961C19.75 6.0627 19.75 7.34166 19.75 8.94426V15.0557C19.75 16.6583 19.75 17.9373 19.6152 18.9404C19.4759 19.9767 19.1803 20.8301 18.5052 21.5052C17.8301 22.1803 16.9767 22.4759 15.9404 22.6152C14.9373 22.75 13.5469 22.75 11.9443 22.75C10.3417 22.75 9.0627 22.75 8.05961 22.6152C7.02335 22.4759 6.16994 22.1803 5.4948 21.5052C4.81966 20.8301 4.52415 19.9767 4.38483 18.9404C4.24997 17.9373 4.24998 16.6583 4.25 15.0558V15.0557V8.94426V8.94425C4.24998 7.34166 4.24997 6.0627 4.38483 5.05961C4.52415 4.02335 4.81966 3.16994 5.4948 2.4948C6.16994 1.81966 7.02335 1.52415 8.05961 1.38483C9.0627 1.24997 10.4532 1.24998 12.0557 1.25H12.0558Z',
  d6: 'M12 5.25C12.4142 5.25 12.75 5.58579 12.75 6V6.58333H13.5625C14.5393 6.58333 15.25 7.41317 15.25 8.33333V9C15.25 9.3624 15.1398 9.7108 14.9465 10C15.1398 10.2892 15.25 10.6376 15.25 11V11.6667C15.25 12.5868 14.5393 13.4167 13.5625 13.4167H12.75V14C12.75 14.4142 12.4142 14.75 12 14.75C11.5858 14.75 11.25 14.4142 11.25 14V13.4167H9.5C9.08579 13.4167 8.75 13.0809 8.75 12.6667C8.75 12.2525 9.08579 11.9167 9.5 11.9167H9.6875L9.6875 10.0002L9.6875 8.08333H9.5C9.08579 8.08333 8.75 7.74755 8.75 7.33333C8.75 6.91912 9.08579 6.58333 9.5 6.58333H11.25V6C11.25 5.58579 11.5858 5.25 12 5.25ZM11.1875 8.08333V9.25H13.5625C13.6212 9.25 13.75 9.1844 13.75 9V8.33333C13.75 8.14893 13.6212 8.08333 13.5625 8.08333H11.1875ZM13.5625 10.75H11.1875L11.1875 11.9167H13.5625C13.6212 11.9167 13.75 11.8511 13.75 11.6667V11C13.75 10.8156 13.6212 10.75 13.5625 10.75Z',
  d7: 'M11 19C11 18.4477 11.4477 18 12 18H12.009C12.5613 18 13.009 18.4477 13.009 19C13.009 19.5523 12.5613 20 12.009 20H12C11.4477 20 11 19.5523 11 19Z',
  d8: 'M19 2.00046L5 2V22H19V2.00046Z',
  d9: 'M4.25 1.25L19.75 1.25051V22.75H4.25V1.25ZM12.75 5.25V6.58333H13.5625C14.5393 6.58333 15.25 7.41317 15.25 8.33333V9C15.25 9.3624 15.1398 9.7108 14.9465 10C15.1398 10.2892 15.25 10.6376 15.25 11V11.6667C15.25 12.5868 14.5393 13.4167 13.5625 13.4167H12.75V14.75H11.25V13.4167H8.75V11.9167H9.6875V8.08333H8.75V6.58333H11.25V5.25H12.75ZM11.1875 8.08333V9.25H13.5625C13.6212 9.25 13.75 9.1844 13.75 9V8.33333C13.75 8.14893 13.6212 8.08333 13.5625 8.08333H11.1875ZM13.5625 10.75H11.1875V11.9167H13.5625C13.6212 11.9167 13.75 11.8511 13.75 11.6667V11C13.75 10.8156 13.6212 10.75 13.5625 10.75ZM13.009 19H11V21H13.009V19Z',
};

export const IconBitcoinSmartphone02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="BitcoinSmartphone02 StrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconBitcoinSmartphone02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="BitcoinSmartphone02 DuotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconBitcoinSmartphone02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="BitcoinSmartphone02 TwotoneRounded"
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
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconBitcoinSmartphone02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="BitcoinSmartphone02 SolidRounded"
    >
      <path 
        d={d.d4}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconBitcoinSmartphone02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="BitcoinSmartphone02 BulkRounded"
    >
      <path 
        d={d.d5}
        i-c="f o7"
      />
      <path 
        d={d.d6}
        i-c="c f fr"
      />
      <path 
        d={d.d7}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconBitcoinSmartphone02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="BitcoinSmartphone02 StrokeSharp"
    >
      <path 
        d={d.d8}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="s ss sw"
      />
      <path 
        d={d.d3}
        i-c="s sj ss sw"
      />
    </TheIconWrapper>
  );
};

export const IconBitcoinSmartphone02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="BitcoinSmartphone02 SolidSharp"
    >
      <path 
        d={d.d9}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfBitcoinSmartphone02: TheIconSelfPack = [
  'BitcoinSmartphone02',
  IconBitcoinSmartphone02StrokeRounded,
  IconBitcoinSmartphone02DuotoneRounded,
  IconBitcoinSmartphone02TwotoneRounded,
  IconBitcoinSmartphone02SolidRounded,
  IconBitcoinSmartphone02BulkRounded,
  IconBitcoinSmartphone02StrokeSharp,
  IconBitcoinSmartphone02SolidSharp,
];