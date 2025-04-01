import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 10.999C10.8954 10.999 10 11.6699 10 12.4975C10 13.3251 10.8954 13.996 12 13.996C13.1046 13.996 14 14.667 14 15.4946C14 16.3221 13.1046 16.9931 12 16.9931M12 10.999C12.8708 10.999 13.6116 11.416 13.8862 11.998M12 10.999V10M12 16.9931C11.1292 16.9931 10.3884 16.5761 10.1138 15.9941M12 16.9931L12.0028 18',
  d2: 'M21 11C21.1568 10.9209 21.2931 10.8212 21.4142 10.6955C22 10.0875 22 9.10893 22 7.15176C22 5.1946 22 4.21602 21.4142 3.60801C20.8284 3 19.8856 3 18 3L6 3C4.11438 3 3.17157 3 2.58579 3.60801C2 4.21602 2 5.1946 2 7.15176C2 9.10893 2 10.0875 2.58579 10.6955C2.70688 10.8212 2.84322 10.9209 3 11',
  d3: 'M5 7H19',
  d4: 'M5.93724 2.25C5.95975 2.25 5.98234 2.25001 6.005 2.25001L18.0629 2.25C18.947 2.24995 19.7125 2.2499 20.3262 2.33562C20.9884 2.4281 21.6193 2.63711 22.127 3.16449C22.6296 3.68654 22.8238 4.32619 22.9105 4.99561C22.992 5.62545 22.992 6.41383 22.9919 7.33739L22.9919 7.40177C22.9919 7.65439 22.9941 7.89711 22.9962 8.12825C23.0017 8.73073 23.0064 9.25455 22.9696 9.67014C22.9124 10.3154 22.7445 10.9158 22.2365 11.4435C21.8535 11.8414 21.2205 11.8535 20.8226 11.4704C20.4247 11.0874 20.4127 10.4544 20.7957 10.0565C20.873 9.97616 20.943 9.88104 20.9774 9.4935C21.0052 9.18046 21.0017 8.8066 20.9968 8.267C20.9945 8.01749 20.9919 7.73253 20.9919 7.40177C20.9919 6.39595 20.9899 5.73847 20.927 5.25232C20.8673 4.79115 20.7689 4.63751 20.6862 4.55155C20.6085 4.47092 20.4758 4.37592 20.0496 4.3164C19.5906 4.25229 18.9666 4.25001 17.9952 4.25001L6.005 4.25001C5.03363 4.25001 4.40954 4.25229 3.95057 4.31639C3.52439 4.37592 3.39163 4.47092 3.31401 4.55154C3.23125 4.63751 3.13285 4.79115 3.07316 5.25232C3.01024 5.73847 3.00827 6.39595 3.00827 7.40177C3.00827 7.73426 3.00562 8.02045 3.0033 8.27087C2.99831 8.80852 2.99486 9.18135 3.02246 9.49383C3.0567 9.88147 3.12669 9.97636 3.20382 10.0565C3.58684 10.4544 3.5748 11.0874 3.17692 11.4704C2.77903 11.8535 2.14598 11.8414 1.76296 11.4435C1.25478 10.9156 1.08721 10.315 1.03022 9.66981C0.993591 9.25515 0.998389 8.73244 1.0039 8.13142C1.00603 7.89931 1.00827 7.65552 1.00827 7.40177C1.00827 7.38023 1.00827 7.35877 1.00827 7.33738C1.00823 6.41382 1.00819 5.62545 1.08971 4.99561C1.17635 4.32619 1.3706 3.68654 1.87315 3.16449C2.38084 2.63711 3.01175 2.4281 3.67393 2.33562C4.2877 2.2499 5.05322 2.24995 5.93724 2.25Z',
  d5: 'M12.0001 6.25C7.71992 6.25 4.25012 9.71979 4.25012 14C4.25012 18.2802 7.71992 21.75 12.0001 21.75C16.2803 21.75 19.7501 18.2802 19.7501 14C19.7501 9.71979 16.2803 6.25 12.0001 6.25ZM12.7501 10C12.7501 9.58579 12.4143 9.25 12.0001 9.25C11.5859 9.25 11.2501 9.58579 11.2501 10V10.3325C10.8361 10.4269 10.4546 10.5991 10.1362 10.8377C9.63222 11.2153 9.25012 11.7944 9.25012 12.4975C9.25012 13.2006 9.63222 13.7797 10.1362 14.1573C10.6399 14.5348 11.3014 14.746 12.0001 14.746C12.406 14.746 12.7445 14.8703 12.9646 15.0352C13.1845 15.1999 13.2501 15.3701 13.2501 15.4946C13.2501 15.619 13.1845 15.7892 12.9646 15.9539C12.7445 16.1189 12.406 16.2431 12.0001 16.2431C11.3314 16.2431 10.9093 15.9222 10.7922 15.674C10.6155 15.2994 10.1685 15.139 9.7939 15.3158C9.41929 15.4925 9.25888 15.9395 9.43563 16.3141C9.76591 17.0141 10.4628 17.4789 11.2519 17.659L11.2529 18.0021C11.254 18.4163 11.5907 18.7511 12.0049 18.75C12.4191 18.7489 12.754 18.4122 12.7529 17.9979L12.7519 17.6591C13.1653 17.5646 13.5461 17.3926 13.8641 17.1544C14.368 16.7768 14.7501 16.1977 14.7501 15.4946C14.7501 14.7915 14.368 14.2123 13.8641 13.8347C13.3603 13.4573 12.6988 13.246 12.0001 13.246C11.5942 13.246 11.2557 13.1218 11.0356 12.9569C10.8157 12.7922 10.7501 12.622 10.7501 12.4975C10.7501 12.373 10.8157 12.2029 11.0356 12.0381C11.2557 11.8732 11.5942 11.749 12.0001 11.749C12.6689 11.749 13.0909 12.0699 13.208 12.318C13.3848 12.6927 13.8317 12.8531 14.2063 12.6763C14.581 12.4996 14.7414 12.0526 14.5646 11.678C14.2346 10.9785 13.5386 10.5139 12.7501 10.3335V10Z',
  d6: 'M5.00012 7C5.00012 6.44772 5.44784 6 6.00012 6H18.0001C18.5524 6 19.0001 6.44772 19.0001 7C19.0001 7.55228 18.5524 8 18.0001 8H6.00012C5.44784 8 5.00012 7.55228 5.00012 7Z',
  d7: 'M4.25012 14C4.25012 9.71979 7.71992 6.25 12.0001 6.25C16.2803 6.25 19.7501 9.71979 19.7501 14C19.7501 18.2802 16.2803 21.75 12.0001 21.75C7.71992 21.75 4.25012 18.2802 4.25012 14Z',
  d8: 'M12.0001 9.25C12.4143 9.25 12.7501 9.58579 12.7501 10V10.3335C13.5386 10.5139 14.2346 10.9785 14.5646 11.678C14.7414 12.0526 14.581 12.4996 14.2063 12.6763C13.8317 12.8531 13.3848 12.6927 13.208 12.318C13.0909 12.0699 12.6689 11.749 12.0001 11.749C11.5942 11.749 11.2557 11.8732 11.0356 12.0381C10.8157 12.2029 10.7501 12.373 10.7501 12.4975C10.7501 12.622 10.8157 12.7922 11.0356 12.9569C11.2557 13.1218 11.5942 13.246 12.0001 13.246C12.6988 13.246 13.3603 13.4573 13.8641 13.8347C14.368 14.2123 14.7501 14.7915 14.7501 15.4946C14.7501 16.1977 14.368 16.7768 13.8641 17.1544C13.5461 17.3926 13.1653 17.5646 12.7519 17.6591L12.7529 17.9979C12.754 18.4122 12.4191 18.7489 12.0049 18.75C11.5907 18.7511 11.254 18.4163 11.2529 18.0021L11.2519 17.659C10.4628 17.4789 9.76591 17.0141 9.43563 16.3141C9.25888 15.9395 9.41929 15.4925 9.7939 15.3158C10.1685 15.139 10.6155 15.2994 10.7922 15.674C10.9093 15.9222 11.3314 16.2431 12.0001 16.2431C12.406 16.2431 12.7445 16.1189 12.9646 15.9539C13.1845 15.7892 13.2501 15.619 13.2501 15.4946C13.2501 15.3701 13.1845 15.1999 12.9646 15.0352C12.7445 14.8703 12.406 14.746 12.0001 14.746C11.3014 14.746 10.6399 14.5348 10.1362 14.1573C9.63222 13.7797 9.25012 13.2006 9.25012 12.4975C9.25012 11.7944 9.63222 11.2153 10.1362 10.8377C10.4546 10.5991 10.8361 10.4269 11.2501 10.3325V10C11.2501 9.58579 11.5859 9.25 12.0001 9.25Z',
  d9: 'M13.8862 12C13.6116 11.4174 12.8708 11 12 11C10.8954 11 10 11.6716 10 12.5C10 13.3284 10.8954 14 12 14C13.1046 14 14 14.6716 14 15.5C14 16.3284 13.1046 17 12 17C11.1292 17 10.3884 16.5826 10.1138 16',
  d10: 'M12 11V10M12 17V18',
  d11: 'M20 11H22V3H2V11H4',
  d12: 'M4.25 14C4.25 9.71979 7.71979 6.25 12 6.25C16.2802 6.25 19.75 9.71979 19.75 14C19.75 18.2802 16.2802 21.75 12 21.75C7.71979 21.75 4.25 18.2802 4.25 14ZM12.75 10.3345V9.25H11.25V10.3336C10.8358 10.4281 10.4543 10.6005 10.1358 10.8393C9.63177 11.2173 9.25 11.7968 9.25 12.5C9.25 13.2032 9.63178 13.7826 10.1358 14.1606C10.6395 14.5385 11.3011 14.75 12 14.75C12.4057 14.75 12.7441 14.8743 12.9642 15.0393C13.1841 15.2042 13.25 15.3748 13.25 15.5C13.25 15.6252 13.1841 15.7958 12.9642 15.9607C12.7441 16.1257 12.4057 16.25 12 16.25C11.3317 16.25 10.9095 15.929 10.7922 15.6802L9.43538 16.3198C9.7653 17.0197 10.4613 17.4848 11.25 17.6655V18.75H12.75V17.6664C13.1642 17.5719 13.5457 17.3995 13.8642 17.1606C14.3682 16.7826 14.75 16.2032 14.75 15.5C14.75 14.7968 14.3682 14.2174 13.8642 13.8394C13.3605 13.4615 12.6989 13.25 12 13.25C11.5943 13.25 11.2559 13.1257 11.0358 12.9607C10.8159 12.7958 10.75 12.6252 10.75 12.5C10.75 12.3748 10.8159 12.2042 11.0358 12.0393C11.2559 11.8743 11.5943 11.75 12 11.75C12.6683 11.75 13.0905 12.071 13.2078 12.3198L14.5646 11.6802C14.2347 10.9803 13.5387 10.5152 12.75 10.3345Z',
  d13: 'M19 8H5V6H19V8Z',
  d14: 'M2 2.25C1.44772 2.25 1 2.69772 1 3.25V11.25C1 11.8023 1.44772 12.25 2 12.25H3.17003C3.30781 11.5509 3.52654 10.8808 3.81606 10.25H3V4.25H21V10.25H20.1839C20.4735 10.8808 20.6922 11.5509 20.83 12.25H22C22.5523 12.25 23 11.8023 23 11.25V3.25C23 2.69772 22.5523 2.25 22 2.25H2Z',
};

export const IconReverseWithdrawal02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="reverse-withdrawal-02-stroke-rounded IconReverseWithdrawal02StrokeRounded"
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
      />
      <circle 
        cx="12" 
        cy="14" 
        r="7" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconReverseWithdrawal02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="reverse-withdrawal-02-duotone-rounded IconReverseWithdrawal02DuotoneRounded"
    >
      <circle 
        opacity="var(--icon-opacity)" 
        cx="12" 
        cy="14" 
        r="7" 
        fill="var(--icon-fill)"></circle>
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
      />
      <circle 
        cx="12" 
        cy="14" 
        r="7" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconReverseWithdrawal02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="reverse-withdrawal-02-twotone-rounded IconReverseWithdrawal02TwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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
      />
      <circle 
        opacity="var(--icon-opacity)" 
        cx="12" 
        cy="14" 
        r="7" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconReverseWithdrawal02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="reverse-withdrawal-02-solid-rounded IconReverseWithdrawal02SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconReverseWithdrawal02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="reverse-withdrawal-02-bulk-rounded IconReverseWithdrawal02BulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconReverseWithdrawal02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="reverse-withdrawal-02-stroke-sharp IconReverseWithdrawal02StrokeSharp"
    >
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <circle 
        cx="12" 
        cy="14" 
        r="7" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconReverseWithdrawal02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="reverse-withdrawal-02-solid-sharp IconReverseWithdrawal02SolidSharp"
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

export const iconPackOfReverseWithdrawal02: TheIconSelfPack = {
  name: 'ReverseWithdrawal02',
  StrokeRounded: IconReverseWithdrawal02StrokeRounded,
  DuotoneRounded: IconReverseWithdrawal02DuotoneRounded,
  TwotoneRounded: IconReverseWithdrawal02TwotoneRounded,
  SolidRounded: IconReverseWithdrawal02SolidRounded,
  BulkRounded: IconReverseWithdrawal02BulkRounded,
  StrokeSharp: IconReverseWithdrawal02StrokeSharp,
  SolidSharp: IconReverseWithdrawal02SolidSharp,
};