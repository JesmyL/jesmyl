import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M16 10.5C16 10.5 13.054 13.5 12 13.5C10.9459 13.5 8 10.5 8 10.5',
  d2: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM12.0626 12.4598C12.0373 12.4712 12.0166 12.4798 12.0001 12.4861C11.9836 12.4798 11.9628 12.4712 11.9375 12.4598C11.8223 12.4077 11.6697 12.3215 11.4827 12.1976C11.1095 11.9503 10.6791 11.6065 10.2584 11.2432C9.8419 10.8834 9.45435 10.5212 9.16969 10.2477L8.71355 9.79932C8.32658 9.40536 7.69337 9.3995 7.29935 9.78643C6.90529 10.1734 6.89954 10.8065 7.2865 11.2006L7.78386 11.6897C8.08451 11.9786 8.49932 12.3665 8.95105 12.7567C9.39864 13.1433 9.90231 13.5496 10.3779 13.8647C10.6154 14.0221 10.8659 14.1702 11.1135 14.2822C11.3436 14.3862 11.6584 14.4999 12.0001 14.4999C12.3417 14.4999 12.6565 14.3862 12.8866 14.2822C13.1342 14.1702 13.3848 14.0221 13.6222 13.8647C14.0978 13.5496 14.6015 13.1433 15.0491 12.7567C15.5008 12.3665 15.9156 11.9786 16.2162 11.6897L16.7136 11.2006C17.1006 10.8065 17.0948 10.1734 16.7008 9.78643C16.3067 9.3995 15.6735 9.40536 15.2866 9.79932L14.8304 10.2477C14.5457 10.5212 14.1582 10.8834 13.7417 11.2432C13.321 11.6065 12.8906 11.9503 12.5174 12.1976C12.3304 12.3215 12.1778 12.4077 12.0626 12.4598Z',
  d3: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z',
  d4: 'M12.0001 12.4861C12.0166 12.4798 12.0373 12.4712 12.0626 12.4598C12.1778 12.4077 12.3304 12.3215 12.5174 12.1976C12.8906 11.9503 13.321 11.6065 13.7417 11.2432C14.1582 10.8834 14.5457 10.5212 14.8304 10.2477L15.2866 9.79932C15.6735 9.40536 16.3067 9.3995 16.7008 9.78643C17.0948 10.1734 17.1006 10.8065 16.7136 11.2006L16.2162 11.6897C15.9156 11.9786 15.5008 12.3665 15.0491 12.7567C14.6015 13.1433 14.0978 13.5496 13.6222 13.8647C13.3848 14.0221 13.1342 14.1702 12.8866 14.2822C12.6565 14.3862 12.3417 14.4999 12.0001 14.4999C11.6584 14.4999 11.3436 14.3862 11.1135 14.2822C10.8659 14.1702 10.6154 14.0221 10.3779 13.8647C9.90231 13.5496 9.39864 13.1433 8.95105 12.7567C8.49932 12.3665 8.08451 11.9786 7.78386 11.6897L7.2865 11.2006C6.89954 10.8065 6.90529 10.1734 7.29935 9.78643C7.69337 9.3995 8.32658 9.40536 8.71355 9.79932L9.16969 10.2477C9.45435 10.5212 9.8419 10.8834 10.2584 11.2432C10.6791 11.6065 11.1095 11.9503 11.4827 12.1976C11.6697 12.3215 11.8223 12.4077 11.9375 12.4598C11.9628 12.4712 11.9836 12.4798 12.0001 12.4861Z',
  d5: 'M17 11L12 15L7 11',
  d6: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM7.62439 10.2191L6.375 11.7809L11.9997 16.2806L17.6244 11.7809L16.375 10.2191L11.9997 13.7194L7.62439 10.2191Z',
};

export const IconCircleArrowDown01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-down-01-stroke-rounded IconCircleArrowDown01StrokeRounded"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCircleArrowDown01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-down-01-duotone-rounded IconCircleArrowDown01DuotoneRounded"
    >
      <circle 
        opacity="var(--icon-opacity)" 
        cx="12" 
        cy="12" 
        r="10" 
        fill="var(--icon-fill)"></circle>
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCircleArrowDown01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-down-01-twotone-rounded IconCircleArrowDown01TwotoneRounded"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCircleArrowDown01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-down-01-solid-rounded IconCircleArrowDown01SolidRounded"
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

export const IconCircleArrowDown01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-down-01-bulk-rounded IconCircleArrowDown01BulkRounded"
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

export const IconCircleArrowDown01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-down-01-stroke-sharp IconCircleArrowDown01StrokeSharp"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconCircleArrowDown01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-down-01-solid-sharp IconCircleArrowDown01SolidSharp"
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

export const iconPackOfCircleArrowDown01: TheIconSelfPack = {
  name: 'CircleArrowDown01',
  StrokeRounded: IconCircleArrowDown01StrokeRounded,
  DuotoneRounded: IconCircleArrowDown01DuotoneRounded,
  TwotoneRounded: IconCircleArrowDown01TwotoneRounded,
  SolidRounded: IconCircleArrowDown01SolidRounded,
  BulkRounded: IconCircleArrowDown01BulkRounded,
  StrokeSharp: IconCircleArrowDown01StrokeSharp,
  SolidSharp: IconCircleArrowDown01SolidSharp,
};