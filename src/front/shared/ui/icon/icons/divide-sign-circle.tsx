import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M7 12H17M13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8ZM13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16C11 15.4477 11.4477 15 12 15C12.5523 15 13 15.4477 13 16Z',
  d2: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM10.25 8C10.25 7.0335 11.0335 6.25 12 6.25C12.9665 6.25 13.75 7.0335 13.75 8C13.75 8.9665 12.9665 9.75 12 9.75C11.0335 9.75 10.25 8.9665 10.25 8ZM10.25 16C10.25 15.0335 11.0335 14.25 12 14.25C12.9665 14.25 13.75 15.0335 13.75 16C13.75 16.9665 12.9665 17.75 12 17.75C11.0335 17.75 10.25 16.9665 10.25 16ZM7 11C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13H17C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11H7Z',
  d3: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z',
  d4: 'M10.25 8C10.25 7.0335 11.0335 6.25 12 6.25C12.9665 6.25 13.75 7.0335 13.75 8C13.75 8.9665 12.9665 9.75 12 9.75C11.0335 9.75 10.25 8.9665 10.25 8Z',
  d5: 'M10.25 16C10.25 15.0335 11.0335 14.25 12 14.25C12.9665 14.25 13.75 15.0335 13.75 16C13.75 16.9665 12.9665 17.75 12 17.75C11.0335 17.75 10.25 16.9665 10.25 16Z',
  d6: 'M6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12Z',
  d7: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM10.25 8C10.25 7.0335 11.0335 6.25 12 6.25C12.9665 6.25 13.75 7.0335 13.75 8C13.75 8.9665 12.9665 9.75 12 9.75C11.0335 9.75 10.25 8.9665 10.25 8ZM10.25 16C10.25 15.0335 11.0335 14.25 12 14.25C12.9665 14.25 13.75 15.0335 13.75 16C13.75 16.9665 12.9665 17.75 12 17.75C11.0335 17.75 10.25 16.9665 10.25 16ZM7 13H17V11H7V13Z',
};

export const IconDivideSignCircleStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="divide-sign-circle-stroke-rounded IconDivideSignCircleStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconDivideSignCircleDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="divide-sign-circle-duotone-rounded IconDivideSignCircleDuotoneRounded"
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
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconDivideSignCircleTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="divide-sign-circle-twotone-rounded IconDivideSignCircleTwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconDivideSignCircleSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="divide-sign-circle-solid-rounded IconDivideSignCircleSolidRounded"
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

export const IconDivideSignCircleBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="divide-sign-circle-bulk-rounded IconDivideSignCircleBulkRounded"
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconDivideSignCircleStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="divide-sign-circle-stroke-sharp IconDivideSignCircleStrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
    </TheIconWrapper>
  );
};

export const IconDivideSignCircleSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="divide-sign-circle-solid-sharp IconDivideSignCircleSolidSharp"
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

export const iconPackOfDivideSignCircle: TheIconSelfPack = {
  name: 'DivideSignCircle',
  StrokeRounded: IconDivideSignCircleStrokeRounded,
  DuotoneRounded: IconDivideSignCircleDuotoneRounded,
  TwotoneRounded: IconDivideSignCircleTwotoneRounded,
  SolidRounded: IconDivideSignCircleSolidRounded,
  BulkRounded: IconDivideSignCircleBulkRounded,
  StrokeSharp: IconDivideSignCircleStrokeSharp,
  SolidSharp: IconDivideSignCircleSolidSharp,
};