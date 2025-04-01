import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M7 17L18 6',
  d2: 'M6.13153 11C6.13153 11 5.65664 16.6335 6.51155 17.4885C7.36647 18.3434 13 17.8684 13 17.8684',
  d3: 'M6.1137 11.0234C6.10166 11.8719 5.82296 16.9657 6.41794 17.5614M6.41794 17.5614C7.0129 18.1572 12.1827 17.9612 13.03 17.9492M6.41794 17.5614L18.0376 5.98633',
  d4: 'M6.29289 17.7071C5.90237 17.3166 5.90237 16.6834 6.29289 16.2929L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L7.70711 17.7071C7.31658 18.0976 6.68342 18.0976 6.29289 17.7071Z',
  d5: 'M6.75558 18.7102C6.47489 18.6283 6.09348 18.4847 5.80437 18.1956C5.51526 17.9064 5.37165 17.525 5.28973 17.2443C5.19917 16.934 5.1394 16.583 5.09818 16.2299C5.01544 15.5212 4.99487 14.6893 5.00093 13.9158C5.00704 13.1363 5.04056 12.3878 5.07231 11.8361C5.08822 11.5597 5.10378 11.3312 5.11541 11.1712C5.12117 11.092 5.13139 10.9624 5.1349 10.9178L5.135 10.9166C5.1814 10.3662 5.66519 9.95713 6.21553 10.0035C6.76583 10.0499 7.17433 10.5336 7.12799 11.0839C7.12487 11.1235 7.11565 11.2405 7.11014 11.3162C7.09914 11.4677 7.08426 11.686 7.06901 11.9511C7.03842 12.4824 7.00663 13.1958 7.00087 13.9315C6.99505 14.6732 7.01604 15.41 7.08469 15.998C7.11916 16.2933 7.18838 16.603 7.23548 16.7644C7.39687 16.8115 7.70663 16.8808 8.00194 16.9152C8.58995 16.9839 9.32676 17.0049 10.0685 16.9991C10.8042 16.9933 11.5175 16.9615 12.0489 16.931C12.314 16.9157 12.5323 16.9008 12.6837 16.8898C12.7594 16.8843 12.876 16.8751 12.9156 16.872C13.4659 16.8257 13.95 17.2342 13.9964 17.7845C14.0428 18.3348 13.6343 18.8185 13.0839 18.8649L13.0817 18.8651C13.0361 18.8687 12.9074 18.8789 12.8287 18.8846C12.6687 18.8962 12.4402 18.9117 12.1638 18.9277C11.6122 18.9594 10.8637 18.9929 10.0841 18.999C9.3106 19.0051 8.47872 18.9845 7.77 18.9017C7.41693 18.8605 7.06591 18.8007 6.75558 18.7102Z',
  d6: 'M18.001 5.99902L6.35729 17.6427M12.9988 18.001H5.99902L5.99902 10.994',
  d7: 'M8.41411 17.0002H13V19.0002H5V11.0002H7V15.5859L17.5859 5L19.0001 6.41421L8.41411 17.0002Z',
};

export const IconArrowDownLeft01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-down-left-01-stroke-rounded IconArrowDownLeft01StrokeRounded"
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
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconArrowDownLeft01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-down-left-01-duotone-rounded IconArrowDownLeft01DuotoneRounded"
    >
      <path 
        opacity="0.5" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconArrowDownLeft01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-down-left-01-twotone-rounded IconArrowDownLeft01TwotoneRounded"
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
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconArrowDownLeft01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-down-left-01-solid-rounded IconArrowDownLeft01SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconArrowDownLeft01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-down-left-01-bulk-rounded IconArrowDownLeft01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconArrowDownLeft01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-down-left-01-stroke-sharp IconArrowDownLeft01StrokeSharp"
    >
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconArrowDownLeft01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-down-left-01-solid-sharp IconArrowDownLeft01SolidSharp"
    >
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfArrowDownLeft01: TheIconSelfPack = {
  name: 'ArrowDownLeft01',
  StrokeRounded: IconArrowDownLeft01StrokeRounded,
  DuotoneRounded: IconArrowDownLeft01DuotoneRounded,
  TwotoneRounded: IconArrowDownLeft01TwotoneRounded,
  SolidRounded: IconArrowDownLeft01SolidRounded,
  BulkRounded: IconArrowDownLeft01BulkRounded,
  StrokeSharp: IconArrowDownLeft01StrokeSharp,
  SolidSharp: IconArrowDownLeft01SolidSharp,
};