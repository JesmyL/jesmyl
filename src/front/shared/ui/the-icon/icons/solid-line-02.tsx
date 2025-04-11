import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z',
  d2: 'M12 21.5C16.4783 21.5 18.7175 21.5 20.1088 20.1088C21.5 18.7175 21.5 16.4783 21.5 12C21.5 7.52166 21.5 5.28249 20.1088 3.89124C18.7175 2.5 16.4783 2.5 12 2.5',
  d3: 'M12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5',
  d4: 'M11.9255 1.5H12.0745C14.2504 1.49998 15.9852 1.49996 17.3453 1.68282C18.7497 1.87164 19.9035 2.27175 20.8159 3.18414C21.7283 4.09653 22.1284 5.25033 22.3172 6.65471C22.5 8.01485 22.5 9.74959 22.5 11.9256V12.0744C22.5 14.2504 22.5 15.9851 22.3172 17.3453C22.1284 18.7497 21.7283 19.9035 20.8159 20.8159C19.9035 21.7283 18.7497 22.1284 17.3453 22.3172C15.9851 22.5 14.2504 22.5 12.0744 22.5H11.9256C9.74959 22.5 8.01485 22.5 6.65471 22.3172C5.25033 22.1284 4.09653 21.7283 3.18414 20.8159C2.27175 19.9035 1.87164 18.7497 1.68282 17.3453C1.49996 15.9852 1.49998 14.2504 1.5 12.0745V11.9255C1.49998 9.74957 1.49996 8.01485 1.68282 6.65471C1.87164 5.25033 2.27175 4.09653 3.18414 3.18414C4.09653 2.27175 5.25033 1.87164 6.65471 1.68282C8.01485 1.49996 9.74957 1.49998 11.9255 1.5ZM6.92121 3.66499C5.7386 3.82399 5.0772 4.1195 4.59835 4.59835C4.1195 5.0772 3.82399 5.7386 3.66499 6.92121C3.50212 8.13258 3.5 9.73256 3.5 12C3.5 14.2674 3.50212 15.8674 3.66499 17.0788C3.82399 18.2614 4.1195 18.9228 4.59835 19.4017C5.0772 19.8805 5.7386 20.176 6.92121 20.335C8.13258 20.4979 9.73256 20.5 12 20.5C14.2674 20.5 15.8674 20.4979 17.0788 20.335C18.2614 20.176 18.9228 19.8805 19.4017 19.4017C19.8805 18.9228 20.176 18.2614 20.335 17.0788C20.4979 15.8674 20.5 14.2674 20.5 12C20.5 9.73256 20.4979 8.13258 20.335 6.92121C20.176 5.7386 19.8805 5.0772 19.4017 4.59835C18.9228 4.1195 18.2614 3.82399 17.0788 3.66499C15.8674 3.50212 14.2674 3.5 12 3.5C9.73256 3.5 8.13258 3.50212 6.92121 3.66499Z',
  d5: 'M12 1.5C14.176 1.49998 15.9852 1.49996 17.3453 1.68282C18.7497 1.87164 19.9035 2.27175 20.8159 3.18414C21.7283 4.09653 22.1284 5.25033 22.3172 6.65471C22.5 8.01485 22.5 9.74959 22.5 11.9256V12.0744C22.5 14.2504 22.5 15.9851 22.3172 17.3453C22.1284 18.7497 21.7283 19.9035 20.8159 20.8159C19.9035 21.7283 18.7497 22.1284 17.3453 22.3172C15.9851 22.5 14.176 22.5 12 22.5V20.5C14.2674 20.5 15.8674 20.4979 17.0788 20.335C18.2614 20.176 18.9228 19.8805 19.4017 19.4017C19.8805 18.9228 20.176 18.2614 20.335 17.0788C20.4979 15.8674 20.5 14.2674 20.5 12C20.5 9.73256 20.4979 8.13258 20.335 6.92121C20.176 5.7386 19.8805 5.0772 19.4017 4.59835C18.9228 4.1195 18.2614 3.82399 17.0788 3.66499C15.8674 3.50212 14.2674 3.5 12 3.5V1.5Z',
  d6: 'M12 22.5C9.82401 22.5 8.01485 22.5 6.65471 22.3172C5.25033 22.1284 4.09653 21.7283 3.18414 20.8159C2.27175 19.9035 1.87164 18.7497 1.68282 17.3453C1.49996 15.9852 1.49998 14.2504 1.5 12.0745V12.0745V11.9255V11.9255C1.49998 9.74957 1.49996 8.01484 1.68282 6.65471C1.87164 5.25033 2.27175 4.09653 3.18414 3.18414C4.09653 2.27175 5.25033 1.87164 6.65471 1.68282C8.01485 1.49996 9.82402 1.49998 12 1.5V3.5C9.73256 3.5 8.13258 3.50212 6.92121 3.66499C5.7386 3.82399 5.0772 4.1195 4.59835 4.59835C4.1195 5.0772 3.82399 5.7386 3.66499 6.92121C3.50212 8.13258 3.5 9.73256 3.5 12C3.5 14.2674 3.50212 15.8674 3.66499 17.0788C3.82399 18.2614 4.1195 18.9228 4.59835 19.4017C5.0772 19.8805 5.7386 20.176 6.92121 20.335C8.13258 20.4979 9.73256 20.5 12 20.5V22.5Z',
  d7: 'M21 3H3V21H21V3Z',
  d8: 'M2 3C2 2.44772 2.44772 2 3 2H21C21.5523 2 22 2.44772 22 3V21C22 21.5523 21.5523 22 21 22H3C2.44772 22 2 21.5523 2 21V3ZM4 4V20H20V4H4Z',
};

export const IconSolidLine02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SolidLine02 StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconSolidLine02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SolidLine02 DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconSolidLine02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SolidLine02 TwotoneRounded"
    >
      <path 
        d={d.d2}
        i-c="s sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconSolidLine02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SolidLine02 SolidRounded"
    >
      <path 
        d={d.d4}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconSolidLine02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SolidLine02 BulkRounded"
    >
      <path 
        d={d.d5}
        i-c="f o7"
      />
      <path 
        d={d.d6}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconSolidLine02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SolidLine02 StrokeSharp"
    >
      <path 
        d={d.d7}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconSolidLine02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SolidLine02 SolidSharp"
    >
      <path 
        d={d.d8}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfSolidLine02: TheIconSelfPack = [
  'SolidLine02',
  IconSolidLine02StrokeRounded,
  IconSolidLine02DuotoneRounded,
  IconSolidLine02TwotoneRounded,
  IconSolidLine02SolidRounded,
  IconSolidLine02BulkRounded,
  IconSolidLine02StrokeSharp,
  IconSolidLine02SolidSharp,
];