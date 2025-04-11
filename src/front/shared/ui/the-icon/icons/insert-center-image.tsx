import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3 3H19',
  d2: 'M3 21H12',
  d3: 'M3 12C3 9.64298 3 8.46447 3.73223 7.73223C4.46447 7 5.64298 7 8 7H16C18.357 7 19.5355 7 20.2678 7.73223C21 8.46447 21 9.64298 21 12C21 14.357 21 15.5355 20.2678 16.2678C19.5355 17 18.357 17 16 17H8C5.64298 17 4.46447 17 3.73223 16.2678C3 15.5355 3 14.357 3 12Z',
  d4: 'M2.25 3C2.25 2.44772 2.69772 2 3.25 2H19.25C19.8023 2 20.25 2.44772 20.25 3C20.25 3.55228 19.8023 4 19.25 4H3.25C2.69772 4 2.25 3.55228 2.25 3Z',
  d5: 'M2.25 21C2.25 20.4477 2.69772 20 3.25 20H12.25C12.8023 20 13.25 20.4477 13.25 21C13.25 21.5523 12.8023 22 12.25 22H3.25C2.69772 22 2.25 21.5523 2.25 21Z',
  d6: 'M16.0537 6.25C17.1865 6.24998 18.1123 6.24996 18.8431 6.34822C19.6071 6.45093 20.2694 6.67321 20.7981 7.2019C21.3268 7.7306 21.5491 8.39294 21.6518 9.15689C21.75 9.88774 21.75 10.8135 21.75 11.9463V11.9463V12.0537V12.0537C21.75 13.1865 21.75 14.1123 21.6518 14.8431C21.5491 15.6071 21.3268 16.2694 20.7981 16.7981C20.2694 17.3268 19.6071 17.5491 18.8431 17.6518C18.1123 17.75 17.1865 17.75 16.0537 17.75H7.94631C6.81348 17.75 5.88775 17.75 5.15689 17.6518C4.39293 17.5491 3.7306 17.3268 3.2019 16.7981C2.67321 16.2694 2.45093 15.6071 2.34822 14.8431C2.24996 14.1123 2.24998 13.1865 2.25 12.0537V12.0537V11.9463V11.9463C2.24998 10.8135 2.24996 9.88774 2.34822 9.15689C2.45093 8.39294 2.67321 7.7306 3.2019 7.2019C3.7306 6.67321 4.39293 6.45093 5.15689 6.34822C5.88774 6.24996 6.81346 6.24998 7.94629 6.25H7.94631H16.0537H16.0537Z',
  d7: 'M21 7V17H3V7H21Z',
  d8: 'M2.25 2.25H20.25V4.25H2.25V2.25Z',
  d9: 'M2.25 19.75H13.25V21.75H2.25V19.75Z',
  d10: 'M2.25 7C2.25 6.58579 2.58579 6.25 3 6.25H21C21.4142 6.25 21.75 6.58579 21.75 7V17C21.75 17.4142 21.4142 17.75 21 17.75H3C2.58579 17.75 2.25 17.4142 2.25 17V7Z',
};

export const IconInsertCenterImageStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="InsertCenterImage StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconInsertCenterImageDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="InsertCenterImage DuotoneRounded"
    >
      <path 
        d={d.d3}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconInsertCenterImageTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="InsertCenterImage TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconInsertCenterImageSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="InsertCenterImage SolidRounded"
    >
      <path 
        d={d.d4}
        i-c="c f fr"
      />
      <path 
        d={d.d5}
        i-c="c f fr"
      />
      <path 
        d={d.d6}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconInsertCenterImageBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="InsertCenterImage BulkRounded"
    >
      <path 
        d={d.d4}
        i-c="c f fr"
      />
      <path 
        d={d.d5}
        i-c="c f fr"
      />
      <path 
        d={d.d6}
        i-c="f o7"
      />
    </TheIconWrapper>
  );
};

export const IconInsertCenterImageStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="InsertCenterImage StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sj ss sw"
      />
      <path 
        d={d.d2}
        i-c="s sj ss sw"
      />
      <path 
        d={d.d7}
        i-c="s sj ss sw"
      />
    </TheIconWrapper>
  );
};

export const IconInsertCenterImageSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="InsertCenterImage SolidSharp"
    >
      <path 
        d={d.d8}
        i-c="c f fr"
      />
      <path 
        d={d.d9}
        i-c="c f fr"
      />
      <path 
        d={d.d10}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfInsertCenterImage: TheIconSelfPack = [
  'InsertCenterImage',
  IconInsertCenterImageStrokeRounded,
  IconInsertCenterImageDuotoneRounded,
  IconInsertCenterImageTwotoneRounded,
  IconInsertCenterImageSolidRounded,
  IconInsertCenterImageBulkRounded,
  IconInsertCenterImageStrokeSharp,
  IconInsertCenterImageSolidSharp,
];