import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M4 21.001L7.00071 18',
  d2: 'M15 10.001L14 11.001',
  d3: 'M17.9999 3.00098L14.9999 6.00098C14.4547 6.54623 14.1821 6.81885 14.0363 7.11295C13.759 7.6725 13.759 8.32945 14.0363 8.88901C14.1821 9.1831 14.4547 9.45573 14.9999 10.001C15.5452 10.5462 15.8178 10.8189 16.1119 10.9646C16.6715 11.2419 17.3284 11.2419 17.888 10.9646C18.1821 10.8189 18.4547 10.5462 18.9999 10.001L21.9999 7.00098',
  d4: 'M20 5L17 8',
  d5: 'M20 21L12 13M12 13L2 3C2 6.84174 3.52612 10.5261 6.24264 13.2426L9 16L12 13Z',
  d6: 'M6.24264 13.2436C3.52612 10.5271 2 6.84271 2 3.00098L12 13.001L9 16.001L6.24264 13.2436Z',
  d7: 'M14.9997 6.00098L17.9997 3.00098L21.9997 7.00098L18.9997 10.001C18.4544 10.5462 18.1818 10.8189 17.8877 10.9646C17.3282 11.2419 16.6712 11.2419 16.1117 10.9646C15.8176 10.8189 15.5449 10.5462 14.9997 10.001C14.4544 9.45573 14.1818 9.1831 14.0361 8.88901C13.7588 8.32945 13.7588 7.6725 14.0361 7.11295C14.1818 6.81885 14.4544 6.54623 14.9997 6.00098Z',
  d8: 'M7.80636 17.1605C8.18802 17.5412 8.18805 18.1584 7.80642 18.5392L4.87391 21.4647C4.49227 21.8454 3.8735 21.8454 3.49183 21.4647C3.11017 21.084 3.11014 20.4668 3.49177 20.0861L6.42428 17.1606C6.80592 16.7798 7.42469 16.7798 7.80636 17.1605Z',
  d9: 'M15.6226 9.36121C16.0043 9.74192 16.0043 10.3592 15.6226 10.7399L14.6454 11.7147C14.2637 12.0954 13.6449 12.0954 13.2633 11.7147C12.8816 11.334 12.8816 10.7168 13.2633 10.3361L14.2406 9.36121C14.6222 8.98051 15.241 8.98051 15.6226 9.36121Z',
  d10: 'M18.5542 2.53748C18.9358 2.91819 18.9358 3.53543 18.5542 3.91614L15.6223 6.84071C15.0337 7.42791 14.9185 7.56103 14.8652 7.66824C14.7298 7.94099 14.7298 8.26121 14.8652 8.53395C14.9185 8.64116 15.0337 8.77429 15.6223 9.36148C16.211 9.94868 16.3444 10.0636 16.4519 10.1167C16.7253 10.2519 17.0464 10.2519 17.3198 10.1167C17.4273 10.0636 17.5607 9.94868 18.1494 9.36148L21.0812 6.43691C21.4628 6.05621 22.0816 6.05621 22.4632 6.43691C22.8449 6.81762 22.8449 7.43486 22.4632 7.81557L19.5314 10.7401C19.4991 10.7724 19.4671 10.8044 19.4355 10.836C18.9999 11.2716 18.6233 11.6483 18.1876 11.8637L17.7537 10.9902L18.1876 11.8637C17.3674 12.2692 16.4043 12.2692 15.5841 11.8637L16.004 11.0184L15.5841 11.8637C15.1484 11.6483 14.7718 11.2716 14.3362 10.836C14.3046 10.8044 14.2726 10.7724 14.2403 10.7401C14.2079 10.7079 14.1759 10.676 14.1441 10.6444C13.7075 10.2099 13.3298 9.83425 13.1139 9.39965C12.7075 8.58143 12.7075 7.62077 13.1139 6.80254C13.3298 6.36795 13.7074 5.99225 14.1441 5.55777C14.1759 5.52619 14.2079 5.4943 14.2403 5.46206L17.1721 2.53748C17.5537 2.15678 18.1725 2.15678 18.5542 2.53748Z',
  d11: 'M20.5088 4.48719C20.8905 4.86789 20.8905 5.48514 20.5088 5.86585L17.577 8.79042C17.1954 9.17112 16.5766 9.17112 16.1949 8.79042C15.8133 8.40971 15.8133 7.79247 16.1949 7.41176L19.1267 4.48719C19.5084 4.10648 20.1272 4.10648 20.5088 4.48719Z',
  d12: 'M1.85377 2.32424C2.21896 2.17335 2.6393 2.25675 2.9188 2.53556L20.5097 20.083C20.8914 20.4637 20.8914 21.0809 20.5097 21.4616C20.1281 21.8424 19.5093 21.8424 19.1276 21.4616L12.0005 14.3521L9.75971 16.5874C9.57643 16.7702 9.32786 16.8729 9.06867 16.8729C8.80948 16.8729 8.56091 16.7702 8.37763 16.5874L5.68294 13.8993C2.84489 11.0683 1.25049 7.22858 1.25049 3.22489C1.25049 2.83059 1.48859 2.47512 1.85377 2.32424Z',
  d13: 'M18 3.00098L13 8.00098L17.0003 12.0007L22 7.00098',
  d14: 'M8.36299 18.2339L4.1282 22.4691L2.77161 21.1126L7.0064 16.8774L8.36299 18.2339Z',
  d15: 'M16.036 10.5616L13.7203 12.8774L12.3638 11.5208L14.6795 9.20508L16.036 10.5616Z',
  d16: 'M18.9131 3.84677L14.1171 8.64278L16.5976 11.1229L21.3934 6.32709L22.75 7.68362L16.5977 13.8359L11.4039 8.64288L17.5566 2.49023L18.9131 3.84677Z',
  d17: 'M20.832 5.76425L16.5979 9.99842L15.2413 8.64188L19.4755 4.40771L20.832 5.76425Z',
  d18: 'M20.8315 21.1118L19.4749 22.4684L11.8012 14.7947L8.92358 17.6723L5.60042 14.3492C2.81482 11.5636 1.24988 7.78546 1.24988 3.84602V1.53027L20.8315 21.1118Z',
};

export const IconRestaurant03StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Restaurant03 StrokeRounded"
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
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d5}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconRestaurant03DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Restaurant03 DuotoneRounded"
    >
      <path 
        d={d.d6}
        i-c="f o7"
      />
      <path 
        d={d.d7}
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
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d5}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconRestaurant03TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Restaurant03 TwotoneRounded"
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
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d5}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconRestaurant03SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Restaurant03 SolidRounded"
    >
      <path 
        d={d.d8}
        i-c="c f fr"
      />
      <path 
        d={d.d9}
        i-c="c f fr"
      />
      <path 
        d={d.d10}
        i-c="c f fr"
      />
      <path 
        d={d.d11}
        i-c="c f fr"
      />
      <path 
        d={d.d12}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconRestaurant03BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Restaurant03 BulkRounded"
    >
      <path 
        d={d.d8}
        i-c="c f fr"
      />
      <path 
        d={d.d9}
        i-c="c f fr"
      />
      <path 
        d={d.d10}
        i-c="c f fr"
      />
      <path 
        d={d.d11}
        i-c="c f fr"
      />
      <path 
        d={d.d12}
        i-c="f o7"
      />
    </TheIconWrapper>
  );
};

export const IconRestaurant03StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Restaurant03 StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s ss sw"
      />
      <path 
        d={d.d2}
        i-c="s ss sw"
      />
      <path 
        d={d.d13}
        i-c="s ss sw"
      />
      <path 
        d={d.d4}
        i-c="s ss sw"
      />
      <path 
        d={d.d5}
        i-c="s ss sw"
      />
    </TheIconWrapper>
  );
};

export const IconRestaurant03SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Restaurant03 SolidSharp"
    >
      <path 
        d={d.d14}
        i-c="c f fr"
      />
      <path 
        d={d.d15}
        i-c="c f fr"
      />
      <path 
        d={d.d16}
        i-c="c f fr"
      />
      <path 
        d={d.d17}
        i-c="c f fr"
      />
      <path 
        d={d.d18}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfRestaurant03: TheIconSelfPack = [
  'Restaurant03',
  IconRestaurant03StrokeRounded,
  IconRestaurant03DuotoneRounded,
  IconRestaurant03TwotoneRounded,
  IconRestaurant03SolidRounded,
  IconRestaurant03BulkRounded,
  IconRestaurant03StrokeSharp,
  IconRestaurant03SolidSharp,
];