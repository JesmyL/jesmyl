import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3 22V19.5C3 17.4317 3.34533 17 5 17H17C18.6547 17 19 17.4317 19 19.5V22H3Z',
  d2: 'M2 22H22',
  d3: 'M17.5125 6C15.9698 4 18.3389 3 19 2C19.6611 3 22.0302 4 20.4875 6H17.5125Z',
  d4: 'M17.5 6L17 17M17 22H21L20.5 6',
  d5: 'M11.0006 8C12.984 10.25 16.9992 11 16.9992 17H5C5 11 9.01516 10.25 10.9986 8',
  d6: 'M17 17L17.5 6H20.5L21 22H19V19.5C19 17.4317 18.6547 17 17 17Z',
  d7: 'M16.9992 17C16.9992 11 13 8.5 11.0006 8C9 8.5 5 11 5 17H16.9992Z',
  d8: 'M17 22H21L20.5 6M17.5 6L17 17M19 2C18.3389 3 15.9698 4 17.5125 6H20.4875C22.0302 4 19.6611 3 19 2Z',
  d9: 'M2.79385 17.8896C3.33014 17.3223 4.18081 17.25 5 17.25H17C17.8192 17.25 18.6699 17.3223 19.2062 17.8896C19.4615 18.1596 19.5891 18.4853 19.6589 18.8213C19.7285 19.1568 19.75 19.5517 19.75 20V22.1154C19.75 22.4659 19.4142 22.75 19 22.75H3C2.58579 22.75 2.25 22.4659 2.25 22.1154V20C2.25 19.5517 2.27145 19.1568 2.34113 18.8213C2.41091 18.4853 2.53853 18.1596 2.79385 17.8896Z',
  d10: 'M19 1.25C19.2518 1.24999 19.4868 1.37633 19.6256 1.58637C19.7289 1.74256 19.9533 1.95553 20.2657 2.24073C20.5406 2.49151 20.8864 2.80699 21.1641 3.16694C21.4584 3.54857 21.7244 4.0395 21.7483 4.64216C21.7725 5.25375 21.5432 5.8593 21.0814 6.45807C20.9394 6.64217 20.72 6.75 20.4875 6.75H17.5125C17.28 6.75 17.0606 6.64217 16.9186 6.45806C16.4568 5.85929 16.2275 5.25374 16.2517 4.64215C16.2756 4.0395 16.5416 3.54856 16.836 3.16694C17.1136 2.80701 17.4594 2.49154 17.7343 2.24077L17.7343 2.24077C18.0467 1.95556 18.2711 1.74258 18.3743 1.5864C18.5132 1.37636 18.7482 1.25001 19 1.25Z',
  d11: 'M18.2492 6.03407C18.268 5.62028 17.9478 5.2696 17.5341 5.25079C17.1203 5.23198 16.7696 5.55217 16.7508 5.96596L16.5693 9.95898C16.5505 10.3728 16.8707 10.7235 17.2844 10.7423C17.6982 10.7611 18.0489 10.4409 18.0677 10.0271L18.2492 6.03407Z',
  d12: 'M21.2496 5.97659C21.2367 5.56258 20.8906 5.23744 20.4766 5.25038C20.0626 5.26332 19.7374 5.60943 19.7504 6.02344L20.2262 21.25H2C1.58579 21.25 1.25 21.5858 1.25 22C1.25 22.4142 1.58579 22.75 2 22.75H16.9952L17 22.75H21L21.0048 22.75H22C22.4142 22.75 22.75 22.4142 22.75 22C22.75 21.5858 22.4142 21.25 22 21.25H21.7269L21.2496 5.97659Z',
  d13: 'M4.31808 15.6737C4.29859 15.8566 4.4518 16.0098 4.63562 16.0045C4.76766 16.0006 4.89029 16 5.00046 16H17.0005C17.1104 16 17.2328 16.0006 17.3645 16.0044C17.5483 16.0098 17.7015 15.8565 17.682 15.6737C17.424 13.2521 16.4556 11.7133 15.2674 10.5564C14.6453 9.95071 13.9683 9.45545 13.361 9.01117C12.6994 8.5261 11.9983 7.99711 11.5637 7.50406C11.4153 7.3357 11.2081 7.2498 11.0001 7.25C10.792 7.2498 10.5848 7.3357 10.4364 7.50406C10.0018 7.99711 9.30071 8.5261 8.6391 9.01117C8.03181 9.45545 7.35483 9.95071 6.73276 10.5564C5.54456 11.7133 4.57615 13.2521 4.31808 15.6737Z',
  d14: 'M20.4766 5.25038C20.8906 5.23744 21.2367 5.56258 21.2496 5.97659L21.7269 21.25H20.2262L19.7504 6.02344C19.7374 5.60943 20.0626 5.26332 20.4766 5.25038Z',
  d15: 'M2 21.25C1.58579 21.25 1.25 21.5858 1.25 22C1.25 22.4142 1.58579 22.75 2 22.75H22C22.4142 22.75 22.75 22.4142 22.75 22C22.75 21.5858 22.4142 21.25 22 21.25H2Z',
  d16: 'M3 22V17H19V22H3Z',
  d17: 'M1 22H23',
  d18: 'M16.9992 17C16.9992 11 12.984 10.25 11.0006 8C9.01719 10.25 5 11 5 17H16.9992Z',
  d19: 'M2.25 18C2.25 17.5858 2.58579 17.25 3 17.25H19C19.4142 17.25 19.75 17.5858 19.75 18V21.25H23V22.75H1V21.25H2.25V18Z',
  d20: 'M4.2876 16H17.7116C17.5087 13.3888 16.5076 11.7644 15.2669 10.5564C14.6448 9.95071 13.9678 9.45544 13.3605 9.01116L13.2181 8.90686C12.5565 8.4218 11.9978 7.9971 11.5632 7.50405C11.4208 7.34253 11.2159 7.25 11.0006 7.25C10.7853 7.25 10.5804 7.34253 10.438 7.50405C10.0034 7.99706 9.44466 8.42174 8.78286 8.9068L8.63998 9.01138C8.03262 9.45557 7.35556 9.95075 6.7334 10.5563C5.49221 11.7643 4.49061 13.3887 4.2876 16Z',
  d21: 'M16.7398 6.20837C16.398 5.69109 16.2309 5.16886 16.2517 4.64215C16.2756 4.0395 16.5416 3.54856 16.836 3.16694C17.1136 2.80701 17.4594 2.49154 17.7343 2.24077L17.7661 2.21173C18.0785 1.92652 18.2711 1.74258 18.3743 1.5864C18.5132 1.37636 18.7482 1.25001 19 1.25C19.2518 1.24999 19.4868 1.37634 19.6256 1.58637C19.7289 1.74257 19.9215 1.92652 20.2339 2.21172L20.2657 2.24074C20.5406 2.49151 20.8864 2.807 21.1641 3.16694C21.4584 3.54857 21.7244 4.0395 21.7483 4.64216C21.7692 5.17044 21.601 5.69423 21.2571 6.21302L21.7497 21.9765C21.7561 22.1794 21.6799 22.3762 21.5386 22.5219C21.3974 22.6677 21.2031 22.75 21.0001 22.75H16.2501V21.25H20.2263L19.7732 6.75H18.2168L17.9716 12.1435C17.5803 11.3566 17.0982 10.6857 16.563 10.099L16.7398 6.20837Z',
};

export const IconTheProphetsMosqueStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="the-prophets-mosque-stroke-rounded IconTheProphetsMosqueStrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconTheProphetsMosqueDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="the-prophets-mosque-duotone-rounded IconTheProphetsMosqueDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTheProphetsMosqueTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="the-prophets-mosque-twotone-rounded IconTheProphetsMosqueTwotoneRounded"
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
        opacity="var(--icon-opacity)" 
        d={d.d8} 
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
    </TheIconWrapper>
  );
};

export const IconTheProphetsMosqueSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="the-prophets-mosque-solid-rounded IconTheProphetsMosqueSolidRounded"
    >
      <path 
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
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconTheProphetsMosqueBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="the-prophets-mosque-bulk-rounded IconTheProphetsMosqueBulkRounded"
    >
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      </g>
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconTheProphetsMosqueStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="the-prophets-mosque-stroke-sharp IconTheProphetsMosqueStrokeSharp"
    >
      <path 
        d={d.d16} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d17} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d18} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTheProphetsMosqueSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="the-prophets-mosque-solid-sharp IconTheProphetsMosqueSolidSharp"
    >
      <path 
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
    </TheIconWrapper>
  );
};

export const iconPackOfTheProphetsMosque: TheIconSelfPack = {
  name: 'TheProphetsMosque',
  StrokeRounded: IconTheProphetsMosqueStrokeRounded,
  DuotoneRounded: IconTheProphetsMosqueDuotoneRounded,
  TwotoneRounded: IconTheProphetsMosqueTwotoneRounded,
  SolidRounded: IconTheProphetsMosqueSolidRounded,
  BulkRounded: IconTheProphetsMosqueBulkRounded,
  StrokeSharp: IconTheProphetsMosqueStrokeSharp,
  SolidSharp: IconTheProphetsMosqueSolidSharp,
};