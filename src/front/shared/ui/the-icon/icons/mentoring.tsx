import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 22L10 16H2L4 22H12ZM12 22H16',
  d2: 'M12 13V12.5C12 10.6144 12 9.67157 11.4142 9.08579C10.8284 8.5 9.88562 8.5 8 8.5C6.11438 8.5 5.17157 8.5 4.58579 9.08579C4 9.67157 4 10.6144 4 12.5V13',
  d3: 'M19 13C19 14.1046 18.1046 15 17 15C15.8954 15 15 14.1046 15 13C15 11.8954 15.8954 11 17 11C18.1046 11 19 11.8954 19 13Z',
  d4: 'M10 4C10 5.10457 9.10457 6 8 6C6.89543 6 6 5.10457 6 4C6 2.89543 6.89543 2 8 2C9.10457 2 10 2.89543 10 4Z',
  d5: 'M14 17.5H20C21.1046 17.5 22 18.3954 22 19.5V20C22 21.1046 21.1046 22 20 22H19',
  d6: 'M12 12.5V13H4V12.5C4 10.6144 4 9.67157 4.58579 9.08579C5.17157 8.5 6.11438 8.5 8 8.5C9.88562 8.5 10.8284 8.5 11.4142 9.08579C12 9.67157 12 10.6144 12 12.5Z',
  d7: 'M10 16L12 22H4L2 16H10Z',
  d8: 'M8 7.75C8.89848 7.74997 9.6997 7.74995 10.2945 7.82991C10.9223 7.91432 11.4891 8.09999 11.9445 8.55546C12.4 9.01093 12.5857 9.57773 12.6701 10.2055C12.7501 10.8003 12.75 11.5495 12.75 12.448V12.448L12.75 13C12.75 13.4142 12.4142 13.75 12 13.75H4C3.58579 13.75 3.25 13.4142 3.25 13L3.25 12.448V12.448C3.24997 11.5495 3.24995 10.8003 3.32991 10.2055C3.41432 9.57773 3.59999 9.01093 4.05546 8.55546C4.51093 8.09999 5.07773 7.91432 5.70552 7.82991C6.3003 7.74995 7.10152 7.74997 8 7.75Z',
  d9: 'M14.25 13C14.25 11.4812 15.4812 10.25 17 10.25C18.5188 10.25 19.75 11.4812 19.75 13C19.75 14.5188 18.5188 15.75 17 15.75C15.4812 15.75 14.25 14.5188 14.25 13Z',
  d10: 'M5.25 4C5.25 2.48122 6.48122 1.25 8 1.25C9.51878 1.25 10.75 2.48122 10.75 4C10.75 5.51878 9.51878 6.75 8 6.75C6.48122 6.75 5.25 5.51878 5.25 4Z',
  d11: 'M1.43448 15.6393C1.61815 15.3949 1.91314 15.25 2.22728 15.25H10.0455C10.4661 15.25 10.8396 15.5082 10.9726 15.891L12.7044 20.875H15.5227C16.0625 20.875 16.5 21.2947 16.5 21.8125C16.5 22.3303 16.0625 22.75 15.5227 22.75H3.47745L1.30016 16.484C1.20082 16.1981 1.2508 15.8838 1.43448 15.6393Z',
  d12: 'M12.9773 17.5938C12.9773 17.076 13.4148 16.6562 13.9545 16.6562H19.8182C21.4374 16.6562 22.75 17.9154 22.75 19.4688V19.9375C22.75 21.4908 21.4374 22.75 19.8182 22.75H18.9773C18.4375 22.75 18 22.3303 18 21.8125C18 21.2947 18.4375 20.875 18.9773 20.875H19.8182C20.3579 20.875 20.7955 20.4553 20.7955 19.9375V19.4688C20.7955 18.951 20.3579 18.5312 19.8182 18.5312H13.9545C13.4148 18.5312 12.9773 18.1115 12.9773 17.5938Z',
  d13: 'M4.00195 13.5V8.5H12.0096V13.5',
  d14: 'M19.0155 13C19.0155 14.1046 18.1193 15 17.0136 15C15.908 15 15.0117 14.1046 15.0117 13C15.0117 11.8954 15.908 11 17.0136 11C18.1193 11 19.0155 11.8954 19.0155 13Z',
  d15: 'M10.0077 4C10.0077 5.10457 9.11144 6 8.00581 6C6.90019 6 6.00391 5.10457 6.00391 4C6.00391 2.89543 6.90019 2 8.00581 2C9.11144 2 10.0077 2.89543 10.0077 4Z',
  d16: 'M13.5098 17.5H22.0179V22H18.0141',
  d17: 'M16.0297 21.995H12.0761M12.0761 21.995H3.96531C3.96097 21.995 3.95713 21.9922 3.95579 21.9881L2.02198 16.0522C2.01988 16.0457 2.0247 16.0391 2.0315 16.0391H9.99739C10.0017 16.0391 10.0054 16.0418 10.0068 16.0458L12.0761 21.995Z',
  d18: 'M3.25 12.5C3.25 9.87665 5.37665 7.75 8 7.75C10.6234 7.75 12.75 9.87665 12.75 12.5V13C12.75 13.4142 12.4142 13.75 12 13.75H4C3.58579 13.75 3.25 13.4142 3.25 13V12.5Z',
  d19: 'M1.43448 15.6393C1.61815 15.3949 1.91314 15.25 2.22728 15.25H10.0455C10.4661 15.25 10.8396 15.5082 10.9726 15.891L12.7044 20.875H15.9091V22.75H4.18182C3.76118 22.75 3.38772 22.4918 3.2547 22.109L1.30016 16.484C1.20082 16.1981 1.2508 15.8838 1.43448 15.6393Z',
  d20: 'M20.7955 18.5312H13.4659V16.6562H21.7727C22.3125 16.6562 22.75 17.076 22.75 17.5938V21.8125C22.75 22.3303 22.3125 22.75 21.7727 22.75H17.8636V20.875H20.7955V18.5312Z',
};

export const IconMentoringStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mentoring-stroke-rounded IconMentoringStrokeRounded"
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
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMentoringDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mentoring-duotone-rounded IconMentoringDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMentoringTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mentoring-twotone-rounded IconMentoringTwotoneRounded"
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
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMentoringSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mentoring-solid-rounded IconMentoringSolidRounded"
    >
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

export const IconMentoringBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mentoring-bulk-rounded IconMentoringBulkRounded"
    >
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="0.3" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <g 
        opacity="var(--icon-opacity)">
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

export const IconMentoringStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mentoring-stroke-sharp IconMentoringStrokeSharp"
    >
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d14} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d15} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d16} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d17} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconMentoringSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mentoring-solid-sharp IconMentoringSolidSharp"
    >
      <path 
        d={d.d18} 
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

export const iconPackOfMentoring: TheIconSelfPack = {
  name: 'Mentoring',
  StrokeRounded: IconMentoringStrokeRounded,
  DuotoneRounded: IconMentoringDuotoneRounded,
  TwotoneRounded: IconMentoringTwotoneRounded,
  SolidRounded: IconMentoringSolidRounded,
  BulkRounded: IconMentoringBulkRounded,
  StrokeSharp: IconMentoringStrokeSharp,
  SolidSharp: IconMentoringSolidSharp,
};