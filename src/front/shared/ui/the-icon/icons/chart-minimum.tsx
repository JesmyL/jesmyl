import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M21 21H10C6.70017 21 5.05025 21 4.02513 19.9749C3 18.9497 3 17.2998 3 14V3',
  d2: 'M8 3C8 9.07513 10.6863 14 14 14C17.3137 14 20 9.07513 20 3',
  d3: 'M6 17H6.00898M8.9982 17H9.00718M11.9964 17H12.0054M14.9946 17H15.0036M17.9928 17H18.0018M20.991 17H21',
  d4: 'M3 2C3.55229 2 4 2.44772 4 3V14C4 15.6782 4.00213 16.8362 4.11923 17.7072C4.23246 18.5494 4.43644 18.972 4.73223 19.2678C5.02803 19.5636 5.45059 19.7675 6.2928 19.8808C7.16378 19.9979 8.32182 20 10 20H21C21.5523 20 22 20.4477 22 21C22 21.5523 21.5523 22 21 22H9.928C8.33933 22 7.04616 22.0001 6.0263 21.8629C4.96232 21.7199 4.04735 21.4113 3.31802 20.682C2.58869 19.9526 2.28011 19.0377 2.13706 17.9737C1.99994 16.9538 1.99997 15.6607 2 14.072L2 3C2 2.44772 2.44772 2 3 2Z',
  d5: 'M17.3647 10.2993C18.356 8.48206 19 5.90322 19 3C19 2.44772 19.4477 2 20 2C20.5523 2 21 2.44772 21 3C21 6.17191 20.3009 9.09308 19.1205 11.257C17.9608 13.3832 16.1943 15 14 15C11.8057 15 10.0392 13.3832 8.87946 11.257C7.69913 9.09307 7 6.17191 7 3C7 2.44771 7.44771 2 8 2C8.55229 2 9 2.44771 9 3C9 5.90322 9.64402 8.48206 10.6353 10.2993C11.6471 12.1544 12.8806 13 14 13C15.1194 13 16.3529 12.1544 17.3647 10.2993Z',
  d6: 'M5 17C5 16.4477 5.44772 16 6 16H6.00898C6.56126 16 7.00898 16.4477 7.00898 17C7.00898 17.5523 6.56126 18 6.00898 18H6C5.44772 18 5 17.5523 5 17ZM7.9982 17C7.9982 16.4477 8.44592 16 8.9982 16H9.00718C9.55947 16 10.0072 16.4477 10.0072 17C10.0072 17.5523 9.55947 18 9.00718 18H8.9982C8.44592 18 7.9982 17.5523 7.9982 17ZM10.9964 17C10.9964 16.4477 11.4441 16 11.9964 16H12.0054C12.5577 16 13.0054 16.4477 13.0054 17C13.0054 17.5523 12.5577 18 12.0054 18H11.9964C11.4441 18 10.9964 17.5523 10.9964 17ZM13.9946 17C13.9946 16.4477 14.4423 16 14.9946 16H15.0036C15.5559 16 16.0036 16.4477 16.0036 17C16.0036 17.5523 15.5559 18 15.0036 18H14.9946C14.4423 18 13.9946 17.5523 13.9946 17ZM16.9928 17C16.9928 16.4477 17.4405 16 17.9928 16H18.0018C18.5541 16 19.0018 16.4477 19.0018 17C19.0018 17.5523 18.5541 18 18.0018 18H17.9928C17.4405 18 16.9928 17.5523 16.9928 17ZM19.991 17C19.991 16.4477 20.4387 16 20.991 16H21C21.5523 16 22 16.4477 22 17C22 17.5523 21.5523 18 21 18H20.991C20.4387 18 19.991 17.5523 19.991 17Z',
  d7: 'M21 21H3V3',
  d8: 'M4.00049 19.5V2.5H2.00049V20.5C2.00049 21.0523 2.4482 21.5 3.00049 21.5H21.0005V19.5H4.00049Z',
  d9: 'M17.3652 9.79932C18.3565 7.98206 19.0005 5.40322 19.0005 2.5L21.0005 2.5C21.0005 5.67191 20.3014 8.59308 19.121 10.757C17.9613 12.8832 16.1948 14.5 14.0005 14.5C11.8061 14.5 10.0397 12.8832 8.87995 10.757C7.69961 8.59307 7.00049 5.67191 7.00049 2.5L9.00049 2.5C9.00049 5.40322 9.64451 7.98206 10.6357 9.79932C11.6476 11.6544 12.8811 12.5 14.0005 12.5C15.1198 12.5 16.3534 11.6544 17.3652 9.79932Z',
  d10: 'M5.00049 15.5H7.00946V17.5H5.00049V15.5ZM7.99869 15.5H10.0077V17.5H7.99869V15.5ZM10.9969 15.5H13.0059V17.5H10.9969V15.5ZM13.9951 15.5H16.0041V17.5H13.9951V15.5ZM16.9933 15.5H19.0023V17.5H16.9933V15.5ZM19.9915 15.5H22.0005V17.5H19.9915V15.5Z',
};

export const IconChartMinimumStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-minimum-stroke-rounded IconChartMinimumStrokeRounded"
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

export const IconChartMinimumDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-minimum-duotone-rounded IconChartMinimumDuotoneRounded"
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

export const IconChartMinimumTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-minimum-twotone-rounded IconChartMinimumTwotoneRounded"
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

export const IconChartMinimumSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-minimum-solid-rounded IconChartMinimumSolidRounded"
    >
      <path 
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconChartMinimumBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-minimum-bulk-rounded IconChartMinimumBulkRounded"
    >
      <path 
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
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconChartMinimumStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-minimum-stroke-sharp IconChartMinimumStrokeSharp"
    >
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconChartMinimumSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-minimum-solid-sharp IconChartMinimumSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfChartMinimum: TheIconSelfPack = {
  name: 'ChartMinimum',
  StrokeRounded: IconChartMinimumStrokeRounded,
  DuotoneRounded: IconChartMinimumDuotoneRounded,
  TwotoneRounded: IconChartMinimumTwotoneRounded,
  SolidRounded: IconChartMinimumSolidRounded,
  BulkRounded: IconChartMinimumBulkRounded,
  StrokeSharp: IconChartMinimumStrokeSharp,
  SolidSharp: IconChartMinimumSolidSharp,
};