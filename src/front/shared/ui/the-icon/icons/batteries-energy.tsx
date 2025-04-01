import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12.5 2L10 6H14L11.5 10',
  d2: 'M17 6C17.9428 6 18.4142 6 18.7071 6.29289C19 6.58579 19 7.05719 19 8V10.5M7 6C6.05719 6 5.58579 6 5.29289 6.29289C5 6.58579 5 7.05719 5 8L5 10.5',
  d3: 'M20 13H18C17.0572 13 16.5858 13 16.2929 13.2929C16 13.5858 16 14.0572 16 15V20C16 20.9428 16 21.4142 16.2929 21.7071C16.5858 22 17.0572 22 18 22H20C20.9428 22 21.4142 22 21.7071 21.7071C22 21.4142 22 20.9428 22 20V15C22 14.0572 22 13.5858 21.7071 13.2929C21.4142 13 20.9428 13 20 13Z',
  d4: 'M16 19H22',
  d5: 'M16 16L22 16',
  d6: 'M6 13H4C3.05719 13 2.58579 13 2.29289 13.2929C2 13.5858 2 14.0572 2 15V20C2 20.9428 2 21.4142 2.29289 21.7071C2.58579 22 3.05719 22 4 22H6C6.94281 22 7.41421 22 7.70711 21.7071C8 21.4142 8 20.9428 8 20V15C8 14.0572 8 13.5858 7.70711 13.2929C7.41421 13 6.94281 13 6 13Z',
  d7: 'M2 19H8',
  d8: 'M2 16L8 16',
  d9: 'M6.00195 13H4.00195C3.05914 13 2.58774 13 2.29484 13.2929C2.00195 13.5858 2.00195 14.0572 2.00195 15V20C2.00195 20.9428 2.00195 21.4142 2.29484 21.7071C2.58774 22 3.05914 22 4.00195 22H6.00195C6.94476 22 7.41616 22 7.70906 21.7071C8.00195 21.4142 8.00195 20.9428 8.00195 20V15C8.00195 14.0572 8.00195 13.5858 7.70906 13.2929C7.41616 13 6.94476 13 6.00195 13Z',
  d10: 'M12.502 2L10.002 6H14.002L11.502 10',
  d11: 'M17.002 6C17.9448 6 18.4162 6 18.7091 6.29289C19.002 6.58579 19.002 7.05719 19.002 8V10.5M7.00195 6C6.05914 6 5.58774 6 5.29484 6.29289C5.00195 6.58579 5.00195 7.05719 5.00195 8V10.5',
  d12: 'M20.002 13H18.002C17.0592 13 16.5878 13 16.2949 13.2929C16.002 13.5858 16.002 14.0572 16.002 15V20C16.002 20.9428 16.002 21.4142 16.2949 21.7071C16.5878 22 17.0592 22 18.002 22H20.002C20.9448 22 21.4162 22 21.7091 21.7071C22.002 21.4142 22.002 20.9428 22.002 20V15C22.002 14.0572 22.002 13.5858 21.7091 13.2929C21.4162 13 20.9448 13 20.002 13Z',
  d13: 'M20.001 13H18.001C17.0582 13 16.5868 13 16.2939 13.2929C16.001 13.5858 16.001 14.0572 16.001 15V20C16.001 20.9428 16.001 21.4142 16.2939 21.7071C16.5868 22 17.0582 22 18.001 22H20.001C20.9438 22 21.4152 22 21.7081 21.7071C22.001 21.4142 22.001 20.9428 22.001 20V15C22.001 14.0572 22.001 13.5858 21.7081 13.2929C21.4152 13 20.9438 13 20.001 13Z',
  d14: 'M16.001 19H22.001',
  d15: 'M16.001 16H22.001',
  d16: 'M2.00195 19H8.00195',
  d17: 'M2.00195 16H8.00195',
  d18: 'M12.8975 1.36398C13.2488 1.58351 13.3555 2.04623 13.136 2.39748L11.3532 5.24998H14C14.2726 5.24998 14.5238 5.39794 14.656 5.6364C14.7882 5.87487 14.7805 6.16628 14.636 6.39748L12.136 10.3975C11.9165 10.7487 11.4538 10.8555 11.1025 10.636C10.7512 10.4164 10.6445 9.95373 10.864 9.60248L12.6468 6.74998H10C9.72736 6.74998 9.47619 6.60202 9.34402 6.36355C9.21185 6.12509 9.2195 5.83368 9.364 5.60248L11.864 1.60248C12.0835 1.25123 12.5462 1.14445 12.8975 1.36398Z',
  d19: 'M6.95526 5.25C6.97013 5.25001 6.98505 5.25001 7.00001 5.25001C7.41422 5.25001 7.75001 5.58579 7.75001 6.00001C7.75001 6.41422 7.41422 6.75001 7.00001 6.75001C6.5074 6.75001 6.21339 6.7516 6.00267 6.77993C5.90611 6.79291 5.85775 6.80821 5.83597 6.81717C5.83093 6.81924 5.82761 6.82086 5.82568 6.82187L5.82324 6.82324L5.82187 6.82568C5.82086 6.82761 5.81924 6.83093 5.81717 6.83597C5.80821 6.85775 5.79291 6.90611 5.77993 7.00267C5.7516 7.21339 5.75001 7.5074 5.75001 8.00001V10.5C5.75001 10.9142 5.41422 11.25 5.00001 11.25C4.58579 11.25 4.25001 10.9142 4.25001 10.5V8.00001C4.25001 7.98505 4.25001 7.97013 4.25 7.95526C4.24995 7.52244 4.24991 7.12561 4.29331 6.8028C4.3411 6.44732 4.45355 6.07159 4.76257 5.76257C5.07159 5.45355 5.44732 5.3411 5.8028 5.29331C6.12561 5.24991 6.52244 5.24995 6.95526 5.25ZM17.9973 6.77993C17.7866 6.7516 17.4926 6.75001 17 6.75001C16.5858 6.75001 16.25 6.41422 16.25 6.00001C16.25 5.58579 16.5858 5.25001 17 5.25001L17.0448 5.25C17.4776 5.24995 17.8744 5.24991 18.1972 5.29331C18.5527 5.3411 18.9284 5.45355 19.2374 5.76257C19.5465 6.07159 19.6589 6.44732 19.7067 6.8028C19.7501 7.12561 19.7501 7.52245 19.75 7.95526L19.75 10.5C19.75 10.9142 19.4142 11.25 19 11.25C18.5858 11.25 18.25 10.9142 18.25 10.5V8.00001C18.25 7.5074 18.2484 7.21339 18.2201 7.00267C18.2071 6.90611 18.1918 6.85775 18.1828 6.83597C18.1808 6.83093 18.1792 6.82761 18.1781 6.82568L18.1768 6.82324L18.1743 6.82187C18.1724 6.82086 18.1691 6.81924 18.164 6.81717C18.1423 6.80821 18.0939 6.79291 17.9973 6.77993Z',
  d20: 'M20.0448 12.2499H17.9553C17.5224 12.2498 17.1256 12.2498 16.8028 12.2932C16.4473 12.341 16.0716 12.4534 15.7626 12.7624C15.4535 13.0715 15.3411 13.4472 15.2933 13.8027C15.2569 14.0737 15.2511 14.397 15.2502 14.7499H22.7499C22.749 14.397 22.7431 14.0737 22.7067 13.8027C22.6589 13.4472 22.5465 13.0715 22.2374 12.7624C21.9284 12.4534 21.5527 12.341 21.1972 12.2932C20.8744 12.2498 20.4776 12.2498 20.0448 12.2499Z',
  d21: 'M22.75 16.2499H15.25V18.7499H22.75V16.2499Z',
  d22: 'M22.7499 20.2499H15.2502C15.2511 20.6028 15.2569 20.926 15.2933 21.1971C15.3411 21.5526 15.4535 21.9283 15.7626 22.2373C16.0716 22.5463 16.4473 22.6588 16.8028 22.7066C17.1256 22.75 17.5224 22.7499 17.9552 22.7499H20.0447C20.4776 22.7499 20.8744 22.75 21.1972 22.7066C21.5527 22.6588 21.9284 22.5463 22.2374 22.2373C22.5465 21.9283 22.6589 21.5526 22.7067 21.1971C22.7431 20.926 22.749 20.6028 22.7499 20.2499Z',
  d23: 'M6.04475 12.2499H3.95525C3.52244 12.2498 3.12561 12.2498 2.8028 12.2932C2.44732 12.341 2.07159 12.4534 1.76257 12.7624C1.45354 13.0715 1.3411 13.4472 1.2933 13.8027C1.25686 14.0737 1.25105 14.397 1.25015 14.7499H8.74985C8.74896 14.397 8.74315 14.0737 8.7067 13.8027C8.65891 13.4472 8.54646 13.0715 8.23744 12.7624C7.92842 12.4534 7.55269 12.341 7.19721 12.2932C6.8744 12.2498 6.47757 12.2498 6.04475 12.2499Z',
  d24: 'M8.75001 16.2499H1.25V18.7499H8.75001V16.2499Z',
  d25: 'M8.74985 20.2499H1.25015C1.25105 20.6028 1.25686 20.926 1.2933 21.1971C1.3411 21.5526 1.45354 21.9283 1.76257 22.2373C2.07159 22.5463 2.44732 22.6588 2.8028 22.7066C3.1256 22.75 3.52243 22.7499 3.95524 22.7499H6.04475C6.47756 22.7499 6.8744 22.75 7.19721 22.7066C7.55269 22.6588 7.92842 22.5463 8.23744 22.2373C8.54646 21.9283 8.65891 21.5526 8.7067 21.1971C8.74315 20.926 8.74896 20.6028 8.74985 20.2499Z',
  d26: 'M8.74985 14.7499H1.25015L1.25 16.2499H8.75001L8.74985 14.7499Z',
  d27: 'M8.75001 18.7499H1.25L1.25015 20.2499H8.74985L8.75001 18.7499Z',
  d28: 'M20.0446 12.2499H17.9551C17.5223 12.2498 17.1255 12.2498 16.8026 12.2932C16.4472 12.341 16.0714 12.4534 15.7624 12.7624C15.4534 13.0715 15.3409 13.4472 15.2931 13.8027C15.2567 14.0737 15.2509 14.397 15.25 14.7499V20.2499C15.2509 20.6028 15.2567 20.926 15.2931 21.1971C15.3409 21.5526 15.4534 21.9283 15.7624 22.2373C16.0714 22.5463 16.4472 22.6588 16.8026 22.7066C17.1254 22.75 17.5223 22.7499 17.9551 22.7499H17.9551H20.0446H20.0446C20.4774 22.7499 20.8743 22.75 21.1971 22.7066C21.5525 22.6588 21.9283 22.5463 22.2373 22.2373C22.5463 21.9283 22.6588 21.5526 22.7065 21.1971C22.743 20.926 22.7488 20.6028 22.7497 20.2499V14.7499C22.7488 14.397 22.743 14.0737 22.7065 13.8027C22.6588 13.4472 22.5463 13.0715 22.2373 12.7624C21.9283 12.4534 21.5525 12.341 21.1971 12.2932C20.8742 12.2498 20.4774 12.2498 20.0446 12.2499Z',
  d29: 'M6.0446 12.2499H3.9551C3.52228 12.2498 3.12545 12.2498 2.80264 12.2932C2.44716 12.341 2.07144 12.4534 1.76241 12.7624C1.45339 13.0715 1.34094 13.4472 1.29315 13.8027C1.25671 14.0737 1.2509 14.397 1.25 14.7499V20.2499C1.2509 20.6028 1.25671 20.926 1.29315 21.1971C1.34094 21.5526 1.45339 21.9283 1.76241 22.2373C2.07143 22.5463 2.44716 22.6588 2.80264 22.7066C3.12544 22.75 3.52227 22.7499 3.95507 22.7499H3.95508H6.04459H6.0446C6.47741 22.7499 6.87425 22.75 7.19706 22.7066C7.55254 22.6588 7.92826 22.5463 8.23729 22.2373C8.54631 21.9283 8.65876 21.5526 8.70655 21.1971C8.74299 20.926 8.7488 20.6028 8.7497 20.2499V14.7499C8.7488 14.397 8.74299 14.0737 8.70655 13.8027C8.65876 13.4472 8.54631 13.0715 8.23729 12.7624C7.92826 12.4534 7.55254 12.341 7.19706 12.2932C6.87425 12.2498 6.47741 12.2498 6.0446 12.2499Z',
  d30: 'M22.7499 14.7499H15.2502L15.25 16.2499H22.75L22.7499 14.7499Z',
  d31: 'M22.75 18.7499H15.25L15.2502 20.2499H22.7499L22.75 18.7499Z',
  d32: 'M17.5 6H19.0005V10.4995M6.5 5.9997H5L5.00048 10.4995',
  d33: 'M8 13H2V22H8V13Z',
  d34: 'M22 13H16V22H22V13Z',
  d35: 'M13.5332 2.04427L11.3529 5.53277H15.3529L11.7382 11.3163L10.4662 10.5213L12.6465 7.03277H8.64648L12.2612 1.24927L13.5332 2.04427Z',
  d36: 'M4.24902 5.24976H7.2491V6.74976H5.74918L5.74966 11.2495L4.24966 11.2496L4.24902 5.24976ZM16.7491 5.25006H19.7496V11.2496H18.2496V6.75006H16.7491V5.25006Z',
  d37: 'M16 12.2498C15.5858 12.2498 15.25 12.5855 15.25 12.9998V14.7498H22.75V12.9998C22.75 12.5855 22.4142 12.2498 22 12.2498H16Z',
  d38: 'M22.75 16.2498H15.25V18.7498H22.75V16.2498Z',
  d39: 'M22.75 20.2498H15.25V21.9998C15.25 22.414 15.5858 22.7498 16 22.7498H22C22.4142 22.7498 22.75 22.414 22.75 21.9998V20.2498Z',
  d40: 'M2 12.2498C1.58579 12.2498 1.25 12.5855 1.25 12.9998V14.7498H8.75V12.9998C8.75 12.5855 8.41421 12.2498 8 12.2498H2Z',
  d41: 'M8.75 16.2498H1.25V18.7498H8.75V16.2498Z',
  d42: 'M8.75 20.2498H1.25V21.9998C1.25 22.414 1.58579 22.7498 2 22.7498H8C8.41421 22.7498 8.75 22.414 8.75 21.9998V20.2498Z',
};

export const IconBatteriesEnergyStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="batteries-energy-stroke-rounded IconBatteriesEnergyStrokeRounded"
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
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBatteriesEnergyDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="batteries-energy-duotone-rounded IconBatteriesEnergyDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d9} 
        fill="var(--icon-fill)" 
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
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d14} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d15} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d16} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d17} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBatteriesEnergyTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="batteries-energy-twotone-rounded IconBatteriesEnergyTwotoneRounded"
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
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBatteriesEnergySolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="batteries-energy-solid-rounded IconBatteriesEnergySolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d20} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d21} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d22} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d23} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d24} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d25} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconBatteriesEnergyBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="batteries-energy-bulk-rounded IconBatteriesEnergyBulkRounded"
    >
      <path 
        d={d.d26} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d27} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d28} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d29} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d30} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d31} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconBatteriesEnergyStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="batteries-energy-stroke-sharp IconBatteriesEnergyStrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d32} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d33} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d34} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBatteriesEnergySolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="batteries-energy-solid-sharp IconBatteriesEnergySolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d35} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d36} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d37} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d38} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d39} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d40} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d41} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d42} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfBatteriesEnergy: TheIconSelfPack = {
  name: 'BatteriesEnergy',
  StrokeRounded: IconBatteriesEnergyStrokeRounded,
  DuotoneRounded: IconBatteriesEnergyDuotoneRounded,
  TwotoneRounded: IconBatteriesEnergyTwotoneRounded,
  SolidRounded: IconBatteriesEnergySolidRounded,
  BulkRounded: IconBatteriesEnergyBulkRounded,
  StrokeSharp: IconBatteriesEnergyStrokeSharp,
  SolidSharp: IconBatteriesEnergySolidSharp,
};