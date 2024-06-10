import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 22L14.6667 22C16.84 22 17.9267 22 18.7918 21.6689C20.1148 21.1627 21.1601 20.1207 21.6679 18.8019C22 17.9395 22 16.8562 22 14.6897C22 13.5534 22 12.9853 21.8834 12.4566C21.7056 11.6499 21.3294 10.9 20.7888 10.2742C20.4344 9.86398 19.9785 9.52311 19.0667 8.84137L15.0487 5.83738C14.4314 5.3758 13.5789 5.38907 12.9763 5.86965C12.1888 6.49772 12.1237 7.66877 12.8369 8.3797L14.4623 10L4.5 10C3.67157 10 3 10.6716 3 11.5C3 12.3284 3.67157 13 4.5 13L8 13M8 13L8 14C8 15.1046 8.89543 16 10 16M8 13L11 13M10 16L11 16M10 16L9 16L9 17C9 18.1046 9.89543 19 11 19M11 19L12 19M11 19L10 19L10.2215 20.3288C10.3822 21.2932 11.2166 22 12.1943 22L13 22',
  d2: 'M2 4.5L8 4.5M2 4.5C2 3.79977 3.9943 2.49153 4.5 2M2 4.5C2 5.20023 3.9943 6.50847 4.5 7',
  d3: 'M19.0667 8.84137L15.0487 5.83738C14.4314 5.3758 13.5789 5.38907 12.9763 5.86965C12.1888 6.49772 12.1237 7.66877 12.8369 8.3797L14.4623 10L4.5 10C3.67157 10 3 10.6716 3 11.5C3 12.3284 3.67157 13 4.5 13L8.5 13L8.21115 13.5777C8.07229 13.8554 7.98266 14.166 8.05504 14.4679C8.26572 15.3468 9.05657 16 10 16C9.44771 16 9 16.4477 9 17C9 18.1046 9.89543 19 11 19C10.4765 19 10.0783 19.47 10.1644 19.9864L10.2215 20.3288C10.3822 21.2932 11.2166 22 12.1943 22L14.6667 22C16.84 22 17.9267 22 18.7918 21.6689C20.1148 21.1627 21.1601 20.1207 21.6679 18.8019C22 17.9395 22 16.8562 22 14.6897C22 13.5534 22 12.9853 21.8834 12.4566C21.7056 11.6499 21.3294 10.9 20.7888 10.2742C20.4344 9.86398 19.9785 9.52311 19.0667 8.84137Z',
  d4: 'M11.2363 12.8947C11.2363 13.1314 11.0477 13.3233 10.815 13.3233H7.765C7.61034 13.3233 7.53302 13.3233 7.45328 13.3826C7.37354 13.442 7.35698 13.4973 7.32385 13.608C7.2782 13.7605 7.25619 13.9153 7.24998 14.0014C7.24998 14.6424 7.46931 15.2322 7.83703 15.6999C7.90755 15.7895 7.94282 15.8344 8.00489 15.8645C8.06697 15.8947 8.13237 15.8947 8.26317 15.8947H10.815C11.0477 15.8947 11.2363 16.0866 11.2363 16.3233C11.2363 16.56 11.0477 16.7518 10.815 16.7518H8.84998C8.5604 16.7518 8.41561 16.7518 8.32614 16.8521C8.23668 16.9524 8.25187 17.0852 8.28226 17.3509C8.38068 18.2111 8.69699 18.771 9.13252 19.1822C9.20214 19.248 9.23697 19.2808 9.29034 19.3021C9.34371 19.3233 9.39821 19.3233 9.50719 19.3233H11.9383C12.1709 19.3233 12.3595 19.5151 12.3595 19.7518C12.3595 19.9885 12.1709 20.1804 11.9383 20.1804H10.0361C9.74406 20.1804 9.59802 20.1804 9.50795 20.2924C9.41789 20.4043 9.44508 20.5283 9.49946 20.7762C9.7622 21.9738 10.8088 22.7514 12 22.7514H14.6927C15.7573 22.7514 16.5921 22.7514 17.2674 22.7085C17.9542 22.6649 18.5269 22.5747 19.0599 22.3708C20.5808 21.7888 21.7834 20.5905 22.3678 19.0728C22.5726 18.5408 22.6631 17.9691 22.7069 17.284C22.75 16.6106 22.75 15.7783 22.75 14.7171C22.7501 13.6699 22.7502 12.9058 22.6158 12.2965C22.4111 11.3681 21.9782 10.5052 21.3563 9.78529C20.9482 9.3128 20.4311 8.92629 19.5904 8.29789L15.0806 5.0298C15.0022 4.97318 14.9197 4.92523 14.8344 4.88593C14.6106 4.80846 14.3782 4.7645 14.1447 4.75391C13.8434 4.76993 13.5462 4.87913 13.2976 5.08079C12.6096 5.6391 12.553 6.67917 13.1757 7.31083L15.0015 9.1626C15.1223 9.28507 15.1586 9.46951 15.0934 9.62982C15.0283 9.79013 14.8746 9.89469 14.7041 9.89469L3.53571 9.89469C2.82563 9.89469 2.25 10.4703 2.25 11.1804C2.25 11.8905 2.82563 12.4661 3.53571 12.4661L10.815 12.4661C11.0477 12.4661 11.2363 12.658 11.2363 12.8947Z',
  d5: 'M8.25004 5.50586C8.80232 5.50586 9.25004 5.05814 9.25004 4.50586C9.25004 3.95357 8.80232 3.50586 8.25004 3.50586L5.75 3.50586L5.75002 2.9116C5.75014 2.73596 5.7503 2.52031 5.72823 2.34387L5.72781 2.34053C5.71204 2.21408 5.64021 1.63804 5.07461 1.36368C4.50779 1.08872 4.00765 1.39065 3.89944 1.45597L3.43095 1.79511C3.05513 2.08975 2.54067 2.49545 2.14966 2.87588C1.95455 3.06571 1.75332 3.28297 1.59447 3.51388C1.45326 3.71914 1.25 4.06933 1.25 4.5C1.25 4.93067 1.45326 5.28086 1.59447 5.48612C1.75331 5.71703 1.95455 5.93429 2.14966 6.12412C2.54067 6.50455 3.05512 6.91025 3.43095 7.20488L3.89944 7.54403C4.00765 7.60935 4.50779 7.91128 5.07461 7.63632C5.64021 7.36196 5.71204 6.78592 5.72781 6.65947L5.72823 6.65613C5.7503 6.47969 5.75014 6.26403 5.75002 6.0884L5.75 5.50586L8.25004 5.50586Z',
  d6: 'M12.4211 15.8182H10.5C10.3247 15.8182 10.1564 15.7881 10 15.7328M12.9737 18.9091H11.5C11.3247 18.9091 11.1564 18.879 11 18.8237M9 12.7273H11.4211M9 12.7273V14.3182C9 14.9713 9.4174 15.5269 10 15.7328M9 12.7273L3.57895 12.7273C2.70692 12.7273 2 12.0353 2 11.1818C2 10.3283 2.70692 9.63636 3.57895 9.63636L14.0655 9.63636L12.3546 7.96696C11.6039 7.23449 11.6724 6.02795 12.5014 5.38085C13.1357 4.88571 14.033 4.87204 14.6829 5.3476L22 9.63636V19C22 20.6569 20.6569 22 19 22H12.5C11.6716 22 11 21.3284 11 20.5V18.8237M10 15.7328L10 17.4091C10 18.0622 10.4174 18.6178 11 18.8237',
  d7: 'M8 4.5L2.71519 4.5M4.5 2L2 4.5L4.5 7',
  d8: 'M11.2759 20.0296L13.0847 20.0364V19.2419H11.443C11.2926 19.2419 11.149 19.2157 11.0159 19.1677C10.5178 18.9884 10.1619 18.5044 10.1619 17.9367V16.5215L12.469 16.5283V15.7338H10.329C10.1786 15.7338 10.035 15.7076 9.90195 15.6597C9.40385 15.4803 9.04793 14.9963 9.04793 14.4286V13.0202H11.3551V12.2257L2.69162 12.2257C1.89543 12.2257 1.25 11.5803 1.25 10.7841C1.25 9.98794 1.89543 9.3425 2.69162 9.3425H15.2589L12.6673 6.93585C12.001 6.27342 12.0602 5.1853 12.7985 4.59815C13.3675 4.14562 14.1751 4.13291 14.7585 4.56785L14.7745 4.57978L22.75 9.3425V19.7423C22.75 21.4034 21.4283 22.75 19.7979 22.75H12.557C11.8495 22.75 11.2759 22.1656 11.2759 21.4448V20.0296Z',
  d9: 'M4.45711 1.25L1.25 4.45711L4.45711 7.66421L5.87132 6.25L5.07843 5.45711L8.66421 5.45711V3.45711L5.07843 3.45711L5.87132 2.66421L4.45711 1.25Z',
};

export const IconPointingLeft07StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pointing-left-07-stroke-rounded IconPointingLeft07StrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconPointingLeft07DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pointing-left-07-duotone-rounded IconPointingLeft07DuotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconPointingLeft07TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pointing-left-07-twotone-rounded IconPointingLeft07TwotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconPointingLeft07SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pointing-left-07-solid-rounded IconPointingLeft07SolidRounded"
    >
      <path 
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

export const IconPointingLeft07BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pointing-left-07-bulk-rounded IconPointingLeft07BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconPointingLeft07StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pointing-left-07-stroke-sharp IconPointingLeft07StrokeSharp"
    >
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconPointingLeft07SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pointing-left-07-solid-sharp IconPointingLeft07SolidSharp"
    >
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
    </TheIconWrapper>
  );
};

export const iconPackOfPointingLeft07: TheIconSelfPack = {
  name: 'PointingLeft07',
  StrokeRounded: IconPointingLeft07StrokeRounded,
  DuotoneRounded: IconPointingLeft07DuotoneRounded,
  TwotoneRounded: IconPointingLeft07TwotoneRounded,
  SolidRounded: IconPointingLeft07SolidRounded,
  BulkRounded: IconPointingLeft07BulkRounded,
  StrokeSharp: IconPointingLeft07StrokeSharp,
  SolidSharp: IconPointingLeft07SolidSharp,
};