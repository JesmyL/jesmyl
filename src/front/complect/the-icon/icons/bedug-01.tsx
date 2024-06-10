import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M5 16C6.10457 16 7 12.866 7 9C7 5.13401 6.10457 2 5 2C3.89543 2 3 5.13401 3 9C3 12.866 3.89543 16 5 16Z',
  d2: 'M8.5 15.5L16 22M8 22L18 10',
  d3: 'M5 2L16.1103 3.58719C19.1126 4.01608 21 5.73626 21 9C21 11.0222 20.065 13.3797 18 14.0512M5 16L14.0942 14.7008M8.83195 2.54742C9.56585 4.09552 10.123 6.18217 10.0113 9.56933C9.93575 11.2861 9.68691 13.6615 8.85527 15.4492',
  d4: 'M8.99989 3.00024C9.58719 3.98101 9.99989 6.29808 9.99989 9.00024C9.99989 11.7024 9.58719 14.0194 8.99989 15.0002L8.76367 15.4625L14.0941 14.701L17.9999 14.0514C20.0649 13.3799 20.9999 11.0224 20.9999 9.00024C20.9999 5.7365 19.1125 4.01633 16.1102 3.58744L8.77849 2.54004L8.99989 3.00024Z',
  d5: 'M5 2L16.1103 3.58719C19.1126 4.01608 21 5.73626 21 9C21 11.0222 20.065 13.3797 18 14.0512M5 16L14.0942 14.7008',
  d6: 'M8.90332 2.84863C9.63722 4.39673 10.1944 6.48338 10.0827 9.87054C10.0071 11.5873 9.75828 13.9627 8.92664 15.7504',
  d7: 'M8.90332 2.56274C9.63722 4.14513 10.1944 6.27799 10.0827 9.74016C10.0071 11.495 9.75828 13.923 8.92664 15.7502',
  d8: 'M4.58503 4.34607C4.28264 5.4646 4.08333 7.06613 4.08333 8.875C4.08333 10.6839 4.28264 12.2854 4.58503 13.4039C4.67065 13.7206 4.76 13.9814 4.84717 14.1889C4.90719 14.3318 5.09281 14.3318 5.15283 14.1889C5.24 13.9814 5.32935 13.7206 5.41497 13.4039C5.71736 12.2854 5.91667 10.6839 5.91667 8.875C5.91667 7.06613 5.71736 5.4646 5.41497 4.34607C5.32935 4.02939 5.24 3.76857 5.15283 3.56105C5.09281 3.41817 4.90719 3.41817 4.84717 3.56105C4.76 3.76857 4.67065 4.02939 4.58503 4.34607ZM3.52678 2.08439C3.8008 1.65569 4.28166 1.125 5 1.125C5.71834 1.125 6.1992 1.65569 6.47322 2.08439C6.76885 2.5469 6.99897 3.15249 7.17776 3.8138C7.5389 5.1496 7.75 6.93869 7.75 8.875C7.75 10.8113 7.5389 12.6004 7.17776 13.9362C6.99897 14.5975 6.76885 15.2031 6.47322 15.6656C6.1992 16.0943 5.71834 16.625 5 16.625C4.28166 16.625 3.8008 16.0943 3.52678 15.6656C3.23115 15.2031 3.00103 14.5975 2.82224 13.9362C2.4611 12.6004 2.25 10.8113 2.25 8.875C2.25 6.93869 2.4611 5.1496 2.82224 3.8138C3.00103 3.15249 3.23115 2.5469 3.52678 2.08439Z',
  d9: 'M14.8685 15.1953L11.895 15.6394L11.2393 16.4262L10.5614 15.8387L7.95653 16.2277L9.95873 17.963L7.2318 21.2353C6.87824 21.6596 6.93556 22.2901 7.35984 22.6437C7.78412 22.9972 8.41468 22.9399 8.76825 22.5156L11.4704 19.2731L15.3451 22.6312C15.7625 22.9929 16.394 22.9477 16.7557 22.5304C17.1174 22.113 17.0723 21.4815 16.655 21.1198L12.751 17.7363L14.8685 15.1953ZM18.6402 9.10679C19.0645 9.46035 19.1218 10.0909 18.7682 10.5152L16.5495 13.1777C15.8421 14.0266 15.4884 14.451 15.6573 14.7514C15.8261 15.0518 16.3726 14.9702 17.4654 14.8069L18.0053 14.7263C18.0584 14.7184 18.1107 14.7061 18.1618 14.6895C20.762 13.8471 21.75 11.0094 21.75 8.87498C21.75 7.09954 21.2294 5.63542 20.2003 4.55611C19.1825 3.48871 17.7656 2.90075 16.1615 2.67241L5.35984 1.13484C4.8283 1.05918 4.33584 1.4272 4.2599 1.95684C4.18397 2.48648 4.55331 2.97717 5.08486 3.05284L8.46028 3.53331C9.22382 3.642 9.33988 4.42056 9.44033 5.0944C9.45365 5.18376 9.4667 5.27129 9.48094 5.35516C9.64949 6.34745 9.75011 7.55972 9.75011 8.8751C9.75011 10.1905 9.64949 11.4027 9.48094 12.395C9.46688 12.4778 9.45401 12.5639 9.44089 12.6517C9.3413 13.318 9.22765 14.0783 8.47208 14.1912L5.07822 14.6981C4.54721 14.7774 4.18127 15.2706 4.26088 15.7997C4.34048 16.3288 4.83547 16.6935 5.36648 16.6141L11.5183 15.6953C11.7045 15.6674 11.7976 15.6535 11.8778 15.6085C11.958 15.5634 12.0183 15.4911 12.1388 15.3464L12.1388 15.3464L17.2318 9.23482C17.5854 8.81055 18.2159 8.75322 18.6402 9.10679Z',
  d10: 'M11.895 15.6395L14.8685 15.1953L12.751 17.7364L16.655 21.1198C17.0723 21.4815 17.1174 22.1131 16.7557 22.5304C16.394 22.9478 15.7625 22.9929 15.3451 22.6312L11.4704 19.2731L8.76825 22.5157C8.41468 22.9399 7.78412 22.9973 7.35984 22.6437C6.93556 22.2901 6.87824 21.6596 7.2318 21.2353L9.95873 17.963L7.95653 16.2277L10.5614 15.8387L11.2393 16.4263L11.895 15.6395Z',
  d11: 'M4.08333 8.875C4.08333 7.06613 4.28264 5.4646 4.58503 4.34607C4.67065 4.02939 4.76 3.76857 4.84717 3.56105C4.90719 3.41817 5.09281 3.41817 5.15283 3.56105C5.24 3.76857 5.32935 4.02939 5.41497 4.34607C5.71736 5.4646 5.91667 7.06613 5.91667 8.875C5.91667 10.6839 5.71736 12.2854 5.41497 13.4039C5.32935 13.7206 5.24 13.9814 5.15283 14.1889C5.09281 14.3318 4.90719 14.3318 4.84717 14.1889C4.76 13.9814 4.67065 13.7206 4.58503 13.4039C4.28264 12.2854 4.08333 10.6839 4.08333 8.875ZM5 1.125C4.28166 1.125 3.8008 1.65569 3.52678 2.08439C3.23115 2.54689 3.00103 3.15249 2.82224 3.8138C2.4611 5.1496 2.25 6.93869 2.25 8.875C2.25 10.8113 2.4611 12.6004 2.82224 13.9362C3.00103 14.5975 3.23115 15.2031 3.52678 15.6656C3.8008 16.0943 4.28166 16.625 5 16.625C5.04125 16.625 5.08172 16.6232 5.12142 16.6199C5.20125 16.6281 5.28342 16.6266 5.36648 16.6142L11.5183 15.6953C11.7045 15.6675 11.7976 15.6536 11.8778 15.6085C11.958 15.5634 12.0183 15.4911 12.1388 15.3464L17.2318 9.23484C17.5854 8.81056 18.2159 8.75324 18.6402 9.1068C19.0645 9.46037 19.1218 10.0909 18.7682 10.5152L16.5495 13.1778C15.8421 14.0266 15.4884 14.451 15.6573 14.7514C15.8261 15.0518 16.3726 14.9702 17.4654 14.807L18.0053 14.7263C18.0584 14.7184 18.1107 14.7061 18.1618 14.6895C20.762 13.8471 21.75 11.0094 21.75 8.875C21.75 7.09956 21.2294 5.63544 20.2003 4.55612C19.1825 3.48873 17.7656 2.90076 16.1615 2.67243L5.35984 1.13486C5.27901 1.12335 5.19909 1.12211 5.1214 1.13013C5.08171 1.12675 5.04125 1.125 5 1.125ZM7.03405 3.33031L8.46028 3.53333C9.22382 3.64202 9.33988 4.42057 9.44033 5.09441C9.45365 5.18378 9.4667 5.2713 9.48094 5.35518C9.64949 6.34747 9.75011 7.55973 9.75011 8.87511C9.75011 10.1905 9.64949 11.4028 9.48094 12.395C9.46688 12.4778 9.45401 12.564 9.44089 12.6517C9.3413 13.318 9.22765 14.0783 8.47208 14.1912L7.03875 14.4053C7.08822 14.253 7.1345 14.0962 7.17776 13.9362C7.5389 12.6004 7.75 10.8113 7.75 8.875C7.75 6.93869 7.5389 5.1496 7.17776 3.8138C7.13313 3.64871 7.0853 3.48709 7.03405 3.33031Z',
  d12: 'M8.97949 2.43774C9.66057 3.32363 10.0764 6.56351 10.008 9.53638C9.94673 12.1962 9.48906 14.5592 9.00431 15.5025',
  d13: 'M11.472 19.3918L8.76984 22.6344L7.2334 21.354L9.96032 18.0817L7.92725 16.3197L5.34979 16.7061C5.23983 16.7344 5.12296 16.7502 4.99902 16.7502C4.28068 16.7502 3.79983 16.2196 3.52581 15.7909C3.23018 15.3283 3.00005 14.7228 2.82126 14.0614C2.46013 12.7256 2.24902 10.9366 2.24902 9.00024C2.24902 7.06393 2.46013 5.27484 2.82126 3.93904C3.00005 3.27773 3.23018 2.67214 3.52581 2.20963C3.79983 1.78093 4.28068 1.25024 4.99902 1.25024C5.11555 1.25024 5.22583 1.26421 5.32999 1.28944L16.2172 2.84476C17.83 3.07515 19.2286 3.66468 20.2256 4.71396C21.2313 5.77248 21.7508 7.21751 21.7508 9.00003C21.7508 11.1581 20.7549 13.9444 18.2328 14.7645C18.1934 14.7773 18.153 14.7868 18.112 14.793L14.9033 15.274L12.7526 17.8551L16.6565 21.2385L15.3467 22.7499L11.472 19.3918ZM11.9275 15.72L14.9033 15.274L18.7691 10.6341L17.2327 9.35376L11.9275 15.72ZM11.9275 15.72L11.2402 16.545L10.5303 15.9294L11.9275 15.72ZM6.87872 3.02591L9.3542 3.37955C9.74701 4.66509 10.0008 6.70427 10.0008 9.00003C10.0008 11.2763 9.75131 13.3003 9.36419 14.5876L6.88476 14.9592C6.99478 14.6789 7.09161 14.3765 7.17678 14.0614C7.53792 12.7256 7.74902 10.9366 7.74902 9.00024C7.74902 7.06393 7.53792 5.27484 7.17678 3.93904C7.09005 3.61823 6.99124 3.31053 6.87872 3.02591ZM4.08236 9.00024C4.08236 7.19137 4.28166 5.58984 4.58406 4.47131C4.72089 3.96518 4.86728 3.60174 4.99902 3.37051C5.13076 3.60174 5.27715 3.96518 5.41399 4.47131C5.71639 5.58984 5.91569 7.19137 5.91569 9.00024C5.91569 10.8091 5.71639 12.4106 5.41399 13.5292C5.27715 14.0353 5.13076 14.3987 4.99902 14.63C4.86728 14.3987 4.72089 14.0353 4.58406 13.5292C4.28166 12.4106 4.08236 10.8091 4.08236 9.00024Z',
};

export const IconBedug01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bedug-01-stroke-rounded IconBedug01StrokeRounded"
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

export const IconBedug01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bedug-01-duotone-rounded IconBedug01DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d5} 
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
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBedug01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bedug-01-twotone-rounded IconBedug01TwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d5} 
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
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBedug01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bedug-01-solid-rounded IconBedug01SolidRounded"
    >
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

export const IconBedug01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bedug-01-bulk-rounded IconBedug01BulkRounded"
    >
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconBedug01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bedug-01-stroke-sharp IconBedug01StrokeSharp"
    >
      <path 
        d={d.d1} 
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
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBedug01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bedug-01-solid-sharp IconBedug01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfBedug01: TheIconSelfPack = {
  name: 'Bedug01',
  StrokeRounded: IconBedug01StrokeRounded,
  DuotoneRounded: IconBedug01DuotoneRounded,
  TwotoneRounded: IconBedug01TwotoneRounded,
  SolidRounded: IconBedug01SolidRounded,
  BulkRounded: IconBedug01BulkRounded,
  StrokeSharp: IconBedug01StrokeSharp,
  SolidSharp: IconBedug01SolidSharp,
};