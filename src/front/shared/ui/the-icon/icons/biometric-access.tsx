import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M4.26781 18.8447C4.49269 20.515 5.87613 21.8235 7.55966 21.9009C8.97627 21.966 10.4153 22 12 22C13.5847 22 15.0237 21.966 16.4403 21.9009C18.1239 21.8235 19.5073 20.515 19.7322 18.8447C19.879 17.7547 20 16.6376 20 15.5C20 14.3624 19.879 13.2453 19.7322 12.1553C19.5073 10.485 18.1239 9.17649 16.4403 9.09909C15.0237 9.03397 13.5847 9 12 9C10.4153 9 8.97627 9.03397 7.55966 9.09909C5.87613 9.17649 4.49269 10.485 4.26781 12.1553C4.12105 13.2453 4 14.3624 4 15.5C4 16.6376 4.12105 17.7547 4.26781 18.8447Z',
  d2: 'M7.5 9V6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5V9',
  d3: 'M8 17.5V16C8 13.7909 9.79086 12 12 12C14.2091 12 16 13.7909 16 16V17.5',
  d4: 'M10.5 19V16C10.5 15.1716 11.1716 14.5 12 14.5C12.8284 14.5 13.5 15.1716 13.5 16M13.5 19V18',
  d5: 'M12 2.75C9.92893 2.75 8.25 4.42893 8.25 6.5V9C8.25 9.41421 7.91421 9.75 7.5 9.75C7.08579 9.75 6.75 9.41421 6.75 9V6.5C6.75 3.6005 9.1005 1.25 12 1.25C14.8995 1.25 17.25 3.6005 17.25 6.5V9C17.25 9.41421 16.9142 9.75 16.5 9.75C16.0858 9.75 15.75 9.41421 15.75 9V6.5C15.75 4.42893 14.0711 2.75 12 2.75Z',
  d6: 'M7.52522 8.34988C8.95364 8.28422 10.4042 8.25 12 8.25C13.5958 8.25 15.0464 8.28422 16.4748 8.34989C18.5328 8.4445 20.2039 10.0382 20.4755 12.0552C20.6236 13.1556 20.75 14.3118 20.75 15.5C20.75 16.6882 20.6236 17.8444 20.4755 18.9448C20.2039 20.9618 18.5328 22.5555 16.4748 22.6501C15.0464 22.7158 13.5958 22.75 12 22.75C10.4042 22.75 8.95364 22.7158 7.52522 22.6501C5.46716 22.5555 3.79609 20.9618 3.52452 18.9448C3.37636 17.8444 3.25 16.6882 3.25 15.5C3.25 14.3118 3.37636 13.1556 3.52452 12.0552C3.79609 10.0382 5.46716 8.4445 7.52522 8.34988ZM12 12.75C10.2051 12.75 8.75 14.2051 8.75 16L8.75 17.5C8.75 17.9142 8.41421 18.25 8 18.25C7.58579 18.25 7.25 17.9142 7.25 17.5L7.25 16C7.25 13.3766 9.37665 11.25 12 11.25C14.6234 11.25 16.75 13.3766 16.75 16V17.5C16.75 17.9142 16.4142 18.25 16 18.25C15.5858 18.25 15.25 17.9142 15.25 17.5V16C15.25 14.2051 13.7949 12.75 12 12.75ZM11.25 16C11.25 15.5858 11.5858 15.25 12 15.25C12.4142 15.25 12.75 15.5858 12.75 16C12.75 16.4142 13.0858 16.75 13.5 16.75C13.9142 16.75 14.25 16.4142 14.25 16C14.25 14.7574 13.2426 13.75 12 13.75C10.7574 13.75 9.75 14.7574 9.75 16L9.75 19C9.75 19.4142 10.0858 19.75 10.5 19.75C10.9142 19.75 11.25 19.4142 11.25 19V16ZM14.25 18C14.25 17.5858 13.9142 17.25 13.5 17.25C13.0858 17.25 12.75 17.5858 12.75 18V19C12.75 19.4142 13.0858 19.75 13.5 19.75C13.9142 19.75 14.25 19.4142 14.25 19V18Z',
  d7: 'M7.52522 8.34988C8.95364 8.28422 10.4042 8.25 12 8.25C13.5958 8.25 15.0464 8.28422 16.4748 8.34989C18.5328 8.4445 20.2039 10.0382 20.4755 12.0552C20.6236 13.1556 20.75 14.3118 20.75 15.5C20.75 16.6882 20.6236 17.8444 20.4755 18.9448C20.2039 20.9618 18.5328 22.5555 16.4748 22.6501C15.0464 22.7158 13.5958 22.75 12 22.75C10.4042 22.75 8.95364 22.7158 7.52522 22.6501C5.46716 22.5555 3.79609 20.9618 3.52452 18.9448C3.37636 17.8444 3.25 16.6882 3.25 15.5C3.25 14.3118 3.37636 13.1556 3.52452 12.0552C3.79609 10.0382 5.46716 8.4445 7.52522 8.34988Z',
  d8: 'M12 12.75C10.2051 12.75 8.75 14.2051 8.75 16V17.5C8.75 17.9142 8.41421 18.25 8 18.25C7.58579 18.25 7.25 17.9142 7.25 17.5V16C7.25 13.3766 9.37665 11.25 12 11.25C14.6234 11.25 16.75 13.3766 16.75 16V17.5C16.75 17.9142 16.4142 18.25 16 18.25C15.5858 18.25 15.25 17.9142 15.25 17.5V16C15.25 14.2051 13.7949 12.75 12 12.75Z',
  d9: 'M12 15.25C11.5858 15.25 11.25 15.5858 11.25 16V19C11.25 19.4142 10.9142 19.75 10.5 19.75C10.0858 19.75 9.75 19.4142 9.75 19V16C9.75 14.7574 10.7574 13.75 12 13.75C13.2426 13.75 14.25 14.7574 14.25 16C14.25 16.4142 13.9142 16.75 13.5 16.75C13.0858 16.75 12.75 16.4142 12.75 16C12.75 15.5858 12.4142 15.25 12 15.25ZM13.5 17.25C13.9142 17.25 14.25 17.5858 14.25 18V19C14.25 19.4142 13.9142 19.75 13.5 19.75C13.0858 19.75 12.75 19.4142 12.75 19V18C12.75 17.5858 13.0858 17.25 13.5 17.25Z',
  d10: 'M8.25 6.5C8.25 4.42893 9.92893 2.75 12 2.75C14.0711 2.75 15.75 4.42893 15.75 6.5V8.31937C15.9926 8.32864 16.234 8.33882 16.4748 8.34988C16.7404 8.36209 16.9995 8.39926 17.25 8.45909V6.5C17.25 3.6005 14.8995 1.25 12 1.25C9.1005 1.25 6.75 3.6005 6.75 6.5V8.45909C7.00051 8.39926 7.25964 8.36209 7.52522 8.34988C7.76599 8.33882 8.00738 8.32864 8.25 8.31937V6.5Z',
  d11: 'M20 9H4L4.0012 22H20V9Z',
  d12: 'M16.4999 8.99805V6.49805C16.4999 4.01277 14.4852 1.99805 11.9999 1.99805C9.51466 1.99805 7.49994 4.01277 7.49994 6.49805V8.99805',
  d13: 'M10.5 19V16C10.5 15.1716 11.1716 14.5 12 14.5C12.8284 14.5 13.5 15.1716 13.5 16M13.5 19V18.5',
  d14: 'M11.9999 2.74805C9.92881 2.74805 8.24988 4.42698 8.24988 6.49805V9.74805H6.74988V6.49805C6.74988 3.59855 9.10038 1.24805 11.9999 1.24805C14.8994 1.24805 17.2499 3.59855 17.2499 6.49805V9.74805H15.7499V6.49805C15.7499 4.42698 14.0709 2.74805 11.9999 2.74805Z',
  d15: 'M3.24988 8.25L20.7499 8.25L20.7499 22.75L3.25122 22.75L3.24988 8.25ZM11.9999 12.75C10.205 12.75 8.74988 14.2051 8.74988 16L8.74988 18.25H7.24988L7.24988 16C7.24988 13.3766 9.37653 11.25 11.9999 11.25C14.6232 11.25 16.7499 13.3766 16.7499 16V18.25H15.2499V16C15.2499 14.2051 13.7948 12.75 11.9999 12.75ZM11.2499 16C11.2499 15.5858 11.5857 15.25 11.9999 15.25C12.4141 15.25 12.7499 15.5858 12.7499 16V16.75L14.2499 16.75V16C14.2499 14.7574 13.2425 13.75 11.9999 13.75C10.7572 13.75 9.74988 14.7574 9.74988 16L9.74988 19.75H11.2499L11.2499 16ZM14.2499 19.75L14.2499 17.75L12.7499 17.75L12.7499 19.75L14.2499 19.75Z',
};

export const IconBiometricAccessStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="biometric-access-stroke-rounded IconBiometricAccessStrokeRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconBiometricAccessDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="biometric-access-duotone-rounded IconBiometricAccessDuotoneRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconBiometricAccessTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="biometric-access-twotone-rounded IconBiometricAccessTwotoneRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconBiometricAccessSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="biometric-access-solid-rounded IconBiometricAccessSolidRounded"
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

export const IconBiometricAccessBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="biometric-access-bulk-rounded IconBiometricAccessBulkRounded"
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

export const IconBiometricAccessStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="biometric-access-stroke-sharp IconBiometricAccessStrokeSharp"
    >
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
    </TheIconWrapper>
  );
};

export const IconBiometricAccessSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="biometric-access-solid-sharp IconBiometricAccessSolidSharp"
    >
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

export const iconPackOfBiometricAccess: TheIconSelfPack = {
  name: 'BiometricAccess',
  StrokeRounded: IconBiometricAccessStrokeRounded,
  DuotoneRounded: IconBiometricAccessDuotoneRounded,
  TwotoneRounded: IconBiometricAccessTwotoneRounded,
  SolidRounded: IconBiometricAccessSolidRounded,
  BulkRounded: IconBiometricAccessBulkRounded,
  StrokeSharp: IconBiometricAccessStrokeSharp,
  SolidSharp: IconBiometricAccessSolidSharp,
};