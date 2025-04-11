import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M20.0092 2V5.13219C20.0092 5.42605 19.6418 5.55908 19.4537 5.33333C17.6226 3.2875 14.9617 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12',
  d2: 'M12 22C17.5228 22 22 17.5228 22 12C22 8.4 20.3025 6.05556 19.4537 5.33333C17.6226 3.2875 14.9617 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z',
  d3: 'M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2',
  d4: 'M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 11.4477 21.4477 11 22 11C22.5523 11 23 11.4477 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C14.1684 1 16.1907 1.62798 17.8942 2.71104L19.2221 1.38318C19.4052 1.14988 19.6897 1 20.0092 1C20.5615 1 21.0092 1.44772 21.0092 2V5.13219C21.0092 6.35366 19.4915 6.91079 18.7003 5.99107C17.0512 4.15356 14.661 3 12 3Z',
  d5: 'M12 3C7.02944 3 3 7.02944 3 12C3 14.4153 3.95145 16.6084 5.5 18.225L4 19.5499C2.14015 17.5799 1 14.9231 1 12C1 5.92487 5.92487 1 12 1C14.1684 1 16.1907 1.62798 17.8942 2.71104L19.2221 1.38318C19.4052 1.14988 19.6897 1 20.0092 1C20.5615 1 21.0092 1.44772 21.0092 2V5.13219C21.0092 6.35366 19.4915 6.91079 18.7003 5.99107C17.0512 4.15356 14.661 3 12 3Z',
  d6: 'M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C15.2716 2 18.1763 3.57111 20.0007 6V2',
  d7: 'M12 3.20455C7.1424 3.20455 3.20455 7.1424 3.20455 12C3.20455 16.8576 7.1424 20.7955 12 20.7955C16.8576 20.7955 20.7955 16.8576 20.7955 12H22.75C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C14.5994 1.25 16.9834 2.17319 18.8416 3.70792V2.22727H20.7962V6.13636C20.7962 6.55688 20.5272 6.93025 20.1283 7.06337C19.7294 7.1965 19.2901 7.05952 19.0375 6.72329C17.4312 4.58477 14.8769 3.20455 12 3.20455Z',
};

export const IconRotate01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Rotate01 StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconRotate01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Rotate01 DuotoneRounded"
    >
      <path 
        d={d.d2}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconRotate01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Rotate01 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconRotate01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Rotate01 SolidRounded"
    >
      <path 
        d={d.d4}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconRotate01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Rotate01 BulkRounded"
    >
      <path 
        d={d.d4}
        i-c="f o7"
      />
      <path 
        d={d.d5}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconRotate01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Rotate01 StrokeSharp"
    >
      <path 
        d={d.d6}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconRotate01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Rotate01 SolidSharp"
    >
      <path 
        d={d.d7}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfRotate01: TheIconSelfPack = [
  'Rotate01',
  IconRotate01StrokeRounded,
  IconRotate01DuotoneRounded,
  IconRotate01TwotoneRounded,
  IconRotate01SolidRounded,
  IconRotate01BulkRounded,
  IconRotate01StrokeSharp,
  IconRotate01SolidSharp,
];