import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M5.00035 7L3.78154 7.81253C2.90783 8.39501 2.47097 8.68625 2.23422 9.13041C1.99747 9.57457 1.99923 10.0966 2.00273 11.1406C2.00696 12.3975 2.01864 13.6782 2.05099 14.9741C2.12773 18.0487 2.16611 19.586 3.29651 20.7164C4.42691 21.8469 5.98497 21.8858 9.10108 21.9637C11.0397 22.0121 12.9611 22.0121 14.8996 21.9637C18.0158 21.8858 19.5738 21.8469 20.7042 20.7164C21.8346 19.586 21.873 18.0487 21.9497 14.9741C21.9821 13.6782 21.9937 12.3975 21.998 11.1406C22.0015 10.0966 22.0032 9.57456 21.7665 9.13041C21.5297 8.68625 21.0929 8.39501 20.2191 7.81253L19.0003 7',
  d2: 'M2 10L8.91302 14.1478C10.417 15.0502 11.169 15.5014 12 15.5014C12.831 15.5014 13.583 15.0502 15.087 14.1478L22 10',
  d3: 'M5 12V6C5 4.11438 5 3.17157 5.58579 2.58579C6.17157 2 7.11438 2 9 2H15C16.8856 2 17.8284 2 18.4142 2.58579C19 3.17157 19 4.11438 19 6V12',
  d4: 'M10.4375 11.1667L10.4375 5.83333M12 5.83333V4.5M12 12.5V11.1667M10.4375 8.5H13.5625M13.5625 8.5C14.0803 8.5 14.5 8.94772 14.5 9.5V10.1667C14.5 10.719 14.0803 11.1667 13.5625 11.1667H9.5M13.5625 8.5C14.0803 8.5 14.5 8.05228 14.5 7.5V6.83333C14.5 6.28105 14.0803 5.83333 13.5625 5.83333H9.5',
  d5: 'M5 7.00023V12L12 15.5L19 12V7L20.2191 7.81253C21.0929 8.39501 21.5297 8.68625 21.7665 9.13041C22.0032 9.57456 22.0015 10.0966 21.998 11.1406C21.9937 12.3975 21.9821 13.6782 21.9497 14.9741C21.873 18.0487 21.8346 19.586 20.7042 20.7164C19.5738 21.8469 18.0158 21.8858 14.8996 21.9637C12.9611 22.0121 11.0397 22.0121 9.10108 21.9637C5.98497 21.8858 4.42691 21.8469 3.29651 20.7164C2.16611 19.586 2.12773 18.0487 2.05099 14.9741C2.01864 13.6782 2.00696 12.3975 2.00273 11.1406C1.99923 10.0966 1.99747 9.57457 2.23422 9.13041C2.47097 8.68625 2.90783 8.39501 3.78154 7.81253L5 7.00023Z',
  d6: 'M5.62441 6.58405C5.85417 6.9287 5.76104 7.39435 5.4164 7.62412L4.1976 8.43665C3.74928 8.73553 3.45596 8.93199 3.24145 9.10594C3.03912 9.27003 2.9511 9.38007 2.8961 9.48327C2.87412 9.52449 2.85422 9.57047 2.83673 9.62723L9.2993 13.5048C10.0642 13.9637 10.5908 14.2786 11.0284 14.4844C11.4506 14.6829 11.7339 14.7515 12.0004 14.7515C12.2669 14.7515 12.5502 14.6829 12.9724 14.4844C13.41 14.2786 13.9366 13.9637 14.7015 13.5048L21.164 9.62726C21.1465 9.57049 21.1266 9.5245 21.1046 9.48327C21.0496 9.38007 20.9616 9.27003 20.7593 9.10594C20.5448 8.93198 20.2515 8.73553 19.8031 8.43665L18.5843 7.62412C18.2397 7.39435 18.1466 6.9287 18.3763 6.58405C18.6061 6.23941 19.0718 6.14628 19.4164 6.37604L20.6625 7.20679C21.0761 7.48249 21.4286 7.71749 21.7041 7.9409C21.9978 8.17909 22.2466 8.43675 22.4283 8.7777C22.6289 9.15396 22.6999 9.54114 22.7286 9.96088C22.7509 10.286 22.7496 10.6716 22.7481 11.1187L22.748 11.1432C22.7438 12.4028 22.732 13.6895 22.6995 14.9929L22.6981 15.0514C22.661 16.539 22.631 17.7391 22.4607 18.7047C22.282 19.7181 21.9387 20.5427 21.2346 21.2468C20.529 21.9524 19.6977 22.2951 18.6757 22.4737C17.7003 22.644 16.4852 22.6744 14.9766 22.7121L14.9184 22.7135C12.9673 22.7623 11.0335 22.7623 9.08238 22.7135L9.02417 22.7121C7.51556 22.6744 6.30049 22.6441 5.32512 22.4737C4.30305 22.2951 3.47177 21.9524 2.7662 21.2469C2.0621 20.5427 1.71878 19.7181 1.54005 18.7047C1.36975 17.7391 1.33982 16.539 1.30271 15.0514L1.30125 14.9929C1.26871 13.6895 1.257 12.4028 1.25276 11.1432L1.25268 11.1188C1.25117 10.6716 1.24987 10.286 1.27213 9.96084C1.30086 9.54112 1.37185 9.15395 1.5724 8.77771C1.75414 8.43675 2.00292 8.17909 2.29664 7.9409C2.57213 7.71748 2.92463 7.4825 3.33822 7.20679L4.58435 6.37604C4.92899 6.14628 5.39465 6.23941 5.62441 6.58405Z',
  d7: 'M15.052 1.25C15.9505 1.24997 16.6997 1.24995 17.2945 1.32991C17.9223 1.41432 18.4891 1.59999 18.9445 2.05546C19.4 2.51093 19.5857 3.07773 19.6701 3.70552C19.7501 4.3003 19.75 5.04951 19.75 5.94798V5.94801L19.75 12C19.75 12.4142 19.4142 12.75 19 12.75C18.5858 12.75 18.25 12.4142 18.25 12V6C18.25 5.03599 18.2484 4.38843 18.1835 3.90539C18.1214 3.44393 18.0142 3.24644 17.8839 3.11612C17.7536 2.9858 17.5561 2.87858 17.0946 2.81654C16.6116 2.7516 15.964 2.75 15 2.75H9C8.03599 2.75 7.38843 2.7516 6.90539 2.81654C6.44393 2.87858 6.24644 2.9858 6.11612 3.11612C5.9858 3.24644 5.87858 3.44393 5.81654 3.90539C5.7516 4.38843 5.75 5.03599 5.75 6V12C5.75 12.4142 5.41422 12.75 5 12.75C4.58579 12.75 4.25 12.4142 4.25 12L4.25 5.948V5.94797C4.24997 5.0495 4.24995 4.3003 4.32991 3.70552C4.41432 3.07773 4.59999 2.51093 5.05546 2.05546C5.51093 1.59999 6.07773 1.41432 6.70552 1.32991C7.3003 1.24995 8.04951 1.24997 8.94797 1.25H8.948H15.052H15.052Z',
  d8: 'M12 3.75C12.4142 3.75 12.75 4.08579 12.75 4.5V5.08333H13.5625C14.5393 5.08333 15.25 5.91317 15.25 6.83333V7.5C15.25 7.8624 15.1398 8.2108 14.9465 8.5C15.1398 8.7892 15.25 9.1376 15.25 9.5V10.1667C15.25 11.0868 14.5393 11.9167 13.5625 11.9167H12.75V12.5C12.75 12.9142 12.4142 13.25 12 13.25C11.5858 13.25 11.25 12.9142 11.25 12.5V11.9167H9.5C9.08579 11.9167 8.75 11.5809 8.75 11.1667C8.75 10.7525 9.08579 10.4167 9.5 10.4167H9.6875L9.6875 6.58333H9.5C9.08579 6.58333 8.75 6.24755 8.75 5.83333C8.75 5.41912 9.08579 5.08333 9.5 5.08333H11.25V4.5C11.25 4.08579 11.5858 3.75 12 3.75ZM11.1875 6.58333V7.75H13.5625C13.6212 7.75 13.75 7.6844 13.75 7.5V6.83333C13.75 6.64893 13.6212 6.58333 13.5625 6.58333H11.1875ZM13.5625 9.25H11.1875L11.1875 10.4167H13.5625C13.6212 10.4167 13.75 10.3511 13.75 10.1667V9.5C13.75 9.3156 13.6212 9.25 13.5625 9.25Z',
  d9: 'M15.052 1.25H8.948C8.04955 1.24997 7.30029 1.24995 6.70552 1.32992C6.07773 1.41432 5.51093 1.59999 5.05546 2.05546C4.59999 2.51093 4.41432 3.07773 4.32992 3.70552C4.24995 4.30029 4.24997 5.04949 4.25 5.94794L4.25 10.4748L5.75 11.3748V6C5.75 5.03599 5.7516 4.38843 5.81654 3.9054C5.87858 3.44393 5.9858 3.24644 6.11612 3.11612C6.24644 2.9858 6.44393 2.87858 6.9054 2.81654C7.38843 2.7516 8.03599 2.75 9 2.75H15C15.964 2.75 16.6116 2.7516 17.0946 2.81654C17.5561 2.87858 17.7536 2.9858 17.8839 3.11612C18.0142 3.24644 18.1214 3.44393 18.1835 3.9054C18.2484 4.38843 18.25 5.03599 18.25 6V11.3753L19.75 10.4753L19.75 5.94801C19.75 5.04954 19.7501 4.3003 19.6701 3.70552C19.5857 3.07773 19.4 2.51093 18.9445 2.05546C18.4891 1.59999 17.9223 1.41432 17.2945 1.32992C16.6997 1.24995 15.9505 1.24997 15.052 1.25Z',
  d10: 'M2 9.97705L12 15.463L22 9.97705',
  d11: 'M5 11.9718V2H19V11.9718',
  d12: 'M10.4375 11.1411V5.82274M12 5.82274V4.49316M12 12.4706V11.1411M10.4375 8.48189H13.5625M13.5625 8.48189C14.0803 8.48189 14.5 8.92835 14.5 9.47908V10.1439C14.5 10.6946 14.0803 11.1411 13.5625 11.1411H9.5M13.5625 8.48189C14.0803 8.48189 14.5 8.03544 14.5 7.48471V6.81992C14.5 6.2692 14.0803 5.82274 13.5625 5.82274H9.5',
  d13: 'M4.8249 7.16016L2 10.0486V21.9746C2 22.0296 2.16919 21.9746 2.22407 21.9746H21.9006C21.9555 21.9746 22 22.0296 22 21.9746V10.0486L19.2177 7.16016',
  d14: 'M4.46903 6.4707L5.53097 7.53008L3.24035 9.82626L12.0009 14.6458L20.7603 9.8269L18.469 7.53008L19.531 6.4707L22.75 9.69755V22.0004C22.75 22.4146 22.4142 22.7504 22 22.7504H2C1.58579 22.7504 1.25 22.4146 1.25 22.0004V9.69755L4.46903 6.4707Z',
  d15: 'M4.25098 1.25H19.751V11.6499H18.251V2.75H5.75098V11.6509H4.25098V1.25Z',
  d16: 'M12.75 3.75V5.08333H13.5625C14.5393 5.08333 15.25 5.91317 15.25 6.83333V7.5C15.25 7.8624 15.1398 8.2108 14.9465 8.5C15.1398 8.7892 15.25 9.1376 15.25 9.5V10.1667C15.25 11.0868 14.5393 11.9167 13.5625 11.9167H12.75V13.25H11.25V11.9167H8.75V10.4167H9.6875L9.6875 6.58333H8.75V5.08333H11.25V3.75H12.75ZM11.1875 6.58333V7.75H13.5625C13.6212 7.75 13.75 7.6844 13.75 7.5V6.83333C13.75 6.64893 13.6212 6.58333 13.5625 6.58333H11.1875ZM13.5625 9.25H11.1875L11.1875 10.4167H13.5625C13.6212 10.4167 13.75 10.3511 13.75 10.1667V9.5C13.75 9.3156 13.6212 9.25 13.5625 9.25Z',
};

export const IconBitcoinMailStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bitcoin-mail-stroke-rounded IconBitcoinMailStrokeRounded"
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

export const IconBitcoinMailDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bitcoin-mail-duotone-rounded IconBitcoinMailDuotoneRounded"
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

export const IconBitcoinMailTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bitcoin-mail-twotone-rounded IconBitcoinMailTwotoneRounded"
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

export const IconBitcoinMailSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bitcoin-mail-solid-rounded IconBitcoinMailSolidRounded"
    >
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
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

export const IconBitcoinMailBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bitcoin-mail-bulk-rounded IconBitcoinMailBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
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

export const IconBitcoinMailStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bitcoin-mail-stroke-sharp IconBitcoinMailStrokeSharp"
    >
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconBitcoinMailSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bitcoin-mail-solid-sharp IconBitcoinMailSolidSharp"
    >
      <path 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
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
    </TheIconWrapper>
  );
};

export const iconPackOfBitcoinMail: TheIconSelfPack = {
  name: 'BitcoinMail',
  StrokeRounded: IconBitcoinMailStrokeRounded,
  DuotoneRounded: IconBitcoinMailDuotoneRounded,
  TwotoneRounded: IconBitcoinMailTwotoneRounded,
  SolidRounded: IconBitcoinMailSolidRounded,
  BulkRounded: IconBitcoinMailBulkRounded,
  StrokeSharp: IconBitcoinMailStrokeSharp,
  SolidSharp: IconBitcoinMailSolidSharp,
};