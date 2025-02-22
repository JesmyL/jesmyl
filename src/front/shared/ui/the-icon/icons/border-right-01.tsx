import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M17.5 2.5C18.5939 2.69854 19.399 3.04969 20.0355 3.6708C21.5 5.09987 21.5 7.39991 21.5 12C21.5 16.6001 21.5 18.9001 20.0355 20.3292C19.399 20.9503 18.5939 21.3015 17.5 21.5',
  d2: 'M6.31035 2.75143C5.26828 2.94471 4.50135 3.28657 3.89503 3.89124C3.28872 4.49591 2.94592 5.26076 2.75211 6.3M14 2.50495C13.414 2.5 12.7117 2.5 12.0259 2.5C11.3401 2.5 10.5751 2.5 9.9891 2.50495M2.50497 10.1C2.5 10.6844 2.5 11.3161 2.5 12C2.5 12.6839 2.5 13.3156 2.50497 13.9001M2.75211 17.7C2.94592 18.7392 3.28871 19.5041 3.89503 20.1088C4.50135 20.7134 5.26828 21.0553 6.31035 21.2486M14 21.495C13.414 21.5 12.7117 21.5 12.0259 21.5C11.3402 21.5 10.5751 21.5 9.9891 21.495',
  d3: 'M12 2.5V4M12 20V21.5M15 12H9M4.46875 12H3M12 9L12 15',
  d4: 'M3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124Z',
  d5: 'M16.5162 2.32148C16.6149 1.77807 17.1353 1.4175 17.6787 1.51612C18.8965 1.73713 19.9101 2.15106 20.7341 2.95515C21.6874 3.88539 22.1088 5.06575 22.3078 6.50983C22.5002 7.90673 22.5002 9.68848 22.5002 11.9238V12.0763C22.5002 14.3116 22.5002 16.0934 22.3078 17.4903C22.1088 18.9343 21.6874 20.1147 20.7341 21.045C19.9101 21.849 18.8965 22.263 17.6787 22.484C17.1353 22.5826 16.6149 22.222 16.5162 21.6786C16.4176 21.1352 16.7782 20.6147 17.3216 20.5161C18.2918 20.3401 18.8883 20.0517 19.3373 19.6135C19.8485 19.1147 20.1593 18.4305 20.3265 17.2173C20.4979 15.9727 20.5002 14.329 20.5002 12.0001C20.5002 9.67106 20.4979 8.02737 20.3265 6.78281C20.1593 5.56957 19.8485 4.88538 19.3373 4.38656C18.8883 3.94843 18.2918 3.66005 17.3216 3.48398C16.7782 3.38536 16.4176 2.86489 16.5162 2.32148Z',
  d6: 'M12.0227 1.5H12.0289C12.7125 1.5 13.4182 1.5 14.0085 1.50499C14.5607 1.50966 15.0046 1.96114 15 2.51341C14.9953 3.06568 14.5438 3.50959 13.9915 3.50492C13.4106 3.50001 12.7129 3.5 12.0259 3.5C11.3387 3.5 10.5784 3.50001 9.99756 3.50492C9.44529 3.50959 8.99381 3.06568 8.98914 2.51341C8.98447 1.96115 9.42838 1.50966 9.98065 1.50499C10.5709 1.5 11.3391 1.5 12.0227 1.5ZM7.29358 2.56906C7.3943 3.11208 7.03574 3.63394 6.49272 3.73466C5.57811 3.9043 5.02095 4.18068 4.60118 4.59931C4.18166 5.01769 3.90503 5.57248 3.73516 6.48333C3.63391 7.02625 3.11171 7.3843 2.56878 7.28305C2.02586 7.1818 1.66781 6.65959 1.76906 6.11667C1.98681 4.94903 2.39577 3.97414 3.18889 3.18317C3.98176 2.39246 4.95845 1.98512 6.12799 1.76819C6.67101 1.66748 7.19287 2.02603 7.29358 2.56906ZM2.51347 9.10004C3.06573 9.10473 3.50963 9.55624 3.50493 10.1085C3.50001 10.6879 3.5 11.3151 3.5 12C3.5 12.685 3.50001 13.3122 3.50493 13.8916C3.50963 14.4438 3.06574 14.8953 2.51347 14.9C1.96121 14.9047 1.5097 14.4608 1.50501 13.9086C1.5 13.3199 1.5 12.6846 1.5 12.0028V11.9972C1.5 11.3154 1.5 10.6802 1.505 10.0915C1.5097 9.53923 1.9612 9.09534 2.51347 9.10004ZM2.56878 16.7169C3.11171 16.6157 3.63391 16.9737 3.73516 17.5167C3.90503 18.4275 4.18166 18.9823 4.60118 19.4007C5.02094 19.8193 5.57811 20.0957 6.49272 20.2653C7.03574 20.3661 7.3943 20.8879 7.29358 21.4309C7.19287 21.974 6.67101 22.3325 6.12799 22.2318C4.95845 22.0149 3.98176 21.6075 3.18889 20.8168C2.39577 20.0259 1.98681 19.051 1.76906 17.8833C1.66781 17.3404 2.02586 16.8182 2.56878 16.7169ZM8.98914 21.4866C8.9938 20.9343 9.44529 20.4904 9.99755 20.4951C10.5784 20.5 11.3388 20.5 12.0259 20.5C12.7129 20.5 13.4106 20.5 13.9915 20.4951C14.5438 20.4904 14.9953 20.9343 15 21.4866C15.0046 22.0389 14.5607 22.4903 14.0085 22.495C13.4185 22.5 12.7131 22.5 12.0298 22.5H12.0228C11.3393 22.5 10.5709 22.5 9.98065 22.495C9.42838 22.4903 8.98447 22.0389 8.98914 21.4866Z',
  d7: 'M12 1.5C11.4477 1.5 11 1.94772 11 2.5V4C11 4.55228 11.4477 5 12 5C12.5523 5 13 4.55228 13 4V2.5C13 1.94772 12.5523 1.5 12 1.5ZM12 8C11.4477 8 11 8.44772 11 9V11H9C8.44772 11 8 11.4477 8 12C8 12.5523 8.44772 13 9 13H11V15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15V13H15C15.5523 13 16 12.5523 16 12C16 11.4477 15.5523 11 15 11H13V9C13 8.44772 12.5523 8 12 8ZM5.46875 12C5.46875 11.4477 5.02104 11 4.46875 11H3C2.44771 11 2 11.4477 2 12C2 12.5523 2.44771 13 3 13H4.46875C5.02104 13 5.46875 12.5523 5.46875 12ZM12 19C11.4477 19 11 19.4477 11 20V21.5C11 22.0523 11.4477 22.5 12 22.5C12.5523 22.5 13 22.0523 13 21.5V20C13 19.4477 12.5523 19 12 19Z',
  d8: 'M12.0289 1.49976H12.0227C11.3391 1.49976 10.5709 1.49976 9.98065 1.50475C9.42838 1.50942 8.98447 1.9609 8.98914 2.51317C8.99381 3.06543 9.44529 3.50934 9.99756 3.50467C10.2958 3.50215 10.6413 3.50092 11 3.50033V3.99976C11 4.55204 11.4477 4.99976 12 4.99976C12.5523 4.99976 13 4.55204 13 3.99976V3.50029C13.3504 3.50087 13.687 3.5021 13.9915 3.50467C14.5438 3.50934 14.9953 3.06543 15 2.51317C15.0046 1.9609 14.5607 1.50942 14.0085 1.50475C13.4182 1.49976 12.7125 1.49976 12.0289 1.49976Z',
  d9: 'M6.49272 3.73441C7.03574 3.63369 7.3943 3.11184 7.29358 2.56881C7.19287 2.02579 6.67101 1.66723 6.12799 1.76795C4.95845 1.98487 3.98176 2.39221 3.18889 3.18293C2.39577 3.97389 1.98681 4.94879 1.76906 6.11643C1.66781 6.65935 2.02586 7.18156 2.56878 7.28281C3.11171 7.38406 3.63391 7.02601 3.73516 6.48308C3.90503 5.57224 4.18166 5.01745 4.60118 4.59907C5.02095 4.18044 5.57811 3.90405 6.49272 3.73441Z',
  d10: 'M3.50493 10.1083C3.50963 9.55599 3.06573 9.10449 2.51347 9.09979C1.9612 9.0951 1.5097 9.53899 1.505 10.0913C1.5 10.6799 1.5 11.3151 1.5 11.9969V12.0026C1.5 12.6844 1.5 13.3196 1.50501 13.9083C1.5097 14.4606 1.96121 14.9045 2.51347 14.8998C3.06574 14.8951 3.50963 14.4436 3.50493 13.8913C3.50251 13.6061 3.50128 13.3093 3.50065 12.9998H4.46875C5.02104 12.9998 5.46875 12.552 5.46875 11.9998C5.46875 11.4475 5.02104 10.9998 4.46875 10.9998H3.50065C3.50128 10.6902 3.50251 10.3934 3.50493 10.1083Z',
  d11: 'M3.73516 17.5164C3.63391 16.9735 3.11171 16.6155 2.56878 16.7167C2.02586 16.818 1.66781 17.3402 1.76906 17.8831C1.98681 19.0507 2.39577 20.0256 3.18889 20.8166C3.98176 21.6073 4.95845 22.0146 6.12799 22.2316C6.67101 22.3323 7.19287 21.9737 7.29358 21.4307C7.3943 20.8877 7.03574 20.3658 6.49272 20.2651C5.57811 20.0955 5.02094 19.8191 4.60118 19.4004C4.18166 18.9821 3.90503 18.4273 3.73516 17.5164Z',
  d12: 'M9.99755 20.4948C9.44529 20.4902 8.9938 20.9341 8.98914 21.4863C8.98447 22.0386 9.42838 22.4901 9.98065 22.4948C10.5709 22.4998 11.3393 22.4998 12.0228 22.4998H12.0298C12.7131 22.4998 13.4185 22.4998 14.0085 22.4948C14.5607 22.4901 15.0046 22.0386 15 21.4863C14.9953 20.9341 14.5438 20.4902 13.9915 20.4948C13.687 20.4974 13.3504 20.4986 13 20.4992V19.9998C13 19.4475 12.5523 18.9998 12 18.9998C11.4477 18.9998 11 19.4475 11 19.9998V20.4992C10.6413 20.4986 10.2958 20.4974 9.99755 20.4948Z',
  d13: 'M11 8.99976C11 8.44747 11.4477 7.99976 12 7.99976C12.5523 7.99976 13 8.44747 13 8.99976V10.9998H15C15.5523 10.9998 16 11.4475 16 11.9998C16 12.552 15.5523 12.9998 15 12.9998H13V14.9998C13 15.552 12.5523 15.9998 12 15.9998C11.4477 15.9998 11 15.552 11 14.9998V12.9998H9C8.44772 12.9998 8 12.552 8 11.9998C8 11.4475 8.44772 10.9998 9 10.9998H11V8.99976Z',
  d14: 'M16.998 3H20.998V21H16.998M6.99805 21H2.99805V17M6.99805 3H2.99805V7M14.998 3H8.99805M8.99805 21H14.998M2.99805 9V15',
  d15: 'M11.998 3V7M11.998 17V21M14.9988 12L11.998 12M11.998 12L8.99883 12M11.998 12V9M11.998 12V15M6.99805 12L2.99805 12',
  d16: 'M1.99805 3C1.99805 2.44772 2.44576 2 2.99805 2H6.99805V4H3.99805V7H1.99805V3ZM8.99805 2H14.998V4H8.99805V2ZM16.998 2H20.998C21.5503 2 21.998 2.44772 21.998 3V21C21.998 21.5523 21.5503 22 20.998 22H16.998V20H19.998V4H16.998V2ZM1.99805 15V9H3.99805V15H1.99805ZM1.99805 21V17H3.99805V20H6.99805V22H2.99805C2.44576 22 1.99805 21.5523 1.99805 21ZM14.998 22H8.99805V20H14.998V22Z',
  d17: 'M10.998 7V3H12.998V7H10.998ZM10.998 11V9H12.998V11L14.9988 11L14.9988 13L12.998 13V15H10.998V13L8.99883 13L8.99883 11L10.998 11ZM2.99805 11L6.99805 11L6.99805 13L2.99805 13L2.99805 11ZM10.998 21V17H12.998V21H10.998Z',
};

export const IconBorderRight01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="border-right-01-stroke-rounded IconBorderRight01StrokeRounded"
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

export const IconBorderRight01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="border-right-01-duotone-rounded IconBorderRight01DuotoneRounded"
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

export const IconBorderRight01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="border-right-01-twotone-rounded IconBorderRight01TwotoneRounded"
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

export const IconBorderRight01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="border-right-01-solid-rounded IconBorderRight01SolidRounded"
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

export const IconBorderRight01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="border-right-01-bulk-rounded IconBorderRight01BulkRounded"
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

export const IconBorderRight01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="border-right-01-stroke-sharp IconBorderRight01StrokeSharp"
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

export const IconBorderRight01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="border-right-01-solid-sharp IconBorderRight01SolidSharp"
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

export const iconPackOfBorderRight01: TheIconSelfPack = {
  name: 'BorderRight01',
  StrokeRounded: IconBorderRight01StrokeRounded,
  DuotoneRounded: IconBorderRight01DuotoneRounded,
  TwotoneRounded: IconBorderRight01TwotoneRounded,
  SolidRounded: IconBorderRight01SolidRounded,
  BulkRounded: IconBorderRight01BulkRounded,
  StrokeSharp: IconBorderRight01StrokeSharp,
  SolidSharp: IconBorderRight01SolidSharp,
};