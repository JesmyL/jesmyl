import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3 21H21',
  d2: 'M19 18L15.6247 9.15847C14.0574 5.05282 13.2737 3 12 3C10.7263 3 9.94261 5.05282 8.37527 9.15847L5 18',
  d3: 'M8 11H16',
  d4: 'M11.9996 3C13.2733 3 14.057 5.05282 15.6243 9.15847L16.3274 11H7.67188L8.37488 9.15847C9.94222 5.05282 10.7259 3 11.9996 3Z',
  d5: 'M2 21C2 20.4477 2.44772 20 3 20H21C21.5523 20 22 20.4477 22 21C22 21.5523 21.5523 22 21 22H3C2.44772 22 2 21.5523 2 21Z',
  d6: 'M11.1791 5.01263C10.666 5.96834 10.1045 7.43332 9.30978 9.51512L9.12467 10H14.8759L14.6908 9.51512C13.896 7.43333 13.3346 5.96834 12.8215 5.01263C12.2726 3.99019 12.0098 3.99966 12.0005 3.99999C11.9912 3.99966 11.728 3.99019 11.1791 5.01263ZM15.6394 12L18.066 18.3566C18.263 18.8726 18.841 19.1312 19.3569 18.9342C19.8729 18.7373 20.1315 18.1593 19.9345 17.6434L16.5299 8.72508C15.7711 6.73714 15.1651 5.14982 14.5836 4.06661C14.0366 3.04769 13.2703 2 12.0003 2C10.7302 2 9.96398 3.04769 9.41695 4.0666C8.83541 5.14982 8.22946 6.73715 7.47059 8.72509L4.06603 17.6434C3.86906 18.1593 4.12766 18.7373 4.64362 18.9342C5.15959 19.1312 5.73754 18.8726 5.93451 18.3566L8.36117 12H15.6394Z',
  d7: 'M19 18L12.5 3H11.5L5 18M7.5 13H16.5',
  d8: 'M21 22H3V20H21V22Z',
  d9: 'M10.8431 2H13.1561L19.9171 17.6024L18.082 18.3976L16.1764 14H7.82277L5.91714 18.3976L4.08203 17.6024L10.8431 2ZM8.68944 12H15.3097L11.9996 4.3612L8.68944 12Z',
};

export const IconTextColorStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="text-color-stroke-rounded IconTextColorStrokeRounded"
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
        strokeLinecap="round" 
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

export const IconTextColorDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="text-color-duotone-rounded IconTextColorDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
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
        strokeLinecap="round" 
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

export const IconTextColorTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="text-color-twotone-rounded IconTextColorTwotoneRounded"
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
        strokeLinecap="round" 
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

export const IconTextColorSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="text-color-solid-rounded IconTextColorSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const IconTextColorBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="text-color-bulk-rounded IconTextColorBulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconTextColorStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="text-color-stroke-sharp IconTextColorStrokeSharp"
    >
      <path 
        d={d.d1} 
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

export const IconTextColorSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="text-color-solid-sharp IconTextColorSolidSharp"
    >
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
    </TheIconWrapper>
  );
};

export const iconPackOfTextColor: TheIconSelfPack = {
  name: 'TextColor',
  StrokeRounded: IconTextColorStrokeRounded,
  DuotoneRounded: IconTextColorDuotoneRounded,
  TwotoneRounded: IconTextColorTwotoneRounded,
  SolidRounded: IconTextColorSolidRounded,
  BulkRounded: IconTextColorBulkRounded,
  StrokeSharp: IconTextColorStrokeSharp,
  SolidSharp: IconTextColorSolidSharp,
};