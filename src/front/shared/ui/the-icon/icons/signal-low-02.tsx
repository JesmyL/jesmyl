import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M21 19L18 19',
  d2: 'M14 19L11 19',
  d3: 'M7 17V16C7 15.0572 7 14.5858 6.70711 14.2929C6.41421 14 5.94281 14 5 14C4.05719 14 3.58579 14 3.29289 14.2929C3 14.5858 3 15.0572 3 16V17C3 17.9428 3 18.4142 3.29289 18.7071C3.58579 19 4.05719 19 5 19C5.94281 19 6.41421 19 6.70711 18.7071C7 18.4142 7 17.9428 7 17Z',
  d4: 'M18 18L21 18C21.5523 18 22 18.4477 22 19C22 19.5523 21.5523 20 21 20L18 20C17.4477 20 17 19.5523 17 19C17 18.4477 17.4477 18 18 18Z',
  d5: 'M10 19C10 18.4477 10.4477 18 11 18L14 18C14.5523 18 15 18.4477 15 19C15 19.5523 14.5523 20 14 20L11 20C10.4477 20 10 19.5523 10 19Z',
  d6: 'M4.95526 13.25C4.97013 13.25 4.98505 13.25 5.00001 13.25C5.01496 13.25 5.02988 13.25 5.04476 13.25C5.47757 13.25 5.8744 13.2499 6.19721 13.2933C6.55269 13.3411 6.92842 13.4535 7.23744 13.7626C7.54647 14.0716 7.65891 14.4473 7.70671 14.8028C7.75011 15.1256 7.75006 15.5224 7.75001 15.9553C7.75001 15.9701 7.75001 15.9851 7.75001 16V17C7.75001 17.015 7.75001 17.0299 7.75001 17.0448C7.75006 17.4776 7.75011 17.8744 7.70671 18.1972C7.65891 18.5527 7.54647 18.9284 7.23744 19.2374C6.92842 19.5465 6.55269 19.6589 6.19721 19.7067C5.8744 19.7501 5.47757 19.7501 5.04475 19.75C5.02988 19.75 5.01496 19.75 5.00001 19.75C4.98505 19.75 4.97014 19.75 4.95526 19.75C4.52245 19.7501 4.12561 19.7501 3.8028 19.7067C3.44732 19.6589 3.07159 19.5465 2.76257 19.2374C2.45355 18.9284 2.3411 18.5527 2.29331 18.1972C2.24991 17.8744 2.24995 17.4776 2.25 17.0448C2.25001 17.0299 2.25001 17.015 2.25001 17V16C2.25001 15.985 2.25001 15.9701 2.25 15.9553C2.24995 15.5224 2.24991 15.1256 2.29331 14.8028C2.3411 14.4473 2.45355 14.0716 2.76257 13.7626C3.07159 13.4535 3.44732 13.3411 3.8028 13.2933C4.12561 13.2499 4.52244 13.25 4.95526 13.25Z',
  d7: 'M7 14H3V19H7V14Z',
  d8: 'M17.25 13.25L21.25 13.25V15.25L17.25 15.25V13.25Z',
  d9: 'M10.75 13.25L14.75 13.25V15.25L10.75 15.25L10.75 13.25Z',
  d10: 'M2.75 9.5C2.75 9.08579 3.08579 8.75 3.5 8.75H7.5C7.91421 8.75 8.25 9.08579 8.25 9.5V14.5C8.25 14.9142 7.91421 15.25 7.5 15.25H3.5C3.08579 15.25 2.75 14.9142 2.75 14.5V9.5Z',
};

export const IconSignalLow02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="signal-low-02-stroke-rounded IconSignalLow02StrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconSignalLow02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="signal-low-02-duotone-rounded IconSignalLow02DuotoneRounded"
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
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
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

export const IconSignalLow02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="signal-low-02-twotone-rounded IconSignalLow02TwotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconSignalLow02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="signal-low-02-solid-rounded IconSignalLow02SolidRounded"
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

export const IconSignalLow02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="signal-low-02-bulk-rounded IconSignalLow02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconSignalLow02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="signal-low-02-stroke-sharp IconSignalLow02StrokeSharp"
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
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSignalLow02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="signal-low-02-solid-sharp IconSignalLow02SolidSharp"
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
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfSignalLow02: TheIconSelfPack = {
  name: 'SignalLow02',
  StrokeRounded: IconSignalLow02StrokeRounded,
  DuotoneRounded: IconSignalLow02DuotoneRounded,
  TwotoneRounded: IconSignalLow02TwotoneRounded,
  SolidRounded: IconSignalLow02SolidRounded,
  BulkRounded: IconSignalLow02BulkRounded,
  StrokeSharp: IconSignalLow02StrokeSharp,
  SolidSharp: IconSignalLow02SolidSharp,
};