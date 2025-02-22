import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M14 12L4 12',
  d2: 'M18.5859 13.6026L17.6194 14.3639C16.0536 15.5974 15.2707 16.2141 14.6354 15.9328C14 15.6515 14 14.6881 14 12.7613L14 11.2387C14 9.31191 14 8.34853 14.6354 8.06721C15.2707 7.7859 16.0536 8.40264 17.6194 9.63612L18.5858 10.3974C19.5286 11.1401 20 11.5115 20 12C20 12.4885 19.5286 12.8599 18.5859 13.6026Z',
  d3: 'M20.875 12.0027C20.875 11.478 20.6067 11.0834 20.3138 10.7767C20.041 10.4911 19.6117 10.153 19.175 9.80903L18.1612 9.01041C17.4187 8.42543 16.7971 7.93577 16.2799 7.63564C15.7596 7.33377 15.1199 7.08851 14.4567 7.38216C13.7754 7.68382 13.5533 8.33593 13.4631 8.92273C13.3806 9.45953 13.3753 10.1675 13.375 11L4.125 11C3.57272 11 3.125 11.4477 3.125 12C3.125 12.5523 3.57272 13 4.125 13L13.375 13C13.3753 13.834 13.3805 14.5432 13.4631 15.0807C13.5533 15.6675 13.7754 16.3196 14.4567 16.6213C15.1199 16.9149 15.7596 16.6696 16.2799 16.3678C16.7971 16.0677 17.4187 15.578 18.1612 14.993L19.175 14.1944C19.6117 13.8504 20.041 13.5123 20.3138 13.2267C20.6067 12.9201 20.875 12.5274 20.875 12.0027Z',
  d4: 'M15.125 12.0039C15.125 11.4516 14.6773 11.0039 14.125 11.0039L4.125 11.0039C3.57272 11.0039 3.125 11.4516 3.125 12.0039C3.125 12.5562 3.57272 13.0039 4.125 13.0039L14.125 13.0039C14.6773 13.0039 15.125 12.5562 15.125 12.0039Z',
  d5: 'M20.3138 10.7767C20.6067 11.0834 20.875 11.478 20.875 12.0027C20.875 12.5274 20.6067 12.9201 20.3138 13.2267C20.041 13.5123 19.6117 13.8504 19.175 14.1944L18.1612 14.993C17.4187 15.578 16.7971 16.0677 16.2799 16.3678C15.7596 16.6696 15.1199 16.9149 14.4567 16.6213C13.7754 16.3196 13.5533 15.6675 13.4631 15.0807C13.3749 14.5066 13.3749 13.7368 13.375 12.8283L13.375 11.1752C13.3749 10.2667 13.3749 9.4968 13.4631 8.92273C13.5533 8.33593 13.7754 7.68382 14.4567 7.38216C15.1199 7.08851 15.7596 7.33377 16.2799 7.63564C16.7971 7.93577 17.4187 8.42543 18.1612 9.01041L19.175 9.80903C19.6117 10.153 20.041 10.4911 20.3138 10.7767Z',
  d6: 'M15 12L4 12',
  d7: 'M20 11.9992L15 15.9992L15 8L20 11.9992Z',
  d8: 'M13.3978 6.5L20.5 11.998L13.3978 17.5V13L3.5 13L3.5 11L13.3978 11V6.5Z',
};

export const IconArrowRight04StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-right-04-stroke-rounded IconArrowRight04StrokeRounded"
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

export const IconArrowRight04DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-right-04-duotone-rounded IconArrowRight04DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d2} 
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
    </TheIconWrapper>
  );
};

export const IconArrowRight04TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-right-04-twotone-rounded IconArrowRight04TwotoneRounded"
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

export const IconArrowRight04SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-right-04-solid-rounded IconArrowRight04SolidRounded"
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

export const IconArrowRight04BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-right-04-bulk-rounded IconArrowRight04BulkRounded"
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

export const IconArrowRight04StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-right-04-stroke-sharp IconArrowRight04StrokeSharp"
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

export const IconArrowRight04SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-right-04-solid-sharp IconArrowRight04SolidSharp"
    >
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfArrowRight04: TheIconSelfPack = {
  name: 'ArrowRight04',
  StrokeRounded: IconArrowRight04StrokeRounded,
  DuotoneRounded: IconArrowRight04DuotoneRounded,
  TwotoneRounded: IconArrowRight04TwotoneRounded,
  SolidRounded: IconArrowRight04SolidRounded,
  BulkRounded: IconArrowRight04BulkRounded,
  StrokeSharp: IconArrowRight04StrokeSharp,
  SolidSharp: IconArrowRight04SolidSharp,
};