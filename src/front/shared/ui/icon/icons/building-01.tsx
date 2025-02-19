import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M4 22H20',
  d2: 'M17 9H14M18 13H14M18 17H14',
  d3: 'M6 22V3.2C6 2.42385 6.47098 2 7.2 2C8.87221 2 9.70832 2 10.4079 2.1108C14.2589 2.72075 17.2793 5.74106 17.8892 9.59209C18 10.2917 18 11.1278 18 12.8V22',
  d4: 'M6 3.2V22H18V12.8C18 11.1278 18 10.2917 17.8892 9.59209C17.2793 5.74106 14.2589 2.72075 10.4079 2.1108C9.70832 2 8.87221 2 7.2 2C6.47098 2 6 2.42385 6 3.2Z',
  d5: 'M4 20.75C3.44772 20.75 3 21.1977 3 21.75C3 22.3023 3.44772 22.75 4 22.75H20C20.5523 22.75 21 22.3023 21 21.75C21 21.1977 20.5523 20.75 20 20.75H19.15C18.9614 20.75 18.8672 20.75 18.8086 20.6914C18.75 20.6328 18.75 20.5386 18.75 20.35V17.15C18.75 16.9614 18.75 16.8672 18.6914 16.8086C18.6328 16.75 18.5386 16.75 18.35 16.75H14C13.5858 16.75 13.25 16.4142 13.25 16C13.25 15.5858 13.5858 15.25 14 15.25H18.35C18.5386 15.25 18.6328 15.25 18.6914 15.1914C18.75 15.1328 18.75 15.0386 18.75 14.85V13.15C18.75 12.9614 18.75 12.8672 18.6914 12.8086C18.6328 12.75 18.5386 12.75 18.35 12.75H14C13.5858 12.75 13.25 12.4142 13.25 12C13.25 11.5858 13.5858 11.25 14 11.25H18.3393C18.5308 11.25 18.6265 11.25 18.6854 11.1895C18.7443 11.1291 18.7418 11.0343 18.7368 10.8447C18.7224 10.2994 18.6924 9.86929 18.63 9.47477C18.6078 9.33514 18.5828 9.19652 18.5549 9.05897C18.5253 8.9132 18.5106 8.84032 18.4553 8.79516C18.4001 8.75 18.3236 8.75 18.1707 8.75H14C13.5858 8.75 13.25 8.41421 13.25 8C13.25 7.58579 13.5858 7.25 14 7.25H17.4008C17.6745 7.25 17.8114 7.25 17.8701 7.15576C17.9288 7.06153 17.8703 6.94223 17.7531 6.70363C16.3809 3.90859 13.7163 1.87546 10.5252 1.37004C9.76693 1.24994 8.87712 1.24996 7.2904 1.25L7.2 1.25001C6.69234 1.25001 6.18613 1.39966 5.80393 1.77109C5.41814 2.14599 5.25 2.65806 5.25 3.20001V20.35C5.25 20.5386 5.25 20.6328 5.19142 20.6914C5.13284 20.75 5.03856 20.75 4.85 20.75H4Z',
  d6: 'M3 21.75C3 21.1977 3.44772 20.75 4 20.75H5.25V3.2C5.25 2.65805 5.41814 2.14599 5.80393 1.77108C6.18613 1.39966 6.69234 1.25 7.2 1.25L7.29034 1.25H7.29038C8.87711 1.24996 9.76693 1.24994 10.5252 1.37004C14.6972 2.03081 17.9692 5.30281 18.63 9.47477C18.7501 10.2331 18.75 11.1229 18.75 12.7096V12.7097L18.75 20.75H20C20.5523 20.75 21 21.1977 21 21.75C21 22.3023 20.5523 22.75 20 22.75H4C3.44772 22.75 3 22.3023 3 21.75Z',
  d7: 'M3 21.75C3 21.1977 3.44772 20.75 4 20.75H20C20.5523 20.75 21 21.1977 21 21.75C21 22.3023 20.5523 22.75 20 22.75H4C3.44772 22.75 3 22.3023 3 21.75Z',
  d8: 'M18.75 16.75H14C13.5858 16.75 13.25 16.4142 13.25 16C13.25 15.5858 13.5858 15.25 14 15.25H18.75L18.75 16.75Z',
  d9: 'M18.75 12.75H14C13.5858 12.75 13.25 12.4142 13.25 12C13.25 11.5858 13.5858 11.25 14 11.25H18.7446C18.75 11.6648 18.75 12.1427 18.75 12.7096V12.75Z',
  d10: 'M18.487 8.75H14C13.5858 8.75 13.25 8.41421 13.25 8C13.25 7.58579 13.5858 7.25 14 7.25H18.0007C18.2012 7.73139 18.3645 8.23258 18.487 8.75Z',
  d11: 'M18 9H14M18 13H14M18 17H14',
  d12: 'M6 22V2L6.00105 2C7.67306 2 9.70846 2 10.4079 2.11078C14.2589 2.72073 17.2793 5.74103 17.8892 9.59207C18 10.2917 18 11.1278 18 12.8V22',
  d13: 'M20 22.75H4V20.75H20V22.75Z',
  d14: 'M8.58209 1.26396C7.77035 1.25 6.8383 1.25 6.00485 1.25H5.25V22.75H18.75L18.75 17.75H14V16.25H18.75L18.75 13.75H14V12.25H18.7499C18.749 11.1162 18.7406 10.3726 18.6677 9.75H14V8.25H18.3546C17.3047 4.67356 14.2793 1.96461 10.5252 1.37002C10.1136 1.30483 9.3743 1.27758 8.58209 1.26396Z',
};

export const IconBuilding01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="building-01-stroke-rounded IconBuilding01StrokeRounded"
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
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBuilding01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="building-01-duotone-rounded IconBuilding01DuotoneRounded"
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
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBuilding01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="building-01-twotone-rounded IconBuilding01TwotoneRounded"
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
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBuilding01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="building-01-solid-rounded IconBuilding01SolidRounded"
    >
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconBuilding01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="building-01-bulk-rounded IconBuilding01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
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
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconBuilding01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="building-01-stroke-sharp IconBuilding01StrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
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
      />
    </TheIconWrapper>
  );
};

export const IconBuilding01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="building-01-solid-sharp IconBuilding01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const iconPackOfBuilding01: TheIconSelfPack = {
  name: 'Building01',
  StrokeRounded: IconBuilding01StrokeRounded,
  DuotoneRounded: IconBuilding01DuotoneRounded,
  TwotoneRounded: IconBuilding01TwotoneRounded,
  SolidRounded: IconBuilding01SolidRounded,
  BulkRounded: IconBuilding01BulkRounded,
  StrokeSharp: IconBuilding01StrokeSharp,
  SolidSharp: IconBuilding01SolidSharp,
};