import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z',
  d2: 'M2.5 9H21.5',
  d3: 'M7 6H7.00898',
  d4: 'M11 6H11.009',
  d5: 'M9.11805 13.5C8.84339 13.1931 8.44425 13 8 13C7.17157 13 6.5 13.6716 6.5 14.5V15.5C6.5 16.3284 7.17157 17 8 17C8.44425 17 8.84339 16.8069 9.11805 16.5',
  d6: 'M15.5 13L17.5 17',
  d7: 'M12.4922 13.5H12.5012M12.4922 16.5H12.5012',
  d8: 'M3.89177 20.1087C5.28301 21.5 7.52218 21.5 12.0005 21.5C16.4789 21.5 18.718 21.5 20.1093 20.1087C21.5005 18.7175 21.5005 16.4783 21.5005 12C21.5005 10.1509 21.403 10.1835 21.305 9H2.50089C2.40296 10.1835 2.50053 10.1509 2.50053 12C2.50053 16.4783 2.50053 18.7175 3.89177 20.1087Z',
  d9: 'M6.99981 6H7.00879',
  d10: 'M10.9998 6H11.0088',
  d11: 'M11.9435 1.75H12.0579C14.2486 1.74999 15.9693 1.74998 17.3127 1.93059C18.6893 2.11568 19.7816 2.50272 20.6398 3.36091C21.498 4.21911 21.885 5.31137 22.0701 6.68802C22.1095 6.98118 22.1403 7.29229 22.1644 7.62234C22.1856 7.91313 22.1963 8.05853 22.1073 8.15427C22.0183 8.25 21.8698 8.25 21.5728 8.25H2.42863C2.13164 8.25 1.98315 8.25 1.89415 8.15427C1.80515 8.05853 1.81576 7.91313 1.83698 7.62234C1.86107 7.29229 1.89188 6.98118 1.93129 6.68802C2.11638 5.31137 2.50342 4.21911 3.36161 3.36091C4.21981 2.50272 5.31207 2.11568 6.68872 1.93059C8.03214 1.74998 9.75283 1.74999 11.9435 1.75ZM22.1566 9.83722C22.2444 9.92444 22.2452 10.0638 22.2469 10.3424C22.25 10.8458 22.25 11.3787 22.25 11.9428V12.0572C22.25 14.2479 22.25 15.9686 22.0694 17.312C21.8843 18.6886 21.4973 19.7809 20.6391 20.6391C19.7809 21.4973 18.6886 21.8843 17.312 22.0694C15.9686 22.25 14.2479 22.25 12.0572 22.25H11.9428C9.7521 22.25 8.03144 22.25 6.68802 22.0694C5.31137 21.8843 4.21911 21.4973 3.36091 20.6391C2.50272 19.7809 2.11568 18.6886 1.93059 17.312C1.74998 15.9686 1.74999 14.2479 1.75 12.0572V11.9428V11.9427C1.75 11.3786 1.74999 10.8457 1.75307 10.3424C1.75478 10.0638 1.75563 9.92444 1.84339 9.83722C1.93114 9.75 2.07108 9.75 2.35096 9.75H21.649C21.9289 9.75 22.0689 9.75 22.1566 9.83722ZM6.99553 4C6.44571 4 6 4.44772 6 5C6 5.55228 6.44571 6 6.99553 6H7.00447C7.55429 6 8 5.55228 8 5C8 4.44772 7.55429 4 7.00447 4H6.99553ZM10 5C10 4.44772 10.4457 4 10.9955 4H11.0045C11.5543 4 12 4.44772 12 5C12 5.55228 11.5543 6 11.0045 6H10.9955C10.4457 6 10 5.55228 10 5ZM7.25 15.5C7.25 15.0858 7.58579 14.75 8 14.75C8.22205 14.75 8.4208 14.8455 8.5592 15.0002C8.83545 15.3088 9.30959 15.3351 9.61824 15.0589C9.92688 14.7826 9.95315 14.3085 9.6769 13.9998C9.26599 13.5407 8.66645 13.25 8 13.25C6.75736 13.25 5.75 14.2574 5.75 15.5V16.5C5.75 17.7426 6.75736 18.75 8 18.75C8.66645 18.75 9.26599 18.4593 9.6769 18.0002C9.95315 17.6915 9.92688 17.2174 9.61824 16.9411C9.30959 16.6649 8.83545 16.6912 8.5592 16.9998C8.4208 17.1545 8.22205 17.25 8 17.25C7.58579 17.25 7.25 16.9142 7.25 16.5V15.5ZM15.1644 13.3293C14.7939 13.5146 14.6438 13.9651 14.829 14.3356L16.829 18.3356C17.0143 18.7061 17.4648 18.8562 17.8352 18.671C18.2057 18.4857 18.3559 18.0352 18.1707 17.6648L16.1707 13.6648C15.9854 13.2943 15.5349 13.1441 15.1644 13.3293ZM12.4922 13.5C11.9399 13.5 11.4922 13.9477 11.4922 14.5C11.4922 15.0523 11.9399 15.5 12.4922 15.5H12.5012C13.0535 15.5 13.5012 15.0523 13.5012 14.5C13.5012 13.9477 13.0535 13.5 12.5012 13.5H12.4922ZM12.4922 16.5C11.9399 16.5 11.4922 16.9477 11.4922 17.5C11.4922 18.0523 11.9399 18.5 12.4922 18.5H12.5012C13.0535 18.5 13.5012 18.0523 13.5012 17.5C13.5012 16.9477 13.0535 16.5 12.5012 16.5H12.4922Z',
  d12: 'M22.2469 10.3424C22.2452 10.0638 22.2444 9.92444 22.1566 9.83722C22.0689 9.75 21.9289 9.75 21.649 9.75H2.35096C2.07108 9.75 1.93114 9.75 1.84339 9.83722C1.75563 9.92444 1.75478 10.0638 1.75307 10.3424C1.74999 10.8458 1.75 11.3787 1.75 11.9428V12.0572C1.74999 14.2479 1.74998 15.9686 1.93059 17.312C2.11568 18.6886 2.50272 19.7809 3.36091 20.6391C4.21911 21.4973 5.31137 21.8843 6.68802 22.0694C8.03144 22.25 9.7521 22.25 11.9428 22.25H12.0572C14.2479 22.25 15.9686 22.25 17.312 22.0694C18.6886 21.8843 19.7809 21.4973 20.6391 20.6391C21.4973 19.7809 21.8843 18.6886 22.0694 17.312C22.25 15.9686 22.25 14.2479 22.25 12.0572V11.9428C22.25 11.3787 22.25 10.8458 22.2469 10.3424Z',
  d13: 'M12.0579 1.75H11.9435C9.75283 1.74999 8.03214 1.74998 6.68872 1.93059C5.31207 2.11568 4.21981 2.50272 3.36161 3.36091C2.50342 4.21911 2.11638 5.31137 1.93129 6.68802C1.89188 6.98118 1.86107 7.29229 1.83698 7.62234C1.81576 7.91313 1.80515 8.05853 1.89415 8.15427C1.98315 8.25 2.13164 8.25 2.42863 8.25H21.5728C21.8698 8.25 22.0183 8.25 22.1073 8.15427C22.1963 8.05853 22.1856 7.91313 22.1644 7.62234C22.1403 7.29229 22.1095 6.98118 22.0701 6.68802C21.885 5.31137 21.498 4.21911 20.6398 3.36091C19.7816 2.50272 18.6893 2.11568 17.3127 1.93059C15.9693 1.74998 14.2486 1.74999 12.0579 1.75Z',
  d14: 'M6 5C6 4.44772 6.44571 4 6.99553 4H7.00447C7.55429 4 8 4.44772 8 5C8 5.55228 7.55429 6 7.00447 6H6.99553C6.44571 6 6 5.55228 6 5Z',
  d15: 'M10 5C10 4.44772 10.4457 4 10.9955 4H11.0045C11.5543 4 12 4.44772 12 5C12 5.55228 11.5543 6 11.0045 6H10.9955C10.4457 6 10 5.55228 10 5Z',
  d16: 'M8 14.75C7.58579 14.75 7.25 15.0858 7.25 15.5V16.5C7.25 16.9142 7.58579 17.25 8 17.25C8.22205 17.25 8.4208 17.1545 8.5592 16.9998C8.83545 16.6912 9.30959 16.6649 9.61824 16.9411C9.92688 17.2174 9.95315 17.6915 9.6769 18.0002C9.26599 18.4593 8.66645 18.75 8 18.75C6.75736 18.75 5.75 17.7426 5.75 16.5V15.5C5.75 14.2574 6.75736 13.25 8 13.25C8.66645 13.25 9.26599 13.5407 9.6769 13.9998C9.95315 14.3085 9.92688 14.7826 9.61824 15.0589C9.30959 15.3351 8.83545 15.3088 8.5592 15.0002C8.4208 14.8455 8.22205 14.75 8 14.75Z',
  d17: 'M15.1644 13.3293C14.7939 13.5146 14.6438 13.9651 14.829 14.3356L16.829 18.3356C17.0143 18.7061 17.4648 18.8562 17.8352 18.671C18.2057 18.4857 18.3559 18.0352 18.1707 17.6648L16.1707 13.6648C15.9854 13.2943 15.5349 13.1441 15.1644 13.3293Z',
  d18: 'M11.4922 14.5C11.4922 13.9477 11.9399 13.5 12.4922 13.5H12.5012C13.0535 13.5 13.5012 13.9477 13.5012 14.5C13.5012 15.0523 13.0535 15.5 12.5012 15.5H12.4922C11.9399 15.5 11.4922 15.0523 11.4922 14.5ZM11.4922 17.5C11.4922 16.9477 11.9399 16.5 12.4922 16.5H12.5012C13.0535 16.5 13.5012 16.9477 13.5012 17.5C13.5012 18.0523 13.0535 18.5 12.5012 18.5H12.4922C11.9399 18.5 11.4922 18.0523 11.4922 17.5Z',
  d19: 'M3 3V21H21V3H3Z',
  d20: 'M7 6H7.00898M11 6H11.009',
  d21: 'M3 9H21',
  d22: 'M9.61577 13.508C9.28333 13.1415 8.50357 12.7112 7.59011 13.3125C7.07895 13.6486 6.95507 14.2408 7.00688 15.0355C6.95984 15.5084 7.00609 16.497 7.84447 16.8471C8.84961 17.2668 9.32226 16.8471 10.098 15.9563M11.9885 12.75V14.2578M11.9885 15.7557V17.2533M15.0053 12.9993L17.0115 16.9968',
  d23: 'M3.00012 2.25C2.58591 2.25 2.25012 2.58579 2.25012 3V8.25H21.7501V3C21.7501 2.58579 21.4143 2.25 21.0001 2.25H3.00012ZM6.00012 4.25H8.0091V6.25H6.00012V4.25ZM10.0001 4.25H12.0091V6.25H10.0001V4.25Z',
  d24: 'M21.7501 9.75H2.25012V21C2.25012 21.4142 2.58591 21.75 3.00012 21.75L21.0001 21.75C21.199 21.75 21.3898 21.671 21.5305 21.5303C21.6711 21.3897 21.7501 21.1989 21.7501 21V9.75ZM7.75012 15.25C7.75012 14.8358 8.08591 14.5 8.50012 14.5C8.72218 14.5 8.92092 14.5955 9.05932 14.7502L10.177 13.7498C9.76611 13.2907 9.16657 13 8.50012 13C7.25748 13 6.25012 14.0074 6.25012 15.25V16.25C6.25012 17.4926 7.25748 18.5 8.50012 18.5C9.16657 18.5 9.76611 18.2093 10.177 17.7502L10.6772 17.1913L9.55951 16.191L9.05932 16.7498C8.92092 16.9045 8.72218 17 8.50012 17C8.08591 17 7.75012 16.6642 7.75012 16.25V15.25ZM14.3293 14.0854L16.3293 18.0854L17.6709 17.4146L15.6709 13.4146L14.3293 14.0854ZM12.7513 13.5H11.2423V15H12.7513V13.5ZM12.7513 16.5H11.2423V18H12.7513V16.5Z',
};

export const IconWebProgrammingStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="web-programming-stroke-rounded IconWebProgrammingStrokeRounded"
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
        strokeLinejoin="round" 
      />
      <path 
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
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
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
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconWebProgrammingDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="web-programming-duotone-rounded IconWebProgrammingDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d8} 
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
        strokeLinejoin="round" 
      />
      <path 
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
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
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
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconWebProgrammingTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="web-programming-twotone-rounded IconWebProgrammingTwotoneRounded"
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
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
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconWebProgrammingSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="web-programming-solid-rounded IconWebProgrammingSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconWebProgrammingBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="web-programming-bulk-rounded IconWebProgrammingBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
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
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconWebProgrammingStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="web-programming-stroke-sharp IconWebProgrammingStrokeSharp"
    >
      <path 
        d={d.d19} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d20} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d21} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d22} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconWebProgrammingSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="web-programming-solid-sharp IconWebProgrammingSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d23} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d24} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfWebProgramming: TheIconSelfPack = {
  name: 'WebProgramming',
  StrokeRounded: IconWebProgrammingStrokeRounded,
  DuotoneRounded: IconWebProgrammingDuotoneRounded,
  TwotoneRounded: IconWebProgrammingTwotoneRounded,
  SolidRounded: IconWebProgrammingSolidRounded,
  BulkRounded: IconWebProgrammingBulkRounded,
  StrokeSharp: IconWebProgrammingStrokeSharp,
  SolidSharp: IconWebProgrammingSolidSharp,
};