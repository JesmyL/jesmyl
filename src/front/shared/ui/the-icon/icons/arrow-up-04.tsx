import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 10L12 20',
  d2: 'M13.6026 5.41415L14.3639 6.38058C15.5974 7.94638 16.2141 8.72928 15.9328 9.36464C15.6515 10 14.6881 10 12.7613 10H11.2387C9.31191 10 8.34853 10 8.06721 9.36464C7.7859 8.72928 8.40264 7.94638 9.63612 6.38059L10.3974 5.41415C11.1401 4.47138 11.5115 4 12 4C12.4885 4 12.8599 4.47138 13.6026 5.41415Z',
  d3: 'M12.0027 3.125C11.478 3.125 11.0834 3.39329 10.7767 3.68621C10.4911 3.95899 10.153 4.38826 9.80903 4.82504L9.01041 5.83881C8.42543 6.58132 7.93577 7.20286 7.63564 7.72013C7.33377 8.24039 7.08851 8.88006 7.38216 9.54328C7.68382 10.2246 8.33594 10.4467 8.92273 10.5369C9.45953 10.6194 10.1675 10.6247 11 10.625V19.875C11 20.4273 11.4477 20.875 12 20.875C12.5523 20.875 13 20.4273 13 19.875V10.625C13.834 10.6247 14.5432 10.6195 15.0807 10.5369C15.6675 10.4467 16.3196 10.2246 16.6213 9.54328C16.9149 8.88006 16.6696 8.24039 16.3678 7.72013C16.0677 7.20286 15.578 6.58134 14.993 5.83884L14.1944 4.82504C13.8504 4.38826 13.5123 3.95899 13.2267 3.68621C12.9201 3.39329 12.5274 3.125 12.0027 3.125Z',
  d4: 'M12 8.875C11.4477 8.875 11 9.32272 11 9.875L11 19.875C11 20.4273 11.4477 20.875 12 20.875C12.5523 20.875 13 20.4273 13 19.875L13 9.875C13 9.32272 12.5523 8.875 12 8.875Z',
  d5: 'M10.7767 3.68621C11.0834 3.39329 11.478 3.125 12.0027 3.125C12.5274 3.125 12.9201 3.39329 13.2267 3.68621C13.5123 3.95899 13.8504 4.38826 14.1944 4.82504L14.993 5.83884C15.578 6.58134 16.0677 7.20286 16.3678 7.72013C16.6696 8.24039 16.9149 8.88006 16.6213 9.54328C16.3196 10.2246 15.6675 10.4467 15.0807 10.5369C14.5066 10.6251 13.7368 10.6251 12.8283 10.625H11.1752C10.2667 10.6251 9.4968 10.6251 8.92273 10.5369C8.33594 10.4467 7.68382 10.2246 7.38216 9.54328C7.08851 8.88006 7.33377 8.24039 7.63564 7.72013C7.93577 7.20286 8.42543 6.58132 9.01041 5.83881L9.80903 4.82504C10.153 4.38826 10.4911 3.95899 10.7767 3.68621Z',
  d6: 'M12 9L12 20',
  d7: 'M12.0002 4L16.0002 9H8.00098L12.0002 4Z',
  d8: 'M17.5 10.6022L12.002 3.5L6.5 10.6022H11V20.5H13V10.6022H17.5Z',
};

export const IconArrowUp04StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-up-04-stroke-rounded IconArrowUp04StrokeRounded"
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

export const IconArrowUp04DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-up-04-duotone-rounded IconArrowUp04DuotoneRounded"
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

export const IconArrowUp04TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-up-04-twotone-rounded IconArrowUp04TwotoneRounded"
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

export const IconArrowUp04SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-up-04-solid-rounded IconArrowUp04SolidRounded"
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

export const IconArrowUp04BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-up-04-bulk-rounded IconArrowUp04BulkRounded"
    >
      <path 
        opacity="0.3" 
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

export const IconArrowUp04StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-up-04-stroke-sharp IconArrowUp04StrokeSharp"
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

export const IconArrowUp04SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-up-04-solid-sharp IconArrowUp04SolidSharp"
    >
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfArrowUp04: TheIconSelfPack = {
  name: 'ArrowUp04',
  StrokeRounded: IconArrowUp04StrokeRounded,
  DuotoneRounded: IconArrowUp04DuotoneRounded,
  TwotoneRounded: IconArrowUp04TwotoneRounded,
  SolidRounded: IconArrowUp04SolidRounded,
  BulkRounded: IconArrowUp04BulkRounded,
  StrokeSharp: IconArrowUp04StrokeSharp,
  SolidSharp: IconArrowUp04SolidSharp,
};