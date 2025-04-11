import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M4 5V19',
  d2: 'M14 5V19',
  d3: 'M17 19H18.5M20 19H18.5M18.5 19V11L17 12',
  d4: 'M4 12L14 12',
  d5: 'M3.5 4C4.05228 4 4.5 4.44772 4.5 5V19C4.5 19.5523 4.05228 20 3.5 20C2.94772 20 2.5 19.5523 2.5 19V5C2.5 4.44772 2.94772 4 3.5 4Z',
  d6: 'M13.5 4C14.0523 4 14.5 4.44772 14.5 5V19C14.5 19.5523 14.0523 20 13.5 20C12.9477 20 12.5 19.5523 12.5 19V5C12.5 4.44772 12.9477 4 13.5 4Z',
  d7: 'M19.472 10.1183C19.7971 10.2923 20.0001 10.6312 20.0001 11V18H20.5001C21.0524 18 21.5001 18.4477 21.5001 19C21.5001 19.5523 21.0524 20 20.5001 20H17.5001C16.9478 20 16.5001 19.5523 16.5001 19C16.5001 18.4477 16.9478 18 17.5001 18H18.0001V12.8661C17.5471 13.1282 16.9624 12.9962 16.6681 12.5547C16.3617 12.0952 16.4859 11.4743 16.9454 11.168L18.4454 10.168C18.7523 9.96338 19.1468 9.94431 19.472 10.1183Z',
  d8: 'M2.5 12C2.5 11.4477 2.94772 11 3.5 11L13.5 11C14.0523 11 14.5 11.4477 14.5 12C14.5 12.5523 14.0523 13 13.5 13L3.5 13C2.94772 13 2.5 12.5523 2.5 12Z',
  d9: 'M16.5 18H18.5M20.5 18H18.5M18.5 18V10H18L16.5 11.5',
  d10: 'M2.75 19V5H4.75V19H2.75Z',
  d11: 'M12.75 19V5H14.75V19H12.75Z',
  d12: 'M18.3359 9H20.2501V17H21.2501V19H17.2501V17H18.2501V11.9142L17.9572 12.2071L16.543 10.7929L18.3359 9Z',
  d13: 'M13.75 13L3.75 13L3.75 11L13.75 11V13Z',
};

export const IconHeading01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Heading01 StrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconHeading01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Heading01 DuotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconHeading01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Heading01 TwotoneRounded"
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
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconHeading01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Heading01 SolidRounded"
    >
      <path 
        d={d.d5}
        i-c="c f fr"
      />
      <path 
        d={d.d6}
        i-c="c f fr"
      />
      <path 
        d={d.d7}
        i-c="c f fr"
      />
      <path 
        d={d.d8}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconHeading01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Heading01 BulkRounded"
    >
      <path 
        d={d.d5}
        i-c="c f fr"
      />
      <path 
        d={d.d6}
        i-c="c f fr"
      />
      <path 
        d={d.d7}
        i-c="c f fr o7"
      />
      <path 
        d={d.d8}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconHeading01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Heading01 StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="s sw"
      />
      <path 
        d={d.d9}
        i-c="s sw"
      />
      <path 
        d={d.d4}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconHeading01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Heading01 SolidSharp"
    >
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
        i-c="c f fr"
      />
      <path 
        d={d.d13}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfHeading01: TheIconSelfPack = [
  'Heading01',
  IconHeading01StrokeRounded,
  IconHeading01DuotoneRounded,
  IconHeading01TwotoneRounded,
  IconHeading01SolidRounded,
  IconHeading01BulkRounded,
  IconHeading01StrokeSharp,
  IconHeading01SolidSharp,
];