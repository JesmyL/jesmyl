import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M21 8.33333C20.0748 7.03165 18.8647 6 16.9782 6C8.4681 6 12.9194 20.5 5 20.5',
  d2: 'M21 21H10C6.70017 21 5.05025 21 4.02513 19.9749C3 18.9497 3 17.2998 3 14V3',
  d3: 'M3 2C3.55229 2 4 2.44772 4 3V14C4 15.6782 4.00213 16.8362 4.11923 17.7072C4.23246 18.5494 4.43644 18.972 4.73223 19.2678C4.81719 19.3527 4.91261 19.4301 5.02542 19.4999C5.84238 19.4961 6.44737 19.3095 6.92027 19.0222C7.40373 18.7286 7.8082 18.2938 8.16218 17.7136C8.88285 16.5323 9.29911 14.928 9.77129 13.1081C9.78072 13.0717 9.79018 13.0353 9.79966 12.9988C10.2608 11.2222 10.7843 9.23666 11.7972 7.71223C12.3172 6.92959 12.9821 6.24003 13.8565 5.75048C14.7334 5.25957 15.7671 5 16.9782 5C19.3178 5 20.7925 6.31527 21.8151 7.75401C22.1351 8.20418 22.0295 8.82848 21.5793 9.14843C21.1292 9.46838 20.5049 9.36282 20.1849 8.91265C19.3572 7.74804 18.4116 7 16.9782 7C16.0618 7 15.3731 7.19356 14.8335 7.49561C14.2916 7.79903 13.8462 8.24228 13.463 8.81902C12.6695 10.0133 12.2153 11.6528 11.7355 13.5012C11.7136 13.5857 11.6916 13.6707 11.6695 13.7561C11.2311 15.4503 10.7488 17.314 9.86953 18.7552C9.59577 19.2039 9.27617 19.6257 8.89728 19.9982C9.23801 19.9999 9.60456 20 10 20H21C21.5523 20 22 20.4477 22 21C22 21.5523 21.5523 22 21 22H9.928C8.33933 22 7.04616 22.0001 6.0263 21.8629C4.96232 21.7199 4.04735 21.4113 3.31802 20.682C2.58869 19.9526 2.28011 19.0377 2.13706 17.9737C1.99994 16.9538 1.99997 15.6607 2 14.072L2 3C2 2.44772 2.44772 2 3 2Z',
  d4: 'M4 20.5C4 21.0523 4.44772 21.5 5 21.5C6.14999 21.5 7.13063 21.2345 7.95847 20.7317C8.78065 20.2323 9.39418 19.5343 9.86952 18.7552C10.7488 17.314 11.2311 15.4503 11.6695 13.7561C11.6916 13.6707 11.7136 13.5857 11.7355 13.5012C12.2153 11.6528 12.6695 10.0133 13.463 8.81902C13.8462 8.24228 14.2916 7.79903 14.8335 7.49561C15.3731 7.19356 16.0618 7 16.9782 7C18.4116 7 19.3572 7.74804 20.1849 8.91265C20.5048 9.36282 21.1292 9.46838 21.5793 9.14843C22.0295 8.82848 22.135 8.20418 21.8151 7.75401C20.7925 6.31527 19.3178 5 16.9782 5C15.7671 5 14.7334 5.25957 13.8565 5.75048C12.9821 6.24003 12.3172 6.92959 11.7972 7.71223C10.7843 9.23666 10.2608 11.2222 9.79966 12.9988C9.79018 13.0353 9.78072 13.0717 9.77129 13.1081C9.2991 14.928 8.88285 16.5323 8.16218 17.7136C7.8082 18.2938 7.40373 18.7286 6.92027 19.0222C6.44248 19.3124 5.82985 19.5 5 19.5C4.44772 19.5 4 19.9477 4 20.5Z',
  d5: 'M3 2C3.55229 2 4 2.44772 4 3V14C4 15.6782 4.00213 16.8362 4.11923 17.7072C4.23246 18.5494 4.43644 18.972 4.73223 19.2678C5.02803 19.5636 5.45059 19.7675 6.2928 19.8808C7.16378 19.9979 8.32182 20 10 20H21C21.5523 20 22 20.4477 22 21C22 21.5523 21.5523 22 21 22H9.928C8.33933 22 7.04616 22.0001 6.0263 21.8629C4.96232 21.7199 4.04735 21.4113 3.31802 20.682C2.58869 19.9526 2.28011 19.0377 2.13706 17.9737C1.99994 16.9538 1.99997 15.6607 2 14.072L2 3C2 2.44772 2.44772 2 3 2Z',
  d6: 'M21 8.33333C20.0748 7.03165 18.8647 6 16.9782 6C8.4681 6 10.9194 21 3 21',
  d7: 'M21 21H3V3',
  d8: 'M3.50049 21.5C2.9482 21.5 2.50049 21.0523 2.50049 20.5V2.5H4.50049V19.3921C5.55414 19.1498 6.3398 18.5089 7.01849 17.5703C7.92055 16.3228 8.56688 14.6401 9.28305 12.7756L9.33461 12.6413C10.0441 10.7947 10.8308 8.77429 12.0279 7.23089C13.2723 5.62639 14.9883 4.5 17.4787 4.5C19.2599 4.5 20.5398 5.26233 21.5005 6.2611L20.0868 7.67475C19.3936 6.94172 18.5802 6.5 17.4787 6.5C15.7141 6.5 14.5452 7.24861 13.6083 8.45661C12.624 9.72571 11.9329 11.4553 11.2015 13.3587L11.1045 13.6114C10.4283 15.3744 9.69835 17.2774 8.63919 18.7422C8.44695 19.0081 8.24225 19.2618 8.02361 19.5H21.5005V21.5H3.50049Z',
};

export const IconChartLineData03StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-line-data-03-stroke-rounded IconChartLineData03StrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconChartLineData03DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-line-data-03-duotone-rounded IconChartLineData03DuotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
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

export const IconChartLineData03TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-line-data-03-twotone-rounded IconChartLineData03TwotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconChartLineData03SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-line-data-03-solid-rounded IconChartLineData03SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconChartLineData03BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-line-data-03-bulk-rounded IconChartLineData03BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconChartLineData03StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-line-data-03-stroke-sharp IconChartLineData03StrokeSharp"
    >
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconChartLineData03SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-line-data-03-solid-sharp IconChartLineData03SolidSharp"
    >
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfChartLineData03: TheIconSelfPack = {
  name: 'ChartLineData03',
  StrokeRounded: IconChartLineData03StrokeRounded,
  DuotoneRounded: IconChartLineData03DuotoneRounded,
  TwotoneRounded: IconChartLineData03TwotoneRounded,
  SolidRounded: IconChartLineData03SolidRounded,
  BulkRounded: IconChartLineData03BulkRounded,
  StrokeSharp: IconChartLineData03StrokeSharp,
  SolidSharp: IconChartLineData03SolidSharp,
};