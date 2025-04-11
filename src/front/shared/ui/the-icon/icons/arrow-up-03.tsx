import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M18 4L6 4',
  d2: 'M12 8V20',
  d3: 'M16 12C16 12 13.054 8.00001 12 8C10.9459 7.99999 8 12 8 12',
  d4: 'M12 8V20M12 8C13.0541 8.00001 16 12 16 12M12 8C10.946 7.99999 8 12 8 12',
  d5: 'M11.9995 8L11.9995 20M8 12L11.0203 8.66777C11.8273 7.77741 12.1727 7.77741 12.9797 8.66777L16 12',
  d6: 'M19 4C19 4.55228 18.5523 5 18 5L6 5C5.44771 5 5 4.55228 5 4C5 3.44771 5.44771 3 6 3L18 3C18.5523 3 19 3.44772 19 4Z',
  d7: 'M8.80529 12.593C8.47783 13.0376 7.8519 13.1327 7.40718 12.8053C6.96243 12.4778 6.86734 11.8519 7.19478 11.4071L7.19772 11.4031L7.20489 11.3934L7.23149 11.3576C7.25451 11.3267 7.28795 11.282 7.33061 11.2255C7.4159 11.1126 7.53829 10.9521 7.68825 10.7599C7.98735 10.3765 8.39996 9.86196 8.84912 9.34448C9.29398 8.83198 9.79436 8.2937 10.2674 7.87568C10.5027 7.66768 10.7549 7.46829 11.0083 7.31549C11.2343 7.17922 11.5888 7 11.9991 7C12.4094 7 12.7639 7.1792 12.9899 7.31543C13.2434 7.46821 13.4956 7.66756 13.731 7.87554C14.2042 8.29353 14.7048 8.83178 15.1499 9.34427C15.5993 9.86172 16.0121 10.3763 16.3114 10.7596C16.4615 10.9518 16.5839 11.1123 16.6693 11.2253C16.7119 11.2818 16.7454 11.3264 16.7684 11.3573L16.795 11.3931L16.8022 11.4028L16.8048 11.4064C17.1324 11.851 17.0378 12.4775 16.5932 12.8051C16.1486 13.1326 15.5226 13.0378 15.195 12.5932L15.1936 12.5913L15.1881 12.5838L15.165 12.5527C15.1443 12.525 15.1135 12.4838 15.0735 12.4309C14.9936 12.3251 14.8776 12.1731 14.7349 11.9903C14.4487 11.6237 14.0589 11.1382 13.6399 10.6557C13.426 10.4094 13.2095 10.1698 12.9991 9.95005V20C12.9991 20.5523 12.5514 21 11.9991 21C11.4468 21 10.9991 20.5523 10.9991 20V9.95067C10.7891 10.1702 10.573 10.4095 10.3595 10.6555C9.94067 11.138 9.55115 11.6235 9.26513 11.9901C9.12253 12.1729 9.0066 12.3249 8.92672 12.4307C8.8868 12.4836 8.85594 12.5248 8.83531 12.5525L8.8122 12.5836L8.80669 12.5911L8.80529 12.593Z',
  d8: 'M12 20L12 8.36901M16 12L12 8L8 12',
  d9: 'M6 3L18 3L18 5L6 5L6 3Z',
  d10: 'M12 6.58594L16.7072 11.293L15.293 12.7072L13.0001 10.4144V20.0002H11.0001V10.4143L8.70719 12.7073L7.29297 11.293L12 6.58594Z',
};

export const IconArrowUp03StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ArrowUp03 StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
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

export const IconArrowUp03DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ArrowUp03 DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sr sw"
      />
      <path 
        d={d.d4}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconArrowUp03TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ArrowUp03 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sr sw"
      />
      <path 
        d={d.d5}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconArrowUp03SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ArrowUp03 SolidRounded"
    >
      <path 
        d={d.d6}
        i-c="c f fr"
      />
      <path 
        d={d.d7}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconArrowUp03BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ArrowUp03 BulkRounded"
    >
      <path 
        d={d.d6}
        i-c="c f fr"
      />
      <path 
        d={d.d7}
        i-c="f o7"
      />
    </TheIconWrapper>
  );
};

export const IconArrowUp03StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ArrowUp03 StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d8}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconArrowUp03SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ArrowUp03 SolidSharp"
    >
      <path 
        d={d.d9}
        i-c="c f fr"
      />
      <path 
        d={d.d10}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfArrowUp03: TheIconSelfPack = [
  'ArrowUp03',
  IconArrowUp03StrokeRounded,
  IconArrowUp03DuotoneRounded,
  IconArrowUp03TwotoneRounded,
  IconArrowUp03SolidRounded,
  IconArrowUp03BulkRounded,
  IconArrowUp03StrokeSharp,
  IconArrowUp03SolidSharp,
];