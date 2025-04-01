import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3.5 13.678C3.5 9.49387 7.08079 5.35907 9.59413 2.97222C10.9591 1.67593 13.0409 1.67593 14.4059 2.97222C16.9192 5.35907 20.5 9.49387 20.5 13.678C20.5 17.7804 17.2812 22 12 22C6.71878 22 3.5 17.7804 3.5 13.678Z',
  d2: 'M9 15C9 15 9.3648 14.2616 9.84 13.3029M15 15C15 15 14.6352 14.2616 14.16 13.3029M9.84 13.3029C10.7194 11.5287 11.9768 9 12 9C12.0232 9 13.2806 11.5287 14.16 13.3029M9.84 13.3029H14.16',
  d3: 'M9 15C9 15 9.3648 14.2616 9.84 13.3029M9.84 13.3029C10.7194 11.5287 11.9768 9 12 9C12.0232 9 13.2806 11.5287 14.16 13.3029M9.84 13.3029H14.16M15 15C15 15 14.6352 14.2616 14.16 13.3029',
  d4: 'M14.9223 2.42838C13.2679 0.857205 10.7321 0.857205 9.07766 2.42838C7.79766 3.64397 6.22927 5.31956 4.97628 7.24155C3.72892 9.1549 2.75 11.3797 2.75 13.678C2.75 18.1459 6.25744 22.75 12 22.75C17.7426 22.75 21.25 18.1459 21.25 13.678C21.25 11.3797 20.2711 9.15491 19.0237 7.24155C17.7707 5.31956 16.2023 3.64397 14.9223 2.42838ZM12.671 8.66459C12.5439 8.4105 12.2842 8.25 12.0002 8.25C11.7161 8.25 11.4564 8.4105 11.3293 8.66459L9.19323 12.9368C9.18837 12.946 9.1837 12.9554 9.17922 12.9648L8.32934 14.6646C8.1441 15.0351 8.29427 15.4856 8.66475 15.6708C9.03524 15.8561 9.48574 15.7059 9.67098 15.3354L10.3208 14.0357H13.6795L14.3293 15.3354C14.5146 15.7059 14.9651 15.8561 15.3356 15.6708C15.7061 15.4856 15.8562 15.0351 15.671 14.6646L14.8211 12.9648C14.8166 12.9554 14.812 12.946 14.8071 12.9368L12.671 8.66459ZM12.0002 10.6771L12.9295 12.5357H11.0708L12.0002 10.6771Z',
  d5: 'M9.07766 2.42838C10.7321 0.857205 13.2679 0.857205 14.9223 2.42838C16.2023 3.64397 17.7707 5.31956 19.0237 7.24155C20.2711 9.15491 21.25 11.3797 21.25 13.678C21.25 18.1459 17.7426 22.75 12 22.75C6.25744 22.75 2.75 18.1459 2.75 13.678C2.75 11.3797 3.72892 9.1549 4.97628 7.24155C6.22927 5.31956 7.79766 3.64397 9.07766 2.42838Z',
  d6: 'M12.0002 8.25C12.2842 8.25 12.5439 8.4105 12.671 8.66459L14.8071 12.9368C14.812 12.946 14.8166 12.9554 14.8211 12.9648L15.671 14.6646C15.8562 15.0351 15.7061 15.4856 15.3356 15.6708C14.9651 15.8561 14.5146 15.7059 14.3293 15.3354L13.6795 14.0357H10.3208L9.67098 15.3354C9.48574 15.7059 9.03524 15.8561 8.66475 15.6708C8.29427 15.4856 8.1441 15.0351 8.32934 14.6646L9.17922 12.9648C9.1837 12.9554 9.18837 12.946 9.19323 12.9368L11.3293 8.66459C11.4564 8.4105 11.7161 8.25 12.0002 8.25ZM11.0708 12.5357H12.9295L12.0002 10.6771L11.0708 12.5357Z',
  d7: 'M12 2C12 2 20.5 7 20.5 13.5C20.5 18.1944 16.6944 22 12 22C7.30558 22 3.5 18.1944 3.5 13.5C3.5 7 12 2 12 2Z',
  d8: 'M10.0872 13.2969H13.9251M8.97559 16.0214L12.0308 8.5332L15.0055 16.0139',
  d9: 'M11.9993 9.82991L12.9656 12.5357H11.0329L11.9993 9.82991Z',
  d10: 'M11.7389 1.41471C11.8558 1.34121 11.948 1.28321 12 1.25C12.052 1.28321 12.1442 1.34121 12.2611 1.41471C12.6878 1.68301 13.443 2.15778 13.7646 2.3867C14.5828 2.96899 15.6761 3.81609 16.7724 4.8742C18.9337 6.96036 21.25 10.0049 21.25 13.5514C21.25 18.6316 17.1086 22.75 12 22.75C6.89137 22.75 2.75 18.6316 2.75 13.5514C2.75 10.0049 5.06626 6.96036 7.22764 4.8742C8.32391 3.81609 9.41722 2.96899 10.2354 2.3867C10.557 2.15778 11.3122 1.68301 11.7389 1.41471ZM13.0278 8.25H10.9707L8.29297 15.7477L9.70558 16.2523L10.4972 14.0357H13.5013L14.293 16.2523L15.7056 15.7477L13.0278 8.25Z',
};

export const IconBloodTypeStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="blood-type-stroke-rounded IconBloodTypeStrokeRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconBloodTypeDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="blood-type-duotone-rounded IconBloodTypeDuotoneRounded"
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
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBloodTypeTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="blood-type-twotone-rounded IconBloodTypeTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBloodTypeSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="blood-type-solid-rounded IconBloodTypeSolidRounded"
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

export const IconBloodTypeBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="blood-type-bulk-rounded IconBloodTypeBulkRounded"
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
    </TheIconWrapper>
  );
};

export const IconBloodTypeStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="blood-type-stroke-sharp IconBloodTypeStrokeSharp"
    >
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="bevel" 
      />
    </TheIconWrapper>
  );
};

export const IconBloodTypeSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="blood-type-solid-sharp IconBloodTypeSolidSharp"
    >
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfBloodType: TheIconSelfPack = {
  name: 'BloodType',
  StrokeRounded: IconBloodTypeStrokeRounded,
  DuotoneRounded: IconBloodTypeDuotoneRounded,
  TwotoneRounded: IconBloodTypeTwotoneRounded,
  SolidRounded: IconBloodTypeSolidRounded,
  BulkRounded: IconBloodTypeBulkRounded,
  StrokeSharp: IconBloodTypeStrokeSharp,
  SolidSharp: IconBloodTypeSolidSharp,
};