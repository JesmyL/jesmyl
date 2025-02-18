import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M6 6.5H7.52786C7.83835 6.5 8.14353 6.4245 8.42703 6.29788C10.809 5.23404 13.191 5.23404 15.573 6.29788C15.8565 6.4245 16.1616 6.5 16.4721 6.5H18',
  d2: 'M6 17.5H7.52786C7.83835 17.5 8.14353 17.4245 8.42703 17.2979C10.809 16.234 13.191 16.234 15.573 17.2979C15.8565 17.4245 16.1616 17.5 16.4721 17.5H18',
  d3: 'M6 3V10M18 3V10',
  d4: 'M6 14V21M18 14V21',
  d5: 'M3.5 6.5H2M20.5 6.5H22',
  d6: 'M3.5 17.5H2M20.5 17.5H22',
  d7: 'M3.5 4.5V8.5M20.5 4.5V8.5',
  d8: 'M3.5 15.5V19.5M20.5 15.5V19.5',
  d9: 'M6.00098 6.5H7.52884C7.83933 6.5 8.14451 6.4245 8.42801 6.29788C10.81 5.23404 13.192 5.23404 15.574 6.29788C15.8575 6.4245 16.1626 6.5 16.4731 6.5H18.001',
  d10: 'M6.00098 3V10M18.001 3V10',
  d11: 'M6.00098 17.5H7.52884C7.83933 17.5 8.14451 17.4245 8.42801 17.2979C10.81 16.234 13.192 16.234 15.574 17.2979C15.8575 17.4245 16.1626 17.5 16.4731 17.5H18.001',
  d12: 'M6.00098 14V21M18.001 14V21',
  d13: 'M3.50098 6.5H2.00098M20.501 6.5H22.001',
  d14: 'M3.50098 17.5H2.00098M20.501 17.5H22.001',
  d15: 'M3.50098 4.5V8.5M20.501 4.5V8.5',
  d16: 'M3.50098 15.5V19.5M20.501 15.5V19.5',
  d17: 'M6 2C6.55228 2 7 2.44772 7 3V10C7 10.5523 6.55228 11 6 11C5.44772 11 5 10.5523 5 10V3C5 2.44772 5.44772 2 6 2ZM18 2C18.5523 2 19 2.44772 19 3V10C19 10.5523 18.5523 11 18 11C17.4477 11 17 10.5523 17 10V3C17 2.44772 17.4477 2 18 2Z',
  d18: 'M6 13C6.55228 13 7 13.4477 7 14V21C7 21.5523 6.55228 22 6 22C5.44772 22 5 21.5523 5 21V14C5 13.4477 5.44772 13 6 13ZM18 13C18.5523 13 19 13.4477 19 14V21C19 21.5523 18.5523 22 18 22C17.4477 22 17 21.5523 17 21V14C17 13.4477 17.4477 13 18 13Z',
  d19: 'M15.9808 5.38481C13.3393 4.20506 10.6607 4.20506 8.01923 5.38481C7.84266 5.46367 7.67616 5.5 7.52786 5.5H6C5.44772 5.5 5 5.94772 5 6.5C5 7.05228 5.44772 7.5 6 7.5L7.52786 7.5C8.00055 7.5 8.44439 7.38533 8.83483 7.21096C10.9573 6.26301 13.0427 6.26301 15.1652 7.21096C15.5556 7.38533 15.9994 7.5 16.4721 7.5H18C18.5523 7.5 19 7.05228 19 6.5C19 5.94772 18.5523 5.5 18 5.5H16.4721C16.3238 5.5 16.1573 5.46367 15.9808 5.38481ZM2 5.5C1.44772 5.5 1 5.94772 1 6.5C1 7.05228 1.44772 7.5 2 7.5H3.5C4.05228 7.5 4.5 7.05228 4.5 6.5C4.5 5.94772 4.05228 5.5 3.5 5.5H2ZM20.5 5.5C19.9477 5.5 19.5 5.94772 19.5 6.5C19.5 7.05228 19.9477 7.5 20.5 7.5L22 7.5C22.5523 7.5 23 7.05228 23 6.5C23 5.94772 22.5523 5.5 22 5.5H20.5Z',
  d20: 'M15.9808 16.3848C13.3393 15.2051 10.6607 15.2051 8.01923 16.3848C7.84266 16.4637 7.67616 16.5 7.52786 16.5H6C5.44772 16.5 5 16.9477 5 17.5C5 18.0523 5.44772 18.5 6 18.5H7.52786C8.00055 18.5 8.44439 18.3853 8.83483 18.211C10.9573 17.263 13.0427 17.263 15.1652 18.211C15.5556 18.3853 15.9994 18.5 16.4721 18.5L18 18.5C18.5523 18.5 19 18.0523 19 17.5C19 16.9477 18.5523 16.5 18 16.5H16.4721C16.3238 16.5 16.1573 16.4637 15.9808 16.3848ZM2 16.5C1.44772 16.5 1 16.9477 1 17.5C1 18.0523 1.44772 18.5 2 18.5H3.5C4.05228 18.5 4.5 18.0523 4.5 17.5C4.5 16.9477 4.05228 16.5 3.5 16.5H2ZM20.5 16.5C19.9477 16.5 19.5 16.9477 19.5 17.5C19.5 18.0523 19.9477 18.5 20.5 18.5H22C22.5523 18.5 23 18.0523 23 17.5C23 16.9477 22.5523 16.5 22 16.5H20.5Z',
  d21: 'M3.5 3.5C4.05228 3.5 4.5 3.94772 4.5 4.5V8.5C4.5 9.05228 4.05228 9.5 3.5 9.5C2.94772 9.5 2.5 9.05228 2.5 8.5V4.5C2.5 3.94772 2.94772 3.5 3.5 3.5ZM20.5 3.5C21.0523 3.5 21.5 3.94772 21.5 4.5V8.5C21.5 9.05228 21.0523 9.5 20.5 9.5C19.9477 9.5 19.5 9.05228 19.5 8.5V4.5C19.5 3.94772 19.9477 3.5 20.5 3.5Z',
  d22: 'M3.5 14.5C4.05228 14.5 4.5 14.9477 4.5 15.5V19.5C4.5 20.0523 4.05228 20.5 3.5 20.5C2.94772 20.5 2.5 20.0523 2.5 19.5V15.5C2.5 14.9477 2.94772 14.5 3.5 14.5ZM20.5 14.5C21.0523 14.5 21.5 14.9477 21.5 15.5V19.5C21.5 20.0523 21.0523 20.5 20.5 20.5C19.9477 20.5 19.5 20.0523 19.5 19.5V15.5C19.5 14.9477 19.9477 14.5 20.5 14.5Z',
  d23: 'M6.5 3V11M17.5 3V11',
  d24: 'M6.5 13V21M17.5 13V21',
  d25: 'M4 7H2M20 7H22M6.5 7H17.5',
  d26: 'M4 17H2M20 17H22M6.5 17H17.5',
  d27: 'M4 4.5V9.5M20 4.5V9.5',
  d28: 'M4 14.5V19.5M20 14.5V19.5',
  d29: 'M5.5 11V3H7.5V11H5.5ZM16.5 11V3H18.5V11H16.5Z',
  d30: 'M5.5 21V13H7.5V21H5.5ZM16.5 21V13H18.5V21H16.5Z',
  d31: 'M1 6H3V8H1V6ZM17.5 8H6.5V6H17.5V8ZM23 8H21V6H23V8Z',
  d32: 'M1 16H3V18H1V16ZM17.5 18H6.5V16H17.5V18ZM23 18H21V16H23V18Z',
  d33: 'M2.5 9.5V4.5H4.5V9.5H2.5ZM19.5 9.5V4.5H21.5V9.5H19.5Z',
  d34: 'M2.5 19.5V14.5H4.5V19.5H2.5ZM19.5 19.5V14.5H21.5V19.5H19.5Z',
};

export const IconDumbbell03StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dumbbell-03-stroke-rounded IconDumbbell03StrokeRounded"
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
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
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
    </TheIconWrapper>
  );
};

export const IconDumbbell03DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dumbbell-03-duotone-rounded IconDumbbell03DuotoneRounded"
    >
      <path 
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
      <path 
        d={d.d15} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d16} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconDumbbell03TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dumbbell-03-twotone-rounded IconDumbbell03TwotoneRounded"
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
        opacity="var(--icon-opacity)" 
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
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
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
    </TheIconWrapper>
  );
};

export const IconDumbbell03SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dumbbell-03-solid-rounded IconDumbbell03SolidRounded"
    >
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d20} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d21} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d22} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconDumbbell03BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dumbbell-03-bulk-rounded IconDumbbell03BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d20} 
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
        d={d.d21} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d22} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconDumbbell03StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dumbbell-03-stroke-sharp IconDumbbell03StrokeSharp"
    >
      <path 
        d={d.d23} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d24} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d25} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d26} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d27} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d28} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconDumbbell03SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dumbbell-03-solid-sharp IconDumbbell03SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d29} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d30} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d31} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d32} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d33} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d34} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfDumbbell03: TheIconSelfPack = {
  name: 'Dumbbell03',
  StrokeRounded: IconDumbbell03StrokeRounded,
  DuotoneRounded: IconDumbbell03DuotoneRounded,
  TwotoneRounded: IconDumbbell03TwotoneRounded,
  SolidRounded: IconDumbbell03SolidRounded,
  BulkRounded: IconDumbbell03BulkRounded,
  StrokeSharp: IconDumbbell03StrokeSharp,
  SolidSharp: IconDumbbell03SolidSharp,
};