import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M8 16L16.7201 15.2733C19.4486 15.046 20.0611 14.45 20.3635 11.7289L21 6',
  d2: 'M6 6H8M22 6H18.5',
  d3: 'M10.5 3L13.5 6M13.5 6L16.5 9M13.5 6L10.5 9M13.5 6L16.5 3',
  d4: 'M8 20L15 20',
  d5: 'M2 2H2.966C3.91068 2 4.73414 2.62459 4.96326 3.51493L7.93852 15.0765C8.08887 15.6608 7.9602 16.2797 7.58824 16.7616L6.63213 18',
  d6: 'M14.7632 15.5H8L5.5 6H18.8941C19.9947 6 20.545 6 20.8321 6.39507C21.1192 6.79013 20.9998 7.38311 20.761 8.56908C19.9697 12.5 21.5 15 14.7632 15.5Z',
  d7: 'M2 1C1.44772 1 1 1.44772 1 2C1 2.55228 1.44772 3 2 3L2.966 3C3.47229 3 3.88381 3.33282 3.99481 3.76415L6.97007 15.3257C7.04276 15.6082 6.98213 15.9102 6.79668 16.1505L6.1384 17.0031C6.09253 17.0011 6.04639 17 6 17C4.34315 17 3 18.3431 3 20C3 21.6569 4.34315 23 6 23C7.30622 23 8.41746 22.1652 8.82929 21H14.1707C14.5825 22.1652 15.6938 23 17 23C18.6569 23 20 21.6569 20 20C20 18.3431 18.6569 17 17 17C15.6938 17 14.5825 17.8348 14.1707 19H8.82929C8.66671 18.54 8.39513 18.1315 8.04559 17.8055L8.37979 17.3727C8.48358 17.2382 8.57487 17.0965 8.65326 16.949L16.8032 16.2699C18.1572 16.157 19.3351 15.9448 20.1489 15.153C20.9628 14.3613 21.2074 13.1897 21.3574 11.8393L21.8951 7H22C22.5523 7 23 6.55228 23 6C23 5.44772 22.5523 5 22 5H21.0124L20.9972 4.99991L20.9853 5L19 5C18.4477 5 18 5.44772 18 6C18 6.55228 18.4477 7 19 7H19.8828L19.3696 11.6184C19.2173 12.9892 19.0044 13.4762 18.7543 13.7195C18.5042 13.9628 18.0116 14.1622 16.6371 14.2768L8.92904 14.9191C8.92219 14.8884 8.91483 14.8578 8.90696 14.8273L6.89269 7H7.5C8.05228 7 8.5 6.55228 8.5 6C8.5 5.44772 8.05228 5 7.5 5H6.37801L5.93171 3.26571C5.58447 1.91637 4.34908 1 2.966 1L2 1ZM11.2071 2.29289C10.8166 1.90237 10.1834 1.90237 9.79289 2.29289C9.40237 2.68342 9.40237 3.31658 9.79289 3.70711L12.0858 6L9.79289 8.29289C9.40237 8.68342 9.40237 9.31658 9.79289 9.70711C10.1834 10.0976 10.8166 10.0976 11.2071 9.70711L13.5 7.41421L15.7929 9.70711C16.1834 10.0976 16.8166 10.0976 17.2071 9.70711C17.5976 9.31658 17.5976 8.68342 17.2071 8.29289L14.9142 6L17.2071 3.70711C17.5976 3.31658 17.5976 2.68342 17.2071 2.29289C16.8166 1.90237 16.1834 1.90237 15.7929 2.29289L13.5 4.58579L11.2071 2.29289ZM6 19C5.44772 19 5 19.4477 5 20C5 20.5523 5.44772 21 6 21C6.55228 21 7 20.5523 7 20C7 19.4477 6.55228 19 6 19ZM17 21C16.4477 21 16 20.5523 16 20C16 19.4477 16.4477 19 17 19C17.5523 19 18 19.4477 18 20C18 20.5523 17.5523 21 17 21Z',
  d8: 'M2 1C1.44772 1 1 1.44772 1 2C1 2.55228 1.44772 3 2 3L2.966 3C3.47229 3 3.88381 3.33282 3.99481 3.76415L6.97007 15.3257C7.04276 15.6082 6.98213 15.9102 6.79668 16.1505L6.1384 17.0031C6.09253 17.0011 6.04639 17 6 17C4.34315 17 3 18.3431 3 20C3 21.6569 4.34315 23 6 23C7.30622 23 8.41746 22.1652 8.82929 21H14.1707C14.5825 22.1652 15.6938 23 17 23C18.6569 23 20 21.6569 20 20C20 18.3431 18.6569 17 17 17C15.6938 17 14.5825 17.8348 14.1707 19H8.82929C8.66671 18.54 8.39513 18.1315 8.04559 17.8055L8.37979 17.3727C8.48358 17.2382 8.57487 17.0965 8.65326 16.949L16.8032 16.2699C18.1572 16.157 19.3351 15.9448 20.1489 15.153C20.9628 14.3613 21.2074 13.1897 21.3574 11.8393L21.8951 7H22C22.5523 7 23 6.55228 23 6C23 5.44772 22.5523 5 22 5H21.0124L20.9972 4.99991L20.9853 5L19 5C18.4477 5 18 5.44772 18 6C18 6.55228 18.4477 7 19 7H19.8828L19.3696 11.6184C19.2173 12.9892 19.0044 13.4762 18.7543 13.7195C18.5042 13.9628 18.0116 14.1622 16.6371 14.2768L8.92904 14.9191C8.92219 14.8884 8.91483 14.8578 8.90696 14.8273L6.89269 7H7.5C8.05228 7 8.5 6.55228 8.5 6C8.5 5.44772 8.05228 5 7.5 5H6.37801L5.93171 3.26571C5.58447 1.91637 4.34908 1 2.966 1L2 1ZM6 19C5.44772 19 5 19.4477 5 20C5 20.5523 5.44772 21 6 21C6.55228 21 7 20.5523 7 20C7 19.4477 6.55228 19 6 19ZM17 21C16.4477 21 16 20.5523 16 20C16 19.4477 16.4477 19 17 19C17.5523 19 18 19.4477 18 20C18 20.5523 17.5523 21 17 21Z',
  d9: 'M9.79289 2.29289C10.1834 1.90237 10.8166 1.90237 11.2071 2.29289L13.5 4.58579L15.7929 2.29289C16.1834 1.90237 16.8166 1.90237 17.2071 2.29289C17.5976 2.68342 17.5976 3.31658 17.2071 3.70711L14.9142 6L17.2071 8.29289C17.5976 8.68342 17.5976 9.31658 17.2071 9.70711C16.8166 10.0976 16.1834 10.0976 15.7929 9.70711L13.5 7.41421L11.2071 9.70711C10.8166 10.0976 10.1834 10.0976 9.79289 9.70711C9.40237 9.31658 9.40237 8.68342 9.79289 8.29289L12.0858 6L9.79289 3.70711C9.40237 3.31658 9.40237 2.68342 9.79289 2.29289Z',
  d10: 'M8 16L18.5 14.5L20 6',
  d11: 'M6 6H8M22 6H18',
  d12: 'M2 2H5L8 16L6.63213 18',
  d13: 'M10 3L13 6M13 6L16 9M13 6L10 9M13 6L16 3',
  d14: 'M11.5859 4.95711L9.29297 2.66421L10.7072 1.25L13.0001 3.54289L15.293 1.25L16.7072 2.66421L14.4143 4.95711L16.7072 7.25L15.293 8.66421L13.0001 6.37132L10.7072 8.66421L9.29297 7.25L11.5859 4.95711Z',
  d15: 'M5 1.25H2V3.25H4.19158L6.93225 16.0398L5.80672 17.6855L7.45754 18.8145L8.68096 17.0257L18.3961 15.6379C18.8241 15.5767 19.1644 15.2475 19.2395 14.8217L20.5757 7.25H22V5.25H18V7.25H18.5448L17.3959 13.7604L8.75378 14.995L7.09413 7.25H8V5.25H6.66556L5.9778 2.04047C5.879 1.5794 5.47154 1.25 5 1.25Z',
  d16: 'M6 17.25C4.48122 17.25 3.25 18.4812 3.25 20C3.25 21.5188 4.48122 22.75 6 22.75C7.16599 22.75 8.1625 22.0243 8.56253 21H14.4375C14.8375 22.0243 15.834 22.75 17 22.75C18.5188 22.75 19.75 21.5188 19.75 20C19.75 18.4812 18.5188 17.25 17 17.25C15.834 17.25 14.8375 17.9757 14.4375 19H8.56253C8.1625 17.9757 7.16599 17.25 6 17.25ZM5.08333 20C5.08333 19.4937 5.49374 19.0833 6 19.0833C6.50626 19.0833 6.91667 19.4937 6.91667 20C6.91667 20.5063 6.50626 20.9167 6 20.9167C5.49374 20.9167 5.08333 20.5063 5.08333 20ZM16.0833 20C16.0833 19.4937 16.4937 19.0833 17 19.0833C17.5063 19.0833 17.9167 19.4937 17.9167 20C17.9167 20.5063 17.5063 20.9167 17 20.9167C16.4937 20.9167 16.0833 20.5063 16.0833 20Z',
};

export const IconShoppingCartRemove02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="shopping-cart-remove-02-stroke-rounded IconShoppingCartRemove02StrokeRounded"
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
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <circle 
        cx="6" 
        cy="20" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="17" 
        cy="20" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconShoppingCartRemove02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="shopping-cart-remove-02-duotone-rounded IconShoppingCartRemove02DuotoneRounded"
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
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <circle 
        cx="6" 
        cy="20" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="17" 
        cy="20" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconShoppingCartRemove02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="shopping-cart-remove-02-twotone-rounded IconShoppingCartRemove02TwotoneRounded"
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
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <circle 
        cx="6" 
        cy="20" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="17" 
        cy="20" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconShoppingCartRemove02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="shopping-cart-remove-02-solid-rounded IconShoppingCartRemove02SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconShoppingCartRemove02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="shopping-cart-remove-02-bulk-rounded IconShoppingCartRemove02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconShoppingCartRemove02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="shopping-cart-remove-02-stroke-sharp IconShoppingCartRemove02StrokeSharp"
    >
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <circle 
        cx="6" 
        cy="20" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="17" 
        cy="20" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconShoppingCartRemove02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="shopping-cart-remove-02-solid-sharp IconShoppingCartRemove02SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
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

export const iconPackOfShoppingCartRemove02: TheIconSelfPack = {
  name: 'ShoppingCartRemove02',
  StrokeRounded: IconShoppingCartRemove02StrokeRounded,
  DuotoneRounded: IconShoppingCartRemove02DuotoneRounded,
  TwotoneRounded: IconShoppingCartRemove02TwotoneRounded,
  SolidRounded: IconShoppingCartRemove02SolidRounded,
  BulkRounded: IconShoppingCartRemove02BulkRounded,
  StrokeSharp: IconShoppingCartRemove02StrokeSharp,
  SolidSharp: IconShoppingCartRemove02SolidSharp,
};