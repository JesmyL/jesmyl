import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M19.5 13V10C19.5 6.70017 19.5 5.05025 18.4749 4.02513C17.4497 3 15.7998 3 12.5 3H9.5C6.20017 3 4.55025 3 3.52513 4.02513C2.5 5.05025 2.5 6.70017 2.5 10V15C2.5 18.2998 2.5 19.9497 3.52513 20.9749C4.55025 22 6.20017 22 9.5 22H11',
  d2: 'M16 2V4M11 2V4M6 2V4',
  d3: 'M13.5 20C13.5 20 14.5 20 15.5 22C15.5 22 18.6765 17 21.5 16',
  d4: 'M7 15H11M7 10H15',
  d5: 'M2.5 10C2.5 6.70017 2.5 5.05025 3.52513 4.02513C4.55025 3 6.20017 3 9.5 3H12.5C15.7998 3 17.4497 3 18.4749 4.02513C19.5 5.05025 19.5 6.70017 19.5 10V15C19.5 18.2998 19.5 19.9497 18.4749 20.9749C17.4497 22 15.7998 22 12.5 22H9.5C6.20017 22 4.55025 22 3.52513 20.9749C2.5 19.9497 2.5 18.2998 2.5 15V10Z',
  d6: 'M7 15H11',
  d7: 'M7 10H15',
  d8: 'M5.875 1C6.42728 1 6.875 1.44772 6.875 2V4C6.875 4.55228 6.42728 5 5.875 5C5.32272 5 4.875 4.55228 4.875 4V2C4.875 1.44772 5.32272 1 5.875 1ZM10.875 1C11.4273 1 11.875 1.44772 11.875 2V4C11.875 4.55228 11.4273 5 10.875 5C10.3227 5 9.875 4.55228 9.875 4V2C9.875 1.44772 10.3227 1 10.875 1ZM15.875 1C16.4273 1 16.875 1.44772 16.875 2V4C16.875 4.55228 16.4273 5 15.875 5C15.3227 5 14.875 4.55228 14.875 4V2C14.875 1.44772 15.3227 1 15.875 1Z',
  d9: 'M12.4308 2.25H9.31926H9.31925C7.71667 2.24998 6.43769 2.24997 5.43462 2.38483C4.39835 2.52415 3.54494 2.81966 2.8698 3.4948C2.19466 4.16994 1.89915 5.02335 1.75983 6.05962C1.62497 7.06269 1.62498 8.34165 1.625 9.94422V9.94424V15.0558V15.0558C1.62498 16.6584 1.62497 17.9373 1.75983 18.9404C1.89915 19.9767 2.19466 20.8301 2.8698 21.5052C3.54494 22.1803 4.39835 22.4758 5.43462 22.6152C6.4377 22.75 7.71667 22.75 9.31926 22.75L12.6194 22.75C12.6674 22.75 12.6914 22.75 12.7219 22.7435C12.8266 22.7215 12.8314 22.5863 12.7661 22.5016C12.7571 22.49 12.7485 22.479 12.7402 22.4687C12.7049 22.4249 12.6557 22.3953 12.6022 22.3779C11.5993 22.0521 10.875 21.1113 10.875 19.9999C10.875 18.6192 11.9943 17.4999 13.375 17.4999C13.8022 17.4999 14.1092 17.5906 14.2337 17.6274C14.4371 17.6855 14.6528 17.7664 14.8758 17.8755L14.8758 17.8755C14.9609 17.9171 15.0034 17.9379 15.0356 17.9456C15.13 17.9683 15.2116 17.9508 15.2886 17.8915C15.3148 17.8714 15.342 17.8388 15.3965 17.7735L15.3965 17.7735C16.0194 17.0267 16.7727 16.2034 17.598 15.4797C18.2111 14.942 18.9461 14.3857 19.7679 13.974L19.768 13.974C19.946 13.8849 20.035 13.8403 20.0797 13.7678C20.1245 13.6954 20.1245 13.6015 20.1245 13.4137L20.125 9.94426C20.125 8.34167 20.125 7.0627 19.9902 6.05962C19.8508 5.02335 19.5553 4.16994 18.8802 3.4948C18.2051 2.81966 17.3517 2.52415 16.3154 2.38483C15.3123 2.24997 14.0333 2.24998 12.4308 2.25H12.4308ZM6.875 9.25C6.46079 9.25 6.125 9.58579 6.125 10C6.125 10.4142 6.46079 10.75 6.875 10.75H14.875C15.2892 10.75 15.625 10.4142 15.625 10C15.625 9.58579 15.2892 9.25 14.875 9.25H6.875ZM6.875 14.25C6.46079 14.25 6.125 14.5858 6.125 15C6.125 15.4142 6.46079 15.75 6.875 15.75H10.875C11.2892 15.75 11.625 15.4142 11.625 15C11.625 14.5858 11.2892 14.25 10.875 14.25H6.875Z',
  d10: 'M22.3176 15.6664C22.502 16.187 22.2294 16.7585 21.7088 16.9429C21.1752 17.1319 20.5587 17.5388 19.9057 18.1115C19.263 18.6751 18.6378 19.3521 18.0841 20.0159C17.5322 20.6774 17.0635 21.3111 16.7324 21.7801C16.5672 22.0141 16.307 22.4044 16.2191 22.5365C16.0258 22.8406 15.6837 23.0174 15.3239 22.999C14.9639 22.9805 14.6418 22.7698 14.4806 22.4475C14.0399 21.5661 13.6446 21.2152 13.4453 21.0823C13.361 21.0261 13.304 21.0036 13.2814 20.9959C12.773 20.9487 12.375 20.521 12.375 20.0003C12.375 19.448 12.8227 19.0003 13.375 19.0003C13.6094 19.0003 13.7184 19.0405 13.8216 19.07C14.0295 19.1294 14.2803 19.2353 14.5547 19.4182C14.829 19.6011 15.1166 19.8538 15.4054 20.1997C15.7206 19.7689 16.109 19.2613 16.5483 18.7347C17.1416 18.0235 17.84 17.2629 18.587 16.6078C19.3236 15.9618 20.163 15.3686 21.0412 15.0576C21.5618 14.8733 22.1332 15.1458 22.3176 15.6664Z',
  d11: 'M9.31926 2.25H12.4308C14.0333 2.24998 15.3123 2.24997 16.3154 2.38483C17.3517 2.52415 18.2051 2.81966 18.8802 3.4948C19.5553 4.16994 19.8508 5.02335 19.9902 6.05961C20.125 7.0627 20.125 8.34166 20.125 9.94426L20.1245 13.4137C20.1245 13.6015 20.1245 13.6954 20.0797 13.7678C20.035 13.8403 19.946 13.8849 19.7679 13.974C18.9461 14.3857 18.2111 14.942 17.598 15.4797C16.7727 16.2034 16.0194 17.0267 15.3965 17.7735C15.342 17.8388 15.3148 17.8714 15.2886 17.8915C15.2116 17.9508 15.13 17.9683 15.0356 17.9456C15.0034 17.9379 14.9609 17.9171 14.8758 17.8755C14.6528 17.7664 14.4371 17.6855 14.2337 17.6274C14.1092 17.5906 13.8022 17.4999 13.375 17.4999C11.9943 17.4999 10.875 18.6192 10.875 19.9999C10.875 21.1113 11.5993 22.0521 12.6022 22.3779C12.6557 22.3953 12.7049 22.4249 12.7402 22.4687C12.7485 22.479 12.7571 22.49 12.7661 22.5016C12.8314 22.5863 12.8266 22.7215 12.7219 22.7435C12.6914 22.75 12.6674 22.75 12.6194 22.75L9.31926 22.75C7.71667 22.75 6.4377 22.75 5.43462 22.6152C4.39835 22.4758 3.54494 22.1803 2.8698 21.5052C2.19466 20.8301 1.89915 19.9767 1.75983 18.9404C1.62497 17.9373 1.62498 16.6583 1.625 15.0558V9.94424C1.62498 8.34166 1.62497 7.06269 1.75983 6.05962C1.89915 5.02335 2.19466 4.16994 2.8698 3.4948C3.54494 2.81966 4.39835 2.52415 5.43462 2.38483C6.4377 2.24997 7.71668 2.24998 9.31926 2.25Z',
  d12: 'M6.125 10C6.125 9.58579 6.46079 9.25 6.875 9.25H14.875C15.2892 9.25 15.625 9.58579 15.625 10C15.625 10.4142 15.2892 10.75 14.875 10.75H6.875C6.46079 10.75 6.125 10.4142 6.125 10ZM6.125 15C6.125 14.5858 6.46079 14.25 6.875 14.25H10.875C11.2892 14.25 11.625 14.5858 11.625 15C11.625 15.4142 11.2892 15.75 10.875 15.75H6.875C6.46079 15.75 6.125 15.4142 6.125 15Z',
  d13: 'M16 2V6M11 2V6M6 2V6',
  d14: 'M20 13V4H2V22L11 22',
  d15: 'M14 20L16 22L22 16',
  d16: 'M7 16H11M7 11H15',
  d17: 'M22.7501 15.793L16.043 22.5001L13.3359 19.793L14.7501 18.3788L16.043 19.6717L21.3359 14.3788L22.7501 15.793Z',
  d18: 'M6.99985 2.99977H9.99985V1.49977H11.9998V2.99977H14.9998V1.49977H16.9998V2.99977H19.9998C20.4141 2.99977 20.7498 3.33556 20.7498 3.74977V12.8437L16.0431 17.5505L14.7502 16.2576L11.2147 19.7931L13.9213 22.4998L1.99985 22.4998C1.58563 22.4998 1.24985 22.164 1.24985 21.7498V3.74977C1.24985 3.33556 1.58563 2.99977 1.99985 2.99977H4.99985V1.49977H6.99985V2.99977ZM6.99985 10.4998H14.9998V8.99977H6.99985V10.4998ZM6.99985 15.4998H10.9998V13.9998H6.99985V15.4998Z',
};

export const IconNoteDoneStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="note-done-stroke-rounded IconNoteDoneStrokeRounded"
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
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconNoteDoneDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="note-done-duotone-rounded IconNoteDoneDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
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
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconNoteDoneTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="note-done-twotone-rounded IconNoteDoneTwotoneRounded"
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
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconNoteDoneSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="note-done-solid-rounded IconNoteDoneSolidRounded"
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
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconNoteDoneBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="note-done-bulk-rounded IconNoteDoneBulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconNoteDoneStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="note-done-stroke-sharp IconNoteDoneStrokeSharp"
    >
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
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
      />
      <path 
        d={d.d16} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconNoteDoneSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="note-done-solid-sharp IconNoteDoneSolidSharp"
    >
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

export const iconPackOfNoteDone: TheIconSelfPack = {
  name: 'NoteDone',
  StrokeRounded: IconNoteDoneStrokeRounded,
  DuotoneRounded: IconNoteDoneDuotoneRounded,
  TwotoneRounded: IconNoteDoneTwotoneRounded,
  SolidRounded: IconNoteDoneSolidRounded,
  BulkRounded: IconNoteDoneBulkRounded,
  StrokeSharp: IconNoteDoneStrokeSharp,
  SolidSharp: IconNoteDoneSolidSharp,
};