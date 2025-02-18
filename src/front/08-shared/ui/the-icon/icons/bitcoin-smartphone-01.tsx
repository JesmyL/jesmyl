import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M17.5988 5C17.4638 4.13105 17.2083 3.5086 16.7249 3.02513C15.6997 2 14.0498 2 10.75 2C7.45017 2 5.80025 2 4.77513 3.02513C3.75 4.05025 3.75 5.70017 3.75 9V15C3.75 18.2998 3.75 19.9497 4.77513 20.9749C5.80025 22 7.45017 22 10.75 22C14.0498 22 15.6997 22 16.7249 20.9749C17.2083 20.4914 17.4638 19.869 17.5988 19',
  d2: 'M16.1875 14.6667L16.1875 9.33333M17.75 9.33333V8M17.75 16V14.6667M16.1875 12H19.3125M19.3125 12C19.8303 12 20.25 12.4477 20.25 13V13.6667C20.25 14.219 19.8303 14.6667 19.3125 14.6667H15.25M19.3125 12C19.8303 12 20.25 11.5523 20.25 11V10.3333C20.25 9.78105 19.8303 9.33333 19.3125 9.33333H15.25',
  d3: 'M10.75 19H10.759',
  d4: 'M9.75 5H11.75',
  d5: 'M3.75 9C3.75 5.70017 3.75 4.05025 4.77513 3.02513C5.80025 2 7.45017 2 10.75 2C14.0498 2 15.6997 2 16.7249 3.02513C17.75 4.05025 17.75 5.70017 17.75 9V15C17.75 18.2998 17.75 19.9497 16.7249 20.9749C15.6997 22 14.0498 22 10.75 22C7.45017 22 5.80025 22 4.77513 20.9749C3.75 19.9497 3.75 18.2998 3.75 15V9Z',
  d6: 'M17.75 7.25C18.1642 7.25 18.5 7.58579 18.5 8V8.58333H19.3125C20.2893 8.58333 21 9.41317 21 10.3333V11C21 11.3624 20.8898 11.7108 20.6965 12C20.8898 12.2892 21 12.6376 21 13V13.6667C21 14.5868 20.2893 15.4167 19.3125 15.4167H18.5V16C18.5 16.4142 18.1642 16.75 17.75 16.75C17.3358 16.75 17 16.4142 17 16V15.4167H15.25C14.8358 15.4167 14.5 15.0809 14.5 14.6667C14.5 14.2525 14.8358 13.9167 15.25 13.9167H15.4375L15.4375 12.0002L15.4375 10.0833H15.25C14.8358 10.0833 14.5 9.74755 14.5 9.33333C14.5 8.91912 14.8358 8.58333 15.25 8.58333H17V8C17 7.58579 17.3358 7.25 17.75 7.25ZM16.9375 10.0833V11.25H19.3125C19.3712 11.25 19.5 11.1844 19.5 11V10.3333C19.5 10.1489 19.3712 10.0833 19.3125 10.0833H16.9375ZM19.3125 12.75H16.9375L16.9375 13.9167H19.3125C19.3712 13.9167 19.5 13.8511 19.5 13.6667V13C19.5 12.8156 19.3712 12.75 19.3125 12.75Z',
  d7: 'M14.6904 1.38483C13.6873 1.24997 12.4084 1.24998 10.8058 1.25H10.8058C9.20316 1.24998 7.8127 1.24997 6.80961 1.38483C5.77335 1.52415 4.91994 1.81966 4.2448 2.4948C3.56966 3.16994 3.27415 4.02335 3.13483 5.05961C2.99997 6.0627 2.99998 7.34165 3 8.94424V8.94425V15.0557V15.0558C2.99998 16.6583 2.99997 17.9373 3.13483 18.9404C3.27415 19.9767 3.56966 20.8301 4.2448 21.5052C4.91994 22.1803 5.77335 22.4758 6.80961 22.6152C7.8127 22.75 9.20315 22.75 10.8057 22.75C12.4083 22.75 13.6873 22.75 14.6904 22.6152C15.7267 22.4758 16.5801 22.1803 17.2552 21.5052C17.9303 20.8301 18.2259 19.9767 18.3652 18.9404C18.3987 18.6913 18.4238 18.4252 18.4428 18.1413C18.2245 18.2119 17.9917 18.25 17.75 18.25C16.8338 18.25 16.0455 17.7024 15.6946 16.9167H15.25C14.0074 16.9167 13 15.9093 13 14.6667C13 13.9138 13.3697 13.2474 13.9375 12.8389V11.1611C13.3697 10.7526 13 10.0862 13 9.33333C13 8.09069 14.0074 7.08333 15.25 7.08333H15.6946C16.0455 6.29759 16.8338 5.75 17.75 5.75C17.9917 5.75 18.2245 5.78812 18.4428 5.85866C18.4238 5.57481 18.3987 5.30871 18.3652 5.05961C18.2259 4.02335 17.9303 3.16994 17.2552 2.4948C16.5801 1.81966 15.7267 1.52415 14.6904 1.38483ZM9.75 19C9.75 18.4477 10.1977 18 10.75 18H10.759C11.3113 18 11.759 18.4477 11.759 19C11.759 19.5523 11.3113 20 10.759 20H10.75C10.1977 20 9.75 19.5523 9.75 19ZM9.75 4.25C9.33579 4.25 9 4.58579 9 5C9 5.41421 9.33579 5.75 9.75 5.75H11.75C12.1642 5.75 12.5 5.41421 12.5 5C12.5 4.58579 12.1642 4.25 11.75 4.25H9.75Z',
  d8: 'M14.6904 1.38483C13.6873 1.24997 12.4083 1.24998 10.8058 1.25C9.20316 1.24998 7.8127 1.24997 6.80961 1.38483C5.77335 1.52415 4.91994 1.81966 4.2448 2.4948C3.56966 3.16994 3.27415 4.02335 3.13483 5.05961C2.99997 6.0627 2.99998 7.34166 3 8.94425V15.0557C2.99998 16.6583 2.99997 17.9373 3.13483 18.9404C3.27415 19.9767 3.56966 20.8301 4.2448 21.5052C4.91994 22.1803 5.77335 22.4758 6.80961 22.6152C7.8127 22.75 9.20315 22.75 10.8057 22.75C12.4083 22.75 13.6873 22.75 14.6904 22.6152C15.7267 22.4758 16.5801 22.1803 17.2552 21.5052C17.9303 20.8301 18.2259 19.9767 18.3652 18.9404C18.3987 18.6913 18.4238 18.4252 18.4428 18.1413C18.2245 18.2119 17.9917 18.25 17.75 18.25C16.8338 18.25 16.0455 17.7024 15.6946 16.9167H15.25C14.0074 16.9167 13 15.9093 13 14.6667C13 13.9138 13.3697 13.2474 13.9375 12.8389V11.1611C13.3697 10.7526 13 10.0862 13 9.33333C13 8.09069 14.0074 7.08333 15.25 7.08333H15.6946C16.0455 6.29759 16.8338 5.75 17.75 5.75C17.9917 5.75 18.2245 5.78812 18.4428 5.85866C18.4238 5.57481 18.3987 5.30871 18.3652 5.05961C18.2259 4.02335 17.9303 3.16994 17.2552 2.4948C16.5801 1.81966 15.7267 1.52415 14.6904 1.38483Z',
  d9: 'M9.75 19C9.75 18.4477 10.1977 18 10.75 18H10.759C11.3113 18 11.759 18.4477 11.759 19C11.759 19.5523 11.3113 20 10.759 20H10.75C10.1977 20 9.75 19.5523 9.75 19Z',
  d10: 'M9 5C9 4.58579 9.33579 4.25 9.75 4.25H11.75C12.1642 4.25 12.5 4.58579 12.5 5C12.5 5.41421 12.1642 5.75 11.75 5.75H9.75C9.33579 5.75 9 5.41421 9 5Z',
  d11: 'M17.75 6.00034V2.00046L3.75 2V22H17.75V18.0001',
  d12: 'M9.5 5H12.5',
  d13: 'M18.5 7.25V8.58333H19.3125C20.2893 8.58333 21 9.41317 21 10.3333V11C21 11.3624 20.8898 11.7108 20.6965 12C20.8898 12.2892 21 12.6376 21 13V13.6667C21 14.5868 20.2893 15.4167 19.3125 15.4167H18.5V16.75H17V15.4167H14.5V13.9167H15.4375L15.4375 10.0833H14.5V8.58333H17V7.25H18.5ZM16.9375 10.0833V11.25H19.3125C19.3712 11.25 19.5 11.1844 19.5 11V10.3333C19.5 10.1489 19.3712 10.0833 19.3125 10.0833H16.9375ZM19.3125 12.75H16.9375L16.9375 13.9167H19.3125C19.3712 13.9167 19.5 13.8511 19.5 13.6667V13C19.5 12.8156 19.3712 12.75 19.3125 12.75Z',
  d14: 'M18.5 1.25051L3 1.25V22.75H18.5V18.25H15.5V16.9167H13V7.08333H15.5V5.75H18.5V1.25051ZM9.75 19H11.759V21H9.75V19ZM9.5 4.75H12.5V3.25H9.5V4.75Z',
};

export const IconBitcoinSmartphone01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bitcoin-smartphone-01-stroke-rounded IconBitcoinSmartphone01StrokeRounded"
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
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBitcoinSmartphone01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bitcoin-smartphone-01-duotone-rounded IconBitcoinSmartphone01DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
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
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBitcoinSmartphone01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bitcoin-smartphone-01-twotone-rounded IconBitcoinSmartphone01TwotoneRounded"
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
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBitcoinSmartphone01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bitcoin-smartphone-01-solid-rounded IconBitcoinSmartphone01SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconBitcoinSmartphone01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bitcoin-smartphone-01-bulk-rounded IconBitcoinSmartphone01BulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconBitcoinSmartphone01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bitcoin-smartphone-01-stroke-sharp IconBitcoinSmartphone01StrokeSharp"
    >
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBitcoinSmartphone01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bitcoin-smartphone-01-solid-sharp IconBitcoinSmartphone01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfBitcoinSmartphone01: TheIconSelfPack = {
  name: 'BitcoinSmartphone01',
  StrokeRounded: IconBitcoinSmartphone01StrokeRounded,
  DuotoneRounded: IconBitcoinSmartphone01DuotoneRounded,
  TwotoneRounded: IconBitcoinSmartphone01TwotoneRounded,
  SolidRounded: IconBitcoinSmartphone01SolidRounded,
  BulkRounded: IconBitcoinSmartphone01BulkRounded,
  StrokeSharp: IconBitcoinSmartphone01StrokeSharp,
  SolidSharp: IconBitcoinSmartphone01SolidSharp,
};