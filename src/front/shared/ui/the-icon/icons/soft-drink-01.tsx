import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 7V4.34832C12 2.1606 12.3737 1.6318 14.4968 2.22769L18 3.21095',
  d2: 'M6 7L7.1398 18.1606C7.31099 19.8368 7.39658 20.6749 7.96796 21.1813C9.1458 22.225 14.7472 22.3198 16.032 21.1813C16.6034 20.6749 16.689 19.8368 16.8602 18.1606L18 7',
  d3: 'M5 7H19',
  d4: 'M7 12H17',
  d5: 'M7 16H17',
  d6: 'M16.032 21.1813C16.6034 20.6749 16.689 19.8368 16.8602 18.1606L17.5 12H6.5L7.1398 18.1606C7.31099 19.8368 7.39658 20.6749 7.96796 21.1813C9.1458 22.225 14.7472 22.3198 16.032 21.1813Z',
  d7: 'M13.0729 3.32761C13.024 3.57669 13 3.94038 13 4.47332V7.125C13 7.67728 12.5523 8.125 12 8.125C11.4477 8.125 11 7.67728 11 7.125V4.47332C11 3.9124 11.0227 3.38959 11.1102 2.94286C11.197 2.50018 11.3708 2.00649 11.774 1.63433C12.1979 1.24303 12.7214 1.12494 13.2111 1.125C13.6826 1.12505 14.2088 1.23323 14.767 1.38989L18.2702 2.37315C18.802 2.5224 19.112 3.07444 18.9628 3.60618C18.8136 4.13792 18.2615 4.44799 17.7298 4.29875L14.2265 3.31549C13.7232 3.17421 13.4065 3.12502 13.2108 3.125C13.0891 3.12499 13.0951 3.21413 13.0729 3.32761Z',
  d8: 'M4 7.125C4 6.57272 4.44772 6.125 5 6.125H19C19.5523 6.125 20 6.57272 20 7.125C20 7.67728 19.5523 8.125 19 8.125H5C4.44772 8.125 4 7.67728 4 7.125Z',
  d9: 'M17.3273 20.4075C17.4529 19.8769 17.5213 19.2072 17.6026 18.411L17.7144 17.3156C17.7355 17.1098 17.746 17.0069 17.6864 16.941C17.6269 16.875 17.5234 16.875 17.3165 16.875H6.68605C6.47916 16.875 6.37572 16.875 6.31615 16.941C6.25659 17.0069 6.2671 17.1098 6.28812 17.3156L6.39999 18.411C6.48127 19.2072 6.54964 19.8769 6.67528 20.4075C6.80877 20.9712 7.02688 21.4733 7.47184 21.8676C7.71675 22.0846 8.02928 22.2396 8.33878 22.3552C8.65707 22.4741 9.01996 22.5687 9.40268 22.643C10.1683 22.7915 11.0664 22.8684 11.956 22.8746C12.8453 22.8808 13.7521 22.8164 14.5343 22.6707C15.2773 22.5322 16.0461 22.2971 16.5307 21.8676C16.9757 21.4733 17.1938 20.9712 17.3273 20.4075Z',
  d10: 'M6.45116 15.375C6.27945 15.375 6.1936 15.375 6.1365 15.3234C6.0794 15.2719 6.07067 15.1865 6.05323 15.0156L5.87961 13.3156C5.85859 13.1098 5.84808 13.0069 5.90765 12.941C5.96721 12.875 6.07065 12.875 6.27754 12.875H17.725C17.9319 12.875 18.0354 12.875 18.0949 12.941C18.1545 13.0069 18.144 13.1098 18.123 13.3156L17.9493 15.0156C17.9319 15.1865 17.9232 15.2719 17.8661 15.3234C17.809 15.375 17.7231 15.375 17.5514 15.375H6.45116Z',
  d11: 'M18.3578 11.0156C18.3404 11.1865 18.3317 11.2719 18.2746 11.3234C18.2175 11.375 18.1316 11.375 17.9599 11.375H6.04265C5.87095 11.375 5.78509 11.375 5.72799 11.3234C5.67089 11.2719 5.66217 11.1865 5.64472 11.0156L5.21579 6.81564C5.19477 6.60982 5.18426 6.50691 5.24382 6.44096C5.30338 6.375 5.40683 6.375 5.61372 6.375H18.3888C18.5957 6.375 18.6992 6.375 18.7587 6.44096C18.8183 6.50691 18.8078 6.60982 18.7868 6.81564L18.3578 11.0156Z',
  d12: 'M12 6.99999L12 2.00012H18',
  d13: 'M6 7L7.5 22H16.5L18 7',
  d14: 'M4 7H20',
  d15: 'M11.4697 1.46967C11.6103 1.32902 11.8011 1.25 12 1.25H18V2.75H12.75L12.75 6.99987L11.25 6.99988L11.25 2.00001C11.25 1.80109 11.329 1.61033 11.4697 1.46967Z',
  d16: 'M17.7789 16.7499L17.1789 22.7498H6.82144L6.22145 16.7499H17.7789Z',
  d17: 'M17.9289 15.2499H6.07145L5.82145 12.7499H18.1789L17.9289 15.2499Z',
  d18: 'M18.3289 11.2499H5.67145L5.32145 7.74988H4V6.24988H20V7.74988H18.6789L18.3289 11.2499Z',
};

export const IconSoftDrink01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="soft-drink-01-stroke-rounded IconSoftDrink01StrokeRounded"
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
      <path 
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
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSoftDrink01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="soft-drink-01-duotone-rounded IconSoftDrink01DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
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
      <path 
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
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSoftDrink01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="soft-drink-01-twotone-rounded IconSoftDrink01TwotoneRounded"
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
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSoftDrink01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="soft-drink-01-solid-rounded IconSoftDrink01SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
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
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconSoftDrink01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="soft-drink-01-bulk-rounded IconSoftDrink01BulkRounded"
    >
      <g 
        opacity="var(--icon-opacity)">
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
      </g>
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconSoftDrink01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="soft-drink-01-stroke-sharp IconSoftDrink01StrokeSharp"
    >
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d14} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconSoftDrink01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="soft-drink-01-solid-sharp IconSoftDrink01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfSoftDrink01: TheIconSelfPack = {
  name: 'SoftDrink01',
  StrokeRounded: IconSoftDrink01StrokeRounded,
  DuotoneRounded: IconSoftDrink01DuotoneRounded,
  TwotoneRounded: IconSoftDrink01TwotoneRounded,
  SolidRounded: IconSoftDrink01SolidRounded,
  BulkRounded: IconSoftDrink01BulkRounded,
  StrokeSharp: IconSoftDrink01StrokeSharp,
  SolidSharp: IconSoftDrink01SolidSharp,
};