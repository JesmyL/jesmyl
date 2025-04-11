import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z',
  d2: 'M15 11C17.2091 11 19 9.20914 19 7C19 4.79086 17.2091 3 15 3',
  d3: 'M11 14H7C4.23858 14 2 16.2386 2 19C2 20.1046 2.89543 21 4 21H14C15.1046 21 16 20.1046 16 19C16 16.2386 13.7614 14 11 14Z',
  d4: 'M17 14C19.7614 14 22 16.2386 22 19C22 20.1046 21.1046 21 20 21H18.5',
  d5: 'M4.25 7C4.25 4.37665 6.37665 2.25 9 2.25C11.6234 2.25 13.75 4.37665 13.75 7C13.75 9.62335 11.6234 11.75 9 11.75C6.37665 11.75 4.25 9.62335 4.25 7Z',
  d6: 'M1.25 19C1.25 15.8244 3.82436 13.25 7 13.25H11C14.1756 13.25 16.75 15.8244 16.75 19C16.75 20.5188 15.5188 21.75 14 21.75H4C2.48122 21.75 1.25 20.5188 1.25 19Z',
  d7: 'M13.374 11.4644C13.8812 11.6492 14.4288 11.75 15 11.75C17.6233 11.75 19.75 9.62335 19.75 7C19.75 4.37665 17.6233 2.25 15 2.25C14.4288 2.25 13.8812 2.35081 13.374 2.5356C14.5317 3.67 15.25 5.25111 15.25 7C15.25 8.74889 14.5317 10.33 13.374 11.4644Z',
  d8: 'M17.24 21.75H19.9995C21.5183 21.75 22.7495 20.5188 22.7495 19C22.7495 15.8244 20.1752 13.25 16.9995 13.25H15.416C17.1391 14.5754 18.2495 16.658 18.2495 19C18.2495 20.0488 17.8697 21.0088 17.24 21.75Z',
  d9: 'M13.374 11.4644C13.8812 11.6492 14.4289 11.75 15 11.75C17.6234 11.75 19.75 9.62335 19.75 7C19.75 4.37665 17.6234 2.25 15 2.25C14.4289 2.25 13.8812 2.35081 13.374 2.5356C14.5317 3.67 15.25 5.25111 15.25 7C15.25 8.74889 14.5317 10.33 13.374 11.4644Z',
  d10: 'M16 19C16 16.2386 13.7614 14 11 14H7C4.23858 14 2 16.2386 2 19V21H16V19Z',
  d11: 'M19 21H22V19C22 16.2386 19.7614 14 17 14',
  d12: 'M1.25 19C1.25 15.8244 3.82436 13.25 7 13.25H11C14.1756 13.25 16.75 15.8244 16.75 19V21.75H1.25V19Z',
  d13: 'M18.2495 21.75H22.7495V19C22.7495 15.8244 20.1752 13.25 16.9995 13.25H15.416C17.1391 14.5754 18.2495 16.658 18.2495 19V21.75Z',
};

export const IconUserMultiple02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="UserMultiple02 StrokeRounded"
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
        i-c="s sj sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconUserMultiple02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="UserMultiple02 DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="f o7"
      />
      <path 
        d={d.d3}
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
        i-c="s sj sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconUserMultiple02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="UserMultiple02 TwotoneRounded"
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
        i-c="s sj sw"
      />
      <path 
        d={d.d4}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconUserMultiple02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="UserMultiple02 SolidRounded"
    >
      <path 
        d={d.d5}
        i-c="f"
      />
      <path 
        d={d.d6}
        i-c="f"
      />
      <path 
        d={d.d7}
        i-c="f"
      />
      <path 
        d={d.d8}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconUserMultiple02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="UserMultiple02 BulkRounded"
    >
      <path 
        d={d.d5}
        i-c="f o7"
      />
      <path 
        d={d.d6}
        i-c="f o7"
      />
      <path 
        d={d.d9}
        i-c="f"
      />
      <path 
        d={d.d8}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconUserMultiple02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="UserMultiple02 StrokeSharp"
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
        d={d.d10}
        i-c="s ss sw"
      />
      <path 
        d={d.d11}
        i-c="s ss sw"
      />
    </TheIconWrapper>
  );
};

export const IconUserMultiple02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="UserMultiple02 SolidSharp"
    >
      <path 
        d={d.d5}
        i-c="f"
      />
      <path 
        d={d.d12}
        i-c="f"
      />
      <path 
        d={d.d9}
        i-c="f"
      />
      <path 
        d={d.d13}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfUserMultiple02: TheIconSelfPack = [
  'UserMultiple02',
  IconUserMultiple02StrokeRounded,
  IconUserMultiple02DuotoneRounded,
  IconUserMultiple02TwotoneRounded,
  IconUserMultiple02SolidRounded,
  IconUserMultiple02BulkRounded,
  IconUserMultiple02StrokeSharp,
  IconUserMultiple02SolidSharp,
];