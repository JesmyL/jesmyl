import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2 17C2 18.9497 2.02815 21 4.4 21H15.6C17.9718 21 18 18.9497 18 17C18 12.5817 14.4183 9 10 9C5.58172 9 2 12.5817 2 17Z',
  d2: 'M8 9V8C8 6.89543 8.89543 6 10 6C11.1046 6 12 6.89543 12 8V9',
  d3: 'M18 17C19.1046 17 20 16.1046 20 15V13C20 11.8954 20.8954 11 22 11',
  d4: 'M16 11.5V9C16 5.68629 13.3137 3 10 3C6.68629 3 4 5.68629 4 9V11.5',
  d5: 'M2 17H12',
  d6: 'M8 8V9H12V8C12 6.89543 11.1046 6 10 6C8.89543 6 8 6.89543 8 8Z',
  d7: 'M1.91577 16.25C1.60625 16.25 1.45149 16.25 1.36165 16.1446C1.27182 16.0391 1.29525 15.8934 1.34211 15.6018C1.56088 14.2408 2.0938 12.9847 2.86422 11.9102C2.92413 11.8266 2.95408 11.7848 2.96847 11.7401C2.98286 11.6953 2.98286 11.6462 2.98286 11.5482L2.98286 9.25C2.98286 5.38401 6.11965 2.25 9.98908 2.25C13.8585 2.25 16.9953 5.38401 16.9953 9.25V11.5493C16.9953 11.6473 16.9953 11.6964 17.0097 11.7411C17.0241 11.7859 17.054 11.8277 17.1139 11.9112C17.7667 12.822 18.2489 13.8631 18.5138 14.988C18.5536 15.1568 18.7468 15.1734 18.7468 15V13C18.7468 11.3431 20.0911 10 21.7495 10C22.3022 10 22.7504 10.4477 22.7504 11C22.7504 11.5523 22.3022 12 21.7495 12C21.1967 12 20.7486 12.4477 20.7486 13V15C20.7486 16.1627 20.0866 17.1708 19.1187 17.6688C18.9233 17.7693 18.8257 17.8196 18.7823 17.8862C18.7388 17.9528 18.7331 18.0503 18.7215 18.2453C18.6855 18.854 18.5973 19.4736 18.3816 20.0105C18.1867 20.4957 17.8761 20.9495 17.385 21.2744C16.8966 21.5977 16.2953 21.75 15.5937 21.75H4.38371C3.68203 21.75 3.08081 21.5977 2.59233 21.2744C2.10126 20.9495 1.79066 20.4957 1.59575 20.0105C1.39397 19.5081 1.30378 18.9333 1.26347 18.3628C1.2436 18.0816 1.23367 17.941 1.32264 17.8455C1.41161 17.75 1.55768 17.75 1.84983 17.75H8.99046C9.40504 17.75 9.74112 17.4142 9.74112 17C9.74112 16.5858 9.40504 16.25 8.99046 16.25H1.91577ZM4.98464 9.25C4.98464 9.48963 5.25585 9.6326 5.46091 9.50862C6.10049 9.12192 6.79357 8.81467 7.52644 8.60056C7.75338 8.53427 7.86685 8.50112 7.92681 8.42113C7.98677 8.34115 7.98677 8.22743 7.98677 8C7.98677 6.89543 8.883 6 9.98855 6C11.0941 6 11.9903 6.89543 11.9903 8C11.9903 8.22739 11.9903 8.34108 12.0503 8.42107C12.1102 8.50105 12.2237 8.5342 12.4507 8.60049C13.1838 8.81464 13.8771 9.12199 14.5168 9.50883C14.722 9.63294 14.9935 9.48984 14.9935 9.25C14.9935 6.48858 12.753 4.25 9.98908 4.25C7.2252 4.25 4.98464 6.48858 4.98464 9.25Z',
  d8: 'M1.91577 16.25C1.60625 16.25 1.45149 16.25 1.36165 16.1446C1.27182 16.0391 1.29525 15.8934 1.34211 15.6018C1.56088 14.2408 2.0938 12.9847 2.86422 11.9102C2.92413 11.8266 2.95408 11.7848 2.96847 11.7401C2.98286 11.6953 2.98286 11.6462 2.98286 11.5482L2.98286 9.25C2.98286 5.38401 6.11965 2.25 9.98908 2.25C13.8585 2.25 16.9953 5.38401 16.9953 9.25V11.5493C16.9953 11.6473 16.9953 11.6964 17.0097 11.7411C17.0241 11.7859 17.054 11.8277 17.1139 11.9112C18.1416 13.345 18.7465 15.1019 18.7465 17V17.0279V17.0279C18.7465 17.9564 18.7465 19.102 18.3816 20.0105C18.1867 20.4957 17.8761 20.9495 17.385 21.2744C16.8966 21.5977 16.2953 21.75 15.5937 21.75H4.38371C3.68203 21.75 3.08081 21.5977 2.59233 21.2744C2.10126 20.9495 1.79066 20.4957 1.59575 20.0105C1.39397 19.5081 1.30378 18.9333 1.26347 18.3628C1.2436 18.0816 1.23367 17.941 1.32264 17.8455C1.41161 17.75 1.55768 17.75 1.84983 17.75H8.99046C9.40504 17.75 9.74112 17.4142 9.74112 17C9.74112 16.5858 9.40504 16.25 8.99046 16.25H1.91577ZM4.98464 9.25C4.98464 9.48963 5.25585 9.6326 5.4609 9.50862C6.78212 8.70978 8.33166 8.25 9.98868 8.25C11.6459 8.25 13.1955 8.70986 14.5168 9.50884C14.7221 9.63294 14.9935 9.48984 14.9935 9.25C14.9935 6.48858 12.753 4.25 9.98908 4.25C7.2252 4.25 4.98464 6.48858 4.98464 9.25Z',
  d9: 'M22.75 11C22.75 10.4477 22.3019 10 21.7491 10C20.0908 10 18.7464 11.3431 18.7464 13V15C18.7464 15.5523 18.2983 16 17.7456 16C17.1928 16 16.7447 16.4477 16.7447 17C16.7447 17.5523 17.1928 18 17.7456 18C19.4039 18 20.7482 16.6569 20.7482 15V13C20.7482 12.4477 21.1963 12 21.7491 12C22.3019 12 22.75 11.5523 22.75 11Z',
  d10: 'M7.98633 8V9H11.9899V8C11.9899 6.89543 11.0937 6 9.9881 6C8.88255 6 7.98633 6.89543 7.98633 8Z',
  d11: 'M2 21H18L18 17C18 12.5817 14.4183 9 10 9C5.58172 9 2 12.5817 2 17V21Z',
  d12: 'M18 17C19.1046 17 20 16.1045 20 15V10.9999L22 11',
  d13: 'M3.375 9.25C3.375 5.38401 6.50901 2.25 10.375 2.25C14.241 2.25 17.375 5.38401 17.375 9.25V11.75H15.375V9.25C15.375 6.48858 13.1364 4.25 10.375 4.25C7.61358 4.25 5.375 6.48858 5.375 9.25V11.75H3.375V9.25Z',
  d14: 'M19.6679 10.2929C19.8555 10.1053 20.1098 9.99999 20.375 10L22.375 10.0001L22.375 12.0001L21.375 12V15.0001C21.375 16.6569 20.0319 18.0001 18.375 18.0001V16.0001C18.9273 16.0001 19.375 15.5524 19.375 15.0001V11C19.375 10.7348 19.4804 10.4804 19.6679 10.2929Z',
  d15: 'M10.375 6C9.27043 6 8.375 6.89543 8.375 8V8.47962C4.74213 9.32905 1.97996 12.4419 1.65669 16.25H10.375V17.75H1.625V21C1.625 21.4142 1.96079 21.75 2.375 21.75H18.375C18.7892 21.75 19.125 21.4142 19.125 21L19.125 17C19.125 12.8556 16.2437 9.38419 12.375 8.47962V8C12.375 6.89543 11.4796 6 10.375 6Z',
};

export const IconKettleStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="kettle-stroke-rounded IconKettleStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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

export const IconKettleDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="kettle-duotone-rounded IconKettleDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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

export const IconKettleTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="kettle-twotone-rounded IconKettleTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconKettleSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="kettle-solid-rounded IconKettleSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconKettleBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="kettle-bulk-rounded IconKettleBulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconKettleStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="kettle-stroke-sharp IconKettleStrokeSharp"
    >
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconKettleSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="kettle-solid-sharp IconKettleSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfKettle: TheIconSelfPack = {
  name: 'Kettle',
  StrokeRounded: IconKettleStrokeRounded,
  DuotoneRounded: IconKettleDuotoneRounded,
  TwotoneRounded: IconKettleTwotoneRounded,
  SolidRounded: IconKettleSolidRounded,
  BulkRounded: IconKettleBulkRounded,
  StrokeSharp: IconKettleStrokeSharp,
  SolidSharp: IconKettleSolidSharp,
};