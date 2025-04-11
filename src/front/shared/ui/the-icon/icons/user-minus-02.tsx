import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M5.18007 15.2964C3.92249 16.0335 0.625213 17.5386 2.63348 19.422C3.6145 20.342 4.7071 21 6.08077 21H13.9192C15.2929 21 16.3855 20.342 17.3665 19.422C19.3748 17.5386 16.0775 16.0335 14.8199 15.2964C11.8709 13.5679 8.12906 13.5679 5.18007 15.2964Z',
  d2: 'M14 7C14 9.20914 12.2091 11 10 11C7.79086 11 6 9.20914 6 7C6 4.79086 7.79086 3 10 3C12.2091 3 14 4.79086 14 7Z',
  d3: 'M22 6.5L17 6.5',
  d4: 'M4.676 14.6493C7.85919 12.7836 11.8912 12.7836 15.0744 14.6493C15.1752 14.7084 15.3007 14.7781 15.4436 14.8574C16.0762 15.2086 17.0481 15.7481 17.7135 16.3892C18.129 16.7896 18.5385 17.3303 18.6133 18.0037C18.6934 18.7252 18.3711 19.3911 17.7548 19.9691C16.7047 20.9539 15.4368 21.75 13.7944 21.75H5.95596C4.31362 21.75 3.0457 20.9538 1.99562 19.9691C1.3793 19.3911 1.05695 18.7252 1.13707 18.0037C1.21184 17.3303 1.6214 16.7896 2.03689 16.3892C2.70228 15.7481 3.67419 15.2086 4.30683 14.8574C4.44965 14.7781 4.5752 14.7084 4.676 14.6493Z',
  d5: 'M5.12519 7C5.12519 4.37665 7.25184 2.25 9.87519 2.25C12.4985 2.25 14.6252 4.37665 14.6252 7C14.6252 9.62335 12.4985 11.75 9.87519 11.75C7.25184 11.75 5.12519 9.62335 5.12519 7Z',
  d6: 'M15.875 6.5C15.875 5.94772 16.3227 5.5 16.875 5.5L21.875 5.5C22.4273 5.5 22.875 5.94772 22.875 6.5C22.875 7.05228 22.4273 7.5 21.875 7.5L16.875 7.5C16.3227 7.5 15.875 7.05228 15.875 6.5Z',
  d7: 'M2 21H17C17 16.9066 13.6421 13.5882 9.5 13.5882C5.35786 13.5882 2 16.9066 2 21Z',
  d8: 'M13.25 6.70588C13.25 8.75258 11.5711 10.4118 9.5 10.4118C7.42893 10.4118 5.75 8.75258 5.75 6.70588C5.75 4.65918 7.42893 3 9.5 3C11.5711 3 13.25 4.65918 13.25 6.70588Z',
  d9: 'M22 11L15 11',
  d10: 'M5.5 6.70588C5.5 4.23662 7.52311 2.25 10 2.25C12.4769 2.25 14.5 4.23662 14.5 6.70588C14.5 9.17514 12.4769 11.1618 10 11.1618C7.52311 11.1618 5.5 9.17514 5.5 6.70588Z',
  d11: 'M1.75 21C1.75 16.484 5.45204 12.8382 10 12.8382C14.548 12.8382 18.25 16.484 18.25 21V21.75H1.75V21Z',
  d12: 'M15.25 10L22.25 10V12L15.25 12V10Z',
};

export const IconUserMinus02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="UserMinus02 StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconUserMinus02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="UserMinus02 DuotoneRounded"
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
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconUserMinus02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="UserMinus02 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sw"
      />
      <path 
        d={d.d3}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconUserMinus02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="UserMinus02 SolidRounded"
    >
      <path 
        d={d.d4}
        i-c="f"
      />
      <path 
        d={d.d5}
        i-c="f"
      />
      <path 
        d={d.d6}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconUserMinus02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="UserMinus02 BulkRounded"
    >
      <g    i-c="o7">
      <path 
        d={d.d4}
        i-c="f"
      />
      <path 
        d={d.d5}
        i-c="f"
      />
      </g>
      <path 
        d={d.d6}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconUserMinus02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="UserMinus02 StrokeSharp"
    >
      <path 
        d={d.d7}
        i-c="s sw"
      />
      <path 
        d={d.d8}
        i-c="s sw"
      />
      <path 
        d={d.d9}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconUserMinus02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="UserMinus02 SolidSharp"
    >
      <path 
        d={d.d10}
        i-c="f"
      />
      <path 
        d={d.d11}
        i-c="f"
      />
      <path 
        d={d.d12}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfUserMinus02: TheIconSelfPack = [
  'UserMinus02',
  IconUserMinus02StrokeRounded,
  IconUserMinus02DuotoneRounded,
  IconUserMinus02TwotoneRounded,
  IconUserMinus02SolidRounded,
  IconUserMinus02BulkRounded,
  IconUserMinus02StrokeSharp,
  IconUserMinus02SolidSharp,
];