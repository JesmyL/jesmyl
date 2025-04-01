import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M9 9C9 10.6569 7.65685 12 6 12C4.34315 12 3 10.6569 3 9C3 7.34315 4.34315 6 6 6C7.65685 6 9 7.34315 9 9Z',
  d2: 'M21 18C21 19.6569 19.6569 21 18 21C16.3431 21 15 19.6569 15 18C15 16.3431 16.3431 15 18 15C19.6569 15 21 16.3431 21 18Z',
  d3: 'M9 9H14C15.8856 9 16.8284 9 17.4142 9.58579C18 10.1716 18 11.1144 18 13V15',
  d4: 'M6 12V22M6 6V2',
  d5: 'M16.0613 10.0643C15.5988 10.0021 14.9711 10 14 10H9C8.44772 10 8 9.55229 8 9C8 8.44772 8.44772 8 9 8H14C14.022 8 14.044 8 14.0658 8C14.9523 7.99995 15.7161 7.99991 16.3278 8.08215C16.9833 8.17028 17.6117 8.36902 18.1213 8.87868C18.631 9.38835 18.8297 10.0167 18.9179 10.6722C19.0001 11.2839 19.0001 12.0477 19 12.9342L19 15C19 15.5523 18.5523 16 18 16C17.4477 16 17 15.5523 17 15V13C17 12.0289 16.9979 11.4012 16.9357 10.9387C16.8774 10.505 16.7832 10.369 16.7071 10.2929C16.631 10.2168 16.495 10.1226 16.0613 10.0643Z',
  d6: 'M6 1C6.55228 1 7 1.44772 7 2V6C7 6.55228 6.55228 7 6 7C5.44772 7 5 6.55228 5 6V2C5 1.44772 5.44772 1 6 1ZM6 11C6.55228 11 7 11.4477 7 12V22C7 22.5523 6.55228 23 6 23C5.44772 23 5 22.5523 5 22V12C5 11.4477 5.44772 11 6 11Z',
  d7: 'M2.25 9C2.25 6.92893 3.92893 5.25 6 5.25C8.07107 5.25 9.75 6.92893 9.75 9C9.75 11.0711 8.07107 12.75 6 12.75C3.92893 12.75 2.25 11.0711 2.25 9Z',
  d8: 'M14.25 18C14.25 15.9289 15.9289 14.25 18 14.25C20.0711 14.25 21.75 15.9289 21.75 18C21.75 20.0711 20.0711 21.75 18 21.75C15.9289 21.75 14.25 20.0711 14.25 18Z',
  d9: 'M7 2C7 1.44772 6.55228 1 6 1C5.44772 1 5 1.44772 5 2V5.38481C5.31836 5.29694 5.6537 5.25 6 5.25C6.3463 5.25 6.68164 5.29694 7 5.38481V2Z',
  d10: 'M9.61519 10C9.70306 9.68164 9.75 9.3463 9.75 9C9.75 8.6537 9.70306 8.31836 9.61519 8L14.0658 8C14.9523 7.99995 15.7161 7.99991 16.3278 8.08214C16.9833 8.17027 17.6117 8.36902 18.1213 8.87868C18.631 9.38834 18.8297 10.0167 18.9179 10.6722C19.0001 11.2839 19.0001 12.0477 19 12.9342L19 14.3848C18.6816 14.2969 18.3463 14.25 18 14.25C17.6537 14.25 17.3184 14.2969 17 14.3848V13C17 12.0289 16.9979 11.4012 16.9357 10.9387C16.8774 10.505 16.7832 10.369 16.7071 10.2929C16.631 10.2168 16.495 10.1226 16.0613 10.0643C15.5988 10.0021 14.9711 10 14 10H9.61519Z',
  d11: 'M5 12.6152C5.31836 12.7031 5.6537 12.75 6 12.75C6.3463 12.75 6.68164 12.7031 7 12.6152V22C7 22.5523 6.55228 23 6 23C5.44772 23 5 22.5523 5 22V12.6152Z',
  d12: 'M9 9H18V15',
  d13: 'M17 10H9V8H18C18.5523 8 19 8.44772 19 9V15H17V10Z',
  d14: 'M7 2V6H5V2H7ZM5 22V12H7V22H5Z',
};

export const IconWorkflowCircle01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="workflow-circle-01-stroke-rounded IconWorkflowCircle01StrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconWorkflowCircle01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="workflow-circle-01-duotone-rounded IconWorkflowCircle01DuotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconWorkflowCircle01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="workflow-circle-01-twotone-rounded IconWorkflowCircle01TwotoneRounded"
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
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconWorkflowCircle01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="workflow-circle-01-solid-rounded IconWorkflowCircle01SolidRounded"
    >
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
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconWorkflowCircle01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="workflow-circle-01-bulk-rounded IconWorkflowCircle01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
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
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconWorkflowCircle01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="workflow-circle-01-stroke-sharp IconWorkflowCircle01StrokeSharp"
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
        d={d.d12} 
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
    </TheIconWrapper>
  );
};

export const IconWorkflowCircle01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="workflow-circle-01-solid-sharp IconWorkflowCircle01SolidSharp"
    >
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfWorkflowCircle01: TheIconSelfPack = {
  name: 'WorkflowCircle01',
  StrokeRounded: IconWorkflowCircle01StrokeRounded,
  DuotoneRounded: IconWorkflowCircle01DuotoneRounded,
  TwotoneRounded: IconWorkflowCircle01TwotoneRounded,
  SolidRounded: IconWorkflowCircle01SolidRounded,
  BulkRounded: IconWorkflowCircle01BulkRounded,
  StrokeSharp: IconWorkflowCircle01StrokeSharp,
  SolidSharp: IconWorkflowCircle01SolidSharp,
};