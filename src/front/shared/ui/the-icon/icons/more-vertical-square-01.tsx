import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M10.5 4.5C10.5 4.03406 10.5 3.80109 10.5761 3.61732C10.6776 3.37229 10.8723 3.17761 11.1173 3.07612C11.3011 3 11.5341 3 12 3C12.4659 3 12.6989 3 12.8827 3.07612C13.1277 3.17761 13.3224 3.37229 13.4239 3.61732C13.5 3.80109 13.5 4.03406 13.5 4.5C13.5 4.96594 13.5 5.19891 13.4239 5.38268C13.3224 5.62771 13.1277 5.82239 12.8827 5.92388C12.6989 6 12.4659 6 12 6C11.5341 6 11.3011 6 11.1173 5.92388C10.8723 5.82239 10.6776 5.62771 10.5761 5.38268C10.5 5.19891 10.5 4.96594 10.5 4.5Z',
  d2: 'M10.5 12C10.5 11.5341 10.5 11.3011 10.5761 11.1173C10.6776 10.8723 10.8723 10.6776 11.1173 10.5761C11.3011 10.5 11.5341 10.5 12 10.5C12.4659 10.5 12.6989 10.5 12.8827 10.5761C13.1277 10.6776 13.3224 10.8723 13.4239 11.1173C13.5 11.3011 13.5 11.5341 13.5 12C13.5 12.4659 13.5 12.6989 13.4239 12.8827C13.3224 13.1277 13.1277 13.3224 12.8827 13.4239C12.6989 13.5 12.4659 13.5 12 13.5C11.5341 13.5 11.3011 13.5 11.1173 13.4239C10.8723 13.3224 10.6776 13.1277 10.5761 12.8827C10.5 12.6989 10.5 12.4659 10.5 12Z',
  d3: 'M10.5 19.5C10.5 19.0341 10.5 18.8011 10.5761 18.6173C10.6776 18.3723 10.8723 18.1776 11.1173 18.0761C11.3011 18 11.5341 18 12 18C12.4659 18 12.6989 18 12.8827 18.0761C13.1277 18.1776 13.3224 18.3723 13.4239 18.6173C13.5 18.8011 13.5 19.0341 13.5 19.5C13.5 19.9659 13.5 20.1989 13.4239 20.3827C13.3224 20.6277 13.1277 20.8224 12.8827 20.9239C12.6989 21 12.4659 21 12 21C11.5341 21 11.3011 21 11.1173 20.9239C10.8723 20.8224 10.6776 20.6277 10.5761 20.3827C10.5 20.1989 10.5 19.9659 10.5 19.5Z',
  d4: 'M11.9735 2C11.9823 2 11.9912 2 12 2C12.0088 2 12.0177 2 12.0265 2C12.2365 1.99998 12.4411 1.99996 12.6152 2.01184C12.8056 2.02483 13.0313 2.0553 13.2654 2.15224C13.7554 2.35523 14.1448 2.74458 14.3478 3.23464C14.4447 3.46868 14.4752 3.6944 14.4882 3.88478C14.5 4.05886 14.5 4.26348 14.5 4.47352C14.5 4.48234 14.5 4.49117 14.5 4.5C14.5 4.50884 14.5 4.51767 14.5 4.52648C14.5 4.73653 14.5 4.94115 14.4882 5.11523C14.4752 5.3056 14.4447 5.53133 14.3478 5.76537C14.1448 6.25543 13.7554 6.64477 13.2654 6.84776C13.0313 6.94471 12.8056 6.97518 12.6152 6.98817C12.4411 7.00005 12.2365 7.00003 12.0265 7.00001C12.0177 7 12.0088 7 12 7C11.9912 7 11.9823 7 11.9735 7.00001C11.7635 7.00003 11.5589 7.00005 11.3848 6.98817C11.1944 6.97518 10.9687 6.94471 10.7346 6.84776C10.2446 6.64477 9.85523 6.25543 9.65224 5.76537C9.5553 5.53133 9.52483 5.3056 9.51184 5.11523C9.49996 4.94115 9.49998 4.73652 9.5 4.52648C9.5 4.51766 9.5 4.50884 9.5 4.5C9.5 4.49117 9.5 4.48234 9.5 4.47353C9.49998 4.26348 9.49996 4.05886 9.51184 3.88478C9.52483 3.6944 9.5553 3.46868 9.65224 3.23464C9.85523 2.74458 10.2446 2.35523 10.7346 2.15224C10.9687 2.0553 11.1944 2.02483 11.3848 2.01184C11.5589 1.99996 11.7635 1.99998 11.9735 2ZM11.5081 4.00814C11.5078 4.01213 11.5075 4.01638 11.5072 4.02092C11.5005 4.11844 11.5 4.25335 11.5 4.5C11.5 4.74666 11.5005 4.88156 11.5072 4.97909C11.5075 4.98362 11.5078 4.98788 11.5081 4.99187C11.5121 4.99218 11.5164 4.9925 11.5209 4.99281C11.6184 4.99946 11.7534 5 12 5C12.2467 5 12.3816 4.99946 12.4791 4.99281C12.4836 4.9925 12.4879 4.99218 12.4919 4.99187C12.4922 4.98788 12.4925 4.98362 12.4928 4.97909C12.4995 4.88156 12.5 4.74666 12.5 4.5C12.5 4.25335 12.4995 4.11844 12.4928 4.02092C12.4925 4.01638 12.4922 4.01213 12.4919 4.00814C12.4879 4.00782 12.4836 4.00751 12.4791 4.0072C12.3816 4.00055 12.2467 4 12 4C11.7534 4 11.6184 4.00055 11.5209 4.0072C11.5164 4.00751 11.5121 4.00782 11.5081 4.00814Z',
  d5: 'M11.9735 9.5C11.9823 9.5 11.9912 9.5 12 9.5C12.0088 9.5 12.0177 9.5 12.0265 9.5C12.2365 9.49998 12.4411 9.49996 12.6152 9.51184C12.8056 9.52483 13.0313 9.5553 13.2654 9.65224C13.7554 9.85523 14.1448 10.2446 14.3478 10.7346C14.4447 10.9687 14.4752 11.1944 14.4882 11.3848C14.5 11.5589 14.5 11.7635 14.5 11.9735C14.5 11.9823 14.5 11.9912 14.5 12C14.5 12.0088 14.5 12.0177 14.5 12.0265C14.5 12.2365 14.5 12.4411 14.4882 12.6152C14.4752 12.8056 14.4447 13.0313 14.3478 13.2654C14.1448 13.7554 13.7554 14.1448 13.2654 14.3478C13.0313 14.4447 12.8056 14.4752 12.6152 14.4882C12.4411 14.5 12.2365 14.5 12.0265 14.5C12.0177 14.5 12.0088 14.5 12 14.5C11.9912 14.5 11.9823 14.5 11.9735 14.5C11.7635 14.5 11.5589 14.5 11.3848 14.4882C11.1944 14.4752 10.9687 14.4447 10.7346 14.3478C10.2446 14.1448 9.85523 13.7554 9.65224 13.2654C9.5553 13.0313 9.52483 12.8056 9.51184 12.6152C9.49996 12.4411 9.49998 12.2365 9.5 12.0265C9.5 12.0177 9.5 12.0088 9.5 12C9.5 11.9912 9.5 11.9823 9.5 11.9735C9.49998 11.7635 9.49996 11.5589 9.51184 11.3848C9.52483 11.1944 9.5553 10.9687 9.65224 10.7346C9.85523 10.2446 10.2446 9.85523 10.7346 9.65224C10.9687 9.5553 11.1944 9.52483 11.3848 9.51184C11.5589 9.49996 11.7635 9.49998 11.9735 9.5ZM11.5081 11.5081C11.5078 11.5121 11.5075 11.5164 11.5072 11.5209C11.5005 11.6184 11.5 11.7534 11.5 12C11.5 12.2467 11.5005 12.3816 11.5072 12.4791C11.5075 12.4836 11.5078 12.4879 11.5081 12.4919C11.5121 12.4922 11.5164 12.4925 11.5209 12.4928C11.6184 12.4995 11.7534 12.5 12 12.5C12.2467 12.5 12.3816 12.4995 12.4791 12.4928C12.4836 12.4925 12.4879 12.4922 12.4919 12.4919C12.4922 12.4879 12.4925 12.4836 12.4928 12.4791C12.4995 12.3816 12.5 12.2467 12.5 12C12.5 11.7534 12.4995 11.6184 12.4928 11.5209C12.4925 11.5164 12.4922 11.5121 12.4919 11.5081C12.4879 11.5078 12.4836 11.5075 12.4791 11.5072C12.3816 11.5005 12.2467 11.5 12 11.5C11.7534 11.5 11.6184 11.5005 11.5209 11.5072C11.5164 11.5075 11.5121 11.5078 11.5081 11.5081Z',
  d6: 'M11.9735 17C11.9823 17 11.9912 17 12 17C12.0088 17 12.0177 17 12.0265 17C12.2365 17 12.4411 17 12.6152 17.0118C12.8056 17.0248 13.0313 17.0553 13.2654 17.1522C13.7554 17.3552 14.1448 17.7446 14.3478 18.2346C14.4447 18.4687 14.4752 18.6944 14.4882 18.8848C14.5 19.0589 14.5 19.2635 14.5 19.4735C14.5 19.4823 14.5 19.4912 14.5 19.5C14.5 19.5088 14.5 19.5177 14.5 19.5265C14.5 19.7365 14.5 19.9411 14.4882 20.1152C14.4752 20.3056 14.4447 20.5313 14.3478 20.7654C14.1448 21.2554 13.7554 21.6448 13.2654 21.8478C13.0313 21.9447 12.8056 21.9752 12.6152 21.9882C12.4411 22 12.2365 22 12.0265 22C12.0177 22 12.0088 22 12 22C11.9912 22 11.9823 22 11.9735 22C11.7635 22 11.5589 22 11.3848 21.9882C11.1944 21.9752 10.9687 21.9447 10.7346 21.8478C10.2446 21.6448 9.85523 21.2554 9.65224 20.7654C9.5553 20.5313 9.52483 20.3056 9.51184 20.1152C9.49996 19.9411 9.49998 19.7365 9.5 19.5265C9.5 19.5177 9.5 19.5088 9.5 19.5C9.5 19.4912 9.5 19.4823 9.5 19.4735C9.49998 19.2635 9.49996 19.0589 9.51184 18.8848C9.52483 18.6944 9.5553 18.4687 9.65224 18.2346C9.85523 17.7446 10.2446 17.3552 10.7346 17.1522C10.9687 17.0553 11.1944 17.0248 11.3848 17.0118C11.5589 17 11.7635 17 11.9735 17ZM11.5081 19.0081C11.5078 19.0121 11.5075 19.0164 11.5072 19.0209C11.5005 19.1184 11.5 19.2534 11.5 19.5C11.5 19.7467 11.5005 19.8816 11.5072 19.9791C11.5075 19.9836 11.5078 19.9879 11.5081 19.9919C11.5121 19.9922 11.5164 19.9925 11.5209 19.9928C11.6184 19.9995 11.7534 20 12 20C12.2467 20 12.3816 19.9995 12.4791 19.9928C12.4836 19.9925 12.4879 19.9922 12.4919 19.9919C12.4922 19.9879 12.4925 19.9836 12.4928 19.9791C12.4995 19.8816 12.5 19.7467 12.5 19.5C12.5 19.2534 12.4995 19.1184 12.4928 19.0209C12.4925 19.0164 12.4922 19.0121 12.4919 19.0081C12.4879 19.0078 12.4836 19.0075 12.4791 19.0072C12.3816 19.0005 12.2467 19 12 19C11.7534 19 11.6184 19.0005 11.5209 19.0072C11.5164 19.0075 11.5121 19.0078 11.5081 19.0081Z',
  d7: 'M10 18L10 22H14V18L10 18Z',
  d8: 'M10 2L10 6H14V2L10 2Z',
  d9: 'M10 10L10 14H14V10L10 10Z',
  d10: 'M9 17L15 17V23H9L9 17ZM11 19V21H13V19H11Z',
  d11: 'M9 1L15 1V7H9L9 1ZM11 3V5H13V3H11Z',
  d12: 'M9 9L15 9V15H9L9 9ZM11 11V13H13V11H11Z',
};

export const IconMoreVerticalSquare01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="more-vertical-square-01-stroke-rounded IconMoreVerticalSquare01StrokeRounded"
    >
      <rect 
        x="10.5" 
        y="3" 
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
        x="10.5" 
        y="18" 
        width="3" 
        height="3" 
        rx="1" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></rect>
    </TheIconWrapper>
  );
};

export const IconMoreVerticalSquare01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="more-vertical-square-01-duotone-rounded IconMoreVerticalSquare01DuotoneRounded"
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
        x="10.5" 
        y="3" 
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
        x="10.5" 
        y="18" 
        width="3" 
        height="3" 
        rx="1" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></rect>
    </TheIconWrapper>
  );
};

export const IconMoreVerticalSquare01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="more-vertical-square-01-twotone-rounded IconMoreVerticalSquare01TwotoneRounded"
    >
      <rect 
        x="10.5" 
        y="3" 
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
        x="10.5" 
        y="18" 
        width="3" 
        height="3" 
        rx="1" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></rect>
    </TheIconWrapper>
  );
};

export const IconMoreVerticalSquare01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="more-vertical-square-01-solid-rounded IconMoreVerticalSquare01SolidRounded"
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

export const IconMoreVerticalSquare01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="more-vertical-square-01-bulk-rounded IconMoreVerticalSquare01BulkRounded"
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

export const IconMoreVerticalSquare01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="more-vertical-square-01-stroke-sharp IconMoreVerticalSquare01StrokeSharp"
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

export const IconMoreVerticalSquare01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="more-vertical-square-01-solid-sharp IconMoreVerticalSquare01SolidSharp"
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

export const iconPackOfMoreVerticalSquare01: TheIconSelfPack = {
  name: 'MoreVerticalSquare01',
  StrokeRounded: IconMoreVerticalSquare01StrokeRounded,
  DuotoneRounded: IconMoreVerticalSquare01DuotoneRounded,
  TwotoneRounded: IconMoreVerticalSquare01TwotoneRounded,
  SolidRounded: IconMoreVerticalSquare01SolidRounded,
  BulkRounded: IconMoreVerticalSquare01BulkRounded,
  StrokeSharp: IconMoreVerticalSquare01StrokeSharp,
  SolidSharp: IconMoreVerticalSquare01SolidSharp,
};