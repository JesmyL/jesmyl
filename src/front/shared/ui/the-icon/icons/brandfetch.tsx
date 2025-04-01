import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M5 6.85746C10.5 2.42557 19 3.53936 19 7.52832C19 10.5665 11.5 12 11.5 12C11.5 12 17.5 11.6935 17.5 14.451C17.5 19.0482 8 17.8628 8 17.8628',
  d2: 'M9 8.5C8.33333 11.1667 7 16 7 20',
  d3: 'M11.5 12C11.5 12 19 10.5665 19 7.52832C19 4.64078 14.5459 3.25985 10 4.3985L9 8.5C8.44877 10.7049 7.44175 14.3911 7.10954 17.8628H8C8 17.8628 17.5 19.0482 17.5 14.451C17.5 11.6935 11.5 12 11.5 12Z',
  d4: 'M13.9835 5.03189C11.4014 4.82708 8.16028 5.59514 5.62748 7.63607C5.19744 7.9826 4.5679 7.9149 4.22137 7.48486C3.87485 7.05481 3.94255 6.42528 4.37259 6.07875C7.33978 3.68779 11.0987 2.79679 14.1416 3.03815C15.6617 3.15872 17.0782 3.56785 18.1456 4.28862C19.233 5.02288 20 6.12161 20 7.52827C20 8.73308 19.2548 9.64903 18.4523 10.29C17.7891 10.8198 16.976 11.2541 16.1707 11.6046C16.4968 11.7278 16.8126 11.8779 17.1006 12.0618C17.8563 12.5441 18.5 13.3214 18.5 14.451C18.5 16.0281 17.6499 17.1079 16.5308 17.7806C15.4604 18.424 14.1071 18.7286 12.8664 18.874C11.6066 19.0216 10.3612 19.0158 9.44032 18.9751C8.98436 18.955 8.17346 18.8818 7.88883 18.8562L7.87621 18.855C7.32818 18.7866 6.93935 18.2869 7.00773 17.7389C7.0761 17.191 7.57561 16.8022 8.1235 16.8704C8.37052 16.8927 9.10076 16.9582 9.5285 16.9771C10.3889 17.015 11.5184 17.0183 12.6337 16.8876C13.768 16.7547 14.7897 16.4937 15.5005 16.0664C16.1626 15.6684 16.5 15.1724 16.5 14.451C16.5 14.2018 16.3938 13.9833 16.0245 13.7476C15.624 13.492 15.024 13.3009 14.3241 13.1758C13.6412 13.0538 12.9455 13.0084 12.412 12.9948C12.1475 12.9881 11.7025 12.9959 11.5507 12.9987C11.026 13.0253 10.5701 12.6413 10.5072 12.1196C10.4443 11.5979 10.7959 11.1166 11.312 11.0178C11.507 10.9749 12.0834 10.8478 12.4215 10.7604C13.1008 10.5847 13.9965 10.3222 14.8837 9.97295C15.7823 9.61921 16.614 9.19866 17.204 8.72738C17.8078 8.24512 18 7.84256 18 7.52827C18 6.94045 17.7046 6.4041 17.0264 5.94612C16.3281 5.47466 15.2758 5.1344 13.9835 5.03189Z',
  d5: 'M9.24254 7.53009C9.77833 7.66404 10.1041 8.20698 9.97014 8.74277C9.90701 8.99532 9.83863 9.26478 9.76654 9.5489L9.76651 9.54899C9.06131 12.3282 8 16.5107 8 20.0002C8 20.5525 7.55228 21.0002 7 21.0002C6.44772 21.0002 6 20.5525 6 20.0002C6 16.24 7.12869 11.8039 7.82669 9.06051L7.82669 9.06051L7.82672 9.06042C7.89974 8.77342 7.96805 8.50494 8.02986 8.2577C8.16381 7.72191 8.70674 7.39615 9.24254 7.53009Z',
  d6: 'M5 6.85746C10.5 2.42557 19 3.53936 19 7.52832C19 10.5665 11.5 12 11.5 12V12.2349C12.7814 12.22 17.5 12.0979 17.5 14.451C17.5 19.0482 8 17.8628 8 17.8628',
  d7: 'M9 8.5L7 20',
  d8: 'M13.9834 5.03189C11.4013 4.82708 8.16025 5.59514 5.62745 7.63607L4.84878 8.26352L3.59389 6.7062L4.37256 6.07875C7.33975 3.68779 11.0987 2.79679 14.1416 3.03815C15.6617 3.15872 17.0781 3.56785 18.1456 4.28862C19.2329 5.02288 20 6.12161 20 7.52827C20 8.73308 19.2547 9.64903 18.4522 10.29C17.7419 10.8574 16.8597 11.3154 15.9992 11.678C16.4625 11.8206 16.9177 12.0155 17.3109 12.287C17.9762 12.7463 18.5 13.4598 18.5 14.451C18.5 16.0281 17.6499 17.1079 16.5308 17.7806C15.4603 18.424 14.107 18.7286 12.8664 18.874C11.6066 19.0216 10.3612 19.0158 9.44029 18.9751C8.9774 18.9547 6.88388 18.7312 6.88388 18.7312L7.13152 16.7466C7.88682 16.8876 9.52846 16.9771 9.52846 16.9771C10.3888 17.015 11.5184 17.0183 12.6336 16.8876C13.768 16.7547 14.7897 16.4937 15.5004 16.0664C16.1626 15.6684 16.5 15.1724 16.5 14.451C16.5 14.2656 16.434 14.1119 16.1746 13.9328C15.8777 13.7278 15.4043 13.5566 14.7888 13.4363C13.6227 13.2085 11.1938 13.2379 10.5 13.2465V11.173C10.5 11.173 12.0833 10.8478 12.4215 10.7604C13.1008 10.5846 13.9965 10.3222 14.8837 9.97294C15.7822 9.6192 16.614 9.19866 17.204 8.72737C17.8078 8.24512 18 7.84256 18 7.52827C18 6.94045 17.7046 6.4041 17.0263 5.94612C16.3281 5.47466 15.2758 5.1344 13.9834 5.03189Z',
  d9: 'M10.1566 7.68607L7.81387 21.1565L5.84344 20.8138L8.18613 7.34338L10.1566 7.68607Z',
};

export const IconBrandfetchStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="brandfetch-stroke-rounded IconBrandfetchStrokeRounded"
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

export const IconBrandfetchDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="brandfetch-duotone-rounded IconBrandfetchDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
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

export const IconBrandfetchTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="brandfetch-twotone-rounded IconBrandfetchTwotoneRounded"
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

export const IconBrandfetchSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="brandfetch-solid-rounded IconBrandfetchSolidRounded"
    >
      <path 
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

export const IconBrandfetchBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="brandfetch-bulk-rounded IconBrandfetchBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconBrandfetchStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="brandfetch-stroke-sharp IconBrandfetchStrokeSharp"
    >
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBrandfetchSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="brandfetch-solid-sharp IconBrandfetchSolidSharp"
    >
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfBrandfetch: TheIconSelfPack = {
  name: 'Brandfetch',
  StrokeRounded: IconBrandfetchStrokeRounded,
  DuotoneRounded: IconBrandfetchDuotoneRounded,
  TwotoneRounded: IconBrandfetchTwotoneRounded,
  SolidRounded: IconBrandfetchSolidRounded,
  BulkRounded: IconBrandfetchBulkRounded,
  StrokeSharp: IconBrandfetchStrokeSharp,
  SolidSharp: IconBrandfetchSolidSharp,
};