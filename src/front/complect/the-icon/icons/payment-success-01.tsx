import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M14 18.5C14 18.5 15 18.5 16 20.5C16 20.5 19.1765 15.5 22 14.5',
  d2: 'M5.5 11.5H5.49102',
  d3: 'M11 19.5H10.5C6.74142 19.5 4.86213 19.5 3.60746 18.5091C3.40678 18.3506 3.22119 18.176 3.0528 17.9871C2 16.8062 2 15.0375 2 11.5C2 7.96252 2 6.19377 3.0528 5.0129C3.22119 4.82403 3.40678 4.64935 3.60746 4.49087C4.86213 3.5 6.74142 3.5 10.5 3.5H13.5C17.2586 3.5 19.1379 3.5 20.3925 4.49087C20.5932 4.64935 20.7788 4.82403 20.9472 5.0129C21.8957 6.07684 21.9897 7.61799 21.999 10.5V11',
  d4: 'M14.5 11.5C14.5 12.8807 13.3807 14 12 14C10.6193 14 9.5 12.8807 9.5 11.5C9.5 10.1193 10.6193 9 12 9C13.3807 9 14.5 10.1193 14.5 11.5Z',
  d5: 'M11 3.5H13C17.2426 3.5 19.364 3.5 20.682 4.67157C22 5.84315 22 7.72876 22 11.5C22 15.2712 22 17.1569 20.682 18.3284C19.364 19.5 17.2426 19.5 13 19.5H11C6.75736 19.5 4.63604 19.5 3.31802 18.3284C2 17.1569 2 15.2712 2 11.5C2 7.72876 2 5.84315 3.31802 4.67157C4.63604 3.5 6.75736 3.5 11 3.5ZM12 14C13.3807 14 14.5 12.8807 14.5 11.5C14.5 10.1193 13.3807 9 12 9C10.6193 9 9.5 10.1193 9.5 11.5C9.5 12.8807 10.6193 14 12 14Z',
  d6: 'M13.4225 2.625C15.2616 2.62499 16.7058 2.62498 17.8444 2.7536C19.0066 2.88488 19.949 3.15862 20.7324 3.77729C20.9669 3.96249 21.1843 4.16705 21.382 4.3888C22.0482 5.13601 22.3457 6.04169 22.4874 7.15285C22.625 8.23227 22.625 9.59825 22.625 11.3223V11.4278C22.625 11.5748 22.625 11.6483 22.6107 11.6929C22.5739 11.8077 22.5107 11.8661 22.3934 11.8935C22.3477 11.9042 22.2566 11.8969 22.0745 11.8823L22.0745 11.8823C21.7346 11.855 21.3836 11.8973 21.0414 12.0185C19.905 12.4209 18.8984 13.1536 18.0989 13.8548C17.2737 14.5785 16.5204 15.4018 15.8974 16.1486C15.843 16.2138 15.8158 16.2465 15.7896 16.2666C15.7126 16.3259 15.631 16.3433 15.5365 16.3207C15.5044 16.3129 15.4619 16.2921 15.3768 16.2505C15.1645 16.1467 14.959 16.0685 14.7642 16.0111C14.4026 15.8959 14.0394 15.8765 13.8906 15.8751L13.876 15.875C12.4953 15.875 11.376 16.9943 11.376 18.375C11.376 18.5485 11.3936 18.7179 11.4272 18.8814C11.5674 19.5632 11.6375 19.9041 11.5475 20.0146C11.4574 20.125 11.1922 20.125 10.6617 20.125H10.3275C8.48845 20.125 7.04417 20.125 5.90558 19.9964C4.74342 19.8651 3.801 19.5914 3.01763 18.9727C2.78311 18.7875 2.56568 18.5829 2.36798 18.3612C1.70181 17.614 1.40432 16.7083 1.26263 15.5972C1.12498 14.5177 1.12499 13.1517 1.125 11.4277V11.4277V11.3222V11.3222C1.12499 9.59824 1.12498 8.23227 1.26263 7.15285C1.40432 6.04169 1.70181 5.13601 2.36798 4.3888C2.56568 4.16705 2.78311 3.96249 3.01763 3.77729C3.801 3.15862 4.74342 2.88488 5.90558 2.7536C7.04417 2.62498 8.48846 2.62499 10.3275 2.625H13.4225ZM6.375 11.375C6.375 10.8227 5.92929 10.375 5.37947 10.375H5.37053C4.82071 10.375 4.375 10.8227 4.375 11.375C4.375 11.9273 4.82071 12.375 5.37053 12.375H5.37947C5.92929 12.375 6.375 11.9273 6.375 11.375ZM11.875 8.125C10.0801 8.125 8.625 9.58007 8.625 11.375C8.625 13.1699 10.0801 14.625 11.875 14.625C13.6699 14.625 15.125 13.1699 15.125 11.375C15.125 9.58007 13.6699 8.125 11.875 8.125Z',
  d7: 'M22.8176 14.0414C23.002 14.562 22.7294 15.1335 22.2088 15.3179C21.6752 15.5069 21.0587 15.9138 20.4057 16.4865C19.763 17.0501 19.1378 17.7271 18.5841 18.3909C18.0322 19.0524 17.5635 19.6861 17.2324 20.1551C17.0672 20.3891 16.9372 20.5808 16.8493 20.7129L16.7191 20.9115C16.5258 21.2156 16.1837 21.3924 15.8239 21.374C15.4639 21.3555 15.1418 21.1448 14.9806 20.8225C14.5399 19.9411 14.1446 19.5902 13.9453 19.4573C13.861 19.4011 13.804 19.3786 13.7814 19.3709C13.273 19.3237 12.875 18.896 12.875 18.3753C12.875 17.823 13.3227 17.3753 13.875 17.3753C13.9574 17.3761 14.1621 17.3911 14.3216 17.445C14.5295 17.5044 14.7803 17.6103 15.0547 17.7932C15.329 17.9761 15.6166 18.2288 15.9054 18.5747C16.2206 18.1439 16.609 17.6363 17.0483 17.1097C17.6416 16.3985 18.34 15.6379 19.087 14.9828C19.8236 14.3368 20.663 13.7436 21.5412 13.4326C22.0618 13.2483 22.6332 13.5208 22.8176 14.0414Z',
  d8: 'M13.4225 2.625C15.2616 2.62499 16.7058 2.62498 17.8444 2.7536C19.0066 2.88488 19.949 3.15862 20.7324 3.77729C20.9669 3.96249 21.1843 4.16705 21.382 4.3888C22.0482 5.13601 22.3457 6.04169 22.4874 7.15285C22.625 8.23227 22.625 9.59825 22.625 11.3223V11.4278C22.625 11.5748 22.625 11.6483 22.6107 11.6929C22.5739 11.8077 22.5107 11.8661 22.3934 11.8935C22.3477 11.9042 22.2566 11.8969 22.0745 11.8823C21.7346 11.855 21.3836 11.8973 21.0414 12.0185C19.905 12.4209 18.8984 13.1536 18.0989 13.8548C17.2737 14.5785 16.5204 15.4018 15.8974 16.1486C15.843 16.2138 15.8158 16.2465 15.7896 16.2666C15.7126 16.3259 15.631 16.3433 15.5365 16.3207C15.5044 16.3129 15.4619 16.2921 15.3768 16.2505C15.1645 16.1467 14.959 16.0685 14.7642 16.0111C14.4026 15.8959 14.0394 15.8765 13.8906 15.8751L13.876 15.875C12.4953 15.875 11.376 16.9943 11.376 18.375C11.376 18.5485 11.3936 18.7179 11.4272 18.8814C11.5674 19.5632 11.6375 19.9041 11.5475 20.0146C11.4574 20.125 11.1922 20.125 10.6617 20.125H10.3275C8.48845 20.125 7.04417 20.125 5.90558 19.9964C4.74342 19.8651 3.801 19.5914 3.01763 18.9727C2.78311 18.7875 2.56568 18.5829 2.36798 18.3612C1.70181 17.614 1.40432 16.7083 1.26263 15.5972C1.12498 14.5177 1.12499 13.1517 1.125 11.4277V11.3222C1.12499 9.59825 1.12498 8.23227 1.26263 7.15285C1.40432 6.04169 1.70181 5.13601 2.36798 4.3888C2.56568 4.16705 2.78311 3.96249 3.01763 3.77729C3.801 3.15862 4.74342 2.88488 5.90558 2.7536C7.04417 2.62498 8.48846 2.62499 10.3275 2.625H13.4225Z',
  d9: 'M6.375 11.375C6.375 10.8227 5.92929 10.375 5.37947 10.375H5.37053C4.82071 10.375 4.375 10.8227 4.375 11.375C4.375 11.9273 4.82071 12.375 5.37053 12.375H5.37947C5.92929 12.375 6.375 11.9273 6.375 11.375Z',
  d10: 'M8.625 11.375C8.625 9.58007 10.0801 8.125 11.875 8.125C13.6699 8.125 15.125 9.58007 15.125 11.375C15.125 13.1699 13.6699 14.625 11.875 14.625C10.0801 14.625 8.625 13.1699 8.625 11.375Z',
  d11: 'M14 18.5L16 20.5L22 14.5',
  d12: 'M11 19.5H2V3.5H22L21.999 11',
  d13: 'M22.7072 15.5429L16.0001 22.25L13.293 19.5429L14.7072 18.1287L16.0001 19.4216L21.293 14.1287L22.7072 15.5429Z',
  d14: 'M1.25 2.5C1.25 2.08579 1.58579 1.75 2 1.75H22C22.4142 1.75 22.75 2.08579 22.75 2.5V13.4642L21.2932 12.0074L16.0003 17.3002L14.7074 16.0074L11.4648 19.25H2C1.58579 19.25 1.25 18.9142 1.25 18.5V2.5ZM4.49102 9.5H6.5V11.5H4.49102V9.5ZM19.509 9.5H17.5V11.5H19.509V9.5ZM12 7.25C10.2051 7.25 8.75 8.70507 8.75 10.5C8.75 12.2949 10.2051 13.75 12 13.75C13.7949 13.75 15.25 12.2949 15.25 10.5C15.25 8.70507 13.7949 7.25 12 7.25Z',
};

export const IconPaymentSuccess01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="payment-success-01-stroke-rounded IconPaymentSuccess01StrokeRounded"
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
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconPaymentSuccess01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="payment-success-01-duotone-rounded IconPaymentSuccess01DuotoneRounded"
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
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconPaymentSuccess01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="payment-success-01-twotone-rounded IconPaymentSuccess01TwotoneRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconPaymentSuccess01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="payment-success-01-solid-rounded IconPaymentSuccess01SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconPaymentSuccess01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="payment-success-01-bulk-rounded IconPaymentSuccess01BulkRounded"
    >
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
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconPaymentSuccess01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="payment-success-01-stroke-sharp IconPaymentSuccess01StrokeSharp"
    >
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d12} 
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

export const IconPaymentSuccess01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="payment-success-01-solid-sharp IconPaymentSuccess01SolidSharp"
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

export const iconPackOfPaymentSuccess01: TheIconSelfPack = {
  name: 'PaymentSuccess01',
  StrokeRounded: IconPaymentSuccess01StrokeRounded,
  DuotoneRounded: IconPaymentSuccess01DuotoneRounded,
  TwotoneRounded: IconPaymentSuccess01TwotoneRounded,
  SolidRounded: IconPaymentSuccess01SolidRounded,
  BulkRounded: IconPaymentSuccess01BulkRounded,
  StrokeSharp: IconPaymentSuccess01StrokeSharp,
  SolidSharp: IconPaymentSuccess01SolidSharp,
};