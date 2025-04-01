import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28248 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12C2.5 7.52166 2.5 5.28248 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088Z',
  d2: 'M21.5 8.5L2.5 8.5',
  d3: 'M21.5 15.5L2.5 15.5',
  d4: 'M12 21.5C16.4783 21.5 18.7175 21.5 20.1088 20.1088C21.0774 19.1401 21.3716 17.7604 21.461 15.5L2.53899 15.5C2.62835 17.7604 2.92258 19.1401 3.89124 20.1088C5.28249 21.5 7.52166 21.5 12 21.5Z',
  d5: 'M2.5 12.0981V11.9024C2.5 11.9348 2.5 11.9673 2.5 12C2.5 12.0328 2.5 12.0655 2.5 12.0981Z',
  d6: 'M2.53899 8.5C2.62835 6.23963 2.92258 4.85991 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.0774 4.85991 21.3716 6.23963 21.461 8.5H2.53899Z',
  d7: 'M1.68259 6.65459C1.64656 6.92255 1.62855 7.05653 1.67166 7.17319C1.71284 7.28463 1.80144 7.38594 1.9064 7.44161C2.01628 7.49988 2.15905 7.49988 2.44458 7.49988L21.5549 7.49988C21.8405 7.49988 21.9832 7.49988 22.0931 7.44161C22.1981 7.38594 22.2867 7.28463 22.3279 7.1732C22.371 7.05653 22.353 6.92255 22.3169 6.65459C22.1281 5.25021 21.728 4.09641 20.8156 3.18401C19.9032 2.27162 18.7494 1.87152 17.3451 1.6827C15.9849 1.49984 14.2502 1.49985 12.0742 1.49988L11.9253 1.49988C9.74935 1.49985 8.01462 1.49984 6.65447 1.6827C5.25009 1.87152 4.09629 2.27162 3.1839 3.18401C2.27151 4.09641 1.8714 5.25021 1.68259 6.65459ZM22.3169 17.3452C22.353 17.0772 22.371 16.9432 22.3279 16.8266C22.2867 16.7151 22.1981 16.6138 22.0931 16.5582C21.9832 16.4999 21.8405 16.4999 21.5549 16.4999L2.44458 16.4999C2.15905 16.4999 2.01628 16.4999 1.9064 16.5582C1.80144 16.6138 1.71284 16.7151 1.67166 16.8266C1.62855 16.9432 1.64656 17.0772 1.68259 17.3452C1.8714 18.7495 2.27151 19.9034 3.1839 20.8157C4.09629 21.7281 5.2501 22.1282 6.65447 22.3171C8.01461 22.4999 9.74934 22.4999 11.9253 22.4999H12.0742C14.2502 22.4999 15.9849 22.4999 17.3451 22.3171C18.7494 22.1282 19.9032 21.7281 20.8156 20.8157C21.728 19.9034 22.1281 18.7495 22.3169 17.3452Z',
  d8: 'M1.5 11.9254V12.0743C1.5 12.5783 1.49999 13.0587 1.50226 13.5161C1.50455 13.9779 1.50569 14.2087 1.65199 14.3543C1.79828 14.4999 2.03081 14.4999 2.49587 14.4999L21.5041 14.4999C21.9692 14.4999 22.2017 14.4999 22.348 14.3543C22.4943 14.2087 22.4955 13.9779 22.4977 13.5161C22.5 13.0586 22.5 12.5783 22.5 12.0743V11.9255C22.5 11.4214 22.5 10.9411 22.4977 10.4836C22.4955 10.0219 22.4943 9.79102 22.348 9.64545C22.2017 9.49988 21.9692 9.49988 21.5041 9.49988L2.49587 9.49988C2.03081 9.49988 1.79828 9.49988 1.65198 9.64545C1.50569 9.79102 1.50455 10.0219 1.50226 10.4836C1.49999 10.9411 1.5 11.4214 1.5 11.9254Z',
  d9: 'M3 21H21V3H3V21Z',
  d10: 'M21 9L3 9',
  d11: 'M21 15L3 15',
  d12: 'M3 2.25C2.58579 2.25 2.25 2.58579 2.25 3V8L21.75 8V3C21.75 2.58579 21.4142 2.25 21 2.25H3Z',
  d13: 'M21.75 10L2.25 10V14L21.75 14V10Z',
  d14: 'M21.75 16L2.25 16V21C2.25 21.4142 2.58579 21.75 3 21.75H21C21.4142 21.75 21.75 21.4142 21.75 21V16Z',
};

export const IconLayout3RowStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="layout-3-row-stroke-rounded IconLayout3RowStrokeRounded"
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
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconLayout3RowDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="layout-3-row-duotone-rounded IconLayout3RowDuotoneRounded"
    >
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
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
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconLayout3RowTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="layout-3-row-twotone-rounded IconLayout3RowTwotoneRounded"
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
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconLayout3RowSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="layout-3-row-solid-rounded IconLayout3RowSolidRounded"
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
    </TheIconWrapper>
  );
};

export const IconLayout3RowBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="layout-3-row-bulk-rounded IconLayout3RowBulkRounded"
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
    </TheIconWrapper>
  );
};

export const IconLayout3RowStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="layout-3-row-stroke-sharp IconLayout3RowStrokeSharp"
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
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconLayout3RowSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="layout-3-row-solid-sharp IconLayout3RowSolidSharp"
    >
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfLayout3Row: TheIconSelfPack = {
  name: 'Layout3Row',
  StrokeRounded: IconLayout3RowStrokeRounded,
  DuotoneRounded: IconLayout3RowDuotoneRounded,
  TwotoneRounded: IconLayout3RowTwotoneRounded,
  SolidRounded: IconLayout3RowSolidRounded,
  BulkRounded: IconLayout3RowBulkRounded,
  StrokeSharp: IconLayout3RowStrokeSharp,
  SolidSharp: IconLayout3RowSolidSharp,
};