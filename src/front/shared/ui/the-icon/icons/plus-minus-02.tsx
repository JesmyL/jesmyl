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
      name="plus-minus-02-stroke-rounded IconPlusMinus02StrokeRounded"
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

export const IconPlusMinus02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="plus-minus-02-duotone-rounded IconPlusMinus02DuotoneRounded"
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

export const IconPlusMinus02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="plus-minus-02-twotone-rounded IconPlusMinus02TwotoneRounded"
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

export const IconPlusMinus02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="plus-minus-02-solid-rounded IconPlusMinus02SolidRounded"
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

export const IconPlusMinus02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="plus-minus-02-bulk-rounded IconPlusMinus02BulkRounded"
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

export const IconPlusMinus02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="plus-minus-02-stroke-sharp IconPlusMinus02StrokeSharp"
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

export const IconPlusMinus02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="plus-minus-02-solid-sharp IconPlusMinus02SolidSharp"
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

export const iconPackOfPlusMinus02: TheIconSelfPack = {
  name: 'PlusMinus02',
  StrokeRounded: IconPlusMinus02StrokeRounded,
  DuotoneRounded: IconPlusMinus02DuotoneRounded,
  TwotoneRounded: IconPlusMinus02TwotoneRounded,
  SolidRounded: IconPlusMinus02SolidRounded,
  BulkRounded: IconPlusMinus02BulkRounded,
  StrokeSharp: IconPlusMinus02StrokeSharp,
  SolidSharp: IconPlusMinus02SolidSharp,
};