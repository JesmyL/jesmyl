import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M19.4955 12.6324L19.8592 13.2648C21.5848 16.2653 22.4476 17.7656 21.7671 18.8828C21.0866 20 19.3099 20 15.7567 20H15M4.50453 12.6324L4.14082 13.2648C2.41522 16.2653 1.55242 17.7656 2.23293 18.8828C2.91344 20 4.69006 20 8.24328 20H9M7.5331 7.36631L7.89754 6.73262C9.71204 3.57754 10.6193 2 12 2C13.3807 2 14.288 3.57754 16.1025 6.73262L16.4669 7.36631',
  d2: 'M12 18V22',
  d3: 'M19.6602 9L16.1961 11',
  d4: 'M4.33984 9L7.80395 11',
  d5: 'M7.89754 6.73262C9.71204 3.57754 10.6193 2 12 2C13.3807 2 14.288 3.57754 16.1025 6.73262L19.8592 13.2648C21.5848 16.2653 22.4476 17.7656 21.7671 18.8828C21.0866 20 19.3099 20 15.7567 20H8.24328C4.69006 20 2.91344 20 2.23293 18.8828C1.55242 17.7656 2.41522 16.2653 4.14082 13.2648L7.89754 6.73262Z',
  d6: 'M10.8948 3.80494C10.3265 4.52083 9.68886 5.62404 8.76459 7.23116L8.40015 7.86485C8.12482 8.34361 7.5135 8.50851 7.03475 8.23318C6.55599 7.95784 6.39108 7.34653 6.66642 6.86777L7.03086 6.23408C7.04528 6.209 7.05967 6.18399 7.074 6.15906C7.94453 4.64529 8.65545 3.40906 9.32844 2.56137C10.0202 1.69008 10.8493 1 12.0002 1C13.1511 1 13.9802 1.69008 14.6719 2.56137C15.3449 3.40906 16.0559 4.6453 16.9264 6.15907L17.334 6.86777C17.6093 7.34653 17.4444 7.95784 16.9656 8.23318C16.4869 8.50851 15.8756 8.34361 15.6002 7.86485L15.2358 7.23116C14.3115 5.62404 13.6739 4.52083 13.1056 3.80494C12.5449 3.09869 12.23 3 12.0002 3C11.7704 3 11.4555 3.09869 10.8948 3.80494ZM18.9971 11.7655C19.4759 11.4902 20.0872 11.6551 20.3625 12.1339L20.7697 12.8418C21.5956 14.2778 22.2736 15.4566 22.6475 16.4173C23.0323 17.4059 23.2069 18.4416 22.6213 19.403C22.0434 20.3518 21.0462 20.6974 19.9814 20.8502C18.9369 21.0001 17.546 21 15.8398 21H15.0002C14.4479 21 14.0002 20.5523 14.0002 20C14.0002 19.4477 14.4479 19 15.0002 19H15.7569C17.5661 19 18.812 18.9975 19.6973 18.8705C20.5793 18.7439 20.8106 18.531 20.9132 18.3626C21.0082 18.2067 21.0916 17.9337 20.7837 17.1428C20.4715 16.3407 19.8726 15.2937 18.9925 13.7634L18.6288 13.131C18.3535 12.6522 18.5184 12.0409 18.9971 11.7655ZM5.00326 11.7655C5.48201 12.0409 5.64692 12.6522 5.37158 13.131L5.00788 13.7634C4.1278 15.2937 3.52887 16.3407 3.21667 17.1428C2.90879 17.9337 2.99222 18.2067 3.08716 18.3626C3.18977 18.531 3.4211 18.7439 4.30305 18.8705C5.1884 18.9975 6.43427 19 8.24347 19H9.00019C9.55247 19 10.0002 19.4477 10.0002 20C10.0002 20.5523 9.55247 21 9.00019 21H8.16054C6.45441 21 5.06352 21.0001 4.01901 20.8502C2.95421 20.6974 1.95698 20.3518 1.37908 19.403C0.793515 18.4416 0.968091 17.4059 1.35288 16.4173C1.72681 15.4566 2.40483 14.2778 3.2307 12.8418L3.63785 12.1339C3.91319 11.6551 4.5245 11.4902 5.00326 11.7655Z',
  d7: 'M12 17C12.5523 17 13 17.4477 13 18V22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22V18C11 17.4477 11.4477 17 12 17Z',
  d8: 'M20.5273 8.49884C20.8035 8.97713 20.6396 9.58872 20.1613 9.86486L16.6972 11.8649C16.2189 12.141 15.6073 11.9771 15.3312 11.4988C15.055 11.0205 15.2189 10.409 15.6972 10.1328L19.1613 8.13281C19.6396 7.85667 20.2512 8.02055 20.5273 8.49884Z',
  d9: 'M3.47266 8.50116C3.7488 8.02287 4.36039 7.85899 4.83868 8.13514L8.30278 10.1351C8.78108 10.4113 8.94495 11.0229 8.66881 11.5012C8.39267 11.9795 7.78108 12.1433 7.30278 11.8672L3.83868 9.86719C3.36039 9.59105 3.19651 8.97945 3.47266 8.50116Z',
  d10: 'M8.11111 9L12 2L15.8889 9M5.88889 13L2 20H9.5M18.1111 13L22 20H14.5',
  d11: 'M18.9639 10L15.4998 12',
  d12: 'M5 10L8.4641 12',
  d13: 'M12 1.5C12.3632 1.5 12.6978 1.69689 12.8742 2.01436L16.763 9.01436L15.0147 9.98564L12 4.55913L8.98527 9.98564L7.23695 9.01436L11.1258 2.01436C11.3022 1.69689 11.6368 1.5 12 1.5ZM3.69951 19.5L6.76305 13.9856L5.01473 13.0144L1.12584 20.0144C0.95377 20.3241 0.958444 20.7017 1.13813 21.0071C1.31781 21.3125 1.64568 21.5 2 21.5H9.5V19.5H3.69951ZM20.3005 19.5L17.237 13.9856L18.9853 13.0144L22.8742 20.0144C23.0462 20.3241 23.0416 20.7017 22.8619 21.0071C22.6822 21.3125 22.3543 21.5 22 21.5H14.5V19.5H20.3005Z',
  d14: 'M11 22.5V18.5H13V22.5H11Z',
  d15: 'M14.9998 11.6338L18.4639 9.63379L19.4639 11.3658L15.9998 13.3658L14.9998 11.6338Z',
  d16: 'M7.9641 13.3662L4.5 11.3662L5.5 9.63416L8.9641 11.6342L7.9641 13.3662Z',
};

export const IconTriangle02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="triangle-02-stroke-rounded IconTriangle02StrokeRounded"
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTriangle02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="triangle-02-duotone-rounded IconTriangle02DuotoneRounded"
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTriangle02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="triangle-02-twotone-rounded IconTriangle02TwotoneRounded"
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
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTriangle02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="triangle-02-solid-rounded IconTriangle02SolidRounded"
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

export const IconTriangle02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="triangle-02-bulk-rounded IconTriangle02BulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
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
    </TheIconWrapper>
  );
};

export const IconTriangle02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="triangle-02-stroke-sharp IconTriangle02StrokeSharp"
    >
      <path 
        d={d.d10} 
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
        d={d.d11} 
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
    </TheIconWrapper>
  );
};

export const IconTriangle02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="triangle-02-solid-sharp IconTriangle02SolidSharp"
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
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfTriangle02: TheIconSelfPack = {
  name: 'Triangle02',
  StrokeRounded: IconTriangle02StrokeRounded,
  DuotoneRounded: IconTriangle02DuotoneRounded,
  TwotoneRounded: IconTriangle02TwotoneRounded,
  SolidRounded: IconTriangle02SolidRounded,
  BulkRounded: IconTriangle02BulkRounded,
  StrokeSharp: IconTriangle02StrokeSharp,
  SolidSharp: IconTriangle02SolidSharp,
};