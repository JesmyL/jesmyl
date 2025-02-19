import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M13 22H6.59087C5.04549 22 3.81631 21.248 2.71266 20.1966C0.453365 18.0441 4.1628 16.324 5.57757 15.4816C7.53058 14.3187 9.7927 13.8404 12 14.0466',
  d2: 'M15.5 6.5C15.5 8.98528 13.4853 11 11 11C8.51472 11 6.5 8.98528 6.5 6.5C6.5 4.01472 8.51472 2 11 2C13.4853 2 15.5 4.01472 15.5 6.5Z',
  d3: 'M15.015 15.3866C16.0876 14.7469 17.0238 15.0047 17.5863 15.4153C17.8169 15.5837 17.9322 15.6679 18 15.6679C18.0678 15.6679 18.1831 15.5837 18.4137 15.4153C18.9762 15.0047 19.9124 14.7469 20.985 15.3866C22.3928 16.2261 22.7113 18.9958 19.4642 21.3324C18.8457 21.7775 18.5365 22 18 22C17.4635 22 17.1543 21.7775 16.5358 21.3324C13.2887 18.9958 13.6072 16.2261 15.015 15.3866Z',
  d4: 'M5.09548 15.7585C5.27346 15.6578 5.43686 15.5654 5.57757 15.4816C8.65775 13.6475 12.5068 13.5163 15.6971 15.0878C15.4779 15.1496 15.2497 15.2466 15.015 15.3866C13.6072 16.2261 13.2887 18.9958 16.5358 21.3324C16.7358 21.4763 16.9034 21.5969 17.0569 21.6943C16.5469 21.8896 16.0012 22 15.4091 22H6.59087C5.04549 22 3.81631 21.248 2.71266 20.1966C0.678069 18.2582 3.48398 16.6704 5.09548 15.7585Z',
  d5: 'M14.6305 14.7427C15.9798 13.9381 17.2268 14.2397 17.9996 14.7893C18.7725 14.2397 20.0195 13.9381 21.3688 14.7427C22.3751 15.3429 22.8968 16.5671 22.7128 17.9009C22.5274 19.2448 21.645 20.6871 19.9019 21.9415L19.8279 21.9948C19.2739 22.3945 18.7809 22.7503 17.9996 22.7503C17.2183 22.7503 16.7253 22.3945 16.1714 21.9948L16.0974 21.9415C14.3543 20.6871 13.4719 19.2448 13.2865 17.9009C13.1025 16.5671 13.6241 15.3429 14.6305 14.7427Z',
  d6: 'M5.75035 6.5C5.75035 3.6005 8.10086 1.25 11.0004 1.25C13.8998 1.25 16.2504 3.6005 16.2504 6.5C16.2504 9.39949 13.8998 11.75 11.0004 11.75C8.10086 11.75 5.75035 9.39949 5.75035 6.5Z',
  d7: 'M12.8598 14.2886C13.1223 13.9883 13.2535 13.8382 13.2611 13.7387C13.2683 13.644 13.2408 13.57 13.1735 13.5031C13.1027 13.4327 12.9368 13.4093 12.6049 13.3625C11.5411 13.2125 10.4593 13.2125 9.39543 13.3625C7.93096 13.5691 6.49889 14.0602 5.19404 14.8372C5.07775 14.9064 4.93412 14.9874 4.7715 15.0792C4.05869 15.4813 2.98106 16.0893 2.2429 16.8118C1.78123 17.2637 1.34257 17.8592 1.26283 18.5888C1.17802 19.3646 1.51649 20.0927 2.1955 20.7396C3.36695 21.8556 4.77274 22.75 6.59104 22.75H12.9967C13.6794 22.75 14.0207 22.75 14.1007 22.5744C14.1807 22.3988 13.9437 22.1261 13.4695 21.5806C12.5367 20.5074 11.9679 19.3236 11.7998 18.1054C11.609 16.7223 11.9672 15.3094 12.8598 14.2886Z',
  d8: 'M11 1.25C8.1005 1.25 5.75 3.6005 5.75 6.5C5.75 9.39949 8.1005 11.75 11 11.75C13.8995 11.75 16.25 9.39949 16.25 6.5C16.25 3.6005 13.8995 1.25 11 1.25Z',
  d9: 'M13.2611 13.7387C13.2535 13.8382 13.1223 13.9883 12.8598 14.2886C11.9672 15.3094 11.609 16.7223 11.7998 18.1054C11.9679 19.3236 12.5367 20.5074 13.4695 21.5806C13.9437 22.1261 14.1807 22.3988 14.1007 22.5744C14.0207 22.75 13.6794 22.75 12.9967 22.75H6.59104C4.77274 22.75 3.36695 21.8556 2.1955 20.7396C1.51649 20.0927 1.17802 19.3646 1.26283 18.5888C1.34257 17.8592 1.78123 17.2637 2.2429 16.8118C2.98106 16.0893 4.05869 15.4813 4.7715 15.0792C4.93407 14.9875 5.07778 14.9064 5.19404 14.8372C6.49889 14.0602 7.93096 13.5691 9.39543 13.3625C10.4593 13.2125 11.5411 13.2125 12.6049 13.3625C12.9368 13.4093 13.1027 13.4327 13.1735 13.5031C13.2408 13.57 13.2683 13.644 13.2611 13.7387Z',
  d10: 'M12 20H2C2 16.134 5.58172 13 10 13C10.6906 13 11.3608 13.0766 12 13.2205M14 6C14 8.20914 12.2091 10 10 10C7.79086 10 6 8.20914 6 6C6 3.79086 7.79086 2 10 2C12.2091 2 14 3.79086 14 6Z',
  d11: 'M20.7431 15.2896C19.1465 14.457 18 15.6843 18 15.6843C18 15.6843 16.8535 14.457 15.2568 15.2896C13.323 16.298 13.1841 20.2469 18 22C22.816 20.2469 22.677 16.298 20.7431 15.2896Z',
  d12: 'M17.5157 14.4812C17.7008 14.558 17.863 14.6458 17.9999 14.7317C18.1368 14.6458 18.2989 14.558 18.484 14.4812C19.1367 14.2106 20.0596 14.0883 21.0898 14.6225C22.422 15.3132 23.0217 16.93 22.6312 18.5193C22.2319 20.1443 20.8372 21.723 18.2564 22.6571L17.9999 22.75L17.7433 22.6571C15.1626 21.723 13.7678 20.1443 13.3685 18.5193C12.978 16.93 13.5777 15.3132 14.9099 14.6225C15.9401 14.0883 16.863 14.2106 17.5157 14.4812Z',
  d13: 'M5.25098 6C5.25098 3.37665 7.37762 1.25 10.001 1.25C12.6243 1.25 14.751 3.37665 14.751 6C14.751 8.62335 12.6243 10.75 10.001 10.75C7.37762 10.75 5.25098 8.62335 5.25098 6Z',
  d14: 'M1.25098 20C1.25098 15.6289 5.26569 12.25 10.001 12.25C11.55 12.25 13.0219 12.6116 14.3014 13.2512C14.2731 13.2653 14.2448 13.2797 14.2164 13.2945C12.1486 14.3727 11.3925 16.7756 11.9114 18.8995C12.0698 19.5481 12.3374 20.1691 12.7086 20.75H1.25098V20Z',
};

export const IconUserLove01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-love-01-stroke-rounded IconUserLove01StrokeRounded"
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
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconUserLove01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-love-01-duotone-rounded IconUserLove01DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
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
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconUserLove01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-love-01-twotone-rounded IconUserLove01TwotoneRounded"
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
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconUserLove01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-love-01-solid-rounded IconUserLove01SolidRounded"
    >
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconUserLove01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-love-01-bulk-rounded IconUserLove01BulkRounded"
    >
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      </g>
    </TheIconWrapper>
  );
};

export const IconUserLove01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-love-01-stroke-sharp IconUserLove01StrokeSharp"
    >
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconUserLove01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-love-01-solid-sharp IconUserLove01SolidSharp"
    >
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
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

export const iconPackOfUserLove01: TheIconSelfPack = {
  name: 'UserLove01',
  StrokeRounded: IconUserLove01StrokeRounded,
  DuotoneRounded: IconUserLove01DuotoneRounded,
  TwotoneRounded: IconUserLove01TwotoneRounded,
  SolidRounded: IconUserLove01SolidRounded,
  BulkRounded: IconUserLove01BulkRounded,
  StrokeSharp: IconUserLove01StrokeSharp,
  SolidSharp: IconUserLove01SolidSharp,
};