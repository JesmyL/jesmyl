import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M8.24202 15.758L15.758 8.24202M8.24202 15.758C8.66305 16.179 10.4989 15.9164 11.0605 15.9459M8.24202 15.758C7.82099 15.3369 8.08361 13.5011 8.05412 12.9395M15.758 8.24202C16.179 8.66305 15.9164 10.4989 15.9459 11.0605M15.758 8.24202C15.3369 7.82099 13.5011 8.08361 12.9395 8.05412',
  d2: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM13.0986 7.36056C12.685 7.33884 12.332 7.65655 12.3103 8.0702C12.2987 8.29115 12.384 8.49478 12.5289 8.63985L13.236 9.34696L9.34696 13.236L8.63986 12.5289C8.49478 12.384 8.29115 12.2987 8.0702 12.3103C7.65656 12.332 7.33884 12.685 7.36056 13.0986C7.3649 13.1814 7.35821 13.3413 7.34424 13.6004L7.34117 13.6571C7.32886 13.8839 7.31418 14.1544 7.30987 14.4227C7.30526 14.7099 7.31167 15.0266 7.35334 15.3121C7.38859 15.5536 7.47081 15.9561 7.75597 16.2413C8.04113 16.5264 8.44359 16.6086 8.6851 16.6439C8.97058 16.6856 9.28731 16.692 9.57457 16.6874C9.84279 16.683 10.1133 16.6684 10.3402 16.6561L10.3968 16.653C10.656 16.639 10.8159 16.6323 10.8986 16.6367C11.3123 16.6584 11.6652 16.3407 11.6869 15.927C11.6985 15.7062 11.6134 15.5027 11.4686 15.3577L10.7612 14.6503L14.6503 10.7612L15.3577 11.4686C15.5027 11.6134 15.7062 11.6985 15.927 11.6869C16.3407 11.6652 16.6584 11.3123 16.6367 10.8986C16.6323 10.8159 16.639 10.656 16.653 10.3968L16.6561 10.3402C16.6684 10.1133 16.683 9.8428 16.6874 9.57457C16.692 9.28731 16.6856 8.97058 16.6439 8.6851C16.6086 8.44359 16.5264 8.04113 16.2413 7.75597C15.9561 7.47081 15.5536 7.38859 15.3121 7.35334C15.0266 7.31166 14.7099 7.30526 14.4227 7.30987C14.1545 7.31418 13.884 7.32886 13.6571 7.34117L13.6004 7.34424C13.3413 7.35821 13.1814 7.3649 13.0986 7.36056Z',
  d3: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z',
  d4: 'M12.3103 8.0702C12.332 7.65655 12.685 7.33884 13.0986 7.36056C13.1814 7.3649 13.3413 7.35821 13.6004 7.34424L13.6571 7.34117C13.884 7.32886 14.1545 7.31418 14.4227 7.30987C14.7099 7.30526 15.0266 7.31166 15.3121 7.35334C15.5536 7.38859 15.9561 7.47081 16.2413 7.75597C16.5264 8.04113 16.6086 8.44359 16.6439 8.6851C16.6856 8.97058 16.692 9.28731 16.6874 9.57457C16.683 9.8428 16.6684 10.1133 16.6561 10.3402L16.653 10.3968C16.639 10.656 16.6323 10.8159 16.6367 10.8986C16.6584 11.3123 16.3407 11.6652 15.927 11.6869C15.7062 11.6985 15.5027 11.6134 15.3577 11.4686L14.6503 10.7612L10.7612 14.6503L11.4686 15.3577C11.6134 15.5027 11.6985 15.7062 11.6869 15.927C11.6652 16.3407 11.3123 16.6584 10.8986 16.6367C10.8159 16.6323 10.656 16.639 10.3968 16.653L10.3402 16.6561C10.1133 16.6684 9.84279 16.683 9.57457 16.6874C9.28731 16.692 8.97058 16.6856 8.6851 16.6439C8.44359 16.6086 8.04113 16.5264 7.75597 16.2413C7.47081 15.9561 7.38859 15.5536 7.35334 15.3121C7.31166 15.0266 7.30526 14.7099 7.30987 14.4227C7.31418 14.1544 7.32886 13.8839 7.34117 13.6571L7.34424 13.6004C7.35821 13.3413 7.3649 13.1814 7.36056 13.0986C7.33884 12.685 7.65656 12.332 8.0702 12.3103C8.29115 12.2987 8.49478 12.384 8.63986 12.5289L9.34696 13.236L13.236 9.34696L12.5289 8.63985C12.384 8.49478 12.2987 8.29115 12.3103 8.0702Z',
  d5: 'M12.5 7.5H16.5V11.5M11.5 16.5H7.5V12.5M16.3522 7.6478L7.71707 16.2829',
  d6: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM12 8.75L14.1893 8.75001L8.75 14.1893V12H7.25V16.75L12 16.75L12 15.25L9.81066 15.25L15.25 9.81067V12H16.75V7.25002L12 7.25L12 8.75Z',
};

export const IconCircleArrowDiagonal01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-diagonal-01-stroke-rounded IconCircleArrowDiagonal01StrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconCircleArrowDiagonal01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-diagonal-01-duotone-rounded IconCircleArrowDiagonal01DuotoneRounded"
    >
      <circle 
        opacity="var(--icon-opacity)" 
        cx="12" 
        cy="12" 
        r="10" 
        fill="var(--icon-fill)"></circle>
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconCircleArrowDiagonal01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-diagonal-01-twotone-rounded IconCircleArrowDiagonal01TwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconCircleArrowDiagonal01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-diagonal-01-solid-rounded IconCircleArrowDiagonal01SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCircleArrowDiagonal01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-diagonal-01-bulk-rounded IconCircleArrowDiagonal01BulkRounded"
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

export const IconCircleArrowDiagonal01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-diagonal-01-stroke-sharp IconCircleArrowDiagonal01StrokeSharp"
    >
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round"></circle>
    </TheIconWrapper>
  );
};

export const IconCircleArrowDiagonal01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-diagonal-01-solid-sharp IconCircleArrowDiagonal01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfCircleArrowDiagonal01: TheIconSelfPack = {
  name: 'CircleArrowDiagonal01',
  StrokeRounded: IconCircleArrowDiagonal01StrokeRounded,
  DuotoneRounded: IconCircleArrowDiagonal01DuotoneRounded,
  TwotoneRounded: IconCircleArrowDiagonal01TwotoneRounded,
  SolidRounded: IconCircleArrowDiagonal01SolidRounded,
  BulkRounded: IconCircleArrowDiagonal01BulkRounded,
  StrokeSharp: IconCircleArrowDiagonal01StrokeSharp,
  SolidSharp: IconCircleArrowDiagonal01SolidSharp,
};