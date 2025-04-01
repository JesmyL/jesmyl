import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 8H21M16 12V21M8 12V3M12 16H3',
  d2: 'M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z',
  d3: 'M16 12V21M12 16H3M8 12V3M12 8H21',
  d4: 'M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z',
  d5: 'M7 4.13753C7 3.38476 7 3.00838 6.72472 2.86988C6.44944 2.73139 6.16605 2.94173 5.59928 3.36241C2.96021 5.32127 1.25 8.46091 1.25 12C1.25 12.7794 1.33295 13.5395 1.4905 14.2718C1.62173 14.8818 1.80577 15 2.42536 15H6.79855C7.29958 15 7.5501 15 7.63904 14.8653C7.72798 14.7306 7.61863 14.4746 7.39992 13.9627C7.14249 13.3601 7 12.6967 7 12V4.13753Z',
  d6: 'M4.13753 17C3.38476 17 3.00838 17 2.86988 17.2753C2.73139 17.5506 2.94173 17.8339 3.36241 18.4007C5.32127 21.0398 8.46091 22.75 12 22.75C12.7794 22.75 13.5395 22.6671 14.2718 22.5095C14.8818 22.3783 15 22.1942 15 21.5746V17.2015C15 16.7004 15 16.4499 14.8653 16.361C14.7306 16.272 14.4746 16.3814 13.9627 16.6001C13.3601 16.8575 12.6967 17 12 17H4.13753Z',
  d7: 'M17 19.8625C17 20.6152 17 20.9916 17.2753 21.1301C17.5506 21.2686 17.8339 21.0583 18.4007 20.6376C21.0398 18.6787 22.75 15.5391 22.75 12C22.75 11.2206 22.6671 10.4605 22.5095 9.72821C22.3783 9.11823 22.1942 9 21.5746 9H17.2015C16.7004 9 16.4499 9 16.361 9.13471C16.272 9.26942 16.3814 9.52538 16.6001 10.0373C16.8575 10.6399 17 11.3033 17 12V19.8625Z',
  d8: 'M19.8625 7C20.6152 7 20.9916 7 21.1301 6.72472C21.2686 6.44944 21.0583 6.16605 20.6376 5.59928C18.6787 2.96021 15.5391 1.25 12 1.25C11.2206 1.25 10.4605 1.33295 9.72821 1.4905C9.11823 1.62173 9 1.80577 9 2.42536V6.79855C9 7.29959 9 7.5501 9.13471 7.63904C9.26942 7.72798 9.52538 7.61863 10.0373 7.39992C10.6399 7.14249 11.3033 7 12 7H19.8625Z',
  d9: 'M7 2.48111C3.58115 4.28064 1.25 7.86809 1.25 12C1.25 13.0412 1.39803 14.0478 1.67418 15H7.99963C7.37194 14.1643 7 13.1256 7 12V2.48111Z',
  d10: 'M2.48111 17C4.28064 20.4189 7.86809 22.75 12 22.75C13.0412 22.75 14.0478 22.602 15 22.3258V16.0004C14.1643 16.6281 13.1256 17 12 17H2.48111Z',
  d11: 'M17 21.5189C20.4189 19.7194 22.75 16.1319 22.75 12C22.75 10.9588 22.602 9.95216 22.3258 9H16.0004C16.6281 9.83566 17 10.8744 17 12V21.5189Z',
  d12: 'M21.5189 7C19.7194 3.58115 16.1319 1.25 12 1.25C10.9588 1.25 9.95216 1.39803 9 1.67418V7.99963C9.83566 7.37194 10.8744 7 12 7H21.5189Z',
  d13: 'M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z',
};

export const IconCameraLensStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="camera-lens-stroke-rounded IconCameraLensStrokeRounded"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="12" 
        cy="12" 
        r="4" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCameraLensDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="camera-lens-duotone-rounded IconCameraLensDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="12" 
        cy="12" 
        r="4" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCameraLensTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="camera-lens-twotone-rounded IconCameraLensTwotoneRounded"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <path 
        opacity="0.5" 
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
    </TheIconWrapper>
  );
};

export const IconCameraLensSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="camera-lens-solid-rounded IconCameraLensSolidRounded"
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
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <circle 
        cx="12" 
        cy="12" 
        r="3" 
        fill="var(--icon-fill)"></circle>
    </TheIconWrapper>
  );
};

export const IconCameraLensBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="camera-lens-bulk-rounded IconCameraLensBulkRounded"
    >
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      </g>
      <circle 
        cx="12" 
        cy="12" 
        r="3" 
        fill="var(--icon-fill)"></circle>
    </TheIconWrapper>
  );
};

export const IconCameraLensStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="camera-lens-stroke-sharp IconCameraLensStrokeSharp"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="12" 
        cy="12" 
        r="4" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCameraLensSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="camera-lens-solid-sharp IconCameraLensSolidSharp"
    >
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
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfCameraLens: TheIconSelfPack = {
  name: 'CameraLens',
  StrokeRounded: IconCameraLensStrokeRounded,
  DuotoneRounded: IconCameraLensDuotoneRounded,
  TwotoneRounded: IconCameraLensTwotoneRounded,
  SolidRounded: IconCameraLensSolidRounded,
  BulkRounded: IconCameraLensBulkRounded,
  StrokeSharp: IconCameraLensStrokeSharp,
  SolidSharp: IconCameraLensSolidSharp,
};