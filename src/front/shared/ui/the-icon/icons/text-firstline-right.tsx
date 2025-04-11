import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M15 3.5H21',
  d2: 'M15 9.5H21',
  d3: 'M3 15.5H21',
  d4: 'M3 21.5H21',
  d5: 'M3.58579 9.91421C4.17157 10.5 5.11438 10.5 7 10.5C8.88562 10.5 9.82843 10.5 10.4142 9.91421C11 9.32843 11 8.38562 11 6.5C11 4.61438 11 3.67157 10.4142 3.08579C9.82843 2.5 8.88562 2.5 7 2.5C5.11438 2.5 4.17157 2.5 3.58579 3.08579C3 3.67157 3 4.61438 3 6.5C3 8.38562 3 9.32843 3.58579 9.91421Z',
  d6: 'M14 9.375C14 8.82272 14.4477 8.375 15 8.375H21C21.5523 8.375 22 8.82272 22 9.375C22 9.92728 21.5523 10.375 21 10.375H15C14.4477 10.375 14 9.92728 14 9.375Z',
  d7: 'M14 3.375C14 2.82272 14.4477 2.375 15 2.375H21C21.5523 2.375 22 2.82272 22 3.375C22 3.92728 21.5523 4.375 21 4.375H15C14.4477 4.375 14 3.92728 14 3.375Z',
  d8: 'M2 15.375C2 14.8227 2.44772 14.375 3 14.375H21C21.5523 14.375 22 14.8227 22 15.375C22 15.9273 21.5523 16.375 21 16.375H3C2.44772 16.375 2 15.9273 2 15.375Z',
  d9: 'M2 21.375C2 20.8227 2.44772 20.375 3 20.375H21C21.5523 20.375 22 20.8227 22 21.375C22 21.9273 21.5523 22.375 21 22.375H3C2.44772 22.375 2 21.9273 2 21.375Z',
  d10: 'M6.80203 1.625C7.7005 1.62497 8.44971 1.62495 9.04448 1.70491C9.67228 1.78932 10.2391 1.97499 10.6945 2.43046C11.15 2.88593 11.3357 3.45273 11.4201 4.08052C11.5001 4.6753 11.5 5.42451 11.5 6.32298V6.32301V6.427V6.42703C11.5 7.3255 11.5001 8.07471 11.4201 8.66948C11.3357 9.29728 11.15 9.86408 10.6945 10.3195C10.2391 10.775 9.67228 10.9607 9.04448 11.0451C8.44971 11.1251 7.7005 11.125 6.80203 11.125H6.802H6.69801H6.69798C5.79951 11.125 5.0503 11.1251 4.45552 11.0451C3.82773 10.9607 3.26093 10.775 2.80546 10.3195C2.34999 9.86408 2.16432 9.29728 2.07991 8.66948C1.99995 8.07471 1.99997 7.3255 2 6.42703V6.427V6.323V6.32297C1.99997 5.42451 1.99995 4.6753 2.07991 4.08052C2.16432 3.45273 2.34999 2.88593 2.80546 2.43046C3.26093 1.97499 3.82773 1.78932 4.45552 1.70491C5.0503 1.62495 5.79951 1.62497 6.69797 1.625H6.698H6.802H6.80203Z',
  d11: 'M11 2H3V10H11V2Z',
  d12: 'M14 2H22V4H14V2Z',
  d13: 'M14 8H22V10H14V8Z',
  d14: 'M2 14H22V16H2V14Z',
  d15: 'M2 20H22V22H2V20Z',
  d16: 'M2 2.75C2 2.33579 2.33579 2 2.75 2H10.75C11.1642 2 11.5 2.33579 11.5 2.75V10.75C11.5 11.1642 11.1642 11.5 10.75 11.5H2.75C2.33579 11.5 2 11.1642 2 10.75V2.75Z',
};

export const IconTextFirstlineRightStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="TextFirstlineRight StrokeRounded"
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
      <path 
        d={d.d5}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconTextFirstlineRightDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="TextFirstlineRight DuotoneRounded"
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
      <path 
        d={d.d5}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconTextFirstlineRightTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="TextFirstlineRight TwotoneRounded"
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
      <path 
        d={d.d5}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconTextFirstlineRightSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="TextFirstlineRight SolidRounded"
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
      <path 
        d={d.d10}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconTextFirstlineRightBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="TextFirstlineRight BulkRounded"
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
      <path 
        d={d.d10}
        i-c="f o7"
      />
    </TheIconWrapper>
  );
};

export const IconTextFirstlineRightStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="TextFirstlineRight StrokeSharp"
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
        d={d.d4}
        i-c="s sj ss sw"
      />
      <path 
        d={d.d11}
        i-c="s sj ss sw"
      />
    </TheIconWrapper>
  );
};

export const IconTextFirstlineRightSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="TextFirstlineRight SolidSharp"
    >
      <path 
        d={d.d12}
        i-c="c f fr"
      />
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
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfTextFirstlineRight: TheIconSelfPack = [
  'TextFirstlineRight',
  IconTextFirstlineRightStrokeRounded,
  IconTextFirstlineRightDuotoneRounded,
  IconTextFirstlineRightTwotoneRounded,
  IconTextFirstlineRightSolidRounded,
  IconTextFirstlineRightBulkRounded,
  IconTextFirstlineRightStrokeSharp,
  IconTextFirstlineRightSolidSharp,
];