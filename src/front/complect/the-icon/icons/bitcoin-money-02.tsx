import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M10.4375 14.6667L10.4375 9.33333M12 9.33333V8M12 16V14.6667M10.4375 12H13.5625M13.5625 12C14.0803 12 14.5 12.4477 14.5 13V13.6667C14.5 14.219 14.0803 14.6667 13.5625 14.6667H9.5M13.5625 12C14.0803 12 14.5 11.5523 14.5 11V10.3333C14.5 9.78105 14.0803 9.33333 13.5625 9.33333H9.5',
  d2: 'M19 11.1415C18.6749 11.0944 18.341 11.0586 18 11.0347M6 12.9653C5.65897 12.9415 5.32511 12.9056 5 12.8585',
  d3: 'M12 19.5C10.6675 20.1224 8.91707 20.5 7 20.5C5.93408 20.5 4.91969 20.3833 4 20.1726C2.49957 19.8289 2 18.9264 2 17.386V6.61397C2 5.62914 3.04003 4.95273 4 5.1726C4.91969 5.38325 5.93408 5.5 7 5.5C8.91707 5.5 10.6675 5.12236 12 4.5C13.3325 3.87764 15.0829 3.5 17 3.5C18.0659 3.5 19.0803 3.61675 20 3.8274C21.5817 4.18968 22 5.12036 22 6.61397V17.386C22 18.3709 20.96 19.0473 20 18.8274C19.0803 18.6167 18.0659 18.5 17 18.5C15.0829 18.5 13.3325 18.8776 12 19.5Z',
  d4: 'M11.6826 3.82046C13.1298 3.14454 14.9915 2.75 17 2.75C18.1198 2.75 19.1905 2.87257 20.1674 3.09633C21.0845 3.30637 21.7825 3.71217 22.2218 4.38745C22.6428 5.03453 22.75 5.81712 22.75 6.61397V17.386C22.75 18.9532 21.159 19.8623 19.8326 19.5585C18.9701 19.3609 18.012 19.25 17 19.25C15.1744 19.25 13.5352 19.6107 12.3174 20.1795C10.8702 20.8555 9.00849 21.25 7 21.25C5.88016 21.25 4.80949 21.1274 3.83255 20.9037C2.95689 20.7031 2.26524 20.3111 1.81644 19.6488C1.38242 19.0082 1.25 18.2216 1.25 17.386V6.61397C1.25 5.04678 2.841 4.13772 4.16745 4.44153C5.02989 4.63907 5.988 4.75 7 4.75C8.82565 4.75 10.4648 4.38927 11.6826 3.82046ZM12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V8.58333H13.5625C14.5393 8.58333 15.25 9.41317 15.25 10.3333V11C15.25 11.3624 15.1398 11.7108 14.9465 12C15.1398 12.2892 15.25 12.6376 15.25 13V13.6667C15.25 14.5868 14.5393 15.4167 13.5625 15.4167H12.75V16C12.75 16.4142 12.4142 16.75 12 16.75C11.5858 16.75 11.25 16.4142 11.25 16V15.4167H9.5C9.08579 15.4167 8.75 15.0809 8.75 14.6667C8.75 14.2525 9.08579 13.9167 9.5 13.9167H9.6875V10.0833H9.5C9.08579 10.0833 8.75 9.74755 8.75 9.33333C8.75 8.91912 9.08579 8.58333 9.5 8.58333H11.25V8C11.25 7.58579 11.5858 7.25 12 7.25ZM11.1875 10.0833V11.25H13.5625C13.6212 11.25 13.75 11.1844 13.75 11V10.3333C13.75 10.1489 13.6212 10.0833 13.5625 10.0833H11.1875ZM13.5625 12.75H11.1875V13.9167H13.5625C13.6212 13.9167 13.75 13.8511 13.75 13.6667V13C13.75 12.8156 13.6212 12.75 13.5625 12.75ZM6.05242 12.2176C6.46563 12.2465 6.77717 12.6049 6.74827 13.0181C6.71937 13.4313 6.36098 13.7429 5.94777 13.714C5.58853 13.6888 5.23627 13.651 4.89261 13.6012C4.48267 13.5419 4.19848 13.1614 4.25784 12.7515C4.3172 12.3416 4.69765 12.0574 5.10758 12.1167C5.41415 12.1611 5.7296 12.195 6.05242 12.2176ZM19.1076 10.3997C19.5175 10.4591 19.8017 10.8395 19.7424 11.2495C19.683 11.6594 19.3025 11.9436 18.8926 11.8842C18.586 11.8399 18.2706 11.8059 17.9478 11.7833C17.5346 11.7544 17.223 11.3961 17.2519 10.9828C17.2808 10.5696 17.6392 10.2581 18.0524 10.287C18.4117 10.3121 18.7639 10.35 19.1076 10.3997Z',
  d5: 'M11.6826 3.82046C13.1298 3.14454 14.9915 2.75 17 2.75C18.1198 2.75 19.1905 2.87257 20.1674 3.09633C21.0845 3.30637 21.7825 3.71217 22.2218 4.38745C22.6428 5.03453 22.75 5.81712 22.75 6.61397V17.386C22.75 18.9532 21.159 19.8623 19.8326 19.5585C18.9701 19.3609 18.012 19.25 17 19.25C15.1744 19.25 13.5352 19.6107 12.3174 20.1795C10.8702 20.8555 9.00849 21.25 7 21.25C5.88016 21.25 4.80949 21.1274 3.83255 20.9037C2.95689 20.7031 2.26524 20.3111 1.81644 19.6488C1.38242 19.0082 1.25 18.2216 1.25 17.386V6.61397C1.25 5.04678 2.841 4.13772 4.16745 4.44153C5.02989 4.63907 5.988 4.75 7 4.75C8.82565 4.75 10.4648 4.38927 11.6826 3.82046Z',
  d6: 'M12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V8.58333H13.5625C14.5393 8.58333 15.25 9.41317 15.25 10.3333V11C15.25 11.3624 15.1398 11.7108 14.9465 12C15.1398 12.2892 15.25 12.6376 15.25 13V13.6667C15.25 14.5868 14.5393 15.4167 13.5625 15.4167H12.75V16C12.75 16.4142 12.4142 16.75 12 16.75C11.5858 16.75 11.25 16.4142 11.25 16V15.4167H9.5C9.08579 15.4167 8.75 15.0809 8.75 14.6667C8.75 14.2525 9.08579 13.9167 9.5 13.9167H9.6875L9.6875 10.0833H9.5C9.08579 10.0833 8.75 9.74755 8.75 9.33333C8.75 8.91912 9.08579 8.58333 9.5 8.58333H11.25V8C11.25 7.58579 11.5858 7.25 12 7.25ZM11.1875 10.0833V11.25H13.5625C13.6212 11.25 13.75 11.1844 13.75 11V10.3333C13.75 10.1489 13.6212 10.0833 13.5625 10.0833H11.1875ZM13.5625 12.75H11.1875L11.1875 13.9167H13.5625C13.6212 13.9167 13.75 13.8511 13.75 13.6667V13C13.75 12.8156 13.6212 12.75 13.5625 12.75Z',
  d7: 'M6.74827 13.0181C6.77717 12.6049 6.46563 12.2465 6.05242 12.2176C5.7296 12.195 5.41415 12.1611 5.10758 12.1167C4.69765 12.0574 4.3172 12.3416 4.25784 12.7515C4.19848 13.1614 4.48267 13.5419 4.89261 13.6012C5.23627 13.651 5.58853 13.6888 5.94777 13.714C6.36098 13.7429 6.71937 13.4313 6.74827 13.0181ZM19.7424 11.2495C19.8017 10.8395 19.5175 10.4591 19.1076 10.3997C18.7639 10.35 18.4117 10.3121 18.0524 10.287C17.6392 10.2581 17.2808 10.5696 17.2519 10.9828C17.223 11.3961 17.5346 11.7544 17.9478 11.7833C18.2706 11.8059 18.586 11.8399 18.8926 11.8842C19.3025 11.9436 19.683 11.6594 19.7424 11.2495Z',
  d8: 'M12 4.5C10.6675 5.12236 8.91707 5.5 7 5.5C5.93408 5.5 4.5 5.5 2 4.5V19.5C4.5 20.5 5.93408 20.5 7 20.5C8.91707 20.5 10.6675 20.1224 12 19.5C13.3325 18.8776 15.0829 18.5 17 18.5C20 18.5 22 19.5 22 19.5V4.5C22 4.5 20 3.5 17 3.5C15.0829 3.5 13.3325 3.87764 12 4.5Z',
  d9: 'M22.75 20.7135C21.5562 20.1046 20.8294 19.8384 20.419 19.7211C19.5972 19.4864 18.4173 19.25 17 19.25C15.1744 19.25 13.5352 19.6107 12.3174 20.1795C10.8702 20.8555 9.00849 21.25 7 21.25C5.87882 21.25 3.60551 21.25 1.25 20.0078V3.39223C3.58796 4.52969 5.99158 4.75004 7 4.75C8.82565 4.75 10.4648 4.38927 11.6826 3.82046C13.1298 3.14454 14.9915 2.75 17 2.75C18.5827 2.75 19.9028 3.01364 20.831 3.27886C21.2956 3.41159 22.0491 3.69075 22.75 4.03647V20.7135ZM12.75 7.25V8.58333H13.5625C14.5393 8.58333 15.25 9.41317 15.25 10.3333V11C15.25 11.3624 15.1398 11.7108 14.9465 12C15.1398 12.2892 15.25 12.6376 15.25 13V13.6667C15.25 14.5868 14.5393 15.4167 13.5625 15.4167H12.75V16.75H11.25V15.4167H8.75V13.9167H9.6875V10.0833H8.75V8.58333H11.25V7.25H12.75ZM11.1875 10.0833V11.25H13.5625C13.6212 11.25 13.75 11.1844 13.75 11V10.3333C13.75 10.1489 13.6212 10.0833 13.5625 10.0833H11.1875ZM13.5625 12.75H11.1875V13.9167H13.5625C13.6212 13.9167 13.75 13.8511 13.75 13.6667V13C13.75 12.8156 13.6212 12.75 13.5625 12.75ZM6.05246 12.217L6.80063 12.2693L6.69598 13.7656L5.94781 13.7133C5.58857 13.6882 5.23631 13.6503 4.89265 13.6006L4.15039 13.4931L4.36536 12.0086L5.10762 12.1161C5.41419 12.1605 5.72964 12.1944 6.05246 12.217ZM19.1076 10.3991L19.8499 10.5066L19.6349 11.9911L18.8926 11.8836C18.5861 11.8392 18.2706 11.8053 17.9478 11.7827L17.1996 11.7304L17.3043 10.234L18.0525 10.2863C18.4117 10.3115 18.764 10.3493 19.1076 10.3991Z',
};

export const IconBitcoinMoney02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bitcoin-money-02-stroke-rounded IconBitcoinMoney02StrokeRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconBitcoinMoney02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bitcoin-money-02-duotone-rounded IconBitcoinMoney02DuotoneRounded"
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
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconBitcoinMoney02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bitcoin-money-02-twotone-rounded IconBitcoinMoney02TwotoneRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconBitcoinMoney02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bitcoin-money-02-solid-rounded IconBitcoinMoney02SolidRounded"
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

export const IconBitcoinMoney02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bitcoin-money-02-bulk-rounded IconBitcoinMoney02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const IconBitcoinMoney02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bitcoin-money-02-stroke-sharp IconBitcoinMoney02StrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconBitcoinMoney02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bitcoin-money-02-solid-sharp IconBitcoinMoney02SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfBitcoinMoney02: TheIconSelfPack = {
  name: 'BitcoinMoney02',
  StrokeRounded: IconBitcoinMoney02StrokeRounded,
  DuotoneRounded: IconBitcoinMoney02DuotoneRounded,
  TwotoneRounded: IconBitcoinMoney02TwotoneRounded,
  SolidRounded: IconBitcoinMoney02SolidRounded,
  BulkRounded: IconBitcoinMoney02BulkRounded,
  StrokeSharp: IconBitcoinMoney02StrokeSharp,
  SolidSharp: IconBitcoinMoney02SolidSharp,
};