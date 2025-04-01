import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12.5 22H6.59087C5.04549 22 3.81631 21.248 2.71266 20.1966C0.453365 18.0441 4.1628 16.324 5.57757 15.4816C7.67837 14.2307 10.1368 13.7719 12.5 14.1052C13.3575 14.2261 14.1926 14.4514 15 14.7809',
  d2: 'M15.5 6.5C15.5 8.98528 13.4853 11 11 11C8.51472 11 6.5 8.98528 6.5 6.5C6.5 4.01472 8.51472 2 11 2C13.4853 2 15.5 4.01472 15.5 6.5Z',
  d3: 'M15 18.5H22',
  d4: 'M5.57757 15.4816C4.1628 16.324 0.453365 18.0441 2.71266 20.1966C3.81631 21.248 5.04549 22 6.59087 22H15.4091C16.9545 22 18.1837 21.248 19.2873 20.1966C21.5466 18.0441 17.8372 16.324 16.4224 15.4816C13.1048 13.5061 8.89519 13.5061 5.57757 15.4816Z',
  d5: 'M5.75 6.5C5.75 3.6005 8.1005 1.25 11 1.25C13.8995 1.25 16.25 3.6005 16.25 6.5C16.25 9.39949 13.8995 11.75 11 11.75C8.1005 11.75 5.75 9.39949 5.75 6.5Z',
  d6: 'M14 18.5C14 17.9477 14.4477 17.5 15 17.5H22C22.5523 17.5 23 17.9477 23 18.5C23 19.0523 22.5523 19.5 22 19.5H15C14.4477 19.5 14 19.0523 14 18.5Z',
  d7: 'M12.6049 13.3625C11.5411 13.2125 10.4593 13.2125 9.39543 13.3625C7.93096 13.5691 6.49889 14.0602 5.19404 14.8372C5.07775 14.9064 4.93412 14.9875 4.7715 15.0792C4.05869 15.4813 2.98106 16.0893 2.2429 16.8118C1.78123 17.2637 1.34257 17.8592 1.26283 18.5888C1.17802 19.3646 1.51649 20.0927 2.1955 20.7396C3.36695 21.8556 4.77274 22.75 6.59104 22.75H15.4093C16.4932 22.75 17.4305 22.4322 18.259 21.9391C18.817 21.6069 19.096 21.4409 19.0354 21.2204C18.9747 21 18.6318 21 17.9458 21H15C13.6193 21 12.5 19.8807 12.5 18.5C12.5 17.1193 13.6193 16 15 16H16.9708C17.5914 16 17.9017 16 17.9854 15.8373C18.0048 15.7996 18.0169 15.7538 18.0185 15.7114C18.0255 15.5286 17.76 15.3788 17.229 15.0793C17.0663 14.9875 16.9226 14.9064 16.8063 14.8372C15.5015 14.0602 14.0694 13.5691 12.6049 13.3625Z',
  d8: 'M11.0005 1.25C8.10099 1.25 5.75049 3.6005 5.75049 6.5C5.75049 9.39949 8.10099 11.75 11.0005 11.75C13.9 11.75 16.2505 9.39949 16.2505 6.5C16.2505 3.6005 13.9 1.25 11.0005 1.25Z',
  d9: 'M9.39543 13.3625C10.4593 13.2125 11.5411 13.2125 12.6049 13.3625C14.0694 13.5691 15.5015 14.0602 16.8063 14.8372C16.9226 14.9064 17.0663 14.9875 17.229 15.0793C17.76 15.3788 18.0255 15.5286 18.0185 15.7114C18.0169 15.7538 18.0048 15.7996 17.9854 15.8373C17.9017 16 17.5914 16 16.9708 16H15C13.6193 16 12.5 17.1193 12.5 18.5C12.5 19.8807 13.6193 21 15 21H17.9458C18.6318 21 18.9747 21 19.0354 21.2204C19.096 21.4409 18.817 21.6069 18.259 21.9391C17.4305 22.4322 16.4932 22.75 15.4093 22.75H6.59104C4.77274 22.75 3.36695 21.8556 2.1955 20.7396C1.51649 20.0927 1.17802 19.3646 1.26283 18.5888C1.34257 17.8592 1.78123 17.2637 2.2429 16.8118C2.98106 16.0893 4.05869 15.4813 4.7715 15.0792C4.93407 14.9875 5.07778 14.9064 5.19404 14.8372C6.49889 14.0602 7.93096 13.5691 9.39543 13.3625Z',
  d10: 'M12 20H2C2 16.134 5.58172 13 10 13C11.8919 13 13.6304 13.5746 15 14.5353M14 6C14 8.20914 12.2091 10 10 10C7.79086 10 6 8.20914 6 6C6 3.79086 7.79086 2 10 2C12.2091 2 14 3.79086 14 6Z',
  d11: 'M14 18H22',
  d12: 'M22.25 20H14.25V18H22.25V20Z',
  d13: 'M10.5 2.25C7.87665 2.25 5.75 4.37665 5.75 7C5.75 9.62335 7.87665 11.75 10.5 11.75C13.1234 11.75 15.25 9.62335 15.25 7C15.25 4.37665 13.1234 2.25 10.5 2.25Z',
  d14: 'M10.5 13.25C5.76471 13.25 1.75 16.6289 1.75 21V21.75H12.75V16.5H17.6296C16.0265 14.5157 13.3982 13.25 10.5 13.25Z',
};

export const IconUserMinus01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-minus-01-stroke-rounded IconUserMinus01StrokeRounded"
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
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconUserMinus01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-minus-01-duotone-rounded IconUserMinus01DuotoneRounded"
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
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconUserMinus01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-minus-01-twotone-rounded IconUserMinus01TwotoneRounded"
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
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconUserMinus01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-minus-01-solid-rounded IconUserMinus01SolidRounded"
    >
      <path 
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
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconUserMinus01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-minus-01-bulk-rounded IconUserMinus01BulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      </g>
    </TheIconWrapper>
  );
};

export const IconUserMinus01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-minus-01-stroke-sharp IconUserMinus01StrokeSharp"
    >
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconUserMinus01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-minus-01-solid-sharp IconUserMinus01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfUserMinus01: TheIconSelfPack = {
  name: 'UserMinus01',
  StrokeRounded: IconUserMinus01StrokeRounded,
  DuotoneRounded: IconUserMinus01DuotoneRounded,
  TwotoneRounded: IconUserMinus01TwotoneRounded,
  SolidRounded: IconUserMinus01SolidRounded,
  BulkRounded: IconUserMinus01BulkRounded,
  StrokeSharp: IconUserMinus01StrokeSharp,
  SolidSharp: IconUserMinus01SolidSharp,
};