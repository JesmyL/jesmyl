import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M8.76938 2.5C8.4973 2.59728 8.23058 2.70543 7.96979 2.8239M5.42501 4.46566C5.19851 4.66428 4.98106 4.87255 4.77334 5.08979M3.03178 7.56476C2.84599 7.93804 2.68313 8.32421 2.54498 8.72152M2.01608 11.3914C1.99387 11.7808 1.99471 12.1778 2.01835 12.5673M2.56845 15.2658C2.70147 15.6396 2.85641 16.0035 3.03178 16.3558M4.69086 18.7435C4.93508 19.005 5.19323 19.2539 5.46415 19.4891M7.77635 21.0064C8.17073 21.1954 8.57927 21.3606 9 21.5',
  d2: 'M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2',
  d3: 'M12 13.5C12.8284 13.5 13.5 12.8284 13.5 12C13.5 11.1716 12.8284 10.5 12 10.5M12 13.5C11.1716 13.5 10.5 12.8284 10.5 12C10.5 11.1716 11.1716 10.5 12 10.5M12 13.5V16M12 10.5V6',
  d4: 'M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 13.5C12.8284 13.5 13.5 12.8284 13.5 12C13.5 11.1716 12.8284 10.5 12 10.5C11.1716 10.5 10.5 11.1716 10.5 12C10.5 12.8284 11.1716 13.5 12 13.5Z',
  d5: 'M12.0007 1.25C11.461 1.25 11.0234 1.68754 11.0234 2.22727C11.0234 2.76701 11.461 3.20455 12.0007 3.20455C16.8583 3.20455 20.7962 7.1424 20.7962 12C20.7962 16.8576 16.8583 20.7955 12.0007 20.7955C11.461 20.7955 11.0234 21.233 11.0234 21.7727C11.0234 22.3125 11.461 22.75 12.0007 22.75C17.9378 22.75 22.7507 17.9371 22.7507 12C22.7507 6.06294 17.9378 1.25 12.0007 1.25ZM9.17183 3.63613C9.68005 3.45441 9.94474 2.89511 9.76302 2.38688C9.58131 1.87866 9.022 1.61397 8.51378 1.79569C8.22232 1.8999 7.9366 2.01575 7.65719 2.14268C7.16578 2.36591 6.94838 2.94523 7.17161 3.43664C7.39484 3.92805 7.97417 4.14544 8.46558 3.92221C8.69591 3.81758 8.93149 3.72206 9.17183 3.63613ZM6.21878 5.37167C6.62458 5.01581 6.66507 4.39836 6.30922 3.99256C5.95336 3.58675 5.33591 3.54626 4.93011 3.90212C4.68726 4.11507 4.45406 4.33841 4.23124 4.57146C3.85824 4.96156 3.8721 5.58018 4.26221 5.95318C4.65231 6.32618 5.27093 6.31232 5.64393 5.92221C5.8271 5.73065 6.01891 5.54693 6.21878 5.37167ZM4.1105 8.10101C4.35099 7.61781 4.15424 7.03115 3.67105 6.79066C3.18786 6.55017 2.6012 6.74692 2.3607 7.23011C2.16085 7.63166 1.98555 8.04728 1.83681 8.47507C1.65955 8.98486 1.92912 9.54183 2.43891 9.71909C2.94871 9.89635 3.50568 9.62678 3.68294 9.11698C3.8042 8.76822 3.94723 8.42906 4.1105 8.10101ZM3.21867 11.4609C3.24941 10.922 2.8375 10.4603 2.29864 10.4295C1.75978 10.3988 1.29804 10.8107 1.2673 11.3496C1.2434 11.7686 1.24432 12.1949 1.26972 12.6136C1.30241 13.1524 1.76564 13.5626 2.30438 13.5299C2.84313 13.4972 3.25337 13.034 3.22068 12.4952C3.19989 12.1525 3.19916 11.8029 3.21867 11.4609ZM3.70354 14.864C3.52262 14.3555 2.96372 14.0899 2.45522 14.2708C1.94671 14.4518 1.68115 15.0106 1.86208 15.5191C2.00529 15.9217 2.17205 16.3132 2.3607 16.6923C2.6012 17.1755 3.18786 17.3722 3.67105 17.1317C4.15424 16.8912 4.35099 16.3046 4.1105 15.8214C3.95638 15.5117 3.8203 15.1922 3.70354 14.864ZM5.5712 17.9232C5.20281 17.5287 4.58439 17.5076 4.18994 17.876C3.79548 18.2444 3.77435 18.8628 4.14275 19.2573C4.40476 19.5378 4.68161 19.8047 4.97207 20.0569C5.37967 20.4107 5.9969 20.3671 6.35071 19.9595C6.70451 19.5519 6.66091 18.9346 6.25331 18.5808C6.01424 18.3733 5.78654 18.1538 5.5712 17.9232ZM8.29474 19.9204C7.80803 19.6871 7.22435 19.8926 6.99107 20.3793C6.75779 20.866 6.96324 21.4497 7.44995 21.683C7.87248 21.8855 8.31014 22.0624 8.76081 22.2118C9.27315 22.3815 9.8261 22.1038 9.99586 21.5915C10.1656 21.0791 9.8879 20.5262 9.37555 20.3564C9.00388 20.2333 8.64303 20.0874 8.29474 19.9204Z',
  d6: 'M12 5C12.5523 5 13 5.44772 13 6V9.70802C13.883 10.0938 14.5 10.9748 14.5 12C14.5 13.0252 13.883 13.9062 13 14.292V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V14.292C10.117 13.9062 9.5 13.0252 9.5 12C9.5 10.9748 10.117 10.0938 11 9.70802V6C11 5.44772 11.4477 5 12 5Z',
  d7: 'M12 3.20455C16.8576 3.20455 20.7955 7.1424 20.7955 12C20.7955 16.8576 16.8576 20.7955 12 20.7955V22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25V3.20455ZM9.17183 3.63611L10.092 3.30708L9.434 1.46664L8.51378 1.79567C8.22232 1.89988 7.9366 2.01573 7.65719 2.14266L6.76742 2.54685L7.57581 4.32639L8.46558 3.92219C8.69591 3.81756 8.93149 3.72204 9.17183 3.63611ZM6.21878 5.37165L6.95355 4.72731L5.66488 3.25776L4.93011 3.9021C4.68727 4.11505 4.45406 4.33839 4.23124 4.57144L3.55586 5.27778L4.96856 6.62854L5.64393 5.92219C5.8271 5.73063 6.01891 5.54691 6.21878 5.37165ZM4.1105 8.10099L4.54595 7.22609L2.79615 6.35519L2.3607 7.23009C2.16085 7.63164 1.98555 8.04725 1.83681 8.47505L1.51585 9.39811L3.36198 10.04L3.68294 9.11696C3.8042 8.7682 3.94723 8.42904 4.1105 8.10099ZM3.21867 11.4609L3.27433 10.4852L1.32295 10.3739L1.2673 11.3496C1.2434 11.7685 1.24432 12.1949 1.26972 12.6136L1.3289 13.5891L3.27986 13.4707L3.22068 12.4952C3.19989 12.1525 3.19916 11.8029 3.21867 11.4609ZM3.70354 14.8639L3.37595 13.9432L1.53449 14.5984L1.86208 15.5191C2.00529 15.9216 2.17205 16.3132 2.3607 16.6922L2.79615 17.5671L4.54595 16.6962L4.1105 15.8214C3.95638 15.5117 3.8203 15.1921 3.70354 14.8639ZM5.5712 17.9232L4.90416 17.209L3.47571 18.543L4.14275 19.2573C4.40476 19.5378 4.68161 19.8047 4.97207 20.0569L5.71009 20.6975L6.99133 19.2214L6.25331 18.5808C6.01424 18.3733 5.78654 18.1537 5.5712 17.9232ZM8.29474 19.9204L7.41347 19.498L6.56868 21.2606L7.44995 21.683C7.87248 21.8855 8.31014 22.0624 8.76081 22.2117L9.68849 22.5191L10.3032 20.6638L9.37555 20.3564C9.00388 20.2332 8.64303 20.0873 8.29474 19.9204Z',
  d8: 'M13 9.98388V6H11V9.98388C10.2591 10.3521 9.75 11.1166 9.75 12C9.75 12.8834 10.2591 13.6479 11 14.0161V16H13V14.0161C13.7409 13.6479 14.25 12.8834 14.25 12C14.25 11.1166 13.7409 10.3521 13 9.98388Z',
};

export const IconTimeHalfPassStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="time-half-pass-stroke-rounded IconTimeHalfPassStrokeRounded"
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

export const IconTimeHalfPassDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="time-half-pass-duotone-rounded IconTimeHalfPassDuotoneRounded"
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

export const IconTimeHalfPassTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="time-half-pass-twotone-rounded IconTimeHalfPassTwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTimeHalfPassSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="time-half-pass-solid-rounded IconTimeHalfPassSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconTimeHalfPassBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="time-half-pass-bulk-rounded IconTimeHalfPassBulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconTimeHalfPassStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="time-half-pass-stroke-sharp IconTimeHalfPassStrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconTimeHalfPassSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="time-half-pass-solid-sharp IconTimeHalfPassSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfTimeHalfPass: TheIconSelfPack = {
  name: 'TimeHalfPass',
  StrokeRounded: IconTimeHalfPassStrokeRounded,
  DuotoneRounded: IconTimeHalfPassDuotoneRounded,
  TwotoneRounded: IconTimeHalfPassTwotoneRounded,
  SolidRounded: IconTimeHalfPassSolidRounded,
  BulkRounded: IconTimeHalfPassBulkRounded,
  StrokeSharp: IconTimeHalfPassStrokeSharp,
  SolidSharp: IconTimeHalfPassSolidSharp,
};