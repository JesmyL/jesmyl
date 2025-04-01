import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M9 5H19',
  d2: 'M5 5H5.00898',
  d3: 'M5 11.0037H5.00898',
  d4: 'M5 17.0073H5.00898',
  d5: 'M9 11.0037H19',
  d6: 'M9 17.0073H19M19 17.0073C19.0035 16.7466 18.8202 16.4895 18.5964 16.2997L16.9939 15.0258M19 17.0073C18.9966 17.2587 18.8142 17.5134 18.5964 17.7148L16.9939 19.0001',
  d7: 'M9 5L19 5',
  d8: 'M5 11H5.00898',
  d9: 'M5 17H5.00898',
  d10: 'M9 11L19 11',
  d11: 'M9 17L19 17',
  d12: 'M18.1716 18L18.6585 18.5705L18.6585 18.5705L18.1716 18ZM16.5131 18.4295C16.198 18.6985 16.1606 19.1719 16.4295 19.4869C16.6985 19.802 17.1719 19.8394 17.4869 19.5705L16.5131 18.4295ZM17.4869 14.4295C17.1719 14.1606 16.6985 14.198 16.4295 14.5131C16.1606 14.8281 16.198 15.3015 16.5131 15.5705L17.4869 14.4295ZM18.1716 16L18.6585 15.4295L18.6585 15.4295L18.1716 16ZM17.6847 17.4295L16.5131 18.4295L17.4869 19.5705L18.6585 18.5705L17.6847 17.4295ZM16.5131 15.5705L17.6847 16.5705L18.6585 15.4295L17.4869 14.4295L16.5131 15.5705ZM18.6585 18.5705C18.9178 18.3491 19.1721 18.1342 19.3521 17.9329C19.5416 17.7209 19.75 17.4155 19.75 17H18.25C18.25 16.8774 18.3204 16.8363 18.2337 16.9332C18.1375 17.0408 17.9776 17.1795 17.6847 17.4295L18.6585 18.5705ZM17.6847 16.5705C17.9776 16.8205 18.1375 16.9592 18.2337 17.0668C18.3204 17.1637 18.25 17.1226 18.25 17H19.75C19.75 16.5845 19.5416 16.2791 19.3521 16.0671C19.1721 15.8658 18.9178 15.6509 18.6585 15.4295L17.6847 16.5705Z',
  d13: 'M8.98145 4.99994H18.9814',
  d14: 'M4.98145 4.99994H4.99043',
  d15: 'M4.98145 10.9999H4.99043',
  d16: 'M4.98145 16.9999H4.99043',
  d17: 'M8.98145 10.9999H18.9814',
  d18: 'M8.98145 16.9999H18.9814',
  d19: 'M8.95215 17.0073H19.018M19.018 17.0073C19.0216 16.7467 18.7724 16.4895 18.5485 16.2998L16.946 15.0258M19.018 17.0073C19.0146 17.2588 18.7663 17.5135 18.5485 17.7149L16.946 19.0001',
  d20: 'M8 5C8 4.44772 8.44772 4 9 4L19 4C19.5523 4 20 4.44772 20 5C20 5.55229 19.5523 6 19 6L9 6C8.44772 6 8 5.55228 8 5Z',
  d21: 'M4 5C4 4.44772 4.44571 4 4.99553 4H5.00447C5.55429 4 6 4.44772 6 5C6 5.55228 5.55429 6 5.00447 6H4.99553C4.44571 6 4 5.55228 4 5Z',
  d22: 'M4 11C4 10.4477 4.44571 10 4.99553 10H5.00447C5.55429 10 6 10.4477 6 11C6 11.5523 5.55429 12 5.00447 12H4.99553C4.44571 12 4 11.5523 4 11Z',
  d23: 'M4 17C4 16.4477 4.44571 16 4.99553 16H5.00447C5.55429 16 6 16.4477 6 17C6 17.5523 5.55429 18 5.00447 18H4.99553C4.44571 18 4 17.5523 4 17Z',
  d24: 'M8 11C8 10.4477 8.44772 10 9 10L19 10C19.5523 10 20 10.4477 20 11C20 11.5523 19.5523 12 19 12L9 12C8.44772 12 8 11.5523 8 11Z',
  d25: 'M16.2394 14.3508C16.5979 13.9307 17.2291 13.8809 17.6492 14.2394L18.8592 15.2721C19.1015 15.4788 19.3543 15.6945 19.5385 15.9005C19.7451 16.1317 20 16.4948 20 17C20 17.5052 19.7451 17.8683 19.5385 18.0995C19.3543 18.3056 19.1015 18.5212 18.8592 18.7279L17.6492 19.7606C17.2291 20.1192 16.5979 20.0693 16.2394 19.6492C16.0785 19.4608 15.9999 19.2298 16 19V18.6C16 18.3172 16 18.1758 15.9121 18.0879C15.8243 18 15.6828 18 15.4 18L9 18C8.44772 18 8 17.5523 8 17C8 16.4477 8.44772 16 9 16L15.4 16C15.6828 16 15.8243 16 15.9121 15.9122C16 15.8243 16 15.6829 16 15.4V14.9933C16.0014 14.7657 16.0801 14.5374 16.2394 14.3508Z',
  d26: 'M5 11.007H5.00898',
  d27: 'M5 17.0139H5.00898',
  d28: 'M9 11.007H19',
  d29: 'M9 17.0139H18',
  d30: 'M16.0068 15.0164L17.9829 17.0027L16.0068 19.0019',
  d31: 'M19.5 5.74963L9.5 5.74963L9.5 3.74963L19.5 3.74963L19.5 5.74963Z',
  d32: 'M4.5 3.74963H6.50898V5.74963H4.5V3.74963Z',
  d33: 'M4.5 9.74963H6.50898V11.7496H4.5V9.74963Z',
  d34: 'M4.5 15.7496H6.50898V17.7496H4.5V15.7496Z',
  d35: 'M19.5 11.7496L9.5 11.7496L9.5 9.74963L19.5 9.74963L19.5 11.7496Z',
  d36: 'M18.5 17.7496L9.5 17.7496L9.5 15.7496L18.5 15.7496L18.5 17.7496Z',
  d37: 'M16.6707 16.7496L14.5841 14.6638L15.9983 13.2496L19.4991 16.7496L15.998 20.2504L14.5838 18.8362L16.6707 16.7496Z',
};

export const IconMoveToStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="move-to-stroke-rounded IconMoveToStrokeRounded"
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
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMoveToDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="move-to-duotone-rounded IconMoveToDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
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
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMoveToTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="move-to-twotone-rounded IconMoveToTwotoneRounded"
    >
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d14} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d15} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d16} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d17} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d18} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d19} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMoveToSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="move-to-solid-rounded IconMoveToSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d20} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d21} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d22} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d23} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const IconMoveToBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="move-to-bulk-rounded IconMoveToBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d20} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d21} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d22} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d23} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const IconMoveToStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="move-to-stroke-sharp IconMoveToStrokeSharp"
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
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d26} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d27} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d28} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d29} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d30} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconMoveToSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="move-to-solid-sharp IconMoveToSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d31} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d32} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d33} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d34} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d35} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d36} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d37} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfMoveTo: TheIconSelfPack = {
  name: 'MoveTo',
  StrokeRounded: IconMoveToStrokeRounded,
  DuotoneRounded: IconMoveToDuotoneRounded,
  TwotoneRounded: IconMoveToTwotoneRounded,
  SolidRounded: IconMoveToSolidRounded,
  BulkRounded: IconMoveToBulkRounded,
  StrokeSharp: IconMoveToStrokeSharp,
  SolidSharp: IconMoveToSolidSharp,
};