import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M18 12C18 11.5341 18 11.3011 18.0761 11.1173C18.1776 10.8723 18.3723 10.6776 18.6173 10.5761C18.8011 10.5 19.0341 10.5 19.5 10.5C19.9659 10.5 20.1989 10.5 20.3827 10.5761C20.6277 10.6776 20.8224 10.8723 20.9239 11.1173C21 11.3011 21 11.5341 21 12C21 12.4659 21 12.6989 20.9239 12.8827C20.8224 13.1277 20.6277 13.3224 20.3827 13.4239C20.1989 13.5 19.9659 13.5 19.5 13.5C19.0341 13.5 18.8011 13.5 18.6173 13.4239C18.3723 13.3224 18.1776 13.1277 18.0761 12.8827C18 12.6989 18 12.4659 18 12Z',
  d2: 'M10.5 12C10.5 11.5341 10.5 11.3011 10.5761 11.1173C10.6776 10.8723 10.8723 10.6776 11.1173 10.5761C11.3011 10.5 11.5341 10.5 12 10.5C12.4659 10.5 12.6989 10.5 12.8827 10.5761C13.1277 10.6776 13.3224 10.8723 13.4239 11.1173C13.5 11.3011 13.5 11.5341 13.5 12C13.5 12.4659 13.5 12.6989 13.4239 12.8827C13.3224 13.1277 13.1277 13.3224 12.8827 13.4239C12.6989 13.5 12.4659 13.5 12 13.5C11.5341 13.5 11.3011 13.5 11.1173 13.4239C10.8723 13.3224 10.6776 13.1277 10.5761 12.8827C10.5 12.6989 10.5 12.4659 10.5 12Z',
  d3: 'M3 12C3 11.5341 3 11.3011 3.07612 11.1173C3.17761 10.8723 3.37229 10.6776 3.61732 10.5761C3.80109 10.5 4.03406 10.5 4.5 10.5C4.96594 10.5 5.19891 10.5 5.38268 10.5761C5.62771 10.6776 5.82239 10.8723 5.92388 11.1173C6 11.3011 6 11.5341 6 12C6 12.4659 6 12.6989 5.92388 12.8827C5.82239 13.1277 5.62771 13.3224 5.38268 13.4239C5.19891 13.5 4.96594 13.5 4.5 13.5C4.03406 13.5 3.80109 13.5 3.61732 13.4239C3.37229 13.3224 3.17761 13.1277 3.07612 12.8827C3 12.6989 3 12.4659 3 12Z',
  d4: 'M19.4735 9.5C19.4823 9.5 19.4912 9.5 19.5 9.5C19.5088 9.5 19.5177 9.5 19.5265 9.5C19.7365 9.49998 19.9411 9.49996 20.1152 9.51184C20.3056 9.52483 20.5313 9.5553 20.7654 9.65224C21.2554 9.85523 21.6448 10.2446 21.8478 10.7346C21.9447 10.9687 21.9752 11.1944 21.9882 11.3848C22 11.5589 22 11.7635 22 11.9735C22 11.9823 22 11.9912 22 12C22 12.0088 22 12.0177 22 12.0265C22 12.2365 22 12.4411 21.9882 12.6152C21.9752 12.8056 21.9447 13.0313 21.8478 13.2654C21.6448 13.7554 21.2554 14.1448 20.7654 14.3478C20.5313 14.4447 20.3056 14.4752 20.1152 14.4882C19.9411 14.5 19.7365 14.5 19.5265 14.5C19.5177 14.5 19.5088 14.5 19.5 14.5C19.4912 14.5 19.4823 14.5 19.4735 14.5C19.2635 14.5 19.0589 14.5 18.8848 14.4882C18.6944 14.4752 18.4687 14.4447 18.2346 14.3478C17.7446 14.1448 17.3552 13.7554 17.1522 13.2654C17.0553 13.0313 17.0248 12.8056 17.0118 12.6152C17 12.4411 17 12.2365 17 12.0265C17 12.0177 17 12.0088 17 12C17 11.9912 17 11.9823 17 11.9735C17 11.7635 17 11.5589 17.0118 11.3848C17.0248 11.1944 17.0553 10.9687 17.1522 10.7346C17.3552 10.2446 17.7446 9.85523 18.2346 9.65224C18.4687 9.5553 18.6944 9.52483 18.8848 9.51184C19.0589 9.49996 19.2635 9.49998 19.4735 9.5ZM19.0081 11.5081C19.0078 11.5121 19.0075 11.5164 19.0072 11.5209C19.0005 11.6184 19 11.7534 19 12C19 12.2467 19.0005 12.3816 19.0072 12.4791C19.0075 12.4836 19.0078 12.4879 19.0081 12.4919C19.0121 12.4922 19.0164 12.4925 19.0209 12.4928C19.1184 12.4995 19.2534 12.5 19.5 12.5C19.7467 12.5 19.8816 12.4995 19.9791 12.4928C19.9836 12.4925 19.9879 12.4922 19.9919 12.4919C19.9922 12.4879 19.9925 12.4836 19.9928 12.4791C19.9995 12.3816 20 12.2467 20 12C20 11.7534 19.9995 11.6184 19.9928 11.5209C19.9925 11.5164 19.9922 11.5121 19.9919 11.5081C19.9879 11.5078 19.9836 11.5075 19.9791 11.5072C19.8816 11.5005 19.7467 11.5 19.5 11.5C19.2534 11.5 19.1184 11.5005 19.0209 11.5072C19.0164 11.5075 19.0121 11.5078 19.0081 11.5081Z',
  d5: 'M11.9735 9.5C11.9823 9.5 11.9912 9.5 12 9.5C12.0088 9.5 12.0177 9.5 12.0265 9.5C12.2365 9.49998 12.4411 9.49996 12.6152 9.51184C12.8056 9.52483 13.0313 9.5553 13.2654 9.65224C13.7554 9.85523 14.1448 10.2446 14.3478 10.7346C14.4447 10.9687 14.4752 11.1944 14.4882 11.3848C14.5 11.5589 14.5 11.7635 14.5 11.9735C14.5 11.9823 14.5 11.9912 14.5 12C14.5 12.0088 14.5 12.0177 14.5 12.0265C14.5 12.2365 14.5 12.4411 14.4882 12.6152C14.4752 12.8056 14.4447 13.0313 14.3478 13.2654C14.1448 13.7554 13.7554 14.1448 13.2654 14.3478C13.0313 14.4447 12.8056 14.4752 12.6152 14.4882C12.4411 14.5 12.2365 14.5 12.0265 14.5C12.0177 14.5 12.0088 14.5 12 14.5C11.9912 14.5 11.9823 14.5 11.9735 14.5C11.7635 14.5 11.5589 14.5 11.3848 14.4882C11.1944 14.4752 10.9687 14.4447 10.7346 14.3478C10.2446 14.1448 9.85523 13.7554 9.65224 13.2654C9.5553 13.0313 9.52483 12.8056 9.51184 12.6152C9.49996 12.4411 9.49998 12.2365 9.5 12.0265C9.5 12.0177 9.5 12.0088 9.5 12C9.5 11.9912 9.5 11.9823 9.5 11.9735C9.49998 11.7635 9.49996 11.5589 9.51184 11.3848C9.52483 11.1944 9.5553 10.9687 9.65224 10.7346C9.85523 10.2446 10.2446 9.85523 10.7346 9.65224C10.9687 9.5553 11.1944 9.52483 11.3848 9.51184C11.5589 9.49996 11.7635 9.49998 11.9735 9.5ZM11.5081 11.5081C11.5078 11.5121 11.5075 11.5164 11.5072 11.5209C11.5005 11.6184 11.5 11.7534 11.5 12C11.5 12.2467 11.5005 12.3816 11.5072 12.4791C11.5075 12.4836 11.5078 12.4879 11.5081 12.4919C11.5121 12.4922 11.5164 12.4925 11.5209 12.4928C11.6184 12.4995 11.7534 12.5 12 12.5C12.2467 12.5 12.3816 12.4995 12.4791 12.4928C12.4836 12.4925 12.4879 12.4922 12.4919 12.4919C12.4922 12.4879 12.4925 12.4836 12.4928 12.4791C12.4995 12.3816 12.5 12.2467 12.5 12C12.5 11.7534 12.4995 11.6184 12.4928 11.5209C12.4925 11.5164 12.4922 11.5121 12.4919 11.5081C12.4879 11.5078 12.4836 11.5075 12.4791 11.5072C12.3816 11.5005 12.2467 11.5 12 11.5C11.7534 11.5 11.6184 11.5005 11.5209 11.5072C11.5164 11.5075 11.5121 11.5078 11.5081 11.5081Z',
  d6: 'M4.47353 9.5C4.48234 9.5 4.49117 9.5 4.5 9.5C4.50884 9.5 4.51766 9.5 4.52648 9.5C4.73652 9.49998 4.94115 9.49996 5.11523 9.51184C5.3056 9.52483 5.53133 9.5553 5.76537 9.65224C6.25543 9.85523 6.64477 10.2446 6.84776 10.7346C6.94471 10.9687 6.97518 11.1944 6.98817 11.3848C7.00005 11.5589 7.00003 11.7635 7.00001 11.9735C7 11.9823 7 11.9912 7 12C7 12.0088 7 12.0177 7.00001 12.0265C7.00003 12.2365 7.00005 12.4411 6.98817 12.6152C6.97518 12.8056 6.94471 13.0313 6.84776 13.2654C6.64477 13.7554 6.25543 14.1448 5.76537 14.3478C5.53133 14.4447 5.3056 14.4752 5.11523 14.4882C4.94115 14.5 4.73653 14.5 4.52648 14.5C4.51767 14.5 4.50884 14.5 4.5 14.5C4.49117 14.5 4.48234 14.5 4.47352 14.5C4.26348 14.5 4.05886 14.5 3.88478 14.4882C3.6944 14.4752 3.46868 14.4447 3.23464 14.3478C2.74458 14.1448 2.35523 13.7554 2.15224 13.2654C2.0553 13.0313 2.02483 12.8056 2.01184 12.6152C1.99996 12.4411 1.99998 12.2365 2 12.0265C2 12.0177 2 12.0088 2 12C2 11.9912 2 11.9823 2 11.9735C1.99998 11.7635 1.99996 11.5589 2.01184 11.3848C2.02483 11.1944 2.0553 10.9687 2.15224 10.7346C2.35523 10.2446 2.74458 9.85523 3.23464 9.65224C3.46868 9.5553 3.6944 9.52483 3.88478 9.51184C4.05886 9.49996 4.26348 9.49998 4.47353 9.5ZM4.00814 11.5081C4.00782 11.5121 4.00751 11.5164 4.0072 11.5209C4.00055 11.6184 4 11.7534 4 12C4 12.2467 4.00055 12.3816 4.0072 12.4791C4.00751 12.4836 4.00782 12.4879 4.00814 12.4919C4.01213 12.4922 4.01638 12.4925 4.02092 12.4928C4.11844 12.4995 4.25335 12.5 4.5 12.5C4.74666 12.5 4.88156 12.4995 4.97909 12.4928C4.98362 12.4925 4.98788 12.4922 4.99187 12.4919C4.99218 12.4879 4.9925 12.4836 4.99281 12.4791C4.99946 12.3816 5 12.2467 5 12C5 11.7534 4.99946 11.6184 4.99281 11.5209C4.9925 11.5164 4.99218 11.5121 4.99187 11.5081C4.98788 11.5078 4.98362 11.5075 4.97909 11.5072C4.88156 11.5005 4.74666 11.5 4.5 11.5C4.25335 11.5 4.11844 11.5005 4.02092 11.5072C4.01638 11.5075 4.01213 11.5078 4.00814 11.5081Z',
  d7: 'M10 14H14V10H10V14Z',
  d8: 'M2 14H6V10H2V14Z',
  d9: 'M18 14H22V10H18V14Z',
  d10: 'M9 9H15V15H9V9ZM11 11V13H13V11H11Z',
  d11: 'M1 9H7V15H1V9ZM3 11V13H5V11H3Z',
  d12: 'M17 9H23V15H17V9ZM19 11V13H21V11H19Z',
};

export const IconMoreHorizontalSquare01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="more-horizontal-square-01-stroke-rounded IconMoreHorizontalSquare01StrokeRounded"
    >
      <rect 
        x="18" 
        y="10.5" 
        width="3" 
        height="3" 
        rx="1" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></rect>
      <rect 
        x="10.5" 
        y="10.5" 
        width="3" 
        height="3" 
        rx="1" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></rect>
      <rect 
        x="3" 
        y="10.5" 
        width="3" 
        height="3" 
        rx="1" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></rect>
    </TheIconWrapper>
  );
};

export const IconMoreHorizontalSquare01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="more-horizontal-square-01-duotone-rounded IconMoreHorizontalSquare01DuotoneRounded"
    >
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d1} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      </g>
      <rect 
        x="18" 
        y="10.5" 
        width="3" 
        height="3" 
        rx="1" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></rect>
      <rect 
        x="10.5" 
        y="10.5" 
        width="3" 
        height="3" 
        rx="1" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></rect>
      <rect 
        x="3" 
        y="10.5" 
        width="3" 
        height="3" 
        rx="1" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></rect>
    </TheIconWrapper>
  );
};

export const IconMoreHorizontalSquare01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="more-horizontal-square-01-twotone-rounded IconMoreHorizontalSquare01TwotoneRounded"
    >
      <rect 
        x="18" 
        y="10.5" 
        width="3" 
        height="3" 
        rx="1" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></rect>
      <rect 
        opacity="var(--icon-opacity)" 
        x="10.5" 
        y="10.5" 
        width="3" 
        height="3" 
        rx="1" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></rect>
      <rect 
        x="3" 
        y="10.5" 
        width="3" 
        height="3" 
        rx="1" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></rect>
    </TheIconWrapper>
  );
};

export const IconMoreHorizontalSquare01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="more-horizontal-square-01-solid-rounded IconMoreHorizontalSquare01SolidRounded"
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMoreHorizontalSquare01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="more-horizontal-square-01-bulk-rounded IconMoreHorizontalSquare01BulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconMoreHorizontalSquare01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="more-horizontal-square-01-stroke-sharp IconMoreHorizontalSquare01StrokeSharp"
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

export const IconMoreHorizontalSquare01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="more-horizontal-square-01-solid-sharp IconMoreHorizontalSquare01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const iconPackOfMoreHorizontalSquare01: TheIconSelfPack = {
  name: 'MoreHorizontalSquare01',
  StrokeRounded: IconMoreHorizontalSquare01StrokeRounded,
  DuotoneRounded: IconMoreHorizontalSquare01DuotoneRounded,
  TwotoneRounded: IconMoreHorizontalSquare01TwotoneRounded,
  SolidRounded: IconMoreHorizontalSquare01SolidRounded,
  BulkRounded: IconMoreHorizontalSquare01BulkRounded,
  StrokeSharp: IconMoreHorizontalSquare01StrokeSharp,
  SolidSharp: IconMoreHorizontalSquare01SolidSharp,
};