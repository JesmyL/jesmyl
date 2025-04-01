import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z',
  d2: 'M14.75 9.5C14.75 11.0188 13.5188 12.25 12 12.25C10.4812 12.25 9.25 11.0188 9.25 9.5C9.25 7.98122 10.4812 6.75 12 6.75C13.5188 6.75 14.75 7.98122 14.75 9.5Z',
  d3: 'M5.49994 19.0001L6.06034 18.0194C6.95055 16.4616 8.60727 15.5001 10.4016 15.5001H13.5983C15.3926 15.5001 17.0493 16.4616 17.9395 18.0194L18.4999 19.0001',
  d4: 'M18.6831 19.439C20.7194 17.6084 22 14.9537 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.9484 3.27596 17.5987 5.3058 19.429L6.06067 18.0193C6.95088 16.4614 8.6076 15.5 10.4019 15.5H13.5987C15.3929 15.5 17.0497 16.4614 17.9399 18.0193L18.6831 19.439ZM12 12.2505C13.5188 12.2505 14.75 11.0193 14.75 9.50049C14.75 7.98171 13.5188 6.75049 12 6.75049C10.4812 6.75049 9.25 7.98171 9.25 9.50049C9.25 11.0193 10.4812 12.2505 12 12.2505Z',
  d5: 'M12 3.20455C7.1424 3.20455 3.20455 7.1424 3.20455 12C3.20455 16.8576 7.1424 20.7955 12 20.7955C16.8576 20.7955 20.7955 16.8576 20.7955 12C20.7955 7.1424 16.8576 3.20455 12 3.20455ZM1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z',
  d6: 'M8.5 9.5C8.5 7.567 10.067 6 12 6C13.933 6 15.5 7.567 15.5 9.5C15.5 11.433 13.933 13 12 13C10.067 13 8.5 11.433 8.5 9.5Z',
  d7: 'M5.40873 17.6472C6.43247 15.8556 8.3377 14.75 10.4011 14.75H13.5979C15.6613 14.75 17.5666 15.8556 18.5903 17.6472L19.6094 19.5928C17.6634 21.5432 14.9724 22.7499 11.9996 22.7499C9.0267 22.7499 6.33569 21.5431 4.38965 19.5928L5.40873 17.6472Z',
  d8: 'M12.0001 3.20455C7.14247 3.20455 3.20461 7.1424 3.20461 12C3.20461 16.8576 7.14247 20.7955 12.0001 20.7955C16.8577 20.7955 20.7955 16.8576 20.7955 12C20.7955 7.1424 16.8577 3.20455 12.0001 3.20455ZM1.25006 12C1.25006 6.06294 6.063 1.25 12.0001 1.25C17.9371 1.25 22.7501 6.06294 22.7501 12C22.7501 17.9371 17.9371 22.75 12.0001 22.75C6.063 22.75 1.25006 17.9371 1.25006 12Z',
  d9: 'M8.50006 9.5C8.50006 7.567 10.0671 6 12.0001 6C13.9331 6 15.5001 7.567 15.5001 9.5C15.5001 11.433 13.9331 13 12.0001 13C10.0671 13 8.50006 11.433 8.50006 9.5Z',
  d10: 'M5.40958 17.6472C6.43332 15.8556 8.33855 14.75 10.402 14.75H13.5988C15.6622 14.75 17.5674 15.8556 18.5911 17.6472L19.6179 19.6074L19.1846 19.9969C17.2812 21.7079 14.7616 22.7499 12.0004 22.7499C9.2392 22.7499 6.71957 21.7079 4.81613 19.9968L4.38287 19.6073L5.40958 17.6472Z',
};

export const IconUserCircle02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-circle-02-stroke-rounded IconUserCircle02StrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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

export const IconUserCircle02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-circle-02-duotone-rounded IconUserCircle02DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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

export const IconUserCircle02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-circle-02-twotone-rounded IconUserCircle02TwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconUserCircle02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-circle-02-solid-rounded IconUserCircle02SolidRounded"
    >
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
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconUserCircle02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-circle-02-bulk-rounded IconUserCircle02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconUserCircle02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-circle-02-stroke-sharp IconUserCircle02StrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconUserCircle02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-circle-02-solid-sharp IconUserCircle02SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
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

export const iconPackOfUserCircle02: TheIconSelfPack = {
  name: 'UserCircle02',
  StrokeRounded: IconUserCircle02StrokeRounded,
  DuotoneRounded: IconUserCircle02DuotoneRounded,
  TwotoneRounded: IconUserCircle02TwotoneRounded,
  SolidRounded: IconUserCircle02SolidRounded,
  BulkRounded: IconUserCircle02BulkRounded,
  StrokeSharp: IconUserCircle02StrokeSharp,
  SolidSharp: IconUserCircle02SolidSharp,
};