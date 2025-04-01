import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M21.5 6.5C21.3015 5.40606 20.9503 4.60096 20.3292 3.96447C18.9001 2.5 16.6001 2.5 12 2.5C7.39991 2.5 5.09987 2.5 3.6708 3.96447C3.04969 4.60096 2.69854 5.40606 2.5 6.5',
  d2: 'M21.2486 17.6896C21.0553 18.7317 20.7134 19.4986 20.1088 20.105C19.5041 20.7113 18.7392 21.0541 17.7 21.2479M21.495 10C21.5 10.586 21.5 11.2883 21.5 11.9741C21.5 12.6599 21.5 13.4249 21.495 14.0109M13.9 21.495C13.3156 21.5 12.6839 21.5 12 21.5C11.3161 21.5 10.6844 21.5 10.0999 21.495M6.3 21.2479C5.26076 21.0541 4.49591 20.7113 3.89124 20.105C3.28657 19.4986 2.94471 18.7317 2.75142 17.6896M2.50495 10C2.5 10.586 2.5 11.2883 2.5 11.9741C2.5 12.6598 2.5 13.4249 2.50495 14.0109',
  d3: 'M21.5 12L20 12M4 12L2.5 12M12 9L12 15M12 19.5312L12 21M15 12L9 12',
  d4: 'M3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124Z',
  d5: 'M21.6784 7.48375C22.2218 7.38513 22.5824 6.86466 22.4838 6.32126C22.2628 5.10353 21.8488 4.0899 21.0447 3.26589C20.1145 2.31261 18.9341 1.8912 17.49 1.69224C16.0931 1.49978 14.3114 1.4998 12.0761 1.49983L11.9236 1.49983C9.68826 1.4998 7.90651 1.49978 6.50961 1.69224C5.06553 1.8912 3.88516 2.31261 2.95493 3.26589C2.15084 4.0899 1.7369 5.10353 1.5159 6.32126C1.41728 6.86466 1.77785 7.38513 2.32126 7.48375C2.86466 7.58237 3.38513 7.2218 3.48375 6.6784C3.65982 5.70825 3.9482 5.11168 4.38633 4.6627C4.88516 4.15151 5.56935 3.84068 6.78258 3.67353C8.02714 3.50205 9.67083 3.49983 11.9998 3.49983C14.3288 3.49983 15.9725 3.50205 17.2171 3.67353C18.4303 3.84068 19.1145 4.15151 19.6133 4.6627C20.0515 5.11168 20.3398 5.70825 20.5159 6.6784C20.6145 7.22181 21.135 7.58238 21.6784 7.48375Z',
  d6: 'M22.5 11.9773L22.5 11.9711C22.5 11.2875 22.5 10.5818 22.495 9.99154C22.4903 9.43928 22.0389 8.99537 21.4866 9.00004C20.9343 9.00471 20.4904 9.45619 20.4951 10.0085C20.5 10.5894 20.5 11.2871 20.5 11.9741C20.5 12.6613 20.5 13.4216 20.4951 14.0024C20.4904 14.5547 20.9343 15.0062 21.4866 15.0109C22.0389 15.0155 22.4903 14.5716 22.495 14.0194C22.5 13.4291 22.5 12.6609 22.5 11.9773ZM21.4309 16.7064C20.8879 16.6057 20.3661 16.9643 20.2653 17.5073C20.0957 18.4219 19.8193 18.9791 19.4007 19.3988C18.9823 19.8183 18.4275 20.095 17.5167 20.2648C16.9737 20.3661 16.6157 20.8883 16.7169 21.4312C16.8182 21.9741 17.3404 22.3322 17.8833 22.2309C19.051 22.0132 20.0259 21.6042 20.8168 20.8111C21.6075 20.0182 22.0149 19.0415 22.2318 17.872C22.3325 17.329 21.974 16.8071 21.4309 16.7064ZM14.9 21.4865C14.8953 20.9343 14.4438 20.4904 13.8915 20.4951C13.3121 20.5 12.6849 20.5 12 20.5C11.315 20.5 10.6878 20.5 10.1084 20.4951C9.55616 20.4904 9.10466 20.9343 9.09996 21.4865C9.09526 22.0388 9.53916 22.4903 10.0914 22.495C10.6801 22.5 11.3154 22.5 11.9972 22.5L12.0028 22.5C12.6846 22.5 13.3198 22.5 13.9085 22.495C14.4608 22.4903 14.9047 22.0388 14.9 21.4865ZM7.28305 21.4312C7.3843 20.8883 7.02625 20.3661 6.48333 20.2648C5.57248 20.095 5.01769 19.8183 4.59931 19.3988C4.18069 18.9791 3.9043 18.4219 3.73466 17.5073C3.63394 16.9643 3.11208 16.6057 2.56906 16.7064C2.02603 16.8071 1.66747 17.329 1.76819 17.872C1.98512 19.0415 2.39246 20.0182 3.18317 20.8111C3.97414 21.6042 4.94904 22.0132 6.11667 22.2309C6.6596 22.3322 7.1818 21.9741 7.28305 21.4312ZM2.51341 15.0109C3.06567 15.0062 3.50959 14.5547 3.50492 14.0024C3.50001 13.4216 3.5 12.6612 3.5 11.9741C3.5 11.2871 3.50001 10.5894 3.50492 10.0085C3.50959 9.45619 3.06567 9.0047 2.51341 9.00003C1.96114 8.99537 1.50966 9.43928 1.50499 9.99154C1.5 10.5815 1.5 11.2869 1.5 11.9702L1.5 11.9772C1.5 12.6607 1.5 13.4291 1.50499 14.0194C1.50966 14.5716 1.96114 15.0155 2.51341 15.0109Z',
  d7: 'M22.5 12C22.5 12.5523 22.0523 13 21.5 13L20 13C19.4477 13 19 12.5523 19 12C19 11.4477 19.4477 11 20 11L21.5 11C22.0523 11 22.5 11.4477 22.5 12ZM16 12C16 12.5523 15.5523 13 15 13L13 13L13 15C13 15.5523 12.5523 16 12 16C11.4477 16 11 15.5523 11 15L11 13L9 13C8.44772 13 8 12.5523 8 12C8 11.4477 8.44771 11 9 11L11 11L11 9C11 8.44771 11.4477 8 12 8C12.5523 8 13 8.44771 13 9L13 11L15 11C15.5523 11 16 11.4477 16 12ZM12 18.5312C12.5523 18.5312 13 18.979 13 19.5312L13 21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21L11 19.5312C11 18.979 11.4477 18.5312 12 18.5312ZM5 12C5 12.5523 4.55228 13 4 13L2.5 13C1.94772 13 1.5 12.5523 1.5 12C1.5 11.4477 1.94772 11 2.5 11L4 11C4.55228 11 5 11.4477 5 12Z',
  d8: 'M22.5 12.0007C22.5 12.6783 22.4999 13.4358 22.495 14.0194C22.4903 14.5716 22.0389 15.0155 21.4866 15.0109C20.9343 15.0062 20.4904 14.5547 20.4951 14.0024C20.4976 13.7042 20.4988 13.3587 20.4994 13H20C19.4477 13 19 12.5523 19 12C19 11.4477 19.4477 11 20 11H20.4995C20.4989 10.6496 20.4977 10.313 20.4951 10.0085C20.4904 9.45619 20.9343 9.00471 21.4866 9.00004C22.0389 8.99537 22.4903 9.43928 22.495 9.99154C22.5 10.5818 22.5 11.2875 22.5 11.9711V11.9773C22.5 11.9848 22.5 11.9931 22.5 12.0007Z',
  d9: 'M15 13C15.5523 13 16 12.5523 16 12C16 11.4477 15.5523 11 15 11L13 11V9C13 8.44772 12.5523 8 12 8C11.4477 8 11 8.44772 11 9V11H9C8.44771 11 8 11.4477 8 12C8 12.5523 8.44772 13 9 13H11V15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15V13H15Z',
  d10: 'M13 19.5312C13 18.979 12.5523 18.5312 12 18.5312C11.4477 18.5312 11 18.979 11 19.5312V20.4994C10.6904 20.4987 10.3936 20.4975 10.1084 20.4951C9.55616 20.4904 9.10466 20.9343 9.09996 21.4865C9.09526 22.0388 9.53916 22.4903 10.0914 22.495C10.68 22.5 11.3151 22.5 11.9968 22.5H12.0028C12.6845 22.5 13.3199 22.5 13.9085 22.495C14.4608 22.4903 14.9047 22.0388 14.9 21.4865C14.8953 20.9343 14.4438 20.4904 13.8915 20.4951C13.6063 20.4975 13.3095 20.4987 13 20.4994V19.5312Z',
  d11: 'M4 13C4.55228 13 5 12.5523 5 12C5 11.4477 4.55228 11 4 11H3.50053C3.50112 10.6496 3.50234 10.313 3.50492 10.0085C3.50959 9.45619 3.06567 9.0047 2.51341 9.00003C1.96114 8.99537 1.50966 9.43928 1.50499 9.99154C1.5 10.5815 1.5 11.2869 1.5 11.9702V11.9772C1.5 12.6607 1.5 13.4291 1.50499 14.0194C1.50966 14.5716 1.96114 15.0155 2.51341 15.0109C3.06567 15.0062 3.50959 14.5547 3.50492 14.0024C3.5024 13.7042 3.50117 13.3587 3.50057 13H4Z',
  d12: 'M20.2653 17.5073C20.3661 16.9643 20.8879 16.6057 21.4309 16.7064C21.974 16.8071 22.3325 17.329 22.2318 17.872C22.0149 19.0415 21.6075 20.0182 20.8168 20.8111C20.0259 21.6042 19.051 22.0132 17.8833 22.2309C17.3404 22.3322 16.8182 21.9741 16.7169 21.4312C16.6157 20.8883 16.9737 20.3661 17.5167 20.2648C18.4275 20.095 18.9823 19.8183 19.4007 19.3988C19.8193 18.9791 20.0957 18.4219 20.2653 17.5073Z',
  d13: 'M6.48333 20.2648C7.02625 20.3661 7.3843 20.8883 7.28305 21.4312C7.1818 21.9741 6.6596 22.3322 6.11667 22.2309C4.94904 22.0132 3.97414 21.6042 3.18317 20.8111C2.39246 20.0182 1.98512 19.0415 1.76819 17.872C1.66747 17.329 2.02603 16.8071 2.56906 16.7064C3.11208 16.6057 3.63394 16.9643 3.73466 17.5073C3.9043 18.4219 4.18069 18.9791 4.59931 19.3988C5.01769 19.8183 5.57248 20.095 6.48333 20.2648Z',
  d14: 'M21 7.00025V3.00024L3 3.00024L3 7.00024M3 17.0002L3 21.0002H7M21 17.0002V21.0002H17M21 9.00025V15.0002M3 15.0002L3 9.00024M15 21.0002H9',
  d15: 'M21 12.001L17 12.001M7 12.001L3 12.001M12 9.00024L12 12.001M12 12.001L12 15.0002M12 12.001L15 12.001M12 12.001L9 12.001M12 17.001L12 21.001',
  d16: 'M2 3.00012C2 2.44784 2.44772 2.00012 3 2.00012L21 2.00012C21.5523 2.00012 22 2.44784 22 3.00012V7.00012H20V4.00012L4 4.00012L4 7.00012H2L2 3.00012ZM4 9.00012V15.0001H2L2 9.00012H4ZM20 15.0001V9.00012H22V15.0001H20ZM4 20.0001V17.0001H2L2 21.0001C2 21.2653 2.10536 21.5197 2.29289 21.7072C2.48043 21.8948 2.73478 22.0001 3 22.0001H7V20.0001H4ZM20 20.0001V17.0001H22V21.0001C22 21.5524 21.5523 22.0001 21 22.0001H17V20.0001H20ZM9 20.0001H15V22.0001H9V20.0001Z',
  d17: 'M11 11.0009L11 9.00012H13L13 11.0009L15 11.0009V13.0009H13L13 15.0001L11 15.0001L11 13.0009L9 13.0009V11.0009L11 11.0009ZM3 11.0009L7 11.0009V13.0009H3V11.0009ZM17 11.0009L21 11.0009V13.0009L17 13.0009V11.0009ZM11 21.0009L11 17.0009L13 17.0009L13 21.0009L11 21.0009Z',
};

export const IconBorderTop01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="border-top-01-stroke-rounded IconBorderTop01StrokeRounded"
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

export const IconBorderTop01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="border-top-01-duotone-rounded IconBorderTop01DuotoneRounded"
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

export const IconBorderTop01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="border-top-01-twotone-rounded IconBorderTop01TwotoneRounded"
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

export const IconBorderTop01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="border-top-01-solid-rounded IconBorderTop01SolidRounded"
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconBorderTop01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="border-top-01-bulk-rounded IconBorderTop01BulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
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
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      </g>
    </TheIconWrapper>
  );
};

export const IconBorderTop01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="border-top-01-stroke-sharp IconBorderTop01StrokeSharp"
    >
      <path 
        d={d.d14} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d15} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBorderTop01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="border-top-01-solid-sharp IconBorderTop01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfBorderTop01: TheIconSelfPack = {
  name: 'BorderTop01',
  StrokeRounded: IconBorderTop01StrokeRounded,
  DuotoneRounded: IconBorderTop01DuotoneRounded,
  TwotoneRounded: IconBorderTop01TwotoneRounded,
  SolidRounded: IconBorderTop01SolidRounded,
  BulkRounded: IconBorderTop01BulkRounded,
  StrokeSharp: IconBorderTop01StrokeSharp,
  SolidSharp: IconBorderTop01SolidSharp,
};