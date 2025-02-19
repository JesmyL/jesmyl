import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C7.89936 2 4.3752 4.46819 2.83209 8M2 4.5L2.5 8.5L6.5 7.5',
  d2: 'M14.7257 10.0601C14.6268 9.29746 13.7528 8.06524 12.1812 8.06521C10.3551 8.06518 9.58672 9.07848 9.43081 9.58514C9.18758 10.2628 9.23622 11.6561 11.3766 11.808C14.0522 11.998 15.124 12.3144 14.9877 13.955C14.8513 15.5956 13.3599 15.95 12.1812 15.9119C11.0024 15.874 9.07398 15.3316 8.99915 13.8724M11.9941 6.49902V8.06884M11.9941 15.9021V17.499',
  d3: 'M22 12C22 17.5227 17.5229 22 12 22C6.47713 22 2 17.5227 2 12C2 6.47713 6.47713 2 12 2C17.5229 2 22 6.47713 22 12Z',
  d4: 'M3.33601 5.63911L3.19978 4.54924C3.13283 4.01367 2.6444 3.63378 2.10884 3.70073C1.57328 3.76767 1.19339 4.25611 1.26034 4.79167L1.74897 8.70076C1.78366 8.97828 1.93558 9.22763 2.16629 9.38572C2.397 9.54381 2.68439 9.59547 2.95571 9.52764L6.86479 8.55037C7.3884 8.41946 7.70676 7.88887 7.57585 7.36525C7.44495 6.84163 6.91436 6.52327 6.39074 6.65418L4.71556 7.07298C6.29768 4.73762 8.97194 3.20455 12.0027 3.20455C16.8603 3.20455 20.7981 7.14241 20.7981 12C20.7981 16.8575 16.8603 20.7955 12.0027 20.7955C7.14516 20.7955 3.20732 16.8576 3.20732 12C3.20732 11.4603 2.76979 11.0227 2.23006 11.0227C1.69033 11.0227 1.25279 11.4603 1.25279 12C1.25279 17.937 6.0657 22.75 12.0027 22.75C17.9397 22.75 22.7527 17.937 22.7527 12C22.7527 6.06293 17.9397 1.25 12.0027 1.25C8.44487 1.25 5.29209 2.97833 3.33601 5.63911Z',
  d5: 'M11.9942 5.49902C12.5465 5.49902 12.9942 5.94674 12.9942 6.49902V7.15084C14.2794 7.43024 15.1286 8.34538 15.4993 9.17876C15.7237 9.68339 15.4966 10.2744 14.992 10.4988C14.4873 10.7233 13.8963 10.4961 13.6719 9.99151C13.4822 9.56513 12.9824 9.06523 12.1813 9.06521C12.133 9.06521 12.0859 9.0661 12.04 9.06781C12.0359 9.06799 12.0318 9.06815 12.0277 9.06829C11.3989 9.09388 11.0028 9.27487 10.7641 9.44673C10.6307 9.54277 10.5369 9.64268 10.4747 9.72708C10.4436 9.76932 10.4215 9.80611 10.4068 9.83457C10.3916 9.86389 10.3866 9.87965 10.3867 9.87926L10.3799 9.90128L10.3721 9.92296C10.3142 10.0843 10.3164 10.2854 10.3856 10.4108C10.4203 10.4737 10.5949 10.75 11.4475 10.8105L11.4476 10.8105C12.7422 10.9025 13.899 11.03 14.7023 11.4525C15.1502 11.6881 15.531 12.0338 15.7632 12.5306C15.986 13.007 16.0268 13.5266 15.9844 14.0378C15.8866 15.2144 15.2672 16.0037 14.4491 16.4437C13.9831 16.6943 13.4743 16.822 12.9942 16.8779V17.499C12.9942 18.0513 12.5465 18.499 11.9942 18.499C11.4419 18.499 10.9942 18.0513 10.9942 17.499V16.7617C10.5857 16.6702 10.1646 16.5335 9.77257 16.3412C8.99297 15.9586 8.13155 15.2457 8.01069 14.0561C7.95487 13.5066 8.35504 13.0159 8.90449 12.9601C9.45395 12.9043 9.94463 13.3044 10.0004 13.8539C10.0215 14.0614 10.1699 14.3083 10.6536 14.5457C11.1295 14.7792 11.7417 14.8973 12.2135 14.9124L12.2136 14.9125C12.716 14.9287 13.183 14.8536 13.5018 14.6822C13.7581 14.5444 13.9527 14.3361 13.9912 13.8721C14.0169 13.563 13.975 13.4279 13.9515 13.3776C13.9375 13.3478 13.9087 13.2949 13.7712 13.2226C13.4038 13.0293 12.6869 12.9036 11.3059 12.8055L11.3767 11.808L11.3059 12.8055C10.0182 12.7141 9.09826 12.2179 8.63433 11.3767C8.21063 10.6085 8.30185 9.78587 8.48235 9.26815C8.72575 8.50969 9.53004 7.54612 10.9942 7.1981V6.49902C10.9942 5.94674 11.4419 5.49902 11.9942 5.49902Z',
  d6: 'M11.9933 6.5V8M11.9933 16V17.5',
  d7: 'M9 14.5V15C9 15.5523 9.44772 16 10 16H14C14.5523 16 15 15.5523 15 15V13C15 12.4477 14.5523 12 14 12H10C9.44772 12 9 11.5523 9 11V9C9 8.44772 9.44772 8 10 8H14C14.5523 8 15 8.44772 15 9V9.5',
  d8: 'M1.25085 3.82292L3.18011 3.58049L3.4362 5.64008C5.382 2.97931 8.51821 1.25098 12.0574 1.25098C17.9632 1.25098 22.7509 6.06391 22.7509 12.001C22.7509 17.938 17.9632 22.751 12.0574 22.751C6.15155 22.751 1.36393 17.938 1.36393 12.001H3.30819C3.30819 16.8585 7.22534 20.7964 12.0574 20.7964C16.8894 20.7964 20.8066 16.8585 20.8066 12.001C20.8066 7.14338 16.8894 3.20552 12.0574 3.20552C9.04252 3.20552 6.38231 4.73859 4.80851 7.07395L7.01217 6.52012L7.41799 8.43283L1.99358 9.7961L1.25085 3.82292Z',
  d9: 'M12.9939 7.00195V5.50195H10.9939V7.00195H10.0017C8.89714 7.00195 8.00171 7.89738 8.00171 9.00195V11.002C8.00171 12.1065 8.89714 13.002 10.0017 13.002H14.0017V15.002H10.0017V13.502H8.00171V15.002C8.00171 16.1065 8.89714 17.002 10.0017 17.002H10.9939V18.502H12.9939V17.002H14.0017C15.1063 17.002 16.0017 16.1065 16.0017 15.002V13.002C16.0017 11.8974 15.1063 11.002 14.0017 11.002H10.0017V9.00195H14.0017V10.502H16.0017V9.00195C16.0017 7.89738 15.1063 7.00195 14.0017 7.00195H12.9939Z',
};

export const IconCashbackStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cashback-stroke-rounded IconCashbackStrokeRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconCashbackDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cashback-duotone-rounded IconCashbackDuotoneRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconCashbackTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cashback-twotone-rounded IconCashbackTwotoneRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconCashbackSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cashback-solid-rounded IconCashbackSolidRounded"
    >
      <path 
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

export const IconCashbackBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cashback-bulk-rounded IconCashbackBulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="0.5" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCashbackStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cashback-stroke-sharp IconCashbackStrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCashbackSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cashback-solid-sharp IconCashbackSolidSharp"
    >
      <path 
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

export const iconPackOfCashback: TheIconSelfPack = {
  name: 'Cashback',
  StrokeRounded: IconCashbackStrokeRounded,
  DuotoneRounded: IconCashbackDuotoneRounded,
  TwotoneRounded: IconCashbackTwotoneRounded,
  SolidRounded: IconCashbackSolidRounded,
  BulkRounded: IconCashbackBulkRounded,
  StrokeSharp: IconCashbackStrokeSharp,
  SolidSharp: IconCashbackSolidSharp,
};