import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M17.5798 9.71016C17.0765 9.57314 16.5468 9.5 16 9.5C13.4668 9.5 11.3002 11.0699 10.4202 13.2898M17.5798 9.71016C20.1271 10.4036 22 12.7331 22 15.5C22 18.8137 19.3137 21.5 16 21.5C14.4633 21.5 13.0615 20.9223 12 19.9722M17.5798 9.71016C17.851 9.02618 18 8.2805 18 7.5C18 4.18629 15.3137 1.5 12 1.5C8.68629 1.5 6 4.18629 6 7.5C6 8.2805 6.14903 9.02618 6.42018 9.71016M10.4202 13.2898C10.149 13.9738 10 14.7195 10 15.5C10 17.277 10.7725 18.8736 12 19.9722M10.4202 13.2898C8.59146 12.792 7.11029 11.451 6.42018 9.71016M6.42018 9.71016C3.87294 10.4036 2 12.7331 2 15.5C2 18.8137 4.68629 21.5 8 21.5C9.53671 21.5 10.9385 20.9223 12 19.9722',
  d2: 'M12 1.5C8.68629 1.5 6 4.18629 6 7.5C6 8.2805 6.14903 9.02618 6.42018 9.71016C7.11029 11.451 8.59146 12.792 10.4202 13.2898C11.3002 11.0699 13.4668 9.5 16 9.5C16.5468 9.5 17.0765 9.57314 17.5798 9.71016C17.851 9.02618 18 8.2805 18 7.5C18 4.18629 15.3137 1.5 12 1.5Z',
  d3: 'M16 20.9996C19.3137 20.9996 22 18.4476 22 15.2996C22 12.671 20.1271 10.458 17.5798 9.79926C17.0765 9.66909 16.5468 9.59961 16 9.59961C13.4668 9.59961 11.3002 11.091 10.4202 13.2C10.149 13.8497 10 14.5581 10 15.2996C10 16.9878 10.7725 18.5045 12 19.5482C13.0615 20.4508 14.4633 20.9996 16 20.9996Z',
  d4: 'M17.5798 9.71016C17.0765 9.57314 16.5468 9.5 16 9.5C13.4668 9.5 11.3002 11.0699 10.4202 13.2898M17.5798 9.71016C20.1271 10.4036 22 12.7331 22 15.5C22 18.8137 19.3137 21.5 16 21.5C14.4633 21.5 13.0615 20.9223 12 19.9722C10.7725 18.8736 10 17.277 10 15.5C10 14.7195 10.149 13.9738 10.4202 13.2898M17.5798 9.71016C17.851 9.02618 18 8.2805 18 7.5C18 4.18629 15.3137 1.5 12 1.5C8.68629 1.5 6 4.18629 6 7.5C6 8.2805 6.14903 9.02618 6.42018 9.71016C7.11029 11.451 8.59146 12.792 10.4202 13.2898',
  d5: 'M6.5 10C3.95276 10.6934 2 12.7331 2 15.5C2 18.8138 4.68629 21.5 8 21.5C9.53671 21.5 10.9385 20.9223 12 19.9723',
  d6: 'M5.25 8C5.25 4.27208 8.27208 1.25 12 1.25C15.7279 1.25 18.75 4.27208 18.75 8C18.75 8.06385 18.75 8.09578 18.7446 8.12394C18.7154 8.27516 18.574 8.38066 18.4208 8.36566C18.3922 8.36287 18.3541 8.35157 18.278 8.32899C17.556 8.11492 16.7914 8 16 8C12.6711 8 9.81706 10.0333 8.61206 12.9256C8.46403 13.281 8.39001 13.4586 8.24327 13.4949C8.09654 13.5312 7.96484 13.4223 7.70144 13.2046C6.20411 11.9665 5.25 10.0947 5.25 8ZM9.25 16C9.25 12.2721 12.2721 9.25 16 9.25C19.7279 9.25 22.75 12.2721 22.75 16C22.75 19.7279 19.7279 22.75 16 22.75C12.2721 22.75 9.25 19.7279 9.25 16ZM8.02538 15.36C8.00857 15.5717 8 15.7858 8 16.0019C8 18.12 8.82313 20.0458 10.167 21.477C10.472 21.8019 10.6246 21.9643 10.5817 22.1254C10.5387 22.2865 10.3498 22.3441 9.97199 22.4593C9.34819 22.6496 8.68605 22.7519 8 22.7519C4.27208 22.7519 1.25 19.7298 1.25 16.0019C1.25 13.9072 2.20418 12.0353 3.70161 10.7972C3.965 10.5795 4.0967 10.4706 4.24343 10.5069C4.39016 10.5432 4.46416 10.7208 4.61215 11.076C5.2393 12.5812 6.3127 13.8533 7.66512 14.7266L7.7468 14.7794C7.89871 14.8775 7.97467 14.9265 8.01134 15.0007C8.04802 15.0749 8.04047 15.1699 8.02538 15.36Z',
  d7: 'M9.25 16C9.25 12.2721 12.2721 9.25 16 9.25C19.7279 9.25 22.75 12.2721 22.75 16C22.75 19.7279 19.7279 22.75 16 22.75C12.2721 22.75 9.25 19.7279 9.25 16Z',
  d8: 'M5.25 8C5.25 4.27208 8.27208 1.25 12 1.25C15.7279 1.25 18.75 4.27208 18.75 8C18.75 8.06385 18.75 8.09578 18.7446 8.12394C18.7154 8.27516 18.574 8.38066 18.4208 8.36566C18.3922 8.36287 18.3541 8.35157 18.278 8.32899C17.556 8.11492 16.7914 8 16 8C12.6711 8 9.81706 10.0333 8.61206 12.9256C8.46403 13.281 8.39001 13.4586 8.24327 13.4949C8.09654 13.5312 7.96484 13.4223 7.70144 13.2046C6.20411 11.9665 5.25 10.0947 5.25 8Z',
  d9: 'M8 16.0019C8 15.7858 8.00857 15.5717 8.02538 15.36C8.04047 15.1699 8.04802 15.0749 8.01134 15.0007C7.97467 14.9265 7.89871 14.8775 7.7468 14.7794L7.66512 14.7266C6.3127 13.8533 5.2393 12.5812 4.61215 11.076C4.46416 10.7208 4.39016 10.5432 4.24343 10.5069C4.0967 10.4706 3.965 10.5795 3.70161 10.7972C2.20418 12.0353 1.25 13.9072 1.25 16.0019C1.25 19.7298 4.27208 22.7519 8 22.7519C8.68605 22.7519 9.34819 22.6496 9.97199 22.4593C10.3498 22.3441 10.5387 22.2865 10.5817 22.1254C10.6246 21.9643 10.472 21.8019 10.167 21.477C8.82313 20.0458 8 18.12 8 16.0019Z',
  d10: 'M12 1.25C8.63032 1.25 5.89865 3.98167 5.89865 7.35135C5.89865 8.14663 6.05036 8.90436 6.32562 9.5987C6.93796 11.1433 8.16361 12.3788 9.70023 13.0046C11.012 10.5083 13.6304 8.80405 16.6486 8.80405C17.0749 8.80405 17.4937 8.83814 17.9023 8.90382C18.0321 8.40878 18.1014 7.88864 18.1014 7.35135C18.1014 3.98167 15.3697 1.25 12 1.25Z',
  d11: 'M10.693 21.7545C9.51624 20.3829 8.80405 18.5985 8.80405 16.6486C8.80405 15.9512 8.89529 15.274 9.06674 14.6289C7.33597 13.9308 5.91254 12.6341 5.05153 10.9953C2.82132 11.9035 1.25 14.0935 1.25 16.6486C1.25 20.0183 3.98167 22.75 7.35135 22.75C8.5856 22.75 9.73312 22.3842 10.693 21.7545Z',
  d12: 'M16.6486 10.5473C14.074 10.5473 11.8698 12.1423 10.9743 14.4013C10.699 15.0956 10.5473 15.8534 10.5473 16.6486C10.5473 18.4556 11.3317 20.0782 12.5813 21.1966C13.6613 22.1633 15.0854 22.75 16.6486 22.75C20.0183 22.75 22.75 20.0183 22.75 16.6486C22.75 13.8362 20.8463 11.4662 18.2557 10.7609C17.7447 10.6218 17.206 10.5473 16.6486 10.5473Z',
};

export const IconColorsStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="colors-stroke-rounded IconColorsStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconColorsDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="colors-duotone-rounded IconColorsDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
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
    </TheIconWrapper>
  );
};

export const IconColorsTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="colors-twotone-rounded IconColorsTwotoneRounded"
    >
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconColorsSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="colors-solid-rounded IconColorsSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconColorsBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="colors-bulk-rounded IconColorsBulkRounded"
    >
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconColorsStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="colors-stroke-sharp IconColorsStrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconColorsSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="colors-solid-sharp IconColorsSolidSharp"
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
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfColors: TheIconSelfPack = {
  name: 'Colors',
  StrokeRounded: IconColorsStrokeRounded,
  DuotoneRounded: IconColorsDuotoneRounded,
  TwotoneRounded: IconColorsTwotoneRounded,
  SolidRounded: IconColorsSolidRounded,
  BulkRounded: IconColorsBulkRounded,
  StrokeSharp: IconColorsStrokeSharp,
  SolidSharp: IconColorsSolidSharp,
};