import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3 21L21 3',
  d2: 'M17 13V21M21 17L13 17',
  d3: 'M11 7L3 7',
  d4: 'M21.8839 2.11612C22.372 2.60427 22.372 3.39573 21.8839 3.88388L3.88388 21.8839C3.39573 22.372 2.60427 22.372 2.11612 21.8839C1.62796 21.3957 1.62796 20.6043 2.11612 20.1161L20.1161 2.11612C20.6043 1.62796 21.3957 1.62796 21.8839 2.11612Z',
  d5: 'M17 11.75C17.6904 11.75 18.25 12.3096 18.25 13V15.75L21 15.75C21.6904 15.75 22.25 16.3096 22.25 17C22.25 17.6904 21.6904 18.25 21 18.25H18.25V21C18.25 21.6904 17.6904 22.25 17 22.25C16.3096 22.25 15.75 21.6904 15.75 21V18.25H13C12.3096 18.25 11.75 17.6904 11.75 17C11.75 16.3096 12.3096 15.75 13 15.75L15.75 15.75V13C15.75 12.3096 16.3096 11.75 17 11.75Z',
  d6: 'M1.75 7C1.75 6.30964 2.30964 5.75 3 5.75L11 5.75C11.6904 5.75 12.25 6.30964 12.25 7C12.25 7.69036 11.6904 8.25 11 8.25L3 8.25C2.30964 8.25 1.75 7.69036 1.75 7Z',
  d7: 'M22 3.76777L3.76777 22L2 20.2322L20.2322 2L22 3.76777Z',
  d8: 'M15.749 15.75V13H18.249V15.75L20.999 15.75V18.25H18.249V21H15.749V18.25H12.999V15.75L15.749 15.75Z',
  d9: 'M2.99902 5.75L10.999 5.75V8.25L2.99902 8.25V5.75Z',
};

export const IconMinusPlus02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="minus-plus-02-stroke-rounded IconMinusPlus02StrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMinusPlus02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="minus-plus-02-duotone-rounded IconMinusPlus02DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMinusPlus02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="minus-plus-02-twotone-rounded IconMinusPlus02TwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMinusPlus02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="minus-plus-02-solid-rounded IconMinusPlus02SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMinusPlus02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="minus-plus-02-bulk-rounded IconMinusPlus02BulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMinusPlus02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="minus-plus-02-stroke-sharp IconMinusPlus02StrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMinusPlus02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="minus-plus-02-solid-sharp IconMinusPlus02SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfMinusPlus02: TheIconSelfPack = {
  name: 'MinusPlus02',
  StrokeRounded: IconMinusPlus02StrokeRounded,
  DuotoneRounded: IconMinusPlus02DuotoneRounded,
  TwotoneRounded: IconMinusPlus02TwotoneRounded,
  SolidRounded: IconMinusPlus02SolidRounded,
  BulkRounded: IconMinusPlus02BulkRounded,
  StrokeSharp: IconMinusPlus02StrokeSharp,
  SolidSharp: IconMinusPlus02SolidSharp,
};