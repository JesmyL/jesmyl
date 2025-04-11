import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M17 3.33782C15.5291 2.48697 13.8214 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.3151 21.9311 10.6462 21.8 10',
  d2: 'M8 12.5C8 12.5 9.5 12.5 11.5 16C11.5 16 17.0588 6.83333 22 5',
  d3: 'M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z',
  d4: 'M1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 9.8896 22.1419 7.92124 21.0913 6.26059C20.9466 6.03196 20.8743 5.91764 20.7456 5.8937C20.617 5.86977 20.5078 5.95084 20.2895 6.11299C19.8489 6.4403 19.4012 6.81512 18.9514 7.22836C17.7866 8.29853 16.6641 9.57355 15.6793 10.8102C14.6965 12.0444 13.8631 13.2249 13.2751 14.0976C12.9814 14.5335 12.7498 14.8912 12.5924 15.1389C12.5137 15.2627 12.4535 15.3589 12.4134 15.4235L12.3686 15.4961L12.3579 15.5137L12.3555 15.5177C12.1718 15.8205 11.8411 16.0043 11.487 15.9997C11.1328 15.9951 10.8075 15.8035 10.6318 15.4959C9.68252 13.8348 8.89836 13.0868 8.42654 12.7565C8.19208 12.5924 8.03257 12.5297 7.96242 12.5074C7.95823 12.5061 7.95613 12.5054 7.9482 12.5033C7.9412 12.5015 7.92946 12.499 7.92233 12.4978C7.91425 12.4965 7.90562 12.4955 7.88836 12.4936C7.38862 12.4381 7 12.0143 7 11.4998C7 10.9475 7.44772 10.4998 8 10.4998C8.07902 10.491 8.30342 10.4991 8.56883 10.6015C8.84243 10.6886 9.18292 10.8447 9.57346 11.1181C10.1028 11.4886 10.7189 12.0707 11.3896 12.9838C11.4463 13.061 11.5629 13.0595 11.6165 12.9801C12.2251 12.0767 13.0902 10.851 14.1148 9.56435C15.1374 8.28019 16.3311 6.91979 17.5983 5.75558C18.0072 5.37986 18.4299 5.01882 18.8629 4.68463C19.139 4.47152 19.277 4.36496 19.28 4.22139C19.2829 4.07781 19.158 3.97299 18.9083 3.76333C17.0401 2.19471 14.6304 1.25 12 1.25C6.06294 1.25 1.25 6.06294 1.25 12Z',
  d5: 'M1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25C6.06294 1.25 1.25 6.06294 1.25 12Z',
  d6: 'M15 2.4578C14.053 2.16035 13.0452 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 10.9548 21.8396 9.94704 21.5422 9',
  d7: 'M8.5 9.5L12 13L21.0002 3',
  d8: 'M12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C14.6463 1.25 17.0692 2.20617 18.9422 3.79186L11.9618 11.5476L9.20711 8.79289L7.79289 10.2071L12.0382 14.4524L20.345 5.22281C21.8487 7.07208 22.75 9.43078 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75Z',
};

export const IconCheckmarkCircle03StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CheckmarkCircle03 StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconCheckmarkCircle03DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CheckmarkCircle03 DuotoneRounded"
    >
      <path 
        d={d.d3}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconCheckmarkCircle03TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CheckmarkCircle03 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconCheckmarkCircle03SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CheckmarkCircle03 SolidRounded"
    >
      <path 
        d={d.d4}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconCheckmarkCircle03BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CheckmarkCircle03 BulkRounded"
    >
      <path 
        d={d.d5}
        i-c="f o7"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconCheckmarkCircle03StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CheckmarkCircle03 StrokeSharp"
    >
      <path 
        d={d.d6}
        i-c="s sw"
      />
      <path 
        d={d.d7}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconCheckmarkCircle03SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CheckmarkCircle03 SolidSharp"
    >
      <path 
        d={d.d8}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfCheckmarkCircle03: TheIconSelfPack = [
  'CheckmarkCircle03',
  IconCheckmarkCircle03StrokeRounded,
  IconCheckmarkCircle03DuotoneRounded,
  IconCheckmarkCircle03TwotoneRounded,
  IconCheckmarkCircle03SolidRounded,
  IconCheckmarkCircle03BulkRounded,
  IconCheckmarkCircle03StrokeSharp,
  IconCheckmarkCircle03SolidSharp,
];