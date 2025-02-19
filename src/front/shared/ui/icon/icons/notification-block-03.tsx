import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M14 2.41138C13.2178 2.14494 12.3764 2 11.5 2C7.34413 2 3.97513 5.2591 3.97513 9.27941C3.97503 10.3197 3.91272 11.2975 3.28561 12.194C2.80684 12.8701 2.16061 13.5625 2.02992 14.394C1.81727 15.7471 2.768 16.6862 3.93205 17.1542C8.39481 18.9486 14.6052 18.9486 19.0679 17.1542C20.232 16.6862 21.1827 15.7471 20.9701 14.394C20.8904 13.8869 20.6189 13.4315 20.3106 13',
  d2: 'M15.05 5.05L19.95 9.95M21 7.5C21 5.567 19.433 4 17.5 4C15.567 4 14 5.567 14 7.5C14 9.433 15.567 11 17.5 11C19.433 11 21 9.433 21 7.5Z',
  d3: 'M8.5 21C9.29613 21.6219 10.3475 22 11.5 22C12.6525 22 13.7039 21.6219 14.5 21',
  d4: 'M3.93205 17.1542C2.768 16.6862 1.81727 15.7471 2.02992 14.394C2.13446 13.7289 2.56888 13.1528 2.98359 12.6028C3.08732 12.4652 3.18982 12.3293 3.28561 12.194C3.91272 11.2975 3.97503 10.3197 3.97513 9.27941C3.97513 5.2591 7.34413 2 11.5 2C13.5491 2 15.4069 2.79232 16.7639 4.07754C15.1844 4.41564 14 5.81951 14 7.5C14 9.433 15.567 11 17.5 11C18.0779 11 18.6231 10.8599 19.1035 10.6119C19.1886 11.1626 19.3626 11.6911 19.7144 12.194C19.8102 12.3293 19.9127 12.4652 20.0164 12.6028C20.4311 13.1528 20.8655 13.7289 20.9701 14.394C21.1827 15.7471 20.232 16.6862 19.0679 17.1542C14.6052 18.9486 8.39481 18.9486 3.93205 17.1542Z',
  d5: 'M14.7776 21.951C13.9742 22.4562 13.0187 22.7476 11.9985 22.7476C10.9782 22.7476 10.0227 22.4562 9.21934 21.951C8.5063 21.5026 8.14977 21.2784 8.27454 20.9056C8.3993 20.5329 8.89126 20.5746 9.87518 20.6581C11.2824 20.7775 12.7146 20.7775 14.1217 20.6581C15.1057 20.5746 15.5976 20.5329 15.7224 20.9056C15.8472 21.2784 15.4906 21.5026 14.7776 21.951Z',
  d6: 'M12 1.24969C12.4732 1.24969 12.7098 1.24969 12.8281 1.37406C12.8789 1.42751 12.9115 1.4883 12.928 1.56018C12.9664 1.72745 12.8089 1.96543 12.4937 2.44139C11.8657 3.3898 11.5 4.52704 11.5 5.74969C11.5 9.0634 14.1863 11.7497 17.5 11.7497C18.08 11.7497 18.6407 11.6674 19.1712 11.5139C19.7331 11.3512 20.014 11.2699 20.1634 11.3211C20.3128 11.3723 20.4904 11.6164 20.8456 12.1047C20.8527 12.1145 20.8599 12.1244 20.8671 12.1342C21.0337 12.3622 21.2247 12.6237 21.3697 12.8502C21.6255 13.25 21.8754 13.7321 21.9613 14.2939C22.2416 16.1267 20.9494 17.3133 19.6625 17.8451C15.1298 19.7179 8.87016 19.7179 4.33746 17.8451C3.05056 17.3133 1.75836 16.1267 2.03868 14.2939C2.12459 13.7321 2.37452 13.25 2.63033 12.8502C2.77527 12.6237 2.96634 12.3622 3.13289 12.1342C3.22879 12.0029 3.31656 11.8828 3.38271 11.7869C3.85838 11.087 3.92776 10.3083 3.92786 9.27666C3.92789 4.84121 7.54419 1.24969 12 1.24969Z',
  d7: 'M13 5.74991C13 3.26463 15.0147 1.24991 17.5 1.24991C19.9853 1.24991 22 3.26463 22 5.74991C22 8.23519 19.9853 10.2499 17.5 10.2499C15.0147 10.2499 13 8.23519 13 5.74991ZM15.1722 4.83631C15.061 5.11931 15 5.42748 15 5.74991C15 7.13062 16.1193 8.24991 17.5 8.24991C17.8224 8.24991 18.1306 8.18887 18.4136 8.07772L15.1722 4.83631ZM16.5864 3.4221L19.8278 6.6635C19.939 6.38051 20 6.07234 20 5.74991C20 4.3692 18.8807 3.24991 17.5 3.24991C17.1776 3.24991 16.8694 3.31095 16.5864 3.4221Z',
  d8: 'M20.4493 5.04902L15.5493 9.94902M14.4993 7.49902C14.4993 5.56602 16.0663 3.99902 17.9993 3.99902C19.9323 3.99902 21.4993 5.56602 21.4993 7.49902C21.4993 9.43202 19.9323 10.999 17.9993 10.999C16.0663 10.999 14.4993 9.43202 14.4993 7.49902Z',
  d9: 'M8.99927 20.999C9.7954 21.6209 10.8468 21.999 11.9993 21.999C13.1518 21.999 14.2032 21.6209 14.9993 20.999',
  d10: 'M14.4934 2.41224C13.7238 2.14574 12.8972 2.00098 12.0369 2.00098C7.89426 2.00098 4.53602 5.35724 4.53602 9.49739V12.408L2.54079 15.8534C2.51782 15.8931 2.52307 15.9418 2.55644 15.9733C5.45916 18.7065 15.0957 21.1349 21.4342 15.9528C21.4716 15.9222 21.4819 15.8688 21.4583 15.8266L20.1298 13.462',
  d11: 'M11.4996 21.25C9.70465 21.25 8.24957 19.7949 8.24957 18H6.74957C6.74957 20.6234 8.87622 22.75 11.4996 22.75C14.1229 22.75 16.2496 20.6234 16.2496 18H14.7496C14.7496 19.7949 13.2945 21.25 11.4996 21.25Z',
  d12: 'M18.4996 5.13889C17.1956 5.13889 16.1385 6.19599 16.1385 7.5C16.1385 7.80452 16.1961 8.09557 16.3011 8.36284L19.3624 5.30151C19.0951 5.19654 18.8041 5.13889 18.4996 5.13889ZM20.6981 6.63716L17.6367 9.69849C17.904 9.80346 18.1951 9.86111 18.4996 9.86111C19.8036 9.86111 20.8607 8.80401 20.8607 7.5C20.8607 7.19548 20.803 6.90443 20.6981 6.63716ZM14.2496 7.5C14.2496 5.15279 16.1524 3.25 18.4996 3.25C20.8468 3.25 22.7496 5.15279 22.7496 7.5C22.7496 9.84721 20.8468 11.75 18.4996 11.75C16.1524 11.75 14.2496 9.84721 14.2496 7.5Z',
  d13: 'M11.5004 1.25C7.03473 1.25 3.41461 4.94365 3.41461 9.5V12.3008L1.25037 16.1652L1.71024 16.5687C3.94508 18.5294 7.52965 19.75 11.5004 19.75C15.4711 19.75 19.0556 18.5294 21.2905 16.5687L21.7504 16.1652L20.0062 13.0508C19.5262 13.1807 19.0214 13.25 18.5004 13.25C15.3247 13.25 12.7504 10.6756 12.7504 7.5C12.7504 5.33127 13.951 3.44297 15.7239 2.46355C14.4947 1.69382 13.0483 1.25 11.5004 1.25Z',
};

export const IconNotificationBlock03StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-block-03-stroke-rounded IconNotificationBlock03StrokeRounded"
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

export const IconNotificationBlock03DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-block-03-duotone-rounded IconNotificationBlock03DuotoneRounded"
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

export const IconNotificationBlock03TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-block-03-twotone-rounded IconNotificationBlock03TwotoneRounded"
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

export const IconNotificationBlock03SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-block-03-solid-rounded IconNotificationBlock03SolidRounded"
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
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconNotificationBlock03BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-block-03-bulk-rounded IconNotificationBlock03BulkRounded"
    >
      <path 
        d={d.d5} 
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

export const IconNotificationBlock03StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-block-03-stroke-sharp IconNotificationBlock03StrokeSharp"
    >
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
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
      />
    </TheIconWrapper>
  );
};

export const IconNotificationBlock03SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-block-03-solid-sharp IconNotificationBlock03SolidSharp"
    >
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
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfNotificationBlock03: TheIconSelfPack = {
  name: 'NotificationBlock03',
  StrokeRounded: IconNotificationBlock03StrokeRounded,
  DuotoneRounded: IconNotificationBlock03DuotoneRounded,
  TwotoneRounded: IconNotificationBlock03TwotoneRounded,
  SolidRounded: IconNotificationBlock03SolidRounded,
  BulkRounded: IconNotificationBlock03BulkRounded,
  StrokeSharp: IconNotificationBlock03StrokeSharp,
  SolidSharp: IconNotificationBlock03SolidSharp,
};