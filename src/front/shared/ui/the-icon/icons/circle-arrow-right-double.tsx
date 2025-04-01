import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12.9154 15C12.9154 15 15.5 12.7905 15.5 12C15.5 11.2094 12.9154 9 12.9154 9M8.50002 15C8.50002 15 11.0846 12.7905 11.0846 12C11.0846 11.2094 8.5 9 8.5 9',
  d2: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM13.4852 8.19192C13.1519 7.90483 12.6506 7.94435 12.3656 8.28019C12.0806 8.61601 12.12 9.12108 12.4533 9.40818L12.8637 9.77434C13.1138 10.0026 13.4449 10.3133 13.7739 10.6473C14.1062 10.9847 14.4205 11.3298 14.6464 11.6288C14.7598 11.7789 14.8375 11.8998 14.8836 11.9891L14.8891 12L14.8836 12.0109C14.8375 12.1002 14.7598 12.2211 14.6464 12.3712C14.4205 12.6701 14.1062 13.0153 13.7739 13.3527C13.4449 13.6867 13.1138 13.9974 12.8637 14.2257L12.4532 14.5919C12.1199 14.879 12.0806 15.384 12.3656 15.7198C12.6506 16.0557 13.1519 16.0952 13.4853 15.8081L13.93 15.4115C14.193 15.1715 14.5461 14.8403 14.9013 14.4797C15.2531 14.1225 15.6229 13.7204 15.9102 13.3403C16.0533 13.1508 16.1894 12.9493 16.293 12.7483C16.3877 12.5647 16.5 12.2979 16.5 12C16.5 11.702 16.3877 11.4353 16.293 11.2516C16.1894 11.0507 16.0533 10.8491 15.9102 10.6597C15.6229 10.2796 15.2531 9.87746 14.9013 9.52028C14.5461 9.15968 14.193 8.82852 13.93 8.58851L13.4852 8.19192ZM10.7261 9.52028C10.3709 9.15968 10.0179 8.82852 9.75484 8.58851L9.31012 8.19192C9.07453 7.98904 8.7433 7.94277 8.46181 8.07343C8.18031 8.20408 8 8.48778 8 8.80001L8.00002 15.2C8.00002 15.5122 8.18034 15.7959 8.46184 15.9266C8.74333 16.0572 9.07456 16.011 9.31015 15.8081L9.75487 15.4115C10.0179 15.1715 10.371 14.8403 10.7262 14.4797C11.078 14.1225 11.4478 13.7204 11.735 13.3403C11.8782 13.1508 12.0143 12.9493 12.1179 12.7483C12.2126 12.5647 12.3249 12.2979 12.3249 12C12.3249 11.702 12.2126 11.4353 12.1179 11.2516C12.0143 11.0507 11.8782 10.8491 11.735 10.6597C11.4478 10.2796 11.078 9.87746 10.7261 9.52028Z',
  d3: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z',
  d4: 'M12.3656 8.28019C12.6506 7.94435 13.1519 7.90483 13.4852 8.19192L13.93 8.58851C14.193 8.82852 14.5461 9.15968 14.9013 9.52028C15.2531 9.87746 15.6229 10.2796 15.9102 10.6597C16.0533 10.8491 16.1894 11.0507 16.293 11.2516C16.3877 11.4353 16.5 11.702 16.5 12C16.5 12.2979 16.3877 12.5647 16.293 12.7483C16.1894 12.9493 16.0533 13.1508 15.9102 13.3403C15.6229 13.7204 15.2531 14.1225 14.9013 14.4797C14.5461 14.8403 14.193 15.1715 13.93 15.4115L13.4853 15.8081C13.1519 16.0952 12.6506 16.0557 12.3656 15.7198C12.0806 15.384 12.1199 14.879 12.4532 14.5919L12.8637 14.2257C13.1138 13.9974 13.4449 13.6867 13.7739 13.3527C14.1062 13.0153 14.4205 12.6701 14.6464 12.3712C14.7598 12.2211 14.8375 12.1002 14.8836 12.0109L14.8891 12L14.8836 11.9891C14.8375 11.8998 14.7598 11.7789 14.6464 11.6288C14.4205 11.3298 14.1062 10.9847 13.7739 10.6473C13.4449 10.3133 13.1138 10.0026 12.8637 9.77434L12.4533 9.40818C12.12 9.12108 12.0806 8.61601 12.3656 8.28019Z',
  d5: 'M9.75484 8.58851C10.0179 8.82852 10.3709 9.15968 10.7261 9.52028C11.078 9.87746 11.4478 10.2796 11.735 10.6597C11.8782 10.8491 12.0143 11.0507 12.1179 11.2516C12.2126 11.4353 12.3249 11.702 12.3249 12C12.3249 12.2979 12.2126 12.5647 12.1179 12.7483C12.0143 12.9493 11.8782 13.1508 11.735 13.3403C11.4478 13.7204 11.078 14.1225 10.7262 14.4797C10.371 14.8403 10.0179 15.1715 9.75487 15.4115L9.31015 15.8081C9.07456 16.011 8.74333 16.0572 8.46184 15.9266C8.18034 15.7959 8.00002 15.5122 8.00002 15.2L8 8.80001C8 8.48778 8.18031 8.20408 8.46181 8.07343C8.7433 7.94277 9.07453 7.98903 9.31012 8.19192L9.75484 8.58851Z',
  d6: 'M8 8L11 12L8.00002 16M13 8L16 12L13 16',
  d7: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM7.40039 8.45005L10.0629 12.0001L7.40041 15.5501L8.60041 16.4501L11.9379 12L8.60039 7.55005L7.40039 8.45005ZM12.4004 8.45005L15.0629 12.0001L12.4004 15.5501L13.6004 16.4501L16.9379 12L13.6004 7.55005L12.4004 8.45005Z',
};

export const IconCircleArrowRightDoubleStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-right-double-stroke-rounded IconCircleArrowRightDoubleStrokeRounded"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
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

export const IconCircleArrowRightDoubleDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-right-double-duotone-rounded IconCircleArrowRightDoubleDuotoneRounded"
    >
      <circle 
        opacity="var(--icon-opacity)" 
        cx="12" 
        cy="12" 
        r="10" 
        fill="var(--icon-fill)"></circle>
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
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

export const IconCircleArrowRightDoubleTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-right-double-twotone-rounded IconCircleArrowRightDoubleTwotoneRounded"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCircleArrowRightDoubleSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-right-double-solid-rounded IconCircleArrowRightDoubleSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCircleArrowRightDoubleBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-right-double-bulk-rounded IconCircleArrowRightDoubleBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
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

export const IconCircleArrowRightDoubleStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-right-double-stroke-sharp IconCircleArrowRightDoubleStrokeSharp"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconCircleArrowRightDoubleSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-right-double-solid-sharp IconCircleArrowRightDoubleSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfCircleArrowRightDouble: TheIconSelfPack = {
  name: 'CircleArrowRightDouble',
  StrokeRounded: IconCircleArrowRightDoubleStrokeRounded,
  DuotoneRounded: IconCircleArrowRightDoubleDuotoneRounded,
  TwotoneRounded: IconCircleArrowRightDoubleTwotoneRounded,
  SolidRounded: IconCircleArrowRightDoubleSolidRounded,
  BulkRounded: IconCircleArrowRightDoubleBulkRounded,
  StrokeSharp: IconCircleArrowRightDoubleStrokeSharp,
  SolidSharp: IconCircleArrowRightDoubleSolidSharp,
};