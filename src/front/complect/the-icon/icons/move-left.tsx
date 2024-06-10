import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2 11.9999H12M2 11.9999C2 12.5619 2.4381 12.9891 3.3143 13.8436L4.97057 15.5M2 11.9999C2 11.4378 2.4381 11.0106 3.3143 10.1561L4.97044 8.5',
  d2: 'M22.75 12C22.75 9.79086 20.9591 8 18.75 8C16.5409 8 14.75 9.79086 14.75 12C14.75 14.2091 16.5409 16 18.75 16C20.9591 16 22.75 14.2091 22.75 12Z',
  d3: 'M13.25 11.9669C13.25 11.4146 12.8023 10.9669 12.25 10.9669L6.25001 10.9669L6.25002 9.63672C6.25023 9.49118 6.25054 9.27914 6.22459 9.09865C6.19622 8.90146 6.0881 8.38412 5.57266 8.12132C5.06102 7.86047 4.61181 8.08633 4.44363 8.18715C4.29313 8.27737 4.13604 8.4088 4.02953 8.49791L4.00293 8.52014C3.55419 8.89435 2.92867 9.43759 2.40774 9.97446C2.14941 10.2407 1.89262 10.5299 1.69331 10.8138C1.59355 10.9558 1.49256 11.1184 1.41318 11.294C1.33861 11.4588 1.24998 11.7066 1.24999 12C1.24999 12.2934 1.33861 12.5411 1.41318 12.706C1.49256 12.8815 1.59355 13.0441 1.69331 13.1862C1.89262 13.47 2.1494 13.7592 2.40773 14.0255C2.92865 14.5624 3.55416 15.1056 4.0029 15.4798L4.02949 15.5021C4.13601 15.5912 4.29309 15.7226 4.44359 15.8128C4.61177 15.9137 5.06098 16.1395 5.57262 15.8787C6.08808 15.6159 6.1962 15.0986 6.22456 14.9014C6.25052 14.7209 6.25021 14.5088 6.25 14.3633L6.25001 12.9669H12.25C12.8023 12.9669 13.25 12.5192 13.25 11.9669Z',
  d4: 'M12 11.9999H2.40693M4.97057 15.5L2 11.9999L4.97044 8.5',
  d5: 'M22.5 12.5C22.5 10.4289 20.8211 8.75 18.75 8.75C16.6789 8.75 15 10.4289 15 12.5C15 14.5711 16.6789 16.25 18.75 16.25C20.8211 16.25 22.5 14.5711 22.5 12.5Z',
  d6: 'M12.9835 11.4999L4.47196 11.4999L6.3974 9.29417L4.87257 8L1 12.4999L4.87257 16.9999L6.39742 15.7057L4.47191 13.4999H12.9835V11.4999Z',
};

export const IconMoveLeftStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="move-left-stroke-rounded IconMoveLeftStrokeRounded"
    >
      <circle 
        cx="3" 
        cy="3" 
        r="3" 
        transform="matrix(1 0 0 1 22 9)" 
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

export const IconMoveLeftDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="move-left-duotone-rounded IconMoveLeftDuotoneRounded"
    >
      <circle 
        opacity="var(--icon-opacity)" 
        cx="3" 
        cy="3" 
        r="3" 
        transform="matrix(1 0 0 1 22 9)" 
        fill="var(--icon-fill)"></circle>
      <circle 
        cx="3" 
        cy="3" 
        r="3" 
        transform="matrix(1 0 0 1 22 9)" 
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

export const IconMoveLeftTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="move-left-twotone-rounded IconMoveLeftTwotoneRounded"
    >
      <circle 
        opacity="var(--icon-opacity)" 
        cx="3" 
        cy="3" 
        r="3" 
        transform="matrix(1 0 0 1 22 9)" 
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

export const IconMoveLeftSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="move-left-solid-rounded IconMoveLeftSolidRounded"
    >
      <path 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMoveLeftBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="move-left-bulk-rounded IconMoveLeftBulkRounded"
    >
      <path 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMoveLeftStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="move-left-stroke-sharp IconMoveLeftStrokeSharp"
    >
      <circle 
        cx="3" 
        cy="3" 
        r="3" 
        transform="matrix(1 0 0 1 22 9)" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconMoveLeftSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="move-left-solid-sharp IconMoveLeftSolidSharp"
    >
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

export const iconPackOfMoveLeft: TheIconSelfPack = {
  name: 'MoveLeft',
  StrokeRounded: IconMoveLeftStrokeRounded,
  DuotoneRounded: IconMoveLeftDuotoneRounded,
  TwotoneRounded: IconMoveLeftTwotoneRounded,
  SolidRounded: IconMoveLeftSolidRounded,
  BulkRounded: IconMoveLeftBulkRounded,
  StrokeSharp: IconMoveLeftStrokeSharp,
  SolidSharp: IconMoveLeftSolidSharp,
};