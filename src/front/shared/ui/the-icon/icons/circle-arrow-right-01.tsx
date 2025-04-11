import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M10.5 8C10.5 8 13.5 10.946 13.5 12C13.5 13.0541 10.5 16 10.5 16',
  d2: 'M1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25C6.06294 1.25 1.25 6.06294 1.25 12ZM12.4598 11.9374C12.4712 11.9627 12.4798 11.9834 12.4861 11.9999C12.4798 12.0164 12.4712 12.0372 12.4598 12.0625C12.4077 12.1777 12.3215 12.3303 12.1976 12.5173C11.9503 12.8905 11.6065 13.3209 11.2432 13.7416C10.8834 14.1581 10.5212 14.5456 10.2477 14.8303L9.79932 15.2865C9.40536 15.6734 9.3995 16.3066 9.78643 16.7007C10.1734 17.0947 10.8065 17.1005 11.2006 16.7135L11.6897 16.2161C11.9786 15.9155 12.3665 15.5007 12.7567 15.049C13.1433 14.6014 13.5496 14.0977 13.8647 13.6221C14.0221 13.3846 14.1702 13.1341 14.2822 12.8865C14.3862 12.6564 14.4999 12.3416 14.4999 11.9999C14.4999 11.6583 14.3862 11.3435 14.2822 11.1134C14.1702 10.8658 14.0221 10.6152 13.8647 10.3778C13.5496 9.90221 13.1433 9.39853 12.7567 8.95094C12.3665 8.49922 11.9786 8.0844 11.6897 7.78376L11.2006 7.2864C10.8065 6.89944 10.1734 6.90519 9.78643 7.29924C9.3995 7.69327 9.40536 8.32647 9.79932 8.71344L10.2477 9.16959C10.5212 9.45425 10.8834 9.8418 11.2432 10.2583C11.6065 10.679 11.9503 11.1094 12.1976 11.4826C12.3215 11.6696 12.4077 11.8222 12.4598 11.9374Z',
  d3: 'M12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75Z',
  d4: 'M12.4861 11.9999C12.4798 11.9834 12.4712 11.9627 12.4598 11.9374C12.4077 11.8222 12.3215 11.6696 12.1976 11.4826C11.9503 11.1094 11.6065 10.679 11.2432 10.2583C10.8834 9.8418 10.5212 9.45425 10.2477 9.16959L9.79932 8.71344C9.40536 8.32647 9.3995 7.69327 9.78643 7.29924C10.1734 6.90519 10.8065 6.89944 11.2006 7.2864L11.6897 7.78376C11.9786 8.0844 12.3665 8.49922 12.7567 8.95094C13.1433 9.39853 13.5496 9.90221 13.8647 10.3778C14.0221 10.6152 14.1702 10.8658 14.2822 11.1134C14.3862 11.3435 14.4999 11.6583 14.4999 11.9999C14.4999 12.3416 14.3862 12.6564 14.2822 12.8865C14.1702 13.1341 14.0221 13.3846 13.8647 13.6221C13.5496 14.0977 13.1433 14.6014 12.7567 15.049C12.3665 15.5007 11.9786 15.9155 11.6897 16.2161L11.2006 16.7135C10.8065 17.1005 10.1734 17.0947 9.78643 16.7007C9.3995 16.3066 9.40536 15.6734 9.79932 15.2865L10.2477 14.8303C10.5212 14.5456 10.8834 14.1581 11.2432 13.7416C11.6065 13.3209 11.9503 12.8905 12.1976 12.5173C12.3215 12.3303 12.4077 12.1777 12.4598 12.0625C12.4712 12.0372 12.4798 12.0164 12.4861 11.9999Z',
  d5: 'M11 7L15 12L11 17',
  d6: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM10.2192 7.62469L13.7194 12L10.2191 16.3753L11.7809 17.6247L15.7809 12.6247L16.2806 12L15.7809 11.3753L11.7809 6.37531L10.2192 7.62469Z',
};

export const IconCircleArrowRight01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CircleArrowRight01 StrokeRounded"
    >
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sw"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconCircleArrowRight01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CircleArrowRight01 DuotoneRounded"
    >
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="f o7"
      />
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sw"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconCircleArrowRight01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CircleArrowRight01 TwotoneRounded"
    >
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sw"
      />
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconCircleArrowRight01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CircleArrowRight01 SolidRounded"
    >
      <path 
        d={d.d2}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconCircleArrowRight01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CircleArrowRight01 BulkRounded"
    >
      <path 
        d={d.d3}
        i-c="f o7"
      />
      <path 
        d={d.d4}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconCircleArrowRight01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CircleArrowRight01 StrokeSharp"
    >
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sj ss sw"
      />
      <path 
        d={d.d5}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconCircleArrowRight01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CircleArrowRight01 SolidSharp"
    >
      <path 
        d={d.d6}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfCircleArrowRight01: TheIconSelfPack = [
  'CircleArrowRight01',
  IconCircleArrowRight01StrokeRounded,
  IconCircleArrowRight01DuotoneRounded,
  IconCircleArrowRight01TwotoneRounded,
  IconCircleArrowRight01SolidRounded,
  IconCircleArrowRight01BulkRounded,
  IconCircleArrowRight01StrokeSharp,
  IconCircleArrowRight01SolidSharp,
];