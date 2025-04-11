import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 3L12 8.5M12 21L12 15',
  d2: 'M12 2C12.5523 2 13 2.44772 13 3L13 8.5C13 9.05228 12.5523 9.5 12 9.5C11.4477 9.5 11 9.05228 11 8.5L11 3C11 2.44772 11.4477 2 12 2ZM12 14C12.5523 14 13 14.4477 13 15L13 21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21L11 15C11 14.4477 11.4477 14 12 14Z',
  d3: 'M8.25 12C8.25 9.92893 9.92893 8.25 12 8.25C14.0711 8.25 15.75 9.92893 15.75 12C15.75 14.0711 14.0711 15.75 12 15.75C9.92893 15.75 8.25 14.0711 8.25 12Z',
  d4: 'M11 8.5L11 3L13 3L13 8.5L11 8.5ZM11 21L11 15L13 15L13 21L11 21Z',
};

export const IconGitCommitStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="GitCommit StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <circle 
        cx="12"
        cy="12"
        r="3"
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconGitCommitDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="GitCommit DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <circle 
        cx="12"
        cy="12"
        r="3"
        i-c="f o7"
      />
      <circle 
        cx="12"
        cy="12"
        r="3"
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconGitCommitTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="GitCommit TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
      />
      <circle 
        cx="12"
        cy="12"
        r="3"
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconGitCommitSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="GitCommit SolidRounded"
    >
      <path 
        d={d.d2}
        i-c="c f fr"
      />
      <path 
        d={d.d3}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconGitCommitBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="GitCommit BulkRounded"
    >
      <path 
        d={d.d2}
        i-c="c f fr o7"
      />
      <path 
        d={d.d3}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconGitCommitStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="GitCommit StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sj sw"
      />
      <circle 
        cx="12"
        cy="12"
        r="3"
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconGitCommitSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="GitCommit SolidSharp"
    >
      <path 
        d={d.d4}
        i-c="c f fr"
      />
      <path 
        d={d.d3}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfGitCommit: TheIconSelfPack = [
  'GitCommit',
  IconGitCommitStrokeRounded,
  IconGitCommitDuotoneRounded,
  IconGitCommitTwotoneRounded,
  IconGitCommitSolidRounded,
  IconGitCommitBulkRounded,
  IconGitCommitStrokeSharp,
  IconGitCommitSolidSharp,
];