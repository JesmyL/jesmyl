import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M19.5 5.5L19.0982 12.0062M4.5 5.5L5.10461 15.5248C5.25945 18.0922 5.33688 19.3759 5.97868 20.299C6.296 20.7554 6.7048 21.1407 7.17905 21.4302C7.85035 21.84 8.68108 21.9631 10 22',
  d2: 'M20 15L13 21.9995M20 22L13 15.0005',
  d3: 'M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5',
  d4: 'M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5H19.5Z',
  d5: 'M21 5.5H3',
  d6: 'M16.0575 5.5L15.3748 4.09173C14.9213 3.15626 14.6946 2.68852 14.3035 2.39681C14.2167 2.3321 14.1249 2.27454 14.0288 2.2247C13.5957 2 13.0759 2 12.0363 2C10.9706 2 10.4377 2 9.99745 2.23412C9.89986 2.28601 9.80675 2.3459 9.71906 2.41317C9.3234 2.7167 9.10239 3.20155 8.66037 4.17126L8.05469 5.5',
  d7: 'M13.3473 1.28277C13.9124 1.33331 14.4435 1.50576 14.8996 1.84591C15.2369 2.09748 15.4712 2.40542 15.6714 2.73893C15.8569 3.04798 16.0437 3.4333 16.2555 3.8704L16.6823 4.7507H21C21.5523 4.7507 22 5.19842 22 5.7507C22 6.30299 21.5523 6.7507 21 6.7507C14.9998 6.7507 9.00019 6.7507 3 6.7507C2.44772 6.7507 2 6.30299 2 5.7507C2 5.19842 2.44772 4.7507 3 4.7507H7.40976L7.76556 3.97016C7.97212 3.51696 8.15403 3.11782 8.33676 2.79754C8.53387 2.45207 8.76721 2.13237 9.10861 1.87046C9.57032 1.51626 10.1121 1.33669 10.6899 1.28409C11.1249 1.24449 11.5634 1.24994 12 1.25064C12.5108 1.25146 12.97 1.24902 13.3473 1.28277ZM9.60776 4.7507H14.4597C14.233 4.28331 14.088 3.98707 13.9566 3.7682C13.7643 3.44787 13.5339 3.30745 13.1691 3.27482C12.9098 3.25163 12.5719 3.2507 12.0345 3.2507C11.4837 3.2507 11.137 3.25166 10.8712 3.27585C10.4971 3.30991 10.2639 3.45568 10.0739 3.78866C9.94941 4.00687 9.81387 4.29897 9.60776 4.7507Z',
  d8: 'M21.7071 14.0429C22.0976 14.4335 22.0976 15.0666 21.7071 15.4571L18.914 18.25L21.7071 21.0429C22.0976 21.4334 22.0976 22.0665 21.7071 22.4571C21.3166 22.8476 20.6835 22.8476 20.2929 22.4571L17.4998 19.6642L14.7071 22.4567C14.3165 22.8472 13.6834 22.8472 13.2929 22.4566C12.9024 22.0661 12.9024 21.4329 13.2929 21.0424L16.0855 18.25L13.2929 15.4576C12.9024 15.0671 12.9024 14.4339 13.2929 14.0434C13.6834 13.6528 14.3165 13.6528 14.7071 14.0433L17.4998 16.8358L20.2929 14.0429C20.6835 13.6524 21.3166 13.6524 21.7071 14.0429Z',
  d9: 'M8.91118 22.6734C8.09286 22.5949 7.40536 22.4307 6.78992 22.0552C6.22691 21.7117 5.74159 21.2547 5.3649 20.7133C4.95312 20.1214 4.74784 19.4448 4.62016 18.6325C4.49566 17.8404 4.43582 16.8487 4.36041 15.5991L3.76962 5.80992C3.73962 5.31291 3.72463 5.0644 3.87348 4.9072C4.02233 4.75 4.27264 4.75 4.77325 4.75H19.2262C19.7274 4.75 19.9781 4.75 20.127 4.90746C20.2758 5.06493 20.2605 5.31373 20.2297 5.81135L19.8453 12.0317C19.8308 12.2665 19.8235 12.3839 19.7805 12.4724C19.7375 12.561 19.615 12.6706 19.3701 12.8897C19.3368 12.9195 19.3041 12.9503 19.2721 12.9822L18.2411 14.0075C17.9059 14.3408 17.7384 14.5075 17.5301 14.5075C17.3219 14.5075 17.1543 14.3408 16.8192 14.0075L15.7887 12.9826C14.807 12.0064 13.2155 12.0064 12.2339 12.9828C11.2523 13.9591 11.2524 15.542 12.234 16.5183L13.2642 17.5429C13.5994 17.8762 13.767 18.0429 13.767 18.25C13.767 18.4571 13.5994 18.6238 13.2642 18.9571L12.234 19.9817C11.6364 20.5761 11.4026 21.3953 11.5326 22.1656C11.5825 22.461 11.6074 22.6087 11.5469 22.6796C11.4863 22.7505 11.3551 22.75 11.0927 22.7489C10.2347 22.7456 9.51673 22.7316 8.91118 22.6734Z',
  d10: 'M19.5 5.5L19.1061 12M4.5 5.5L5.5 22H10',
  d11: 'M2 5.5H8M22 5.5H16M16 5.5L14.5 2H9.5L8 5.5M16 5.5H8',
  d12: 'M16.4998 17.0858L19.2929 14.2929L20.7071 15.7071L17.914 18.5L20.7071 21.2929L19.2929 22.7071L16.4998 19.9142L13.7071 22.7067L12.2929 21.2924L15.0855 18.5L12.2929 15.7076L13.7071 14.2933L16.4998 17.0858Z',
  d13: 'M3.75137 5.54538L4.75137 22.0454C4.77537 22.4412 5.10341 22.75 5.5 22.75H11.6295L10.1719 21.2923L12.9644 18.4999L10.1719 15.7076L13.7073 12.172L16.5 14.9645L19.8828 11.5819L20.2486 5.54538H3.75137Z',
  d14: 'M8.58085 1.85608C8.73843 1.4884 9.09997 1.25 9.5 1.25H14.5C14.9 1.25 15.2616 1.4884 15.4191 1.85608L16.6594 4.75H22V6.75H2V4.75H7.3406L8.58085 1.85608ZM9.51654 4.75H14.4835L13.8406 3.25H10.1594L9.51654 4.75Z',
};

export const IconDelete04StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="delete-04-stroke-rounded IconDelete04StrokeRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconDelete04DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="delete-04-duotone-rounded IconDelete04DuotoneRounded"
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
      />
      <path 
        d={d.d2} 
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

export const IconDelete04TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="delete-04-twotone-rounded IconDelete04TwotoneRounded"
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

export const IconDelete04SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="delete-04-solid-rounded IconDelete04SolidRounded"
    >
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
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconDelete04BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="delete-04-bulk-rounded IconDelete04BulkRounded"
    >
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
        opacity="var(--icon-opacity)" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconDelete04StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="delete-04-stroke-sharp IconDelete04StrokeSharp"
    >
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d10} 
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
    </TheIconWrapper>
  );
};

export const IconDelete04SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="delete-04-solid-sharp IconDelete04SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfDelete04: TheIconSelfPack = {
  name: 'Delete04',
  StrokeRounded: IconDelete04StrokeRounded,
  DuotoneRounded: IconDelete04DuotoneRounded,
  TwotoneRounded: IconDelete04TwotoneRounded,
  SolidRounded: IconDelete04SolidRounded,
  BulkRounded: IconDelete04BulkRounded,
  StrokeSharp: IconDelete04StrokeSharp,
  SolidSharp: IconDelete04SolidSharp,
};