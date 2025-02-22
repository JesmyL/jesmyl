import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M17.4776 11.0001C17.485 11 17.4925 11 17.5 11C19.9853 11 22 13.0147 22 15.5C22 17.9853 19.9853 20 17.5 20H7C4.23858 20 2 17.7614 2 15C2 12.4003 3.98398 10.2641 6.52042 10.0227M17.4776 11.0001C17.4924 10.8354 17.5 10.6686 17.5 10.5C17.5 7.46243 15.0376 5 12 5C9.12324 5 6.76233 7.20862 6.52042 10.0227M17.4776 11.0001C17.3753 12.1345 16.9286 13.1696 16.2428 14M6.52042 10.0227C6.67826 10.0077 6.83823 10 7 10C8.12582 10 9.16474 10.3721 10.0005 11',
  d2: 'M9 5.65468C8.30552 4.65451 7.15088 4 5.84388 4C3.72096 4 2 5.72674 2 7.85679C2 9.15354 2.63783 10.3008 3.61588 11',
  d3: 'M17.5 10.5C17.5 7.46243 15.0376 5 12 5C9.12324 5 6.76233 7.20862 6.52042 10.0227C3.98398 10.2641 2 12.4003 2 15C2 17.7614 4.23858 20 7 20H17.5C19.9853 20 22 17.9853 22 15.5C22 13.0147 19.9853 11 17.5 11L17.4776 11.0001C17.4924 10.8354 17.5 10.6686 17.5 10.5Z',
  d4: 'M1.375 15.125C1.375 12.342 3.35164 10.0214 5.978 9.48954C6.51231 6.57956 9.06085 4.375 12.125 4.375C15.5108 4.375 18.2678 7.06724 18.3719 10.4277C20.9177 10.7903 22.875 12.9791 22.875 15.625C22.875 18.5245 20.5245 20.875 17.625 20.875H7.125C3.94936 20.875 1.375 18.3006 1.375 15.125Z',
  d5: 'M3.125 7.98179C3.125 6.40086 4.40141 5.125 5.96888 5.125C6.74917 5.125 7.45701 5.44017 7.97224 5.95404C8.47713 5.50479 9.05535 5.1362 9.68671 4.86845C8.79983 3.80488 7.46405 3.125 5.96888 3.125C3.29052 3.125 1.125 5.30262 1.125 7.98179C1.125 9.37511 1.71096 10.632 2.64756 11.517C3.07158 10.9915 3.58625 10.5422 4.16783 10.1928C3.53021 9.66805 3.125 8.8729 3.125 7.98179Z',
  d6: 'M3.14766 7.85826C3.14766 6.35823 4.35875 5.14766 5.84601 5.14766C6.58272 5.14766 7.25136 5.44376 7.7396 5.92707C6.77854 6.82293 6.1002 8.01824 5.853 9.36454C5.25587 9.48547 4.69233 9.69886 4.17797 9.98912C3.54949 9.49188 3.14766 8.72264 3.14766 7.85826ZM2.68308 11.2016C1.80115 10.3624 1.25 9.17454 1.25 7.85826C1.25 5.31619 3.30471 3.25 5.84601 3.25C7.23857 3.25 8.48541 3.87157 9.32672 4.8489C10.1372 4.46484 11.0435 4.25 12 4.25C15.3858 4.25 18.1428 6.94224 18.2469 10.3027C20.7927 10.6653 22.75 12.8541 22.75 15.5C22.75 18.3995 20.3995 20.75 17.5 20.75H7C3.82436 20.75 1.25 18.1756 1.25 15C1.25 13.544 1.79103 12.2146 2.68308 11.2016Z',
};

export const IconSunCloud01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sun-cloud-01-stroke-rounded IconSunCloud01StrokeRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconSunCloud01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sun-cloud-01-duotone-rounded IconSunCloud01DuotoneRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconSunCloud01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sun-cloud-01-twotone-rounded IconSunCloud01TwotoneRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconSunCloud01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sun-cloud-01-solid-rounded IconSunCloud01SolidRounded"
    >
      <path 
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

export const IconSunCloud01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sun-cloud-01-bulk-rounded IconSunCloud01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconSunCloud01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sun-cloud-01-stroke-sharp IconSunCloud01StrokeSharp"
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
      />
    </TheIconWrapper>
  );
};

export const IconSunCloud01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sun-cloud-01-solid-sharp IconSunCloud01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfSunCloud01: TheIconSelfPack = {
  name: 'SunCloud01',
  StrokeRounded: IconSunCloud01StrokeRounded,
  DuotoneRounded: IconSunCloud01DuotoneRounded,
  TwotoneRounded: IconSunCloud01TwotoneRounded,
  SolidRounded: IconSunCloud01SolidRounded,
  BulkRounded: IconSunCloud01BulkRounded,
  StrokeSharp: IconSunCloud01StrokeSharp,
  SolidSharp: IconSunCloud01SolidSharp,
};