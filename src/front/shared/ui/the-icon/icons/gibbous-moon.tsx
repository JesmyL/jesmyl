import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M20.5 14.469C19.3635 15.0758 18.0654 15.4199 16.687 15.4199C12.2097 15.4199 8.58014 11.7903 8.58014 7.31302C8.58014 5.9346 8.92416 4.63654 9.53102 3.5C5.50093 4.44451 2.5 8.0617 2.5 12.3798C2.5 17.4167 6.58325 21.5 11.6202 21.5C15.9383 21.5 19.5555 18.4991 20.5 14.469Z',
  d2: 'M21.5 12C21.5 6.75329 17.2467 2.5 12 2.5',
  d3: 'M9.98099 2.52937C10.1521 2.75203 10.1771 3.05425 10.0448 3.30198C9.45587 4.40495 9.12171 5.66478 9.12171 7.00477C9.12171 11.3532 12.6468 14.8783 16.9952 14.8783C18.3352 14.8783 19.595 14.5441 20.698 13.9552C20.9457 13.8229 21.248 13.8479 21.4706 14.019C21.6933 14.1901 21.7952 14.4758 21.7311 14.7492C20.6564 19.3348 16.5416 22.75 11.6273 22.75C5.89609 22.75 1.25 18.1039 1.25 12.3727C1.25 7.45844 4.66517 3.34361 9.25081 2.26889C9.52424 2.20481 9.80985 2.3067 9.98099 2.52937Z',
  d4: 'M21.8606 12.1813C21.3117 12.2424 20.8172 11.847 20.7561 11.2981C20.2856 7.07193 16.9282 3.7146 12.702 3.2442C12.1531 3.1831 11.7577 2.68861 11.8188 2.13971C11.8799 1.59082 12.3744 1.19538 12.9233 1.25647C18.0788 1.83032 22.1698 5.92127 22.7438 11.0768C22.8049 11.6257 22.4095 12.1202 21.8606 12.1813Z',
  d5: 'M21.5 14.6878C20.2372 15.3621 18.7949 15.7443 17.2633 15.7443C12.2885 15.7443 8.25571 11.7115 8.25571 6.73669C8.25571 5.20512 8.63795 3.76282 9.31225 2.5C4.83437 3.54945 1.5 7.56856 1.5 12.3664C1.5 17.9631 6.03695 22.5 11.6336 22.5C16.4314 22.5 20.4505 19.1656 21.5 14.6878Z',
  d6: 'M20.5 12C20.5 7.30558 16.6944 3.5 12 3.5V1.5C17.799 1.5 22.5 6.20101 22.5 12H20.5Z',
};

export const IconGibbousMoonStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="gibbous-moon-stroke-rounded IconGibbousMoonStrokeRounded"
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

export const IconGibbousMoonDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="gibbous-moon-duotone-rounded IconGibbousMoonDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
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
    </TheIconWrapper>
  );
};

export const IconGibbousMoonTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="gibbous-moon-twotone-rounded IconGibbousMoonTwotoneRounded"
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

export const IconGibbousMoonSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="gibbous-moon-solid-rounded IconGibbousMoonSolidRounded"
    >
      <path 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconGibbousMoonBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="gibbous-moon-bulk-rounded IconGibbousMoonBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconGibbousMoonStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="gibbous-moon-stroke-sharp IconGibbousMoonStrokeSharp"
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

export const IconGibbousMoonSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="gibbous-moon-solid-sharp IconGibbousMoonSolidSharp"
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

export const iconPackOfGibbousMoon: TheIconSelfPack = {
  name: 'GibbousMoon',
  StrokeRounded: IconGibbousMoonStrokeRounded,
  DuotoneRounded: IconGibbousMoonDuotoneRounded,
  TwotoneRounded: IconGibbousMoonTwotoneRounded,
  SolidRounded: IconGibbousMoonSolidRounded,
  BulkRounded: IconGibbousMoonBulkRounded,
  StrokeSharp: IconGibbousMoonStrokeSharp,
  SolidSharp: IconGibbousMoonSolidSharp,
};