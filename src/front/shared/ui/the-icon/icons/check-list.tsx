import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M11 6L21 6',
  d2: 'M11 12L21 12',
  d3: 'M11 18L21 18',
  d4: 'M3 7.39286C3 7.39286 4 8.04466 4.5 9C4.5 9 6 5.25 8 4',
  d5: 'M3 18.3929C3 18.3929 4 19.0447 4.5 20C4.5 20 6 16.25 8 15',
  d6: 'M21 6H11V18L21 18V6Z',
  d7: 'M10 6C10 5.44772 10.4477 5 11 5L21 5C21.5523 5 22 5.44772 22 6C22 6.55229 21.5523 7 21 7L11 7C10.4477 7 10 6.55228 10 6Z',
  d8: 'M10 12C10 11.4477 10.4477 11 11 11L21 11C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13L11 13C10.4477 13 10 12.5523 10 12Z',
  d9: 'M10 18C10 17.4477 10.4477 17 11 17L21 17C21.5523 17 22 17.4477 22 18C22 18.5523 21.5523 19 21 19L11 19C10.4477 19 10 18.5523 10 18Z',
  d10: 'M8.84811 3.47013C9.14082 3.93847 8.99845 4.55542 8.53011 4.84813C7.75692 5.33138 6.98454 6.3867 6.36836 7.46502C6.07342 7.98116 5.83636 8.46252 5.67314 8.81493C5.61083 8.94769 5.4842 9.24118 5.42867 9.37133C5.2836 9.7337 4.94076 9.97901 4.55093 9.99884C4.16099 10.0187 3.79517 9.80976 3.61413 9.46384C3.44089 9.13283 3.16067 8.82288 2.89219 8.58028C2.78725 8.48167 2.55615 8.30602 2.45372 8.23052C1.99132 7.92886 1.86086 7.3095 2.16236 6.84694C2.46394 6.38426 3.08349 6.25366 3.54617 6.55524C3.68236 6.64701 4.01827 6.89088 4.27235 7.13214C4.38104 6.92332 4.5012 6.70143 4.63187 6.47274C5.26569 5.36357 6.24331 3.91889 7.47012 3.15214C7.93845 2.85943 8.5554 3.0018 8.84811 3.47013Z',
  d11: 'M8.84811 14.4701C9.14082 14.9385 8.99845 15.5554 8.53011 15.8481C7.75692 16.3314 6.98454 17.3867 6.36836 18.465C6.07342 18.9812 5.83636 19.4625 5.67314 19.8149C5.61083 19.9477 5.4842 20.2412 5.42867 20.3713C5.2836 20.7337 4.94076 20.979 4.55093 20.9988C4.16099 21.0187 3.79517 20.8098 3.61413 20.4638C3.44089 20.1328 3.16067 19.8229 2.89219 19.5803C2.78725 19.4817 2.55615 19.306 2.45372 19.2305C1.99132 18.9289 1.86086 18.3095 2.16236 17.8469C2.46394 17.3843 3.08349 17.2537 3.54617 17.5552C3.68236 17.647 4.01827 17.8909 4.27235 18.1321C4.38104 17.9233 4.5012 17.7014 4.63187 17.4727C5.26569 16.3636 6.24331 14.9189 7.47012 14.1521C7.93845 13.8594 8.5554 14.0018 8.84811 14.4701Z',
  d12: 'M3 7.39286L4.5 9L8 4',
  d13: 'M3 18.3929L4.5 20L8 15',
  d14: 'M21.502 7L11.502 7L11.502 5L21.502 5L21.502 7Z',
  d15: 'M21.502 13L11.502 13L11.502 11L21.502 11L21.502 13Z',
  d16: 'M21.502 19L11.502 19L11.502 17L21.502 17L21.502 19Z',
  d17: 'M9.05029 4.14692L4.84234 10.1583L2.5 7.64864L3.96211 6.284L4.61977 6.98864L7.41182 3L9.05029 4.14692Z',
  d18: 'M9.05029 14.9887L4.84234 21.0001L2.5 18.4904L3.96211 17.1258L4.61977 17.8304L7.41182 13.8418L9.05029 14.9887Z',
};

export const IconCheckListStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="check-list-stroke-rounded IconCheckListStrokeRounded"
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

export const IconCheckListDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="check-list-duotone-rounded IconCheckListDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
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

export const IconCheckListTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="check-list-twotone-rounded IconCheckListTwotoneRounded"
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
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCheckListSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="check-list-solid-rounded IconCheckListSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
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
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCheckListBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="check-list-bulk-rounded IconCheckListBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
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
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCheckListStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="check-list-stroke-sharp IconCheckListStrokeSharp"
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
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconCheckListSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="check-list-solid-sharp IconCheckListSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
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
    </TheIconWrapper>
  );
};

export const iconPackOfCheckList: TheIconSelfPack = {
  name: 'CheckList',
  StrokeRounded: IconCheckListStrokeRounded,
  DuotoneRounded: IconCheckListDuotoneRounded,
  TwotoneRounded: IconCheckListTwotoneRounded,
  SolidRounded: IconCheckListSolidRounded,
  BulkRounded: IconCheckListBulkRounded,
  StrokeSharp: IconCheckListStrokeSharp,
  SolidSharp: IconCheckListSolidSharp,
};