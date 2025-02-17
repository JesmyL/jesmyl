import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M22 5.5C22 7.433 20.433 9 18.5 9C16.567 9 15 7.433 15 5.5C15 3.567 16.567 2 18.5 2C20.433 2 22 3.567 22 5.5Z',
  d2: 'M21.9506 11C21.9833 11.3289 22 11.6625 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C12.3375 2 12.6711 2.01672 13 2.04938',
  d3: 'M8 10H12',
  d4: 'M8 15H16',
  d5: 'M21.0985 7.84477C21.6774 9.11024 22 10.5174 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C13.4826 2 14.8898 2.32262 16.1552 2.9015C15.4458 3.54203 15 4.46895 15 5.5C15 7.433 16.567 9 18.5 9C19.5311 9 20.458 8.55417 21.0985 7.84477Z',
  d6: 'M14.75 5.2504C14.75 3.04126 16.5409 1.2504 18.75 1.2504C20.9591 1.2504 22.75 3.04126 22.75 5.2504C22.75 7.45954 20.9591 9.2504 18.75 9.2504C16.5409 9.2504 14.75 7.45954 14.75 5.2504Z',
  d7: 'M1.25 12.0002C1.25 6.06314 6.06294 1.2502 12 1.2502C12.5725 1.2502 13.1345 1.29494 13.6827 1.38113C14.0931 1.44564 14.2982 1.47789 14.3655 1.62376C14.4327 1.76962 14.3089 1.97094 14.0613 2.37357C13.5468 3.21049 13.25 4.19569 13.25 5.2502C13.25 8.28776 15.7124 10.7502 18.75 10.7502C19.8045 10.7502 20.7897 10.4534 21.6266 9.93886C22.0293 9.69131 22.2306 9.56753 22.3764 9.63475C22.5223 9.70196 22.5546 9.90714 22.6191 10.3175C22.7053 10.8657 22.75 11.4277 22.75 12.0002C22.75 17.9373 17.9371 22.7502 12 22.7502C6.06294 22.7502 1.25 17.9373 1.25 12.0002ZM7.25 10C7.25 9.58579 7.58579 9.25001 8 9.25001H12C12.4142 9.25001 12.75 9.58579 12.75 10C12.75 10.4142 12.4142 10.75 12 10.75H8C7.58579 10.75 7.25 10.4142 7.25 10ZM8 14.25C7.58579 14.25 7.25 14.5858 7.25 15C7.25 15.4142 7.58579 15.75 8 15.75H16C16.4142 15.75 16.75 15.4142 16.75 15C16.75 14.5858 16.4142 14.25 16 14.25H8Z',
  d8: 'M1.25 12.0004C1.25 6.06334 6.06294 1.2504 12 1.2504C12.5725 1.2504 13.1345 1.29514 13.6827 1.38133C14.0931 1.44583 14.2982 1.47809 14.3655 1.62395C14.4327 1.76982 14.3089 1.97114 14.0613 2.37377C13.5468 3.21069 13.25 4.19589 13.25 5.2504C13.25 8.28796 15.7124 10.7504 18.75 10.7504C19.8045 10.7504 20.7897 10.4536 21.6266 9.93906C22.0293 9.69151 22.2306 9.56773 22.3764 9.63494C22.5223 9.70216 22.5546 9.90734 22.6191 10.3177C22.7053 10.8659 22.75 11.4279 22.75 12.0004C22.75 17.9375 17.9371 22.7504 12 22.7504C6.06294 22.7504 1.25 17.9375 1.25 12.0004Z',
  d9: 'M7.25 10.0002C7.25 9.58598 7.58579 9.2502 8 9.2502H12C12.4142 9.2502 12.75 9.58598 12.75 10.0002C12.75 10.4144 12.4142 10.7502 12 10.7502H8C7.58579 10.7502 7.25 10.4144 7.25 10.0002Z',
  d10: 'M7.25 15.0002C7.25 14.586 7.58579 14.2502 8 14.2502H16C16.4142 14.2502 16.75 14.586 16.75 15.0002C16.75 15.4144 16.4142 15.7502 16 15.7502H8C7.58579 15.7502 7.25 15.4144 7.25 15.0002Z',
  d11: 'M14.25 5.5C14.25 3.15279 16.1528 1.25 18.5 1.25C20.8472 1.25 22.75 3.15279 22.75 5.5C22.75 7.84721 20.8472 9.75 18.5 9.75C16.1528 9.75 14.25 7.84721 14.25 5.5Z',
  d12: 'M18.5 11.25C15.3244 11.25 12.75 8.67564 12.75 5.5C12.75 3.95033 13.363 2.54385 14.3598 1.50983C13.6004 1.33974 12.8107 1.25 12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 11.1893 22.6603 10.3996 22.4902 9.64018C21.4562 10.637 20.0497 11.25 18.5 11.25ZM12 10.75H8V9.25H12V10.75ZM8 14.25V15.75H16V14.25H8Z',
};

export const IconNotificationCircleStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-circle-stroke-rounded IconNotificationCircleStrokeRounded"
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
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
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

export const IconNotificationCircleDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-circle-duotone-rounded IconNotificationCircleDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
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
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
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

export const IconNotificationCircleTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-circle-twotone-rounded IconNotificationCircleTwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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
        strokeLinejoin="round" 
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

export const IconNotificationCircleSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-circle-solid-rounded IconNotificationCircleSolidRounded"
    >
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

export const IconNotificationCircleBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-circle-bulk-rounded IconNotificationCircleBulkRounded"
    >
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
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
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconNotificationCircleStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-circle-stroke-sharp IconNotificationCircleStrokeSharp"
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
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconNotificationCircleSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-circle-solid-sharp IconNotificationCircleSolidSharp"
    >
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfNotificationCircle: TheIconSelfPack = {
  name: 'NotificationCircle',
  StrokeRounded: IconNotificationCircleStrokeRounded,
  DuotoneRounded: IconNotificationCircleDuotoneRounded,
  TwotoneRounded: IconNotificationCircleTwotoneRounded,
  SolidRounded: IconNotificationCircleSolidRounded,
  BulkRounded: IconNotificationCircleBulkRounded,
  StrokeSharp: IconNotificationCircleStrokeSharp,
  SolidSharp: IconNotificationCircleSolidSharp,
};