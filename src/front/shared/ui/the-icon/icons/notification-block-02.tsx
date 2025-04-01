import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M14 2.42385C13.2178 2.14933 12.3764 2 11.5 2C7.34413 2 3.97513 5.35786 3.97513 9.5C3.97503 10.5718 3.91272 11.5793 3.28561 12.5029C2.80684 13.1995 2.16061 13.9129 2.02992 14.7696C1.81727 16.1636 2.768 17.1312 3.93205 17.6134C8.39481 19.4622 14.6052 19.4622 19.0679 17.6134C20.232 17.1312 21.1827 16.1636 20.9701 14.7696C20.8702 14.1149 20.4692 13.5438 20.0719 13',
  d2: 'M15.05 5.05L19.95 9.95M21 7.5C21 5.567 19.433 4 17.5 4C15.567 4 14 5.567 14 7.5C14 9.433 15.567 11 17.5 11C19.433 11 21 9.433 21 7.5Z',
  d3: 'M7.5 19C7.95849 20.7252 9.57553 22 11.5 22C13.4245 22 15.0415 20.7252 15.5 19',
  d4: 'M3.93205 17.6134C2.768 17.1312 1.81727 16.1636 2.02992 14.7696C2.13446 14.0843 2.56888 13.4907 2.98359 12.9241C3.08732 12.7823 3.18982 12.6423 3.28561 12.5029C3.91272 11.5793 3.97503 10.5718 3.97513 9.5C3.97513 5.35786 7.34413 2 11.5 2C13.5226 2 15.3588 2.79532 16.7109 4.08931C15.158 4.44715 14 5.83835 14 7.5C14 9.433 15.567 11 17.5 11C18.0654 11 18.5995 10.8659 19.0722 10.6279C19.1424 11.2839 19.3123 11.9106 19.7144 12.5029C19.8102 12.6423 19.9127 12.7823 20.0164 12.9241C20.4311 13.4907 20.8655 14.0843 20.9701 14.7696C21.1827 16.1636 20.232 17.1312 19.0679 17.6134C14.6052 19.4622 8.39481 19.4622 3.93205 17.6134Z',
  d5: 'M7.74341 17.7839C8.27717 17.6421 8.82485 17.9598 8.9667 18.4935C9.30659 19.7725 10.5207 20.7504 12.0002 20.7504C13.4798 20.7504 14.6939 19.7725 15.0338 18.4935C15.1756 17.9598 15.7233 17.6421 16.2571 17.7839C16.7908 17.9258 17.1086 18.4735 16.9667 19.0072C16.3896 21.1787 14.3697 22.7504 12.0002 22.7504C9.63084 22.7504 7.61087 21.1787 7.03379 19.0072C6.89194 18.4735 7.20965 17.9258 7.74341 17.7839Z',
  d6: 'M13.0125 1.44735C13.0932 1.60847 12.9314 1.83565 12.6079 2.29C11.9102 3.2696 11.5 4.4677 11.5 5.76153C11.5 9.07232 14.1863 11.7563 17.5 11.7563C18.0799 11.7563 18.6405 11.6741 19.171 11.5207C19.7329 11.3583 20.0138 11.277 20.1632 11.3282C20.3126 11.3793 20.4902 11.6233 20.8454 12.1112C21.0184 12.3487 21.2184 12.6201 21.3697 12.8563C21.6255 13.2557 21.8754 13.7374 21.9613 14.2987C22.2416 16.1299 20.9494 17.3155 19.6625 17.8467C15.1298 19.7179 8.87016 19.7179 4.33746 17.8467C3.05056 17.3155 1.75836 16.1299 2.03868 14.2987C2.12459 13.7374 2.37452 13.2557 2.63033 12.8563C2.77528 12.63 2.96636 12.3686 3.13291 12.1409C3.76864 11.2715 3.92776 10.3599 3.92786 9.28588C3.92789 4.85433 7.54419 1.26597 12 1.26597C12.2716 1.26597 12.874 1.17076 13.0125 1.44735Z',
  d7: 'M13 5.75012C13 3.26484 15.0147 1.25012 17.5 1.25012C19.9853 1.25012 22 3.26484 22 5.75012C22 8.2354 19.9853 10.2501 17.5 10.2501C15.0147 10.2501 13 8.2354 13 5.75012ZM15.1722 4.83653C15.061 5.11952 15 5.42769 15 5.75012C15 7.13083 16.1193 8.25012 17.5 8.25012C17.8224 8.25012 18.1306 8.18908 18.4136 8.07793L15.1722 4.83653ZM16.5864 3.42231L19.8278 6.66372C19.939 6.38073 20 6.07255 20 5.75012C20 4.36941 18.8807 3.25012 17.5 3.25012C17.1776 3.25012 16.8694 3.31116 16.5864 3.42231Z',
  d8: 'M7.0017 18.6915C6.99563 18.7951 7.0057 18.9013 7.03379 19.0071C7.61087 21.1785 9.63084 22.7502 12.0002 22.7502C14.3697 22.7502 16.3896 21.1785 16.9667 19.0071C16.9948 18.9013 17.0049 18.795 16.9988 18.6914C16.2867 18.8578 15.5529 18.987 14.8072 19.0791C14.3002 20.0592 13.244 20.7502 12.0002 20.7502C10.7565 20.7502 9.7003 20.0592 9.19334 19.0792C8.4476 18.9871 7.71383 18.8579 7.0017 18.6915Z',
  d9: 'M15.9993 17.999C15.9993 20.2081 14.2084 21.999 11.9993 21.999C9.79013 21.999 7.99927 20.2081 7.99927 17.999',
  d10: 'M20.4493 5.04902L15.5493 9.94902M14.4993 7.49902C14.4993 5.56602 16.0663 3.99902 17.9993 3.99902C19.9323 3.99902 21.4993 5.56602 21.4993 7.49902C21.4993 9.43202 19.9323 10.999 17.9993 10.999C16.0663 10.999 14.4993 9.43202 14.4993 7.49902Z',
  d11: 'M14.4934 2.41224C13.7238 2.14574 12.8972 2.00098 12.0369 2.00098C7.89426 2.00098 4.53602 5.35724 4.53602 9.49739V12.408L2.54079 15.8534C2.51782 15.8931 2.52307 15.9418 2.55644 15.9733C5.45916 18.7065 15.0957 21.1349 21.4342 15.9528C21.4716 15.9222 21.4819 15.8688 21.4583 15.8266L20.1298 13.462',
  d12: 'M12 21.25C10.2051 21.25 8.75 19.7949 8.75 18H7.25C7.25 20.6234 9.37665 22.75 12 22.75C14.6234 22.75 16.75 20.6234 16.75 18H15.25C15.25 19.7949 13.7949 21.25 12 21.25Z',
  d13: 'M13.7492 7.75C13.7492 5.40279 15.652 3.5 17.9992 3.5C20.3464 3.5 22.2492 5.40279 22.2492 7.75C22.2492 10.0972 20.3464 12 17.9992 12C15.652 12 13.7492 10.0972 13.7492 7.75ZM15.8008 6.88716C15.6958 7.15443 15.6381 7.44548 15.6381 7.75C15.6381 9.05401 16.6952 10.1111 17.9992 10.1111C18.3038 10.1111 18.5948 10.0535 18.8621 9.94849L15.8008 6.88716ZM17.1364 5.55151L20.1977 8.61284C20.3027 8.34557 20.3603 8.05452 20.3603 7.75C20.3603 6.44599 19.3032 5.38889 17.9992 5.38889C17.6947 5.38889 17.4037 5.44654 17.1364 5.55151Z',
  d14: 'M12 1.25C7.53436 1.25 3.91425 4.94365 3.91425 9.5V12.3008L1.75 16.1652L2.20987 16.5687C4.44472 18.5294 8.02928 19.75 12 19.75C15.9707 19.75 19.5553 18.5294 21.7901 16.5687L22.25 16.1652L20.451 12.953C19.7075 13.3038 18.8766 13.5 18 13.5C14.8244 13.5 12.25 10.9256 12.25 7.75C12.25 5.2663 13.8247 3.15041 16.0302 2.34625C14.8438 1.64891 13.4675 1.25 12 1.25Z',
};

export const IconNotificationBlock02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-block-02-stroke-rounded IconNotificationBlock02StrokeRounded"
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
      />
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

export const IconNotificationBlock02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-block-02-duotone-rounded IconNotificationBlock02DuotoneRounded"
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
        strokeLinecap="round" 
      />
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

export const IconNotificationBlock02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-block-02-twotone-rounded IconNotificationBlock02TwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconNotificationBlock02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-block-02-solid-rounded IconNotificationBlock02SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
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
    </TheIconWrapper>
  );
};

export const IconNotificationBlock02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-block-02-bulk-rounded IconNotificationBlock02BulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconNotificationBlock02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-block-02-stroke-sharp IconNotificationBlock02StrokeSharp"
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
        strokeLinecap="round" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconNotificationBlock02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-block-02-solid-sharp IconNotificationBlock02SolidSharp"
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

export const iconPackOfNotificationBlock02: TheIconSelfPack = {
  name: 'NotificationBlock02',
  StrokeRounded: IconNotificationBlock02StrokeRounded,
  DuotoneRounded: IconNotificationBlock02DuotoneRounded,
  TwotoneRounded: IconNotificationBlock02TwotoneRounded,
  SolidRounded: IconNotificationBlock02SolidRounded,
  BulkRounded: IconNotificationBlock02BulkRounded,
  StrokeSharp: IconNotificationBlock02StrokeSharp,
  SolidSharp: IconNotificationBlock02SolidSharp,
};