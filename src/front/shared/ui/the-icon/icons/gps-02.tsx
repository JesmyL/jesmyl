import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M20.5137 12C20.5137 16.6944 16.7081 20.5 12.0137 20.5C7.31925 20.5 3.51367 16.6944 3.51367 12C3.51367 7.30558 7.31925 3.5 12.0137 3.5C16.7081 3.5 20.5137 7.30558 20.5137 12Z',
  d2: 'M22.5 12H20.5',
  d3: 'M3.5 12H1.5',
  d4: 'M12 1.5L12 3.5',
  d5: 'M12 20.5V22.5',
  d6: 'M19.5 12C19.5 11.4477 19.9477 11 20.5 11H22.5C23.0523 11 23.5 11.4477 23.5 12C23.5 12.5523 23.0523 13 22.5 13H20.5C19.9477 13 19.5 12.5523 19.5 12Z',
  d7: 'M0.5 12C0.5 11.4477 0.947715 11 1.5 11H3.5C4.05228 11 4.5 11.4477 4.5 12C4.5 12.5523 4.05228 13 3.5 13H1.5C0.947715 13 0.5 12.5523 0.5 12Z',
  d8: 'M12 4.5C11.4477 4.5 11 4.05228 11 3.5V1.5C11 0.947715 11.4477 0.5 12 0.5C12.5523 0.5 13 0.947715 13 1.5V3.5C13 4.05228 12.5523 4.5 12 4.5Z',
  d9: 'M12 23.5C11.4477 23.5 11 23.0523 11 22.5V20.5C11 19.9477 11.4477 19.5 12 19.5C12.5523 19.5 13 19.9477 13 20.5V22.5C13 23.0523 12.5523 23.5 12 23.5Z',
  d10: 'M12.0137 4.5C7.87154 4.5 4.51367 7.85786 4.51367 12C4.51367 16.1421 7.87154 19.5 12.0137 19.5C16.1558 19.5 19.5137 16.1421 19.5137 12C19.5137 7.85786 16.1558 4.5 12.0137 4.5ZM2.51367 12C2.51367 6.75329 6.76697 2.5 12.0137 2.5C17.2604 2.5 21.5137 6.75329 21.5137 12C21.5137 17.2467 17.2604 21.5 12.0137 21.5C6.76697 21.5 2.51367 17.2467 2.51367 12Z',
  d11: 'M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z',
  d12: 'M22 12H20',
  d13: 'M4 12H2',
  d14: 'M12 2L12 4',
  d15: 'M12 20V22',
  d16: 'M13 3.05493C17.1716 3.51608 20.4839 6.82838 20.9451 11H22.75V13H20.9451C20.4839 17.1716 17.1716 20.4839 13 20.9451V22.75H11V20.9451C6.82838 20.4839 3.51608 17.1716 3.05493 13H1.25V11H3.05493C3.51608 6.82838 6.82838 3.51608 11 3.05493V1.25H13V3.05493ZM12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5Z',
};

export const IconGps02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Gps02 StrokeRounded"
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

export const IconGps02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Gps02 DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="f o7"
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

export const IconGps02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Gps02 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d5}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconGps02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Gps02 SolidRounded"
    >
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
      <path 
        d={d.d9}
        i-c="c f fr"
      />
      <path 
        d={d.d10}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconGps02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Gps02 BulkRounded"
    >
      <g    i-c="o7">
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
      <path 
        d={d.d9}
        i-c="c f fr"
      />
      </g>
      <path 
        d={d.d10}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconGps02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Gps02 StrokeSharp"
    >
      <path 
        d={d.d11}
        i-c="s sj sw"
      />
      <path 
        d={d.d12}
        i-c="s sj sw"
      />
      <path 
        d={d.d13}
        i-c="s sj sw"
      />
      <path 
        d={d.d14}
        i-c="s sj sw"
      />
      <path 
        d={d.d15}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconGps02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Gps02 SolidSharp"
    >
      <path 
        d={d.d16}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfGps02: TheIconSelfPack = [
  'Gps02',
  IconGps02StrokeRounded,
  IconGps02DuotoneRounded,
  IconGps02TwotoneRounded,
  IconGps02SolidRounded,
  IconGps02BulkRounded,
  IconGps02StrokeSharp,
  IconGps02SolidSharp,
];