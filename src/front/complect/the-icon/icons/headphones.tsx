import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M17 14.3045C17 13.9588 17 13.786 17.052 13.632C17.2032 13.1844 17.6018 13.0108 18.0011 12.8289C18.45 12.6244 18.6744 12.5222 18.8968 12.5042C19.1493 12.4838 19.4022 12.5382 19.618 12.6593C19.9041 12.8198 20.1036 13.1249 20.3079 13.373C21.2513 14.5188 21.7229 15.0918 21.8955 15.7236C22.0348 16.2334 22.0348 16.7666 21.8955 17.2764C21.6438 18.1979 20.8485 18.9704 20.2598 19.6854C19.9587 20.0511 19.8081 20.234 19.618 20.3407C19.4022 20.4618 19.1493 20.5162 18.8968 20.4958C18.6744 20.4778 18.45 20.3756 18.0011 20.1711C17.6018 19.9892 17.2032 19.8156 17.052 19.368C17 19.214 17 19.0412 17 18.6955V14.3045Z',
  d2: 'M7 14.3046C7 13.8694 6.98778 13.4782 6.63591 13.1722C6.50793 13.0609 6.33825 12.9836 5.99891 12.829C5.55001 12.6246 5.32556 12.5224 5.10316 12.5044C4.43591 12.4504 4.07692 12.9058 3.69213 13.3732C2.74875 14.519 2.27706 15.0919 2.10446 15.7237C1.96518 16.2336 1.96518 16.7668 2.10446 17.2766C2.3562 18.1981 3.15152 18.9705 3.74021 19.6856C4.11129 20.1363 4.46577 20.5475 5.10316 20.496C5.32556 20.478 5.55001 20.3757 5.99891 20.1713C6.33825 20.0167 6.50793 19.9394 6.63591 19.8281C6.98778 19.5221 7 19.131 7 18.6957V14.3046Z',
  d3: 'M19 12.5V10.5C19 6.63401 15.866 3.5 12 3.5C8.13401 3.5 5 6.63401 5 10.5V12.5',
  d4: 'M6 10.75C6 7.43629 8.68629 4.75 12 4.75C15.3137 4.75 18 7.43629 18 10.75V12.006C17.9255 12.0388 17.8505 12.0732 17.7745 12.1079C17.4183 12.2671 16.5975 12.6348 16.3417 13.3919C16.2487 13.6672 16.2494 13.9616 16.2501 14.2355V18.7645C16.2494 19.0384 16.2487 19.3327 16.3417 19.6081C16.5975 20.3652 17.4183 20.7329 17.7745 20.8921L17.7745 20.8921C18.1374 21.0581 18.4789 21.2144 18.8366 21.2434C19.234 21.2755 19.6363 21.1906 19.9853 20.9947C20.3023 20.8168 20.5403 20.5265 20.7813 20.2324L20.7814 20.2323C20.7814 20.2323 21.0335 19.9318 21.1494 19.7975L21.1494 19.7975C21.3613 19.552 21.6018 19.2733 21.8002 19.0137C22.1278 18.5849 22.4562 18.0711 22.6193 17.4741C22.7939 16.8348 22.7939 16.1652 22.6193 15.5259C22.5009 15.0927 22.2868 14.7104 22.0041 14.3091C21.7304 13.9206 21.3617 13.4727 20.9058 12.919L20.9057 12.9188L20.9056 12.9188L20.9056 12.9188C20.9056 12.9188 20.6336 12.5757 20.5588 12.4901C20.4262 12.3381 20.2435 12.1535 20 12.0136V10.75C20 6.33172 16.4183 2.75 12 2.75C7.58172 2.75 4 6.33172 4 10.75V12.0136C3.75646 12.1535 3.57385 12.3381 3.44116 12.4901C3.36642 12.5757 3.0944 12.9188 3.0944 12.9188L3.09437 12.9188C2.63837 13.4726 2.2696 13.9205 1.99588 14.3091C1.71322 14.7104 1.49909 15.0927 1.38075 15.5259C1.20611 16.1652 1.20611 16.8348 1.38075 17.4741C1.54384 18.0711 1.87217 18.5849 2.19982 19.0137C2.39818 19.2733 2.6387 19.552 2.85057 19.7975L2.85058 19.7975C2.96648 19.9318 3.21864 20.2323 3.21864 20.2323C3.45969 20.5265 3.69768 20.8168 4.01468 20.9947C4.36372 21.1906 4.76602 21.2755 5.16339 21.2434C5.52109 21.2144 5.86259 21.0581 6.22549 20.8921L6.22551 20.8921C6.58166 20.7329 7.40248 20.3652 7.65827 19.6081C7.75129 19.3327 7.75056 19.0384 7.74988 18.7645V14.2355C7.75056 13.9616 7.75129 13.6672 7.65827 13.3919C7.40248 12.6348 6.58167 12.2671 6.22551 12.1079C6.14952 12.0732 6.07446 12.0388 6 12.006V10.75Z',
  d5: 'M18.8366 11.7566C19.234 11.7245 19.6363 11.8093 19.9853 12.0053C20.2362 12.1461 20.4235 12.3351 20.5588 12.4901C20.6336 12.5757 20.9056 12.9188 20.9056 12.9188L20.9056 12.9188C21.3616 13.4726 21.7304 13.9205 22.0041 14.3091C22.2868 14.7104 22.5009 15.0927 22.6193 15.5259C22.7939 16.1652 22.7939 16.8348 22.6193 17.4741C22.4562 18.0711 22.1278 18.5849 21.8002 19.0137C21.6018 19.2733 21.3613 19.552 21.1494 19.7975L21.1494 19.7975C21.0335 19.9318 20.7814 20.2323 20.7814 20.2323C20.5403 20.5265 20.3023 20.8168 19.9853 20.9947C19.6363 21.1906 19.234 21.2755 18.8366 21.2434C18.4789 21.2144 18.1374 21.0581 17.7745 20.8921C17.4183 20.7329 16.5975 20.3652 16.3417 19.6081C16.2487 19.3327 16.2494 19.0384 16.2501 18.7645V14.2355C16.2494 13.9616 16.2487 13.6672 16.3417 13.3919C16.5975 12.6348 17.4183 12.2671 17.7745 12.1079C18.1374 11.9419 18.4789 11.7856 18.8366 11.7566Z',
  d6: 'M5.16339 11.7566C4.76602 11.7245 4.36372 11.8093 4.01468 12.0053C3.76378 12.1461 3.5765 12.3351 3.44116 12.4901C3.36642 12.5757 3.0944 12.9188 3.0944 12.9188L3.09437 12.9188C2.63837 13.4726 2.2696 13.9205 1.99588 14.3091C1.71322 14.7104 1.49909 15.0927 1.38075 15.5259C1.20611 16.1652 1.20611 16.8348 1.38075 17.4741C1.54384 18.0711 1.87217 18.5849 2.19982 19.0137C2.39818 19.2733 2.6387 19.552 2.85057 19.7975L2.85058 19.7975C2.96648 19.9318 3.21864 20.2323 3.21864 20.2323C3.45969 20.5265 3.69768 20.8168 4.01468 20.9947C4.36372 21.1906 4.76602 21.2755 5.16339 21.2434C5.52109 21.2144 5.8626 21.0581 6.22551 20.8921C6.58166 20.7329 7.40248 20.3652 7.65827 19.6081C7.75129 19.3327 7.75056 19.0384 7.74988 18.7645V14.2355C7.75056 13.9616 7.75129 13.6672 7.65827 13.3919C7.40248 12.6348 6.58167 12.2671 6.22551 12.1079C5.86261 11.9419 5.5211 11.7856 5.16339 11.7566Z',
  d7: 'M6 10.75C6 7.43629 8.68629 4.75 12 4.75C15.3137 4.75 18 7.43629 18 10.75V12.006C18.2811 11.882 18.5538 11.7795 18.8366 11.7566C19.234 11.7245 19.6363 11.8093 19.9853 12.0053C19.9902 12.008 19.9951 12.0108 20 12.0136V10.75C20 6.33172 16.4183 2.75 12 2.75C7.58172 2.75 4 6.33172 4 10.75V12.0136C4.00487 12.0108 4.00976 12.008 4.01468 12.0053C4.36373 11.8093 4.76602 11.7245 5.16339 11.7566C5.44619 11.7795 5.71887 11.882 6 12.006V10.75Z',
  d8: 'M17 13.5V19.5L19 20.5C20.6725 19.0478 21.5088 18.3217 21.8148 17.521C21.9429 17.1859 22.0045 16.8428 21.9997 16.5C22.0045 16.1572 21.9429 15.8141 21.8148 15.479C21.5088 14.6783 20.6725 13.9522 19 12.5L17 13.5Z',
  d9: 'M7 13.5V19.5L5 20.5C3.32748 19.0478 2.49121 18.3217 2.18521 17.521C2.05713 17.1859 1.99548 16.8428 2.00026 16.5C1.99548 16.1572 2.05713 15.8141 2.18521 15.479C2.49121 14.6783 3.32748 13.9522 5 12.5L7 13.5Z',
  d10: 'M19.5162 11.8099C20.3317 12.5179 20.9771 13.0783 21.4541 13.5623C21.9375 14.0529 22.3077 14.5226 22.5154 15.0662C22.6749 15.4836 22.7546 15.9173 22.7498 16.3549C22.7546 16.7925 22.6749 17.2263 22.5154 17.6437C22.3077 18.1873 21.9375 18.657 21.4541 19.1476C20.9771 19.6316 20.3317 20.1919 19.5162 20.9L19.5162 20.9L19.1131 21.25L16.25 19.8185V12.8914L19.1131 11.4599L19.5162 11.8099Z',
  d11: 'M4.48377 20.9001C3.66827 20.192 3.02289 19.6317 2.54595 19.1477C2.0625 18.6571 1.69235 18.1873 1.48462 17.6438C1.3251 17.2264 1.24544 16.7926 1.2502 16.355C1.24544 15.9174 1.3251 15.4837 1.48462 15.0662C1.69235 14.5227 2.0625 14.053 2.54595 13.5624C3.02289 13.0784 3.66828 12.518 4.48379 11.81L4.48379 11.81L4.88692 11.46L7.75 12.8915V19.8186L4.88692 21.2501L4.48381 20.9001L4.48377 20.9001Z',
  d12: 'M12 4.75C8.68629 4.75 6 7.43629 6 10.75V13.75H4V10.75C4 6.33172 7.58172 2.75 12 2.75C16.4183 2.75 20 6.33172 20 10.75V13.75H18V10.75C18 7.43629 15.3137 4.75 12 4.75Z',
};

export const IconHeadphonesStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="headphones-stroke-rounded IconHeadphonesStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconHeadphonesDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="headphones-duotone-rounded IconHeadphonesDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        fill="var(--icon-fill)" 
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
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconHeadphonesTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="headphones-twotone-rounded IconHeadphonesTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconHeadphonesSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="headphones-solid-rounded IconHeadphonesSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconHeadphonesBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="headphones-bulk-rounded IconHeadphonesBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconHeadphonesStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="headphones-stroke-sharp IconHeadphonesStrokeSharp"
    >
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconHeadphonesSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="headphones-solid-sharp IconHeadphonesSolidSharp"
    >
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfHeadphones: TheIconSelfPack = {
  name: 'Headphones',
  StrokeRounded: IconHeadphonesStrokeRounded,
  DuotoneRounded: IconHeadphonesDuotoneRounded,
  TwotoneRounded: IconHeadphonesTwotoneRounded,
  SolidRounded: IconHeadphonesSolidRounded,
  BulkRounded: IconHeadphonesBulkRounded,
  StrokeSharp: IconHeadphonesStrokeSharp,
  SolidSharp: IconHeadphonesSolidSharp,
};