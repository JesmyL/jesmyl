import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M8 4.5V3M16 4.5V3',
  d2: 'M19.5 8L21 8M19.5 16H21',
  d3: 'M8 21V19.5M16 21V19.5',
  d4: 'M3 8L4.5 8M3 16H4.5',
  d5: 'M8 11C8 9.58579 8 8.87868 8.43934 8.43934C8.87868 8 9.58579 8 11 8H13C14.4142 8 15.1213 8 15.5607 8.43934C16 8.87868 16 9.58579 16 11V13C16 14.4142 16 15.1213 15.5607 15.5607C15.1213 16 14.4142 16 13 16H11C9.58579 16 8.87868 16 8.43934 15.5607C8 15.1213 8 14.4142 8 13V11Z',
  d6: 'M8 2C8.55228 2 9 2.44772 9 3V4.5C9 5.05228 8.55228 5.5 8 5.5C7.44772 5.5 7 5.05228 7 4.5V3C7 2.44772 7.44772 2 8 2ZM16 2C16.5523 2 17 2.44772 17 3V4.5C17 5.05228 16.5523 5.5 16 5.5C15.4477 5.5 15 5.05228 15 4.5V3C15 2.44772 15.4477 2 16 2Z',
  d7: 'M18.5 8C18.5 7.44772 18.9477 7 19.5 7L21 7C21.5523 7 22 7.44772 22 8C22 8.55228 21.5523 9 21 9H19.5C18.9477 9 18.5 8.55228 18.5 8ZM18.5 16C18.5 15.4477 18.9477 15 19.5 15H21C21.5523 15 22 15.4477 22 16C22 16.5523 21.5523 17 21 17H19.5C18.9477 17 18.5 16.5523 18.5 16Z',
  d8: 'M8 18.5C8.55228 18.5 9 18.9477 9 19.5V21C9 21.5523 8.55228 22 8 22C7.44772 22 7 21.5523 7 21V19.5C7 18.9477 7.44772 18.5 8 18.5ZM16 18.5C16.5523 18.5 17 18.9477 17 19.5V21C17 21.5523 16.5523 22 16 22C15.4477 22 15 21.5523 15 21V19.5C15 18.9477 15.4477 18.5 16 18.5Z',
  d9: 'M2 8C2 7.44772 2.44772 7 3 7L4.5 7C5.05229 7 5.5 7.44772 5.5 8C5.5 8.55228 5.05229 9 4.5 9H3C2.44772 9 2 8.55228 2 8ZM2 16C2 15.4477 2.44772 15 3 15H4.5C5.05228 15 5.5 15.4477 5.5 16C5.5 16.5523 5.05228 17 4.5 17H3C2.44772 17 2 16.5523 2 16Z',
  d10: 'M13.0616 7C13.7157 6.99994 14.3035 6.99989 14.7792 7.06384C15.2985 7.13367 15.8313 7.2958 16.2678 7.73224C16.7042 8.16868 16.8663 8.70149 16.9362 9.22085C17.0001 9.69656 17.0001 10.2843 17 10.9384V13.0616C17.0001 13.7157 17.0001 14.3035 16.9362 14.7792C16.8663 15.2985 16.7042 15.8313 16.2678 16.2678C15.8313 16.7042 15.2985 16.8663 14.7792 16.9362C14.3035 17.0001 13.7157 17.0001 13.0616 17H10.9384C10.2843 17.0001 9.69656 17.0001 9.22085 16.9362C8.70149 16.8663 8.16868 16.7042 7.73224 16.2678C7.2958 15.8313 7.13367 15.2985 7.06384 14.7792C6.99989 14.3035 6.99994 13.7157 7 13.0616V10.9384C6.99994 10.2843 6.99989 9.69656 7.06384 9.22085C7.13367 8.70149 7.2958 8.16868 7.73224 7.73224C8.16868 7.2958 8.70149 7.13367 9.22085 7.06384C9.69656 6.99989 10.2843 6.99994 10.9384 7H13.0616Z',
  d11: 'M8 5.5V3M16 5.5V3',
  d12: 'M18.5 8L21 8M18.5 16H21',
  d13: 'M8 21V18.5M16 21V18.5',
  d14: 'M3 8L5.5 8M3 16H5.5',
  d15: 'M16 8H8V16H16V8Z',
  d16: 'M9 3V5.5H7V3H9ZM17 3V5.5H15V3H17Z',
  d17: 'M21 9H18.5V7L21 7V9ZM21 17H18.5V15H21V17Z',
  d18: 'M9 18.5V21H7V18.5H9ZM17 18.5V21H15V18.5H17Z',
  d19: 'M5.5 9H3V7L5.5 7V9ZM5.5 17H3V15H5.5V17Z',
  d20: 'M7 7H17V17H7V7Z',
};

export const IconArtboardStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="artboard-stroke-rounded IconArtboardStrokeRounded"
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
      <path 
        d={d.d3} 
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconArtboardDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="artboard-duotone-rounded IconArtboardDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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
      <path 
        d={d.d3} 
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconArtboardTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="artboard-twotone-rounded IconArtboardTwotoneRounded"
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
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
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
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconArtboardSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="artboard-solid-rounded IconArtboardSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const IconArtboardBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="artboard-bulk-rounded IconArtboardBulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const IconArtboardStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="artboard-stroke-sharp IconArtboardStrokeSharp"
    >
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d14} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d15} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconArtboardSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="artboard-solid-sharp IconArtboardSolidSharp"
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
        d={d.d20} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfArtboard: TheIconSelfPack = {
  name: 'Artboard',
  StrokeRounded: IconArtboardStrokeRounded,
  DuotoneRounded: IconArtboardDuotoneRounded,
  TwotoneRounded: IconArtboardTwotoneRounded,
  SolidRounded: IconArtboardSolidRounded,
  BulkRounded: IconArtboardBulkRounded,
  StrokeSharp: IconArtboardStrokeSharp,
  SolidSharp: IconArtboardSolidSharp,
};