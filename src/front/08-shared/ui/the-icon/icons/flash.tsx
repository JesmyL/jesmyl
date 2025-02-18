import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M5.22576 11.3294L12.224 2.34651C12.7713 1.64397 13.7972 2.08124 13.7972 3.01707V9.96994C13.7972 10.5305 14.1995 10.985 14.6958 10.985H18.0996C18.8729 10.985 19.2851 12.0149 18.7742 12.6706L11.776 21.6535C11.2287 22.356 10.2028 21.9188 10.2028 20.9829V14.0301C10.2028 13.4695 9.80048 13.015 9.3042 13.015H5.90035C5.12711 13.015 4.71494 11.9851 5.22576 11.3294Z',
  d2: 'M13 2.00746C12.7283 1.97028 12.4392 2.07034 12.224 2.34664L5.22576 11.3329C4.71494 11.9889 5.12711 13.0191 5.90035 13.0191H9.30419C9.80048 13.0191 10.2028 13.4738 10.2028 14.0345V20.99C10.2028 21.5581 10.5806 21.9426 11 22',
  d3: 'M13.6076 1.14723C14.3143 1.44842 14.7969 2.16259 14.7969 3.01681L14.7976 9.78474C14.7976 9.89519 14.8871 9.98472 14.9976 9.98472H18.0993C18.9851 9.98472 19.5954 10.5826 19.8466 11.2101C20.0974 11.8369 20.0636 12.642 19.5628 13.2849L12.5645 22.2678C12.0032 22.9883 11.1205 23.1629 10.3917 22.8523C9.68508 22.5511 9.20248 21.8369 9.20248 20.9827L9.20181 14.2148C9.2018 14.1043 9.11226 14.0148 9.00181 14.0148H5.90003C5.01422 14.0148 4.40394 13.4169 4.1528 12.7894C3.90193 12.1626 3.93574 11.3575 4.43658 10.7146L11.4348 1.73169C11.9962 1.01115 12.8788 0.83658 13.6076 1.14723Z',
  d4: 'M14.9969 9.98514H18.0987C18.9845 9.98514 19.5948 10.583 19.8459 11.2105C20.0968 11.8373 20.063 12.6424 19.5621 13.2853L12.5639 22.2682C12.0026 22.9888 11.1199 23.1633 10.3911 22.8527C9.68444 22.5515 9.20184 21.8373 9.20184 20.9831L9.20117 14.2152L14.7969 9.78516C14.7969 9.89561 14.8865 9.98514 14.9969 9.98514Z',
  d5: 'M4.99902 13.9998L13.4998 2.99976V11.9849L18.9998 11.9998L10.499 22.9998V13.9998H4.99902Z',
  d6: 'M14 1.25V10.5H20L10 22.75V13.5H4L14 1.25Z',
};

export const IconFlashStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="flash-stroke-rounded IconFlashStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconFlashDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="flash-duotone-rounded IconFlashDuotoneRounded"
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
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconFlashTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="flash-twotone-rounded IconFlashTwotoneRounded"
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
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconFlashSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="flash-solid-rounded IconFlashSolidRounded"
    >
      <path 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconFlashBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="flash-bulk-rounded IconFlashBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconFlashStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="flash-stroke-sharp IconFlashStrokeSharp"
    >
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconFlashSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="flash-solid-sharp IconFlashSolidSharp"
    >
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfFlash: TheIconSelfPack = {
  name: 'Flash',
  StrokeRounded: IconFlashStrokeRounded,
  DuotoneRounded: IconFlashDuotoneRounded,
  TwotoneRounded: IconFlashTwotoneRounded,
  SolidRounded: IconFlashSolidRounded,
  BulkRounded: IconFlashBulkRounded,
  StrokeSharp: IconFlashStrokeSharp,
  SolidSharp: IconFlashSolidSharp,
};