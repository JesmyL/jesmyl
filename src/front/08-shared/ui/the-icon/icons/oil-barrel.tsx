import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 12.5C12.8284 12.5 13.5 11.8284 13.5 11C13.5 10 12 8.5 12 8.5C12 8.5 10.5 10 10.5 11C10.5 11.8284 11.1716 12.5 12 12.5Z',
  d2: 'M19 5V10.5465C19.6372 10.9771 20 11.4727 20 12C20 13.6569 16.4183 15 12 15C7.58172 15 4 13.6569 4 12C4 11.4727 4.36284 10.9771 5 10.5465V5',
  d3: 'M19 13.5V17.5465C19.6372 17.9771 20 18.4727 20 19C20 20.6569 16.4183 22 12 22C7.58172 22 4 20.6569 4 19C4 18.4727 4.36284 17.9771 5 17.5465V13.5',
  d4: 'M18.9297 13.5C17.5465 14.3967 14.9611 15 12 15C9.03888 15 6.45351 14.3967 5.07027 13.5H5V17.5465C4.36284 17.9771 4 18.4727 4 19C4 20.6569 7.58172 22 12 22C16.4183 22 20 20.6569 20 19C20 18.4727 19.6372 17.9771 19 17.5465V13.5H18.9297Z',
  d5: 'M6.16124 1.85818C7.68404 1.47748 9.74801 1.25 12 1.25C14.252 1.25 16.316 1.47748 17.8388 1.85818C18.5944 2.04709 19.2591 2.28396 19.7529 2.57586C20.1966 2.83809 20.75 3.29499 20.75 4C20.75 4.70501 20.1966 5.16191 19.7529 5.42414C19.2591 5.71604 18.5944 5.95291 17.8388 6.14182C16.316 6.52252 14.252 6.75 12 6.75C9.74801 6.75 7.68404 6.52252 6.16124 6.14182C5.40562 5.95291 4.74092 5.71604 4.24706 5.42414C3.80341 5.16191 3.25 4.70501 3.25 4C3.25 3.29499 3.80341 2.83809 4.24706 2.57586C4.74092 2.28396 5.40562 2.04709 6.16124 1.85818Z',
  d6: 'M4.25 10.1697V7.0957C4.73963 7.30139 5.26918 7.46456 5.79744 7.59662C7.47038 8.01486 9.6623 8.24959 12 8.24959C14.3377 8.24959 16.5296 8.01486 18.2026 7.59662C18.7308 7.46456 19.2604 7.30139 19.75 7.0957V10.1697C20.315 10.6326 20.75 11.243 20.75 11.9993C20.75 12.7051 20.3659 13.2876 19.8689 13.7283C19.371 14.1697 18.6933 14.533 17.9202 14.8229C16.3685 15.4048 14.2753 15.7493 12 15.7493C9.72474 15.7493 7.63146 15.4048 6.0798 14.8229C5.30674 14.533 4.62904 14.1697 4.13112 13.7283C3.63408 13.2876 3.25 12.7051 3.25 11.9993C3.25 11.243 3.68502 10.6326 4.25 10.1697ZM13.5 12.5C13.5 13.3284 12.8284 14 12 14C11.1716 14 10.5 13.3284 10.5 12.5C10.5 11.5 12 10 12 10C12 10 13.5 11.5 13.5 12.5Z',
  d7: 'M4.25 15.6304V17.1703C3.68502 17.6333 3.25 18.2437 3.25 19C3.25 19.7057 3.63408 20.2882 4.13112 20.7289C4.62904 21.1704 5.30674 21.5337 6.0798 21.8236C7.63146 22.4054 9.72474 22.75 12 22.75C14.2753 22.75 16.3685 22.4054 17.9202 21.8236C18.6933 21.5337 19.371 21.1704 19.8689 20.7289C20.3659 20.2882 20.75 19.7057 20.75 19C20.75 18.2437 20.315 17.6333 19.75 17.1703V15.6304C19.333 15.8638 18.8913 16.0608 18.4469 16.2274C16.6873 16.8872 14.4075 17.2493 12 17.2493C9.5925 17.2493 7.31267 16.8872 5.55312 16.2274C5.10874 16.0608 4.66697 15.8638 4.25 15.6304Z',
  d8: 'M4.25 7.0957V10.1697C3.68502 10.6326 3.25 11.243 3.25 11.9993C3.25 12.7051 3.63408 13.2876 4.13112 13.7283C4.62904 14.1697 5.30674 14.533 6.0798 14.8229C7.63146 15.4048 9.72474 15.7493 12 15.7493C14.2753 15.7493 16.3685 15.4048 17.9202 14.8229C18.6933 14.533 19.371 14.1697 19.8689 13.7283C20.3659 13.2876 20.75 12.7051 20.75 11.9993C20.75 11.243 20.315 10.6326 19.75 10.1697V7.0957C19.2604 7.30139 18.7308 7.46456 18.2026 7.59662C16.5296 8.01486 14.3377 8.24959 12 8.24959C9.6623 8.24959 7.47038 8.01486 5.79744 7.59662C5.26918 7.46456 4.73963 7.30139 4.25 7.0957Z',
  d9: 'M12 14C12.8284 14 13.5 13.3284 13.5 12.5C13.5 11.5 12 10 12 10C12 10 10.5 11.5 10.5 12.5C10.5 13.3284 11.1716 14 12 14Z',
};

export const IconOilBarrelStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="oil-barrel-stroke-rounded IconOilBarrelStrokeRounded"
    >
      <ellipse 
        cx="12" 
        cy="4" 
        rx="8" 
        ry="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></ellipse>
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

export const IconOilBarrelDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="oil-barrel-duotone-rounded IconOilBarrelDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <ellipse 
        opacity="var(--icon-opacity)" 
        cx="12" 
        cy="4" 
        rx="8" 
        ry="2" 
        fill="var(--icon-fill)"></ellipse>
      <ellipse 
        cx="12" 
        cy="4" 
        rx="8" 
        ry="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></ellipse>
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

export const IconOilBarrelTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="oil-barrel-twotone-rounded IconOilBarrelTwotoneRounded"
    >
      <ellipse 
        cx="12" 
        cy="4" 
        rx="8" 
        ry="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></ellipse>
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

export const IconOilBarrelSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="oil-barrel-solid-rounded IconOilBarrelSolidRounded"
    >
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
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconOilBarrelBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="oil-barrel-bulk-rounded IconOilBarrelBulkRounded"
    >
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconOilBarrelStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="oil-barrel-stroke-sharp IconOilBarrelStrokeSharp"
    >
      <ellipse 
        cx="12" 
        cy="4" 
        rx="8" 
        ry="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></ellipse>
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconOilBarrelSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="oil-barrel-solid-sharp IconOilBarrelSolidSharp"
    >
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
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfOilBarrel: TheIconSelfPack = {
  name: 'OilBarrel',
  StrokeRounded: IconOilBarrelStrokeRounded,
  DuotoneRounded: IconOilBarrelDuotoneRounded,
  TwotoneRounded: IconOilBarrelTwotoneRounded,
  SolidRounded: IconOilBarrelSolidRounded,
  BulkRounded: IconOilBarrelBulkRounded,
  StrokeSharp: IconOilBarrelStrokeSharp,
  SolidSharp: IconOilBarrelSolidSharp,
};