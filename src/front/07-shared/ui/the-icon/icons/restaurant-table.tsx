import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M6 17C4.5 17 4.5 16 3 16L4.17111 11.9011C4.57006 10.5048 4.76954 9.80661 5.30421 9.4033C5.83888 9 6.56499 9 8.01721 9H15.9828C17.435 9 18.1611 9 18.6958 9.4033C19.2305 9.80661 19.4299 10.5048 19.8289 11.9011L21 16C19.5 16 19.5 17 18 17C16.5 17 16.5 16 15 16C13.5 16 13.5 17 12 17C10.5 17 10.5 16 9 16C7.5 16 7.5 17 6 17Z',
  d2: 'M8 9V8C8 5.79086 9.79086 4 12 4M16 9V8C16 5.79086 14.2091 4 12 4M12 4V3',
  d3: 'M12 17V21M12 21H14M12 21H10',
  d4: 'M12 16.25C12.4142 16.25 12.75 16.5858 12.75 17V20.25H14C14.4142 20.25 14.75 20.5858 14.75 21C14.75 21.4142 14.4142 21.75 14 21.75H10C9.58579 21.75 9.25 21.4142 9.25 21C9.25 20.5858 9.58579 20.25 10 20.25H11.25V17C11.25 16.5858 11.5858 16.25 12 16.25Z',
  d5: 'M16.0259 8.25C16.7153 8.24998 17.2969 8.24996 17.7707 8.30552C18.274 8.36454 18.7348 8.49329 19.1474 8.80454C19.5601 9.11579 19.8105 9.52347 20.0055 9.99119C20.1891 10.4315 20.3488 10.9907 20.5382 11.6536L20.5382 11.6536L21.7211 15.794C21.7858 16.0202 21.7405 16.2638 21.5988 16.4516C21.457 16.6395 21.2353 16.75 21 16.75C20.4771 16.75 20.2551 16.898 19.9192 17.1219L19.916 17.124C19.5037 17.3989 18.9754 17.75 18 17.75C17.0246 17.75 16.4963 17.3989 16.084 17.124L16.0808 17.1219C15.7449 16.898 15.5229 16.75 15 16.75C14.4771 16.75 14.2551 16.898 13.9192 17.1219L13.916 17.124C13.5037 17.3989 12.9754 17.75 12 17.75C11.0246 17.75 10.4963 17.3989 10.084 17.124L10.0808 17.1219C9.74495 16.898 9.52293 16.75 9.00001 16.75C8.47708 16.75 8.25507 16.898 7.91919 17.1219L7.91603 17.124C7.50368 17.3989 6.97544 17.75 6.00001 17.75C5.02457 17.75 4.49634 17.3989 4.08398 17.124L4.08082 17.1219C3.74495 16.898 3.52293 16.75 3.00001 16.75C2.76466 16.75 2.54297 16.6395 2.40124 16.4516C2.25952 16.2638 2.21421 16.0202 2.27886 15.794L3.4618 11.6537C3.65117 10.9908 3.81095 10.4315 3.99454 9.99119C4.18955 9.52347 4.43994 9.11579 4.85257 8.80454C5.2652 8.49329 5.72599 8.36454 6.22928 8.30552C6.70307 8.24996 7.28474 8.24998 7.97413 8.25H7.97417H16.0258H16.0259Z',
  d6: 'M12.75 3C12.75 2.58579 12.4142 2.25 12 2.25C11.5858 2.25 11.25 2.58579 11.25 3V3.30888C9.31142 3.61637 7.7633 5.09669 7.35547 7H16.6446C16.2367 5.09669 14.6886 3.61637 12.75 3.30888V3Z',
  d7: 'M11.25 17.6704V20.2499H10C9.58579 20.2499 9.25 20.5857 9.25 20.9999C9.25 21.4142 9.58579 21.7499 10 21.7499H14C14.4142 21.7499 14.75 21.4142 14.75 20.9999C14.75 20.5857 14.4142 20.2499 14 20.2499H12.75V17.6704C12.5328 17.7199 12.2856 17.75 12 17.75C11.7144 17.75 11.4672 17.7199 11.25 17.6704Z',
  d8: 'M6 17C4.5 17 4.5 16 3 16L5 9H19L21 16C19.5 16 19.5 17 18 17C16.5 17 16.5 16 15 16C13.5 16 13.5 17 12 17C10.5 17 10.5 16 9 16C7.5 16 7.5 17 6 17Z',
  d9: 'M12.75 16.25V20.25H14.75V21.75H9.25V20.25H11.25V16.25H12.75Z',
  d10: 'M21.9943 16.75H21C20.4771 16.75 20.2551 16.898 19.9192 17.1219L19.9161 17.124C19.5037 17.3989 18.9755 17.75 18 17.75C17.0246 17.75 16.4964 17.3989 16.084 17.124L16.0809 17.1219C15.745 16.898 15.523 16.75 15 16.75C14.4771 16.75 14.2551 16.898 13.9192 17.1219L13.9161 17.124C13.5037 17.3989 12.9755 17.75 12 17.75C11.0246 17.75 10.4964 17.3989 10.084 17.124L10.0809 17.1219C9.74498 16.898 9.52296 16.75 9.00003 16.75C8.47711 16.75 8.25509 16.898 7.91922 17.1219L7.91606 17.124C7.50371 17.3989 6.97547 17.75 6.00003 17.75C5.0246 17.75 4.49636 17.3989 4.08401 17.124L4.08085 17.1219C3.74498 16.898 3.52296 16.75 3.00003 16.75H2.00574L4.43431 8.25H19.5658L21.9943 16.75Z',
  d11: 'M16.6452 7C16.2374 5.09668 14.6892 3.61637 12.7506 3.30888V2.25H11.2506V3.30888C9.31203 3.61637 7.76391 5.09668 7.35608 7H16.6452Z',
};

export const IconRestaurantTableStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="restaurant-table-stroke-rounded IconRestaurantTableStrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconRestaurantTableDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="restaurant-table-duotone-rounded IconRestaurantTableDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
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
    </TheIconWrapper>
  );
};

export const IconRestaurantTableTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="restaurant-table-twotone-rounded IconRestaurantTableTwotoneRounded"
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
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconRestaurantTableSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="restaurant-table-solid-rounded IconRestaurantTableSolidRounded"
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
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconRestaurantTableBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="restaurant-table-bulk-rounded IconRestaurantTableBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
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

export const IconRestaurantTableStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="restaurant-table-stroke-sharp IconRestaurantTableStrokeSharp"
    >
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d2} 
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
    </TheIconWrapper>
  );
};

export const IconRestaurantTableSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="restaurant-table-solid-sharp IconRestaurantTableSolidSharp"
    >
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
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfRestaurantTable: TheIconSelfPack = {
  name: 'RestaurantTable',
  StrokeRounded: IconRestaurantTableStrokeRounded,
  DuotoneRounded: IconRestaurantTableDuotoneRounded,
  TwotoneRounded: IconRestaurantTableTwotoneRounded,
  SolidRounded: IconRestaurantTableSolidRounded,
  BulkRounded: IconRestaurantTableBulkRounded,
  StrokeSharp: IconRestaurantTableStrokeSharp,
  SolidSharp: IconRestaurantTableSolidSharp,
};