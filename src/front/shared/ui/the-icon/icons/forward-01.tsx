import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M19.9351 12.6258C19.6807 13.8374 18.327 14.7077 15.6198 16.4481C12.6753 18.3411 11.203 19.2876 10.0105 18.9229C9.60662 18.7994 9.23463 18.5823 8.92227 18.2876C8 17.4178 8 15.6118 8 12C8 8.38816 8 6.58224 8.92227 5.71235C9.23463 5.41773 9.60662 5.20057 10.0105 5.07707C11.203 4.71243 12.6753 5.6589 15.6198 7.55186C18.327 9.29233 19.6807 10.1626 19.9351 11.3742C20.0216 11.7865 20.0216 12.2135 19.9351 12.6258Z',
  d2: 'M4 5L4 19',
  d3: 'M16.1047 6.89181L16.194 6.94923C17.5106 7.79563 18.557 8.4683 19.3005 9.08377C20.0569 9.70986 20.6149 10.3671 20.7941 11.2203C20.902 11.7342 20.902 12.2661 20.7941 12.78C20.6149 13.6333 20.0569 14.2905 19.3005 14.9166C18.557 15.532 17.5106 16.2047 16.1941 17.0511L16.1047 17.1085C14.6711 18.0301 13.5358 18.7601 12.6094 19.2076C11.6773 19.658 10.7912 19.9079 9.91621 19.6403C9.4001 19.4825 8.92749 19.2058 8.53265 18.8334C7.87188 18.2102 7.61562 17.3148 7.49511 16.2571C7.37498 15.2029 7.37499 13.8139 7.375 12.051V11.9493C7.37499 10.1865 7.37498 8.79739 7.49511 7.7432C7.61562 6.68556 7.87188 5.79017 8.53265 5.16692C8.92749 4.7945 9.4001 4.51783 9.91621 4.36001C10.7912 4.09245 11.6773 4.34237 12.6094 4.79271C13.5358 5.24027 14.6711 5.97018 16.1047 6.89181Z',
  d4: 'M4.125 4C3.57272 4 3.125 4.44772 3.125 5V19C3.125 19.5523 3.57272 20 4.125 20C4.67728 20 5.125 19.5523 5.125 19V5C5.125 4.44772 4.67728 4 4.125 4Z',
  d5: 'M8 19V5L20 12L8 19Z',
  d6: 'M4 4V20',
  d7: 'M7.62645 4.34964C7.39358 4.4834 7.25 4.73145 7.25 5V19C7.25 19.2685 7.39358 19.5166 7.62645 19.6504C7.85932 19.7841 8.14594 19.7831 8.3779 19.6478L20.3779 12.6478C20.6083 12.5134 20.75 12.2668 20.75 12C20.75 11.7332 20.6083 11.4866 20.3779 11.3522L8.3779 4.35217C8.14594 4.21685 7.85932 4.21589 7.62645 4.34964Z',
  d8: 'M5.25 19.75V4.25H3.25V19.75H5.25Z',
};

export const IconForward01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="forward-01-stroke-rounded IconForward01StrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
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

export const IconForward01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="forward-01-duotone-rounded IconForward01DuotoneRounded"
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
        strokeLinejoin="round" 
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

export const IconForward01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="forward-01-twotone-rounded IconForward01TwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconForward01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="forward-01-solid-rounded IconForward01SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconForward01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="forward-01-bulk-rounded IconForward01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconForward01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="forward-01-stroke-sharp IconForward01StrokeSharp"
    >
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
      />
    </TheIconWrapper>
  );
};

export const IconForward01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="forward-01-solid-sharp IconForward01SolidSharp"
    >
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfForward01: TheIconSelfPack = {
  name: 'Forward01',
  StrokeRounded: IconForward01StrokeRounded,
  DuotoneRounded: IconForward01DuotoneRounded,
  TwotoneRounded: IconForward01TwotoneRounded,
  SolidRounded: IconForward01SolidRounded,
  BulkRounded: IconForward01BulkRounded,
  StrokeSharp: IconForward01StrokeSharp,
  SolidSharp: IconForward01SolidSharp,
};