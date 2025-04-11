import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M6.14839 5.67914C6.82645 4.85343 7.16547 4.44058 7.62894 4.22029C8.09241 4 8.62199 4 9.68114 4H15V11H9.68114C8.62199 11 8.09241 11 7.62894 10.7797C7.16547 10.5594 6.82645 10.1466 6.14839 9.32086L5.87979 8.99376C5.29326 8.27951 5 7.92239 5 7.5C5 7.07761 5.29326 6.72048 5.87979 6.00624L6.14839 5.67914Z',
  d2: 'M15 21L15 3',
  d3: 'M11 21H19',
  d4: 'M6.14839 5.67914C6.82645 4.85343 7.16547 4.44058 7.62894 4.22029C8.09241 4 8.62199 4 9.68114 4H15V11H9.68114C8.62199 11 8.09241 11 7.62894 10.7797C7.16547 10.5594 6.82644 10.1466 6.14839 9.32086L5.87979 8.99376C5.29326 8.27951 5 7.92239 5 7.5C5 7.07761 5.29326 6.72048 5.87979 6.00624L6.14839 5.67914Z',
  d5: 'M6.14839 5.67914C6.82645 4.85343 7.16547 4.44058 7.62894 4.22029C8.09241 4 8.62199 4 9.68114 4L15 4V11H9.68114C8.62199 11 8.09241 11 7.62894 10.7797C7.16547 10.5594 6.82645 10.1466 6.14839 9.32086L5.87979 8.99376C5.29326 8.27951 5 7.92239 5 7.5C5 7.07761 5.29326 6.72048 5.87979 6.00624L6.14839 5.67914Z',
  d6: 'M9.28486 3.25008C8.36962 3.24929 7.67636 3.24868 7.05698 3.54308C6.43909 3.83677 5.99768 4.37523 5.41229 5.08933L5.41229 5.08933C5.1413 5.41926 4.50808 6.19045 4.33646 6.46124C4.14815 6.75837 4 7.09388 4 7.50017C4 7.90645 4.14814 8.24196 4.33646 8.53909C4.50808 8.80988 5.14131 9.58108 5.41229 9.911C5.99768 10.6251 6.43909 11.1636 7.05698 11.4573C7.67636 11.7516 8.36962 11.751 9.28486 11.7502L14.75 11.7502C15.1642 11.7502 15.5 11.4144 15.5 11.0002V4.00017C15.5 3.58595 15.1642 3.25017 14.75 3.25017L9.28486 3.25008Z',
  d7: 'M15 2C14.4477 2 14 2.44772 14 3V20H11C10.4477 20 10 20.4477 10 21C10 21.5523 10.4477 22 11 22H19C19.5523 22 20 21.5523 20 21C20 20.4477 19.5523 20 19 20H16V3C16 2.44772 15.5523 2 15 2Z',
  d8: 'M15.0029 21V3',
  d9: 'M11.0059 21H19.0003',
  d10: 'M8.0141 5L14.981 5.00037C14.9865 5.00037 14.991 5.00484 14.991 5.01037V12.0081C14.991 12.0137 14.9865 12.0181 14.981 12.0181H8.02729L4.99707 8.49404L8.0141 5Z',
  d11: 'M14.5 19.5V12.2483L8.14286 12.2378L4.5 7.98781L8.14286 3.73781L14.5 3.74833V2.5H16.5V19.5H19.5V21.5H11.5V19.5H14.5Z',
};

export const IconDirectionLeft01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="DirectionLeft01 StrokeRounded"
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

export const IconDirectionLeft01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="DirectionLeft01 DuotoneRounded"
    >
      <path 
        d={d.d4}
        i-c="f o7"
      />
      <path 
        d={d.d5}
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

export const IconDirectionLeft01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="DirectionLeft01 TwotoneRounded"
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

export const IconDirectionLeft01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="DirectionLeft01 SolidRounded"
    >
      <path 
        d={d.d6}
        i-c="f"
      />
      <path 
        d={d.d7}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconDirectionLeft01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="DirectionLeft01 BulkRounded"
    >
      <path 
        d={d.d6}
        i-c="f o7"
      />
      <path 
        d={d.d7}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconDirectionLeft01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="DirectionLeft01 StrokeSharp"
    >
      <path 
        d={d.d8}
        i-c="s sj sw"
      />
      <path 
        d={d.d9}
        i-c="s sj sw"
      />
      <path 
        d={d.d10}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconDirectionLeft01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="DirectionLeft01 SolidSharp"
    >
      <path 
        d={d.d11}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfDirectionLeft01: TheIconSelfPack = [
  'DirectionLeft01',
  IconDirectionLeft01StrokeRounded,
  IconDirectionLeft01DuotoneRounded,
  IconDirectionLeft01TwotoneRounded,
  IconDirectionLeft01SolidRounded,
  IconDirectionLeft01BulkRounded,
  IconDirectionLeft01StrokeSharp,
  IconDirectionLeft01SolidSharp,
];