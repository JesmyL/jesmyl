import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M10 12L20 12',
  d2: 'M5.41415 13.6026L6.38058 14.3639C7.94638 15.5974 8.72928 16.2141 9.36464 15.9328C10 15.6515 10 14.6881 10 12.7613V11.2387C10 9.31191 10 8.34853 9.36464 8.06721C8.72928 7.7859 7.94638 8.40264 6.38059 9.63612L5.41415 10.3974C4.47138 11.1401 4 11.5115 4 12C4 12.4885 4.47138 12.8599 5.41415 13.6026Z',
  d3: 'M3.125 12.0012C3.125 12.5259 3.39329 12.9205 3.68621 13.2272C3.95899 13.5128 4.38826 13.8509 4.82504 14.1949L5.83881 14.9935C6.58132 15.5785 7.20286 16.0681 7.72013 16.3683C8.24039 16.6701 8.88006 16.9154 9.54328 16.6217C10.2246 16.3201 10.4467 15.668 10.5369 15.0812C10.6195 14.5435 10.6247 13.8342 10.625 13L19.875 13C20.4273 13 20.875 12.5523 20.875 12C20.875 11.4477 20.4273 11 19.875 11L10.625 11C10.6247 10.1677 10.6193 9.45992 10.5369 8.92321C10.4467 8.33642 10.2246 7.68431 9.54328 7.38265C8.88006 7.089 8.24039 7.33426 7.72013 7.63613C7.20286 7.93625 6.58134 8.42591 5.83884 9.01087L4.82504 9.80952C4.38826 10.1535 3.95899 10.4916 3.68621 10.7772C3.39329 11.0838 3.125 11.4765 3.125 12.0012Z',
  d4: 'M8.875 12C8.875 12.5523 9.32272 13 9.875 13L19.875 13C20.4273 13 20.875 12.5523 20.875 12C20.875 11.4477 20.4273 11 19.875 11L9.875 11C9.32272 11 8.875 11.4477 8.875 12Z',
  d5: 'M3.68621 13.2272C3.39329 12.9205 3.125 12.5259 3.125 12.0012C3.125 11.4765 3.39329 11.0838 3.68621 10.7772C3.95899 10.4916 4.38826 10.1535 4.82504 9.80952L5.83884 9.01087C6.58134 8.42591 7.20286 7.93625 7.72013 7.63613C8.24039 7.33426 8.88006 7.089 9.54328 7.38265C10.2246 7.68431 10.4467 8.33642 10.5369 8.92321C10.6251 9.49729 10.6251 10.2671 10.625 11.1757L10.625 12.8287C10.6251 13.7373 10.6251 14.5071 10.5369 15.0812C10.4467 15.668 10.2246 16.3201 9.54328 16.6217C8.88006 16.9154 8.24039 16.6701 7.72013 16.3683C7.20286 16.0681 6.58132 15.5785 5.83881 14.9935L4.82504 14.1949C4.38826 13.8509 3.95899 13.5128 3.68621 13.2272Z',
  d6: 'M9 11.999L20 11.999',
  d7: 'M4 12L9 8V15.9992L4 12Z',
  d8: 'M10.6022 6.5L3.5 11.998L10.6022 17.5V13L20.5 13V11L10.6022 11V6.5Z',
};

export const IconArrowLeft04StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-left-04-stroke-rounded IconArrowLeft04StrokeRounded"
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

export const IconArrowLeft04DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-left-04-duotone-rounded IconArrowLeft04DuotoneRounded"
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

export const IconArrowLeft04TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-left-04-twotone-rounded IconArrowLeft04TwotoneRounded"
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
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconArrowLeft04SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-left-04-solid-rounded IconArrowLeft04SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconArrowLeft04BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-left-04-bulk-rounded IconArrowLeft04BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconArrowLeft04StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-left-04-stroke-sharp IconArrowLeft04StrokeSharp"
    >
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconArrowLeft04SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-left-04-solid-sharp IconArrowLeft04SolidSharp"
    >
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfArrowLeft04: TheIconSelfPack = {
  name: 'ArrowLeft04',
  StrokeRounded: IconArrowLeft04StrokeRounded,
  DuotoneRounded: IconArrowLeft04DuotoneRounded,
  TwotoneRounded: IconArrowLeft04TwotoneRounded,
  SolidRounded: IconArrowLeft04SolidRounded,
  BulkRounded: IconArrowLeft04BulkRounded,
  StrokeSharp: IconArrowLeft04StrokeSharp,
  SolidSharp: IconArrowLeft04SolidSharp,
};