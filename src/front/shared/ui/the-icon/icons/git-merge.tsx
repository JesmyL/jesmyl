import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M7 20C8.10457 20 9 19.1046 9 18C9 16.8954 8.10457 16 7 16C5.89543 16 5 16.8954 5 18C5 19.1046 5.89543 20 7 20Z',
  d2: 'M7 8C8.10457 8 9 7.10457 9 6C9 4.89543 8.10457 4 7 4C5.89543 4 5 4.89543 5 6C5 7.10457 5.89543 8 7 8Z',
  d3: 'M17 14C18.1046 14 19 13.1046 19 12C19 10.8954 18.1046 10 17 10C15.8954 10 15 10.8954 15 12C15 13.1046 15.8954 14 17 14Z',
  d4: 'M7.02165 8.27881V15.4068M14.4117 12.0043L10.0198 12.0043C8.92206 12.0043 6.86231 11.1249 7.01867 8.77952',
  d5: 'M7.02214 8.2793V15.4073M14.4122 12.0048H10.0203C8.92255 12.0048 6.8628 11.1254 7.01916 8.78001',
  d6: 'M7.01176 8.43604V15.564M14.3211 12.0406L9.92919 12.0406C8.83146 12.0406 7.01196 11.3406 7.00879 8.93675',
  d7: 'M7.0001 7C7.55238 7 8.0001 7.44772 8.0001 8C8.0001 8.99435 8.00869 9.29536 8.06824 9.51764C8.25318 10.2078 8.79227 10.7469 9.48246 10.9319C9.70474 10.9914 10.0057 11 11.0001 11H15.0001C15.5524 11 16.0001 11.4477 16.0001 12C16.0001 12.5523 15.5524 13 15.0001 13H11.0001C10.9536 13 10.9077 13 10.8625 13C10.0671 13.0005 9.47647 13.0008 8.96482 12.8637C8.62261 12.772 8.29897 12.6368 8.0001 12.4642V16C8.0001 16.5523 7.55238 17 7.0001 17C6.44781 17 6.0001 16.5523 6.0001 16L6.0001 8.39551C5.99995 8.31195 6 8.22603 6.00005 8.13758C6.00007 8.09239 6.0001 8.04654 6.0001 8C6.0001 7.44772 6.44781 7 7.0001 7Z',
  d8: 'M4.25 18C4.25 16.4812 5.48122 15.25 7 15.25C8.51878 15.25 9.75 16.4812 9.75 18C9.75 19.5188 8.51878 20.75 7 20.75C5.48122 20.75 4.25 19.5188 4.25 18Z',
  d9: 'M4.25 6C4.25 4.48122 5.48122 3.25 7 3.25C8.51878 3.25 9.75 4.48122 9.75 6C9.75 7.51878 8.51878 8.75 7 8.75C5.48122 8.75 4.25 7.51878 4.25 6Z',
  d10: 'M14.25 12C14.25 10.4812 15.4812 9.25 17 9.25C18.5188 9.25 19.75 10.4812 19.75 12C19.75 13.5188 18.5188 14.75 17 14.75C15.4812 14.75 14.25 13.5188 14.25 12Z',
  d11: 'M7 19.9766C8.10457 19.9766 9 19.0811 9 17.9766C9 16.872 8.10457 15.9766 7 15.9766C5.89543 15.9766 5 16.872 5 17.9766C5 19.0811 5.89543 19.9766 7 19.9766Z',
  d12: 'M7 7.97656C8.10457 7.97656 9 7.08113 9 5.97656C9 4.87199 8.10457 3.97656 7 3.97656C5.89543 3.97656 5 4.87199 5 5.97656C5 7.08113 5.89543 7.97656 7 7.97656Z',
  d13: 'M17 13.9766C18.1046 13.9766 19 13.0811 19 11.9766C19 10.872 18.1046 9.97656 17 9.97656C15.8954 9.97656 15 10.872 15 11.9766C15 13.0811 15.8954 13.9766 17 13.9766Z',
  d14: 'M7 7.97656V15.9766M7 12.0323H15',
  d15: 'M6 16L6 8H8V11H15V13H8L8 16H6Z',
};

export const IconGitMergeStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="git-merge-stroke-rounded IconGitMergeStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconGitMergeDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="git-merge-duotone-rounded IconGitMergeDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconGitMergeTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="git-merge-twotone-rounded IconGitMergeTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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

export const IconGitMergeSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="git-merge-solid-rounded IconGitMergeSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
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
    </TheIconWrapper>
  );
};

export const IconGitMergeBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="git-merge-bulk-rounded IconGitMergeBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
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
    </TheIconWrapper>
  );
};

export const IconGitMergeStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="git-merge-stroke-sharp IconGitMergeStrokeSharp"
    >
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d13} 
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

export const IconGitMergeSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="git-merge-solid-sharp IconGitMergeSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfGitMerge: TheIconSelfPack = {
  name: 'GitMerge',
  StrokeRounded: IconGitMergeStrokeRounded,
  DuotoneRounded: IconGitMergeDuotoneRounded,
  TwotoneRounded: IconGitMergeTwotoneRounded,
  SolidRounded: IconGitMergeSolidRounded,
  BulkRounded: IconGitMergeBulkRounded,
  StrokeSharp: IconGitMergeStrokeSharp,
  SolidSharp: IconGitMergeSolidSharp,
};