import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28248 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28248 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088Z',
  d2: 'M2.5 9L21.5 9',
  d3: 'M3.88734 20.1129C5.27858 21.5042 7.51775 21.5042 11.9961 21.5042C16.4744 21.5042 18.7136 21.5042 20.1049 20.1129C21.4961 18.7217 21.4961 16.4825 21.4961 12.0042L21.4961 9.00415L2.51884 9.00415C2.49609 9.87506 2.49609 10.8675 2.49609 12.0042C2.49609 16.4825 2.49609 18.7217 3.88734 20.1129Z',
  d4: 'M1.5 11.9254V12.0743C1.49998 14.2503 1.49996 15.985 1.68282 17.3452C1.87164 18.7495 2.27175 19.9034 3.18414 20.8157C4.09653 21.7281 5.25033 22.1282 6.65471 22.3171C8.01485 22.4999 9.74957 22.4999 11.9255 22.4999H12.0745C14.2504 22.4999 15.9852 22.4999 17.3453 22.3171C18.7497 22.1282 19.9035 21.7281 20.8159 20.8157C21.7283 19.9034 22.1284 18.7495 22.3172 17.3452C22.5 15.985 22.5 14.2503 22.5 12.0743V11.9255C22.5 11.6042 22.5 11.2926 22.4994 10.9904C22.4985 10.5249 22.4981 10.2921 22.3517 10.146C22.2053 9.99988 21.9715 9.99988 21.5038 9.99988L2.49623 9.99988C2.02855 9.99988 1.79471 9.99988 1.64832 10.146C1.50193 10.2921 1.50148 10.5249 1.50058 10.9904C1.49999 11.2926 1.5 11.6042 1.5 11.9254Z',
  d5: 'M1.64615 6.9463C1.59242 7.42644 1.56556 7.66651 1.71463 7.8332C1.8637 7.99988 2.11512 7.99988 2.61797 7.99988L21.3804 7.99988C21.8832 7.99988 22.1346 7.99988 22.2837 7.8332C22.4328 7.66651 22.4059 7.42644 22.3522 6.9463C22.3411 6.8472 22.3292 6.74998 22.3163 6.65459C22.1275 5.25021 21.7274 4.09641 20.815 3.18401C19.9026 2.27162 18.7488 1.87152 17.3444 1.6827C15.9843 1.49984 14.2496 1.49985 12.0736 1.49988L11.9247 1.49988C9.74875 1.49985 8.01401 1.49984 6.65387 1.6827C5.24949 1.87152 4.09569 2.27162 3.1833 3.18401C2.27091 4.09641 1.8708 5.25021 1.68198 6.65459C1.66916 6.74998 1.65724 6.84721 1.64615 6.9463Z',
  d6: 'M3 21H21V3H3V21Z',
  d7: 'M3 9L21 9',
  d8: 'M2.25 8L2.25 3C2.25 2.58579 2.58579 2.25 3 2.25H21C21.4142 2.25 21.75 2.58579 21.75 3V8L2.25 8Z',
  d9: 'M21.75 10V21C21.75 21.4142 21.4142 21.75 21 21.75H3C2.58579 21.75 2.25 21.4142 2.25 21L2.25 10L21.75 10Z',
};

export const IconLayoutTopStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="layout-top-stroke-rounded IconLayoutTopStrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconLayoutTopDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="layout-top-duotone-rounded IconLayoutTopDuotoneRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconLayoutTopTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="layout-top-twotone-rounded IconLayoutTopTwotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconLayoutTopSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="layout-top-solid-rounded IconLayoutTopSolidRounded"
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

export const IconLayoutTopBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="layout-top-bulk-rounded IconLayoutTopBulkRounded"
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

export const IconLayoutTopStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="layout-top-stroke-sharp IconLayoutTopStrokeSharp"
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

export const IconLayoutTopSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="layout-top-solid-sharp IconLayoutTopSolidSharp"
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

export const iconPackOfLayoutTop: TheIconSelfPack = {
  name: 'LayoutTop',
  StrokeRounded: IconLayoutTopStrokeRounded,
  DuotoneRounded: IconLayoutTopDuotoneRounded,
  TwotoneRounded: IconLayoutTopTwotoneRounded,
  SolidRounded: IconLayoutTopSolidRounded,
  BulkRounded: IconLayoutTopBulkRounded,
  StrokeSharp: IconLayoutTopStrokeSharp,
  SolidSharp: IconLayoutTopSolidSharp,
};