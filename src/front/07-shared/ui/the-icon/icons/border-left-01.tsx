import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M6.5 2.5C5.40606 2.69854 4.60096 3.04969 3.96447 3.6708C2.5 5.09987 2.5 7.39991 2.5 12C2.5 16.6001 2.5 18.9001 3.96447 20.3292C4.60096 20.9503 5.40606 21.3015 6.5 21.5',
  d2: 'M17.6896 2.75143C18.7317 2.94471 19.4986 3.28657 20.105 3.89124C20.7113 4.49591 21.0541 5.26076 21.2479 6.3M10 2.50495C10.586 2.5 11.2883 2.5 11.9741 2.5C12.6599 2.5 13.4249 2.5 14.0109 2.50495M21.495 10.1C21.5 10.6844 21.5 11.3161 21.5 12C21.5 12.6839 21.5 13.3156 21.495 13.9001M21.2479 17.7C21.0541 18.7392 20.7113 19.5041 20.105 20.1088C19.4986 20.7134 18.7317 21.0553 17.6896 21.2486M10 21.495C10.586 21.5 11.2883 21.5 11.9741 21.5C12.6598 21.5 13.4249 21.5 14.0109 21.495',
  d3: 'M12 2.5V4M12 20V21.5M9 12H15M19.5312 12H21M12 9L12 15',
  d4: 'M3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124Z',
  d5: 'M7.48375 2.32148C7.38513 1.77807 6.86466 1.4175 6.32126 1.51612C5.10353 1.73713 4.0899 2.15106 3.26589 2.95515C2.31261 3.88539 1.8912 5.06575 1.69224 6.50983C1.49978 7.90673 1.4998 9.68848 1.49983 11.9238V12.0763C1.4998 14.3116 1.49978 16.0934 1.69224 17.4903C1.8912 18.9343 2.31261 20.1147 3.26589 21.045C4.0899 21.849 5.10353 22.263 6.32126 22.484C6.86466 22.5826 7.38513 22.222 7.48375 21.6786C7.58238 21.1352 7.22181 20.6147 6.6784 20.5161C5.70825 20.3401 5.11168 20.0517 4.6627 19.6135C4.15151 19.1147 3.84068 18.4305 3.67353 17.2173C3.50205 15.9727 3.49983 14.329 3.49983 12.0001C3.49983 9.67106 3.50206 8.02737 3.67353 6.78281C3.84068 5.56957 4.15151 4.88538 4.6627 4.38656C5.11168 3.94843 5.70825 3.66005 6.6784 3.48398C7.22181 3.38536 7.58238 2.86489 7.48375 2.32148Z',
  d6: 'M11.9773 1.5H11.9711C11.2875 1.5 10.5818 1.5 9.99154 1.50499C9.43928 1.50966 8.99537 1.96114 9.00004 2.51341C9.00471 3.06568 9.45619 3.50959 10.0085 3.50492C10.5894 3.50001 11.2871 3.5 11.9741 3.5C12.6613 3.5 13.4216 3.50001 14.0024 3.50492C14.5547 3.50959 15.0062 3.06568 15.0109 2.51341C15.0155 1.96115 14.5716 1.50966 14.0194 1.50499C13.4291 1.5 12.6609 1.5 11.9773 1.5ZM16.7064 2.56906C16.6057 3.11208 16.9643 3.63394 17.5073 3.73466C18.4219 3.9043 18.9791 4.18068 19.3988 4.59931C19.8183 5.01769 20.095 5.57248 20.2648 6.48333C20.3661 7.02625 20.8883 7.3843 21.4312 7.28305C21.9741 7.1818 22.3322 6.65959 22.2309 6.11667C22.0132 4.94903 21.6042 3.97414 20.8111 3.18317C20.0182 2.39246 19.0415 1.98512 17.872 1.76819C17.329 1.66748 16.8071 2.02603 16.7064 2.56906ZM21.4865 9.10004C20.9343 9.10473 20.4904 9.55624 20.4951 10.1085C20.5 10.6879 20.5 11.3151 20.5 12C20.5 12.685 20.5 13.3122 20.4951 13.8916C20.4904 14.4438 20.9343 14.8953 21.4865 14.9C22.0388 14.9047 22.4903 14.4608 22.495 13.9086C22.5 13.3199 22.5 12.6846 22.5 12.0028V11.9972C22.5 11.3154 22.5 10.6802 22.495 10.0915C22.4903 9.53923 22.0388 9.09534 21.4865 9.10004ZM21.4312 16.7169C20.8883 16.6157 20.3661 16.9737 20.2648 17.5167C20.095 18.4275 19.8183 18.9823 19.3988 19.4007C18.9791 19.8193 18.4219 20.0957 17.5073 20.2653C16.9643 20.3661 16.6057 20.8879 16.7064 21.4309C16.8071 21.974 17.329 22.3325 17.872 22.2318C19.0415 22.0149 20.0182 21.6075 20.8111 20.8168C21.6042 20.0259 22.0132 19.051 22.2309 17.8833C22.3322 17.3404 21.9741 16.8182 21.4312 16.7169ZM15.0109 21.4866C15.0062 20.9343 14.5547 20.4904 14.0024 20.4951C13.4216 20.5 12.6612 20.5 11.9741 20.5C11.2871 20.5 10.5894 20.5 10.0085 20.4951C9.45619 20.4904 9.00471 20.9343 9.00004 21.4866C8.99537 22.0389 9.43928 22.4903 9.99154 22.495C10.5815 22.5 11.2869 22.5 11.9702 22.5H11.9772C12.6607 22.5 13.4291 22.5 14.0194 22.495C14.5716 22.4903 15.0155 22.0389 15.0109 21.4866Z',
  d7: 'M12 1.5C12.5523 1.5 13 1.94772 13 2.5V4C13 4.55228 12.5523 5 12 5C11.4477 5 11 4.55228 11 4V2.5C11 1.94772 11.4477 1.5 12 1.5ZM12 8C12.5523 8 13 8.44772 13 9V11H15C15.5523 11 16 11.4477 16 12C16 12.5523 15.5523 13 15 13H13V15C13 15.5523 12.5523 16 12 16C11.4477 16 11 15.5523 11 15V13H9C8.44772 13 8 12.5523 8 12C8 11.4477 8.44772 11 9 11H11V9C11 8.44772 11.4477 8 12 8ZM18.5312 12C18.5312 11.4477 18.979 11 19.5312 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H19.5312C18.979 13 18.5312 12.5523 18.5312 12ZM12 19C12.5523 19 13 19.4477 13 20V21.5C13 22.0523 12.5523 22.5 12 22.5C11.4477 22.5 11 22.0523 11 21.5V20C11 19.4477 11.4477 19 12 19Z',
  d8: 'M12.0007 1.49976C12.6783 1.49976 13.4358 1.49981 14.0194 1.50475C14.5716 1.50942 15.0155 1.9609 15.0109 2.51317C15.0062 3.06543 14.5547 3.50934 14.0024 3.50467C13.7042 3.50215 13.3587 3.50092 13 3.50033V3.99976C13 4.55204 12.5523 4.99976 12 4.99976C11.4477 4.99976 11 4.55204 11 3.99976V3.50029C10.6496 3.50087 10.313 3.5021 10.0085 3.50467C9.45619 3.50934 9.00471 3.06543 9.00004 2.51317C8.99537 1.9609 9.43928 1.50942 9.99154 1.50475C10.5818 1.49976 11.2875 1.49976 11.9711 1.49976H11.9773C11.9848 1.49976 11.9931 1.49976 12.0007 1.49976Z',
  d9: 'M13 8.99976C13 8.44747 12.5523 7.99976 12 7.99976C11.4477 7.99976 11 8.44747 11 8.99976V10.9998H9C8.44772 10.9998 8 11.4475 8 11.9998C8 12.552 8.44772 12.9998 9 12.9998H11V14.9998C11 15.552 11.4477 15.9998 12 15.9998C12.5523 15.9998 13 15.552 13 14.9998V12.9998H15C15.5523 12.9998 16 12.552 16 11.9998C16 11.4475 15.5523 10.9998 15 10.9998H13V8.99976Z',
  d10: 'M19.5312 10.9998C18.979 10.9998 18.5312 11.4475 18.5312 11.9998C18.5312 12.552 18.979 12.9998 19.5312 12.9998H20.4994C20.4987 13.3093 20.4975 13.6061 20.4951 13.8913C20.4904 14.4436 20.9343 14.8951 21.4865 14.8998C22.0388 14.9045 22.4903 14.4606 22.495 13.9083C22.5 13.3196 22.5 12.6844 22.5 12.0026V11.9969C22.5 11.3151 22.5 10.6799 22.495 10.0913C22.4903 9.53899 22.0388 9.0951 21.4865 9.09979C20.9343 9.10449 20.4904 9.55599 20.4951 10.1083C20.4975 10.3934 20.4987 10.6902 20.4994 10.9998H19.5312Z',
  d11: 'M13 19.9998C13 19.4475 12.5523 18.9998 12 18.9998C11.4477 18.9998 11 19.4475 11 19.9998V20.4992C10.6496 20.4986 10.313 20.4974 10.0085 20.4948C9.45619 20.4902 9.00471 20.9341 9.00004 21.4863C8.99537 22.0386 9.43928 22.4901 9.99154 22.4948C10.5815 22.4998 11.2869 22.4998 11.9702 22.4998H11.9772C12.6607 22.4998 13.4291 22.4998 14.0194 22.4948C14.5716 22.4901 15.0155 22.0386 15.0109 21.4863C15.0062 20.9341 14.5547 20.4902 14.0024 20.4948C13.7042 20.4974 13.3587 20.4986 13 20.4992V19.9998Z',
  d12: 'M17.5073 3.73441C16.9643 3.63369 16.6057 3.11184 16.7064 2.56881C16.8071 2.02579 17.329 1.66723 17.872 1.76795C19.0415 1.98487 20.0182 2.39221 20.8111 3.18293C21.6042 3.97389 22.0132 4.94879 22.2309 6.11643C22.3322 6.65935 21.9741 7.18156 21.4312 7.28281C20.8883 7.38406 20.3661 7.02601 20.2648 6.48308C20.095 5.57224 19.8183 5.01745 19.3988 4.59907C18.9791 4.18044 18.4219 3.90405 17.5073 3.73441Z',
  d13: 'M20.2648 17.5164C20.3661 16.9735 20.8883 16.6155 21.4312 16.7167C21.9741 16.818 22.3322 17.3402 22.2309 17.8831C22.0132 19.0507 21.6042 20.0256 20.8111 20.8166C20.0182 21.6073 19.0415 22.0146 17.872 22.2316C17.329 22.3323 16.8071 21.9737 16.7064 21.4307C16.6057 20.8877 16.9643 20.3658 17.5073 20.2651C18.4219 20.0955 18.9791 19.8191 19.3988 19.4004C19.8183 18.9821 20.095 18.4273 20.2648 17.5164Z',
  d14: 'M7 3H3V21H7M17 21H21V17M17 3H21V7M15 3H9M9 21H15M21 9V15',
  d15: 'M11.9998 3V7M11.9998 17V21M8.99902 12L14.999 12M16.9998 12L20.9998 12M11.9998 9V15',
  d16: 'M2 3C2 2.44772 2.44772 2 3 2H7V4H4V20H7V22H3C2.44772 22 2 21.5523 2 21V3ZM15 4H9V2H15V4ZM20 4H17V2H21C21.5523 2 22 2.44772 22 3V7H20V4ZM20 15V9H22V15H20ZM20 20V17H22V21C22 21.5523 21.5523 22 21 22H17V20H20ZM9 20H15V22H9V20Z',
  d17: 'M10.9998 7V3H12.9998V7H10.9998ZM10.9998 11V9H12.9998V11L14.999 11L14.999 13L12.9998 13V15H10.9998V13L8.99902 13V11L10.9998 11ZM20.9998 13L16.9998 13L16.9998 11L20.9998 11L20.9998 13ZM10.9998 21V17H12.9998V21H10.9998Z',
};

export const IconBorderLeft01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="border-left-01-stroke-rounded IconBorderLeft01StrokeRounded"
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

export const IconBorderLeft01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="border-left-01-duotone-rounded IconBorderLeft01DuotoneRounded"
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

export const IconBorderLeft01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="border-left-01-twotone-rounded IconBorderLeft01TwotoneRounded"
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

export const IconBorderLeft01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="border-left-01-solid-rounded IconBorderLeft01SolidRounded"
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

export const IconBorderLeft01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="border-left-01-bulk-rounded IconBorderLeft01BulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <g 
        opacity="0.3">
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

export const IconBorderLeft01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="border-left-01-stroke-sharp IconBorderLeft01StrokeSharp"
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

export const IconBorderLeft01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="border-left-01-solid-sharp IconBorderLeft01SolidSharp"
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

export const iconPackOfBorderLeft01: TheIconSelfPack = {
  name: 'BorderLeft01',
  StrokeRounded: IconBorderLeft01StrokeRounded,
  DuotoneRounded: IconBorderLeft01DuotoneRounded,
  TwotoneRounded: IconBorderLeft01TwotoneRounded,
  SolidRounded: IconBorderLeft01SolidRounded,
  BulkRounded: IconBorderLeft01BulkRounded,
  StrokeSharp: IconBorderLeft01StrokeSharp,
  SolidSharp: IconBorderLeft01SolidSharp,
};