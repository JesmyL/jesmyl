import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M18 10L19.8398 8.41421C20.6133 7.74755 21 7.41421 21 7C21 6.58579 20.6133 6.25245 19.8398 5.58579L18 4',
  d2: 'M12 18V15C12 11.2288 12 9.34315 13.1716 8.17157C14.3431 7 16.2288 7 20 7H21',
  d3: 'M3 21H9',
  d4: 'M15 21H21',
  d5: 'M18 10L19.8398 8.41421C20.6133 7.74755 21 7.41421 21 7M18 4L19.8398 5.58579C20.6133 6.25245 21 6.58579 21 7M21 7H20C16.2288 7 14.3431 7 13.1716 8.17157C12 9.34315 12 11.2288 12 15V18',
  d6: 'M17.4319 9.86467C17.7023 10.1784 18.1759 10.2135 18.4897 9.94311L20.3652 8.32649C20.7212 8.01978 21.0441 7.74149 21.2715 7.48456C21.5165 7.20786 21.75 6.84861 21.75 6.37501C21.75 5.90141 21.5165 5.54217 21.2715 5.26546C21.0441 5.00855 20.7212 4.73025 20.3653 4.42355L18.4897 2.80692C18.1759 2.53648 17.7023 2.5716 17.4319 2.88535C17.3097 3.0271 17.2499 3.20148 17.25 3.375V5.40028C16.592 5.42131 16.0025 5.45983 15.4777 5.53039C14.2775 5.69175 13.267 6.03694 12.4645 6.83949C11.6619 7.64205 11.3167 8.65255 11.1554 9.85269C11 11.0086 11 12.4784 11 14.3018V17.375C11 17.9273 11.4477 18.375 12 18.375C12.5523 18.375 13 17.9273 13 17.375V14.375C13 12.4611 13.0021 11.1263 13.1375 10.1192C13.2691 9.14082 13.5097 8.62272 13.8787 8.25371C14.2477 7.88469 14.7658 7.64409 15.7442 7.51256C16.1785 7.45417 16.6737 7.42056 17.25 7.40122V9.37618C17.2502 9.54932 17.31 9.72324 17.4319 9.86467Z',
  d7: 'M2 20.375C2 19.8227 2.44772 19.375 3 19.375H9C9.55228 19.375 10 19.8227 10 20.375C10 20.9273 9.55228 21.375 9 21.375H3C2.44772 21.375 2 20.9273 2 20.375Z',
  d8: 'M14 20.375C14 19.8227 14.4477 19.375 15 19.375H21C21.5523 19.375 22 19.8227 22 20.375C22 20.9273 21.5523 21.375 21 21.375H15C14.4477 21.375 14 20.9273 14 20.375Z',
  d9: 'M3 20.9854H8.9942',
  d10: 'M14.9884 20.9854H20.9826',
  d11: 'M11.9863 17.984V7.10911C11.9863 7.05388 12.0311 7.00911 12.0863 7.00911H20.2839M18.0262 3.98828L20.9989 7.00911L18.0262 9.99758',
  d12: 'M17.4999 2.5L21.5 6.5003L17.4999 10.5004L16.0857 9.08616L17.6716 7.5003L12.5 7.5003V17.5003H10.5V6.5003C10.5 5.94802 10.9477 5.5003 11.5 5.5003L17.6716 5.5003L16.0857 3.91421L17.4999 2.5Z',
  d13: 'M8.5 21.5H2.5V19.5H8.5V21.5Z',
  d14: 'M20.5 21.5H14.5V19.5H20.5V21.5Z',
};

export const IconStepOutStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="step-out-stroke-rounded IconStepOutStrokeRounded"
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

export const IconStepOutDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="step-out-duotone-rounded IconStepOutDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
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
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconStepOutTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="step-out-twotone-rounded IconStepOutTwotoneRounded"
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

export const IconStepOutSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="step-out-solid-rounded IconStepOutSolidRounded"
    >
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
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
    </TheIconWrapper>
  );
};

export const IconStepOutBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="step-out-bulk-rounded IconStepOutBulkRounded"
    >
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
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
    </TheIconWrapper>
  );
};

export const IconStepOutStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="step-out-stroke-sharp IconStepOutStrokeSharp"
    >
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconStepOutSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="step-out-solid-sharp IconStepOutSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d13} 
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

export const iconPackOfStepOut: TheIconSelfPack = {
  name: 'StepOut',
  StrokeRounded: IconStepOutStrokeRounded,
  DuotoneRounded: IconStepOutDuotoneRounded,
  TwotoneRounded: IconStepOutTwotoneRounded,
  SolidRounded: IconStepOutSolidRounded,
  BulkRounded: IconStepOutBulkRounded,
  StrokeSharp: IconStepOutStrokeSharp,
  SolidSharp: IconStepOutSolidSharp,
};