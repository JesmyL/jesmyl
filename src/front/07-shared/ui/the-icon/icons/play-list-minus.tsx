import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2 7.5H21',
  d2: 'M16.5 2.5L13.5 7.5',
  d3: 'M9.5 2.5L6.5 7.5',
  d4: 'M11.5 21C7.02166 21 4.78249 21 3.39124 19.6088C2 18.2175 2 15.9783 2 11.5C2 7.02166 2 4.78249 3.39124 3.39124C4.78249 2 7.02166 2 11.5 2C15.9783 2 18.2175 2 19.6088 3.39124C21 4.78249 21 7.02166 21 11.5',
  d5: 'M14 18H22',
  d6: 'M3.39124 19.6088C4.78249 21 7.02166 21 11.5 21C15.9783 21 18.2175 21 19.6088 19.6088C21 18.2175 21 15.9783 21 11.5C21 9.90292 21 8.59062 20.9369 7.5H2.0631C2 8.59062 2 9.90292 2 11.5C2 15.9783 2 18.2175 3.39124 19.6088Z',
  d7: 'M16.5 2L13.5 7.5',
  d8: 'M9.5 2L6.5 7.5',
  d9: 'M11.1525 1.81436C11.2667 1.74949 11.4052 1.7491 11.6823 1.74831L11.8881 1.74771C12.8696 1.74474 13.8524 1.74177 14.833 1.77893C15.2678 1.7954 15.4853 1.80364 15.5666 1.95457C15.648 2.1055 15.5338 2.29421 15.3055 2.67164L12.9793 6.51698C12.8368 6.75264 12.7655 6.87048 12.6512 6.93493C12.5368 6.99938 12.3991 6.99938 12.1237 6.99938H8.67267C8.35945 6.99938 8.20283 6.99938 8.14539 6.89792C8.08794 6.79646 8.16852 6.66217 8.32967 6.39359L10.825 2.2347C10.9672 1.99773 11.0383 1.87924 11.1525 1.81436Z',
  d10: 'M8.5907 1.87017C8.53003 1.76805 8.37165 1.77393 8.0549 1.7857C7.36371 1.81139 6.7436 1.85519 6.18802 1.92989C4.81137 2.11497 3.71911 2.50201 2.86091 3.36021C1.99797 4.22315 1.62446 5.37886 1.44949 6.5566C1.41938 6.75928 1.40433 6.86062 1.46417 6.93C1.524 6.99938 1.62901 6.99938 1.83901 6.99938H5.09742C5.37539 6.99938 5.51438 6.99938 5.6294 6.93391C5.74441 6.86844 5.81537 6.74893 5.95728 6.5099L8.40681 2.38419C8.56985 2.10959 8.65137 1.97229 8.5907 1.87017Z',
  d11: 'M18.6711 2.39311C18.3653 2.26727 18.2124 2.20434 18.0375 2.2612C17.8627 2.31805 17.7656 2.47586 17.5714 2.79148L15.357 6.38975C15.191 6.65958 15.108 6.79451 15.1652 6.89694C15.2224 6.99938 15.3809 6.99938 15.6977 6.99938H21.161C21.371 6.99938 21.476 6.99938 21.5358 6.93C21.5957 6.86062 21.5806 6.75928 21.5505 6.55661C21.3756 5.37886 21.002 4.22314 20.1391 3.36021C19.7103 2.93141 19.2231 2.62024 18.6711 2.39311Z',
  d12: 'M21.6183 9.11482C21.7352 9.23025 21.7374 9.4131 21.7419 9.77879C21.75 10.4432 21.75 11.1628 21.75 11.9419V12.0565C21.75 13.7682 21.75 15.193 21.6639 16.3751C21.6344 16.7796 21.6196 16.9819 21.4757 17.1157C21.3318 17.2495 21.1207 17.2495 20.6985 17.2495H13.75C12.0931 17.2495 10.75 18.5927 10.75 20.2495C10.75 20.6975 10.8482 21.1225 11.0242 21.5043C11.1967 21.8784 11.283 22.0655 11.2244 22.1576C11.1658 22.2496 10.9835 22.2505 10.619 22.2524C9.14081 22.2598 7.65035 22.2653 6.18802 22.0687C4.81137 21.8836 3.71911 21.4966 2.86091 20.6384C2.00272 19.7802 1.61568 18.6879 1.43059 17.3113C1.24998 15.9679 1.24999 14.2472 1.25 12.0565V11.9421C1.25 11.163 1.24999 10.4432 1.25811 9.77879C1.26259 9.4131 1.26482 9.23025 1.38167 9.11482C1.49853 8.99938 1.68305 8.99938 2.0521 8.99938H20.9479C21.3169 8.99938 21.5015 8.99938 21.6183 9.11482Z',
  d13: 'M12.75 20.25C12.75 19.6977 13.1977 19.25 13.75 19.25H21.75C22.3023 19.25 22.75 19.6977 22.75 20.25C22.75 20.8023 22.3023 21.25 21.75 21.25H13.75C13.1977 21.25 12.75 20.8023 12.75 20.25Z',
  d14: 'M2 6H20',
  d15: 'M16 2L13 6',
  d16: 'M9 2L6 6',
  d17: 'M20 14V2H2V20H12',
  d18: 'M14 17H22',
  d19: 'M22.25 20H14.25V18H22.25V20Z',
  d20: 'M8.2331 2.25H2.5C2.08579 2.25 1.75 2.58579 1.75 3V6.25H6.05309L8.2331 2.25Z',
  d21: 'M7.76139 6.25H13.0531L15.2331 2.25H9.94141L7.76139 6.25Z',
  d22: 'M16.9414 2.25L14.7614 6.25H21.25V3C21.25 2.58579 20.9142 2.25 20.5 2.25H16.9414Z',
  d23: 'M1.75 7.75H21.25V16.5H12.75V21.75H2.5C2.08579 21.75 1.75 21.4142 1.75 21V7.75Z',
};

export const IconPlayListMinusStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="play-list-minus-stroke-rounded IconPlayListMinusStrokeRounded"
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
        strokeLinecap="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconPlayListMinusDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="play-list-minus-duotone-rounded IconPlayListMinusDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
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
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconPlayListMinusTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="play-list-minus-twotone-rounded IconPlayListMinusTwotoneRounded"
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
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconPlayListMinusSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="play-list-minus-solid-rounded IconPlayListMinusSolidRounded"
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
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconPlayListMinusBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="play-list-minus-bulk-rounded IconPlayListMinusBulkRounded"
    >
      <g 
        opacity="var(--icon-opacity)">
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
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      </g>
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconPlayListMinusStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="play-list-minus-stroke-sharp IconPlayListMinusStrokeSharp"
    >
      <path 
        d={d.d14} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d15} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d16} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d17} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d18} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconPlayListMinusSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="play-list-minus-solid-sharp IconPlayListMinusSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d20} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d21} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d22} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d23} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfPlayListMinus: TheIconSelfPack = {
  name: 'PlayListMinus',
  StrokeRounded: IconPlayListMinusStrokeRounded,
  DuotoneRounded: IconPlayListMinusDuotoneRounded,
  TwotoneRounded: IconPlayListMinusTwotoneRounded,
  SolidRounded: IconPlayListMinusSolidRounded,
  BulkRounded: IconPlayListMinusBulkRounded,
  StrokeSharp: IconPlayListMinusStrokeSharp,
  SolidSharp: IconPlayListMinusSolidSharp,
};