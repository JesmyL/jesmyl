import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18',
  d2: 'M9 12C9.00001 10.4189 15 6 15 6',
  d3: 'M15.8051 5.40705C15.4776 4.96235 14.8516 4.86736 14.4069 5.19488C14.0615 5.44927 13.7332 5.70372 13.4472 5.92689C12.8764 6.3724 12.1118 6.98572 11.3444 7.65208C10.5819 8.31412 9.79361 9.04815 9.18811 9.73344C8.88637 10.0749 8.60888 10.4279 8.4014 10.7721C8.21046 11.0888 8 11.524 8 12.0001C8 12.4762 8.21046 12.9115 8.4014 13.2282C8.60888 13.5724 8.88637 13.9253 9.18811 14.2668C9.79361 14.9521 10.5819 15.6861 11.3444 16.3482C12.1118 17.0145 12.8764 17.6278 13.4472 18.0734C13.7332 18.2965 14.0615 18.551 14.4069 18.8054C14.8516 19.1329 15.4776 19.0379 15.8051 18.5932C15.9368 18.4144 16.0002 18.2064 16 18.0002V12.0001V6.00007C16.0002 5.79387 15.9368 5.58581 15.8051 5.40705Z',
  d4: 'M15.8051 5.40705C15.4776 4.96235 14.8516 4.86736 14.4069 5.19488C14.0615 5.44927 13.7332 5.70372 13.4472 5.92689C12.8764 6.3724 12.1118 6.98572 11.3444 7.65208C10.5819 8.31412 9.79361 9.04815 9.18811 9.73344C8.88637 10.0749 8.60888 10.4279 8.4014 10.7721C8.21046 11.0888 8 11.524 8 12.0001C8 12.4762 8.21046 12.9115 8.4014 13.2282C8.60888 13.5724 8.88637 13.9253 9.18811 14.2668C9.6563 14.7967 10.2338 15.3557 10.8241 15.8881L16 10.7122V6.00007C16.0002 5.79387 15.9368 5.58581 15.8051 5.40705Z',
  d5: 'M15 6L9 12L15 18',
  d6: 'M15.5 4V20L6.5 12L15.5 4Z',
};

export const IconArrowLeft01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ArrowLeft01 StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconArrowLeft01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ArrowLeft01 DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconArrowLeft01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ArrowLeft01 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconArrowLeft01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ArrowLeft01 SolidRounded"
    >
      <path 
        d={d.d3}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconArrowLeft01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ArrowLeft01 BulkRounded"
    >
      <path 
        d={d.d3}
        i-c="f o7"
      />
      <path 
        d={d.d4}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconArrowLeft01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ArrowLeft01 StrokeSharp"
    >
      <path 
        d={d.d5}
        i-c="m2 s sw"
      />
    </TheIconWrapper>
  );
};

export const IconArrowLeft01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ArrowLeft01 SolidSharp"
    >
      <path 
        d={d.d6}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfArrowLeft01: TheIconSelfPack = [
  'ArrowLeft01',
  IconArrowLeft01StrokeRounded,
  IconArrowLeft01DuotoneRounded,
  IconArrowLeft01TwotoneRounded,
  IconArrowLeft01SolidRounded,
  IconArrowLeft01BulkRounded,
  IconArrowLeft01StrokeSharp,
  IconArrowLeft01SolidSharp,
];