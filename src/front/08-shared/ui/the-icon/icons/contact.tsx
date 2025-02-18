import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 22C7.99306 22 5.98959 22 4.7448 20.682C3.5 19.364 3.5 17.2426 3.5 13C3.5 8.75736 3.5 6.63604 4.7448 5.31802C5.98959 4 7.99306 4 12 4C16.0069 4 18.0104 4 19.2552 5.31802C20.5 6.63604 20.5 8.75736 20.5 13C20.5 17.2426 20.5 19.364 19.2552 20.682C18.0104 22 16.0069 22 12 22Z',
  d2: 'M8 4V2',
  d3: 'M16 4V2',
  d4: 'M14.018 9.49261C14.018 10.5972 13.1226 11.4926 12.0181 11.4926C10.9135 11.4926 10.0181 10.5972 10.0181 9.49261C10.0181 8.38808 10.9135 7.49268 12.0181 7.49268C13.1226 7.49268 14.018 8.38808 14.018 9.49261Z',
  d5: 'M8.06298 16.7161C9.12133 15.0868 10.802 14.4762 12.0181 14.4774C13.2341 14.4787 14.8656 15.0868 15.9239 16.7161C15.9923 16.8215 16.0112 16.9512 15.9494 17.0607C15.7019 17.4996 14.9334 18.3705 14.3784 18.4296C13.7406 18.4974 12.0723 18.5069 12.0194 18.5072C11.9664 18.5069 10.2466 18.4974 9.60851 18.4296C9.05345 18.3705 8.28496 17.4996 8.03745 17.0607C7.9757 16.9512 7.99456 16.8215 8.06298 16.7161Z',
  d6: 'M4.7448 20.682C5.98959 22 7.99306 22 12 22C16.0069 22 18.0104 22 19.2552 20.682C20.5 19.364 20.5 17.2426 20.5 13C20.5 8.75736 20.5 6.63604 19.2552 5.31802C18.0104 4 16.0069 4 12 4C7.99306 4 5.98959 4 4.7448 5.31802C3.5 6.63604 3.5 8.75736 3.5 13C3.5 17.2426 3.5 19.364 4.7448 20.682ZM12 11.5C13.1046 11.5 14 10.6046 14 9.5C14 8.39543 13.1046 7.5 12 7.5C10.8954 7.5 10 8.39543 10 9.5C10 10.6046 10.8954 11.5 12 11.5ZM9.37586 15.3792C9.45492 15.3289 9.52752 15.2827 9.59003 15.2408C11.0645 14.2531 12.9355 14.2531 14.41 15.2408C14.4725 15.2827 14.5451 15.3289 14.6242 15.3792C15.3404 15.8352 16.5875 16.6291 15.6833 17.5983C15.1928 18.124 14.6464 18.5 13.9596 18.5H10.0404C9.35355 18.5 8.80725 18.124 8.31674 17.5983C7.41248 16.6291 8.65963 15.8352 9.37586 15.3792Z',
  d7: 'M14.0243 9.4931C14.0243 10.5976 13.1289 11.4931 12.0243 11.4931C10.9198 11.4931 10.0244 10.5976 10.0244 9.4931C10.0244 8.38856 10.9198 7.49316 12.0243 7.49316C13.1289 7.49316 14.0243 8.38856 14.0243 9.4931Z',
  d8: 'M8.06958 16.7162C9.12793 15.0869 10.8086 14.4763 12.0246 14.4775C13.2407 14.4788 14.8721 15.0869 15.9305 16.7162C15.9989 16.8216 16.0177 16.9513 15.956 17.0608C15.7085 17.4997 14.94 18.3706 14.3849 18.4297C13.7472 18.4975 12.0788 18.507 12.0259 18.5073C11.9729 18.507 10.2531 18.4975 9.61511 18.4297C9.06005 18.3706 8.29156 17.4997 8.04405 17.0608C7.98229 16.9513 8.00115 16.8216 8.06958 16.7162Z',
  d9: 'M14.0307 9.49261C14.0307 10.5972 13.1353 11.4926 12.0308 11.4926C10.9262 11.4926 10.0308 10.5972 10.0308 9.49261C10.0308 8.38808 10.9262 7.49268 12.0308 7.49268C13.1353 7.49268 14.0307 8.38808 14.0307 9.49261Z',
  d10: 'M8.07568 16.7161C9.13403 15.0868 10.8147 14.4762 12.0308 14.4774C13.2468 14.4787 14.8783 15.0868 15.9366 16.7161C16.005 16.8215 16.0239 16.9512 15.9621 17.0607C15.7146 17.4996 14.9461 18.3705 14.3911 18.4296C13.7533 18.4974 12.085 18.5069 12.0321 18.5072C11.9791 18.5069 10.2593 18.4974 9.62121 18.4296C9.06615 18.3705 8.29766 17.4996 8.05015 17.0607C7.98839 16.9512 8.00725 16.8215 8.07568 16.7161Z',
  d11: 'M2.91157 7.9678C2.74998 9.24043 2.74999 10.8704 2.75 12.9459V12.9459C2.74999 15.0214 2.74998 16.7596 2.91157 18.0322C3.07678 19.3333 3.42236 20.3741 4.19954 21.1969C4.98243 22.0259 5.98228 22.4 7.23089 22.5778C8.44104 22.75 10.1068 22.75 12.0596 22.75C14.0125 22.75 15.559 22.75 16.7691 22.5778C18.0177 22.4 19.0176 22.0259 19.8005 21.1969C20.5776 20.3741 20.9232 19.3333 21.0884 18.0322C21.25 16.7596 21.25 15.0214 21.25 12.9459V12.9459V12.9459C21.25 10.8704 21.25 9.24043 21.0884 7.9678C20.9232 6.66674 20.5776 5.62594 19.8005 4.80305C19.0176 3.97411 18.0177 3.59998 16.7691 3.42224C15.559 3.24997 14.0125 3.24998 12.0597 3.25H12.0596H12.0596H12.0596C10.1067 3.24998 8.44103 3.24997 7.23089 3.42224C5.98228 3.59998 4.98243 3.97411 4.19954 4.80305C3.42236 5.62594 3.07678 6.66674 2.91157 7.9678ZM12.0001 6.75C10.4813 6.75 9.2501 7.98122 9.2501 9.5C9.2501 11.0188 10.4813 12.25 12.0001 12.25C13.5189 12.25 14.7501 11.0188 14.7501 9.5C14.7501 7.98122 13.5189 6.75 12.0001 6.75ZM16.2143 15.6697C15.8435 15.2614 15.1375 14.8137 14.8275 14.6177C13.1004 13.4608 10.8998 13.4608 9.17272 14.6177C8.86266 14.8137 8.15667 15.2614 7.78592 15.6697C7.55059 15.9288 7.30253 16.2967 7.25726 16.7626C7.20867 17.2627 7.40665 17.7221 7.76846 18.1099C8.31558 18.6963 9.04719 19.25 10.0405 19.25H13.9597C14.953 19.25 15.6846 18.6963 16.2317 18.1099C16.5935 17.7221 16.7915 17.2627 16.7429 16.7626C16.6977 16.2967 16.4496 15.9288 16.2143 15.6697Z',
  d12: 'M8 1.25C8.55228 1.25 9 1.69772 9 2.25V4.25C9 4.80228 8.55228 5.25 8 5.25C7.44772 5.25 7 4.80228 7 4.25V2.25C7 1.69772 7.44772 1.25 8 1.25ZM16 1.25C16.5523 1.25 17 1.69772 17 2.25V4.25C17 4.80228 16.5523 5.25 16 5.25C15.4477 5.25 15 4.80228 15 4.25V2.25C15 1.69772 15.4477 1.25 16 1.25Z',
  d13: 'M2.75 12.9459C2.74999 10.8704 2.74998 9.24043 2.91157 7.9678C3.07678 6.66674 3.42236 5.62594 4.19954 4.80305C4.98243 3.97411 5.98228 3.59998 7.23089 3.42224C8.44104 3.24997 10.1067 3.24998 12.0596 3.25L12.0596 3.25L12.0597 3.25C14.0125 3.24998 15.559 3.24997 16.7691 3.42224C18.0177 3.59998 19.0176 3.97411 19.8005 4.80305C20.5776 5.62594 20.9232 6.66674 21.0884 7.9678C21.25 9.24043 21.25 10.8704 21.25 12.9459L21.25 12.9459C21.25 15.0214 21.25 16.7596 21.0884 18.0322C20.9232 19.3333 20.5776 20.3741 19.8005 21.1969C19.0176 22.0259 18.0177 22.4 16.7691 22.5778C15.559 22.75 14.0125 22.75 12.0596 22.75L12.0596 22.75C10.1068 22.75 8.44104 22.75 7.23089 22.5778C5.98228 22.4 4.98243 22.0259 4.19954 21.1969C3.42236 20.3741 3.07678 19.3333 2.91157 18.0322C2.74998 16.7596 2.74999 15.0214 2.75 12.9459L2.75 12.9459Z',
  d14: 'M9.2501 9.5C9.2501 7.98122 10.4813 6.75 12.0001 6.75C13.5189 6.75 14.7501 7.98122 14.7501 9.5C14.7501 11.0188 13.5189 12.25 12.0001 12.25C10.4813 12.25 9.2501 11.0188 9.2501 9.5Z',
  d15: 'M9.17272 14.6177C10.8998 13.4608 13.1004 13.4608 14.8275 14.6177C15.1375 14.8137 15.8435 15.2614 16.2143 15.6697C16.4496 15.9288 16.6977 16.2967 16.7429 16.7626C16.7915 17.2627 16.5935 17.7221 16.2317 18.1099C15.6846 18.6963 14.953 19.25 13.9597 19.25H10.0405C9.04719 19.25 8.31558 18.6963 7.76846 18.1099C7.40665 17.7221 7.20867 17.2627 7.25726 16.7626C7.30253 16.2967 7.55059 15.9288 7.78592 15.6697C8.15667 15.2614 8.86266 14.8137 9.17272 14.6177Z',
  d16: 'M20.5 5H3.5V22H20.5V5Z',
  d17: 'M14 10C14 11.1046 13.1046 12 12 12C10.8954 12 10 11.1046 10 10C10 8.89543 10.8954 8 12 8C13.1046 8 14 8.89543 14 10Z',
  d18: 'M16 19H8C8 16.5454 9.79086 15 12 15C14.2091 15 16 16.5454 16 19Z',
  d19: 'M8 5V2',
  d20: 'M16 5V2',
  d21: 'M2.75 4.75C2.75 4.33579 3.08579 4 3.5 4H20.5C20.9142 4 21.25 4.33579 21.25 4.75V21.75C21.25 22.1642 20.9142 22.5 20.5 22.5H3.5C3.08579 22.5 2.75 22.1642 2.75 21.75V4.75ZM9.25 9.75C9.25 8.23122 10.4812 7 12 7C13.5188 7 14.75 8.23122 14.75 9.75C14.75 11.2688 13.5188 12.5 12 12.5C10.4812 12.5 9.25 11.2688 9.25 9.75ZM12 14C9.40759 14 7.25 15.8509 7.25 18.75C7.25 19.1642 7.58579 19.5 8 19.5H16C16.4142 19.5 16.75 19.1642 16.75 18.75C16.75 15.8509 14.5924 14 12 14Z',
  d22: 'M9 1.5V4H7V1.5H9Z',
  d23: 'M17 1.5V4H15V1.5H17Z',
};

export const IconContactStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="contact-stroke-rounded IconContactStrokeRounded"
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

export const IconContactDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="contact-duotone-rounded IconContactDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d8} 
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
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconContactTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="contact-twotone-rounded IconContactTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
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
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      </g>
    </TheIconWrapper>
  );
};

export const IconContactSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="contact-solid-rounded IconContactSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconContactBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="contact-bulk-rounded IconContactBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconContactStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="contact-stroke-sharp IconContactStrokeSharp"
    >
      <path 
        d={d.d16} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d17} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d18} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d19} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d20} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconContactSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="contact-solid-sharp IconContactSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d21} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d22} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d23} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfContact: TheIconSelfPack = {
  name: 'Contact',
  StrokeRounded: IconContactStrokeRounded,
  DuotoneRounded: IconContactDuotoneRounded,
  TwotoneRounded: IconContactTwotoneRounded,
  SolidRounded: IconContactSolidRounded,
  BulkRounded: IconContactBulkRounded,
  StrokeSharp: IconContactStrokeSharp,
  SolidSharp: IconContactSolidSharp,
};