import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M20.5126 10.8011L15.1758 17.6752C13.7137 19.5584 12.9827 20.5 12 20.5C11.0173 20.5 10.2863 19.5584 8.82421 17.6752L3.48742 10.8011C2.40801 9.41078 1.86831 8.71561 2.02741 7.82234C2.18651 6.92907 2.81754 6.53743 4.07962 5.75415C6.38289 4.32467 9.0958 3.5 12 3.5C14.9042 3.5 17.6171 4.32467 19.9204 5.75415C21.1825 6.53743 21.8135 6.92907 21.9726 7.82234C22.1317 8.71561 21.592 9.41078 20.5126 10.8011Z',
  d2: 'M12 3.5C9.0958 3.5 6.38289 4.32467 4.07962 5.75415C2.81754 6.53743 2.18651 6.92907 2.02741 7.82234C1.86831 8.71561 2.40801 9.41078 3.48742 10.8011L8.82421 17.6752C10.2863 19.5584 11.0173 20.5 12 20.5',
  d3: 'M3.6842 5.1169C6.10257 3.616 8.95187 2.75 12.0001 2.75C15.0483 2.75 17.8976 3.616 20.316 5.1169L20.3673 5.14878C20.9543 5.51299 21.4792 5.83868 21.867 6.19415C22.3052 6.59585 22.5985 7.059 22.7111 7.69082C22.8288 8.35173 22.6713 8.92275 22.3659 9.48388C22.0865 9.99704 21.65 10.5592 21.141 11.2148L15.7319 18.1819C15.0319 19.0837 14.4562 19.8252 13.9287 20.3337C13.3784 20.8643 12.7719 21.25 12.0001 21.25C11.2283 21.25 10.6218 20.8643 10.0714 20.3337C9.54397 19.8252 8.96827 19.0837 8.26821 18.1819L2.85918 11.2148C2.35014 10.5592 1.91362 9.99703 1.63431 9.48388C1.32889 8.92275 1.17139 8.35173 1.28911 7.69082C1.40165 7.059 1.69498 6.59585 2.13317 6.19415C2.52092 5.83868 3.04584 5.51299 3.63285 5.14877L3.6842 5.1169Z',
  d4: 'M3.6842 5.1169C6.10257 3.616 8.95187 2.75 12.0001 2.75V21.25C11.2283 21.25 10.6218 20.8643 10.0714 20.3337C9.54397 19.8252 8.96827 19.0837 8.26821 18.1819L2.85918 11.2148C2.35014 10.5592 1.91362 9.99703 1.63431 9.48388C1.32889 8.92275 1.17139 8.35173 1.28911 7.69082C1.40165 7.059 1.69498 6.59585 2.13317 6.19415C2.52092 5.83868 3.04584 5.51299 3.63285 5.14877L3.6842 5.1169Z',
  d5: 'M12 22L11.3927 22.4401C11.5338 22.6348 11.7596 22.75 12 22.75C12.2404 22.75 12.4662 22.6348 12.6073 22.4401L12 22ZM22 8.20203L22.6073 8.64216C22.8219 8.34604 22.7916 7.93831 22.5357 7.67711L22 8.20203ZM2 8.20203L1.46432 7.67711C1.20836 7.93831 1.17811 8.34604 1.39272 8.64216L2 8.20203ZM12 4.75C15.7077 4.75 19.0585 6.27188 21.4643 8.72696L22.5357 7.67711C19.8594 4.94598 16.1271 3.25 12 3.25V4.75ZM2.53568 8.72696C4.94146 6.27188 8.29233 4.75 12 4.75V3.25C7.87292 3.25 4.14061 4.94598 1.46432 7.67711L2.53568 8.72696ZM1.39272 8.64216L11.3927 22.4401L12.6073 21.5599L2.60728 7.76191L1.39272 8.64216ZM12.6073 22.4401L22.6073 8.64216L21.3927 7.76191L11.3927 21.5599L12.6073 22.4401Z',
  d6: 'M1.46433 7.67711C4.14061 4.94598 7.87293 3.25 12 3.25C16.1271 3.25 19.8594 4.94598 22.5357 7.67711C22.7916 7.93831 22.8219 8.34604 22.6073 8.64216L12.6073 22.4401C12.4662 22.6348 12.2404 22.75 12 22.75C11.7596 22.75 11.5338 22.6348 11.3927 22.4401L1.39273 8.64216C1.17812 8.34604 1.20837 7.93831 1.46433 7.67711Z',
};

export const IconWifiNoSignalStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="WifiNoSignal StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconWifiNoSignalDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="WifiNoSignal DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconWifiNoSignalTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="WifiNoSignal TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sw"
      />
      <path 
        d={d.d2}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconWifiNoSignalSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="WifiNoSignal SolidRounded"
    >
      <path 
        d={d.d3}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconWifiNoSignalBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="WifiNoSignal BulkRounded"
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

export const IconWifiNoSignalStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="WifiNoSignal StrokeSharp"
    >
      <path 
        d={d.d5}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconWifiNoSignalSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="WifiNoSignal SolidSharp"
    >
      <path 
        d={d.d6}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfWifiNoSignal: TheIconSelfPack = [
  'WifiNoSignal',
  IconWifiNoSignalStrokeRounded,
  IconWifiNoSignalDuotoneRounded,
  IconWifiNoSignalTwotoneRounded,
  IconWifiNoSignalSolidRounded,
  IconWifiNoSignalBulkRounded,
  IconWifiNoSignalStrokeSharp,
  IconWifiNoSignalSolidSharp,
];