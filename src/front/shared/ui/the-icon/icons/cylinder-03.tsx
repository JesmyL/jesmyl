import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M22 19C22 20.6569 17.5228 22 12 22C6.47715 22 2 20.6569 2 19C2 17.3431 6.47715 16 12 16C17.5228 16 22 17.3431 22 19Z',
  d2: 'M22 5C22 6.65685 17.5228 8 12 8C6.47715 8 2 6.65685 2 5C2 3.34315 6.47715 2 12 2C17.5228 2 22 3.34315 22 5Z',
  d3: 'M22 5V19M2 5V19',
  d4: 'M4.71342 16.1603C6.61061 15.5912 9.18662 15.25 12 15.25C14.8134 15.25 17.3894 15.5912 19.2866 16.1603C20.2304 16.4435 21.0488 16.7955 21.648 17.2205C22.2278 17.6317 22.75 18.2222 22.75 19C22.75 19.7778 22.2278 20.3683 21.648 20.7795C21.0488 21.2045 20.2304 21.5565 19.2866 21.8397C17.3894 22.4088 14.8134 22.75 12 22.75C9.18662 22.75 6.61061 22.4088 4.71342 21.8397C3.7696 21.5565 2.95117 21.2045 2.35195 20.7795C1.77222 20.3683 1.25 19.7778 1.25 19C1.25 18.2222 1.77222 17.6317 2.35195 17.2205C2.95117 16.7955 3.7696 16.4435 4.71342 16.1603Z',
  d5: 'M4.71342 2.16031C6.61061 1.59115 9.18662 1.25 12 1.25C14.8134 1.25 17.3894 1.59115 19.2866 2.16031C20.2304 2.44346 21.0488 2.79551 21.648 3.22052C22.2278 3.63171 22.75 4.22218 22.75 5C22.75 5.77782 22.2278 6.36829 21.648 6.77948C21.0488 7.20449 20.2304 7.55654 19.2866 7.83969C17.3894 8.40885 14.8134 8.75 12 8.75C9.18662 8.75 6.61061 8.40885 4.71342 7.83969C3.7696 7.55654 2.95117 7.20449 2.35195 6.77948C1.77222 6.36829 1.25 5.77782 1.25 5C1.25 4.22218 1.77222 3.63171 2.35195 3.22052C2.95117 2.79551 3.7696 2.44346 4.71342 2.16031Z',
  d6: 'M2.25 4C2.80228 4 3.25 4.44772 3.25 5V19C3.25 19.5523 2.80228 20 2.25 20C1.69772 20 1.25 19.5523 1.25 19V5C1.25 4.44772 1.69772 4 2.25 4ZM21.75 4C22.3023 4 22.75 4.44772 22.75 5V19C22.75 19.5523 22.3023 20 21.75 20C21.1977 20 20.75 19.5523 20.75 19V5C20.75 4.44772 21.1977 4 21.75 4Z',
  d7: 'M1.25 19V5H3.25V19H1.25ZM20.75 19V5H22.75V19H20.75Z',
};

export const IconCylinder03StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cylinder-03-stroke-rounded IconCylinder03StrokeRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconCylinder03DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cylinder-03-duotone-rounded IconCylinder03DuotoneRounded"
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
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        fill="var(--icon-fill)" 
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
      />
    </TheIconWrapper>
  );
};

export const IconCylinder03TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cylinder-03-twotone-rounded IconCylinder03TwotoneRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconCylinder03SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cylinder-03-solid-rounded IconCylinder03SolidRounded"
    >
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
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

export const IconCylinder03BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cylinder-03-bulk-rounded IconCylinder03BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCylinder03StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cylinder-03-stroke-sharp IconCylinder03StrokeSharp"
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
    </TheIconWrapper>
  );
};

export const IconCylinder03SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cylinder-03-solid-sharp IconCylinder03SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfCylinder03: TheIconSelfPack = {
  name: 'Cylinder03',
  StrokeRounded: IconCylinder03StrokeRounded,
  DuotoneRounded: IconCylinder03DuotoneRounded,
  TwotoneRounded: IconCylinder03TwotoneRounded,
  SolidRounded: IconCylinder03SolidRounded,
  BulkRounded: IconCylinder03BulkRounded,
  StrokeSharp: IconCylinder03StrokeSharp,
  SolidSharp: IconCylinder03SolidSharp,
};