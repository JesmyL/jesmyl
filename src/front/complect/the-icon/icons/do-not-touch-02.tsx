import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M19 18.5C18.4313 19.3861 17.799 20.284 16.8019 20.6679C15.9395 21 14.8562 21 12.6896 21C11.5534 21 10.9853 21 10.4566 20.8834C9.64995 20.7056 8.90001 20.3294 8.27419 19.7888C7.86398 19.4344 7.52311 18.9785 6.84137 18.0667L3.83738 14.0487C3.3758 13.4314 3.38907 12.5789 3.86965 11.9763C4.49772 11.1888 5.66877 11.1237 6.3797 11.8369L8.0011 13.4634V7.5',
  d2: 'M11.0004 5.5C11.0004 4.67157 10.3288 4 9.50036 4C9.32491 4 9.15649 4.03012 9 4.08548M11.0004 5.5V3.5C11.0004 2.67157 11.6719 2 12.5004 2C13.3288 2 14.0004 2.67157 14.0004 3.5V5.5M11.0004 5.5V6.5011M14.0004 5.5C14.0004 4.67157 14.6719 4 15.5004 4C16.3288 4 17.0004 4.67157 17.0004 5.5V7.5M14.0004 5.5V9.5011M17.0004 7.5C17.0004 6.67157 17.6719 6 18.5004 6C19.3288 6 20.0004 6.67157 20.0004 7.5C19.9984 10.1666 20.0155 12.8335 19.9875 15.5M17.0004 7.5V10',
  d3: 'M2.5 2L22.5 22',
  d4: 'M6.63426 17.8093L6.07065 16.9792C5.23973 15.7554 4.38925 14.5174 4.11467 14.1182C4.05349 14.0292 3.99793 13.9377 3.94721 13.8424C3.57386 13.1407 3.44852 12.2247 4.08328 11.7463C4.10418 11.7305 4.12517 11.7153 4.1462 11.7006C4.76908 11.2649 5.57097 11.5497 6.164 12.0252L8.00336 13.5V7.5L19.1673 18.7451C18.5627 19.6489 17.6689 20.3456 16.6099 20.7136C15.7856 21 14.7591 21 12.706 21C11.5567 21 10.982 21 10.4504 20.8872C9.51992 20.6898 8.66444 20.2403 7.98103 19.5896C7.59059 19.2178 7.27181 18.7483 6.63427 17.8093L6.63426 17.8093Z',
  d5: 'M13.3974 2.53591L13.3997 9.86332L10.8257 7.2893V2.53583C10.8257 1.82569 11.4014 1.25 12.1115 1.25C12.8217 1.25 13.3974 1.82573 13.3974 2.53591Z',
  d6: 'M13.7691 10.2327C14.0058 10.2327 14.254 10.0478 14.254 9.81511V4.5357C14.254 3.82567 14.8296 3.25007 15.5397 3.25007C16.2497 3.25007 16.8253 3.82567 16.8253 4.5357V9.81511C16.8253 10.0478 17.0172 10.2363 17.2538 10.2363C17.4905 10.2363 17.6824 10.0478 17.6824 9.81511V6.55907C17.6824 5.84878 18.2582 5.27297 18.9685 5.27297C19.6788 5.27297 20.2546 5.84878 20.2546 6.55907V10.0001C20.2546 10.0138 20.2542 10.0274 20.2535 10.041V13.6925V13.6926C20.2535 14.7573 20.2535 15.5922 20.2106 16.2674C20.2024 16.3969 20.1925 16.5223 20.1805 16.6441L13.7691 10.2327Z',
  d7: 'M14.7861 21.707C15.4712 21.6632 16.0429 21.5727 16.5749 21.3679C17.6702 20.9461 18.5992 20.2023 19.2502 19.2493L7.39737 7.3965V13.7055C7.39737 13.876 7.29282 14.0296 7.13251 14.0948C6.97222 14.1599 6.78779 14.1236 6.66533 14.0029L4.81243 12.1758C4.18082 11.553 3.14082 11.6097 2.58255 12.2977C2.38161 12.5454 2.27248 12.8414 2.25586 13.1417C2.26624 13.3772 2.31058 13.6117 2.389 13.8373C2.43313 13.9326 2.48807 14.0243 2.55385 14.1108L5.79999 18.5905C6.42838 19.4312 6.81489 19.9483 7.28738 20.3564C8.00731 20.9783 8.8702 21.4112 9.79857 21.6159C10.4079 21.7503 11.172 21.7502 12.2192 21.7501C13.2804 21.7501 14.1127 21.7501 14.7861 21.707Z',
  d8: 'M8.683 3.25007C9.39303 3.25007 9.96862 3.82567 9.96862 4.5357V6.43221L7.5211 3.9847C7.72744 3.55036 8.17015 3.25007 8.683 3.25007Z',
  d9: 'M1.29289 1.29289C1.68342 0.902369 2.31658 0.902369 2.70711 1.29289L22.7071 21.2929C23.0976 21.6834 23.0976 22.3166 22.7071 22.7071C22.3166 23.0976 21.6834 23.0976 21.2929 22.7071L1.29289 2.70711C0.902369 2.31658 0.902369 1.68342 1.29289 1.29289Z',
  d10: 'M14.7842 21.709C15.4693 21.6652 16.0409 21.5747 16.5729 21.3698C17.6682 20.948 18.5972 20.2043 19.2482 19.2513L7.39542 7.39844V13.7074C7.39542 13.8779 7.29086 14.0316 7.13056 14.0967C6.97026 14.1618 6.78583 14.1255 6.66338 14.0048L4.81048 12.1778C4.17886 11.555 3.13886 11.6116 2.5806 12.2997C2.37966 12.5473 2.27053 12.8433 2.25391 13.1436C2.26428 13.3791 2.30862 13.6136 2.38705 13.8392C2.43118 13.9345 2.48612 14.0262 2.55189 14.1127L5.79804 18.5924C6.42643 19.4331 6.81294 19.9502 7.28543 20.3584C8.00535 20.9803 8.86825 21.4131 9.79661 21.6178C10.406 21.7522 11.17 21.7521 12.2172 21.752C13.2785 21.752 14.1108 21.752 14.7842 21.709Z',
  d11: 'M2.00098 2L22.001 22',
  d12: 'M11.2298 6C11.2298 5.17157 10.538 4.5 9.68449 4.5C9.26576 4.5 8.88593 4.66165 8.60762 4.92417M11.2298 6V4C11.2298 3.17157 11.9217 2.5 12.7752 2.5C13.6287 2.5 14.3205 3.17157 14.3205 4V6M11.2298 6V7.5464M14.3205 6C14.3205 5.17157 15.0124 4.5 15.8659 4.5C16.7194 4.5 17.4112 5.17157 17.4112 6V8M14.3205 6V10.5M17.4112 8C17.4112 7.17157 18.1031 6.5 18.9566 6.5C19.8101 6.5 20.502 7.17157 20.502 8V16.8185M17.4112 8V10.5M19.7735 19.8021C19.0495 20.8291 17.8541 21.5 16.502 21.5H9.00195L3.84953 14.5487C3.374 13.9314 3.38767 13.0789 3.88278 12.4763C4.52984 11.6888 5.73629 11.6237 6.46872 12.3369L8.13914 13.9634V8.13718',
  d13: 'M21.3358 22.75L1.25 2.66421L2.66421 1.25L22.75 21.3358L21.3358 22.75Z',
  d14: 'M10.519 2.53825C10.519 1.8377 11.1151 1.25 11.8756 1.25C12.6362 1.25 13.2323 1.8377 13.2323 2.53825V9.69876H14.0268V4.77869C14.0268 4.07813 14.623 3.49044 15.3835 3.49044C16.144 3.49044 16.7402 4.07813 16.7402 4.77869V9.81967H17.5347V7.01913C17.5347 6.31857 18.1308 5.73087 18.8914 5.73087C19.6519 5.73087 20.248 6.31857 20.248 7.01913V16.7145L13.2323 9.69876L10.519 6.98538V2.53825Z',
  d15: 'M9.72448 4.77869C9.72448 4.07813 9.12831 3.49044 8.3678 3.49044C7.98785 3.49044 7.64892 3.63712 7.40486 3.87128L9.72448 6.1909V4.77869Z',
  d16: 'M4.44087 12.1583C3.77534 11.5187 2.67592 11.5786 2.08996 12.2825C1.64533 12.8166 1.63331 13.5691 2.06 14.1159L2.06448 14.1216L7.79316 21.75H16.1054C17.6414 21.75 18.9821 20.925 19.6975 19.6994L7.01111 7.01306V14.6284L4.44087 12.1583Z',
};

export const IconDoNotTouch02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="do-not-touch-02-stroke-rounded IconDoNotTouch02StrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconDoNotTouch02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="do-not-touch-02-duotone-rounded IconDoNotTouch02DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
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
    </TheIconWrapper>
  );
};

export const IconDoNotTouch02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="do-not-touch-02-twotone-rounded IconDoNotTouch02TwotoneRounded"
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
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconDoNotTouch02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="do-not-touch-02-solid-rounded IconDoNotTouch02SolidRounded"
    >
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
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

export const IconDoNotTouch02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="do-not-touch-02-bulk-rounded IconDoNotTouch02BulkRounded"
    >
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      </g>
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

export const IconDoNotTouch02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="do-not-touch-02-stroke-sharp IconDoNotTouch02StrokeSharp"
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
    </TheIconWrapper>
  );
};

export const IconDoNotTouch02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="do-not-touch-02-solid-sharp IconDoNotTouch02SolidSharp"
    >
      <path 
        d={d.d13} 
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
      <path 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfDoNotTouch02: TheIconSelfPack = {
  name: 'DoNotTouch02',
  StrokeRounded: IconDoNotTouch02StrokeRounded,
  DuotoneRounded: IconDoNotTouch02DuotoneRounded,
  TwotoneRounded: IconDoNotTouch02TwotoneRounded,
  SolidRounded: IconDoNotTouch02SolidRounded,
  BulkRounded: IconDoNotTouch02BulkRounded,
  StrokeSharp: IconDoNotTouch02StrokeSharp,
  SolidSharp: IconDoNotTouch02SolidSharp,
};