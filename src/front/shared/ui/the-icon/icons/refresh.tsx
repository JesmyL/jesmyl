import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M20.0092 2V5.13219C20.0092 5.42605 19.6418 5.55908 19.4537 5.33333C17.6226 3.2875 14.9617 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12',
  d2: 'M12 22C17.5228 22 22 17.5228 22 12C22 8.4 20.3025 6.05556 19.4537 5.33333C17.6226 3.2875 14.9617 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z',
  d3: 'M20 2V5.13219C20 5.42605 19.6328 5.55908 19.4447 5.33333C17.6146 3.2875 14.955 2 11.9949 2C6.47485 2 2 6.47715 2 12C2 17.5228 6.47485 22 11.9949 22',
  d4: 'M12 3.20455C7.1424 3.20455 3.20455 7.1424 3.20455 12C3.20455 16.8576 7.1424 20.7955 12 20.7955C16.8576 20.7955 20.7955 16.8576 20.7955 12C20.7955 11.4603 21.233 11.0227 21.7727 11.0227C22.3125 11.0227 22.75 11.4603 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C14.1254 1.25 16.1072 1.86735 17.7751 2.93159L19 1.70668C19.173 1.43228 19.4788 1.25 19.8272 1.25C20.367 1.25 20.8045 1.68754 20.8045 2.22727V5.28828C20.8045 6.48198 19.3213 7.02646 18.548 6.12763C16.9364 4.33189 14.6005 3.20455 12 3.20455Z',
  d5: 'M12 3.20455C7.1424 3.20455 3.20455 7.1424 3.20455 12C3.20455 13.6803 3.67571 15.2505 4.49314 16.5858L2.97639 17.845C1.88429 16.1625 1.25 14.1553 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C14.1254 1.25 16.1072 1.86735 17.7751 2.93159L19 1.70668C19.173 1.43228 19.4788 1.25 19.8272 1.25C20.367 1.25 20.8045 1.68754 20.8045 2.22727V5.28828C20.8045 6.48198 19.3213 7.02646 18.548 6.12763C16.9364 4.33189 14.6005 3.20455 12 3.20455Z',
  d6: 'M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C15.2716 2 18.1763 3.57111 20.0007 6V2',
  d7: 'M12 3.20455C7.1424 3.20455 3.20455 7.1424 3.20455 12C3.20455 16.8576 7.1424 20.7955 12 20.7955C16.8576 20.7955 20.7955 16.8576 20.7955 12H22.75C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C14.5994 1.25 16.9834 2.17319 18.8416 3.70792V2.22727H20.7962V6.13636C20.7962 6.55688 20.5272 6.93025 20.1283 7.06337C19.7294 7.1965 19.2901 7.05952 19.0375 6.72329C17.4312 4.58477 14.8769 3.20455 12 3.20455Z',
};

export const IconRefreshStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Refresh StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconRefreshDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Refresh DuotoneRounded"
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

export const IconRefreshTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Refresh TwotoneRounded"
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

export const IconRefreshSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Refresh SolidRounded"
    >
      <path 
        d={d.d4}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconRefreshBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Refresh BulkRounded"
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

export const IconRefreshStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Refresh StrokeSharp"
    >
      <path 
        d={d.d6}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconRefreshSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Refresh SolidSharp"
    >
      <path 
        d={d.d7}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfRefresh: TheIconSelfPack = [
  'Refresh',
  IconRefreshStrokeRounded,
  IconRefreshDuotoneRounded,
  IconRefreshTwotoneRounded,
  IconRefreshSolidRounded,
  IconRefreshBulkRounded,
  IconRefreshStrokeSharp,
  IconRefreshSolidSharp,
];