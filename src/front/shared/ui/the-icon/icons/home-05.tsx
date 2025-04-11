import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 17H12.009',
  d2: 'M20 8.5V13.5C20 17.2712 20 19.1569 18.8284 20.3284C17.6569 21.5 15.7712 21.5 12 21.5C8.22876 21.5 6.34315 21.5 5.17157 20.3284C4 19.1569 4 17.2712 4 13.5V8.5',
  d3: 'M22 10.5L17.6569 6.33548C14.9902 3.77849 13.6569 2.5 12 2.5C10.3431 2.5 9.00981 3.77849 6.34315 6.33548L2 10.5',
  d4: 'M20 13.5V8.58226L17.6569 6.33548C14.9902 3.77849 13.6569 2.5 12 2.5C10.3431 2.5 9.00981 3.77849 6.34315 6.33548L4 8.58226V13.5C4 17.2712 4 19.1569 5.17157 20.3284C6.34315 21.5 8.22876 21.5 12 21.5C15.7712 21.5 17.6569 21.5 18.8284 20.3284C20 19.1569 20 17.2712 20 13.5Z',
  d5: 'M9.10742 2.85356C10.0495 2.16435 10.9512 1.75 12 1.75C13.0488 1.75 13.9505 2.16435 14.8926 2.85357C15.8068 3.52238 16.8365 4.50981 18.1359 5.75572L18.1709 5.78932L20.75 8.17179V13.5565C20.75 15.3942 20.75 16.8498 20.5969 17.989C20.4392 19.1614 20.1071 20.1104 19.3588 20.8588C18.6104 21.6071 17.6614 21.9392 16.489 22.0969C15.3498 22.25 13.8942 22.25 12.0564 22.25H11.9435C10.1058 22.25 8.65018 22.25 7.51098 22.0969C6.33856 21.9392 5.38961 21.6071 4.64124 20.8588C3.89288 20.1104 3.56076 19.1614 3.40314 17.989C3.24997 16.8498 3.24998 15.3942 3.25 13.5564V13.5564V8.17179L5.82911 5.7893L5.86415 5.7557L5.86416 5.75569C7.16348 4.50979 8.19323 3.52238 9.10742 2.85356ZM11.9955 15.75C11.3076 15.75 10.75 16.3096 10.75 17C10.75 17.6904 11.3076 18.25 11.9955 18.25C12.6777 18.25 13.25 17.6883 13.25 17C13.25 16.3117 12.6777 15.75 11.9955 15.75Z',
  d6: 'M10.1407 4.26594C9.33333 4.85661 8.38869 5.75951 7.03526 7.05727L2.69211 11.2218C2.29347 11.604 1.66045 11.5907 1.27821 11.1921C0.895967 10.7935 0.909258 10.1604 1.30789 9.77821L5.70301 5.56386C6.99217 4.32768 8.03207 3.33052 8.9598 2.6518C9.92464 1.94593 10.8777 1.5 12 1.5C13.1223 1.5 14.0754 1.94593 15.0402 2.6518C15.9679 3.33053 17.0078 4.32768 18.297 5.56387L22.6921 9.77821C23.0907 10.1604 23.104 10.7935 22.7218 11.1921C22.3396 11.5907 21.7065 11.604 21.3079 11.2218L16.9647 7.05728C15.6113 5.75951 14.6667 4.85662 13.8593 4.26594C13.0766 3.69332 12.5345 3.5 12 3.5C11.4655 3.5 10.9234 3.69332 10.1407 4.26594Z',
  d7: 'M12 1.75C10.9512 1.75 10.0495 2.16435 9.10742 2.85356C8.19322 3.52238 7.16347 4.5098 5.86415 5.7557L5.82911 5.7893L3.25 8.17179V13.5564C3.24998 15.3942 3.24997 16.8498 3.40314 17.989C3.56076 19.1614 3.89288 20.1104 4.64124 20.8588C5.38961 21.6071 6.33856 21.9392 7.51098 22.0969C8.65018 22.25 10.1058 22.25 11.9435 22.25H12.0564C13.8942 22.25 15.3498 22.25 16.489 22.0969C17.6614 21.9392 18.6104 21.6071 19.3588 20.8588C20.1071 20.1104 20.4392 19.1614 20.5969 17.989C20.75 16.8498 20.75 15.3942 20.75 13.5565V8.17179L18.1709 5.78932L18.1359 5.75572C16.8365 4.50981 15.8068 3.52238 14.8926 2.85357C13.9505 2.16435 13.0488 1.75 12 1.75Z',
  d8: 'M10.75 17C10.75 16.3096 11.3076 15.75 11.9955 15.75C12.6777 15.75 13.25 16.3117 13.25 17C13.25 17.6883 12.6777 18.25 11.9955 18.25C11.3076 18.25 10.75 17.6904 10.75 17Z',
  d9: 'M20 8.5V21.5H4V8.5',
  d10: 'M22 10.5L12 2.5L2 10.5',
  d11: 'M11.3679 1.97392C11.7375 1.6752 12.2625 1.6752 12.6321 1.97392L22.75 10.1532L21.4859 11.7499L20.7402 11.1471V22.2502H3.24023V11.1629L2.51413 11.7499L1.25 10.1532L11.3679 1.97392ZM12.9992 16.0004H10.9902V18.0004H12.9992V16.0004Z',
};

export const IconHome05StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Home05 StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sw"
      />
      <path 
        d={d.d3}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconHome05DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Home05 DuotoneRounded"
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
        i-c="s sw"
      />
      <path 
        d={d.d3}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconHome05TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Home05 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sw"
      />
      <path 
        d={d.d3}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconHome05SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Home05 SolidRounded"
    >
      <path 
        d={d.d5}
        i-c="c f fr"
      />
      <path 
        d={d.d6}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconHome05BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Home05 BulkRounded"
    >
      <path 
        d={d.d7}
        i-c="f o7"
      />
      <path 
        d={d.d8}
        i-c="c f fr"
      />
      <path 
        d={d.d6}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconHome05StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Home05 StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sj ss sw"
      />
      <path 
        d={d.d9}
        i-c="s sw"
      />
      <path 
        d={d.d10}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconHome05SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Home05 SolidSharp"
    >
      <path 
        d={d.d11}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfHome05: TheIconSelfPack = [
  'Home05',
  IconHome05StrokeRounded,
  IconHome05DuotoneRounded,
  IconHome05TwotoneRounded,
  IconHome05SolidRounded,
  IconHome05BulkRounded,
  IconHome05StrokeSharp,
  IconHome05SolidSharp,
];