import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M6.5 17.3306C7.78183 18.9563 9.76903 20 12 20C13.9587 20 15.7295 19.1955 17 17.8989M8.5 6.93647C9.52961 6.34088 10.725 6 12 6C13.9587 6 15.7295 6.80446 17 8.10101',
  d2: 'M16 13C16 15.2091 14.2091 17 12 17C9.79085 17 8 15.2091 8 13C8 10.7909 9.79085 9 12 9C14.2091 9 16 10.7909 16 13Z',
  d3: 'M6 7C6 8.38067 5.10457 9 4 9C2.89543 9 2 8.38067 2 7C2 5.61928 2.89543 4 4 4C5.10457 4 6 5.61928 6 7Z',
  d4: 'M19.5 13V4H20C21.1046 4 22 4.89543 22 6V13H19.5ZM19.5 13V20',
  d5: 'M4 9V20',
  d6: 'M22 6V13H19.5V4H20C21.1046 4 22 4.89543 22 6Z',
  d7: 'M4 9C5.10457 9 6 8.38067 6 7C6 5.61928 5.10457 4 4 4C2.89543 4 2 5.61928 2 7C2 8.38067 2.89543 9 4 9ZM4 9V20',
  d8: 'M12 5.25C10.5215 5.25 9.13978 5.66399 7.96431 6.38237C7.98783 6.58837 8 6.79486 8 7C8 8.14459 7.61277 9.22579 6.75595 10.0009C6.51899 10.2153 6.26413 10.3894 6 10.5285L6 17.9057C7.42124 19.6419 9.58121 20.75 12 20.75C14.1503 20.75 16.096 19.8743 17.5 18.46V7.53991C16.096 6.12569 14.1503 5.25 12 5.25ZM8.75 13C8.75 11.2051 10.2051 9.75 12 9.75C13.7949 9.75 15.25 11.2051 15.25 13C15.25 14.7949 13.7949 16.25 12 16.25C10.2051 16.25 8.75 14.7949 8.75 13ZM12 8.25C9.37664 8.25 7.25 10.3766 7.25 13C7.25 15.6233 9.37663 17.75 12 17.75C14.6234 17.75 16.75 15.6233 16.75 13C16.75 10.3766 14.6234 8.25 12 8.25Z',
  d9: 'M18.75 4C18.75 3.58579 19.0858 3.25 19.5 3.25H20C21.5188 3.25 22.75 4.48122 22.75 6V13C22.75 13.4142 22.4142 13.75 22 13.75H20.25V20C20.25 20.4142 19.9142 20.75 19.5 20.75C19.0858 20.75 18.75 20.4142 18.75 20V4Z',
  d10: 'M2.08264 9.07393C2.42119 9.38021 2.82512 9.56974 3.25 9.66754V20C3.25 20.4142 3.58579 20.75 4 20.75C4.41421 20.75 4.75 20.4142 4.75 20V9.66754C5.17488 9.56974 5.57881 9.38021 5.91736 9.07393C6.46457 8.57891 6.75 7.86116 6.75 7C6.75 6.16396 6.48387 5.27658 6.0497 4.5839C5.63234 3.91807 4.93392 3.25 4 3.25C3.06608 3.25 2.36766 3.91807 1.9503 4.5839C1.51613 5.27658 1.25 6.16396 1.25 7C1.25 7.86116 1.53543 8.57891 2.08264 9.07393Z',
  d11: 'M7.96431 6.38237C9.13978 5.66399 10.5215 5.25 12 5.25C14.1503 5.25 16.096 6.12569 17.5 7.53991V18.46C16.096 19.8743 14.1503 20.75 12 20.75C9.58121 20.75 7.42124 19.6419 6 17.9057V10.5285C6.26413 10.3894 6.51899 10.2153 6.75595 10.0009C7.61277 9.22579 8 8.14459 8 7C8 6.79486 7.98783 6.58837 7.96431 6.38237Z',
  d12: 'M7.25 13C7.25 10.3766 9.37664 8.25 12 8.25C14.6234 8.25 16.75 10.3766 16.75 13C16.75 15.6233 14.6234 17.75 12 17.75C9.37663 17.75 7.25 15.6233 7.25 13Z',
  d13: 'M8.75 13C8.75 11.2051 10.2051 9.75 12 9.75C13.7949 9.75 15.25 11.2051 15.25 13C15.25 14.7949 13.7949 16.25 12 16.25C10.2051 16.25 8.75 14.7949 8.75 13Z',
  d14: 'M8 7C8 6.79415 7.98775 6.58694 7.96406 6.38023C9.13966 5.66196 10.5215 5.24805 12 5.24805C14.1501 5.24805 16.0957 6.12338 17.5 7.53714V18.4628C16.0957 19.8766 14.1501 20.752 12 20.752C9.58146 20.752 7.42162 19.6444 6 17.9088V10.5285C6.26413 10.3894 6.51899 10.2153 6.75595 10.0009C7.61277 9.22579 8 8.14459 8 7ZM12 8.25C9.37664 8.25 7.25 10.3766 7.25 13C7.25 15.6233 9.37663 17.75 12 17.75C14.6234 17.75 16.75 15.6233 16.75 13C16.75 10.3766 14.6234 8.25 12 8.25Z',
  d15: 'M20 3.25C21.5188 3.25 22.75 4.48122 22.75 6V13.75H20.25V20.75H18.75V3.25H20Z',
  d16: 'M2.08264 9.07393C2.42119 9.38021 2.82512 9.56974 3.25 9.66754V20.75H4.75V9.66754C5.17488 9.56974 5.57881 9.38021 5.91736 9.07393C6.46457 8.57891 6.75 7.86116 6.75 7C6.75 6.16396 6.48387 5.27658 6.0497 4.5839C5.63234 3.91807 4.93392 3.25 4 3.25C3.06608 3.25 2.36766 3.91807 1.9503 4.5839C1.51613 5.27658 1.25 6.16396 1.25 7C1.25 7.86116 1.53543 8.57891 2.08264 9.07393Z',
};

export const IconSpoonAndKnifeStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="spoon-and-knife-stroke-rounded IconSpoonAndKnifeStrokeRounded"
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
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSpoonAndKnifeDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="spoon-and-knife-duotone-rounded IconSpoonAndKnifeDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
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
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSpoonAndKnifeTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="spoon-and-knife-twotone-rounded IconSpoonAndKnifeTwotoneRounded"
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
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSpoonAndKnifeSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="spoon-and-knife-solid-rounded IconSpoonAndKnifeSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconSpoonAndKnifeBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="spoon-and-knife-bulk-rounded IconSpoonAndKnifeBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconSpoonAndKnifeStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="spoon-and-knife-stroke-sharp IconSpoonAndKnifeStrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
    </TheIconWrapper>
  );
};

export const IconSpoonAndKnifeSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="spoon-and-knife-solid-sharp IconSpoonAndKnifeSolidSharp"
    >
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfSpoonAndKnife: TheIconSelfPack = {
  name: 'SpoonAndKnife',
  StrokeRounded: IconSpoonAndKnifeStrokeRounded,
  DuotoneRounded: IconSpoonAndKnifeDuotoneRounded,
  TwotoneRounded: IconSpoonAndKnifeTwotoneRounded,
  SolidRounded: IconSpoonAndKnifeSolidRounded,
  BulkRounded: IconSpoonAndKnifeBulkRounded,
  StrokeSharp: IconSpoonAndKnifeStrokeSharp,
  SolidSharp: IconSpoonAndKnifeSolidSharp,
};