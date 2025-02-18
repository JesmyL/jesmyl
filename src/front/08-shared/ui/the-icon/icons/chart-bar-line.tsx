import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M4 15L4 19',
  d2: 'M12 9L12 19',
  d3: 'M22 22L2 22',
  d4: 'M20 13L20 19',
  d5: 'M5.60009 8.79993C5.23521 8.31419 4.6543 8 4 8C2.89543 8 2 8.89543 2 10C2 11.1046 2.89543 12 4 12C5.10457 12 6 11.1046 6 10C6 9.54973 5.8512 9.13421 5.60009 8.79993ZM5.60009 8.79993L10.3999 5.20007M10.3999 5.20007C10.7648 5.68581 11.3457 6 12 6C12.783 6 13.4609 5.55006 13.7892 4.89462M10.3999 5.20007C10.1488 4.86579 10 4.45027 10 4C10 2.89543 10.8954 2 12 2C13.1046 2 14 2.89543 14 4C14 4.32158 13.9241 4.62543 13.7892 4.89462M13.7892 4.89462L18.2108 7.10538M18.2108 7.10538C18.0759 7.37457 18 7.67842 18 8C18 9.10457 18.8954 10 20 10C21.1046 10 22 9.10457 22 8C22 6.89543 21.1046 6 20 6C19.217 6 18.5391 6.44994 18.2108 7.10538Z',
  d6: 'M12 2C10.8954 2 10 2.89543 10 4C10 4.45027 10.1488 4.86579 10.3999 5.20007C10.7648 5.68581 11.3457 6 12 6C12.783 6 13.4609 5.55006 13.7892 4.89462C13.9241 4.62543 14 4.32158 14 4C14 2.89543 13.1046 2 12 2Z',
  d7: 'M18 8C18 9.10457 18.8954 10 20 10C21.1046 10 22 9.10457 22 8C22 6.89543 21.1046 6 20 6C19.217 6 18.5391 6.44994 18.2108 7.10538C18.0759 7.37457 18 7.67842 18 8Z',
  d8: 'M2 10C2 11.1046 2.89543 12 4 12C5.10457 12 6 11.1046 6 10C6 9.54973 5.8512 9.13421 5.60009 8.79993C5.23521 8.31419 4.6543 8 4 8C2.89543 8 2 8.89543 2 10Z',
  d9: 'M4 14C4.55228 14 5 14.4477 5 15L5 19C5 19.5523 4.55228 20 4 20C3.44772 20 3 19.5523 3 19L3 15C3 14.4477 3.44772 14 4 14Z',
  d10: 'M12 8C12.5523 8 13 8.44772 13 9L13 19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19L11 9C11 8.44772 11.4477 8 12 8Z',
  d11: 'M23 22C23 22.5523 22.5523 23 22 23L2 23C1.44771 23 1 22.5523 1 22C1 21.4477 1.44771 21 2 21L22 21C22.5523 21 23 21.4477 23 22Z',
  d12: 'M20 12C20.5523 12 21 12.4477 21 13L21 19C21 19.5523 20.5523 20 20 20C19.4477 20 19 19.5523 19 19L19 13C19 12.4477 19.4477 12 20 12Z',
  d13: 'M9 4C9 2.34315 10.3431 1 12 1C13.6569 1 15 2.34315 15 4C15 4.1253 14.9923 4.249 14.9772 4.37058L17.9175 5.84073C18.4565 5.3208 19.1904 5 20 5C21.6569 5 23 6.34314 23 8C23 9.65685 21.6569 11 20 11C18.3431 11 17 9.65685 17 8C17 7.87469 17.0077 7.751 17.0228 7.62942L14.0825 6.15926C13.5435 6.6792 12.8096 7 12 7C11.3848 7 10.8128 6.81439 10.3371 6.49714L6.8632 9.1026C6.95207 9.38626 7 9.68784 7 10C7 11.6569 5.65685 13 4 13C2.34315 13 1 11.6569 1 10C1 8.34315 2.34315 7 4 7C4.61523 7 5.18723 7.18561 5.66286 7.50286L9.1368 4.8974C9.04793 4.61374 9 4.31216 9 4Z',
  d14: 'M12 3C11.4477 3 11 3.44772 11 4C11 4.22629 11.074 4.43241 11.1994 4.59946C11.3836 4.84458 11.6735 5 12 5C12.39 5 12.7298 4.77687 12.8952 4.44671C12.9619 4.31341 13 4.16259 13 4C13 3.44772 12.5523 3 12 3ZM9 4C9 2.34315 10.3431 1 12 1C13.6569 1 15 2.34315 15 4C15 4.1253 14.9923 4.249 14.9772 4.37058L17.9175 5.84073C18.4565 5.3208 19.1904 5 20 5C21.6569 5 23 6.34314 23 8C23 9.65685 21.6569 11 20 11C18.3431 11 17 9.65685 17 8C17 7.87469 17.0077 7.751 17.0228 7.62942L14.0825 6.15926C13.5435 6.6792 12.8096 7 12 7C11.3848 7 10.8128 6.81439 10.3371 6.49714L6.8632 9.1026C6.95207 9.38626 7 9.68784 7 10C7 11.6569 5.65685 13 4 13C2.34314 13 1 11.6569 1 10C1 8.34315 2.34315 7 4 7C4.61523 7 5.18723 7.18561 5.66286 7.50286L9.1368 4.8974C9.04793 4.61374 9 4.31216 9 4ZM20 7C19.61 7 19.2702 7.22313 19.1048 7.55329C19.0381 7.68659 19 7.83741 19 8C19 8.55228 19.4477 9 20 9C20.5523 9 21 8.55228 21 8C21 7.44772 20.5523 7 20 7ZM4 9C3.44772 9 3 9.44772 3 10C3 10.5523 3.44772 11 4 11C4.55228 11 5 10.5523 5 10C5 9.77371 4.92604 9.56759 4.80055 9.40054C4.61642 9.15542 4.3265 9 4 9Z',
  d15: 'M3 19L3 15L5 15L5 19L3 19Z',
  d16: 'M11 19L11 9L13 9L13 19L11 19Z',
  d17: 'M2 21L22 21L22 23L2 23L2 21Z',
  d18: 'M19 19L19 13L21 13L21 19L19 19Z',
};

export const IconChartBarLineStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-bar-line-stroke-rounded IconChartBarLineStrokeRounded"
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
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconChartBarLineDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-bar-line-duotone-rounded IconChartBarLineDuotoneRounded"
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
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      </g>
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconChartBarLineTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-bar-line-twotone-rounded IconChartBarLineTwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconChartBarLineSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-bar-line-solid-rounded IconChartBarLineSolidRounded"
    >
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconChartBarLineBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-bar-line-bulk-rounded IconChartBarLineBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
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
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconChartBarLineStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-bar-line-stroke-sharp IconChartBarLineStrokeSharp"
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconChartBarLineSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-bar-line-solid-sharp IconChartBarLineSolidSharp"
    >
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfChartBarLine: TheIconSelfPack = {
  name: 'ChartBarLine',
  StrokeRounded: IconChartBarLineStrokeRounded,
  DuotoneRounded: IconChartBarLineDuotoneRounded,
  TwotoneRounded: IconChartBarLineTwotoneRounded,
  SolidRounded: IconChartBarLineSolidRounded,
  BulkRounded: IconChartBarLineBulkRounded,
  StrokeSharp: IconChartBarLineStrokeSharp,
  SolidSharp: IconChartBarLineSolidSharp,
};