import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M9 14L10.5858 15.8398C11.2525 16.6133 11.5858 17 12 17C12.4142 17 12.7475 16.6133 13.4142 15.8398L15 14',
  d2: 'M12 16.5V12C12 8.22876 12 6.34315 10.8284 5.17157C9.65685 4 7.77124 4 4 4H3',
  d3: 'M3 20H9',
  d4: 'M15 20H21',
  d5: 'M9 14L10.5858 15.8398C11.2525 16.6133 11.5858 17 12 17C12.4142 17 12.7475 16.6133 13.4142 15.8398L15 14M12 16.5V12C12 8.22876 12 6.34315 10.8284 5.17157C9.65685 4 7.77124 4 4 4H3',
  d6: 'M4 5C5.91389 5 7.24871 5.00213 8.25584 5.13753C9.23421 5.26907 9.7523 5.50966 10.1213 5.87868C10.4903 6.2477 10.7309 6.76579 10.8625 7.74416C10.9979 8.7513 11 10.0861 11 12V13.25H9C8.82648 13.2499 8.6521 13.3097 8.51035 13.4319C8.1966 13.7023 8.16148 14.1759 8.43192 14.4897L10.0485 16.3652C10.3552 16.7212 10.6335 17.0441 10.8905 17.2715C11.1672 17.5165 11.5264 17.75 12 17.75C12.4736 17.75 12.8329 17.5165 13.1096 17.2715C13.3665 17.0441 13.6448 16.7212 13.9515 16.3653L15.5681 14.4897C15.8385 14.1759 15.8034 13.7023 15.4897 13.4319C15.3479 13.3097 15.1735 13.2499 15 13.25H13V11.9268C13 10.1034 13 8.63362 12.8446 7.47767C12.6833 6.27752 12.3381 5.26702 11.5355 4.46447C10.733 3.66191 9.72248 3.31672 8.52233 3.15537C7.36639 2.99995 5.89664 2.99997 4.07321 3H4.07319H3C2.44772 3 2 3.44772 2 4C2 4.55229 2.44772 5 3 5H4Z',
  d7: 'M2 20C2 19.4477 2.44772 19 3 19H9C9.55228 19 10 19.4477 10 20C10 20.5523 9.55228 21 9 21H3C2.44772 21 2 20.5523 2 20Z',
  d8: 'M14 20C14 19.4477 14.4477 19 15 19H21C21.5523 19 22 19.4477 22 20C22 20.5523 21.5523 21 21 21H15C14.4477 21 14 20.5523 14 20Z',
  d9: 'M3 19.9766H9',
  d10: 'M15 19.9766H21',
  d11: 'M3.00793 3.97559H11.9236C11.9788 3.97559 12.0236 4.02036 12.0236 4.07559V16.3225M14.9976 13.9886L12.0236 16.9768L9.00689 13.9886',
  d12: 'M11 5L3 5V3L12 3C12.5523 3 13 3.44772 13 4V14.5858L14.5858 13L16 14.4142L12 18.4142L8 14.4142L9.41421 13L11 14.5858V5Z',
  d13: 'M9 21H3V19H9V21Z',
  d14: 'M21 21H15V19H21V21Z',
};

export const IconStepIntoStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="step-into-stroke-rounded IconStepIntoStrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconStepIntoDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="step-into-duotone-rounded IconStepIntoDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
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

export const IconStepIntoTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="step-into-twotone-rounded IconStepIntoTwotoneRounded"
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

export const IconStepIntoSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="step-into-solid-rounded IconStepIntoSolidRounded"
    >
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
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
    </TheIconWrapper>
  );
};

export const IconStepIntoBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="step-into-bulk-rounded IconStepIntoBulkRounded"
    >
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconStepIntoStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="step-into-stroke-sharp IconStepIntoStrokeSharp"
    >
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconStepIntoSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="step-into-solid-sharp IconStepIntoSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
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

export const iconPackOfStepInto: TheIconSelfPack = {
  name: 'StepInto',
  StrokeRounded: IconStepIntoStrokeRounded,
  DuotoneRounded: IconStepIntoDuotoneRounded,
  TwotoneRounded: IconStepIntoTwotoneRounded,
  SolidRounded: IconStepIntoSolidRounded,
  BulkRounded: IconStepIntoBulkRounded,
  StrokeSharp: IconStepIntoStrokeSharp,
  SolidSharp: IconStepIntoSolidSharp,
};