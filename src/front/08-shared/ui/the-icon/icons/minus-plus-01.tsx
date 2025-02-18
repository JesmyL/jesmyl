import { FC } from 'react';
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
      name="minus-plus-01-stroke-rounded IconMinusPlus01StrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconMinusPlus01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="minus-plus-01-duotone-rounded IconMinusPlus01DuotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconMinusPlus01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="minus-plus-01-twotone-rounded IconMinusPlus01TwotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconMinusPlus01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="minus-plus-01-solid-rounded IconMinusPlus01SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMinusPlus01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="minus-plus-01-bulk-rounded IconMinusPlus01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMinusPlus01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="minus-plus-01-stroke-sharp IconMinusPlus01StrokeSharp"
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
    </TheIconWrapper>
  );
};

export const IconMinusPlus01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="minus-plus-01-solid-sharp IconMinusPlus01SolidSharp"
    >
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

export const iconPackOfMinusPlus01: TheIconSelfPack = {
  name: 'MinusPlus01',
  StrokeRounded: IconMinusPlus01StrokeRounded,
  DuotoneRounded: IconMinusPlus01DuotoneRounded,
  TwotoneRounded: IconMinusPlus01TwotoneRounded,
  SolidRounded: IconMinusPlus01SolidRounded,
  BulkRounded: IconMinusPlus01BulkRounded,
  StrokeSharp: IconMinusPlus01StrokeSharp,
  SolidSharp: IconMinusPlus01SolidSharp,
};