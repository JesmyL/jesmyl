import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M18.4998 3.00195L15.0604 6.44129C14.4746 7.02708 14.4746 7.97683 15.0604 8.56261L15.7498 9.25195M21.9998 6.50195L18.5604 9.94129C17.9746 10.5271 17.0249 10.5271 16.4391 9.94129L15.7498 9.25195M15.7498 9.25195L3.99976 21.002',
  d2: 'M20 4.99902L17.5 7.49902',
  d3: 'M7.98914 8.99011C6.79472 10.1845 5.15674 10.4831 3.66377 8.99011C2.17075 7.49709 1.38801 4.77783 2.58243 3.58341C3.77685 2.38899 6.49611 3.17172 7.98914 4.66475C9.48211 6.15772 9.18356 7.79569 7.98914 8.99011ZM7.98914 8.99011L20 21.001',
  d4: 'M9.20542 2.39669C10.0923 2.13908 11.03 2.00098 12 2.00098C13.1517 2.00098 14.2579 2.19567 15.2876 2.55394M2.04937 11.001C2.01672 11.3299 2 11.6635 2 12.001C2 14.0328 2.60598 15.9231 3.64707 17.501M7.77267 21.0661C9.05671 21.6659 10.4892 22.001 12 22.001C13.5244 22.001 14.9691 21.6599 16.262 21.0499M20.3529 17.501C21.394 15.9231 22 14.0328 22 12.001C22 11.4228 21.9509 10.8561 21.8567 10.3048',
  d5: 'M22 12.002C22 17.5246 17.5229 22.002 12 22.002C6.47713 22.002 2 17.5246 2 12.002C2 10.5611 2.30473 9.19139 2.85327 7.95381C3.08714 8.33473 3.36084 8.68815 3.66377 8.99109C5.15674 10.4841 6.79472 10.1855 7.98914 8.99109C9.18356 7.79667 9.48211 6.1587 7.98914 4.66572C7.57934 4.25592 7.07715 3.89964 6.53947 3.62305C8.10938 2.59786 9.9851 2.00195 12 2.00195C14.1229 2.00195 16.0912 2.66343 17.7102 3.79152L15.0604 6.44129C14.4746 7.02708 14.4746 7.97683 15.0604 8.56261L16.4391 9.94129C17.0249 10.5271 17.9746 10.5271 18.5604 9.94129L20.9551 7.54661C21.6238 8.88816 22 10.4011 22 12.002Z',
  d6: 'M19.0303 2.47162C19.3232 2.76452 19.3232 3.23939 19.0303 3.53228L16.2803 6.28228C15.9488 6.61382 15.7352 6.82839 15.5871 7.00517C15.4454 7.17433 15.4119 7.25429 15.3995 7.29833C15.3619 7.43148 15.3619 7.57243 15.3995 7.70558C15.4119 7.74962 15.4454 7.82957 15.5871 7.99874C15.7352 8.17552 15.9488 8.39009 16.2803 8.72162C16.6119 9.05315 16.8264 9.26676 17.0032 9.41483C17.1724 9.55651 17.2523 9.59004 17.2964 9.60246C17.4295 9.64002 17.5705 9.64002 17.7036 9.60246C17.7477 9.59004 17.8276 9.55651 17.9968 9.41483C18.1736 9.26676 18.3881 9.05315 18.7197 8.72162L21.4697 5.97162C21.7626 5.67873 22.2374 5.67873 22.5303 5.97162C22.8232 6.26452 22.8232 6.73939 22.5303 7.03228L19.7582 9.80446C19.4551 10.1076 19.1937 10.369 18.9599 10.5648C18.7129 10.7717 18.4435 10.9523 18.1109 11.0461C17.7114 11.1588 17.2886 11.1588 16.8891 11.0461C16.5565 10.9523 16.2871 10.7717 16.0401 10.5648C15.9493 10.4887 15.8543 10.4028 15.7543 10.3083L4.53033 21.5323C4.23744 21.8252 3.76256 21.8252 3.46967 21.5323C3.17678 21.2394 3.17678 20.7645 3.46967 20.4716L14.6937 9.24763C14.5992 9.14766 14.5132 9.05268 14.4372 8.96189C14.2303 8.71486 14.0497 8.44546 13.9558 8.11284C13.8431 7.71338 13.8431 7.29053 13.9558 6.89107C14.0497 6.55844 14.2303 6.28905 14.4372 6.04202C14.6329 5.8083 14.8944 5.54689 15.1975 5.24383L17.9697 2.47162C18.2626 2.17873 18.7374 2.17873 19.0303 2.47162Z',
  d7: 'M20.5303 4.46869C20.8232 4.76159 20.8232 5.23646 20.5303 5.52935L18.0303 8.02935C17.7374 8.32225 17.2626 8.32225 16.9697 8.02935C16.6768 7.73646 16.6768 7.26159 16.9697 6.96869L19.4697 4.46869C19.7626 4.1758 20.2374 4.1758 20.5303 4.46869Z',
  d8: 'M5.34151 2.38552C6.48985 2.64895 7.66995 3.28515 8.51948 4.13467C9.38676 5.00195 9.79579 5.98219 9.74598 6.97714C9.70966 7.70262 9.43267 8.37116 9.00972 8.95028L20.5303 20.4709C20.8232 20.7638 20.8232 21.2387 20.5303 21.5316C20.2374 21.8245 19.7626 21.8245 19.4697 21.5316L7.94906 10.0109C7.36994 10.4339 6.7014 10.7109 5.97592 10.7472C4.98097 10.797 4.00073 10.388 3.13345 9.5207C2.28393 8.67117 1.64773 7.49107 1.3843 6.34273C1.12796 5.22527 1.18504 3.9204 2.05211 3.05333C2.91917 2.18626 4.22405 2.12918 5.34151 2.38552Z',
  d9: 'M7.87012 2.07381C9.1416 1.54432 10.5366 1.25195 11.9999 1.25195C13.5903 1.25195 15.1 1.59732 16.4582 2.21715L14.287 4.38834C14.0053 4.66998 13.7104 4.96478 13.4788 5.24135C13.2173 5.55353 12.9143 5.98073 12.7527 6.55364C12.5774 7.17503 12.5774 7.83279 12.7527 8.45417C12.8249 8.71018 12.9253 8.93709 13.0377 9.13764L12.0009 10.1745L10.5727 8.74634C10.8095 8.22649 10.9636 7.65441 10.9943 7.04041C11.065 5.62878 10.4712 4.3195 9.40328 3.25156C8.95303 2.80131 8.43075 2.40413 7.87012 2.07381Z',
  d10: 'M9.17243 13.0029L7.74427 11.5748C7.22441 11.8116 6.65234 11.9657 6.03834 11.9964C4.62671 12.0671 3.31743 11.4733 2.24948 10.4054C1.99046 10.1463 1.74899 9.86345 1.52771 9.56315C1.34596 10.3467 1.24988 11.1631 1.24988 12.002C1.24988 14.505 2.1054 16.8083 3.54 18.6354L9.17243 13.0029Z',
  d11: 'M14.8293 13.0029L15.8661 11.9661C16.0667 12.0784 16.2936 12.1789 16.5496 12.2511C17.171 12.4264 17.8288 12.4264 18.4501 12.2511C19.0231 12.0895 19.4503 11.7865 19.7624 11.525C20.039 11.2933 20.3337 10.9985 20.6154 10.7168L22.3267 9.00549C22.6022 9.95661 22.7499 10.962 22.7499 12.002C22.7499 14.5045 21.8947 16.8074 20.4606 18.6343L14.8293 13.0029Z',
  d12: 'M17.4433 21.2738L12.0009 15.8314L6.55766 21.2746C8.15393 22.2135 10.014 22.752 11.9999 22.752C13.9862 22.752 15.8468 22.2132 17.4433 21.2738Z',
  d13: 'M18.4998 3.00195L13.9998 7.50195L17.4998 11.002L21.9998 6.50195M15.7498 9.25195L3.99976 21.002',
  d14: 'M19.2995 3.12901L14.8638 7.56473L17.2683 9.96922L21.704 5.5335L22.7496 6.57901L17.2683 12.0602L15.5433 10.3352L3.96116 21.9174L2.91565 20.8719L14.4978 9.28973L12.7728 7.56473L18.254 2.0835L19.2995 3.12901Z',
  d15: 'M20.78 5.09824L17.2702 8.60804L16.2247 7.56253L19.7345 4.05273L20.78 5.09824Z',
  d16: 'M5.28466 2.52131C6.4166 2.78098 7.57985 3.40808 8.41724 4.24547C9.27213 5.10037 9.67532 6.0666 9.62622 7.04734C9.59042 7.76246 9.31739 8.42144 8.90048 8.9923L20.7793 20.8711L19.7338 21.9166L7.85497 10.0378C7.28412 10.4547 6.62513 10.7277 5.91001 10.7635C4.92928 10.8126 3.96304 10.4095 3.10814 9.55456C2.27076 8.71718 1.64365 7.55393 1.38398 6.42199C1.1313 5.32049 1.18757 4.03426 2.04225 3.17958C2.89693 2.3249 4.18316 2.26863 5.28466 2.52131Z',
  d17: 'M1.52469 9.5943C1.34524 10.3673 1.25037 11.1727 1.25037 12.0003C1.25037 14.4677 2.09377 16.7382 3.50804 18.5392L9.06101 12.9863L7.65391 11.5792C7.14149 11.8126 6.57758 11.9645 5.97236 11.9948C4.58089 12.0645 3.29031 11.4792 2.23762 10.4265C1.98172 10.1706 1.74321 9.89105 1.52469 9.5943Z',
  d18: 'M11.849 10.1982L10.4419 8.79115C10.6754 8.27872 10.8273 7.71482 10.8576 7.10959C10.9272 5.71812 10.3419 4.42754 9.28923 3.37485C8.8452 2.93083 8.3301 2.53915 7.77717 2.21346C9.03019 1.69182 10.4049 1.40381 11.8468 1.40381C13.4147 1.40381 14.903 1.74431 16.2419 2.35541L11.0305 7.56676L12.7555 9.29176L11.849 10.1982Z',
  d19: 'M14.6371 12.9863L20.1875 18.5367C21.6006 16.7361 22.4433 14.4666 22.4433 12.0003C22.4433 10.9754 22.2978 9.98445 22.0263 9.04705L17.2685 13.8048L15.5435 12.0798L14.6371 12.9863Z',
  d20: 'M17.2137 21.139L11.849 15.7743L6.48271 21.1406C8.0561 22.066 9.88948 22.5967 11.8468 22.5967C13.8053 22.5967 15.6397 22.0654 17.2137 21.139Z',
};

export const IconSpoonAndForkStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="spoon-and-fork-stroke-rounded IconSpoonAndForkStrokeRounded"
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
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSpoonAndForkDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="spoon-and-fork-duotone-rounded IconSpoonAndForkDuotoneRounded"
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
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSpoonAndForkTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="spoon-and-fork-twotone-rounded IconSpoonAndForkTwotoneRounded"
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
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSpoonAndForkSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="spoon-and-fork-solid-rounded IconSpoonAndForkSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconSpoonAndForkBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="spoon-and-fork-bulk-rounded IconSpoonAndForkBulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      </g>
    </TheIconWrapper>
  );
};

export const IconSpoonAndForkStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="spoon-and-fork-stroke-sharp IconSpoonAndForkStrokeSharp"
    >
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
    </TheIconWrapper>
  );
};

export const IconSpoonAndForkSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="spoon-and-fork-solid-sharp IconSpoonAndForkSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
      <path 
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

export const iconPackOfSpoonAndFork: TheIconSelfPack = {
  name: 'SpoonAndFork',
  StrokeRounded: IconSpoonAndForkStrokeRounded,
  DuotoneRounded: IconSpoonAndForkDuotoneRounded,
  TwotoneRounded: IconSpoonAndForkTwotoneRounded,
  SolidRounded: IconSpoonAndForkSolidRounded,
  BulkRounded: IconSpoonAndForkBulkRounded,
  StrokeSharp: IconSpoonAndForkStrokeSharp,
  SolidSharp: IconSpoonAndForkSolidSharp,
};