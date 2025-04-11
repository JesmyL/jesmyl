import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M17.8516 5.67914C17.1736 4.85343 16.8345 4.44058 16.3711 4.22029C15.9076 4 15.378 4 14.3189 4H9V11H14.3189C15.378 11 15.9076 11 16.3711 10.7797C16.8345 10.5594 17.1736 10.1466 17.8516 9.32086L18.1202 8.99376C18.7067 8.27951 19 7.92239 19 7.5C19 7.07761 18.7067 6.72048 18.1202 6.00624L17.8516 5.67914Z',
  d2: 'M9 3L9 21',
  d3: 'M5 21H13',
  d4: 'M17.8516 5.67914C17.1736 4.85343 16.8345 4.44058 16.3711 4.22029C15.9076 4 15.378 4 14.3189 4L9 4V11H14.3189C15.378 11 15.9076 11 16.3711 10.7797C16.8345 10.5594 17.1736 10.1466 17.8516 9.32086L18.1202 8.99376C18.7067 8.27951 19 7.92239 19 7.5C19 7.07761 18.7067 6.72048 18.1202 6.00624L17.8516 5.67914Z',
  d5: 'M14.7151 3.25008C15.6304 3.24929 16.3236 3.24868 16.943 3.54308C17.5609 3.83677 18.0023 4.37523 18.5877 5.08933L18.5877 5.08933C18.8587 5.41926 19.4919 6.19045 19.6635 6.46124C19.8519 6.75837 20 7.09388 20 7.50017C20 7.90645 19.8519 8.24196 19.6635 8.53909C19.4919 8.80988 18.8587 9.58108 18.5877 9.911C18.0023 10.6251 17.5609 11.1636 16.943 11.4573C16.3236 11.7516 15.6304 11.751 14.7151 11.7502L9.25 11.7502C8.83579 11.7502 8.5 11.4144 8.5 11.0002V4.00017C8.5 3.58595 8.83579 3.25017 9.25 3.25017L14.7151 3.25008Z',
  d6: 'M9 2C9.55228 2 10 2.44772 10 3V20H13C13.5523 20 14 20.4477 14 21C14 21.5523 13.5523 22 13 22H5C4.44772 22 4 21.5523 4 21C4 20.4477 4.44772 20 5 20H8V3C8 2.44772 8.44771 2 9 2Z',
  d7: 'M9 2.75V20.75',
  d8: 'M5 20.75H13',
  d9: 'M16.0025 4.74121L8.99559 4.74158V11.7594H15.9893L19.0195 8.23525L16.0025 4.74121Z',
  d10: 'M9.49902 19.5V12.2483L15.8562 12.2378L19.499 7.98781L15.8562 3.73781L9.49902 3.74833V2.5H7.49902V19.5H4.49902V21.5H12.499V19.5H9.49902Z',
};

export const IconDirectionRight01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="DirectionRight01 StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
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

export const IconDirectionRight01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="DirectionRight01 DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="f o7"
      />
      <path 
        d={d.d4}
        i-c="s sj sr sw"
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

export const IconDirectionRight01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="DirectionRight01 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
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

export const IconDirectionRight01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="DirectionRight01 SolidRounded"
    >
      <path 
        d={d.d5}
        i-c="f"
      />
      <path 
        d={d.d6}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconDirectionRight01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="DirectionRight01 BulkRounded"
    >
      <path 
        d={d.d5}
        i-c="f o7"
      />
      <path 
        d={d.d6}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconDirectionRight01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="DirectionRight01 StrokeSharp"
    >
      <path 
        d={d.d7}
        i-c="s sj sw"
      />
      <path 
        d={d.d8}
        i-c="s sj sw"
      />
      <path 
        d={d.d9}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconDirectionRight01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="DirectionRight01 SolidSharp"
    >
      <path 
        d={d.d10}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfDirectionRight01: TheIconSelfPack = [
  'DirectionRight01',
  IconDirectionRight01StrokeRounded,
  IconDirectionRight01DuotoneRounded,
  IconDirectionRight01TwotoneRounded,
  IconDirectionRight01SolidRounded,
  IconDirectionRight01BulkRounded,
  IconDirectionRight01StrokeSharp,
  IconDirectionRight01SolidSharp,
];