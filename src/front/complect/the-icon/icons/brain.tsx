import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M16.998 7.12652C17.3182 7.04393 17.654 7 18 7C20.2091 7 22 8.79086 22 11C22 13.2091 20.2091 15 18 15C17.6451 15 17.3009 14.9538 16.9733 14.867M16.998 7.12652C16.9993 7.08451 17 7.04233 17 7C17 4.79086 15.2091 3 13 3C11.0824 3 9.47994 4.34939 9.09041 6.15043M16.998 7.12652C16.9769 7.80763 16.7854 8.44584 16.4649 9M16.9733 14.867C16.9909 14.7472 17 14.6247 17 14.5C17 13.2905 16.1411 12.2816 15 12.05M16.9733 14.867C16.7957 16.0737 15.756 17 14.5 17H14C11.7909 17 10 18.7909 10 21M9.09041 6.15043C8.74377 6.05243 8.37801 6 8 6C5.79086 6 4 7.79086 4 10C4 10.3886 4.05542 10.7643 4.15878 11.1195M9.09041 6.15043C10.1015 6.43625 10.9498 7.10965 11.4649 8M4.15878 11.1195C2.9114 11.4832 2 12.6352 2 14C2 15.6569 3.34315 17 5 17C6.30622 17 7.41746 16.1652 7.82929 15M4.15878 11.1195C4.24921 11.4303 4.37632 11.7255 4.53513 12',
  d2: 'M11.8361 11.7435C11.3257 12.2353 10.453 12.3202 9.70713 11.9008C8.9612 11.4814 8.58031 10.6917 8.73535 10',
  d3: 'M13 3C15.2091 3 17 4.79086 17 7C17 7.04233 16.9993 7.08451 16.998 7.12652C17.3182 7.04393 17.654 7 18 7C20.2091 7 22 8.79086 22 11C22 13.2091 20.2091 15 18 15C17.6451 15 17.3009 14.9538 16.9733 14.867C16.7957 16.0737 15.756 17 14.5 17H14C12.0378 17 10.4056 18.4129 10.0652 20.2768C10.0525 20.5101 10.0311 20.7512 10 21C10 20.7531 10.0224 20.5114 10.0652 20.2768C10.2563 16.7589 8.45828 15 7.82929 15C7.41746 16.1652 6.30622 17 5 17C3.34315 17 2 15.6569 2 14C2 12.6352 2.9114 11.4832 4.15878 11.1195C4.05542 10.7643 4 10.3886 4 10C4 7.79086 5.79086 6 8 6C8.37801 6 8.74377 6.05243 9.09041 6.15043C9.47994 4.34939 11.0824 3 13 3Z',
  d4: 'M8.40917 5.01655C8.2741 5.00558 8.13763 5 8 5C5.23858 5 3 7.23858 3 10C3 10.1754 3.00907 10.3489 3.0268 10.5201C1.81689 11.2075 1 12.5075 1 14C1 16.2091 2.79086 18 5 18C6.74319 18 8.2235 16.8855 8.77213 15.3332C8.95618 14.8125 8.68326 14.2412 8.16254 14.0572C7.64182 13.8731 7.0705 14.146 6.88645 14.6668C6.61142 15.4449 5.86925 16 5 16C3.89543 16 3 15.1046 3 14C3 13.4059 3.25941 12.8712 3.67172 12.5045C3.9493 12.9796 4.55906 13.1414 5.03586 12.8656C5.51392 12.5891 5.67728 11.9773 5.40073 11.4993C5.28169 11.2935 5.18658 11.0725 5.11897 10.8402C5.04174 10.5748 5 10.2931 5 10C5 8.34315 6.34315 7 8 7C8.28513 7 8.55938 7.0395 8.81837 7.11271C9.57457 7.32649 10.2121 7.83151 10.5993 8.50073C10.8758 8.97879 11.4875 9.14215 11.9656 8.86561C12.4437 8.58906 12.607 7.97733 12.3305 7.49927C11.8638 6.69247 11.1778 6.02777 10.3526 5.58711C10.8579 4.64248 11.8546 4 13 4C14.6569 4 16 5.34315 16 7C16 7.03198 15.9995 7.06381 15.9985 7.09546C15.9826 7.6071 15.8392 8.08446 15.5993 8.49927C15.3227 8.97733 15.4861 9.58906 15.9641 9.86561C16.4422 10.1421 17.0539 9.97879 17.3305 9.50073C17.5958 9.042 17.7904 8.53709 17.8995 8.00164C17.9328 8.00055 17.9663 8 18 8C19.6569 8 21 9.34315 21 11C21 12.6569 19.6569 14 18 14C17.9882 14 17.9763 13.9999 17.9645 13.9998C17.7548 12.5336 16.6367 11.3619 15.1989 11.07C14.6577 10.9601 14.1299 11.3098 14.02 11.8511C13.9101 12.3923 14.2598 12.9202 14.8011 13.03C15.4853 13.1689 16 13.7755 16 14.5C16 14.5758 15.9945 14.6497 15.9839 14.7215C15.8775 15.4446 15.2527 16 14.5 16H14C11.2386 16 9 18.2386 9 21C9 21.5523 9.44772 22 10 22C10.5523 22 11 21.5523 11 21C11 19.3431 12.3431 18 14 18H14.5C15.9009 18 17.1085 17.1776 17.668 15.9891C17.7779 15.9963 17.8885 16 18 16C20.7614 16 23 13.7614 23 11C23 8.23858 20.7614 6 18 6C17.9667 6 17.9334 6.00033 17.9002 6.00098C17.4373 3.71825 15.4193 2 13 2C10.9426 2 9.17691 3.24195 8.40917 5.01655Z',
  d5: 'M8.9532 9.02443C9.49211 9.14521 9.83107 9.68001 9.71028 10.2189C9.66827 10.4064 9.7654 10.7871 10.1964 11.0294C10.6273 11.2717 11.0031 11.1569 11.1414 11.0236C11.5391 10.6404 12.1721 10.6521 12.5554 11.0498C12.9386 11.4475 12.9269 12.0805 12.5292 12.4638C11.6466 13.3142 10.277 13.3692 9.21617 12.7727C8.1553 12.1762 7.49063 10.9775 7.7587 9.78151C7.87949 9.24259 8.41429 8.90364 8.9532 9.02443Z',
  d6: 'M10.1535 20.8271C10.1535 19.192 11.3052 17.017 14.5152 17.017C16.0883 17.017 17.0042 16.0623 17.1378 14.9582M17.1378 14.9582C17.2998 13.8766 16.5531 12.5994 15.0631 12.3841M17.1378 14.9582C18.3232 15.5783 22.3535 14.8689 22.1408 11.0172C22.0611 9.57342 20.5032 7.18736 17.0054 7.72055M9.21016 6.97619C9.4008 5.68767 11.2075 3.00602 14.8246 4.21723C16.0671 4.79428 18.1929 6.64725 16.6381 9.57342M11.6629 8.66689C9.86774 6.00556 7.10159 6.65318 5.92618 7.34617C2.76069 9.68332 4.69587 12.4612 5.10142 12.9981M4.29108 11.4308C1.51605 12.718 2.05817 14.7708 2.52005 15.6484C4.01354 17.7856 7.14698 17.3477 7.98347 15.1595',
  d7: 'M11.9712 12.1453C11.4608 12.6077 10.588 12.6875 9.84202 12.2932C9.09599 11.8989 8.71506 11.1566 8.87012 10.5063',
  d8: 'M8.49078 5.68717C8.35878 5.67649 8.22541 5.67105 8.09091 5.67105C5.39224 5.67105 3.20455 7.85072 3.20455 10.5395C3.20455 10.7103 3.21341 10.8792 3.23074 11.0459C2.04832 11.7152 1.25 12.981 1.25 14.4342C1.25 16.5852 3.00016 18.3289 5.15909 18.3289C6.86266 18.3289 8.30933 17.2438 8.84549 15.7324L7.00267 15.0834C6.73389 15.8411 6.00859 16.3816 5.15909 16.3816C4.07963 16.3816 3.20455 15.5097 3.20455 14.4342C3.20455 13.8557 3.45805 13.3351 3.861 12.9781L4.3482 13.8172L6.04006 12.8421L5.55072 11.9993C5.43438 11.7989 5.34143 11.5838 5.27535 11.3575C5.19988 11.0991 5.15909 10.8249 5.15909 10.5395C5.15909 8.92622 6.47171 7.61842 8.09091 7.61842C8.36956 7.61842 8.63758 7.65688 8.89068 7.72817C9.62969 7.93632 10.2528 8.42805 10.6311 9.07965L12.323 8.10456C11.8669 7.31898 11.1964 6.67178 10.39 6.24271C10.8838 5.32295 11.8579 4.69737 12.9773 4.69737C14.5965 4.69737 15.9091 6.00517 15.9091 7.61842C15.9091 7.64956 15.9086 7.68055 15.9076 7.71137C15.8921 8.20954 15.752 8.67434 15.5175 9.07824L17.2093 10.0533C17.4687 9.60668 17.6588 9.11506 17.7654 8.5937C17.798 8.59264 17.8307 8.5921 17.8636 8.5921C19.4828 8.5921 20.7955 9.89991 20.7955 11.5132C20.7955 13.1264 19.4828 14.4342 17.8636 14.4342C17.8521 14.4342 17.8405 14.4341 17.829 14.434C17.624 13.0064 16.5314 11.8655 15.1262 11.5813L14.7374 13.4898C15.4061 13.625 15.9091 14.2156 15.9091 14.9211C15.9091 14.9949 15.9037 15.0668 15.8934 15.1367C15.7894 15.8408 15.1788 16.3816 14.4432 16.3816H13.9545C11.2559 16.3816 9.06818 18.5612 9.06818 21.25H11.0227C11.0227 19.6367 12.3353 18.3289 13.9545 18.3289H14.4432C15.8122 18.3289 16.9924 17.5282 17.5392 16.371C17.6465 16.378 17.7547 16.3816 17.8636 16.3816C20.5623 16.3816 22.75 14.2019 22.75 11.5132C22.75 8.8244 20.5623 6.64474 17.8636 6.64474C17.8311 6.64474 17.7985 6.64506 17.7661 6.64569C17.3137 4.42303 15.3416 2.75 12.9773 2.75C10.9666 2.75 9.24108 3.95926 8.49078 5.68717Z',
  d9: 'M9.96028 10.9687C9.91827 11.1561 10.0154 11.5368 10.4464 11.7791C10.8773 12.0214 11.2531 11.9066 11.3914 11.7733L12.7792 13.2135C11.8966 14.064 10.527 14.1189 9.46617 13.5224C8.4053 12.926 7.74063 11.7273 8.0087 10.5312L9.96028 10.9687Z',
};

export const IconBrainStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="brain-stroke-rounded IconBrainStrokeRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconBrainDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="brain-duotone-rounded IconBrainDuotoneRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconBrainTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="brain-twotone-rounded IconBrainTwotoneRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconBrainSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="brain-solid-rounded IconBrainSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
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

export const IconBrainBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="brain-bulk-rounded IconBrainBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
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

export const IconBrainStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="brain-stroke-sharp IconBrainStrokeSharp"
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
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBrainSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="brain-solid-sharp IconBrainSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const iconPackOfBrain: TheIconSelfPack = {
  name: 'Brain',
  StrokeRounded: IconBrainStrokeRounded,
  DuotoneRounded: IconBrainDuotoneRounded,
  TwotoneRounded: IconBrainTwotoneRounded,
  SolidRounded: IconBrainSolidRounded,
  BulkRounded: IconBrainBulkRounded,
  StrokeSharp: IconBrainStrokeSharp,
  SolidSharp: IconBrainSolidSharp,
};