import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M11.9959 12H12.0049',
  d2: 'M17.9998 12H18.0088',
  d3: 'M5.99981 12H6.00879',
  d4: 'M10.2461 12C10.2461 11.0335 11.0296 10.25 11.9961 10.25H12.0051C12.9716 10.25 13.7551 11.0335 13.7551 12C13.7551 12.9665 12.9716 13.75 12.0051 13.75H11.9961C11.0296 13.75 10.2461 12.9665 10.2461 12Z',
  d5: 'M16.25 12C16.25 11.0335 17.0335 10.25 18 10.25H18.009C18.9755 10.25 19.759 11.0335 19.759 12C19.759 12.9665 18.9755 13.75 18.009 13.75H18C17.0335 13.75 16.25 12.9665 16.25 12Z',
  d6: 'M4.25 12C4.25 11.0335 5.0335 10.25 6 10.25H6.00898C6.97548 10.25 7.75898 11.0335 7.75898 12C7.75898 12.9665 6.97548 13.75 6.00898 13.75H6C5.0335 13.75 4.25 12.9665 4.25 12Z',
  d7: 'M10.4912 10.5H13.5002V13.5H10.4912V10.5Z',
  d8: 'M16.4912 10.5H19.5002V13.5H16.4912V10.5Z',
  d9: 'M4.5 10.5H7.50898V13.5H4.5V10.5Z',
};

export const IconMoreHorizontalStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MoreHorizontal StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconMoreHorizontalDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MoreHorizontal DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconMoreHorizontalTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MoreHorizontal TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconMoreHorizontalSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MoreHorizontal SolidRounded"
    >
      <path 
        d={d.d4}
        i-c="c f fr"
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

export const IconMoreHorizontalBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MoreHorizontal BulkRounded"
    >
      <path 
        d={d.d4}
        i-c="c f fr o7"
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

export const IconMoreHorizontalStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MoreHorizontal StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sj ss sw"
      />
      <path 
        d={d.d2}
        i-c="s sj ss sw"
      />
      <path 
        d={d.d3}
        i-c="s sj ss sw"
      />
    </TheIconWrapper>
  );
};

export const IconMoreHorizontalSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MoreHorizontal SolidSharp"
    >
      <path 
        d={d.d7}
        i-c="c f fr"
      />
      <path 
        d={d.d8}
        i-c="c f fr"
      />
      <path 
        d={d.d9}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfMoreHorizontal: TheIconSelfPack = [
  'MoreHorizontal',
  IconMoreHorizontalStrokeRounded,
  IconMoreHorizontalDuotoneRounded,
  IconMoreHorizontalTwotoneRounded,
  IconMoreHorizontalSolidRounded,
  IconMoreHorizontalBulkRounded,
  IconMoreHorizontalStrokeSharp,
  IconMoreHorizontalSolidSharp,
];