import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z',
  d2: 'M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z',
  d3: 'M17.8063 14.8372C17.9226 14.9064 18.0663 14.9875 18.229 15.0793C18.9418 15.4814 20.0193 16.0893 20.7575 16.8118C21.2191 17.2637 21.6578 17.8592 21.7375 18.5888C21.8223 19.3646 21.4839 20.0927 20.8048 20.7396C19.6334 21.8556 18.2276 22.75 16.4093 22.75H7.59104C5.77274 22.75 4.36695 21.8556 3.1955 20.7396C2.51649 20.0927 2.17802 19.3646 2.26283 18.5888C2.34257 17.8592 2.78123 17.2637 3.2429 16.8118C3.98106 16.0893 5.05857 15.4814 5.77139 15.0793C5.93404 14.9875 6.07773 14.9064 6.19404 14.8372C9.74809 12.7209 14.2523 12.7209 17.8063 14.8372Z',
  d4: 'M6.75018 6.5C6.75018 3.6005 9.10068 1.25 12.0002 1.25C14.8997 1.25 17.2502 3.6005 17.2502 6.5C17.2502 9.39949 14.8997 11.75 12.0002 11.75C9.10068 11.75 6.75018 9.39949 6.75018 6.5Z',
  d5: 'M17.8063 14.8372C17.9226 14.9064 18.0663 14.9875 18.229 15.0793C18.9418 15.4814 20.0193 16.0893 20.7575 16.8118C21.2191 17.2637 21.6578 17.8592 21.7375 18.5888C21.8223 19.3646 21.4839 20.0927 20.8048 20.7396C19.6334 21.8556 18.2276 22.75 16.4093 22.75H7.59104C5.77274 22.75 4.36695 21.8556 3.1955 20.7396C2.51649 20.0927 2.17802 19.3646 2.26283 18.5888C2.34257 17.8592 2.78123 17.2637 3.2429 16.8118C3.98106 16.0893 5.05857 15.4814 5.77139 15.0793L5.77141 15.0792C5.93407 14.9875 6.07773 14.9064 6.19404 14.8372C9.74809 12.7209 14.2523 12.7209 17.8063 14.8372Z',
  d6: 'M6.75 6.5C6.75 3.6005 9.1005 1.25 12 1.25C14.8995 1.25 17.25 3.6005 17.25 6.5C17.25 9.39949 14.8995 11.75 12 11.75C9.1005 11.75 6.75 9.39949 6.75 6.5Z',
  d7: 'M3 22H21C21 17.5817 16.9706 14 12 14C7.02944 14 3 17.5817 3 22Z',
  d8: 'M2.25 22C2.25 17.0869 6.70071 13.25 12 13.25C17.2993 13.25 21.75 17.0869 21.75 22V22.75H2.25V22Z',
};

export const IconUserStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="User StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconUserDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="User DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconUserTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="User TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sw"
      />
    </TheIconWrapper>
  );
};

export const IconUserSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="User SolidRounded"
    >
      <path 
        d={d.d3}
        i-c="f"
      />
      <path 
        d={d.d4}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconUserBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="User BulkRounded"
    >
      <path 
        d={d.d5}
        i-c="f"
      />
      <path 
        d={d.d6}
        i-c="f o7"
      />
    </TheIconWrapper>
  );
};

export const IconUserStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="User StrokeSharp"
    >
      <path 
        d={d.d7}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconUserSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="User SolidSharp"
    >
      <path 
        d={d.d8}
        i-c="f"
      />
      <path 
        d={d.d6}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfUser: TheIconSelfPack = [
  'User',
  IconUserStrokeRounded,
  IconUserDuotoneRounded,
  IconUserTwotoneRounded,
  IconUserSolidRounded,
  IconUserBulkRounded,
  IconUserStrokeSharp,
  IconUserSolidSharp,
];