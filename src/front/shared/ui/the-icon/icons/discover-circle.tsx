import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z',
  d2: 'M12.4014 8.29796L15.3213 7.32465C16.2075 7.02924 16.6507 6.88153 16.8846 7.11544C17.1185 7.34935 16.9708 7.79247 16.6753 8.67871L15.702 11.5986C15.1986 13.1088 14.9469 13.8639 14.4054 14.4054C13.8639 14.9469 13.1088 15.1986 11.5986 15.702L8.67871 16.6753C7.79247 16.9708 7.34935 17.1185 7.11544 16.8846C6.88153 16.6507 7.02924 16.2075 7.32465 15.3213L8.29796 12.4014C8.80136 10.8912 9.05306 10.1361 9.59457 9.59457C10.1361 9.05306 10.8912 8.80136 12.4014 8.29796Z',
  d3: 'M12 12L11.9936 12.0064',
  d4: 'M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM15.3213 7.32465L12.4014 8.29796C10.8912 8.80136 10.1361 9.05306 9.59457 9.59457C9.05306 10.1361 8.80136 10.8912 8.29796 12.4014L7.32465 15.3213C7.02924 16.2075 6.88153 16.6507 7.11544 16.8846C7.34935 17.1185 7.79247 16.9708 8.67871 16.6753L11.5986 15.702C13.1088 15.1986 13.8639 14.9469 14.4054 14.4054C14.9469 13.8639 15.1986 13.1088 15.702 11.5986L16.6753 8.67871C16.9708 7.79248 17.1185 7.34935 16.8846 7.11544C16.6507 6.88153 16.2075 7.02924 15.3213 7.32465Z',
  d5: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM12.4014 8.29796L15.3213 7.32465C16.2075 7.02924 16.6507 6.88153 16.8846 7.11544C17.1185 7.34935 16.9708 7.79246 16.6754 8.6787L15.702 11.5986C15.1986 13.1088 14.9469 13.8639 14.4054 14.4054C13.8639 14.9469 13.1088 15.1986 11.5986 15.702L8.67871 16.6753C7.79247 16.9708 7.34935 17.1185 7.11544 16.8846C6.88153 16.6507 7.02924 16.2075 7.32465 15.3213L8.29796 12.4014C8.80136 10.8912 9.05306 10.1361 9.59457 9.59457C10.1361 9.05306 10.8912 8.80136 12.4014 8.29796ZM12.708 11.292C13.0973 11.6813 13.0973 12.3124 12.708 12.7017L12.7017 12.708C12.3124 13.0973 11.6813 13.0973 11.292 12.708C10.9027 12.3187 10.9027 11.6876 11.292 11.2983L11.2983 11.292C11.6876 10.9027 12.3187 10.9027 12.708 11.292Z',
  d6: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25Z',
  d7: 'M15.3213 7.32465L12.4014 8.29796C10.8912 8.80136 10.1361 9.05306 9.59457 9.59457C9.05306 10.1361 8.80136 10.8912 8.29796 12.4014L7.32465 15.3213C7.02924 16.2075 6.88153 16.6507 7.11544 16.8846C7.34935 17.1185 7.79247 16.9708 8.67871 16.6753L11.5986 15.702C13.1088 15.1986 13.8639 14.9469 14.4054 14.4054C14.9469 13.8639 15.1986 13.1088 15.702 11.5986L16.6754 8.6787C16.9708 7.79246 17.1185 7.34935 16.8846 7.11544C16.6507 6.88153 16.2075 7.02924 15.3213 7.32465ZM12.708 12.7017C13.0973 12.3124 13.0973 11.6813 12.708 11.292C12.3187 10.9027 11.6876 10.9027 11.2983 11.292L11.292 11.2983C10.9027 11.6876 10.9027 12.3187 11.292 12.708C11.6813 13.0973 12.3124 13.0973 12.7017 12.708L12.708 12.7017Z',
  d8: 'M11.9996 12L11.9932 12.0064',
  d9: 'M7.00646 17.0009L9.49255 9.50589L16.9472 7.01823C17.0258 6.99203 17.0009 7.00694 16.974 7.08527L14.5054 14.5002L7.00646 17.0009ZM7.00646 17.0009C6.97982 17.0794 6.92794 17.0276 7.00646 17.0009Z',
  d10: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM17 7L9.5 9.5L7 17L14.5017 14.5L17 7Z',
  d11: 'M12.7002 11.292C13.0895 11.6813 13.0895 12.3124 12.7002 12.7017L12.6939 12.708C12.3046 13.0973 11.6734 13.0973 11.2842 12.708C10.8949 12.3187 10.8949 11.6876 11.2842 11.2983L11.2905 11.292C11.6798 10.9027 12.3109 10.9027 12.7002 11.292Z',
};

export const IconDiscoverCircleStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="discover-circle-stroke-rounded IconDiscoverCircleStrokeRounded"
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconDiscoverCircleDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="discover-circle-duotone-rounded IconDiscoverCircleDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconDiscoverCircleTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="discover-circle-twotone-rounded IconDiscoverCircleTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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
    </TheIconWrapper>
  );
};

export const IconDiscoverCircleSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="discover-circle-solid-rounded IconDiscoverCircleSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconDiscoverCircleBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="discover-circle-bulk-rounded IconDiscoverCircleBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconDiscoverCircleStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="discover-circle-stroke-sharp IconDiscoverCircleStrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconDiscoverCircleSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="discover-circle-solid-sharp IconDiscoverCircleSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfDiscoverCircle: TheIconSelfPack = {
  name: 'DiscoverCircle',
  StrokeRounded: IconDiscoverCircleStrokeRounded,
  DuotoneRounded: IconDiscoverCircleDuotoneRounded,
  TwotoneRounded: IconDiscoverCircleTwotoneRounded,
  SolidRounded: IconDiscoverCircleSolidRounded,
  BulkRounded: IconDiscoverCircleBulkRounded,
  StrokeSharp: IconDiscoverCircleStrokeSharp,
  SolidSharp: IconDiscoverCircleSolidSharp,
};