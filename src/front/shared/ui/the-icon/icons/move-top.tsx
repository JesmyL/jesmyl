import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12.0001 2L12.0001 12M12.0001 2C11.4381 2 11.0109 2.4381 10.1564 3.3143L8.5 4.97057M12.0001 2C12.5622 2 12.9894 2.4381 13.8439 3.3143L15.5 4.97044',
  d2: 'M12 22.75C9.79086 22.75 8 20.9591 8 18.75C8 16.5409 9.79086 14.75 12 14.75C14.2091 14.75 16 16.5409 16 18.75C16 20.9591 14.2091 22.75 12 22.75Z',
  d3: 'M11.9669 13.25C11.4146 13.25 10.9669 12.8023 10.9669 12.25L10.9669 6.25001L9.63672 6.25002C9.49118 6.25023 9.27913 6.25054 9.09865 6.22459C8.90146 6.19622 8.38411 6.0881 8.12132 5.57266C7.86047 5.06102 8.08633 4.61181 8.18715 4.44363C8.27737 4.29313 8.4088 4.13604 8.49791 4.02953L8.52014 4.00293C8.89435 3.55419 9.43759 2.92867 9.97446 2.40774C10.2407 2.14941 10.5299 1.89262 10.8138 1.69331C10.9558 1.59355 11.1184 1.49256 11.294 1.41318C11.4588 1.33861 11.7066 1.24998 12 1.24999C12.2934 1.24999 12.5411 1.33861 12.706 1.41318C12.8815 1.49256 13.0441 1.59355 13.1862 1.69331C13.47 1.89262 13.7592 2.1494 14.0255 2.40773C14.5624 2.92865 15.1056 3.55416 15.4798 4.0029L15.5021 4.02949C15.5912 4.13601 15.7226 4.29309 15.8128 4.44359C15.9137 4.61177 16.1395 5.06098 15.8787 5.57262C15.6159 6.08808 15.0986 6.1962 14.9014 6.22456C14.7209 6.25052 14.5088 6.25021 14.3633 6.25L12.9669 6.25001L12.9669 12.25C12.9669 12.8023 12.5192 13.25 11.9669 13.25Z',
  d4: 'M12.0028 12L12.0028 2.19225M15.5029 4.97057L12.0028 2L8.50293 4.97044',
  d5: 'M11.9985 22.7505C9.92747 22.7505 8.24854 21.0716 8.24854 19.0005C8.24854 16.9294 9.92747 15.2505 11.9985 15.2505C14.0696 15.2505 15.7485 16.9294 15.7485 19.0005C15.7485 21.0716 14.0696 22.7505 11.9985 22.7505Z',
  d6: 'M10.9999 13.233L10.9999 4.72147L8.79417 6.64691L7.5 5.12208L11.9999 1.24951L16.4999 5.12208L15.2057 6.64693L12.9999 4.72142L12.9999 13.233H10.9999Z',
};

export const IconMoveTopStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="move-top-stroke-rounded IconMoveTopStrokeRounded"
    >
      <circle 
        cx="3" 
        cy="3" 
        r="3" 
        transform="matrix(4.37114e08 1 1 4.37114e08 15 22)" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMoveTopDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="move-top-duotone-rounded IconMoveTopDuotoneRounded"
    >
      <circle 
        opacity="var(--icon-opacity)" 
        cx="3" 
        cy="3" 
        r="3" 
        transform="matrix(4.37114e08 1 1 4.37114e08 15 22)" 
        fill="var(--icon-fill)"></circle>
      <circle 
        cx="3" 
        cy="3" 
        r="3" 
        transform="matrix(4.37114e08 1 1 4.37114e08 15 22)" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMoveTopTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="move-top-twotone-rounded IconMoveTopTwotoneRounded"
    >
      <circle 
        opacity="var(--icon-opacity)" 
        cx="3" 
        cy="3" 
        r="3" 
        transform="matrix(4.37114e08 1 1 4.37114e08 15 22)" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMoveTopSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="move-top-solid-rounded IconMoveTopSolidRounded"
    >
      <path 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMoveTopBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="move-top-bulk-rounded IconMoveTopBulkRounded"
    >
      <path 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMoveTopStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="move-top-stroke-sharp IconMoveTopStrokeSharp"
    >
      <circle 
        cx="3" 
        cy="3" 
        r="3" 
        transform="matrix(4.37114e08 1 1 4.37114e08 15.0005 22)" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconMoveTopSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="move-top-solid-sharp IconMoveTopSolidSharp"
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
    </TheIconWrapper>
  );
};

export const iconPackOfMoveTop: TheIconSelfPack = {
  name: 'MoveTop',
  StrokeRounded: IconMoveTopStrokeRounded,
  DuotoneRounded: IconMoveTopDuotoneRounded,
  TwotoneRounded: IconMoveTopTwotoneRounded,
  SolidRounded: IconMoveTopSolidRounded,
  BulkRounded: IconMoveTopBulkRounded,
  StrokeSharp: IconMoveTopStrokeSharp,
  SolidSharp: IconMoveTopSolidSharp,
};