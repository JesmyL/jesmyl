import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2.5 12L21.5002 12',
  d2: 'M2.5 12L12.0001 12',
  d3: 'M21.5001 12L12 12',
  d4: 'M1.5 12C1.5 11.4477 1.94772 11 2.5 11L21.5002 11C22.0524 11 22.5002 11.4477 22.5002 12C22.5002 12.5523 22.0524 13 21.5002 13L2.5 13C1.94772 13 1.5 12.5523 1.5 12Z',
  d5: 'M21.5001 11C22.0524 11 22.5001 11.4477 22.5001 12C22.5001 12.5523 22.0524 13 21.5001 13L12 13L12 11L21.5001 11Z',
  d6: 'M1.5 12C1.5 11.4477 1.94772 11 2.5 11L12.0001 11L12.0001 13L2.5 13C1.94772 13 1.5 12.5523 1.5 12Z',
  d7: 'M3 12H21',
  d8: 'M21 13L3 13L3 11L21 11L21 13Z',
};

export const IconSolidLine01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SolidLine01 StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconSolidLine01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SolidLine01 DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconSolidLine01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SolidLine01 TwotoneRounded"
    >
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconSolidLine01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SolidLine01 SolidRounded"
    >
      <path 
        d={d.d4}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconSolidLine01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SolidLine01 BulkRounded"
    >
      <path 
        d={d.d5}
        i-c="f o7"
      />
      <path 
        d={d.d6}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconSolidLine01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SolidLine01 StrokeSharp"
    >
      <path 
        d={d.d7}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconSolidLine01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SolidLine01 SolidSharp"
    >
      <path 
        d={d.d8}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfSolidLine01: TheIconSelfPack = [
  'SolidLine01',
  IconSolidLine01StrokeRounded,
  IconSolidLine01DuotoneRounded,
  IconSolidLine01TwotoneRounded,
  IconSolidLine01SolidRounded,
  IconSolidLine01BulkRounded,
  IconSolidLine01StrokeSharp,
  IconSolidLine01SolidSharp,
];