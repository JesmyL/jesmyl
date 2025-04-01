import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M8.26872 8.49708C9.60954 7.67461 10.7798 8.00606 11.4828 8.53401C11.7711 8.75048 11.9152 8.85871 12 8.85871C12.0848 8.85871 12.2289 8.75048 12.5172 8.53401C13.2202 8.00606 14.3905 7.67461 15.7313 8.49708C17.491 9.57647 17.8891 13.1374 13.8302 16.1417C13.0571 16.7139 12.6706 17 12 17C11.3294 17 10.9429 16.7139 10.1698 16.1417C6.11086 13.1374 6.50903 9.57647 8.26872 8.49708Z',
  d2: 'M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z',
  d3: 'M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM11.4828 8.53401C10.7798 8.00606 9.60954 7.67461 8.26872 8.49708C6.50903 9.57647 6.11086 13.1374 10.1698 16.1417C10.9429 16.7139 11.3294 17 12 17C12.6706 17 13.0571 16.7139 13.8302 16.1417C17.8891 13.1374 17.491 9.57647 15.7313 8.49708C14.3905 7.67461 13.2202 8.00606 12.5172 8.53401C12.2289 8.75048 12.0848 8.85871 12 8.85871C11.9152 8.85871 11.7711 8.75048 11.4828 8.53401Z',
  d4: 'M12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75ZM16.123 7.85808C14.4829 6.85201 12.9789 7.24932 12.0664 7.93461L11.9996 7.98474L11.9328 7.93461C11.0203 7.24932 9.51633 6.85201 7.87618 7.85808C6.69478 8.58275 6.07441 10.0637 6.29354 11.6976C6.51463 13.346 7.57303 15.1534 9.72318 16.7448C10.4216 17.2628 11.0789 17.7503 11.9996 17.7503C12.9203 17.7503 13.5776 17.2628 14.276 16.7448C16.4262 15.1534 17.4846 13.346 17.7057 11.6976C17.9248 10.0637 17.3044 8.58275 16.123 7.85808Z',
  d5: 'M1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25C6.06294 1.25 1.25 6.06294 1.25 12Z',
  d6: 'M12.0664 7.93461C12.9789 7.24932 14.4829 6.85201 16.123 7.85808C17.3044 8.58275 17.9248 10.0637 17.7057 11.6976C17.4846 13.346 16.4262 15.1534 14.276 16.7448C13.5776 17.2628 12.9203 17.7503 11.9996 17.7503C11.0789 17.7503 10.4216 17.2628 9.72318 16.7448C7.57303 15.1534 6.51463 13.346 6.29354 11.6976C6.07441 10.0637 6.69478 8.58275 7.87618 7.85808C9.51633 6.85201 11.0203 7.24932 11.9328 7.9346L11.9996 7.98474L12.0664 7.93461Z',
  d7: 'M15.4289 8.37235C13.4331 7.30191 12 8.87985 12 8.87985C12 8.87985 10.5669 7.30191 8.57105 8.37234C6.1537 9.66884 5.98011 14.746 12 17C18.0199 14.746 17.8463 9.66885 15.4289 8.37235Z',
  d8: 'M12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75ZM12.0008 7.40326C11.8196 7.27903 11.5946 7.14683 11.3304 7.03402C10.5524 6.70194 9.45142 6.55048 8.21733 7.20917C6.64348 8.0492 5.92563 10.0186 6.39262 11.9751C6.86967 13.9738 8.54896 15.9638 11.7378 17.152L12.0008 17.25L12.2638 17.152C15.4526 15.9638 17.1319 13.9738 17.6089 11.9751C18.0759 10.0186 17.358 8.0492 15.7842 7.20917C14.5501 6.55048 13.4491 6.70194 12.6711 7.03403C12.4069 7.14683 12.1819 7.27903 12.0008 7.40326Z',
};

export const IconFavouriteCircleStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="favourite-circle-stroke-rounded IconFavouriteCircleStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconFavouriteCircleDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="favourite-circle-duotone-rounded IconFavouriteCircleDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconFavouriteCircleTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="favourite-circle-twotone-rounded IconFavouriteCircleTwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconFavouriteCircleSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="favourite-circle-solid-rounded IconFavouriteCircleSolidRounded"
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

export const IconFavouriteCircleBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="favourite-circle-bulk-rounded IconFavouriteCircleBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconFavouriteCircleStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="favourite-circle-stroke-sharp IconFavouriteCircleStrokeSharp"
    >
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
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

export const IconFavouriteCircleSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="favourite-circle-solid-sharp IconFavouriteCircleSolidSharp"
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

export const iconPackOfFavouriteCircle: TheIconSelfPack = {
  name: 'FavouriteCircle',
  StrokeRounded: IconFavouriteCircleStrokeRounded,
  DuotoneRounded: IconFavouriteCircleDuotoneRounded,
  TwotoneRounded: IconFavouriteCircleTwotoneRounded,
  SolidRounded: IconFavouriteCircleSolidRounded,
  BulkRounded: IconFavouriteCircleBulkRounded,
  StrokeSharp: IconFavouriteCircleStrokeSharp,
  SolidSharp: IconFavouriteCircleSolidSharp,
};