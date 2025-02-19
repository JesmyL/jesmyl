import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M9 9L5 5M16 12H22M12 16V22',
  d2: 'M12 22C10.0222 22 8.08879 21.4135 6.4443 20.3147C4.79981 19.2159 3.51808 17.6541 2.7612 15.8268C2.00433 13.9996 1.80629 11.9889 2.19215 10.0491C2.578 8.10929 3.53041 6.32746 4.92893 4.92893C6.32746 3.53041 8.10929 2.578 10.0491 2.19215C11.9889 1.80629 13.9996 2.00433 15.8268 2.76121C17.6541 3.51808 19.2159 4.79981 20.3147 6.4443C21.4135 8.08879 22 10.0222 22 12L15.2448 12C15.2448 11.3582 15.0545 10.7309 14.6979 10.1973C14.3414 9.66369 13.8346 9.2478 13.2417 9.00221C12.6488 8.75662 11.9964 8.69236 11.367 8.81756C10.7375 8.94276 10.1594 9.2518 9.70559 9.70559C9.2518 10.1594 8.94276 10.7375 8.81756 11.367C8.69236 11.9964 8.75662 12.6488 9.00221 13.2417C9.2478 13.8346 9.66369 14.3414 10.1973 14.6979C10.7309 15.0545 11.3582 15.2448 12 15.2448V22Z',
  d3: 'M9 9L5 5M16 12H22M16 12C16 14.2091 14.2091 16 12 16M16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16M12 16V22',
  d4: 'M5.33882 4.27458C5.13391 4.06966 5.14495 3.73311 5.37272 3.55394C7.20716 2.11083 9.52122 1.25 12.0363 1.25C17.5585 1.25 22.1115 5.39978 22.7469 10.751C22.781 11.0386 22.5509 11.2843 22.2613 11.2843H16.3941C16.1539 11.2843 15.9509 11.1122 15.8819 10.8821C15.3859 9.22843 13.8521 8.02344 12.037 8.02344C11.3487 8.02344 10.7009 8.19669 10.1347 8.50197C9.92334 8.61596 9.65824 8.594 9.48842 8.42418L5.33882 4.27458ZM4.27458 5.33882C4.06966 5.13391 3.73311 5.14495 3.55394 5.37272C2.11083 7.20716 1.25 9.52122 1.25 12.0363C1.25 17.5585 5.39978 22.1115 10.751 22.7469C11.0386 22.781 11.2843 22.5509 11.2843 22.2613V16.3941C11.2843 16.1539 11.1122 15.9509 10.8821 15.8819C9.22843 15.3859 8.02344 13.8521 8.02344 12.037C8.02344 11.3487 8.19669 10.7009 8.50197 10.1347C8.61596 9.92334 8.594 9.65824 8.42418 9.48842L4.27458 5.33882ZM13.1916 15.8819C12.9615 15.9509 12.7894 16.1539 12.7894 16.3941V22.2611C12.7894 22.5508 13.0352 22.7809 13.3229 22.7467C18.2517 22.161 22.161 18.2517 22.7467 13.3228C22.7809 13.0352 22.5508 12.7894 22.2611 12.7894H16.3941C16.1539 12.7894 15.9509 12.9615 15.8819 13.1916C15.4956 14.4797 14.4797 15.4956 13.1916 15.8819Z',
  d5: 'M5.33882 4.27458C5.13391 4.06966 5.14495 3.73311 5.37272 3.55394C7.20716 2.11083 9.52122 1.25 12.0363 1.25C17.5583 1.25 22.1112 5.39949 22.7468 10.7505C22.781 11.0381 22.5509 11.2838 22.2612 11.2838H16.3935C16.1533 11.2838 15.9503 11.1117 15.8813 10.8816C15.3853 9.22785 13.8515 8.02282 12.0363 8.02282C11.3481 8.02282 10.7002 8.19607 10.1341 8.50135C9.92272 8.61534 9.65762 8.59338 9.4878 8.42355L5.33882 4.27458Z',
  d6: 'M4.27458 5.33882C4.06966 5.13391 3.73311 5.14495 3.55394 5.37272C2.11083 7.20716 1.25 9.52122 1.25 12.0363C1.25 17.5583 5.39949 22.1112 10.7505 22.7468C11.0381 22.781 11.2838 22.5509 11.2838 22.2612V16.3935C11.2838 16.1533 11.1117 15.9503 10.8816 15.8813C9.22785 15.3853 8.02282 13.8515 8.02282 12.0363C8.02282 11.3481 8.19607 10.7002 8.50135 10.1341C8.61534 9.92272 8.59338 9.65762 8.42355 9.4878L4.27458 5.33882Z',
  d7: 'M13.191 15.8813C12.961 15.9503 12.7889 16.1533 12.7889 16.3935V22.2612C12.7889 22.5509 13.0346 22.781 13.3223 22.7468C18.2516 22.1612 22.1612 18.2516 22.7468 13.3223C22.781 13.0346 22.5509 12.7889 22.2612 12.7889H16.3935C16.1533 12.7889 15.9503 12.961 15.8813 13.191C15.495 14.4791 14.4791 15.495 13.191 15.8813Z',
  d8: 'M5.3391 4.27458C5.13419 4.06966 5.14524 3.73311 5.373 3.55394C7.20744 2.11083 9.5215 1.25 12.0366 1.25C17.5586 1.25 22.1115 5.39949 22.7471 10.7505C22.7813 11.0381 22.5511 11.2838 22.2615 11.2838H16.3938C16.1536 11.2838 15.9505 11.1117 15.8815 10.8816C15.3856 9.22785 13.8518 8.02282 12.0366 8.02282C11.3483 8.02282 10.7005 8.19607 10.1344 8.50135C9.92301 8.61534 9.65791 8.59338 9.48808 8.42355L5.3391 4.27458Z',
  d9: 'M4.95178 3.88984C6.84174 2.24556 9.31106 1.25 12.0129 1.25C17.7047 1.25 22.3645 5.66814 22.75 11.262H15.9474C15.5959 9.40913 13.968 8.0081 12.0129 8.0081C11.1784 8.0081 10.4035 8.26335 9.76198 8.70005L4.95178 3.88984Z',
  d10: 'M3.88984 4.95178C2.24556 6.84174 1.25 9.31106 1.25 12.0129C1.25 17.7047 5.66814 22.3645 11.262 22.75V15.9474C9.40913 15.5959 8.0081 13.968 8.0081 12.0129C8.0081 11.1784 8.26335 10.4035 8.70005 9.76198L3.88984 4.95178Z',
  d11: 'M12.7638 15.9474V22.75C18.1096 22.3816 22.3816 18.1096 22.75 12.7638H15.9474C15.6421 14.3734 14.3734 15.6421 12.7638 15.9474Z',
};

export const IconChartRingStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-ring-stroke-rounded IconChartRingStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <circle 
        cx="12" 
        cy="12" 
        r="4" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconChartRingDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-ring-duotone-rounded IconChartRingDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <circle 
        cx="12" 
        cy="12" 
        r="4" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconChartRingTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-ring-twotone-rounded IconChartRingTwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconChartRingSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-ring-solid-rounded IconChartRingSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconChartRingBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-ring-bulk-rounded IconChartRingBulkRounded"
    >
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
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      </g>
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconChartRingStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-ring-stroke-sharp IconChartRingStrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <circle 
        cx="12" 
        cy="12" 
        r="4" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
    </TheIconWrapper>
  );
};

export const IconChartRingSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-ring-solid-sharp IconChartRingSolidSharp"
    >
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfChartRing: TheIconSelfPack = {
  name: 'ChartRing',
  StrokeRounded: IconChartRingStrokeRounded,
  DuotoneRounded: IconChartRingDuotoneRounded,
  TwotoneRounded: IconChartRingTwotoneRounded,
  SolidRounded: IconChartRingSolidRounded,
  BulkRounded: IconChartRingBulkRounded,
  StrokeSharp: IconChartRingStrokeSharp,
  SolidSharp: IconChartRingSolidSharp,
};