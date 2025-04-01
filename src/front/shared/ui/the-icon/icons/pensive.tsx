import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M9 16H15',
  d2: 'M7 9C7.20949 9.5826 7.77476 10 8.43922 10C9.10367 10 9.66894 9.5826 9.87843 9M14.1216 9C14.3311 9.5826 14.8963 10 15.5608 10C16.2252 10 16.7905 9.5826 17 9',
  d3: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM8.25 16C8.25 15.5858 8.58579 15.25 9 15.25L15 15.25C15.4142 15.25 15.75 15.5858 15.75 16C15.75 16.4142 15.4142 16.75 15 16.75H9C8.58579 16.75 8.25 16.4142 8.25 16ZM7.70596 8.74622C7.80952 9.0342 8.09461 9.25 8.43942 9.25C8.78423 9.25 9.06932 9.0342 9.17288 8.74622C9.31304 8.35644 9.74264 8.15408 10.1324 8.29424C10.5222 8.4344 10.7246 8.864 10.5844 9.25378C10.269 10.131 9.42351 10.75 8.43942 10.75C7.45533 10.75 6.60988 10.131 6.29445 9.25378C6.15429 8.864 6.35664 8.4344 6.74642 8.29424C7.1362 8.15408 7.5658 8.35644 7.70596 8.74622ZM14.8275 8.74622C14.9311 9.0342 15.2162 9.25 15.561 9.25C15.9058 9.25 16.1909 9.0342 16.2944 8.74622C16.4346 8.35644 16.8642 8.15408 17.254 8.29424C17.6438 8.4344 17.8461 8.864 17.706 9.25378C17.3905 10.131 16.5451 10.75 15.561 10.75C14.5769 10.75 13.7314 10.131 13.416 9.25378C13.2759 8.864 13.4782 8.4344 13.868 8.29424C14.2578 8.15408 14.6874 8.35644 14.8275 8.74622Z',
  d4: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z',
  d5: 'M8.25 16C8.25 15.5858 8.58579 15.25 9 15.25H15C15.4142 15.25 15.75 15.5858 15.75 16C15.75 16.4142 15.4142 16.75 15 16.75H9C8.58579 16.75 8.25 16.4142 8.25 16Z',
  d6: 'M8.43942 9.25C8.09461 9.25 7.80952 9.0342 7.70596 8.74622C7.5658 8.35644 7.1362 8.15408 6.74642 8.29424C6.35664 8.4344 6.15429 8.864 6.29445 9.25378C6.60988 10.131 7.45533 10.75 8.43942 10.75C9.42351 10.75 10.269 10.131 10.5844 9.25378C10.7246 8.864 10.5222 8.4344 10.1324 8.29424C9.74264 8.15408 9.31304 8.35644 9.17288 8.74622C9.06932 9.0342 8.78423 9.25 8.43942 9.25ZM15.561 9.25C15.2162 9.25 14.9311 9.0342 14.8275 8.74622C14.6874 8.35644 14.2578 8.15408 13.868 8.29424C13.4782 8.4344 13.2759 8.864 13.416 9.25378C13.7314 10.131 14.5769 10.75 15.561 10.75C16.5451 10.75 17.3905 10.131 17.706 9.25378C17.8461 8.864 17.6438 8.4344 17.254 8.29424C16.8642 8.15408 16.4346 8.35644 16.2944 8.74622C16.1909 9.0342 15.9058 9.25 15.561 9.25Z',
  d7: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM15 15.25L15 16.75H9V15.25L15 15.25ZM7.70644 8.74622C7.80999 9.0342 8.09508 9.25 8.4399 9.25C8.78471 9.25 9.0698 9.0342 9.17335 8.74622L10.5849 9.25378C10.2694 10.131 9.42399 10.75 8.4399 10.75C7.45581 10.75 6.61035 10.131 6.29492 9.25378L7.70644 8.74622ZM14.828 8.74622C14.9316 9.0342 15.2167 9.25 15.5615 9.25C15.9063 9.25 16.1914 9.0342 16.2949 8.74622L17.7064 9.25378C17.391 10.131 16.5456 10.75 15.5615 10.75C14.5774 10.75 13.7319 10.131 13.4165 9.25378L14.828 8.74622Z',
};

export const IconPensiveStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pensive-stroke-rounded IconPensiveStrokeRounded"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
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

export const IconPensiveDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pensive-duotone-rounded IconPensiveDuotoneRounded"
    >
      <circle 
        opacity="var(--icon-opacity)" 
        cx="12" 
        cy="12" 
        r="10" 
        fill="var(--icon-fill)"></circle>
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
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

export const IconPensiveTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pensive-twotone-rounded IconPensiveTwotoneRounded"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
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
    </TheIconWrapper>
  );
};

export const IconPensiveSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pensive-solid-rounded IconPensiveSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconPensiveBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pensive-bulk-rounded IconPensiveBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const IconPensiveStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pensive-stroke-sharp IconPensiveStrokeSharp"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
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

export const IconPensiveSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pensive-solid-sharp IconPensiveSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfPensive: TheIconSelfPack = {
  name: 'Pensive',
  StrokeRounded: IconPensiveStrokeRounded,
  DuotoneRounded: IconPensiveDuotoneRounded,
  TwotoneRounded: IconPensiveTwotoneRounded,
  SolidRounded: IconPensiveSolidRounded,
  BulkRounded: IconPensiveBulkRounded,
  StrokeSharp: IconPensiveStrokeSharp,
  SolidSharp: IconPensiveSolidSharp,
};