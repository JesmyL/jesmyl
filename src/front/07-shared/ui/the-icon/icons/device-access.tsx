import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M17 10V9C17 5.70017 17 4.05025 15.9749 3.02513C14.9497 2 13.2998 2 10 2C6.70017 2 5.05025 2 4.02513 3.02513C3 4.05025 3 5.70017 3 9V15C3 18.2998 3 19.9497 4.02513 20.9749C5.05025 22 6.70017 22 10 22C10.3517 22 10.6846 22 11 21.9988',
  d2: 'M15.5 16.5V15C15.5 13.8954 16.3954 13 17.5 13C18.6046 13 19.5 13.8954 19.5 15V16.5M16.75 22H18.25C19.4228 22 20.0092 22 20.4131 21.69C20.5171 21.6102 20.6102 21.5171 20.69 21.4131C21 21.0092 21 20.4228 21 19.25C21 18.0772 21 17.4908 20.69 17.0869C20.6102 16.9829 20.5171 16.8898 20.4131 16.81C20.0092 16.5 19.4228 16.5 18.25 16.5H16.75C15.5772 16.5 14.9908 16.5 14.5869 16.81C14.4829 16.8898 14.3898 16.9829 14.31 17.0869C14 17.4908 14 18.0772 14 19.25C14 20.4228 14 21.0092 14.31 21.4131C14.3898 21.5171 14.4829 21.6102 14.5869 21.69C14.9908 22 15.5772 22 16.75 22Z',
  d3: 'M10 19V19.01',
  d4: 'M4.02513 3.02513C3 4.05025 3 5.70017 3 9V15C3 18.2998 3 19.9497 4.02513 20.9749C5.05025 22 6.70017 22 10 22C12.1453 22 13.5932 22 14.6255 21.7183C14.6124 21.7092 14.5995 21.6998 14.5869 21.69C14.4829 21.6102 14.3898 21.5171 14.31 21.4131C14 21.0092 14 20.4228 14 19.25C14 18.0772 14 17.4908 14.31 17.0869C14.3898 16.9829 14.4829 16.8898 14.5869 16.81C14.8116 16.6375 15.0928 16.561 15.5 16.5271V15C15.5 14.0681 16.1374 13.285 17 13.063V9C17 5.70017 17 4.05025 15.9749 3.02513C14.9497 2 13.2998 2 10 2C6.70017 2 5.05025 2 4.02513 3.02513Z',
  d5: 'M20.25 15.9011V15C20.25 13.4812 19.0188 12.25 17.5 12.25C15.9812 12.25 14.75 13.4812 14.75 15V15.9011C14.5335 15.9672 14.3248 16.0657 14.1303 16.215C13.9743 16.3347 13.8347 16.4743 13.715 16.6303C13.4431 16.9846 13.3398 17.3855 13.2935 17.7961C13.25 18.1821 13.25 18.739 13.25 19.2907C13.25 19.8423 13.25 20.3179 13.2935 20.7039C13.3398 21.1145 13.4431 21.5154 13.715 21.8697C13.8347 22.0257 13.9743 22.1653 14.1303 22.285C14.4846 22.5569 14.8855 22.6602 15.2961 22.7065C15.6821 22.75 16.1577 22.75 16.7093 22.75H18.2907C18.8423 22.75 19.3179 22.75 19.7039 22.7065C20.1145 22.6602 20.5154 22.5569 20.8697 22.285C21.0257 22.1653 21.1653 22.0257 21.285 21.8697C21.5569 21.5154 21.6602 21.1145 21.7065 20.7039C21.7501 20.3179 21.75 19.8423 21.75 19.2907C21.75 18.739 21.7501 18.1821 21.7065 17.7961C21.6602 17.3855 21.5569 16.9846 21.285 16.6303C21.1653 16.4743 21.0257 16.3347 20.8697 16.215C20.6752 16.0657 20.4666 15.9672 20.25 15.9011ZM16.25 15C16.25 14.3096 16.8096 13.75 17.5 13.75C18.1904 13.75 18.75 14.3096 18.75 15V15.751H16.25V15Z',
  d6: 'M10.0558 1.25C11.6584 1.24998 12.9373 1.24997 13.9404 1.38483C14.9767 1.52415 15.8301 1.81966 16.5052 2.4948C17.1803 3.16994 17.4758 4.02335 17.6152 5.05961C17.75 6.0627 17.75 7.34166 17.75 8.94426V11.0077C17.6673 11.0026 17.584 11 17.5 11C15.2909 11 13.5 12.5 13.5 15.1283C13.2573 15.3145 12.9095 15.6267 12.7233 15.8693C12.2566 16.4776 12.1102 17.1341 12.0513 17.6561C11.9999 18.1129 11.9999 18.8269 12 19.3392C11.9999 19.8515 11.9999 20.3871 12.0513 20.8439C12.1102 21.3659 12.2566 22.0224 12.7233 22.6307C12.7445 22.6584 12.7662 22.6857 12.7883 22.7128C12.0059 22.75 11.0994 22.75 10.0557 22.75C8.45315 22.75 7.0627 22.75 6.05961 22.6152C5.02335 22.4758 4.16994 22.1803 3.4948 21.5052C2.81966 20.8301 2.52415 19.9767 2.38483 18.9404C2.24997 17.9373 2.24998 16.6583 2.25 15.0558V15.0557L2.25 8.94425V8.94424C2.24998 7.34165 2.24997 6.0627 2.38483 5.05961C2.52415 4.02335 2.81966 3.16994 3.4948 2.4948C4.16994 1.81966 5.02335 1.52415 6.05961 1.38483C7.0627 1.24997 8.45316 1.24998 10.0558 1.25H10.0558ZM11 19C11 18.4477 10.5523 18 10 18C9.44772 18 9 18.4477 9 19V19.01C9 19.5623 9.44772 20.01 10 20.01C10.5523 20.01 11 19.5623 11 19.01V19Z',
  d7: 'M13.9404 1.38483C12.9373 1.24997 11.6583 1.24998 10.0558 1.25C8.45316 1.24998 7.0627 1.24997 6.05961 1.38483C5.02335 1.52415 4.16994 1.81966 3.4948 2.4948C2.81966 3.16994 2.52415 4.02335 2.38483 5.05961C2.24997 6.0627 2.24998 7.34166 2.25 8.94425V15.0557C2.24998 16.6583 2.24997 17.9373 2.38483 18.9404C2.52415 19.9767 2.81966 20.8301 3.4948 21.5052C4.16994 22.1803 5.02335 22.4758 6.05961 22.6152C7.0627 22.75 8.45315 22.75 10.0557 22.75C11.0994 22.75 12.0059 22.75 12.7883 22.7128C12.7662 22.6857 12.7445 22.6584 12.7233 22.6307C12.2566 22.0224 12.1102 21.3659 12.0513 20.8439C11.9999 20.3871 11.9999 19.8515 12 19.3392C11.9999 18.8269 11.9999 18.1129 12.0513 17.6561C12.1102 17.1341 12.2566 16.4776 12.7233 15.8693C12.9095 15.6267 13.2573 15.3145 13.5 15.1283C13.5 12.5 15.2909 11 17.5 11C17.584 11 17.6673 11.0026 17.75 11.0077V8.94426C17.75 7.34166 17.75 6.0627 17.6152 5.05961C17.4758 4.02335 17.1803 3.16994 16.5052 2.4948C15.8301 1.81966 14.9767 1.52415 13.9404 1.38483Z',
  d8: 'M10 18C10.5523 18 11 18.4477 11 19V19.01C11 19.5623 10.5523 20.01 10 20.01C9.44772 20.01 9 19.5623 9 19.01V19C9 18.4477 9.44772 18 10 18Z',
  d9: 'M17 10V2H3V22H11',
  d10: 'M21 16.5H14V22H21V16.5Z',
  d11: 'M19.5 16.5V15C19.5 13.8954 18.6046 13 17.5 13C16.3954 13 15.5 13.8954 15.5 15V16.5',
  d12: 'M2.25 1.25L17.75 1.25V11.0077C17.6673 11.0026 17.584 11 17.5 11C15.4602 11 13.777 12.5268 13.5309 14.5L12 14.5L12 22.75L2.25 22.75L2.25 1.25ZM11 20.01L11 18L9 18V20.01L11 20.01Z',
  d13: 'M17.5 12.25C15.9812 12.25 14.75 13.4812 14.75 15V15.75H13.25V22.75H21.75V15.75H20.25V15C20.25 13.4812 19.0188 12.25 17.5 12.25ZM18.75 15.75V15C18.75 14.3096 18.1904 13.75 17.5 13.75C16.8096 13.75 16.25 14.3096 16.25 15V15.75H18.75Z',
};

export const IconDeviceAccessStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="device-access-stroke-rounded IconDeviceAccessStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconDeviceAccessDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="device-access-duotone-rounded IconDeviceAccessDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconDeviceAccessTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="device-access-twotone-rounded IconDeviceAccessTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconDeviceAccessSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="device-access-solid-rounded IconDeviceAccessSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconDeviceAccessBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="device-access-bulk-rounded IconDeviceAccessBulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconDeviceAccessStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="device-access-stroke-sharp IconDeviceAccessStrokeSharp"
    >
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
    </TheIconWrapper>
  );
};

export const IconDeviceAccessSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="device-access-solid-sharp IconDeviceAccessSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfDeviceAccess: TheIconSelfPack = {
  name: 'DeviceAccess',
  StrokeRounded: IconDeviceAccessStrokeRounded,
  DuotoneRounded: IconDeviceAccessDuotoneRounded,
  TwotoneRounded: IconDeviceAccessTwotoneRounded,
  SolidRounded: IconDeviceAccessSolidRounded,
  BulkRounded: IconDeviceAccessBulkRounded,
  StrokeSharp: IconDeviceAccessStrokeSharp,
  SolidSharp: IconDeviceAccessSolidSharp,
};