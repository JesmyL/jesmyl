import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M11 2C7.22876 2 5.34315 2 4.17157 3.12874C3 4.25748 3 6.07416 3 9.70753V17.9808C3 20.2867 3 21.4396 3.77285 21.8523C5.26947 22.6514 8.0768 19.9852 9.41 19.1824C10.1832 18.7168 10.5698 18.484 11 18.484C11.4302 18.484 11.8168 18.7168 12.59 19.1824C13.9232 19.9852 16.7305 22.6514 18.2272 21.8523C19 21.4396 19 20.2867 19 17.9808V11',
  d2: 'M13 6L21 6',
  d3: 'M3 17.9808V9.70753C3 6.07416 3 4.25748 4.17157 3.12874C5.34315 2 7.22876 2 11 2C14.7712 2 16.6569 2 17.8284 3.12874C19 4.25748 19 6.07416 19 9.70753V17.9808C19 20.2867 19 21.4396 18.2272 21.8523C16.7305 22.6514 13.9232 19.9852 12.59 19.1824C11.8168 18.7168 11.4302 18.484 11 18.484C10.5698 18.484 10.1832 18.7168 9.41 19.1824C8.0768 19.9852 5.26947 22.6514 3.77285 21.8523C3 21.4396 3 20.2867 3 17.9808Z',
  d4: 'M11.875 6C11.875 5.44772 12.3227 5 12.875 5L20.875 5C21.4273 5 21.875 5.44772 21.875 6C21.875 6.55228 21.4273 7 20.875 7L12.875 7C12.3227 7 11.875 6.55228 11.875 6Z',
  d5: 'M15.3604 1.39731C14.223 1.24997 12.7689 1.24999 10.9296 1.25H10.8204C8.98109 1.24999 7.527 1.24997 6.38957 1.39731C5.22212 1.54853 4.27551 1.86672 3.52621 2.58863C2.773 3.31431 2.43743 4.23743 2.27865 5.37525C2.12497 6.4765 2.12499 7.88206 2.125 9.64943L2.125 18.0458C2.12496 19.1433 2.12493 20.0553 2.23033 20.7405C2.33938 21.4495 2.59357 22.1395 3.29458 22.5139C3.91976 22.8477 4.6074 22.7798 5.19044 22.6028C5.78014 22.4238 6.37954 22.0989 6.92835 21.7521C7.48239 21.402 8.0812 20.9618 8.55354 20.6127C9.01635 20.2706 9.38808 19.9958 9.6719 19.8249C10.0715 19.5843 10.3238 19.4335 10.5283 19.3371C10.717 19.2482 10.8087 19.234 10.875 19.234C10.9413 19.234 11.033 19.2482 11.2217 19.3371C11.4263 19.4335 11.6785 19.5843 12.0781 19.8249C12.3619 19.9958 12.7337 20.2706 13.1965 20.6127C13.6688 20.9618 14.2676 21.402 14.8217 21.7521C15.3705 22.0989 15.9699 22.4238 16.5596 22.6028C17.1426 22.7798 17.8303 22.8477 18.4554 22.5139C19.1564 22.1395 19.4106 21.4495 19.5197 20.7405C19.6251 20.0553 19.625 19.1434 19.625 18.0458V9.64945C19.625 9.49601 19.6247 9.29203 19.6244 9.09852C19.624 8.81643 19.6237 8.67538 19.5359 8.58769C19.448 8.5 19.3069 8.5 19.0247 8.5H12.875C11.4943 8.5 10.375 7.38071 10.375 6C10.375 4.61929 11.4943 3.5 12.875 3.5H17.9105C18.3684 3.5 18.5974 3.5 18.6751 3.31756C18.7528 3.13512 18.6105 2.98706 18.326 2.69095C18.2928 2.65641 18.2588 2.62231 18.2238 2.58863C17.4745 1.86672 16.5279 1.54853 15.3604 1.39731Z',
  d6: 'M13 6H21',
  d7: 'M19 11V22L11 18L3 22V2.05C3 2.02238 3.02239 2 3.05 2H11',
  d8: 'M13.7505 6.25V4.25002H21.7505V6.25002L13.7505 6.25Z',
  d9: 'M2.99951 1.1875C2.8006 1.1875 2.60983 1.26652 2.46918 1.40717C2.32853 1.54782 2.24951 1.73859 2.24951 1.9375V22.6875L10.9995 18.3125L19.7495 22.6875V7.75H12.2495V2.75H19.7495V1.9375C19.7495 1.52329 19.4137 1.1875 18.9995 1.1875H2.99951Z',
};

export const IconBookmarkMinus02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bookmark-minus-02-stroke-rounded IconBookmarkMinus02StrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconBookmarkMinus02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bookmark-minus-02-duotone-rounded IconBookmarkMinus02DuotoneRounded"
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
        strokeLinejoin="round" 
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

export const IconBookmarkMinus02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bookmark-minus-02-twotone-rounded IconBookmarkMinus02TwotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconBookmarkMinus02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bookmark-minus-02-solid-rounded IconBookmarkMinus02SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconBookmarkMinus02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bookmark-minus-02-bulk-rounded IconBookmarkMinus02BulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconBookmarkMinus02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bookmark-minus-02-stroke-sharp IconBookmarkMinus02StrokeSharp"
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

export const IconBookmarkMinus02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bookmark-minus-02-solid-sharp IconBookmarkMinus02SolidSharp"
    >
      <path 
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

export const iconPackOfBookmarkMinus02: TheIconSelfPack = {
  name: 'BookmarkMinus02',
  StrokeRounded: IconBookmarkMinus02StrokeRounded,
  DuotoneRounded: IconBookmarkMinus02DuotoneRounded,
  TwotoneRounded: IconBookmarkMinus02TwotoneRounded,
  SolidRounded: IconBookmarkMinus02SolidRounded,
  BulkRounded: IconBookmarkMinus02BulkRounded,
  StrokeSharp: IconBookmarkMinus02StrokeSharp,
  SolidSharp: IconBookmarkMinus02SolidSharp,
};