import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M10 10.5V9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9V10.5M11.25 16H12.75C13.9228 16 14.5092 16 14.9131 15.69C15.0171 15.6102 15.1102 15.5171 15.19 15.4131C15.5 15.0092 15.5 14.4228 15.5 13.25C15.5 12.0772 15.5 11.4908 15.19 11.0869C15.1102 10.9829 15.0171 10.8898 14.9131 10.81C14.5092 10.5 13.9228 10.5 12.75 10.5H11.25C10.0772 10.5 9.49082 10.5 9.08686 10.81C8.98286 10.8898 8.88977 10.9829 8.80997 11.0869C8.5 11.4908 8.5 12.0772 8.5 13.25C8.5 14.4228 8.5 15.0092 8.80997 15.4131C8.88977 15.5171 8.98286 15.6102 9.08686 15.69C9.49082 16 10.0772 16 11.25 16Z',
  d2: 'M3.48516 5C6.49647 5 8.54693 2 12 2C15.4531 2 17.5034 5 20.5147 5C22.5224 15.0005 18.0295 20.583 11.9999 22C5.97037 20.583 1.47749 15.0005 3.48516 5Z',
  d3: 'M7.44157 3.57694C6.1694 4.30044 4.93931 5 3.48516 5C1.47749 15.0005 5.97037 20.583 11.9999 22C18.0295 20.583 22.5224 15.0005 20.5147 5C19.0606 5 17.8305 4.30044 16.5584 3.57694C15.1961 2.80219 13.7856 2 12 2C10.2144 2 8.80386 2.80219 7.44157 3.57694ZM9.08686 15.69C9.49082 16 10.0772 16 11.25 16H12.75C13.9228 16 14.5092 16 14.9131 15.69C15.0171 15.6102 15.1102 15.5171 15.19 15.4131C15.5 15.0092 15.5 14.4228 15.5 13.25C15.5 12.0772 15.5 11.4908 15.19 11.0869C15.1102 10.9829 15.0171 10.8898 14.9131 10.81C14.5092 10.5 13.9228 10.5 12.75 10.5H11.25C10.0772 10.5 9.49082 10.5 9.08686 10.81C8.98286 10.8898 8.88977 10.9829 8.80997 11.0869C8.5 11.4908 8.5 12.0772 8.5 13.25C8.5 14.4228 8.5 15.0092 8.80997 15.4131C8.88977 15.5171 8.98286 15.6102 9.08686 15.69Z',
  d4: 'M12 1.25C10.0526 1.25 8.51842 2.10282 7.20655 2.84783C5.8669 3.60875 4.73793 4.25 3.48516 4.25C3.12786 4.25 2.82016 4.50206 2.74984 4.85238C1.71979 9.9832 2.34002 14.0747 4.07869 17.0932C5.81978 20.1158 8.63583 21.9798 11.8284 22.7301C11.9412 22.7566 12.0587 22.7566 12.1715 22.7301C15.3641 21.9798 18.1801 20.1158 19.9212 17.0932C21.6599 14.0747 22.2801 9.9832 21.2501 4.85238C21.1797 4.50206 20.872 4.25 20.5147 4.25C19.262 4.25 18.133 3.60875 16.7934 2.84783C15.4816 2.10282 13.9474 1.25 12 1.25ZM14.7501 9V9.90109C14.9667 9.9672 15.1753 10.0657 15.3698 10.215C15.5258 10.3347 15.6655 10.4743 15.7852 10.6303C16.057 10.9846 16.1604 11.3855 16.2067 11.7961C16.2502 12.1821 16.2502 12.739 16.2501 13.2907C16.2502 13.8423 16.2502 14.3179 16.2067 14.7039C16.1604 15.1145 16.057 15.5154 15.7852 15.8697C15.6655 16.0257 15.5258 16.1653 15.3698 16.285C15.0155 16.5569 14.6146 16.6602 14.204 16.7065C13.818 16.75 13.3424 16.75 12.7908 16.75H11.2094C10.6578 16.75 10.1822 16.75 9.79623 16.7065C9.38565 16.6602 8.98472 16.5569 8.63041 16.285C8.47442 16.1653 8.33478 16.0257 8.21508 15.8697C7.94322 15.5154 7.83988 15.1145 7.79359 14.7039C7.75008 14.3179 7.7501 13.8423 7.75012 13.2907C7.7501 12.739 7.75008 12.1821 7.79359 11.7961C7.83988 11.3855 7.94322 10.9846 8.21508 10.6303C8.33478 10.4743 8.47442 10.3347 8.63041 10.215C8.82497 10.0657 9.03358 9.9672 9.25013 9.90109V9C9.25013 7.48122 10.4813 6.25 12.0001 6.25C13.5189 6.25 14.7501 7.48122 14.7501 9ZM12.0001 7.75C11.3098 7.75 10.7501 8.30964 10.7501 9V9.75103L13.2501 9.75103V9C13.2501 8.30964 12.6905 7.75 12.0001 7.75Z',
  d5: 'M7.20655 2.84783C8.51842 2.10282 10.0526 1.25 12 1.25C13.9474 1.25 15.4816 2.10282 16.7934 2.84783C18.133 3.60875 19.262 4.25 20.5147 4.25C20.872 4.25 21.1797 4.50206 21.2501 4.85238C22.2801 9.9832 21.6599 14.0747 19.9212 17.0932C18.1801 20.1158 15.3641 21.9798 12.1715 22.7301C12.0587 22.7566 11.9412 22.7566 11.8284 22.7301C8.63583 21.9798 5.81978 20.1158 4.07869 17.0932C2.34002 14.0747 1.71979 9.9832 2.74984 4.85238C2.82016 4.50206 3.12786 4.25 3.48516 4.25C4.73793 4.25 5.8669 3.60875 7.20655 2.84783Z',
  d6: 'M14.7501 9.90109V9C14.7501 7.48122 13.5189 6.25 12.0001 6.25C10.4813 6.25 9.25013 7.48122 9.25013 9V9.90109C9.03358 9.9672 8.82497 10.0657 8.63041 10.215C8.47442 10.3347 8.33478 10.4743 8.21508 10.6303C7.94322 10.9846 7.83988 11.3855 7.79359 11.7961C7.75008 12.1821 7.7501 12.739 7.75012 13.2907C7.7501 13.8423 7.75008 14.3179 7.79359 14.7039C7.83988 15.1145 7.94322 15.5154 8.21508 15.8697C8.33478 16.0257 8.47442 16.1653 8.63041 16.285C8.98472 16.5569 9.38565 16.6602 9.79623 16.7065C10.1822 16.75 10.6578 16.75 11.2094 16.75H12.7908C13.3424 16.75 13.818 16.75 14.204 16.7065C14.6146 16.6602 15.0155 16.5569 15.3698 16.285C15.5258 16.1653 15.6655 16.0257 15.7852 15.8697C16.057 15.5154 16.1604 15.1145 16.2067 14.7039C16.2502 14.3179 16.2502 13.8423 16.2501 13.2907C16.2502 12.739 16.2502 12.1821 16.2067 11.7961C16.1604 11.3855 16.057 10.9846 15.7852 10.6303C15.6655 10.4743 15.5258 10.3347 15.3698 10.215C15.1753 10.0657 14.9667 9.9672 14.7501 9.90109ZM10.7501 9C10.7501 8.30964 11.3098 7.75 12.0001 7.75C12.6905 7.75 13.2501 8.30964 13.2501 9V9.75103H10.7501V9Z',
  d7: 'M15.5 10.5H8.5V16H15.5V10.5Z',
  d8: 'M14 10.5V9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9V10.5',
  d9: 'M3.43067 4.93449C6.56932 5.16032 8.59312 2.00109 12.0266 2.00109C15.4086 1.93401 17.0635 4.97669 20.5307 4.97669C22.3893 14.3837 18.5226 20.2928 12.0549 22C6.0595 20.583 1.5547 14.6133 3.43067 4.93449Z',
  d10: 'M20.5307 4.22349C19.0288 4.22349 17.8683 3.55021 16.5834 2.78979C15.3424 2.05523 13.9239 1.2156 12.0192 1.25109C10.1165 1.25333 8.60972 2.11746 7.3259 2.8537C5.96702 3.63247 4.79066 4.27715 3.48452 4.18327L2.82098 4.13558L2.6944 4.78798C1.72956 9.76059 2.39233 13.858 4.13944 16.92C5.88776 19.9842 8.87303 21.9964 12.0649 22.75C15.4785 21.8499 18.4245 19.7791 20.0756 16.7146C21.7214 13.66 22.22 9.64836 21.2665 4.82747L21.147 4.22349H20.5307ZM9.25012 9C9.25012 7.48122 10.4813 6.25 12.0001 6.25C13.5189 6.25 14.7501 7.48122 14.7501 9V9.75H16.2501L16.2501 16.75L7.75012 16.75L7.75012 9.75H9.25012V9ZM13.2501 9V9.75L10.7501 9.75V9C10.7501 8.30964 11.3098 7.75 12.0001 7.75C12.6905 7.75 13.2501 8.30964 13.2501 9Z',
};

export const IconBlockedStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="blocked-stroke-rounded IconBlockedStrokeRounded"
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
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBlockedDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="blocked-duotone-rounded IconBlockedDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
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
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBlockedTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="blocked-twotone-rounded IconBlockedTwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBlockedSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="blocked-solid-rounded IconBlockedSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconBlockedBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="blocked-bulk-rounded IconBlockedBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconBlockedStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="blocked-stroke-sharp IconBlockedStrokeSharp"
    >
      <path 
        d={d.d7} 
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
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
    </TheIconWrapper>
  );
};

export const IconBlockedSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="blocked-solid-sharp IconBlockedSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfBlocked: TheIconSelfPack = {
  name: 'Blocked',
  StrokeRounded: IconBlockedStrokeRounded,
  DuotoneRounded: IconBlockedDuotoneRounded,
  TwotoneRounded: IconBlockedTwotoneRounded,
  SolidRounded: IconBlockedSolidRounded,
  BulkRounded: IconBlockedBulkRounded,
  StrokeSharp: IconBlockedStrokeSharp,
  SolidSharp: IconBlockedSolidSharp,
};