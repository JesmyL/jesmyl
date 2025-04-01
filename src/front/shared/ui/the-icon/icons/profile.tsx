import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z',
  d2: 'M11 7L17 7',
  d3: 'M7 7L8 7',
  d4: 'M7 12L8 12',
  d5: 'M7 17L8 17',
  d6: 'M11 12L17 12',
  d7: 'M11 17L17 17',
  d8: 'M17.312 1.93059C15.9686 1.74998 14.2479 1.74999 12.0572 1.75C9.86647 1.74999 8.03144 1.74998 6.68802 1.93059C5.31137 2.11568 4.21911 2.50272 3.36091 3.36091C2.50272 4.21911 2.11568 5.31137 1.93059 6.68802C1.74998 8.03144 1.74999 9.86647 1.75 12.0572C1.74999 14.2479 1.74998 15.9686 1.93059 17.312C2.11568 18.6886 2.50272 19.7809 3.36091 20.6391C4.21911 21.4973 5.31137 21.8843 6.68802 22.0694C8.03144 22.25 9.86646 22.25 12.0572 22.25H12.0572C14.2479 22.25 15.9686 22.25 17.312 22.0694C18.6886 21.8843 19.7809 21.4973 20.6391 20.6391C21.4973 19.7809 21.8843 18.6886 22.0694 17.312C22.25 15.9686 22.25 14.2479 22.25 12.0572V12.0572C22.25 9.86646 22.25 8.03144 22.0694 6.68802C21.8843 5.31137 21.4973 4.21911 20.6391 3.36091C19.7809 2.50272 18.6886 2.11568 17.312 1.93059ZM6.5 6C5.94772 6 5.5 6.44771 5.5 7C5.5 7.55228 5.94771 8 6.5 8L7.5 8C8.05228 8 8.5 7.55229 8.5 7C8.5 6.44772 8.05229 6 7.5 6L6.5 6ZM11.5 6C10.9477 6 10.5 6.44772 10.5 7C10.5 7.55228 10.9477 8 11.5 8L17.5 8C18.0523 8 18.5 7.55229 18.5 7C18.5 6.44772 18.0523 6 17.5 6L11.5 6ZM6.5 11C5.94772 11 5.5 11.4477 5.5 12C5.5 12.5523 5.94771 13 6.5 13H7.5C8.05228 13 8.5 12.5523 8.5 12C8.5 11.4477 8.05229 11 7.5 11H6.5ZM11.5 11C10.9477 11 10.5 11.4477 10.5 12C10.5 12.5523 10.9477 13 11.5 13H17.5C18.0523 13 18.5 12.5523 18.5 12C18.5 11.4477 18.0523 11 17.5 11H11.5ZM6.5 16C5.94772 16 5.5 16.4477 5.5 17C5.5 17.5523 5.94772 18 6.5 18H7.5C8.05228 18 8.5 17.5523 8.5 17C8.5 16.4477 8.05228 16 7.5 16H6.5ZM11.5 16C10.9477 16 10.5 16.4477 10.5 17C10.5 17.5523 10.9477 18 11.5 18H17.5C18.0523 18 18.5 17.5523 18.5 17C18.5 16.4477 18.0523 16 17.5 16L11.5 16Z',
  d9: 'M12.0572 1.75C14.2479 1.74999 15.9686 1.74998 17.312 1.93059C18.6886 2.11568 19.7809 2.50272 20.6391 3.36091C21.4973 4.21911 21.8843 5.31137 22.0694 6.68802C22.25 8.03144 22.25 9.86646 22.25 12.0572V12.0572C22.25 14.2479 22.25 15.9686 22.0694 17.312C21.8843 18.6886 21.4973 19.7809 20.6391 20.6391C19.7809 21.4973 18.6886 21.8843 17.312 22.0694C15.9686 22.25 14.2479 22.25 12.0572 22.25H12.0572C9.86646 22.25 8.03144 22.25 6.68802 22.0694C5.31137 21.8843 4.21911 21.4973 3.36091 20.6391C2.50272 19.7809 2.11568 18.6886 1.93059 17.312C1.74998 15.9686 1.74999 14.2479 1.75 12.0572C1.74999 9.86647 1.74998 8.03144 1.93059 6.68802C2.11568 5.31137 2.50272 4.21911 3.36091 3.36091C4.21911 2.50272 5.31137 2.11568 6.68802 1.93059C8.03144 1.74998 9.86647 1.74999 12.0572 1.75Z',
  d10: 'M5.5 7C5.5 6.44771 5.94772 6 6.5 6L7.5 6C8.05229 6 8.5 6.44772 8.5 7C8.5 7.55229 8.05228 8 7.5 8L6.5 8C5.94771 8 5.5 7.55228 5.5 7ZM10.5 7C10.5 6.44772 10.9477 6 11.5 6L17.5 6C18.0523 6 18.5 6.44772 18.5 7C18.5 7.55229 18.0523 8 17.5 8L11.5 8C10.9477 8 10.5 7.55228 10.5 7ZM5.5 12C5.5 11.4477 5.94772 11 6.5 11L7.5 11C8.05229 11 8.5 11.4477 8.5 12C8.5 12.5523 8.05228 13 7.5 13L6.5 13C5.94771 13 5.5 12.5523 5.5 12ZM10.5 12C10.5 11.4477 10.9477 11 11.5 11L17.5 11C18.0523 11 18.5 11.4477 18.5 12C18.5 12.5523 18.0523 13 17.5 13L11.5 13C10.9477 13 10.5 12.5523 10.5 12ZM5.5 17C5.5 16.4477 5.94772 16 6.5 16H7.5C8.05228 16 8.5 16.4477 8.5 17C8.5 17.5523 8.05228 18 7.5 18H6.5C5.94772 18 5.5 17.5523 5.5 17ZM10.5 17C10.5 16.4477 10.9477 16 11.5 16L17.5 16C18.0523 16 18.5 16.4477 18.5 17C18.5 17.5523 18.0523 18 17.5 18L11.5 18C10.9477 18 10.5 17.5523 10.5 17Z',
  d11: 'M21 3H3V21H21V3Z',
  d12: 'M10 7L18 7M6 7L8 7M6 12L8 12M6 17H8M10 12L18 12M10 17L18 17',
  d13: 'M3 2.25C2.58579 2.25 2.25 2.58579 2.25 3V21C2.25 21.4142 2.58579 21.75 3 21.75H21C21.4142 21.75 21.75 21.4142 21.75 21V3C21.75 2.58579 21.4142 2.25 21 2.25H3ZM6 8L8 8V6L6 6V8ZM10 8L18 8V6L10 6V8ZM6 13H8V11H6V13ZM10 13H18V11H10V13ZM6 18H8V16H6V18ZM10 18L18 18V16L10 16V18Z',
};

export const IconProfileStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="profile-stroke-rounded IconProfileStrokeRounded"
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
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconProfileDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="profile-duotone-rounded IconProfileDuotoneRounded"
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
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconProfileTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="profile-twotone-rounded IconProfileTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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
      />
      <path 
        opacity="var(--icon-opacity)" 
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
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconProfileSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="profile-solid-rounded IconProfileSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconProfileBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="profile-bulk-rounded IconProfileBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconProfileStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="profile-stroke-sharp IconProfileStrokeSharp"
    >
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconProfileSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="profile-solid-sharp IconProfileSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfProfile: TheIconSelfPack = {
  name: 'Profile',
  StrokeRounded: IconProfileStrokeRounded,
  DuotoneRounded: IconProfileDuotoneRounded,
  TwotoneRounded: IconProfileTwotoneRounded,
  SolidRounded: IconProfileSolidRounded,
  BulkRounded: IconProfileBulkRounded,
  StrokeSharp: IconProfileStrokeSharp,
  SolidSharp: IconProfileSolidSharp,
};