import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M6 10L6 19',
  d2: 'M6.80844 9.28111C6.43534 9.76037 6.2488 10 6 10C5.7512 10 5.56466 9.76037 5.19156 9.28112L4.44578 8.32312C3.37255 6.94451 2.83594 6.25521 3.04429 5.68812C3.06552 5.63034 3.0916 5.57458 3.12224 5.52145C3.423 5 4.282 5 6 5C7.718 5 8.577 5 8.87776 5.52145C8.9084 5.57458 8.93448 5.63034 8.95571 5.68812C9.16406 6.25521 8.62745 6.94451 7.55422 8.32312L6.80844 9.28111Z',
  d3: 'M10 13V19',
  d4: 'M13 19L14 19',
  d5: 'M17 19L18 19',
  d6: 'M21 19L22 19',
  d7: 'M5.94126 4.25C5.13124 4.24996 4.44377 4.24993 3.92457 4.32238C3.40094 4.39545 2.80255 4.57213 2.47113 5.14674C2.41903 5.23707 2.3748 5.33168 2.33887 5.42948C2.11338 6.04322 2.34661 6.61855 2.61509 7.07905C2.88288 7.53838 3.31089 8.08813 3.8184 8.73999L4.62355 9.77426C4.74709 9.93306 4.87332 10.0953 4.99805 10.2332L4.99805 19C4.99805 19.5523 5.44576 20 5.99805 20C6.55033 20 6.99805 19.5523 6.99805 19L6.99805 10.2343C7.12311 10.0962 7.2497 9.9335 7.37359 9.77426L8.17874 8.73999C8.68625 8.08813 9.11426 7.53838 9.38205 7.07905C9.65053 6.61855 9.88376 6.04322 9.65827 5.42948C9.62234 5.33168 9.57811 5.23707 9.52601 5.14674C9.19459 4.57213 8.5962 4.39545 8.07257 4.32238C7.55337 4.24993 6.86596 4.24996 6.05593 4.25H5.94126Z',
  d8: 'M10 12C10.5523 12 11 12.4477 11 13V19C11 19.5523 10.5523 20 10 20C9.44772 20 9 19.5523 9 19V13C9 12.4477 9.44772 12 10 12Z',
  d9: 'M12 19C12 18.4477 12.4477 18 13 18L14 18C14.5523 18 15 18.4477 15 19C15 19.5523 14.5523 20 14 20H13C12.4477 20 12 19.5523 12 19Z',
  d10: 'M16 19C16 18.4477 16.4477 18 17 18L18 18C18.5523 18 19 18.4477 19 19C19 19.5523 18.5523 20 18 20H17C16.4477 20 16 19.5523 16 19Z',
  d11: 'M20 19C20 18.4477 20.4477 18 21 18L22 18C22.5523 18 23 18.4477 23 19C23 19.5523 22.5523 20 22 20H21C20.4477 20 20 19.5523 20 19Z',
  d12: 'M6 10L6 19M6 10L9 5H3L6 10Z',
  d13: 'M22.75 18.25L20.25 18.25M18.75 18.25L16.25 18.25M14.75 18.25L12.25 18.25',
  d14: 'M6.5 9.5L9.5 5H1.5L4.5 9.5L4.5 19H6.5L6.5 9.5Z',
  d15: 'M8.5 19V13H10.5V19H8.5Z',
  d16: 'M12.5 17L14.5 17V19L12.5 19V17ZM16.5 17L18.5 17V19L16.5 19V17ZM20.5 17L22.5 17V19L20.5 19V17Z',
};

export const IconSignalLow01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="signal-low-01-stroke-rounded IconSignalLow01StrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
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
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSignalLow01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="signal-low-01-duotone-rounded IconSignalLow01DuotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        fill="var(--icon-fill)" 
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
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSignalLow01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="signal-low-01-twotone-rounded IconSignalLow01TwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
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
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSignalLow01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="signal-low-01-solid-rounded IconSignalLow01SolidRounded"
    >
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
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
    </TheIconWrapper>
  );
};

export const IconSignalLow01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="signal-low-01-bulk-rounded IconSignalLow01BulkRounded"
    >
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
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
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconSignalLow01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="signal-low-01-stroke-sharp IconSignalLow01StrokeSharp"
    >
      <path 
        d={d.d12} 
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
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSignalLow01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="signal-low-01-solid-sharp IconSignalLow01SolidSharp"
    >
      <path 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
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
    </TheIconWrapper>
  );
};

export const iconPackOfSignalLow01: TheIconSelfPack = {
  name: 'SignalLow01',
  StrokeRounded: IconSignalLow01StrokeRounded,
  DuotoneRounded: IconSignalLow01DuotoneRounded,
  TwotoneRounded: IconSignalLow01TwotoneRounded,
  SolidRounded: IconSignalLow01SolidRounded,
  BulkRounded: IconSignalLow01BulkRounded,
  StrokeSharp: IconSignalLow01StrokeSharp,
  SolidSharp: IconSignalLow01SolidSharp,
};