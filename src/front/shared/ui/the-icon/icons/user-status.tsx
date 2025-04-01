import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M13 21.9506C12.6711 21.9833 12.3375 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 12.3375 21.9833 12.6711 21.9506 13',
  d2: 'M7.5 17C8.90247 15.5311 11.0212 14.9041 13 15.1941M14.4951 9.5C14.4951 10.8807 13.3742 12 11.9915 12C10.6089 12 9.48797 10.8807 9.48797 9.5C9.48797 8.11929 10.6089 7 11.9915 7C13.3742 7 14.4951 8.11929 14.4951 9.5Z',
  d3: 'M16.1552 21.0985C14.8898 21.6774 13.4826 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 13.4826 21.6774 14.8898 21.0985 16.1552C20.458 15.4458 19.531 15 18.5 15C16.567 15 15 16.567 15 18.5C15 19.531 15.4458 20.458 16.1552 21.0985ZM14.4954 9.5C14.4954 10.8807 13.3745 12 11.9918 12C10.6092 12 9.48828 10.8807 9.48828 9.5C9.48828 8.11929 10.6092 7 11.9918 7C13.3745 7 14.4954 8.11929 14.4954 9.5Z',
  d4: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 12.744 22.6744 13.4703 22.5305 14.1717C22.4418 14.6041 22.3975 14.8202 22.2437 14.8789C22.09 14.9377 21.886 14.7862 21.478 14.4832C20.6462 13.8655 19.6158 13.5 18.5 13.5C15.7386 13.5 13.5 15.7386 13.5 18.5C13.5 19.6158 13.8655 20.6462 14.4832 21.478C14.7862 21.886 14.9377 22.09 14.8789 22.2437C14.8202 22.3975 14.6041 22.4418 14.1717 22.5305C13.4703 22.6744 12.744 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM11.9915 6.25C10.1956 6.25 8.73797 7.70407 8.73797 9.5C8.73797 11.2959 10.1956 12.75 11.9915 12.75C13.7874 12.75 15.2451 11.2959 15.2451 9.5C15.2451 7.70407 13.7874 6.25 11.9915 6.25ZM11.9979 15.8752C12.4121 15.8717 12.745 15.5331 12.7415 15.1189C12.738 14.7047 12.3994 14.3717 11.9852 14.3753C10.1411 14.3909 8.27868 15.0984 6.95754 16.4821C6.67151 16.7817 6.68249 17.2564 6.98208 17.5425C7.28167 17.8285 7.75642 17.8175 8.04246 17.5179C9.05346 16.459 10.5134 15.8878 11.9979 15.8752Z',
  d5: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C12.744 22.75 13.4703 22.6744 14.1717 22.5305C14.6041 22.4418 14.8202 22.3975 14.8789 22.2437C14.9377 22.09 14.7862 21.886 14.4832 21.478C13.8655 20.6462 13.5 19.6158 13.5 18.5C13.5 15.7386 15.7386 13.5 18.5 13.5C19.6158 13.5 20.6462 13.8655 21.478 14.4832C21.886 14.7862 22.09 14.9377 22.2437 14.8789C22.3975 14.8202 22.4418 14.6041 22.5305 14.1717C22.6744 13.4703 22.75 12.744 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25Z',
  d6: 'M8.73797 9.5C8.73797 7.70407 10.1956 6.25 11.9915 6.25C13.7874 6.25 15.2451 7.70407 15.2451 9.5C15.2451 11.2959 13.7874 12.75 11.9915 12.75C10.1956 12.75 8.73797 11.2959 8.73797 9.5Z',
  d7: 'M12.7415 15.1189C12.745 15.5331 12.4121 15.8717 11.9979 15.8752C10.5134 15.8878 9.05346 16.459 8.04246 17.5179C7.75642 17.8175 7.28167 17.8285 6.98208 17.5425C6.68249 17.2564 6.67151 16.7817 6.95754 16.4821C8.27868 15.0984 10.1411 14.3909 11.9852 14.3753C12.3994 14.3717 12.738 14.7047 12.7415 15.1189Z',
  d8: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 12.9157 22.6355 13.8048 22.42 14.6535C21.4466 13.7808 20.1603 13.25 18.75 13.25C15.7124 13.25 13.25 15.7124 13.25 18.75C13.25 20.1603 13.7808 21.4466 14.6535 22.42C13.8048 22.6355 12.9157 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM11.9922 6.25C10.1963 6.25 8.73859 7.70407 8.73859 9.5C8.73859 11.2959 10.1963 12.75 11.9922 12.75C13.788 12.75 15.2457 11.2959 15.2457 9.5C15.2457 7.70407 13.788 6.25 11.9922 6.25ZM6.77734 16.3094L8.2239 17.6906C9.18415 16.6848 10.5778 16.1389 11.9922 16.1251V14.1254C10.0781 14.1399 8.14927 14.8725 6.77734 16.3094Z',
  d9: 'M14.75 18.75C14.75 16.5409 16.5409 14.75 18.75 14.75C20.9591 14.75 22.75 16.5409 22.75 18.75C22.75 20.9591 20.9591 22.75 18.75 22.75C16.5409 22.75 14.75 20.9591 14.75 18.75Z',
};

export const IconUserStatusStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-status-stroke-rounded IconUserStatusStrokeRounded"
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
      <circle 
        cx="18.5" 
        cy="18.5" 
        r="3.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconUserStatusDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-status-duotone-rounded IconUserStatusDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
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
      <circle 
        cx="18.5" 
        cy="18.5" 
        r="3.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconUserStatusTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-status-twotone-rounded IconUserStatusTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <circle 
        opacity="var(--icon-opacity)" 
        cx="18.5" 
        cy="18.5" 
        r="3.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconUserStatusSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-status-solid-rounded IconUserStatusSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <circle 
        cx="18.5" 
        cy="18.5" 
        r="3.5" 
        fill="var(--icon-fill)"></circle>
    </TheIconWrapper>
  );
};

export const IconUserStatusBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-status-bulk-rounded IconUserStatusBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <circle 
        cx="18.5" 
        cy="18.5" 
        r="3.5" 
        fill="var(--icon-fill)"></circle>
    </TheIconWrapper>
  );
};

export const IconUserStatusStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-status-stroke-sharp IconUserStatusStrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <circle 
        cx="18.5" 
        cy="18.5" 
        r="3.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
    </TheIconWrapper>
  );
};

export const IconUserStatusSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-status-solid-sharp IconUserStatusSolidSharp"
    >
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
    </TheIconWrapper>
  );
};

export const iconPackOfUserStatus: TheIconSelfPack = {
  name: 'UserStatus',
  StrokeRounded: IconUserStatusStrokeRounded,
  DuotoneRounded: IconUserStatusDuotoneRounded,
  TwotoneRounded: IconUserStatusTwotoneRounded,
  SolidRounded: IconUserStatusSolidRounded,
  BulkRounded: IconUserStatusBulkRounded,
  StrokeSharp: IconUserStatusStrokeSharp,
  SolidSharp: IconUserStatusSolidSharp,
};