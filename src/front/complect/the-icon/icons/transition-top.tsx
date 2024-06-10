import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M18 22C19.4001 22 20.1002 22 20.635 21.7275C21.1054 21.4878 21.4878 21.1054 21.7275 20.635C22 20.1002 22 19.4001 22 18C22 16.5999 22 15.8998 21.7275 15.365C21.4878 14.8946 21.1054 14.5122 20.635 14.2725C20.1002 14 19.4001 14 18 14L6 14C4.59987 14 3.8998 14 3.36502 14.2725C2.89462 14.5122 2.51217 14.8946 2.27248 15.365C2 15.8998 2 16.5999 2 18C2 19.4001 2 20.1002 2.27248 20.635C2.51217 21.1054 2.89462 21.4878 3.36502 21.7275C3.8998 22 4.59987 22 6 22L18 22Z',
  d2: 'M12 6L12 14M12 6C11.2998 6 9.99153 7.9943 9.5 8.5M12 6C12.7002 6 14.0085 7.9943 14.5 8.5',
  d3: 'M2 8C2 5.66111 2 4.49167 2.53646 3.63789C2.81621 3.19267 3.19267 2.81621 3.63789 2.53646C4.49167 2 5.66111 2 8 2L16 2C18.3389 2 19.5083 2 20.3621 2.53647C20.8073 2.81621 21.1838 3.19267 21.4635 3.63789C22 4.49167 22 5.66111 22 8',
  d4: 'M22.75 17.9686C22.75 17.2952 22.75 16.7445 22.7134 16.2969C22.6756 15.8337 22.5949 15.4153 22.3958 15.0245C22.0842 14.413 21.587 13.9158 20.9755 13.6042C20.5847 13.4051 20.1663 13.3244 19.7031 13.2866C19.2555 13.25 18.7048 13.25 18.0315 13.25L18.0314 13.25L5.96857 13.25L5.96853 13.25C5.29518 13.25 4.74448 13.25 4.29693 13.2865C3.83367 13.3244 3.41527 13.4051 3.02453 13.6042C2.41301 13.9158 1.91582 14.413 1.60423 15.0245C1.40514 15.4153 1.3244 15.8337 1.28655 16.2969C1.24999 16.7445 1.24999 17.2952 1.25 17.9686L1.25 18.0314C1.24999 18.7048 1.24998 19.2555 1.28655 19.7031C1.3244 20.1663 1.40514 20.5847 1.60423 20.9755C1.91582 21.587 2.41301 22.0842 3.02453 22.3958C3.41527 22.5949 3.83367 22.6756 4.29693 22.7134C4.7445 22.75 5.2952 22.75 5.96858 22.75L18.0314 22.75L18.0314 22.75C18.7048 22.75 19.2555 22.75 19.7031 22.7134C20.1663 22.6756 20.5847 22.5949 20.9755 22.3958C21.587 22.0842 22.0842 21.587 22.3958 20.9755C22.5949 20.5847 22.6756 20.1663 22.7134 19.7031C22.75 19.2555 22.75 18.7048 22.75 18.0314L22.75 18.0314L22.75 17.9686L22.75 17.9686Z',
  d5: 'M20.6876 5.60856C20.7489 6.24053 20.75 7.06078 20.75 8.25C20.75 8.80228 21.1977 9.25 21.75 9.25C22.3023 9.25 22.75 8.80228 22.75 8.25L22.75 8.19953L22.75 8.19951C22.75 7.07296 22.75 6.15539 22.6783 5.4155C22.604 4.64919 22.4453 3.96871 22.0603 3.35586C21.7006 2.78344 21.2166 2.29942 20.6441 1.93974C20.0313 1.55466 19.3508 1.39605 18.5845 1.32173C17.8446 1.24997 16.927 1.24998 15.8005 1.25L8.19952 1.25C7.07296 1.24998 6.1554 1.24997 5.4155 1.32173C4.64919 1.39605 3.96871 1.55466 3.35586 1.93974C2.78344 2.29941 2.29942 2.78344 1.93974 3.35585C1.55466 3.96871 1.39605 4.64919 1.32173 5.4155C1.24997 6.15538 1.24998 7.07294 1.25 8.19948L1.25 8.19952L1.25 8.25C1.25 8.80228 1.69772 9.25 2.25 9.25C2.80228 9.25 3.25 8.80228 3.25 8.25C3.25 7.06078 3.2511 6.24053 3.31239 5.60856C3.37219 4.99197 3.4818 4.66085 3.63319 4.41992C3.83301 4.10191 4.10191 3.83301 4.41992 3.63319C4.66085 3.4818 4.99198 3.37219 5.60856 3.31239C6.24053 3.2511 7.06078 3.25 8.25 3.25L15.75 3.25C16.9392 3.25 17.7595 3.2511 18.3914 3.31239C19.008 3.37219 19.3392 3.4818 19.5801 3.63319C19.8981 3.83301 20.167 4.10191 20.3668 4.41992C20.5182 4.66085 20.6278 4.99197 20.6876 5.60856Z',
  d6: 'M12 15C12.5523 15 13 14.5523 13 14L13 8.99993L13.8038 8.99993L13.8225 8.99996C13.8927 9.00012 14.0179 9.0004 14.1271 8.98635L14.1308 8.98589C14.2097 8.97588 14.6792 8.91634 14.9057 8.44567C15.1332 7.97289 14.8828 7.56722 14.8424 7.50177L14.8401 7.49803C14.7828 7.40444 14.7043 7.30685 14.6592 7.25087L14.6592 7.25086L14.6472 7.23598C14.5907 7.16547 14.5261 7.0832 14.4554 6.99326C14.2215 6.69554 13.9211 6.31325 13.6287 5.99144C13.4361 5.7794 13.2167 5.5589 12.9884 5.38506C12.7951 5.23785 12.44 5 12 5C11.56 5 11.2049 5.23785 11.0116 5.38506C10.7834 5.55889 10.5639 5.7794 10.3713 5.99144C10.0789 6.31325 9.77851 6.69553 9.54457 6.99326C9.47388 7.08322 9.40926 7.16546 9.35276 7.23598L9.3408 7.25086C9.29575 7.30685 9.21722 7.40444 9.1599 7.49803L9.15759 7.50177C9.1172 7.56722 8.86682 7.97289 9.0943 8.44567C9.32077 8.91634 9.79033 8.97588 9.86923 8.98589L9.87285 8.98635C9.98207 9.0004 10.1073 9.00012 10.1775 8.99996L10.1962 8.99993L11 8.99993L11 14C11 14.5523 11.4477 15 12 15Z',
  d7: 'M1.99902 14L21.999 14V22L1.99902 22L1.99902 14Z',
  d8: 'M1.99951 10L1.99951 2L21.9995 2V10',
  d9: 'M11.9995 14L11.9995 6.2068M14.4995 8.5L11.9995 6L9.49951 8.5',
  d10: 'M22.002 22.75C22.4162 22.75 22.752 22.4142 22.752 22V14C22.752 13.5858 22.4162 13.25 22.002 13.25L2.00195 13.25C1.58774 13.25 1.25195 13.5858 1.25195 14L1.25195 22C1.25195 22.4142 1.58774 22.75 2.00195 22.75L22.002 22.75Z',
  d11: 'M20.7974 3.13889V9.75H22.752V2.19445C22.752 1.67284 22.3144 1.25 21.7747 1.25L2.22923 1.25C1.68949 1.25 1.25195 1.67284 1.25195 2.19444L1.25195 9.75H3.2065L3.2065 3.13889L20.7974 3.13889Z',
  d12: 'M15.2091 7.79304L12.002 4.58594L8.79492 7.79304L10.2091 9.20726L11.002 8.41436L11.002 14.0002H13.002L13.002 8.41436L13.7949 9.20726L15.2091 7.79304Z',
};

export const IconTransitionTopStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="transition-top-stroke-rounded IconTransitionTopStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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
    </TheIconWrapper>
  );
};

export const IconTransitionTopDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="transition-top-duotone-rounded IconTransitionTopDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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
    </TheIconWrapper>
  );
};

export const IconTransitionTopTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="transition-top-twotone-rounded IconTransitionTopTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
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

export const IconTransitionTopSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="transition-top-solid-rounded IconTransitionTopSolidRounded"
    >
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconTransitionTopBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="transition-top-bulk-rounded IconTransitionTopBulkRounded"
    >
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconTransitionTopStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="transition-top-stroke-sharp IconTransitionTopStrokeSharp"
    >
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconTransitionTopSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="transition-top-solid-sharp IconTransitionTopSolidSharp"
    >
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
    </TheIconWrapper>
  );
};

export const iconPackOfTransitionTop: TheIconSelfPack = {
  name: 'TransitionTop',
  StrokeRounded: IconTransitionTopStrokeRounded,
  DuotoneRounded: IconTransitionTopDuotoneRounded,
  TwotoneRounded: IconTransitionTopTwotoneRounded,
  SolidRounded: IconTransitionTopSolidRounded,
  BulkRounded: IconTransitionTopBulkRounded,
  StrokeSharp: IconTransitionTopStrokeSharp,
  SolidSharp: IconTransitionTopSolidSharp,
};