import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M1.25 7C1.25 4.92893 2.92893 3.25 5 3.25C7.07107 3.25 8.75 4.92893 8.75 7C8.75 9.07107 7.07107 10.75 5 10.75C2.92893 10.75 1.25 9.07107 1.25 7Z',
  d2: 'M3.25 18C3.25 15.3766 5.37665 13.25 8 13.25C10.6234 13.25 12.75 15.3766 12.75 18C12.75 20.6234 10.6234 22.75 8 22.75C5.37665 22.75 3.25 20.6234 3.25 18Z',
  d3: 'M11.25 7C11.25 3.82436 13.8244 1.25 17 1.25C20.1756 1.25 22.75 3.82436 22.75 7C22.75 10.1756 20.1756 12.75 17 12.75C13.8244 12.75 11.25 10.1756 11.25 7Z',
};

export const IconChartBubble02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-bubble-02-stroke-rounded IconChartBubble02StrokeRounded"
    >
      <circle 
        cx="5" 
        cy="7" 
        r="3" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="8" 
        cy="18" 
        r="4" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="17" 
        cy="7" 
        r="5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconChartBubble02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-bubble-02-duotone-rounded IconChartBubble02DuotoneRounded"
    >
      <circle 
        opacity="var(--icon-opacity)" 
        cx="8" 
        cy="18" 
        r="4" 
        fill="var(--icon-fill)"></circle>
      <circle 
        opacity="var(--icon-opacity)" 
        cx="17" 
        cy="7" 
        r="5" 
        fill="var(--icon-fill)"></circle>
      <circle 
        cx="5" 
        cy="7" 
        r="3" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="8" 
        cy="18" 
        r="4" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="17" 
        cy="7" 
        r="5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconChartBubble02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-bubble-02-twotone-rounded IconChartBubble02TwotoneRounded"
    >
      <circle 
        cx="5" 
        cy="7" 
        r="3" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        opacity="var(--icon-opacity)" 
        cx="8" 
        cy="18" 
        r="4" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="17" 
        cy="7" 
        r="5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconChartBubble02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-bubble-02-solid-rounded IconChartBubble02SolidRounded"
    >
      <path 
        d={d.d1} 
        fill="var(--icon-fill)" 
      />
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

export const IconChartBubble02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-bubble-02-bulk-rounded IconChartBubble02BulkRounded"
    >
      <path 
        d={d.d1} 
        fill="var(--icon-fill)" 
      />
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

export const IconChartBubble02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-bubble-02-stroke-sharp IconChartBubble02StrokeSharp"
    >
      <circle 
        cx="5" 
        cy="7" 
        r="3" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="8" 
        cy="18" 
        r="4" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="17" 
        cy="7" 
        r="5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
    </TheIconWrapper>
  );
};

export const IconChartBubble02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-bubble-02-solid-sharp IconChartBubble02SolidSharp"
    >
      <circle 
        cx="5" 
        cy="7" 
        r="3" 
        fill="var(--icon-fill)"></circle>
      <circle 
        cx="8" 
        cy="18" 
        r="4" 
        fill="var(--icon-fill)"></circle>
      <circle 
        cx="17" 
        cy="7" 
        r="5" 
        fill="var(--icon-fill)"></circle>
    </TheIconWrapper>
  );
};

export const iconPackOfChartBubble02: TheIconSelfPack = {
  name: 'ChartBubble02',
  StrokeRounded: IconChartBubble02StrokeRounded,
  DuotoneRounded: IconChartBubble02DuotoneRounded,
  TwotoneRounded: IconChartBubble02TwotoneRounded,
  SolidRounded: IconChartBubble02SolidRounded,
  BulkRounded: IconChartBubble02BulkRounded,
  StrokeSharp: IconChartBubble02StrokeSharp,
  SolidSharp: IconChartBubble02SolidSharp,
};