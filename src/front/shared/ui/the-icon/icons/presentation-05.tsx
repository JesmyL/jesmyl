import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2.5 11C2.5 13.8284 2.5 15.2426 3.37868 16.1213C4.25736 17 5.67157 17 8.5 17H15.5C18.3284 17 19.7426 17 20.6213 16.1213C21.5 15.2426 21.5 13.8284 21.5 11V8C21.5 5.17157 21.5 3.75736 20.6213 2.87868C19.7426 2 18.3284 2 15.5 2H8.5C5.67157 2 4.25736 2 3.37868 2.87868C2.5 3.75736 2.5 5.17157 2.5 8V11Z',
  d2: 'M8.5 22L8.82821 21.6717C9.40628 21.0936 9.69532 20.8045 10.0629 20.6523C10.4305 20.5 10.8392 20.5 11.6568 20.5H12.343C13.1605 20.5 13.5692 20.5 13.9368 20.6522C14.3043 20.8045 14.5933 21.0935 15.1714 21.6716L15.4998 22',
  d3: 'M12 17.5V22',
  d4: 'M12 17V22',
  d5: 'M8.5 22.125L8.82821 21.7967C9.40628 21.2186 9.69532 20.9295 10.0629 20.7773C10.4305 20.625 10.8392 20.625 11.6568 20.625H12.343C13.1605 20.625 13.5692 20.625 13.9368 20.7772C14.3043 20.9295 14.5933 21.2185 15.1714 21.7966L15.4998 22.125M12 17.625V22.125',
  d6: 'M11.0002 21.5063V22C11.0002 22.5523 11.448 23 12.0002 23C12.5525 23 13.0002 22.5523 13.0002 22V21.5063C13.3475 21.5156 13.4579 21.5365 13.5543 21.5764C13.6954 21.6348 13.8288 21.7432 14.4645 22.379L14.7929 22.7074C15.1835 23.0979 15.8166 23.0979 16.2072 22.7074C16.5977 22.3169 16.5977 21.6837 16.2072 21.2932L15.8787 20.9647L15.7807 20.8665C15.3014 20.3858 14.8761 19.9591 14.3197 19.7286C13.909 19.5585 13.4733 19.5145 13.0002 19.5035V17H11.0002L11.0002 19.5035C10.5271 19.5145 10.0912 19.5585 9.68042 19.7287C9.12398 19.9592 8.69863 20.3859 8.21937 20.8667L8.1213 20.965L7.79309 21.2932C7.40259 21.6838 7.40263 22.3169 7.79318 22.7074C8.18373 23.0979 8.8169 23.0979 9.2074 22.7073L9.5356 22.3791C10.1714 21.7432 10.3048 21.6348 10.4458 21.5764C10.5423 21.5365 10.6527 21.5156 11.0002 21.5063Z',
  d7: 'M1.75024 11.4C1.75024 14.5113 1.75024 16.0669 2.69829 17.0335C3.64634 18 5.1722 18 8.22393 18H15.7766C18.8283 18 20.3541 18 21.3022 17.0335C22.2502 16.0669 22.2502 14.5113 22.2502 11.4V8.1C22.2502 4.98873 22.2502 3.4331 21.3022 2.46655C20.3541 1.5 18.8283 1.5 15.7766 1.5H8.22393C5.1722 1.5 3.64634 1.5 2.69829 2.46655C1.75024 3.4331 1.75024 4.98873 1.75024 8.1V11.4Z',
  d8: 'M11.0002 18H13.0002V19.5035C13.4733 19.5145 13.909 19.5585 14.3197 19.7286C14.8761 19.9591 15.3014 20.3858 15.7807 20.8665L15.8787 20.9647L16.2072 21.2932C16.5977 21.6837 16.5977 22.3169 16.2072 22.7074C15.8166 23.0979 15.1835 23.0979 14.7929 22.7074L14.4645 22.379C13.8288 21.7432 13.6954 21.6348 13.5543 21.5764C13.4579 21.5365 13.3475 21.5156 13.0002 21.5063V22C13.0002 22.5523 12.5525 23 12.0002 23C11.448 23 11.0002 22.5523 11.0002 22V21.5063C10.6527 21.5156 10.5423 21.5365 10.4458 21.5764C10.3048 21.6348 10.1714 21.7432 9.5356 22.3791L9.2074 22.7073C8.8169 23.0979 8.18373 23.0979 7.79318 22.7074C7.40263 22.3169 7.40259 21.6838 7.79309 21.2932L8.1213 20.965L8.21937 20.8667L8.21937 20.8667L8.21937 20.8667C8.69863 20.3859 9.12398 19.9592 9.68042 19.7287C10.0912 19.5585 10.5271 19.5145 11.0002 19.5035L11.0002 18Z',
  d9: 'M21 16.5V2.5H3V16.5L21 16.5Z',
  d10: 'M12 16.5L12 21.5',
  d11: 'M8 21.5L9.5 19.5H14.5L16 21.5',
  d12: 'M2.25 2.5C2.25 2.08579 2.58579 1.75 3 1.75H21C21.4142 1.75 21.75 2.08579 21.75 2.5V16.5C21.75 16.6989 21.671 16.8897 21.5303 17.0303C21.3897 17.171 21.1989 17.25 21 17.25L3 17.25C2.58579 17.25 2.25 16.9142 2.25 16.5V2.5Z',
  d13: 'M11 20.6944V22.25H13V20.6944H13.9792L15.1667 22.25L16.75 21.0833L15.2656 19.1389C15.0787 18.8941 14.7854 18.75 14.474 18.75H13V16.75H11V18.75H9.52604C9.21456 18.75 8.92126 18.8941 8.73438 19.1389L7.25 21.0833L8.83333 22.25L10.0208 20.6944H11Z',
};

export const IconPresentation05StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="presentation-05-stroke-rounded IconPresentation05StrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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
      />
    </TheIconWrapper>
  );
};

export const IconPresentation05DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="presentation-05-duotone-rounded IconPresentation05DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconPresentation05TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="presentation-05-twotone-rounded IconPresentation05TwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconPresentation05SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="presentation-05-solid-rounded IconPresentation05SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconPresentation05BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="presentation-05-bulk-rounded IconPresentation05BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconPresentation05StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="presentation-05-stroke-sharp IconPresentation05StrokeSharp"
    >
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconPresentation05SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="presentation-05-solid-sharp IconPresentation05SolidSharp"
    >
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfPresentation05: TheIconSelfPack = {
  name: 'Presentation05',
  StrokeRounded: IconPresentation05StrokeRounded,
  DuotoneRounded: IconPresentation05DuotoneRounded,
  TwotoneRounded: IconPresentation05TwotoneRounded,
  SolidRounded: IconPresentation05SolidRounded,
  BulkRounded: IconPresentation05BulkRounded,
  StrokeSharp: IconPresentation05StrokeSharp,
  SolidSharp: IconPresentation05SolidSharp,
};