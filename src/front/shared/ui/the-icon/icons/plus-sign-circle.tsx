import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 8V16M16 12H8',
  d2: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM13 8C13 7.44772 12.5523 7 12 7C11.4477 7 11 7.44772 11 8V11H8C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13H11V16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16V13H16C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11H13V8Z',
  d3: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z',
  d4: 'M12 7C12.5523 7 13 7.44772 13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V13H8C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H11V8C11 7.44772 11.4477 7 12 7Z',
  d5: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM11 8V11H8V13H11V16H13V13H16V11H13V8H11Z',
};

export const IconPlusSignCircleStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="PlusSignCircle StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconPlusSignCircleDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="PlusSignCircle DuotoneRounded"
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
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconPlusSignCircleTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="PlusSignCircle TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
      />
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconPlusSignCircleSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="PlusSignCircle SolidRounded"
    >
      <path 
        d={d.d2}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconPlusSignCircleBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="PlusSignCircle BulkRounded"
    >
      <path 
        d={d.d3}
        i-c="f o7"
      />
      <path 
        d={d.d4}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconPlusSignCircleStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="PlusSignCircle StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sj sw"
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

export const IconPlusSignCircleSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="PlusSignCircle SolidSharp"
    >
      <path 
        d={d.d5}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfPlusSignCircle: TheIconSelfPack = [
  'PlusSignCircle',
  IconPlusSignCircleStrokeRounded,
  IconPlusSignCircleDuotoneRounded,
  IconPlusSignCircleTwotoneRounded,
  IconPlusSignCircleSolidRounded,
  IconPlusSignCircleBulkRounded,
  IconPlusSignCircleStrokeSharp,
  IconPlusSignCircleSolidSharp,
];