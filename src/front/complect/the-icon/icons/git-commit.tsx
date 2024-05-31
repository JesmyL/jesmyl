import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d = {
  d1: 'M12 3L12 8.5M12 21L12 15',
  d2: 'M12 2C12.5523 2 13 2.44772 13 3L13 8.5C13 9.05228 12.5523 9.5 12 9.5C11.4477 9.5 11 9.05228 11 8.5L11 3C11 2.44772 11.4477 2 12 2ZM12 14C12.5523 14 13 14.4477 13 15L13 21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21L11 15C11 14.4477 11.4477 14 12 14Z',
  d3: 'M8.25 12C8.25 9.92893 9.92893 8.25 12 8.25C14.0711 8.25 15.75 9.92893 15.75 12C15.75 14.0711 14.0711 15.75 12 15.75C9.92893 15.75 8.25 14.0711 8.25 12Z',
  d4: 'M11 8.5L11 3L13 3L13 8.5L11 8.5ZM11 21L11 15L13 15L13 21L11 21Z',
} as const;

export const IconGitCommitStrokeRounded = (props: TheIconProps) => {
  return (
    <TheIconWrapper
      {...props}
      name="git-commit-stroke-rounded IconGitCommitStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <circle 
        cx="12" 
        cy="12" 
        r="3" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconGitCommitDuotoneRounded = (props: TheIconProps) => {
  return (
    <TheIconWrapper
      {...props}
      name="git-commit-duotone-rounded IconGitCommitDuotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <circle 
        opacity="var(--icon-opacity)" 
        cx="12" 
        cy="12" 
        r="3" 
        fill="var(--icon-fill)"></circle>
      <circle 
        cx="12" 
        cy="12" 
        r="3" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconGitCommitTwotoneRounded = (props: TheIconProps) => {
  return (
    <TheIconWrapper
      {...props}
      name="git-commit-twotone-rounded IconGitCommitTwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <circle 
        cx="12" 
        cy="12" 
        r="3" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconGitCommitSolidRounded = (props: TheIconProps) => {
  return (
    <TheIconWrapper
      {...props}
      name="git-commit-solid-rounded IconGitCommitSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconGitCommitBulkRounded = (props: TheIconProps) => {
  return (
    <TheIconWrapper
      {...props}
      name="git-commit-bulk-rounded IconGitCommitBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconGitCommitStrokeSharp = (props: TheIconProps) => {
  return (
    <TheIconWrapper
      {...props}
      name="git-commit-stroke-sharp IconGitCommitStrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <circle 
        cx="12" 
        cy="12" 
        r="3" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
    </TheIconWrapper>
  );
};

export const IconGitCommitSolidSharp = (props: TheIconProps) => {
  return (
    <TheIconWrapper
      {...props}
      name="git-commit-solid-sharp IconGitCommitSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfGitCommit: TheIconSelfPack = {
  name: 'GitCommit',
  StrokeRounded: IconGitCommitStrokeRounded,
  DuotoneRounded: IconGitCommitDuotoneRounded,
  TwotoneRounded: IconGitCommitTwotoneRounded,
  SolidRounded: IconGitCommitSolidRounded,
  BulkRounded: IconGitCommitBulkRounded,
  StrokeSharp: IconGitCommitStrokeSharp,
  SolidSharp: IconGitCommitSolidSharp,
};