import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 7V21M19 14H5',
  d2: 'M19 3L5 3',
  d3: 'M12 5.75C12.6904 5.75 13.25 6.30964 13.25 7V12.75H19C19.6904 12.75 20.25 13.3096 20.25 14C20.25 14.6904 19.6904 15.25 19 15.25H13.25V21C13.25 21.6904 12.6904 22.25 12 22.25C11.3096 22.25 10.75 21.6904 10.75 21V15.25H5C4.30964 15.25 3.75 14.6904 3.75 14C3.75 13.3096 4.30964 12.75 5 12.75H10.75V7C10.75 6.30964 11.3096 5.75 12 5.75Z',
  d4: 'M20.25 3C20.25 3.69036 19.6904 4.25 19 4.25L5 4.25C4.30964 4.25 3.75 3.69036 3.75 3C3.75 2.30964 4.30964 1.75 5 1.75L19 1.75C19.6904 1.75 20.25 2.30964 20.25 3Z',
  d5: 'M10.75 15.75V21.5H13.25V15.75H19V13.25H13.25V7.5H10.75V13.25H5V15.75H10.75Z',
  d6: 'M5 5H19V2.5H5V5Z',
};

export const IconMinusPlus01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MinusPlus01 StrokeRounded"
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

export const IconMinusPlus01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MinusPlus01 DuotoneRounded"
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

export const IconMinusPlus01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MinusPlus01 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconMinusPlus01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MinusPlus01 SolidRounded"
    >
      <path 
        d={d.d3}
        i-c="c f fr"
      />
      <path 
        d={d.d4}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconMinusPlus01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MinusPlus01 BulkRounded"
    >
      <path 
        d={d.d3}
        i-c="c f fr o7"
      />
      <path 
        d={d.d4}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconMinusPlus01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MinusPlus01 StrokeSharp"
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

export const IconMinusPlus01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MinusPlus01 SolidSharp"
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

export const iconPackOfMinusPlus01: TheIconSelfPack = [
  'MinusPlus01',
  IconMinusPlus01StrokeRounded,
  IconMinusPlus01DuotoneRounded,
  IconMinusPlus01TwotoneRounded,
  IconMinusPlus01SolidRounded,
  IconMinusPlus01BulkRounded,
  IconMinusPlus01StrokeSharp,
  IconMinusPlus01SolidSharp,
];