import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3 13V8H21V13C21 16.7712 21 18.6569 19.8284 19.8284C18.6569 21 16.7712 21 13 21H11C7.22876 21 5.34315 21 4.17157 19.8284C3 18.6569 3 16.7712 3 13Z',
  d2: 'M3 8L3.86538 6.07692C4.53654 4.58547 4.87211 3.83975 5.55231 3.41987C6.23251 3 7.105 3 8.85 3H15.15C16.895 3 17.7675 3 18.4477 3.41987C19.1279 3.83975 19.4635 4.58547 20.1346 6.07692L21 8',
  d3: 'M12 8V3',
  d4: 'M8.5 13.5H14C15.1046 13.5 16 14.3954 16 15.5C16 16.6046 15.1046 17.5 14 17.5H13M10 11.5L8 13.5L10 15.5',
  d5: 'M15.1189 2.25C15.9287 2.24998 16.6082 2.24996 17.1655 2.30341C17.7538 2.35982 18.294 2.48188 18.7982 2.77828C19.3075 3.07767 19.6543 3.48092 19.9499 3.95445C20.2249 4.39514 20.4896 4.95545 20.7986 5.60946L21.6636 7.44019C21.8846 7.90784 21.6657 8.45754 21.1746 8.66799C20.6836 8.87843 20.1064 8.66992 19.8854 8.20227L19.0417 6.41662C18.7055 5.70511 18.4853 5.24241 18.2737 4.90329C18.0762 4.58692 17.9279 4.44901 17.774 4.35854C17.615 4.26507 17.3983 4.1922 16.9702 4.15114C16.522 4.10817 15.9413 4.10708 15.0709 4.10708H8.92858C8.05825 4.10708 7.47751 4.10817 7.02936 4.15114C6.60119 4.1922 6.38452 4.26507 6.22554 4.35854C6.07163 4.44901 5.9233 4.58692 5.72586 4.90329C5.51422 5.24241 5.294 5.70511 4.9578 6.41662L4.11407 8.20227C3.89311 8.66992 3.31591 8.87843 2.82488 8.66799C2.33384 8.45754 2.1149 7.90784 2.33587 7.44019L3.20088 5.6095C3.50988 4.95548 3.7746 4.39515 4.04964 3.95445C4.34517 3.48092 4.69202 3.07767 5.20129 2.77828C5.70548 2.48188 6.24573 2.35982 6.83402 2.30341C7.39136 2.24996 8.07078 2.24998 8.88059 2.25H8.88063H15.1189H15.1189Z',
  d6: 'M13 3V8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8V3H13Z',
  d7: 'M2.99976 7.25C2.58554 7.25 2.24976 7.58579 2.24976 8L2.24976 13.0564V13.0564V13.0564C2.24974 14.8942 2.24973 16.3498 2.40289 17.489C2.56052 18.6614 2.89264 19.6104 3.641 20.3588C4.38936 21.1071 5.33831 21.4392 6.51073 21.5969C7.64995 21.75 9.10559 21.75 10.9433 21.75H13.0562C14.8939 21.75 16.3496 21.75 17.4888 21.5969C18.6612 21.4392 19.6101 21.1071 20.3585 20.3588C21.1069 19.6104 21.439 18.6614 21.5966 17.489C21.7498 16.3498 21.7498 14.8942 21.7498 13.0565V13.0564V8C21.7498 7.58579 21.414 7.25 20.9998 7.25L2.99976 7.25ZM10.5301 12.0303C10.823 11.7374 10.823 11.2626 10.5301 10.9697C10.2372 10.6768 9.76232 10.6768 9.46943 10.9697L7.46943 12.9697C7.17653 13.2626 7.17653 13.7374 7.46943 14.0303L9.46943 16.0303C9.76232 16.3232 10.2372 16.3232 10.5301 16.0303C10.823 15.7374 10.823 15.2626 10.5301 14.9697L9.81042 14.25L13.9998 14.25C14.6901 14.25 15.2498 14.8096 15.2498 15.5C15.2498 16.1904 14.6901 16.75 13.9998 16.75H12.9998C12.5855 16.75 12.2498 17.0858 12.2498 17.5C12.2498 17.9142 12.5855 18.25 12.9998 18.25H13.9998C15.5185 18.25 16.7498 17.0188 16.7498 15.5C16.7498 13.9812 15.5185 12.75 13.9998 12.75L9.81042 12.75L10.5301 12.0303Z',
  d8: 'M2.24976 8C2.24976 7.58579 2.58554 7.25 2.99976 7.25H20.9998C21.414 7.25 21.7498 7.58579 21.7498 8V13.0564V13.0565C21.7498 14.8942 21.7498 16.3498 21.5966 17.489C21.439 18.6614 21.1069 19.6104 20.3585 20.3588C19.6101 21.1071 18.6612 21.4392 17.4888 21.5969C16.3496 21.75 14.8939 21.75 13.0562 21.75H10.9433C9.10558 21.75 7.64995 21.75 6.51073 21.5969C5.33831 21.4392 4.38936 21.1071 3.641 20.3588C2.89264 19.6104 2.56052 18.6614 2.40289 17.489C2.24973 16.3498 2.24974 14.8942 2.24976 13.0564V13.0564V8Z',
  d9: 'M10.5301 10.9697C10.823 11.2626 10.823 11.7374 10.5301 12.0303L9.81042 12.75H13.9998C15.5185 12.75 16.7498 13.9812 16.7498 15.5C16.7498 17.0188 15.5185 18.25 13.9998 18.25H12.9998C12.5855 18.25 12.2498 17.9142 12.2498 17.5C12.2498 17.0858 12.5855 16.75 12.9998 16.75H13.9998C14.6901 16.75 15.2498 16.1904 15.2498 15.5C15.2498 14.8096 14.6901 14.25 13.9998 14.25H9.81042L10.5301 14.9697C10.823 15.2626 10.823 15.7374 10.5301 16.0303C10.2372 16.3232 9.76232 16.3232 9.46943 16.0303L7.46943 14.0303C7.17653 13.7374 7.17653 13.2626 7.46943 12.9697L9.46943 10.9697C9.76232 10.6768 10.2372 10.6768 10.5301 10.9697Z',
  d10: 'M15.1182 2.25C15.928 2.24998 16.6074 2.24997 17.1647 2.30341C17.753 2.35982 18.2933 2.48188 18.7975 2.77828C19.3067 3.07768 19.6536 3.48092 19.9491 3.95445C20.2242 4.39514 20.4889 4.95546 20.7979 5.60946L21.6629 7.44019C21.7356 7.59413 21.7607 7.75695 21.7441 7.91364C21.7013 7.5401 21.384 7.25 20.999 7.25H19.4347L19.041 6.41662C18.7048 5.70511 18.4845 5.24241 18.2729 4.90329C18.0755 4.58693 17.9271 4.44902 17.7732 4.35854C17.6142 4.26508 17.3976 4.1922 16.9694 4.15114C16.5213 4.10817 15.9405 4.10708 15.0702 4.10708H12.999V7.25H10.999V4.10708H8.92783C8.05751 4.10708 7.47676 4.10817 7.02861 4.15114C6.60044 4.1922 6.38377 4.26508 6.22479 4.35854C6.07089 4.44902 5.92256 4.58693 5.72511 4.90329C5.51347 5.24241 5.29325 5.70511 4.95706 6.41662L4.56328 7.25H2.99901C2.614 7.25 2.29675 7.54011 2.25393 7.91365C2.23732 7.75696 2.26239 7.59413 2.33512 7.44019L3.20013 5.6095C3.50913 4.95548 3.77386 4.39515 4.04889 3.95445C4.34442 3.48092 4.69127 3.07768 5.20054 2.77828C5.70473 2.48188 6.24498 2.35982 6.83327 2.30341C7.3906 2.24997 8.07005 2.24998 8.87985 2.25H15.1182Z',
  d11: 'M3 21V8H21V21H3Z',
  d12: 'M3 8L5.5 3H18.5L21 8',
  d13: 'M4.82918 2.66459C4.95622 2.4105 5.21592 2.25 5.5 2.25H18.5C18.7841 2.25 19.0438 2.4105 19.1708 2.66459L21.6708 7.66459L20.3292 8.33541L18.0365 3.75H5.96352L3.67082 8.33541L2.32918 7.66459L4.82918 2.66459Z',
  d14: 'M12 2.25C12.4142 2.25 12.75 2.58579 12.75 3V8C12.75 8.41421 12.4142 8.75 12 8.75C11.5858 8.75 11.25 8.41421 11.25 8V3C11.25 2.58579 11.5858 2.25 12 2.25Z',
  d15: 'M3 7.25C2.80109 7.25 2.61032 7.32902 2.46967 7.46967C2.32902 7.61032 2.25 7.80109 2.25 8L2.25 21C2.25 21.4142 2.58579 21.75 3 21.75H21C21.4142 21.75 21.75 21.4142 21.75 21V8C21.75 7.58579 21.4142 7.25 21 7.25L3 7.25ZM9.81077 12.7501L11.0608 11.5001L10.0001 10.4395L6.93945 13.5001L10.0001 16.5608L11.0608 15.5001L9.81077 14.2501L14.0001 14.2501C14.6905 14.2501 15.2501 14.8098 15.2501 15.5001C15.2501 16.1905 14.6905 16.7501 14.0001 16.7501H12.2501V18.2501H14.0001C15.5189 18.2501 16.7501 17.0189 16.7501 15.5001C16.7501 13.9813 15.5189 12.7501 14.0001 12.7501L9.81077 12.7501Z',
};

export const IconReturnRequestStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="return-request-stroke-rounded IconReturnRequestStrokeRounded"
    >
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
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconReturnRequestDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="return-request-duotone-rounded IconReturnRequestDuotoneRounded"
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
        strokeLinejoin="round" 
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
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconReturnRequestTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="return-request-twotone-rounded IconReturnRequestTwotoneRounded"
    >
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
      />
      <path 
        opacity="var(--icon-opacity)" 
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
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconReturnRequestSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="return-request-solid-rounded IconReturnRequestSolidRounded"
    >
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconReturnRequestBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="return-request-bulk-rounded IconReturnRequestBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconReturnRequestStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="return-request-stroke-sharp IconReturnRequestStrokeSharp"
    >
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
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
        strokeLinecap="square" 
      />
    </TheIconWrapper>
  );
};

export const IconReturnRequestSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="return-request-solid-sharp IconReturnRequestSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfReturnRequest: TheIconSelfPack = {
  name: 'ReturnRequest',
  StrokeRounded: IconReturnRequestStrokeRounded,
  DuotoneRounded: IconReturnRequestDuotoneRounded,
  TwotoneRounded: IconReturnRequestTwotoneRounded,
  SolidRounded: IconReturnRequestSolidRounded,
  BulkRounded: IconReturnRequestBulkRounded,
  StrokeSharp: IconReturnRequestStrokeSharp,
  SolidSharp: IconReturnRequestSolidSharp,
};