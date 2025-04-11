import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M5 14L8.5 17.5L12.8953 12.8953M19 6.5L14.8488 10.8488',
  d2: 'M5 5L19 19',
  d3: 'M19.6905 5.77665C20.09 6.15799 20.1047 6.79098 19.7234 7.19048L15.9052 11.1905C15.5238 11.59 14.8908 11.6047 14.4913 11.2234C14.0918 10.842 14.0771 10.209 14.4585 9.80953L18.2766 5.80953C18.658 5.41003 19.291 5.39531 19.6905 5.77665ZM13.5858 12.172C13.9853 12.5533 14 13.1863 13.6187 13.5858L9.22336 18.1905C9.03745 18.3852 8.78086 18.4968 8.51163 18.4999C8.2424 18.5031 7.98328 18.3975 7.79289 18.2071L4.29289 14.7071C3.90237 14.3166 3.90237 13.6834 4.29289 13.2929C4.68342 12.9024 5.31658 12.9024 5.70711 13.2929L8.48336 16.0692L12.172 12.2049C12.5533 11.8054 13.1863 11.7907 13.5858 12.172Z',
  d4: 'M4.29289 4.29289C4.68342 3.90237 5.31658 3.90237 5.70711 4.29289L19.7071 18.2929C20.0976 18.6834 20.0976 19.3166 19.7071 19.7071C19.3166 20.0976 18.6834 20.0976 18.2929 19.7071L4.29289 5.70711C3.90237 5.31658 3.90237 4.68342 4.29289 4.29289Z',
  d5: 'M5 14L8.5 17.5L12.7955 13M19 6.5L14.8488 10.8488',
  d6: 'M20.5 6.20717L15.2022 11.7426L13.7555 10.3633L19.0533 4.82786L20.5 6.20717ZM14.1235 12.8713L8.43085 18.8279L3.5 13.903L4.91421 12.4905L8.39758 15.9697L12.6768 11.492L14.1235 12.8713Z',
  d7: 'M4.91421 3.5L20.5 19.0858L19.0858 20.5L3.5 4.91421L4.91421 3.5Z',
};

export const IconCheckUnread03StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CheckUnread03 StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconCheckUnread03DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CheckUnread03 DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconCheckUnread03TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CheckUnread03 TwotoneRounded"
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

export const IconCheckUnread03SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CheckUnread03 SolidRounded"
    >
      <path 
        d={d.d3}
        i-c="c f fr"
      />
      <path 
        d={d.d4}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconCheckUnread03BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CheckUnread03 BulkRounded"
    >
      <path 
        d={d.d3}
        i-c="c f fr o7"
      />
      <path 
        d={d.d4}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconCheckUnread03StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CheckUnread03 StrokeSharp"
    >
      <path 
        d={d.d5}
        i-c="s ss sw"
      />
      <path 
        d={d.d2}
        i-c="s ss sw"
      />
    </TheIconWrapper>
  );
};

export const IconCheckUnread03SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CheckUnread03 SolidSharp"
    >
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

export const iconPackOfCheckUnread03: TheIconSelfPack = [
  'CheckUnread03',
  IconCheckUnread03StrokeRounded,
  IconCheckUnread03DuotoneRounded,
  IconCheckUnread03TwotoneRounded,
  IconCheckUnread03SolidRounded,
  IconCheckUnread03BulkRounded,
  IconCheckUnread03StrokeSharp,
  IconCheckUnread03SolidSharp,
];