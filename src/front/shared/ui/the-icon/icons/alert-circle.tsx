import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M11.992 15H12.001',
  d2: 'M12 12L12 8',
  d3: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM11 16C11 15.4477 11.4457 15 11.9955 15H12.0045C12.5543 15 13 15.4477 13 16C13 16.5523 12.5543 17 12.0045 17H11.9955C11.4457 17 11 16.5523 11 16ZM11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12V8C13 7.44772 12.5523 7 12 7C11.4477 7 11 7.44772 11 8V12Z',
  d4: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z',
  d5: 'M11 16C11 15.4477 11.4457 15 11.9955 15H12.0045C12.5543 15 13 15.4477 13 16C13 16.5523 12.5543 17 12.0045 17H11.9955C11.4457 17 11 16.5523 11 16Z',
  d6: 'M12 13C11.4477 13 11 12.5523 11 12L11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8L13 12C13 12.5523 12.5523 13 12 13Z',
  d7: 'M12 14L12 7M12 15.5L12 17',
  d8: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM13 17V15H11V17H13ZM13 13V7H11V13H13Z',
};

export const IconAlertCircleStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="AlertCircle StrokeRounded"
    >
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sw"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconAlertCircleDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="AlertCircle DuotoneRounded"
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
        i-c="s sw"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconAlertCircleTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="AlertCircle TwotoneRounded"
    >
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sw"
      />
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconAlertCircleSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="AlertCircle SolidRounded"
    >
      <path 
        d={d.d3}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconAlertCircleBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="AlertCircle BulkRounded"
    >
      <path 
        d={d.d4}
        i-c="f o7"
      />
      <path 
        d={d.d5}
        i-c="c f fr"
      />
      <path 
        d={d.d6}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconAlertCircleStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="AlertCircle StrokeSharp"
    >
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sj sw"
      />
      <path 
        d={d.d7}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconAlertCircleSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="AlertCircle SolidSharp"
    >
      <path 
        d={d.d8}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfAlertCircle: TheIconSelfPack = [
  'AlertCircle',
  IconAlertCircleStrokeRounded,
  IconAlertCircleDuotoneRounded,
  IconAlertCircleTwotoneRounded,
  IconAlertCircleSolidRounded,
  IconAlertCircleBulkRounded,
  IconAlertCircleStrokeSharp,
  IconAlertCircleSolidSharp,
];