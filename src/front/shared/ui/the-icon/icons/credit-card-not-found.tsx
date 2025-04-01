import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M4.46334 4.5C4.145 4.62804 3.86325 4.78886 3.60746 4.99087C3.40678 5.14935 3.22119 5.32403 3.0528 5.5129C2 6.69377 2 8.46252 2 12C2 15.5375 2 17.3062 3.0528 18.4871C3.22119 18.676 3.40678 18.8506 3.60746 19.0091C4.86213 20 6.74142 20 10.5 20H13.5C16.4923 20 18.2568 20 19.5 19.5',
  d2: 'M8 4.01578C8.7277 4 9.55437 4 10.5 4H13.5C17.2586 4 19.1379 4 20.3925 4.99087C20.5932 5.14935 20.7788 5.32403 20.9472 5.5129C22 6.69377 22 8.46252 22 12C22 14.3126 22 15.8693 21.7058 17',
  d3: 'M2 2L22 22',
  d4: 'M2.5 9H9',
  d5: 'M21.5 9L13.5 9',
  d6: 'M10.5 20H13.5C16.4923 20 18.2568 20 19.5 19.5L4.46334 4.5C4.145 4.62804 3.86325 4.78886 3.60746 4.99087C3.40678 5.14935 3.22119 5.32403 3.0528 5.5129C2 6.69377 2 8.46252 2 12C2 15.5375 2 17.3062 3.0528 18.4871C3.22119 18.676 3.40678 18.8506 3.60746 19.0091C4.86213 20 6.74142 20 10.5 20Z',
  d7: 'M4.4495 4.49902C4.13294 4.6269 3.85278 4.78752 3.59843 4.98927C3.39887 5.14755 3.21433 5.322 3.04688 5.51063C2 6.69 2 8.4565 2 11.9895C2 15.5225 2 17.2889 3.04688 18.4683C3.21433 18.657 3.39887 18.8313 3.59843 18.9896C4.84604 19.9793 6.71477 19.9793 10.4522 19.9793H13.4354C16.4108 19.9793 18.1654 19.9793 19.4016 19.4799',
  d8: 'M21.574 17.1054C21.574 17.1054 22.066 15.7072 21.9927 12.9212C21.9927 11.5641 21.9772 9.93218 21.9581 8.43609C21.9265 5.9683 19.9058 4.00201 17.4487 4.03054L17.0185 4.03553L7.9375 3.979M13.4206 8.99716H21.965',
  d9: 'M1.29289 1.29289C1.68342 0.902369 2.31658 0.902369 2.70711 1.29289L22.7071 21.2929C23.0976 21.6834 23.0976 22.3166 22.7071 22.7071C22.3166 23.0976 21.6834 23.0976 21.2929 22.7071L1.29289 2.70711C0.902369 2.31658 0.902369 1.68342 1.29289 1.29289Z',
  d10: 'M22.75 12.0528C22.75 13.7768 22.75 15.1427 22.6124 16.2222C22.5432 16.765 22.4367 17.2588 22.2683 17.709C22.1532 18.0168 22.0957 18.1707 21.9357 18.2054C21.7757 18.2401 21.6483 18.1128 21.3935 17.858L14.3098 10.7743C13.8739 10.3383 13.6559 10.1204 13.7326 9.93519C13.8093 9.75 14.1176 9.75 14.7341 9.75H22.1486C22.4264 9.75 22.5653 9.75 22.653 9.83678C22.7406 9.92356 22.7421 10.0614 22.7449 10.3371C22.75 10.8356 22.75 11.3715 22.75 11.9473V12.0528Z',
  d11: 'M17.9694 20.6214C16.8308 20.75 15.3866 20.75 13.5475 20.75H10.4525C8.61345 20.75 7.16917 20.75 6.03058 20.6214C4.86842 20.4901 3.926 20.2164 3.14263 19.5977C2.90811 19.4125 2.69068 19.2079 2.49298 18.9862C1.82681 18.239 1.52932 17.3333 1.38763 16.2222C1.24998 15.1427 1.24999 13.7767 1.25 12.0527V11.9473C1.25 11.3715 1.24999 10.8356 1.25512 10.3371C1.25795 10.0614 1.25937 9.92356 1.34704 9.83678C1.43472 9.75 1.57361 9.75 1.85139 9.75H9.50147C9.6241 9.75 9.68541 9.75 9.74054 9.77284C9.79567 9.79567 9.83903 9.83903 9.92574 9.92574L19.4801 19.4801C19.757 19.757 19.8954 19.8954 19.8521 20.0616C19.8088 20.2279 19.6345 20.2772 19.2859 20.3759C18.8809 20.4906 18.4434 20.5679 17.9694 20.6214Z',
  d12: 'M13.5476 3.25C15.3866 3.24999 16.8308 3.24998 17.9694 3.3786C19.1316 3.50988 20.074 3.78362 20.8574 4.40229C21.0919 4.58749 21.3093 4.79205 21.507 5.0138C22.1732 5.76101 22.4707 6.66669 22.6124 7.77785C22.6287 7.9057 22.6368 7.96963 22.6222 8.02579C22.5987 8.11553 22.5299 8.19375 22.4438 8.22835C22.39 8.25 22.3226 8.25 22.1878 8.25H12.0341C11.9114 8.25 11.8501 8.25 11.795 8.22716C11.7399 8.20433 11.6965 8.16097 11.6098 8.07426L7.78828 4.25274C7.38337 3.84784 7.18092 3.64539 7.25526 3.4613C7.3296 3.27722 7.61232 3.27219 8.17775 3.26213C8.85977 3.24999 9.6152 3.25 10.4524 3.25H13.5476Z',
  d13: 'M1.38764 7.77785C1.52933 6.66669 1.82682 5.76101 2.49299 5.0138C2.69069 4.79205 2.90812 4.58749 3.14264 4.40229C3.27286 4.29945 3.40747 4.20614 3.54675 4.12143C3.70984 4.02225 3.79138 3.97266 3.89439 3.98503C3.9974 3.9974 4.07155 4.07155 4.21985 4.21985L7.22574 7.22574C7.66165 7.66165 7.87961 7.87961 7.8029 8.06481C7.72619 8.25 7.41795 8.25 6.80147 8.25H1.81224C1.67746 8.25 1.61007 8.25 1.55622 8.22835C1.47015 8.19375 1.40128 8.11554 1.37784 8.02579C1.36318 7.96963 1.37133 7.9057 1.38764 7.77785Z',
  d14: 'M17.9694 20.6226C16.8308 20.7512 15.3866 20.7512 13.5475 20.7512H10.4525C8.61345 20.7512 7.16917 20.7512 6.03058 20.6226C4.86842 20.4913 3.926 20.2176 3.14263 19.5989C2.90811 19.4137 2.69068 19.2092 2.49298 18.9874C1.82681 18.2402 1.52932 17.3345 1.38763 16.2234C1.24998 15.1439 1.24999 13.7779 1.25 12.0539V11.9485C1.25 11.3727 1.24999 10.8368 1.25512 10.3383C1.25795 10.0626 1.25937 9.92477 1.34704 9.83799C1.43472 9.75121 1.57361 9.75121 1.85139 9.75121H9.50147C9.6241 9.75121 9.68541 9.75121 9.74054 9.77405C9.79567 9.79688 9.83903 9.84024 9.92574 9.92695L19.4801 19.4813C19.757 19.7582 19.8954 19.8966 19.8521 20.0628C19.8088 20.2291 19.6345 20.2784 19.2859 20.3771C18.8809 20.4918 18.4434 20.5691 17.9694 20.6226Z',
  d15: 'M1.38764 7.77906C1.52933 6.6679 1.82682 5.76222 2.49299 5.01501C2.69069 4.79326 2.90812 4.5887 3.14264 4.4035C3.27286 4.30066 3.40747 4.20735 3.54675 4.12264C3.70984 4.02346 3.79138 3.97387 3.89439 3.98624C3.9974 3.99861 4.07155 4.07276 4.21985 4.22106L7.22574 7.22695C7.66165 7.66286 7.87961 7.88082 7.8029 8.06602C7.72619 8.25121 7.41795 8.25121 6.80147 8.25121H1.81224C1.67746 8.25121 1.61007 8.25121 1.55622 8.22956C1.47015 8.19496 1.40128 8.11675 1.37784 8.027C1.36318 7.97084 1.37133 7.90691 1.38764 7.77906Z',
  d16: 'M22.7499 12.0528C22.7499 13.7768 22.7499 15.1427 22.6123 16.2222C22.543 16.765 22.4366 17.2588 22.2682 17.709C22.1531 18.0168 22.0955 18.1707 21.9355 18.2054C21.7756 18.2401 21.6482 18.1128 21.3934 17.858L14.3097 10.7743C13.8738 10.3383 13.6558 10.1204 13.7325 9.93519C13.8092 9.75 14.1175 9.75 14.7339 9.75H22.1485C22.4263 9.75 22.5652 9.75 22.6528 9.83678C22.7405 9.92356 22.7419 10.0614 22.7448 10.3371C22.7499 10.8356 22.7499 11.3715 22.7499 11.9473V12.0528Z',
  d17: 'M13.5474 3.25C15.3865 3.24999 16.8307 3.24998 17.9693 3.3786C19.1315 3.50988 20.0739 3.78362 20.8573 4.40229C21.0918 4.58749 21.3092 4.79205 21.5069 5.0138C22.1731 5.76101 22.4706 6.66669 22.6123 7.77785C22.6286 7.9057 22.6367 7.96963 22.6221 8.02579C22.5986 8.11553 22.5298 8.19375 22.4437 8.22835C22.3898 8.25 22.3225 8.25 22.1877 8.25H12.034C11.9113 8.25 11.85 8.25 11.7949 8.22716C11.7397 8.20433 11.6964 8.16097 11.6097 8.07426L7.78817 4.25274C7.38326 3.84784 7.18081 3.64539 7.25515 3.4613C7.32949 3.27722 7.61221 3.27219 8.17764 3.26213C8.85966 3.24999 9.61512 3.25 10.4524 3.25H13.5474Z',
  d18: 'M2.00098 2L21.9894 22',
  d19: 'M4.01429 3.99379L2.00902 3.99316C2.0035 3.99316 1.99902 3.99764 1.99902 4.00316L1.99913 19.9921C1.99913 19.9977 2.00361 20.0021 2.00913 20.0021H20.0135M7.19147 4.00604L21.991 4.00629C21.9965 4.00629 22.001 4.01077 22.001 4.01629V18.8243',
  d20: 'M2.63037 8.99609H9.05555M12.1875 8.99609H21.3435',
  d21: 'M21.3358 22.75L1.25 2.66421L2.66421 1.25L22.75 21.3358L21.3358 22.75Z',
  d22: 'M2 3.25C1.58579 3.25 1.25 3.58579 1.25 4V8.25H8.25008L3.25008 3.25H2Z',
  d23: 'M22.75 8.25V4C22.75 3.58579 22.4142 3.25 22 3.25H6.78561L11.7856 8.25H22.75Z',
  d24: 'M1.25 9.75V20C1.25 20.4142 1.58579 20.75 2 20.75H20.7501L9.75008 9.75H1.25Z',
  d25: 'M22.75 19.2144V9.75H13.2856L22.75 19.2144Z',
};

export const IconCreditCardNotFoundStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="credit-card-not-found-stroke-rounded IconCreditCardNotFoundStrokeRounded"
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

export const IconCreditCardNotFoundDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="credit-card-not-found-duotone-rounded IconCreditCardNotFoundDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
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

export const IconCreditCardNotFoundTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="credit-card-not-found-twotone-rounded IconCreditCardNotFoundTwotoneRounded"
    >
      <path 
        d={d.d7} 
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
      />
      <path 
        d={d.d4} 
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
    </TheIconWrapper>
  );
};

export const IconCreditCardNotFoundSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="credit-card-not-found-solid-rounded IconCreditCardNotFoundSolidRounded"
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

export const IconCreditCardNotFoundBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="credit-card-not-found-bulk-rounded IconCreditCardNotFoundBulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
      </g>
    </TheIconWrapper>
  );
};

export const IconCreditCardNotFoundStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="credit-card-not-found-stroke-sharp IconCreditCardNotFoundStrokeSharp"
    >
      <path 
        d={d.d18} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d19} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d20} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconCreditCardNotFoundSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="credit-card-not-found-solid-sharp IconCreditCardNotFoundSolidSharp"
    >
      <path 
        d={d.d21} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d22} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d23} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d24} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d25} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfCreditCardNotFound: TheIconSelfPack = {
  name: 'CreditCardNotFound',
  StrokeRounded: IconCreditCardNotFoundStrokeRounded,
  DuotoneRounded: IconCreditCardNotFoundDuotoneRounded,
  TwotoneRounded: IconCreditCardNotFoundTwotoneRounded,
  SolidRounded: IconCreditCardNotFoundSolidRounded,
  BulkRounded: IconCreditCardNotFoundBulkRounded,
  StrokeSharp: IconCreditCardNotFoundStrokeSharp,
  SolidSharp: IconCreditCardNotFoundSolidSharp,
};