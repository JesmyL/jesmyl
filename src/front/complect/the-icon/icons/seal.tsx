import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M9.77907 3.35212C10.3428 2.74898 10.6246 2.44741 10.9257 2.27941C11.5935 1.90686 12.4065 1.90686 13.0743 2.27941C13.3754 2.44741 13.6572 2.74898 14.2209 3.35212C14.8996 4.07828 15.5834 4.34707 16.5445 4.31459C17.3696 4.2867 17.7822 4.27276 18.1139 4.36689C18.8495 4.57561 19.4244 5.15054 19.6331 5.88612C19.7272 6.21784 19.7133 6.63038 19.6854 7.45546C19.6518 8.44883 19.9453 9.12242 20.6479 9.77907C21.251 10.3428 21.5526 10.6246 21.7206 10.9257C22.0931 11.5935 22.0931 12.4065 21.7206 13.0743C21.5526 13.3754 21.251 13.6572 20.6479 14.2209C19.9217 14.8996 19.6529 15.5834 19.6854 16.5445C19.7133 17.3696 19.7272 17.7822 19.6331 18.1139C19.4244 18.8495 18.8495 19.4244 18.1139 19.6331C17.7822 19.7272 17.3696 19.7133 16.5445 19.6854C15.5834 19.6529 14.8996 19.9217 14.2209 20.6479C13.6572 21.251 13.3754 21.5526 13.0743 21.7206C12.4065 22.0931 11.5935 22.0931 10.9257 21.7206C10.6246 21.5526 10.3428 21.251 9.77907 20.6479C9.12242 19.9453 8.44883 19.6518 7.45546 19.6854C6.63038 19.7133 6.21784 19.7272 5.88612 19.6331C5.15054 19.4244 4.57561 18.8495 4.36689 18.1139C4.27276 17.7822 4.2867 17.3696 4.31459 16.5445C4.34707 15.5834 4.07828 14.8996 3.35212 14.2209C2.74898 13.6572 2.44741 13.3754 2.27941 13.0743C1.90686 12.4065 1.90686 11.5935 2.27941 10.9257C2.44741 10.6246 2.74898 10.3428 3.35212 9.77907C4.07828 9.10038 4.34707 8.41658 4.31459 7.45546C4.2867 6.63038 4.27276 6.21784 4.36689 5.88612C4.57561 5.15054 5.15054 4.57561 5.88612 4.36689C7.32838 3.95764 8.57898 4.63615 9.77907 3.35212Z',
  d2: 'M12 2C11.6298 2 11.2596 2.09314 10.9257 2.27941C10.6246 2.44741 10.3428 2.74898 9.77907 3.35212C8.57898 4.63615 7.32838 3.95764 5.88612 4.36689C5.15054 4.57561 4.57561 5.15054 4.36689 5.88612C4.27276 6.21784 4.2867 6.63038 4.31459 7.45546C4.34707 8.41658 4.07828 9.10038 3.35212 9.77907C2.74898 10.3428 2.44741 10.6246 2.27941 10.9257C1.90686 11.5935 1.90686 12.4065 2.27941 13.0743C2.44741 13.3754 2.74898 13.6572 3.35212 14.2209C4.07828 14.8996 4.34707 15.5834 4.31459 16.5445C4.2867 17.3696 4.27276 17.7822 4.36689 18.1139C4.57561 18.8495 5.15054 19.4244 5.88612 19.6331C6.21784 19.7272 6.63038 19.7133 7.45546 19.6854C8.44883 19.6518 9.12242 19.9453 9.77907 20.6479C10.3428 21.251 10.6246 21.5526 10.9257 21.7206C11.2596 21.9069 11.6298 22 12 22',
  d3: 'M10.5603 1.62445C11.4552 1.12518 12.5448 1.12518 13.4397 1.62445C13.8457 1.85099 14.204 2.23483 14.684 2.74907C14.9384 3.02168 15.2105 3.28026 15.561 3.42376C16.4298 3.77947 17.4222 3.39102 18.3186 3.64537C19.3044 3.9251 20.0749 4.69559 20.3546 5.68138C20.4815 6.12868 20.4635 6.65342 20.4392 7.35645C20.4109 8.1779 20.6504 8.75556 21.2509 9.31604C21.7652 9.79602 22.149 10.1543 22.3755 10.5603C22.8748 11.4552 22.8748 12.5448 22.3755 13.4397C22.149 13.8457 21.7652 14.204 21.2509 14.684C20.6501 15.2448 20.4109 15.8226 20.4392 16.6436C20.4635 17.3466 20.4815 17.8713 20.3546 18.3186C20.0749 19.3044 19.3044 20.0749 18.3186 20.3546C17.8713 20.4815 17.3466 20.4635 16.6435 20.4392C15.8226 20.4109 15.2448 20.6501 14.684 21.2509C14.204 21.7652 13.8457 22.149 13.4397 22.3755C12.5448 22.8748 11.4552 22.8748 10.5603 22.3755C10.1543 22.149 9.79602 21.7652 9.31604 21.2509C8.75556 20.6504 8.1779 20.4109 7.35645 20.4392C6.65342 20.4635 6.12868 20.4815 5.68138 20.3546C4.69559 20.0749 3.9251 19.3044 3.64537 18.3186C3.51845 17.8713 3.53653 17.3466 3.56076 16.6435C3.58905 15.8226 3.34994 15.2448 2.74907 14.684C2.23483 14.204 1.85099 13.8457 1.62445 13.4397C1.12518 12.5448 1.12518 11.4552 1.62445 10.5603C1.85099 10.1543 2.23483 9.79602 2.74908 9.31603C3.34995 8.7552 3.58905 8.17739 3.56076 7.35646C3.53653 6.65343 3.51845 6.12868 3.64537 5.68138C3.9251 4.69559 4.69559 3.9251 5.68138 3.64537C6.40353 3.44046 7.13555 3.48745 7.87448 3.43915C8.46991 3.40022 8.9117 3.18228 9.31603 2.74908C9.79602 2.23483 10.1543 1.85099 10.5603 1.62445Z',
  d4: 'M20.3555 5.68026C20.4824 6.12756 20.4643 6.6523 20.4401 7.35533C20.4118 8.17678 20.6513 8.75444 21.2518 9.31492C21.766 9.79491 22.1498 10.1532 22.3764 10.5592C22.8757 11.4541 22.8757 12.5437 22.3764 13.4386C22.1498 13.8446 21.766 14.2029 21.2518 14.6828C20.6509 15.2437 20.4118 15.8215 20.4401 16.6424C20.4643 17.3455 20.4824 17.8702 20.3555 18.3175C20.0757 19.3033 19.3052 20.0738 18.3195 20.3535C17.8722 20.4804 17.3474 20.4623 16.6444 20.4381C15.8234 20.4098 15.2456 20.6489 14.6848 21.2498C14.2048 21.7641 13.8465 22.1479 13.4405 22.3744C12.5457 22.8737 11.456 22.8737 10.5612 22.3744C10.1551 22.1479 9.79686 21.7641 9.31688 21.2498C8.75639 20.6493 8.17873 20.4098 7.35728 20.4381C6.65426 20.4623 6.12951 20.4804 5.68222 20.3535C5.14292 20.2005 4.66806 19.9006 4.30273 19.4989L19.5008 4.30078C19.9025 4.6661 20.2024 5.14097 20.3555 5.68026Z',
  d5: 'M8.97948 4.99676H5.08071C5.02525 4.99676 4.98029 5.04172 4.98029 5.09718V8.99446L2.02954 11.9344C1.9901 11.9737 1.99016 12.0376 2.02968 12.0768L4.98029 15.0051V18.9222C4.98029 18.9776 5.02525 19.0226 5.08071 19.0226H8.9834L11.9444 21.9707C11.9837 22.0099 12.0473 22.0097 12.0864 21.9704L15.0203 19.0226H18.9288C18.9842 19.0226 19.0292 18.9776 19.0292 18.9222V15.0129L21.9705 12.0768C22.0098 12.0375 22.0098 11.9738 21.9705 11.9346L19.0253 8.99837V5.09718C19.0253 5.04172 18.9803 4.99676 18.9249 4.99676H15.0164L12.0838 2.02983C12.0446 1.99019 11.9807 1.99004 11.9413 2.02948L8.97948 4.99676Z',
  d6: 'M11.4697 1.46967C11.7626 1.17678 12.2374 1.17678 12.5303 1.46967L15.3107 4.25H19C19.4142 4.25 19.75 4.58579 19.75 5V8.68934L22.5303 11.4697C22.8232 11.7626 22.8232 12.2374 22.5303 12.5303L19.75 15.3107V19C19.75 19.4142 19.4142 19.75 19 19.75H15.3107L12.5303 22.5303C12.2374 22.8232 11.7626 22.8232 11.4697 22.5303L8.68934 19.75H5C4.58579 19.75 4.25 19.4142 4.25 19V15.3107L1.46967 12.5303C1.17678 12.2374 1.17678 11.7626 1.46967 11.4697L4.25 8.68934V5C4.25 4.58579 4.58579 4.25 5 4.25H8.68934L11.4697 1.46967Z',
};

export const IconSealStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="seal-stroke-rounded IconSealStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconSealDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="seal-duotone-rounded IconSealDuotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconSealTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="seal-twotone-rounded IconSealTwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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

export const IconSealSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="seal-solid-rounded IconSealSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconSealBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="seal-bulk-rounded IconSealBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconSealStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="seal-stroke-sharp IconSealStrokeSharp"
    >
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconSealSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="seal-solid-sharp IconSealSolidSharp"
    >
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfSeal: TheIconSelfPack = {
  name: 'Seal',
  StrokeRounded: IconSealStrokeRounded,
  DuotoneRounded: IconSealDuotoneRounded,
  TwotoneRounded: IconSealTwotoneRounded,
  SolidRounded: IconSealSolidRounded,
  BulkRounded: IconSealBulkRounded,
  StrokeSharp: IconSealStrokeSharp,
  SolidSharp: IconSealSolidSharp,
};