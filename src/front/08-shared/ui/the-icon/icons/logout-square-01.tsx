import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z',
  d2: 'M16 12H8M16 12C16 11.2998 14.0057 9.99153 13.5 9.5M16 12C16 12.7002 14.0057 14.0085 13.5 14.5',
  d3: 'M17.312 1.93059C15.9686 1.74998 14.2479 1.74999 12.0572 1.75H11.9428C9.75212 1.74999 8.03144 1.74998 6.68802 1.93059C5.31137 2.11568 4.21911 2.50272 3.36091 3.36091C2.50272 4.21911 2.11568 5.31137 1.93059 6.68802C1.74998 8.03144 1.74999 9.75212 1.75 11.9428V12.0572C1.74999 14.2479 1.74998 15.9686 1.93059 17.312C2.11568 18.6886 2.50272 19.7809 3.36091 20.6391C4.21911 21.4973 5.31137 21.8843 6.68802 22.0694C8.03144 22.25 9.7521 22.25 11.9428 22.25H11.9428H12.0572H12.0572C14.2479 22.25 15.9686 22.25 17.312 22.0694C18.6886 21.8843 19.7809 21.4973 20.6391 20.6391C21.4973 19.7809 21.8843 18.6886 22.0694 17.312C22.25 15.9686 22.25 14.2479 22.25 12.0572V12.0572V11.9428V11.9428C22.25 9.7521 22.25 8.03144 22.0694 6.68802C21.8843 5.31137 21.4973 4.21911 20.6391 3.36091C19.7809 2.50272 18.6886 2.11568 17.312 1.93059ZM7 12.0059C7 12.5581 7.44772 13.0059 8 13.0059H12.5L12.5 13.5884C12.4999 13.764 12.4997 13.9797 12.5218 14.1561L12.5222 14.1595C12.538 14.2859 12.6098 14.862 13.1754 15.1363C13.7422 15.4113 14.2424 15.1093 14.3506 15.044L14.8191 14.7049C15.1949 14.4102 15.7094 14.0046 16.1004 13.6241C16.2955 13.4343 16.4967 13.217 16.6556 12.9861C16.7968 12.7809 17 12.4307 17 12C17 11.5693 16.7968 11.2191 16.6556 11.0139C16.4967 10.783 16.2955 10.5657 16.1004 10.3759C15.7094 9.99545 15.1949 9.58975 14.8191 9.29511L14.3506 8.95597C14.2424 8.89065 13.7423 8.58872 13.1754 8.86368C12.6098 9.13804 12.538 9.71408 12.5222 9.84053L12.5218 9.84387C12.4997 10.0203 12.4999 10.236 12.5 10.4116L12.5 11.0059H8C7.44772 11.0059 7 11.4536 7 12.0059Z',
  d4: 'M12.0572 1.75C14.2479 1.74999 15.9686 1.74998 17.312 1.93059C18.6886 2.11568 19.7809 2.50272 20.6391 3.36091C21.4973 4.21911 21.8843 5.31137 22.0694 6.68802C22.25 8.03144 22.25 9.7521 22.25 11.9428V11.9428V12.0572V12.0572C22.25 14.2479 22.25 15.9686 22.0694 17.312C21.8843 18.6886 21.4973 19.7809 20.6391 20.6391C19.7809 21.4973 18.6886 21.8843 17.312 22.0694C15.9686 22.25 14.2479 22.25 12.0572 22.25H12.0572H11.9428H11.9428C9.7521 22.25 8.03144 22.25 6.68802 22.0694C5.31137 21.8843 4.21911 21.4973 3.36091 20.6391C2.50272 19.7809 2.11568 18.6886 1.93059 17.312C1.74998 15.9686 1.74999 14.2479 1.75 12.0572V11.9428C1.74999 9.75212 1.74998 8.03144 1.93059 6.68802C2.11568 5.31137 2.50272 4.21911 3.36091 3.36091C4.21911 2.50272 5.31137 2.11568 6.68802 1.93059C8.03144 1.74998 9.75212 1.74999 11.9428 1.75H12.0572Z',
  d5: 'M8 13.0059C7.44772 13.0059 7 12.5581 7 12.0059C7 11.4536 7.44772 11.0059 8 11.0059L12.5 11.0059L12.5 10.4116C12.4999 10.236 12.4997 10.0203 12.5218 9.84387L12.5222 9.84053C12.538 9.71408 12.6098 9.13804 13.1754 8.86368C13.7423 8.58872 14.2424 8.89065 14.3506 8.95597L14.8191 9.29511C15.1949 9.58975 15.7094 9.99545 16.1004 10.3759C16.2955 10.5657 16.4967 10.783 16.6556 11.0139C16.7968 11.2191 17 11.5693 17 12C17 12.4307 16.7968 12.7809 16.6556 12.9861C16.4967 13.217 16.2955 13.4343 16.1004 13.6241C15.7094 14.0046 15.1949 14.4102 14.8191 14.7049L14.3506 15.044C14.2424 15.1093 13.7422 15.4113 13.1754 15.1363C12.6098 14.862 12.538 14.2859 12.5222 14.1595L12.5218 14.1561C12.4997 13.9797 12.4999 13.764 12.5 13.5884L12.5 13.0059L8 13.0059Z',
  d6: 'M3 21H21V3H3V21Z',
  d7: 'M8 12H15.428M13 9L16 12L13 15',
  d8: 'M3 2.25C2.58579 2.25 2.25 2.58579 2.25 3V21C2.25 21.4142 2.58579 21.75 3 21.75H21C21.4142 21.75 21.75 21.4142 21.75 21V3C21.75 2.58579 21.4142 2.25 21 2.25H3ZM17.4142 12.0001L13.7071 8.29297L12.2929 9.70718L13.5858 11.0001H8V13.0001H13.5858L12.2929 14.293L13.7071 15.7072L17.4142 12.0001Z',
};

export const IconLogoutSquare01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="logout-square-01-stroke-rounded IconLogoutSquare01StrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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

export const IconLogoutSquare01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="logout-square-01-duotone-rounded IconLogoutSquare01DuotoneRounded"
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

export const IconLogoutSquare01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="logout-square-01-twotone-rounded IconLogoutSquare01TwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLogoutSquare01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="logout-square-01-solid-rounded IconLogoutSquare01SolidRounded"
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

export const IconLogoutSquare01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="logout-square-01-bulk-rounded IconLogoutSquare01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconLogoutSquare01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="logout-square-01-stroke-sharp IconLogoutSquare01StrokeSharp"
    >
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconLogoutSquare01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="logout-square-01-solid-sharp IconLogoutSquare01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfLogoutSquare01: TheIconSelfPack = {
  name: 'LogoutSquare01',
  StrokeRounded: IconLogoutSquare01StrokeRounded,
  DuotoneRounded: IconLogoutSquare01DuotoneRounded,
  TwotoneRounded: IconLogoutSquare01TwotoneRounded,
  SolidRounded: IconLogoutSquare01SolidRounded,
  BulkRounded: IconLogoutSquare01BulkRounded,
  StrokeSharp: IconLogoutSquare01StrokeSharp,
  SolidSharp: IconLogoutSquare01SolidSharp,
};