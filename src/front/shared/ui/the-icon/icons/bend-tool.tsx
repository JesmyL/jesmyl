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
      the-icon="BendTool StrokeRounded"
    >
      <circle 
        cx="19"
        cy="4"
        r="2"
        i-c="s sr sw"
      />
      <circle 
        cx="5"
        cy="20"
        r="2"
        i-c="s sr sw"
      />
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconBendToolDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="BendTool DuotoneRounded"
    >
      <circle 
        cx="19"
        cy="4"
        r="2"
        i-c="f o7"
      />
      <circle 
        cx="5"
        cy="20"
        r="2"
        i-c="f o7"
      />
      <circle 
        cx="19"
        cy="4"
        r="2"
        i-c="s sr sw"
      />
      <circle 
        cx="5"
        cy="20"
        r="2"
        i-c="s sr sw"
      />
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconBendToolTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="BendTool TwotoneRounded"
    >
      <circle 
        cx="19"
        cy="4"
        r="2"
        i-c="s sr sw"
      />
      <circle 
        cx="5"
        cy="20"
        r="2"
        i-c="s sr sw"
      />
      <path 
        d={d.d1}
        i-c="o7 s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconBendToolSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="BendTool SolidRounded"
    >
      <path 
        d={d.d2}
        i-c="f"
      />
      <path 
        d={d.d3}
        i-c="f"
      />
      <path 
        d={d.d4}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconBendToolBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="BendTool BulkRounded"
    >
      <path 
        d={d.d4}
        i-c="c f fr o7"
      />
      <path 
        d={d.d2}
        i-c="f"
      />
      <path 
        d={d.d3}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconBendToolStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="BendTool StrokeSharp"
    >
      <circle 
        cx="19"
        cy="4"
        r="2"
        i-c="s sj sw"
      />
      <circle 
        cx="5"
        cy="20"
        r="2"
        i-c="s sj sw"
      />
      <path 
        d={d.d1}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconBendToolSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="BendTool SolidSharp"
    >
      <path 
        d={d.d2}
        i-c="f"
      />
      <path 
        d={d.d3}
        i-c="f"
      />
      <path 
        d={d.d5}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfBendTool: TheIconSelfPack = [
  'BendTool',
  IconBendToolStrokeRounded,
  IconBendToolDuotoneRounded,
  IconBendToolTwotoneRounded,
  IconBendToolSolidRounded,
  IconBendToolBulkRounded,
  IconBendToolStrokeSharp,
  IconBendToolSolidSharp,
];