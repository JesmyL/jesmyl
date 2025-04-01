import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M21.4999 12C21.4999 17.2467 17.2466 21.5 11.9999 21.5C6.7532 21.5 2.49991 17.2467 2.49991 12',
  d2: 'M11.9999 4.25C7.7197 4.25 4.24991 7.71979 4.24991 12C4.24991 16.2802 7.7197 19.75 11.9999 19.75C16.2801 19.75 19.7499 16.2802 19.7499 12C19.7499 7.71979 16.2801 4.25 11.9999 4.25ZM1.74991 12C1.74991 6.33908 6.33899 1.75 11.9999 1.75C17.6608 1.75 22.2499 6.33908 22.2499 12C22.2499 17.6609 17.6608 22.25 11.9999 22.25C6.33899 22.25 1.74991 17.6609 1.74991 12Z',
  d3: 'M11.9999 4.25C7.7197 4.25 4.24991 7.71979 4.24991 12C4.24991 16.2802 7.7197 19.75 11.9999 19.75V22.25C6.33899 22.25 1.74991 17.6609 1.74991 12C1.74991 6.33908 6.33899 1.75 11.9999 1.75V4.25Z',
  d4: 'M11.9999 3.5C7.30549 3.5 3.49991 7.30558 3.49991 12C3.49991 16.6944 7.30549 20.5 11.9999 20.5C16.6943 20.5 20.4999 16.6944 20.4999 12C20.4999 7.30558 16.6943 3.5 11.9999 3.5ZM1.49991 12C1.49991 6.20101 6.20092 1.5 11.9999 1.5C17.7989 1.5 22.4999 6.20101 22.4999 12C22.4999 17.799 17.7989 22.5 11.9999 22.5C6.20092 22.5 1.49991 17.799 1.49991 12Z',
};

export const IconPayoneerStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="payoneer-stroke-rounded IconPayoneerStrokeRounded"
    >
      <circle 
        cx="11.9999" 
        cy="12" 
        r="9.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
    </TheIconWrapper>
  );
};

export const IconPayoneerDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="payoneer-duotone-rounded IconPayoneerDuotoneRounded"
    >
      <circle 
        opacity="var(--icon-opacity)" 
        cx="11.9999" 
        cy="12" 
        r="9.5" 
        fill="var(--icon-fill)"></circle>
      <circle 
        cx="11.9999" 
        cy="12" 
        r="9.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
    </TheIconWrapper>
  );
};

export const IconPayoneerTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="payoneer-twotone-rounded IconPayoneerTwotoneRounded"
    >
      <circle 
        opacity="var(--icon-opacity)" 
        cx="11.9999" 
        cy="12" 
        r="9.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
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

export const IconPayoneerSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="payoneer-solid-rounded IconPayoneerSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconPayoneerBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="payoneer-bulk-rounded IconPayoneerBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const IconPayoneerStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="payoneer-stroke-sharp IconPayoneerStrokeSharp"
    >
      <circle 
        cx="11.9999" 
        cy="12" 
        r="9.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
    </TheIconWrapper>
  );
};

export const IconPayoneerSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="payoneer-solid-sharp IconPayoneerSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfPayoneer: TheIconSelfPack = {
  name: 'Payoneer',
  StrokeRounded: IconPayoneerStrokeRounded,
  DuotoneRounded: IconPayoneerDuotoneRounded,
  TwotoneRounded: IconPayoneerTwotoneRounded,
  SolidRounded: IconPayoneerSolidRounded,
  BulkRounded: IconPayoneerBulkRounded,
  StrokeSharp: IconPayoneerStrokeSharp,
  SolidSharp: IconPayoneerSolidSharp,
};