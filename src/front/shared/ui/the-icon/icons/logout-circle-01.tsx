import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M16 12H8M16 12C16 11.2998 14.0057 9.99153 13.5 9.5M16 12C16 12.7002 14.0057 14.0085 13.5 14.5',
  d2: 'M12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25ZM7 12.0059C7 12.5581 7.44772 13.0059 8 13.0059H12.5L12.5 13.5884C12.4999 13.764 12.4997 13.9797 12.5218 14.1561L12.5222 14.1595C12.538 14.2859 12.6098 14.862 13.1754 15.1363C13.7422 15.4113 14.2424 15.1093 14.3506 15.044L14.8191 14.7049C15.1949 14.4102 15.7094 14.0046 16.1004 13.6241C16.2955 13.4343 16.4967 13.217 16.6556 12.9861C16.7968 12.7809 17 12.4307 17 12C17 11.5693 16.7968 11.2191 16.6556 11.0139C16.4967 10.783 16.2955 10.5657 16.1004 10.3759C15.7094 9.99545 15.1949 9.58975 14.8191 9.29511L14.3506 8.95597C14.2424 8.89065 13.7423 8.58872 13.1754 8.86368C12.6098 9.13804 12.538 9.71408 12.5222 9.84053L12.5218 9.84387C12.4997 10.0203 12.4999 10.236 12.5 10.4116L12.5 11.0059H8C7.44772 11.0059 7 11.4536 7 12.0059Z',
  d3: 'M22.75 12C22.75 6.06294 17.9371 1.25 12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12Z',
  d4: 'M8 13.0059C7.44772 13.0059 7 12.5581 7 12.0059C7 11.4536 7.44772 11.0059 8 11.0059L12.5 11.0059L12.5 10.4116C12.4999 10.236 12.4997 10.0203 12.5218 9.84387L12.5222 9.84053C12.538 9.71408 12.6098 9.13804 13.1754 8.86368C13.7423 8.58872 14.2424 8.89065 14.3506 8.95597L14.8191 9.29511C15.1949 9.58975 15.7094 9.99545 16.1004 10.3759C16.2955 10.5657 16.4967 10.783 16.6556 11.0139C16.7968 11.2191 17 11.5693 17 12C17 12.4307 16.7968 12.7809 16.6556 12.9861C16.4967 13.217 16.2955 13.4343 16.1004 13.6241C15.7094 14.0046 15.1949 14.4102 14.8191 14.7049L14.3506 15.044C14.2424 15.1093 13.7422 15.4113 13.1754 15.1363C12.6098 14.862 12.538 14.2859 12.5222 14.1595L12.5218 14.1561C12.4997 13.9797 12.4999 13.764 12.5 13.5884L12.5 13.0059L8 13.0059Z',
  d5: 'M8 12H15.2783M13 9L16 12L13 15',
  d6: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM17.4142 12.0001L13.7071 8.29297L12.2929 9.70718L13.5858 11.0001H8V13.0001H13.5858L12.2929 14.293L13.7071 15.7072L17.4142 12.0001Z',
};

export const IconLogoutCircle01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="LogoutCircle01 StrokeRounded"
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

export const IconLogoutCircle01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="LogoutCircle01 DuotoneRounded"
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

export const IconLogoutCircle01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="LogoutCircle01 TwotoneRounded"
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

export const IconLogoutCircle01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="LogoutCircle01 SolidRounded"
    >
      <path 
        d={d.d2}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconLogoutCircle01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="LogoutCircle01 BulkRounded"
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

export const IconLogoutCircle01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="LogoutCircle01 StrokeSharp"
    >
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sw"
      />
      <path 
        d={d.d5}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconLogoutCircle01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="LogoutCircle01 SolidSharp"
    >
      <path 
        d={d.d6}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfLogoutCircle01: TheIconSelfPack = [
  'LogoutCircle01',
  IconLogoutCircle01StrokeRounded,
  IconLogoutCircle01DuotoneRounded,
  IconLogoutCircle01TwotoneRounded,
  IconLogoutCircle01SolidRounded,
  IconLogoutCircle01BulkRounded,
  IconLogoutCircle01StrokeSharp,
  IconLogoutCircle01SolidSharp,
];