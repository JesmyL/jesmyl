import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M8 12H16M8 12C8 11.2998 9.9943 9.99153 10.5 9.5M8 12C8 12.7002 9.9943 14.0085 10.5 14.5',
  d2: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM17 12.0059C17 12.5581 16.5523 13.0059 16 13.0059H11.5L11.5 13.5884C11.5001 13.764 11.5003 13.9797 11.4782 14.1561L11.4778 14.1595C11.462 14.2859 11.3902 14.862 10.8246 15.1363C10.2578 15.4113 9.75761 15.1093 9.64941 15.044L9.18091 14.7049C8.80508 14.4102 8.29063 14.0046 7.89962 13.6241C7.70451 13.4343 7.50328 13.217 7.34443 12.9861C7.20323 12.7809 6.99996 12.4307 6.99996 12C6.99996 11.5693 7.20323 11.2191 7.34443 11.0139C7.50328 10.783 7.70451 10.5657 7.89962 10.3759C8.29063 9.99545 8.80509 9.58975 9.18092 9.29511L9.6494 8.95597C9.75761 8.89065 10.2577 8.58872 10.8246 8.86368C11.3902 9.13804 11.462 9.71408 11.4778 9.84053L11.4782 9.84387C11.5003 10.0203 11.5001 10.236 11.5 10.4116L11.5 11.0059H16C16.5523 11.0059 17 11.4536 17 12.0059Z',
  d3: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z',
  d4: 'M16 13.0059C16.5523 13.0059 17 12.5581 17 12.0059C17 11.4536 16.5523 11.0059 16 11.0059L11.5 11.0059L11.5 10.4116C11.5001 10.236 11.5003 10.0203 11.4782 9.84387L11.4778 9.84053C11.462 9.71408 11.3902 9.13804 10.8246 8.86368C10.2577 8.58872 9.75761 8.89065 9.6494 8.95597L9.18092 9.29511C8.80509 9.58975 8.29063 9.99545 7.89962 10.3759C7.70451 10.5657 7.50328 10.783 7.34443 11.0139C7.20323 11.2191 6.99996 11.5693 6.99996 12C6.99996 12.4307 7.20323 12.7809 7.34443 12.9861C7.50328 13.217 7.70451 13.4343 7.89962 13.6241C8.29063 14.0046 8.80508 14.4102 9.18091 14.7049L9.64941 15.044C9.75761 15.1093 10.2578 15.4113 10.8246 15.1363C11.3902 14.862 11.462 14.2859 11.4778 14.1595L11.4782 14.1561C11.5003 13.9797 11.5001 13.764 11.5 13.5884L11.5 13.0059L16 13.0059Z',
  d5: 'M16 12H8.62324M11 9L8 12L11 15',
  d6: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM11.7073 14.293L10.4144 13.0001H16.0002V11.0001H10.4144L11.7073 9.70718L10.293 8.29297L6.58594 12.0001L10.293 15.7072L11.7073 14.293Z',
};

export const IconLoginCircle01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="login-circle-01-stroke-rounded IconLoginCircle01StrokeRounded"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLoginCircle01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="login-circle-01-duotone-rounded IconLoginCircle01DuotoneRounded"
    >
      <circle 
        opacity="var(--icon-opacity)" 
        cx="12" 
        cy="12" 
        r="10" 
        fill="var(--icon-fill)"></circle>
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLoginCircle01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="login-circle-01-twotone-rounded IconLoginCircle01TwotoneRounded"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLoginCircle01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="login-circle-01-solid-rounded IconLoginCircle01SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconLoginCircle01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="login-circle-01-bulk-rounded IconLoginCircle01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconLoginCircle01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="login-circle-01-stroke-sharp IconLoginCircle01StrokeSharp"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconLoginCircle01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="login-circle-01-solid-sharp IconLoginCircle01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfLoginCircle01: TheIconSelfPack = {
  name: 'LoginCircle01',
  StrokeRounded: IconLoginCircle01StrokeRounded,
  DuotoneRounded: IconLoginCircle01DuotoneRounded,
  TwotoneRounded: IconLoginCircle01TwotoneRounded,
  SolidRounded: IconLoginCircle01SolidRounded,
  BulkRounded: IconLoginCircle01BulkRounded,
  StrokeSharp: IconLoginCircle01StrokeSharp,
  SolidSharp: IconLoginCircle01SolidSharp,
};