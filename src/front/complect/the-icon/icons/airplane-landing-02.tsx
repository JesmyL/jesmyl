import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2.49805 20.001H18.498',
  d2: 'M20.0477 11.0414C21.221 10.6014 21.3977 10.0014 21.4727 9.6014C21.5977 9.1014 21.2977 7.8264 21.0227 6.8514C20.9679 6.63962 20.5309 4.98381 20.4677 4.8014C20.2227 3.9264 19.6227 3.9664 19.1977 4.0264C19.0227 4.0639 17.7977 4.3964 17.5977 4.4964C16.9227 4.9014 16.9977 5.9764 16.7977 6.6764C16.5727 7.7014 16.0477 7.8514 15.4477 7.9514C13.3477 8.1014 8.69766 8.4764 8.69766 8.4764C4.72266 8.8264 2.79766 12.0014 2.51266 14.3264C2.37266 15.3014 3.27266 15.6514 3.74766 15.5264L8.97266 14.1014C9.37266 13.9514 9.69766 14.0764 9.92266 14.2264L12.2477 15.7514C12.7727 16.0264 13.2477 16.0514 13.6727 15.9514L15.8477 15.3564C16.2977 15.3064 16.3872 15.0922 16.4477 14.9264C16.5365 14.6829 16.3458 14.4596 16.1227 14.2514C15.9977 14.0764 15.5977 13.6484 15.4477 13.4834C15.2477 13.2264 14.7588 12.8014 14.7977 12.6264C14.4977 12.5014 15.5673 12.3129 17.3477 11.8264C18.3594 11.5499 19.5263 11.2369 20.0477 11.0414Z',
  d3: 'M2.75293 20H18.7529',
  d4: 'M21.2311 6.67335L20.9363 5.55887C20.73 4.77905 20.6269 4.38915 20.3436 4.18142C19.8486 3.81845 19.1599 4.10831 18.6363 4.25044C18.1323 4.38723 17.8804 4.45563 17.6977 4.61957C17.2624 5.01028 17.2408 5.82445 17.1242 6.37476C16.8574 7.63381 16.5342 7.89545 15.2691 7.99329C13.1301 8.15869 10.9895 8.3096 8.85172 8.48972C5.70423 8.7549 3.11015 11.2666 2.75835 14.4502C2.68457 15.1689 3.3771 15.688 4.04096 15.5092L9.34035 14.0707C9.613 13.9967 9.90384 14.0435 10.1404 14.1995L12.4726 15.7371C12.9379 16.0018 13.4923 16.071 14.0138 15.9294L16.3368 15.2989C16.7023 15.1996 16.8394 14.7547 16.5904 14.4757L15.1039 12.81C15.0042 12.6982 15.0563 12.5191 15.2 12.4801L18.3271 11.6313C20.1811 11.128 21.1081 10.8764 21.5334 10.1503C21.9587 9.42425 21.7161 8.50728 21.2311 6.67335Z',
  d5: 'M20.2987 11.0397C21.472 10.5999 21.6487 10.0001 21.7237 9.60024C21.8487 9.10043 21.5487 7.82592 21.2737 6.85129C21.2189 6.63959 20.7819 4.98441 20.7187 4.80207C20.4737 3.9274 19.8737 3.96739 19.4487 4.02737C19.2737 4.06485 18.0487 4.39722 17.8487 4.49719C17.1737 4.90203 17.2487 5.97662 17.0487 6.67635C16.8237 7.70096 16.2987 7.85091 15.6987 7.95087C13.5987 8.10081 8.94864 8.47567 8.94864 8.47567C4.97364 8.82554 3.04864 11.9993 2.76364 14.3234C2.62364 15.2981 3.52364 15.6479 3.99864 15.523L9.22364 14.0985C9.62364 13.9486 9.94864 14.0735 10.1736 14.2235L12.4987 15.7479C13.0237 16.0228 13.4987 16.0478 13.9237 15.9478L16.0987 15.353C16.5487 15.3031 16.6382 15.0889 16.6987 14.9232C16.7875 14.6798 16.5968 14.4566 16.3737 14.2485C16.2487 14.0735 15.8487 13.6457 15.6987 13.4808C15.4987 13.2239 15.0098 12.799 15.0487 12.6241C14.7487 12.4991 15.8183 12.3107 17.5987 11.8244C18.6104 11.548 19.7773 11.2351 20.2987 11.0397Z',
  d6: 'M2 20H18',
  d7: 'M19.5497 11.0414C20.723 10.6014 20.8997 10.0014 20.9747 9.6014C21.0997 9.1014 20.7997 7.8264 20.5247 6.8514C20.4699 6.63962 20.0329 4.98381 19.9697 4.8014C19.7247 3.9264 19.1247 3.9664 18.6997 4.0264C18.5247 4.0639 17.2997 4.3964 17.0997 4.4964C16.4247 4.9014 16.4997 5.9764 16.2997 6.6764C16.0747 7.7014 15.5497 7.8514 14.9497 7.9514C12.8497 8.1014 8.19962 8.4764 8.19962 8.4764C4.22462 8.8264 2.29962 12.0014 2.01462 14.3264C1.87462 15.3014 2.77462 15.6514 3.24962 15.5264L8.47462 14.1014C8.87462 13.9514 9.19962 14.0764 9.42462 14.2264L11.7497 15.7514C12.2747 16.0264 12.7497 16.0514 13.1747 15.9514L15.3497 15.3564C15.7997 15.3064 15.8892 15.0922 15.9497 14.9264C16.0385 14.6829 15.8478 14.4596 15.6247 14.2514C15.4997 14.0764 15.0997 13.6484 14.9497 13.4834C14.7497 13.2264 14.2608 12.8014 14.2997 12.6264C13.9997 12.5014 15.0693 12.3129 16.8497 11.8264C17.8614 11.5499 19.0283 11.2369 19.5497 11.0414Z',
  d8: 'M19 20C19 19.4477 18.5523 19 18 19L2 19C1.44772 19 1 19.4477 1 20C1 20.5523 1.44772 21 2 21L18 21C18.5523 21 19 20.5523 19 20Z',
  d9: 'M19.174 3.52608C19.532 3.47245 19.9859 3.47825 20.3868 3.77237C20.6355 3.9548 20.7774 4.20209 20.8816 4.46679C21.1469 5.14102 21.2865 5.87713 21.4713 6.57628C21.7059 7.46327 21.895 8.17843 21.9673 8.76166C22.0424 9.36786 22.0022 9.90428 21.7123 10.3993C21.4231 10.8934 20.9741 11.1943 20.4068 11.4322C19.8595 11.6617 19.1378 11.8576 18.2405 12.1013L15.7007 12.791C15.6289 12.8105 15.6028 12.8986 15.6522 12.9541L16.711 14.1409C17.2158 14.7068 16.927 15.5864 16.2153 15.7797L13.8923 16.4105C13.2446 16.5864 12.5541 16.501 11.9728 16.1702C11.9633 16.1647 11.9539 16.159 11.9448 16.153L9.61255 14.6148C9.49536 14.5375 9.35244 14.5148 9.2188 14.5511L3.91849 15.9904C2.95122 16.2511 1.89518 15.5002 2.00837 14.3971L2.00879 14.3933C2.38677 10.9715 5.17102 8.27263 8.55715 7.98723C9.98713 7.8667 11.4202 7.75909 12.8506 7.65168C13.5607 7.59837 14.27 7.5451 14.978 7.49033C15.611 7.44136 15.8548 7.35462 15.9917 7.23645C16.4678 6.82537 16.4195 5.89078 16.5518 5.31913C16.6952 4.69977 17.0095 4.17472 17.6214 3.94973C18.1104 3.76998 18.6606 3.60301 19.174 3.52608Z',
  d10: 'M18.0506 20.0928H2.24121',
  d11: 'M20.8039 4.09473L17.7509 4.19253C17.7459 4.1927 17.7418 4.19664 17.7414 4.20172L17.4498 7.63094L8.45911 8.74539C5.20281 9.44476 3.75894 12.226 3.39345 14.3315C3.26864 15.3392 3.35732 15.5243 3.50233 15.7446C3.72927 16.0894 4.10529 16.3936 4.94275 16.1297L11.2267 14.3455L13.4891 16.0952C13.4914 16.097 13.4944 16.0977 13.4973 16.097L18.3006 14.9343C18.3085 14.9324 18.3109 14.922 18.3046 14.9168L15.6901 12.7231L22.239 10.3818C22.2437 10.3801 22.2464 10.3751 22.2453 10.3701L20.8138 4.10251C20.8127 4.09784 20.8086 4.09458 20.8039 4.09473Z',
  d12: 'M1.75 18.75L17.75 18.75V20.75L1.75 20.75V18.75Z',
  d13: 'M20.1534 3.25028C20.5132 3.24045 20.8292 3.48757 20.9064 3.8391L22.2327 9.87731C22.3136 10.2457 22.1084 10.6169 21.7533 10.7442L16.4299 12.6532L17.9729 13.9198C18.1916 14.0994 18.2907 14.3867 18.2291 14.6628C18.1675 14.939 17.9557 15.1569 17.6815 15.2265L12.8749 16.4459C12.659 16.5007 12.4299 16.4566 12.2496 16.3257L10.2617 14.8811L4.07199 16.6698C2.95652 17.0146 1.6792 16.1914 1.75306 14.885L1.75339 14.8792C1.98584 11.2657 4.77816 8.30466 8.32308 7.85213C9.84797 7.63842 14.9283 6.92481 16.0882 6.77671L16.3835 4.00383C16.4232 3.63029 16.7332 3.34378 17.1088 3.33352L20.1534 3.25028Z',
};

export const IconAirplaneLanding02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="airplane-landing-02-stroke-rounded IconAirplaneLanding02StrokeRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconAirplaneLanding02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="airplane-landing-02-duotone-rounded IconAirplaneLanding02DuotoneRounded"
    >
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconAirplaneLanding02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="airplane-landing-02-twotone-rounded IconAirplaneLanding02TwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
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

export const IconAirplaneLanding02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="airplane-landing-02-solid-rounded IconAirplaneLanding02SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const IconAirplaneLanding02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="airplane-landing-02-bulk-rounded IconAirplaneLanding02BulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconAirplaneLanding02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="airplane-landing-02-stroke-sharp IconAirplaneLanding02StrokeSharp"
    >
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconAirplaneLanding02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="airplane-landing-02-solid-sharp IconAirplaneLanding02SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfAirplaneLanding02: TheIconSelfPack = {
  name: 'AirplaneLanding02',
  StrokeRounded: IconAirplaneLanding02StrokeRounded,
  DuotoneRounded: IconAirplaneLanding02DuotoneRounded,
  TwotoneRounded: IconAirplaneLanding02TwotoneRounded,
  SolidRounded: IconAirplaneLanding02SolidRounded,
  BulkRounded: IconAirplaneLanding02BulkRounded,
  StrokeSharp: IconAirplaneLanding02StrokeSharp,
  SolidSharp: IconAirplaneLanding02SolidSharp,
};