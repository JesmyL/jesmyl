import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3 10.5V15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H12.5M21 10.5V12.5',
  d2: 'M7 17H11',
  d3: 'M15 18.5H22M18.5 22V15',
  d4: 'M17.7947 2.00254L6.14885 2.03002C4.41069 1.94542 3.96502 3.2116 3.96502 3.83056C3.96502 4.38414 3.88957 5.19117 2.82426 6.70798C1.75895 8.22478 1.839 8.67537 2.43973 9.72544C2.9383 10.5969 4.20643 10.9374 4.86764 10.9946C6.96785 11.0398 7.98968 9.32381 7.98968 8.1178C9.03154 11.1481 11.9946 11.1481 13.3148 10.8016C14.6376 10.4545 15.7707 9.2118 16.0381 8.1178C16.194 9.47735 16.6672 10.2707 18.0653 10.8158C19.5135 11.3805 20.7589 10.5174 21.3838 9.9642C22.0087 9.41096 22.4097 8.18278 21.2958 6.83288C20.5276 5.90195 20.2074 5.02494 20.1023 4.11599C20.0413 3.58931 19.9878 3.02336 19.5961 2.66323C19.0238 2.13691 18.2026 1.97722 17.7947 2.00254Z',
  d5: 'M7.44053 10C6.88623 10.6119 6.0609 11 5.13918 11C4.39659 11 3.71656 10.7481 3.19043 10.3302V15C3.19043 17.8284 3.19043 19.2426 4.06911 20.1213C4.94779 21 6.362 21 9.19043 21H15.1904C18.0188 21 19.433 21 20.3117 20.1213C21.1904 19.2426 21.1904 17.8284 21.1904 15V10.3302C20.6643 10.7481 19.9842 11 19.2417 11C18.3199 11 17.4946 10.6119 16.9403 10H15.0064C14.2655 10.6209 13.2766 11 12.1904 11C11.1042 11 10.1153 10.6209 9.37442 10H7.44053Z',
  d6: 'M17.9861 2.00254L6.34026 2.03002C4.6021 1.94542 4.15643 3.2116 4.15643 3.83056C4.15643 4.38414 4.08098 5.19117 3.01567 6.70798C1.95036 8.22478 2.03041 8.67537 2.63114 9.72544C3.12971 10.5969 4.39784 10.9374 5.05905 10.9946C7.15926 11.0398 8.18109 9.32381 8.18109 8.1178C9.22295 11.1481 12.186 11.1481 13.5062 10.8016C14.829 10.4545 15.9621 9.2118 16.2295 8.1178C16.3854 9.47735 16.8586 10.2707 18.2567 10.8158C19.7049 11.3805 20.9503 10.5174 21.5752 9.9642C22.2001 9.41096 22.6011 8.18278 21.4872 6.83288C20.719 5.90195 20.3988 5.02494 20.2937 4.11599C20.2327 3.58931 20.1792 3.02336 19.7875 2.66323C19.2152 2.13691 18.394 1.97722 17.9861 2.00254Z',
  d7: 'M3.19043 10.5V15C3.19043 17.8284 3.19043 19.2426 4.06911 20.1213C4.94779 21 6.362 21 9.19043 21H12.6904M21.1904 10.5V12.5',
  d8: 'M7.19043 17H11.1904',
  d9: 'M15.1904 18.5H22.1904M18.6904 22V15',
  d10: 'M3.07031 10.4775V14.9855C3.07031 17.8188 3.07031 19.2355 3.9458 20.1158C4.82128 20.996 6.23035 20.996 9.0485 20.996H12.5358M21.0049 10.4775V12.4811',
  d11: 'M7.05566 16.9893H11.0411',
  d12: 'M15.0264 18.492H22.0009M18.5136 21.9982V14.9858',
  d13: 'M17.8142 2.00457L6.21068 2.03278C4.47883 1.94592 4.03479 3.24583 4.03479 3.88127C4.03479 4.4496 4.04738 5.51058 2.89818 6.83533C1.74898 8.16007 1.82874 8.62267 2.42728 9.7007C2.92404 10.5954 4.18756 10.9449 4.84636 11.0037C6.93894 11.05 7.95705 9.28837 7.95705 8.05024C8.99512 11.1613 11.9474 11.1613 13.2628 10.8055C14.5808 10.4491 15.7098 9.17337 15.9762 8.05024C16.1316 9.446 16.603 10.2605 17.996 10.8201C19.439 11.3998 20.6799 10.5138 21.3025 9.94582C21.9251 9.37784 22.4124 8.34941 21.3025 6.96356C20.5371 6.00783 20.2181 5.10746 20.1133 4.1743C20.0526 3.63359 19.9993 3.05258 19.6091 2.68285C19.0388 2.14251 18.2206 1.97857 17.8142 2.00457Z',
  d14: 'M2.875 9.125C3.42729 9.125 3.875 9.57272 3.875 10.125V14.625C3.875 16.0675 3.87713 17.0487 3.97592 17.7836C4.07085 18.4896 4.23822 18.8166 4.46079 19.0392C4.68336 19.2618 5.01038 19.4292 5.71644 19.5241C6.45126 19.6229 7.43252 19.625 8.875 19.625H11.875C12.4273 19.625 12.875 20.0727 12.875 20.625C12.875 21.1773 12.4273 21.625 11.875 21.625H8.80443C7.45031 21.625 6.3337 21.6251 5.44994 21.5062C4.52211 21.3815 3.70269 21.1095 3.04658 20.4534C2.39047 19.7973 2.1185 18.9779 1.99376 18.0501C1.87494 17.1663 1.87497 16.0497 1.875 14.6956L1.875 10.125C1.875 9.57272 2.32272 9.125 2.875 9.125Z',
  d15: 'M19.875 13.375V10.125C19.875 9.57272 20.3227 9.125 20.875 9.125C21.4273 9.125 21.875 9.57272 21.875 10.125V13.375C21.875 13.9273 21.4273 14.375 20.875 14.375C20.3227 14.375 19.875 13.9273 19.875 13.375Z',
  d16: 'M3.06643 3.83434C3.06643 2.33286 4.29103 1.125 5.79012 1.125H17.9599C19.459 1.125 20.6836 2.33286 20.6836 3.83434C20.6836 4.38472 20.8282 4.92589 21.1037 5.40439L22.0899 7.11774C22.3487 7.56695 22.5589 7.93169 22.6097 8.54169C22.6303 8.78956 22.6326 8.99812 22.601 9.19941C22.5708 9.39221 22.5131 9.54669 22.4706 9.66039L22.4644 9.67725C21.9315 11.1079 20.5473 12.125 18.9263 12.125C17.57 12.125 16.3773 11.412 15.7124 10.3394C14.8088 11.4325 13.4196 12.125 11.875 12.125C10.3304 12.125 8.94117 11.4325 8.03759 10.3394C7.37273 11.412 6.18006 12.125 4.82375 12.125C3.20268 12.125 1.81855 11.1079 1.28565 9.67725L1.27936 9.66038C1.2369 9.54669 1.17921 9.39221 1.14897 9.19941C1.1174 8.99812 1.11969 8.78957 1.14033 8.54169C1.19113 7.93168 1.40128 7.56695 1.66009 7.11774L2.64633 5.40439C2.92177 4.92589 3.06643 4.38472 3.06643 3.83434Z',
  d17: 'M5.875 16.875C5.875 16.3227 6.32272 15.875 6.875 15.875H10.875C11.4273 15.875 11.875 16.3227 11.875 16.875C11.875 17.4273 11.4273 17.875 10.875 17.875H6.875C6.32272 17.875 5.875 17.4273 5.875 16.875Z',
  d18: 'M18.375 13.875C18.9273 13.875 19.375 14.3227 19.375 14.875V17.375H21.875C22.4273 17.375 22.875 17.8227 22.875 18.375C22.875 18.9273 22.4273 19.375 21.875 19.375H19.375V21.875C19.375 22.4273 18.9273 22.875 18.375 22.875C17.8227 22.875 17.375 22.4273 17.375 21.875L17.375 19.375H14.875C14.3227 19.375 13.875 18.9273 13.875 18.375C13.875 17.8227 14.3227 17.375 14.875 17.375H17.375L17.375 14.875C17.375 14.3227 17.8227 13.875 18.375 13.875Z',
  d19: 'M1.875 10.7148L1.875 14.6969C1.87497 16.051 1.87494 17.1677 1.99376 18.0514C2.1185 18.9792 2.39047 19.7987 3.04658 20.4548C3.70269 21.1109 4.52211 21.3828 5.44994 21.5076C6.3337 21.6264 7.45031 21.6264 8.80443 21.6263H11.875C12.4273 21.6263 12.875 21.1786 12.875 20.6263C12.875 20.0741 12.4273 19.6263 11.875 19.6263H8.875C7.43252 19.6263 6.45126 19.6242 5.71644 19.5254C5.01038 19.4305 4.68336 19.2631 4.46079 19.0406C4.23822 18.818 4.07085 18.491 3.97592 17.7849C3.87713 17.0501 3.875 16.0688 3.875 14.6263V12.0067C3.07437 11.8004 2.37658 11.3392 1.875 10.7148Z',
  d20: 'M19.875 12.0067V13.3763C19.875 13.9286 20.3227 14.3763 20.875 14.3763C21.4273 14.3763 21.875 13.9286 21.875 13.3763V10.7148C21.3734 11.3392 20.6756 11.8004 19.875 12.0067Z',
  d21: 'M3 10.5L3 21H13M21 10.5V13',
  d22: 'M5 11.5C6.65685 11.5 8 10.1569 8 8.5C8 10.5 10.1362 11.5 12 11.5C13.8638 11.5 16 10.5 16 8.5C16 10.1569 17.3431 11.5 19 11.5C20.6569 11.5 22 10.1569 22 8.5L20 4.5V2H4V4.5L2 8.5C2 10.1569 3.34315 11.5 5 11.5Z',
  d23: 'M6 17H11',
  d24: 'M15 18.5H22M18.5 22L18.5 15',
  d25: 'M2.25 21.2751V10.0376H4.2V20.3001H13V22.2501H3.225C2.68652 22.2501 2.25 21.8136 2.25 21.2751Z',
  d26: 'M19.8 10.0376H21.75V13.5H19.8V10.0376Z',
  d27: 'M22.75 8.30083V8.5C22.75 10.5711 21.0711 12.25 19 12.25C17.7352 12.25 16.6167 11.6238 15.9374 10.6646C15.6962 10.9412 15.4139 11.1792 15.1085 11.3783C14.1989 11.9713 13.0504 12.25 12 12.25C10.9496 12.25 9.80112 11.9713 8.89149 11.3783C8.58614 11.1792 8.30385 10.9412 8.06256 10.6646C7.38334 11.6238 6.26479 12.25 5 12.25C2.92893 12.25 1.25 10.5711 1.25 8.5V8.30083L3.25 4.80083V1.75H20.75V4.80083L22.75 8.30083Z',
  d28: 'M11 18.5H6V16.5H11V18.5Z',
  d29: 'M19.25 19.75V22.25H17.25L17.25 19.75H14.75V17.75H17.25L17.25 15.25H19.25V17.75H21.75V19.75H19.25Z',
};

export const IconStoreAdd02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="store-add-02-stroke-rounded IconStoreAdd02StrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
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
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconStoreAdd02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="store-add-02-duotone-rounded IconStoreAdd02DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
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
        strokeLinecap="round" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconStoreAdd02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="store-add-02-twotone-rounded IconStoreAdd02TwotoneRounded"
    >
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconStoreAdd02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="store-add-02-solid-rounded IconStoreAdd02SolidRounded"
    >
      <path 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconStoreAdd02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="store-add-02-bulk-rounded IconStoreAdd02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d20} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconStoreAdd02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="store-add-02-stroke-sharp IconStoreAdd02StrokeSharp"
    >
      <path 
        d={d.d21} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d22} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d23} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d24} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconStoreAdd02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="store-add-02-solid-sharp IconStoreAdd02SolidSharp"
    >
      <path 
        d={d.d25} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d26} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d27} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d28} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d29} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfStoreAdd02: TheIconSelfPack = {
  name: 'StoreAdd02',
  StrokeRounded: IconStoreAdd02StrokeRounded,
  DuotoneRounded: IconStoreAdd02DuotoneRounded,
  TwotoneRounded: IconStoreAdd02TwotoneRounded,
  SolidRounded: IconStoreAdd02SolidRounded,
  BulkRounded: IconStoreAdd02BulkRounded,
  StrokeSharp: IconStoreAdd02StrokeSharp,
  SolidSharp: IconStoreAdd02SolidSharp,
};