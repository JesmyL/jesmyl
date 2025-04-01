import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M6 15.5L18.0001 15.5001',
  d2: 'M3 11.5H21',
  d3: 'M8 2.5V8.5M8 8.5L6 6.5M8 8.5L10 6.5',
  d4: 'M12 15.5V21.5M12 21.5L10 19.5M12 21.5L14 19.5',
  d5: 'M16 2.5V8.5M16 8.5L14 6.5M16 8.5L18 6.5',
  d6: 'M6.00098 15L18.0011 15.0001',
  d7: 'M3.00098 11H21.001',
  d8: 'M16.001 2V8M16.001 8L14.001 6M16.001 8L18.001 6',
  d9: 'M8.00098 2V8M8.00098 8L6.00098 6M8.00098 8L10.001 6',
  d10: 'M12.001 15.0001V21.0001M12.001 21.0001L10.001 19.0001M12.001 21.0001L14.001 19.0001',
  d11: 'M3 11.489H21',
  d12: 'M8 2.4978V8.66434M8 8.66434L6 6.66434M8 8.66434L10 6.66434',
  d13: 'M6 15.5164L18.0001 15.5165M12 15.7232V21.5023M12 21.5023L10 19.7232M12 21.5023L14 19.7232',
  d14: 'M16 2.4978V8.66422M16 8.66422L14 6.66422M16 8.66422L18 6.66422',
  d15: 'M8.84702 5.06667H9.82995C9.83564 5.06667 9.84197 5.06665 9.84888 5.06663C9.92044 5.06644 10.0539 5.06608 10.1718 5.08288C10.3046 5.1018 10.6908 5.17881 10.8975 5.56028C11.1028 5.93913 10.9468 6.27801 10.8841 6.39369C10.8296 6.49414 10.7513 6.59611 10.7098 6.65003C10.7058 6.65526 10.7021 6.66003 10.6989 6.6643C10.4486 6.99207 10.0356 7.51644 9.6222 7.96481C9.41754 8.18678 9.19413 8.41069 8.97746 8.58558C8.86966 8.67258 8.74386 8.7636 8.60693 8.83671C8.48561 8.90149 8.26896 9 8 9C7.73104 9 7.51439 8.90149 7.39307 8.83671C7.25614 8.7636 7.13034 8.67258 7.02254 8.58558C6.80587 8.41069 6.58246 8.18678 6.3778 7.9648C5.96443 7.51644 5.55136 6.99207 5.30112 6.6643C5.29785 6.66003 5.29418 6.65525 5.29017 6.65003C5.24874 6.59611 5.1704 6.49414 5.11592 6.39369C5.05317 6.27801 4.89725 5.93913 5.10253 5.56028C5.30923 5.17881 5.69543 5.1018 5.82822 5.08288C5.94614 5.06608 6.07956 5.06644 6.15112 5.06663C6.15803 5.06665 6.16436 5.06667 6.17005 5.06667H7.15298V2.05C7.15298 1.60817 7.53221 1.25 8 1.25C8.46779 1.25 8.84702 1.60817 8.84702 2.05V5.06667Z',
  d16: 'M12.847 17.8167H13.83C13.8356 17.8167 13.842 17.8167 13.8489 17.8166C13.9204 17.8164 14.0539 17.8161 14.1718 17.8329C14.3046 17.8518 14.6908 17.9288 14.8975 18.3103C15.1028 18.6891 14.9468 19.028 14.8841 19.1437C14.8296 19.2441 14.7513 19.3461 14.7098 19.4C14.7058 19.4053 14.7021 19.41 14.6989 19.4143C14.4486 19.7421 14.0356 20.2664 13.6222 20.7148C13.4175 20.9368 13.1941 21.1607 12.9775 21.3356C12.8697 21.4226 12.7439 21.5136 12.6069 21.5867C12.4856 21.6515 12.269 21.75 12 21.75C11.731 21.75 11.5144 21.6515 11.3931 21.5867C11.2561 21.5136 11.1303 21.4226 11.0225 21.3356C10.8059 21.1607 10.5825 20.9368 10.3778 20.7148C9.96443 20.2664 9.55136 19.7421 9.30112 19.4143C9.29785 19.41 9.29418 19.4053 9.29017 19.4C9.24874 19.3461 9.1704 19.2441 9.11592 19.1437C9.05317 19.028 8.89725 18.6891 9.10253 18.3103C9.30923 17.9288 9.69543 17.8518 9.82822 17.8329C9.94614 17.8161 10.0796 17.8164 10.1511 17.8166C10.158 17.8166 10.1644 17.8167 10.17 17.8167H11.153V14.8C11.153 14.3582 11.5322 14 12 14C12.4678 14 12.847 14.3582 12.847 14.8V17.8167Z',
  d17: 'M16.847 5.06667H17.83C17.8356 5.06667 17.842 5.06665 17.8489 5.06663C17.9204 5.06644 18.0539 5.06608 18.1718 5.08288C18.3046 5.1018 18.6908 5.17881 18.8975 5.56028C19.1028 5.93913 18.9468 6.27801 18.8841 6.39369C18.8296 6.49414 18.7513 6.59611 18.7098 6.65003C18.7058 6.65526 18.7021 6.66003 18.6989 6.6643C18.4486 6.99207 18.0356 7.51644 17.6222 7.96481C17.4175 8.18678 17.1941 8.41069 16.9775 8.58558C16.8697 8.67258 16.7439 8.7636 16.6069 8.83671C16.4856 8.90149 16.269 9 16 9C15.731 9 15.5144 8.90149 15.3931 8.83671C15.2561 8.7636 15.1303 8.67258 15.0225 8.58558C14.8059 8.41069 14.5825 8.18678 14.3778 7.9648C13.9644 7.51644 13.5514 6.99207 13.3011 6.6643C13.2979 6.66003 13.2942 6.65525 13.2902 6.65003C13.2487 6.59611 13.1704 6.49414 13.1159 6.39369C13.0532 6.27801 12.8972 5.93913 13.1025 5.56028C13.3092 5.17881 13.6954 5.1018 13.8282 5.08288C13.9461 5.06608 14.0796 5.06644 14.1511 5.06663C14.158 5.06665 14.1644 5.06667 14.17 5.06667H15.153V2.05C15.153 1.60817 15.5322 1.25 16 1.25C16.4678 1.25 16.847 1.60817 16.847 2.05V5.06667Z',
  d18: 'M5 15C5 14.4477 5.44772 14 6 14L18.0001 14.0001C18.5523 14.0001 19.0001 14.4478 19.0001 15.0001C19.0001 15.5524 18.5523 16.0001 18.0001 16.0001L5.99999 16C5.44771 16 4.99999 15.5523 5 15Z',
  d19: 'M2 11C2 10.4477 2.44772 10 3 10H21C21.5523 10 22 10.4477 22 11C22 11.5523 21.5523 12 21 12H3C2.44772 12 2 11.5523 2 11Z',
  d20: 'M6 15.4808L18.0001 15.4809',
  d21: 'M3 11.4894H21',
  d22: 'M7.99605 2.49902V8.50979M5.5 5.99742L7.98666 8.51919L10.5 6.00157',
  d23: 'M11.996 15.4808V21.4916M9.5 18.9792L11.9867 21.501L14.5 18.9834',
  d24: 'M15.996 2.49902V8.50979M13.5 5.99742L15.9867 8.51919L18.5 6.00157',
  d25: 'M18.0001 16.0001L5.99999 16L6 14L18.0001 14.0001L18.0001 16.0001Z',
  d26: 'M21 12H3V10H21V12Z',
  d27: 'M17.0001 2V5.58579L17.793 4.79289L19.2072 6.20711L16.0001 9.41421L12.793 6.20711L14.2072 4.79289L15.0001 5.58579V2H17.0001Z',
  d28: 'M9.00008 2V5.58579L9.79297 4.79289L11.2072 6.20711L8.00008 9.41421L4.79297 6.20711L6.20718 4.79289L7.00008 5.58579V2H9.00008Z',
  d29: 'M13.0001 15V18.1716L13.793 17.3787L15.2072 18.7929L12.0001 22L8.79297 18.7929L10.2072 17.3787L11.0001 18.1716V15H13.0001Z',
};

export const IconSortingDownStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sorting-down-stroke-rounded IconSortingDownStrokeRounded"
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

export const IconSortingDownDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sorting-down-duotone-rounded IconSortingDownDuotoneRounded"
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
        opacity="var(--icon-opacity)" 
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
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSortingDownTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sorting-down-twotone-rounded IconSortingDownTwotoneRounded"
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

export const IconSortingDownSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sorting-down-solid-rounded IconSortingDownSolidRounded"
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

export const IconSortingDownBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sorting-down-bulk-rounded IconSortingDownBulkRounded"
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

export const IconSortingDownStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sorting-down-stroke-sharp IconSortingDownStrokeSharp"
    >
      <path 
        d={d.d20} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d21} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
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

export const IconSortingDownSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sorting-down-solid-sharp IconSortingDownSolidSharp"
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

export const iconPackOfSortingDown: TheIconSelfPack = {
  name: 'SortingDown',
  StrokeRounded: IconSortingDownStrokeRounded,
  DuotoneRounded: IconSortingDownDuotoneRounded,
  TwotoneRounded: IconSortingDownTwotoneRounded,
  SolidRounded: IconSortingDownSolidRounded,
  BulkRounded: IconSortingDownBulkRounded,
  StrokeSharp: IconSortingDownStrokeSharp,
  SolidSharp: IconSortingDownSolidSharp,
};