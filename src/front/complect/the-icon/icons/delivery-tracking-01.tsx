import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12.5 22H10.8889C6.69863 22 4.6035 22 3.30175 20.7447C2 19.4895 2 17.4692 2 13.4286V8H22V10.5',
  d2: 'M18 12C15.7909 12 14 13.8089 14 16.0403C14 17.3163 14.5 18.3083 15.5 19.1945C16.2049 19.8191 17.0588 20.8566 17.5714 21.6975C17.8173 22.1008 18.165 22.1008 18.4286 21.6975C18.9672 20.8733 19.7951 19.8191 20.5 19.1945C21.5 18.3083 22 17.3163 22 16.0403C22 13.8089 20.2091 12 18 12Z',
  d3: 'M18 16H18.009',
  d4: 'M2 8L2.96154 5.69231C3.70726 3.90257 4.08013 3.0077 4.8359 2.50385C5.59167 2 6.56112 2 8.5 2H15.5C17.4389 2 18.4083 2 19.1641 2.50385C19.9199 3.0077 20.2927 3.90257 21.0385 5.69231L22 8',
  d5: 'M12 8V2',
  d6: 'M10 12H12',
  d7: 'M2 8V13.4286C2 17.4692 2 19.4895 3.30175 20.7447C4.6035 22 6.69863 22 10.8889 22H13.1111C15.0507 22 16.5415 22 17.7124 21.8755C17.6628 21.8291 17.6155 21.7698 17.5714 21.6975C17.0588 20.8566 16.2049 19.8191 15.5 19.1945C14.5 18.3083 14 17.3163 14 16.0403C14 13.8089 15.7909 12 18 12C20.1035 12 21.8277 13.64 21.9879 15.7232C22 15.04 22 14.2791 22 13.4286V8H2Z',
  d8: 'M15.4724 1.25H8.52755C7.62451 1.24998 6.86914 1.24996 6.25004 1.31454C5.59532 1.38284 5.0034 1.53023 4.45681 1.87979C3.91021 2.22936 3.54072 2.69681 3.22319 3.2503C2.92293 3.77368 2.63242 4.44256 2.28512 5.24222L1.32543 7.45172C1.11784 7.92965 1.35344 8.47851 1.85164 8.67764C2.34984 8.87678 2.922 8.65078 3.12958 8.17285L4.06924 6.00946C4.4418 5.15172 4.69249 4.57789 4.9355 4.1543C5.16699 3.75079 5.34898 3.56262 5.54097 3.43984C5.73295 3.31706 5.98402 3.22828 6.46133 3.17849C6.96239 3.12622 7.61098 3.12494 8.57963 3.12494H11V8H13V3.12494H15.4204C16.389 3.12494 17.0376 3.12622 17.5387 3.17849C18.016 3.22828 18.2671 3.31706 18.459 3.43984C18.651 3.56262 18.833 3.75079 19.0645 4.1543C19.3075 4.57789 19.5582 5.15172 19.9308 6.00946L20.8704 8.17285C21.078 8.65078 21.6502 8.87678 22.1484 8.67764C22.6466 8.47851 22.8822 7.92965 22.6746 7.45172L21.7149 5.24222C21.3676 4.44256 21.0771 3.77368 20.7768 3.2503C20.4593 2.69681 20.0898 2.22936 19.5432 1.87979C18.9966 1.53023 18.4047 1.38284 17.75 1.31454C17.1309 1.24996 16.3755 1.24998 15.4724 1.25Z',
  d9: 'M1.25 8C1.25 7.58579 1.58579 7.25 2 7.25L22 7.25C22.4142 7.25 22.75 7.58579 22.75 8V10.3193C22.75 10.9753 22.75 11.3033 22.589 11.3875C22.4281 11.4717 22.1334 11.267 21.5442 10.8578C20.5396 10.16 19.3202 9.75 18 9.75C14.5263 9.75 11.75 12.5883 11.75 16.0403C11.75 18.0456 12.5938 19.6254 14.0078 20.8784C14.2868 21.1257 14.6196 21.4856 14.9311 21.8686C15.2209 22.225 15.3658 22.4031 15.285 22.574C15.2042 22.7449 14.9663 22.746 14.4904 22.7481C14.0708 22.75 13.6297 22.75 13.1663 22.75H13.1662H10.8338C8.78537 22.75 7.17418 22.75 5.9157 22.5869C4.6271 22.4198 3.59552 22.0699 2.78115 21.2846C1.96296 20.4957 1.59493 19.4901 1.41991 18.2347C1.24997 17.0159 1.24998 15.4578 1.25 13.4872V13.4872L1.25 8ZM10 10.25C9.58579 10.25 9.25 10.5858 9.25 11C9.25 11.4142 9.58579 11.75 10 11.75H12C12.4142 11.75 12.75 11.4142 12.75 11C12.75 10.5858 12.4142 10.25 12 10.25L10 10.25Z',
  d10: 'M18 11.25C15.3696 11.25 13.25 13.4018 13.25 16.0403C13.25 17.5592 13.8644 18.7472 15.0026 19.7558C15.6471 20.3269 16.454 21.3054 16.9311 22.0879C17.1225 22.402 17.4733 22.75 17.9934 22.75C18.5049 22.75 18.8578 22.4118 19.0564 22.1078C19.5758 21.313 20.3617 20.3191 20.9974 19.7558C22.1356 18.7472 22.75 17.5592 22.75 16.0403C22.75 13.4018 20.6304 11.25 18 11.25ZM17.9933 14.5C17.1686 14.5 16.5 15.1716 16.5 16C16.5 16.8284 17.1686 17.5 17.9933 17.5H18.0067C18.8314 17.5 19.5 16.8284 19.5 16C19.5 15.1716 18.8314 14.5 18.0067 14.5H17.9933Z',
  d11: 'M2 7.25C1.58579 7.25 1.25 7.58579 1.25 8V13.4872C1.24998 15.4578 1.24997 17.0159 1.41991 18.2347C1.59493 19.4901 1.96296 20.4957 2.78115 21.2846C3.59552 22.0699 4.6271 22.4198 5.9157 22.5869C7.17418 22.75 8.78537 22.75 10.8338 22.75H13.1662C13.6297 22.75 14.0707 22.75 14.4904 22.7481C14.9663 22.746 15.2042 22.7449 15.285 22.574C15.3658 22.4031 15.2209 22.225 14.9311 21.8686C14.6196 21.4856 14.2868 21.1257 14.0078 20.8784C12.5938 19.6254 11.75 18.0456 11.75 16.0403C11.75 12.5883 14.5263 9.75 18 9.75C19.3202 9.75 20.5396 10.16 21.5442 10.8578C22.1334 11.267 22.4281 11.4717 22.589 11.3875C22.75 11.3033 22.75 10.9753 22.75 10.3193V8C22.75 7.58579 22.4142 7.25 22 7.25L2 7.25Z',
  d12: 'M9.25 11C9.25 10.5858 9.58579 10.25 10 10.25H12C12.4142 10.25 12.75 10.5858 12.75 11C12.75 11.4142 12.4142 11.75 12 11.75H10C9.58579 11.75 9.25 11.4142 9.25 11Z',
  d13: 'M8.52755 1.25H15.4724C16.3755 1.24998 17.1309 1.24996 17.75 1.31454C18.4047 1.38284 18.9966 1.53023 19.5432 1.87979C20.0898 2.22936 20.4593 2.69681 20.7768 3.2503C21.0771 3.77368 21.3676 4.44256 21.7149 5.24222L22.6746 7.45172C22.7397 7.60176 22.7612 7.75879 22.7446 7.9098C22.7001 7.53812 22.3837 7.25 22 7.25H20.4696L19.9308 6.00946C19.5582 5.15173 19.3075 4.57789 19.0645 4.1543C18.833 3.75079 18.651 3.56262 18.459 3.43984C18.2671 3.31706 18.016 3.22828 17.5387 3.17849C17.0376 3.12622 16.389 3.12494 15.4204 3.12494H13V7.25H11V3.12494H8.57963C7.61098 3.12494 6.96239 3.12622 6.46133 3.17849C5.98402 3.22828 5.73295 3.31706 5.54097 3.43984C5.34898 3.56262 5.16699 3.75079 4.9355 4.1543C4.69249 4.57789 4.4418 5.15173 4.06924 6.00946L3.53042 7.25H2C1.61632 7.25 1.29992 7.53811 1.25537 7.90979C1.23877 7.75879 1.26026 7.60176 1.32543 7.45172L2.28512 5.24223C2.63242 4.44256 2.92293 3.77368 3.22319 3.2503C3.54072 2.69681 3.91021 2.22936 4.45681 1.87979C5.0034 1.53023 5.59532 1.38284 6.25004 1.31454C6.86913 1.24996 7.62453 1.24998 8.52755 1.25Z',
  d14: 'M22 10V8H2V22H12',
  d15: 'M2 8L5 2L19 2.00001L22 8',
  d16: 'M9 12H12',
  d17: 'M18 12C15.7909 12 14 13.8089 14 16.0403C14 17.3163 14.5 18.3083 15.5 19.1945C16.2049 19.8191 17.4873 21.159 18 22C18.5386 21.1757 19.7951 19.8191 20.5 19.1945C21.5 18.3083 22 17.3163 22 16.0403C22 13.8089 20.2091 12 18 12Z',
  d18: 'M18 11.25C15.3696 11.25 13.25 13.4018 13.25 16.0403C13.25 17.5592 13.8644 18.7472 15.0026 19.7558C15.6888 20.3639 17.5339 22.0046 17.9882 22.7499C18.4792 21.9986 20.3246 20.352 20.9974 19.7558C22.1356 18.7472 22.75 17.5592 22.75 16.0403C22.75 13.4018 20.6304 11.25 18 11.25ZM17.9911 14C16.8914 14 16 14.8954 16 16C16 17.1046 16.8914 18 17.9911 18H18.0089C19.1086 18 20 17.1046 20 16C20 14.8954 19.1086 14 18.0089 14H17.9911Z',
  d19: 'M19.5131 1.25001L4.47905 1.25L1.25 7.80279V22C1.25 22.4142 1.58579 22.75 2 22.75H16.0171C15.877 22.6078 15.7186 22.4514 15.5439 22.2838C14.9635 21.727 14.3504 21.1821 14.0078 20.8784C12.5938 19.6254 11.75 18.0456 11.75 16.0403C11.75 12.5883 14.5263 9.75 18 9.75C19.9089 9.75 21.6073 10.6072 22.75 11.9523V7.80279L19.5131 1.25001ZM20.2683 7.25L18.2948 3.25L12.9842 3.25V7.25H20.2683ZM11.0107 7.25V3.25L5.70005 3.25L3.72656 7.25H11.0107Z',
};

export const IconDeliveryTracking01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="delivery-tracking-01-stroke-rounded IconDeliveryTracking01StrokeRounded"
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
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconDeliveryTracking01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="delivery-tracking-01-duotone-rounded IconDeliveryTracking01DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
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
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconDeliveryTracking01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="delivery-tracking-01-twotone-rounded IconDeliveryTracking01TwotoneRounded"
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
        strokeLinejoin="round" 
      />
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
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconDeliveryTracking01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="delivery-tracking-01-solid-rounded IconDeliveryTracking01SolidRounded"
    >
      <path 
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
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconDeliveryTracking01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="delivery-tracking-01-bulk-rounded IconDeliveryTracking01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconDeliveryTracking01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="delivery-tracking-01-stroke-sharp IconDeliveryTracking01StrokeSharp"
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
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d16} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d17} 
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
    </TheIconWrapper>
  );
};

export const IconDeliveryTracking01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="delivery-tracking-01-solid-sharp IconDeliveryTracking01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfDeliveryTracking01: TheIconSelfPack = {
  name: 'DeliveryTracking01',
  StrokeRounded: IconDeliveryTracking01StrokeRounded,
  DuotoneRounded: IconDeliveryTracking01DuotoneRounded,
  TwotoneRounded: IconDeliveryTracking01TwotoneRounded,
  SolidRounded: IconDeliveryTracking01SolidRounded,
  BulkRounded: IconDeliveryTracking01BulkRounded,
  StrokeSharp: IconDeliveryTracking01StrokeSharp,
  SolidSharp: IconDeliveryTracking01SolidSharp,
};