import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M13.8514 3L4.62921 12C3.79026 12.8187 3.79026 14.1462 4.62921 14.9649L10.1841 20.386C11.0231 21.2047 12.3833 21.2047 13.2222 20.386L15.9997 17.6754',
  d2: 'M6.33203 10.3377L10.1836 6.57889C11.0226 5.76016 12.3828 5.76016 13.2217 6.57889L15.9992 9.28943',
  d3: 'M11 13H20',
  d4: 'M10.1841 20.386L4.62921 14.9649C3.79026 14.1462 3.79026 12.8187 4.62921 12L10.1836 6.57889C11.0226 5.76016 12.3838 5.76028 13.2227 6.57901L18.7771 12C19.6161 12.8187 19.6161 14.1461 18.7771 14.9649L13.2222 20.386C12.3833 21.2047 11.0231 21.2047 10.1841 20.386Z',
  d5: 'M14.5499 3.71568C14.9451 3.32994 14.9528 2.69683 14.5671 2.30157C14.1814 1.90631 13.5483 1.89859 13.153 2.28432L3.93078 11.2843C2.68974 12.4955 2.68974 14.4694 3.93078 15.6806L9.4857 21.1016C10.7131 22.2995 12.6932 22.2995 13.9206 21.1016L16.6981 18.3911C17.0934 18.0054 17.1011 17.3722 16.7154 16.977C16.3296 16.5817 15.6965 16.574 15.3012 16.9597L12.5238 19.6703C12.0733 20.1099 11.333 20.1099 10.8826 19.6703L5.32764 14.2492C4.89079 13.8229 4.89079 13.142 5.32764 12.7157L10.9036 7.27409C11.3558 6.85504 12.0799 6.86187 12.5233 7.29457L15.3007 10.0051C15.696 10.3908 16.3291 10.3831 16.7148 9.98786C17.1006 9.5926 17.0929 8.95948 16.6976 8.57375L13.9201 5.86321C13.6434 5.59313 13.3284 5.38395 12.9923 5.23566L14.5499 3.71568Z',
  d6: 'M10 13C10 12.4477 10.4477 12 11 12H20C20.5523 12 21 12.4477 21 13C21 13.5523 20.5523 14 20 14H11C10.4477 14 10 13.5523 10 13Z',
  d7: 'M14 3L4 13L12 21L16 17',
  d8: 'M14 3L12 5M4 13L12 5M12 5L16 9',
  d9: 'M12 5L16 9',
  d10: 'M10 11.9999H21V14.0164H10V11.9999Z',
  d11: 'M13.8284 4.94234L15.8284 2.92586L14.4142 1.5L3 13.0082L12.4142 22.5L17.8284 17.0412L16.4142 15.6153L12.4142 19.6483L5.82843 13.0082L12.4142 6.3682L16.4142 10.4012L17.8284 8.97529L13.8284 4.94234Z',
};

export const IconLeetcodeStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Leetcode StrokeRounded"
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

export const IconLeetcodeDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Leetcode DuotoneRounded"
    >
      <path 
        d={d.d4}
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

export const IconLeetcodeTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Leetcode TwotoneRounded"
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
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconLeetcodeSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Leetcode SolidRounded"
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

export const IconLeetcodeBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Leetcode BulkRounded"
    >
      <path 
        d={d.d5}
        i-c="f"
      />
      <path 
        d={d.d6}
        i-c="c f fr o7"
      />
    </TheIconWrapper>
  );
};

export const IconLeetcodeStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Leetcode StrokeSharp"
    >
      <path 
        d={d.d7}
        i-c="s ss sw"
      />
      <path 
        d={d.d8}
        i-c="s ss sw"
      />
      <path 
        d={d.d3}
        i-c="s ss sw"
      />
      <path 
        d={d.d9}
        i-c="s ss sw"
      />
    </TheIconWrapper>
  );
};

export const IconLeetcodeSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Leetcode SolidSharp"
    >
      <path 
        d={d.d10}
        i-c="c f fr"
      />
      <path 
        d={d.d11}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfLeetcode: TheIconSelfPack = [
  'Leetcode',
  IconLeetcodeStrokeRounded,
  IconLeetcodeDuotoneRounded,
  IconLeetcodeTwotoneRounded,
  IconLeetcodeSolidRounded,
  IconLeetcodeBulkRounded,
  IconLeetcodeStrokeSharp,
  IconLeetcodeSolidSharp,
];