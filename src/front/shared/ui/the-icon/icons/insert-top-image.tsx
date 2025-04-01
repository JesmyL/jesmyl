import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3 17H19',
  d2: 'M3 21H12',
  d3: 'M3 8C3 5.64298 3 4.46447 3.73223 3.73223C4.46447 3 5.64298 3 8 3H16C18.357 3 19.5355 3 20.2678 3.73223C21 4.46447 21 5.64298 21 8C21 10.357 21 11.5355 20.2678 12.2678C19.5355 13 18.357 13 16 13H8C5.64298 13 4.46447 13 3.73223 12.2678C3 11.5355 3 10.357 3 8Z',
  d4: 'M2.25 16.875C2.25 16.3227 2.69772 15.875 3.25 15.875H19.25C19.8023 15.875 20.25 16.3227 20.25 16.875C20.25 17.4273 19.8023 17.875 19.25 17.875H3.25C2.69772 17.875 2.25 17.4273 2.25 16.875Z',
  d5: 'M2.25 20.875C2.25 20.3227 2.69772 19.875 3.25 19.875H12.25C12.8023 19.875 13.25 20.3227 13.25 20.875C13.25 21.4273 12.8023 21.875 12.25 21.875H3.25C2.69772 21.875 2.25 21.4273 2.25 20.875Z',
  d6: 'M16.0537 2.125C17.1865 2.12498 18.1123 2.12496 18.8431 2.22322C19.6071 2.32593 20.2694 2.54821 20.7981 3.0769C21.3268 3.6056 21.5491 4.26794 21.6518 5.03189C21.75 5.76274 21.75 6.68847 21.75 7.82129V7.82131V7.92869V7.92871C21.75 9.06154 21.75 9.98726 21.6518 10.7181C21.5491 11.4821 21.3268 12.1444 20.7981 12.6731C20.2694 13.2018 19.6071 13.4241 18.8431 13.5268C18.1123 13.625 17.1865 13.625 16.0537 13.625H7.94631C6.81348 13.625 5.88775 13.625 5.15689 13.5268C4.39293 13.4241 3.7306 13.2018 3.2019 12.6731C2.67321 12.1444 2.45093 11.4821 2.34822 10.7181C2.24996 9.98726 2.24998 9.06154 2.25 7.92872V7.92869V7.82131V7.82129C2.24998 6.68846 2.24996 5.76274 2.34822 5.03189C2.45093 4.26794 2.67321 3.6056 3.2019 3.0769C3.7306 2.54821 4.39293 2.32593 5.15689 2.22322C5.88774 2.12496 6.81346 2.12498 7.94629 2.125H7.94631H16.0537H16.0537Z',
  d7: 'M21 3V13H3V3H21Z',
  d8: 'M2.25 15.75H20.25V17.75H2.25V15.75Z',
  d9: 'M2.25 19.75H13.25V21.75H2.25V19.75Z',
  d10: 'M2.25 3C2.25 2.58579 2.58579 2.25 3 2.25H21C21.4142 2.25 21.75 2.58579 21.75 3V13C21.75 13.4142 21.4142 13.75 21 13.75H3C2.58579 13.75 2.25 13.4142 2.25 13V3Z',
};

export const IconInsertTopImageStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="insert-top-image-stroke-rounded IconInsertTopImageStrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconInsertTopImageDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="insert-top-image-duotone-rounded IconInsertTopImageDuotoneRounded"
    >
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
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconInsertTopImageTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="insert-top-image-twotone-rounded IconInsertTopImageTwotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconInsertTopImageSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="insert-top-image-solid-rounded IconInsertTopImageSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconInsertTopImageBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="insert-top-image-bulk-rounded IconInsertTopImageBulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconInsertTopImageStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="insert-top-image-stroke-sharp IconInsertTopImageStrokeSharp"
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
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconInsertTopImageSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="insert-top-image-solid-sharp IconInsertTopImageSolidSharp"
    >
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

export const iconPackOfInsertTopImage: TheIconSelfPack = {
  name: 'InsertTopImage',
  StrokeRounded: IconInsertTopImageStrokeRounded,
  DuotoneRounded: IconInsertTopImageDuotoneRounded,
  TwotoneRounded: IconInsertTopImageTwotoneRounded,
  SolidRounded: IconInsertTopImageSolidRounded,
  BulkRounded: IconInsertTopImageBulkRounded,
  StrokeSharp: IconInsertTopImageStrokeSharp,
  SolidSharp: IconInsertTopImageSolidSharp,
};