import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3 12C7.97056 12 12 7.97056 12 3C12 7.97056 16.0294 12 21 12C16.0294 12 12 16.0294 12 21C12 16.0294 7.97056 12 3 12Z',
  d2: 'M12 3C12 7.97056 7.97056 12 3 12C7.97056 12 12 16.0294 12 21',
  d3: 'M12 3C12 7.97056 16.0294 12 21 12C16.0294 12 12 16.0294 12 21',
  d4: 'M12 2.25C12.4142 2.25 12.75 2.58579 12.75 3C12.75 7.55635 16.4437 11.25 21 11.25C21.4142 11.25 21.75 11.5858 21.75 12C21.75 12.4142 21.4142 12.75 21 12.75C16.4437 12.75 12.75 16.4437 12.75 21C12.75 21.4142 12.4142 21.75 12 21.75C11.5858 21.75 11.25 21.4142 11.25 21C11.25 16.4437 7.55635 12.75 3 12.75C2.58579 12.75 2.25 12.4142 2.25 12C2.25 11.5858 2.58579 11.25 3 11.25C7.55635 11.25 11.25 7.55635 11.25 3C11.25 2.58579 11.5858 2.25 12 2.25Z',
  d5: 'M12 2.25C12.4142 2.25 12.75 2.58579 12.75 3C12.75 7.55635 16.4437 11.25 21 11.25C21.4142 11.25 21.75 11.5858 21.75 12C21.75 12.4142 21.4142 12.75 21 12.75C16.4437 12.75 12.75 16.4437 12.75 21C12.75 21.4142 12.4142 21.75 12 21.75V2.25Z',
  d6: 'M12 21.75C11.5858 21.75 11.25 21.4142 11.25 21C11.25 16.4437 7.55635 12.75 3 12.75C2.58579 12.75 2.25 12.4142 2.25 12C2.25 11.5858 2.58579 11.25 3 11.25C7.55635 11.25 11.25 7.55635 11.25 3C11.25 2.58579 11.5858 2.25 12 2.25V21.75Z',
  d7: 'M3 11.25C7.55635 11.25 11.25 7.55635 11.25 3H12.75C12.75 7.55635 16.4437 11.25 21 11.25V12.75C16.4437 12.75 12.75 16.4437 12.75 21H11.25C11.25 16.4437 7.55635 12.75 3 12.75V11.25Z',
};

export const IconGoogleGeminiStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="google-gemini-stroke-rounded IconGoogleGeminiStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconGoogleGeminiDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="google-gemini-duotone-rounded IconGoogleGeminiDuotoneRounded"
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
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconGoogleGeminiTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="google-gemini-twotone-rounded IconGoogleGeminiTwotoneRounded"
    >
      <path 
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
    </TheIconWrapper>
  );
};

export const IconGoogleGeminiSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="google-gemini-solid-rounded IconGoogleGeminiSolidRounded"
    >
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconGoogleGeminiBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="google-gemini-bulk-rounded IconGoogleGeminiBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconGoogleGeminiStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="google-gemini-stroke-sharp IconGoogleGeminiStrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconGoogleGeminiSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="google-gemini-solid-sharp IconGoogleGeminiSolidSharp"
    >
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfGoogleGemini: TheIconSelfPack = {
  name: 'GoogleGemini',
  StrokeRounded: IconGoogleGeminiStrokeRounded,
  DuotoneRounded: IconGoogleGeminiDuotoneRounded,
  TwotoneRounded: IconGoogleGeminiTwotoneRounded,
  SolidRounded: IconGoogleGeminiSolidRounded,
  BulkRounded: IconGoogleGeminiBulkRounded,
  StrokeSharp: IconGoogleGeminiStrokeSharp,
  SolidSharp: IconGoogleGeminiSolidSharp,
};