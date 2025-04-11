import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2 6L6 6.00003',
  d2: 'M2 13H6',
  d3: 'M2 21H21',
  d4: 'M19.4 13.4L22 16M20.7 8.85C20.7 5.6191 18.0809 3 14.85 3C11.6191 3 9 5.6191 9 8.85C9 12.0809 11.6191 14.7 14.85 14.7C18.0809 14.7 20.7 12.0809 20.7 8.85Z',
  d5: 'M20.7 8.85C20.7 5.61913 18.0809 3 14.85 3C11.6191 3 9 5.61913 9 8.85C9 12.0809 11.6191 14.7 14.85 14.7C18.0809 14.7 20.7 12.0809 20.7 8.85Z',
  d6: 'M8 8.85C8 5.06685 11.0668 2 14.85 2C18.6332 2 21.7 5.06685 21.7 8.85C21.7 10.3809 21.1978 11.7944 20.3492 12.935L22.7071 15.2929C23.0976 15.6834 23.0976 16.3166 22.7071 16.7071C22.3166 17.0976 21.6834 17.0976 21.2929 16.7071L18.935 14.3492C17.7944 15.1978 16.3809 15.7 14.85 15.7C11.0668 15.7 8 12.6332 8 8.85ZM14.85 4C12.1714 4 10 6.17142 10 8.85C10 11.5286 12.1714 13.7 14.85 13.7C17.5286 13.7 19.7 11.5286 19.7 8.85C19.7 6.17142 17.5286 4 14.85 4Z',
  d7: 'M0.999993 6C0.999997 5.44772 1.44772 5 2 5.00001L6 5.00004C6.55228 5.00004 7 5.44776 6.99999 6.00004C6.99999 6.55233 6.55227 7.00004 5.99999 7.00004L1.99999 7.00001C1.4477 7 0.999989 6.55228 0.999993 6Z',
  d8: 'M1 13C1 12.4477 1.44772 12 2 12H6C6.55228 12 7 12.4477 7 13C7 13.5523 6.55228 14 6 14H2C1.44772 14 1 13.5523 1 13Z',
  d9: 'M1 21C1 20.4477 1.44772 20 2 20H21C21.5523 20 22 20.4477 22 21C22 21.5523 21.5523 22 21 22H2C1.44772 22 1 21.5523 1 21Z',
  d10: 'M19.4 13.4L22 16M20.7 8.85C20.7 5.61913 18.0809 3 14.85 3C11.6191 3 9 5.61913 9 8.85C9 12.0809 11.6191 14.7 14.85 14.7C18.0809 14.7 20.7 12.0809 20.7 8.85Z',
  d11: 'M7.5 8.85C7.5 5.06685 10.5668 2 14.35 2C18.1332 2 21.2 5.06685 21.2 8.85C21.2 10.3809 20.6978 11.7944 19.8492 12.935L22.5 15.5858L21.0858 17L18.435 14.3492C17.2944 15.1978 15.8809 15.7 14.35 15.7C10.5668 15.7 7.5 12.6332 7.5 8.85ZM14.35 4C11.6714 4 9.5 6.17142 9.5 8.85C9.5 11.5286 11.6714 13.7 14.35 13.7C17.0286 13.7 19.2 11.5286 19.2 8.85C19.2 6.17142 17.0286 4 14.35 4Z',
  d12: 'M5.49999 7.00003L1.49999 7L1.5 5L5.5 5.00003L5.49999 7.00003Z',
  d13: 'M5.5 14H1.5V12H5.5V14Z',
  d14: 'M20.5 22H1.5V20H20.5V22Z',
};

export const IconSearchList02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SearchList02 StrokeRounded"
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

export const IconSearchList02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SearchList02 DuotoneRounded"
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

export const IconSearchList02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SearchList02 TwotoneRounded"
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
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconSearchList02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SearchList02 SolidRounded"
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

export const IconSearchList02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SearchList02 BulkRounded"
    >
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
        i-c="c f fr o7"
      />
      <path 
        d={d.d9}
        i-c="c f fr o7"
      />
    </TheIconWrapper>
  );
};

export const IconSearchList02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SearchList02 StrokeSharp"
    >
      <path 
        d={d.d10}
        i-c="s sj sw"
      />
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
    </TheIconWrapper>
  );
};

export const IconSearchList02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SearchList02 SolidSharp"
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

export const iconPackOfSearchList02: TheIconSelfPack = [
  'SearchList02',
  IconSearchList02StrokeRounded,
  IconSearchList02DuotoneRounded,
  IconSearchList02TwotoneRounded,
  IconSearchList02SolidRounded,
  IconSearchList02BulkRounded,
  IconSearchList02StrokeSharp,
  IconSearchList02SolidSharp,
];