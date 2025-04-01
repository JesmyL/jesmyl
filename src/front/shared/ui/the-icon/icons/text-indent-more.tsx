import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M15 4.5H20',
  d2: 'M15 9.5H18',
  d3: 'M15 14.5H20',
  d4: 'M15 19.5H18',
  d5: 'M11 3V21',
  d6: 'M4 8.5L5.54218 9.74227C6.84739 10.7937 7.5 11.3193 7.5 12C7.5 12.6807 6.84739 13.2063 5.54218 14.2577L4 15.5',
  d7: 'M5.54218 9.74227L4 8.5V15.5L5.54218 14.2577C6.84739 13.2063 7.5 12.6807 7.5 12C7.5 11.3193 6.84739 10.7937 5.54218 9.74227Z',
  d8: 'M14 4.5C14 3.94772 14.4477 3.5 15 3.5H20C20.5523 3.5 21 3.94772 21 4.5C21 5.05228 20.5523 5.5 20 5.5H15C14.4477 5.5 14 5.05228 14 4.5Z',
  d9: 'M14 9.5C14 8.94772 14.4477 8.5 15 8.5H18C18.5523 8.5 19 8.94772 19 9.5C19 10.0523 18.5523 10.5 18 10.5H15C14.4477 10.5 14 10.0523 14 9.5Z',
  d10: 'M14 14.5C14 13.9477 14.4477 13.5 15 13.5H20C20.5523 13.5 21 13.9477 21 14.5C21 15.0523 20.5523 15.5 20 15.5H15C14.4477 15.5 14 15.0523 14 14.5Z',
  d11: 'M14 19.5C14 18.9477 14.4477 18.5 15 18.5H18C18.5523 18.5 19 18.9477 19 19.5C19 20.0523 18.5523 20.5 18 20.5H15C14.4477 20.5 14 20.0523 14 19.5Z',
  d12: 'M11 2C11.5523 2 12 2.44772 12 3V21C12 21.5523 11.5523 22 11 22C10.4477 22 10 21.5523 10 21V3C10 2.44772 10.4477 2 11 2Z',
  d13: 'M3.22127 7.87272C3.56773 7.44262 4.19725 7.37481 4.62735 7.72127L6.16953 8.96354C6.77642 9.45232 7.36533 9.92663 7.73999 10.3261C8.14045 10.7531 8.50003 11.29 8.50003 12C8.50003 12.7101 8.14045 13.247 7.73999 13.674C7.36533 14.0734 6.8297 14.5048 6.22282 14.9936L4.62735 16.2788C4.19725 16.6253 3.56773 16.5575 3.22127 16.1274C3.07225 15.9424 2.99987 15.7205 3 15.5001V8.49935C3.00001 8.27917 3.0724 8.05753 3.22127 7.87272Z',
  d14: 'M4 8.5L7.5 12L4 15.5',
  d15: 'M20.5 5.5H15.5V3.5H20.5V5.5Z',
  d16: 'M18.5 10.5H15.5V8.5H18.5V10.5Z',
  d17: 'M20.5 15.5H15.5V13.5H20.5V15.5Z',
  d18: 'M18.5 20.5H15.5V18.5H18.5V20.5Z',
  d19: 'M10.5 21V3H12.5V21H10.5Z',
  d20: 'M6.29289 12.0001L3.5 9.20718L4.91421 7.79297L9.12132 12.0001L4.91421 16.2072L3.5 14.793L6.29289 12.0001Z',
};

export const IconTextIndentMoreStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="text-indent-more-stroke-rounded IconTextIndentMoreStrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconTextIndentMoreDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="text-indent-more-duotone-rounded IconTextIndentMoreDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
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
    </TheIconWrapper>
  );
};

export const IconTextIndentMoreTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="text-indent-more-twotone-rounded IconTextIndentMoreTwotoneRounded"
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
      <path 
        opacity="var(--icon-opacity)" 
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
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTextIndentMoreSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="text-indent-more-solid-rounded IconTextIndentMoreSolidRounded"
    >
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
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
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
    </TheIconWrapper>
  );
};

export const IconTextIndentMoreBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="text-indent-more-bulk-rounded IconTextIndentMoreBulkRounded"
    >
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
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconTextIndentMoreStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="text-indent-more-stroke-sharp IconTextIndentMoreStrokeSharp"
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
        d={d.d4} 
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
        d={d.d14} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconTextIndentMoreSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="text-indent-more-solid-sharp IconTextIndentMoreSolidSharp"
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d20} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfTextIndentMore: TheIconSelfPack = {
  name: 'TextIndentMore',
  StrokeRounded: IconTextIndentMoreStrokeRounded,
  DuotoneRounded: IconTextIndentMoreDuotoneRounded,
  TwotoneRounded: IconTextIndentMoreTwotoneRounded,
  SolidRounded: IconTextIndentMoreSolidRounded,
  BulkRounded: IconTextIndentMoreBulkRounded,
  StrokeSharp: IconTextIndentMoreStrokeSharp,
  SolidSharp: IconTextIndentMoreSolidSharp,
};