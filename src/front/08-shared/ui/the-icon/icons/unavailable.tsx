import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M5.75 5L19.75 19',
  d2: 'M22.75 12C22.75 6.47715 18.2728 2 12.75 2C7.22715 2 2.75 6.47715 2.75 12C2.75 17.5228 7.22715 22 12.75 22C18.2728 22 22.75 17.5228 22.75 12Z',
  d3: 'M12.7084 22C7.20851 22 2.75 17.5415 2.75 12.0416C2.75 9.2917 3.86463 6.80211 5.66674 5L19.75 19.0833C17.9479 20.8854 15.4583 22 12.7084 22Z',
  d4: 'M1.75 12C1.75 5.92487 6.67487 1 12.75 1C18.8251 1 23.75 5.92487 23.75 12C23.75 18.0751 18.8251 23 12.75 23C6.67487 23 1.75 18.0751 1.75 12ZM5.79816 6.60379C4.63979 8.09394 3.95 9.96642 3.95 12C3.95 16.8601 7.88989 20.8 12.75 20.8C14.7836 20.8 16.6561 20.1102 18.1462 18.9518L5.79816 6.60379ZM7.35379 5.04816L19.7018 17.3962C20.8602 15.9061 21.55 14.0336 21.55 12C21.55 7.13989 17.6101 3.2 12.75 3.2C10.7164 3.2 8.84394 3.88979 7.35379 5.04816Z',
  d5: 'M23.7499 12C23.7499 5.92487 18.825 1 12.7499 1C9.31617 1 6.25082 2.57332 4.23358 5.03839L19.7115 20.5172C22.1766 18.5 23.7499 15.4337 23.7499 12ZM19.7012 17.3962L7.35311 5.04816C8.84327 3.88979 10.7157 3.2 12.7493 3.2C17.6094 3.2 21.5493 7.13989 21.5493 12C21.5493 14.0336 20.8595 15.9061 19.7012 17.3962Z',
  d6: 'M6.08331 5.33331L19.4166 18.6666',
  d7: 'M18.7095 19.3738L5.37616 6.04042L6.79037 4.62621L20.1237 17.9595L18.7095 19.3738Z',
  d8: 'M12.75 21C7.77944 21 3.75 16.9706 3.75 12C3.75 7.02944 7.77944 3 12.75 3C17.7206 3 21.75 7.02944 21.75 12C21.75 16.9706 17.7206 21 12.75 21ZM1.75 12C1.75 18.0751 6.67487 23 12.75 23C18.8251 23 23.75 18.0751 23.75 12C23.75 5.92487 18.8251 1 12.75 1C6.67487 1 1.75 5.92487 1.75 12Z',
};

export const IconUnavailableStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="unavailable-stroke-rounded IconUnavailableStrokeRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconUnavailableDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="unavailable-duotone-rounded IconUnavailableDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
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
      />
    </TheIconWrapper>
  );
};

export const IconUnavailableTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="unavailable-twotone-rounded IconUnavailableTwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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
      />
    </TheIconWrapper>
  );
};

export const IconUnavailableSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="unavailable-solid-rounded IconUnavailableSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconUnavailableBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="unavailable-bulk-rounded IconUnavailableBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconUnavailableStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="unavailable-stroke-sharp IconUnavailableStrokeSharp"
    >
      <path 
        d={d.d6} 
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
    </TheIconWrapper>
  );
};

export const IconUnavailableSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="unavailable-solid-sharp IconUnavailableSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfUnavailable: TheIconSelfPack = {
  name: 'Unavailable',
  StrokeRounded: IconUnavailableStrokeRounded,
  DuotoneRounded: IconUnavailableDuotoneRounded,
  TwotoneRounded: IconUnavailableTwotoneRounded,
  SolidRounded: IconUnavailableSolidRounded,
  BulkRounded: IconUnavailableBulkRounded,
  StrokeSharp: IconUnavailableStrokeSharp,
  SolidSharp: IconUnavailableSolidSharp,
};