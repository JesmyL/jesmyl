import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2.5 8.18677C2.60406 6.08705 2.91537 4.77792 3.84664 3.84664C4.77792 2.91537 6.08705 2.60406 8.18677 2.5M21.5 8.18677C21.3959 6.08705 21.0846 4.77792 20.1534 3.84664C19.2221 2.91537 17.9129 2.60406 15.8132 2.5M15.8132 21.5C17.9129 21.3959 19.2221 21.0846 20.1534 20.1534C21.0846 19.2221 21.3959 17.9129 21.5 15.8132M8.18676 21.5C6.08705 21.3959 4.77792 21.0846 3.84664 20.1534C2.91537 19.2221 2.60406 17.9129 2.5 15.8132',
  d2: 'M16.5 15.5V11C16.5 8.51472 14.4853 6.5 12 6.5C9.51472 6.5 7.5 8.51472 7.5 11V15.5',
  d3: 'M13.5 12.5V11C13.5 10.1716 12.8284 9.5 12 9.5C11.1716 9.5 10.5 10.1716 10.5 11V16.5M13.5 15.5V17.5',
  d4: 'M16.5 15.5V11C16.5 8.51472 14.4853 6.5 12 6.5C9.51472 6.5 7.5 8.51472 7.5 11V15.5H16.5Z',
  d5: 'M6.75 11.0385C6.75 8.11773 9.10051 5.75 12 5.75C14.8995 5.75 17.25 8.11773 17.25 11.0385V15.3654C17.25 15.8964 16.8226 16.3269 16.2955 16.3269C15.7683 16.3269 15.3409 15.8964 15.3409 15.3654V11.0385C15.3409 9.17981 13.8451 7.67308 12 7.67308C10.1549 7.67308 8.65909 9.17981 8.65909 11.0385V15.3654C8.65909 15.8964 8.23173 16.3269 7.70455 16.3269C7.17736 16.3269 6.75 15.8964 6.75 15.3654V11.0385Z',
  d6: 'M9.61328 11.0385C9.61328 9.71085 10.6817 8.63462 11.9996 8.63462C13.3176 8.63462 14.386 9.71085 14.386 11.0385V12.4808C14.386 13.0118 13.9586 13.4423 13.4315 13.4423C12.9043 13.4423 12.4769 13.0118 12.4769 12.4808V11.0385C12.4769 10.7729 12.2632 10.5577 11.9996 10.5577C11.7361 10.5577 11.5224 10.7729 11.5224 11.0385V16.3269C11.5224 16.858 11.095 17.2885 10.5678 17.2885C10.0406 17.2885 9.61328 16.858 9.61328 16.3269V11.0385ZM13.4315 14.4038C13.9586 14.4038 14.386 14.8343 14.386 15.3654V17.2885C14.386 17.8195 13.9586 18.25 13.4315 18.25C12.9043 18.25 12.4769 17.8195 12.4769 17.2885V15.3654C12.4769 14.8343 12.9043 14.4038 13.4315 14.4038Z',
  d7: 'M9.25256 2.67789C9.27925 3.21636 8.86436 3.67452 8.32589 3.7012C6.30326 3.80144 5.36134 4.10077 4.73106 4.73106C4.10077 5.36134 3.80144 6.30326 3.7012 8.32589C3.67452 8.86437 3.21636 9.27925 2.67789 9.25256C2.13942 9.22588 1.72453 8.76772 1.75122 8.22925C1.85415 6.15244 2.1626 4.53843 3.35052 3.35052C4.53843 2.1626 6.15244 1.85415 8.22925 1.75122C8.76772 1.72453 9.22587 2.13942 9.25256 2.67789ZM14.7474 2.67789C14.7741 2.13942 15.2323 1.72453 15.7708 1.75122C17.8476 1.85415 19.4616 2.1626 20.6495 3.35052C21.8374 4.53843 22.1459 6.15244 22.2488 8.22925C22.2755 8.76772 21.8606 9.22588 21.3221 9.25256C20.7836 9.27925 20.3255 8.86437 20.2988 8.32589C20.1986 6.30326 19.8992 5.36134 19.2689 4.73106C18.6387 4.10077 17.6967 3.80144 15.6741 3.7012C15.1356 3.67452 14.7208 3.21636 14.7474 2.67789ZM2.67789 14.7474C3.21636 14.7208 3.67452 15.1356 3.7012 15.6741C3.80144 17.6967 4.10077 18.6387 4.73106 19.2689C5.36134 19.8992 6.30326 20.1986 8.32588 20.2988C8.86436 20.3255 9.27924 20.7836 9.25255 21.3221C9.22587 21.8606 8.76772 22.2755 8.22924 22.2488C6.15243 22.1459 4.53843 21.8374 3.35052 20.6495C2.1626 19.4616 1.85415 17.8476 1.75122 15.7708C1.72453 15.2323 2.13942 14.7741 2.67789 14.7474ZM21.3221 14.7474C21.8606 14.7741 22.2755 15.2323 22.2488 15.7708C22.1459 17.8476 21.8374 19.4616 20.6495 20.6495C19.4616 21.8374 17.8476 22.1459 15.7708 22.2488C15.2323 22.2755 14.7741 21.8606 14.7474 21.3221C14.7208 20.7836 15.1356 20.3255 15.6741 20.2988C17.6967 20.1986 18.6387 19.8992 19.2689 19.2689C19.8992 18.6387 20.1986 17.6967 20.2988 15.6741C20.3255 15.1356 20.7836 14.7208 21.3221 14.7474Z',
  d8: 'M8.5 2.5H2.5V8.5M8.5 21.5H2.5V15.5M15.5 2.5H21.5V8.5M15.5 21.5H21.5V15.5',
  d9: 'M6.75 11.0385C6.75 8.11772 9.10051 5.75 12 5.75C14.8995 5.75 17.25 8.11772 17.25 11.0385V16.3269H15.3409V11.0385C15.3409 9.17981 13.8451 7.67308 12 7.67308C10.1549 7.67308 8.65909 9.17981 8.65909 11.0385V16.3269H6.75V11.0385ZM9.61364 11.0385C9.61364 9.71085 10.682 8.63462 12 8.63462C13.318 8.63462 14.3864 9.71085 14.3864 11.0385V13.4423H12.4773V11.0385C12.4773 10.7729 12.2636 10.5577 12 10.5577C11.7364 10.5577 11.5227 10.7729 11.5227 11.0385V17.2885H9.61364V11.0385ZM14.3864 14.4038V18.25H12.4773V14.4038H14.3864Z',
  d10: 'M1.75 1.75H9.55952V3.70238H3.70238V9.55952H1.75V1.75ZM14.4405 1.75H22.25V9.55952H20.2976V3.70238H14.4405V1.75ZM3.70238 14.4405V20.2976H9.55952V22.25H1.75V14.4405H3.70238ZM22.25 14.4405V22.25H14.4405V20.2976H20.2976V14.4405H22.25Z',
};

export const IconFingerprintScanStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="fingerprint-scan-stroke-rounded IconFingerprintScanStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
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
    </TheIconWrapper>
  );
};

export const IconFingerprintScanDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="fingerprint-scan-duotone-rounded IconFingerprintScanDuotoneRounded"
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
        strokeLinejoin="round" 
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
    </TheIconWrapper>
  );
};

export const IconFingerprintScanTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="fingerprint-scan-twotone-rounded IconFingerprintScanTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
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
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconFingerprintScanSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="fingerprint-scan-solid-rounded IconFingerprintScanSolidRounded"
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconFingerprintScanBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="fingerprint-scan-bulk-rounded IconFingerprintScanBulkRounded"
    >
      <g 
        opacity="var(--icon-opacity)">
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
      </g>
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconFingerprintScanStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="fingerprint-scan-stroke-sharp IconFingerprintScanStrokeSharp"
    >
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
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
    </TheIconWrapper>
  );
};

export const IconFingerprintScanSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="fingerprint-scan-solid-sharp IconFingerprintScanSolidSharp"
    >
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

export const iconPackOfFingerprintScan: TheIconSelfPack = {
  name: 'FingerprintScan',
  StrokeRounded: IconFingerprintScanStrokeRounded,
  DuotoneRounded: IconFingerprintScanDuotoneRounded,
  TwotoneRounded: IconFingerprintScanTwotoneRounded,
  SolidRounded: IconFingerprintScanSolidRounded,
  BulkRounded: IconFingerprintScanBulkRounded,
  StrokeSharp: IconFingerprintScanStrokeSharp,
  SolidSharp: IconFingerprintScanSolidSharp,
};