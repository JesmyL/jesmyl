import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M6 8L6 16',
  d2: 'M18 16V12C18 9.17157 18 7.75736 17.1213 6.87868C16.2426 6 14.8284 6 12 6L11 6M11 6C11 5.29977 12.9943 3.99153 13.5 3.5M11 6C11 6.70023 12.9943 8.00847 13.5 8.5',
  d3: 'M6 8.13647V16.3791',
  d4: 'M6 20.5005C7.10457 20.5005 8 19.5779 8 18.4398C8 17.3017 7.10457 16.3792 6 16.3792C4.89543 16.3792 4 17.3017 4 18.4398C4 19.5779 4.89543 20.5005 6 20.5005Z',
  d5: 'M6 8.13647C7.10457 8.13647 8 7.21388 8 6.0758C8 4.93773 7.10457 4.01514 6 4.01514C4.89543 4.01514 4 4.93773 4 6.0758C4 7.21388 4.89543 8.13647 6 8.13647Z',
  d6: 'M18 16.3792V12.2578C18 9.3436 18 7.8865 17.1213 6.98116C16.2426 6.07583 14.8284 6.07583 12 6.07583H11M11 6.07583C11 5.35436 12.9943 4.00644 13.5 3.5M11 6.07583C11 6.7973 12.9943 8.14522 13.5 8.65166',
  d7: 'M18 20.5005C19.1046 20.5005 20 19.5779 20 18.4398C20 17.3017 19.1046 16.3792 18 16.3792C16.8954 16.3792 16 17.3017 16 18.4398C16 19.5779 16.8954 20.5005 18 20.5005Z',
  d8: 'M6 7C6.55228 7 7 7.44772 7 8L7 16C7 16.5523 6.55229 17 6 17C5.44772 17 5 16.5523 5 16L5 8C5 7.44772 5.44772 7 6 7Z',
  d9: 'M14.5 7.04186C14.741 7.05631 14.9592 7.07598 15.1581 7.10273C15.8642 7.19765 16.1912 7.36502 16.4138 7.58759C16.6363 7.81016 16.8037 8.13719 16.8986 8.84324C16.9974 9.57806 16.9995 10.5593 16.9995 12.0018V18.0018C16.9995 18.5541 17.4473 19.0018 17.9995 19.0018C18.5518 19.0018 18.9995 18.5541 18.9995 18.0018L18.9995 11.9312C18.9996 10.5771 18.9996 9.4605 18.8808 8.57674C18.756 7.64891 18.4841 6.82949 17.828 6.17338C17.1719 5.51727 16.3524 5.2453 15.4246 5.12056C15.1415 5.0825 14.833 5.05664 14.5 5.03906L14.5 7.04186Z',
  d10: 'M14.5 4.4116C14.5001 4.23596 14.5003 4.02031 14.4782 3.84387L14.4778 3.84053C14.462 3.71408 14.3902 3.13804 13.8246 2.86368C13.2578 2.58872 12.7576 2.89065 12.6494 2.95597L12.181 3.29511C11.8051 3.58975 11.2907 3.99545 10.8997 4.37588C10.7046 4.56571 10.5033 4.78297 10.3445 5.01388C10.2033 5.21914 10 5.56933 10 6C10 6.43067 10.2033 6.78086 10.3445 6.98612C10.5033 7.21703 10.7046 7.43429 10.8997 7.62412C11.2907 8.00455 11.8051 8.41025 12.1809 8.70488L12.6494 9.04403C12.7576 9.10935 13.2578 9.41128 13.8246 9.13632C14.3902 8.86196 14.462 8.28592 14.4778 8.15947L14.4782 8.15613C14.5003 7.97969 14.5001 7.76403 14.5 7.5884L14.5 4.4116Z',
  d11: 'M3.25 18C3.25 16.4812 4.48122 15.25 6 15.25C7.51878 15.25 8.75 16.4812 8.75 18C8.75 19.5188 7.51878 20.75 6 20.75C4.48122 20.75 3.25 19.5188 3.25 18Z',
  d12: 'M3.25 6C3.25 4.48122 4.48122 3.25 6 3.25C7.51878 3.25 8.75 4.48122 8.75 6C8.75 7.51878 7.51878 8.75 6 8.75C4.48122 8.75 3.25 7.51878 3.25 6Z',
  d13: 'M15.25 18C15.25 16.4812 16.4812 15.25 18 15.25C19.5188 15.25 20.75 16.4812 20.75 18C20.75 19.5188 19.5188 20.75 18 20.75C16.4812 20.75 15.25 19.5188 15.25 18Z',
  d14: 'M6 8.25L6 16.25',
  d15: 'M18 16.25V6.25H11.5748M13.5 3.75L11 6.25L13.5 8.75',
  d16: 'M5 16.2286L5 8.22864L7 8.22864L7 16.2286L5 16.2286Z',
  d17: 'M13.4142 7.22859L14.2071 8.02148L12.7929 9.4357L10.2929 6.9357C9.90237 6.54517 9.90237 5.91201 10.2929 5.52148L12.7929 3.02148L14.2071 4.4357L13.4142 5.22859H18C18.5523 5.22859 19 5.67631 19 6.22859V16.2286H17V7.22859H13.4142Z',
  d18: 'M3.25 18.2286C3.25 16.7099 4.48122 15.4786 6 15.4786C7.51878 15.4786 8.75 16.7099 8.75 18.2286C8.75 19.7474 7.51878 20.9786 6 20.9786C4.48122 20.9786 3.25 19.7474 3.25 18.2286Z',
  d19: 'M3.25 6.22864C3.25 4.70985 4.48122 3.47864 6 3.47864C7.51878 3.47864 8.75 4.70985 8.75 6.22864C8.75 7.74742 7.51878 8.97864 6 8.97864C4.48122 8.97864 3.25 7.74742 3.25 6.22864Z',
  d20: 'M15.25 18.2286C15.25 16.7099 16.4812 15.4786 18 15.4786C19.5188 15.4786 20.75 16.7099 20.75 18.2286C20.75 19.7474 19.5188 20.9786 18 20.9786C16.4812 20.9786 15.25 19.7474 15.25 18.2286Z',
};

export const IconGitPullRequestStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="git-pull-request-stroke-rounded IconGitPullRequestStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <circle 
        cx="6" 
        cy="18" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="6" 
        cy="6" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="18" 
        cy="18" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconGitPullRequestDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="git-pull-request-duotone-rounded IconGitPullRequestDuotoneRounded"
    >
      <circle 
        opacity="var(--icon-opacity)" 
        cx="6" 
        cy="18" 
        r="2" 
        fill="var(--icon-fill)"></circle>
      <circle 
        opacity="var(--icon-opacity)" 
        cx="6" 
        cy="6" 
        r="2" 
        fill="var(--icon-fill)"></circle>
      <circle 
        opacity="var(--icon-opacity)" 
        cx="18" 
        cy="18" 
        r="2" 
        fill="var(--icon-fill)"></circle>
      <circle 
        cx="6" 
        cy="18" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="6" 
        cy="6" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="18" 
        cy="18" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconGitPullRequestTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="git-pull-request-twotone-rounded IconGitPullRequestTwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconGitPullRequestSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="git-pull-request-solid-rounded IconGitPullRequestSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconGitPullRequestBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="git-pull-request-bulk-rounded IconGitPullRequestBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconGitPullRequestStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="git-pull-request-stroke-sharp IconGitPullRequestStrokeSharp"
    >
      <path 
        d={d.d14} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d15} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <circle 
        cx="6" 
        cy="18.25" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="6" 
        cy="6.25" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="18" 
        cy="18.25" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
    </TheIconWrapper>
  );
};

export const IconGitPullRequestSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="git-pull-request-solid-sharp IconGitPullRequestSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d20} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfGitPullRequest: TheIconSelfPack = {
  name: 'GitPullRequest',
  StrokeRounded: IconGitPullRequestStrokeRounded,
  DuotoneRounded: IconGitPullRequestDuotoneRounded,
  TwotoneRounded: IconGitPullRequestTwotoneRounded,
  SolidRounded: IconGitPullRequestSolidRounded,
  BulkRounded: IconGitPullRequestBulkRounded,
  StrokeSharp: IconGitPullRequestStrokeSharp,
  SolidSharp: IconGitPullRequestSolidSharp,
};