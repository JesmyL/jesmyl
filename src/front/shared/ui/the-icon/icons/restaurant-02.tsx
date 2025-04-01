import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M15 10L4 21.001',
  d2: 'M17.9999 3.00098L14.9999 6.00098C14.4547 6.54623 14.1821 6.81885 14.0363 7.11295C13.759 7.6725 13.759 8.32945 14.0363 8.88901C14.1821 9.1831 14.4547 9.45573 14.9999 10.001C15.5452 10.5462 15.8178 10.8189 16.1119 10.9646C16.6715 11.2419 17.3284 11.2419 17.888 10.9646C18.1821 10.8189 18.4547 10.5462 18.9999 10.001L21.9999 7.00098',
  d3: 'M20 4.99902L17 7.99902',
  d4: 'M8.84473 9.84571C7.47968 11.2108 5.60771 11.552 3.90145 9.84571C2.19514 8.13939 1.30058 5.03166 2.66563 3.66661C4.03069 2.30156 7.13841 3.19611 8.84473 4.90243C10.551 6.60868 10.2098 8.48065 8.84473 9.84571ZM8.84473 9.84571L20 21.001',
  d5: 'M14.9997 6.00098L17.9997 3.00098L21.9997 7.00098L18.9997 10.001C18.4544 10.5462 18.1818 10.8189 17.8877 10.9646C17.3282 11.2419 16.6712 11.2419 16.1117 10.9646C15.8176 10.8189 15.5449 10.5462 14.9997 10.001C14.4544 9.45573 14.1818 9.1831 14.0361 8.88901C13.7588 8.32945 13.7588 7.6725 14.0361 7.11295C14.1818 6.81885 14.4544 6.54623 14.9997 6.00098Z',
  d6: 'M3.90145 9.84571C5.60771 11.552 7.47968 11.2108 8.84473 9.84571C10.2098 8.48065 10.551 6.60868 8.84473 4.90243C7.13841 3.19611 4.03069 2.30156 2.66563 3.66661C1.30058 5.03166 2.19514 8.13939 3.90145 9.84571Z',
  d7: 'M15.6226 9.36023C16.0042 9.74096 16.0043 10.3583 15.6226 10.739L4.87215 21.4645C4.4905 21.8452 3.8717 21.8452 3.49002 21.4645C3.10833 21.0838 3.10831 20.4665 3.48995 20.0857L14.2404 9.36029C14.6221 8.97954 15.2409 8.97951 15.6226 9.36023Z',
  d8: 'M18.5545 2.53556C18.9362 2.9163 18.9362 3.53361 18.5545 3.91435L15.6226 6.83921C15.0339 7.42646 14.9187 7.5596 14.8655 7.66682C14.73 7.93959 14.73 8.25984 14.8655 8.53261C14.9187 8.63983 15.0339 8.77297 15.6226 9.36022C16.2113 9.94748 16.3447 10.0624 16.4522 10.1155C16.7256 10.2507 17.0467 10.2507 17.3201 10.1155C17.4276 10.0624 17.561 9.94748 18.1497 9.36022L21.0817 6.43537C21.4633 6.05462 22.0821 6.05462 22.4638 6.43537C22.8455 6.81611 22.8455 7.43342 22.4638 7.81416L19.4359 10.8349C19.0003 11.2706 18.6237 11.6473 18.188 11.8627C17.3677 12.2682 16.4046 12.2682 15.5843 11.8627C15.1486 11.6473 14.772 11.2706 14.3364 10.8349L14.1443 10.6433C13.7076 10.2088 13.33 9.83303 13.1141 9.3984C12.7076 8.58009 12.7076 7.61934 13.1141 6.80103C13.33 6.3664 13.7076 5.99066 14.1443 5.55614L17.1724 2.53556C17.5541 2.15481 18.1729 2.15481 18.5545 2.53556Z',
  d9: 'M20.5091 4.4838C20.8908 4.86454 20.8908 5.48185 20.5091 5.86259L17.5772 8.78745C17.1955 9.16819 16.5767 9.16819 16.1951 8.78745C15.8134 8.40671 15.8134 7.7894 16.1951 7.40866L19.127 4.4838C19.5087 4.10306 20.1275 4.10306 20.5091 4.4838Z',
  d10: 'M5.98998 2.40222C4.72292 2.11227 3.20469 2.16735 2.186 3.18358C1.16732 4.19981 1.11209 5.71436 1.40276 6.97836C1.70265 8.2825 2.42575 9.621 3.39379 10.5867C4.38497 11.5755 5.5166 12.0517 6.67434 11.9939C7.47581 11.9539 8.21357 11.6618 8.85602 11.2163L19.1272 21.4626C19.5088 21.8433 20.1276 21.8433 20.5093 21.4626C20.8909 21.0818 20.8909 20.4645 20.5093 20.0838L10.2381 9.83746C10.6847 9.19657 10.9776 8.46059 11.0177 7.66106C11.0757 6.50612 10.5982 5.37723 9.60706 4.38844C8.63903 3.42275 7.29728 2.70139 5.98998 2.40222Z',
  d11: 'M15.6398 9.37729C15.634 9.37122 15.6282 9.36521 15.6222 9.35926C15.6162 9.35333 15.6102 9.34749 15.6042 9.34175C15.0312 8.76974 14.9178 8.63824 14.8651 8.53212C14.7296 8.25935 14.7296 7.9391 14.8651 7.66633C14.9184 7.55911 15.0335 7.42597 15.6222 6.83872L18.5542 3.91386C18.9358 3.53312 18.9358 2.91581 18.5542 2.53507C18.1725 2.15433 17.5537 2.15433 17.172 2.53507L14.144 5.55566C13.7072 5.99017 13.3296 6.36591 13.1137 6.80055C12.7072 7.61885 12.7072 8.5796 13.1137 9.39791C13.2246 9.62122 13.3783 9.82898 13.5606 10.0372L3.48959 20.0847C3.10794 20.4655 3.10797 21.0828 3.48965 21.4635C3.87133 21.8443 4.49013 21.8442 4.87178 21.4635L14.9427 11.416C15.1516 11.5981 15.36 11.7515 15.584 11.8622C16.4042 12.2677 17.3673 12.2677 18.1876 11.8622C18.6233 11.6468 18.9999 11.2701 19.4355 10.8344L22.4634 7.81367C22.8451 7.43293 22.8451 6.81562 22.4634 6.43488C22.0818 6.05414 21.463 6.05414 21.0813 6.43488L18.1493 9.35974C17.5607 9.94699 17.4272 10.0619 17.3197 10.115C17.0463 10.2502 16.7253 10.2502 16.4518 10.115C16.3454 10.0624 16.2136 9.94929 15.6398 9.37729Z',
  d12: 'M20.5091 4.48331C20.8908 4.86405 20.8908 5.48136 20.5091 5.8621L17.5772 8.78696C17.1955 9.1677 16.5767 9.1677 16.1951 8.78696C15.8134 8.40622 15.8134 7.78891 16.1951 7.40817L19.127 4.48331C19.5087 4.10257 20.1275 4.10257 20.5091 4.48331Z',
  d13: 'M17.9999 3.00098L13.0016 8.00098L16.9999 12.001L21.9999 7.00098',
  d14: 'M16.0344 10.0797L4.12606 21.9891L2.76941 20.6325L14.6777 8.72314L16.0344 10.0797Z',
  d15: 'M18.9122 3.36662L14.1172 8.16314L16.5965 10.6434L21.3926 5.84727L22.7492 7.20386L16.5962 13.3569L11.4045 8.16309L17.5553 2.01025L18.9122 3.36662Z',
  d16: 'M20.8307 5.28384L16.5963 9.51819L15.2397 8.1616L19.4741 3.92725L20.8307 5.28384Z',
  d17: 'M5.90301 2.55749C4.65936 2.2722 3.16919 2.3264 2.16933 3.32626C1.16947 4.32612 1.11527 5.81629 1.40056 7.05994C1.69491 8.34308 2.40465 9.66003 3.3548 10.6102C4.32766 11.583 5.43837 12.0516 6.57472 11.9947C7.36138 11.9554 8.0855 11.6679 8.71608 11.2296L19.4757 21.9892L20.8323 20.6326L10.0727 9.87301C10.511 9.24243 10.7984 8.51831 10.8378 7.73165C10.8947 6.5953 10.4261 5.48459 9.45324 4.51173C8.5031 3.56158 7.18615 2.85184 5.90301 2.55749Z',
};

export const IconRestaurant02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="restaurant-02-stroke-rounded IconRestaurant02StrokeRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconRestaurant02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="restaurant-02-duotone-rounded IconRestaurant02DuotoneRounded"
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
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconRestaurant02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="restaurant-02-twotone-rounded IconRestaurant02TwotoneRounded"
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
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconRestaurant02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="restaurant-02-solid-rounded IconRestaurant02SolidRounded"
    >
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

export const IconRestaurant02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="restaurant-02-bulk-rounded IconRestaurant02BulkRounded"
    >
      <path 
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
        opacity="var(--icon-opacity)" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconRestaurant02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="restaurant-02-stroke-sharp IconRestaurant02StrokeSharp"
    >
      <path 
        d={d.d1} 
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
    </TheIconWrapper>
  );
};

export const IconRestaurant02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="restaurant-02-solid-sharp IconRestaurant02SolidSharp"
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

export const iconPackOfRestaurant02: TheIconSelfPack = {
  name: 'Restaurant02',
  StrokeRounded: IconRestaurant02StrokeRounded,
  DuotoneRounded: IconRestaurant02DuotoneRounded,
  TwotoneRounded: IconRestaurant02TwotoneRounded,
  SolidRounded: IconRestaurant02SolidRounded,
  BulkRounded: IconRestaurant02BulkRounded,
  StrokeSharp: IconRestaurant02StrokeSharp,
  SolidSharp: IconRestaurant02SolidSharp,
};