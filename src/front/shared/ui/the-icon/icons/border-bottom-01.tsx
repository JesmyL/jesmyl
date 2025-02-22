import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2.5 17.5C2.69854 18.5939 3.04969 19.399 3.6708 20.0355C5.09987 21.5 7.39991 21.5 12 21.5C16.6001 21.5 18.9001 21.5 20.3292 20.0355C20.9503 19.399 21.3015 18.5939 21.5 17.5',
  d2: 'M2.75143 6.31035C2.94471 5.26828 3.28657 4.50135 3.89124 3.89503C4.49591 3.28872 5.26076 2.94592 6.3 2.75211M2.50496 14C2.5 13.414 2.5 12.7117 2.5 12.0259C2.5 11.3401 2.5 10.5751 2.50496 9.9891M10.1 2.50497C10.6844 2.5 11.3161 2.5 12 2.5C12.6839 2.5 13.3156 2.5 13.9001 2.50497M17.7 2.75211C18.7392 2.94592 19.5041 3.28871 20.1088 3.89503C20.7134 4.50135 21.0553 5.26828 21.2486 6.31035M21.495 14C21.5 13.414 21.5 12.7117 21.5 12.0259C21.5 11.3402 21.5 10.5751 21.495 9.9891',
  d3: 'M2.5 12L4 12M20 12L21.5 12M12 15L12 9M12 4.46875L12 3M9 12L15 12',
  d4: 'M3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124Z',
  d5: 'M2.3216 16.5161C1.77819 16.6147 1.41762 17.1352 1.51625 17.6786C1.73725 18.8963 2.15119 19.91 2.95527 20.734C3.88551 21.6873 5.06588 22.1087 6.50995 22.3076C7.90686 22.5001 9.6886 22.5001 11.9239 22.5001L12.0764 22.5001C14.3117 22.5001 16.0935 22.5001 17.4904 22.3076C18.9345 22.1087 20.1148 21.6873 21.0451 20.734C21.8492 19.91 22.2631 18.8963 22.4841 17.6786C22.5827 17.1352 22.2222 16.6147 21.6787 16.5161C21.1353 16.4175 20.6149 16.7781 20.5162 17.3215C20.3402 18.2916 20.0518 18.8882 19.6137 19.3372C19.1148 19.8484 18.4306 20.1592 17.2174 20.3264C15.9729 20.4978 14.3292 20.5001 12.0002 20.5001C9.67118 20.5001 8.02749 20.4978 6.78293 20.3264C5.5697 20.1592 4.88551 19.8484 4.38668 19.3372C3.94855 18.8882 3.66017 18.2916 3.4841 17.3215C3.38548 16.7781 2.86501 16.4175 2.3216 16.5161Z',
  d6: 'M1.5 12.0227L1.5 12.0289C1.5 12.7125 1.5 13.4182 1.50499 14.0085C1.50966 14.5607 1.96115 15.0046 2.51341 15C3.06568 14.9953 3.50959 14.5438 3.50492 13.9915C3.50001 13.4106 3.5 12.7129 3.5 12.0259C3.5 11.3387 3.50001 10.5784 3.50492 9.99756C3.50959 9.44529 3.06568 8.99381 2.51341 8.98914C1.96115 8.98447 1.50966 9.42838 1.50499 9.98065C1.5 10.5709 1.5 11.3391 1.5 12.0227ZM2.56906 7.29358C3.11208 7.3943 3.63394 7.03574 3.73466 6.49272C3.9043 5.57811 4.18068 5.02095 4.59931 4.60118C5.01769 4.18166 5.57248 3.90503 6.48333 3.73516C7.02625 3.63391 7.3843 3.11171 7.28305 2.56878C7.1818 2.02586 6.65959 1.66781 6.11667 1.76906C4.94903 1.98681 3.97414 2.39577 3.18317 3.18889C2.39246 3.98176 1.98512 4.95845 1.76819 6.12799C1.66748 6.67101 2.02603 7.19287 2.56906 7.29358ZM9.10004 2.51347C9.10473 3.06573 9.55624 3.50963 10.1085 3.50493C10.6879 3.50001 11.3151 3.5 12 3.5C12.685 3.5 13.3122 3.50001 13.8916 3.50493C14.4438 3.50963 14.8953 3.06574 14.9 2.51347C14.9047 1.96121 14.4608 1.5097 13.9086 1.505C13.3199 1.5 12.6846 1.5 12.0028 1.5L11.9972 1.5C11.3154 1.5 10.6802 1.5 10.0915 1.505C9.53923 1.5097 9.09534 1.9612 9.10004 2.51347ZM16.7169 2.56878C16.6157 3.11171 16.9737 3.63391 17.5167 3.73516C18.4275 3.90503 18.9823 4.18166 19.4007 4.60118C19.8193 5.02094 20.0957 5.57811 20.2653 6.49272C20.3661 7.03574 20.8879 7.3943 21.4309 7.29358C21.974 7.19286 22.3325 6.67101 22.2318 6.12799C22.0149 4.95845 21.6075 3.98176 20.8168 3.18889C20.0259 2.39577 19.051 1.98681 17.8833 1.76906C17.3404 1.66781 16.8182 2.02586 16.7169 2.56878ZM21.4866 8.98914C20.9343 8.9938 20.4904 9.44529 20.4951 9.99755C20.5 10.5784 20.5 11.3388 20.5 12.0259C20.5 12.7129 20.5 13.4106 20.4951 13.9915C20.4904 14.5438 20.9343 14.9953 21.4866 15C22.0389 15.0046 22.4903 14.5607 22.495 14.0085C22.5 13.4185 22.5 12.7131 22.5 12.0298L22.5 12.0228C22.5 11.3393 22.5 10.5709 22.495 9.98065C22.4903 9.42838 22.0389 8.98447 21.4866 8.98914Z',
  d7: 'M1.5 12C1.5 11.4477 1.94772 11 2.5 11L4 11C4.55228 11 5 11.4477 5 12C5 12.5523 4.55228 13 4 13L2.5 13C1.94772 13 1.5 12.5523 1.5 12ZM8 12C8 11.4477 8.44772 11 9 11L11 11L11 9C11 8.44771 11.4477 8 12 8C12.5523 8 13 8.44771 13 9L13 11L15 11C15.5523 11 16 11.4477 16 12C16 12.5523 15.5523 13 15 13L13 13L13 15C13 15.5523 12.5523 16 12 16C11.4477 16 11 15.5523 11 15L11 13L9 13C8.44772 13 8 12.5523 8 12ZM12 5.46875C11.4477 5.46875 11 5.02103 11 4.46875L11 3C11 2.44771 11.4477 2 12 2C12.5523 2 13 2.44771 13 3L13 4.46875C13 5.02103 12.5523 5.46875 12 5.46875ZM19 12C19 11.4477 19.4477 11 20 11L21.5 11C22.0523 11 22.5 11.4477 22.5 12C22.5 12.5523 22.0523 13 21.5 13L20 13C19.4477 13 19 12.5523 19 12Z',
  d8: 'M1.5 12.0289V12.0227C1.5 12.0152 1.5 12.0076 1.5 12C1.5 12.0002 1.5 11.9998 1.5 12C1.5 11.3223 1.50006 10.5642 1.50499 9.98065C1.50966 9.42838 1.96115 8.98447 2.51341 8.98914C3.06568 8.99381 3.50959 9.44529 3.50492 9.99756C3.5024 10.2958 3.50117 10.6413 3.50057 11H4C4.55228 11 5 11.4477 5 12C5 12.5523 4.55228 13 4 13H3.50053C3.50112 13.3504 3.50234 13.687 3.50492 13.9915C3.50959 14.5438 3.06568 14.9953 2.51341 15C1.96115 15.0046 1.50966 14.5607 1.50499 14.0085C1.5 13.4182 1.5 12.7125 1.5 12.0289Z',
  d9: 'M3.73466 6.49272C3.63394 7.03574 3.11208 7.3943 2.56906 7.29358C2.02604 7.19287 1.66748 6.67101 1.7682 6.12799C1.98512 4.95845 2.39246 3.98176 3.18317 3.18889C3.97414 2.39577 4.94903 1.98681 6.11667 1.76906C6.6596 1.66781 7.1818 2.02586 7.28305 2.56878C7.3843 3.11171 7.02625 3.63391 6.48333 3.73516C5.57248 3.90503 5.01769 4.18166 4.59931 4.60118C4.18068 5.02095 3.9043 5.57811 3.73466 6.49272Z',
  d10: 'M10.1085 3.50493C9.55624 3.50963 9.10473 3.06573 9.10004 2.51347C9.09534 1.9612 9.53924 1.5097 10.0915 1.505C10.6802 1.5 11.3154 1.5 11.9972 1.5H12.0028C12.6846 1.5 13.3199 1.5 13.9086 1.505C14.4608 1.5097 14.9047 1.96121 14.9 2.51347C14.8953 3.06574 14.4438 3.50963 13.8916 3.50493C13.6064 3.50251 13.3096 3.50127 13 3.50065V4.46875C13 5.02103 12.5523 5.46875 12 5.46875C11.4477 5.46875 11 5.02103 11 4.46875V3.50065C10.6905 3.50127 10.3937 3.50251 10.1085 3.50493Z',
  d11: 'M17.5167 3.73516C16.9737 3.63391 16.6157 3.11171 16.7169 2.56878C16.8182 2.02586 17.3404 1.66781 17.8833 1.76906C19.051 1.98681 20.0259 2.39577 20.8168 3.18889C21.6075 3.98176 22.0149 4.95845 22.2318 6.12799C22.3325 6.67101 21.974 7.19286 21.4309 7.29358C20.8879 7.3943 20.3661 7.03574 20.2653 6.49272C20.0957 5.57811 19.8193 5.02094 19.4007 4.60118C18.9823 4.18166 18.4275 3.90503 17.5167 3.73516Z',
  d12: 'M20.4951 9.99755C20.4904 9.44529 20.9343 8.9938 21.4866 8.98914C22.0389 8.98447 22.4903 9.42838 22.495 9.98065C22.5 10.5709 22.5 11.3393 22.5 12.0228V12.0298C22.5 12.7131 22.5 13.4185 22.495 14.0085C22.4903 14.5607 22.0389 15.0046 21.4866 15C20.9343 14.9953 20.4904 14.5438 20.4951 13.9915C20.4977 13.687 20.4989 13.3504 20.4995 13H20C19.4477 13 19 12.5523 19 12C19 11.4477 19.4477 11 20 11H20.4994C20.4988 10.6413 20.4976 10.2958 20.4951 9.99755Z',
  d13: 'M9 11C8.44772 11 8 11.4477 8 12C8 12.5523 8.44772 13 9 13H11V15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15V13H15C15.5523 13 16 12.5523 16 12C16 11.4477 15.5523 11 15 11H13V9C13 8.44771 12.5523 8 12 8C11.4477 8 11 8.44771 11 9V11H9Z',
  d14: 'M3 17.0002L3 21.0002H21V17.0002M21 7.00024V3.00024L17 3.00024M3 7.00025L3 3.00024L7 3.00024M3 15.0002L3 9.00025M21 9.00024V15.0002M9 3.00024L15 3.00024',
  d15: 'M3 11.9995H7M17 11.9995H21M12 15.0003L12 11.9995M12 11.9995L12 9.00029M12 11.9995H9M12 11.9995L15 11.9995M12 6.99951L12 2.99951',
  d16: 'M20 4.00024H17V2.00024L21 2.00024C21.2652 2.00024 21.5196 2.1056 21.7071 2.29314C21.8946 2.48067 22 2.73503 22 3.00024V7.00024H20V4.00024ZM15 4.00024L9 4.00024V2.00024L15 2.00024V4.00024ZM4 4.00024L7 4.00024V2.00024L3 2.00024C2.73478 2.00024 2.48043 2.1056 2.29289 2.29314C2.10536 2.48067 2 2.73503 2 3.00024L2 7.00025H4V4.00024ZM20 15.0002V9.00024H22V15.0002H20ZM4 9.00025L4 15.0002H2L2 9.00025H4ZM20 20.0002V17.0002H22V21.0002C22 21.5525 21.5523 22.0002 21 22.0002H3C2.44772 22.0002 2 21.5525 2 21.0002L2 17.0002H4L4 20.0002H20Z',
  d17: 'M13 2.99952L13 6.99951L11 6.99951L11 2.99951L13 2.99952ZM11 12.9995L11 15.0003L13 15.0003L13 12.9995L15 12.9995V10.9995L13 10.9995L13 9.00029L11 9.0003L11 10.9995H9V12.9995H11ZM21 12.9995H17V10.9995H21V12.9995ZM7 12.9995H3V10.9995H7V12.9995Z',
};

export const IconBorderBottom01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="border-bottom-01-stroke-rounded IconBorderBottom01StrokeRounded"
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

export const IconBorderBottom01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="border-bottom-01-duotone-rounded IconBorderBottom01DuotoneRounded"
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

export const IconBorderBottom01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="border-bottom-01-twotone-rounded IconBorderBottom01TwotoneRounded"
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

export const IconBorderBottom01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="border-bottom-01-solid-rounded IconBorderBottom01SolidRounded"
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

export const IconBorderBottom01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="border-bottom-01-bulk-rounded IconBorderBottom01BulkRounded"
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

export const IconBorderBottom01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="border-bottom-01-stroke-sharp IconBorderBottom01StrokeSharp"
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

export const IconBorderBottom01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="border-bottom-01-solid-sharp IconBorderBottom01SolidSharp"
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

export const iconPackOfBorderBottom01: TheIconSelfPack = {
  name: 'BorderBottom01',
  StrokeRounded: IconBorderBottom01StrokeRounded,
  DuotoneRounded: IconBorderBottom01DuotoneRounded,
  TwotoneRounded: IconBorderBottom01TwotoneRounded,
  SolidRounded: IconBorderBottom01SolidRounded,
  BulkRounded: IconBorderBottom01BulkRounded,
  StrokeSharp: IconBorderBottom01StrokeSharp,
  SolidSharp: IconBorderBottom01SolidSharp,
};