import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M9.5 6.5C9.99153 5.9943 11.2998 4 12 4M14.5 6.5C14.0085 5.9943 12.7002 4 12 4M12 4V10',
  d2: 'M18.3633 10.6357L16.9491 12.05',
  d3: 'M3 17H5',
  d4: 'M5.63657 10.6356L7.05078 12.0498',
  d5: 'M21 17H19',
  d6: 'M21 20H3',
  d7: 'M16 17C16 14.7909 14.2091 13 12 13C9.79086 13 8 14.7909 8 17',
  d8: 'M18.3633 10.6367L16.9491 12.0509',
  d9: 'M5.63657 10.6366L7.05078 12.0508',
  d10: 'M12 13C9.79086 13 8 14.7909 8 17H16C16 14.7909 14.2091 13 12 13Z',
  d11: 'M13.0059 9.5C13.0059 10.0523 12.5581 10.5 12.0059 10.5C11.4536 10.5 11.0059 10.0523 11.0059 9.5L11.0059 6.49996L10.4116 6.49998C10.236 6.50011 10.0203 6.50026 9.84387 6.47819L9.84053 6.47777C9.71408 6.462 9.13804 6.39017 8.86368 5.82457C8.58872 5.25775 8.89065 4.75761 8.95597 4.6494L9.29511 4.18092C9.58975 3.80509 9.99545 3.29063 10.3759 2.89962C10.5657 2.70451 10.783 2.50328 11.0139 2.34443C11.2191 2.20323 11.5693 1.99996 12 1.99996C12.4307 1.99996 12.7809 2.20323 12.9861 2.34443C13.217 2.50328 13.4343 2.70451 13.6241 2.89962C14.0046 3.29063 14.4102 3.80508 14.7049 4.18091L15.044 4.64941C15.1093 4.75761 15.4113 5.25775 15.1363 5.82457C14.862 6.39017 14.2859 6.46201 14.1595 6.47777L14.1561 6.47819C13.9797 6.50026 13.764 6.50011 13.5884 6.49998L13.0059 6.49996L13.0059 9.5Z',
  d12: 'M19.0704 9.92961C19.4609 10.3201 19.4609 10.9533 19.0704 11.3438L18.0097 12.4045C17.6192 12.795 16.986 12.795 16.5955 12.4045C16.205 12.014 16.205 11.3808 16.5955 10.9903L17.6562 9.92961C18.0467 9.53909 18.6799 9.53909 19.0704 9.92961ZM4.9295 9.93023C5.32002 9.53971 5.95319 9.53971 6.34371 9.93023L7.40437 10.9909C7.7949 11.3814 7.7949 12.0146 7.40437 12.4051C7.01385 12.7956 6.38068 12.7956 5.99016 12.4051L4.9295 11.3444C4.53897 10.9539 4.53897 10.3208 4.9295 9.93023ZM2 17.0007C2 16.4484 2.44772 16.0007 3 16.0007H4.5C5.05228 16.0007 5.5 16.4484 5.5 17.0007C5.5 17.553 5.05228 18.0007 4.5 18.0007H3C2.44772 18.0007 2 17.553 2 17.0007ZM18.5 17.0007C18.5 16.4484 18.9477 16.0007 19.5 16.0007H21C21.5523 16.0007 22 16.4484 22 17.0007C22 17.553 21.5523 18.0007 21 18.0007H19.5C18.9477 18.0007 18.5 17.553 18.5 17.0007Z',
  d13: 'M22 21C22 21.5523 21.5523 22 21 22H3C2.44772 22 2 21.5523 2 21C2 20.4477 2.44772 20 3 20H21C21.5523 20 22 20.4477 22 21Z',
  d14: 'M7 17C7 14.2386 9.23858 12 12 12C14.7614 12 17 14.2386 17 17C17 17.5523 16.5523 18 16 18H8C7.44772 18 7 17.5523 7 17Z',
  d15: 'M9.5 6.5L12 4L14.5 6.5M12 10V4.56702',
  d16: 'M12.0001 2.5L15.2072 5.70711L13.793 7.12132L13.0001 6.32843V9.91421H11.0001V6.32843L10.2072 7.12132L8.79297 5.70711L12.0001 2.5Z',
  d17: 'M16.242 10.8429L17.6562 9.42871L19.0705 10.8429L17.6563 12.2571L16.242 10.8429Z',
  d18: 'M3 15.5H5V17.5H3V15.5Z',
  d19: 'M6.3436 9.42856L7.75781 10.8428L6.3436 12.257L4.92939 10.8428L6.3436 9.42856Z',
  d20: 'M19 15.5H21V17.5H19V15.5Z',
  d21: 'M3 19.5H21V21.5H3V19.5Z',
  d22: 'M7 17.5V16.5C7 13.7386 9.23858 11.5 12 11.5C14.7614 11.5 17 13.7386 17 16.5V17.5H7Z',
};

export const IconSunriseStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sunrise-stroke-rounded IconSunriseStrokeRounded"
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
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSunriseDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sunrise-duotone-rounded IconSunriseDuotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSunriseTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sunrise-twotone-rounded IconSunriseTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
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

export const IconSunriseSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sunrise-solid-rounded IconSunriseSolidRounded"
    >
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconSunriseBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sunrise-bulk-rounded IconSunriseBulkRounded"
    >
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconSunriseStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sunrise-stroke-sharp IconSunriseStrokeSharp"
    >
      <path 
        d={d.d15} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
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
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSunriseSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sunrise-solid-sharp IconSunriseSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d20} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d21} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d22} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfSunrise: TheIconSelfPack = {
  name: 'Sunrise',
  StrokeRounded: IconSunriseStrokeRounded,
  DuotoneRounded: IconSunriseDuotoneRounded,
  TwotoneRounded: IconSunriseTwotoneRounded,
  SolidRounded: IconSunriseSolidRounded,
  BulkRounded: IconSunriseBulkRounded,
  StrokeSharp: IconSunriseStrokeSharp,
  SolidSharp: IconSunriseSolidSharp,
};