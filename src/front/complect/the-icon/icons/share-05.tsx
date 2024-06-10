import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M18 7C18.7745 7.16058 19.3588 7.42859 19.8284 7.87589C21 8.99181 21 10.7879 21 14.38C21 17.9721 21 19.7681 19.8284 20.8841C18.6569 22 16.7712 22 13 22H11C7.22876 22 5.34315 22 4.17157 20.8841C3 19.7681 3 17.9721 3 14.38C3 10.7879 3 8.99181 4.17157 7.87589C4.64118 7.42859 5.2255 7.16058 6 7',
  d2: 'M12.0253 2.00052L12 14M12.0253 2.00052C11.8627 1.99379 11.6991 2.05191 11.5533 2.17492C10.6469 2.94006 9 4.92886 9 4.92886M12.0253 2.00052C12.1711 2.00657 12.3162 2.06476 12.4468 2.17508C13.3531 2.94037 15 4.92886 15 4.92886',
  d3: 'M11 22H13C16.7712 22 18.6569 22 19.8284 20.8841C21 19.7681 21 17.9721 21 14.38C21 10.7879 21 8.99181 19.8284 7.87589C19.3588 7.42859 18.7745 7.16058 18 7H6C5.2255 7.16058 4.64118 7.42859 4.17157 7.87589C3 8.99181 3 10.7879 3 14.38C3 17.9721 3 19.7681 4.17157 20.8841C5.34315 22 7.22876 22 11 22Z',
  d4: 'M6.97918 6.79694C7.0913 7.33772 6.7438 7.86701 6.20302 7.97913C5.55322 8.11386 5.15827 8.31704 4.86128 8.59994C4.50065 8.94343 4.26613 9.42162 4.13663 10.3391C4.00234 11.2905 4 12.5542 4 14.3799C4 16.2056 4.00234 17.4694 4.13663 18.4208C4.26613 19.3383 4.50065 19.8164 4.86128 20.1599C5.22875 20.51 5.75098 20.7422 6.73794 20.8686C7.74887 20.998 9.08742 21 11 21H13C14.9126 21 16.2511 20.998 17.2621 20.8686C18.249 20.7422 18.7713 20.51 19.1387 20.1599C19.4993 19.8164 19.7339 19.3383 19.8634 18.4208C19.9977 17.4694 20 16.2056 20 14.3799C20 12.5542 19.9977 11.2905 19.8634 10.3391C19.7339 9.42162 19.4993 8.94343 19.1387 8.59994C18.8417 8.31704 18.4468 8.11386 17.797 7.97913C17.2562 7.86701 16.9087 7.33772 17.0208 6.79694C17.133 6.25615 17.6622 5.90866 18.203 6.02078C19.1022 6.20722 19.8759 6.54004 20.5181 7.15175C21.3291 7.92418 21.6803 8.90199 21.8437 10.0596C22.0001 11.167 22 12.5725 22 14.3041V14.4558C22 16.1873 22.0001 17.5928 21.8437 18.7003C21.6803 19.8579 21.3291 20.8357 20.5181 21.6081C19.714 22.374 18.7077 22.6998 17.5161 22.8524C16.3633 23 14.8962 23 13.0702 23H10.9298C9.1038 23 7.63674 23 6.48389 22.8524C5.29233 22.6998 4.28597 22.374 3.48187 21.6081C2.67092 20.8357 2.31966 19.8579 2.15626 18.7003C1.99994 17.5928 1.99997 16.1873 2 14.4558V14.3041C1.99997 12.5725 1.99994 11.167 2.15626 10.0596C2.31966 8.90199 2.67092 7.92418 3.48187 7.15175C4.12408 6.54004 4.89779 6.20722 5.79698 6.02078C6.33777 5.90866 6.86705 6.25615 6.97918 6.79694Z',
  d5: 'M10.9771 6.00001C10.7044 6.00001 10.4318 5.99984 10.1591 6.00004C9.92688 6.00021 9.6494 6.00041 9.42259 5.96723C9.18709 5.93277 8.63317 5.81135 8.3656 5.24535C8.0995 4.68246 8.35889 4.19385 8.48601 3.99344C8.61511 3.78991 8.81144 3.56868 8.96575 3.39141C9.51848 2.75645 10.3023 1.88992 10.883 1.41077C11.2039 1.14606 11.6161 0.983094 12.0681 1.0014C12.47 1.01767 12.8307 1.17478 13.1169 1.41106C13.6973 1.89011 14.481 2.75629 15.0339 3.39116C15.1883 3.56846 15.3847 3.78969 15.5138 3.99322C15.641 4.19357 15.9005 4.68223 15.6344 5.24525C15.3669 5.81137 14.8128 5.93278 14.5774 5.96723C14.3505 6.00041 14.073 6.00021 13.8407 6.00004C13.5681 5.99984 13.2956 6.00001 13.0231 6.00001L13.0231 14C13.0231 14.5523 12.5651 15 12.0001 15C11.4351 15 10.9771 14.5523 10.9771 14L10.9771 6.00001Z',
  d6: 'M6 7H3V22H21V7H18',
  d7: 'M12 14L12 2.68984M9 5L12 2L15 5',
  d8: 'M2 7C2 6.44772 2.44772 6 3 6H6V8H4V21H20V8H18V6H21C21.5523 6 22 6.44772 22 7V22C22 22.5523 21.5523 23 21 23H3C2.44772 23 2 22.5523 2 22V7Z',
  d9: 'M8.29297 4.70723L12.0001 1.00012L15.7072 4.70723L14.293 6.12144L13.0001 4.82855L13.0001 14.4143L11.0001 14.4143L11.0001 4.82855L9.70718 6.12144L8.29297 4.70723Z',
};

export const IconShare05StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="share-05-stroke-rounded IconShare05StrokeRounded"
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
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconShare05DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="share-05-duotone-rounded IconShare05DuotoneRounded"
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
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconShare05TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="share-05-twotone-rounded IconShare05TwotoneRounded"
    >
      <path 
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
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconShare05SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="share-05-solid-rounded IconShare05SolidRounded"
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

export const IconShare05BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="share-05-bulk-rounded IconShare05BulkRounded"
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

export const IconShare05StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="share-05-stroke-sharp IconShare05StrokeSharp"
    >
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconShare05SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="share-05-solid-sharp IconShare05SolidSharp"
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

export const iconPackOfShare05: TheIconSelfPack = {
  name: 'Share05',
  StrokeRounded: IconShare05StrokeRounded,
  DuotoneRounded: IconShare05DuotoneRounded,
  TwotoneRounded: IconShare05TwotoneRounded,
  SolidRounded: IconShare05SolidRounded,
  BulkRounded: IconShare05BulkRounded,
  StrokeSharp: IconShare05StrokeSharp,
  SolidSharp: IconShare05SolidSharp,
};