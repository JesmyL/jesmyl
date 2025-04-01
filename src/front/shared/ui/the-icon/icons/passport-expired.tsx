import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M22 11V13C22 17.2426 22 19.364 20.5355 20.682C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.682C2 19.364 2 17.2426 2 13C2 8.75736 2 6.63604 3.46447 5.31802C4.92893 4 7.28595 4 12 4H13',
  d2: 'M5 17.5C6.20831 14.9189 10.7122 14.7491 12 17.5M10.5 10.5C10.5 11.6046 9.60457 12.5 8.5 12.5C7.39543 12.5 6.5 11.6046 6.5 10.5C6.5 9.39543 7.39543 8.5 8.5 8.5C9.60457 8.5 10.5 9.39543 10.5 10.5Z',
  d3: 'M16 2L19 5M19 5L22 8M19 5L16 8M19 5L22 2',
  d4: 'M3.46447 5.31802C2 6.63604 2 8.75736 2 13C2 17.2426 2 19.364 3.46447 20.682C4.92893 22 7.28596 22 12 22C16.714 22 19.0711 22 20.5355 20.682C22 19.364 22 17.2426 22 13C22 8.75736 22 6.63604 20.5355 5.31802C19.0711 4 16.714 4 12 4C7.28596 4 4.92893 4 3.46447 5.31802ZM10.5 10.5C10.5 11.6046 9.60457 12.5 8.5 12.5C7.39543 12.5 6.5 11.6046 6.5 10.5C6.5 9.39543 7.39543 8.5 8.5 8.5C9.60457 8.5 10.5 9.39543 10.5 10.5ZM5 17.5C6.20831 14.9189 10.7122 14.7491 12 17.5H5Z',
  d5: 'M12.0522 3.25C12.5436 3.25 13.0121 3.25 13.4587 3.25163C13.5802 3.52972 13.7547 3.79022 13.9822 4.01777L15.2145 5.25L13.9822 6.48223C13.0059 7.45854 13.0059 9.04146 13.9822 10.0178C14.9585 10.9941 16.5415 10.9941 17.5178 10.0178L18.75 8.78553L19.9822 10.0178C20.7263 10.7618 21.8226 10.9388 22.7342 10.5488C22.75 11.319 22.75 12.1617 22.75 13.0624V13.0625C22.75 15.1308 22.75 16.7678 22.5587 18.0485C22.3609 19.3725 21.9452 20.4223 21.0373 21.2395C20.1406 22.0464 19.0078 22.4066 17.5765 22.5798C16.1699 22.75 14.365 22.75 12.0522 22.75C9.73935 22.75 7.83014 22.75 6.42355 22.5798C4.99222 22.4066 3.85936 22.0464 2.96274 21.2395C2.05481 20.4223 1.63908 19.3725 1.44129 18.0485C1.24997 16.7678 1.24998 15.1308 1.25 13.0625V13.0625C1.24998 10.9942 1.24997 9.23221 1.44129 7.95147C1.63908 6.62747 2.05481 5.57769 2.96274 4.76055C3.85936 3.95359 4.99222 3.59338 6.42355 3.42018C7.83014 3.24998 9.73934 3.24999 12.0522 3.25H12.0522ZM8.50018 7.75C6.9814 7.75 5.75018 8.98122 5.75018 10.5C5.75018 12.0188 6.9814 13.25 8.50018 13.25C10.019 13.25 11.2502 12.0188 11.2502 10.5C11.2502 8.98122 10.019 7.75 8.50018 7.75ZM5.67943 17.818C6.12793 16.8599 7.24064 16.2687 8.48144 16.2504C9.7131 16.2322 10.8358 16.7818 11.3209 17.818C11.4965 18.1931 11.943 18.3549 12.3182 18.1793C12.6933 18.0036 12.855 17.5572 12.6794 17.182C11.8767 15.4673 10.1036 14.7263 8.45929 14.7506C6.82412 14.7747 5.08074 15.559 4.32093 17.182C4.14531 17.5572 4.30705 18.0036 4.68219 18.1793C5.05733 18.3549 5.50381 18.1931 5.67943 17.818Z',
  d6: 'M15.0429 1.54289C15.4334 1.15237 16.0666 1.15237 16.4571 1.54289L18.75 3.83579L21.0429 1.54289C21.4334 1.15237 22.0666 1.15237 22.4571 1.54289C22.8476 1.93342 22.8476 2.56658 22.4571 2.95711L20.1642 5.25L22.4571 7.54289C22.8476 7.93342 22.8476 8.56658 22.4571 8.95711C22.0666 9.34763 21.4334 9.34763 21.0429 8.95711L18.75 6.66421L16.4571 8.95711C16.0666 9.34763 15.4334 9.34763 15.0429 8.95711C14.6524 8.56658 14.6524 7.93342 15.0429 7.54289L17.3358 5.25L15.0429 2.95711C14.6524 2.56658 14.6524 1.93342 15.0429 1.54289Z',
  d7: 'M13.4587 3.25163C13.0121 3.25 12.5436 3.25 12.0522 3.25C9.73934 3.24999 7.83014 3.24998 6.42355 3.42018C4.99222 3.59338 3.85936 3.95359 2.96274 4.76055C2.05481 5.57769 1.63908 6.62747 1.44129 7.95147C1.24997 9.23221 1.24998 10.9942 1.25 13.0625C1.24998 15.1308 1.24997 16.7678 1.44129 18.0485C1.63908 19.3725 2.05481 20.4223 2.96274 21.2395C3.85936 22.0464 4.99222 22.4066 6.42355 22.5798C7.83014 22.75 9.73935 22.75 12.0522 22.75C14.365 22.75 16.1699 22.75 17.5765 22.5798C19.0078 22.4066 20.1406 22.0464 21.0373 21.2395C21.9452 20.4223 22.3609 19.3725 22.5587 18.0485C22.75 16.7678 22.75 15.1308 22.75 13.0625C22.75 12.1617 22.75 11.319 22.7342 10.5488C21.8226 10.9388 20.7263 10.7618 19.9822 10.0178L18.75 8.78553L17.5178 10.0178C16.5415 10.9941 14.9585 10.9941 13.9822 10.0178C13.0059 9.04146 13.0059 7.45854 13.9822 6.48223L15.2145 5.25L13.9822 4.01777C13.7547 3.79022 13.5802 3.52972 13.4587 3.25163Z',
  d8: 'M5.75018 10.5C5.75018 8.98122 6.9814 7.75 8.50018 7.75C10.019 7.75 11.2502 8.98122 11.2502 10.5C11.2502 12.0188 10.019 13.25 8.50018 13.25C6.9814 13.25 5.75018 12.0188 5.75018 10.5Z',
  d9: 'M8.48143 16.2504C7.24064 16.2687 6.12793 16.8599 5.67943 17.818C5.50381 18.1931 5.05733 18.3549 4.68219 18.1793C4.30705 18.0036 4.14531 17.5572 4.32093 17.182C5.08074 15.559 6.82412 14.7747 8.45929 14.7506C10.1036 14.7263 11.8767 15.4673 12.6794 17.182C12.855 17.5572 12.6933 18.0036 12.3182 18.1793C11.943 18.3549 11.4965 18.1931 11.3209 17.818C10.8358 16.7818 9.7131 16.2322 8.48143 16.2504Z',
  d10: 'M13 4.00001L2.00092 4L2 22H22V11',
  d11: 'M1.99994 3.25H13.8003L15.5077 4.95733L13.2148 7.25023L16.7503 10.7858L19.0432 8.49287L21.3361 10.7858L22.7499 9.37193V22C22.7499 22.4142 22.4142 22.75 21.9999 22.75H1.99994C1.58573 22.75 1.24994 22.4142 1.24994 22V4C1.24994 3.58579 1.58573 3.25 1.99994 3.25ZM8.4995 7.75C6.98072 7.75 5.7495 8.98122 5.7495 10.5C5.7495 12.0188 6.98072 13.25 8.4995 13.25C10.0183 13.25 11.2495 12.0188 11.2495 10.5C11.2495 8.98122 10.0183 7.75 8.4995 7.75ZM5.67876 17.818C6.12726 16.8599 7.23997 16.2687 8.48076 16.2504C9.71243 16.2322 10.8352 16.7818 11.3203 17.818L12.6788 17.182C11.876 15.4673 10.1029 14.7263 8.45862 14.7506C6.82344 14.7747 5.08006 15.559 4.32025 17.182L5.67876 17.818Z',
  d12: 'M17.6288 4.95711L15.3359 2.66421L16.7501 1.25L19.043 3.54289L21.3359 1.25L22.7501 2.66421L20.4572 4.95711L22.7501 7.25L21.3359 8.66421L19.043 6.37132L16.7501 8.66421L15.3359 7.25L17.6288 4.95711Z',
};

export const IconPassportExpiredStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="passport-expired-stroke-rounded IconPassportExpiredStrokeRounded"
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

export const IconPassportExpiredDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="passport-expired-duotone-rounded IconPassportExpiredDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const IconPassportExpiredTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="passport-expired-twotone-rounded IconPassportExpiredTwotoneRounded"
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
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconPassportExpiredSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="passport-expired-solid-rounded IconPassportExpiredSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconPassportExpiredBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="passport-expired-bulk-rounded IconPassportExpiredBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconPassportExpiredStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="passport-expired-stroke-sharp IconPassportExpiredStrokeSharp"
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
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconPassportExpiredSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="passport-expired-solid-sharp IconPassportExpiredSolidSharp"
    >
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

export const iconPackOfPassportExpired: TheIconSelfPack = {
  name: 'PassportExpired',
  StrokeRounded: IconPassportExpiredStrokeRounded,
  DuotoneRounded: IconPassportExpiredDuotoneRounded,
  TwotoneRounded: IconPassportExpiredTwotoneRounded,
  SolidRounded: IconPassportExpiredSolidRounded,
  BulkRounded: IconPassportExpiredBulkRounded,
  StrokeSharp: IconPassportExpiredStrokeSharp,
  SolidSharp: IconPassportExpiredSolidSharp,
};