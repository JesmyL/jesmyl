import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 15V10',
  d2: 'M22 13C22 7.47715 17.5228 3 12 3C6.47715 3 2 7.47715 2 13',
  d3: 'M12 15C10.3431 15 9 16.3431 9 18C9 19.6569 10.3431 21 12 21C13.6569 21 15 19.6569 15 18C15 16.3431 13.6569 15 12 15ZM12 15V10',
  d4: 'M13 10C13 9.44772 12.5523 9 12 9C11.4477 9 11 9.44772 11 10V15.1707C9.83481 15.5825 9 16.6938 9 18C9 19.6569 10.3431 21 12 21C13.6569 21 15 19.6569 15 18C15 16.6938 14.1652 15.5825 13 15.1707V10Z',
  d5: 'M12 5C7.58172 5 4 8.58172 4 13C4 13.5523 3.55228 14 3 14C2.44772 14 2 13.5523 2 13C2 7.47715 6.47715 3 12 3C17.5228 3 22 7.47715 22 13C22 13.5523 21.5523 14 21 14C20.4477 14 20 13.5523 20 13C20 8.58172 16.4183 5 12 5Z',
  d6: 'M12 14V8',
  d7: 'M22 14C22 8.47715 17.5228 4 12 4C6.47715 4 2 8.47715 2 14',
  d8: 'M8.25 17C8.25 14.9289 9.92893 13.25 12 13.25C14.0711 13.25 15.75 14.9289 15.75 17C15.75 19.0711 14.0711 20.75 12 20.75C9.92893 20.75 8.25 19.0711 8.25 17Z',
  d9: 'M13 8V14H11V8H13Z',
  d10: 'M12 5.20455C7.1424 5.20455 3.20455 9.1424 3.20455 14H1.25C1.25 8.06294 6.06294 3.25 12 3.25C17.9371 3.25 22.75 8.06294 22.75 14H20.7955C20.7955 9.1424 16.8576 5.20455 12 5.20455Z',
};

export const IconDashboardSpeed02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="DashboardSpeed02 StrokeRounded"
    >
      <circle 
        cx="12"
        cy="18"
        r="3"
        i-c="s sw"
      />
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconDashboardSpeed02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="DashboardSpeed02 DuotoneRounded"
    >
      <circle 
        cx="12"
        cy="18"
        r="3"
        i-c="f o7"
      />
      <circle 
        cx="12"
        cy="18"
        r="3"
        i-c="s sw"
      />
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconDashboardSpeed02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="DashboardSpeed02 TwotoneRounded"
    >
      <path 
        d={d.d3}
        i-c="o7 s sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconDashboardSpeed02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="DashboardSpeed02 SolidRounded"
    >
      <path 
        d={d.d4}
        i-c="f"
      />
      <path 
        d={d.d5}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconDashboardSpeed02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="DashboardSpeed02 BulkRounded"
    >
      <path 
        d={d.d4}
        i-c="f o7"
      />
      <path 
        d={d.d5}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconDashboardSpeed02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="DashboardSpeed02 StrokeSharp"
    >
      <circle 
        cx="12"
        cy="17"
        r="3"
        i-c="s sw"
      />
      <path 
        d={d.d6}
        i-c="s sw"
      />
      <path 
        d={d.d7}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconDashboardSpeed02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="DashboardSpeed02 SolidSharp"
    >
      <path 
        d={d.d8}
        i-c="f"
      />
      <path 
        d={d.d9}
        i-c="c f fr"
      />
      <path 
        d={d.d10}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfDashboardSpeed02: TheIconSelfPack = [
  'DashboardSpeed02',
  IconDashboardSpeed02StrokeRounded,
  IconDashboardSpeed02DuotoneRounded,
  IconDashboardSpeed02TwotoneRounded,
  IconDashboardSpeed02SolidRounded,
  IconDashboardSpeed02BulkRounded,
  IconDashboardSpeed02StrokeSharp,
  IconDashboardSpeed02SolidSharp,
];