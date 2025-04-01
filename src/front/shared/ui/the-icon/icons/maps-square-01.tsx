import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M15.1287 13.7468C14.9601 13.9092 14.7347 14 14.5001 14C14.2655 14 14.0401 13.9092 13.8715 13.7468C12.3272 12.2504 10.2576 10.5788 11.2669 8.15187C11.8126 6.83966 13.1225 6 14.5001 6C15.8777 6 17.1876 6.83966 17.7333 8.15187C18.7413 10.5757 16.6768 12.2555 15.1287 13.7468Z',
  d2: 'M14.5 9.5H14.509',
  d3: 'M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z',
  d4: 'M17 21L3 7',
  d5: 'M10 14L4 20',
  d6: 'M20.1088 20.1088C19.4276 20.79 18.543 21.1376 17.2919 21.3151L2.68848 6.68359C2.93467 5.88322 3.51991 4.20424 3.89128 3.89124C5.28252 2.5 7.52169 2.5 12 2.5C16.4784 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088ZM14.5001 14C14.7347 14 14.9601 13.9092 15.1287 13.7468C15.2465 13.6334 15.3672 13.5188 15.4893 13.403C16.9731 11.9957 18.6646 10.3913 17.7333 8.15187C17.1876 6.83966 15.8777 6 14.5001 6C13.1225 6 11.8126 6.83966 11.2669 8.15187C10.3393 10.3823 12.0122 11.9747 13.4879 13.3795C13.6179 13.5033 13.7464 13.6256 13.8715 13.7468C14.0401 13.9092 14.2655 14 14.5001 14Z',
  d7: 'M3 7L17 21M10 14L4 20',
  d8: 'M14.5005 5.25C12.8272 5.25 11.2395 6.26527 10.5747 7.86388C9.95242 9.36031 10.3 10.645 10.9812 11.704C11.5245 12.5486 12.3178 13.3025 12.9889 13.9402L12.9889 13.9402C13.1143 14.0594 13.2355 14.1745 13.3499 14.2854L13.3516 14.287C13.6603 14.5843 14.0723 14.75 14.5005 14.75C14.9287 14.75 15.3407 14.5843 15.6494 14.2869C15.7582 14.1822 15.8728 14.0737 15.9912 13.9615C16.6689 13.3199 17.4723 12.5593 18.0211 11.7042C18.7014 10.6442 19.0477 9.3585 18.4262 7.86388C17.7614 6.26527 16.1737 5.25 14.5005 5.25ZM14.4933 8C13.6686 8 13 8.67157 13 9.5C13 10.3284 13.6686 11 14.4933 11H14.5067C15.3314 11 16 10.3284 16 9.5C16 8.67157 15.3314 8 14.5067 8H14.4933Z',
  d9: 'M12.0727 1.75C14.1969 1.74998 15.8903 1.74996 17.218 1.92847C18.589 2.11279 19.7153 2.50337 20.606 3.39404C21.4966 4.28471 21.8872 5.41104 22.0715 6.78198C22.25 8.10974 22.25 9.80317 22.25 11.9273V12.0727C22.25 14.1968 22.25 15.8903 22.0715 17.218C21.8872 18.589 21.4966 19.7153 20.606 20.606C19.7153 21.4966 18.589 21.8872 17.218 22.0715C15.8903 22.25 14.1968 22.25 12.0727 22.25H11.9273C9.80317 22.25 8.10974 22.25 6.78198 22.0715C6.07286 21.9762 5.42919 21.8257 4.84972 21.5793C4.54956 21.4517 4.39948 21.3879 4.3691 21.2313C4.33872 21.0748 4.46388 20.9496 4.71421 20.6993L10.2828 15.1303C10.4828 14.9303 10.5828 14.8303 10.707 14.8303C10.8313 14.8303 10.9313 14.9303 11.1313 15.1303L16.1166 20.1156C16.1785 20.1775 16.2644 20.2094 16.3517 20.202C16.5646 20.1838 16.7665 20.1621 16.9583 20.1363C18.1128 19.9811 18.7584 19.6926 19.2259 19.2252C19.6933 18.7577 19.9818 18.1121 20.137 16.9576C20.296 15.7751 20.2981 14.2132 20.2981 11.9998C20.2981 9.78631 20.296 8.22442 20.137 7.0419C19.9818 5.88745 19.6933 5.2418 19.2259 4.77435C18.7584 4.3069 18.1128 4.01842 16.9583 3.86321C15.7758 3.70422 14.2139 3.70215 12.0005 3.70215C9.78702 3.70215 8.22513 3.70422 7.04261 3.86321C5.88816 4.01842 5.24251 4.3069 4.77506 4.77435C4.3076 5.2418 4.01913 5.88745 3.86392 7.0419C3.83812 7.23376 3.81646 7.4356 3.79826 7.64859C3.79081 7.73585 3.82275 7.82177 3.88467 7.88369L8.86856 12.8676C9.06855 13.0676 9.16855 13.1676 9.16855 13.2918C9.16855 13.4161 9.06856 13.5161 8.86857 13.7161L3.30031 19.2848C3.04992 19.5352 2.92472 19.6604 2.76817 19.63C2.61161 19.5996 2.54782 19.4494 2.42023 19.1492C2.17414 18.57 2.02375 17.9267 1.92847 17.218C1.74996 15.8903 1.74998 14.1968 1.75 12.0727V12.0727V11.9273V11.9273C1.74998 9.80314 1.74996 8.10973 1.92847 6.78198C2.11279 5.41104 2.50337 4.28471 3.39404 3.39404C4.28471 2.50337 5.41104 2.11279 6.78198 1.92847C8.10973 1.74996 9.80315 1.74998 11.9273 1.75H11.9273H12.0727H12.0727Z',
  d10: 'M18 9.6C18 12.4 14.5 14 14.5 14C14.5 14 11 12.4 11 9.6C11 7.61177 12.567 6 14.5 6C16.433 6 18 7.61177 18 9.6Z',
  d11: 'M3 21H21V3H3V21Z',
  d12: 'M10 14L3 21',
  d13: 'M3 2C2.44772 2 2 2.44772 2 3V20.5857L9.82254 12.7629L4 6.94032V4H20V20H17.0597L11.2368 14.1771L3.41409 22H21C21.5523 22 22 21.5523 22 21V3C22 2.44772 21.5523 2 21 2H3Z',
  d14: 'M13.5718 14.2811C13.7499 14.3855 13.8995 14.4653 14.0066 14.5199L14.5 14.75L14.9934 14.5199C15.1005 14.4653 15.2501 14.3855 15.4282 14.2811C15.7828 14.0734 16.2587 13.7635 16.7381 13.3557C17.6747 12.5592 18.75 11.2795 18.75 9.56608C18.75 7.20228 16.867 5.25 14.5 5.25C12.133 5.25 10.25 7.20228 10.25 9.56608C10.25 11.2795 11.3253 12.5592 12.2619 13.3557C12.7413 13.7635 13.2172 14.0734 13.5718 14.2811ZM14.4933 8C13.6686 8 13 8.67157 13 9.5C13 10.3284 13.6686 11 14.4933 11H14.5067C15.3314 11 16 10.3284 16 9.5C16 8.67157 15.3314 8 14.5067 8H14.4933Z',
};

export const IconMapsSquare01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="maps-square-01-stroke-rounded IconMapsSquare01StrokeRounded"
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
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMapsSquare01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="maps-square-01-duotone-rounded IconMapsSquare01DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
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
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMapsSquare01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="maps-square-01-twotone-rounded IconMapsSquare01TwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconMapsSquare01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="maps-square-01-solid-rounded IconMapsSquare01SolidRounded"
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

export const IconMapsSquare01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="maps-square-01-bulk-rounded IconMapsSquare01BulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMapsSquare01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="maps-square-01-stroke-sharp IconMapsSquare01StrokeSharp"
    >
      <path 
        d={d.d10} 
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
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMapsSquare01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="maps-square-01-solid-sharp IconMapsSquare01SolidSharp"
    >
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfMapsSquare01: TheIconSelfPack = {
  name: 'MapsSquare01',
  StrokeRounded: IconMapsSquare01StrokeRounded,
  DuotoneRounded: IconMapsSquare01DuotoneRounded,
  TwotoneRounded: IconMapsSquare01TwotoneRounded,
  SolidRounded: IconMapsSquare01SolidRounded,
  BulkRounded: IconMapsSquare01BulkRounded,
  StrokeSharp: IconMapsSquare01StrokeSharp,
  SolidSharp: IconMapsSquare01SolidSharp,
};