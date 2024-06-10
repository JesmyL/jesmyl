import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M11 5.5L21 5.5',
  d2: 'M5.4 16.8926C6.46667 17.607 7 17.9642 7 18.5C7 19.0358 6.46667 19.393 5.4 20.1074C4.33333 20.8218 3.8 21.1789 3.4 20.9111C3 20.6432 3 19.9288 3 18.5C3 17.0712 3 16.3568 3.4 16.0889C3.8 15.8211 4.33333 16.1782 5.4 16.8926Z',
  d3: 'M5.4 3.89263C6.46667 4.60702 7 4.96421 7 5.5C7 6.03579 6.46667 6.39298 5.4 7.10737C4.33333 7.82176 3.8 8.17895 3.4 7.91105C3 7.64316 3 6.92877 3 5.5C3 4.07123 3 3.35684 3.4 3.08895C3.8 2.82105 4.33333 3.17824 5.4 3.89263Z',
  d4: 'M11 12L21 12',
  d5: 'M11 18.5L21 18.5',
  d6: 'M10 5.5C10 4.94772 10.4477 4.5 11 4.5L21 4.5C21.5523 4.5 22 4.94772 22 5.5C22 6.05229 21.5523 6.5 21 6.5L11 6.5C10.4477 6.5 10 6.05228 10 5.5Z',
  d7: 'M5.51679 16.236L5.56735 16.2699L5.61407 16.3011L5.61408 16.3011C6.10722 16.6313 6.5482 16.9266 6.85806 17.212C7.19561 17.5228 7.5 17.9315 7.5 18.5004C7.5 19.0693 7.19561 19.4779 6.85806 19.7888C6.5482 20.0741 6.10722 20.3694 5.61408 20.6996L5.61407 20.6996L5.56735 20.7309L5.51678 20.7648C5.02713 21.0928 4.58478 21.3891 4.21244 21.5598C3.81844 21.7403 3.2632 21.8899 2.73265 21.5346C2.24685 21.2092 2.11166 20.6708 2.05607 20.2364C1.99994 19.7978 1.99997 19.2222 2 18.5517V18.5517L2 18.5004L2 18.4491V18.449C1.99997 17.7785 1.99994 17.2029 2.05607 16.7643C2.11166 16.3299 2.24685 15.7915 2.73265 15.4662C3.2632 15.1108 3.81844 15.2604 4.21244 15.441C4.58478 15.6116 5.02713 15.9079 5.51679 16.236Z',
  d8: 'M5.51679 3.23598L5.56735 3.26985L5.61407 3.30114L5.61408 3.30114C6.10722 3.63134 6.5482 3.92661 6.85806 4.21196C7.19561 4.52281 7.5 4.93149 7.5 5.50037C7.5 6.06926 7.19561 6.47794 6.85806 6.78879C6.5482 7.07413 6.10722 7.36941 5.61408 7.69961L5.61407 7.69961L5.56735 7.7309L5.51678 7.76477C5.02713 8.09281 4.58478 8.38914 4.21244 8.55976C3.81844 8.74031 3.2632 8.88991 2.73265 8.53458C2.24685 8.20922 2.11166 7.67081 2.05607 7.23644C1.99994 6.79782 1.99997 6.22221 2 5.55172V5.55167L2 5.50037L2 5.44908V5.44903C1.99997 4.77854 1.99994 4.20293 2.05607 3.76431C2.11166 3.32994 2.24685 2.79153 2.73265 2.46617C3.2632 2.11084 3.81844 2.26044 4.21244 2.44098C4.58478 2.61161 5.02713 2.90795 5.51679 3.23598Z',
  d9: 'M10 12C10 11.4477 10.4477 11 11 11L21 11C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13L11 13C10.4477 13 10 12.5523 10 12Z',
  d10: 'M10 18.5C10 17.9477 10.4477 17.5 11 17.5L21 17.5C21.5523 17.5 22 17.9477 22 18.5C22 19.0523 21.5523 19.5 21 19.5L11 19.5C10.4477 19.5 10 19.0523 10 18.5Z',
  d11: 'M10.5 5.5L20.5 5.5',
  d12: 'M7.5 5.5L3.5 3V8L7.5 5.5Z',
  d13: 'M7.5 18.5L3.5 16V21L7.5 18.5Z',
  d14: 'M10.5 12L20.5 12',
  d15: 'M10.5 18.5L20.5 18.5',
  d16: 'M20.5 6.5L10.5 6.5L10.5 4.5L20.5 4.5L20.5 6.5Z',
  d17: 'M20.5 13L10.5 13L10.5 11L20.5 11L20.5 13Z',
  d18: 'M20.5 19.5L10.5 19.5L10.5 17.5L20.5 17.5L20.5 19.5Z',
};

export const IconLeftToRightListTriangleStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="left-to-right-list-triangle-stroke-rounded IconLeftToRightListTriangleStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLeftToRightListTriangleDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="left-to-right-list-triangle-duotone-rounded IconLeftToRightListTriangleDuotoneRounded"
    >
      <path 
        opacity="0.3" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="0.3" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLeftToRightListTriangleTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="left-to-right-list-triangle-twotone-rounded IconLeftToRightListTriangleTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLeftToRightListTriangleSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="left-to-right-list-triangle-solid-rounded IconLeftToRightListTriangleSolidRounded"
    >
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconLeftToRightListTriangleBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="left-to-right-list-triangle-bulk-rounded IconLeftToRightListTriangleBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
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
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconLeftToRightListTriangleStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="left-to-right-list-triangle-stroke-sharp IconLeftToRightListTriangleStrokeSharp"
    >
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d14} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d15} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLeftToRightListTriangleSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="left-to-right-list-triangle-solid-sharp IconLeftToRightListTriangleSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d13} 
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
    </TheIconWrapper>
  );
};

export const iconPackOfLeftToRightListTriangle: TheIconSelfPack = {
  name: 'LeftToRightListTriangle',
  StrokeRounded: IconLeftToRightListTriangleStrokeRounded,
  DuotoneRounded: IconLeftToRightListTriangleDuotoneRounded,
  TwotoneRounded: IconLeftToRightListTriangleTwotoneRounded,
  SolidRounded: IconLeftToRightListTriangleSolidRounded,
  BulkRounded: IconLeftToRightListTriangleBulkRounded,
  StrokeSharp: IconLeftToRightListTriangleStrokeSharp,
  SolidSharp: IconLeftToRightListTriangleSolidSharp,
};