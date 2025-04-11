import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M9.5 7.5V4.5H14.5V7.5H9.5Z',
  d2: 'M16 16V11H19.5V19.5H4.5V11H8V16H16Z',
  d3: 'M8.75 4.5C8.75 4.08579 9.08579 3.75 9.5 3.75H14.5C14.9142 3.75 15.25 4.08579 15.25 4.5V7.5C15.25 7.91421 14.9142 8.25 14.5 8.25H9.5C9.08579 8.25 8.75 7.91421 8.75 7.5V4.5Z',
  d4: 'M3.75 11C3.75 10.5858 4.08579 10.25 4.5 10.25H8C8.41421 10.25 8.75 10.5858 8.75 11V15.25H15.25V11C15.25 10.5858 15.5858 10.25 16 10.25H19.5C19.9142 10.25 20.25 10.5858 20.25 11V19.5C20.25 19.9142 19.9142 20.25 19.5 20.25H4.5C4.08579 20.25 3.75 19.9142 3.75 19.5V11Z',
  d5: 'M8.75 3.75H15.25V8.25H8.75V3.75Z',
  d6: 'M8.75 15.25H15.25V10.25H20.25V20.25H3.75V10.25H8.75V15.25Z',
};

export const IconUnsplashStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Unsplash StrokeRounded"
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

export const IconUnsplashDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Unsplash DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="f o7"
      />
      <path 
        d={d.d2}
        i-c="f o7"
      />
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

export const IconUnsplashTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Unsplash TwotoneRounded"
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

export const IconUnsplashSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Unsplash SolidRounded"
    >
      <path 
        d={d.d3}
        i-c="f"
      />
      <path 
        d={d.d4}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconUnsplashBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Unsplash BulkRounded"
    >
      <path 
        d={d.d3}
        i-c="f"
      />
      <path 
        d={d.d4}
        i-c="f o7"
      />
    </TheIconWrapper>
  );
};

export const IconUnsplashStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Unsplash StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconUnsplashSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Unsplash SolidSharp"
    >
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

export const iconPackOfUnsplash: TheIconSelfPack = [
  'Unsplash',
  IconUnsplashStrokeRounded,
  IconUnsplashDuotoneRounded,
  IconUnsplashTwotoneRounded,
  IconUnsplashSolidRounded,
  IconUnsplashBulkRounded,
  IconUnsplashStrokeSharp,
  IconUnsplashSolidSharp,
];