import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M4 8H20',
  d2: 'M4 16H20',
  d3: 'M6 20L18 4',
  d4: 'M4 8H20M4 16H20M6 20L18 4',
  d5: 'M2.75 8C2.75 7.30964 3.30964 6.75 4 6.75H20C20.6904 6.75 21.25 7.30964 21.25 8C21.25 8.69036 20.6904 9.25 20 9.25H4C3.30964 9.25 2.75 8.69036 2.75 8Z',
  d6: 'M2.75 16C2.75 15.3096 3.30964 14.75 4 14.75H20C20.6904 14.75 21.25 15.3096 21.25 16C21.25 16.6904 20.6904 17.25 20 17.25H4C3.30964 17.25 2.75 16.6904 2.75 16Z',
  d7: 'M18.7501 3.00007C19.3024 3.41429 19.4143 4.19779 19.0001 4.75007L7.00007 20.7501C6.58586 21.3024 5.80236 21.4143 5.25007 21.0001C4.69779 20.5859 4.58586 19.8024 5.00007 19.2501L17.0001 3.25007C17.4143 2.69779 18.1978 2.58586 18.7501 3.00007Z',
  d8: 'M20 9.25H4V6.75H20V9.25Z',
  d9: 'M20 17.25H4V14.75H20V17.25Z',
  d10: 'M19 4.75L7 20.75L5 19.25L17 3.25L19 4.75Z',
};

export const IconNotEqualSignStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="NotEqualSign StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconNotEqualSignDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="NotEqualSign DuotoneRounded"
    >
      <path 
        d={d.d4}
        i-c="o7 s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconNotEqualSignTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="NotEqualSign TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sr sw"
      />
      <path 
        d={d.d3}
        i-c="o7 s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconNotEqualSignSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="NotEqualSign SolidRounded"
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
    </TheIconWrapper>
  );
};

export const IconNotEqualSignBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="NotEqualSign BulkRounded"
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
    </TheIconWrapper>
  );
};

export const IconNotEqualSignStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="NotEqualSign StrokeSharp"
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
        d={d.d3}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconNotEqualSignSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="NotEqualSign SolidSharp"
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
    </TheIconWrapper>
  );
};

export const iconPackOfNotEqualSign: TheIconSelfPack = [
  'NotEqualSign',
  IconNotEqualSignStrokeRounded,
  IconNotEqualSignDuotoneRounded,
  IconNotEqualSignTwotoneRounded,
  IconNotEqualSignSolidRounded,
  IconNotEqualSignBulkRounded,
  IconNotEqualSignStrokeSharp,
  IconNotEqualSignSolidSharp,
];