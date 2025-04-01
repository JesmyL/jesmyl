import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2.5 11C2.5 13.8284 2.5 15.2426 3.37868 16.1213C4.25736 17 5.67157 17 8.5 17H15.5C18.3284 17 19.7426 17 20.6213 16.1213C21.5 15.2426 21.5 13.8284 21.5 11V8C21.5 5.17157 21.5 3.75736 20.6213 2.87868C19.7426 2 18.3284 2 15.5 2H8.5C5.67157 2 4.25736 2 3.37868 2.87868C2.5 3.75736 2.5 5.17157 2.5 8V11Z',
  d2: 'M7 22L12.0001 19L17 22',
  d3: 'M12 17V22',
  d4: 'M7 22L12.0001 19L17 22M12 17V22',
  d5: 'M1.75 11.65C1.75 14.7613 1.75 16.3169 2.69805 17.2835C3.6461 18.25 5.17196 18.25 8.22368 18.25H15.7763C18.828 18.25 20.3539 18.25 21.302 17.2835C22.25 16.3169 22.25 14.7613 22.25 11.65V8.35C22.25 5.23873 22.25 3.6831 21.302 2.71655C20.3539 1.75 18.828 1.75 15.7763 1.75H8.22368C5.17196 1.75 3.6461 1.75 2.69805 2.71655C1.75 3.6831 1.75 5.23873 1.75 8.35V11.65Z',
  d6: 'M11 20.7663V22C11 22.5523 11.4477 23 12 23C12.5523 23 13 22.5523 13 22V20.7661L16.4856 22.8575C16.9592 23.1416 17.5735 22.9881 17.8576 22.5145C18.1418 22.0409 17.9882 21.4267 17.5147 21.1425L13 18.4337V17H11V18.4339L6.48566 21.1425C6.01208 21.4266 5.85851 22.0409 6.14265 22.5145C6.4268 22.9881 7.04106 23.1416 7.51464 22.8575L11 20.7663Z',
  d7: 'M11 18.25H13V18.4337L17.5147 21.1425C17.9882 21.4267 18.1418 22.0409 17.8576 22.5145C17.5735 22.9881 16.9592 23.1416 16.4856 22.8575L13 20.7661V22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22V20.7663L7.51464 22.8575C7.04106 23.1416 6.4268 22.9881 6.14265 22.5145C5.85851 22.0409 6.01208 21.4266 6.48566 21.1425L11 18.4339V18.25Z',
  d8: 'M21 16V2H3V16L21 16Z',
  d9: 'M12 16L12 22',
  d10: 'M11 20.1604V22.25H13V20.1603L16.4737 22.2501L17.5 20.5351L13 17.8279V16.25H11V17.828L6.5 20.5351L7.52628 22.2501L11 20.1604Z',
  d11: 'M2.25 2.5C2.25 2.08579 2.58579 1.75 3 1.75H21C21.4142 1.75 21.75 2.08579 21.75 2.5V16.5C21.75 16.6989 21.671 16.8897 21.5303 17.0303C21.3897 17.171 21.1989 17.25 21 17.25L3 17.25C2.58579 17.25 2.25 16.9142 2.25 16.5V2.5Z',
};

export const IconPresentation01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="presentation-01-stroke-rounded IconPresentation01StrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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
      />
    </TheIconWrapper>
  );
};

export const IconPresentation01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="presentation-01-duotone-rounded IconPresentation01DuotoneRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconPresentation01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="presentation-01-twotone-rounded IconPresentation01TwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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

export const IconPresentation01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="presentation-01-solid-rounded IconPresentation01SolidRounded"
    >
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconPresentation01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="presentation-01-bulk-rounded IconPresentation01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconPresentation01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="presentation-01-stroke-sharp IconPresentation01StrokeSharp"
    >
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d9} 
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
    </TheIconWrapper>
  );
};

export const IconPresentation01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="presentation-01-solid-sharp IconPresentation01SolidSharp"
    >
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfPresentation01: TheIconSelfPack = {
  name: 'Presentation01',
  StrokeRounded: IconPresentation01StrokeRounded,
  DuotoneRounded: IconPresentation01DuotoneRounded,
  TwotoneRounded: IconPresentation01TwotoneRounded,
  SolidRounded: IconPresentation01SolidRounded,
  BulkRounded: IconPresentation01BulkRounded,
  StrokeSharp: IconPresentation01StrokeSharp,
  SolidSharp: IconPresentation01SolidSharp,
};