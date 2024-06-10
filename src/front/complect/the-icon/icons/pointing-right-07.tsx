import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 22L9.33333 22C7.15998 22 6.07331 22 5.20816 21.6689C3.88524 21.1627 2.83992 20.1207 2.3321 18.8019C2 17.9395 2 16.8562 2 14.6897C2 13.5534 2 12.9853 2.11658 12.4566C2.29445 11.6499 2.67059 10.9 3.21121 10.2742C3.56557 9.86398 4.02149 9.52311 4.93333 8.84137L8.95125 5.83738C9.56862 5.3758 10.4211 5.38907 11.0237 5.86965C11.8112 6.49772 11.8763 7.66877 11.1631 8.3797L9.53773 10L19.5 10C20.3284 10 21 10.6716 21 11.5C21 12.3284 20.3284 13 19.5 13L16 13M16 13L16 14C16 15.1046 15.1046 16 14 16M16 13L13 13M14 16L13 16M14 16L15 16L15 17C15 18.1046 14.1046 19 13 19M13 19L12 19M13 19L14 19L13.7785 20.3288C13.6178 21.2932 12.7834 22 11.8057 22L11 22',
  d2: 'M22 4.5L16 4.5M22 4.5C22 3.79977 20.0057 2.49153 19.5 2M22 4.5C22 5.20023 20.0057 6.50847 19.5 7',
  d3: 'M4.93333 8.84137L8.95125 5.83738C9.56862 5.3758 10.4211 5.38907 11.0237 5.86965C11.8112 6.49772 11.8763 7.66877 11.1631 8.3797L9.53773 10L19.5 10C20.3284 10 21 10.6716 21 11.5C21 12.3284 20.3284 13 19.5 13L15.5 13L15.7889 13.5777C15.9277 13.8554 16.0173 14.166 15.945 14.4679C15.7343 15.3468 14.9434 16 14 16C14.5523 16 15 16.4477 15 17C15 18.1046 14.1046 19 13 19C13.5235 19 13.9217 19.47 13.8356 19.9864L13.7785 20.3288C13.6178 21.2932 12.7834 22 11.8057 22L9.33333 22C7.15998 22 6.0733 22 5.20816 21.6689C3.88523 21.1627 2.83992 20.1207 2.3321 18.8019C2 17.9395 2 16.8562 2 14.6896C2 13.5534 2 12.9853 2.11658 12.4566C2.29445 11.6499 2.67059 10.9 3.21121 10.2742C3.56557 9.86398 4.02149 9.52311 4.93333 8.84137Z',
  d4: 'M12.7637 12.8947C12.7637 13.1314 12.9523 13.3233 13.185 13.3233H16.235C16.3896 13.3233 16.467 13.3233 16.5467 13.3826C16.6264 13.442 16.643 13.4973 16.6761 13.608C16.7218 13.7605 16.7438 13.9153 16.75 14.0014C16.75 14.6424 16.5307 15.2322 16.163 15.6999C16.0924 15.7895 16.0572 15.8344 15.9951 15.8645C15.933 15.8947 15.8676 15.8947 15.7368 15.8947H13.185C12.9523 15.8947 12.7637 16.0866 12.7637 16.3233C12.7637 16.56 12.9523 16.7518 13.185 16.7518H15.15C15.4396 16.7518 15.5844 16.7518 15.6738 16.8521C15.7633 16.9524 15.7481 17.0852 15.7177 17.3509C15.6193 18.2111 15.303 18.771 14.8675 19.1822C14.7978 19.248 14.763 19.2808 14.7096 19.3021C14.6563 19.3233 14.6018 19.3233 14.4928 19.3233H12.0617C11.829 19.3233 11.6404 19.5151 11.6404 19.7518C11.6404 19.9885 11.829 20.1804 12.0617 20.1804H13.9638C14.2559 20.1804 14.402 20.1804 14.492 20.2924C14.5821 20.4043 14.5549 20.5283 14.5005 20.7762C14.2378 21.9738 13.1912 22.7514 12 22.7514H9.30733C8.24265 22.7514 7.4079 22.7514 6.73263 22.7085C6.04576 22.6649 5.47304 22.5747 4.94013 22.3708C3.41921 21.7888 2.21661 20.5905 1.6322 19.0728C1.42734 18.5408 1.33684 17.9691 1.29305 17.284C1.25 16.6106 1.25 15.7783 1.25001 14.7171C1.24989 13.6699 1.24982 12.9058 1.38418 12.2965C1.58889 11.3681 2.02176 10.5052 2.64366 9.78529C3.05182 9.3128 3.56891 8.92629 4.40958 8.29789L8.91935 5.0298C8.99779 4.97318 9.0803 4.92523 9.16562 4.88593C9.38934 4.80846 9.62175 4.7645 9.85526 4.75391C10.1566 4.76993 10.4538 4.87913 10.7023 5.08079C11.3904 5.6391 11.447 6.67917 10.8242 7.31083L8.99845 9.1626C8.8777 9.28507 8.84142 9.46951 8.90654 9.62982C8.97166 9.79013 9.12534 9.89469 9.29584 9.89469L20.4643 9.89469C21.1744 9.89469 21.75 10.4703 21.75 11.1804C21.75 11.8905 21.1744 12.4661 20.4643 12.4661L13.185 12.4661C12.9523 12.4661 12.7637 12.658 12.7637 12.8947Z',
  d5: 'M15.75 5.50586C15.1977 5.50586 14.75 5.05814 14.75 4.50586C14.75 3.95357 15.1977 3.50586 15.75 3.50586L18.25 3.50586L18.25 2.9116C18.2499 2.73596 18.2497 2.52031 18.2718 2.34387L18.2722 2.34053C18.288 2.21408 18.3598 1.63804 18.9254 1.36368C19.4923 1.08872 19.9924 1.39065 20.1006 1.45597L20.5691 1.79511C20.9449 2.08975 21.4594 2.49545 21.8504 2.87588C22.0455 3.06571 22.2467 3.28297 22.4056 3.51388C22.5468 3.71914 22.75 4.06933 22.75 4.5C22.75 4.93067 22.5468 5.28086 22.4056 5.48612C22.2467 5.71703 22.0455 5.93429 21.8504 6.12412C21.4594 6.50455 20.9449 6.91025 20.5691 7.20488L20.1006 7.54403C19.9924 7.60935 19.4922 7.91128 18.9254 7.63632C18.3598 7.36196 18.288 6.78592 18.2722 6.65947L18.2718 6.65613C18.2497 6.47969 18.2499 6.26403 18.25 6.0884L18.25 5.50586L15.75 5.50586Z',
  d6: 'M11.5789 15.8182H13.5C13.6753 15.8182 13.8436 15.7881 14 15.7328M11.0263 18.9091H12.5C12.6753 18.9091 12.8436 18.879 13 18.8237M15 12.7273H12.5789M15 12.7273V14.3182C15 14.9713 14.5826 15.5269 14 15.7328M15 12.7273L20.4211 12.7273C21.2931 12.7273 22 12.0353 22 11.1818C22 10.3283 21.2931 9.63636 20.4211 9.63636L9.93445 9.63636L11.6454 7.96696C12.3961 7.23449 12.3276 6.02795 11.4986 5.38085C10.8643 4.88571 9.96697 4.87204 9.31711 5.3476L2 9.63636V19C2 20.6569 3.34315 22 5 22H11.5C12.3284 22 13 21.3284 13 20.5V18.8237M14 15.7328V17.4091C14 18.0622 13.5826 18.6178 13 18.8237',
  d7: 'M16 4.5L21.3594 4.5M19.5 2L22 4.5L19.5 7',
  d8: 'M12.7241 20.0296L10.9153 20.0364V19.2419H12.557C12.7074 19.2419 12.851 19.2157 12.9841 19.1677C13.4822 18.9884 13.8381 18.5044 13.8381 17.9367V16.5215L11.531 16.5283V15.7338H13.671C13.8214 15.7338 13.965 15.7076 14.098 15.6597C14.5961 15.4803 14.9521 14.9963 14.9521 14.4286V13.0202H12.6449V12.2257L21.3084 12.2257C22.1046 12.2257 22.75 11.5803 22.75 10.7841C22.75 9.98794 22.1046 9.3425 21.3084 9.3425H8.7411L11.3327 6.93585C11.999 6.27342 11.9398 5.1853 11.2015 4.59815C10.6325 4.14562 9.82491 4.13291 9.24154 4.56785L9.22554 4.57978L1.25 9.3425V19.7423C1.25 21.4034 2.57169 22.75 4.20207 22.75H11.443C12.1505 22.75 12.7241 22.1656 12.7241 21.4448V20.0296Z',
  d9: 'M19.543 1.25L22.7502 4.45711L19.543 7.66421L18.1288 6.25L18.9217 5.45711L15.3359 5.45711V3.45711L18.9217 3.45711L18.1288 2.66421L19.543 1.25Z',
};

export const IconPointingRight07StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pointing-right-07-stroke-rounded IconPointingRight07StrokeRounded"
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

export const IconPointingRight07DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pointing-right-07-duotone-rounded IconPointingRight07DuotoneRounded"
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

export const IconPointingRight07TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pointing-right-07-twotone-rounded IconPointingRight07TwotoneRounded"
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

export const IconPointingRight07SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pointing-right-07-solid-rounded IconPointingRight07SolidRounded"
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

export const IconPointingRight07BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pointing-right-07-bulk-rounded IconPointingRight07BulkRounded"
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

export const IconPointingRight07StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pointing-right-07-stroke-sharp IconPointingRight07StrokeSharp"
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

export const IconPointingRight07SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pointing-right-07-solid-sharp IconPointingRight07SolidSharp"
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

export const iconPackOfPointingRight07: TheIconSelfPack = {
  name: 'PointingRight07',
  StrokeRounded: IconPointingRight07StrokeRounded,
  DuotoneRounded: IconPointingRight07DuotoneRounded,
  TwotoneRounded: IconPointingRight07TwotoneRounded,
  SolidRounded: IconPointingRight07SolidRounded,
  BulkRounded: IconPointingRight07BulkRounded,
  StrokeSharp: IconPointingRight07StrokeSharp,
  SolidSharp: IconPointingRight07SolidSharp,
};