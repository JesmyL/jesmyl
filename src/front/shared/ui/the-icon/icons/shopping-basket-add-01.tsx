import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M21.0524 11.5L21.3307 9.83981C21.5126 8.75428 21.6036 8.21152 21.3123 7.85576C21.0209 7.5 20.4854 7.5 19.4144 7.5H4.58564C3.51461 7.5 2.9791 7.5 2.68773 7.85576C2.39637 8.21152 2.48735 8.75428 2.66933 9.83981L3.87289 17.0194C4.27181 19.3991 4.47127 20.5889 5.28565 21.2945C6.10003 22 7.27396 22 9.62182 22H12',
  d2: 'M14 18H22M18 22L18 14',
  d3: 'M17.5 7.5C17.5 4.46243 15.0376 2 12 2C8.96243 2 6.5 4.46243 6.5 7.5',
  d4: 'M3.87289 17.0194L2.66933 9.83981C2.48735 8.75428 2.39637 8.21152 2.68773 7.85576C2.9791 7.5 3.51461 7.5 4.58564 7.5H19.4144C20.4854 7.5 21.0209 7.5 21.3123 7.85576C21.6036 8.21152 21.5126 8.75428 21.3307 9.83981L20.1271 17.0194C19.7282 19.3991 19.5287 20.5889 18.7143 21.2945C17.9 22 16.726 22 14.3782 22H9.62182C7.27396 22 6.10003 22 5.28565 21.2945C4.47127 20.5889 4.27181 19.3991 3.87289 17.0194Z',
  d5: 'M11.625 3.125C9.41586 3.125 7.625 4.91586 7.625 7.125V7.625C7.625 8.17728 7.17728 8.625 6.625 8.625C6.07272 8.625 5.625 8.17728 5.625 7.625V7.125C5.625 3.81129 8.31129 1.125 11.625 1.125C14.9387 1.125 17.625 3.81129 17.625 7.125V7.625C17.625 8.17728 17.1773 8.625 16.625 8.625C16.0727 8.625 15.625 8.17728 15.625 7.625V7.125C15.625 4.91586 13.8341 3.125 11.625 3.125Z',
  d6: 'M17.625 12.875C18.1773 12.875 18.625 13.3227 18.625 13.875V16.875H21.625C22.1773 16.875 22.625 17.3227 22.625 17.875C22.625 18.4273 22.1773 18.875 21.625 18.875H18.625V21.875C18.625 22.4273 18.1773 22.875 17.625 22.875C17.0727 22.875 16.625 22.4273 16.625 21.875V18.875H13.625C13.0727 18.875 12.625 18.4273 12.625 17.875C12.625 17.3227 13.0727 16.875 13.625 16.875H16.625L16.625 13.875C16.625 13.3227 17.0727 12.875 17.625 12.875Z',
  d7: 'M4.16043 6.625C3.66822 6.62494 3.21976 6.62489 2.86081 6.67737C2.46615 6.73506 2.04576 6.87305 1.73249 7.25555C1.42264 7.63388 1.36488 8.07216 1.37633 8.47066C1.38691 8.83882 1.46248 9.28939 1.54661 9.79093L2.7662 17.0661C2.95885 18.2154 3.11469 19.1451 3.32912 19.872C3.55192 20.6272 3.86182 21.2531 4.41955 21.7363C4.97955 22.2215 5.63861 22.4322 6.40842 22.5307C7.14491 22.625 8.06534 22.625 9.19649 22.625H14.0535C14.4774 22.625 14.8718 22.625 15.2379 22.6201C15.1645 22.3847 15.125 22.1345 15.125 21.875V20.375H13.625C12.2443 20.375 11.125 19.2557 11.125 17.875C11.125 16.4943 12.2443 15.375 13.625 15.375H15.125V13.875C15.125 12.4943 16.2443 11.375 17.625 11.375C19.0057 11.375 20.125 12.4943 20.125 13.875V15.375H20.7673L21.7034 9.7909C21.7875 9.28937 21.8631 8.83881 21.8737 8.47066C21.8851 8.07216 21.8273 7.63388 21.5175 7.25556C21.2042 6.87305 20.7838 6.73506 20.3892 6.67737C20.0302 6.62489 19.5818 6.62494 19.0896 6.625H4.16043Z',
  d8: 'M17.8521 6.90382C17.8521 3.93663 15.3321 1.53125 12.2234 1.53125C9.11477 1.53125 6.59473 3.93663 6.59473 6.90382',
  d9: 'M14.2695 17.619H22.4567M18.3631 21.5263V13.7117',
  d10: 'M12.1735 21.0374H5.01457L2.45564 7.47214C2.44477 7.41453 2.49297 7.36182 2.55652 7.36182H21.7992C21.8628 7.36182 21.911 7.4145 21.9001 7.4721L21.1209 11.6124',
  d11: 'M19.251 19.75V22.75H17.251L17.251 19.75H14.251V17.75H17.251L17.251 14.75H19.251V17.75H22.251V19.75H19.251Z',
  d12: 'M12.001 1.25C8.75119 1.25 6.05843 3.63491 5.57742 6.75H2.50098C2.27979 6.75 2.06987 6.84764 1.92737 7.01682C1.78486 7.186 1.7243 7.40945 1.76189 7.62743L4.36923 22.75H15.751V21.25H12.751V16.25H15.751V13.25H21.2707L22.2401 7.62743C22.2777 7.40945 22.2171 7.186 22.0746 7.01682C21.9321 6.84764 21.7222 6.75 21.501 6.75H18.4245C17.9435 3.63491 15.2508 1.25 12.001 1.25ZM12.001 3.25C9.85939 3.25 8.06721 4.74601 7.61248 6.75H16.3895C15.9347 4.74601 14.1426 3.25 12.001 3.25Z',
};

export const IconShoppingBasketAdd01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ShoppingBasketAdd01 StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconShoppingBasketAdd01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ShoppingBasketAdd01 DuotoneRounded"
    >
      <path 
        d={d.d4}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconShoppingBasketAdd01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ShoppingBasketAdd01 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sr sw"
      />
      <path 
        d={d.d3}
        i-c="o7 s sw"
      />
    </TheIconWrapper>
  );
};

export const IconShoppingBasketAdd01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ShoppingBasketAdd01 SolidRounded"
    >
      <path 
        d={d.d5}
        i-c="c f fr"
      />
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

export const IconShoppingBasketAdd01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ShoppingBasketAdd01 BulkRounded"
    >
      <path 
        d={d.d5}
        i-c="c f fr"
      />
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

export const IconShoppingBasketAdd01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ShoppingBasketAdd01 StrokeSharp"
    >
      <path 
        d={d.d8}
        i-c="s sw"
      />
      <path 
        d={d.d9}
        i-c="s sj sw"
      />
      <path 
        d={d.d10}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconShoppingBasketAdd01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ShoppingBasketAdd01 SolidSharp"
    >
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

export const iconPackOfShoppingBasketAdd01: TheIconSelfPack = [
  'ShoppingBasketAdd01',
  IconShoppingBasketAdd01StrokeRounded,
  IconShoppingBasketAdd01DuotoneRounded,
  IconShoppingBasketAdd01TwotoneRounded,
  IconShoppingBasketAdd01SolidRounded,
  IconShoppingBasketAdd01BulkRounded,
  IconShoppingBasketAdd01StrokeSharp,
  IconShoppingBasketAdd01SolidSharp,
];