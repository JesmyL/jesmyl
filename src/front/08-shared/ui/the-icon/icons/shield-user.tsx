import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3.48516 5C6.49647 5 8.54693 2 12 2C15.4531 2 17.5034 5 20.5147 5C22.5224 15.0005 18.0295 20.583 11.9999 22C5.97037 20.583 1.47749 15.0005 3.48516 5Z',
  d2: 'M14 8.5C14 9.60453 13.1046 10.5 12 10.5C10.8954 10.5 10 9.60453 10 8.5C10 7.39543 10.8954 6.5 12 6.5C13.1046 6.5 14 7.39543 14 8.5Z',
  d3: 'M9.59003 13.6482L9.21078 13.0012L9.59003 13.6482ZM14.41 13.6482L14.7892 13.0012L14.7892 13.0012L14.41 13.6482ZM8.31674 15.711L7.80369 16.2581H7.80369L8.31674 15.711ZM15.6833 15.711L15.1702 15.1639V15.1639L15.6833 15.711ZM9.96929 14.2952C11.2096 13.5683 12.7904 13.5683 14.0307 14.2952L14.7892 13.0012C13.0805 11.9996 10.9195 11.9996 9.21078 13.0012L9.96929 14.2952ZM10.0404 17.25H13.9596V15.75H10.0404V17.25ZM8.82979 15.1639C8.69301 15.0357 8.75965 15.0307 8.74907 15.126C8.74383 15.1732 8.72905 15.1323 8.86143 15.0048C9.14155 14.7349 9.57346 14.5272 9.96929 14.2952L9.21078 13.0012C8.97782 13.1377 8.27102 13.4906 7.82065 13.9246C7.58779 14.1489 7.30982 14.4958 7.25823 14.9605C7.20129 15.4733 7.4384 15.9155 7.80369 16.2581L8.82979 15.1639ZM14.0307 14.2952C14.4265 14.5272 14.8585 14.7349 15.1386 15.0048C15.2709 15.1323 15.2562 15.1732 15.2509 15.126C15.2403 15.0307 15.307 15.0357 15.1702 15.1639L16.1963 16.2581C16.5616 15.9155 16.7987 15.4733 16.7418 14.9605C16.6902 14.4958 16.4122 14.1489 16.1793 13.9246C15.729 13.4906 15.0222 13.1377 14.7892 13.0012L14.0307 14.2952ZM15.1702 15.1639C14.7488 15.5592 14.3778 15.75 13.9596 15.75V17.25C14.9151 17.25 15.6367 16.7828 16.1963 16.2581L15.1702 15.1639ZM7.80369 16.2581C8.36326 16.7828 9.08488 17.25 10.0404 17.25V15.75C9.62222 15.75 9.25123 15.5592 8.82979 15.1639L7.80369 16.2581Z',
  d4: 'M3.48516 5C4.93931 5 6.1694 4.30044 7.44157 3.57694C8.80386 2.80219 10.2144 2 12 2C13.7856 2 15.1961 2.80219 16.5584 3.57694C17.8305 4.30044 19.0606 5 20.5147 5C22.5224 15.0005 18.0295 20.583 11.9999 22C5.97037 20.583 1.47749 15.0005 3.48516 5ZM14 8.5C14 9.60453 13.1046 10.5 12 10.5C10.8954 10.5 10 9.60453 10 8.5C10 7.39543 10.8954 6.5 12 6.5C13.1046 6.5 14 7.39543 14 8.5ZM9.37577 13.7694C9.45487 13.7253 9.5275 13.6848 9.59003 13.6482C11.0645 12.7839 12.9355 12.7839 14.41 13.6482C14.4725 13.6848 14.5451 13.7253 14.6242 13.7694C15.3405 14.1683 16.5875 14.863 15.6833 15.711C15.1928 16.171 14.6464 16.5 13.9596 16.5H10.0404C9.35355 16.5 8.80725 16.171 8.31674 15.711C7.41247 14.863 8.65955 14.1683 9.37577 13.7694Z',
  d5: 'M7.20655 2.84783C8.51842 2.10282 10.0526 1.25 12 1.25C13.9474 1.25 15.4816 2.10282 16.7934 2.84783C18.133 3.60875 19.262 4.25 20.5147 4.25C20.872 4.25 21.1797 4.50206 21.2501 4.85238C22.2801 9.9832 21.6599 14.0747 19.9212 17.0932C18.1801 20.1158 15.3641 21.9798 12.1715 22.7301C12.0587 22.7566 11.9412 22.7566 11.8284 22.7301C8.63583 21.9798 5.81978 20.1158 4.07869 17.0932C2.34002 14.0747 1.71979 9.9832 2.74984 4.85238C2.82016 4.50206 3.12786 4.25 3.48516 4.25C4.73793 4.25 5.8669 3.60875 7.20655 2.84783ZM14.4982 8.5C14.4982 9.88067 13.3789 11 11.9982 11C10.6175 11 9.49817 9.88067 9.49817 8.5C9.49817 7.11928 10.6175 6 11.9982 6C13.3789 6 14.4982 7.11928 14.4982 8.5ZM14.7895 13.0012C13.0808 11.9996 10.9198 11.9996 9.21109 13.0012C8.90157 13.1723 8.19483 13.5644 7.82097 13.9246C7.58811 14.1489 7.31014 14.4958 7.25855 14.9605C7.20161 15.4733 7.43872 15.9155 7.80401 16.2581C8.36358 16.7828 9.0852 17.25 10.0407 17.25L13.9599 17.25C14.9154 17.25 15.6371 16.7828 16.1966 16.2581C16.5619 15.9155 16.799 15.4733 16.7421 14.9605C16.6905 14.4958 16.4125 14.1489 16.1797 13.9246C15.8058 13.5644 15.0991 13.1723 14.7895 13.0012Z',
  d6: 'M7.20655 2.84783C8.51842 2.10282 10.0526 1.25 12 1.25C13.9474 1.25 15.4816 2.10282 16.7934 2.84783C18.133 3.60875 19.262 4.25 20.5147 4.25C20.872 4.25 21.1797 4.50206 21.2501 4.85238C22.2801 9.9832 21.6599 14.0747 19.9212 17.0932C18.1801 20.1158 15.3641 21.9798 12.1715 22.7301C12.0587 22.7566 11.9412 22.7566 11.8284 22.7301C8.63583 21.9798 5.81978 20.1158 4.07869 17.0932C2.34002 14.0747 1.71979 9.9832 2.74984 4.85238C2.82016 4.50206 3.12786 4.25 3.48516 4.25C4.73793 4.25 5.8669 3.60875 7.20655 2.84783Z',
  d7: 'M14.4982 8.5C14.4982 9.88067 13.3789 11 11.9982 11C10.6175 11 9.49817 9.88067 9.49817 8.5C9.49817 7.11928 10.6175 6 11.9982 6C13.3789 6 14.4982 7.11928 14.4982 8.5Z',
  d8: 'M9.21109 13.0012C10.9198 11.9996 13.0808 11.9996 14.7895 13.0012C15.0991 13.1723 15.8058 13.5644 16.1797 13.9246C16.4125 14.1489 16.6905 14.4958 16.7421 14.9605C16.799 15.4733 16.5619 15.9155 16.1966 16.2581C15.6371 16.7828 14.9154 17.25 13.9599 17.25H10.0407C9.0852 17.25 8.36358 16.7828 7.80401 16.2581C7.43872 15.9155 7.20161 15.4733 7.25855 14.9605C7.31014 14.4958 7.58811 14.1489 7.82097 13.9246C8.19483 13.5644 8.90157 13.1723 9.21109 13.0012Z',
  d9: 'M3.43067 4.93449C6.56932 5.16032 8.59312 2.00109 12.0266 2.00109C15.4086 1.93401 17.0635 4.97669 20.5307 4.97669C22.3893 14.3837 18.5226 20.2928 12.0549 22C6.0595 20.583 1.5547 14.6133 3.43067 4.93449Z',
  d10: 'M14 8C14 9.10453 13.1046 10 12 10C10.8954 10 10 9.10453 10 8C10 6.89543 10.8954 6 12 6C13.1046 6 14 6.89543 14 8Z',
  d11: 'M12 12.5C9.79085 12.5 8 14.067 8 16H16C16 14.067 14.2091 12.5 12 12.5Z',
  d12: 'M16.5833 2.78979C17.8682 3.55021 19.0287 4.22349 20.5306 4.22349H21.1469L21.2664 4.82747C22.2199 9.64836 21.7213 13.66 20.0755 16.7146C18.4244 19.7791 15.4784 21.8499 12.0648 22.75C8.87291 21.9964 5.88764 19.9842 4.13932 16.92C2.39221 13.858 1.72944 9.76059 2.69427 4.78798L2.82086 4.13558L3.48439 4.18327C4.79053 4.27715 5.9669 3.63247 7.32577 2.8537C8.6096 2.11746 10.1164 1.25333 12.0191 1.25109C13.9238 1.2156 15.3423 2.05523 16.5833 2.78979ZM14.5 8C14.5 9.38067 13.3807 10.5 12 10.5C10.6193 10.5 9.5 9.38067 9.5 8C9.5 6.61928 10.6193 5.5 12 5.5C13.3807 5.5 14.5 6.61928 14.5 8ZM12 12C9.47384 12 7.25 13.8118 7.25 16.25V16.75L16.75 16.75V16.25C16.75 13.8118 14.5262 12 12 12Z',
};

export const IconShieldUserStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="shield-user-stroke-rounded IconShieldUserStrokeRounded"
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
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconShieldUserDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="shield-user-duotone-rounded IconShieldUserDuotoneRounded"
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
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconShieldUserTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="shield-user-twotone-rounded IconShieldUserTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconShieldUserSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="shield-user-solid-rounded IconShieldUserSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconShieldUserBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="shield-user-bulk-rounded IconShieldUserBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconShieldUserStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="shield-user-stroke-sharp IconShieldUserStrokeSharp"
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
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconShieldUserSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="shield-user-solid-sharp IconShieldUserSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfShieldUser: TheIconSelfPack = {
  name: 'ShieldUser',
  StrokeRounded: IconShieldUserStrokeRounded,
  DuotoneRounded: IconShieldUserDuotoneRounded,
  TwotoneRounded: IconShieldUserTwotoneRounded,
  SolidRounded: IconShieldUserSolidRounded,
  BulkRounded: IconShieldUserBulkRounded,
  StrokeSharp: IconShieldUserStrokeSharp,
  SolidSharp: IconShieldUserSolidSharp,
};