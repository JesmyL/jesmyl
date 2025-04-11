import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M21 14C21 15.4001 21 16.1002 20.7275 16.635C20.4878 17.1054 20.1054 17.4878 19.635 17.7275C19.1002 18 18.4001 18 17 18H7C5.59987 18 4.8998 18 4.36502 17.7275C3.89462 17.4878 3.51217 17.1054 3.27248 16.635C3 16.1002 3 15.4001 3 14',
  d2: 'M6 14H18',
  d3: 'M6 10H18',
  d4: 'M6 6H18',
  d5: 'M17 18H7C5.59987 18 4.8998 18 4.36502 17.7275C3.89462 17.4878 3.51217 17.1054 3.27248 16.635C3 16.1002 3 15.4001 3 14H21C21 15.4001 21 16.1002 20.7275 16.635C20.4878 17.1054 20.1054 17.4878 19.635 17.7275C19.1002 18 18.4001 18 17 18Z',
  d6: 'M3 13C3.55229 13 4 13.4477 4 14C4 14.7166 4.00078 15.1938 4.03074 15.5606C4.05975 15.9156 4.11105 16.0781 4.16349 16.181C4.3073 16.4632 4.53677 16.6927 4.81902 16.8365C4.92194 16.889 5.0844 16.9403 5.43944 16.9693C5.80615 16.9992 6.28343 17 7 17H17C17.7166 17 18.1939 16.9992 18.5606 16.9693C18.9156 16.9403 19.0781 16.889 19.181 16.8365C19.4632 16.6927 19.6927 16.4632 19.8365 16.181C19.889 16.0781 19.9403 15.9156 19.9693 15.5606C19.9992 15.1938 20 14.7166 20 14C20 13.4477 20.4477 13 21 13C21.5523 13 22 13.4477 22 14V14.0402V14.0402C22 14.7061 22 15.2656 21.9626 15.7234C21.9235 16.2021 21.8386 16.6571 21.6185 17.089C21.283 17.7475 20.7475 18.283 20.089 18.6185C19.6571 18.8386 19.2022 18.9235 18.7234 18.9626C18.2656 19 17.706 19 17.0402 19H6.95984C6.29397 19 5.73445 19 5.27657 18.9626C4.79785 18.9235 4.34289 18.8386 3.91103 18.6185C3.25247 18.283 2.71704 17.7475 2.38148 17.089C2.16144 16.6571 2.0765 16.2021 2.03738 15.7234C1.99997 15.2656 1.99999 14.706 2 14.0402V14.0402V14C2 13.4477 2.44772 13 3 13Z',
  d7: 'M6 14C6 13.4477 6.44772 13 7 13H17C17.5523 13 18 13.4477 18 14C18 14.5523 17.5523 15 17 15H7C6.44772 15 6 14.5523 6 14Z',
  d8: 'M6 10C6 9.44772 6.44772 9 7 9H17C17.5523 9 18 9.44772 18 10C18 10.5523 17.5523 11 17 11H7C6.44772 11 6 10.5523 6 10Z',
  d9: 'M6 6C6 5.44772 6.44772 5 7 5H17C17.5523 5 18 5.44772 18 6C18 6.55228 17.5523 7 17 7H7C6.44772 7 6 6.55228 6 6Z',
  d10: 'M3 14V18H21V14',
  d11: 'M4 13V17H20V13H22V18C22 18.5523 21.5523 19 21 19H3C2.44772 19 2 18.5523 2 18V13H4Z',
  d12: 'M6 13H18V15H6V13Z',
  d13: 'M6 9H18V11H6V9Z',
  d14: 'M6 5H18V7H6V5Z',
};

export const IconQueue01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Queue01 StrokeRounded"
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

export const IconQueue01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Queue01 DuotoneRounded"
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

export const IconQueue01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Queue01 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
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
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconQueue01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Queue01 SolidRounded"
    >
      <path 
        d={d.d6}
        i-c="f"
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

export const IconQueue01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Queue01 BulkRounded"
    >
      <path 
        d={d.d6}
        i-c="f"
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
        i-c="c f fr o7"
      />
    </TheIconWrapper>
  );
};

export const IconQueue01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Queue01 StrokeSharp"
    >
      <path 
        d={d.d10}
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
    </TheIconWrapper>
  );
};

export const IconQueue01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Queue01 SolidSharp"
    >
      <path 
        d={d.d11}
        i-c="c f fr"
      />
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
    </TheIconWrapper>
  );
};

export const iconPackOfQueue01: TheIconSelfPack = [
  'Queue01',
  IconQueue01StrokeRounded,
  IconQueue01DuotoneRounded,
  IconQueue01TwotoneRounded,
  IconQueue01SolidRounded,
  IconQueue01BulkRounded,
  IconQueue01StrokeSharp,
  IconQueue01SolidSharp,
];