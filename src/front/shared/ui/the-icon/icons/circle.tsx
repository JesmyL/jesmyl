import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2',
  d2: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z',
  d3: 'M22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C8.54264 22.75 5.46649 21.1179 3.5 18.5821L20.563 5.5C21.9354 7.30516 22.75 9.55745 22.75 12Z',
};

export const IconCircleStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Circle StrokeRounded"
    >
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconCircleDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Circle DuotoneRounded"
    >
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="f o7"
      />
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconCircleTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Circle TwotoneRounded"
    >
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="o7 s sj sw"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconCircleSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Circle SolidRounded"
    >
      <path 
        d={d.d2}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconCircleBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Circle BulkRounded"
    >
      <path 
        d={d.d2}
        i-c="c f fr o7"
      />
      <path 
        d={d.d3}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconCircleStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Circle StrokeSharp"
    >
      <circle 
        cx="12"
        cy="12.0001"
        r="10"
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconCircleSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Circle SolidSharp"
    >
      <path 
        d={d.d2}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfCircle: TheIconSelfPack = [
  'Circle',
  IconCircleStrokeRounded,
  IconCircleDuotoneRounded,
  IconCircleTwotoneRounded,
  IconCircleSolidRounded,
  IconCircleBulkRounded,
  IconCircleStrokeSharp,
  IconCircleSolidSharp,
];