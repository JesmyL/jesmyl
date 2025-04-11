import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z',
  d2: 'M12.2422 17V12C12.2422 11.5286 12.2422 11.2929 12.0957 11.1464C11.9493 11 11.7136 11 11.2422 11',
  d3: 'M11.992 8H12.001',
  d4: 'M1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25C6.06294 1.25 1.25 6.06294 1.25 12ZM11.6819 11.0273C11.9289 11.0605 12.2707 11.1494 12.5607 11.4394C12.8507 11.7294 12.9396 12.0711 12.9728 12.3182C13.0003 12.5228 13.0001 12.7608 13 12.9606L13 13V17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17V13C10.4477 13 10 12.5523 10 12C10 11.4477 10.4477 11 11 11L11.0394 11C11.2393 10.9999 11.4772 10.9997 11.6819 11.0273ZM11.9954 7C11.4456 7 10.9999 7.44772 10.9999 8C10.9999 8.55228 11.4456 9 11.9954 9H12.0044C12.5542 9 12.9999 8.55228 12.9999 8C12.9999 7.44772 12.5542 7 12.0044 7H11.9954Z',
  d5: 'M1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25C6.06294 1.25 1.25 6.06294 1.25 12Z',
  d6: 'M11.6819 11.0273C11.9289 11.0605 12.2707 11.1494 12.5607 11.4394C12.8507 11.7294 12.9396 12.0711 12.9728 12.3182C13.0003 12.5228 13.0001 12.7608 13 12.9606C13 12.974 13 12.9871 13 13V17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17V13C10.4477 13 10 12.5523 10 12C10 11.4477 10.4477 11 11 11C11.0129 11 11.0261 11 11.0394 11C11.2393 10.9999 11.4772 10.9997 11.6819 11.0273Z',
  d7: 'M10.9999 8C10.9999 7.44772 11.4456 7 11.9954 7H12.0044C12.5542 7 12.9999 7.44772 12.9999 8C12.9999 8.55228 12.5542 9 12.0044 9H11.9954C11.4456 9 10.9999 8.55228 10.9999 8Z',
  d8: 'M10.0234 10.0107H12.0043V16.9917M11.2509 7.26758H12.7504',
  d9: 'M12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75ZM11 6.5V8H13V6.5H11ZM10 11H11V17H13V9H10V11Z',
};

export const IconInformationCircleStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="InformationCircle StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconInformationCircleDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="InformationCircle DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconInformationCircleTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="InformationCircle TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconInformationCircleSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="InformationCircle SolidRounded"
    >
      <path 
        d={d.d4}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconInformationCircleBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="InformationCircle BulkRounded"
    >
      <path 
        d={d.d5}
        i-c="f o7"
      />
      <path 
        d={d.d6}
        i-c="c f fr"
      />
      <path 
        d={d.d7}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconInformationCircleStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="InformationCircle StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sj sw"
      />
      <path 
        d={d.d8}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconInformationCircleSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="InformationCircle SolidSharp"
    >
      <path 
        d={d.d9}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfInformationCircle: TheIconSelfPack = [
  'InformationCircle',
  IconInformationCircleStrokeRounded,
  IconInformationCircleDuotoneRounded,
  IconInformationCircleTwotoneRounded,
  IconInformationCircleSolidRounded,
  IconInformationCircleBulkRounded,
  IconInformationCircleStrokeSharp,
  IconInformationCircleSolidSharp,
];