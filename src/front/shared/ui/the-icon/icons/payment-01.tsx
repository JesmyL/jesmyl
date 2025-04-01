import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M13.5 15H6C4.11438 15 3.17157 15 2.58579 14.4142C2 13.8284 2 12.8856 2 11V7C2 5.11438 2 4.17157 2.58579 3.58579C3.17157 3 4.11438 3 6 3H18C19.8856 3 20.8284 3 21.4142 3.58579C22 4.17157 22 5.11438 22 7V12C22 12.9319 22 13.3978 21.8478 13.7654C21.6448 14.2554 21.2554 14.6448 20.7654 14.8478C20.3978 15 19.9319 15 19 15',
  d2: 'M14 9C14 10.1045 13.1046 11 12 11C10.8954 11 10 10.1045 10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9Z',
  d3: 'M13 17C13 15.3431 14.3431 14 16 14V12C16 10.3431 17.3431 9 19 9V14.5C19 16.8346 19 18.0019 18.5277 18.8856C18.1548 19.5833 17.5833 20.1548 16.8856 20.5277C16.0019 21 14.8346 21 12.5 21H12C10.1362 21 9.20435 21 8.46927 20.6955C7.48915 20.2895 6.71046 19.5108 6.30448 18.5307C6 17.7956 6 16.8638 6 15',
  d4: 'M20.2945 2.32991C19.6997 2.24995 18.9505 2.24997 18.052 2.25H18.052L5.948 2.25H5.94797C5.04951 2.24997 4.3003 2.24995 3.70552 2.32991C3.07773 2.41432 2.51093 2.59999 2.05546 3.05546C1.59999 3.51093 1.41432 4.07773 1.32991 4.70552C1.24995 5.3003 1.24997 6.04951 1.25 6.94797V6.948L1.25 11.052V11.052C1.24997 11.9505 1.24995 12.6997 1.32991 13.2945C1.41432 13.9223 1.59999 14.4891 2.05546 14.9445C2.51093 15.4 3.07773 15.5857 3.70552 15.6701C4.3003 15.7501 5.04951 15.75 5.94798 15.75H5.94801L13.7639 15.75C13.9772 15.75 14.1805 15.6592 14.3227 15.5002C14.7358 15.0387 15.3337 14.75 16 14.75C16.4142 14.75 16.75 14.4142 16.75 14L16.75 12C16.75 11.0203 17.3761 10.1869 18.25 9.87803V15C18.25 15.4142 18.5858 15.75 19 15.75H19.0253C19.4697 15.75 19.8408 15.75 20.1454 15.7292C20.4625 15.7076 20.762 15.661 21.0524 15.5407C21.7262 15.2616 22.2616 14.7262 22.5407 14.0524C22.661 13.762 22.7076 13.4625 22.7292 13.1454C22.75 12.8408 22.75 12.4697 22.75 12.0253L22.75 6.94801C22.75 6.04953 22.7501 5.30031 22.6701 4.70552C22.5857 4.07773 22.4 3.51093 21.9445 3.05546C21.4891 2.59999 20.9223 2.41432 20.2945 2.32991ZM12 6.75C10.7574 6.75 9.75 7.75736 9.75 9C9.75 10.2426 10.7573 11.25 12 11.25C13.2427 11.25 14.25 10.2426 14.25 9C14.25 7.75736 13.2426 6.75 12 6.75Z',
  d5: 'M18.25 9.87803C17.3761 10.1869 16.75 11.0203 16.75 12V14C16.75 14.4142 16.4142 14.75 16 14.75C14.7574 14.75 13.75 15.7574 13.75 17C13.75 17.4142 13.4142 17.75 13 17.75C12.5858 17.75 12.25 17.4142 12.25 17C12.25 15.1858 13.5383 13.6725 15.25 13.325V12C15.25 9.92893 16.9289 8.25 19 8.25C19.4142 8.25 19.75 8.58579 19.75 9V14.5344C19.75 15.6726 19.75 16.5745 19.6883 17.3005C19.6251 18.0431 19.4933 18.6701 19.1891 19.2391C18.7463 20.0677 18.0677 20.7463 17.2391 21.1891C16.6701 21.4933 16.0431 21.6251 15.3005 21.6883C14.5745 21.75 13.6726 21.75 12.5344 21.75H11.9726H11.9726C11.0639 21.75 10.3437 21.75 9.76032 21.7102C9.16431 21.6695 8.65641 21.5848 8.18225 21.3884C7.01837 20.9063 6.09367 19.9816 5.61157 18.8177C5.41517 18.3436 5.33047 17.8357 5.2898 17.2397C5.24999 16.6562 5.25 15.9361 5.25 15.0274V15C5.25 14.5858 5.58579 14.25 6 14.25C6.41421 14.25 6.75 14.5858 6.75 15C6.75 15.9421 6.75041 16.6112 6.78632 17.1376C6.82178 17.6572 6.88931 17.9828 6.99739 18.2437C7.32725 19.0401 7.95994 19.6728 8.75628 20.0026C9.0172 20.1107 9.34279 20.1782 9.86243 20.2137C10.3888 20.2496 11.0579 20.25 12 20.25H12.5C13.6802 20.25 14.5184 20.2494 15.1734 20.1937C15.819 20.1387 16.2174 20.0344 16.532 19.8662C17.0989 19.5632 17.5632 19.0989 17.8662 18.532C18.0344 18.2174 18.1387 17.819 18.1937 17.1734C18.2494 16.5184 18.25 15.6802 18.25 14.5V9.87803Z',
  d6: 'M18.052 2.25C18.9505 2.24997 19.6997 2.24995 20.2945 2.32991C20.9223 2.41432 21.4891 2.59999 21.9445 3.05546C22.4 3.51093 22.5857 4.07773 22.6701 4.70552C22.7501 5.30031 22.75 6.04953 22.75 6.94801V12.0253C22.75 12.4697 22.75 12.8408 22.7292 13.1454C22.7076 13.4625 22.661 13.762 22.5407 14.0524C22.2616 14.7262 21.7262 15.2616 21.0524 15.5407C20.762 15.661 20.4625 15.7076 20.1454 15.7292C19.8408 15.75 19.4697 15.75 19.0253 15.75H19C18.5858 15.75 18.25 15.4142 18.25 15V9.87803C17.3761 10.1869 16.75 11.0203 16.75 12V14C16.75 14.4142 16.4142 14.75 16 14.75C15.3337 14.75 14.7358 15.0387 14.3227 15.5002C14.1805 15.6592 13.9772 15.75 13.7639 15.75L5.94801 15.75H5.94798C5.04951 15.75 4.3003 15.7501 3.70552 15.6701C3.07773 15.5857 2.51093 15.4 2.05546 14.9445C1.59999 14.4891 1.41432 13.9223 1.32991 13.2945C1.24995 12.6997 1.24997 11.9505 1.25 11.052V11.052V6.948V6.94797C1.24997 6.04951 1.24995 5.3003 1.32991 4.70552C1.41432 4.07773 1.59999 3.51093 2.05546 3.05546C2.51093 2.59999 3.07773 2.41432 3.70552 2.32991C4.3003 2.24995 5.04951 2.24997 5.94797 2.25H5.948H18.052H18.052Z',
  d7: 'M9.75 9C9.75 7.75736 10.7574 6.75 12 6.75C13.2426 6.75 14.25 7.75736 14.25 9C14.25 10.2426 13.2427 11.25 12 11.25C10.7573 11.25 9.75 10.2426 9.75 9Z',
  d8: 'M15.25 13.325V12C15.25 9.92893 16.9289 8.25 19 8.25C19.4142 8.25 19.75 8.58579 19.75 9V14.5344C19.75 15.6726 19.75 16.5745 19.6882 17.3005C19.6251 18.0431 19.4932 18.6701 19.1891 19.2391C18.7462 20.0677 18.0676 20.7463 17.2391 21.1891C16.6701 21.4933 16.043 21.6251 15.3005 21.6883C14.5745 21.75 13.6725 21.75 12.5344 21.75H11.9725C11.0639 21.75 10.3437 21.75 9.7603 21.7102C9.16428 21.6695 8.65639 21.5848 8.18223 21.3884C7.01834 20.9063 6.09364 19.9816 5.61155 18.8177C5.41514 18.3436 5.33044 17.8357 5.28977 17.2397C5.26115 16.8202 5.25311 16.3301 5.25085 15.75L12.4634 15.75C12.8972 14.5226 13.9518 13.5885 15.25 13.325Z',
  d9: 'M13 15H2L2 3H22V15H19',
  d10: 'M13 17C13 15.3431 14.3431 14 16 14V12C16 10.3431 17.3431 9 19 9V21H6V15',
  d11: 'M18.25 9.87803C17.3761 10.1869 16.75 11.0203 16.75 12V14.75H16C14.7574 14.75 13.75 15.7574 13.75 17V17.75H12.25V17C12.25 15.1858 13.5383 13.6725 15.25 13.325V12C15.25 9.92893 16.9289 8.25 19 8.25H19.75V21.75H5.25V14.25H6.75V20.25H18.25V9.87803Z',
  d12: 'M16.75 12C16.75 11.0203 17.3761 10.1869 18.25 9.87803V15.75H22.75V2.25H1.25V15.75H14.0992L14.3227 15.5002C14.7358 15.0387 15.3337 14.75 16 14.75H16.75V12ZM12 6.75C10.7574 6.75 9.75 7.75736 9.75 9C9.75 10.2426 10.7573 11.25 12 11.25C13.2427 11.25 14.25 10.2426 14.25 9C14.25 7.75736 13.2426 6.75 12 6.75Z',
};

export const IconPayment01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="payment-01-stroke-rounded IconPayment01StrokeRounded"
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

export const IconPayment01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="payment-01-duotone-rounded IconPayment01DuotoneRounded"
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

export const IconPayment01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="payment-01-twotone-rounded IconPayment01TwotoneRounded"
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

export const IconPayment01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="payment-01-solid-rounded IconPayment01SolidRounded"
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

export const IconPayment01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="payment-01-bulk-rounded IconPayment01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconPayment01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="payment-01-stroke-sharp IconPayment01StrokeSharp"
    >
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d2} 
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
    </TheIconWrapper>
  );
};

export const IconPayment01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="payment-01-solid-sharp IconPayment01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfPayment01: TheIconSelfPack = {
  name: 'Payment01',
  StrokeRounded: IconPayment01StrokeRounded,
  DuotoneRounded: IconPayment01DuotoneRounded,
  TwotoneRounded: IconPayment01TwotoneRounded,
  SolidRounded: IconPayment01SolidRounded,
  BulkRounded: IconPayment01BulkRounded,
  StrokeSharp: IconPayment01StrokeSharp,
  SolidSharp: IconPayment01SolidSharp,
};