import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M7.01428 16.0029H11.0143M7.01428 11.0053H15.0143',
  d2: 'M10.0143 21.9999H11.0143',
  d3: 'M7.51083 21.9999C6.33921 21.9749 5.53921 21.9 4.76421 21.6751C3.71491 21.4002 2.94905 20.4757 2.72421 19.1763C2.43921 17.9519 2.53921 14.9284 2.51416 11.3302C2.51623 8.53874 2.3892 5.85787 2.8392 4.33362C3.1142 3.83386 3.3392 2.00976 7.06421 2.03475C7.68921 2.00976 14.3142 1.95978 15.3642 2.05973C18.8642 2.1347 19.2142 3.93381 19.4142 5.63298C19.541 6.88236 19.5142 8.88138 19.5142 11.0053M7.01421 2.00976C7.31421 3.63396 7.28921 4.68344 8.38921 4.93332C8.86421 5.00828 9.9495 5.00628 11.1142 5.00828C12.1538 5.01007 13.2142 5.01945 13.6892 4.90833C14.8642 4.63347 14.7392 3.18418 15.0392 2.00976',
  d4: 'M18.2786 14.3787C16.9045 15.778 14.2563 18.2768 14.2563 18.4517C14.0427 18.7483 13.8565 19.3512 13.7316 20.2008C13.5747 20.9884 13.3868 21.6751 13.6067 21.875C13.8266 22.0749 14.6545 21.9064 15.5304 21.7251C16.2299 21.6501 16.8795 21.4002 17.2043 21.1504C17.679 20.7304 20.9018 17.4772 21.2766 17.0524C21.5514 16.6776 21.5764 15.9779 21.3365 15.5531C21.2016 15.2533 20.3522 14.4536 20.0774 14.2288C19.5777 13.9289 18.8782 13.8789 18.2786 14.3787Z',
  d5: 'M2.49997 9.36869C2.49997 5.89518 2.49997 4.15843 3.5251 3.07935C4.30315 2.26035 5.44111 2.06295 7.38718 2.01538C7.18402 2.0712 7.04559 2.27396 7.08217 2.49347C7.28171 3.69071 7.38148 4.28933 7.8011 4.6448C8.22072 5.00027 8.82759 5.00027 10.0414 5.00027H11.9586C13.1724 5.00027 13.7793 5.00027 14.1989 4.6448C14.6185 4.28933 14.7183 3.69071 14.9178 2.49348C14.9544 2.27398 14.816 2.0712 14.6128 2.01538C16.5589 2.06295 17.6968 2.26035 18.4749 3.07935C19.5 4.15843 19.5 5.89518 19.5 9.36869V14.0189C19.1612 13.9653 18.8084 14.027 18.5019 14.204C18.3285 14.3041 18.1619 14.4708 17.8285 14.8041L14.5207 18.1119C13.9972 18.6354 13.8715 19.3701 13.7481 20.0914C13.7157 20.2807 13.6835 20.4691 13.6443 20.6525C13.4968 21.3425 13.423 21.6874 13.6179 21.8823C13.6859 21.9504 13.7722 21.9857 13.8851 21.9965C13.4587 22.0002 12.9981 22.0002 12.5 22.0002H9.49997C6.20015 22.0002 4.55022 22.0002 3.5251 20.9211C2.49997 19.8421 2.49997 18.1053 2.49997 14.6318V9.36869Z',
  d6: 'M19.5 11.0054V9.3728C19.5 5.89712 19.5 4.15927 18.4749 3.07952C17.4497 1.99976 15.7998 1.99976 12.5 1.99976H9.49997C6.20014 1.99976 4.55022 1.99976 3.5251 3.07952C2.49997 4.15927 2.49997 5.89712 2.49997 9.3728V14.6393C2.49997 18.115 2.49997 19.8528 3.5251 20.9326C4.31806 21.7678 5.48486 21.957 7.49997 21.9998',
  d7: 'M6.99997 15.9998H11M6.99997 10.9998H15',
  d8: 'M9.99997 21.9998H11',
  d9: 'M6.99997 1.99976L7.08217 2.49296C7.28171 3.6902 7.38148 4.28882 7.8011 4.64429C8.22072 4.99976 8.82759 4.99976 10.0414 4.99976H11.9586C13.1724 4.99976 13.7793 4.99976 14.1989 4.64429C14.6185 4.28882 14.7183 3.6902 14.9178 2.49296L15 1.99976',
  d10: 'M20.7598 14.8782C19.8544 13.8638 19.3112 13.9242 18.7076 14.1053C18.2851 14.1657 16.8365 15.8565 16.2329 16.3949C15.2419 17.374 14.2464 18.382 14.1807 18.5135C13.9931 18.8185 13.8186 19.3589 13.7341 19.9627C13.5771 20.8685 13.3507 21.8882 13.6375 21.9756C13.9242 22.0629 14.7239 21.8951 15.6293 21.7622C16.2329 21.6535 16.6554 21.5327 16.9572 21.3516C17.3797 21.098 18.1644 20.2043 19.5164 18.8758C20.3644 17.983 21.1823 17.3661 21.4238 16.7623C21.6652 15.8565 21.3031 15.3734 20.7598 14.8782Z',
  d11: 'M19.5 11.0056V9.37304C19.5 5.89736 19.5 4.15951 18.4749 3.07976C17.4497 2 15.7998 2 12.5 2H9.5C6.20017 2 4.55025 2 3.52513 3.07976C2.5 4.15951 2.5 5.89736 2.5 9.37304V14.6395C2.5 18.1152 2.5 19.853 3.52513 20.9328C4.31809 21.768 5.48489 21.9572 7.5 22',
  d12: 'M7 16H11',
  d13: 'M7 11H15',
  d14: 'M10 22H11',
  d15: 'M7 2L7.0822 2.4932C7.28174 3.69044 7.38151 4.28906 7.80113 4.64453C8.22075 5 8.82762 5 10.0414 5H11.9586C13.1724 5 13.7793 5 14.1989 4.64453C14.6185 4.28906 14.7183 3.69044 14.9178 2.4932L15 2',
  d16: 'M18.2749 14.3946C16.9008 15.7939 14.2525 18.2927 14.2525 18.4676C14.039 18.7643 13.8528 19.3672 13.7279 20.2168C13.571 21.0043 13.3831 21.691 13.603 21.8909C13.8229 22.0908 14.6507 21.9223 15.5267 21.741C16.2262 21.6661 16.8758 21.4162 17.2006 21.1663C17.6753 20.7463 20.8981 17.4931 21.2729 17.0683C21.5477 16.6935 21.5727 15.9938 21.3328 15.569C21.1979 15.2692 20.3485 14.4696 20.0737 14.2447C19.574 13.9448 18.8745 13.8949 18.2749 14.3946Z',
  d17: 'M14.2327 1.92129C14.271 1.61164 14.2901 1.45681 14.2012 1.35564C14.1122 1.25448 13.9572 1.25362 13.6471 1.2519C13.302 1.24999 12.9393 1.25 12.5586 1.25H9.44197C9.06223 1.25 8.70044 1.24999 8.35607 1.25189C8.04774 1.25359 7.89358 1.25444 7.80469 1.3549C7.7158 1.45536 7.73385 1.60943 7.76993 1.91759L7.825 2.38786C7.92625 2.99518 7.99291 3.38484 8.07797 3.67052C8.15788 3.93895 8.22928 4.02428 8.28592 4.07226C8.34256 4.12025 8.43847 4.17665 8.71638 4.21134C9.01507 4.24864 9.41526 4.25 10.0414 4.25H11.9586C12.5848 4.25 12.9849 4.24864 13.2836 4.21134C13.5616 4.17665 13.6575 4.12025 13.7141 4.07226C13.7707 4.02428 13.8421 3.93895 13.9221 3.67053C14.0072 3.38447 14.0739 2.99418 14.1754 2.38553L14.2327 1.92129Z',
  d18: 'M6.25718 1.90006C6.22491 1.62456 6.20878 1.4868 6.10944 1.40966C6.01009 1.33252 5.878 1.3503 5.61383 1.38586L5.55446 1.39405C4.51094 1.54173 3.65469 1.85554 2.98138 2.56428C2.31322 3.26761 2.02208 4.15293 1.88419 5.23259C1.74998 6.28337 1.74999 7.62528 1.75 9.31659V14.6869C1.74999 16.3782 1.74998 17.7202 1.88419 18.7709C2.02208 19.8506 2.31322 20.7359 2.98138 21.4392C3.65469 22.148 4.51094 22.4618 5.55446 22.6095C5.82539 22.6478 6.11631 22.6758 6.42809 22.6963C6.80213 22.7208 6.98916 22.7331 7.08459 22.6414C7.18002 22.5498 7.17395 22.3113 7.16181 21.8344C7.16126 21.8128 7.16098 21.7912 7.16098 21.7695C7.16098 20.3888 8.28027 19.2695 9.66098 19.2695H10.661C10.7432 19.2695 10.8245 19.2735 10.9047 19.2813C11.2479 19.3145 11.4196 19.3311 11.5047 19.2795C11.5193 19.2707 11.5249 19.2668 11.5381 19.2561C11.6155 19.1935 11.6522 19.0496 11.7257 18.7619C11.8865 18.132 12.1949 17.2754 12.93 16.5403L16.2969 13.1733L16.3415 13.1285C16.5773 12.8913 16.9384 12.5281 17.3773 12.2747C18.0247 11.9009 18.7554 11.7346 19.4771 11.7756C19.867 11.7978 20.062 11.8089 20.156 11.7201C20.25 11.6313 20.25 11.4597 20.25 11.1166V9.31665C20.25 7.62531 20.25 6.28338 20.1158 5.23259C19.9779 4.15293 19.6868 3.26761 19.0186 2.56428C18.3453 1.85554 17.4891 1.54173 16.4455 1.39405L16.3903 1.38642C16.1276 1.35093 15.9962 1.33319 15.897 1.40968C15.7978 1.48617 15.7809 1.62309 15.7471 1.89694L15.6619 2.58688L15.6583 2.60861C15.566 3.16257 15.4737 3.71642 15.3594 4.10029C15.2347 4.51935 15.0464 4.91107 14.6834 5.21856C14.3204 5.52604 13.9031 5.64738 13.4692 5.70155C13.0665 5.75183 12.5716 5.7518 12.0026 5.75177H9.99688C9.42789 5.7518 8.93298 5.75183 8.5303 5.70155C8.09643 5.64738 7.67908 5.52604 7.31611 5.21856C6.95313 4.91107 6.76484 4.51935 6.64008 4.10029C6.52625 3.71794 6.43374 3.16263 6.3418 2.61071L6.33705 2.58219L6.25718 1.90006ZM6.25 11.0017C6.25 10.5875 6.58579 10.2517 7 10.2517H15C15.4142 10.2517 15.75 10.5875 15.75 11.0017C15.75 11.4159 15.4142 11.7517 15 11.7517H7C6.58579 11.7517 6.25 11.4159 6.25 11.0017ZM6.25 16.0017C6.25 15.5875 6.58579 15.2517 7 15.2517H11C11.4142 15.2517 11.75 15.5875 11.75 16.0017C11.75 16.4159 11.4142 16.7517 11 16.7517H7C6.58579 16.7517 6.25 16.4159 6.25 16.0017Z',
  d19: 'M8.66016 21.7695C8.66016 21.2172 9.10787 20.7695 9.66016 20.7695H10.6602C11.2124 20.7695 11.6602 21.2172 11.6602 21.7695C11.6602 22.3218 11.2124 22.7695 10.6602 22.7695H9.66016C9.10787 22.7695 8.66016 22.3218 8.66016 21.7695Z',
  d20: 'M18.1269 13.5738C18.8294 13.1681 19.695 13.1681 20.3976 13.5738C20.6592 13.7248 20.9533 14.0194 21.2264 14.2931C21.5001 14.5662 21.7947 14.8602 21.9457 15.1218C22.3513 15.8244 22.3513 16.69 21.9457 17.3926C21.7947 17.6542 21.5599 17.8885 21.2862 18.1616L17.9185 21.5292C17.4532 21.9945 16.8913 22.2119 16.3865 22.3408C16.1345 22.4052 15.8813 22.451 15.6516 22.4907C15.3456 22.5562 14.348 22.7492 14.0947 22.7653C13.8157 22.7831 13.4113 22.7558 13.0875 22.432C12.7637 22.1082 12.7364 21.7037 12.7541 21.4248C12.7702 21.1715 12.9632 20.1739 13.0288 19.8679C13.0684 19.6382 13.1143 19.385 13.1786 19.1329C13.3075 18.6282 13.525 18.0662 13.9903 17.6009L17.3579 14.2333C17.631 13.9596 17.8653 13.7248 18.1269 13.5738Z',
  d21: 'M6.25 11C6.25 10.5858 6.58579 10.25 7 10.25H15C15.4142 10.25 15.75 10.5858 15.75 11C15.75 11.4142 15.4142 11.75 15 11.75H7C6.58579 11.75 6.25 11.4142 6.25 11ZM6.25 16C6.25 15.5858 6.58579 15.25 7 15.25H11C11.4142 15.25 11.75 15.5858 11.75 16C11.75 16.4142 11.4142 16.75 11 16.75H7C6.58579 16.75 6.25 16.4142 6.25 16Z',
  d22: 'M15 2H19.5V12.0002M7 2H2.5V22.0002H7',
  d23: 'M15 2H7V5H15V2Z',
  d24: 'M6.5 16H11.5M6.5 11H15.5',
  d25: 'M9 22H11',
  d26: 'M16.0016 22.0002H13.5009V19.5002L18.9955 14.0073C18.9994 14.0034 19.0057 14.0034 19.0096 14.0073L21.4962 16.4931C21.5001 16.497 21.5001 16.5034 21.4962 16.5073L16.0016 22.0002Z',
  d27: 'M5.74982 1.24973H1.99982C1.5856 1.24973 1.24982 1.58552 1.24982 1.99973V21.9997C1.24982 22.4139 1.5856 22.7497 1.99982 22.7497H8.99982V19.7497H13.1287L19.7498 13.1286V1.99973C19.7498 1.58552 19.414 1.24973 18.9998 1.24973H15.2498V4.74973C15.2498 5.16395 14.914 5.49973 14.4998 5.49973H6.49982C6.0856 5.49973 5.74982 5.16395 5.74982 4.74973V1.24973ZM5.99982 10.7497H14.9998V9.24973H5.99982V10.7497ZM5.99982 15.7497H10.9998V14.2497H5.99982V15.7497Z',
  d28: 'M13.7498 1.24973H7.24982V3.99973H13.7498V1.24973Z',
  d29: 'M14.7502 20.2503V22.7503H17.2502L22.7502 17.2503L20.2502 14.7503L14.7502 20.2503Z',
  d30: 'M12.5002 22.7503H10.5002V21.2503H12.5002V22.7503Z',
};

export const IconTaskEdit02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="task-edit-02-stroke-rounded IconTaskEdit02StrokeRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconTaskEdit02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="task-edit-02-duotone-rounded IconTaskEdit02DuotoneRounded"
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
        strokeLinejoin="round" 
      />
      <path 
        opacity="0.93" 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconTaskEdit02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="task-edit-02-twotone-rounded IconTaskEdit02TwotoneRounded"
    >
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
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
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d14} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d15} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d16} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTaskEdit02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="task-edit-02-solid-rounded IconTaskEdit02SolidRounded"
    >
      <path 
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
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const IconTaskEdit02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="task-edit-02-bulk-rounded IconTaskEdit02BulkRounded"
    >
      <path 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d21} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const IconTaskEdit02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="task-edit-02-stroke-sharp IconTaskEdit02StrokeSharp"
    >
      <path 
        d={d.d22} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d23} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d24} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d25} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d26} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconTaskEdit02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="task-edit-02-solid-sharp IconTaskEdit02SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d27} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d28} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d29} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d30} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfTaskEdit02: TheIconSelfPack = {
  name: 'TaskEdit02',
  StrokeRounded: IconTaskEdit02StrokeRounded,
  DuotoneRounded: IconTaskEdit02DuotoneRounded,
  TwotoneRounded: IconTaskEdit02TwotoneRounded,
  SolidRounded: IconTaskEdit02SolidRounded,
  BulkRounded: IconTaskEdit02BulkRounded,
  StrokeSharp: IconTaskEdit02StrokeSharp,
  SolidSharp: IconTaskEdit02SolidSharp,
};