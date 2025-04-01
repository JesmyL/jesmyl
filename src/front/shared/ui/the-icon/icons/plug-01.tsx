import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M15.5 2V6M8.5 6V2',
  d2: 'M6.00446 7.61331C5.93719 6.74273 6.63957 6 7.53014 6H16.4699C17.3604 6 18.0628 6.74273 17.9955 7.61331L17.8117 9.99197C17.6796 11.7019 17.1011 13.3498 16.132 14.7773L15.5312 15.6622C14.9638 16.4979 14.0077 17 12.9838 17H11.0162C9.99228 17 9.03617 16.4979 8.46881 15.6622L7.86803 14.7773C6.89885 13.3498 6.32041 11.7019 6.18827 9.99197L6.00446 7.61331Z',
  d3: 'M12 17V22',
  d4: 'M11 9H13',
  d5: 'M8.5 1C9.05228 1 9.5 1.44772 9.5 2V6C9.5 6.55228 9.05228 7 8.5 7C7.94772 7 7.5 6.55228 7.5 6V2C7.5 1.44772 7.94772 1 8.5 1ZM15.5 1C16.0523 1 16.5 1.44772 16.5 2V6C16.5 6.55228 16.0523 7 15.5 7C14.9477 7 14.5 6.55228 14.5 6V2C14.5 1.44772 14.9477 1 15.5 1Z',
  d6: 'M12 16C12.5523 16 13 16.4477 13 17V22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22V17C11 16.4477 11.4477 16 12 16Z',
  d7: 'M7.53024 5.25C6.21844 5.25 5.15465 6.34927 5.25679 7.6711L5.4406 10.0498C5.58286 11.8907 6.20558 13.6637 7.24763 15.1986L7.84841 16.0835C8.55765 17.1282 9.74797 17.75 11.0163 17.75H12.9839C14.2522 17.75 15.4425 17.1282 16.1518 16.0835L16.7526 15.1986C17.7946 13.6637 18.4173 11.8907 18.5596 10.0498L18.7434 7.6711C18.8456 6.34927 17.7818 5.25 16.47 5.25H7.53024ZM11 8.25C10.5858 8.25 10.25 8.58579 10.25 9C10.25 9.41421 10.5858 9.75 11 9.75H13C13.4142 9.75 13.75 9.41421 13.75 9C13.75 8.58579 13.4142 8.25 13 8.25H11Z',
  d8: 'M5.25679 7.6711C5.15465 6.34927 6.21844 5.25 7.53024 5.25H16.47C17.7818 5.25 18.8456 6.34927 18.7434 7.6711L18.5596 10.0498C18.4173 11.8907 17.7946 13.6637 16.7526 15.1986L16.1518 16.0835C15.4425 17.1282 14.2522 17.75 12.9839 17.75H11.0163C9.74797 17.75 8.55765 17.1282 7.84841 16.0835L7.24763 15.1986C6.20558 13.6637 5.58286 11.8907 5.4406 10.0498L5.25679 7.6711Z',
  d9: 'M11 17.75V22C11 22.5523 11.4477 23 12 23C12.5523 23 13 22.5523 13 22V17.75C12.9946 17.75 12.9892 17.75 12.9839 17.75H11.0163C11.0109 17.75 11.0054 17.75 11 17.75Z',
  d10: 'M10.25 9C10.25 8.58579 10.5858 8.25 11 8.25H13C13.4142 8.25 13.75 8.58579 13.75 9C13.75 9.41421 13.4142 9.75 13 9.75H11C10.5858 9.75 10.25 9.41421 10.25 9Z',
  d11: 'M9.5 2C9.5 1.44772 9.05228 1 8.5 1C7.94772 1 7.5 1.44772 7.5 2V5.2502C7.51007 5.25007 7.52015 5.25 7.53024 5.25H9.5V2Z',
  d12: 'M16.5 5.25019C16.49 5.25006 16.48 5.25 16.47 5.25H14.5V2C14.5 1.44772 14.9477 1 15.5 1C16.0523 1 16.5 1.44772 16.5 2V5.25019Z',
  d13: 'M18.0004 6H6V12L9.5 17H14.5L18 12L18.0004 6Z',
  d14: 'M9.5 1V7H7.5V1H9.5ZM16.5 1V7H14.5V1H16.5Z',
  d15: 'M13 16V23H11V16H13Z',
  d16: 'M18.7505 5.25H5.25V12.2364L9.10951 17.75H14.8905L18.75 12.2364L18.7505 5.25ZM13.75 8.25H10.25V9.75H13.75V8.25Z',
};

export const IconPlug01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="plug-01-stroke-rounded IconPlug01StrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconPlug01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="plug-01-duotone-rounded IconPlug01DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
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
    </TheIconWrapper>
  );
};

export const IconPlug01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="plug-01-twotone-rounded IconPlug01TwotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconPlug01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="plug-01-solid-rounded IconPlug01SolidRounded"
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconPlug01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="plug-01-bulk-rounded IconPlug01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
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
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconPlug01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="plug-01-stroke-sharp IconPlug01StrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconPlug01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="plug-01-solid-sharp IconPlug01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfPlug01: TheIconSelfPack = {
  name: 'Plug01',
  StrokeRounded: IconPlug01StrokeRounded,
  DuotoneRounded: IconPlug01DuotoneRounded,
  TwotoneRounded: IconPlug01TwotoneRounded,
  SolidRounded: IconPlug01SolidRounded,
  BulkRounded: IconPlug01BulkRounded,
  StrokeSharp: IconPlug01StrokeSharp,
  SolidSharp: IconPlug01SolidSharp,
};