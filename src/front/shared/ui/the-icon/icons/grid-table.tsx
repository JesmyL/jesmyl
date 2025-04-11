import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28248 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28248 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088Z',
  d2: 'M2.5 9L21.5 9',
  d3: 'M2.5 15L21.5 15',
  d4: 'M16 21.5L16 2.5',
  d5: 'M8 21.5L8 2.5',
  d6: 'M3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28248 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088Z',
  d7: 'M1.5 12.0745L1.5 11.9255C1.49998 9.74957 1.49996 8.01485 1.68282 6.65471C1.87164 5.25033 2.27175 4.09653 3.18414 3.18413C4.09653 2.27174 5.25033 1.87164 6.65471 1.68282C8.01485 1.49996 9.74959 1.49997 11.9256 1.5L12.0744 1.5C14.2504 1.49997 15.9851 1.49996 17.3453 1.68282C18.7497 1.87163 19.9035 2.27174 20.8159 3.18413C21.7283 4.09652 22.1284 5.25033 22.3172 6.65471C22.5 8.01485 22.5 9.74959 22.5 11.9256L22.5 12.0744C22.5 14.2504 22.5 15.9851 22.3172 17.3453C22.1284 18.7497 21.7283 19.9035 20.8159 20.8159C19.9035 21.7283 18.7497 22.1284 17.3453 22.3172C15.9852 22.5 14.2504 22.5 12.0745 22.5L11.9255 22.5C9.74957 22.5 8.01485 22.5 6.65471 22.3172C5.25033 22.1284 4.09653 21.7283 3.18414 20.8159C2.27175 19.9035 1.87164 18.7497 1.68282 17.3453C1.49996 15.9852 1.49998 14.2504 1.5 12.0745ZM3.66499 17.0788C3.82399 18.2614 4.1195 18.9228 4.59835 19.4016C5.0772 19.8805 5.7386 20.176 6.92121 20.335C8.13258 20.4979 9.73256 20.5 12 20.5C14.2674 20.5 15.8674 20.4979 17.0788 20.335C18.2614 20.176 18.9228 19.8805 19.4017 19.4016C19.8805 18.9228 20.176 18.2614 20.335 17.0788C20.4979 15.8674 20.5 14.2674 20.5 12C20.5 9.73256 20.4979 8.13257 20.335 6.9212C20.176 5.7386 19.8805 5.0772 19.4017 4.59835C18.9228 4.11949 18.2614 3.82398 17.0788 3.66498C15.8674 3.50212 14.2674 3.5 12 3.5C9.73256 3.5 8.13258 3.50212 6.92121 3.66499C5.7386 3.82398 5.0772 4.1195 4.59835 4.59835C4.1195 5.0772 3.82399 5.7386 3.66499 6.92121C3.50212 8.13257 3.5 9.73256 3.5 12C3.5 14.2674 3.50212 15.8674 3.66499 17.0788Z',
  d8: 'M21.5 10L2.5 10L2.5 8L21.5 8L21.5 10Z',
  d9: 'M21.5 16L2.5 16L2.5 14L21.5 14L21.5 16Z',
  d10: 'M17 2.5L17 21.5L15 21.5L15 2.5L17 2.5Z',
  d11: 'M9 2.5L9 21.5L7 21.5L7 2.5L9 2.5Z',
  d12: 'M21 3H3V21H21V3Z',
  d13: 'M15 21L15 3',
  d14: 'M9 21L9 3',
  d15: 'M3 15L21 15',
  d16: 'M3 9L21 9',
  d17: 'M2 3C2 2.44772 2.44772 2 3 2H21C21.5523 2 22 2.44772 22 3V21C22 21.5523 21.5523 22 21 22H3C2.44772 22 2 21.5523 2 21V3ZM4 4V20H20V4H4Z',
  d18: 'M16 3L16 21H14L14 3H16Z',
  d19: 'M10 3L10 21H8L8 3H10Z',
  d20: 'M21 16L3 16V14L21 14V16Z',
  d21: 'M21 10L3 10V8L21 8V10Z',
};

export const IconGridTableStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="GridTable StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
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
      <path 
        d={d.d5}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconGridTableDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="GridTable DuotoneRounded"
    >
      <path 
        d={d.d6}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
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
      <path 
        d={d.d5}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconGridTableTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="GridTable TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
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
        i-c="o7 s sw"
      />
      <path 
        d={d.d5}
        i-c="o7 s sw"
      />
    </TheIconWrapper>
  );
};

export const IconGridTableSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="GridTable SolidRounded"
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

export const IconGridTableBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="GridTable BulkRounded"
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
      <path 
        d={d.d10}
        i-c="c f fr o7"
      />
      <path 
        d={d.d11}
        i-c="c f fr o7"
      />
    </TheIconWrapper>
  );
};

export const IconGridTableStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="GridTable StrokeSharp"
    >
      <path 
        d={d.d12}
        i-c="s sj sw"
      />
      <path 
        d={d.d13}
        i-c="s sw"
      />
      <path 
        d={d.d14}
        i-c="s sw"
      />
      <path 
        d={d.d15}
        i-c="s sw"
      />
      <path 
        d={d.d16}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconGridTableSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="GridTable SolidSharp"
    >
      <path 
        d={d.d17}
        i-c="c f fr"
      />
      <path 
        d={d.d18}
        i-c="c f fr"
      />
      <path 
        d={d.d19}
        i-c="c f fr"
      />
      <path 
        d={d.d20}
        i-c="c f fr"
      />
      <path 
        d={d.d21}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfGridTable: TheIconSelfPack = [
  'GridTable',
  IconGridTableStrokeRounded,
  IconGridTableDuotoneRounded,
  IconGridTableTwotoneRounded,
  IconGridTableSolidRounded,
  IconGridTableBulkRounded,
  IconGridTableStrokeSharp,
  IconGridTableSolidSharp,
];