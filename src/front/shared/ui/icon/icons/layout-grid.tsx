import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124Z',
  d2: 'M21.5 12L2.5 12',
  d3: 'M12 2.5L12 21.5',
  d4: 'M3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124Z',
  d5: 'M2.50204 12.9996C2.02869 12.9996 1.79202 12.9996 1.64529 13.1477C1.49856 13.2959 1.5008 13.5311 1.50528 14.0017C1.51771 15.3061 1.55716 16.4133 1.68241 17.3449C1.87122 18.7493 2.27133 19.9031 3.18372 20.8154C4.09611 21.7278 5.24992 22.1279 6.6543 22.3168C7.58585 22.442 8.69311 22.4815 9.9975 22.4939C10.468 22.4984 10.7033 22.5006 10.8514 22.3539C10.9996 22.2071 10.9996 21.9705 10.9996 21.4971V13.9996C10.9996 13.5282 10.9996 13.2925 10.8531 13.146C10.7067 12.9996 10.471 12.9996 9.99958 12.9996H2.50204ZM22.4939 9.99751C22.4984 10.468 22.5006 10.7033 22.3539 10.8515C22.2071 10.9996 21.9705 10.9996 21.4971 10.9996H13.9996C13.5282 10.9996 13.2925 10.9996 13.146 10.8531C12.9996 10.7067 12.9996 10.471 12.9996 9.99959V2.50204C12.9996 2.02869 12.9996 1.79202 13.1477 1.64529C13.2959 1.49856 13.5311 1.5008 14.0017 1.50528C15.3061 1.51771 16.4133 1.55716 17.3449 1.68241C18.7493 1.87122 19.9031 2.27133 20.8154 3.18372C21.7278 4.09611 22.1279 5.24992 22.3168 6.6543C22.442 7.58585 22.4815 8.69311 22.4939 9.99751Z',
  d6: 'M10.9996 2.50204C10.9996 2.02869 10.9996 1.79202 10.8514 1.64529C10.7033 1.49856 10.468 1.5008 9.9975 1.50528C8.69311 1.51771 7.58585 1.55716 6.65429 1.68241C5.24992 1.87122 4.09611 2.27133 3.18372 3.18372C2.27133 4.09611 1.87122 5.24992 1.68241 6.6543C1.55716 7.58585 1.51771 8.69311 1.50528 9.99751C1.5008 10.468 1.49856 10.7033 1.64529 10.8515C1.79202 10.9996 2.02869 10.9996 2.50204 10.9996H9.99958C10.471 10.9996 10.7067 10.9996 10.8531 10.8531C10.9996 10.7067 10.9996 10.471 10.9996 9.99959V2.50204ZM12.9996 21.4971C12.9996 21.9705 12.9996 22.2071 13.1477 22.3539C13.2959 22.5006 13.5311 22.4984 14.0017 22.4939C15.3061 22.4815 16.4133 22.442 17.3449 22.3168C18.7493 22.1279 19.9031 21.7278 20.8154 20.8154C21.7278 19.9031 22.1279 18.7493 22.3168 17.3449C22.442 16.4133 22.4815 15.3061 22.4939 14.0017C22.4984 13.5311 22.5006 13.2959 22.3539 13.1477C22.2071 12.9996 21.9705 12.9996 21.4971 12.9996H13.9996C13.5282 12.9996 13.2925 12.9996 13.146 13.146C12.9996 13.2925 12.9996 13.5282 12.9996 13.9996V21.4971Z',
  d7: 'M3 21H21V3H3V21Z',
  d8: 'M21 12L3 12',
  d9: 'M12 3L12 21',
  d10: 'M11 2.25V11H2.25V3C2.25 2.58579 2.58579 2.25 3 2.25H11Z',
  d11: 'M13 2.25V11H21.75V3C21.75 2.58579 21.4142 2.25 21 2.25H13Z',
  d12: 'M21.75 13H13V21.75H21C21.4142 21.75 21.75 21.4142 21.75 21V13Z',
  d13: 'M11 21.75V13H2.25V21C2.25 21.4142 2.58579 21.75 3 21.75H11Z',
};

export const IconLayoutGridStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="layout-grid-stroke-rounded IconLayoutGridStrokeRounded"
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
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLayoutGridDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="layout-grid-duotone-rounded IconLayoutGridDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
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
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLayoutGridTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="layout-grid-twotone-rounded IconLayoutGridTwotoneRounded"
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
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLayoutGridSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="layout-grid-solid-rounded IconLayoutGridSolidRounded"
    >
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

export const IconLayoutGridBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="layout-grid-bulk-rounded IconLayoutGridBulkRounded"
    >
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

export const IconLayoutGridStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="layout-grid-stroke-sharp IconLayoutGridStrokeSharp"
    >
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
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconLayoutGridSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="layout-grid-solid-sharp IconLayoutGridSolidSharp"
    >
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
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfLayoutGrid: TheIconSelfPack = {
  name: 'LayoutGrid',
  StrokeRounded: IconLayoutGridStrokeRounded,
  DuotoneRounded: IconLayoutGridDuotoneRounded,
  TwotoneRounded: IconLayoutGridTwotoneRounded,
  SolidRounded: IconLayoutGridSolidRounded,
  BulkRounded: IconLayoutGridBulkRounded,
  StrokeSharp: IconLayoutGridStrokeSharp,
  SolidSharp: IconLayoutGridSolidSharp,
};