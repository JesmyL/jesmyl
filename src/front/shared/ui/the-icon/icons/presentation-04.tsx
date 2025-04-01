import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2.5 11.5C2.5 14.3284 2.5 15.7426 3.37868 16.6213C4.25736 17.5 5.67157 17.5 8.5 17.5H15.5C18.3284 17.5 19.7426 17.5 20.6213 16.6213C21.5 15.7426 21.5 14.3284 21.5 11.5V9.5C21.5 6.67157 21.5 5.25736 20.6213 4.37868C19.7426 3.5 18.3284 3.5 15.5 3.5H8.5C5.67157 3.5 4.25736 3.5 3.37868 4.37868C2.5 5.25736 2.5 6.67157 2.5 9.5V11.5Z',
  d2: 'M12 2V3.5',
  d3: 'M7 22L12.0001 19L17 22',
  d4: 'M12 17.7783V22.0001',
  d5: 'M12 17.4814V21.9996',
  d6: 'M7 22.5L12.0001 19.5L17 22.5M12 17.5V22.5',
  d7: 'M12 1C12.5523 1 13 1.44772 13 2L13 3.5C13 4.05228 12.5523 4.5 12 4.5C11.4477 4.5 11 4.05228 11 3.5V2C11 1.44772 11.4477 1 12 1Z',
  d8: 'M11 18.4339V17H13V18.4337L17.5147 21.1425C17.9882 21.4267 18.1418 22.0409 17.8576 22.5145C17.5735 22.9881 16.9592 23.1416 16.4856 22.8575L13 20.7661V22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22V20.7663L7.51464 22.8575C7.04106 23.1416 6.4268 22.9881 6.14265 22.5145C5.85851 22.0409 6.01208 21.4266 6.48566 21.1425L11 18.4339Z',
  d9: 'M1.75 11.6071C1.75 14.7386 1.75 16.3044 2.69805 17.2772C3.6461 18.25 5.17196 18.25 8.22368 18.25H15.7763C18.828 18.25 20.3539 18.25 21.302 17.2772C22.25 16.3044 22.25 14.7386 22.25 11.6071V9.39286C22.25 6.26138 22.25 4.69565 21.302 3.72282C20.3539 2.75 18.828 2.75 15.7763 2.75H8.22368C5.17196 2.75 3.6461 2.75 2.69805 3.72282C1.75 4.69565 1.75 6.26138 1.75 9.39286V11.6071Z',
  d10: 'M13 2C13 1.44772 12.5523 1 12 1C11.4477 1 11 1.44772 11 2V2.75H13L13 2ZM11 18.25H13V18.4337L17.5147 21.1425C17.9882 21.4267 18.1418 22.0409 17.8576 22.5145C17.5735 22.9881 16.9592 23.1416 16.4856 22.8575L13 20.7661V22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22V20.7663L7.51464 22.8575C7.04106 23.1416 6.4268 22.9881 6.14266 22.5145C5.85851 22.0409 6.01208 21.4266 6.48566 21.1425L11 18.4339V18.25Z',
  d11: 'M21 17V4H3V17L21 17Z',
  d12: 'M12 17L12 22',
  d13: 'M12 2L12 4',
  d14: 'M2.25 3.5C2.25 3.08579 2.58579 2.75 3 2.75H21C21.4142 2.75 21.75 3.08579 21.75 3.5V16.5C21.75 16.6989 21.671 16.8897 21.5303 17.0303C21.3897 17.171 21.1989 17.25 21 17.25L3 17.25C2.58579 17.25 2.25 16.9142 2.25 16.5V3.5Z',
  d15: 'M11 3.5L11 1.5L13 1.5L13 3.5L11 3.5Z',
  d16: 'M11 20.4104V22.5H13V20.4103L16.4737 22.5001L17.5 20.7851L13 18.0779V16.5H11V18.078L6.5 20.7851L7.52628 22.5001L11 20.4104Z',
};

export const IconPresentation04StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="presentation-04-stroke-rounded IconPresentation04StrokeRounded"
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconPresentation04DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="presentation-04-duotone-rounded IconPresentation04DuotoneRounded"
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconPresentation04TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="presentation-04-twotone-rounded IconPresentation04TwotoneRounded"
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
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconPresentation04SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="presentation-04-solid-rounded IconPresentation04SolidRounded"
    >
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
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

export const IconPresentation04BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="presentation-04-bulk-rounded IconPresentation04BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconPresentation04StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="presentation-04-stroke-sharp IconPresentation04StrokeSharp"
    >
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d12} 
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
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconPresentation04SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="presentation-04-solid-sharp IconPresentation04SolidSharp"
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
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfPresentation04: TheIconSelfPack = {
  name: 'Presentation04',
  StrokeRounded: IconPresentation04StrokeRounded,
  DuotoneRounded: IconPresentation04DuotoneRounded,
  TwotoneRounded: IconPresentation04TwotoneRounded,
  SolidRounded: IconPresentation04SolidRounded,
  BulkRounded: IconPresentation04BulkRounded,
  StrokeSharp: IconPresentation04StrokeSharp,
  SolidSharp: IconPresentation04SolidSharp,
};