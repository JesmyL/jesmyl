import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2 11H17',
  d2: 'M2 8H22',
  d3: 'M6.5 5C5.8956 5 5.32433 5.1287 4.81768 5.35753C4.48573 5.50746 4.31975 5.58242 4.15988 5.83005C4 6.07769 4 6.32443 4 6.8179V8H9V6.8179C9 6.32443 9 6.07769 8.84013 5.83005C8.68025 5.58242 8.51427 5.50746 8.18232 5.35753C7.67567 5.1287 7.1044 5 6.5 5Z',
  d4: 'M6.5 14C5.79893 14 5.14245 14.1732 4.57968 14.4749C4.47363 14.5317 4.4206 14.5602 4.33052 14.6414C4.20736 14.7524 4.06861 14.9842 4.02898 15.1452C4 15.2629 4 15.3595 4 15.5525C4 15.9692 4 16.1776 4.06113 16.3443C4.16232 16.6202 4.37978 16.8377 4.65572 16.9389C4.82243 17 5.03079 17 5.44751 17H7.55249C7.96921 17 8.17757 17 8.34428 16.9389C8.62022 16.8377 8.83768 16.6202 8.93887 16.3443C9 16.1776 9 15.9692 9 15.5525C9 15.3595 9 15.2629 8.97102 15.1452C8.93139 14.9842 8.79263 14.7524 8.66948 14.6414C8.5794 14.5602 8.52637 14.5317 8.42032 14.4749C7.85755 14.1732 7.20107 14 6.5 14Z',
  d5: 'M2 17H17',
  d6: 'M2 20H22',
  d7: 'M17 12L22 12',
  d8: 'M17 15L22 15',
  d9: 'M22 4L22 22',
  d10: 'M17 4L17 22',
  d11: 'M2 4L2 22',
  d12: 'M2 11V8H17V11H2Z',
  d13: 'M9 17V15.8179C9 15.3244 9 15.0777 8.84012 14.8301C8.68025 14.5824 8.51427 14.5075 8.18232 14.3575C7.67567 14.1287 7.1044 14 6.5 14C5.8956 14 5.32433 14.1287 4.81768 14.3575C4.48573 14.5075 4.31975 14.5824 4.15988 14.8301C4 15.0777 4 15.3244 4 15.8179L4 17',
  d14: 'M22 4V8M22 22L22 20M17 4L17 8M17 22L17 20M17 8H22M17 8L17 20M22 8V20M17 20H22',
  d15: 'M2 17V20H17V17H2Z',
  d16: 'M22 8H17M17 8H2V11H17V8Z',
  d17: 'M9 8V6.8179C9 6.32443 9 6.07769 8.84012 5.83005C8.68025 5.58242 8.51427 5.50746 8.18232 5.35753C7.67567 5.1287 7.1044 5 6.5 5C5.8956 5 5.32433 5.1287 4.81768 5.35753C4.48573 5.50746 4.31975 5.58242 4.15988 5.83005C4 6.07769 4 6.32443 4 6.8179L4 8',
  d18: 'M22 20H17M17 20H2V17H17V20Z',
  d19: 'M2 10H17',
  d20: 'M2 7H22',
  d21: 'M6.5 4C5.8956 4 5.32433 4.1287 4.81768 4.35753C4.48573 4.50746 4.31975 4.58242 4.15988 4.83005C4 5.07769 4 5.32443 4 5.8179V7H9V5.8179C9 5.32443 9 5.07769 8.84013 4.83005C8.68025 4.58242 8.51427 4.50746 8.18232 4.35753C7.67567 4.1287 7.1044 4 6.5 4Z',
  d22: 'M6.5 13C5.79893 13 5.14245 13.1732 4.57968 13.4749C4.47363 13.5317 4.4206 13.5602 4.33052 13.6414C4.20736 13.7524 4.06861 13.9842 4.02898 14.1452C4 14.2629 4 14.3595 4 14.5525C4 14.9692 4 15.1776 4.06113 15.3443C4.16232 15.6202 4.37978 15.8377 4.65572 15.9389C4.82243 16 5.03079 16 5.44751 16H7.55249C7.96921 16 8.17757 16 8.34428 15.9389C8.62022 15.8377 8.83768 15.6202 8.93887 15.3443C9 15.1776 9 14.9692 9 14.5525C9 14.3595 9 14.2629 8.97102 14.1452C8.93139 13.9842 8.79263 13.7524 8.66948 13.6414C8.5794 13.5602 8.52637 13.5317 8.42032 13.4749C7.85755 13.1732 7.20107 13 6.5 13Z',
  d23: 'M2 16H17',
  d24: 'M2 19H22',
  d25: 'M17 11L22 11',
  d26: 'M17 14L22 14',
  d27: 'M22 3L22 21',
  d28: 'M17 3L17 21',
  d29: 'M2 3L2 21',
  d30: 'M6.5 13C5.8956 13 5.32433 13.1287 4.81768 13.3575C4.48573 13.5075 4.31975 13.5824 4.15988 13.8301C4 14.0777 4 14.3244 4 14.8179V16H9V14.8179C9 14.3244 9 14.0777 8.84013 13.8301C8.68025 13.5824 8.51427 13.5075 8.18232 13.3575C7.67567 13.1287 7.1044 13 6.5 13Z',
  d31: 'M17 2C17.5523 2 18 2.44772 18 3V6H21V3C21 2.44772 21.4477 2 22 2C22.5523 2 23 2.44772 23 3L23 21C23 21.5523 22.5523 22 22 22C21.4477 22 21 21.5523 21 21L21 20H18V21C18 21.5523 17.5523 22 17 22C16.4477 22 16 21.5523 16 21V3C16 2.44772 16.4477 2 17 2ZM18 18H21V8H18V18Z',
  d32: 'M1.25 7C1.25 6.58579 1.58579 6.25 2 6.25H17C17.4142 6.25 17.75 6.58579 17.75 7V10C17.75 10.4142 17.4142 10.75 17 10.75H2C1.58579 10.75 1.25 10.4142 1.25 10V7Z',
  d33: 'M1.25 16C1.25 15.5858 1.58579 15.25 2 15.25H17C17.4142 15.25 17.75 15.5858 17.75 16V19C17.75 19.4142 17.4142 19.75 17 19.75H2C1.58579 19.75 1.25 19.4142 1.25 19V16Z',
  d34: 'M2 2C2.55228 2 3 2.44772 3 3L3 21C3 21.5523 2.55228 22 2 22C1.44771 22 0.999999 21.5523 0.999999 21L1 3C1 2.44772 1.44772 2 2 2Z',
  d35: 'M16 11C16 10.4477 16.4477 10 17 10L22 10C22.5523 10 23 10.4477 23 11C23 11.5523 22.5523 12 22 12L17 12C16.4477 12 16 11.5523 16 11Z',
  d36: 'M16 14C16 13.4477 16.4477 13 17 13L22 13C22.5523 13 23 13.4477 23 14C23 14.5523 22.5523 15 22 15L17 15C16.4477 15 16 14.5523 16 14Z',
  d37: 'M18 6H21V8H18V6Z',
  d38: 'M21 20H18V18H21V20Z',
  d39: 'M3 3C3 2.44772 2.55228 2 2 2C1.44772 2 1 2.44772 1 3L1 21C1 21.5523 1.44771 22 2 22C2.55228 22 3 21.5523 3 21L3 3ZM18 3C18 2.44772 17.5523 2 17 2C16.4477 2 16 2.44772 16 3V21C16 21.5523 16.4477 22 17 22C17.5523 22 18 21.5523 18 21L18 3ZM21 3L21 21C21 21.5523 21.4477 22 22 22C22.5523 22 23 21.5523 23 21L23 3C23 2.44772 22.5523 2 22 2C21.4477 2 21 2.44772 21 3ZM4 5.8179V6.25L9 6.25V5.8179C9 5.32442 9 5.07769 8.84013 4.83006C8.68025 4.58242 8.51427 4.50746 8.18232 4.35753C7.67567 4.1287 7.1044 4 6.5 4C5.8956 4 5.32433 4.1287 4.81768 4.35753C4.48573 4.50746 4.31975 4.58242 4.15988 4.83006C4 5.07769 4 5.32443 4 5.8179ZM9 15.25H4V14.8179C4 14.3244 4 14.0777 4.15988 13.8301C4.31975 13.5824 4.48573 13.5075 4.81768 13.3575C5.32433 13.1287 5.8956 13 6.5 13C7.1044 13 7.67567 13.1287 8.18232 13.3575C8.51427 13.5075 8.68025 13.5824 8.84013 13.8301C9 14.0777 9 14.3244 9 14.8179V15.25Z',
  d40: 'M9 5.5H5',
  d41: 'M9 14.5H5',
  d42: 'M22 9.25L17 9.25V7.25L22 7.25V9.25Z',
  d43: 'M2 11.75H17V7.25H2V11.75Z',
  d44: 'M5 4H9V6H5V4Z',
  d45: 'M5 13H9V15H5V13Z',
  d46: 'M22 20.75H17V18.75H22V20.75Z',
  d47: 'M2 20.75H17V16.25H2V20.75Z',
  d48: 'M22 13H17V11L22 11V13Z',
  d49: 'M22 16H17V14L22 14V16Z',
  d50: 'M21 22L21 4L23 4L23 22L21 22Z',
  d51: 'M16 22L16 4L18 4L18 22L16 22Z',
  d52: 'M0.999999 22L1 4L3 4L3 22L0.999999 22Z',
};

export const IconBedBunkStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bed-bunk-stroke-rounded IconBedBunkStrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconBedBunkDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bed-bunk-duotone-rounded IconBedBunkDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d14} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d16} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d17} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d18} 
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
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBedBunkTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bed-bunk-twotone-rounded IconBedBunkTwotoneRounded"
    >
      <path 
        d={d.d19} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d20} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d21} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d22} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d23} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d24} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d25} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d26} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d27} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d28} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d29} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBedBunkSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bed-bunk-solid-rounded IconBedBunkSolidRounded"
    >
      <path 
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
        d={d.d32} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d21} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d33} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d34} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d35} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d36} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconBedBunkBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bed-bunk-bulk-rounded IconBedBunkBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d35} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d36} 
        fill="var(--icon-fill)" 
      />
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d37} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d38} 
        fill="var(--icon-fill)" 
      />
      </g>
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d32} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d33} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d39} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconBedBunkStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bed-bunk-stroke-sharp IconBedBunkStrokeSharp"
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
        d={d.d40} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d41} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBedBunkSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bed-bunk-solid-sharp IconBedBunkSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d42} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d43} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d44} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d45} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d46} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d47} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d48} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d49} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d50} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d51} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d52} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfBedBunk: TheIconSelfPack = {
  name: 'BedBunk',
  StrokeRounded: IconBedBunkStrokeRounded,
  DuotoneRounded: IconBedBunkDuotoneRounded,
  TwotoneRounded: IconBedBunkTwotoneRounded,
  SolidRounded: IconBedBunkSolidRounded,
  BulkRounded: IconBedBunkBulkRounded,
  StrokeSharp: IconBedBunkStrokeSharp,
  SolidSharp: IconBedBunkSolidSharp,
};