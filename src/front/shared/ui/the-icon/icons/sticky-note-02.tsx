import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M16.5956 20.6989L14.1508 21.3462C11.8879 21.9453 10.7564 22.2448 9.86986 21.7542C8.98333 21.2636 8.68795 20.1744 8.09718 17.996L6.63512 12.6048C6.04436 10.4264 5.74898 9.33725 6.26846 8.4744C6.78794 7.61155 7.91941 7.312 10.1824 6.7129L14.1827 5.65384C16.4457 5.05474 17.5771 4.75519 18.4637 5.2458C19.3502 5.73642 19.6456 6.82561 20.2363 9.00398L21.7042 14.4166C21.9554 15.343 22.0811 15.8062 21.943 16.2417M16.5956 20.6989C17.3477 20.4998 17.3537 20.4966 17.9386 19.9948L20.6824 17.6404C21.4308 16.9983 21.805 16.6772 21.943 16.2417M16.5956 20.6989C16.5956 20.6989 17.1837 16.1058 18.5 15.5C19.9932 14.8128 21.943 16.2417 21.943 16.2417',
  d2: 'M17 5.00118C16.9356 3.92779 16.7573 3.2521 16.2484 2.76762C15.4689 2.02553 14.218 2.02184 11.716 2.01444L7.29321 2.00137C4.79129 1.99398 3.54033 1.99028 2.76535 2.72777C1.99037 3.46526 1.99402 4.65592 2.00132 7.03725L2.01938 12.9307C2.02668 15.3121 2.03033 16.5027 2.80984 17.2448C3.58935 17.9869 4.84031 17.9906 7.34224 17.998L8.02306 18',
  d3: 'M18.5 15.5C19.9932 14.8128 21.943 16.2417 21.943 16.2417C21.805 16.6772 21.4308 16.9983 20.6824 17.6404L17.9386 19.9948C17.3538 20.4966 17.3477 20.4998 16.5956 20.6989C16.5956 20.6989 17.1837 16.1058 18.5 15.5Z',
  d4: 'M11.716 2.01444L7.29321 2.00137C4.79129 1.99398 3.54033 1.99028 2.76535 2.72777C1.99037 3.46526 1.99402 4.65592 2.00132 7.03725L2.01938 12.9307C2.02668 15.3121 2.03032 16.5027 2.80984 17.2448C3.58935 17.9869 4.84031 17.9906 7.34224 17.998L8.02306 18L8.07706 17.9218L6.63512 12.6048C6.04436 10.4264 5.74898 9.33725 6.26846 8.4744C6.78794 7.61155 7.91941 7.312 10.1824 6.7129L14.1827 5.65384C15.3964 5.33251 16.2847 5.09736 16.9842 5.02407L17 5.00118C16.9356 3.92779 16.7573 3.2521 16.2484 2.76762C15.4689 2.02553 14.218 2.02184 11.716 2.01444Z',
  d5: 'M16.8865 6.22918C16.3057 6.30522 15.552 6.50305 14.4264 6.80151L10.5372 7.83271C9.41141 8.13119 8.65892 8.3327 8.11776 8.5541C7.59916 8.76627 7.41583 8.94285 7.31606 9.10882C7.2199 9.26877 7.15516 9.49398 7.2211 10.0146C7.29104 10.5668 7.4833 11.2854 7.77795 12.3735L9.19941 17.6228C9.49402 18.7108 9.69062 19.4284 9.90921 19.9415C10.1151 20.4249 10.2863 20.5914 10.4553 20.6851C10.6302 20.782 10.8816 20.8436 11.4377 20.7708C12.0185 20.6947 12.7721 20.4969 13.8978 20.1984L15.6585 19.7316C15.6637 19.7007 15.6691 19.669 15.6747 19.6364C15.751 19.1921 15.8674 18.5879 16.0271 17.9594C16.1851 17.338 16.3941 16.6574 16.6645 16.0761C16.907 15.5545 17.3062 14.8681 17.9685 14.5628C18.8648 14.1497 19.8015 14.276 20.5107 14.4954L19.1248 9.3771C18.8301 8.2891 18.6335 7.57155 18.415 7.05843C18.209 6.575 18.0378 6.40851 17.8689 6.31488C17.694 6.21795 17.4426 6.15637 16.8865 6.22918ZM20.2416 16.4655C20.2378 16.4639 20.2339 16.4623 20.2301 16.4608C19.6457 16.2252 19.133 16.1698 18.7815 16.3319C18.7853 16.3301 18.784 16.3314 18.7778 16.3374C18.7488 16.3659 18.6126 16.4993 18.4271 16.8983C18.2303 17.3214 18.0565 17.8695 17.9115 18.4398C17.9082 18.4527 17.905 18.4656 17.9017 18.4785L19.8637 16.7925C20.0108 16.6661 20.1353 16.5589 20.2416 16.4655ZM16.6344 4.29823C17.3938 4.1988 18.1234 4.23024 18.8104 4.61102C19.5034 4.9951 19.9067 5.59772 20.2034 6.29425C20.4815 6.9469 20.7117 7.79725 20.9836 8.80164L22.44 14.18C22.5523 14.5946 22.6558 14.9764 22.7083 15.3071C22.7665 15.6729 22.7779 16.0571 22.6492 16.4637C22.5212 16.868 22.2919 17.1771 22.0368 17.4459C21.8036 17.6916 21.4983 17.9539 21.1623 18.2426L18.4623 20.5628C18.4462 20.5766 18.4302 20.5904 18.4142 20.6042C18.1791 20.8066 17.9546 21 17.6887 21.1396C17.4239 21.2786 17.1367 21.3545 16.8343 21.4344C16.8137 21.4398 16.793 21.4452 16.7723 21.4507L14.333 22.0975C13.2862 22.3751 12.4102 22.6074 11.6898 22.7017C10.9303 22.8011 10.2008 22.7697 9.51376 22.3889C8.82078 22.0048 8.41744 21.4022 8.12072 20.7057C7.84269 20.053 7.61247 19.2027 7.34054 18.1983L5.88341 12.8172C5.61145 11.813 5.38113 10.9626 5.2921 10.2596C5.19712 9.50971 5.24132 8.78458 5.65021 8.10438C6.0555 7.4302 6.67471 7.04088 7.38243 6.75134C8.05422 6.4765 8.93023 6.24426 9.97686 5.9668C9.99768 5.96128 10.0186 5.95574 10.0395 5.95019L13.9912 4.90243C15.038 4.62484 15.9139 4.39256 16.6344 4.29823Z',
  d6: 'M11.7699 1.26461C12.9769 1.26816 13.9548 1.27103 14.7254 1.37188C15.525 1.47653 16.2129 1.69842 16.7655 2.22442C17.4938 2.91774 17.6821 3.84936 17.7486 4.95626C17.769 5.29757 17.5561 5.60953 17.2308 5.71478L8.03387 7.9805C7.08083 8.21529 6.60431 8.33268 6.39138 8.70303C6.17845 9.07337 6.31674 9.54425 6.59332 10.486L8.76121 17.8678C8.80043 18.0867 8.74043 18.3118 8.59743 18.4822C8.45443 18.6526 8.24318 18.7507 8.02074 18.75L7.28813 18.7478C6.08118 18.7443 5.10327 18.7414 4.33271 18.6406C3.53304 18.5359 2.84514 18.314 2.29262 17.788C1.73495 17.2572 1.49489 16.5879 1.38261 15.8096C1.27578 15.069 1.27293 14.132 1.26946 12.989L1.25105 6.98343C1.24752 5.84055 1.24463 4.90351 1.34695 4.16337C1.45445 3.38577 1.69071 2.71502 2.24823 2.18447C2.80045 1.65897 3.48966 1.44096 4.28851 1.34105C5.05861 1.24474 6.03657 1.24765 7.24336 1.25124L11.7699 1.26461Z',
  d7: 'M7.71046 16.6196L13.3625 15.8194L14.112 21.494M19.8988 5L21.998 20.893L14.1789 22L7.28093 16.6804L5.99805 6.96796L19.8988 5Z',
  d8: 'M16.9987 5.00139L16.998 2L2 2.01491V19.0002H10.0217',
  d9: 'M20.3237 4.44821C20.5303 4.60532 20.6656 4.83861 20.6996 5.09618L22.7405 20.571C22.8104 21.1006 22.4411 21.5877 21.913 21.6625L14.3111 22.7404C14.0518 22.7772 13.7885 22.7076 13.5811 22.5473L6.87486 17.3677C6.67144 17.2106 6.53838 16.9792 6.50474 16.7242L5.2575 7.26736C5.18765 6.73775 5.55692 6.25067 6.08506 6.17579L19.5995 4.25962C19.8564 4.2232 20.1171 4.2911 20.3237 4.44821ZM7.31131 7.96871L8.30391 15.4948L13.2449 14.7943C13.5017 14.7579 13.7625 14.8258 13.9691 14.9829C14.1757 15.14 14.311 15.3733 14.345 15.6308L15.0102 20.6745L20.6867 19.8696L18.9004 6.32552L7.31131 7.96871ZM12.9024 19.5639L12.5458 16.8602L9.8894 17.2368L12.9024 19.5639Z',
  d10: 'M17.529 1.46935C17.6698 1.60999 17.749 1.80083 17.749 1.99984L17.7497 5.00123L6.38727 7.28556L7.41393 16.1833L11.0227 19.7502H2.00098C1.58676 19.7502 1.25098 19.4144 1.25098 19.0002V2.01491C1.25098 1.60099 1.58631 1.26532 2.00023 1.26491L16.9983 1.25C17.1973 1.2498 17.3882 1.32871 17.529 1.46935Z',
};

export const IconStickyNote02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sticky-note-02-stroke-rounded IconStickyNote02StrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconStickyNote02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sticky-note-02-duotone-rounded IconStickyNote02DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconStickyNote02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sticky-note-02-twotone-rounded IconStickyNote02TwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconStickyNote02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sticky-note-02-solid-rounded IconStickyNote02SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const IconStickyNote02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sticky-note-02-bulk-rounded IconStickyNote02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconStickyNote02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sticky-note-02-stroke-sharp IconStickyNote02StrokeSharp"
    >
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconStickyNote02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sticky-note-02-solid-sharp IconStickyNote02SolidSharp"
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
    </TheIconWrapper>
  );
};

export const iconPackOfStickyNote02: TheIconSelfPack = {
  name: 'StickyNote02',
  StrokeRounded: IconStickyNote02StrokeRounded,
  DuotoneRounded: IconStickyNote02DuotoneRounded,
  TwotoneRounded: IconStickyNote02TwotoneRounded,
  SolidRounded: IconStickyNote02SolidRounded,
  BulkRounded: IconStickyNote02BulkRounded,
  StrokeSharp: IconStickyNote02StrokeSharp,
  SolidSharp: IconStickyNote02SolidSharp,
};