import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M9.66676 22L14.3334 22M3.01509 16.5C2.99793 16.0004 2.99705 15.5001 2.99855 15M20.9849 16.5C21.0021 16.0004 21.003 15.5001 21.0015 15M3.53709 19.2547C4.02122 20.213 4.80249 20.9914 5.76305 21.4718M18.1797 21.5C19.1665 21.0221 19.9692 20.232 20.4629 19.2547',
  d2: 'M5.50502 12C3.64422 12 3.00695 11.4596 3.00695 9.5C3.00695 6.96832 2.75702 4.04633 5.25521 2.60289C6.29863 2 7.69947 2 10.5012 2L13.4988 2C16.3005 2 17.7014 2 18.7448 2.60289C21.243 4.04633 20.9931 6.96832 20.9931 9.5C20.9931 11.3622 20.453 12 18.495 12L5.50502 12Z',
  d3: 'M5.50306 12C3.64227 12 3.00499 11.4596 3.00499 9.5C3.00499 6.96832 2.75507 4.04633 5.25326 2.60289C6.29668 2 7.69752 2 10.4992 2L13.4969 2C16.2986 2 17.6994 2 18.7428 2.60289C21.241 4.04633 20.9911 6.96832 20.9911 9.5C20.9911 11.3622 20.4511 12 18.493 12L5.50306 12Z',
  d4: 'M4.2001 14.753C4.19865 15.2516 4.1996 15.736 4.21565 16.2157C4.23413 16.7677 3.81292 17.2305 3.27486 17.2494C2.73681 17.2684 2.28566 16.8363 2.26718 16.2843C2.2498 15.7647 2.24903 15.2485 2.2505 14.747C2.25211 14.1947 2.68985 13.7484 3.22822 13.75C3.76659 13.7517 4.20172 14.2007 4.2001 14.753ZM3.31074 18.1121C3.79127 17.8631 4.37762 18.0608 4.62037 18.5538C4.99785 19.3203 5.60728 19.9432 6.35624 20.3275C6.83774 20.5745 7.03283 21.1752 6.79199 21.6692C6.55115 22.1631 5.96557 22.3632 5.48408 22.1162C4.36032 21.5396 3.44656 20.6057 2.88019 19.4556C2.63744 18.9626 2.8302 18.3611 3.31074 18.1121ZM8.75072 21.75C8.75072 21.1977 9.18715 20.75 9.72553 20.75L14.2746 20.75C14.813 20.75 15.2494 21.1977 15.2494 21.75C15.2494 22.3023 14.813 22.75 14.2746 22.75L9.72553 22.75C9.18715 22.75 8.75072 22.3023 8.75072 21.75ZM17.1467 21.6859C16.912 21.1888 17.1146 20.5907 17.5991 20.35C18.3685 19.9678 18.9947 19.3355 19.3796 18.5538C19.6224 18.0608 20.2087 17.8631 20.6893 18.1121C21.1698 18.3611 21.3626 18.9626 21.1198 19.4556C20.5422 20.6285 19.6034 21.5764 18.4489 22.15C17.9644 22.3907 17.3814 22.1829 17.1467 21.6859ZM20.7251 17.2494C20.1871 17.2305 19.7659 16.7676 19.7843 16.2157C19.8004 15.736 19.8013 15.2517 19.7999 14.753C19.7983 14.2007 20.2334 13.7517 20.7718 13.75C21.3101 13.7483 21.7479 14.1947 21.7495 14.747C21.751 15.2485 21.7502 15.7647 21.7328 16.2843C21.7143 16.8363 21.2632 17.2684 20.7251 17.2494Z',
  d5: 'M2.45976 5.49378C2.73883 4.1225 3.39376 2.81248 4.88042 1.95349C5.53536 1.57508 6.2686 1.40851 7.15152 1.32843C8.01629 1.24999 9.09505 1.24999 10.4644 1.25L13.5365 1.25C14.9058 1.24999 15.9846 1.24999 16.8493 1.32843C17.7323 1.40851 18.4655 1.57507 19.1204 1.95349C20.6071 2.81248 21.262 4.1225 21.5411 5.49378C21.7668 6.60294 21.7563 7.81715 21.747 8.89366L21.747 8.89369L21.747 8.89387C21.7452 9.10162 21.7435 9.30425 21.7435 9.5C21.7435 10.4531 21.618 11.3499 21.0175 11.97C20.4113 12.5962 19.5087 12.75 18.4954 12.75L5.50545 12.75C4.49218 12.75 3.58959 12.5962 2.98332 11.97C2.38285 11.3499 2.25738 10.4531 2.25738 9.5C2.25738 9.30419 2.25563 9.10151 2.25383 8.89369C2.24452 7.81717 2.23402 6.60295 2.45976 5.49378Z',
  d6: 'M21.0049 16.9927V14.9937M3.00195 16.9927V14.9937M21.0049 18.9917V21.9902H18.0034M6.00341 21.9902H3.00195L3.01849 18.9917M16.0034 21.9902H13.0034M11.0034 21.9902H8.00341',
  d7: 'M3.00195 2.09409C3.00195 2.03889 3.04672 1.99414 3.10195 1.99414H20.9054C20.9606 1.99414 21.0054 2.03889 21.0054 2.09409V11.9971H3.00195V2.09409Z',
  d8: 'M20.7751 22.7503C21.3135 22.7503 21.75 22.3128 21.75 21.773V18.8412H19.8003V20.7958H17.8491V22.7503H20.7751ZM19.8003 14.9321L19.8003 16.8867L21.75 16.8867L21.75 14.9321L19.8003 14.9321ZM12.9749 22.7503H15.8994V20.7958H12.9749V22.7503ZM8.10056 22.7503H11.0251V20.7958H8.10056V22.7503ZM3.22486 22.7503H6.15085V20.7958H4.2051L4.21582 18.8466L2.26613 18.8358L2.25001 21.7677C2.24858 22.0278 2.35066 22.2777 2.53363 22.4622C2.71661 22.6466 2.96538 22.7503 3.22486 22.7503ZM2.25 14.9321L2.25 16.8867H4.19972V14.9321H2.25Z',
  d9: 'M21.7478 2.22678C21.7478 1.68705 21.3114 1.24951 20.773 1.24951H3.23246C2.69433 1.24951 2.25799 1.68663 2.25761 2.22609L2.25 12.9768H21.7478V2.22678Z',
};

export const IconFlipTopStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="flip-top-stroke-rounded IconFlipTopStrokeRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconFlipTopDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="flip-top-duotone-rounded IconFlipTopDuotoneRounded"
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
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconFlipTopTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="flip-top-twotone-rounded IconFlipTopTwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconFlipTopSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="flip-top-solid-rounded IconFlipTopSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconFlipTopBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="flip-top-bulk-rounded IconFlipTopBulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconFlipTopStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="flip-top-stroke-sharp IconFlipTopStrokeSharp"
    >
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconFlipTopSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="flip-top-solid-sharp IconFlipTopSolidSharp"
    >
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

export const iconPackOfFlipTop: TheIconSelfPack = {
  name: 'FlipTop',
  StrokeRounded: IconFlipTopStrokeRounded,
  DuotoneRounded: IconFlipTopDuotoneRounded,
  TwotoneRounded: IconFlipTopTwotoneRounded,
  SolidRounded: IconFlipTopSolidRounded,
  BulkRounded: IconFlipTopBulkRounded,
  StrokeSharp: IconFlipTopStrokeSharp,
  SolidSharp: IconFlipTopSolidSharp,
};