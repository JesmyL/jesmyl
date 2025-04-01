import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124Z',
  d2: 'M21.5 12L2.50078 12',
  d3: 'M3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124Z',
  d4: 'M22.4947 14.0021C22.4991 13.5315 22.5014 13.2963 22.3546 13.1481C22.2079 13 21.9712 13 21.4979 13L2.50303 13C2.02969 13 1.79302 13 1.64629 13.1481C1.49956 13.2963 1.50179 13.5315 1.50625 14.0021C1.51862 15.3064 1.55794 16.4138 1.68317 17.3453C1.87199 18.7497 2.2721 19.9035 3.18449 20.8159C4.09688 21.7283 5.25068 22.1284 6.65506 22.3172C8.0152 22.5 9.74992 22.5 11.9259 22.5H12.0748C14.2508 22.5 15.9855 22.5 17.3456 22.3172C18.75 22.1284 19.9038 21.7283 20.8162 20.8159C21.7286 19.9035 22.1287 18.7497 22.3175 17.3453C22.4428 16.4137 22.4822 15.3065 22.4947 14.0021Z',
  d5: 'M1.50625 9.99792C1.50179 10.4685 1.49956 10.7037 1.64629 10.8519C1.79302 11 2.02969 11 2.50303 11L21.4979 11C21.9712 11 22.2079 11 22.3546 10.8519C22.5014 10.7037 22.4991 10.4685 22.4947 9.99792C22.4822 8.69353 22.4428 7.58627 22.3175 6.65471C22.1287 5.25034 21.7286 4.09653 20.8162 3.18414C19.9038 2.27175 18.75 1.87164 17.3456 1.68282C15.9855 1.49996 14.2508 1.49998 12.0748 1.5H11.9259C9.74994 1.49998 8.0152 1.49996 6.65506 1.68283C5.25068 1.87164 4.09688 2.27175 3.18449 3.18414C2.2721 4.09653 1.87199 5.25034 1.68317 6.65472C1.55794 7.58622 1.51862 8.69356 1.50625 9.99792Z',
  d6: 'M3 21H21V3H3V21Z',
  d7: 'M21 12L3 12',
  d8: 'M3 2.25C2.58579 2.25 2.25 2.58579 2.25 3V11L21.75 11V3C21.75 2.58579 21.4142 2.25 21 2.25H3Z',
  d9: 'M21.75 13L2.25 13V21C2.25 21.4142 2.58579 21.75 3 21.75H21C21.4142 21.75 21.75 21.4142 21.75 21V13Z',
};

export const IconLayout2RowStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="layout-2-row-stroke-rounded IconLayout2RowStrokeRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconLayout2RowDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="layout-2-row-duotone-rounded IconLayout2RowDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
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
      />
    </TheIconWrapper>
  );
};

export const IconLayout2RowTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="layout-2-row-twotone-rounded IconLayout2RowTwotoneRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconLayout2RowSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="layout-2-row-solid-rounded IconLayout2RowSolidRounded"
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
    </TheIconWrapper>
  );
};

export const IconLayout2RowBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="layout-2-row-bulk-rounded IconLayout2RowBulkRounded"
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

export const IconLayout2RowStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="layout-2-row-stroke-sharp IconLayout2RowStrokeSharp"
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
      />
    </TheIconWrapper>
  );
};

export const IconLayout2RowSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="layout-2-row-solid-sharp IconLayout2RowSolidSharp"
    >
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfLayout2Row: TheIconSelfPack = {
  name: 'Layout2Row',
  StrokeRounded: IconLayout2RowStrokeRounded,
  DuotoneRounded: IconLayout2RowDuotoneRounded,
  TwotoneRounded: IconLayout2RowTwotoneRounded,
  SolidRounded: IconLayout2RowSolidRounded,
  BulkRounded: IconLayout2RowBulkRounded,
  StrokeSharp: IconLayout2RowStrokeSharp,
  SolidSharp: IconLayout2RowSolidSharp,
};