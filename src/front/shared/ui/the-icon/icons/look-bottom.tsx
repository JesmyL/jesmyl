import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M10 17C10.5788 17.3167 11.2647 17.5 12 17.5C12.7353 17.5 13.4212 17.3167 14 17',
  d2: 'M9.00673 13H9M15 13H14.9933',
  d3: 'M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12Z',
  d4: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM9.34219 16.64C9.54101 16.2766 9.99676 16.1432 10.3601 16.3421C10.8275 16.5978 11.3894 16.75 12.0001 16.75C12.6109 16.75 13.1728 16.5978 13.6401 16.3421C14.0035 16.1432 14.4593 16.2766 14.6581 16.64C14.8569 17.0034 14.7235 17.4592 14.3601 17.658C13.6698 18.0357 12.86 18.25 12.0001 18.25C11.1403 18.25 10.3304 18.0357 9.64015 17.658C9.27677 17.4592 9.14337 17.0034 9.34219 16.64ZM9 11.75C8.30964 11.75 7.75 12.3096 7.75 13C7.75 13.6904 8.30964 14.25 9 14.25H9.00673C9.69708 14.25 10.2567 13.6904 10.2567 13C10.2567 12.3096 9.69708 11.75 9.00673 11.75H9ZM14.9933 11.75C14.3029 11.75 13.7433 12.3096 13.7433 13C13.7433 13.6904 14.3029 14.25 14.9933 14.25H15C15.6904 14.25 16.25 13.6904 16.25 13C16.25 12.3096 15.6904 11.75 15 11.75H14.9933Z',
  d5: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z',
  d6: 'M9.34219 16.6401C9.54101 16.2768 9.99676 16.1434 10.3601 16.3422C10.8275 16.5979 11.3894 16.7501 12.0001 16.7501C12.6109 16.7501 13.1728 16.5979 13.6401 16.3422C14.0035 16.1434 14.4593 16.2768 14.6581 16.6401C14.8569 17.0035 14.7235 17.4593 14.3601 17.6581C13.6698 18.0358 12.86 18.2501 12.0001 18.2501C11.1403 18.2501 10.3304 18.0358 9.64015 17.6581C9.27677 17.4593 9.14337 17.0035 9.34219 16.6401Z',
  d7: 'M7.75 13C7.75 12.3096 8.30964 11.75 9 11.75H9.00673C9.69708 11.75 10.2567 12.3096 10.2567 13C10.2567 13.6904 9.69708 14.25 9.00673 14.25H9C8.30964 14.25 7.75 13.6904 7.75 13ZM13.7433 13C13.7433 12.3096 14.3029 11.75 14.9933 11.75H15C15.6904 11.75 16.25 12.3096 16.25 13C16.25 13.6904 15.6904 14.25 15 14.25H14.9933C14.3029 14.25 13.7433 13.6904 13.7433 13Z',
  d8: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM10.3606 16.3418C10.828 16.5975 11.3899 16.7498 12.0006 16.7498C12.6113 16.7498 13.1733 16.5975 13.6406 16.3418L14.3606 17.6577C13.6703 18.0354 12.8605 18.2498 12.0006 18.2498C11.1407 18.2498 10.3309 18.0354 9.64062 17.6577L10.3606 16.3418ZM9 11.75C8.30964 11.75 7.75 12.3096 7.75 13C7.75 13.6904 8.30964 14.25 9 14.25H9.00673C9.69708 14.25 10.2567 13.6904 10.2567 13C10.2567 12.3096 9.69708 11.75 9.00673 11.75H9ZM14.9933 11.75C14.3029 11.75 13.7433 12.3096 13.7433 13C13.7433 13.6904 14.3029 14.25 14.9933 14.25H15C15.6904 14.25 16.25 13.6904 16.25 13C16.25 12.3096 15.6904 11.75 15 11.75H14.9933Z',
};

export const IconLookBottomStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="look-bottom-stroke-rounded IconLookBottomStrokeRounded"
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

export const IconLookBottomDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="look-bottom-duotone-rounded IconLookBottomDuotoneRounded"
    >
      <circle 
        opacity="var(--icon-opacity)" 
        cx="12" 
        cy="12" 
        r="10" 
        fill="var(--icon-fill)"></circle>
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
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

export const IconLookBottomTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="look-bottom-twotone-rounded IconLookBottomTwotoneRounded"
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
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLookBottomSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="look-bottom-solid-rounded IconLookBottomSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconLookBottomBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="look-bottom-bulk-rounded IconLookBottomBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const IconLookBottomStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="look-bottom-stroke-sharp IconLookBottomStrokeSharp"
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
        strokeLinecap="round" 
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

export const IconLookBottomSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="look-bottom-solid-sharp IconLookBottomSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfLookBottom: TheIconSelfPack = {
  name: 'LookBottom',
  StrokeRounded: IconLookBottomStrokeRounded,
  DuotoneRounded: IconLookBottomDuotoneRounded,
  TwotoneRounded: IconLookBottomTwotoneRounded,
  SolidRounded: IconLookBottomSolidRounded,
  BulkRounded: IconLookBottomBulkRounded,
  StrokeSharp: IconLookBottomStrokeSharp,
  SolidSharp: IconLookBottomSolidSharp,
};