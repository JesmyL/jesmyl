import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M21 21H10C6.70017 21 5.05025 21 4.02513 19.9749C3 18.9497 3 17.2998 3 14V3',
  d2: 'M3 2C3.55229 2 4 2.44772 4 3V14C4 15.6782 4.00213 16.8362 4.11923 17.7072C4.23246 18.5494 4.43644 18.972 4.73223 19.2678C5.02803 19.5636 5.45059 19.7675 6.2928 19.8808C7.16378 19.9979 8.32182 20 10 20H21C21.5523 20 22 20.4477 22 21C22 21.5523 21.5523 22 21 22H9.928C8.33933 22 7.04616 22.0001 6.0263 21.8629C4.96232 21.7199 4.04735 21.4113 3.31802 20.682C2.58869 19.9526 2.28011 19.0377 2.13706 17.9737C1.99994 16.9538 1.99997 15.6607 2 14.072L2 3C2 2.44772 2.44772 2 3 2Z',
  d3: 'M8 5.5C6.61929 5.5 5.5 6.61929 5.5 8C5.5 9.38071 6.61929 10.5 8 10.5C9.38071 10.5 10.5 9.38071 10.5 8C10.5 6.61929 9.38071 5.5 8 5.5Z',
  d4: 'M11.5 12.5C9.84315 12.5 8.5 13.8431 8.5 15.5C8.5 17.1569 9.84315 18.5 11.5 18.5C13.1569 18.5 14.5 17.1569 14.5 15.5C14.5 13.8431 13.1569 12.5 11.5 12.5Z',
  d5: 'M17.5 3.5C15.2909 3.5 13.5 5.29086 13.5 7.5C13.5 9.70914 15.2909 11.5 17.5 11.5C19.7091 11.5 21.5 9.70914 21.5 7.5C21.5 5.29086 19.7091 3.5 17.5 3.5Z',
  d6: 'M21 21H3V3',
  d7: 'M4.5 19.5V2.5H2.5V20.5C2.5 21.0523 2.94772 21.5 3.5 21.5H21.5V19.5H4.5Z',
};

export const IconChartBubble01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-bubble-01-stroke-rounded IconChartBubble01StrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <circle 
        cx="8" 
        cy="8" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="11.5" 
        cy="15.5" 
        r="2.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="17.5" 
        cy="7.5" 
        r="3.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconChartBubble01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-bubble-01-duotone-rounded IconChartBubble01DuotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <circle 
        opacity="var(--icon-opacity)" 
        cx="8" 
        cy="8" 
        r="2" 
        fill="var(--icon-fill)"></circle>
      <circle 
        cx="8" 
        cy="8" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        opacity="var(--icon-opacity)" 
        cx="11.5" 
        cy="15.5" 
        r="2.5" 
        fill="var(--icon-fill)"></circle>
      <circle 
        cx="11.5" 
        cy="15.5" 
        r="2.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        opacity="var(--icon-opacity)" 
        cx="17.5" 
        cy="7.5" 
        r="3.5" 
        fill="var(--icon-fill)"></circle>
      <circle 
        cx="17.5" 
        cy="7.5" 
        r="3.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconChartBubble01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-bubble-01-twotone-rounded IconChartBubble01TwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <circle 
        opacity="var(--icon-opacity)" 
        cx="8" 
        cy="8" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        opacity="var(--icon-opacity)" 
        cx="11.5" 
        cy="15.5" 
        r="2.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        opacity="var(--icon-opacity)" 
        cx="17.5" 
        cy="7.5" 
        r="3.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconChartBubble01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-bubble-01-solid-rounded IconChartBubble01SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
      <circle 
        cx="8" 
        cy="8" 
        r="2" 
        fill="var(--icon-fill)"></circle>
      <circle 
        cx="11.5" 
        cy="15.5" 
        r="2.5" 
        fill="var(--icon-fill)"></circle>
      <circle 
        cx="17.5" 
        cy="7.5" 
        r="3.5" 
        fill="var(--icon-fill)"></circle>
    </TheIconWrapper>
  );
};

export const IconChartBubble01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-bubble-01-bulk-rounded IconChartBubble01BulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconChartBubble01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-bubble-01-stroke-sharp IconChartBubble01StrokeSharp"
    >
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <circle 
        cx="8" 
        cy="8" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="11.5" 
        cy="15.5" 
        r="2.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="17.5" 
        cy="7.5" 
        r="3.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
    </TheIconWrapper>
  );
};

export const IconChartBubble01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-bubble-01-solid-sharp IconChartBubble01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <circle 
        cx="8.5" 
        cy="7.5" 
        r="2" 
        fill="var(--icon-fill)"></circle>
      <circle 
        cx="12" 
        cy="15" 
        r="2.5" 
        fill="var(--icon-fill)"></circle>
      <circle 
        cx="18" 
        cy="7" 
        r="3.5" 
        fill="var(--icon-fill)"></circle>
    </TheIconWrapper>
  );
};

export const iconPackOfChartBubble01: TheIconSelfPack = {
  name: 'ChartBubble01',
  StrokeRounded: IconChartBubble01StrokeRounded,
  DuotoneRounded: IconChartBubble01DuotoneRounded,
  TwotoneRounded: IconChartBubble01TwotoneRounded,
  SolidRounded: IconChartBubble01SolidRounded,
  BulkRounded: IconChartBubble01BulkRounded,
  StrokeSharp: IconChartBubble01StrokeSharp,
  SolidSharp: IconChartBubble01SolidSharp,
};