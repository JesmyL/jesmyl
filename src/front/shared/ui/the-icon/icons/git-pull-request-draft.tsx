import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M6 8L6 16',
  d2: 'M18 11H18.009M18 6H18.009',
  d3: 'M6 7C6.55228 7 7 7.44772 7 8L7 16C7 16.5523 6.55229 17 6 17C5.44772 17 5 16.5523 5 16L5 8C5 7.44772 5.44772 7 6 7Z',
  d4: 'M3.25 18C3.25 16.4812 4.48122 15.25 6 15.25C7.51878 15.25 8.75 16.4812 8.75 18C8.75 19.5188 7.51878 20.75 6 20.75C4.48122 20.75 3.25 19.5188 3.25 18Z',
  d5: 'M3.25 6C3.25 4.48122 4.48122 3.25 6 3.25C7.51878 3.25 8.75 4.48122 8.75 6C8.75 7.51878 7.51878 8.75 6 8.75C4.48122 8.75 3.25 7.51878 3.25 6Z',
  d6: 'M15.25 18C15.25 16.4812 16.4812 15.25 18 15.25C19.5188 15.25 20.75 16.4812 20.75 18C20.75 19.5188 19.5188 20.75 18 20.75C16.4812 20.75 15.25 19.5188 15.25 18Z',
  d7: 'M16.5 6C16.5 5.17157 17.1716 4.5 18 4.5H18.009C18.8374 4.5 19.509 5.17157 19.509 6C19.509 6.82843 18.8374 7.5 18.009 7.5H18C17.1716 7.5 16.5 6.82843 16.5 6ZM16.5 11C16.5 10.1716 17.1716 9.5 18 9.5H18.009C18.8374 9.5 19.509 10.1716 19.509 11C19.509 11.8284 18.8374 12.5 18.009 12.5H18C17.1716 12.5 16.5 11.8284 16.5 11Z',
  d8: 'M5 16L5 8L7 8L7 16L5 16Z',
  d9: 'M17 5H19.009V7H17V5ZM17 10H19.009V12H17V10Z',
};

export const IconGitPullRequestDraftStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="GitPullRequestDraft StrokeRounded"
    >
      <path 
        d={d.d1}
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
        d={d.d2}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconGitPullRequestDraftDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="GitPullRequestDraft DuotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconGitPullRequestDraftTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="GitPullRequestDraft TwotoneRounded"
    >
      <path 
        d={d.d1}
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
        d={d.d2}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconGitPullRequestDraftSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="GitPullRequestDraft SolidRounded"
    >
      <path 
        d={d.d3}
        i-c="c f fr"
      />
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
    </TheIconWrapper>
  );
};

export const IconGitPullRequestDraftBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="GitPullRequestDraft BulkRounded"
    >
      <path 
        d={d.d3}
        i-c="c f fr o7"
      />
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
    </TheIconWrapper>
  );
};

export const IconGitPullRequestDraftStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="GitPullRequestDraft StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sj sw"
      />
      <circle 
        cx="6"
        cy="18"
        r="2"
        i-c="s sj ss sw"
      />
      <circle 
        cx="6"
        cy="6"
        r="2"
        i-c="s sj ss sw"
      />
      <circle 
        cx="18"
        cy="18"
        r="2"
        i-c="s sj ss sw"
      />
      <path 
        d={d.d2}
        i-c="s sj ss sw"
      />
    </TheIconWrapper>
  );
};

export const IconGitPullRequestDraftSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="GitPullRequestDraft SolidSharp"
    >
      <path 
        d={d.d8}
        i-c="c f fr"
      />
      <path 
        d={d.d4}
        i-c="f"
      />
      <path 
        d={d.d5}
        i-c="f"
      />
      <path 
        d={d.d6}
        i-c="f"
      />
      <path 
        d={d.d9}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfGitPullRequestDraft: TheIconSelfPack = [
  'GitPullRequestDraft',
  IconGitPullRequestDraftStrokeRounded,
  IconGitPullRequestDraftDuotoneRounded,
  IconGitPullRequestDraftTwotoneRounded,
  IconGitPullRequestDraftSolidRounded,
  IconGitPullRequestDraftBulkRounded,
  IconGitPullRequestDraftStrokeSharp,
  IconGitPullRequestDraftSolidSharp,
];