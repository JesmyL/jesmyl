import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M11 3H21M11 9H21',
  d2: 'M3 15H21',
  d3: 'M3 21H21',
  d4: 'M3 3L4.54218 4.24227C5.84739 5.29366 6.5 5.81935 6.5 6.5C6.5 7.18065 5.84739 7.70635 4.54218 8.75773L3 10',
  d5: 'M4.54218 4.24227L3 3V10L4.54218 8.75773C5.84739 7.70635 6.5 7.18065 6.5 6.5C6.5 5.81935 5.84739 5.29366 4.54218 4.24227Z',
  d6: 'M11 9H21',
  d7: 'M11 3H21',
  d8: 'M10 3C10 2.44772 10.4477 2 11 2H21C21.5523 2 22 2.44772 22 3C22 3.55228 21.5523 4 21 4H11C10.4477 4 10 3.55228 10 3ZM10 9C10 8.44772 10.4477 8 11 8H21C21.5523 8 22 8.44772 22 9C22 9.55228 21.5523 10 21 10H11C10.4477 10 10 9.55228 10 9Z',
  d9: 'M2 15C2 14.4477 2.44772 14 3 14H21C21.5523 14 22 14.4477 22 15C22 15.5523 21.5523 16 21 16H3C2.44772 16 2 15.5523 2 15Z',
  d10: 'M2 21C2 20.4477 2.44772 20 3 20H21C21.5523 20 22 20.4477 22 21C22 21.5523 21.5523 22 21 22H3C2.44772 22 2 21.5523 2 21Z',
  d11: 'M2.22127 2.37272C2.56773 1.94262 3.19725 1.87481 3.62735 2.22127L5.16953 3.46354C5.18735 3.4779 5.20512 3.4922 5.22282 3.50646C5.8297 3.99524 6.36533 4.42663 6.73999 4.82612C7.14045 5.25312 7.50003 5.79002 7.50003 6.50003C7.50003 7.21005 7.14045 7.74695 6.73999 8.17395C6.36533 8.57344 5.8297 9.00483 5.22282 9.49361C5.20511 9.50787 5.18735 9.52217 5.16953 9.53653L3.62735 10.7788C3.19725 11.1253 2.56773 11.0575 2.22127 10.6274C1.87481 10.1973 1.94262 9.56773 2.37272 9.22127L3.9149 7.979C4.59132 7.43412 5.01415 7.09051 5.28117 6.8058C5.40675 6.6719 5.46161 6.58768 5.48516 6.54108C5.49577 6.52009 5.49868 6.5093 5.49931 6.50679C5.49979 6.50487 5.50003 6.50368 5.50003 6.50003C5.50003 6.49639 5.49979 6.4952 5.49931 6.49328C5.49868 6.49077 5.49577 6.47998 5.48516 6.45899C5.46161 6.41239 5.40675 6.32817 5.28117 6.19427C5.01415 5.90956 4.59133 5.56595 3.9149 5.02107L2.37272 3.7788C1.94262 3.43234 1.87481 2.80282 2.22127 2.37272Z',
  d12: 'M3 3L6.5 6.5L3 10',
  d13: 'M10 2H22V4H10V2ZM10 8H22V10H10V8Z',
  d14: 'M2 14H22V16H2V14Z',
  d15: 'M2 20H22V22H2V20Z',
  d16: 'M5.08586 6.50008L2.29297 3.70718L3.70718 2.29297L7.91429 6.50008L3.70718 10.7072L2.29297 9.29297L5.08586 6.50008Z',
};

export const IconTextIndentStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="TextIndent StrokeRounded"
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

export const IconTextIndentDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="TextIndent DuotoneRounded"
    >
      <path 
        d={d.d5}
        i-c="f o7"
      />
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

export const IconTextIndentTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="TextIndent TwotoneRounded"
    >
      <path 
        d={d.d6}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d7}
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
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconTextIndentSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="TextIndent SolidRounded"
    >
      <path 
        d={d.d8}
        i-c="c f fr"
      />
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
    </TheIconWrapper>
  );
};

export const IconTextIndentBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="TextIndent BulkRounded"
    >
      <path 
        d={d.d8}
        i-c="c f fr o7"
      />
      <path 
        d={d.d9}
        i-c="c f fr o7"
      />
      <path 
        d={d.d10}
        i-c="c f fr o7"
      />
      <path 
        d={d.d11}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconTextIndentStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="TextIndent StrokeSharp"
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
      <path 
        d={d.d12}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconTextIndentSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="TextIndent SolidSharp"
    >
      <path 
        d={d.d13}
        i-c="c f fr"
      />
      <path 
        d={d.d14}
        i-c="c f fr"
      />
      <path 
        d={d.d15}
        i-c="c f fr"
      />
      <path 
        d={d.d16}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfTextIndent: TheIconSelfPack = [
  'TextIndent',
  IconTextIndentStrokeRounded,
  IconTextIndentDuotoneRounded,
  IconTextIndentTwotoneRounded,
  IconTextIndentSolidRounded,
  IconTextIndentBulkRounded,
  IconTextIndentStrokeSharp,
  IconTextIndentSolidSharp,
];