import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3.48516 5C6.49647 5 8.54693 2 12 2C15.4531 2 17.5034 5 20.5147 5C22.5224 15.0005 18.0295 20.583 11.9999 22C5.97037 20.583 1.47749 15.0005 3.48516 5Z',
  d2: 'M10.5582 14.5613C9.96836 15.1511 9.02509 15.1432 8.4425 14.5607C7.85991 13.9781 7.84704 13.0298 8.43687 12.44C9.02671 11.8502 9.98123 11.8567 10.5638 12.4393C11.1464 13.0219 11.148 13.9715 10.5582 14.5613Z',
  d3: 'M11 12L13 10M17 10L15 8L13 10M13 10L14.5 11.5',
  d4: 'M7.44157 3.57694C6.1694 4.30044 4.93931 5 3.48516 5C1.47749 15.0005 5.97037 20.583 11.9999 22C18.0295 20.583 22.5224 15.0005 20.5147 5C19.0606 5 17.8305 4.30044 16.5584 3.57694C15.1961 2.80219 13.7856 2 12 2C10.2144 2 8.80386 2.80219 7.44157 3.57694ZM8.4425 14.5607C9.02509 15.1432 9.96836 15.1511 10.5582 14.5613C11.148 13.9715 11.1464 13.0219 10.5638 12.4393C9.98123 11.8567 9.02671 11.8502 8.43687 12.44C7.84704 13.0298 7.85991 13.9781 8.4425 14.5607Z',
  d5: 'M15 8L15.5303 7.46967C15.2374 7.17678 14.7626 7.17678 14.4697 7.46967L15 8ZM16.4697 10.5303C16.7626 10.8232 17.2374 10.8232 17.5303 10.5303C17.8232 10.2374 17.8232 9.76256 17.5303 9.46967L16.4697 10.5303ZM10.4697 11.4697C10.1768 11.7626 10.1768 12.2374 10.4697 12.5303C10.7626 12.8232 11.2374 12.8232 11.5303 12.5303L10.4697 11.4697ZM13.9697 12.0303C14.2626 12.3232 14.7374 12.3232 15.0303 12.0303C15.3232 11.7374 15.3232 11.2626 15.0303 10.9697L13.9697 12.0303ZM10.0279 14.031C9.73372 14.3251 9.26533 14.3228 8.97283 14.0303L7.91217 15.091C8.78484 15.9637 10.203 15.9772 11.0885 15.0916L10.0279 14.031ZM8.97283 14.0303C8.67709 13.7346 8.67627 13.2613 8.9672 12.9703L7.90654 11.9097C7.01781 12.7984 7.04273 14.2215 7.91217 15.091L8.97283 14.0303ZM8.9672 12.9703C9.26222 12.6753 9.74187 12.678 10.0335 12.9697L11.0941 11.909C10.2206 11.0354 8.79119 11.025 7.90654 11.9097L8.9672 12.9703ZM10.0335 12.9697C10.3219 13.2581 10.3261 13.7327 10.0279 14.031L11.0885 15.0916C11.9699 14.2102 11.9709 12.7858 11.0941 11.909L10.0335 12.9697ZM14.4697 8.53033L16.4697 10.5303L17.5303 9.46967L15.5303 7.46967L14.4697 8.53033ZM11.5303 12.5303L13.5303 10.5303L12.4697 9.46967L10.4697 11.4697L11.5303 12.5303ZM13.5303 10.5303L15.5303 8.53033L14.4697 7.46967L12.4697 9.46967L13.5303 10.5303ZM12.4697 10.5303L13.9697 12.0303L15.0303 10.9697L13.5303 9.46967L12.4697 10.5303Z',
  d6: 'M12 1.25C10.0526 1.25 8.51842 2.10282 7.20655 2.84783C5.8669 3.60875 4.73793 4.25 3.48516 4.25C3.12786 4.25 2.82016 4.50206 2.74984 4.85238C1.71979 9.9832 2.34002 14.0747 4.07869 17.0932C5.81978 20.1158 8.63583 21.9798 11.8284 22.7301C11.9412 22.7566 12.0587 22.7566 12.1715 22.7301C15.3641 21.9798 18.1801 20.1158 19.9212 17.0932C21.6599 14.0747 22.2801 9.9832 21.2501 4.85238C21.1797 4.50206 20.872 4.25 20.5147 4.25C19.262 4.25 18.133 3.60875 16.7934 2.84783C15.4816 2.10282 13.9474 1.25 12 1.25ZM15.5305 7.46967C15.2376 7.17678 14.7627 7.17678 14.4698 7.46967L10.4709 11.4685C9.63642 11.0716 8.60286 11.2135 7.90667 11.9097C7.01794 12.7984 7.04286 14.2215 7.9123 15.091C8.78498 15.9637 10.2031 15.9772 11.0887 15.0916C11.7837 14.3965 11.9313 13.3638 11.5326 12.5282L13.0001 11.0607L13.9698 12.0303C14.2627 12.3232 14.7376 12.3232 15.0305 12.0303C15.3234 11.7374 15.3234 11.2626 15.0305 10.9697L14.0608 10L15.0001 9.06066L16.4698 10.5303C16.7627 10.8232 17.2376 10.8232 17.5305 10.5303C17.8234 10.2374 17.8234 9.76256 17.5305 9.46967L15.5305 7.46967ZM8.96733 12.9703C9.26235 12.6753 9.742 12.678 10.0336 12.9697C10.322 13.2581 10.3262 13.7327 10.028 14.031C9.73385 14.3251 9.26546 14.3228 8.97296 14.0303C8.67722 13.7346 8.6764 13.2613 8.96733 12.9703Z',
  d7: 'M7.20655 2.84783C8.51842 2.10282 10.0526 1.25 12 1.25C13.9474 1.25 15.4816 2.10282 16.7934 2.84783C18.133 3.60875 19.262 4.25 20.5147 4.25C20.872 4.25 21.1797 4.50206 21.2501 4.85238C22.2801 9.9832 21.6599 14.0747 19.9212 17.0932C18.1801 20.1158 15.3641 21.9798 12.1715 22.7301C12.0587 22.7566 11.9412 22.7566 11.8284 22.7301C8.63583 21.9798 5.81978 20.1158 4.07869 17.0932C2.34002 14.0747 1.71979 9.9832 2.74984 4.85238C2.82016 4.50206 3.12786 4.25 3.48516 4.25C4.73793 4.25 5.8669 3.60875 7.20655 2.84783Z',
  d8: 'M14.4698 7.46967C14.7627 7.17678 15.2376 7.17678 15.5305 7.46967L17.5305 9.46967C17.8234 9.76256 17.8234 10.2374 17.5305 10.5303C17.2376 10.8232 16.7627 10.8232 16.4698 10.5303L15.0001 9.06066L14.0608 10L15.0305 10.9697C15.3234 11.2626 15.3234 11.7374 15.0305 12.0303C14.7376 12.3232 14.2627 12.3232 13.9698 12.0303L13.0001 11.0607L11.5326 12.5282C11.9313 13.3638 11.7837 14.3965 11.0887 15.0916C10.2031 15.9772 8.78498 15.9637 7.9123 15.091C7.04286 14.2215 7.01794 12.7984 7.90667 11.9097C8.60286 11.2135 9.63642 11.0716 10.4709 11.4685L14.4698 7.46967ZM10.0336 12.9697C9.742 12.678 9.26235 12.6753 8.96733 12.9703C8.6764 13.2613 8.67722 13.7346 8.97296 14.0303C9.26546 14.3228 9.73385 14.3251 10.028 14.031C10.3262 13.7327 10.322 13.2581 10.0336 12.9697Z',
  d9: 'M3.43067 4.93449C6.56932 5.16032 8.59312 2.00109 12.0266 2.00109C15.4086 1.93401 17.0635 4.97669 20.5307 4.97669C22.3893 14.3837 18.5226 20.2928 12.0549 22C6.0595 20.583 1.5547 14.6133 3.43067 4.93449Z',
  d10: 'M17 10L15 8L13 10M11 12L13 10M13 10L14.5 11.5M10.5582 14.5613C9.96836 15.1511 9.02509 15.1432 8.4425 14.5607C7.85991 13.9781 7.84704 13.0298 8.43687 12.44C9.02671 11.8502 9.98123 11.8567 10.5638 12.4393C11.1464 13.0219 11.148 13.9715 10.5582 14.5613Z',
  d11: 'M20.5307 4.22349C19.0288 4.22349 17.8683 3.55021 16.5834 2.78979C15.3424 2.05523 13.9239 1.2156 12.0192 1.25109C10.1165 1.25333 8.60972 2.11746 7.3259 2.8537C5.96702 3.63247 4.79066 4.27715 3.48452 4.18327L2.82098 4.13558L2.6944 4.78798C1.72956 9.76059 2.39233 13.858 4.13944 16.92C5.88776 19.9842 8.87303 21.9964 12.0649 22.75C15.4785 21.8499 18.4245 19.7791 20.0756 16.7146C21.7214 13.66 22.22 9.64836 21.2665 4.82747L21.147 4.22349H20.5307ZM18.0608 10.0001L15.0001 6.93945L10.4709 11.4686C9.63642 11.0717 8.60286 11.2136 7.90667 11.9098C7.01794 12.7985 7.04286 14.2217 7.9123 15.0911C8.78498 15.9638 10.2031 15.9773 11.0887 15.0918C11.7837 14.3967 11.9313 13.3639 11.5326 12.5283L13.0001 11.0608L14.5001 12.5608L15.5608 11.5001L14.0608 10.0001L15.0001 9.06077L17.0001 11.0608L18.0608 10.0001ZM8.96733 12.9704C9.26235 12.6754 9.742 12.6782 10.0336 12.9698C10.322 13.2582 10.3262 13.7328 10.028 14.0311C9.73385 14.3252 9.26546 14.3229 8.97296 14.0304C8.67722 13.7347 8.6764 13.2614 8.96733 12.9704Z',
};

export const IconShieldKeyStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="shield-key-stroke-rounded IconShieldKeyStrokeRounded"
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

export const IconShieldKeyDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="shield-key-duotone-rounded IconShieldKeyDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconShieldKeyTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="shield-key-twotone-rounded IconShieldKeyTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconShieldKeySolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="shield-key-solid-rounded IconShieldKeySolidRounded"
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

export const IconShieldKeyBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="shield-key-bulk-rounded IconShieldKeyBulkRounded"
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
    </TheIconWrapper>
  );
};

export const IconShieldKeyStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="shield-key-stroke-sharp IconShieldKeyStrokeSharp"
    >
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
    </TheIconWrapper>
  );
};

export const IconShieldKeySolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="shield-key-solid-sharp IconShieldKeySolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfShieldKey: TheIconSelfPack = {
  name: 'ShieldKey',
  StrokeRounded: IconShieldKeyStrokeRounded,
  DuotoneRounded: IconShieldKeyDuotoneRounded,
  TwotoneRounded: IconShieldKeyTwotoneRounded,
  SolidRounded: IconShieldKeySolidRounded,
  BulkRounded: IconShieldKeyBulkRounded,
  StrokeSharp: IconShieldKeyStrokeSharp,
  SolidSharp: IconShieldKeySolidSharp,
};