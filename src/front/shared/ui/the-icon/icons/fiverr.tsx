import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M15.3517 3C15.3517 2.5286 15.3517 2.29289 15.2052 2.14645C15.0588 2 14.8231 2 14.3517 2H11.6173C8.89563 2 6.52177 4.50923 6.68066 8.5H5C4.5286 8.5 4.29289 8.5 4.14645 8.64645C4 8.79289 4 9.0286 4 9.5V11C4 11.4714 4 11.7071 4.14645 11.8536C4.29289 12 4.5286 12 5 12H7V21C7 21.4714 7 21.7071 7.14645 21.8536C7.29289 22 7.5286 22 8 22H10C10.4714 22 10.7071 22 10.8536 21.8536C11 21.7071 11 21.4714 11 21V12H15.5306V21C15.5306 21.4714 15.5306 21.7071 15.677 21.8536C15.8235 22 16.0592 22 16.5306 22H19C19.4714 22 19.7071 22 19.8536 21.8536C20 21.7071 20 21.4714 20 21V10.5C20 9.55719 20 9.08579 19.7071 8.79289C19.4142 8.5 18.9428 8.5 18 8.5H11V7.22923C11 6.5 11.5 5.5 12.797 5.5H14.3517C14.8231 5.5 15.0588 5.5 15.2052 5.35355C15.3517 5.20711 15.3517 4.9714 15.3517 4.5V3Z',
  d2: 'M11 12V21C11 21.4714 11 21.7071 10.8536 21.8536C10.7071 22 10.4714 22 10 22H8C7.5286 22 7.29289 22 7.14645 21.8536C7 21.7071 7 21.4714 7 21V12H5C4.5286 12 4.29289 12 4.14645 11.8536C4 11.7071 4 11.4714 4 11V9.5C4 9.0286 4 8.79289 4.14645 8.64645C4.29289 8.5 4.5286 8.5 5 8.5H6.68066C6.52177 4.50923 8.89563 2 11.6173 2H14.3517C14.8231 2 15.0588 2 15.2052 2.14645C15.3517 2.29289 15.3517 2.5286 15.3517 3V4.5C15.3517 4.9714 15.3517 5.20711 15.2052 5.35355C15.0588 5.5 14.8231 5.5 14.3517 5.5H12.797C11.5 5.5 11 6.5 11 7.22923V8.5',
  d3: 'M15.6659 2.32476C15.6659 1.818 15.6659 1.56462 15.5057 1.40719C15.3455 1.24976 15.0877 1.24976 14.5721 1.24976H11.5814C8.60457 1.24976 6.00815 3.94718 6.18194 8.23726H4.34372C3.82812 8.23726 3.57032 8.23726 3.41015 8.39469C3.24997 8.55212 3.24997 8.8055 3.24997 9.31226V10.9248C3.24997 11.4315 3.24997 11.6849 3.41015 11.8423C3.57032 11.9998 3.82812 11.9998 4.34372 11.9998H6.53122V21.6748C6.53122 22.1815 6.53122 22.4349 6.6914 22.5923C6.85157 22.7498 7.10937 22.7498 7.62497 22.7498H9.81247C10.3281 22.7498 10.5859 22.7498 10.746 22.5923C10.9062 22.4349 10.9062 22.1815 10.9062 21.6748V11.9998H15.8615V21.6748C15.8615 22.1815 15.8615 22.4349 16.0217 22.5923C16.1819 22.7498 16.4397 22.7498 16.9553 22.7498H19.6562C20.1718 22.7498 20.4296 22.7498 20.5898 22.5923C20.75 22.4349 20.75 22.1815 20.75 21.6748V10.3873C20.75 9.37374 20.75 8.86698 20.4296 8.55212C20.1093 8.23726 19.5937 8.23726 18.5625 8.23726H10.9062V6.87118C10.9062 6.08726 11.4531 5.01226 12.8716 5.01226H14.5721C15.0877 5.01226 15.3455 5.01226 15.5057 4.85483C15.6659 4.6974 15.6659 4.44402 15.6659 3.93726V2.32476Z',
  d4: 'M11.5813 1.24951H14.5721C15.0877 1.24951 15.3455 1.24951 15.5057 1.40694C15.6659 1.56437 15.6659 1.81776 15.6659 2.32451V3.93701C15.6659 4.44377 15.6659 4.69715 15.5057 4.85458C15.3455 5.01201 15.0877 5.01201 14.5721 5.01201H12.8716C11.4531 5.01201 10.9062 6.08701 10.9062 6.87093V8.23701L14.8615 8.23701C15.3329 8.23701 15.5686 8.23701 15.7151 8.38346C15.8615 8.52991 15.8615 8.76561 15.8615 9.23701V10.9995C15.8615 11.4709 15.8615 11.7066 15.7151 11.8531C15.5686 11.9995 15.3329 11.9995 14.8615 11.9995H10.9062V21.6745C10.9062 22.1813 10.9062 22.4347 10.746 22.5921C10.5858 22.7495 10.328 22.7495 9.81244 22.7495H7.62494C7.10935 22.7495 6.85154 22.7495 6.69137 22.5921C6.53119 22.4347 6.53119 22.1813 6.53119 21.6745V11.9995H4.34369C3.82809 11.9995 3.57029 11.9995 3.41011 11.8421C3.24994 11.6847 3.24994 11.4313 3.24994 10.9245V9.31201C3.24994 8.80525 3.24994 8.55187 3.41011 8.39444C3.57029 8.23701 3.82809 8.23701 4.34369 8.23701H6.18191C6.00812 3.94694 8.60454 1.24951 11.5813 1.24951Z',
  d5: 'M7 2H15.5306V5.5H11V8.5L20 8.5V22H15.5306V12H11V22H7V12H4V8.5H7V2Z',
};

export const IconFiverrStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="fiverr-stroke-rounded IconFiverrStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconFiverrDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="fiverr-duotone-rounded IconFiverrDuotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconFiverrTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="fiverr-twotone-rounded IconFiverrTwotoneRounded"
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
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconFiverrSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="fiverr-solid-rounded IconFiverrSolidRounded"
    >
      <path 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconFiverrBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="fiverr-bulk-rounded IconFiverrBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconFiverrStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="fiverr-stroke-sharp IconFiverrStrokeSharp"
    >
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconFiverrSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="fiverr-solid-sharp IconFiverrSolidSharp"
    >
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfFiverr: TheIconSelfPack = {
  name: 'Fiverr',
  StrokeRounded: IconFiverrStrokeRounded,
  DuotoneRounded: IconFiverrDuotoneRounded,
  TwotoneRounded: IconFiverrTwotoneRounded,
  SolidRounded: IconFiverrSolidRounded,
  BulkRounded: IconFiverrBulkRounded,
  StrokeSharp: IconFiverrStrokeSharp,
  SolidSharp: IconFiverrSolidSharp,
};