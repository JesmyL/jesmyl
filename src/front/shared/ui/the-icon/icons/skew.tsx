import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M10.9171 4.5752L17.0848 6.4255M19.1544 8.99455L19.8476 18.0061M18.0162 19.7523L5.98574 18.2484M8.32812 5.88435L4.67383 16.1164',
  d2: 'M10.916 4.57812C10.668 5.40082 9.90436 6 9.0008 6C8.7648 6 8.53833 5.95912 8.32812 5.88406L4.67383 16.1161C5.4473 16.3924 6.0008 17.1316 6.0008 18C6.0008 18.0852 5.99548 18.1691 5.98515 18.2514L18.0151 19.7552C18.1296 18.8164 18.8951 18.0786 19.8462 18.0059L19.153 8.9943C19.1027 8.99808 19.052 9 19.0008 9C17.8962 9 17.0008 8.10457 17.0008 7C17.0008 6.80139 17.0298 6.60953 17.0837 6.42843L10.916 4.57812Z',
  d3: 'M10.9171 4.57422L17.0848 6.42452M19.1544 8.99358L19.8476 18.0052M18.0162 19.7513L5.98574 18.2475M8.32812 5.88337L4.67383 16.1154',
  d4: 'M9.95957 4.28713C10.1183 3.75814 10.6758 3.45796 11.2047 3.61666L17.3724 5.46696C17.9014 5.62566 18.2016 6.18314 18.0429 6.71214C17.8842 7.24113 17.3267 7.54131 16.7977 7.38261L10.6301 5.53231C10.1011 5.37361 9.80088 4.81613 9.95957 4.28713ZM8.66472 4.94189C9.18483 5.12764 9.45588 5.69986 9.27013 6.21997L5.61584 16.452C5.43009 16.9721 4.85787 17.2431 4.33776 17.0574C3.81765 16.8716 3.54661 16.2994 3.73236 15.7793L7.38665 5.5473C7.5724 5.02719 8.14462 4.75614 8.66472 4.94189ZM19.0779 7.99678C19.6286 7.95443 20.1093 8.36648 20.1517 8.91714L20.8449 17.9287C20.8873 18.4794 20.4752 18.9601 19.9245 19.0025C19.3739 19.0448 18.8931 18.6328 18.8508 18.0821L18.1576 9.07054C18.1152 8.51988 18.5273 8.03914 19.0779 7.99678ZM4.99373 18.1237C5.06223 17.5757 5.56202 17.1869 6.11004 17.2555L18.1405 18.7593C18.6885 18.8278 19.0773 19.3276 19.0088 19.8756C18.9403 20.4236 18.4405 20.8123 17.8924 20.7438L5.86197 19.24C5.31395 19.1715 4.92523 18.6717 4.99373 18.1237Z',
  d5: 'M6.25 4C6.25 2.48122 7.48122 1.25 9 1.25C10.5188 1.25 11.75 2.48122 11.75 4C11.75 5.51878 10.5188 6.75 9 6.75C7.48122 6.75 6.25 5.51878 6.25 4Z',
  d6: 'M16.25 7C16.25 5.48122 17.4812 4.25 19 4.25C20.5188 4.25 21.75 5.48122 21.75 7C21.75 8.51878 20.5188 9.75 19 9.75C17.4812 9.75 16.25 8.51878 16.25 7Z',
  d7: 'M17.25 20C17.25 18.4812 18.4812 17.25 20 17.25C21.5188 17.25 22.75 18.4812 22.75 20C22.75 21.5188 21.5188 22.75 20 22.75C18.4812 22.75 17.25 21.5188 17.25 20Z',
  d8: 'M1.25 18C1.25 16.4812 2.48122 15.25 4 15.25C5.51878 15.25 6.75 16.4812 6.75 18C6.75 19.5188 5.51878 20.75 4 20.75C2.48122 20.75 1.25 19.5188 1.25 18Z',
  d9: 'M7.19833 6.07635L3.92188 15.2504C3.94806 15.2497 3.97434 15.2493 4.00071 15.2493C4.69113 15.2493 5.32213 15.5037 5.80505 15.9239L9.08213 6.74812C9.05509 6.74891 9.02795 6.7493 9.00071 6.7493C8.31122 6.7493 7.681 6.49556 7.19833 6.07635Z',
  d10: 'M11.1674 5.69305L16.2595 7.22069C16.2537 7.14766 16.2507 7.07383 16.2507 6.9993C16.2507 6.36022 16.4687 5.77205 16.8344 5.3051L11.7419 3.77734C11.7477 3.85056 11.7507 3.92458 11.7507 3.9993C11.7507 4.63818 11.5329 5.22618 11.1674 5.69305Z',
  d11: 'M18.2015 9.63136C18.4544 9.70806 18.7227 9.7493 19.0007 9.7493C19.4289 9.7493 19.8342 9.65145 20.1955 9.4769L20.8025 17.368C20.5488 17.2908 20.2796 17.2493 20.0007 17.2493C19.5735 17.2493 19.169 17.3467 18.8083 17.5206L18.2015 9.63136Z',
  d12: 'M17.5823 18.6892L6.66738 17.3248C6.7218 17.5406 6.75071 17.7666 6.75071 17.9993C6.75071 18.4736 6.63064 18.9199 6.41923 19.3093L17.334 20.6737C17.2796 20.4579 17.2507 20.232 17.2507 19.9993C17.2507 19.525 17.3708 19.0787 17.5823 18.6892Z',
  d13: 'M16.7978 7.38315L10.6301 5.53284L11.2048 3.61719L17.3725 5.46749L16.7978 7.38315ZM9.27019 6.2205L5.61591 16.4525L3.73242 15.7798L7.38671 5.54783L9.27019 6.2205ZM18.8509 18.0827L18.1577 9.07107L20.1518 8.91767L20.845 17.9293L18.8509 18.0827ZM6.11011 17.256L18.1406 18.7598L17.8925 20.7444L5.86204 19.2405L6.11011 17.256Z',
};

export const IconSkewStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="skew-stroke-rounded IconSkewStrokeRounded"
    >
      <circle 
        cx="9" 
        cy="4" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round"></circle>
      <circle 
        cx="19" 
        cy="7" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round"></circle>
      <circle 
        cx="20" 
        cy="20" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round"></circle>
      <circle 
        cx="4" 
        cy="18" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round"></circle>
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSkewDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="skew-duotone-rounded IconSkewDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
      <circle 
        cx="9" 
        cy="4" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round"></circle>
      <circle 
        cx="19" 
        cy="7" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round"></circle>
      <circle 
        cx="20" 
        cy="20" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round"></circle>
      <circle 
        cx="4" 
        cy="18" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round"></circle>
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSkewTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="skew-twotone-rounded IconSkewTwotoneRounded"
    >
      <circle 
        cx="9" 
        cy="4" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round"></circle>
      <circle 
        cx="19" 
        cy="7" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round"></circle>
      <circle 
        cx="20" 
        cy="20" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round"></circle>
      <circle 
        cx="4" 
        cy="18" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round"></circle>
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSkewSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="skew-solid-rounded IconSkewSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
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

export const IconSkewBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="skew-bulk-rounded IconSkewBulkRounded"
    >
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <g 
        opacity="0.44">
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
      </g>
    </TheIconWrapper>
  );
};

export const IconSkewStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="skew-stroke-sharp IconSkewStrokeSharp"
    >
      <circle 
        cx="9" 
        cy="4" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="19" 
        cy="7" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="20" 
        cy="20" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="4" 
        cy="18" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSkewSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="skew-solid-sharp IconSkewSolidSharp"
    >
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfSkew: TheIconSelfPack = {
  name: 'Skew',
  StrokeRounded: IconSkewStrokeRounded,
  DuotoneRounded: IconSkewDuotoneRounded,
  TwotoneRounded: IconSkewTwotoneRounded,
  SolidRounded: IconSkewSolidRounded,
  BulkRounded: IconSkewBulkRounded,
  StrokeSharp: IconSkewStrokeSharp,
  SolidSharp: IconSkewSolidSharp,
};