import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2 10H7',
  d2: 'M2 17H7',
  d3: 'M2 3H19',
  d4: 'M19.6 18.6L22 21M20.8 14.4C20.8 11.4176 18.3824 9 15.4 9C12.4176 9 10 11.4176 10 14.4C10 17.3824 12.4176 19.8 15.4 19.8C18.3824 19.8 20.8 17.3824 20.8 14.4Z',
  d5: 'M20.8 14.4C20.8 11.4177 18.3823 9 15.4 9C12.4177 9 10 11.4177 10 14.4C10 17.3823 12.4177 19.8 15.4 19.8C18.3823 19.8 20.8 17.3823 20.8 14.4Z',
  d6: 'M9 14.4C9 10.8654 11.8654 8 15.4 8C18.9346 8 21.8 10.8654 21.8 14.4C21.8 15.8065 21.3463 17.1069 20.5773 18.1631L22.7071 20.2929C23.0976 20.6834 23.0976 21.3166 22.7071 21.7071C22.3166 22.0976 21.6834 22.0976 21.2929 21.7071L19.1631 19.5773C18.1069 20.3463 16.8065 20.8 15.4 20.8C11.8654 20.8 9 17.9346 9 14.4ZM15.4 10C12.9699 10 11 11.9699 11 14.4C11 16.8301 12.9699 18.8 15.4 18.8C17.8301 18.8 19.8 16.8301 19.8 14.4C19.8 11.9699 17.8301 10 15.4 10Z',
  d7: 'M0.999993 10C0.999997 9.44772 1.44772 9 2 9.00001L7 9.00004C7.55229 9.00005 8 9.44776 7.99999 10C7.99999 10.5523 7.55227 11 6.99999 11L1.99999 11C1.4477 11 0.999989 10.5523 0.999993 10Z',
  d8: 'M1 17C1 16.4477 1.44772 16 2 16H7C7.55228 16 8 16.4477 8 17C8 17.5523 7.55228 18 7 18H2C1.44772 18 1 17.5523 1 17Z',
  d9: 'M1 3C1 2.44772 1.44772 2 2 2H19C19.5523 2 20 2.44772 20 3C20 3.55228 19.5523 4 19 4H2C1.44772 4 1 3.55228 1 3Z',
  d10: 'M19.6 18.6L22 21M20.8 14.4C20.8 11.4177 18.3823 9 15.4 9C12.4177 9 10 11.4177 10 14.4C10 17.3823 12.4177 19.8 15.4 19.8C18.3823 19.8 20.8 17.3823 20.8 14.4Z',
  d11: 'M2 10L7 10',
  d12: 'M8.5 14.4C8.5 10.8654 11.3654 8 14.9 8C18.4346 8 21.3 10.8654 21.3 14.4C21.3 15.8065 20.8463 17.1069 20.0773 18.1631L22.5 20.5858L21.0858 22L18.6631 19.5773C17.6069 20.3463 16.3065 20.8 14.9 20.8C11.3654 20.8 8.5 17.9346 8.5 14.4ZM14.9 10C12.4699 10 10.5 11.9699 10.5 14.4C10.5 16.8301 12.4699 18.8 14.9 18.8C17.3301 18.8 19.3 16.8301 19.3 14.4C19.3 11.9699 17.3301 10 14.9 10Z',
  d13: 'M6.49999 11L1.49999 11L1.5 9L6.5 9.00004L6.49999 11Z',
  d14: 'M6.5 18H1.5V16H6.5V18Z',
  d15: 'M18.5 4H1.5V2H18.5V4Z',
};

export const IconSearchList01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SearchList01 StrokeRounded"
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

export const IconSearchList01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SearchList01 DuotoneRounded"
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

export const IconSearchList01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SearchList01 TwotoneRounded"
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
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconSearchList01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SearchList01 SolidRounded"
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

export const IconSearchList01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SearchList01 BulkRounded"
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

export const IconSearchList01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SearchList01 StrokeSharp"
    >
      <path 
        d={d.d10}
        i-c="s sj sw"
      />
      <path 
        d={d.d11}
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

export const IconSearchList01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SearchList01 SolidSharp"
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
    </TheIconWrapper>
  );
};

export const iconPackOfSearchList01: TheIconSelfPack = [
  'SearchList01',
  IconSearchList01StrokeRounded,
  IconSearchList01DuotoneRounded,
  IconSearchList01TwotoneRounded,
  IconSearchList01SolidRounded,
  IconSearchList01BulkRounded,
  IconSearchList01StrokeSharp,
  IconSearchList01SolidSharp,
];