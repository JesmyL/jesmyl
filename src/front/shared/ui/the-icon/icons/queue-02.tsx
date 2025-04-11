import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M18 18H6C5.05719 18 4.58579 18 4.29289 17.7071C4 17.4142 4 16.9428 4 16C4 15.0572 4 14.5858 4.29289 14.2929C4.58579 14 5.05719 14 6 14H18C18.9428 14 19.4142 14 19.7071 14.2929C20 14.5858 20 15.0572 20 16C20 16.9428 20 17.4142 19.7071 17.7071C19.4142 18 18.9428 18 18 18Z',
  d2: 'M4 10H20',
  d3: 'M4 6H20',
  d4: 'M5.94561 13H18.0544C18.4785 12.9999 18.8906 12.9998 19.2305 13.0455C19.6137 13.0971 20.051 13.2226 20.4142 13.5858C20.7774 13.949 20.903 14.3863 20.9545 14.7695C21.0002 15.1094 21.0001 15.5759 21 16C21.0001 16.4241 21.0002 16.8906 20.9545 17.2305C20.903 17.6137 20.7774 18.051 20.4142 18.4142C20.051 18.7774 19.6137 18.903 19.2305 18.9545C18.8906 19.0002 18.4785 19.0001 18.0544 19H18.0544H5.9456H5.94559C5.52153 19.0001 5.10941 19.0002 4.76949 18.9545C4.38629 18.903 3.94902 18.7774 3.5858 18.4142C3.22259 18.051 3.09706 17.6137 3.04554 17.2305C2.99984 16.8906 2.99993 16.4241 3.00001 16C2.99993 15.5759 2.99984 15.1094 3.04554 14.7695C3.09706 14.3863 3.22259 13.949 3.5858 13.5858C3.94902 13.2226 4.38629 13.0971 4.76949 13.0455C5.10941 12.9998 5.52154 12.9999 5.94561 13Z',
  d5: 'M3 10C3 9.44772 3.44772 9 4 9H20C20.5523 9 21 9.44772 21 10C21 10.5523 20.5523 11 20 11H4C3.44772 11 3 10.5523 3 10Z',
  d6: 'M3 6C3 5.44772 3.44772 5 4 5H20C20.5523 5 21 5.44772 21 6C21 6.55228 20.5523 7 20 7H4C3.44772 7 3 6.55228 3 6Z',
  d7: 'M20 14H4V18H20V14Z',
  d8: 'M3 14C3 13.4477 3.44772 13 4 13H20C20.5523 13 21 13.4477 21 14V18C21 18.5523 20.5523 19 20 19H4C3.44772 19 3 18.5523 3 18V14ZM5 15V17H19V15H5Z',
  d9: 'M3 9H21V11H3V9Z',
  d10: 'M3 5H21V7H3V5Z',
};

export const IconQueue02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Queue02 StrokeRounded"
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

export const IconQueue02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Queue02 DuotoneRounded"
    >
      <path 
        d={d.d1}
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
    </TheIconWrapper>
  );
};

export const IconQueue02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Queue02 TwotoneRounded"
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

export const IconQueue02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Queue02 SolidRounded"
    >
      <path 
        d={d.d4}
        i-c="f"
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

export const IconQueue02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Queue02 BulkRounded"
    >
      <path 
        d={d.d4}
        i-c="f o7"
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

export const IconQueue02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Queue02 StrokeSharp"
    >
      <path 
        d={d.d7}
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

export const IconQueue02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Queue02 SolidSharp"
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
    </TheIconWrapper>
  );
};

export const iconPackOfQueue02: TheIconSelfPack = [
  'Queue02',
  IconQueue02StrokeRounded,
  IconQueue02DuotoneRounded,
  IconQueue02TwotoneRounded,
  IconQueue02SolidRounded,
  IconQueue02BulkRounded,
  IconQueue02StrokeSharp,
  IconQueue02SolidSharp,
];