import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M4 3H8.42109C9.35119 3 9.81624 3 9.94012 3.28013C10.064 3.56026 9.74755 3.89632 9.11466 4.56842L5.47691 8.43158C4.84402 9.10368 4.52757 9.43974 4.65145 9.71987C4.77533 10 5.24038 10 6.17048 10H10',
  d2: 'M4 21L6.10557 16.3053C6.49585 15.4351 6.69098 15 7 15C7.30902 15 7.50415 15.4351 7.89443 16.3053L10 21',
  d3: 'M17.5 20V4M17.5 20C16.7998 20 15.4915 18.0057 15 17.5M17.5 20C18.2002 20 19.5085 18.0057 20 17.5',
  d4: 'M15.5939 16.2718C15.7703 16.2497 15.986 16.2499 16.1616 16.25L16.75 16.25V4C16.75 3.44772 17.1977 3 17.75 3C18.3023 3 18.75 3.44772 18.75 4V16.25L19.3384 16.25C19.514 16.2499 19.7297 16.2497 19.9061 16.2718L19.9095 16.2722C20.0359 16.288 20.612 16.3598 20.8863 16.9254C21.1613 17.4922 20.8593 17.9924 20.794 18.1006L20.4549 18.5691C20.1602 18.9449 19.7546 19.4593 19.3741 19.8503C19.1843 20.0454 18.967 20.2467 18.7361 20.4055C18.5309 20.5467 18.1807 20.75 17.75 20.75C17.3193 20.75 16.9691 20.5467 16.7639 20.4055C16.533 20.2467 16.3157 20.0454 16.1259 19.8503C15.7454 19.4593 15.3397 18.9449 15.0451 18.569L14.706 18.1006C14.6407 17.9924 14.3387 17.4922 14.6137 16.9254C14.888 16.3598 15.4641 16.288 15.5905 16.2722L15.5939 16.2718Z',
  d5: 'M8.27634 4.00002H4C3.44772 4.00002 3 3.55231 3 3.00002C3 2.44774 3.44772 2.00002 4 2.00002H8.42109C8.44138 2.00002 8.46167 2.00002 8.48197 2.00001C8.8935 1.9999 9.30354 1.99979 9.62274 2.04486C9.92453 2.08747 10.566 2.223 10.8547 2.87572C11.1464 3.53531 10.8053 4.10202 10.6293 4.35241C10.4445 4.61529 10.1643 4.91268 9.88479 5.2093C9.87075 5.2242 9.85671 5.2391 9.84269 5.25399L6.31523 9.00002H10C10.5523 9.00002 11 9.44774 11 10C11 10.5523 10.5523 11 10 11H6.17048C6.1502 11 6.12991 11 6.10962 11C5.69808 11.0001 5.28803 11.0003 4.96883 10.9552C4.66705 10.9126 4.02552 10.777 3.73688 10.1243C3.4452 9.46473 3.78629 8.89802 3.96231 8.64763C4.14712 8.38475 4.42731 8.08736 4.70678 7.79075C4.72082 7.77585 4.73486 7.76095 4.74888 7.74605L8.27634 4.00002Z',
  d6: 'M7.00025 16.7546L9.08781 21.4092C9.31382 21.9131 9.90555 22.1384 10.4095 21.9124C10.9134 21.6864 11.1387 21.0947 10.9127 20.5908L8.80711 15.896C8.7988 15.8775 8.7905 15.859 8.78221 15.8405C8.60901 15.4541 8.43822 15.073 8.26459 14.7957C8.10345 14.5383 7.71745 14 7.00025 14C6.28305 14 5.89705 14.5383 5.73591 14.7957C5.56228 15.073 5.39148 15.4541 5.21828 15.8405C5.20999 15.859 5.20169 15.8775 5.19339 15.896L3.08781 20.5908C2.86181 21.0947 3.0871 21.6864 3.59102 21.9124C4.09495 22.1384 4.68667 21.9131 4.91268 21.4092L7.00025 16.7546Z',
  d7: 'M4 3H9.5V3.5L4.5 9.5V10H10',
  d8: 'M4 21L6.5 14H7.5L10 21',
  d9: 'M17 4V19.3392M14 17L17 20L20 17',
  d10: 'M7.72303 4H3.94141V2H10.4414V3.86205L6.15978 9H9.94141V11H3.44141V9.13795L7.72303 4Z',
  d11: 'M5.73702 13.6637H8.14646L10.8835 21.3274L9 22L6.94174 16.2369L4.88348 22L3 21.3274L5.73702 13.6637Z',
  d12: 'M18.2939 4V16.1716L19.5868 14.8787L21.001 16.2929L17.2939 20L13.5868 16.2929L15.001 14.8787L16.2939 16.1716V4H18.2939Z',
};

export const IconSortingZA01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SortingZA01 StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconSortingZA01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SortingZA01 DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconSortingZA01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SortingZA01 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconSortingZA01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SortingZA01 SolidRounded"
    >
      <path 
        d={d.d4}
        i-c="f"
      />
      <path 
        d={d.d5}
        i-c="c f fr"
      />
      <path 
        d={d.d6}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconSortingZA01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SortingZA01 BulkRounded"
    >
      <path 
        d={d.d4}
        i-c="f"
      />
      <path 
        d={d.d5}
        i-c="c f fr o7"
      />
      <path 
        d={d.d6}
        i-c="c f fr o7"
      />
    </TheIconWrapper>
  );
};

export const IconSortingZA01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SortingZA01 StrokeSharp"
    >
      <path 
        d={d.d7}
        i-c="s sw"
      />
      <path 
        d={d.d8}
        i-c="s sw"
      />
      <path 
        d={d.d9}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconSortingZA01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SortingZA01 SolidSharp"
    >
      <path 
        d={d.d10}
        i-c="c f fr"
      />
      <path 
        d={d.d11}
        i-c="c f fr"
      />
      <path 
        d={d.d12}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfSortingZA01: TheIconSelfPack = [
  'SortingZA01',
  IconSortingZA01StrokeRounded,
  IconSortingZA01DuotoneRounded,
  IconSortingZA01TwotoneRounded,
  IconSortingZA01SolidRounded,
  IconSortingZA01BulkRounded,
  IconSortingZA01StrokeSharp,
  IconSortingZA01SolidSharp,
];