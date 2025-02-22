import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M22 4H2',
  d2: 'M21 8H3',
  d3: 'M21 12H14',
  d4: 'M14 8L14 18C14 18.9428 14 19.4142 14.2929 19.7071C14.5858 20 15.0572 20 16 20H19C19.9428 20 20.4142 20 20.7071 19.7071C21 19.4142 21 18.9428 21 18V8',
  d5: 'M3 4V20M21 4V8',
  d6: 'M16 12H19C19.9428 12 20.4142 12 20.7071 11.7071C21 11.4142 21 10.9428 21 10V8H14V10C14 10.9428 14 11.4142 14.2929 11.7071C14.5858 12 15.0572 12 16 12Z',
  d7: 'M21 8V4.05049C21 4.0226 20.9774 4 20.9495 4H3.03125C3.01399 4 3 4.01399 3 4.03125V7.97243C3 7.98766 3.01234 8 3.02757 8H21Z',
  d8: 'M21 8V18C21 18.9428 21 19.4142 20.7071 19.7071C20.4142 20 19.9428 20 19 20H16C15.0572 20 14.5858 20 14.2929 19.7071C14 19.4142 14 18.9428 14 18V8',
  d9: 'M22 4H20.9495M2 4H3.03125M3 8H3.02757H21V4.05049C21 4.0226 20.9774 4 20.9495 4V4M3 20V4.03125C3 4.01399 3.01399 4 3.03125 4V4M20.9495 4H3.03125',
  d10: 'M2 3C1.44772 3 1 3.44772 1 4C1 4.55228 1.44772 5 2 5V20C2 20.5523 2.44772 21 3 21C3.55228 21 4 20.5523 4 20V8.75H21C21.4714 8.75 21.7071 8.75 21.8536 8.60355C22 8.45711 22 8.2214 22 7.75V5C22.5523 5 23 4.55228 23 4C23 3.44772 22.5523 3 22 3H2Z',
  d11: 'M21.4 14.875C21.6828 14.875 21.8243 14.875 21.9121 14.9629C22 15.0507 22 15.1922 22 15.475L22 18.1697C22.0001 18.6025 22.0001 18.9994 21.9567 19.3222C21.9089 19.6777 21.7965 20.0534 21.4874 20.3624C21.1784 20.6715 20.8027 20.7839 20.4472 20.8317C20.1244 20.8751 19.7276 20.8751 19.2948 20.875H16.2053C15.7725 20.8751 15.3756 20.8751 15.0528 20.8317C14.6973 20.7839 14.3216 20.6715 14.0126 20.3624C13.7035 20.0534 13.5911 19.6777 13.5433 19.3222C13.4999 18.9994 13.4999 18.6026 13.5 18.1697L13.5 15.475C13.5 15.1922 13.5 15.0507 13.5879 14.9629C13.6757 14.875 13.8172 14.875 14.1 14.875H21.4Z',
  d12: 'M13.5 10.975C13.5 10.6922 13.5 10.5507 13.5879 10.4629C13.6757 10.375 13.8172 10.375 14.1 10.375H21.4C21.6828 10.375 21.8243 10.375 21.9121 10.4629C22 10.5507 22 10.6922 22 10.975L22 12.775C22 13.0578 22 13.1993 21.9121 13.2871C21.8243 13.375 21.6828 13.375 21.4 13.375H14.1C13.8172 13.375 13.6757 13.375 13.5879 13.2871C13.5 13.1993 13.5 13.0578 13.5 12.775L13.5 10.975Z',
  d13: 'M4 8.75H21C21.4714 8.75 21.7071 8.75 21.8536 8.60355C22 8.45711 22 8.2214 22 7.75V5H4V8.75Z',
  d14: 'M2 3C1.44772 3 1 3.44772 1 4C1 4.55228 1.44772 5 2 5V20C2 20.5523 2.44772 21 3 21C3.55228 21 4 20.5523 4 20V5H22C22.5523 5 23 4.55228 23 4C23 3.44772 22.5523 3 22 3H2Z',
  d15: 'M22 4.00049H2',
  d16: 'M20 8.03882H4',
  d17: 'M20 12.0771H14',
  d18: 'M14 8.03882V19.9999H20V8.03882',
  d19: 'M4.00684 4V20M20.0094 4.04214V8.04953',
  d20: 'M5 9.25H21V5.5H22V3.5H2V5.5H3V20.5H5V9.25Z',
  d21: 'M13.5 20.5H21V15.25H13.5V20.5Z',
  d22: 'M13.5 13.75V10.75H21V13.75H13.5Z',
};

export const IconDesk01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="desk-01-stroke-rounded IconDesk01StrokeRounded"
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
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconDesk01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="desk-01-duotone-rounded IconDesk01DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
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
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconDesk01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="desk-01-twotone-rounded IconDesk01TwotoneRounded"
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
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconDesk01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="desk-01-solid-rounded IconDesk01SolidRounded"
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
    </TheIconWrapper>
  );
};

export const IconDesk01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="desk-01-bulk-rounded IconDesk01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d14} 
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
    </TheIconWrapper>
  );
};

export const IconDesk01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="desk-01-stroke-sharp IconDesk01StrokeSharp"
    >
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
      <path 
        d={d.d19} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
    </TheIconWrapper>
  );
};

export const IconDesk01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="desk-01-solid-sharp IconDesk01SolidSharp"
    >
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
    </TheIconWrapper>
  );
};

export const iconPackOfDesk01: TheIconSelfPack = {
  name: 'Desk01',
  StrokeRounded: IconDesk01StrokeRounded,
  DuotoneRounded: IconDesk01DuotoneRounded,
  TwotoneRounded: IconDesk01TwotoneRounded,
  SolidRounded: IconDesk01SolidRounded,
  BulkRounded: IconDesk01BulkRounded,
  StrokeSharp: IconDesk01StrokeSharp,
  SolidSharp: IconDesk01SolidSharp,
};