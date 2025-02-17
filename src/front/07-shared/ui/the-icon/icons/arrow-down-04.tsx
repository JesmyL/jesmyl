import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M10.3974 18.5859L9.63612 17.6194C8.40264 16.0536 7.7859 15.2707 8.06721 14.6354C8.34853 14 9.31191 14 11.2387 14H12.7613C14.6881 14 15.6515 14 15.9328 14.6354C16.2141 15.2707 15.5974 16.0536 14.3639 17.6194L13.6026 18.5858C12.8599 19.5286 12.4885 20 12 20C11.5115 20 11.1401 19.5286 10.3974 18.5859Z',
  d2: 'M12 14L12 4',
  d3: 'M12.0027 20.875C11.478 20.875 11.0834 20.6067 10.7767 20.3138C10.4911 20.041 10.153 19.6117 9.80903 19.175L9.01041 18.1612C8.42543 17.4187 7.93577 16.7971 7.63564 16.2799C7.33377 15.7596 7.08851 15.1199 7.38216 14.4567C7.68382 13.7754 8.33594 13.5533 8.92273 13.4631C9.45953 13.3806 10.1675 13.3753 11 13.375V4.125C11 3.57272 11.4477 3.125 12 3.125C12.5523 3.125 13 3.57272 13 4.125V13.375C13.834 13.3753 14.5432 13.3805 15.0807 13.4631C15.6675 13.5533 16.3196 13.7754 16.6213 14.4567C16.9149 15.1199 16.6696 15.7596 16.3678 16.2799C16.0677 16.7971 15.578 17.4187 14.993 18.1612L14.1944 19.175C13.8504 19.6117 13.5123 20.041 13.2267 20.3138C12.9201 20.6067 12.5274 20.875 12.0027 20.875Z',
  d4: 'M12 15.125C11.4477 15.125 11 14.6773 11 14.125L11 4.125C11 3.57272 11.4477 3.125 12 3.125C12.5523 3.125 13 3.57272 13 4.125L13 14.125C13 14.6773 12.5523 15.125 12 15.125Z',
  d5: 'M10.7767 20.3138C11.0834 20.6067 11.478 20.875 12.0027 20.875C12.5274 20.875 12.9201 20.6067 13.2267 20.3138C13.5123 20.041 13.8504 19.6117 14.1944 19.175L14.993 18.1612C15.578 17.4187 16.0677 16.7971 16.3678 16.2799C16.6696 15.7596 16.9149 15.1199 16.6213 14.4567C16.3196 13.7754 15.6675 13.5533 15.0807 13.4631C14.5066 13.3749 13.7368 13.3749 12.8283 13.375H11.1752C10.2667 13.3749 9.4968 13.3749 8.92273 13.4631C8.33594 13.5533 7.68382 13.7754 7.38216 14.4567C7.08851 15.1199 7.33377 15.7596 7.63564 16.2799C7.93577 16.7971 8.42543 17.4187 9.01041 18.1612L9.80903 19.175C10.153 19.6117 10.4911 20.041 10.7767 20.3138Z',
  d6: 'M12 15V4',
  d7: 'M11.9992 20L15.9992 15H8L11.9992 20Z',
  d8: 'M17.5 13.3978L12.002 20.5L6.5 13.3978H11V3.5H13V13.3978H17.5Z',
};

export const IconArrowDown04StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-down-04-stroke-rounded IconArrowDown04StrokeRounded"
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

export const IconArrowDown04DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-down-04-duotone-rounded IconArrowDown04DuotoneRounded"
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

export const IconArrowDown04TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-down-04-twotone-rounded IconArrowDown04TwotoneRounded"
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

export const IconArrowDown04SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-down-04-solid-rounded IconArrowDown04SolidRounded"
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

export const IconArrowDown04BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-down-04-bulk-rounded IconArrowDown04BulkRounded"
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

export const IconArrowDown04StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-down-04-stroke-sharp IconArrowDown04StrokeSharp"
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

export const IconArrowDown04SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-down-04-solid-sharp IconArrowDown04SolidSharp"
    >
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfArrowDown04: TheIconSelfPack = {
  name: 'ArrowDown04',
  StrokeRounded: IconArrowDown04StrokeRounded,
  DuotoneRounded: IconArrowDown04DuotoneRounded,
  TwotoneRounded: IconArrowDown04TwotoneRounded,
  SolidRounded: IconArrowDown04SolidRounded,
  BulkRounded: IconArrowDown04BulkRounded,
  StrokeSharp: IconArrowDown04StrokeSharp,
  SolidSharp: IconArrowDown04SolidSharp,
};