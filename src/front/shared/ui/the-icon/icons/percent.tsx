import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M4 20L20 4',
  d2: 'M8.26777 4.73223C9.24408 5.70854 9.24408 7.29146 8.26777 8.26777C7.29146 9.24408 5.70854 9.24408 4.73223 8.26777C3.75592 7.29146 3.75592 5.70854 4.73223 4.73223C5.70854 3.75592 7.29146 3.75592 8.26777 4.73223Z',
  d3: 'M19.2678 15.7322C20.2441 16.7085 20.2441 18.2915 19.2678 19.2678C18.2915 20.2441 16.7085 20.2441 15.7322 19.2678C14.7559 18.2915 14.7559 16.7085 15.7322 15.7322C16.7085 14.7559 18.2915 14.7559 19.2678 15.7322Z',
  d4: 'M20.8839 3.11612C21.372 3.60427 21.372 4.39573 20.8839 4.88388L4.88388 20.8839C4.39573 21.372 3.60427 21.372 3.11612 20.8839C2.62796 20.3957 2.62796 19.6043 3.11612 19.1161L19.1161 3.11612C19.6043 2.62796 20.3957 2.62796 20.8839 3.11612Z',
  d5: 'M4.2019 4.2019C5.47111 2.9327 7.52889 2.9327 8.7981 4.2019C10.0673 5.47111 10.0673 7.52889 8.7981 8.7981C7.52889 10.0673 5.47111 10.0673 4.2019 8.7981C2.9327 7.52889 2.9327 5.47111 4.2019 4.2019Z',
  d6: 'M15.2019 15.2019C16.4711 13.9327 18.5289 13.9327 19.7981 15.2019C21.0673 16.4711 21.0673 18.5289 19.7981 19.7981C18.5289 21.0673 16.4711 21.0673 15.2019 19.7981C13.9327 18.5289 13.9327 16.4711 15.2019 15.2019Z',
  d7: 'M21 4.76777L4.76777 21L3 19.2322L19.2322 3L21 4.76777Z',
};

export const IconPercentStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Percent StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
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

export const IconPercentDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Percent DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="f o7"
      />
      <path 
        d={d.d2}
        i-c="s sw"
      />
      <path 
        d={d.d3}
        i-c="f o7"
      />
      <path 
        d={d.d3}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconPercentTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Percent TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sw"
      />
      <path 
        d={d.d3}
        i-c="o7 s sw"
      />
    </TheIconWrapper>
  );
};

export const IconPercentSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Percent SolidRounded"
    >
      <path 
        d={d.d4}
        i-c="c f fr"
      />
      <path 
        d={d.d5}
        i-c="f"
      />
      <path 
        d={d.d6}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconPercentBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Percent BulkRounded"
    >
      <path 
        d={d.d4}
        i-c="c f fr"
      />
      <path 
        d={d.d5}
        i-c="f o7"
      />
      <path 
        d={d.d6}
        i-c="f o7"
      />
    </TheIconWrapper>
  );
};

export const IconPercentStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Percent StrokeSharp"
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

export const IconPercentSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Percent SolidSharp"
    >
      <path 
        d={d.d7}
        i-c="c f fr"
      />
      <path 
        d={d.d5}
        i-c="f"
      />
      <path 
        d={d.d6}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfPercent: TheIconSelfPack = [
  'Percent',
  IconPercentStrokeRounded,
  IconPercentDuotoneRounded,
  IconPercentTwotoneRounded,
  IconPercentSolidRounded,
  IconPercentBulkRounded,
  IconPercentStrokeSharp,
  IconPercentSolidSharp,
];