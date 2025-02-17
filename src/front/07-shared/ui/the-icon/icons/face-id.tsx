import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2.5 8.18677C2.60406 6.08705 2.91537 4.77792 3.84664 3.84664C4.77792 2.91537 6.08705 2.60406 8.18677 2.5M21.5 8.18677C21.3959 6.08705 21.0846 4.77792 20.1534 3.84664C19.2221 2.91537 17.9129 2.60406 15.8132 2.5M15.8132 21.5C17.9129 21.3959 19.2221 21.0846 20.1534 20.1534C21.0846 19.2221 21.3959 17.9129 21.5 15.8132M8.18676 21.5C6.08705 21.3959 4.77792 21.0846 3.84664 20.1534C2.91537 19.2221 2.60406 17.9129 2.5 15.8132',
  d2: 'M17.5 17L17.2978 16.1511C17.1307 15.4497 16.5989 14.8925 15.9061 14.6929L13.5 13.9994L13.4997 12.5318C14.3964 11.9266 14.9997 10.7955 14.9997 9.5C14.9997 7.567 13.6565 6 11.9997 6C10.3428 6 8.99966 7.567 8.99966 9.5C8.99966 10.7955 9.60296 11.9266 10.4997 12.5318L10.5 13.9994L8.10885 14.6994C7.43747 14.896 6.91757 15.429 6.73787 16.1051L6.5 17',
  d3: 'M11.9997 6C10.3428 6 8.99966 7.567 8.99966 9.5C8.99966 10.7955 9.60296 11.9266 10.4997 12.5318L10.5 13.9994L8.10885 14.6994C7.43747 14.896 6.91757 15.429 6.73787 16.1051L6.5 17H17.5L17.2978 16.1511C17.1307 15.4497 16.5989 14.8925 15.9061 14.6929L13.5 13.9994L13.4997 12.5318C14.3964 11.9266 14.9997 10.7955 14.9997 9.5C14.9997 7.567 13.6565 6 11.9997 6Z',
  d4: 'M9.25256 2.67789C9.27925 3.21636 8.86436 3.67452 8.32589 3.7012C6.30326 3.80144 5.36134 4.10077 4.73106 4.73106C4.10077 5.36134 3.80144 6.30326 3.7012 8.32589C3.67452 8.86437 3.21636 9.27925 2.67789 9.25256C2.13942 9.22588 1.72453 8.76772 1.75122 8.22925C1.85415 6.15244 2.1626 4.53843 3.35052 3.35052C4.53843 2.1626 6.15244 1.85415 8.22925 1.75122C8.76772 1.72453 9.22587 2.13942 9.25256 2.67789ZM14.7474 2.67789C14.7741 2.13942 15.2323 1.72453 15.7708 1.75122C17.8476 1.85415 19.4616 2.1626 20.6495 3.35052C21.8374 4.53843 22.1459 6.15244 22.2488 8.22925C22.2755 8.76772 21.8606 9.22588 21.3221 9.25256C20.7836 9.27925 20.3255 8.86437 20.2988 8.32589C20.1986 6.30326 19.8992 5.36134 19.2689 4.73106C18.6387 4.10077 17.6967 3.80144 15.6741 3.7012C15.1356 3.67452 14.7208 3.21636 14.7474 2.67789ZM2.67789 14.7474C3.21636 14.7208 3.67452 15.1356 3.7012 15.6741C3.80144 17.6967 4.10077 18.6387 4.73106 19.2689C5.36134 19.8992 6.30326 20.1986 8.32588 20.2988C8.86436 20.3255 9.27924 20.7836 9.25255 21.3221C9.22587 21.8606 8.76772 22.2755 8.22924 22.2488C6.15243 22.1459 4.53843 21.8374 3.35052 20.6495C2.1626 19.4616 1.85415 17.8476 1.75122 15.7708C1.72453 15.2323 2.13942 14.7741 2.67789 14.7474ZM21.3221 14.7474C21.8606 14.7741 22.2755 15.2323 22.2488 15.7708C22.1459 17.8476 21.8374 19.4616 20.6495 20.6495C19.4616 21.8374 17.8476 22.1459 15.7708 22.2488C15.2323 22.2755 14.7741 21.8606 14.7474 21.3221C14.7208 20.7836 15.1356 20.3255 15.6741 20.2988C17.6967 20.1986 18.6387 19.8992 19.2689 19.2689C19.8992 18.6387 20.1986 17.6967 20.2988 15.6741C20.3255 15.1356 20.7836 14.7208 21.3221 14.7474Z',
  d5: 'M11.9996 5.5C10.1921 5.5 8.7269 7.20945 8.7269 9.31818C8.7269 10.7314 9.38504 11.9653 10.3633 12.6255L10.3636 14.2266L7.75511 14.9903C7.02269 15.2047 6.45553 15.7862 6.25949 16.5237L6 17.5H18L17.7794 16.574C17.5971 15.8088 17.017 15.201 16.2612 14.9831L13.6364 14.2266L13.636 12.6255C14.6142 11.9653 15.2724 10.7314 15.2724 9.31818C15.2724 7.20945 13.8071 5.5 11.9996 5.5Z',
  d6: 'M17.5 17L17.0273 15.016L13.5 13.9994L13.4997 12.5318C14.3964 11.9266 14.9997 10.7955 14.9997 9.5C14.9997 7.567 13.6565 6 11.9997 6C10.3428 6 8.99966 7.567 8.99966 9.5C8.99966 10.7955 9.60296 11.9266 10.4997 12.5318L10.5 13.9994L7.02734 15.016L6.5 17',
  d7: 'M8.5 2.5H2.5V8.5M8.5 21.5H2.5V15.5M15.5 2.5H21.5V8.5M15.5 21.5H21.5V15.5',
  d8: 'M11.9996 5.5C10.1921 5.5 8.7269 7.20945 8.7269 9.31818C8.7269 10.7314 9.38504 11.9653 10.3633 12.6255L10.3636 14.2266L6.57528 15.3357L6 17.5H18L17.4844 15.3357L13.6364 14.2266L13.636 12.6255C14.6142 11.9653 15.2724 10.7314 15.2724 9.31818C15.2724 7.20945 13.8071 5.5 11.9996 5.5Z',
  d9: 'M1.75 1.75H9.55952V3.70238H3.70238V9.55952H1.75V1.75ZM14.4405 1.75H22.25V9.55952H20.2976V3.70238H14.4405V1.75ZM3.70238 14.4405V20.2976H9.55952V22.25H1.75V14.4405H3.70238ZM22.25 14.4405V22.25H14.4405V20.2976H20.2976V14.4405H22.25Z',
};

export const IconFaceIdStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="face-id-stroke-rounded IconFaceIdStrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconFaceIdDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="face-id-duotone-rounded IconFaceIdDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
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
    </TheIconWrapper>
  );
};

export const IconFaceIdTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="face-id-twotone-rounded IconFaceIdTwotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconFaceIdSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="face-id-solid-rounded IconFaceIdSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconFaceIdBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="face-id-bulk-rounded IconFaceIdBulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconFaceIdStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="face-id-stroke-sharp IconFaceIdStrokeSharp"
    >
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
    </TheIconWrapper>
  );
};

export const IconFaceIdSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="face-id-solid-sharp IconFaceIdSolidSharp"
    >
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfFaceId: TheIconSelfPack = {
  name: 'FaceId',
  StrokeRounded: IconFaceIdStrokeRounded,
  DuotoneRounded: IconFaceIdDuotoneRounded,
  TwotoneRounded: IconFaceIdTwotoneRounded,
  SolidRounded: IconFaceIdSolidRounded,
  BulkRounded: IconFaceIdBulkRounded,
  StrokeSharp: IconFaceIdStrokeSharp,
  SolidSharp: IconFaceIdSolidSharp,
};