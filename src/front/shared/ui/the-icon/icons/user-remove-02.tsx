import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M5.18007 15.2964C3.92249 16.0335 0.625213 17.5386 2.63348 19.422C3.6145 20.342 4.7071 21 6.08077 21H13.9192C15.2929 21 16.3855 20.342 17.3665 19.422C19.3748 17.5386 16.0775 16.0335 14.8199 15.2964C11.8709 13.5679 8.12906 13.5679 5.18007 15.2964Z',
  d2: 'M14 7C14 9.20914 12.2091 11 10 11C7.79086 11 6 9.20914 6 7C6 4.79086 7.79086 3 10 3C12.2091 3 14 4.79086 14 7Z',
  d3: 'M22 4.5L19.5 7M19.5 7L17 9.5M19.5 7L22 9.5M19.5 7L17 4.5',
  d4: 'M4.676 14.6493C7.85919 12.7836 11.8912 12.7836 15.0744 14.6493C15.1752 14.7084 15.3007 14.7781 15.4436 14.8574C16.0762 15.2086 17.0481 15.7481 17.7135 16.3892C18.129 16.7896 18.5385 17.3303 18.6133 18.0037C18.6934 18.7252 18.3711 19.3911 17.7548 19.9691C16.7047 20.9539 15.4368 21.75 13.7944 21.75H5.95596C4.31362 21.75 3.0457 20.9538 1.99562 19.9691C1.3793 19.3911 1.05695 18.7252 1.13707 18.0037C1.21184 17.3303 1.6214 16.7896 2.03689 16.3892C2.70228 15.7481 3.67419 15.2086 4.30683 14.8574C4.44965 14.7781 4.5752 14.7084 4.676 14.6493Z',
  d5: 'M5.12519 7C5.12519 4.37665 7.25184 2.25 9.87519 2.25C12.4985 2.25 14.6252 4.37665 14.6252 7C14.6252 9.62335 12.4985 11.75 9.87519 11.75C7.25184 11.75 5.12519 9.62335 5.12519 7Z',
  d6: 'M16.1679 3.79289C16.5584 3.40237 17.1916 3.40237 17.5821 3.79289L19.375 5.58579L21.1679 3.79289C21.5584 3.40237 22.1916 3.40237 22.5821 3.79289C22.9726 4.18342 22.9726 4.81658 22.5821 5.20711L20.7892 7L22.5821 8.79289C22.9726 9.18342 22.9726 9.81658 22.5821 10.2071C22.1916 10.5976 21.5584 10.5976 21.1679 10.2071L19.375 8.41421L17.5821 10.2071C17.1916 10.5976 16.5584 10.5976 16.1679 10.2071C15.7774 9.81658 15.7774 9.18342 16.1679 8.79289L17.9608 7L16.1679 5.20711C15.7774 4.81658 15.7774 4.18342 16.1679 3.79289Z',
  d7: 'M2 21H17C17 16.9066 13.6421 13.5882 9.5 13.5882C5.35786 13.5882 2 16.9066 2 21Z',
  d8: 'M13.25 6.70588C13.25 8.75258 11.5711 10.4118 9.5 10.4118C7.42893 10.4118 5.75 8.75258 5.75 6.70588C5.75 4.65918 7.42893 3 9.5 3C11.5711 3 13.25 4.65918 13.25 6.70588Z',
  d9: 'M22 8L19 11M19 11L16 14M19 11L22 14M19 11L16 8',
  d10: 'M5 6.70588C5 4.23662 7.02311 2.25 9.5 2.25C11.9769 2.25 14 4.23662 14 6.70588C14 9.17514 11.9769 11.1618 9.5 11.1618C7.02311 11.1618 5 9.17514 5 6.70588Z',
  d11: 'M1.25 21C1.25 16.484 4.95204 12.8382 9.5 12.8382C14.048 12.8382 17.75 16.484 17.75 21V21.75H1.25V21Z',
  d12: 'M18.7501 12.4143L21.3358 14.9998L22.75 13.5856L20.1643 11.0001L22.75 8.41437L21.3358 7.00015L18.7501 9.58586L16.1642 7L14.75 8.41421L17.3359 11.0001L14.75 13.5861L16.1642 15.0003L18.7501 12.4143Z',
};

export const IconUserRemove02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-remove-02-stroke-rounded IconUserRemove02StrokeRounded"
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

export const IconUserRemove02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-remove-02-duotone-rounded IconUserRemove02DuotoneRounded"
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
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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

export const IconUserRemove02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-remove-02-twotone-rounded IconUserRemove02TwotoneRounded"
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
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconUserRemove02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-remove-02-solid-rounded IconUserRemove02SolidRounded"
    >
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconUserRemove02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-remove-02-bulk-rounded IconUserRemove02BulkRounded"
    >
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      </g>
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconUserRemove02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-remove-02-stroke-sharp IconUserRemove02StrokeSharp"
    >
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconUserRemove02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-remove-02-solid-sharp IconUserRemove02SolidSharp"
    >
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfUserRemove02: TheIconSelfPack = {
  name: 'UserRemove02',
  StrokeRounded: IconUserRemove02StrokeRounded,
  DuotoneRounded: IconUserRemove02DuotoneRounded,
  TwotoneRounded: IconUserRemove02TwotoneRounded,
  SolidRounded: IconUserRemove02SolidRounded,
  BulkRounded: IconUserRemove02BulkRounded,
  StrokeSharp: IconUserRemove02StrokeSharp,
  SolidSharp: IconUserRemove02SolidSharp,
};