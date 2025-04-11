import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M13 3H21',
  d2: 'M13 9H21',
  d3: 'M3 15H21',
  d4: 'M3 21H21',
  d5: 'M12 3C12 2.44772 12.4477 2 13 2H21C21.5523 2 22 2.44772 22 3C22 3.55228 21.5523 4 21 4H13C12.4477 4 12 3.55228 12 3Z',
  d6: 'M12 9C12 8.44772 12.4477 8 13 8H21C21.5523 8 22 8.44772 22 9C22 9.55228 21.5523 10 21 10H13C12.4477 10 12 9.55228 12 9Z',
  d7: 'M2 15C2 14.4477 2.44772 14 3 14H21C21.5523 14 22 14.4477 22 15C22 15.5523 21.5523 16 21 16H3C2.44772 16 2 15.5523 2 15Z',
  d8: 'M2 21C2 20.4477 2.44772 20 3 20H21C21.5523 20 22 20.4477 22 21C22 21.5523 21.5523 22 21 22H3C2.44772 22 2 21.5523 2 21Z',
  d9: 'M21 4H13V2H21V4Z',
  d10: 'M21 10H13V8H21V10Z',
  d11: 'M21 16H3V14H21V16Z',
  d12: 'M21 22H3V20H21V22Z',
};

export const IconTextAlignJustifyRightStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="TextAlignJustifyRight StrokeRounded"
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
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconTextAlignJustifyRightDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="TextAlignJustifyRight DuotoneRounded"
    >
      <g    i-c="o7">
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
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
      </g>
    </TheIconWrapper>
  );
};

export const IconTextAlignJustifyRightTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="TextAlignJustifyRight TwotoneRounded"
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
        i-c="s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconTextAlignJustifyRightSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="TextAlignJustifyRight SolidRounded"
    >
      <path 
        d={d.d5}
        i-c="c f fr"
      />
      <path 
        d={d.d6}
        i-c="c f fr"
      />
      <path 
        d={d.d7}
        i-c="c f fr"
      />
      <path 
        d={d.d8}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconTextAlignJustifyRightBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="TextAlignJustifyRight BulkRounded"
    >
      <path 
        d={d.d5}
        i-c="c f fr o7"
      />
      <path 
        d={d.d6}
        i-c="c f fr"
      />
      <path 
        d={d.d7}
        i-c="c f fr o7"
      />
      <path 
        d={d.d8}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconTextAlignJustifyRightStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="TextAlignJustifyRight StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sj sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconTextAlignJustifyRightSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="TextAlignJustifyRight SolidSharp"
    >
      <path 
        d={d.d9}
        i-c="c f fr"
      />
      <path 
        d={d.d10}
        i-c="c f fr"
      />
      <path 
        d={d.d11}
        i-c="c f fr"
      />
      <path 
        d={d.d12}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfTextAlignJustifyRight: TheIconSelfPack = [
  'TextAlignJustifyRight',
  IconTextAlignJustifyRightStrokeRounded,
  IconTextAlignJustifyRightDuotoneRounded,
  IconTextAlignJustifyRightTwotoneRounded,
  IconTextAlignJustifyRightSolidRounded,
  IconTextAlignJustifyRightBulkRounded,
  IconTextAlignJustifyRightStrokeSharp,
  IconTextAlignJustifyRightSolidSharp,
];