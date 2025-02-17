import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2 21.5L22 21.5',
  d2: 'M18 15.5H18.009M18 18.5H18.009',
  d3: 'M6 18.5H6.00898M6 15.5H6.00898M6 12.5H6.00898M6 9.5H6.00898',
  d4: 'M7.79063 5.39186L16.2183 9.5904M8 4.5C8 5.60457 7.10457 6.5 6 6.5C4.89543 6.5 4 5.60457 4 4.5C4 3.39543 4.89543 2.5 6 2.5C7.10457 2.5 8 3.39543 8 4.5ZM20 10.5C20 11.6046 19.1046 12.5 18 12.5C16.8954 12.5 16 11.6046 16 10.5C16 9.39543 16.8954 8.5 18 8.5C19.1046 8.5 20 9.39543 20 10.5Z',
  d5: 'M8 4.5C8 5.60457 7.10457 6.5 6 6.5C4.89543 6.5 4 5.60457 4 4.5C4 3.39543 4.89543 2.5 6 2.5C7.10457 2.5 8 3.39543 8 4.5Z',
  d6: 'M20 10.5C20 11.6046 19.1046 12.5 18 12.5C16.8954 12.5 16 11.6046 16 10.5C16 9.39543 16.8954 8.5 18 8.5C19.1046 8.5 20 9.39543 20 10.5Z',
  d7: 'M1 21.5C1 20.9477 1.44772 20.5 2 20.5L22 20.5C22.5523 20.5 23 20.9477 23 21.5C23 22.0523 22.5523 22.5 22 22.5L2 22.5C1.44772 22.5 1 22.0523 1 21.5Z',
  d8: 'M17 15.5C17 14.9477 17.4477 14.5 18 14.5H18.009C18.5613 14.5 19.009 14.9477 19.009 15.5C19.009 16.0523 18.5613 16.5 18.009 16.5H18C17.4477 16.5 17 16.0523 17 15.5ZM17 18.5C17 17.9477 17.4477 17.5 18 17.5H18.009C18.5613 17.5 19.009 17.9477 19.009 18.5C19.009 19.0523 18.5613 19.5 18.009 19.5H18C17.4477 19.5 17 19.0523 17 18.5Z',
  d9: 'M5 9.5C5 8.94772 5.44772 8.5 6 8.5H6.00898C6.56127 8.5 7.00898 8.94772 7.00898 9.5C7.00898 10.0523 6.56127 10.5 6.00898 10.5H6C5.44772 10.5 5 10.0523 5 9.5ZM5 12.5C5 11.9477 5.44772 11.5 6 11.5H6.00898C6.56127 11.5 7.00898 11.9477 7.00898 12.5C7.00898 13.0523 6.56127 13.5 6.00898 13.5H6C5.44772 13.5 5 13.0523 5 12.5ZM5 15.5C5 14.9477 5.44772 14.5 6 14.5H6.00898C6.56127 14.5 7.00898 14.9477 7.00898 15.5C7.00898 16.0523 6.56127 16.5 6.00898 16.5H6C5.44772 16.5 5 16.0523 5 15.5ZM5 18.5C5 17.9477 5.44772 17.5 6 17.5H6.00898C6.56127 17.5 7.00898 17.9477 7.00898 18.5C7.00898 19.0523 6.56127 19.5 6.00898 19.5H6C5.44772 19.5 5 19.0523 5 18.5Z',
  d10: 'M3 4.5C3 2.84315 4.34315 1.5 6 1.5C7.65685 1.5 9 2.84315 9 4.5C9 4.62394 8.99248 4.74612 8.97788 4.86611L15.9293 8.3292C16.4678 7.81546 17.197 7.5 18 7.5C19.6569 7.5 21 8.84315 21 10.5C21 12.1569 19.6569 13.5 18 13.5C16.3431 13.5 15 12.1569 15 10.5C15 10.3689 15.0084 10.2397 15.0247 10.113L8.08588 6.65618C7.54602 7.17855 6.81055 7.5 6 7.5C4.34315 7.5 3 6.15685 3 4.5Z',
  d11: 'M6 3.5C5.44772 3.5 5 3.94772 5 4.5C5 5.05228 5.44772 5.5 6 5.5C6.55228 5.5 7 5.05228 7 4.5C7 3.94772 6.55228 3.5 6 3.5ZM3 4.5C3 2.84315 4.34315 1.5 6 1.5C7.65685 1.5 9 2.84315 9 4.5C9 4.62394 8.99248 4.74612 8.97788 4.86611L15.9293 8.3292C16.4678 7.81546 17.197 7.5 18 7.5C19.6569 7.5 21 8.84315 21 10.5C21 12.1569 19.6569 13.5 18 13.5C16.3431 13.5 15 12.1569 15 10.5C15 10.3689 15.0084 10.2397 15.0247 10.113L8.08588 6.65618C7.54602 7.17855 6.81055 7.5 6 7.5C4.34315 7.5 3 6.15685 3 4.5ZM18 9.5C17.4477 9.5 17 9.94772 17 10.5C17 11.0523 17.4477 11.5 18 11.5C18.5523 11.5 19 11.0523 19 10.5C19 9.94772 18.5523 9.5 18 9.5Z',
  d12: 'M22 22.25L2 22.25L2 20.25L22 20.25V22.25Z',
  d13: 'M6 7.25C6.71116 7.25 7.35926 6.98006 7.84745 6.53705L15.263 10.2313C15.2544 10.3197 15.25 10.4093 15.25 10.5C15.25 12.0188 16.4812 13.25 18 13.25C19.5188 13.25 20.75 12.0188 20.75 10.5C20.75 8.98122 19.5188 7.75 18 7.75C17.2968 7.75 16.6552 8.01396 16.1689 8.44822L8.73908 4.7468C8.74631 4.6655 8.75 4.58318 8.75 4.5C8.75 2.98122 7.51878 1.75 6 1.75C4.48122 1.75 3.25 2.98122 3.25 4.5C3.25 6.01878 4.48122 7.25 6 7.25Z',
};

export const IconChartStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-stroke-rounded IconChartStrokeRounded"
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

export const IconChartDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-duotone-rounded IconChartDuotoneRounded"
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
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      </g>
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

export const IconChartTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-twotone-rounded IconChartTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
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

export const IconChartSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-solid-rounded IconChartSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
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
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconChartBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-bulk-rounded IconChartBulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
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

export const IconChartStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-stroke-sharp IconChartStrokeSharp"
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
        strokeLinejoin="round" 
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

export const IconChartSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-solid-sharp IconChartSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
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
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfChart: TheIconSelfPack = {
  name: 'Chart',
  StrokeRounded: IconChartStrokeRounded,
  DuotoneRounded: IconChartDuotoneRounded,
  TwotoneRounded: IconChartTwotoneRounded,
  SolidRounded: IconChartSolidRounded,
  BulkRounded: IconChartBulkRounded,
  StrokeSharp: IconChartStrokeSharp,
  SolidSharp: IconChartSolidSharp,
};