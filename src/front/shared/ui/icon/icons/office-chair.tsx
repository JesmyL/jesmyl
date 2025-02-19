import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M16 22C14.934 20.7553 13.5337 20 12 20C10.4663 20 9.06603 20.7553 8 22',
  d2: 'M12 13C10.7319 13 9.39109 13.2193 8.34002 13.5128C7.54859 13.7338 6.91195 14.7415 7.00999 15.5596C7.04632 15.8627 7.30731 16 7.58173 16H16.4183C16.6927 16 16.9537 15.8627 16.99 15.5596C17.0881 14.7415 16.4514 13.7338 15.66 13.5128C14.6089 13.2193 13.2681 13 12 13Z',
  d3: 'M21 10C19.8954 10 19 10.8954 19 12V13C19 14.1046 18.1046 15 17 15',
  d4: 'M3 10C4.10457 10 5 10.8954 5 12V13C5 14.1046 5.89543 15 7 15',
  d5: 'M12 16V22',
  d6: 'M12.8197 10H11.1803C9.77811 10 9.07704 10 8.56988 9.57641C8.06272 9.15282 7.89268 8.42526 7.55261 6.97014C7.01792 4.68228 6.75058 3.53835 7.31199 2.76918C7.87341 2 8.97569 2 11.1803 2H12.8197C15.0243 2 16.1266 2 16.688 2.76918C17.2494 3.53835 16.9821 4.68228 16.4474 6.97014C16.1073 8.42526 15.9373 9.15282 15.4301 9.57641C14.923 10 14.2219 10 12.8197 10Z',
  d7: 'M12 10V13',
  d8: 'M16 22C14.934 20.7553 13.5337 20 12 20C10.4663 20 9.06603 20.7553 8 22M12 16V22',
  d9: 'M12.0001 16.625H7.5818C7.32846 16.625 7.03585 16.5628 6.77911 16.3847C6.50439 16.194 6.30987 15.8949 6.2654 15.5238C6.19075 14.901 6.3953 14.2715 6.71093 13.7813C7.02591 13.2921 7.51848 12.8385 8.1384 12.6655C9.24585 12.3562 10.6548 12.125 12.0001 12.125C13.3454 12.125 14.7542 12.3562 15.8616 12.6655C16.4815 12.8385 16.9741 13.2921 17.2891 13.7813C17.6047 14.2715 17.8092 14.901 17.7346 15.5238C17.6901 15.8949 17.4956 16.194 17.2209 16.3847C16.9641 16.5628 16.6715 16.625 16.4182 16.625H12.0001Z',
  d10: 'M21 10.875C20.4477 10.875 20 11.3227 20 11.875V12.875C20 14.5319 18.6569 15.875 17 15.875C16.4477 15.875 16 15.4273 16 14.875C16 14.3227 16.4477 13.875 17 13.875C17.5523 13.875 18 13.4273 18 12.875V11.875C18 10.2181 19.3431 8.875 21 8.875C21.5523 8.875 22 9.32272 22 9.875C22 10.4273 21.5523 10.875 21 10.875Z',
  d11: 'M3 10.875C3.55228 10.875 4 11.3227 4 11.875V12.875C4 14.5319 5.34315 15.875 7 15.875C7.55228 15.875 8 15.4273 8 14.875C8 14.3227 7.55228 13.875 7 13.875C6.44772 13.875 6 13.4273 6 12.875V11.875C6 10.2181 4.65685 8.875 3 8.875C2.44772 8.875 2 9.32272 2 9.875C2 10.4273 2.44772 10.875 3 10.875Z',
  d12: 'M12 14.875C12.5523 14.875 13 15.3227 13 15.875V18.964C14.4698 19.228 15.7641 20.0622 16.7595 21.2245C17.1188 21.644 17.07 22.2753 16.6505 22.6345C16.231 22.9938 15.5997 22.945 15.2405 22.5255C14.5859 21.7611 13.8175 21.2466 13 21.015V21.875C13 22.4273 12.5523 22.875 12 22.875C11.4477 22.875 11 22.4273 11 21.875V21.015C10.1826 21.2466 9.41418 21.7611 8.75954 22.5255C8.40029 22.945 7.76901 22.9938 7.34954 22.6345C6.93006 22.2753 6.88125 21.644 7.2405 21.2245C8.23593 20.0622 9.53019 19.228 11 18.964V15.875C11 15.3227 11.4477 14.875 12 14.875Z',
  d13: 'M11.1184 1.125L11.1802 1.125L12.8815 1.125H12.8816C13.9311 1.12496 14.8059 1.12493 15.4847 1.22997C16.2041 1.34129 16.8474 1.59052 17.2938 2.20201C17.7318 2.80215 17.7962 3.50064 17.7253 4.24611C17.657 4.96498 17.4469 5.86378 17.1904 6.96153L17.1903 6.96156L17.168 7.05708C17.0062 7.74949 16.8706 8.32986 16.7079 8.78673C16.5365 9.2681 16.3079 9.69539 15.9109 10.027C15.5089 10.3628 15.0519 10.5025 14.5557 10.566C14.0939 10.6251 13.5275 10.625 12.8657 10.625H11.1342C10.4724 10.625 9.90603 10.6251 9.44425 10.566C8.94805 10.5025 8.491 10.3628 8.08906 10.027C7.69197 9.69539 7.46345 9.2681 7.29201 8.78673C7.1293 8.32986 6.99369 7.74949 6.83189 7.05709L6.83189 7.05708L6.80957 6.96159C6.55299 5.86382 6.34291 4.96499 6.27459 4.24611C6.20374 3.50064 6.26812 2.80215 6.70615 2.20201C7.15247 1.59052 7.79583 1.34129 8.5152 1.22997C9.19401 1.12493 10.0688 1.12496 11.1184 1.125H11.1184Z',
  d14: 'M12 8.875C12.5523 8.875 13 9.32272 13 9.875V12.875C13 13.4273 12.5523 13.875 12 13.875C11.4477 13.875 11 13.4273 11 12.875V9.875C11 9.32272 11.4477 8.875 12 8.875Z',
  d15: 'M11 16.625H13V18.964C14.4698 19.228 15.7641 20.0622 16.7595 21.2245C17.1188 21.644 17.07 22.2753 16.6505 22.6345C16.231 22.9938 15.5997 22.945 15.2405 22.5255C14.5859 21.7611 13.8175 21.2466 13 21.015V21.875C13 22.4273 12.5523 22.875 12 22.875C11.4477 22.875 11 22.4273 11 21.875V21.015C10.1826 21.2466 9.41418 21.7611 8.75954 22.5255C8.40029 22.945 7.76901 22.9938 7.34954 22.6345C6.93006 22.2753 6.88125 21.644 7.2405 21.2245C8.23593 20.0622 9.53019 19.228 11 18.964V16.625Z',
  d16: 'M11 12.1648C11.3336 12.139 11.6688 12.125 12.0001 12.125C12.3314 12.125 12.6665 12.139 13 12.1648V10.625H11V12.1648Z',
  d17: 'M17.3161 13.824C17.6163 14.3078 17.8071 14.9189 17.7346 15.5238C17.723 15.621 17.701 15.7132 17.67 15.7999C19.0043 15.4955 20 14.3015 20 12.875V11.875C20 11.3227 20.4477 10.875 21 10.875C21.5523 10.875 22 10.4273 22 9.875C22 9.32272 21.5523 8.875 21 8.875C19.3431 8.875 18 10.2181 18 11.875V12.875C18 13.3168 17.7135 13.6917 17.3161 13.824Z',
  d18: 'M6.32995 15.7999C6.29898 15.7132 6.27704 15.621 6.2654 15.5238C6.1929 14.9189 6.38374 14.3078 6.68392 13.824C6.28653 13.6917 6 13.3168 6 12.875V11.875C6 10.2181 4.65685 8.875 3 8.875C2.44772 8.875 2 9.32272 2 9.875C2 10.4273 2.44772 10.875 3 10.875C3.55228 10.875 4 11.3227 4 11.875V12.875C4 14.3015 4.99566 15.4955 6.32995 15.7999Z',
  d19: 'M7 16H17V15.25C17 14.0074 16.0406 13 14.8571 13H9.14286C7.95939 13 7 14.0074 7 15.25V16Z',
  d20: 'M21 10L19 11V13C19 14.1046 18.1046 15 17 15',
  d21: 'M3 10L5 11V13C5 14.1046 5.89543 15 7 15',
  d22: 'M8 10L7 2H17L16 10H8Z',
  d23: 'M7.24023 21.4494C8.4559 20.0299 10.1172 19.0999 11.9998 19.0999C13.8823 19.0999 15.5436 20.0299 16.7593 21.4494L15.2402 22.7503C14.3238 21.6803 13.1845 21.0999 11.9998 21.0999C10.815 21.0999 9.67567 21.6803 8.75928 22.7503L7.24023 21.4494Z',
  d24: 'M6.25 15.25C6.25 13.628 7.51111 12.25 9.14286 12.25H14.8571C16.4889 12.25 17.75 13.628 17.75 15.25V16.75H6.25V15.25Z',
  d25: 'M20.0447 11.6182L21.5 10.8946L20.6006 9.10571L18.0335 10.3821V13.0001C18.0335 13.5524 17.5833 14.0001 17.0279 14.0001V16.0001C18.6941 16.0001 20.0447 14.657 20.0447 13.0001V11.6182Z',
  d26: 'M3.39941 9.10571L5.96647 10.3821V13.0001C5.96647 13.5524 6.41669 14.0001 6.97206 14.0001V16.0001C5.30594 16.0001 3.95529 14.657 3.95529 13.0001V11.6182L2.5 10.8946L3.39941 9.10571Z',
  d27: 'M11 22V16H13V22H11Z',
  d28: 'M7.2558 10.093C7.30271 10.4683 7.62176 10.75 8 10.75H16C16.3782 10.75 16.6973 10.4683 16.7442 10.093L17.7442 2.09303C17.7709 1.87956 17.7046 1.66492 17.5623 1.50365C17.4199 1.34237 17.2151 1.25 17 1.25H7C6.78488 1.25 6.58011 1.34237 6.43775 1.50365C6.29538 1.66492 6.22911 1.87956 6.2558 2.09303L7.2558 10.093Z',
  d29: 'M11 13V10H13V13H11Z',
};

export const IconOfficeChairStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="office-chair-stroke-rounded IconOfficeChairStrokeRounded"
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

export const IconOfficeChairDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="office-chair-duotone-rounded IconOfficeChairDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
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

export const IconOfficeChairTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="office-chair-twotone-rounded IconOfficeChairTwotoneRounded"
    >
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
      <path 
        d={d.d4} 
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
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconOfficeChairSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="office-chair-solid-rounded IconOfficeChairSolidRounded"
    >
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconOfficeChairBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="office-chair-bulk-rounded IconOfficeChairBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
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
    </TheIconWrapper>
  );
};

export const IconOfficeChairStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="office-chair-stroke-sharp IconOfficeChairStrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d19} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d20} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d21} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d22} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconOfficeChairSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="office-chair-solid-sharp IconOfficeChairSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d23} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d24} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d25} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d26} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d27} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d28} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d29} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfOfficeChair: TheIconSelfPack = {
  name: 'OfficeChair',
  StrokeRounded: IconOfficeChairStrokeRounded,
  DuotoneRounded: IconOfficeChairDuotoneRounded,
  TwotoneRounded: IconOfficeChairTwotoneRounded,
  SolidRounded: IconOfficeChairSolidRounded,
  BulkRounded: IconOfficeChairBulkRounded,
  StrokeSharp: IconOfficeChairStrokeSharp,
  SolidSharp: IconOfficeChairSolidSharp,
};