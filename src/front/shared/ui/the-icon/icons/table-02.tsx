import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2 4H22',
  d2: 'M19.5 4L22 20M4.5 4L2 20',
  d3: 'M4 9H20',
  d4: 'M19.5 4H4.5L3.71875 9H20.2812L19.5 4Z',
  d5: 'M22 20L20.2812 9M2 20L3.71875 9M20.2812 9L19.5 4H4.5L3.71875 9M20.2812 9H3.71875',
  d6: 'M1.00014 4C1.00014 3.44772 1.44786 3 2.00014 3H22.0001C22.5524 3 23.0001 3.44772 23.0001 4C23.0001 4.55228 22.5524 5 22.0001 5H20.6685L22.9882 19.8456C23.0734 20.3913 22.7002 20.9028 22.1545 20.988C21.6089 21.0733 21.0974 20.7 21.0121 20.1544L19.4255 10H4.57478L2.98816 20.1544C2.9029 20.7 2.39143 21.0733 1.84577 20.988C1.3001 20.9028 0.926872 20.3913 1.01213 19.8456L3.33176 5H2.00014C1.44786 5 1.00014 4.55228 1.00014 4Z',
  d7: 'M1.00014 4C1.00014 3.44772 1.44786 3 2.00014 3H22.0001C22.5524 3 23.0001 3.44772 23.0001 4C23.0001 4.55228 22.5524 5 22.0001 5H20.6685L22.9882 19.8456C23.0734 20.3913 22.7002 20.9028 22.1545 20.988C21.6089 21.0733 21.0974 20.7 21.0121 20.1544L19.4255 10L18.5 5H5.5L4.57478 10L2.98816 20.1544C2.9029 20.7 2.39143 21.0733 1.84577 20.988C1.3001 20.9028 0.926872 20.3913 1.01213 19.8456L3.33176 5H2.00014C1.44786 5 1.00014 4.55228 1.00014 4Z',
  d8: 'M19.425 10.0001H4.57422L5.49944 5.00012H18.4994L19.425 10.0001Z',
  d9: 'M1.25 20.1895L3.55761 5.00848H2.21687V3.5H21.7837V5.00848H20.4424L22.75 20.1895L20.8168 20.5L19.1827 9.75H4.81729L3.18322 20.5L1.25 20.1895Z',
};

export const IconTable02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Table02 StrokeRounded"
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

export const IconTable02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Table02 DuotoneRounded"
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
        d={d.d5}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconTable02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Table02 TwotoneRounded"
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

export const IconTable02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Table02 SolidRounded"
    >
      <path 
        d={d.d6}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconTable02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Table02 BulkRounded"
    >
      <path 
        d={d.d7}
        i-c="f"
      />
      <path 
        d={d.d8}
        i-c="f o7"
      />
    </TheIconWrapper>
  );
};

export const IconTable02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Table02 StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sj sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconTable02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Table02 SolidSharp"
    >
      <path 
        d={d.d9}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfTable02: TheIconSelfPack = [
  'Table02',
  IconTable02StrokeRounded,
  IconTable02DuotoneRounded,
  IconTable02TwotoneRounded,
  IconTable02SolidRounded,
  IconTable02BulkRounded,
  IconTable02StrokeSharp,
  IconTable02SolidSharp,
];