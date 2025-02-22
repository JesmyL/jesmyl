import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M17 14.5C17 18.6421 13.6421 22 9.5 22C5.35786 22 2 18.6421 2 14.5C2 10.3579 5.35786 7 9.5 7C13.6421 7 17 10.3579 17 14.5Z',
  d2: 'M7 13L14.5 5.50003M18 2L16.5 3.5M22 6.00003L19 9M11 16L14 13',
  d3: 'M18.5834 2.90376C18.9624 2.52544 18.9624 1.91206 18.5834 1.53374C18.2043 1.15542 17.5898 1.15542 17.2107 1.53374L15.7549 2.98687C15.3758 3.36519 15.3758 3.97856 15.7549 4.35688C16.1339 4.7352 16.7484 4.7352 17.1275 4.35688L18.5834 2.90376ZM15.1863 6.29442C15.5653 5.9161 15.5653 5.30272 15.1863 4.9244C14.8073 4.54608 14.1927 4.54607 13.8137 4.92439L12.075 6.6598C11.2648 6.39385 10.3992 6.25 9.5 6.25C4.94365 6.25 1.25 9.94365 1.25 14.5C1.25 19.0564 4.94365 22.75 9.5 22.75C14.0563 22.75 17.75 19.0564 17.75 14.5C17.75 11.5764 16.2293 9.00801 13.9357 7.54268L15.1863 6.29442ZM13.9357 7.54268C13.3602 7.17499 12.736 6.87676 12.075 6.6598L6.53428 12.19C6.15524 12.5683 6.15524 13.1817 6.53428 13.56C6.91331 13.9383 7.52786 13.9383 7.90689 13.56L13.9357 7.54268ZM22.4657 6.77879C22.8448 6.40047 22.8448 5.78709 22.4657 5.40877C22.0867 5.03045 21.4721 5.03045 21.0931 5.40877L18.1814 8.31499C17.8023 8.69331 17.8023 9.30669 18.1814 9.68501C18.5604 10.0633 19.175 10.0633 19.554 9.68501L22.4657 6.77879ZM14.701 13.56C15.08 13.1817 15.08 12.5683 14.701 12.19C14.322 11.8117 13.7074 11.8117 13.3284 12.19L10.4166 15.0962C10.0376 15.4746 10.0376 16.0879 10.4166 16.4663C10.7957 16.8446 11.4102 16.8446 11.7892 16.4663L14.701 13.56Z',
  d4: 'M18.5834 1.53374C18.9624 1.91206 18.9624 2.52544 18.5834 2.90376L17.1275 4.35688C16.7484 4.7352 16.1339 4.7352 15.7549 4.35688C15.3758 3.97856 15.3758 3.36519 15.7549 2.98687L17.2107 1.53374C17.5898 1.15542 18.2043 1.15542 18.5834 1.53374ZM15.1863 4.9244C15.5653 5.30272 15.5653 5.9161 15.1863 6.29442L7.90689 13.56C7.52786 13.9383 6.91331 13.9383 6.53428 13.56C6.15524 13.1817 6.15524 12.5683 6.53428 12.19L13.8137 4.92439C14.1927 4.54607 14.8073 4.54608 15.1863 4.9244ZM22.4657 5.40877C22.8448 5.78709 22.8448 6.40047 22.4657 6.77879L19.554 9.68501C19.175 10.0633 18.5604 10.0633 18.1814 9.68501C17.8023 9.30669 17.8023 8.69331 18.1814 8.31499L21.0931 5.40877C21.4721 5.03045 22.0867 5.03045 22.4657 5.40877ZM14.701 12.19C15.08 12.5683 15.08 13.1817 14.701 13.56L11.7892 16.4663C11.4102 16.8446 10.7957 16.8446 10.4166 16.4663C10.0376 16.0879 10.0376 15.4746 10.4166 15.0962L13.3284 12.19C13.7074 11.8117 14.322 11.8117 14.701 12.19Z',
  d5: 'M1.25 14.5C1.25 9.94365 4.94365 6.25 9.5 6.25C14.0563 6.25 17.75 9.94365 17.75 14.5C17.75 19.0563 14.0563 22.75 9.5 22.75C4.94365 22.75 1.25 19.0563 1.25 14.5Z',
  d6: 'M7 13L15 5M18 2L16.5 3.5M22 6.00003L18.5 9.50005M11 16L14 13',
  d7: 'M17.25 4.16421L18.75 2.66421L17.3358 1.25L15.8358 2.75L17.25 4.16421ZM13.8964 7.51776L15.75 5.66421L14.3358 4.25L11.9621 6.62365C11.1846 6.38084 10.3576 6.25 9.5 6.25C4.94365 6.25 1.25 9.94365 1.25 14.5C1.25 19.0564 4.94365 22.75 9.5 22.75C14.0563 22.75 17.75 19.0564 17.75 14.5C17.75 11.5598 16.2119 8.97879 13.8964 7.51776ZM13.8964 7.51776C13.299 7.14083 12.6499 6.83843 11.9621 6.62365L6.33577 12.25L7.74998 13.6642L13.8964 7.51776ZM19.25 10.1643L22.75 6.66424L21.3358 5.25003L17.8358 8.75005L19.25 10.1643ZM11.7933 16.6642L14.75 13.6642L13.3358 12.25L10.3358 15.25L11.7933 16.6642Z',
};

export const IconAsteroid02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="asteroid-02-stroke-rounded IconAsteroid02StrokeRounded"
    >
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
    </TheIconWrapper>
  );
};

export const IconAsteroid02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="asteroid-02-duotone-rounded IconAsteroid02DuotoneRounded"
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
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconAsteroid02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="asteroid-02-twotone-rounded IconAsteroid02TwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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
    </TheIconWrapper>
  );
};

export const IconAsteroid02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="asteroid-02-solid-rounded IconAsteroid02SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconAsteroid02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="asteroid-02-bulk-rounded IconAsteroid02BulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconAsteroid02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="asteroid-02-stroke-sharp IconAsteroid02StrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconAsteroid02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="asteroid-02-solid-sharp IconAsteroid02SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfAsteroid02: TheIconSelfPack = {
  name: 'Asteroid02',
  StrokeRounded: IconAsteroid02StrokeRounded,
  DuotoneRounded: IconAsteroid02DuotoneRounded,
  TwotoneRounded: IconAsteroid02TwotoneRounded,
  SolidRounded: IconAsteroid02SolidRounded,
  BulkRounded: IconAsteroid02BulkRounded,
  StrokeSharp: IconAsteroid02StrokeSharp,
  SolidSharp: IconAsteroid02SolidSharp,
};