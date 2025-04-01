import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M4 18V6L14.5 2L20 4V20L14.5 22L4 18ZM4 18L14 18.5V6L8.5 7.5V15.5L4 18Z',
  d2: 'M14.5 2L20 4V20L14.5 22L5 18L14 18.5V6L8.5 7.5V15.5L4 17.5V6L14.5 2Z',
  d3: 'M14.5 2L20 4V20L14.5 22L4 18V6L14.5 2Z',
  d4: 'M14 18.5L4 18L8.5 15.5V7.5L14 6V18.5Z',
  d5: 'M14.7563 1.29515C14.5871 1.23361 14.4013 1.23502 14.233 1.29913L3.733 5.29913C3.44219 5.40992 3.25 5.6888 3.25 6V18C3.25 18.3112 3.44219 18.5901 3.733 18.7009L14.233 22.7009C14.4013 22.765 14.5871 22.7664 14.7563 22.7048L20.2563 20.7048C20.5527 20.5971 20.75 20.3154 20.75 20V4C20.75 3.68462 20.5527 3.40293 20.2563 3.29516L14.7563 1.29515ZM4 18L14 18.5V6L8.5 7.5V15.5L4 18Z',
  d6: 'M14.7563 1.29515C14.5871 1.23361 14.4013 1.23502 14.233 1.29913L3.733 5.29913C3.44219 5.40992 3.25 5.6888 3.25 6V18C3.25 18.3112 3.44219 18.5901 3.733 18.7009L14.233 22.7009C14.4013 22.765 14.5871 22.7664 14.7563 22.7048L20.2563 20.7048C20.5527 20.5971 20.75 20.3154 20.75 20V4C20.75 3.68462 20.5527 3.40293 20.2563 3.29516L14.7563 1.29515Z',
  d7: 'M4 18L14 18.5V6L8.5 7.5V15.5L4 18Z',
  d8: 'M5.38506 18.0693L14 18.5V6L8.5 7.5V15.5L4.48494 17.7306M20 4L14.5 2L4 6V18L14.5 22L20 20V4Z',
  d9: 'M20.75 3.51435L14.4939 1.25L3.24997 5.51346L3.24997 18.4865L3.25039 18.4867L8.50119 15.4841L8.50119 7.52134L14.0012 6.02832L14.0012 18.4701L3.25102 18.4869L14.4939 22.75L20.75 20.4856L20.75 3.51435Z',
};

export const IconOffice365StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="office-365-stroke-rounded IconOffice365StrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconOffice365DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="office-365-duotone-rounded IconOffice365DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconOffice365TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="office-365-twotone-rounded IconOffice365TwotoneRounded"
    >
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconOffice365SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="office-365-solid-rounded IconOffice365SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconOffice365BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="office-365-bulk-rounded IconOffice365BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconOffice365StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="office-365-stroke-sharp IconOffice365StrokeSharp"
    >
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconOffice365SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="office-365-solid-sharp IconOffice365SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfOffice365: TheIconSelfPack = {
  name: 'Office365',
  StrokeRounded: IconOffice365StrokeRounded,
  DuotoneRounded: IconOffice365DuotoneRounded,
  TwotoneRounded: IconOffice365TwotoneRounded,
  SolidRounded: IconOffice365SolidRounded,
  BulkRounded: IconOffice365BulkRounded,
  StrokeSharp: IconOffice365StrokeSharp,
  SolidSharp: IconOffice365SolidSharp,
};