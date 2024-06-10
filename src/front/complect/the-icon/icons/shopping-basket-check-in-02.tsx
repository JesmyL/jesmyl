import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M13 22H10.0796C7.74664 22 6.58014 22 5.76809 21.2752C4.95603 20.5505 4.75097 19.3264 4.34085 16.8781L3.17786 9.93557C2.98869 8.8063 2.89411 8.24167 3.18537 7.87083C3.47662 7.5 4.01468 7.5 5.09079 7.5H18.9092C19.9853 7.5 20.5234 7.5 20.8146 7.87083C21.1059 8.24167 21.0113 8.8063 20.8221 9.93557L20.5601 11.5',
  d2: 'M16 16.5C16.4915 15.9943 17.7998 14 18.5 14M21 16.5C20.5085 15.9943 19.2002 14 18.5 14M18.5 14V22',
  d3: 'M7 7.5V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V7.5',
  d4: 'M4.5 17.5H13',
  d5: 'M4.34085 16.8781L3.17786 9.93557C2.98869 8.8063 2.89411 8.24167 3.18537 7.87083C3.47662 7.5 4.01468 7.5 5.09079 7.5H18.9092C19.9853 7.5 20.5234 7.5 20.8146 7.87083C21.1059 8.24167 21.0113 8.8063 20.8221 9.93557L19.6591 16.8781C19.6167 17.1313 19.5765 17.3714 19.5376 17.5993H4.46242C4.42349 17.3714 4.38327 17.1313 4.34085 16.8781Z',
  d6: 'M19.5 17V21.75C19.5 22.3023 19.0523 22.75 18.5 22.75C17.9477 22.75 17.5 22.3023 17.5 21.75V17H16C15.6986 17 15.4265 16.8196 15.3092 16.5419C15.1918 16.2643 15.2521 15.9434 15.4622 15.7273C15.5509 15.636 16.3864 14.5969 16.5996 14.3255C16.8458 14.035 17.1213 13.7332 17.3968 13.4985C17.5349 13.381 17.6905 13.265 17.8578 13.1754C18.0193 13.089 18.2417 13 18.5 13C18.7583 13 18.9808 13.089 19.1422 13.1754C19.3096 13.265 19.4652 13.381 19.6032 13.4985C19.8787 13.7332 20.1543 14.035 20.4005 14.3255C20.6137 14.5969 21.4491 15.636 21.5378 15.7273C21.7479 15.9434 21.8082 16.2643 21.6909 16.5419C21.5736 16.8196 21.3014 17 21 17H19.5Z',
  d7: 'M12 3.25C9.79086 3.25 8 5.04086 8 7.25V7.75C8 8.30228 7.55228 8.75 7 8.75C6.44772 8.75 6 8.30228 6 7.75V7.25C6 3.93629 8.68629 1.25 12 1.25C15.3137 1.25 18 3.93629 18 7.25V7.75C18 8.30228 17.5523 8.75 17 8.75C16.4477 8.75 16 8.30228 16 7.75V7.25C16 5.04086 14.2091 3.25 12 3.25Z',
  d8: 'M3.73122 6.80485C4.09347 6.74988 4.54569 6.74994 5.03918 6.75H18.9608C19.4543 6.74994 19.9065 6.74988 20.2688 6.80485C20.6709 6.86589 21.0939 7.01213 21.4045 7.40759C21.7075 7.79348 21.7616 8.2371 21.7481 8.64362C21.7356 9.02281 21.6576 9.48825 21.5697 10.0124L21.1602 12.4568C21.1317 12.6273 21.1174 12.7126 21.0605 12.7316C21.0035 12.7507 20.9394 12.69 20.8112 12.5685C20.7345 12.4959 20.6559 12.4248 20.5759 12.3566C20.3904 12.1986 20.1445 12.0105 19.85 11.8529C19.5732 11.7048 19.0999 11.5 18.5001 11.5C17.9002 11.5 17.4269 11.7048 17.1501 11.8529C16.8556 12.0105 16.6097 12.1986 16.4242 12.3566C16.0555 12.6706 15.7179 13.0457 15.4552 13.3558L14.362 14.7076C14.0615 15.0266 13.8674 15.4184 13.7892 15.8322C13.7224 16.1854 13.6891 16.362 13.6058 16.431C13.5225 16.5 13.3794 16.5 13.0931 16.5H4.02491C3.78234 16.5 3.66106 16.5 3.57716 16.429C3.49326 16.358 3.47323 16.2384 3.43315 15.9991L2.43027 10.0123C2.34242 9.48822 2.26442 9.02282 2.25186 8.64362C2.2384 8.2371 2.29245 7.79348 2.59554 7.40759C2.90613 7.01213 3.32906 6.86589 3.73122 6.80485Z',
  d9: 'M16 19.1C16 18.8172 16 18.6757 15.9122 18.5879C15.8243 18.5 15.6829 18.5 15.4 18.5H4.58218C4.24491 18.5 4.07627 18.5 3.98621 18.6119C3.89614 18.7239 3.9315 18.8852 4.0022 19.2079C4.05928 19.4683 4.11886 19.7096 4.18349 19.9321C4.40733 20.703 4.7155 21.3411 5.26868 21.8348C5.82696 22.3331 6.48525 22.5511 7.25514 22.6529C7.98918 22.7501 8.90541 22.75 10.028 22.75H13.972C14.4737 22.75 14.9342 22.75 15.3556 22.7414C15.6976 22.7343 15.8686 22.7308 15.9552 22.6372C16.0418 22.5435 16.0293 22.328 16.0043 21.8969C16.0015 21.8483 16 21.7993 16 21.75V19.1Z',
  d10: 'M16.0002 19.1C16.0002 18.8172 16.0002 18.6757 15.9124 18.5879C15.8245 18.5 15.6831 18.5 15.4002 18.5H4.58238C4.2451 18.5 4.07647 18.5 3.9864 18.6119C3.89634 18.7239 3.93169 18.8852 4.0024 19.2079C4.05947 19.4683 4.11906 19.7096 4.18369 19.9321C4.40753 20.703 4.71569 21.3411 5.26888 21.8348C5.82716 22.3331 6.48545 22.5511 7.25533 22.6529C7.98938 22.7501 8.90561 22.75 10.0282 22.75H13.9722C14.4739 22.75 14.9344 22.75 15.3558 22.7414C15.6978 22.7343 15.8688 22.7308 15.9554 22.6372C16.042 22.5435 16.0295 22.328 16.0045 21.8969C16.0017 21.8483 16.0002 21.7993 16.0002 21.75V19.1Z',
  d11: 'M17.499 7.49976C17.499 4.46219 15.0366 1.99976 11.999 1.99976C8.96145 1.99976 6.49902 4.46219 6.49902 7.49976',
  d12: 'M4.49902 17.4998H12.499',
  d13: 'M17.999 13.9998V21.9998M17.999 13.9998L20.999 16.9998M17.999 13.9998L14.999 16.9998',
  d14: 'M12.5308 22.0002H5.04591L2.49918 7.53004C2.4981 7.52392 2.50281 7.51831 2.50903 7.51831H21.49C21.4963 7.51831 21.501 7.52395 21.4999 7.53009L20.5839 12.9952',
  d15: 'M19.043 13.3359L22.7502 17.043L21.3359 18.4573L20.043 17.1644V22.7502H18.043V17.1644L16.7502 18.4573L15.3359 17.043L19.043 13.3359Z',
  d16: 'M11.5 1.25C8.25021 1.25 5.55745 3.63491 5.07645 6.75H2.00001C1.77881 6.75 1.56889 6.84764 1.42639 7.01682C1.28389 7.186 1.22333 7.40945 1.26091 7.62743L2.79066 16.5H13.7576L19.0433 11.2144L20.8152 12.9863L21.7391 7.62743C21.7767 7.40945 21.7161 7.186 21.5736 7.01682C21.4311 6.84764 21.2212 6.75 21 6.75H17.9236C17.4425 3.63491 14.7498 1.25 11.5 1.25ZM11.5 3.25C9.35841 3.25 7.56624 4.74601 7.11151 6.75H15.8885C15.4338 4.74601 13.6416 3.25 11.5 3.25Z',
  d17: 'M14.6721 18.5L16.5433 20.3712V22.75H3.86825L3.13549 18.5H14.6721Z',
};

export const IconShoppingBasketCheckIn02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="shopping-basket-check-in-02-stroke-rounded IconShoppingBasketCheckIn02StrokeRounded"
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

export const IconShoppingBasketCheckIn02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="shopping-basket-check-in-02-duotone-rounded IconShoppingBasketCheckIn02DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
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

export const IconShoppingBasketCheckIn02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="shopping-basket-check-in-02-twotone-rounded IconShoppingBasketCheckIn02TwotoneRounded"
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
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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

export const IconShoppingBasketCheckIn02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="shopping-basket-check-in-02-solid-rounded IconShoppingBasketCheckIn02SolidRounded"
    >
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
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

export const IconShoppingBasketCheckIn02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="shopping-basket-check-in-02-bulk-rounded IconShoppingBasketCheckIn02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconShoppingBasketCheckIn02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="shopping-basket-check-in-02-stroke-sharp IconShoppingBasketCheckIn02StrokeSharp"
    >
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d14} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconShoppingBasketCheckIn02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="shopping-basket-check-in-02-solid-sharp IconShoppingBasketCheckIn02SolidSharp"
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
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfShoppingBasketCheckIn02: TheIconSelfPack = {
  name: 'ShoppingBasketCheckIn02',
  StrokeRounded: IconShoppingBasketCheckIn02StrokeRounded,
  DuotoneRounded: IconShoppingBasketCheckIn02DuotoneRounded,
  TwotoneRounded: IconShoppingBasketCheckIn02TwotoneRounded,
  SolidRounded: IconShoppingBasketCheckIn02SolidRounded,
  BulkRounded: IconShoppingBasketCheckIn02BulkRounded,
  StrokeSharp: IconShoppingBasketCheckIn02StrokeSharp,
  SolidSharp: IconShoppingBasketCheckIn02SolidSharp,
};