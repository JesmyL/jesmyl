import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124Z',
  d2: 'M12 2.5V21.5',
  d3: 'M13 21.4971C13 21.9705 13 22.2071 13.1481 22.3539C13.2963 22.5006 13.5315 22.4984 14.0021 22.4939C15.3065 22.4815 16.4137 22.442 17.3453 22.3168C18.7497 22.1279 19.9035 21.7278 20.8159 20.8154C21.7283 19.9031 22.1284 18.7493 22.3172 17.3449C22.5 15.9847 22.5 14.25 22.5 12.074V11.9252C22.5 9.74917 22.5 8.01444 22.3172 6.6543C22.1284 5.24992 21.7283 4.09611 20.8159 3.18372C19.9035 2.27133 18.7497 1.87122 17.3453 1.68241C16.4137 1.55716 15.3065 1.51771 14.0021 1.50528C13.5315 1.5008 13.2963 1.49856 13.1481 1.64529C13 1.79202 13 2.02869 13 2.50204V21.4971Z',
  d4: 'M11 2.50204C11 2.02869 11 1.79202 10.8519 1.64529C10.7037 1.49856 10.4685 1.5008 9.99792 1.50528C8.69353 1.51771 7.58626 1.55716 6.65471 1.68241C5.25033 1.87122 4.09653 2.27133 3.18414 3.18372C2.27175 4.09611 1.87164 5.24992 1.68282 6.6543C1.49996 8.01443 1.49998 9.74915 1.5 11.9251V12.074C1.49998 14.25 1.49996 15.9847 1.68282 17.3449C1.87164 18.7493 2.27175 19.9031 3.18414 20.8154C4.09653 21.7278 5.25033 22.1279 6.65471 22.3168C7.58626 22.442 8.69353 22.4815 9.99792 22.4939C10.4685 22.4984 10.7037 22.5006 10.8519 22.3539C11 22.2071 11 21.9705 11 21.4971V2.50204Z',
  d5: 'M3 21H21V3H3V21Z',
  d6: 'M12 3V21',
  d7: 'M13 21.75H21C21.4142 21.75 21.75 21.4142 21.75 21V3C21.75 2.58579 21.4142 2.25 21 2.25H13V21.75Z',
  d8: 'M11 2.25H3C2.58579 2.25 2.25 2.58579 2.25 3V21C2.25 21.4142 2.58579 21.75 3 21.75H11V2.25Z',
};

export const IconLayout2ColumnStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="layout-2-column-stroke-rounded IconLayout2ColumnStrokeRounded"
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

export const IconLayout2ColumnDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="layout-2-column-duotone-rounded IconLayout2ColumnDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
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

export const IconLayout2ColumnTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="layout-2-column-twotone-rounded IconLayout2ColumnTwotoneRounded"
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

export const IconLayout2ColumnSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="layout-2-column-solid-rounded IconLayout2ColumnSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconLayout2ColumnBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="layout-2-column-bulk-rounded IconLayout2ColumnBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconLayout2ColumnStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="layout-2-column-stroke-sharp IconLayout2ColumnStrokeSharp"
    >
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconLayout2ColumnSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="layout-2-column-solid-sharp IconLayout2ColumnSolidSharp"
    >
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfLayout2Column: TheIconSelfPack = {
  name: 'Layout2Column',
  StrokeRounded: IconLayout2ColumnStrokeRounded,
  DuotoneRounded: IconLayout2ColumnDuotoneRounded,
  TwotoneRounded: IconLayout2ColumnTwotoneRounded,
  SolidRounded: IconLayout2ColumnSolidRounded,
  BulkRounded: IconLayout2ColumnBulkRounded,
  StrokeSharp: IconLayout2ColumnStrokeSharp,
  SolidSharp: IconLayout2ColumnSolidSharp,
};