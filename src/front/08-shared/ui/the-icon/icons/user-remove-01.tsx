import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M13 22H6.59087C5.04549 22 3.81631 21.248 2.71266 20.1966C0.453365 18.0441 4.1628 16.324 5.57757 15.4816C7.97679 14.053 10.8425 13.6575 13.5 14.2952',
  d2: 'M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z',
  d3: 'M16 22L19 19M19 19L22 16M19 19L16 16M19 19L22 22',
  d4: 'M5.57757 15.4816C4.1628 16.324 0.453365 18.0441 2.71266 20.1966C3.81631 21.248 5.04549 22 6.59087 22H15.4091C16.9545 22 18.1837 21.248 19.2873 20.1966C21.5466 18.0441 17.8372 16.324 16.4224 15.4816C13.1048 13.5061 8.89519 13.5061 5.57757 15.4816Z',
  d5: 'M6.75 6.5C6.75 3.6005 9.1005 1.25 12 1.25C14.8995 1.25 17.25 3.6005 17.25 6.5C17.25 9.39949 14.8995 11.75 12 11.75C9.1005 11.75 6.75 9.39949 6.75 6.5Z',
  d6: 'M15.2929 15.2929C15.6834 14.9024 16.3166 14.9024 16.7071 15.2929L19 17.5858L21.2929 15.2929C21.6834 14.9024 22.3166 14.9024 22.7071 15.2929C23.0976 15.6834 23.0976 16.3166 22.7071 16.7071L20.4142 19L22.7071 21.2929C23.0976 21.6834 23.0976 22.3166 22.7071 22.7071C22.3166 23.0976 21.6834 23.0976 21.2929 22.7071L19 20.4142L16.7071 22.7071C16.3166 23.0976 15.6834 23.0976 15.2929 22.7071C14.9024 22.3166 14.9024 21.6834 15.2929 21.2929L17.5858 19L15.2929 16.7071C14.9024 16.3166 14.9024 15.6834 15.2929 15.2929Z',
  d7: 'M12.6049 13.3625C11.5411 13.2125 10.4593 13.2125 9.39543 13.3625C7.93096 13.5691 6.49889 14.0602 5.19404 14.8372C5.07775 14.9064 4.93412 14.9875 4.7715 15.0792C4.05869 15.4813 2.98106 16.0893 2.2429 16.8118C1.78123 17.2637 1.34257 17.8592 1.26283 18.5888C1.17802 19.3646 1.51649 20.0927 2.1955 20.7396C3.36695 21.8556 4.77274 22.75 6.59104 22.75H12.7977C13.1404 22.75 13.3118 22.75 13.3992 22.6645C13.4867 22.5789 13.4913 22.3675 13.5006 21.9447C13.5143 21.3235 13.7581 20.7063 14.2322 20.2322L15.0402 19.4243C15.2402 19.2243 15.3402 19.1243 15.3402 19C15.3402 18.8757 15.2402 18.7757 15.0402 18.5757L14.2322 17.7678C13.2559 16.7915 13.2559 15.2085 14.2322 14.2322C14.4001 14.0644 14.3588 13.75 14.1304 13.6851C13.6287 13.5425 13.1188 13.435 12.6049 13.3625Z',
  d8: 'M12.0005 1.25C9.10099 1.25 6.75049 3.6005 6.75049 6.5C6.75049 9.39949 9.10099 11.75 12.0005 11.75C14.9 11.75 17.2505 9.39949 17.2505 6.5C17.2505 3.6005 14.9 1.25 12.0005 1.25Z',
  d9: 'M9.39543 13.3625C10.4593 13.2125 11.5411 13.2125 12.6049 13.3625C13.1188 13.435 13.6287 13.5425 14.1304 13.6851C14.3588 13.75 14.4001 14.0644 14.2322 14.2322C13.2559 15.2085 13.2559 16.7915 14.2322 17.7678L15.0402 18.5757C15.2402 18.7757 15.3402 18.8757 15.3402 19C15.3402 19.1243 15.2402 19.2243 15.0402 19.4243L14.2322 20.2322C13.7581 20.7063 13.5143 21.3235 13.5006 21.9447C13.4913 22.3675 13.4867 22.5789 13.3992 22.6645C13.3118 22.75 13.1404 22.75 12.7977 22.75H6.59104C4.77274 22.75 3.36695 21.8556 2.1955 20.7396C1.51649 20.0927 1.17802 19.3646 1.26283 18.5888C1.34257 17.8592 1.78123 17.2637 2.2429 16.8118C2.98106 16.0893 4.05869 15.4813 4.7715 15.0792C4.93407 14.9875 5.07778 14.9064 5.19404 14.8372C6.49889 14.0602 7.93096 13.5691 9.39543 13.3625Z',
  d10: 'M13 19H2C2 15.134 5.58172 12 10 12C11.0609 12 12.0736 12.1807 13 12.5088M14 5C14 7.20914 12.2091 9 10 9C7.79086 9 6 7.20914 6 5C6 2.79086 7.79086 1 10 1C12.2091 1 14 2.79086 14 5Z',
  d11: 'M15 21L18.5 17.5M18.5 17.5L22 14M18.5 17.5L15 14M18.5 17.5L22 21',
  d12: 'M18.7501 20.1643L21.3358 22.7498L22.75 21.3356L20.1643 18.7501L22.75 16.1644L21.3358 14.7502L18.7501 17.3359L16.1642 14.75L14.75 16.1642L17.3359 18.7501L14.75 21.3361L16.1642 22.7503L18.7501 20.1643Z',
  d13: 'M10 1.25C7.37665 1.25 5.25 3.37665 5.25 6C5.25 8.62335 7.37665 10.75 10 10.75C12.6234 10.75 14.75 8.62335 14.75 6C14.75 3.37665 12.6234 1.25 10 1.25Z',
  d14: 'M10 12.25C5.26471 12.25 1.25 15.6289 1.25 20V20.75H13.2153L15.2148 18.7503L12.6289 16.1644L15.0942 13.6991C13.6473 12.7829 11.8805 12.25 10 12.25Z',
};

export const IconUserRemove01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-remove-01-stroke-rounded IconUserRemove01StrokeRounded"
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

export const IconUserRemove01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-remove-01-duotone-rounded IconUserRemove01DuotoneRounded"
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

export const IconUserRemove01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-remove-01-twotone-rounded IconUserRemove01TwotoneRounded"
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

export const IconUserRemove01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-remove-01-solid-rounded IconUserRemove01SolidRounded"
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

export const IconUserRemove01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-remove-01-bulk-rounded IconUserRemove01BulkRounded"
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

export const IconUserRemove01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-remove-01-stroke-sharp IconUserRemove01StrokeSharp"
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

export const IconUserRemove01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-remove-01-solid-sharp IconUserRemove01SolidSharp"
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

export const iconPackOfUserRemove01: TheIconSelfPack = {
  name: 'UserRemove01',
  StrokeRounded: IconUserRemove01StrokeRounded,
  DuotoneRounded: IconUserRemove01DuotoneRounded,
  TwotoneRounded: IconUserRemove01TwotoneRounded,
  SolidRounded: IconUserRemove01SolidRounded,
  BulkRounded: IconUserRemove01BulkRounded,
  StrokeSharp: IconUserRemove01StrokeSharp,
  SolidSharp: IconUserRemove01SolidSharp,
};