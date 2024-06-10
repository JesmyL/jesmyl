import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M7.36734 12.171L9.50123 14V4.25C9.50123 3.2835 10.2847 2.5 11.2512 2.5C12.2177 2.5 13.0012 3.2835 13.0012 4.25V9.5L15.9891 9.97757C17.9177 10.2669 18.8821 10.4115 19.5613 10.8184C20.6833 11.4906 21.4961 12.5 21.4961 13.9736C21.4961 15 21.2424 15.6886 20.6257 17.5387C20.2344 18.7127 20.0387 19.2996 19.7197 19.7643C19.1944 20.5293 18.4194 21.0878 17.5276 21.3442C16.9859 21.5 16.3672 21.5 15.1297 21.5H14.0808C12.4356 21.5 11.613 21.5 10.8807 21.1981C10.7494 21.144 10.621 21.0829 10.4962 21.0151C9.80014 20.6371 9.28143 19.9987 8.244 18.7219L4.8855 14.5883C4.36941 13.9531 4.36596 13.0441 4.87723 12.405C5.49174 11.6369 6.62046 11.5308 7.36734 12.171Z',
  d2: 'M16 4.5L20 4.5M16 4.5C16 5.06018 17.4943 6.10678 18 6.5M16 4.5C16 3.93982 17.4943 2.89322 18 2.5',
  d3: 'M6.5 4.5L2.5 4.5M6.5 4.5C6.5 3.93982 5.0057 2.89322 4.5 2.5M6.5 4.5C6.5 5.06018 5.0057 6.10678 4.5 6.5',
  d4: 'M8.87818 4.25C8.87818 2.86929 9.99747 1.75 11.3782 1.75C12.7589 1.75 13.8782 2.86929 13.8782 4.25V8.86036L16.2537 9.23982C17.1957 9.38112 17.9389 9.4926 18.5299 9.62099C19.1305 9.75147 19.6326 9.91078 20.0737 10.1751C21.3512 10.9404 22.373 12.1633 22.373 13.9736C22.373 15.0606 22.1106 15.8446 21.5957 17.3824C21.2418 18.4448 20.8446 19.6359 20.4649 20.1888C19.8411 21.0973 18.9209 21.7605 17.8618 22.065C17.2171 22.2504 16.4989 22.2503 15.3792 22.25L14.0496 22.25H14.0496C12.5572 22.2505 11.5932 22.2507 10.7218 21.8915C10.5659 21.8273 10.4135 21.7547 10.2652 21.6742C9.43697 21.2244 8.82933 20.4761 7.88853 19.3175L4.43037 15.0613C3.69173 14.1522 3.68681 12.8511 4.41853 11.9365C5.29802 10.8371 6.91345 10.6853 7.98239 11.6015L8.87818 12.3693V4.25Z',
  d5: 'M5.33734 7.0921C5.01035 7.34637 4.53915 7.28741 4.28488 6.96042C4.17835 6.82341 4.12683 6.66108 4.12695 6.5V5.49995L2.62695 5.49995C2.07467 5.49995 1.62695 5.05223 1.62695 4.49995C1.62695 3.94766 2.07467 3.49995 2.62695 3.49995H4.12695V2.5068C4.12537 2.34352 4.17686 2.17857 4.28488 2.03965C4.53915 1.71266 5.01035 1.6537 5.33734 1.90796C5.38939 1.94844 5.45947 2.00131 5.5422 2.0637L5.54221 2.06371C5.80993 2.26565 6.21001 2.56744 6.55947 2.87212C6.79091 3.0739 7.03084 3.3025 7.21878 3.53496C7.31306 3.65156 7.40771 3.78548 7.48145 3.93173C7.55265 4.07295 7.62695 4.26987 7.62695 4.50003C7.62695 4.7302 7.55265 4.92712 7.48145 5.06834C7.40771 5.21459 7.31306 5.34851 7.21878 5.46511C7.03084 5.69756 6.79091 5.92616 6.55947 6.12795C6.21 6.43264 5.80993 6.73442 5.54221 6.93636C5.45949 6.99875 5.38939 7.05163 5.33734 7.0921Z',
  d6: 'M17.4166 7.0921C17.7436 7.34637 18.2148 7.28741 18.469 6.96042C18.5756 6.82341 18.6271 6.66108 18.627 6.5V5.49995L20.127 5.49995C20.6792 5.49995 21.127 5.05223 21.127 4.49995C21.127 3.94766 20.6792 3.49995 20.127 3.49995H18.627V2.5068C18.6285 2.34352 18.577 2.17857 18.469 2.03965C18.2148 1.71266 17.7436 1.6537 17.4166 1.90796C17.3645 1.94844 17.2944 2.00131 17.2117 2.0637L17.2117 2.06371C16.944 2.26565 16.5439 2.56744 16.1944 2.87212C15.963 3.0739 15.7231 3.3025 15.5351 3.53496C15.4408 3.65156 15.3462 3.78548 15.2725 3.93173C15.2013 4.07295 15.127 4.26987 15.127 4.50003C15.127 4.7302 15.2013 4.92712 15.2725 5.06834C15.3462 5.21459 15.4408 5.34851 15.5351 5.46511C15.7231 5.69756 15.963 5.92616 16.1944 6.12795C16.5439 6.43264 16.944 6.73442 17.2117 6.93636C17.2944 6.99875 17.3645 7.05163 17.4166 7.0921Z',
  d7: 'M20.4926 3.99854H16.5247M17.994 5.99854L15.9951 3.99854L17.994 1.99854',
  d8: 'M3.00195 3.99854H7.07654M5.50053 1.99854L7.49939 3.99854L5.50053 5.99854',
  d9: 'M7.85384 12.6603L10.044 14.5307V4.60262C10.044 3.67513 10.8768 2.97705 11.8263 2.97705C12.7753 2.97705 13.4707 3.72804 13.4715 4.65496V10.4914H18.1235C19.7054 10.4914 21.1088 12.0233 20.9915 13.6084V19.2038C20.9915 20.7489 19.7091 22.0015 18.1271 22.0015H10.0354L5.34485 15.0809C4.8231 14.4448 4.81962 13.5347 5.33648 12.8947C5.95771 12.1256 7.09879 12.0193 7.85384 12.6603Z',
  d10: 'M9.25514 5C9.25514 3.61929 10.3744 2.5 11.7551 2.5C13.1358 2.5 14.2551 3.61929 14.2551 5V9.97758H18C20.0711 9.97758 21.75 11.6565 21.75 13.7276V19.25C21.75 21.3211 20.0711 23 18 23H10C9.74931 23 9.5152 22.8747 9.37608 22.6662L4.78334 15.7813C4.06867 14.8738 4.07177 13.5911 4.79549 12.6865C5.67497 11.5871 7.29041 11.4353 8.35934 12.3515L9.25514 13.1193V5Z',
  d11: 'M18.5429 1L19.9571 2.41421L19.1642 3.20711H21.25V5.20711H19.1642L19.9571 6L18.5429 7.41421L15.3358 4.20711L18.5429 1Z',
  d12: 'M4.95711 1.00009L8.16421 4.2072L4.95711 7.41431L3.54289 6.00009L4.33579 5.2072H2.25V3.2072H4.33579L3.54289 2.41431L4.95711 1.00009Z',
};

export const IconResize02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="resize-02-stroke-rounded IconResize02StrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconResize02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="resize-02-duotone-rounded IconResize02DuotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconResize02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="resize-02-twotone-rounded IconResize02TwotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconResize02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="resize-02-solid-rounded IconResize02SolidRounded"
    >
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconResize02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="resize-02-bulk-rounded IconResize02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconResize02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="resize-02-stroke-sharp IconResize02StrokeSharp"
    >
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
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
    </TheIconWrapper>
  );
};

export const IconResize02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="resize-02-solid-sharp IconResize02SolidSharp"
    >
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const iconPackOfResize02: TheIconSelfPack = {
  name: 'Resize02',
  StrokeRounded: IconResize02StrokeRounded,
  DuotoneRounded: IconResize02DuotoneRounded,
  TwotoneRounded: IconResize02TwotoneRounded,
  SolidRounded: IconResize02SolidRounded,
  BulkRounded: IconResize02BulkRounded,
  StrokeSharp: IconResize02StrokeSharp,
  SolidSharp: IconResize02SolidSharp,
};