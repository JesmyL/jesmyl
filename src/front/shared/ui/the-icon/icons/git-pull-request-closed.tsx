import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M6 8L6 16',
  d2: 'M18 11L18 16',
  d3: 'M20 4L18 6M18 6L16 8M18 6L20 8M18 6L16 4',
  d4: 'M6 7C6.55228 7 7 7.44772 7 8L7 16C7 16.5523 6.55229 17 6 17C5.44772 17 5 16.5523 5 16L5 8C5 7.44772 5.44772 7 6 7Z',
  d5: 'M18 10C18.5523 10 19 10.4477 19 11L19 16C19 16.5523 18.5523 17 18 17C17.4477 17 17 16.5523 17 16L17 11C17 10.4477 17.4477 10 18 10Z',
  d6: 'M3.25 18C3.25 16.4812 4.48122 15.25 6 15.25C7.51878 15.25 8.75 16.4812 8.75 18C8.75 19.5188 7.51878 20.75 6 20.75C4.48122 20.75 3.25 19.5188 3.25 18Z',
  d7: 'M3.25 6C3.25 4.48122 4.48122 3.25 6 3.25C7.51878 3.25 8.75 4.48122 8.75 6C8.75 7.51878 7.51878 8.75 6 8.75C4.48122 8.75 3.25 7.51878 3.25 6Z',
  d8: 'M15.25 18C15.25 16.4812 16.4812 15.25 18 15.25C19.5188 15.25 20.75 16.4812 20.75 18C20.75 19.5188 19.5188 20.75 18 20.75C16.4812 20.75 15.25 19.5188 15.25 18Z',
  d9: 'M15.2929 3.29289C15.6834 2.90237 16.3166 2.90237 16.7071 3.29289L18 4.58579L19.2929 3.29289C19.6834 2.90237 20.3166 2.90237 20.7071 3.29289C21.0976 3.68342 21.0976 4.31658 20.7071 4.70711L19.4142 6L20.7071 7.29289C21.0976 7.68342 21.0976 8.31658 20.7071 8.70711C20.3166 9.09763 19.6834 9.09763 19.2929 8.70711L18 7.41421L16.7071 8.70711C16.3166 9.09763 15.6834 9.09763 15.2929 8.70711C14.9024 8.31658 14.9024 7.68342 15.2929 7.29289L16.5858 6L15.2929 4.70711C14.9024 4.31658 14.9024 3.68342 15.2929 3.29289Z',
  d10: 'M5 16L5 8L7 8L7 16L5 16Z',
  d11: 'M17 16L17 11L19 11L19 16L17 16Z',
  d12: 'M18.0428 7.37132L19.3357 8.66421L20.7499 7.25L19.457 5.95711L20.7499 4.66421L19.3357 3.25L18.0428 4.54289L16.7499 3.25L15.3357 4.66421L16.6286 5.95711L15.3357 7.25L16.7499 8.66421L18.0428 7.37132Z',
};

export const IconGitPullRequestClosedStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="GitPullRequestClosed StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
      <circle 
        cx="6"
        cy="18"
        r="2"
        i-c="s sw"
      />
      <circle 
        cx="6"
        cy="6"
        r="2"
        i-c="s sw"
      />
      <circle 
        cx="18"
        cy="18"
        r="2"
        i-c="s sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconGitPullRequestClosedDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="GitPullRequestClosed DuotoneRounded"
    >
      <circle 
        cx="6"
        cy="18"
        r="2"
        i-c="f o7"
      />
      <circle 
        cx="6"
        cy="6"
        r="2"
        i-c="f o7"
      />
      <circle 
        cx="18"
        cy="18"
        r="2"
        i-c="f o7"
      />
      <circle 
        cx="6"
        cy="18"
        r="2"
        i-c="s sw"
      />
      <circle 
        cx="6"
        cy="6"
        r="2"
        i-c="s sw"
      />
      <circle 
        cx="18"
        cy="18"
        r="2"
        i-c="s sw"
      />
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

export const IconGitPullRequestClosedTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="GitPullRequestClosed TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sj sr sw"
      />
      <circle 
        cx="6"
        cy="18"
        r="2"
        i-c="s sw"
      />
      <circle 
        cx="6"
        cy="6"
        r="2"
        i-c="s sw"
      />
      <circle 
        cx="18"
        cy="18"
        r="2"
        i-c="s sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconGitPullRequestClosedSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="GitPullRequestClosed SolidRounded"
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

export const IconGitPullRequestClosedBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="GitPullRequestClosed BulkRounded"
    >
      <path 
        d={d.d4}
        i-c="c f fr o7"
      />
      <path 
        d={d.d5}
        i-c="c f fr o7"
      />
      <path 
        d={d.d6}
        i-c="c f fr"
      />
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

export const IconGitPullRequestClosedStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="GitPullRequestClosed StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sj sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sw"
      />
      <circle 
        cx="6"
        cy="18"
        r="2"
        i-c="s sj sw"
      />
      <circle 
        cx="6"
        cy="6"
        r="2"
        i-c="s sj sw"
      />
      <circle 
        cx="18"
        cy="18"
        r="2"
        i-c="s sj sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconGitPullRequestClosedSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="GitPullRequestClosed SolidSharp"
    >
      <path 
        d={d.d10}
        i-c="c f fr"
      />
      <path 
        d={d.d11}
        i-c="c f fr"
      />
      <path 
        d={d.d6}
        i-c="f"
      />
      <path 
        d={d.d7}
        i-c="f"
      />
      <path 
        d={d.d8}
        i-c="f"
      />
      <path 
        d={d.d12}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfGitPullRequestClosed: TheIconSelfPack = [
  'GitPullRequestClosed',
  IconGitPullRequestClosedStrokeRounded,
  IconGitPullRequestClosedDuotoneRounded,
  IconGitPullRequestClosedTwotoneRounded,
  IconGitPullRequestClosedSolidRounded,
  IconGitPullRequestClosedBulkRounded,
  IconGitPullRequestClosedStrokeSharp,
  IconGitPullRequestClosedSolidSharp,
];