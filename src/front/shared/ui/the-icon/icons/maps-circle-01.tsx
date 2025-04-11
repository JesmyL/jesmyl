import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M15.1287 13.7468C14.9601 13.9092 14.7347 14 14.5001 14C14.2655 14 14.0401 13.9092 13.8715 13.7468C12.3272 12.2504 10.2576 10.5788 11.2669 8.15187C11.8126 6.83966 13.1225 6 14.5001 6C15.8777 6 17.1876 6.83966 17.7333 8.15187C18.7413 10.5757 16.6768 12.2555 15.1287 13.7468Z',
  d2: 'M14.5 9.5H14.509',
  d3: 'M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z',
  d4: 'M9 15L5 19M15 21L3 9',
  d5: 'M22.0003 12C22.0003 16.3491 19.224 20.0497 15.347 21.4263L2.62988 8.5001C4.04859 4.70338 7.70875 2 12.0003 2C17.5232 2 22.0003 6.47715 22.0003 12ZM14.5001 14C14.7347 14 14.9601 13.9092 15.1287 13.7468C15.2465 13.6334 15.3672 13.5188 15.4893 13.403C16.9731 11.9957 18.6646 10.3913 17.7333 8.15187C17.1876 6.83966 15.8777 6 14.5001 6C13.1225 6 11.8126 6.83966 11.2669 8.15187C10.3393 10.3823 12.0122 11.9747 13.4879 13.3795C13.6179 13.5033 13.7464 13.6256 13.8715 13.7468C14.0401 13.9092 14.2655 14 14.5001 14Z',
  d6: 'M13.5005 5.25C11.8272 5.25 10.2395 6.26527 9.57473 7.86388C8.95242 9.36031 9.29999 10.645 9.98118 11.704C10.5245 12.5486 11.3178 13.3025 11.9889 13.9402C12.1143 14.0594 12.2355 14.1745 12.3499 14.2854L12.3516 14.287C12.6603 14.5843 13.0723 14.75 13.5005 14.75C13.9287 14.75 14.3407 14.5843 14.6494 14.2869C14.7581 14.1822 14.8728 14.0737 14.9912 13.9615C15.6689 13.3199 16.4722 12.5593 17.0211 11.7042C17.7014 10.6442 18.0477 9.3585 17.4262 7.86388C16.7614 6.26527 15.1737 5.25 13.5005 5.25ZM13.4952 8C12.6705 8 12.002 8.67157 12.002 9.5C12.002 10.3284 12.6705 11 13.4952 11H13.5087C14.3334 11 15.002 10.3284 15.002 9.5C15.002 8.67157 14.3334 8 13.5087 8H13.4952Z',
  d7: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 14.3714 2.01783 16.5634 3.31844 18.3411C3.49521 18.5827 3.5836 18.7035 3.72119 18.7141C3.85878 18.7247 3.96877 18.6147 4.18875 18.3947L8.3976 14.1858C8.5976 13.9858 8.6976 13.8858 8.6976 13.7615C8.6976 13.6372 8.5976 13.5372 8.3976 13.3372L4.09914 9.03878C3.9623 8.90193 3.89387 8.83351 3.87701 8.74159C3.86015 8.64967 3.89807 8.56534 3.9739 8.3967C5.35024 5.33587 8.4261 3.20459 11.9997 3.20459C16.8573 3.20459 20.7952 7.14245 20.7952 12C20.7952 15.5737 18.6639 18.6495 15.6031 20.0259C15.4344 20.1017 15.3501 20.1396 15.2582 20.1228C15.1663 20.1059 15.0979 20.0375 14.961 19.9006L10.6603 15.6C10.4603 15.4 10.3603 15.3 10.2361 15.3C10.1118 15.3 10.0118 15.4 9.81181 15.6L5.6026 19.8093C5.38268 20.0292 5.27272 20.1391 5.2833 20.2767C5.29387 20.4143 5.41461 20.5027 5.65608 20.6795C7.43423 21.9813 9.62735 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25Z',
  d8: 'M18 9.6C18 12.4 14.5 14 14.5 14C14.5 14 11 12.4 11 9.6C11 7.61177 12.567 6 14.5 6C16.433 6 18 7.61177 18 9.6Z',
  d9: 'M12.5698 14.3521C12.7479 14.4572 12.8976 14.5377 13.0046 14.5927L13.498 14.8247L13.9914 14.5927C14.0985 14.5377 14.2481 14.4572 14.4263 14.3521C14.7809 14.1427 15.2567 13.8304 15.7361 13.4194C16.6727 12.6167 17.748 11.3269 17.748 9.6C17.748 7.21762 15.865 5.25 13.498 5.25C11.1311 5.25 9.24805 7.21762 9.24805 9.6C9.24805 11.3269 10.3234 12.6167 11.26 13.4194C11.7394 13.8304 12.2152 14.1427 12.5698 14.3521ZM13.4913 8C12.6666 8 11.998 8.67157 11.998 9.5C11.998 10.3284 12.6666 11 13.4913 11H13.5048C14.3295 11 14.998 10.3284 14.998 9.5C14.998 8.67157 14.3295 8 13.5048 8H13.4913Z',
  d10: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 14.6084 2.17903 16.9999 3.72427 18.8615L9.00071 13.5849L3.92578 8.51C5.27656 5.38859 8.38403 3.20459 12.0016 3.20459C16.8592 3.20459 20.7971 7.14245 20.7971 12C20.7971 15.6176 18.6131 18.7251 15.4917 20.0759L10.4149 14.9991L5.13848 20.2758C7.00011 21.821 9.39156 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25Z',
};

export const IconMapsCircle01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MapsCircle01 StrokeRounded"
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
        i-c="s sw"
      />
      <path 
        d={d.d4}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconMapsCircle01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MapsCircle01 DuotoneRounded"
    >
      <path 
        d={d.d5}
        i-c="c f fr o7"
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
        i-c="s sw"
      />
      <path 
        d={d.d4}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconMapsCircle01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MapsCircle01 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sw"
      />
      <path 
        d={d.d4}
        i-c="o7 s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconMapsCircle01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MapsCircle01 SolidRounded"
    >
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

export const IconMapsCircle01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MapsCircle01 BulkRounded"
    >
      <path 
        d={d.d6}
        i-c="c f fr"
      />
      <path 
        d={d.d7}
        i-c="c f fr o7"
      />
    </TheIconWrapper>
  );
};

export const IconMapsCircle01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MapsCircle01 StrokeSharp"
    >
      <path 
        d={d.d8}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sw"
      />
      <path 
        d={d.d4}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconMapsCircle01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MapsCircle01 SolidSharp"
    >
      <path 
        d={d.d9}
        i-c="c f fr"
      />
      <path 
        d={d.d10}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfMapsCircle01: TheIconSelfPack = [
  'MapsCircle01',
  IconMapsCircle01StrokeRounded,
  IconMapsCircle01DuotoneRounded,
  IconMapsCircle01TwotoneRounded,
  IconMapsCircle01SolidRounded,
  IconMapsCircle01BulkRounded,
  IconMapsCircle01StrokeSharp,
  IconMapsCircle01SolidSharp,
];