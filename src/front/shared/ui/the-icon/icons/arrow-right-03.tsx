import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M20 18L20 6',
  d2: 'M16 11.9995L4 11.9995',
  d3: 'M12 8C12 8 16 10.946 16 12C16 13.0541 12 16 12 16',
  d4: 'M16 12H4M16 12C16 10.9459 12.0001 8 12.0001 8M16 12C16 13.0541 12.0001 16 12.0001 16',
  d5: 'M16 12L4 12',
  d6: 'M20 19C19.4477 19 19 18.5523 19 18L19 6C19 5.44771 19.4477 5 20 5C20.5523 5 21 5.44772 21 6L21 18C21 18.5523 20.5523 19 20 19Z',
  d7: 'M11.407 8.80529C10.9624 8.47783 10.8673 7.8519 11.1947 7.40718C11.5222 6.96243 12.1481 6.86734 12.5929 7.19478L12.5969 7.19772L12.6066 7.20489L12.6424 7.23149C12.6733 7.25451 12.718 7.28795 12.7745 7.33061C12.8874 7.4159 13.0479 7.53829 13.2401 7.68825C13.6235 7.98735 14.138 8.39996 14.6555 8.84912C15.168 9.29398 15.7063 9.79436 16.1243 10.2674C16.3323 10.5027 16.5317 10.7549 16.6845 11.0083C16.8208 11.2343 17 11.5888 17 11.9991C17 12.4094 16.8208 12.7639 16.6846 12.9899C16.5318 13.2434 16.3324 13.4956 16.1245 13.731C15.7065 14.2042 15.1682 14.7048 14.6557 15.1499C14.1383 15.5993 13.6237 16.0121 13.2404 16.3114C13.0482 16.4615 12.8877 16.5839 12.7747 16.6693C12.7182 16.7119 12.6736 16.7454 12.6427 16.7684L12.6069 16.795L12.5972 16.8022L12.5936 16.8048C12.149 17.1324 11.5225 17.0378 11.1949 16.5932C10.8674 16.1486 10.9622 15.5226 11.4068 15.195L11.4087 15.1936L11.4162 15.1881L11.4473 15.165C11.475 15.1443 11.5162 15.1135 11.5691 15.0735C11.6749 14.9936 11.8269 14.8776 12.0097 14.7349C12.3763 14.4487 12.8618 14.0589 13.3443 13.6399C13.5906 13.426 13.8302 13.2095 14.05 12.9991L4 12.9991C3.44771 12.9991 3 12.5514 3 11.9991C3 11.4468 3.44771 10.9991 4 10.9991L14.0493 10.9991C13.8298 10.7891 13.5905 10.573 13.3445 10.3595C12.862 9.94067 12.3765 9.55115 12.0099 9.26513C11.8271 9.12253 11.6751 9.0066 11.5693 8.92672C11.5164 8.8868 11.4752 8.85594 11.4475 8.83531L11.4164 8.8122L11.4089 8.80669L11.407 8.80529Z',
  d8: 'M20.001 17.999L20.001 5.99902',
  d9: 'M4.00098 11.999L15.6354 11.999M12.001 15.999L16.001 11.999L12.001 7.99902',
  d10: 'M21.001 5.99902L21.001 17.999H19.001L19.001 5.99902H21.001Z',
  d11: 'M13.5868 10.9991L11.2939 8.70621L12.7081 7.29199L17.4152 11.9991L12.7081 16.7062L11.2939 15.292L13.5868 12.9991H4.00098V10.9991H13.5868Z',
};

export const IconArrowRight03StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ArrowRight03 StrokeRounded"
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

export const IconArrowRight03DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ArrowRight03 DuotoneRounded"
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

export const IconArrowRight03TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ArrowRight03 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sr sw"
      />
      <path 
        d={d.d5}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconArrowRight03SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ArrowRight03 SolidRounded"
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

export const IconArrowRight03BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ArrowRight03 BulkRounded"
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

export const IconArrowRight03StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ArrowRight03 StrokeSharp"
    >
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

export const IconArrowRight03SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ArrowRight03 SolidSharp"
    >
      <path 
        d={d.d10}
        i-c="c f fr"
      />
      <path 
        d={d.d11}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfArrowRight03: TheIconSelfPack = [
  'ArrowRight03',
  IconArrowRight03StrokeRounded,
  IconArrowRight03DuotoneRounded,
  IconArrowRight03TwotoneRounded,
  IconArrowRight03SolidRounded,
  IconArrowRight03BulkRounded,
  IconArrowRight03StrokeSharp,
  IconArrowRight03SolidSharp,
];