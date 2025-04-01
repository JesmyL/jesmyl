import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M13 2H11C7.22876 2 5.34315 2 4.17157 3.17157C3 4.34315 3 6.22876 3 10V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V10C21 6.22876 21 4.34315 19.8284 3.17157C18.6569 2 16.7712 2 13 2Z',
  d2: 'M21 12H3',
  d3: 'M15 7H9',
  d4: 'M15 17H9',
  d5: 'M11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V12H3V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22Z',
  d6: 'M13.0564 1.25H10.9436H10.9436C9.10583 1.24999 7.65019 1.24997 6.51098 1.40314C5.33856 1.56076 4.38961 1.89288 3.64124 2.64124C2.89288 3.38961 2.56076 4.33856 2.40314 5.51098C2.24997 6.65019 2.24999 8.10581 2.25 9.94355V9.94356V11.25H21.75V9.94359C21.75 8.10585 21.75 6.65018 21.5969 5.51098C21.4392 4.33856 21.1071 3.38961 20.3588 2.64124C19.6104 1.89288 18.6614 1.56076 17.489 1.40314C16.3498 1.24997 14.8942 1.24999 13.0564 1.25H13.0564ZM21.75 12.75H2.25V14.0564V14.0564C2.24999 15.8942 2.24997 17.3498 2.40314 18.489C2.56076 19.6614 2.89288 20.6104 3.64124 21.3588C4.38961 22.1071 5.33856 22.4392 6.51098 22.5969C7.65018 22.75 9.1058 22.75 10.9435 22.75H13.0564C14.8942 22.75 16.3498 22.75 17.489 22.5969C18.6614 22.4392 19.6104 22.1071 20.3588 21.3588C21.1071 20.6104 21.4392 19.6614 21.5969 18.489C21.75 17.3498 21.75 15.8942 21.75 14.0565V12.75ZM8.25 7C8.25 6.58579 8.58579 6.25 9 6.25H15C15.4142 6.25 15.75 6.58579 15.75 7C15.75 7.41421 15.4142 7.75 15 7.75H9C8.58579 7.75 8.25 7.41421 8.25 7ZM9 16.25C8.58579 16.25 8.25 16.5858 8.25 17C8.25 17.4142 8.58579 17.75 9 17.75H15C15.4142 17.75 15.75 17.4142 15.75 17C15.75 16.5858 15.4142 16.25 15 16.25H9Z',
  d7: 'M13.0564 1.25H10.9436C9.10583 1.24999 7.65019 1.24997 6.51098 1.40314C5.33856 1.56076 4.38961 1.89288 3.64124 2.64124C2.89288 3.38961 2.56076 4.33856 2.40314 5.51098C2.24997 6.65019 2.24999 8.10581 2.25 9.94356V11.25H21.75V9.94359C21.75 8.10585 21.75 6.65018 21.5969 5.51098C21.4392 4.33856 21.1071 3.38961 20.3588 2.64124C19.6104 1.89288 18.6614 1.56076 17.489 1.40314C16.3498 1.24997 14.8942 1.24999 13.0564 1.25Z',
  d8: 'M21.75 12.75H2.25V14.0564C2.24999 15.8942 2.24997 17.3498 2.40314 18.489C2.56076 19.6614 2.89288 20.6104 3.64124 21.3588C4.38961 22.1071 5.33856 22.4392 6.51098 22.5969C7.65018 22.75 9.1058 22.75 10.9435 22.75H13.0564C14.8942 22.75 16.3498 22.75 17.489 22.5969C18.6614 22.4392 19.6104 22.1071 20.3588 21.3588C21.1071 20.6104 21.4392 19.6614 21.5969 18.489C21.75 17.3498 21.75 15.8942 21.75 14.0565V12.75Z',
  d9: 'M8.25 7C8.25 6.58579 8.58579 6.25 9 6.25H15C15.4142 6.25 15.75 6.58579 15.75 7C15.75 7.41421 15.4142 7.75 15 7.75H9C8.58579 7.75 8.25 7.41421 8.25 7Z',
  d10: 'M8.25 17C8.25 16.5858 8.58579 16.25 9 16.25H15C15.4142 16.25 15.75 16.5858 15.75 17C15.75 17.4142 15.4142 17.75 15 17.75H9C8.58579 17.75 8.25 17.4142 8.25 17Z',
  d11: 'M21 2H3V22H21V2Z',
  d12: 'M3 1.25C2.58579 1.25 2.25 1.58579 2.25 2V11.25H21.75V2C21.75 1.58579 21.4142 1.25 21 1.25H3ZM21.75 12.75H2.25V22C2.25 22.4142 2.58579 22.75 3 22.75H21C21.4142 22.75 21.75 22.4142 21.75 22V12.75ZM9 6.25H15V7.75H9V6.25ZM15 16.25H9V17.75H15V16.25Z',
};

export const IconArchiveStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="archive-stroke-rounded IconArchiveStrokeRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconArchiveDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="archive-duotone-rounded IconArchiveDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
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
      />
    </TheIconWrapper>
  );
};

export const IconArchiveTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="archive-twotone-rounded IconArchiveTwotoneRounded"
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
        opacity="var(--icon-opacity)" 
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
      />
    </TheIconWrapper>
  );
};

export const IconArchiveSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="archive-solid-rounded IconArchiveSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconArchiveBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="archive-bulk-rounded IconArchiveBulkRounded"
    >
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      </g>
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
    </TheIconWrapper>
  );
};

export const IconArchiveStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="archive-stroke-sharp IconArchiveStrokeSharp"
    >
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconArchiveSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="archive-solid-sharp IconArchiveSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfArchive: TheIconSelfPack = {
  name: 'Archive',
  StrokeRounded: IconArchiveStrokeRounded,
  DuotoneRounded: IconArchiveDuotoneRounded,
  TwotoneRounded: IconArchiveTwotoneRounded,
  SolidRounded: IconArchiveSolidRounded,
  BulkRounded: IconArchiveBulkRounded,
  StrokeSharp: IconArchiveStrokeSharp,
  SolidSharp: IconArchiveSolidSharp,
};