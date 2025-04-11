import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3 21L21 3',
  d2: 'M7 3V11M11 7L3 7',
  d3: 'M21 18L13 18',
  d4: 'M21.8839 2.11612C22.372 2.60427 22.372 3.39573 21.8839 3.88388L3.88388 21.8839C3.39573 22.372 2.60427 22.372 2.11612 21.8839C1.62796 21.3957 1.62796 20.6043 2.11612 20.1161L20.1161 2.11612C20.6043 1.62796 21.3957 1.62796 21.8839 2.11612Z',
  d5: 'M7 1.75C7.69036 1.75 8.25 2.30964 8.25 3V5.75L11 5.75C11.6904 5.75 12.25 6.30964 12.25 7C12.25 7.69036 11.6904 8.25 11 8.25H8.25V11C8.25 11.6904 7.69036 12.25 7 12.25C6.30964 12.25 5.75 11.6904 5.75 11V8.25H3C2.30964 8.25 1.75 7.69036 1.75 7C1.75 6.30964 2.30964 5.75 3 5.75L5.75 5.75V3C5.75 2.30964 6.30964 1.75 7 1.75Z',
  d6: 'M11.75 18C11.75 17.3096 12.3096 16.75 13 16.75L21 16.75C21.6904 16.75 22.25 17.3096 22.25 18C22.25 18.6904 21.6904 19.25 21 19.25L13 19.25C12.3096 19.25 11.75 18.6904 11.75 18Z',
  d7: 'M22 3.76777L3.76777 22L2 20.2322L20.2322 2L22 3.76777Z',
  d8: 'M5.74902 5.75098V3.00098H8.24902V5.75098L10.999 5.75098V8.25098H8.24902V11.001H5.74902V8.25098H2.99902V5.75098L5.74902 5.75098Z',
  d9: 'M12.999 16.751L20.999 16.751V19.251L12.999 19.251V16.751Z',
};

export const IconPlusMinus02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="PlusMinus02 StrokeRounded"
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

export const IconPlusMinus02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="PlusMinus02 DuotoneRounded"
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
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconPlusMinus02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="PlusMinus02 TwotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconPlusMinus02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="PlusMinus02 SolidRounded"
    >
      <path 
        d={d.d4}
        i-c="c f fr"
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

export const IconPlusMinus02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="PlusMinus02 BulkRounded"
    >
      <path 
        d={d.d4}
        i-c="c f fr"
      />
      <path 
        d={d.d5}
        i-c="c f fr o7"
      />
      <path 
        d={d.d6}
        i-c="c f fr o7"
      />
    </TheIconWrapper>
  );
};

export const IconPlusMinus02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="PlusMinus02 StrokeSharp"
    >
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

export const IconPlusMinus02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="PlusMinus02 SolidSharp"
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
    </TheIconWrapper>
  );
};

export const iconPackOfPlusMinus02: TheIconSelfPack = [
  'PlusMinus02',
  IconPlusMinus02StrokeRounded,
  IconPlusMinus02DuotoneRounded,
  IconPlusMinus02TwotoneRounded,
  IconPlusMinus02SolidRounded,
  IconPlusMinus02BulkRounded,
  IconPlusMinus02StrokeSharp,
  IconPlusMinus02SolidSharp,
];