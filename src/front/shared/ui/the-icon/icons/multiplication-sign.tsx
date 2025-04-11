import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M18 6L12 12M12 12L6 18M12 12L18 18M12 12L6 6',
  d2: 'M18 6L6 18',
  d3: 'M18 18L6 6',
  d4: 'M5.11612 5.11612C5.60427 4.62796 6.39573 4.62796 6.88388 5.11612L12 10.2322L17.1161 5.11612C17.6043 4.62796 18.3957 4.62796 18.8839 5.11612C19.372 5.60427 19.372 6.39573 18.8839 6.88388L13.7678 12L18.8839 17.1161C19.372 17.6043 19.372 18.3957 18.8839 18.8839C18.3957 19.372 17.6043 19.372 17.1161 18.8839L12 13.7678L6.88388 18.8839C6.39573 19.372 5.60427 19.372 5.11612 18.8839C4.62796 18.3957 4.62796 17.6043 5.11612 17.1161L10.2322 12L5.11612 6.88388C4.62796 6.39573 4.62796 5.60427 5.11612 5.11612Z',
  d5: 'M5.11612 17.1161L17.1161 5.11612C17.6043 4.62796 18.3957 4.62796 18.8839 5.11612C19.372 5.60427 19.372 6.39573 18.8839 6.88388L6.88388 18.8839C6.39573 19.372 5.60427 19.372 5.11612 18.8839C4.62796 18.3957 4.62796 17.6043 5.11612 17.1161Z',
  d6: 'M5.11612 5.11612C5.60427 4.62796 6.39573 4.62796 6.88388 5.11612L18.8839 17.1161C19.372 17.6043 19.372 18.3957 18.8839 18.8839C18.3957 19.372 17.6043 19.372 17.1161 18.8839L5.11612 6.88388C4.62796 6.39573 4.62796 5.60427 5.11612 5.11612Z',
  d7: 'M13.7679 12.0001L19.0002 6.76777L17.2324 5L12.0001 10.2323L6.76777 5L5 6.76777L10.2323 12.0001L5 17.2324L6.76777 19.0002L12.0001 13.7679L17.2324 19.0002L19.0002 17.2324L13.7679 12.0001Z',
};

export const IconMultiplicationSignStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MultiplicationSign StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconMultiplicationSignDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MultiplicationSign DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconMultiplicationSignTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MultiplicationSign TwotoneRounded"
    >
      <path 
        d={d.d2}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconMultiplicationSignSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MultiplicationSign SolidRounded"
    >
      <path 
        d={d.d4}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconMultiplicationSignBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MultiplicationSign BulkRounded"
    >
      <path 
        d={d.d5}
        i-c="f o7"
      />
      <path 
        d={d.d6}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconMultiplicationSignStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MultiplicationSign StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconMultiplicationSignSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MultiplicationSign SolidSharp"
    >
      <path 
        d={d.d7}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfMultiplicationSign: TheIconSelfPack = [
  'MultiplicationSign',
  IconMultiplicationSignStrokeRounded,
  IconMultiplicationSignDuotoneRounded,
  IconMultiplicationSignTwotoneRounded,
  IconMultiplicationSignSolidRounded,
  IconMultiplicationSignBulkRounded,
  IconMultiplicationSignStrokeSharp,
  IconMultiplicationSignSolidSharp,
];