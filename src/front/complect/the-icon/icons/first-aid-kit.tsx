import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2 12.5625C2 9.46891 2 7.92211 3.02513 6.96106C4.05025 6 5.70017 6 9 6H15C18.2998 6 19.9497 6 20.9749 6.96106C22 7.92211 22 9.46891 22 12.5625V14.4375C22 17.5311 22 19.0779 20.9749 20.0389C19.9497 21 18.2998 21 15 21H9C5.70017 21 4.05025 21 3.02513 20.0389C2 19.0779 2 17.5311 2 14.4375V12.5625Z',
  d2: 'M9 13.5H15M12 10.5L12 16.5',
  d3: 'M17 6C17 3.518 16.482 3 14 3H10C7.518 3 7 3.518 7 6',
  d4: 'M14 3H10C7.518 3 7 3.518 7 6H17C17 3.518 16.482 3 14 3Z',
  d5: 'M15.0527 5.375H15.0527H15.0527H8.94732H8.94731H8.9473C7.34209 5.37499 6.06578 5.37497 5.06576 5.50102C4.03794 5.63057 3.18873 5.90463 2.51217 6.5389C1.82876 7.1796 1.52713 7.99471 1.38574 8.98061C1.24996 9.92739 1.24998 11.1319 1.25 12.6289V12.6289V12.6289V14.6211V14.6211V14.6211C1.24998 16.1181 1.24996 17.3226 1.38574 18.2694C1.52713 19.2553 1.82876 20.0704 2.51217 20.7111C3.18873 21.3454 4.03794 21.6194 5.06576 21.749C6.06579 21.875 7.3421 21.875 8.94733 21.875H15.0527C16.6579 21.875 17.9342 21.875 18.9342 21.749C19.9621 21.6194 20.8113 21.3454 21.4878 20.7111C22.1712 20.0704 22.4729 19.2553 22.6143 18.2694C22.75 17.3226 22.75 16.1181 22.75 14.6211V14.6211V14.6211V12.6289V12.6289V12.6289C22.75 11.1319 22.75 9.92738 22.6143 8.98061C22.4729 7.99471 22.1712 7.1796 21.4878 6.5389C20.8113 5.90463 19.9621 5.63057 18.9342 5.50102C17.9342 5.37497 16.6579 5.37499 15.0527 5.375ZM13 10.625C13 10.0727 12.5523 9.625 12 9.625C11.4477 9.625 11 10.0727 11 10.625V12.625H9C8.44772 12.625 8 13.0727 8 13.625C8 14.1773 8.44772 14.625 9 14.625H11V16.625C11 17.1773 11.4477 17.625 12 17.625C12.5523 17.625 13 17.1773 13 16.625V14.625H15C15.5523 14.625 16 14.1773 16 13.625C16 13.0727 15.5523 12.625 15 12.625H13V10.625Z',
  d6: 'M8.09643 4.82372C8.03256 5.11444 8 5.52614 8 6.125C8 6.67728 7.55228 7.125 7 7.125C6.44772 7.125 6 6.67728 6 6.125C6 5.48286 6.03219 4.89906 6.14301 4.39459C6.25632 3.8788 6.46503 3.38426 6.86214 2.98714C7.25926 2.59003 7.7538 2.38132 8.26959 2.26801C8.77406 2.15719 9.35786 2.125 10 2.125H14C14.6421 2.125 15.2259 2.15719 15.7304 2.26801C16.2462 2.38132 16.7407 2.59003 17.1379 2.98714C17.535 3.38426 17.7437 3.8788 17.857 4.39459C17.9678 4.89906 18 5.48286 18 6.125C18 6.67728 17.5523 7.125 17 7.125C16.4477 7.125 16 6.67728 16 6.125C16 5.52614 15.9674 5.11444 15.9036 4.82372C15.8422 4.54433 15.7663 4.44399 15.7236 4.40136C15.681 4.35872 15.5807 4.28281 15.3013 4.22143C15.0106 4.15756 14.5989 4.125 14 4.125H10C9.40114 4.125 8.98944 4.15756 8.69872 4.22143C8.41933 4.28281 8.31899 4.35872 8.27636 4.40136C8.23372 4.44399 8.15781 4.54433 8.09643 4.82372Z',
  d7: 'M15.0527 5.375C16.6579 5.37499 17.9342 5.37497 18.9342 5.50102C19.9621 5.63057 20.8113 5.90463 21.4878 6.5389C22.1712 7.1796 22.4729 7.99471 22.6143 8.98061C22.75 9.92739 22.75 11.1319 22.75 12.6289V12.6289V14.6211V14.6211C22.75 16.1181 22.75 17.3226 22.6143 18.2694C22.4729 19.2553 22.1712 20.0704 21.4878 20.7111C20.8113 21.3454 19.9621 21.6194 18.9342 21.749C17.9342 21.875 16.6579 21.875 15.0527 21.875H8.94733C7.3421 21.875 6.06579 21.875 5.06576 21.749C4.03794 21.6194 3.18873 21.3454 2.51217 20.7111C1.82876 20.0704 1.52713 19.2553 1.38574 18.2694C1.24996 17.3226 1.24998 16.1181 1.25 14.6211V14.6211V12.6289V12.6289C1.24998 11.1319 1.24996 9.92739 1.38574 8.98061C1.52713 7.99471 1.82876 7.1796 2.51217 6.5389C3.18873 5.90463 4.03794 5.63057 5.06576 5.50102C6.06578 5.37497 7.34209 5.37499 8.94731 5.375H8.94732H15.0527H15.0527Z',
  d8: 'M12 9.625C12.5523 9.625 13 10.0727 13 10.625V12.625H15C15.5523 12.625 16 13.0727 16 13.625C16 14.1773 15.5523 14.625 15 14.625H13V16.625C13 17.1773 12.5523 17.625 12 17.625C11.4477 17.625 11 17.1773 11 16.625V14.625H9C8.44772 14.625 8 14.1773 8 13.625C8 13.0727 8.44772 12.625 9 12.625H11V10.625C11 10.0727 11.4477 9.625 12 9.625Z',
  d9: 'M8.02214 5.376C8.03825 5.15406 8.06279 4.97295 8.09557 4.82372C8.15695 4.54433 8.23286 4.44399 8.2755 4.40136C8.31814 4.35872 8.41847 4.28281 8.69786 4.22143C8.98858 4.15756 9.40028 4.125 9.99914 4.125H13.9991C14.598 4.125 15.0097 4.15756 15.3004 4.22143C15.5798 4.28281 15.6801 4.35872 15.7228 4.40136C15.7654 4.44399 15.8413 4.54433 15.9027 4.82372C15.9355 4.97295 15.96 5.15406 15.9761 5.376C16.7246 5.37855 17.3911 5.38759 17.9827 5.41956C17.9633 5.05074 17.9249 4.70741 17.8561 4.39459C17.7428 3.8788 17.5341 3.38426 17.137 2.98714C16.7399 2.59003 16.2453 2.38132 15.7296 2.26801C15.2251 2.15719 14.6413 2.125 13.9991 2.125H9.99914C9.357 2.125 8.77321 2.15719 8.26873 2.26801C7.75294 2.38132 7.2584 2.59003 6.86129 2.98714C6.46417 3.38426 6.25546 3.8788 6.14215 4.39459C6.07343 4.70741 6.03495 5.05074 6.01562 5.41956C6.60714 5.38759 7.27369 5.37855 8.02214 5.376Z',
  d10: 'M2 21H22V6.00039L2 6V21Z',
  d11: 'M7 6V3H17V5.99992',
  d12: 'M8 13.5H16M12 9.5L12 17.5',
  d13: 'M8.16667 4V5.75H6.25V3.125C6.25 2.64175 6.67906 2.25 7.20833 2.25H16.7917C17.3209 2.25 17.75 2.64175 17.75 3.125V5.74993H15.8333V4H8.16667Z',
  d14: 'M2.00001 5.25C1.8011 5.25 1.61033 5.32901 1.46968 5.46966C1.32902 5.61032 1.25 5.80109 1.25 6V21C1.25 21.4142 1.58579 21.75 2 21.75H22C22.4142 21.75 22.75 21.4142 22.75 21V6.00039C22.75 5.58618 22.4142 5.25039 22 5.25039L2.00001 5.25ZM11 9.5V12.5H8V14.5H11V17.5H13V14.5H16V12.5H13V9.5H11Z',
};

export const IconFirstAidKitStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="first-aid-kit-stroke-rounded IconFirstAidKitStrokeRounded"
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconFirstAidKitDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="first-aid-kit-duotone-rounded IconFirstAidKitDuotoneRounded"
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

export const IconFirstAidKitTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="first-aid-kit-twotone-rounded IconFirstAidKitTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconFirstAidKitSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="first-aid-kit-solid-rounded IconFirstAidKitSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconFirstAidKitBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="first-aid-kit-bulk-rounded IconFirstAidKitBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
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

export const IconFirstAidKitStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="first-aid-kit-stroke-sharp IconFirstAidKitStrokeSharp"
    >
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconFirstAidKitSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="first-aid-kit-solid-sharp IconFirstAidKitSolidSharp"
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
    </TheIconWrapper>
  );
};

export const iconPackOfFirstAidKit: TheIconSelfPack = {
  name: 'FirstAidKit',
  StrokeRounded: IconFirstAidKitStrokeRounded,
  DuotoneRounded: IconFirstAidKitDuotoneRounded,
  TwotoneRounded: IconFirstAidKitTwotoneRounded,
  SolidRounded: IconFirstAidKitSolidRounded,
  BulkRounded: IconFirstAidKitBulkRounded,
  StrokeSharp: IconFirstAidKitStrokeSharp,
  SolidSharp: IconFirstAidKitSolidSharp,
};