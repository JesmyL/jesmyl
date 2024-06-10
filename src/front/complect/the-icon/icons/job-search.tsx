import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M11.0065 21H9.60546C6.02021 21 4.22759 21 3.11379 19.865C2 18.7301 2 16.9034 2 13.25C2 9.59661 2 7.76992 3.11379 6.63496C4.22759 5.5 6.02021 5.5 9.60546 5.5H13.4082C16.9934 5.5 18.7861 5.5 19.8999 6.63496C20.7568 7.50819 20.9544 8.7909 21 11',
  d2: 'M20.0167 20.0233L21.9998 22M21.0528 17.5265C21.0528 15.5789 19.4739 14 17.5263 14C15.5786 14 13.9998 15.5789 13.9998 17.5265C13.9998 19.4742 15.5786 21.0531 17.5263 21.0531C19.4739 21.0531 21.0528 19.4742 21.0528 17.5265Z',
  d3: 'M15.9998 5.5L15.9004 5.19094C15.4054 3.65089 15.1579 2.88087 14.5686 2.44043C13.9794 2 13.1967 2 11.6313 2H11.3682C9.8028 2 9.02011 2 8.43087 2.44043C7.84162 2.88087 7.59411 3.65089 7.0991 5.19094L6.99976 5.5',
  d4: 'M9.60546 5.5H13.4082C16.9934 5.5 18.7861 5.5 19.8999 6.63496C20.7568 7.50819 20.9544 8.7909 21 11V13C21 14.4632 21 15.6425 20.9316 16.6064C20.5269 15.105 19.1556 14 17.5263 14C15.5786 14 13.9998 15.5789 13.9998 17.5265C13.9998 19.1556 15.1044 20.5267 16.6055 20.9316C15.6418 21 14.4627 21 13 21H9.60546C6.02021 21 4.22759 21 3.11379 19.865C2 18.7301 2 16.9034 2 13.25C2 9.59661 2 7.76992 3.11379 6.63496C4.22759 5.5 6.02021 5.5 9.60546 5.5Z',
  d5: 'M20.017 20.0233L22 22M21.0531 17.5265C21.0531 15.5789 19.4742 14 17.5265 14C15.5789 14 14 15.5789 14 17.5265C14 19.4742 15.5789 21.0531 17.5265 21.0531C19.4742 21.0531 21.0531 19.4742 21.0531 17.5265Z',
  d6: 'M11.5 1.25C12.202 1.24997 12.9887 1.24994 13.489 1.30636C14.0285 1.36718 14.5376 1.50167 15.0007 1.8313C15.4609 2.15886 15.7452 2.58653 15.9695 3.06267C16.1797 3.50911 16.3706 4.07486 16.5936 4.73559L16.704 5.06253C16.8653 5.5405 16.5892 6.05251 16.0873 6.20615C15.5855 6.35978 15.0478 6.09685 14.8865 5.61889C14.6437 4.89941 14.3894 4.15013 14.2277 3.80681C14.0751 3.48287 13.9601 3.36036 13.8578 3.28755C13.7584 3.21681 13.6129 3.15111 13.2646 3.11184C12.8898 3.06957 12.2699 3.06809 11.5 3.06809C10.7301 3.06809 10.1102 3.06957 9.73541 3.11184C9.38714 3.15111 9.24158 3.21681 9.1422 3.28755C9.03992 3.36036 8.9249 3.48287 8.77232 3.80681C8.61061 4.15013 8.35629 4.89941 8.11347 5.61889C7.95215 6.09685 7.41454 6.35978 6.91267 6.20615C6.4108 6.05251 6.13473 5.5405 6.29605 5.06253L6.40639 4.73559L6.40639 4.73558C6.62935 4.07485 6.82027 3.50911 7.03055 3.06267C7.25482 2.58653 7.53914 2.15886 7.9993 1.8313C8.46236 1.50167 8.97155 1.36718 9.51096 1.30636C10.0113 1.24994 10.798 1.24997 11.5 1.25Z',
  d7: 'M12.75 17.2765C12.75 14.7766 14.7766 12.75 17.2765 12.75C19.7765 12.75 21.8031 14.7766 21.8031 17.2765C21.8031 18.1656 21.5468 18.9947 21.104 19.6942L22.456 21.0418C22.8471 21.4317 22.8481 22.0648 22.4582 22.456C22.0683 22.8471 21.4352 22.8481 21.044 22.4582L19.6888 21.1074C18.9905 21.5481 18.1633 21.8031 17.2765 21.8031C14.7766 21.8031 12.75 19.7765 12.75 17.2765ZM17.2765 14.75C15.8812 14.75 14.75 15.8812 14.75 17.2765C14.75 18.6719 15.8812 19.8031 17.2765 19.8031C18.6719 19.8031 19.8031 18.6719 19.8031 17.2765C19.8031 15.8812 18.6719 14.75 17.2765 14.75Z',
  d8: 'M13.4653 4.75H9.54836C7.80421 4.74998 6.41746 4.74997 5.33103 4.89881C4.20972 5.05243 3.29737 5.37711 2.5785 6.10965C1.86155 6.84022 1.54553 7.76413 1.39567 8.89997C1.24997 10.0042 1.24999 11.5256 1.25 13.3053C1.24999 15.0851 1.24997 16.4958 1.39567 17.6C1.54553 18.7359 1.86155 19.6598 2.5785 20.3904C3.29737 21.1229 4.20972 21.4476 5.33103 21.6012C6.41745 21.75 7.80415 21.75 9.54827 21.75H13.2382C12.0173 20.6471 11.25 19.0514 11.25 17.2765C11.25 13.9482 13.9482 11.25 17.2765 11.25C19.0514 11.25 20.6471 12.0173 21.75 13.2382V10.9923L21.7498 10.9845C21.705 8.80913 21.5271 7.22233 20.4352 6.10965C19.7163 5.37711 18.8039 5.05243 17.6826 4.89881C16.5962 4.74997 15.2095 4.74998 13.4653 4.75Z',
  d9: 'M13.4896 1.30636C12.9893 1.24994 12.2026 1.24997 11.5006 1.25C10.7986 1.24997 10.0119 1.24994 9.51156 1.30636C8.97215 1.36718 8.46296 1.50167 7.9999 1.8313C7.53975 2.15886 7.25542 2.58653 7.03115 3.06267C6.82087 3.50911 6.62996 4.07485 6.40699 4.73558L6.38477 4.80145C6.98672 4.76671 7.6599 4.75542 8.41038 4.75176C8.54926 4.35488 8.67729 4.00985 8.77292 3.80681C8.92551 3.48287 9.04052 3.36036 9.14281 3.28755C9.24218 3.21681 9.38775 3.15111 9.73601 3.11184C10.1109 3.06957 10.7308 3.06809 11.5006 3.06809C12.2705 3.06809 12.8904 3.06957 13.2652 3.11184C13.6135 3.15111 13.759 3.21681 13.8584 3.28755C13.9607 3.36036 14.0757 3.48287 14.2283 3.80681C14.3239 4.00984 14.4519 4.35484 14.5908 4.75169C15.341 4.75526 16.0141 4.76632 16.6162 4.80065L16.5942 4.73559C16.3713 4.07486 16.1803 3.50911 15.9701 3.06267C15.7458 2.58653 15.4615 2.15886 15.0013 1.8313C14.5382 1.50167 14.0291 1.36718 13.4896 1.30636Z',
  d10: 'M21 12V5.5H2V21H12',
  d11: 'M16 5.5L15 2H8L7 5.5',
  d12: 'M7.24147 1.90931C7.35855 1.51906 7.73308 1.25 8.15925 1.25H14.8408C15.2669 1.25 15.6415 1.51906 15.7585 1.90931L16.713 5.09098C16.8579 5.57372 16.5643 6.07686 16.0575 6.21479C15.5506 6.35271 15.0223 6.07319 14.8775 5.59045L14.1208 3.0681H8.87923L8.12252 5.59045C7.9777 6.07319 7.4494 6.35271 6.94253 6.21479C6.43565 6.07686 6.14215 5.57372 6.28697 5.09098L7.24147 1.90931Z',
  d13: 'M13.0449 17.5675C13.0449 15.0676 15.0715 13.041 17.5715 13.041C20.0714 13.041 22.098 15.0676 22.098 17.5675C22.098 18.4566 21.8417 19.2857 21.399 19.9852L22.7509 21.3328L21.3389 22.7493L19.9838 21.3984C19.2854 21.8391 18.4582 22.0941 17.5715 22.0941C15.0715 22.0941 13.0449 20.0675 13.0449 17.5675ZM17.5715 15.041C16.1761 15.041 15.0449 16.1722 15.0449 17.5675C15.0449 18.9629 16.1761 20.0941 17.5715 20.0941C18.9668 20.0941 20.098 18.9629 20.098 17.5675C20.098 16.1722 18.9668 15.041 17.5715 15.041Z',
  d14: 'M2 4.75C1.58579 4.75 1.25 5.08579 1.25 5.5V21C1.25 21.4142 1.58579 21.75 2 21.75H13.2318C12.1873 20.6663 11.5449 19.1923 11.5449 17.5683C11.5449 14.2399 14.2431 11.5417 17.5715 11.5417C19.1939 11.5417 20.6666 12.1829 21.75 13.2256V5.5C21.75 5.08579 21.4142 4.75 21 4.75H2Z',
};

export const IconJobSearchStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="job-search-stroke-rounded IconJobSearchStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconJobSearchDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="job-search-duotone-rounded IconJobSearchDuotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconJobSearchTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="job-search-twotone-rounded IconJobSearchTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconJobSearchSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="job-search-solid-rounded IconJobSearchSolidRounded"
    >
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconJobSearchBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="job-search-bulk-rounded IconJobSearchBulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconJobSearchStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="job-search-stroke-sharp IconJobSearchStrokeSharp"
    >
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconJobSearchSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="job-search-solid-sharp IconJobSearchSolidSharp"
    >
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
      <path 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfJobSearch: TheIconSelfPack = {
  name: 'JobSearch',
  StrokeRounded: IconJobSearchStrokeRounded,
  DuotoneRounded: IconJobSearchDuotoneRounded,
  TwotoneRounded: IconJobSearchTwotoneRounded,
  SolidRounded: IconJobSearchSolidRounded,
  BulkRounded: IconJobSearchBulkRounded,
  StrokeSharp: IconJobSearchStrokeSharp,
  SolidSharp: IconJobSearchSolidSharp,
};