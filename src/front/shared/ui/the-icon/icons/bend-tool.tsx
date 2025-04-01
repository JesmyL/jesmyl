import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M5 18C5 10 10 4 17 4',
  d2: 'M16.25 4C16.25 2.48122 17.4812 1.25 19 1.25C20.5188 1.25 21.75 2.48122 21.75 4C21.75 5.51878 20.5188 6.75 19 6.75C17.4812 6.75 16.25 5.51878 16.25 4Z',
  d3: 'M2.25 20C2.25 18.4812 3.48122 17.25 5 17.25C6.51878 17.25 7.75 18.4812 7.75 20C7.75 21.5188 6.51878 22.75 5 22.75C3.48122 22.75 2.25 21.5188 2.25 20Z',
  d4: 'M17 5C10.6985 5 6 10.3937 6 18C6 18.5523 5.55228 19 5 19C4.44772 19 4 18.5523 4 18C4 9.60627 9.3015 3 17 3C17.5523 3 18 3.44772 18 4C18 4.55228 17.5523 5 17 5Z',
  d5: 'M17 5C10.6985 5 6 10.3937 6 18H4C4 9.60627 9.3015 3 17 3V5Z',
};

export const IconBendToolStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bend-tool-stroke-rounded IconBendToolStrokeRounded"
    >
      <circle 
        cx="19" 
        cy="4" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round"></circle>
      <circle 
        cx="5" 
        cy="20" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round"></circle>
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBendToolDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bend-tool-duotone-rounded IconBendToolDuotoneRounded"
    >
      <circle 
        opacity="var(--icon-opacity)" 
        cx="19" 
        cy="4" 
        r="2" 
        fill="var(--icon-fill)"></circle>
      <circle 
        opacity="var(--icon-opacity)" 
        cx="5" 
        cy="20" 
        r="2" 
        fill="var(--icon-fill)"></circle>
      <circle 
        cx="19" 
        cy="4" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round"></circle>
      <circle 
        cx="5" 
        cy="20" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round"></circle>
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBendToolTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bend-tool-twotone-rounded IconBendToolTwotoneRounded"
    >
      <circle 
        cx="19" 
        cy="4" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round"></circle>
      <circle 
        cx="5" 
        cy="20" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round"></circle>
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBendToolSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bend-tool-solid-rounded IconBendToolSolidRounded"
    >
      <path 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
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

export const IconBendToolBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bend-tool-bulk-rounded IconBendToolBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
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

export const IconBendToolStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bend-tool-stroke-sharp IconBendToolStrokeSharp"
    >
      <circle 
        cx="19" 
        cy="4" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="5" 
        cy="20" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBendToolSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bend-tool-solid-sharp IconBendToolSolidSharp"
    >
      <path 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfBendTool: TheIconSelfPack = {
  name: 'BendTool',
  StrokeRounded: IconBendToolStrokeRounded,
  DuotoneRounded: IconBendToolDuotoneRounded,
  TwotoneRounded: IconBendToolTwotoneRounded,
  SolidRounded: IconBendToolSolidRounded,
  BulkRounded: IconBendToolBulkRounded,
  StrokeSharp: IconBendToolStrokeSharp,
  SolidSharp: IconBendToolSolidSharp,
};