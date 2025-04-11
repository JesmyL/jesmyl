import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M6 3C3.58901 4.93486 2 8.24345 2 12C2 15.7565 3.58901 19.0651 6 21',
  d2: 'M18 3C20.411 4.93486 22 8.24345 22 12C22 15.7565 20.411 19.0651 18 21',
  d3: 'M6 3C3.589 4.93486 2 8.24345 2 12C2 15.7565 3.589 19.0651 6 21M18 3C20.411 4.93486 22 8.24345 22 12C22 15.7565 20.411 19.0651 18 21',
  d4: 'M2 12C2 8.24345 3.589 4.93486 6 3M22 12C22 8.24345 20.411 4.93486 18 3',
  d5: 'M6.97489 2.21768C7.40698 2.7561 7.32078 3.54285 6.78236 3.97493C4.69665 5.64875 3.25 8.58284 3.25 12C3.25 15.4172 4.69665 18.3513 6.78236 20.0252C7.32078 20.4572 7.40698 21.244 6.97489 21.7824C6.5428 22.3208 5.75605 22.407 5.21764 21.9749C2.48136 19.779 0.75 16.0959 0.75 12C0.75 7.90415 2.48136 4.22105 5.21764 2.02516C5.75605 1.59307 6.5428 1.67927 6.97489 2.21768Z',
  d6: 'M17.0251 2.21768C16.593 2.7561 16.6792 3.54285 17.2176 3.97493C19.3034 5.64875 20.75 8.58284 20.75 12C20.75 15.4172 19.3034 18.3513 17.2176 20.0252C16.6792 20.4572 16.593 21.244 17.0251 21.7824C17.4572 22.3208 18.2439 22.407 18.7824 21.9749C21.5186 19.779 23.25 16.0959 23.25 12C23.25 7.90415 21.5186 4.22105 18.7824 2.02516C18.2439 1.59307 17.4572 1.67927 17.0251 2.21768Z',
  d7: 'M18.2819 2C21.0182 4.1959 22.7496 7.90439 22.7496 12.0003C22.7496 16.0962 20.9934 19.8041 18.2571 22L16.6924 20.0502C18.7781 18.3764 20.2496 15.4175 20.2496 12.0003C20.2496 8.58308 18.8029 5.6236 16.7172 3.94978L18.2819 2Z',
  d8: 'M5.71764 2C2.98136 4.1959 1.25 7.90439 1.25 12.0003C1.25 16.0962 3.0062 19.8041 5.74247 22L7.30719 20.0502C5.22148 18.3764 3.75 15.4175 3.75 12.0003C3.75 8.58308 5.19665 5.6236 7.28236 3.94978L5.71764 2Z',
};

export const Icon1stBracketStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="1stBracket StrokeRounded"
    >
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

export const Icon1stBracketDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="1stBracket DuotoneRounded"
    >
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

export const Icon1stBracketTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="1stBracket TwotoneRounded"
    >
      <path 
        d={d.d3}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const Icon1stBracketSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="1stBracket SolidRounded"
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

export const Icon1stBracketBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="1stBracket BulkRounded"
    >
      <path 
        d={d.d5}
        i-c="c f fr"
      />
      <path 
        d={d.d6}
        i-c="c f fr o7"
      />
    </TheIconWrapper>
  );
};

export const Icon1stBracketStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="1stBracket StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sj sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const Icon1stBracketSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="1stBracket SolidSharp"
    >
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

export const iconPackOf1stBracket: TheIconSelfPack = [
  '1stBracket',
  Icon1stBracketStrokeRounded,
  Icon1stBracketDuotoneRounded,
  Icon1stBracketTwotoneRounded,
  Icon1stBracketSolidRounded,
  Icon1stBracketBulkRounded,
  Icon1stBracketStrokeSharp,
  Icon1stBracketSolidSharp,
];