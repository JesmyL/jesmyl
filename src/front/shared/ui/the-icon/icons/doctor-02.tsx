import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M4 22V21C4 19.1308 4 18.1962 4.40192 17.5C4.66523 17.0439 5.04394 16.6652 5.5 16.4019C6.19615 16 7.13077 16 9 16L12 20L15 16C16.8692 16 17.8038 16 18.5 16.4019C18.9561 16.6652 19.3348 17.0439 19.5981 17.5C20 18.1962 20 19.1308 20 21V22',
  d2: 'M15.9374 7.99951L16.9552 3.86383C17.1882 2.9171 16.4833 2 15.5228 2H8.47724C7.51665 2 6.81182 2.9171 7.04482 3.86383L8.06263 7.99951M15.9374 7.99951V9.99951C15.9374 12.2087 14.1745 13.9995 12 13.9995C9.82545 13.9995 8.06263 12.2087 8.06263 9.99951V7.99951M15.9374 7.99951H8.06263',
  d3: 'M11.9998 4V5.99951M12.9995 4.99976L11 4.99976',
  d4: 'M4 21V22H20V21C20 19.1308 20 18.1962 19.5981 17.5C19.3348 17.0439 18.9561 16.6652 18.5 16.4019C17.8038 16 16.8692 16 15 16L12 20L9 16C7.13077 16 6.19615 16 5.5 16.4019C5.04394 16.6652 4.66523 17.0439 4.40192 17.5C4 18.1962 4 19.1308 4 21Z',
  d5: 'M15.9372 10V8H8.0625V10C8.0625 12.2091 9.82532 14 11.9999 14C14.1744 14 15.9372 12.2091 15.9372 10Z',
  d6: 'M15.9374 7.99951L16.9552 3.86383C17.1882 2.9171 16.4833 2 15.5228 2H8.47724C7.51665 2 6.81182 2.9171 7.04482 3.86383L8.06263 7.99951H15.9374Z',
  d7: 'M9 15.25C9.23607 15.25 9.45836 15.3611 9.6 15.55L12 18.75L14.4 15.55C14.5416 15.3611 14.7639 15.25 15 15.25H15C15.9042 15.25 16.6693 15.25 17.2576 15.3033C17.8639 15.3583 18.3937 15.4746 18.875 15.7524C19.4451 16.0815 19.9185 16.5549 20.2476 17.125C20.5254 17.6063 20.6417 18.1361 20.6967 18.7424C20.75 19.3307 20.75 20.06 20.75 20.9642V22C20.75 22.4142 20.4142 22.75 20 22.75H4C3.58579 22.75 3.25 22.4142 3.25 22V20.9642V20.9642C3.24999 20.06 3.24998 19.3307 3.3033 18.7424C3.35826 18.1361 3.47455 17.6063 3.75241 17.125C4.08154 16.5549 4.55493 16.0815 5.125 15.7524C5.60625 15.4746 6.13605 15.3583 6.7424 15.3033C7.33069 15.25 8.09575 15.25 8.99999 15.25H9Z',
  d8: 'M8.0625 7.25C8.47671 7.25 8.8125 7.58579 8.8125 8V10C8.8125 11.8061 10.2506 13.25 11.9999 13.25C13.7491 13.25 15.1872 11.8061 15.1872 10V8C15.1872 7.58579 15.523 7.25 15.9372 7.25C16.3514 7.25 16.6872 7.58579 16.6872 8V10C16.6872 12.6121 14.5997 14.75 11.9999 14.75C9.39999 14.75 7.3125 12.6121 7.3125 10V8C7.3125 7.58579 7.64829 7.25 8.0625 7.25Z',
  d9: 'M8.47719 1.25049C7.01449 1.25049 5.97086 2.63912 6.31649 4.04355L7.33431 8.17923C7.4168 8.51441 7.7174 8.75 8.06258 8.75L15.9373 8.75C16.2825 8.75 16.5831 8.51441 16.6656 8.17923L17.6834 4.04355C18.029 2.63912 16.9854 1.25049 15.5227 1.25049L8.47719 1.25049ZM12.7498 3.50049C12.7498 3.08627 12.414 2.75049 11.9998 2.75049C11.5855 2.75049 11.2498 3.08627 11.2498 3.50049V4.25024H10.5C10.0858 4.25024 9.75 4.58603 9.75 5.00024C9.75 5.41446 10.0858 5.75024 10.5 5.75024H11.2498V6.50049C11.2498 6.9147 11.5855 7.25049 11.9998 7.25049C12.414 7.25049 12.7498 6.9147 12.7498 6.50049V5.75024H13.5C13.9142 5.75024 14.25 5.41446 14.25 5.00024C14.25 4.58603 13.9142 4.25024 13.5 4.25024H12.7498V3.50049Z',
  d10: 'M16.6872 8V10C16.6872 12.6121 14.5997 14.75 11.9999 14.75C9.39999 14.75 7.3125 12.6121 7.3125 10V8H16.6872Z',
  d11: 'M20 22V18C20 18 19 16 17 16H15L12 20L9 16H7C5 16 4 18 4 18V22',
  d12: 'M15.9377 7.99951L17 2.5V2H7V2.5L8.06299 7.99951M15.9377 7.99951V9.99951C15.9377 12.2087 14.1749 13.9995 12.0004 13.9995C9.82581 13.9995 8.06299 12.2087 8.06299 9.99951V7.99951M15.9377 7.99951H8.06299',
  d13: 'M3.25 17.8229C3.39533 17.605 3.92676 16.7626 4.21967 16.4697C4.80142 15.8879 5.73093 15.25 7 15.25H9.375L12 18.75L14.625 15.25H17C18.2691 15.25 19.1986 15.8879 19.7803 16.4697C20.0732 16.7626 20.6047 17.605 20.75 17.8229V22.75H3.25V17.8229Z',
  d14: 'M16.6877 8.07177V10C16.6877 12.6121 14.6002 14.75 12.0004 14.75C9.40048 14.75 7.31299 12.6121 7.31299 10V8.07182L6.25 2.57231V1.25049L17.75 1.25049V2.57226L16.6877 8.07177ZM8.81348 8.75V10C8.81348 11.8061 10.2516 13.25 12.0008 13.25C13.7501 13.25 15.1882 11.8061 15.1882 10V8.75H8.81348ZM12.7498 4.25028L12.7498 2.75049H11.2498L11.2498 4.25028H9.75L9.75 5.75028H11.2498V7.25049H12.7498V5.75028L14.25 5.75028V4.25028L12.7498 4.25028Z',
};

export const IconDoctor02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Doctor02 StrokeRounded"
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

export const IconDoctor02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Doctor02 DuotoneRounded"
    >
      <path 
        d={d.d4}
        i-c="f o7"
      />
      <path 
        d={d.d5}
        i-c="f o7"
      />
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

export const IconDoctor02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Doctor02 TwotoneRounded"
    >
      <path 
        d={d.d5}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d6}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconDoctor02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Doctor02 SolidRounded"
    >
      <path 
        d={d.d7}
        i-c="f"
      />
      <path 
        d={d.d8}
        i-c="c f fr"
      />
      <path 
        d={d.d9}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconDoctor02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Doctor02 BulkRounded"
    >
      <path 
        d={d.d10}
        i-c="f o7"
      />
      <path 
        d={d.d7}
        i-c="f o7"
      />
      <path 
        d={d.d9}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconDoctor02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Doctor02 StrokeSharp"
    >
      <path 
        d={d.d11}
        i-c="s ss sw"
      />
      <path 
        d={d.d12}
        i-c="s ss sw"
      />
      <path 
        d={d.d3}
        i-c="s ss sw"
      />
    </TheIconWrapper>
  );
};

export const IconDoctor02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Doctor02 SolidSharp"
    >
      <path 
        d={d.d13}
        i-c="f"
      />
      <path 
        d={d.d14}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfDoctor02: TheIconSelfPack = [
  'Doctor02',
  IconDoctor02StrokeRounded,
  IconDoctor02DuotoneRounded,
  IconDoctor02TwotoneRounded,
  IconDoctor02SolidRounded,
  IconDoctor02BulkRounded,
  IconDoctor02StrokeSharp,
  IconDoctor02SolidSharp,
];