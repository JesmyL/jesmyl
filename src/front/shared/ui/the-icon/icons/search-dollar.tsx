import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M17.5 17.5L22 22',
  d2: 'M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z',
  d3: 'M13.2531 9.31112C13.3579 8.04662 11.4232 7.01413 9.94467 7.70685C8.09769 8.57218 8.25873 10.7594 10.5399 10.8751C11.555 10.9265 12.4429 10.8169 13.0463 11.4708C13.6497 12.1248 13.9112 13.7901 12.1325 14.3553C10.3539 14.9204 8.5 13.9125 8.5 12.6831M10.971 6.5V7.47767M10.971 14.7204V15.5',
  d4: 'M13.2511 9.31112C13.3559 8.04662 11.4212 7.01413 9.94272 7.70685C8.09574 8.57218 8.25678 10.7594 10.5379 10.8751C11.553 10.9265 12.4409 10.8169 13.0443 11.4708C13.6477 12.1248 13.9092 13.7901 12.1305 14.3553C10.3519 14.9204 8.49805 13.9125 8.49805 12.6831M10.969 6.5V7.47767M10.969 14.7204V15.5',
  d5: 'M1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11C21 13.4013 20.1536 15.6049 18.7429 17.3287L22.7071 21.2929C23.0976 21.6834 23.0976 22.3166 22.7071 22.7071C22.3166 23.0976 21.6834 23.0976 21.2929 22.7071L17.3287 18.7429C15.6049 20.1536 13.4013 21 11 21C5.47715 21 1 16.5228 1 11ZM11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3Z',
  d6: 'M11 5C11.5523 5 12 5.44772 12 6V6.2211C13.2652 6.50114 14.3965 7.30984 14.6858 8.56438C14.8099 9.10254 14.4743 9.63942 13.9361 9.76354C13.398 9.88765 12.8611 9.55201 12.737 9.01385C12.6621 8.68923 12.1016 8.11133 11 8.11133C10.4309 8.11133 9.95568 8.28187 9.64678 8.50837C9.33729 8.73531 9.25 8.96611 9.25 9.12779C9.25 9.42632 9.32835 9.50971 9.43131 9.57863C9.61991 9.70489 10.0638 9.85618 11 9.85618C12.0558 9.85618 13.0461 10.0004 13.7939 10.4851C14.6326 11.0288 15 11.8838 15 12.8726C15 13.972 14.455 14.7895 13.6339 15.2796C13.1485 15.5694 12.5838 15.7376 12 15.8213V16C12 16.5523 11.5523 17 11 17C10.4477 17 10 16.5523 10 16V15.7965C9.37698 15.6787 8.80094 15.4511 8.32083 15.1284C7.59808 14.6426 7 13.864 7 12.8726C7 12.3204 7.44772 11.8726 8 11.8726C8.55228 11.8726 9 12.3204 9 12.8726C9 12.9949 9.07349 13.2245 9.43653 13.4686C9.79331 13.7084 10.3431 13.8891 11 13.8891C11.7383 13.8891 12.2834 13.7566 12.6088 13.5623C12.8734 13.4044 13 13.2136 13 12.8726C13 12.4212 12.8674 12.268 12.7061 12.1634C12.4539 12 11.9442 11.8562 11 11.8562C9.93624 11.8562 9.00509 11.7001 8.31869 11.2406C7.54665 10.7237 7.25 9.94292 7.25 9.12779C7.25 8.17581 7.77832 7.39838 8.46413 6.8955C8.90307 6.57364 9.42929 6.34275 10 6.21811V6C10 5.44771 10.4477 5 11 5Z',
  d7: 'M11 7.5002C9.73435 7.5002 8.70833 8.31272 8.70833 9.31501C8.70833 10.3173 9.33333 10.8706 11 10.8706C12.6667 10.8706 13.5 11.3891 13.5 12.6854C13.5 13.9817 12.3807 14.5002 11 14.5002M11 7.5002C12.2657 7.5002 13.2917 8.31272 13.2917 9.31501M11 7.5002L11 5.5M11 14.5002C9.61929 14.5002 8.5 13.6877 8.5 12.6854M11 14.5002L11 16.5',
  d8: 'M21.5858 23L16.793 18.2072L18.2072 16.793L23 21.5858L21.5858 23Z',
  d9: 'M1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11ZM11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3Z',
  d10: 'M10 6.63688C8.77101 6.97508 7.70833 7.92545 7.70833 9.31501C7.70833 10.0441 7.95143 10.7788 8.64325 11.279C9.26329 11.7273 10.0935 11.8706 11 11.8706C11.769 11.8706 12.1399 11.998 12.3015 12.1111C12.3854 12.1698 12.5 12.2745 12.5 12.6854C12.5 12.9905 12.3955 13.1291 12.2259 13.2384C11.998 13.3854 11.59 13.5002 11 13.5002C10.4976 13.5002 10.0836 13.3509 9.81969 13.1594C9.55476 12.9671 9.5 12.7869 9.5 12.6854H7.5C7.5 13.5861 8.00488 14.3134 8.64477 14.7779C9.03556 15.0616 9.49883 15.2678 10 15.3856L10 16.5H12V15.4142C12.4641 15.329 12.9149 15.1738 13.3096 14.9194C14.0449 14.4453 14.5 13.6766 14.5 12.6854C14.5 11.8 14.1979 10.9973 13.4485 10.4726C12.7767 10.0024 11.8977 9.87057 11 9.87057C10.2399 9.87057 9.92421 9.73718 9.81508 9.65828C9.81417 9.65762 9.81324 9.65695 9.81229 9.65627C9.77439 9.62904 9.70833 9.58158 9.70833 9.31501C9.70833 9.06991 10.0565 8.5002 11 8.5002C11.9435 8.5002 12.2917 9.06991 12.2917 9.31501H14.2917C14.2917 7.92545 13.229 6.97508 12 6.63688V5.5H10L10 6.63688Z',
};

export const IconSearchDollarStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="search-dollar-stroke-rounded IconSearchDollarStrokeRounded"
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

export const IconSearchDollarDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="search-dollar-duotone-rounded IconSearchDollarDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
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

export const IconSearchDollarTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="search-dollar-twotone-rounded IconSearchDollarTwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconSearchDollarSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="search-dollar-solid-rounded IconSearchDollarSolidRounded"
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

export const IconSearchDollarBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="search-dollar-bulk-rounded IconSearchDollarBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconSearchDollarStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="search-dollar-stroke-sharp IconSearchDollarStrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSearchDollarSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="search-dollar-solid-sharp IconSearchDollarSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const iconPackOfSearchDollar: TheIconSelfPack = {
  name: 'SearchDollar',
  StrokeRounded: IconSearchDollarStrokeRounded,
  DuotoneRounded: IconSearchDollarDuotoneRounded,
  TwotoneRounded: IconSearchDollarTwotoneRounded,
  SolidRounded: IconSearchDollarSolidRounded,
  BulkRounded: IconSearchDollarBulkRounded,
  StrokeSharp: IconSearchDollarStrokeSharp,
  SolidSharp: IconSearchDollarSolidSharp,
};