import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M20 3.5C13.6327 3.5 10.3673 20.5 4 20.5',
  d2: 'M19 20.5C17.3824 20.5 16.5736 20.5 15.8917 20.1583C15.5045 19.9641 15.1519 19.6927 14.8512 19.3572C14.3219 18.7666 14.0315 17.9204 13.4508 16.2281L10.5492 7.77185C9.96847 6.07955 9.67813 5.2334 9.14881 4.64277C8.84813 4.30728 8.49555 4.03585 8.10825 3.84174C7.42642 3.5 6.61762 3.5 5 3.5',
  d3: 'M20 3.5C13.6327 3.5 10.3673 20.5 4 20.5M19 20.5C17.3824 20.5 16.5736 20.5 15.8917 20.1583C15.5045 19.9641 15.1519 19.6927 14.8512 19.3572C14.3219 18.7666 14.0315 17.9204 13.4508 16.2281L10.5492 7.77185C9.96847 6.07955 9.67813 5.2334 9.14881 4.64277C8.84813 4.30728 8.49555 4.03585 8.10825 3.84174C7.42642 3.5 6.61762 3.5 5 3.5',
  d4: 'M9.06548 18.4761C7.7191 20.1254 6.06342 21.5 4 21.5C3.44772 21.5 3 21.0523 3 20.5C3 19.9477 3.44772 19.5 4 19.5C5.12026 19.5 6.2605 18.7496 7.51616 17.2114C8.75257 15.6968 9.91353 13.6538 11.13 11.507L11.1583 11.457C12.3415 9.36884 13.5797 7.1835 14.9345 5.52387C16.2809 3.87456 17.9366 2.5 20 2.5C20.5523 2.5 21 2.94772 21 3.5C21 4.05228 20.5523 4.5 20 4.5C18.8797 4.5 17.7395 5.25044 16.4838 6.78863C15.2474 8.30324 14.0865 10.3462 12.87 12.493L12.8417 12.543C11.6585 14.6312 10.4203 16.8165 9.06548 18.4761Z',
  d5: 'M6.81813 4.53893C6.38191 4.50088 5.82593 4.5 5 4.5C4.44772 4.5 4 4.05229 4 3.5C4 2.94772 4.44772 2.5 5 2.5H5.04234H5.04236C5.81516 2.49999 6.45863 2.49997 6.99196 2.5465C7.55325 2.59547 8.06248 2.70022 8.55633 2.94774C9.06031 3.20034 9.51246 3.55019 9.8935 3.97538C10.2604 4.38477 10.5168 4.8546 10.75 5.40281C10.9754 5.93286 11.2029 6.59592 11.4832 7.41271L14.3967 15.9036C14.6917 16.7632 14.8964 17.3581 15.0905 17.8144C15.28 18.26 15.4335 18.5086 15.5959 18.6898C15.8162 18.9356 16.0692 19.1286 16.3398 19.2643C16.5278 19.3585 16.7639 19.4246 17.1819 19.4611C17.6181 19.4991 18.1741 19.5 19 19.5C19.5523 19.5 20 19.9477 20 20.5C20 21.0523 19.5523 21.5 19 21.5H18.9577H18.9576C18.1848 21.5 17.5414 21.5 17.008 21.4535C16.4468 21.4045 15.9375 21.2998 15.4437 21.0523C14.9397 20.7997 14.4875 20.4498 14.1065 20.0246C13.7396 19.6152 13.4832 19.1454 13.25 18.5972C13.0246 18.0671 12.7971 17.4041 12.5168 16.5873L9.6033 8.09641C9.30833 7.2368 9.10356 6.64186 8.90949 6.18557C8.71998 5.73997 8.56653 5.49141 8.40411 5.31018C8.18381 5.06437 7.93079 4.87137 7.66017 4.73573C7.4722 4.64152 7.23611 4.5754 6.81813 4.53893Z',
  d6: 'M9.06548 18.4761C7.7191 20.1254 6.06342 21.5 4 21.5V19.5C5.12026 19.5 6.2605 18.7496 7.51616 17.2114C8.75257 15.6968 9.91353 13.6538 11.13 11.507L11.1583 11.457C12.3415 9.36884 13.5797 7.1835 14.9345 5.52387C16.2809 3.87456 17.9366 2.5 20 2.5V4.5C18.8797 4.5 17.7395 5.25044 16.4838 6.78863C15.2474 8.30324 14.0865 10.3462 12.87 12.493L12.8417 12.543C11.6585 14.6312 10.4203 16.8165 9.06548 18.4761Z',
  d7: 'M6.81813 4.53893C6.38191 4.50088 5.82593 4.5 5 4.5V2.5H5.04234H5.04236C5.81516 2.49999 6.45863 2.49997 6.99196 2.5465C7.55325 2.59547 8.06248 2.70022 8.55633 2.94774C9.06031 3.20034 9.51246 3.55019 9.8935 3.97538C10.2604 4.38477 10.5168 4.8546 10.75 5.40281C10.9754 5.93286 11.2029 6.59592 11.4832 7.41271L14.3967 15.9036C14.6917 16.7632 14.8964 17.3581 15.0905 17.8144C15.28 18.26 15.4335 18.5086 15.5959 18.6898C15.8162 18.9356 16.0692 19.1286 16.3398 19.2643C16.5278 19.3585 16.7639 19.4246 17.1819 19.4611C17.6181 19.4991 18.1741 19.5 19 19.5V21.5H18.9577H18.9576C18.1848 21.5 17.5414 21.5 17.008 21.4535C16.4468 21.4045 15.9375 21.2998 15.4437 21.0523C14.9397 20.7997 14.4875 20.4498 14.1065 20.0246C13.7396 19.6152 13.4832 19.1454 13.25 18.5972C13.0246 18.0671 12.7971 17.4041 12.5168 16.5873L9.6033 8.09641C9.30833 7.2368 9.10356 6.64186 8.90949 6.18557C8.71998 5.73997 8.56653 5.49141 8.40411 5.31018C8.18381 5.06437 7.93079 4.87137 7.66017 4.73573C7.4722 4.64152 7.23611 4.5754 6.81813 4.53893Z',
};

export const IconXVariableStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="x-variable-stroke-rounded IconXVariableStrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconXVariableDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="x-variable-duotone-rounded IconXVariableDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconXVariableTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="x-variable-twotone-rounded IconXVariableTwotoneRounded"
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
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconXVariableSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="x-variable-solid-rounded IconXVariableSolidRounded"
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

export const IconXVariableBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="x-variable-bulk-rounded IconXVariableBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconXVariableStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="x-variable-stroke-sharp IconXVariableStrokeSharp"
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

export const IconXVariableSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="x-variable-solid-sharp IconXVariableSolidSharp"
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
    </TheIconWrapper>
  );
};

export const iconPackOfXVariable: TheIconSelfPack = {
  name: 'XVariable',
  StrokeRounded: IconXVariableStrokeRounded,
  DuotoneRounded: IconXVariableDuotoneRounded,
  TwotoneRounded: IconXVariableTwotoneRounded,
  SolidRounded: IconXVariableSolidRounded,
  BulkRounded: IconXVariableBulkRounded,
  StrokeSharp: IconXVariableStrokeSharp,
  SolidSharp: IconXVariableSolidSharp,
};