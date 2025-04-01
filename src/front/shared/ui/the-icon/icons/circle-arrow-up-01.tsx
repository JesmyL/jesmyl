import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M16 13.5C16 13.5 13.054 10.5 12 10.5C10.9459 10.5 8 13.5 8 13.5',
  d2: 'M12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75ZM11.9374 11.5402C11.9627 11.5288 11.9834 11.5202 11.9999 11.5139C12.0164 11.5202 12.0372 11.5288 12.0625 11.5402C12.1777 11.5923 12.3303 11.6785 12.5173 11.8024C12.8905 12.0497 13.3209 12.3935 13.7416 12.7568C14.1581 13.1166 14.5456 13.4788 14.8303 13.7523L15.2865 14.2007C15.6734 14.5946 16.3066 14.6005 16.7007 14.2136C17.0947 13.8266 17.1005 13.1935 16.7135 12.7994L16.2161 12.3103C15.9155 12.0214 15.5007 11.6335 15.049 11.2433C14.6014 10.8567 14.0977 10.4504 13.6221 10.1353C13.3847 9.97793 13.1341 9.82979 12.8865 9.7178C12.6564 9.61378 12.3416 9.50009 11.9999 9.50009C11.6583 9.50009 11.3435 9.61378 11.1134 9.7178C10.8658 9.82979 10.6153 9.97793 10.3778 10.1353C9.90221 10.4504 9.39853 10.8567 8.95094 11.2433C8.49922 11.6335 8.0844 12.0214 7.78376 12.3103L7.2864 12.7994C6.89944 13.1935 6.90519 13.8266 7.29924 14.2136C7.69327 14.6005 8.32647 14.5946 8.71344 14.2007L9.16959 13.7523C9.45425 13.4788 9.8418 13.1166 10.2583 12.7568C10.679 12.3935 11.1094 12.0497 11.4826 11.8024C11.6696 11.6785 11.8222 11.5923 11.9374 11.5402Z',
  d3: 'M22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12Z',
  d4: 'M11.9999 11.5139C11.9834 11.5202 11.9627 11.5288 11.9374 11.5402C11.8222 11.5923 11.6696 11.6785 11.4826 11.8024C11.1094 12.0497 10.679 12.3935 10.2583 12.7568C9.8418 13.1166 9.45425 13.4788 9.16959 13.7523L8.71344 14.2007C8.32647 14.5946 7.69327 14.6005 7.29924 14.2136C6.90519 13.8266 6.89944 13.1935 7.2864 12.7994L7.78376 12.3103C8.0844 12.0214 8.49922 11.6335 8.95094 11.2433C9.39853 10.8567 9.90221 10.4504 10.3778 10.1353C10.6152 9.97793 10.8658 9.82979 11.1134 9.7178C11.3435 9.61378 11.6583 9.50009 11.9999 9.50009C12.3416 9.50009 12.6564 9.61378 12.8865 9.7178C13.1341 9.82979 13.3846 9.97793 13.6221 10.1353C14.0977 10.4504 14.6014 10.8567 15.049 11.2433C15.5007 11.6335 15.9155 12.0214 16.2161 12.3103L16.7135 12.7994C17.1005 13.1935 17.0947 13.8266 16.7007 14.2136C16.3066 14.6005 15.6734 14.5946 15.2865 14.2007L14.8303 13.7523C14.5456 13.4788 14.1581 13.1166 13.7416 12.7568C13.3209 12.3935 12.8905 12.0497 12.5173 11.8024C12.3303 11.6785 12.1777 11.5923 12.0625 11.5402C12.0372 11.5288 12.0164 11.5202 11.9999 11.5139Z',
  d5: 'M7 14L12 10L17 14',
  d6: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM12.6247 9.21913L12 8.71938L11.3753 9.21913L6.37531 13.2191L7.62469 14.7808L12 11.2806L16.3753 14.7809L17.6247 13.2191L12.6247 9.21913Z',
};

export const IconCircleArrowUp01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-up-01-stroke-rounded IconCircleArrowUp01StrokeRounded"
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

export const IconCircleArrowUp01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-up-01-duotone-rounded IconCircleArrowUp01DuotoneRounded"
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

export const IconCircleArrowUp01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-up-01-twotone-rounded IconCircleArrowUp01TwotoneRounded"
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

export const IconCircleArrowUp01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-up-01-solid-rounded IconCircleArrowUp01SolidRounded"
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

export const IconCircleArrowUp01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-up-01-bulk-rounded IconCircleArrowUp01BulkRounded"
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

export const IconCircleArrowUp01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-up-01-stroke-sharp IconCircleArrowUp01StrokeSharp"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round"></circle>
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconCircleArrowUp01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-up-01-solid-sharp IconCircleArrowUp01SolidSharp"
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

export const iconPackOfCircleArrowUp01: TheIconSelfPack = {
  name: 'CircleArrowUp01',
  StrokeRounded: IconCircleArrowUp01StrokeRounded,
  DuotoneRounded: IconCircleArrowUp01DuotoneRounded,
  TwotoneRounded: IconCircleArrowUp01TwotoneRounded,
  SolidRounded: IconCircleArrowUp01SolidRounded,
  BulkRounded: IconCircleArrowUp01BulkRounded,
  StrokeSharp: IconCircleArrowUp01StrokeSharp,
  SolidSharp: IconCircleArrowUp01SolidSharp,
};