import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M14 3.09502C13.543 3.03241 13.0755 3 12.6 3C7.29807 3 3 7.02944 3 12C3 16.9706 7.29807 21 12.6 21C13.0755 21 13.543 20.9676 14 20.905',
  d2: 'M13.5 14.5C12.9943 14.0085 11 12.7002 11 12M13.5 9.5C12.9943 9.99153 11 11.2998 11 12M11 12L21 12',
  d3: 'M3 12C3 16.9706 7.02944 21 12 21C12.6874 21 13.3568 20.9229 14 20.777V3.22302C13.3568 3.07706 12.6874 3 12 3C7.02944 3 3 7.02944 3 12Z',
  d4: 'M12.85 4C8.03858 4 4.25 7.64154 4.25 12C4.25 16.3585 8.03858 20 12.85 20C13.2801 20 13.7022 19.9707 14.1143 19.9142C14.6615 19.8393 15.1658 20.2221 15.2407 20.7693C15.3157 21.3164 14.9329 21.8208 14.3857 21.8957C13.8838 21.9645 13.371 22 12.85 22C7.05756 22 2.25 17.5827 2.25 12C2.25 6.41734 7.05756 2 12.85 2C13.371 2 13.8838 2.03552 14.3857 2.10427C14.9329 2.17922 15.3157 2.68355 15.2407 3.23073C15.1658 3.7779 14.6615 4.16072 14.1143 4.08576C13.7022 4.02931 13.2801 4 12.85 4Z',
  d5: 'M20.75 13.0059C21.3023 13.0059 21.75 12.5581 21.75 12.0059C21.75 11.4536 21.3023 11.0059 20.75 11.0059L14.25 11.0059L14.25 10.4116C14.2501 10.236 14.2503 10.0203 14.2282 9.84387L14.2278 9.84053C14.212 9.71408 14.1402 9.13804 13.5746 8.86368C13.0077 8.58872 12.5076 8.89065 12.3994 8.95597L11.9309 9.29511C11.5551 9.58975 11.0406 9.99545 10.6496 10.3759C10.4545 10.5657 10.2533 10.783 10.0944 11.0139C9.95323 11.2191 9.74996 11.5693 9.74996 12C9.74996 12.4307 9.95323 12.7809 10.0944 12.9861C10.2533 13.217 10.4545 13.4343 10.6496 13.6241C11.0406 14.0046 11.5551 14.4102 11.9309 14.7049L12.3994 15.044C12.5076 15.1093 13.0078 15.4113 13.5746 15.1363C14.1402 14.862 14.212 14.2859 14.2278 14.1595L14.2282 14.1561C14.2503 13.9797 14.2501 13.764 14.25 13.5884L14.25 13.0059L20.75 13.0059Z',
  d6: 'M13.998 3.09502C13.541 3.03241 13.0736 3 12.598 3C7.29611 3 2.99805 7.02944 2.99805 12C2.99805 16.9706 7.29611 21 12.598 21C13.0736 21 13.541 20.9676 13.998 20.905',
  d7: 'M20.998 12H11.6663M13.9983 9L10.998 12L13.9983 15',
  d8: 'M13.098 4C8.28662 4 4.49805 7.64154 4.49805 12C4.49805 16.3585 8.28662 20 13.098 20C13.5281 20 13.9502 19.9707 14.3623 19.9142L14.6338 21.8957C14.1319 21.9645 13.6191 22 13.098 22C7.3056 22 2.49805 17.5827 2.49805 12C2.49805 6.41734 7.3056 2 13.098 2C13.6191 2 14.1319 2.03552 14.6338 2.10427L14.3623 4.08576C13.9502 4.02931 13.5281 4 13.098 4Z',
  d9: 'M13.9126 13.0001L15.2055 14.293L13.7914 15.7072L10.084 12.0001L13.7914 8.29297L15.2055 9.70723L13.9126 11.0001H21.4982V13.0001H13.9126Z',
};

export const IconLogin01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Login01 StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconLogin01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Login01 DuotoneRounded"
    >
      <path 
        d={d.d3}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconLogin01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Login01 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconLogin01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Login01 SolidRounded"
    >
      <path 
        d={d.d4}
        i-c="c f fr"
      />
      <path 
        d={d.d5}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconLogin01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Login01 BulkRounded"
    >
      <path 
        d={d.d4}
        i-c="c f fr o7"
      />
      <path 
        d={d.d5}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconLogin01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Login01 StrokeSharp"
    >
      <path 
        d={d.d6}
        i-c="s sw"
      />
      <path 
        d={d.d7}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconLogin01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Login01 SolidSharp"
    >
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

export const iconPackOfLogin01: TheIconSelfPack = [
  'Login01',
  IconLogin01StrokeRounded,
  IconLogin01DuotoneRounded,
  IconLogin01TwotoneRounded,
  IconLogin01SolidRounded,
  IconLogin01BulkRounded,
  IconLogin01StrokeSharp,
  IconLogin01SolidSharp,
];