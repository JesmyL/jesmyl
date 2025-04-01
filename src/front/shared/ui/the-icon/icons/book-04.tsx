import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M7.5 4.94531H16C16.8284 4.94531 17.5 5.61688 17.5 6.44531V7.94531',
  d2: 'M15 12.9453H9',
  d3: 'M12 16.9453H9',
  d4: 'M18.497 2L6.30767 2.00002C5.81071 2.00002 5.30241 2.07294 4.9007 2.36782C3.62698 3.30279 2.64539 5.38801 4.62764 7.2706C5.18421 7.7992 5.96217 7.99082 6.72692 7.99082H18.2835C19.077 7.99082 20.5 8.10439 20.5 10.5273V17.9812C20.5 20.2007 18.7103 22 16.5026 22H7.47246C5.26886 22 3.66619 20.4426 3.53959 18.0713L3.5061 5.16638',
  d5: 'M20.625 14V10C20.625 8.89543 19.7296 8 18.625 8H6.625C4.96815 8 3.625 6.65685 3.625 5V14C3.625 17.7712 3.625 19.6569 4.79657 20.8284C5.96815 22 7.85376 22 11.625 22H12.625C16.3962 22 18.2819 22 19.4534 20.8284C20.625 19.6569 20.625 17.7712 20.625 14Z',
  d6: 'M7.625 5H16.125C16.9534 5 17.625 5.67157 17.625 6.5V8',
  d7: 'M18.622 2L6.43267 2.00002C5.93571 2.00002 5.42741 2.07294 5.0257 2.36782C3.75198 3.30279 2.77039 5.38801 4.75264 7.2706C5.30921 7.7992 6.08717 7.99082 6.85192 7.99082H18.4085C19.202 7.99082 20.625 8.10439 20.625 10.5273V17.9812C20.625 20.2007 18.8353 22 16.6276 22H7.59746C5.39386 22 3.79119 20.4426 3.66459 18.0713L3.6311 5.16638',
  d8: 'M15.125 13H9.125',
  d9: 'M12.125 17H9.125',
  d10: 'M7.5 5H16C16.8284 5 17.5 5.67157 17.5 6.5V8',
  d11: 'M15 13H9',
  d12: 'M12 17H9',
  d13: 'M6.74219 1C4.53305 1 2.74219 2.79086 2.74219 5C2.74219 5.07917 2.74449 5.15779 2.74902 5.23582V14.0564C2.74901 15.8942 2.749 17.3498 2.90216 18.489C3.05979 19.6614 3.3919 20.6104 4.14027 21.3588C4.88863 22.1071 5.83758 22.4392 7.01 22.5969C8.14921 22.75 9.60487 22.75 11.4426 22.75H12.5555C14.3932 22.75 15.8488 22.75 16.988 22.5969C18.1605 22.4392 19.1094 22.1071 19.8578 21.3588C20.6061 20.6104 20.9383 19.6614 21.0959 18.489C21.2491 17.3498 21.249 15.8942 21.249 14.0564V10C21.249 8.48122 20.0178 7.25 18.499 7.25L18.499 6.5C18.499 5.11929 17.3797 4 15.999 4H7.49902C6.94674 4 6.49902 4.44772 6.49902 5C6.49902 5.55228 6.94674 6 7.49902 6H15.999C16.2752 6 16.499 6.22386 16.499 6.5V7H6.74219C5.63762 7 4.74219 6.10457 4.74219 5C4.74219 3.89543 5.63762 3 6.74219 3H18.7422C19.2945 3 19.7422 2.55228 19.7422 2C19.7422 1.44772 19.2945 1 18.7422 1H6.74219ZM14.999 13.75C15.4132 13.75 15.749 13.4142 15.749 13C15.749 12.5858 15.4132 12.25 14.999 12.25H8.99902C8.58481 12.25 8.24902 12.5858 8.24902 13C8.24902 13.4142 8.58481 13.75 8.99902 13.75H14.999ZM12.749 17C12.749 17.4142 12.4132 17.75 11.999 17.75H8.99902C8.58481 17.75 8.24902 17.4142 8.24902 17C8.24902 16.5858 8.58481 16.25 8.99902 16.25H11.999C12.4132 16.25 12.749 16.5858 12.749 17Z',
  d14: 'M2.74219 5C2.74219 2.79086 4.53305 1 6.74219 1H18.7422C19.2945 1 19.7422 1.44772 19.7422 2C19.7422 2.55228 19.2945 3 18.7422 3H6.74219C5.63762 3 4.74219 3.89543 4.74219 5C4.74219 6.10457 5.63762 7 6.74219 7H16.499V6.5C16.499 6.22386 16.2752 6 15.999 6H7.49902C6.94674 6 6.49902 5.55228 6.49902 5C6.49902 4.44772 6.94674 4 7.49902 4H15.999C17.3797 4 18.499 5.11929 18.499 6.5L18.499 7.25C20.0178 7.25 21.249 8.48122 21.249 10V14.0564C21.249 15.8942 21.2491 17.3498 21.0959 18.489C20.9383 19.6614 20.6061 20.6104 19.8578 21.3588C19.1094 22.1071 18.1605 22.4392 16.988 22.5969C15.8488 22.75 14.3932 22.75 12.5555 22.75H11.4426C9.60487 22.75 8.14921 22.75 7.01 22.5969C5.83758 22.4392 4.88863 22.1071 4.14027 21.3588C3.3919 20.6104 3.05979 19.6614 2.90216 18.489C2.749 17.3498 2.74901 15.8942 2.74902 14.0564V5.23582C2.74449 5.15779 2.74219 5.07917 2.74219 5Z',
  d15: 'M15.75 13C15.75 13.4142 15.4142 13.75 15 13.75H9C8.58579 13.75 8.25 13.4142 8.25 13C8.25 12.5858 8.58579 12.25 9 12.25H15C15.4142 12.25 15.75 12.5858 15.75 13ZM12 17.75C12.4142 17.75 12.75 17.4142 12.75 17C12.75 16.5858 12.4142 16.25 12 16.25H9C8.58579 16.25 8.25 16.5858 8.25 17C8.25 17.4142 8.58579 17.75 9 17.75H12Z',
  d16: 'M16.0162 13.0156H8.00586',
  d17: 'M12.011 17.0215H8.00586',
  d18: 'M20.5117 2.01172H6.63417C5.39113 2.01172 3.35409 2.90474 3.52827 5.27242M3.52827 5.27242C3.70245 7.6401 5.68422 8.0266 6.63417 8.0266H17.5139M3.52827 5.27242V18.5641C3.41304 19.6283 3.8446 21.8463 6.5835 22.0166H20.4848V8.0266H17.5139M17.5139 8.0266V5.00764C17.5139 5.00212 17.5094 4.99764 17.5039 4.99764H6.50856',
  d19: 'M2.75 5.15831C2.75044 2.99968 4.49399 1.25 6.64461 1.25H21.25V3.20456H6.64461C5.56938 3.20456 4.69765 4.07927 4.69731 5.15847V5.15992C4.69773 6.23898 5.56939 7.11367 6.64461 7.11367H16.3799V6.13639H6.64341V4.18183H17.3536C17.8913 4.18183 18.3272 4.61937 18.3272 5.15911V7.11367H21.25V22.75H6.6451C4.49422 22.75 2.75057 20.9999 2.75049 18.841L2.75 5.15831ZM8 12.25H16V13.75H8V12.25ZM12 16.25H8V17.75H12V16.25Z',
};

export const IconBook04StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="book-04-stroke-rounded IconBook04StrokeRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconBook04DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="book-04-duotone-rounded IconBook04DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBook04TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="book-04-twotone-rounded IconBook04TwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d12} 
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
      />
    </TheIconWrapper>
  );
};

export const IconBook04SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="book-04-solid-rounded IconBook04SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconBook04BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="book-04-bulk-rounded IconBook04BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconBook04StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="book-04-stroke-sharp IconBook04StrokeSharp"
    >
      <path 
        d={d.d16} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d17} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d18} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconBook04SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="book-04-solid-sharp IconBook04SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfBook04: TheIconSelfPack = {
  name: 'Book04',
  StrokeRounded: IconBook04StrokeRounded,
  DuotoneRounded: IconBook04DuotoneRounded,
  TwotoneRounded: IconBook04TwotoneRounded,
  SolidRounded: IconBook04SolidRounded,
  BulkRounded: IconBook04BulkRounded,
  StrokeSharp: IconBook04StrokeSharp,
  SolidSharp: IconBook04SolidSharp,
};