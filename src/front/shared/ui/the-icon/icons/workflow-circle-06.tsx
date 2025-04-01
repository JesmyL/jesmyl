import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M9 5C9 6.65685 7.65685 8 6 8C4.34315 8 3 6.65685 3 5C3 3.34315 4.34315 2 6 2C7.65685 2 9 3.34315 9 5Z',
  d2: 'M21 14C21 15.6569 19.6569 17 18 17C16.3431 17 15 15.6569 15 14C15 12.3431 16.3431 11 18 11C19.6569 11 21 12.3431 21 14Z',
  d3: 'M9 19C9 20.6569 7.65685 22 6 22C4.34315 22 3 20.6569 3 19C3 17.3431 4.34315 16 6 16C7.65685 16 9 17.3431 9 19Z',
  d4: 'M6 8V16',
  d5: 'M15 14H12C8.68629 14 6 11.3137 6 8',
  d6: 'M6.75 8C6.75 7.58579 6.41421 7.25 6 7.25C5.58579 7.25 5.25 7.58579 5.25 8H6.75ZM5.25 16C5.25 16.4142 5.58579 16.75 6 16.75C6.41421 16.75 6.75 16.4142 6.75 16H5.25ZM15 14.75C15.4142 14.75 15.75 14.4142 15.75 14C15.75 13.5858 15.4142 13.25 15 13.25V14.75ZM5.25 8V16H6.75V8H5.25ZM12 14.75H15V13.25H12V14.75ZM5.25 8C5.25 11.7279 8.27208 14.75 12 14.75V13.25C9.10051 13.25 6.75 10.8995 6.75 8H5.25Z',
  d7: 'M6 7C6.55228 7 7 7.44772 7 8C7 10.7614 9.23858 13 12 13H15C15.5523 13 16 13.4477 16 14C16 14.5523 15.5523 15 15 15H12C10.0413 15 8.27052 14.1955 7 12.899V16C7 16.5523 6.55228 17 6 17C5.44772 17 5 16.5523 5 16V8C5 7.44772 5.44772 7 6 7Z',
  d8: 'M2.25 5C2.25 2.92893 3.92893 1.25 6 1.25C8.07107 1.25 9.75 2.92893 9.75 5C9.75 7.07107 8.07107 8.75 6 8.75C3.92893 8.75 2.25 7.07107 2.25 5Z',
  d9: 'M14.25 14C14.25 11.9289 15.9289 10.25 18 10.25C20.0711 10.25 21.75 11.9289 21.75 14C21.75 16.0711 20.0711 17.75 18 17.75C15.9289 17.75 14.25 16.0711 14.25 14Z',
  d10: 'M2.25 19C2.25 16.9289 3.92893 15.25 6 15.25C8.07107 15.25 9.75 16.9289 9.75 19C9.75 21.0711 8.07107 22.75 6 22.75C3.92893 22.75 2.25 21.0711 2.25 19Z',
  d11: 'M5 15.3853C5.31836 15.2974 5.6537 15.2505 6 15.2505C6.3463 15.2505 6.68164 15.2974 7 15.3853V12.8995C8.27052 14.196 10.0413 15.0005 12 15.0005H14.3848C14.2969 14.6821 14.25 14.3468 14.25 14.0005C14.25 13.6542 14.2969 13.3188 14.3848 13.0005H12C9.44335 13.0005 7.33488 11.0816 7.03623 8.60547C6.70712 8.6999 6.35947 8.75047 6 8.75047C5.6537 8.75047 5.31836 8.70353 5 8.61567V15.3853Z',
  d12: 'M6 7C6.55228 7 7 7.44772 7 8C7 10.7614 9.23858 13 12 13H15V15H12C10.0413 15 8.27052 14.1955 7 12.899V16H5V8C5 7.44772 5.44772 7 6 7Z',
};

export const IconWorkflowCircle06StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="workflow-circle-06-stroke-rounded IconWorkflowCircle06StrokeRounded"
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

export const IconWorkflowCircle06DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="workflow-circle-06-duotone-rounded IconWorkflowCircle06DuotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconWorkflowCircle06TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="workflow-circle-06-twotone-rounded IconWorkflowCircle06TwotoneRounded"
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
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconWorkflowCircle06SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="workflow-circle-06-solid-rounded IconWorkflowCircle06SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
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

export const IconWorkflowCircle06BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="workflow-circle-06-bulk-rounded IconWorkflowCircle06BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconWorkflowCircle06StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="workflow-circle-06-stroke-sharp IconWorkflowCircle06StrokeSharp"
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
    </TheIconWrapper>
  );
};

export const IconWorkflowCircle06SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="workflow-circle-06-solid-sharp IconWorkflowCircle06SolidSharp"
    >
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfWorkflowCircle06: TheIconSelfPack = {
  name: 'WorkflowCircle06',
  StrokeRounded: IconWorkflowCircle06StrokeRounded,
  DuotoneRounded: IconWorkflowCircle06DuotoneRounded,
  TwotoneRounded: IconWorkflowCircle06TwotoneRounded,
  SolidRounded: IconWorkflowCircle06SolidRounded,
  BulkRounded: IconWorkflowCircle06BulkRounded,
  StrokeSharp: IconWorkflowCircle06StrokeSharp,
  SolidSharp: IconWorkflowCircle06SolidSharp,
};