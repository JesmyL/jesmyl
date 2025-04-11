import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M11.992 12H12.001',
  d2: 'M11.9842 18H11.9932',
  d3: 'M11.9998 6H12.0088',
  d4: 'M10.2422 12C10.2422 11.0335 11.0257 10.25 11.9922 10.25H12.0012C12.9677 10.25 13.7512 11.0335 13.7512 12C13.7512 12.9665 12.9677 13.75 12.0012 13.75H11.9922C11.0257 13.75 10.2422 12.9665 10.2422 12Z',
  d5: 'M10.2344 18C10.2344 17.0335 11.0179 16.25 11.9844 16.25H11.9934C12.9599 16.25 13.7434 17.0335 13.7434 18C13.7434 18.9665 12.9599 19.75 11.9934 19.75H11.9844C11.0179 19.75 10.2344 18.9665 10.2344 18Z',
  d6: 'M10.25 6C10.25 5.0335 11.0335 4.25 12 4.25H12.009C12.9755 4.25 13.759 5.0335 13.759 6C13.759 6.9665 12.9755 7.75 12.009 7.75H12C11.0335 7.75 10.25 6.9665 10.25 6Z',
  d7: 'M13.5 10.4956L13.5 13.5046L10.5 13.5046L10.5 10.4956L13.5 10.4956Z',
  d8: 'M13.5 16.5044L13.5 19.5134L10.5 19.5134L10.5 16.5044L13.5 16.5044Z',
  d9: 'M13.5 4.48682L13.5 7.4958L10.5 7.4958L10.5 4.48682L13.5 4.48682Z',
};

export const IconMoreVerticalStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MoreVertical StrokeRounded"
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

export const IconMoreVerticalDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MoreVertical DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconMoreVerticalTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MoreVertical TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
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

export const IconMoreVerticalSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MoreVertical SolidRounded"
    >
      <path 
        d={d.d4}
        i-c="c f fr"
      />
      <path 
        d={d.d5}
        i-c="c f fr"
      />
      <path 
        d={d.d6}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconMoreVerticalBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MoreVertical BulkRounded"
    >
      <path 
        d={d.d4}
        i-c="c f fr o7"
      />
      <path 
        d={d.d5}
        i-c="c f fr"
      />
      <path 
        d={d.d6}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconMoreVerticalStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MoreVertical StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sj ss sw"
      />
      <path 
        d={d.d2}
        i-c="s sj ss sw"
      />
      <path 
        d={d.d3}
        i-c="s sj ss sw"
      />
    </TheIconWrapper>
  );
};

export const IconMoreVerticalSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MoreVertical SolidSharp"
    >
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
    </TheIconWrapper>
  );
};

export const iconPackOfMoreVertical: TheIconSelfPack = [
  'MoreVertical',
  IconMoreVerticalStrokeRounded,
  IconMoreVerticalDuotoneRounded,
  IconMoreVerticalTwotoneRounded,
  IconMoreVerticalSolidRounded,
  IconMoreVerticalBulkRounded,
  IconMoreVerticalStrokeSharp,
  IconMoreVerticalSolidSharp,
];