import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M13 18H21M17 22L17 14',
  d2: 'M7 7.5V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V7.5',
  d3: 'M10 22C7.71999 21.9999 6.57085 21.9917 5.76809 21.2752C4.95603 20.5505 4.75097 19.3264 4.34085 16.8781L3.17786 9.93557C2.98869 8.8063 2.89411 8.24167 3.18537 7.87083C3.47662 7.5 4.01468 7.5 5.09079 7.5H18.9092C19.9853 7.5 20.5234 7.5 20.8146 7.87083C21.1059 8.24167 21.0113 8.8063 20.8221 9.93557L20.4763 12',
  d4: 'M4.5 17.5H10',
  d5: 'M4.34085 16.8781L3.17786 9.93557C2.98869 8.8063 2.89411 8.24167 3.18537 7.87083C3.47662 7.5 4.01468 7.5 5.09079 7.5H18.9092C19.9853 7.5 20.5234 7.5 20.8146 7.87083C21.1059 8.24167 21.0113 8.8063 20.8221 9.93557L19.6591 16.8781C19.6167 17.1313 19.5765 17.3714 19.5376 17.5993H4.46242C4.42349 17.3714 4.38327 17.1313 4.34085 16.8781Z',
  d6: 'M11.875 3.125C9.66586 3.125 7.875 4.91586 7.875 7.125V7.625C7.875 8.17728 7.42728 8.625 6.875 8.625C6.32272 8.625 5.875 8.17728 5.875 7.625V7.125C5.875 3.81129 8.56129 1.125 11.875 1.125C15.1887 1.125 17.875 3.81129 17.875 7.125V7.625C17.875 8.17728 17.4273 8.625 16.875 8.625C16.3227 8.625 15.875 8.17728 15.875 7.625V7.125C15.875 4.91586 14.0841 3.125 11.875 3.125Z',
  d7: 'M16.875 12.875C17.4273 12.875 17.875 13.3227 17.875 13.875V16.875H20.875C21.4273 16.875 21.875 17.3227 21.875 17.875C21.875 18.4273 21.4273 18.875 20.875 18.875H17.875V21.875C17.875 22.4273 17.4273 22.875 16.875 22.875C16.3227 22.875 15.875 22.4273 15.875 21.875V18.875H12.875C12.3227 18.875 11.875 18.4273 11.875 17.875C11.875 17.3227 12.3227 16.875 12.875 16.875H15.875L15.875 13.875C15.875 13.3227 16.3227 12.875 16.875 12.875Z',
  d8: 'M3.60622 6.67985C3.96847 6.62488 4.42069 6.62494 4.91418 6.625H18.8358C19.3293 6.62494 19.7815 6.62488 20.1438 6.67985C20.5459 6.74089 20.9689 6.88713 21.2795 7.28259C21.5825 7.66848 21.6366 8.1121 21.6231 8.51862C21.6106 8.89781 21.5326 9.36325 21.4447 9.88736L20.6094 14.8741C20.5693 15.1134 20.5492 15.233 20.4653 15.304C20.3814 15.375 20.2602 15.375 20.0176 15.375H19.975C19.6922 15.375 19.5507 15.375 19.4629 15.2871C19.375 15.1993 19.375 15.0578 19.375 14.775V13.875C19.375 12.4943 18.2557 11.375 16.875 11.375C15.4943 11.375 14.375 12.4943 14.375 13.875V14.775C14.375 15.0578 14.375 15.1993 14.2871 15.2871C14.1993 15.375 14.0578 15.375 13.775 15.375H12.875C12.1648 15.375 11.5238 15.6711 11.0687 16.1466C10.9537 16.2667 10.8963 16.3268 10.8398 16.3509C10.7834 16.375 10.7139 16.375 10.5751 16.375H3.89991C3.65734 16.375 3.53606 16.375 3.45216 16.304C3.36826 16.233 3.34823 16.1134 3.30815 15.8741L2.30527 9.88734C2.21742 9.36322 2.13942 8.89782 2.12686 8.51862C2.1134 8.1121 2.16745 7.66848 2.47054 7.28259C2.78113 6.88713 3.20406 6.74089 3.60622 6.67985Z',
  d9: 'M10.5693 18.843C10.4663 18.5978 10.4147 18.4753 10.3393 18.4251C10.2638 18.375 10.1541 18.375 9.93457 18.375H4.45718C4.11991 18.375 3.95127 18.375 3.86121 18.4869C3.77114 18.5989 3.8065 18.7602 3.8772 19.0829C3.93428 19.3433 3.99386 19.5846 4.05849 19.8071C4.28233 20.578 4.5905 21.2161 5.14368 21.7098C5.70196 22.2081 6.36025 22.4261 7.13014 22.5279C7.86418 22.6251 8.78041 22.625 9.90298 22.625H13.847C14.0586 22.625 14.1643 22.625 14.2281 22.5928C14.2995 22.5568 14.3341 22.5206 14.3668 22.4475C14.3959 22.3824 14.3899 22.2528 14.3778 21.9936C14.3759 21.9543 14.375 21.9148 14.375 21.875V20.975C14.375 20.6922 14.375 20.5507 14.2871 20.4629C14.1993 20.375 14.0578 20.375 13.775 20.375H12.875C11.8375 20.375 10.9476 19.743 10.5693 18.843Z',
  d10: 'M10.5695 18.843C10.4665 18.5978 10.4149 18.4753 10.3395 18.4251C10.264 18.375 10.1543 18.375 9.93476 18.375H4.45738C4.1201 18.375 3.95147 18.375 3.8614 18.4869C3.77134 18.5989 3.80669 18.7602 3.8774 19.0829C3.93447 19.3433 3.99406 19.5846 4.05869 19.8071C4.28253 20.578 4.59069 21.2161 5.14388 21.7098C5.70216 22.2081 6.36045 22.4261 7.13033 22.5279C7.86438 22.6251 8.78061 22.625 9.90318 22.625H13.8472C14.0588 22.625 14.1645 22.625 14.2283 22.5928C14.2997 22.5568 14.3343 22.5206 14.3669 22.4475C14.3961 22.3824 14.3901 22.2528 14.378 21.9936C14.3761 21.9543 14.3752 21.9148 14.3752 21.875V20.975C14.3752 20.6922 14.3752 20.5507 14.2873 20.4629C14.1995 20.375 14.058 20.375 13.7752 20.375H12.8752C11.8377 20.375 10.9478 19.743 10.5695 18.843Z',
  d11: 'M17.207 6.73779C17.207 3.70022 14.7446 1.23779 11.707 1.23779C8.66946 1.23779 6.20703 3.70022 6.20703 6.73779',
  d12: 'M3.7207 17.5L10.4995 17.5',
  d13: 'M12.5 18H20.5M16.5 22V14',
  d14: 'M10.0071 21.5H4.50154L2.0015 7.11698C1.99088 7.05589 2.03797 7 2.10006 7H20.8999C20.962 7 21.0091 7.05586 20.9985 7.11694L20.0547 12.5535',
  d15: 'M19.75 19.75V22.75H17.75V19.75H14.75V17.75H17.75V14.75H19.75V17.75H22.75V19.75H19.75Z',
  d16: 'M13.25 18.5H3.13574L3.8685 22.75H16.25V21.25H13.25V18.5Z',
  d17: 'M11.5 1.25C8.25021 1.25 5.55745 3.63491 5.07645 6.75H2.00001C1.77881 6.75 1.56889 6.84764 1.42639 7.01682C1.28389 7.186 1.22333 7.40945 1.26091 7.62743L2.79066 16.5H13.25V16.25H16.25V13.25H20.7697L21.7391 7.62743C21.7767 7.40945 21.7161 7.186 21.5736 7.01682C21.4311 6.84764 21.2212 6.75 21 6.75H17.9236C17.4425 3.63491 14.7498 1.25 11.5 1.25ZM11.5 3.25C9.3584 3.25 7.56624 4.74601 7.11151 6.75H15.8885C15.4338 4.74601 13.6416 3.25 11.5 3.25Z',
};

export const IconShoppingBasketAdd02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="shopping-basket-add-02-stroke-rounded IconShoppingBasketAdd02StrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconShoppingBasketAdd02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="shopping-basket-add-02-duotone-rounded IconShoppingBasketAdd02DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconShoppingBasketAdd02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="shopping-basket-add-02-twotone-rounded IconShoppingBasketAdd02TwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconShoppingBasketAdd02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="shopping-basket-add-02-solid-rounded IconShoppingBasketAdd02SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconShoppingBasketAdd02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="shopping-basket-add-02-bulk-rounded IconShoppingBasketAdd02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconShoppingBasketAdd02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="shopping-basket-add-02-stroke-sharp IconShoppingBasketAdd02StrokeSharp"
    >
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d14} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconShoppingBasketAdd02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="shopping-basket-add-02-solid-sharp IconShoppingBasketAdd02SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfShoppingBasketAdd02: TheIconSelfPack = {
  name: 'ShoppingBasketAdd02',
  StrokeRounded: IconShoppingBasketAdd02StrokeRounded,
  DuotoneRounded: IconShoppingBasketAdd02DuotoneRounded,
  TwotoneRounded: IconShoppingBasketAdd02TwotoneRounded,
  SolidRounded: IconShoppingBasketAdd02SolidRounded,
  BulkRounded: IconShoppingBasketAdd02BulkRounded,
  StrokeSharp: IconShoppingBasketAdd02StrokeSharp,
  SolidSharp: IconShoppingBasketAdd02SolidSharp,
};