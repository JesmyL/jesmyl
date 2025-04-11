import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M7 2V22',
  d2: 'M17 2V22',
  d3: 'M22 7L2 7',
  d4: 'M22 17L2 17',
  d5: 'M7 17H17V7H7V17Z',
  d6: 'M7 1C7.55228 1 8 1.44772 8 2V22C8 22.5523 7.55228 23 7 23C6.44772 23 6 22.5523 6 22V2C6 1.44772 6.44772 1 7 1Z',
  d7: 'M17 1C17.5523 1 18 1.44772 18 2V22C18 22.5523 17.5523 23 17 23C16.4477 23 16 22.5523 16 22V2C16 1.44772 16.4477 1 17 1Z',
  d8: 'M23 7C23 7.55228 22.5523 8 22 8L2 8C1.44771 8 1 7.55228 1 7C1 6.44771 1.44771 6 2 6L22 6C22.5523 6 23 6.44772 23 7Z',
  d9: 'M23 17C23 17.5523 22.5523 18 22 18L2 18C1.44771 18 1 17.5523 1 17C1 16.4477 1.44771 16 2 16L22 16C22.5523 16 23 16.4477 23 17Z',
  d10: 'M6 2V6L2 6V8H6V16H2V18H6V22H8V18L16 18V22H18V18H22V16H18V8H22V6L18 6V2H16V6L8 6V2H6ZM16 16V8H8V16L16 16Z',
};

export const IconGridStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Grid StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconGridDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Grid DuotoneRounded"
    >
      <path 
        d={d.d5}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconGridTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Grid TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sr sw"
      />
      <path 
        d={d.d3}
        i-c="o7 s sr sw"
      />
      <path 
        d={d.d4}
        i-c="o7 s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconGridSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Grid SolidRounded"
    >
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
      <path 
        d={d.d9}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconGridBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Grid BulkRounded"
    >
      <path 
        d={d.d6}
        i-c="c f fr o7"
      />
      <path 
        d={d.d7}
        i-c="c f fr o7"
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

export const IconGridStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Grid StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="s sw"
      />
      <path 
        d={d.d3}
        i-c="s sw"
      />
      <path 
        d={d.d4}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconGridSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Grid SolidSharp"
    >
      <path 
        d={d.d10}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfGrid: TheIconSelfPack = [
  'Grid',
  IconGridStrokeRounded,
  IconGridDuotoneRounded,
  IconGridTwotoneRounded,
  IconGridSolidRounded,
  IconGridBulkRounded,
  IconGridStrokeSharp,
  IconGridSolidSharp,
];