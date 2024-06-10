import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M18 8.5L5.9999 8.4999',
  d2: 'M21 12.5L3 12.5',
  d3: 'M16 21.5L16 15.5M16 15.5L18 17.5M16 15.5L14 17.5',
  d4: 'M12 8.5L12 2.5M12 2.5L14 4.5M12 2.5L10 4.5',
  d5: 'M8 21.5L8 15.5M8 15.5L10 17.5M8 15.5L6 17.5',
  d6: 'M6.00098 8L18.0011 8.00006',
  d7: 'M3.00098 12H21.001',
  d8: 'M12.001 8V2M12.001 2L14.001 4M12.001 2L10.001 4',
  d9: 'M8.00098 21V15M8.00098 15L10.001 17M8.00098 15L6.00098 17',
  d10: 'M16.001 21V15M16.001 15L18.001 17M16.001 15L14.001 17',
  d11: 'M3 12.5029H21',
  d12: 'M15.9994 21.4995L15.9994 15.5035M15.9994 15.5035L18.0059 17.2971M15.9994 15.5035L14.0075 17.2971',
  d13: 'M18.0001 8.5021L6 8.502M12.0001 8.50203L12.0001 2.50049M12.0001 2.50049L14.0001 4.501M12.0001 2.50049L10.0001 4.501',
  d14: 'M8.00026 21.4995L8.00026 15.5035M8.00026 15.5035L10.0303 17.2971M8.00026 15.5035L6.0319 17.2971',
  d15: 'M8.84702 18.1833H9.82995C9.83564 18.1833 9.84197 18.1833 9.84888 18.1834C9.92044 18.1836 10.0539 18.1839 10.1718 18.1671C10.3046 18.1482 10.6908 18.0712 10.8975 17.6897C11.1028 17.3109 10.9468 16.972 10.8841 16.8563C10.8296 16.7559 10.7513 16.6539 10.7098 16.6C10.7058 16.5947 10.7021 16.59 10.6989 16.5857C10.4486 16.2579 10.0356 15.7336 9.6222 15.2852C9.41754 15.0632 9.19413 14.8393 8.97746 14.6644C8.86966 14.5774 8.74386 14.4864 8.60693 14.4133C8.48561 14.3485 8.26896 14.25 8 14.25C7.73104 14.25 7.51439 14.3485 7.39307 14.4133C7.25614 14.4864 7.13034 14.5774 7.02254 14.6644C6.80587 14.8393 6.58246 15.0632 6.3778 15.2852C5.96443 15.7336 5.55136 16.2579 5.30112 16.5857C5.29785 16.59 5.29418 16.5947 5.29017 16.6C5.24874 16.6539 5.1704 16.7559 5.11592 16.8563C5.05317 16.972 4.89725 17.3109 5.10253 17.6897C5.30923 18.0712 5.69543 18.1482 5.82822 18.1671C5.94614 18.1839 6.07956 18.1836 6.15112 18.1834C6.15803 18.1834 6.16436 18.1833 6.17005 18.1833H7.15298V21.2C7.15298 21.6418 7.53221 22 8 22C8.46779 22 8.84702 21.6418 8.84702 21.2V18.1833Z',
  d16: 'M16.847 18.1833H17.83C17.8356 18.1833 17.842 18.1833 17.8489 18.1834C17.9204 18.1836 18.0539 18.1839 18.1718 18.1671C18.3046 18.1482 18.6908 18.0712 18.8975 17.6897C19.1028 17.3109 18.9468 16.972 18.8841 16.8563C18.8296 16.7559 18.7513 16.6539 18.7098 16.6C18.7058 16.5947 18.7021 16.59 18.6989 16.5857C18.4486 16.2579 18.0356 15.7336 17.6222 15.2852C17.4175 15.0632 17.1941 14.8393 16.9775 14.6644C16.8697 14.5774 16.7439 14.4864 16.6069 14.4133C16.4856 14.3485 16.269 14.25 16 14.25C15.731 14.25 15.5144 14.3485 15.3931 14.4133C15.2561 14.4864 15.1303 14.5774 15.0225 14.6644C14.8059 14.8393 14.5825 15.0632 14.3778 15.2852C13.9644 15.7336 13.5514 16.2579 13.3011 16.5857C13.2979 16.59 13.2942 16.5947 13.2902 16.6C13.2487 16.6539 13.1704 16.7559 13.1159 16.8563C13.0532 16.972 12.8972 17.3109 13.1025 17.6897C13.3092 18.0712 13.6954 18.1482 13.8282 18.1671C13.9461 18.1839 14.0796 18.1836 14.1511 18.1834C14.158 18.1834 14.1644 18.1833 14.17 18.1833H15.153V21.2C15.153 21.6418 15.5322 22 16 22C16.4678 22 16.847 21.6418 16.847 21.2V18.1833Z',
  d17: 'M12.847 5.18333H13.83C13.8356 5.18333 13.842 5.18335 13.8489 5.18337C13.9204 5.18356 14.0539 5.18392 14.1718 5.16712C14.3046 5.1482 14.6908 5.07119 14.8975 4.68972C15.1028 4.31087 14.9468 3.97199 14.8841 3.85631C14.8296 3.75586 14.7513 3.65389 14.7098 3.59997C14.7058 3.59474 14.7021 3.58997 14.6989 3.5857C14.4486 3.25793 14.0356 2.73356 13.6222 2.28519C13.4175 2.06322 13.1941 1.83931 12.9775 1.66442C12.8697 1.57742 12.7439 1.4864 12.6069 1.41329C12.4856 1.34851 12.269 1.25 12 1.25C11.731 1.25 11.5144 1.34851 11.3931 1.41329C11.2561 1.4864 11.1303 1.57742 11.0225 1.66442C10.8059 1.83931 10.5825 2.06322 10.3778 2.2852C9.96443 2.73356 9.55136 3.25793 9.30112 3.5857C9.29785 3.58997 9.29418 3.59475 9.29017 3.59997C9.24874 3.65389 9.1704 3.75586 9.11592 3.85631C9.05317 3.97199 8.89725 4.31087 9.10253 4.68972C9.30923 5.07119 9.69543 5.1482 9.82822 5.16712C9.94614 5.18392 10.0796 5.18356 10.1511 5.18337C10.158 5.18335 10.1644 5.18333 10.17 5.18333H11.153V8.2C11.153 8.64183 11.5322 9 12 9C12.4678 9 12.847 8.64183 12.847 8.2V5.18333Z',
  d18: 'M5 8C5 7.44772 5.44772 7 6 7L18.0001 7.00006C18.5523 7.00006 19.0001 7.44778 19.0001 8.00007C19.0001 8.55235 18.5523 9.00006 18.0001 9.00006L5.99999 9C5.44771 9 4.99999 8.55228 5 8Z',
  d19: 'M2 12C2 11.4477 2.44772 11 3 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H3C2.44772 13 2 12.5523 2 12Z',
  d20: 'M6 8.51294L18.0001 8.513',
  d21: 'M3 12.5096H21',
  d22: 'M7.99605 21.5022V15.4964M5.5 18.0067L7.98666 15.487L10.5 18.0025',
  d23: 'M15.996 21.5022V15.4964M13.5 18.0067L15.9867 15.487L18.5 18.0025',
  d24: 'M11.996 8.51294V2.50711M9.5 5.01741L11.9867 2.49772L14.5 5.01327',
  d25: 'M18.0001 10.0003L5.99999 10.0002L6 8.00024L18.0001 8.0003L18.0001 10.0003Z',
  d26: 'M21 14.0002H3V12.0002H21V14.0002Z',
  d27: 'M12.0001 2L15.2072 5.20711L13.793 6.62132L13.0001 5.82843L13.0002 9.00023H11.0002L11.0001 5.82843L10.2072 6.62132L8.79297 5.20711L12.0001 2Z',
  d28: 'M8.00008 14.5861L11.2072 17.7932L9.79297 19.2074L9.00008 18.4145V22.0003H7.00008V18.4145L6.20718 19.2074L4.79297 17.7932L8.00008 14.5861Z',
  d29: 'M16.0001 14.5861L19.2072 17.7932L17.793 19.2074L17.0001 18.4145V22.0003H15.0001V18.4145L14.2072 19.2074L12.793 17.7932L16.0001 14.5861Z',
};

export const IconSortingUpStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sorting-up-stroke-rounded IconSortingUpStrokeRounded"
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
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSortingUpDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sorting-up-duotone-rounded IconSortingUpDuotoneRounded"
    >
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSortingUpTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sorting-up-twotone-rounded IconSortingUpTwotoneRounded"
    >
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d14} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSortingUpSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sorting-up-solid-rounded IconSortingUpSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconSortingUpBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sorting-up-bulk-rounded IconSortingUpBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconSortingUpStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sorting-up-stroke-sharp IconSortingUpStrokeSharp"
    >
      <path 
        d={d.d20} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d21} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d22} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d23} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d24} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconSortingUpSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sorting-up-solid-sharp IconSortingUpSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d25} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d26} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d27} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d28} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d29} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfSortingUp: TheIconSelfPack = {
  name: 'SortingUp',
  StrokeRounded: IconSortingUpStrokeRounded,
  DuotoneRounded: IconSortingUpDuotoneRounded,
  TwotoneRounded: IconSortingUpTwotoneRounded,
  SolidRounded: IconSortingUpSolidRounded,
  BulkRounded: IconSortingUpBulkRounded,
  StrokeSharp: IconSortingUpStrokeSharp,
  SolidSharp: IconSortingUpSolidSharp,
};