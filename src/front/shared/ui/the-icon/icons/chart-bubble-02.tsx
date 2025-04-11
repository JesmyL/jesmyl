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
      the-icon="ChartBubble02 StrokeRounded"
    >
      <circle 
        cx="5"
        cy="7"
        r="3"
        i-c="s sw"
      />
      <circle 
        cx="8"
        cy="18"
        r="4"
        i-c="s sw"
      />
      <circle 
        cx="17"
        cy="7"
        r="5"
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconChartBubble02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ChartBubble02 DuotoneRounded"
    >
      <circle 
        cx="8"
        cy="18"
        r="4"
        i-c="f o7"
      />
      <circle 
        cx="17"
        cy="7"
        r="5"
        i-c="f o7"
      />
      <circle 
        cx="5"
        cy="7"
        r="3"
        i-c="s sw"
      />
      <circle 
        cx="8"
        cy="18"
        r="4"
        i-c="s sw"
      />
      <circle 
        cx="17"
        cy="7"
        r="5"
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconChartBubble02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ChartBubble02 TwotoneRounded"
    >
      <circle 
        cx="5"
        cy="7"
        r="3"
        i-c="s sw"
      />
      <circle 
        cx="8"
        cy="18"
        r="4"
        i-c="o7 s sw"
      />
      <circle 
        cx="17"
        cy="7"
        r="5"
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconChartBubble02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ChartBubble02 SolidRounded"
    >
      <path 
        d={d.d1}
        i-c="f"
      />
      <path 
        d={d.d2}
        i-c="f"
      />
      <path 
        d={d.d3}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconChartBubble02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ChartBubble02 BulkRounded"
    >
      <path 
        d={d.d1}
        i-c="f"
      />
      <path 
        d={d.d2}
        i-c="f"
      />
      <path 
        d={d.d3}
        i-c="f o7"
      />
    </TheIconWrapper>
  );
};

export const IconChartBubble02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ChartBubble02 StrokeSharp"
    >
      <circle 
        cx="5"
        cy="7"
        r="3"
        i-c="s sj sw"
      />
      <circle 
        cx="8"
        cy="18"
        r="4"
        i-c="s sj sw"
      />
      <circle 
        cx="17"
        cy="7"
        r="5"
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconChartBubble02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ChartBubble02 SolidSharp"
    >
      <circle 
        cx="5"
        cy="7"
        r="3"
        i-c="f"
      />
      <circle 
        cx="8"
        cy="18"
        r="4"
        i-c="f"
      />
      <circle 
        cx="17"
        cy="7"
        r="5"
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfChartBubble02: TheIconSelfPack = [
  'ChartBubble02',
  IconChartBubble02StrokeRounded,
  IconChartBubble02DuotoneRounded,
  IconChartBubble02TwotoneRounded,
  IconChartBubble02SolidRounded,
  IconChartBubble02BulkRounded,
  IconChartBubble02StrokeSharp,
  IconChartBubble02SolidSharp,
];