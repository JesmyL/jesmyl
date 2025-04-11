import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M13 6H8.5C6.01472 6 4 8.01472 4 10.5C4 12.9853 6.01472 15 8.5 15H20',
  d2: 'M17 12C17 12 20 14.2095 20 15C20 15.7906 17 18 17 18',
  d3: 'M16.9687 12.0062C17.5768 12.5922 19.9671 14.1442 19.9736 14.9854C19.9801 15.8266 17.6133 17.4175 17.0147 18.0128M19.4863 14.9835L8.74282 15.0527C7.96211 15.0829 6.32856 15.0367 5.00138 13.3706C4.01404 12.1854 2.93668 9.22638 5.93174 6.83713C6.33658 6.50463 7.36408 5.91699 9.56839 6.03778L12.9399 6.0166',
  d4: 'M14 6C14 5.44772 13.5523 5 13 5H8.5C5.46243 5 3 7.46243 3 10.5C3 13.5376 5.46243 16 8.5 16L16 16L16 18C16 18.3772 16.2122 18.7223 16.5489 18.8925C16.8855 19.0626 17.2893 19.0289 17.593 18.8052L17.6038 18.7972L17.6313 18.7768C17.6548 18.7592 17.6888 18.7338 17.7316 18.7015C17.8172 18.6368 17.9386 18.5442 18.084 18.4308C18.3736 18.2048 18.7631 17.8923 19.1556 17.5516C19.5431 17.2151 19.9564 16.8314 20.2806 16.4644C20.4417 16.2821 20.6021 16.0803 20.7275 15.8722C20.8364 15.6915 21 15.3773 21 15C21 14.6227 20.8364 14.3085 20.7275 14.1279C20.6021 13.9198 20.4418 13.718 20.2806 13.5356C19.9564 13.1686 19.5431 12.7849 19.1556 12.4485C18.7632 12.1077 18.3736 11.7953 18.084 11.5692C17.9387 11.4558 17.8173 11.3632 17.7316 11.2985C17.6888 11.2662 17.6549 11.2408 17.6313 11.2232L17.6039 11.2028L17.5963 11.1972L17.5932 11.1949C17.2895 10.9712 16.8856 10.9374 16.5489 11.1075C16.2123 11.2777 16 11.6228 16 12L16 14H8.5C6.567 14 5 12.433 5 10.5C5 8.567 6.567 7 8.5 7H13C13.5523 7 14 6.55228 14 6Z',
  d5: 'M14 6C14 5.44772 13.5523 5 13 5H8.49998C5.46242 5 2.99998 7.46243 2.99998 10.5C2.99998 13.5376 5.46242 16 8.49998 16L16 16L16 14H8.49998C6.56699 14 4.99998 12.433 4.99998 10.5C4.99998 8.567 6.56699 7 8.49998 7H13C13.5523 7 14 6.55228 14 6Z',
  d6: 'M16.5489 11.1075C16.2123 11.2776 16 11.6227 16 12L16 18C16 18.3772 16.2122 18.7223 16.5489 18.8924C16.8855 19.0626 17.2893 19.0288 17.593 18.8052L17.6038 18.7972L17.6313 18.7768C17.6548 18.7592 17.6888 18.7338 17.7316 18.7014C17.8172 18.6368 17.9386 18.5442 18.084 18.4307C18.3736 18.2047 18.7631 17.8923 19.1556 17.5515C19.5431 17.2151 19.9564 16.8314 20.2806 16.4644C20.4417 16.282 20.6021 16.0802 20.7275 15.8721C20.8364 15.6915 21 15.3773 21 15C21 14.6227 20.8364 14.3085 20.7275 14.1278C20.6021 13.9197 20.4418 13.7179 20.2806 13.5356C19.9564 13.1686 19.5431 12.7849 19.1556 12.4484C18.7632 12.1077 18.3736 11.7952 18.084 11.5692C17.9387 11.4558 17.8173 11.3631 17.7316 11.2985C17.6888 11.2661 17.6549 11.2407 17.6313 11.2232L17.6039 11.2028L17.5963 11.1972L17.5932 11.1949C17.2895 10.9712 16.8856 10.9373 16.5489 11.1075Z',
  d7: 'M15.9476 9.86828L20 14.238L15.9476 18.5016M13.0748 5.49854H8.05922C5.81737 5.49854 4 7.45494 4 9.86828C4 12.2816 5.81737 14.238 8.05922 14.238H19.6064',
  d8: 'M8.5 6.5H13V4.5H8.5C5.46243 4.5 3 6.96243 3 10C3 13.0376 5.46243 15.5 8.5 15.5L15.5859 15.5V19.5L21.0001 14.5L15.586 9.49997V13.5L8.5 13.5C6.567 13.5 5 11.933 5 10C5 8.067 6.567 6.5 8.5 6.5Z',
};

export const IconArrowTurnForwardStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ArrowTurnForward StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconArrowTurnForwardDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ArrowTurnForward DuotoneRounded"
    >
      <path 
        d={d.d3}
        i-c="o4 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconArrowTurnForwardTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ArrowTurnForward TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconArrowTurnForwardSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ArrowTurnForward SolidRounded"
    >
      <path 
        d={d.d4}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconArrowTurnForwardBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ArrowTurnForward BulkRounded"
    >
      <path 
        d={d.d5}
        i-c="f o7"
      />
      <path 
        d={d.d6}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconArrowTurnForwardStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ArrowTurnForward StrokeSharp"
    >
      <path 
        d={d.d7}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconArrowTurnForwardSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ArrowTurnForward SolidSharp"
    >
      <path 
        d={d.d8}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfArrowTurnForward: TheIconSelfPack = [
  'ArrowTurnForward',
  IconArrowTurnForwardStrokeRounded,
  IconArrowTurnForwardDuotoneRounded,
  IconArrowTurnForwardTwotoneRounded,
  IconArrowTurnForwardSolidRounded,
  IconArrowTurnForwardBulkRounded,
  IconArrowTurnForwardStrokeSharp,
  IconArrowTurnForwardSolidSharp,
];