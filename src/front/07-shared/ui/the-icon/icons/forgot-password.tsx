import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M15.395 21.9009C13.9836 21.966 12.5498 22 10.9709 22C9.39194 22 7.95815 21.966 6.5467 21.9009C4.8693 21.8235 3.4909 20.515 3.26684 18.8447C3.12061 17.7547 3 16.6376 3 15.5C3 14.3624 3.1206 13.2453 3.26684 12.1553C3.4909 10.485 4.8693 9.17649 6.5467 9.09909C7.95815 9.03397 9.39194 9 10.9709 9C12.5498 9 13.9836 9.03397 15.395 9.09909C16.4545 9.14798 17.3946 9.68796 18 10.5',
  d2: 'M17 14.978C17 13.8856 17.8954 13 19 13C20.1046 13 21 13.8856 21 14.978C21 15.3718 20.8837 15.7387 20.6831 16.0469C20.0854 16.9656 19 17.8416 19 18.9341V19.4286M19 22H19.012',
  d3: 'M6.5 9V6.5C6.5 4.01472 8.51472 2 11 2C13.4853 2 15.5 4.01472 15.5 6.5V9',
  d4: 'M12 15.49V15.5',
  d5: 'M8 15.49V15.5',
  d6: 'M3.26781 18.8447C3.49269 20.515 4.87613 21.8235 6.55966 21.9009C7.97627 21.966 9.4153 22 11 22C12.5847 22 14.0237 21.966 15.4403 21.9009C17.1239 21.8235 18.5073 20.515 18.7322 18.8447C18.879 17.7547 19 16.6376 19 15.5C19 14.3624 18.879 13.2453 18.7322 12.1553C18.5073 10.485 17.1239 9.17649 15.4403 9.09909C14.0237 9.03397 12.5847 9 11 9C9.4153 9 7.97627 9.03397 6.55966 9.09909C4.87613 9.17649 3.49269 10.485 3.26781 12.1553C3.12105 13.2453 3 14.3624 3 15.5C3 16.6376 3.12105 17.7547 3.26781 18.8447Z',
  d7: 'M18.75 13.75C18.1873 13.75 17.75 14.1983 17.75 14.728C17.75 15.2803 17.3023 15.728 16.75 15.728C16.1977 15.728 15.75 15.2803 15.75 14.728C15.75 13.0729 17.1036 11.75 18.75 11.75C20.3964 11.75 21.75 13.0729 21.75 14.728C21.75 15.3218 21.5739 15.8772 21.2713 16.3423C21.0902 16.6207 20.8803 16.8837 20.6937 17.1131C20.6587 17.156 20.6247 17.1977 20.5914 17.2384C20.437 17.4275 20.2999 17.5953 20.1729 17.7679C19.8566 18.1979 19.75 18.4707 19.75 18.6841C19.75 19.2364 19.3023 19.6841 18.75 19.6841C18.1977 19.6841 17.75 19.2364 17.75 18.6841C17.75 17.805 18.1861 17.0935 18.5619 16.5827C18.7219 16.3652 18.8976 16.1504 19.0527 15.9606C19.0835 15.923 19.1134 15.8864 19.1423 15.8509C19.3273 15.6235 19.4772 15.4325 19.5949 15.2516C19.6934 15.1002 19.75 14.9218 19.75 14.728C19.75 14.1983 19.3127 13.75 18.75 13.75ZM17.75 21.75C17.75 21.1977 18.1977 20.75 18.75 20.75H18.762C19.3143 20.75 19.762 21.1977 19.762 21.75C19.762 22.3023 19.3143 22.75 18.762 22.75H18.75C18.1977 22.75 17.75 22.3023 17.75 21.75Z',
  d8: 'M11 8.25C9.40416 8.25 7.95364 8.28422 6.52522 8.34988C4.46716 8.4445 2.79609 10.0382 2.52452 12.0552C2.37636 13.1556 2.25 14.3118 2.25 15.5C2.25 16.6882 2.37636 17.8444 2.52452 18.9448C2.79609 20.9618 4.46716 22.5555 6.52522 22.6501C7.95364 22.7158 9.40416 22.75 11 22.75C12.5958 22.75 14.0464 22.7158 15.4748 22.6501C15.8688 22.632 16.2487 22.5589 16.6073 22.4385C16.5376 22.2215 16.5 21.9901 16.5 21.75C16.5 21.1577 16.7289 20.6188 17.103 20.217C16.7289 19.8152 16.5 19.2764 16.5 18.6841C16.5 18.0305 16.6635 17.4557 16.8787 16.9744C15.5096 16.9744 14.5 15.9707 14.5 14.728C14.5 12.3683 16.4276 10.5 18.75 10.5C18.8178 10.5 18.8852 10.5016 18.9522 10.5047C18.2522 9.27279 16.9649 8.41839 15.4748 8.34989C14.0464 8.28422 12.5958 8.25 11 8.25ZM12 14.4902C12.5523 14.4902 13 14.9379 13 15.4902V15.5002C13 16.0525 12.5523 16.5002 12 16.5002C11.4477 16.5002 11 16.0525 11 15.5002V15.4902C11 14.9379 11.4477 14.4902 12 14.4902ZM9 15.4902C9 14.9379 8.55228 14.4902 8 14.4902C7.44772 14.4902 7 14.9379 7 15.4902V15.5002C7 16.0525 7.44772 16.5002 8 16.5002C8.55228 16.5002 9 16.0525 9 15.5002V15.4902Z',
  d9: 'M11 3.25C9.067 3.25 7.5 4.817 7.5 6.75V9.25C7.5 9.80228 7.05228 10.25 6.5 10.25C5.94772 10.25 5.5 9.80228 5.5 9.25V6.75C5.5 3.71243 7.96243 1.25 11 1.25C14.0376 1.25 16.5 3.71243 16.5 6.75V9.25C16.5 9.80228 16.0523 10.25 15.5 10.25C14.9477 10.25 14.5 9.80228 14.5 9.25V6.75C14.5 4.817 12.933 3.25 11 3.25Z',
  d10: 'M11 8.25C9.40416 8.25 7.95364 8.28422 6.52522 8.34988C4.46716 8.4445 2.79609 10.0382 2.52452 12.0552C2.37636 13.1556 2.25 14.3118 2.25 15.5C2.25 16.6882 2.37636 17.8444 2.52452 18.9448C2.79609 20.9618 4.46716 22.5555 6.52522 22.6501C7.95364 22.7158 9.40416 22.75 11 22.75C12.5958 22.75 14.0464 22.7158 15.4748 22.6501C15.8688 22.632 16.2487 22.5589 16.6073 22.4385C16.5376 22.2215 16.5 21.9901 16.5 21.75C16.5 21.1577 16.7289 20.6188 17.103 20.217C16.7289 19.8152 16.5 19.2764 16.5 18.6841C16.5 18.0305 16.6635 17.4557 16.8787 16.9744C15.5096 16.9744 14.5 15.9707 14.5 14.728C14.5 12.3683 16.4276 10.5 18.75 10.5C18.8178 10.5 18.8852 10.5016 18.9522 10.5047C18.2522 9.27279 16.9649 8.41839 15.4748 8.34989C14.0464 8.28422 12.5958 8.25 11 8.25Z',
  d11: 'M12 14.4902C12.5523 14.4902 13 14.9379 13 15.4902V15.5002C13 16.0525 12.5523 16.5002 12 16.5002C11.4477 16.5002 11 16.0525 11 15.5002V15.4902C11 14.9379 11.4477 14.4902 12 14.4902Z',
  d12: 'M8 14.4902C8.55228 14.4902 9 14.9379 9 15.4902V15.5002C9 16.0525 8.55228 16.5002 8 16.5002C7.44772 16.5002 7 16.0525 7 15.5002V15.4902C7 14.9379 7.44772 14.4902 8 14.4902Z',
  d13: 'M7.5 6.75C7.5 4.817 9.067 3.25 11 3.25C12.933 3.25 14.5 4.817 14.5 6.75V8.31016C14.827 8.32177 15.1515 8.33502 15.4748 8.34988C15.8298 8.3662 16.1732 8.42712 16.5 8.52712V6.75C16.5 3.71243 14.0376 1.25 11 1.25C7.96243 1.25 5.5 3.71243 5.5 6.75V8.52712C5.82676 8.42712 6.17023 8.3662 6.52522 8.34988C6.84854 8.33502 7.17299 8.32177 7.5 8.31016V6.75Z',
  d14: 'M19 10V9H3V22H15',
  d15: 'M18.75 13.75C18.1873 13.75 17.75 14.1983 17.75 14.728V15.728H15.75V14.728C15.75 13.0729 17.1036 11.75 18.75 11.75C20.3964 11.75 21.75 13.0729 21.75 14.728C21.75 15.3218 21.5739 15.8772 21.2713 16.3423C21.0902 16.6207 20.8803 16.8837 20.6937 17.1131C20.6587 17.156 20.6247 17.1977 20.5914 17.2384C20.437 17.4275 20.2999 17.5953 20.1729 17.7679C19.8566 18.1979 19.75 18.4707 19.75 18.6841V19.6841H17.75V18.6841C17.75 17.805 18.1861 17.0935 18.5619 16.5827C18.7219 16.3652 18.8976 16.1504 19.0527 15.9606C19.0835 15.923 19.1134 15.8864 19.1423 15.8509C19.3273 15.6235 19.4772 15.4325 19.5949 15.2516C19.6934 15.1002 19.75 14.9218 19.75 14.728C19.75 14.1983 19.3127 13.75 18.75 13.75ZM17.75 20.75H19.762V22.75H17.75V20.75Z',
  d16: 'M2.25 8.25L19.75 8.25V10.6182C19.4286 10.5409 19.0936 10.5 18.75 10.5C16.4276 10.5 14.5 12.3683 14.5 14.728V16.978H16.8771C16.6627 17.4586 16.5 18.0321 16.5 18.6841L16.5 22.75L2.25 22.75L2.25 8.25ZM13 14.4902V16.5002H11V14.4902L13 14.4902ZM9 16.5002V14.4902L7 14.4902V16.5002H9Z',
  d17: 'M11 3.25C9.067 3.25 7.5 4.817 7.5 6.75V9.25H5.5V6.75C5.5 3.71243 7.96243 1.25 11 1.25C14.0376 1.25 16.5 3.71243 16.5 6.75V9.25H14.5V6.75C14.5 4.817 12.933 3.25 11 3.25Z',
};

export const IconForgotPasswordStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="forgot-password-stroke-rounded IconForgotPasswordStrokeRounded"
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
        strokeLinejoin="round" 
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
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconForgotPasswordDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="forgot-password-duotone-rounded IconForgotPasswordDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
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
        strokeLinejoin="round" 
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
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconForgotPasswordTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="forgot-password-twotone-rounded IconForgotPasswordTwotoneRounded"
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconForgotPasswordSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="forgot-password-solid-rounded IconForgotPasswordSolidRounded"
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconForgotPasswordBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="forgot-password-bulk-rounded IconForgotPasswordBulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconForgotPasswordStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="forgot-password-stroke-sharp IconForgotPasswordStrokeSharp"
    >
      <path 
        d={d.d2} 
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
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d14} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
    </TheIconWrapper>
  );
};

export const IconForgotPasswordSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="forgot-password-solid-sharp IconForgotPasswordSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfForgotPassword: TheIconSelfPack = {
  name: 'ForgotPassword',
  StrokeRounded: IconForgotPasswordStrokeRounded,
  DuotoneRounded: IconForgotPasswordDuotoneRounded,
  TwotoneRounded: IconForgotPasswordTwotoneRounded,
  SolidRounded: IconForgotPasswordSolidRounded,
  BulkRounded: IconForgotPasswordBulkRounded,
  StrokeSharp: IconForgotPasswordStrokeSharp,
  SolidSharp: IconForgotPasswordSolidSharp,
};