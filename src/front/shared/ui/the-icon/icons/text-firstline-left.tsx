import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3 3.5H9',
  d2: 'M3 9.5H9',
  d3: 'M3 15.5H21',
  d4: 'M3 21.5H21',
  d5: 'M13.5858 9.91421C14.1716 10.5 15.1144 10.5 17 10.5C18.8856 10.5 19.8284 10.5 20.4142 9.91421C21 9.32843 21 8.38562 21 6.5C21 4.61438 21 3.67157 20.4142 3.08579C19.8284 2.5 18.8856 2.5 17 2.5C15.1144 2.5 14.1716 2.5 13.5858 3.08579C13 3.67157 13 4.61438 13 6.5C13 8.38562 13 9.32843 13.5858 9.91421Z',
  d6: 'M10 9.375C10 8.82272 9.55228 8.375 9 8.375H3C2.44772 8.375 2 8.82272 2 9.375C2 9.92728 2.44772 10.375 3 10.375H9C9.55228 10.375 10 9.92728 10 9.375Z',
  d7: 'M10 3.375C10 2.82272 9.55228 2.375 9 2.375H3C2.44772 2.375 2 2.82272 2 3.375C2 3.92728 2.44772 4.375 3 4.375H9C9.55228 4.375 10 3.92728 10 3.375Z',
  d8: 'M22 15.375C22 14.8227 21.5523 14.375 21 14.375H3C2.44772 14.375 2 14.8227 2 15.375C2 15.9273 2.44772 16.375 3 16.375H21C21.5523 16.375 22 15.9273 22 15.375Z',
  d9: 'M22 21.375C22 20.8227 21.5523 20.375 21 20.375H3C2.44772 20.375 2 20.8227 2 21.375C2 21.9273 2.44772 22.375 3 22.375H21C21.5523 22.375 22 21.9273 22 21.375Z',
  d10: 'M17.198 1.625C16.2995 1.62497 15.5503 1.62495 14.9555 1.70491C14.3277 1.78932 13.7609 1.97499 13.3055 2.43046C12.85 2.88593 12.6643 3.45273 12.5799 4.08052C12.4999 4.6753 12.5 5.42451 12.5 6.32298V6.32301V6.427V6.42703C12.5 7.3255 12.4999 8.07471 12.5799 8.66948C12.6643 9.29728 12.85 9.86408 13.3055 10.3195C13.7609 10.775 14.3277 10.9607 14.9555 11.0451C15.5503 11.1251 16.2995 11.125 17.198 11.125H17.198H17.302H17.302C18.2005 11.125 18.9497 11.1251 19.5445 11.0451C20.1723 10.9607 20.7391 10.775 21.1945 10.3195C21.65 9.86408 21.8357 9.29728 21.9201 8.66948C22.0001 8.07471 22 7.3255 22 6.42703V6.427V6.323V6.32297C22 5.42451 22.0001 4.6753 21.9201 4.08052C21.8357 3.45273 21.65 2.88593 21.1945 2.43046C20.7391 1.97499 20.1723 1.78932 19.5445 1.70491C18.9497 1.62495 18.2005 1.62497 17.302 1.625H17.302H17.198H17.198Z',
  d11: 'M10 9C10 8.44772 9.55228 8 9 8H3C2.44772 8 2 8.44772 2 9C2 9.55228 2.44772 10 3 10H9C9.55228 10 10 9.55228 10 9Z',
  d12: 'M10 3C10 2.44772 9.55228 2 9 2H3C2.44772 2 2 2.44772 2 3C2 3.55228 2.44772 4 3 4H9C9.55228 4 10 3.55228 10 3Z',
  d13: 'M22 15C22 14.4477 21.5523 14 21 14H3C2.44772 14 2 14.4477 2 15C2 15.5523 2.44772 16 3 16H21C21.5523 16 22 15.5523 22 15Z',
  d14: 'M22 21C22 20.4477 21.5523 20 21 20H3C2.44772 20 2 20.4477 2 21C2 21.5523 2.44772 22 3 22H21C21.5523 22 22 21.5523 22 21Z',
  d15: 'M17.198 1.25C16.2995 1.24997 15.5503 1.24995 14.9555 1.32991C14.3277 1.41432 13.7609 1.59999 13.3055 2.05546C12.85 2.51093 12.6643 3.07773 12.5799 3.70552C12.4999 4.3003 12.5 5.04951 12.5 5.94798V5.94801V6.052V6.05203C12.5 6.9505 12.4999 7.69971 12.5799 8.29448C12.6643 8.92228 12.85 9.48908 13.3055 9.94455C13.7609 10.4 14.3277 10.5857 14.9555 10.6701C15.5503 10.7501 16.2995 10.75 17.198 10.75H17.198H17.302H17.302C18.2005 10.75 18.9497 10.7501 19.5445 10.6701C20.1723 10.5857 20.7391 10.4 21.1945 9.94455C21.65 9.48908 21.8357 8.92228 21.9201 8.29448C22.0001 7.69971 22 6.9505 22 6.05203V6.052V5.948V5.94797C22 5.04951 22.0001 4.3003 21.9201 3.70552C21.8357 3.07773 21.65 2.51093 21.1945 2.05546C20.7391 1.59999 20.1723 1.41432 19.5445 1.32991C18.9497 1.24995 18.2005 1.24997 17.302 1.25H17.302H17.198H17.198Z',
  d16: 'M21 2.5H13V10.5H21V2.5Z',
  d17: 'M2 2H10V4H2V2Z',
  d18: 'M2 8H10V10H2V8Z',
  d19: 'M2 14H22V16H2V14Z',
  d20: 'M2 20H22V22H2V20Z',
  d21: 'M12.5 2.75C12.5 2.33579 12.8358 2 13.25 2H21.25C21.6642 2 22 2.33579 22 2.75V10.75C22 11.1642 21.6642 11.5 21.25 11.5H13.25C12.8358 11.5 12.5 11.1642 12.5 10.75V2.75Z',
};

export const IconTextFirstlineLeftStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="text-firstline-left-stroke-rounded IconTextFirstlineLeftStrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconTextFirstlineLeftDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="text-firstline-left-duotone-rounded IconTextFirstlineLeftDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
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
    </TheIconWrapper>
  );
};

export const IconTextFirstlineLeftTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="text-firstline-left-twotone-rounded IconTextFirstlineLeftTwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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
    </TheIconWrapper>
  );
};

export const IconTextFirstlineLeftSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="text-firstline-left-solid-rounded IconTextFirstlineLeftSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconTextFirstlineLeftBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="text-firstline-left-bulk-rounded IconTextFirstlineLeftBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
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
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconTextFirstlineLeftStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="text-firstline-left-stroke-sharp IconTextFirstlineLeftStrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d16} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTextFirstlineLeftSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="text-firstline-left-solid-sharp IconTextFirstlineLeftSolidSharp"
    >
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d20} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d21} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfTextFirstlineLeft: TheIconSelfPack = {
  name: 'TextFirstlineLeft',
  StrokeRounded: IconTextFirstlineLeftStrokeRounded,
  DuotoneRounded: IconTextFirstlineLeftDuotoneRounded,
  TwotoneRounded: IconTextFirstlineLeftTwotoneRounded,
  SolidRounded: IconTextFirstlineLeftSolidRounded,
  BulkRounded: IconTextFirstlineLeftBulkRounded,
  StrokeSharp: IconTextFirstlineLeftStrokeSharp,
  SolidSharp: IconTextFirstlineLeftSolidSharp,
};