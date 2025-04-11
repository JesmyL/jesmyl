import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12Z',
  d2: 'M10 11C10.5788 11.3167 11.2647 11.5 12 11.5C12.7353 11.5 13.4212 11.3167 14 11',
  d3: 'M9.00673 7H9M15 7H14.9933',
  d4: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM9.34219 10.64C9.54101 10.2766 9.99676 10.1432 10.3601 10.3421C10.8275 10.5978 11.3894 10.75 12.0001 10.75C12.6109 10.75 13.1728 10.5978 13.6401 10.3421C14.0035 10.1432 14.4593 10.2766 14.6581 10.64C14.8569 11.0034 14.7235 11.4592 14.3601 11.658C13.6698 12.0357 12.86 12.25 12.0001 12.25C11.1403 12.25 10.3304 12.0357 9.64015 11.658C9.27677 11.4592 9.14337 11.0034 9.34219 10.64ZM9 5.75C8.30964 5.75 7.75 6.30964 7.75 7C7.75 7.69036 8.30964 8.25 9 8.25H9.00673C9.69708 8.25 10.2567 7.69036 10.2567 7C10.2567 6.30964 9.69708 5.75 9.00673 5.75H9ZM14.9933 5.75C14.3029 5.75 13.7433 6.30964 13.7433 7C13.7433 7.69036 14.3029 8.25 14.9933 8.25H15C15.6904 8.25 16.25 7.69036 16.25 7C16.25 6.30964 15.6904 5.75 15 5.75H14.9933Z',
  d5: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z',
  d6: 'M9.34219 10.6401C9.54101 10.2768 9.99676 10.1434 10.3601 10.3422C10.8275 10.5979 11.3894 10.7501 12.0001 10.7501C12.6109 10.7501 13.1728 10.5979 13.6401 10.3422C14.0035 10.1434 14.4593 10.2768 14.6581 10.6401C14.8569 11.0035 14.7235 11.4593 14.3601 11.6581C13.6698 12.0358 12.86 12.2501 12.0001 12.2501C11.1403 12.2501 10.3304 12.0358 9.64015 11.6581C9.27677 11.4593 9.14337 11.0035 9.34219 10.6401Z',
  d7: 'M7.75 7C7.75 6.30964 8.30964 5.75 9 5.75H9.00673C9.69708 5.75 10.2567 6.30964 10.2567 7C10.2567 7.69036 9.69708 8.25 9.00673 8.25H9C8.30964 8.25 7.75 7.69036 7.75 7ZM13.7433 7C13.7433 6.30964 14.3029 5.75 14.9933 5.75H15C15.6904 5.75 16.25 6.30964 16.25 7C16.25 7.69036 15.6904 8.25 15 8.25H14.9933C14.3029 8.25 13.7433 7.69036 13.7433 7Z',
  d8: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM10.3606 10.3418C10.828 10.5975 11.3899 10.7498 12.0006 10.7498C12.6113 10.7498 13.1733 10.5975 13.6406 10.3418L14.3606 11.6577C13.6703 12.0354 12.8605 12.2498 12.0006 12.2498C11.1407 12.2498 10.3309 12.0354 9.64063 11.6577L10.3606 10.3418ZM9 5.75C8.30964 5.75 7.75 6.30964 7.75 7C7.75 7.69036 8.30964 8.25 9 8.25H9.00673C9.69708 8.25 10.2567 7.69036 10.2567 7C10.2567 6.30964 9.69708 5.75 9.00673 5.75H9ZM14.9933 5.75C14.3029 5.75 13.7433 6.30964 13.7433 7C13.7433 7.69036 14.3029 8.25 14.9933 8.25H15C15.6904 8.25 16.25 7.69036 16.25 7C16.25 6.30964 15.6904 5.75 15 5.75H14.9933Z',
};

export const IconLookTopStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="LookTop StrokeRounded"
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

export const IconLookTopDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="LookTop DuotoneRounded"
    >
      <circle 
        cx="12"
        cy="12"
        r="10"
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

export const IconLookTopTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="LookTop TwotoneRounded"
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

export const IconLookTopSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="LookTop SolidRounded"
    >
      <path 
        d={d.d4}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconLookTopBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="LookTop BulkRounded"
    >
      <path 
        d={d.d5}
        i-c="f o7"
      />
      <path 
        d={d.d6}
        i-c="c f fr"
      />
      <path 
        d={d.d7}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconLookTopStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="LookTop StrokeSharp"
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
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconLookTopSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="LookTop SolidSharp"
    >
      <path 
        d={d.d8}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfLookTop: TheIconSelfPack = [
  'LookTop',
  IconLookTopStrokeRounded,
  IconLookTopDuotoneRounded,
  IconLookTopTwotoneRounded,
  IconLookTopSolidRounded,
  IconLookTopBulkRounded,
  IconLookTopStrokeSharp,
  IconLookTopSolidSharp,
];