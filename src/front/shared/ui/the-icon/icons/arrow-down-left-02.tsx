import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M11 13L18 6',
  d2: 'M8.45901 17.9172L9.70078 17.8043C11.7127 17.6214 12.7186 17.53 12.9553 16.8761C13.1921 16.2223 12.4778 15.508 11.0493 14.0795L9.92046 12.9507C8.49198 11.5222 7.77774 10.8079 7.12388 11.0447C6.47002 11.2814 6.37857 12.2873 6.19567 14.2992L6.08278 15.541C5.97266 16.7523 5.9176 17.358 6.27979 17.7202C6.64198 18.0824 7.24766 18.0273 8.45901 17.9172Z',
  d3: 'M18.5821 6.83211C18.9726 6.44158 18.9726 5.80842 18.5821 5.41789C18.1916 5.02737 17.5584 5.02737 17.1679 5.41789L10.1825 12.4033C9.54929 11.7702 9.01406 11.2407 8.55516 10.8982C8.07232 10.5379 7.44704 10.2108 6.74345 10.4655C6.03986 10.7203 5.76889 11.3718 5.62865 11.9578C5.48846 12.5435 5.41588 13.3423 5.32925 14.2956L5.20613 15.65C5.15499 16.212 5.10954 16.7114 5.13003 17.1133C5.15219 17.548 5.25565 18.0079 5.62435 18.3766C5.99304 18.7453 6.45293 18.8488 6.88767 18.8709C7.28961 18.8914 7.78899 18.846 8.35096 18.7948L9.70532 18.6717C10.6586 18.5851 11.4574 18.5125 12.0432 18.3723C12.6291 18.2321 13.2807 17.9611 13.5354 17.2575C13.7902 16.5539 13.4631 15.9286 13.1027 15.4458C12.7601 14.9867 12.2302 14.4511 11.5967 13.8175L18.5821 6.83211Z',
  d4: 'M18.5821 5.41789C18.9726 5.80842 18.9726 6.44158 18.5821 6.83211L11.5821 13.8321C11.1916 14.2226 10.5584 14.2226 10.1679 13.8321C9.77737 13.4416 9.77737 12.8084 10.1679 12.4179L17.1679 5.41789C17.5584 5.02737 18.1916 5.02737 18.5821 5.41789Z',
  d5: 'M11.4984 13.7192C12.1753 14.396 12.7425 14.9631 13.1027 15.4458C13.4631 15.9286 13.7902 16.5539 13.5354 17.2575C13.2807 17.9611 12.6291 18.2321 12.0432 18.3723C11.4574 18.5125 10.6586 18.5851 9.70532 18.6717L8.35096 18.7948C7.78899 18.846 7.28961 18.8914 6.88767 18.8709C6.45293 18.8488 5.99304 18.7453 5.62435 18.3766C5.25565 18.0079 5.15219 17.548 5.13003 17.1133C5.10954 16.7114 5.15499 16.212 5.20613 15.65L5.32925 14.2956L5.32925 14.2956C5.41588 13.3423 5.48846 12.5435 5.62865 11.9578C5.76889 11.3718 6.03986 10.7203 6.74345 10.4655C7.44704 10.2108 8.07232 10.5379 8.55516 10.8982C9.03786 11.2585 9.605 11.8257 10.2818 12.5026L11.4984 13.7191L11.4984 13.7192Z',
  d6: 'M9.53502 14.4639L17.9975 6M6.70711 11.636L6 18L12.3634 17.2924L6.70711 11.636Z',
  d7: 'M6.13236 10.0903L4.99805 19L13.9105 17.8685L10.7286 14.6865L19.0009 6.41421L17.5867 5L9.31434 13.2723L6.13236 10.0903Z',
};

export const IconArrowDownLeft02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-down-left-02-stroke-rounded IconArrowDownLeft02StrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconArrowDownLeft02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-down-left-02-duotone-rounded IconArrowDownLeft02DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
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
    </TheIconWrapper>
  );
};

export const IconArrowDownLeft02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-down-left-02-twotone-rounded IconArrowDownLeft02TwotoneRounded"
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

export const IconArrowDownLeft02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-down-left-02-solid-rounded IconArrowDownLeft02SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconArrowDownLeft02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-down-left-02-bulk-rounded IconArrowDownLeft02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconArrowDownLeft02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-down-left-02-stroke-sharp IconArrowDownLeft02StrokeSharp"
    >
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconArrowDownLeft02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-down-left-02-solid-sharp IconArrowDownLeft02SolidSharp"
    >
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfArrowDownLeft02: TheIconSelfPack = {
  name: 'ArrowDownLeft02',
  StrokeRounded: IconArrowDownLeft02StrokeRounded,
  DuotoneRounded: IconArrowDownLeft02DuotoneRounded,
  TwotoneRounded: IconArrowDownLeft02TwotoneRounded,
  SolidRounded: IconArrowDownLeft02SolidRounded,
  BulkRounded: IconArrowDownLeft02BulkRounded,
  StrokeSharp: IconArrowDownLeft02StrokeSharp,
  SolidSharp: IconArrowDownLeft02SolidSharp,
};