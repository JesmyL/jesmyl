import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M4 8H20',
  d2: 'M4 16H20',
  d3: 'M2.75 8C2.75 7.30964 3.30964 6.75 4 6.75H20C20.6904 6.75 21.25 7.30964 21.25 8C21.25 8.69036 20.6904 9.25 20 9.25H4C3.30964 9.25 2.75 8.69036 2.75 8Z',
  d4: 'M2.75 16C2.75 15.3096 3.30964 14.75 4 14.75H20C20.6904 14.75 21.25 15.3096 21.25 16C21.25 16.6904 20.6904 17.25 20 17.25H4C3.30964 17.25 2.75 16.6904 2.75 16Z',
  d5: 'M20 9.25H4V6.75H20V9.25Z',
  d6: 'M20 17.25H4V14.75H20V17.25Z',
};

export const IconEqualSignStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="EqualSign StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconEqualSignDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="EqualSign DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sr sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconEqualSignTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="EqualSign TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconEqualSignSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="EqualSign SolidRounded"
    >
      <path 
        d={d.d3}
        i-c="c f fr"
      />
      <path 
        d={d.d4}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconEqualSignBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="EqualSign BulkRounded"
    >
      <path 
        d={d.d3}
        i-c="c f fr o7"
      />
      <path 
        d={d.d4}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconEqualSignStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="EqualSign StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconEqualSignSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="EqualSign SolidSharp"
    >
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

export const iconPackOfEqualSign: TheIconSelfPack = [
  'EqualSign',
  IconEqualSignStrokeRounded,
  IconEqualSignDuotoneRounded,
  IconEqualSignTwotoneRounded,
  IconEqualSignSolidRounded,
  IconEqualSignBulkRounded,
  IconEqualSignStrokeSharp,
  IconEqualSignSolidSharp,
];