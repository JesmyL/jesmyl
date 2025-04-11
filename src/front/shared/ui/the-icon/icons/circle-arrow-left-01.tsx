import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M13.5 16C13.5 16 10.5 13.054 10.5 12C10.5 10.9459 13.5 8 13.5 8',
  d2: 'M22.75 12C22.75 6.06294 17.9371 1.25 12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12ZM11.5402 12.0626C11.5288 12.0373 11.5202 12.0166 11.5139 12.0001C11.5202 11.9836 11.5288 11.9628 11.5402 11.9375C11.5923 11.8223 11.6785 11.6697 11.8024 11.4827C12.0497 11.1095 12.3935 10.6791 12.7568 10.2584C13.1166 9.8419 13.4788 9.45435 13.7523 9.16969L14.2007 8.71354C14.5946 8.32658 14.6005 7.69337 14.2136 7.29935C13.8266 6.90529 13.1935 6.89954 12.7994 7.2865L12.3103 7.78386C12.0214 8.0845 11.6335 8.49932 11.2433 8.95105C10.8567 9.39864 10.4504 9.90231 10.1353 10.3779C9.97793 10.6154 9.82979 10.8659 9.7178 11.1135C9.61378 11.3436 9.50009 11.6584 9.50009 12.0001C9.50009 12.3417 9.61378 12.6565 9.7178 12.8866C9.82979 13.1342 9.97793 13.3847 10.1353 13.6222C10.4504 14.0978 10.8567 14.6015 11.2433 15.0491C11.6335 15.5008 12.0214 15.9156 12.3103 16.2162L12.7994 16.7136C13.1935 17.1006 13.8266 17.0948 14.2136 16.7008C14.6005 16.3067 14.5946 15.6735 14.2007 15.2866L13.7523 14.8304C13.4788 14.5457 13.1166 14.1582 12.7568 13.7417C12.3935 13.321 12.0497 12.8906 11.8024 12.5174C11.6785 12.3304 11.5923 12.1778 11.5402 12.0626Z',
  d3: 'M12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25Z',
  d4: 'M11.5139 12.0001C11.5202 12.0166 11.5288 12.0373 11.5402 12.0626C11.5923 12.1778 11.6785 12.3304 11.8024 12.5174C12.0497 12.8906 12.3935 13.321 12.7568 13.7417C13.1166 14.1582 13.4788 14.5457 13.7523 14.8304L14.2007 15.2866C14.5946 15.6735 14.6005 16.3067 14.2136 16.7008C13.8266 17.0948 13.1935 17.1006 12.7994 16.7136L12.3103 16.2162C12.0214 15.9156 11.6335 15.5008 11.2433 15.0491C10.8567 14.6015 10.4504 14.0978 10.1353 13.6222C9.97793 13.3848 9.82979 13.1342 9.7178 12.8866C9.61378 12.6565 9.50009 12.3417 9.50009 12.0001C9.50009 11.6584 9.61378 11.3436 9.7178 11.1135C9.82979 10.8659 9.97793 10.6154 10.1353 10.3779C10.4504 9.90231 10.8567 9.39864 11.2433 8.95105C11.6335 8.49932 12.0214 8.0845 12.3103 7.78386L12.7994 7.2865C13.1935 6.89954 13.8266 6.90529 14.2136 7.29935C14.6005 7.69337 14.5946 8.32658 14.2007 8.71355L13.7523 9.16969C13.4788 9.45435 13.1166 9.8419 12.7568 10.2584C12.3935 10.6791 12.0497 11.1095 11.8024 11.4827C11.6785 11.6697 11.5923 11.8223 11.5402 11.9375C11.5288 11.9628 11.5202 11.9836 11.5139 12.0001Z',
  d5: 'M14 7L10 12L14 17',
  d6: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM13.2191 6.37531L9.21913 11.3753L8.71938 12L9.21913 12.6247L13.2191 17.6247L14.7809 16.3753L11.2806 12L14.7808 7.62469L13.2191 6.37531Z',
};

export const IconCircleArrowLeft01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CircleArrowLeft01 StrokeRounded"
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

export const IconCircleArrowLeft01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CircleArrowLeft01 DuotoneRounded"
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

export const IconCircleArrowLeft01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CircleArrowLeft01 TwotoneRounded"
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

export const IconCircleArrowLeft01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CircleArrowLeft01 SolidRounded"
    >
      <path 
        d={d.d2}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconCircleArrowLeft01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CircleArrowLeft01 BulkRounded"
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

export const IconCircleArrowLeft01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CircleArrowLeft01 StrokeSharp"
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

export const IconCircleArrowLeft01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CircleArrowLeft01 SolidSharp"
    >
      <path 
        d={d.d6}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfCircleArrowLeft01: TheIconSelfPack = [
  'CircleArrowLeft01',
  IconCircleArrowLeft01StrokeRounded,
  IconCircleArrowLeft01DuotoneRounded,
  IconCircleArrowLeft01TwotoneRounded,
  IconCircleArrowLeft01SolidRounded,
  IconCircleArrowLeft01BulkRounded,
  IconCircleArrowLeft01StrokeSharp,
  IconCircleArrowLeft01SolidSharp,
];