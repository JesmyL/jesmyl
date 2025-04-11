import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3 12C3 11.4188 3 11.1282 3.0575 10.8897C3.21354 10.2427 3.6684 9.73726 4.25074 9.56389C4.46534 9.5 4.72689 9.5 5.25 9.5H18.75C19.2731 9.5 19.5347 9.5 19.7493 9.56389C20.3316 9.73726 20.7865 10.2427 20.9425 10.8897C21 11.1282 21 11.4188 21 12C21 12.5812 21 12.8718 20.9425 13.1103C20.7865 13.7573 20.3316 14.2627 19.7493 14.4361C19.5347 14.5 19.2731 14.5 18.75 14.5H5.25C4.72689 14.5 4.46534 14.5 4.25074 14.4361C3.6684 14.2627 3.21354 13.7573 3.0575 13.1103C3 12.8718 3 12.5812 3 12Z',
  d2: 'M3 12C3 11.4188 3 11.1282 3.0575 10.8897C3.21354 10.2427 3.6684 9.73726 4.25074 9.56389C4.46534 9.5 4.72689 9.5 5.25 9.5H18.75C19.2731 9.5 19.5347 9.5 19.7493 9.56389C20.3316 9.73726 20.7865 10.2427 20.9425 10.8897C21 11.1282 21 11.4188 21 12',
  d3: 'M5.15689 8.74995L5.25001 8.75001H18.75L18.8431 8.74995C19.2729 8.74946 19.6407 8.74905 19.9633 8.84508C20.8301 9.10317 21.4602 9.83708 21.6716 10.7139C21.7505 11.0412 21.7503 11.4171 21.75 11.9096L21.75 12L21.75 12.0904C21.7503 12.5829 21.7505 12.9588 21.6716 13.2861C21.4602 14.163 20.8301 14.8969 19.9633 15.1549C19.6407 15.251 19.2729 15.2506 18.8431 15.2501L18.75 15.25H5.25001L5.15688 15.2501C4.72716 15.2506 4.35931 15.251 4.03674 15.1549C3.16987 14.8969 2.53986 14.163 2.32841 13.2861C2.24948 12.9588 2.24969 12.5829 2.24997 12.0904L2.25001 12L2.24997 11.9097C2.24969 11.4171 2.24948 11.0412 2.32841 10.7139C2.53986 9.83708 3.16987 9.10317 4.03674 8.84508C4.35931 8.74905 4.72716 8.74946 5.15689 8.74995Z',
  d4: 'M5.15695 8.74995L5.25007 8.75001H12.0001V15.25H5.25007L5.15694 15.2501C4.72722 15.2506 4.35937 15.251 4.0368 15.1549C3.16993 14.8969 2.53992 14.163 2.32847 13.2861C2.24954 12.9588 2.24975 12.5829 2.25003 12.0904L2.25007 12L2.25003 11.9097C2.24975 11.4171 2.24954 11.0412 2.32847 10.7139C2.53992 9.83708 3.16993 9.10317 4.0368 8.84508C4.35937 8.74905 4.72722 8.74946 5.15695 8.74995Z',
  d5: 'M18.7501 8.75001L18.8432 8.74995C19.2729 8.74946 19.6408 8.74905 19.9633 8.84508C20.8302 9.10317 21.4602 9.83708 21.6717 10.7139C21.7506 11.0412 21.7504 11.4171 21.7501 11.9096L21.7501 12L21.7501 12.0904C21.7504 12.5829 21.7506 12.9588 21.6717 13.2861C21.4602 14.163 20.8302 14.8969 19.9633 15.1549C19.6408 15.251 19.2729 15.2506 18.8432 15.2501L18.7501 15.25H12.0001V8.75001H18.7501Z',
  d6: 'M21 10H3V14H21V10Z',
  d7: 'M2.25 10C2.25 9.58579 2.58579 9.25 3 9.25H21C21.4142 9.25 21.75 9.58579 21.75 10V14C21.75 14.4142 21.4142 14.75 21 14.75H3C2.80109 14.75 2.61032 14.671 2.46967 14.5303C2.32902 14.3897 2.25 14.1989 2.25 14V10Z',
};

export const IconRemove02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Remove02 StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconRemove02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Remove02 DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconRemove02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Remove02 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sw"
      />
      <path 
        d={d.d2}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconRemove02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Remove02 SolidRounded"
    >
      <path 
        d={d.d3}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconRemove02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Remove02 BulkRounded"
    >
      <path 
        d={d.d4}
        i-c="f"
      />
      <path 
        d={d.d5}
        i-c="f o7"
      />
    </TheIconWrapper>
  );
};

export const IconRemove02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Remove02 StrokeSharp"
    >
      <path 
        d={d.d6}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconRemove02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Remove02 SolidSharp"
    >
      <path 
        d={d.d7}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfRemove02: TheIconSelfPack = [
  'Remove02',
  IconRemove02StrokeRounded,
  IconRemove02DuotoneRounded,
  IconRemove02TwotoneRounded,
  IconRemove02SolidRounded,
  IconRemove02BulkRounded,
  IconRemove02StrokeSharp,
  IconRemove02SolidSharp,
];